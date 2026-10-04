#!/usr/bin/env node
// Lists named imports that the target module does not export: local modules (read from source) and
// the icon package, whose icons get renamed between versions (loaded in Node). Webpack turned these into `undefined`; native ES modules (Vite in the
// browser, Rolldown) refuse to load the module.
// Usage: node scripts/astro-migration/check-imports.mjs
import { createProcessor } from '@mdx-js/mdx'
import fg from 'fast-glob'
import remarkFrontmatter from 'remark-frontmatter'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = process.cwd()
const ALIASES = {
    '~': 'src',
    lib: 'src/lib',
    types: 'src/types',
    images: 'src/images',
    components: 'src/components',
    constants: 'src/constants',
    logic: 'src/logic',
    hooks: 'src/hooks',
    docs: '.cache/posthog-main-repo/docs',
    onboarding: '.cache/posthog-main-repo/docs/onboarding',
}
const EXTENSIONS = [
    '',
    '.tsx',
    '.ts',
    '.jsx',
    '.js',
    '.mjs',
    '.mdx',
    '/index.tsx',
    '/index.ts',
    '/index.jsx',
    '/index.js',
]

function resolve(specifier, importer) {
    let base
    if (specifier.startsWith('.')) base = path.resolve(path.dirname(importer), specifier)
    else {
        const [first, ...rest] = specifier.split('/')
        if (!ALIASES[first]) return null
        base = path.join(ROOT, ALIASES[first], ...rest)
    }
    for (const extension of EXTENSIONS) {
        const file = base + extension
        if (fs.existsSync(file) && fs.statSync(file).isFile()) return file
    }
    return null
}

const exportsCache = new Map()
function exportsOf(file, seen = new Set()) {
    if (exportsCache.has(file)) return exportsCache.get(file)
    if (seen.has(file)) return { names: new Set(), all: true }
    seen.add(file)
    const source = fs.readFileSync(file, 'utf8')
    const names = new Set()
    let unknown = false
    if (file.endsWith('.mdx')) names.add('default')
    for (const m of source.matchAll(
        /export\s+(?:declare\s+)?(?:async\s+)?(?:const|let|var|function\*?|class|interface|type|enum|abstract\s+class)\s+([A-Za-z_$][\w$]*)/g
    ))
        names.add(m[1])
    for (const m of source.matchAll(/export\s+default\b/g)) names.add('default')
    for (const m of source.matchAll(/export\s+(?:type\s+)?\{([^}]*)\}(\s*from\s*['"]([^'"]+)['"])?/g)) {
        for (const part of m[1]
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/\/\/.*$/gm, '')
            .split(',')) {
            const name = part
                .trim()
                .replace(/^type\s+/, '')
                .split(/\s+as\s+/)
                .pop()
                ?.trim()
            if (name) names.add(name)
        }
    }
    for (const m of source.matchAll(/export\s+\*\s+from\s+['"]([^'"]+)['"]/g)) {
        const target = resolve(m[1], file)
        if (!target) unknown = true
        else exportsOf(target, seen).names.forEach((name) => name !== 'default' && names.add(name))
    }
    for (const m of source.matchAll(/export\s+\*\s+as\s+([\w$]+)/g)) names.add(m[1])
    // CommonJS or dynamic shapes we cannot read.
    if (/module\.exports|exports\.\w+\s*=/.test(source)) unknown = true
    const result = { names, all: unknown }
    exportsCache.set(file, result)
    return result
}

const processor = createProcessor({ remarkPlugins: [remarkFrontmatter] })
const require = createRequire(path.join(ROOT, 'package.json'))

// Other packages export types and CommonJS shapes that Node cannot list, so they are not checked.
const CHECKED_PACKAGES = ['@posthog/icons']
const packageCache = new Map()
async function packageExports(specifier) {
    if (!packageCache.has(specifier)) {
        packageCache.set(
            specifier,
            import(pathToFileURL(require.resolve(specifier)).href)
                .then((module) => ({ names: new Set(Object.keys(module)), all: false }))
                .catch(() => ({ names: new Set(), all: true }))
        )
    }
    return packageCache.get(specifier)
}

async function exportsFor(specifier, file) {
    const target = resolve(specifier, file)
    if (target) return /\.(tsx?|jsx?|mjs|mdx)$/.test(target) ? exportsOf(target) : null
    return CHECKED_PACKAGES.includes(specifier) ? packageExports(specifier) : null
}

async function report(file, specifier, wanted) {
    const result = await exportsFor(specifier, file)
    if (!result || result.all) return 0
    const { names } = result
    let count = 0
    for (const name of wanted) {
        if (!names.has(name)) {
            count++
            console.log(`${path.relative(ROOT, file)}: '${name}' is not exported by ${specifier}`)
        }
    }
    return count
}

let problems = 0
// MDX: real import statements only (code samples are not ESM nodes).
for (const file of fg.sync(['contents/**/*.mdx'], { absolute: true })) {
    for (const node of processor.parse(fs.readFileSync(file, 'utf8')).children) {
        if (node.type !== 'mdxjsEsm') continue
        for (const statement of node.data?.estree?.body ?? []) {
            if (statement.type !== 'ImportDeclaration' || statement.importKind === 'type') continue
            const wanted = statement.specifiers.flatMap((specifier) =>
                specifier.type === 'ImportDefaultSpecifier'
                    ? ['default']
                    : specifier.type === 'ImportSpecifier'
                      ? [specifier.imported.name ?? specifier.imported.value]
                      : []
            )
            problems += await report(file, statement.source.value, wanted)
        }
    }
}

const files = fg.sync(['src/**/*.{ts,tsx,js,jsx,mjs}', 'contents/**/*.{ts,tsx,js,jsx}'], {
    absolute: true,
    ignore: ['**/*.test.ts'],
})
for (const file of files) {
    const source = fs.readFileSync(file, 'utf8')
    for (const m of source.matchAll(
        /import\s+(type\s+)?(?:([\w$]+)\s*,?\s*)?(?:\{([^}]*)\})?\s*from\s*['"]([^'"]+)['"]/g
    )) {
        const [, typeOnly, defaultName, named, specifier] = m
        const wanted = []
        if (defaultName && !typeOnly) wanted.push('default')
        const list = (named ?? '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '')
        for (const part of list.split(',')) {
            const trimmed = part.trim()
            if (!trimmed || typeOnly || trimmed.startsWith('type ')) continue
            wanted.push(trimmed.split(/\s+as\s+/)[0].trim())
        }
        problems += await report(file, specifier, wanted)
    }
}
console.log(`\n${problems} missing exports`)
process.exitCode = problems ? 1 : 0

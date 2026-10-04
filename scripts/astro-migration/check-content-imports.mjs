#!/usr/bin/env node
// Lists ESM imports in content (MDX import statements and content .ts/.tsx/.js files) that do not
// resolve: relative paths, the repo's import roots (components/, hooks/, ...), the doc roots
// (onboarding/, product-analytics/, ...), and packages.
// Usage: node scripts/astro-migration/check-content-imports.mjs
import { createProcessor } from '@mdx-js/mdx'
import fg from 'fast-glob'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import remarkFrontmatter from 'remark-frontmatter'

const ROOT = process.cwd()
const require = createRequire(path.join(ROOT, 'package.json'))
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
const DOC_ROOTS = ['.cache/posthog-main-repo/docs', 'contents/docs']
const EXTENSIONS = ['', '.tsx', '.ts', '.jsx', '.js', '.mjs', '/index.tsx', '/index.ts', '/index.jsx', '/index.js']
const processor = createProcessor({ remarkPlugins: [remarkFrontmatter] })

const exists = (base) =>
    EXTENSIONS.some((extension) => fs.existsSync(base + extension) && fs.statSync(base + extension).isFile())

function resolves(specifier, importer) {
    if (specifier.startsWith('.')) return exists(path.resolve(path.dirname(importer), specifier))
    const first = specifier.split('/')[0]
    if (ALIASES[first]) return exists(path.join(ROOT, ALIASES[first], ...specifier.split('/').slice(1)))
    if (DOC_ROOTS.some((root) => fs.existsSync(path.join(ROOT, root, first)))) {
        return DOC_ROOTS.some((root) => exists(path.join(ROOT, root, specifier)))
    }
    try {
        require.resolve(specifier)
        return true
    } catch {
        try {
            // Packages without a CommonJS entry (ESM-only) still have a package.json.
            const name = specifier.startsWith('@') ? specifier.split('/').slice(0, 2).join('/') : first
            return fs.existsSync(path.join(ROOT, 'node_modules', name, 'package.json'))
        } catch {
            return false
        }
    }
}

function importsOf(file, source) {
    if (!file.endsWith('.mdx')) {
        return [...source.matchAll(/(?:^|\n)\s*(?:import|export)[^'"]*?from\s*['"]([^'"]+)['"]/g)].map((m) => m[1])
    }
    return processor
        .parse(source)
        .children.filter((node) => node.type === 'mdxjsEsm')
        .flatMap((node) => node.data?.estree?.body ?? [])
        .map((statement) => statement.source?.value)
        .filter((value) => typeof value === 'string')
}

let problems = 0
for (const file of fg.sync(['contents/**/*.{mdx,tsx,ts,jsx,js}'], { absolute: true })) {
    const source = fs.readFileSync(file, 'utf8')
    for (const specifier of importsOf(file, source)) {
        if (!resolves(specifier, file)) {
            problems++
            console.log(`${path.relative(ROOT, file)}: cannot resolve '${specifier}'`)
        }
    }
}
console.log(`\n${problems} unresolved imports`)
process.exitCode = problems ? 1 : 0

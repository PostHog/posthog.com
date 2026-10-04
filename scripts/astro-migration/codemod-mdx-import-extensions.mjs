#!/usr/bin/env node
// Adds `.mdx` to relative imports that point at an MDX file without naming the extension
// (`import Snippet from './_snippets/install'`). Webpack resolved those; Vite resolves only code
// extensions. Only real ESM imports are touched, not code samples.
// Usage: node scripts/astro-migration/codemod-mdx-import-extensions.mjs [glob...]
import { createProcessor } from '@mdx-js/mdx'
import fg from 'fast-glob'
import fs from 'node:fs'
import path from 'node:path'
import remarkFrontmatter from 'remark-frontmatter'

const CODE = ['.tsx', '.ts', '.jsx', '.js', '/index.tsx', '/index.ts', '/index.jsx', '/index.js']
const processor = createProcessor({ remarkPlugins: [remarkFrontmatter] })
const patterns = process.argv.slice(2)
const files = fg.sync(patterns.length ? patterns : ['contents/**/*.{mdx,tsx,ts,jsx,js}', 'src/**/*.{tsx,ts,jsx,js}'])

function needsMdx(specifier, importer) {
    if (!specifier.startsWith('.') || path.extname(specifier)) return false
    const base = path.resolve(path.dirname(importer), specifier)
    if (CODE.some((extension) => fs.existsSync(base + extension))) return false
    return fs.existsSync(`${base}.mdx`)
}

/** Source ranges of the import specifiers to rewrite. */
function specifierRanges(file, source) {
    if (!file.endsWith('.mdx')) {
        return [...source.matchAll(/(?:^|\n)\s*import[^'"]*?from\s*(['"])(\.[^'"]+)\1/g)].map((m) => {
            const start = m.index + m[0].lastIndexOf(m[2])
            return { start, end: start + m[2].length, specifier: m[2] }
        })
    }
    const ranges = []
    for (const node of processor.parse(source).children) {
        if (node.type !== 'mdxjsEsm') continue
        for (const statement of node.data?.estree?.body ?? []) {
            const literal = statement.source
            if (statement.type !== 'ImportDeclaration' || typeof literal?.value !== 'string') continue
            // estree offsets are absolute in the file; skip the quote characters.
            ranges.push({ start: literal.start + 1, end: literal.end - 1, specifier: literal.value })
        }
    }
    return ranges
}

let changed = 0
for (const file of files) {
    const source = fs.readFileSync(file, 'utf8')
    if (!source.includes('import')) continue
    const edits = specifierRanges(file, source).filter(({ specifier }) => needsMdx(specifier, file))
    if (!edits.length) continue
    let result = source
    for (const { start, end, specifier } of edits.sort((a, b) => b.start - a.start)) {
        if (result.slice(start, end) !== specifier) throw new Error(`Offset mismatch in ${file} for ${specifier}`)
        result = result.slice(0, start) + `${specifier}.mdx` + result.slice(end)
    }
    fs.writeFileSync(file, result)
    changed++
}
console.log(`mdx import extensions: rewrote ${changed} files`)

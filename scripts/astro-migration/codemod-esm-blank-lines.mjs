#!/usr/bin/env node
// Puts a blank line before `import`/`export` statements that directly follow a paragraph line. MDX 1
// read them as ESM anyway; MDX 3 reads them as paragraph text, so the import never runs and the
// component it names is undefined. Only lines that MDX parsed into a paragraph are touched.
// Usage: node scripts/astro-migration/codemod-esm-blank-lines.mjs [--dry] [glob...]
import { createProcessor } from '@mdx-js/mdx'
import fg from 'fast-glob'
import fs from 'node:fs'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

const ESM =
    /^(?:import\s+(?:[\w$]+|\{[^}]*\}|\*\s+as\s+[\w$]+)(?:\s*,\s*\{[^}]*\})?\s+from\s+['"][^'"]+['"];?|export\s+(?:const|default|function)\b.*)\s*$/
const processor = createProcessor({ remarkPlugins: [remarkFrontmatter, remarkGfm] })
const args = process.argv.slice(2)
const dry = args.includes('--dry')
const patterns = args.filter((arg) => arg !== '--dry')
const files = fg.sync(patterns.length ? patterns : ['contents/**/*.mdx'])

let changed = 0
for (const file of files) {
    const source = fs.readFileSync(file, 'utf8')
    let tree
    try {
        tree = processor.parse(source)
    } catch {
        continue
    }
    const lines = source.split('\n')
    const targets = new Set()
    visit(tree, 'paragraph', (node) => {
        const { start, end } = node.position
        // Lines after the paragraph's first line that are ESM statements.
        for (let line = start.line + 1; line <= end.line; line++) {
            if (ESM.test(lines[line - 1])) targets.add(line - 1)
        }
    })
    if (!targets.size) continue
    changed++
    for (const index of targets) console.log(`${file}:${index + 1}: ${lines[index].trim()}`)
    if (dry) continue
    const result = lines.flatMap((line, index) => (targets.has(index) ? ['', line] : [line]))
    fs.writeFileSync(file, result.join('\n'))
}
console.log(`esm blank lines: ${dry ? 'would rewrite' : 'rewrote'} ${changed} files`)

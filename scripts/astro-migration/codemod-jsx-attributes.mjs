#!/usr/bin/env node
// Rewrites HTML-style attributes on JSX elements in content to React's form:
// `style="color: red"` → `style={{ color: 'red' }}`, `class` → `className`, `for` → `htmlFor`.
// Attributes are found through the MDX syntax tree, so code samples are never touched.
// Usage: node scripts/astro-migration/codemod-jsx-attributes.mjs [glob...]
import { createProcessor } from '@mdx-js/mdx'
import fg from 'fast-glob'
import fs from 'node:fs/promises'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import styleToJs from 'style-to-js'
import { visit } from 'unist-util-visit'

const RENAMES = { class: 'className', for: 'htmlFor' }
const processor = createProcessor({ remarkPlugins: [remarkFrontmatter, remarkGfm] })
const patterns = process.argv.slice(2)
const files = await fg(patterns.length ? patterns : ['contents/**/*.mdx'])

const quote = (value) => `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
const styleObject = (css) =>
    `{{ ${Object.entries(styleToJs(css, { reactCompat: true }))
        .map(([key, value]) => `${/^[A-Za-z_$][\w$]*$/.test(key) ? key : quote(key)}: ${quote(value)}`)
        .join(', ')} }}`

let changedFiles = 0
for (const file of files) {
    const source = await fs.readFile(file, 'utf8')
    if (!/\b(style|class|for)=/.test(source)) continue
    const edits = []
    visit(processor.parse(source), ['mdxJsxFlowElement', 'mdxJsxTextElement'], (node) => {
        for (const attribute of node.attributes) {
            if (attribute.type !== 'mdxJsxAttribute' || !attribute.position) continue
            const rename = RENAMES[attribute.name]
            const isStyleString = attribute.name === 'style' && typeof attribute.value === 'string'
            if (!rename && !isStyleString) continue
            const name = rename ?? attribute.name
            const value = isStyleString
                ? styleObject(attribute.value)
                : source
                      .slice(attribute.position.start.offset, attribute.position.end.offset)
                      .slice(attribute.name.length + 1)
            edits.push({
                start: attribute.position.start.offset,
                end: attribute.position.end.offset,
                text: value ? `${name}=${value}` : name,
            })
        }
    })
    if (!edits.length) continue
    let result = source
    for (const { start, end, text } of edits.sort((a, b) => b.start - a.start)) {
        result = result.slice(0, start) + text + result.slice(end)
    }
    await fs.writeFile(file, result)
    changedFiles++
}
console.log(`jsx attributes: rewrote ${changedFiles} files`)

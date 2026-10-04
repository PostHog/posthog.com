#!/usr/bin/env node
// Puts the content of phrasing HTML elements (<p>, <span>, <a>, <h1>…) on one line when it sits on
// its own lines:
//   <p className="x">              →   <p className="x">We have <strong>5</strong> products.</p>
//       We have <strong>5</strong>
//       products.
//   </p>
// MDX 1 read such a block as JSX. MDX 3 reads the inner lines as Markdown and wraps them in a
// paragraph, so the page gets <p><p>…</p></p> (invalid HTML that the browser splits, which breaks
// hydration) and extra spacing. Lines are joined as JSX joins them: text and text with a space,
// anything next to a tag or `{…}` with nothing. Elements with block Markdown inside are reported.
// Usage: node scripts/astro-migration/codemod-inline-phrasing-jsx.mjs [--dry] [glob...]
import { createProcessor } from '@mdx-js/mdx'
import fg from 'fast-glob'
import fs from 'node:fs'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

const PHRASING = new Set([
    'p',
    'span',
    'a',
    'strong',
    'em',
    'b',
    'i',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'label',
    'button',
    'small',
])
const INLINE_CHILDREN = new Set([
    'paragraph',
    'text',
    'mdxJsxTextElement',
    'mdxJsxFlowElement',
    'mdxTextExpression',
    'mdxFlowExpression',
])
const processor = createProcessor({ remarkPlugins: [remarkFrontmatter, remarkGfm] })
const args = process.argv.slice(2)
const dry = args.includes('--dry')
const patterns = args.filter((arg) => arg !== '--dry')
const files = fg.sync(patterns.length ? patterns : ['contents/**/*.mdx'])

/** Joins trimmed lines the way JSX does. */
function joinLines(text) {
    const lines = text
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
    return lines.reduce((result, line) => {
        if (!result) return line
        const tight = /[>}]$/.test(result) || /^[<{]/.test(line)
        return result + (tight ? '' : ' ') + line
    }, '')
}

/** Every node in the element is inline content or a paragraph of it. */
function inlineOnly(node) {
    let ok = true
    visit(node, (child) => {
        if (child === node) return
        if (child.type === 'paragraph' || child.type === 'mdxJsxFlowElement') return
        if (/^(list|listItem|code|heading|table|blockquote|thematicBreak|html)$/.test(child.type)) ok = false
    })
    return ok && node.children.every((child) => INLINE_CHILDREN.has(child.type))
}

let changed = 0
for (const file of files) {
    const source = fs.readFileSync(file, 'utf8')
    let tree
    try {
        tree = processor.parse(source)
    } catch {
        continue
    }
    const targets = []
    visit(tree, 'mdxJsxFlowElement', (node) => {
        if (!PHRASING.has(node.name) || !node.children.some((child) => child.type === 'paragraph')) return
        if (!inlineOnly(node)) {
            console.log(`${file}:${node.position.start.line}: <${node.name}> has block content, left as is`)
            return 'skip'
        }
        targets.push(node)
        return 'skip' // nested elements collapse with their parent
    })
    if (!targets.length) continue
    let result = source
    for (const node of targets.sort((a, b) => b.position.start.offset - a.position.start.offset)) {
        const start = node.position.start.offset
        const end = node.position.end.offset
        const innerStart = node.children[0].position.start.offset
        const innerEnd = node.children.at(-1).position.end.offset
        const open = source.slice(start, innerStart).trimEnd()
        const close = source.slice(innerEnd, end).trimStart()
        const inner = joinLines(source.slice(innerStart, innerEnd))
        console.log(`${file}:${node.position.start.line}: <${node.name}>`)
        result = result.slice(0, start) + open + inner + close + result.slice(end)
    }
    changed++
    if (!dry) fs.writeFileSync(file, result)
}
console.log(`inline phrasing jsx: ${dry ? 'would rewrite' : 'rewrote'} ${changed} files`)

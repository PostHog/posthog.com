#!/usr/bin/env node
// Rewrites code fence meta strings to JSX attribute syntax, which rehype-mdx-code-props reads:
//   ```js file=React Native focusOnLines=1-3   →   ```js file="React Native" focusOnLines="1-3"
//   ```sql runInPostHog=false                  →   ```sql runInPostHog={false}
//   ```js SecondScreen.js                       →   ```js file="SecondScreen.js"
//   ```vue filename=index.vue                  →   ```vue file="index.vue"
// MDX 1 split unquoted values at the first space, so `file=React Native` showed "React"; the whole
// value is the author's intent. Code fences are found through the MDX syntax tree.
// Usage: node scripts/astro-migration/codemod-code-meta.mjs [glob...]
import { createProcessor } from '@mdx-js/mdx'
import fg from 'fast-glob'
import fs from 'node:fs/promises'
import remarkFrontmatter from 'remark-frontmatter'
import { visit } from 'unist-util-visit'

const KEYS = ['file', 'filename', 'label', 'focusOnLines', 'runInPostHog']
const processor = createProcessor({ remarkPlugins: [remarkFrontmatter] })
const patterns = process.argv.slice(2)
const files = await fg(patterns.length ? patterns : ['contents/**/*.mdx'])

const quote = (value) => `"${value.replace(/"/g, '&quot;')}"`

/** `file=React Native label=x` → { file: 'React Native', label: 'x' }; a bare first word is the file name. */
export function parseMeta(meta) {
    const props = {}
    const keyAt = new RegExp(`(?:^|\\s)(${KEYS.join('|')})=`, 'g')
    const starts = [...meta.matchAll(keyAt)].map((match) => ({
        key: match[1],
        index: match.index,
        valueStart: match.index + match[0].length,
    }))
    if (!starts.length || starts[0].index > 0) {
        const bare = meta.slice(0, starts[0]?.index ?? meta.length).trim()
        if (bare) props.file = bare
    }
    starts.forEach((start, i) => {
        const value = meta
            .slice(start.valueStart, starts[i + 1]?.index ?? meta.length)
            .trim()
            .replace(/^["']|["']$/g, '')
        props[start.key === 'filename' ? 'file' : start.key] = value
    })
    return props
}

function toAttributes(props) {
    return Object.entries(props)
        .map(([key, value]) =>
            key === 'runInPostHog' && /^(true|false)$/.test(value) ? `${key}={${value}}` : `${key}=${quote(value)}`
        )
        .join(' ')
}

let changedFiles = 0
for (const file of files) {
    const source = await fs.readFile(file, 'utf8')
    const lines = source.split('\n')
    let changed = false
    visit(processor.parse(source), 'code', (node) => {
        if (!node.meta || /^\s*\w+=["{]/.test(node.meta)) return
        const index = node.position.start.line - 1
        const match = lines[index].match(/^(\s*(?:>\s*)*)(`{3,}|~{3,})(\S*)\s+(.*)$/)
        if (!match || match[4].trim() !== node.meta.trim()) return
        lines[index] = `${match[1]}${match[2]}${match[3]} ${toAttributes(parseMeta(node.meta))}`
        changed = true
    })
    if (changed) {
        await fs.writeFile(file, lines.join('\n'))
        changedFiles++
    }
}
console.log(`code meta: rewrote ${changedFiles} files`)

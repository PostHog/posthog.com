#!/usr/bin/env node
// gatsby-plugin-mdx gave every MDX file a `_frontmatter` variable. MDX 3 has none. The only use is
// `<FeatureAvailability availability={_frontmatter.availability.features.<key>} />`, so this writes
// that value into the tag and removes `availability.features` from the frontmatter (nothing else
// reads it; the template reads only availability.free/selfServe/teams/enterprise).
// Usage: node scripts/astro-migration/codemod-frontmatter-global.mjs
import fg from 'fast-glob'
import fs from 'node:fs'
import { parse } from 'yaml'

const USE = /_frontmatter\.availability\.features\.(\w+)/g

let changed = 0
for (const file of fg.sync(['contents/**/*.mdx'])) {
    const source = fs.readFileSync(file, 'utf8')
    if (!source.includes('_frontmatter')) continue
    const match = source.match(/^---\n([\s\S]*?)\n---\n/)
    const features = parse(match[1])?.availability?.features ?? {}
    let body = source.slice(match[0].length).replace(USE, (_, key) => {
        if (!features[key]) throw new Error(`${file}: no availability.features.${key}`)
        const entries = Object.entries(features[key]).map(([name, value]) => `${name}: ${JSON.stringify(value)}`)
        return `{ ${entries.join(', ')} }`
    })
    if (body.includes('_frontmatter')) throw new Error(`${file}: other _frontmatter use`)
    // Drop the `features:` block: its line and every following line indented deeper.
    const lines = match[1].split('\n')
    const start = lines.findIndex((line) => /^\s+features:\s*$/.test(line))
    const indent = lines[start].search(/\S/)
    let end = start + 1
    while (end < lines.length && (lines[end].trim() === '' || lines[end].search(/\S/) > indent)) end++
    lines.splice(start, end - start)
    fs.writeFileSync(file, `---\n${lines.join('\n')}\n---\n${body}`)
    changed++
}
console.log(`frontmatter global: rewrote ${changed} files`)

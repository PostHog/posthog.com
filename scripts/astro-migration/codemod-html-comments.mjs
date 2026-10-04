#!/usr/bin/env node
// MDX 2+ rejects HTML comments. Rewrites `<!-- x -->` to `{/* x */}` outside code.
// Usage: node scripts/astro-migration/codemod-html-comments.mjs [glob...]
import fg from 'fast-glob'
import fs from 'node:fs/promises'

const patterns = process.argv.slice(2)
const files = await fg(patterns.length ? patterns : ['contents/**/*.{md,mdx}'], { ignore: ['**/node_modules/**'] })

export function convert(source) {
    const lines = source.split('\n')
    let fence = null
    let inFrontmatter = false
    let inComment = false
    let changed = false

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        if (i === 0 && line === '---') {
            inFrontmatter = true
            continue
        }
        if (inFrontmatter) {
            if (line === '---') inFrontmatter = false
            continue
        }
        const fenceMatch = !inComment && line.match(/^\s*(`{3,}|~{3,})/)
        if (fence) {
            if (fenceMatch && fenceMatch[1][0] === fence[0] && fenceMatch[1].length >= fence.length) fence = null
            continue
        }
        if (fenceMatch) {
            fence = fenceMatch[1]
            continue
        }

        let out = ''
        let rest = line
        while (rest.length) {
            if (inComment) {
                const end = rest.indexOf('-->')
                if (end === -1) {
                    out += rest.replaceAll('*/', '* /')
                    rest = ''
                } else {
                    out += rest.slice(0, end).replaceAll('*/', '* /') + '*/}'
                    rest = rest.slice(end + 3)
                    inComment = false
                    changed = true
                }
                continue
            }
            // Skip inline code spans so `<!-- -->` written as code stays literal.
            const tick = rest.indexOf('`')
            const open = rest.indexOf('<!--')
            if (tick !== -1 && (open === -1 || tick < open)) {
                const run = rest.slice(tick).match(/^`+/)[0]
                const close = rest.indexOf(run, tick + run.length)
                const stop = close === -1 ? rest.length : close + run.length
                out += rest.slice(0, stop)
                rest = rest.slice(stop)
                continue
            }
            if (open === -1) {
                out += rest
                rest = ''
                continue
            }
            out += rest.slice(0, open) + '{/*'
            rest = rest.slice(open + 4)
            inComment = true
        }
        lines[i] = out
    }
    return changed ? lines.join('\n') : source
}

let count = 0
for (const file of files) {
    const source = await fs.readFile(file, 'utf8')
    if (!source.includes('<!--')) continue
    const result = convert(source)
    if (result !== source) {
        await fs.writeFile(file, result)
        count++
    }
}
console.log(`html comments: rewrote ${count} files`)

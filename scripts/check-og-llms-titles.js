#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * Check that docs OG cards say the same thing as llms.txt.
 *
 * Two generators describe each docs page to the outside world:
 *
 *   1. the OG card (gatsby/postBuildTasks.ts), which shows frontmatter `title`
 *      and the section name from src/templates/OG/sections.json
 *   2. llms.txt (gatsby/rawMarkdownUtils.ts), which lists the page <title>,
 *      that is `seo.metaTitle` when it is set, else `title`
 *
 * So a docs page with a different `seo.metaTitle` shows one title on its card and
 * another to agents. A section prefix that no longer exists makes its cards fall
 * back to the generic "Docs" card. Both fail this check.
 *
 *   node scripts/check-og-llms-titles.js
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const CONTENTS = path.join(ROOT, 'contents')
const SECTIONS = require(path.join(ROOT, 'src', 'templates', 'OG', 'sections.json'))

const unquote = (value) => {
    const v = value.trim()
    if (v.startsWith("'") && v.endsWith("'")) return v.slice(1, -1).replace(/''/g, "'")
    if (v.startsWith('"') && v.endsWith('"')) return v.slice(1, -1).replace(/\\"/g, '"')
    return v
}

// Reads `title` and `seo.metaTitle` from YAML frontmatter, without a YAML dependency.
const readTitles = (file) => {
    const match = fs.readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)
    if (!match) return {}
    const lines = match[1].split(/\r?\n/)
    const title = lines.map((line) => line.match(/^title:\s*(.+)$/)).find(Boolean)
    let metaTitle
    const seoStart = lines.findIndex((line) => /^seo:\s*$/.test(line))
    if (seoStart !== -1) {
        for (const line of lines.slice(seoStart + 1)) {
            if (!/^\s/.test(line)) break
            const m = line.match(/^\s+metaTitle:\s*(.+)$/)
            if (m) metaTitle = unquote(m[1])
        }
    }
    return { title: title && unquote(title[1]), metaTitle }
}

const walk = (dir) =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) return entry.name.startsWith('_') ? [] : walk(full)
        return /\.mdx?$/.test(entry.name) ? [full] : []
    })

const errors = []

for (const { prefix } of SECTIONS) {
    if (!fs.existsSync(path.join(CONTENTS, prefix))) {
        errors.push(`src/templates/OG/sections.json: "${prefix}" has no folder in contents/`)
    }
}

const docsPages = walk(path.join(CONTENTS, 'docs'))
const untitled = []
for (const file of docsPages) {
    const { title, metaTitle } = readTitles(file)
    const relative = path.relative(ROOT, file)
    if (!title) {
        untitled.push(relative)
        continue
    }
    // llms.txt strips these suffixes from the <title> before it lists the page.
    const llmsTitle = metaTitle && metaTitle.replace(/(?: - (?:Docs|PostHog))+$/, '')
    if (llmsTitle && llmsTitle !== title) {
        errors.push(`${relative}: the OG card shows "${title}", llms.txt lists "${llmsTitle}" (seo.metaTitle)`)
    }
}

if (untitled.length > 0) {
    console.warn(`! ${untitled.length} docs page(s) have no frontmatter title, so they get no OG card:`)
    untitled.forEach((file) => console.warn(`    ${file}`))
}

if (errors.length > 0) {
    console.error(`Found ${errors.length} problem(s) with OG card titles:\n`)
    errors.forEach((error) => console.error(`  ✗ ${error}`))
    console.error('')
    process.exit(1)
}

console.log(`✓ Checked ${docsPages.length} docs pages and ${SECTIONS.length} OG sections against llms.txt titles`)

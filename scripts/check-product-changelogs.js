#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * Check that every product changelog page is wired up.
 *
 * A `<ProductChangelog product="X" />` page needs three things, and only the
 * first two are visible in the page itself:
 *
 *   1. contents/docs/<slug>/changelog.mdx        the page
 *   2. a /docs/<slug>/changelog entry in navs    the sidebar link
 *   3. a `productConfigMap` entry in the         the Strapi labels it filters on
 *      ProductChangelog component
 *
 * Miss the third and the page renders with no filters, which the roadmap query
 * reads as "every completed entry" — so it shows the whole company changelog
 * instead of that product's. This catches that before it ships.
 *
 *   node scripts/check-product-changelogs.js
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const DOCS_DIR = path.join(ROOT, 'contents', 'docs')
const COMPONENT = path.join(ROOT, 'src', 'components', 'Docs', 'ProductChangelog.tsx')
const NAVS = path.join(ROOT, 'src', 'navs', 'index.js')

// Pull the `productConfigMap` object literal out of the component and return the
// keys that actually filter something. Throws rather than returning an empty set,
// so a refactor of the component fails the check instead of silently passing it.
const readConfiguredProducts = (source) => {
    const start = source.indexOf('const productConfigMap')
    if (start === -1) {
        throw new Error(`Could not find productConfigMap in ${path.relative(ROOT, COMPONENT)}`)
    }

    const open = source.indexOf('{', start)
    let depth = 0
    let end = -1
    for (let i = open; i < source.length; i++) {
        if (source[i] === '{') depth++
        if (source[i] === '}') {
            depth--
            if (depth === 0) {
                end = i
                break
            }
        }
    }
    if (end === -1) {
        throw new Error(`Could not parse productConfigMap in ${path.relative(ROOT, COMPONENT)}`)
    }

    const body = source.slice(open + 1, end)
    const entry = /(?:'([^']+)'|"([^"]+)"|([A-Za-z][\w]*))\s*:\s*\{([^}]*)\}/g
    const configured = new Set()

    let match
    while ((match = entry.exec(body)) !== null) {
        const key = match[1] || match[2] || match[3]
        const value = match[4]
        // Mirrors isConfigured() in the component: a topic or at least one team.
        if (/\btopic\s*:/.test(value) || /\bteams\s*:\s*\[[^\]]*\S[^\]]*\]/.test(value)) {
            configured.add(key.toLowerCase())
        }
    }

    if (configured.size === 0) {
        throw new Error(`Parsed no entries from productConfigMap in ${path.relative(ROOT, COMPONENT)}`)
    }

    return configured
}

const changelogPages = fs
    .readdirSync(DOCS_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => ({ slug: dirent.name, file: path.join(DOCS_DIR, dirent.name, 'changelog.mdx') }))
    .filter(({ file }) => fs.existsSync(file))

const configured = readConfiguredProducts(fs.readFileSync(COMPONENT, 'utf8'))
const navs = fs.readFileSync(NAVS, 'utf8')

const errors = []

for (const { slug, file } of changelogPages) {
    const relative = path.relative(ROOT, file)
    const contents = fs.readFileSync(file, 'utf8')
    const product = contents.match(/<ProductChangelog\s+product=["']([^"']+)["']/)?.[1]

    if (!product) {
        errors.push(`${relative} does not render <ProductChangelog product="..." />`)
        continue
    }

    if (!configured.has(product.toLowerCase())) {
        errors.push(
            `${relative} renders product="${product}", which has no entry in productConfigMap ` +
                `(${path.relative(ROOT, COMPONENT)}). Without one the page renders the entire changelog.`
        )
    }

    if (!navs.includes(`/docs/${slug}/changelog`)) {
        errors.push(`${relative} has no /docs/${slug}/changelog link in ${path.relative(ROOT, NAVS)}`)
    }
}

if (errors.length > 0) {
    console.error(`Found ${errors.length} problem(s) with product changelog pages:\n`)
    errors.forEach((error) => console.error(`  ✗ ${error}`))
    console.error('')
    process.exit(1)
}

console.log(`✓ Checked ${changelogPages.length} product changelog pages`)

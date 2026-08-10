#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs')
const path = require('path')

const CONFIG = {
    SITEMAP_URL: 'https://posthog.com/sitemap/sitemap-0.xml',
    SRC_DIR: 'src',
    MIN_SITEMAP_PAGES: 1000,
    EXCLUDED_EXTENSIONS: [
        '.css',
        '.js',
        '.json',
        '.xml',
        '.svg',
        '.png',
        '.jpg',
        '.jpeg',
        '.gif',
        '.woff',
        '.woff2',
        '.md',
        '.mdx',
        '.rss',
        '.pdf',
        '.zip',
        '.ico',
        '.txt',
        '.webp',
        '.mp3',
        '.mp4',
    ],
    EXCLUDE_PATTERNS: [
        '/community/', // powered by Strapi
        '/teams/', // powered by Strapi
        '/careers/', // powered by Ashby
        '/api/', // Vercel serverless functions
    ],
    SOURCE_EXTENSIONS: /\.(tsx|ts|jsx|js)$/,
    LINK_PATTERNS: [/\b(?:to|href)=["'](\/[^"'\s]*)["']/g, /\b(?:to|href|url|link):\s*["'](\/[^"'\s]*)["']/g],
}

async function getSitemapPages() {
    const response = await fetch(CONFIG.SITEMAP_URL)
    if (!response.ok) {
        throw new Error(`Failed to fetch sitemap: ${response.status}`)
    }
    const xml = await response.text()
    const pages = new Set()
    for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
        const url = match[1].trim()
        if (url.startsWith('https://posthog.com')) {
            pages.add(url.replace('https://posthog.com', '').replace(/\/$/, '') || '/')
        }
    }
    if (pages.size < CONFIG.MIN_SITEMAP_PAGES) {
        throw new Error(`Sitemap only contained ${pages.size} pages, expected at least ${CONFIG.MIN_SITEMAP_PAGES}`)
    }
    return pages
}

function getRedirectSources() {
    const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'))
    return [...(vercelConfig.redirects || []), ...(vercelConfig.rewrites || [])].map((entry) => entry.source)
}

function matchesRedirect(url, sources) {
    return sources.some((source) => {
        const dynamicStart = Math.min(...[source.indexOf('/:'), source.indexOf('(')].filter((index) => index !== -1))
        if (dynamicStart !== Infinity) {
            const prefix = source.slice(0, dynamicStart)
            return prefix !== '' && (url === prefix || url.startsWith(prefix.endsWith('/') ? prefix : prefix + '/'))
        }
        return url === source
    })
}

function findSourceFiles(dir) {
    const files = []
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            files.push(...findSourceFiles(fullPath))
        } else if (CONFIG.SOURCE_EXTENSIONS.test(entry.name)) {
            files.push(fullPath)
        }
    }
    return files
}

function extractLinks(filePath) {
    const lines = fs.readFileSync(filePath, 'utf8').split('\n')
    const links = []
    lines.forEach((line, index) => {
        for (const pattern of CONFIG.LINK_PATTERNS) {
            pattern.lastIndex = 0
            let match
            while ((match = pattern.exec(line)) !== null) {
                links.push({ url: match[1], line: index + 1 })
            }
        }
    })
    return links
}

function normalizeUrl(url) {
    return url.split(/[?#]/)[0].replace(/\/$/, '') || '/'
}

function shouldExclude(url) {
    if (url.startsWith('//')) {
        return true
    }
    const base = normalizeUrl(url)
    if (CONFIG.EXCLUDE_PATTERNS.some((pattern) => base.includes(pattern))) {
        return true
    }
    return CONFIG.EXCLUDED_EXTENSIONS.some((extension) => base.endsWith(extension))
}

function checkLinks(pages, redirectSources, files) {
    const brokenByUrl = new Map()
    const stats = { totalLinks: 0, excludedLinks: 0, redirectedLinks: 0 }

    for (const file of files) {
        for (const { url, line } of extractLinks(file)) {
            stats.totalLinks++
            if (shouldExclude(url)) {
                stats.excludedLinks++
                continue
            }
            const base = normalizeUrl(url)
            if (pages.has(base)) {
                continue
            }
            if (matchesRedirect(base, redirectSources)) {
                stats.redirectedLinks++
                continue
            }
            if (!brokenByUrl.has(base)) {
                brokenByUrl.set(base, [])
            }
            brokenByUrl.get(base).push({ file: path.relative(process.cwd(), file), line, link: url })
        }
    }

    return { brokenByUrl, stats }
}

function displayResults(brokenByUrl) {
    if (brokenByUrl.size === 0) {
        console.log('\nNo broken links found! 🎉')
        return
    }

    console.log('\nBroken links found:\n')
    const sorted = [...brokenByUrl.entries()].sort((a, b) => a[0].localeCompare(b[0]))
    for (const [url, locations] of sorted) {
        console.log(`Broken URL: https://posthog.com${url}`)
        for (const location of locations) {
            console.log(`    ${location.file}:${location.line}`)
        }
        console.log('-'.repeat(80))
    }
}

function writeResultsToFile(brokenByUrl, stats, filesScanned, outputPath) {
    if (!outputPath) {
        return
    }

    const resultsDir = path.join(process.cwd(), outputPath)
    if (!fs.existsSync(resultsDir)) {
        fs.mkdirSync(resultsDir, { recursive: true })
    }

    const results = {
        timestamp: new Date().toISOString(),
        summary: {
            sourceFiles: filesScanned,
            totalLinks: stats.totalLinks,
            excludedLinks: stats.excludedLinks,
            redirectedLinks: stats.redirectedLinks,
            brokenLinks: brokenByUrl.size,
        },
        brokenLinks: [...brokenByUrl.entries()]
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([url, locations]) => ({
                brokenUrl: `https://posthog.com${url}`,
                locations,
            })),
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const resultsFile = path.join(resultsDir, `src-link-check-${timestamp}.json`)
    fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2))
    console.log(`\nResults saved to: ${resultsFile}`)
}

async function main() {
    console.log('Starting source code link validation...')

    const outputPath = process.argv[2] || null

    const pages = await getSitemapPages()
    console.log(`Found ${pages.size} pages in sitemap`)

    const redirectSources = getRedirectSources()
    console.log(`Found ${redirectSources.length} redirect/rewrite patterns`)

    const files = findSourceFiles(CONFIG.SRC_DIR)
    const { brokenByUrl, stats } = checkLinks(pages, redirectSources, files)

    displayResults(brokenByUrl)

    console.log(`\nScanned ${files.length} source files`)
    console.log(`Processed ${stats.totalLinks} internal links`)
    console.log(`Found ${stats.excludedLinks} excluded links (skipped)`)
    console.log(`Found ${stats.redirectedLinks} redirected links (skipped)`)
    console.log(`Found ${brokenByUrl.size} broken links`)

    writeResultsToFile(brokenByUrl, stats, files.length, outputPath)

    process.exit(brokenByUrl.size > 0 ? 1 : 0)
}

main().catch((error) => {
    console.error(`Error: ${error.message}`)
    process.exit(2)
})

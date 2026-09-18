#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs')
const path = require('path')

const CONFIG = {
    SITEMAP_URL: 'https://posthog.com/sitemap/sitemap-0.xml',
    LOCAL_SITEMAP_PATH: path.join(process.cwd(), 'public', 'sitemap', 'sitemap-0.xml'),
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

async function getSitemapXml() {
    if (fs.existsSync(CONFIG.LOCAL_SITEMAP_PATH)) {
        console.log(`Using built sitemap at ${path.relative(process.cwd(), CONFIG.LOCAL_SITEMAP_PATH)}`)
        return fs.readFileSync(CONFIG.LOCAL_SITEMAP_PATH, 'utf8')
    }
    console.log(`Fetching ${CONFIG.SITEMAP_URL}`)
    const response = await fetch(CONFIG.SITEMAP_URL)
    if (!response.ok) {
        throw new Error(`Failed to fetch sitemap: ${response.status}`)
    }
    return response.text()
}

async function getSitemapPages() {
    const xml = await getSitemapXml()
    const pages = new Set()
    for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
        const url = match[1].trim()
        if (url === 'https://posthog.com' || url.startsWith('https://posthog.com/')) {
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
                links.push({ url: match[1], line: index + 1, text: line.trim().slice(0, 160) })
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
        for (const { url, line, text } of extractLinks(file)) {
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
            brokenByUrl.get(base).push({ file: path.relative(process.cwd(), file), line, link: url, text })
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

function bigrams(value) {
    const grams = new Set()
    for (let i = 0; i < value.length - 1; i++) {
        grams.add(value.slice(i, i + 2))
    }
    return grams
}

function similarity(a, b) {
    const gramsA = bigrams(a)
    const gramsB = bigrams(b)
    if (gramsA.size === 0 || gramsB.size === 0) {
        return 0
    }
    let shared = 0
    for (const gram of gramsA) {
        if (gramsB.has(gram)) {
            shared++
        }
    }
    return (2 * shared) / (gramsA.size + gramsB.size)
}

function suggestTargets(brokenPath, pages) {
    const lastSegment = brokenPath.split('/').filter(Boolean).pop() || ''
    const candidates = []
    for (const page of pages) {
        const score = similarity(brokenPath, page) + (page.endsWith(`/${lastSegment}`) ? 0.3 : 0)
        if (score >= 0.6) {
            candidates.push({ page, score })
        }
    }
    return candidates
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map((candidate) => candidate.page)
}

function writeMarkdownReport(brokenByUrl, pages, resultsDir) {
    const sorted = [...brokenByUrl.entries()].sort((a, b) => a[0].localeCompare(b[0]))
    const lines = ['# Broken internal links on posthog.com', '', `Generated: ${new Date().toISOString()}`]
    if (process.env.GITHUB_SHA) {
        lines.push(`Commit: ${process.env.GITHUB_SHA}`)
    }
    lines.push(
        '',
        '## Instructions',
        '',
        'You are fixing broken internal links in the posthog.com repository. Every URL below returns a 404: it is not in the sitemap and no redirect covers it. For each item:',
        '',
        '1. Open every listed location and read the link in context.',
        '2. Pick the fix:',
        '    - Fix typos in place.',
        '    - If the page moved, point the link at its replacement. "Possible targets" lists similar live URLs from the sitemap. Verify a target is actually the right page before using it, the suggestions are fuzzy matches, not answers.',
        '    - If the destination is gone with no replacement, remove the link but keep the surrounding text. Delete a whole nav or menu entry when its only purpose is linking to the dead page.',
        '3. Fix the link at the source. Do not add redirects to vercel.json.',
        '4. Tick the checkbox once fixed.',
        '',
        'When every item is done, run `pnpm check-src-links` and confirm it reports 0 broken links.',
        '',
        `## Broken links (${sorted.length})`,
        ''
    )
    sorted.forEach(([url, locations], index) => {
        lines.push(`### ${index + 1}. ${url}`, '', '- [ ] Fixed', '', 'Locations:', '')
        for (const location of locations) {
            lines.push(`- \`${location.file}:${location.line}\``)
            lines.push('')
            lines.push('    ```')
            lines.push(`    ${location.text.replace(/```/g, '')}`)
            lines.push('    ```')
        }
        const suggestions = suggestTargets(url, pages)
        if (suggestions.length > 0) {
            lines.push('', 'Possible targets:', '')
            for (const suggestion of suggestions) {
                lines.push(`- ${suggestion}`)
            }
        }
        lines.push('')
    })
    const reportFile = path.join(resultsDir, 'broken-links-report.md')
    fs.writeFileSync(reportFile, lines.join('\n'))
    console.log(`Report saved to: ${reportFile}`)
}

function writeResultsToFile(brokenByUrl, stats, filesScanned, outputPath, pages) {
    if (!outputPath) {
        return
    }

    const resultsDir = path.join(process.cwd(), outputPath)
    if (!fs.existsSync(resultsDir)) {
        fs.mkdirSync(resultsDir, { recursive: true })
    }

    writeMarkdownReport(brokenByUrl, pages, resultsDir)

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

    writeResultsToFile(brokenByUrl, stats, files.length, outputPath, pages)

    process.exit(brokenByUrl.size > 0 ? 1 : 0)
}

main().catch((error) => {
    console.error(`Error: ${error.message}`)
    process.exit(2)
})

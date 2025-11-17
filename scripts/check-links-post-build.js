#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * PostHog Link Checker - Post-Build Validation
 *
 * This script validates internal links and anchor links against the ACTUAL
 * built site structure. It must run after `gatsby build` to access the
 * generated site data.
 *
 * This script:
 * - Reads the generated sitemap.xml to get actual pages
 * - Validates links against real page URLs (not just file paths)
 * - Checks anchor links against actual built page content
 * - Works with dynamic pages, templates, and plugin-generated content
 *
 * Usage:
 *   gatsby build && npm run check-links-post-build
 *   gatsby build && node scripts/check-links-post-build.js
 *
 * To output results to a file, provide a directory path as an argument:
 *   node scripts/check-links-post-build.js link-check-results
 *   node scripts/check-links-post-build.js .
 *   node scripts/check-links-post-build.js ../output
 *
 * The script will exit with code 1 if any broken links are found.
 */

const fs = require('fs')
const path = require('path')
const { JSDOM } = require('jsdom')
const GithubSlugger = require('github-slugger')

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    CACHE_SIZE_LIMIT: 1000,
    BATCH_SIZE: 50,
    EXCLUDED_EXTENSIONS: ['.css', '.js', '.json', '.xml', '.svg', '.png', '.jpg', '.jpeg', '.gif', '.woff', '.woff2'],
    EXCLUDE_PATTERNS: [
        '/community/', // powered by Strapi
        '/teams/', // powered by Strapi
        '/careers/', // powered by Ashby
    ],
    SITEMAP_PATH: path.join(process.cwd(), 'public', 'sitemap', 'sitemap-0.xml'),
    CONTENTS_DIR: 'contents',
    // Special case URLs that should be considered valid even if not in sitemap
    SPECIAL_CASE_URLS: [
        '/startups', // Dynamic route in sitemap as /startups/[...slug]
    ],
}

// Global cache for anchor links
const anchorCache = new Map()

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Utility function to convert file paths or internal links to full PostHog URLs
function convertToPostHogUrl(pathOrUrl) {
    const baseUrl = 'https://posthog.com'

    // Case 1: File path (starts with 'contents/')
    if (pathOrUrl.startsWith('contents/')) {
        // Remove 'contents/' prefix and file extension
        let urlPath = pathOrUrl.replace(/^contents\//, '')
        urlPath = urlPath.replace(/\.(md|mdx)$/, '')
        return `${baseUrl}/${urlPath}`
    }

    // Case 2: Internal link (starts with '/')
    if (pathOrUrl.startsWith('/')) {
        return `${baseUrl}${pathOrUrl}`
    }

    // Case 3: Already a full URL or relative path
    if (pathOrUrl.startsWith('http')) {
        return pathOrUrl
    }

    // Default: treat as internal path
    return `${baseUrl}/${pathOrUrl}`
}

// Parse vercel.json to extract redirect patterns
function parseVercelRedirects() {
    try {
        const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'))
        const redirects = vercelConfig.redirects || []
        const rewrites = vercelConfig.rewrites || []

        // Combine redirects and rewrites (rewrites also act as redirects for link validation)
        return [...redirects, ...rewrites]
    } catch (error) {
        console.warn('Warning: Could not parse vercel.json:', error.message)
        return []
    }
}

// Check if a URL contains a redirect source
function isRedirectSource(url, redirects) {
    return redirects.some((redirect) => {
        // If source contains :path*, check if URL contains the part before :path*
        if (redirect.source.includes(':path*')) {
            const pathPrefix = redirect.source.split('/:path*')[0]
            return url.includes(pathPrefix)
        }
        // Otherwise, check if URL contains the full source
        return url.includes(redirect.source)
    })
}

// ============================================================================
// SITEMAP FUNCTIONS
// ============================================================================

// Get all pages from the sitemap
function getSitemapPages() {
    if (!fs.existsSync(CONFIG.SITEMAP_PATH)) {
        console.error('Error: Sitemap not found at', CONFIG.SITEMAP_PATH)
        console.error('Please run "gatsby build" first to generate the sitemap.')
        process.exit(1)
    }

    const sitemapContent = fs.readFileSync(CONFIG.SITEMAP_PATH, 'utf8')
    const dom = new JSDOM(sitemapContent, { contentType: 'text/xml' })
    const urlNodes = dom.window.document.querySelectorAll('url loc')

    const pages = []
    urlNodes.forEach((node) => {
        const url = node.textContent.trim()
        if (url.startsWith('https://posthog.com/')) {
            pages.push(url.replace('https://posthog.com', ''))
        }
    })

    return pages
}

// Check if URL exists in sitemap
function urlExistsInSitemap(url, pages) {
    // Remove trailing slash for comparison
    const normalizedUrl = url.replace(/\/$/, '')
    return pages.includes(normalizedUrl) || pages.includes(normalizedUrl + '/')
}

// ============================================================================
// ANCHOR VALIDATION FUNCTIONS
// ============================================================================

// Better file path resolution for Gatsby's output structure
function getHtmlFilePath(url) {
    const publicDir = path.join(process.cwd(), 'public')
    let htmlPath

    // Remove leading slash
    const cleanUrl = url.replace(/^\//, '')

    if (cleanUrl === '') {
        // Root page
        htmlPath = path.join(publicDir, 'index.html')
    } else if (cleanUrl.endsWith('/')) {
        // Directory with trailing slash
        htmlPath = path.join(publicDir, cleanUrl, 'index.html')
    } else if (cleanUrl.includes('.')) {
        // File with extension
        htmlPath = path.join(publicDir, cleanUrl)
    } else {
        // Directory without trailing slash - try both variants
        const withIndex = path.join(publicDir, cleanUrl, 'index.html')
        const withHtml = path.join(publicDir, cleanUrl + '.html')

        if (fs.existsSync(withIndex)) {
            htmlPath = withIndex
        } else if (fs.existsSync(withHtml)) {
            htmlPath = withHtml
        } else {
            htmlPath = withIndex // Default to index.html variant
        }
    }

    return htmlPath
}

// More efficient function that extracts ALL anchors and caches them
function extractAnchorsFromHtml(htmlPath) {
    // Check cache first
    if (anchorCache.has(htmlPath)) {
        return anchorCache.get(htmlPath)
    }

    // Manage cache size
    if (anchorCache.size >= CONFIG.CACHE_SIZE_LIMIT) {
        // Remove oldest entry
        const firstKey = anchorCache.keys().next().value
        anchorCache.delete(firstKey)
    }

    try {
        const stats = fs.statSync(htmlPath)

        // Skip very large files
        if (stats.size > CONFIG.MAX_FILE_SIZE) {
            console.warn(`Skipping large file: ${htmlPath} (${stats.size} bytes)`)
            const emptySet = new Set()
            anchorCache.set(htmlPath, emptySet)
            return emptySet
        }

        // Skip excluded file extensions
        const ext = path.extname(htmlPath).toLowerCase()
        if (CONFIG.EXCLUDED_EXTENSIONS.includes(ext)) {
            const emptySet = new Set()
            anchorCache.set(htmlPath, emptySet)
            return emptySet
        }

        const anchors = new Set()

        // For all files, process synchronously to avoid Promise issues
        const htmlContent = fs.readFileSync(htmlPath, 'utf8')

        // Simple string matching for very large content
        if (htmlContent.length > 500000) {
            const idMatches = htmlContent.match(/id="([^"]+)"/g) || []
            const nameMatches = htmlContent.match(/name="([^"]+)"/g) || []

            idMatches.forEach((match) => {
                const id = match.match(/id="([^"]+)"/)[1]
                anchors.add(id)
            })

            nameMatches.forEach((match) => {
                const name = match.match(/name="([^"]+)"/)[1]
                anchors.add(name)
            })
        } else {
            // Use DOM parsing for smaller files
            const dom = new JSDOM(htmlContent)
            const document = dom.window.document

            // Get all elements with ID
            const elementsWithId = document.querySelectorAll('[id]')
            elementsWithId.forEach((element) => {
                anchors.add(element.id)
            })

            // Get all elements with name
            const elementsWithName = document.querySelectorAll('[name]')
            elementsWithName.forEach((element) => {
                anchors.add(element.name)
            })

            // Process headings with slugger
            const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
            const slugger = new GithubSlugger()

            headings.forEach((heading) => {
                const slug = slugger.slug(heading.textContent)
                anchors.add(slug)
            })
        }

        // Cache the results
        anchorCache.set(htmlPath, anchors)
        return anchors
    } catch (error) {
        console.warn(`Warning: Could not extract anchors from ${htmlPath}:`, error.message)
        const emptySet = new Set()
        anchorCache.set(htmlPath, emptySet)
        return emptySet
    }
}

// ============================================================================
// LINK VALIDATION FUNCTIONS
// ============================================================================

// Check if internal URL exists in sitemap
function validateInternalUrl(url, pages) {
    const [baseUrl] = url.split('#')

    // Check special case URLs that should be considered valid
    if (CONFIG.SPECIAL_CASE_URLS.includes(baseUrl)) {
        return true
    }

    return urlExistsInSitemap(baseUrl, pages)
}

// Check if anchor exists in HTML file
function validateAnchor(url, pages) {
    const [baseUrl, anchor] = url.split('#')

    // No anchor to validate
    if (!anchor) {
        return true
    }

    // First ensure the base URL exists
    if (!urlExistsInSitemap(baseUrl, pages)) {
        return false
    }

    // Get the HTML file path and check if it exists
    const htmlPath = getHtmlFilePath(baseUrl)
    if (!fs.existsSync(htmlPath)) {
        return false
    }

    // Extract all anchors and check if our anchor exists
    const anchors = extractAnchorsFromHtml(htmlPath)
    return anchors.has(anchor)
}

// ============================================================================
// MARKDOWN PROCESSING FUNCTIONS
// ============================================================================

// Extract all internal links from a markdown file
function extractInternalLinks(filePath) {
    const content = fs.readFileSync(filePath, 'utf8')
    const links = []
    const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g

    let match
    let lineNumber = 1
    let currentIndex = 0

    while ((match = linkRegex.exec(content)) !== null) {
        const linkText = match[1]
        const linkUrl = match[2]

        // Count lines up to this match
        while (currentIndex < match.index) {
            if (content[currentIndex] === '\n') {
                lineNumber++
            }
            currentIndex++
        }

        // Only check internal links
        if (linkUrl.startsWith('/') && !linkUrl.startsWith('//')) {
            const beforeMatch = content.substring(Math.max(0, match.index - 75), match.index)
            const afterMatch = content.substring(
                match.index + match[0].length,
                Math.min(content.length, match.index + match[0].length + 75)
            )
            const context = beforeMatch + match[0] + afterMatch

            links.push({
                text: linkText,
                url: linkUrl,
                line: lineNumber,
                context: context.replace(/\n/g, ' '),
            })
        }
    }

    return links
}

// Find all markdown files in a directory recursively
function findMarkdownFiles(dir) {
    const markdownFiles = []

    function walkDirectory(currentDir) {
        const files = fs.readdirSync(currentDir)

        for (const file of files) {
            const filePath = path.join(currentDir, file)
            const stat = fs.statSync(filePath)

            if (stat.isDirectory()) {
                walkDirectory(filePath)
            } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
                markdownFiles.push(filePath)
            }
        }
    }

    walkDirectory(dir)
    return markdownFiles
}

// Process files in batches for memory management
function processFilesInBatches(files, batchSize = CONFIG.BATCH_SIZE) {
    const results = []

    for (let i = 0; i < files.length; i += batchSize) {
        const batch = files.slice(i, i + batchSize)
        console.log(
            `Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(files.length / batchSize)} (${
                batch.length
            } files)`
        )

        const batchResults = batch.map((file) => ({
            file,
            links: extractInternalLinks(file),
        }))

        results.push(...batchResults)

        // Clear some memory between batches
        if (global.gc) {
            global.gc()
        }
    }

    return results
}

// ============================================================================
// LINK PROCESSING FUNCTIONS
// ============================================================================

// Process a single link and return validation result
function processLink(link, file, pages, redirects) {
    // Strip query parameters from URL for checking
    const urlWithoutQuery = link.url.split('?')[0]

    // Check if link should be excluded by pattern
    const shouldExclude = CONFIG.EXCLUDE_PATTERNS.some((pattern) => urlWithoutQuery.includes(pattern))
    if (shouldExclude) {
        return { type: 'excluded' }
    }

    // Check if link has file extension that should be ignored
    const hasExcludedExtension = CONFIG.EXCLUDED_EXTENSIONS.some((ext) => urlWithoutQuery.endsWith(ext))
    if (hasExcludedExtension) {
        return { type: 'excluded' }
    }

    // Check if this link is a redirect source
    if (isRedirectSource(urlWithoutQuery, redirects)) {
        return { type: 'redirected' }
    }

    // First check if the internal URL is valid
    if (!validateInternalUrl(urlWithoutQuery, pages)) {
        return {
            type: 'broken',
            brokenItem: {
                file: file,
                link: link.url,
                text: link.text,
                line: link.line,
                context: link.context,
                type: 'page',
            },
        }
    } else if (urlWithoutQuery.includes('#')) {
        // If URL is valid but has anchor, check if anchor exists
        if (!validateAnchor(urlWithoutQuery, pages)) {
            return {
                type: 'broken_anchor',
                brokenItem: {
                    file: file,
                    link: link.url,
                    text: link.text,
                    line: link.line,
                    context: link.context,
                    type: 'anchor',
                },
            }
        }
    }

    return { type: 'valid' }
}

// Process all links and categorize them
function processAllLinks(fileResults, pages, redirects) {
    const brokenLinks = []
    const brokenAnchors = []
    let totalLinks = 0
    let anchorLinksChecked = 0
    let redirectedLinks = 0
    let excludedLinks = 0

    for (const result of fileResults) {
        const { file, links } = result
        totalLinks += links.length

        for (const link of links) {
            // Check for anchor (like original code)
            const urlWithoutQuery = link.url.split('?')[0]
            const hasAnchor = urlWithoutQuery.includes('#')

            const processResult = processLink(link, file, pages, redirects)

            switch (processResult.type) {
                case 'excluded':
                    excludedLinks++
                    break
                case 'redirected':
                    redirectedLinks++
                    break
                case 'broken':
                    brokenLinks.push(processResult.brokenItem)
                    // Count anchor links for ALL non-excluded, non-redirected links (like original)
                    if (hasAnchor) {
                        anchorLinksChecked++
                    }
                    break
                case 'broken_anchor':
                    brokenAnchors.push(processResult.brokenItem)
                    anchorLinksChecked++
                    break
                case 'valid':
                    // Count anchor links for ALL non-excluded, non-redirected links (like original)
                    if (hasAnchor) {
                        anchorLinksChecked++
                    }
                    break
            }
        }
    }

    return {
        brokenLinks,
        brokenAnchors,
        stats: {
            totalLinks,
            excludedLinks,
            redirectedLinks,
            anchorLinksChecked,
        },
    }
}

// ============================================================================
// RESULTS AND OUTPUT FUNCTIONS
// ============================================================================

// Create the results object
function createResultsObject(brokenLinks, brokenAnchors, stats, markdownFiles, redirects, pages) {
    return {
        timestamp: new Date().toISOString(),
        summary: {
            totalLinks: stats.totalLinks,
            excludedLinks: stats.excludedLinks,
            redirectedLinks: stats.redirectedLinks,
            brokenLinks: brokenLinks.length,
            anchorLinksChecked: stats.anchorLinksChecked,
            brokenAnchors: brokenAnchors.length,
            htmlFilesCached: anchorCache.size,
            markdownFiles: markdownFiles.length,
            redirectPatterns: redirects.length,
            pagesInSitemap: pages.length,
        },
        excludePatterns: CONFIG.EXCLUDE_PATTERNS,
        excludeFileExtensions: CONFIG.EXCLUDED_EXTENSIONS,
        brokenLinks: brokenLinks.map((broken) => ({
            type: broken.type,
            file: path.relative(process.cwd(), broken.file),
            page: convertToPostHogUrl(broken.file),
            brokenLink: broken.link,
            brokenUrl: convertToPostHogUrl(broken.link),
            line: broken.line,
            text: broken.text,
            context: broken.context,
        })),
        brokenAnchors: brokenAnchors.map((anchor) => ({
            type: anchor.type,
            file: path.relative(process.cwd(), anchor.file),
            page: convertToPostHogUrl(anchor.file),
            brokenLink: anchor.link,
            brokenUrl: convertToPostHogUrl(anchor.link),
            line: anchor.line,
            text: anchor.text,
            context: anchor.context,
        })),
    }
}

// Write results to JSON file (optional)
function writeResultsToFile(results, outputPath) {
    if (!outputPath) {
        // No output path provided, skip writing to file
        return
    }

    const resultsDir = path.join(process.cwd(), outputPath)
    if (!fs.existsSync(resultsDir)) {
        fs.mkdirSync(resultsDir, { recursive: true })
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const resultsFile = path.join(resultsDir, `link-check-${timestamp}.json`)

    try {
        fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2))
        console.log(`\nResults saved to: ${resultsFile}`)
    } catch (error) {
        console.error(`Error saving results: ${error.message}`)
    }
}

// Display broken links
function displayBrokenLinks(brokenLinks) {
    if (brokenLinks.length === 0) return

    console.log('\nBroken links found:\n')

    brokenLinks.forEach((broken) => {
        console.log(`Error type: ${broken.type}`)
        console.log(`File: ${path.relative(process.cwd(), broken.file)}`)
        console.log(`Page: ${convertToPostHogUrl(broken.file)}`)
        console.log(`Broken link: ${broken.link}`)
        console.log(`Broken URL: ${convertToPostHogUrl(broken.link)}`)
        console.log(`Line #: ${broken.line}`)
        if (broken.text) {
            console.log(`Hyperlinked text: ${broken.text}`)
        }
        console.log(`Context: ${broken.context}`)
        console.log('-'.repeat(80))
    })
}

// Display broken anchor links
function displayBrokenAnchors(brokenAnchors) {
    if (brokenAnchors.length === 0) return

    console.log('\nBroken anchor links:\n')

    brokenAnchors.forEach((anchor) => {
        console.log(`Error type: ${anchor.type}`)
        console.log(`File: ${path.relative(process.cwd(), anchor.file)}`)
        console.log(`Page: ${convertToPostHogUrl(anchor.file)}`)
        console.log(`Broken link: ${anchor.link}`)
        console.log(`Broken URL: ${convertToPostHogUrl(anchor.link)}`)
        console.log(`Line #: ${anchor.line}`)
        if (anchor.text) {
            console.log(`Hyperlinked text: ${anchor.text}`)
        }
        console.log(`Context: ${anchor.context}`)
        console.log('-'.repeat(80))
    })
}

// Display summary statistics
function displaySummaryStats(stats, brokenLinks, brokenAnchors, markdownFilesCount) {
    console.log(`\nScanned ${markdownFilesCount} markdown files`)
    console.log(`Processed ${stats.totalLinks} internal links`)
    console.log(`Found ${stats.excludedLinks} excluded links (skipped)`)
    console.log(`Found ${stats.redirectedLinks} redirected links (skipped)`)
    console.log(`Checked ${stats.anchorLinksChecked} anchor links`)
    console.log(`Found ${brokenLinks.length} broken links`)
    console.log(`Found ${brokenAnchors.length} broken anchor links`)
    console.log(`Cached ${anchorCache.size} HTML files for anchor checking`)
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

function checkLinks(outputPath) {
    console.log('Starting post-build link validation...')

    // Initialize data sources
    const redirects = parseVercelRedirects()
    console.log(`Found ${redirects.length} redirect/rewrite patterns`)

    const pages = getSitemapPages()
    console.log(`Found ${pages.length} pages in sitemap`)

    const markdownFiles = findMarkdownFiles(CONFIG.CONTENTS_DIR)
    console.log(`Found ${markdownFiles.length} markdown files`)

    // Process files and extract links
    const fileResults = processFilesInBatches(markdownFiles)

    // Process and validate all links
    const { brokenLinks, brokenAnchors, stats } = processAllLinks(fileResults, pages, redirects)

    // Sort results alphabetically by file
    brokenLinks.sort((a, b) => a.file.localeCompare(b.file))
    brokenAnchors.sort((a, b) => a.file.localeCompare(b.file))

    // Display broken links
    displayBrokenLinks(brokenLinks)
    displayBrokenAnchors(brokenAnchors)

    if (brokenLinks.length === 0 && brokenAnchors.length === 0) {
        console.log('\nNo broken links found! 🎉')
    }

    // Display summary stats at the end
    displaySummaryStats(stats, brokenLinks, brokenAnchors, markdownFiles.length)

    // Create and save results at the end
    const results = createResultsObject(brokenLinks, brokenAnchors, stats, markdownFiles, redirects, pages)
    writeResultsToFile(results, outputPath)

    return brokenLinks.length
}

// ============================================================================
// SCRIPT EXECUTION
// ============================================================================

// Parse command line arguments
const args = process.argv.slice(2)
const outputPath = args.length > 0 ? args[0] : null

if (outputPath) {
    console.log(`Results will be saved to: ${outputPath}`)
} else {
    console.log('No output path provided. Results will only be displayed in console.')
}

// Run the script
const brokenCount = checkLinks(outputPath)

// Only exit with error code if there are broken PAGE links (not just anchor links)
// This allows the workflow to continue while still reporting issues
if (brokenCount > 0) {
    console.log('\nCheck the output above ☝️')
}

process.exit(0) // Always exit successfully

// The sitemap at /sitemap/sitemap-index.xml and /sitemap/sitemap-<n>.xml, built from the pages in the
// build output plus the client-rendered community question pages and the plugin pages.
import fs from 'node:fs'
import path from 'node:path'
import { fetchJson, mapLimit } from '../../data-layer/http'

const SITE_URL = 'https://posthog.com'
const URLS_PER_FILE = 45000
// The <head> comes first in every page, so this much of the file always holds the robots tag.
const HEAD_BYTES = 32 * 1024

export interface BuiltPage {
    /** URL path without a trailing slash, e.g. /docs/feature-flags. The home page is /. */
    path: string
    noindex: boolean
}

function readHead(file: string): string {
    const fd = fs.openSync(file, 'r')
    try {
        const buffer = Buffer.alloc(HEAD_BYTES)
        const bytes = fs.readSync(fd, buffer, 0, HEAD_BYTES, 0)
        return buffer.subarray(0, bytes).toString('utf8')
    } finally {
        fs.closeSync(fd)
    }
}

const NOINDEX = /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i

/** Every `index.html` in the build output, as a page path. Skips Astro's asset folder. */
export function builtPages(outDir: string): BuiltPage[] {
    const pages: BuiltPage[] = []
    const walk = (dir: string, urlPath: string) => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            if (entry.isDirectory()) {
                if (urlPath === '' && entry.name === '_astro') continue
                walk(path.join(dir, entry.name), `${urlPath}/${entry.name}`)
            } else if (entry.name === 'index.html') {
                const file = path.join(dir, entry.name)
                pages.push({ path: urlPath || '/', noindex: NOINDEX.test(readHead(file)) })
            }
        }
    }
    if (fs.existsSync(outDir)) walk(outDir, '')
    return pages.sort((a, b) => a.path.localeCompare(b.path))
}

// Versioned SDK reference pages age out of the build, so keep them out of the sitemap.
const VERSIONED_SDK_REFERENCE = /^\/docs\/references\/[a-z0-9-]+-(\d|latest)/
// Client-rendered routes are built as one page with the parameter in brackets (/teams/[slug]).
const DYNAMIC_ROUTE = /\[[^\]]*\]/

const isSitemapPage = ({ path: pagePath, noindex }: BuiltPage) =>
    !noindex &&
    !VERSIONED_SDK_REFERENCE.test(pagePath) &&
    !DYNAMIC_ROUTE.test(pagePath) &&
    !/^\/(?:404|404\.html|dev-404-page)$/.test(pagePath)

interface QuestionsPage {
    data: { attributes: { permalink: string } }[]
    meta: { pagination: { pageCount: number } }
}

/** /questions/<permalink> for every community question. The question pages render in the browser. */
async function questionPaths(apiHost: string): Promise<string[]> {
    const fetchPage = (page: number) => {
        // Only the permalink is needed, so skip populate.
        const query = new URLSearchParams({
            'fields[0]': 'permalink',
            'pagination[page]': String(page),
            'pagination[pageSize]': '100',
        })
        return fetchJson<QuestionsPage>(`${apiHost}/api/questions?${query}`)
    }
    const first = await fetchPage(1)
    const pageNumbers = Array.from({ length: first.meta.pagination.pageCount - 1 }, (_, i) => i + 2)
    const rest = await mapLimit(pageNumbers, 3, fetchPage)
    return [first, ...rest].flatMap((response) =>
        response.data.map((question) => `/questions/${question.attributes.permalink}`)
    )
}

/** /plugins/<name> for every app in the plugin repository. */
async function pluginPaths(): Promise<string[]> {
    const plugins = await fetchJson<{ name: string }[]>(
        'https://raw.githubusercontent.com/PostHog/plugin-repository/main/repository.json'
    )
    return plugins.map((plugin) => `/plugins/${plugin.name.toLowerCase().replace(/ /g, '-')}`)
}

export interface SitemapEntry {
    url: string
    changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
    priority: number
}

/** The priority and changefreq rules, matched on the path, so the rules for /, /blog and /compare fire. */
export function sitemapEntry(pagePath: string): SitemapEntry {
    let changefreq: SitemapEntry['changefreq'] = 'monthly'
    let priority = 0.7

    if (pagePath === '/') {
        priority = 1.0
    } else if (pagePath.includes('blog') || pagePath.includes('compare')) {
        changefreq = pagePath === '/blog' || pagePath === '/compare' ? 'weekly' : 'yearly'
    } else if (pagePath.includes('product')) {
        priority = 0.8
    } else if (pagePath.includes('docs')) {
        priority = 0.9
    } else if (pagePath.includes('handbook')) {
        priority = 0.6
    } else if (pagePath.includes('pricing')) {
        priority = 0.8
    } else if (pagePath.includes('plugins')) {
        priority = 0.8
        changefreq = 'daily'
    }

    // Paths come from folder names on disk; a URL needs spaces and other characters encoded.
    return { url: `${SITE_URL}${encodeURI(pagePath)}`, changefreq, priority }
}

const escapeXml = (value: string) =>
    value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')

const urlset = (entries: SitemapEntry[]) =>
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    entries
        .map(
            ({ url, changefreq, priority }) =>
                `<url><loc>${escapeXml(url)}</loc><changefreq>${changefreq}</changefreq>` +
                `<priority>${priority.toFixed(1)}</priority></url>`
        )
        .join('') +
    '</urlset>'

const sitemapIndex = (files: string[]) =>
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    files.map((file) => `<sitemap><loc>${SITE_URL}/sitemap/${file}</loc></sitemap>`).join('') +
    '</sitemapindex>'

/** Writes the sitemap files. A failed question or plugin fetch is logged and leaves those pages out. */
export async function writeSitemap(pages: BuiltPage[], outDir: string, squeakApiHost?: string): Promise<void> {
    const extra = async (name: string, load: () => Promise<string[]>) => {
        try {
            return await load()
        } catch (error) {
            console.error(`[seo] sitemap: could not load ${name}: ${(error as Error).message}`)
            return []
        }
    }
    const questions = squeakApiHost ? await extra('question pages', () => questionPaths(squeakApiHost)) : []
    const plugins = await extra('plugin pages', pluginPaths)

    const paths = [...new Set([...pages.filter(isSitemapPage).map(({ path }) => path), ...questions, ...plugins])]
    const entries = paths.map(sitemapEntry)

    const dir = path.join(outDir, 'sitemap')
    fs.mkdirSync(dir, { recursive: true })
    const files: string[] = []
    for (let i = 0; i * URLS_PER_FILE < Math.max(entries.length, 1); i++) {
        const file = `sitemap-${i}.xml`
        fs.writeFileSync(path.join(dir, file), urlset(entries.slice(i * URLS_PER_FILE, (i + 1) * URLS_PER_FILE)))
        files.push(file)
    }
    fs.writeFileSync(path.join(dir, 'sitemap-index.xml'), sitemapIndex(files))
    console.log(`[seo] wrote the sitemap: ${entries.length} URLs in ${files.length} file(s)`)
}

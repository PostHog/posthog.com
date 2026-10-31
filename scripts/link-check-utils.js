/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')
const { match } = require('path-to-regexp')
const markdownLinkExtractor = require('markdown-link-extractor')
const { contentPathToUrl, pocketGuidePathsFromSource } = require('./seo-aeo-pr-check/check')

const ORIGIN = 'https://posthog.com'
const routeCache = new Map()
const guideCache = new Map()

function pageUrl(file) {
    const cwd = process.cwd()
    if (!guideCache.has(cwd)) {
        const guideFile = path.join(cwd, 'src/constants/pocketGuides.ts')
        guideCache.set(
            cwd,
            fs.existsSync(guideFile) ? pocketGuidePathsFromSource(fs.readFileSync(guideFile, 'utf8')) : {}
        )
    }
    const guides = guideCache.get(cwd)
    return contentPathToUrl(file.split(path.sep).join('/'), guides)
}

function internalUrl(value, file) {
    if (value.startsWith('{')) return null
    try {
        const url = new URL(value, ORIGIN + (file ? pageUrl(file) : '/'))
        if (!['http:', 'https:'].includes(url.protocol) || !['posthog.com', 'www.posthog.com'].includes(url.hostname)) {
            return null
        }
        return url
    } catch {
        return null
    }
}

function routeMatch(source, pathname) {
    if (!routeCache.has(source)) {
        // Vercel config stores escaped backslashes in regular-expression parameters.
        routeCache.set(source, match(source.replace(/\\\\/g, '\\'), { sensitive: true }))
    }
    return routeCache.get(source)(pathname)
}

function resolveUrl(value, file, redirects, isKnown = () => false) {
    let url = internalUrl(value, file)
    if (!url) return { excluded: true }
    const seen = new Set()
    let redirected = false
    for (let hop = 0; hop < 20; hop++) {
        if (seen.has(url.href)) return { url, redirected, error: 'Redirect loop' }
        seen.add(url.href)
        let selected
        let params
        for (const rewrite of [false, true]) {
            if (rewrite && isKnown(url.pathname)) return { url, redirected }
            for (const entry of redirects) {
                if (
                    Boolean(entry.rewrite) !== rewrite ||
                    typeof entry.source !== 'string' ||
                    typeof entry.destination !== 'string'
                )
                    continue
                const result = routeMatch(entry.source, url.pathname)
                if (result && !entry.has?.length && !entry.missing?.length) {
                    selected = entry
                    params = result.params
                    break
                }
            }
            if (selected) break
        }
        if (!selected) return { url, redirected }
        const destination = selected.destination.replace(/:([\w]+)[*+?]?/g, (_, name) => {
            const value = params[name]
            return Array.isArray(value) ? value.join('/') : value || ''
        })
        const next = internalUrl(destination)
        if (!next) return { excluded: true, redirected: true }
        if (!destination.includes('#')) next.hash = url.hash
        if (!destination.includes('?')) next.search = url.search
        url = next
        redirected = true
        if (selected.rewrite) return { url, redirected }
    }
    return { url, redirected, error: 'Too many redirects' }
}

function builtUrlExists(pathname, pages) {
    const normalized = pathname.replace(/\/$/, '') || '/'
    const canonical = normalized.replace(/\/index\.html$/, '') || '/'
    const contains = (value) =>
        pages instanceof Set ? pages.has(value) : pages.includes(value) || pages.includes(value + '/')
    if (contains(normalized) || contains(canonical)) return true
    const asset = path.join(process.cwd(), 'public', pathname)
    return (fs.existsSync(asset) && fs.statSync(asset).isFile()) || fs.existsSync(path.join(asset, 'index.html'))
}

function maskExamples(content) {
    return content
        .replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, (text) => text.replace(/[^\n]/g, ' '))
        .replace(/<!--[^]*?-->|\{\/\*[^]*?\*\/\}/g, (text) => text.replace(/[^\n]/g, ' '))
        .replace(/^\s*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\s*\1\s*$/gm, (text) => text.replace(/[^\n]/g, ' '))
        .replace(/(`+)([^`]|(?!\1)`)*?\1/g, (text) => text.replace(/[^\n]/g, ' '))
}

function extractLinks(file) {
    const content = fs.readFileSync(file, 'utf8')
    const body = maskExamples(content)
    const positions = new Map()
    const values = markdownLinkExtractor(body)
    for (const tag of body.matchAll(/<(?![!/])[^>]+>/g)) {
        for (const attribute of tag[0].matchAll(/\b(?:href|to)\s*=\s*(?:\{\s*(["'])(.*?)\1\s*\}|(["'])(.*?)\3)/g)) {
            const value = attribute[2] ?? attribute[4]
            if (!values.includes(value)) values.push(value)
        }
    }
    return values.flatMap((value) => {
        if (!internalUrl(value, file)) return []
        let index = body.indexOf(value, positions.get(value) || 0)
        if (index === -1) index = body.indexOf(value.replace(/&/g, '&amp;'))
        if (index === -1) index = 0
        positions.set(value, index + value.length)
        return [
            {
                url: value,
                text: '',
                line: body.slice(0, index).split('\n').length,
                context: content.slice(Math.max(0, index - 75), index + value.length + 75).replace(/\n/g, ' '),
            },
        ]
    })
}

function importingPages(files) {
    const known = new Set(files.map((file) => fs.realpathSync(file)))
    const parents = new Map()
    for (const file of known) {
        const text = maskExamples(fs.readFileSync(file, 'utf8'))
        for (const result of text.matchAll(/\bfrom\s+["'](\.[^"']+)["']/g)) {
            const imported = path.resolve(path.dirname(file), result[1].replace(/\\_/g, '_'))
            if (known.has(imported)) parents.set(imported, [...(parents.get(imported) || []), file])
        }
    }
    function pages(file, visited = new Set()) {
        const absolute = fs.realpathSync(file)
        if (path.basename(absolute) === 'SKILL.md') return []
        if (visited.has(absolute)) return []
        visited.add(absolute)
        const relative = path.relative(process.cwd(), absolute)
        if (!relative.split(path.sep).some((part) => part.startsWith('_'))) return [pageUrl(relative)]
        return [...new Set((parents.get(absolute) || []).flatMap((parent) => pages(parent, visited)))]
    }
    return pages
}

function changedFiles(files, base) {
    if (!base) return files
    if (!/^[a-f0-9]{40}$/i.test(base)) throw new Error('--changed-from must be a full commit SHA')
    const names = execFileSync('git', ['diff', '--name-only', '--diff-filter=ACMR', base, 'HEAD', '--'], {
        encoding: 'utf8',
    })
    const changed = new Set(names.trim().split('\n'))
    const deleted = execFileSync(
        'git',
        ['diff', '--name-only', '--diff-filter=DR', base, 'HEAD', '--', 'contents/', 'src/pages/'],
        { encoding: 'utf8' }
    ).trim()
    const checkerChanged = [...changed].some(
        (file) =>
            /^scripts\/(?:[^/]*link[^/]*|seo-aeo-pr-check\/check\.js)$/.test(file) ||
            [
                '.github/workflows/internal-links-check.yml',
                'package.json',
                'pnpm-lock.yaml',
                'src/constants/pocketGuides.ts',
            ].includes(file)
    )
    if (changed.has('vercel.json') || deleted || checkerChanged) return files
    return files.filter((file) => changed.has(file.split(path.sep).join('/')))
}

function cliOptions(args) {
    const base = args.find((arg) => arg.startsWith('--changed-from='))?.split('=')[1]
    return { outputPath: args.find((arg) => !arg.startsWith('--')) || null, base }
}

module.exports = {
    pageUrl,
    internalUrl,
    routeMatch,
    resolveUrl,
    builtUrlExists,
    extractLinks,
    importingPages,
    changedFiles,
    cliOptions,
}

#!/usr/bin/env node
// Builds the body of the "Deploy preview" PR comment: the status table, plus a table of
// direct links to the pages this PR touched. Never throws — if the changed-page lookup
// fails for any reason, the status table still gets written on its own.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..', '..')
const publicDir = path.join(repoRoot, 'public')

const MARKER = '<!-- cloudflare-pages-preview -->'
const PAGE_EXTENSIONS = new Set(['.md', '.mdx'])
const MAX_ROWS = 25

// contents/docs/foo.mdx -> /docs/foo, contents/docs/foo/index.mdx -> /docs/foo
function toSlug(file) {
    if (!file.startsWith('contents/')) {
        return null
    }
    const extension = path.extname(file)
    if (!PAGE_EXTENSIONS.has(extension)) {
        return null
    }
    const slug = file.slice('contents'.length, -extension.length).replace(/\/index$/, '')
    return slug === '' ? '/' : slug
}

// The build output is the source of truth for whether a slug is a real page. It filters out
// partials, deleted files, and anything the content file does not turn into a page.
function isBuiltPage(slug) {
    return fs.existsSync(path.join(publicDir, slug === '/' ? '' : slug, 'index.html'))
}

function readTitle(file) {
    try {
        const frontmatter = fs.readFileSync(path.join(repoRoot, file), 'utf-8').match(/^---\r?\n([\s\S]*?)\r?\n---/)
        const title = frontmatter?.[1].match(/^title:\s*(.+)$/m)?.[1].trim()
        return title?.replace(/^['"]|['"]$/g, '').replace(/\|/g, '\\|') || null
    } catch {
        return null
    }
}

function changedPages(changedFilesPath) {
    const files = fs
        .readFileSync(changedFilesPath, 'utf-8')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
    const pages = []
    for (const file of files) {
        const slug = toSlug(file)
        if (slug && isBuiltPage(slug)) {
            pages.push({ file, slug, title: readTitle(file) })
        }
    }
    return pages.sort((a, b) => a.slug.localeCompare(b.slug))
}

function pagesSection(deploymentUrl, changedFilesPath) {
    if (!deploymentUrl || !changedFilesPath || !fs.existsSync(changedFilesPath)) {
        return []
    }
    const pages = changedPages(changedFilesPath)
    if (pages.length === 0) {
        return []
    }
    const baseUrl = deploymentUrl.replace(/\/$/, '')
    const lines = ['', '### Changed pages', '', '| Page | Source |', '| --- | --- |']
    for (const { file, slug, title } of pages.slice(0, MAX_ROWS)) {
        lines.push(`| [${title || slug}](${baseUrl}${slug}) | \`${file}\` |`)
    }
    if (pages.length > MAX_ROWS) {
        lines.push('', `_${pages.length - MAX_ROWS} more changed pages are not listed._`)
    }
    return lines
}

function main() {
    const { DEPLOYMENT_URL, UPDATED_AT, CHANGED_FILES_PATH, COMMENT_PATH } = process.env
    const outPath = COMMENT_PATH || path.join(repoRoot, 'preview-comment.md')
    const lines = [
        MARKER,
        '### Deploy preview',
        '',
        '| Status | Details | Updated (UTC) |',
        '|--------|---------|---------|',
        `| 🟢 **Ready** | [View preview](${DEPLOYMENT_URL}) | ${UPDATED_AT} |`,
    ]
    fs.writeFileSync(outPath, `${lines.join('\n')}\n`)

    try {
        const section = pagesSection(DEPLOYMENT_URL, CHANGED_FILES_PATH)
        if (section.length > 0) {
            fs.writeFileSync(outPath, `${[...lines, ...section].join('\n')}\n`)
        }
    } catch (error) {
        console.error('Failed to list changed pages:', error)
    }
}

main()

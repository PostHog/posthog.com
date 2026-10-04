// The content index: one node per Markdown/MDX file in contents/ and in the posthog/posthog docs
// clone. Queries read its fields (`fields.slug`, `frontmatter`, `rawBody`, `headings`, `excerpt`,
// `parent`).
//
// Parsing 3,700+ files takes several seconds, so each file's parsed result is cached on disk and
// reused while its modification time is unchanged.
import { createProcessor } from '@mdx-js/mdx'
import fg from 'fast-glob'
import fs from 'node:fs'
import path from 'node:path'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import { toString } from 'mdast-util-to-string'
import { parse as parseYaml } from 'yaml'
import { readCache, writeCache } from './cache'
import { imageNode, isCloudinaryUrl } from './images'
import { CONTENTS_DIR, POSTHOG_REPO_DIR, ROOT } from './paths'
import { replacePath, stripFrontmatter } from './utils'
import { formatFor } from '../lib/mdx/options.mjs'

export type SourceInstance = 'contents' | 'posthog-main-repo'

export interface Heading {
    depth: number
    value: string
}

export interface ContentNode {
    /** The module path from the project root, e.g. "/contents/docs/foo.mdx". Also the MDXRenderer key. */
    id: string
    /** What MDXRenderer renders. Same as `id`. */
    body: string
    /** The MDX slug: the path without a leading slash ("docs/foo", "docs/bar/"). */
    slug: string
    fields: {
        slug: string
        wordCount: number
        pageViews: number
        contributors: { avatar?: string; url: string; username: string }[]
        commits: any[]
    }
    frontmatter: Record<string, any>
    rawBody: string
    /** Plain text of the document, for excerpts. */
    text: string
    headings: Heading[]
    timeToRead: number
    isFuture: boolean
    fileAbsolutePath: string
    parent: {
        sourceInstanceName: SourceInstance
        relativePath: string
        relativeDirectory: string
        name: string
        absolutePath: string
        category: string
        fields: { gitLogLatestDate: string }
    }
}

const IMAGE_FIELDS = ['featuredImage', 'thumbnail', 'logo', 'logoDark', 'icon']
const CACHE_NAME = 'content-index'
// Bump when the parsed shape changes, so stale caches are ignored.
const CACHE_VERSION = 2

const processors = {
    md: createProcessor({ format: 'md', remarkPlugins: [remarkFrontmatter, remarkGfm] }),
    mdx: createProcessor({ format: 'mdx', remarkPlugins: [remarkFrontmatter, remarkGfm] }),
}

interface ParsedFile {
    mtimeMs: number
    frontmatter: Record<string, any>
    headings: Heading[]
    text: string
    wordCount: number
}

function parseFrontmatter(raw: string, file: string): Record<string, any> {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    if (!match) return {}
    try {
        return parseYaml(match[1]) ?? {}
    } catch (error) {
        console.warn(`[content] invalid frontmatter in ${path.relative(ROOT, file)}: ${(error as Error).message}`)
        return {}
    }
}

const SKIP_TEXT = new Set(['code', 'mdxjsEsm', 'mdxFlowExpression', 'mdxTextExpression', 'html', 'yaml', 'table'])

function collectText(node: any, out: string[]) {
    if (SKIP_TEXT.has(node.type)) return
    if (node.type === 'paragraph' || node.type === 'heading') {
        out.push(toString(node))
        return
    }
    node.children?.forEach((child: any) => collectText(child, out))
}

function parseFile(raw: string, file: string, mtimeMs: number): ParsedFile {
    const frontmatter = parseFrontmatter(raw, file)
    const headings: Heading[] = []
    const textParts: string[] = []
    try {
        const tree = processors[formatFor(file) as 'md' | 'mdx'].parse(raw) as any
        for (const node of tree.children) {
            if (node.type === 'heading') headings.push({ depth: node.depth, value: toString(node) })
        }
        tree.children.forEach((node: any) => collectText(node, textParts))
    } catch (error) {
        console.warn(`[content] could not parse ${path.relative(ROOT, file)}: ${(error as Error).message}`)
    }
    const text = textParts.join(' ').replace(/\s+/g, ' ').trim()
    return {
        mtimeMs,
        frontmatter,
        headings,
        text,
        wordCount: stripFrontmatter(raw).split(/\s+/).length,
    }
}

function withImages(frontmatter: Record<string, any>) {
    const result = { ...frontmatter }
    for (const field of IMAGE_FIELDS) {
        if (isCloudinaryUrl(result[field])) result[field] = imageNode(result[field])
    }
    if (Array.isArray(result.images)) {
        result.images = result.images.map((image: unknown) => (isCloudinaryUrl(image) ? imageNode(image) : image))
    }
    return result
}

/** The file's URL path: drop the extension, collapse `index`, keep a trailing slash. */
function filePath(relativePath: string) {
    const withoutExtension = relativePath.replace(/\.mdx?$/, '')
    const collapsed = withoutExtension.replace(/(^|\/)index$/, '$1')
    return `/${collapsed}${collapsed && !collapsed.endsWith('/') ? '/' : ''}`
}

function category(relativePath: string) {
    const first = relativePath.split('/')[0] ?? ''
    return first.charAt(0).toUpperCase() + first.slice(1).replace(/-/g, ' ')
}

interface SourceRoot {
    name: SourceInstance
    dir: string
    patterns: string[]
    /** Turns a path relative to `dir` into the page slug. */
    slug: (relativePath: string) => string
}

const ROOTS: SourceRoot[] = [
    {
        name: 'contents',
        dir: CONTENTS_DIR,
        patterns: ['**/*.{md,mdx}'],
        slug: (relativePath) => filePath(relativePath),
    },
    {
        name: 'posthog-main-repo',
        dir: POSTHOG_REPO_DIR,
        patterns: ['docs/published/**/*.{md,mdx}'],
        slug: (relativePath) => filePath(relativePath).replace(/^\/docs\/published\//, '/'),
    },
]

let memo: ContentNode[] | undefined

/** Every content node. Parses changed files and reuses the cached result for the rest. */
export function getContent(): ContentNode[] {
    if (memo) return memo
    const cached = readCache<{ version: number; files: Record<string, ParsedFile> }>(CACHE_NAME)
    const previous = cached?.version === CACHE_VERSION ? cached.files : {}
    const files: Record<string, ParsedFile> = {}
    const now = new Date()
    const nodes: ContentNode[] = []
    let parsed = 0

    for (const root of ROOTS) {
        if (!fs.existsSync(root.dir)) continue
        for (const relativePath of fg.sync(root.patterns, { cwd: root.dir, ignore: ['**/node_modules/**'] })) {
            const absolutePath = path.join(root.dir, relativePath)
            const id = '/' + path.relative(ROOT, absolutePath).split(path.sep).join('/')
            const { mtimeMs } = fs.statSync(absolutePath)
            const raw = fs.readFileSync(absolutePath, 'utf8')
            let file = previous[id]
            if (!file || file.mtimeMs !== mtimeMs) {
                file = parseFile(raw, absolutePath, mtimeMs)
                parsed++
            }
            files[id] = file

            const slugWithSlash = root.slug(relativePath)
            const frontmatter = withImages(file.frontmatter)
            const date = frontmatter.date ? new Date(frontmatter.date) : undefined
            nodes.push({
                id,
                body: id,
                slug: slugWithSlash.replace(/^\//, ''),
                fields: {
                    slug: replacePath(slugWithSlash),
                    wordCount: file.wordCount,
                    pageViews: 0,
                    contributors: [],
                    commits: [],
                },
                frontmatter,
                rawBody: raw,
                text: file.text,
                headings: file.headings,
                timeToRead: Math.max(1, Math.round(file.wordCount / 265)),
                isFuture: !!date && date > now,
                fileAbsolutePath: absolutePath,
                parent: {
                    sourceInstanceName: root.name,
                    relativePath,
                    relativeDirectory: path.dirname(relativePath) === '.' ? '' : path.dirname(relativePath),
                    name: path.basename(relativePath).replace(/\.mdx?$/, ''),
                    absolutePath,
                    category: category(relativePath),
                    fields: { gitLogLatestDate: now.toISOString() },
                },
            })
        }
    }

    if (parsed > 0) writeCache(CACHE_NAME, { version: CACHE_VERSION, files })
    memo = nodes
    return nodes
}

/** The excerpt: the document's plain text, cut at a word boundary. */
export function excerpt(node: Pick<ContentNode, 'text'>, pruneLength = 140): string {
    const text = node.text ?? ''
    if (text.length <= pruneLength) return text
    const cut = text.slice(0, pruneLength - 1)
    return cut.slice(0, cut.lastIndexOf(' ') > 0 ? cut.lastIndexOf(' ') : cut.length) + '…'
}

export function contentBySlug(slug: string): ContentNode | undefined {
    return getContent().find((node) => node.fields.slug === slug)
}

export function contentById(id: string): ContentNode | undefined {
    return getContent().find((node) => node.id === id)
}

/** Nodes whose slug matches, the way a GraphQL `fields: { slug: { regex } }` filter did. */
export function contentMatching(pattern: RegExp): ContentNode[] {
    return getContent().filter((node) => pattern.test(node.fields.slug))
}

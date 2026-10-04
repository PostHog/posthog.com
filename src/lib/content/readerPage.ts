// The page shape the reader template (templates/Handbook.tsx) renders. Docs and the handbook build
// it from their own entries (lib/content/docs.ts, lib/content/handbook.ts).
import dayjs from 'dayjs'
import { contentById, excerpt } from '../../data-layer/content'
import type { GitCommit } from '../../data-layer/types'
import { gitHistory, type Author, type Contributor } from './people'

export interface TocItem {
    depth: number
    url: string
    value: string
}

export interface Section {
    name: string
    url: string
}

export interface ReaderPage {
    /** Content module key for MDXRenderer. */
    body: string
    /** URL path, e.g. /docs/feature-flags/installation. */
    slug: string
    title: string
    excerpt: string
    description?: string | null
    seo?: { metaTitle?: string; metaDescription?: string }
    tableOfContents: TocItem[]
    noindex: boolean
    featureFlag?: string
    hideRightSidebar: boolean
    contentMaxWidthClass?: string
    contributors: Contributor[]
    commits: GitCommit[]
    /** The source file for "Edit on GitHub": its repo, and its path there (relative to contents/ for posthog.com). */
    source: { repo: 'posthog.com' | 'posthog'; path: string }
    /** Shown under the title when the page asks for a byline. */
    byline: { authors: Author[]; date?: string; tags: string[] } | null
    /** The site section, for titles and breadcrumbs. */
    section: Section
}

interface Heading {
    depth: number
    slug: string
    text: string
}

/** The table of contents: h2 and below (depth starts at 0), from the headings the MDX entry type extracts. */
export function tableOfContents(entry: { rendered?: { metadata?: Record<string, unknown> } }): TocItem[] {
    const headings = (entry.rendered?.metadata?.headings ?? []) as Heading[]
    return headings
        .filter((heading) => heading.depth > 1)
        .map((heading) => ({ depth: heading.depth - 2, url: heading.slug, value: heading.text }))
}

const POSTHOG_REPO_PREFIX = '.cache/posthog-main-repo/'

/** Fields every reader page derives the same way from its file. */
export function fileFields(filePath: string, urlPrefix: string, id: string) {
    const node = contentById(`/${filePath}`)
    const fromPosthogRepo = filePath.startsWith(POSTHOG_REPO_PREFIX)
    const git = gitHistory(filePath)
    return {
        body: `/${filePath}`,
        slug: id === 'index' ? urlPrefix : `${urlPrefix}/${id}`,
        excerpt: node ? excerpt(node, 150) : '',
        contributors: git.contributors,
        commits: git.commits,
        source: fromPosthogRepo
            ? { repo: 'posthog' as const, path: filePath.slice(POSTHOG_REPO_PREFIX.length) }
            : { repo: 'posthog.com' as const, path: filePath.replace(/^contents\//, '') },
    }
}

export const formatDate = (date?: Date) => (date ? dayjs(date).format('MMM DD, YYYY') : undefined)

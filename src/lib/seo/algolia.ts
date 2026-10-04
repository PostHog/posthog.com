// Site search records for Algolia, built after the build from the built pages, the content index, the
// tool list, and the small teams. Every run writes all records to a
// temporary index, applies algoliaSettings.json, copies the rules and synonyms, and moves the temporary
// index over the live one.
import algoliasearch from 'algoliasearch'
import Slugger from 'github-slugger'
import type { ContentNode, Heading } from '../../data-layer/content'
import { excerpt } from '../../data-layer/content'
import type { PageViewsNode, SqueakTeamNode, ToolNode } from '../../data-layer/types'
import settings from './algoliaSettings.json'

// Lower values win after Algolia's textual relevance criteria tie.
const PATH_RANKING = {
    canonical: 0,
    content: 1,
    generic: 10,
    community: 15,
}

// Hand-curated canonical routes. Listing a path here has three effects: it gets top ranking
// (PATH_RANKING.canonical), it gets canonicalTerms built from its title, and the terms below are
// indexed as searchable headings. Don't add a path just to give it search terms — that promotes it.
const CANONICAL_ROUTES: Record<string, string[]> = {
    '/': ['Home', 'Homepage', 'PostHog homepage'],
    '/docs': ['Documentation', 'PostHog docs', 'Get started', 'Important links'],
    '/handbook': ['Company', 'How we work', 'People', 'Engineering', 'Design', 'Sales & marketing'],
    '/blog': ['PostHog blog', 'Inside PostHog', 'Product updates', 'Guides', 'Startups', 'Open source', 'CEO diaries'],
    '/compare': ['Compare tools', 'PostHog vs', 'Alternatives'],
    '/pricing': [
        'Cost',
        'PostHog pricing',
        'How much does PostHog cost',
        'Products',
        'Pricing calculator',
        'What comes in PostHog?',
        'Want to self-host PostHog?',
        'Compare all plans',
        'Questions',
    ],
    '/roadmap': ['Product roadmap', 'Planned features', 'Under consideration', 'In progress', 'Recently shipped'],
    '/careers': ['Jobs', 'Open roles', 'Work at PostHog'],
    '/teams': ['Small teams', 'Our teams'],
    '/customers': ['Customer stories', 'Case studies'],
    '/templates': ['Dashboard templates', 'PostHog templates'],
    '/questions': ['Community questions', 'Community answers', 'Features', 'Deployment', 'Data'],
    '/products': ['Tools', 'PostHog products', 'All PostHog tools'],
    '/demo': ['PostHog demo', 'Watch a demo'],
    '/talk-to-a-human': ['Contact sales', 'Sales demo'],
    '/about': ['About PostHog', 'Why PostHog', 'PostHog company'],
    '/changelog': ['Release notes', 'What is new in PostHog'],
    '/terms': ['Terms of service', 'PostHog terms'],
    '/dpa': ['Data processing agreement', 'PostHog DPA'],
    '/baa': ['Business associate agreement', 'PostHog BAA'],
    '/subprocessors': ['Third party processors', 'PostHog subprocessors'],
    '/mcp': ['Model context protocol'],
    '/self-driving': ['Self driving product'],
}

const PAGE_TYPE_RULES = [
    // `/products` is the Tool directory, not the canonical page for the WIP User Interviews entry.
    { type: 'tools', pattern: /^\/products$/ },
    { type: 'docs', pattern: /^\/(?:docs|manual|pricing)(?:\/|$)/ },
    { type: 'handbook', pattern: /^\/(?:handbook|product-engineer)(?:\/|$)/ },
    {
        type: 'blog',
        pattern: /^\/(?:blog|compare|spotlight|library|features|founders|newsletter|product-engineers)(?:\/|$)/,
    },
    { type: 'tutorial', pattern: /^\/tutorials(?:\/|$)/ },
    { type: 'customers', pattern: /^\/customers(?:\/|$)/ },
    { type: 'apps', pattern: /^\/apps(?:\/|$)/ },
    { type: 'cdp', pattern: /^\/cdp(?:\/|$)/ },
    { type: 'templates', pattern: /^\/templates(?:\/|$)/ },
    { type: 'legal', pattern: /^\/(?:terms|privacy|dpa|baa|subprocessors)(?:\/|$)/ },
    { type: 'community', pattern: /^\/(?:community|questions|roadmap)(?:\/|$)/ },
    {
        type: 'company',
        pattern:
            /^\/(?:about|careers|changelog|contributors|enterprise|media|merch|partnerships|people|services|small-teams|startups|talk-to-a-human|team-directory|teams)(?:\/|$)/,
    },
]

const EXCLUDED_PAGE_PATTERNS = [
    /^\/(?:404|dev-404-page|offline-plugin-app-shell-fallback)(?:\/|$)/,
    /^\/(?:code|connect|posts|r)(?:\/|$)/,
    /^\/(?:101|art-library|bookmarks|careers-og|components|display-options|events-feedback-form|image-annotator|old-home|reset-password|trash|wip)(?:\/|$)/,
    /^\/(?:community\/profiles\/me|data-stack\/dw-installation-platforms|team-updates)(?:\/|$)/,
    /\/(?:edit|new|orders|subscriptions)\/?$/,
    // Hogpedia is a parody encyclopedia. Its pages are crawlable and in the sitemap, but they
    // must not compete with the real docs in the site's own search.
    /^\/hogpedia(?:\/|$)/,
    /\/[^/]*-diagram(?:\/|$)/,
    /\.[a-z0-9]{2,5}(?:\/|$)/i,
]

// Words uppercased when turning path segments into titles and search terms.
const ACRONYMS = new Set([
    'ai',
    'api',
    'baa',
    'bi',
    'cdp',
    'dpa',
    'dw',
    'elt',
    'etl',
    'eu',
    'llm',
    'mcp',
    'os',
    'sdk',
    'sql',
    'sso',
    'ui',
    'url',
])

export interface AlgoliaRecord {
    objectID: string
    id: string
    title: string
    type: string
    slug: string
    fields: { slug: string; pageViews?: number }
    path_ranking: number
    canonicalTerms?: string[]
    headings: (Heading & { fragment?: string })[]
    rawBody: string
    excerpt: string
}

/** A built page: its path, and the src/views module that renders it, when a view does. */
export interface SearchPage {
    path: string
    /** e.g. /src/views/pricing.tsx. Undefined for pages built from content or data. */
    component?: string
}

interface SearchTool extends ToolNode {
    path: string
}

export interface AlgoliaInputs {
    pages: SearchPage[]
    content: ContentNode[]
    tools: ToolNode[]
    teams: SqueakTeamNode[]
    pageViews: PageViewsNode[]
}

const normalizePath = (value: string) => {
    const path = `/${String(value || '').replace(/^\/+/, '')}`.replace(/\/+$/, '')
    return path || '/'
}

const humanizeSegment = (segment: string) =>
    segment
        .split('-')
        .map((word) => (ACRONYMS.has(word.toLowerCase()) ? word.toUpperCase() : word))
        .join(' ')

const titleForPath = (path: string) => {
    if (path === '/') return 'PostHog'
    const title = humanizeSegment(path.split('/').filter(Boolean).at(-1) ?? '')
    return title.charAt(0).toUpperCase() + title.slice(1)
}

const toolPathsFromNodes = (tools: ToolNode[]): SearchTool[] =>
    tools
        .filter(({ slug, status }) => slug && status !== 'WIP')
        .map((tool) => ({ ...tool, path: normalizePath(tool.slug ?? '') }))

const exactToolForPath = (path: string, tools: SearchTool[]) => tools.find(({ path: toolPath }) => path === toolPath)

// The `tools` type is reserved for the one canonical page per tool. Subpages of a tool's path
// (e.g. /session-replay/pricing, /data-stack/warehouse-native) are slotted into `docs` instead.
const hasToolAncestor = (path: string, tools: SearchTool[]) =>
    tools.some(({ path: toolPath }) => path !== toolPath && path.startsWith(`${toolPath}/`))

const descriptionForTool = (tool?: SearchTool) => tool?.searchDescription || tool?.description || ''

const typeForPath = (path: string, exactTool: SearchTool | undefined, toolPaths: SearchTool[]) => {
    if (exactTool) return 'tools'
    return (
        PAGE_TYPE_RULES.find(({ pattern }) => pattern.test(path))?.type ||
        (hasToolAncestor(path, toolPaths) ? 'docs' : 'pages')
    )
}

const isCanonicalPath = (path: string, exactTool?: SearchTool) =>
    path === '/' || Boolean(exactTool) || Object.prototype.hasOwnProperty.call(CANONICAL_ROUTES, path)

const canonicalTermsForPath = (path: string, title: string, tool?: SearchTool): string[] => {
    const names = [title, tool?.name, ...(tool?.aliases || [])].filter((name): name is string => !!name)
    const pathName = path === '/' ? null : humanizeSegment(path.split('/').filter(Boolean).at(-1) ?? '')

    return [
        ...new Set([
            ...names,
            pathName,
            ...names.flatMap((name) => (/^posthog\b/i.test(name) ? [] : [`PostHog ${name}`])),
        ]),
    ].filter((term): term is string => !!term)
}

// Humanized path segments stand in for headings only on pages with no MDX content — content
// pages already match via their real title/headings, and segments are searchable via `slug`.
const searchTermsForPath = (path: string, tool: SearchTool | undefined, includePathSegments: boolean) => [
    ...new Set([
        ...(includePathSegments ? path.split('/').filter(Boolean).map(humanizeSegment) : []),
        ...(CANONICAL_ROUTES[path] || []),
        ...(tool ? [tool.name, ...(tool.aliases || [])] : []),
    ]),
]

const isExcludedPath = (path: string) => EXCLUDED_PAGE_PATTERNS.some((pattern) => pattern.test(path))

// The file-based pages in src/views are searchable, except dynamic routes and files whose name
// starts with `_` or a capital letter.
const isSearchableStaticPage = ({ path, component }: SearchPage) => {
    if (!component?.includes('/src/views/')) return false
    if (component.includes('[') || component.includes('{')) return false
    const filename = (component.split('/').at(-1) ?? '').replace(/\.[^.]+$/, '')
    return !filename.startsWith('_') && !/^[A-Z]/.test(filename) && !isExcludedPath(path)
}

/** Indexable content by page path. Content from contents/ wins over the posthog/posthog clone. */
const contentByPath = (nodes: ContentNode[], builtPaths: Set<string>) => {
    const content = new Map<string, ContentNode>()
    nodes
        .filter(
            ({ fields, frontmatter, isFuture }) =>
                fields.slug &&
                frontmatter.title &&
                !frontmatter.hideFromIndex &&
                !frontmatter.noindex &&
                !frontmatter.isInFrame &&
                !frontmatter.featureFlag &&
                !isFuture
        )
        .forEach((node) => {
            const path = normalizePath(node.fields.slug)
            if (!builtPaths.has(path) || isExcludedPath(path)) return
            if (content.get(path)?.parent.sourceInstanceName === 'contents') return
            content.set(path, node)
        })
    return content
}

const createPageRecord = (
    page: SearchPage,
    content: ContentNode | undefined,
    toolPaths: SearchTool[],
    pageViews: Map<string, number>
): AlgoliaRecord => {
    const { path } = page
    const exactTool = exactToolForPath(path, toolPaths)
    const title =
        exactTool?.searchTitle || exactTool?.name || (content?.frontmatter.title as string) || titleForPath(path)
    const description = descriptionForTool(exactTool) || (content ? excerpt(content) : '')
    const searchTerms = searchTermsForPath(path, exactTool, !content)
    const slugger = new Slugger()
    const isCanonical = isCanonicalPath(path, exactTool)
    const type = typeForPath(path, exactTool, toolPaths)
    const id = content?.id || `SitePage ${path}`

    return {
        objectID: id,
        id,
        title,
        type,
        slug: path === '/' ? '' : path.slice(1),
        fields: content ? { pageViews: pageViews.get(content.fields.slug) ?? 0, slug: path } : { slug: path },
        path_ranking: isCanonical
            ? PATH_RANKING.canonical
            : type === 'community'
              ? PATH_RANKING.community
              : content
                ? PATH_RANKING.content
                : PATH_RANKING.generic,
        ...(isCanonical ? { canonicalTerms: canonicalTermsForPath(path, title, exactTool) } : {}),
        headings: [
            ...searchTerms.map((value) => ({ value, depth: 2 })),
            ...(content?.headings || []).map((heading) => ({
                ...heading,
                fragment: slugger.slug(heading.value) as string,
            })),
        ],
        rawBody: content?.rawBody || searchTerms.join(' '),
        excerpt: description,
    }
}

const createTeamRecord = ({ id, name, slug, tagline, description, profiles }: SqueakTeamNode): AlgoliaRecord => {
    const path = normalizePath(`/teams/${slug}`)
    const title = /\bteam$/i.test(name) ? name : `${name} team`
    const teamName = name.replace(/\s+team$/i, '')
    const memberNames =
        profiles?.data?.flatMap(({ attributes }) => {
            const memberName = [attributes?.firstName, attributes?.lastName].filter(Boolean).join(' ')
            return memberName ? [memberName] : []
        }) || []

    return {
        objectID: id,
        id,
        title,
        type: 'company',
        slug: path.slice(1),
        fields: { slug: path },
        path_ranking: PATH_RANKING.content,
        canonicalTerms: [title, `PostHog ${title}`, `${teamName} small team`, `PostHog small team ${teamName}`],
        headings: [],
        rawBody: [tagline, description, ...memberNames].filter(Boolean).join(' '),
        excerpt: description || tagline || '',
    }
}

/** The search records: one per indexable page, plus one per small team. */
export function algoliaRecords({ pages, content, tools, teams, pageViews }: AlgoliaInputs): AlgoliaRecord[] {
    const pagesByPath = new Map<string, SearchPage>()
    for (const page of pages) {
        const path = normalizePath(page.path)
        if (!pagesByPath.has(path)) pagesByPath.set(path, { ...page, path })
    }

    const contentPages = contentByPath(content, new Set(pagesByPath.keys()))
    const toolPaths = toolPathsFromNodes(tools).filter(({ path }) => pagesByPath.has(path))
    const views = new Map(pageViews.map(({ pathname, count }) => [pathname, count]))
    const records = new Map<string, AlgoliaRecord>()

    pagesByPath.forEach((page, path) => {
        const pageContent = contentPages.get(path)
        if (pageContent || isSearchableStaticPage(page)) {
            records.set(path, createPageRecord(page, pageContent, toolPaths, views))
        }
    })

    teams
        .filter((team) => team.name !== 'Hedgehogs' && team.slug && team.crest?.publicId)
        .forEach((team) => {
            const record = createTeamRecord(team)
            records.set(record.fields.slug, record)
        })

    return [...records.values()].sort((a, b) => a.fields.slug.localeCompare(b.fields.slug))
}

const CHUNK_SIZE = 10000

/** Replaces the index with `records`. There are no partial updates. */
export async function uploadAlgoliaRecords(
    records: AlgoliaRecord[],
    { appId, apiKey, indexName }: { appId: string; apiKey: string; indexName: string }
): Promise<void> {
    // algoliasearch v4 timeouts are in seconds.
    const client = algoliasearch(appId, apiKey, { timeouts: { connect: 20, read: 30, write: 60 } })
    const index = client.initIndex(indexName)
    const tempIndex = client.initIndex(`${indexName}_temp${Math.floor(Math.random() * 100 + 1)}`)
    const indexExists = await index.exists()

    for (let i = 0; i < records.length; i += CHUNK_SIZE) {
        await tempIndex.saveObjects(records.slice(i, i + CHUNK_SIZE)).wait()
    }
    // Replicas cannot be set on the temporary index. The live index keeps its own.
    await tempIndex.setSettings(settings as Parameters<typeof tempIndex.setSettings>[0]).wait()
    if (indexExists) {
        await client.copyIndex(indexName, tempIndex.indexName, { scope: ['rules', 'synonyms'] }).wait()
    }
    await client.moveIndex(tempIndex.indexName, indexName).wait()
}

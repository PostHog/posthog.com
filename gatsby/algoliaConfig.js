const Slugger = require('github-slugger')
const settings = require('./algoliaSettings.json')

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
const CANONICAL_ROUTES = {
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
        pattern:
            /^\/(?:(?:blog|compare|spotlight|library|features|founders|newsletter|product-engineers)(?:\/|$)|ko\/newsletter(?:\/|$))/,
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

const normalizePath = (value) => {
    const path = `/${String(value || '').replace(/^\/+/, '')}`.replace(/\/+$/, '')
    return path || '/'
}

const humanizeSegment = (segment) =>
    segment
        .split('-')
        .map((word) => (ACRONYMS.has(word.toLowerCase()) ? word.toUpperCase() : word))
        .join(' ')

const titleForPath = (path) => {
    if (path === '/') return 'PostHog'
    const title = humanizeSegment(path.split('/').filter(Boolean).at(-1))
    return title.charAt(0).toUpperCase() + title.slice(1)
}

const toolPathsFromNodes = (tools) =>
    tools
        .filter(({ slug, status }) => slug && status !== 'WIP')
        .map((tool) => ({
            ...tool,
            path: normalizePath(tool.slug),
        }))

const exactToolForPath = (path, tools) => tools.find(({ path: toolPath }) => path === toolPath)

// The `tools` type is reserved for the one canonical page per tool. Subpages of a tool's path
// (e.g. /session-replay/pricing, /data-stack/warehouse-native) are slotted into `docs` instead.
const hasToolAncestor = (path, tools) =>
    tools.some(({ path: toolPath }) => path !== toolPath && path.startsWith(`${toolPath}/`))

const descriptionForTool = (tool) => tool?.searchDescription || tool?.description || ''

const typeForPath = (path, exactTool, toolPaths) => {
    if (exactTool) return 'tools'
    return (
        PAGE_TYPE_RULES.find(({ pattern }) => pattern.test(path))?.type ||
        (hasToolAncestor(path, toolPaths) ? 'docs' : 'pages')
    )
}

const isCanonicalPath = (path, exactTool) =>
    path === '/' || Boolean(exactTool) || Object.prototype.hasOwnProperty.call(CANONICAL_ROUTES, path)

const canonicalTermsForPath = (path, title, tool) => {
    const names = [title, tool?.name, ...(tool?.aliases || [])].filter(Boolean)
    const pathName = path === '/' ? null : humanizeSegment(path.split('/').filter(Boolean).at(-1))

    return [
        ...new Set([
            ...names,
            pathName,
            ...names.flatMap((name) => (/^posthog\b/i.test(name) ? [] : [`PostHog ${name}`])),
        ]),
    ].filter(Boolean)
}

// Humanized path segments stand in for headings only on pages with no MDX content — content
// pages already match via their real title/headings, and segments are searchable via `slug`.
const searchTermsForPath = (path, tool, { includePathSegments }) => [
    ...new Set([
        ...(includePathSegments ? path.split('/').filter(Boolean).map(humanizeSegment) : []),
        ...(CANONICAL_ROUTES[path] || []),
        ...(tool ? [tool.name, ...(tool.aliases || [])] : []),
    ]),
]

const isExcludedPath = (path) => EXCLUDED_PAGE_PATTERNS.some((pattern) => pattern.test(path))

const isSearchableStaticPage = ({ path, component }) => {
    const normalizedComponent = String(component || '')
        .split('?')[0]
        .replace(/\\/g, '/')
    if (!normalizedComponent.includes('/src/pages/')) return false
    if (normalizedComponent.includes('[') || normalizedComponent.includes('{')) return false

    const filename = normalizedComponent
        .split('/')
        .at(-1)
        .replace(/\.[^.]+$/, '')
    return !filename.startsWith('_') && !/^[A-Z]/.test(filename) && !isExcludedPath(path)
}

const contentByPath = (nodes, sitePathsByContentId) => {
    const content = new Map()

    nodes
        .filter(
            ({ fields, frontmatter, isFuture, slug }) =>
                (fields?.slug || slug) &&
                frontmatter?.title &&
                !frontmatter.hideFromIndex &&
                !frontmatter.noindex &&
                !frontmatter.isInFrame &&
                !frontmatter.featureFlag &&
                !isFuture
        )
        .forEach((node) => {
            const path = normalizePath(node.fields?.slug || node.slug)
            if (!sitePathsByContentId.get(node.id)?.has(path) || isExcludedPath(path)) return
            content.set(path, node)
        })

    return content
}

const createPageRecord = (page, content, toolPaths) => {
    const path = page.path
    const exactTool = exactToolForPath(path, toolPaths)
    const title = exactTool?.searchTitle || exactTool?.name || content?.frontmatter.title || titleForPath(path)
    const description = descriptionForTool(exactTool) || content?.excerpt || ''
    const searchTerms = searchTermsForPath(path, exactTool, { includePathSegments: !content })
    const slugger = new Slugger()
    const isCanonical = isCanonicalPath(path, exactTool)
    const type = typeForPath(path, exactTool, toolPaths)

    return {
        id: content?.id || page.id,
        title,
        type,
        slug: path === '/' ? '' : path.slice(1),
        fields: {
            ...content?.fields,
            slug: path,
        },
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
                fragment: slugger.slug(heading.value),
            })),
        ],
        rawBody: content?.rawBody || searchTerms.join(' '),
        excerpt: description,
    }
}

const createTeamRecord = ({ id, name, slug, tagline, description, profiles }) => {
    const path = normalizePath(`/teams/${slug}`)
    const title = /\bteam$/i.test(name) ? name : `${name} team`
    const teamName = name.replace(/\s+team$/i, '')
    const memberNames =
        profiles?.data?.flatMap(({ attributes }) => {
            const memberName = [attributes?.firstName, attributes?.lastName].filter(Boolean).join(' ')
            return memberName ? [memberName] : []
        }) || []

    return {
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

const retrieveSearchPages = {
    query: `
        {
          pages: allSitePage {
            nodes {
              id
              path
              component
              contentId: searchContentId
            }
          }
          content: allMdx {
            nodes {
              id
              headings {
                value
                depth
              }
              fields {
                pageViews
                slug
              }
              rawBody
              excerpt
              frontmatter {
                title
                featureFlag
                hideFromIndex
                isInFrame
                noindex
              }
              isFuture
              slug
            }
          }
          tools: allTool {
            nodes {
              aliases
              description
              name
              searchDescription
              searchTitle
              slug
              status
            }
          }
          teams: allSqueakTeam(
            filter: {
              name: {ne: "Hedgehogs"}
              slug: {ne: null}
              crest: {publicId: {ne: null}}
            }
          ) {
            nodes {
              id
              name
              slug
              tagline
              description
              profiles {
                data {
                  attributes {
                    firstName
                    lastName
                  }
                }
              }
            }
          }
        }
    `,
    transformer: ({ data }) => {
        const pages = new Map()
        const contentIds = new Set(data.content.nodes.map(({ id }) => id))
        const sitePathsByContentId = new Map()

        data.pages.nodes.forEach((page) => {
            const path = normalizePath(page.path)
            const current = pages.get(path)
            if (!current || page.id.localeCompare(current.id) < 0) {
                pages.set(path, { ...page, path })
            }
        })

        pages.forEach((page, path) => {
            if (page.contentId && contentIds.has(page.contentId)) {
                const paths = sitePathsByContentId.get(page.contentId) || new Set()
                paths.add(path)
                sitePathsByContentId.set(page.contentId, paths)
            }
        })

        const content = contentByPath(data.content.nodes, sitePathsByContentId)
        const toolPaths = toolPathsFromNodes(data.tools.nodes).filter(({ path }) => pages.has(path))
        const records = new Map()

        pages.forEach((page, path) => {
            const pageContent = content.get(path)
            if (pageContent || isSearchableStaticPage(page)) {
                records.set(path, createPageRecord(page, pageContent, toolPaths))
            }
        })

        data.teams.nodes.forEach((team) => {
            const record = createTeamRecord(team)
            records.set(record.fields.slug, record)
        })

        return [...records.values()].sort((a, b) => a.fields.slug.localeCompare(b.fields.slug))
    },
}

if (!process.env.GATSBY_ALGOLIA_APP_ID || !process.env.ALGOLIA_API_KEY || !process.env.GATSBY_ALGOLIA_INDEX_NAME) {
    console.warn('No Algolia keys present in environment, skipping sending information to algolia')
}

module.exports = {
    // This plugin must be placed last in your list of plugins to ensure that it can query all the GraphQL data.
    resolve: `gatsby-plugin-algolia`,
    options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
        queries: [retrieveSearchPages],
        settings,
        chunkSize: 10000,
        mergeSettings: false,
        concurrentQueries: false,
        dryRun: false,
        continueOnFailure: false,
        algoliasearchOptions: {
            timeouts: {
                connect: 20,
                read: 30,
                write: 60,
            },
        },
    },
}

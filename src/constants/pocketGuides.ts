/** The volumes on the shelf. Data only, so `gatsby/` can import it in Node at build time. */

/** Spine colours. Limited to safelisted tokens, since the spine is built as `bg-<token>`. */
export type PocketGuideToken = 'orange' | 'purple' | 'blue' | 'yellow'

/** Optional pages under a Learn hub, at /learn/<product>/<page>. */
export type LearnHubPage = 'agent-prompts-and-mcp' | 'live-playground'

export interface PocketGuideVolume {
    /** Topic directory: contents/learn/<id>/pocket-guide/. Independent of the public route. */
    id: string
    title: string
    /** One line on the shelf. What the volume gets you, not what's in it. */
    description: string
    /** Project color token, bare – callers build text-/border-/bg- from it. */
    token: PocketGuideToken
    /** Printed on the docs library spines, which sort by it. The shelf follows array order. */
    volume: number
    /** Docs slug of the product this volume teaches. Omit when it teaches no single product. */
    docsProduct?: string
    /** Product handle for the tabbed Learn reader. Omit to use the regular docs sidebar. */
    productHandle?: string
    /** Route where Pocket Guide touchpoints should open this volume. */
    learnPath?: string
    /** Show an Overview page at /learn/<product> and list the extra hub pages that exist. Omit for a flat chapter list. */
    learnHub?: { pages?: LearnHubPage[] }
    /** Count the front matter and primer while this volume consists of those two learning pages. */
    countOrientationPages?: boolean
    /** A hand-written src/pages file owns this route, so don't generate one. */
    hasStaticPage?: boolean
    /** Announced but unwritten – renders as a cover with a sash and no link. */
    comingSoon?: boolean
}

/**
 * Every volume opens the same way: front matter at `pocketGuideOrder: 0`, a 101 at 1. Guides are what
 * follows. Authors assigning `pocketGuideOrder` in a volume's MDX frontmatter count from here.
 */
export const FIRST_GUIDE_BOOK_ORDER = 2

export const POCKET_GUIDE_VOLUMES: PocketGuideVolume[] = [
    {
        id: 'product-analytics',
        title: 'Product Analytics',
        description: 'Record what people do in Twig, connect their activity, and build reports you can explain.',
        token: 'blue',
        volume: 5,
        docsProduct: 'product-analytics',
        productHandle: 'product_analytics',
        learnPath: '/learn/product-analytics/pocket-guide',
        learnHub: { pages: ['agent-prompts-and-mcp', 'live-playground'] },
        countOrientationPages: true,
    },
    {
        id: 'ai-observability',
        title: 'AI Observability',
        description: 'Tracing every LLM call, scoring what comes back, and seeing what users do with it.',
        token: 'purple',
        volume: 2,
        docsProduct: 'ai-observability',
        productHandle: 'ai_observability',
        learnPath: '/learn/ai-observability/pocket-guide',
        learnHub: { pages: ['agent-prompts-and-mcp'] },
    },
    {
        id: 'data-stack',
        title: 'Data Stack',
        description:
            'Model revenue, conversion, activation, and usage once, so every dashboard and downstream model reuses the same definition.',
        token: 'blue',
        volume: 3,
        docsProduct: 'data-warehouse',
        learnPath: '/docs/data-warehouse/pocket-guide',
    },
    {
        id: 'session-replay',
        title: 'Session Replay',
        description: 'Watch how people actually use your product – or let Replay Vision watch it for you.',
        token: 'yellow',
        volume: 4,
        docsProduct: 'session-replay',
        productHandle: 'session_replay',
        learnPath: '/learn/session-replay/pocket-guide',
        learnHub: { pages: ['agent-prompts-and-mcp'] },
    },
    {
        id: 'feature-flags',
        title: 'Feature Flags',
        description: 'Ship code turned off, then decide from PostHog who gets it – and turn it back off in seconds.',
        token: 'orange',
        volume: 6,
        docsProduct: 'feature-flags',
        productHandle: 'feature_flags',
        learnPath: '/learn/feature-flags/pocket-guide',
        learnHub: { pages: ['agent-prompts-and-mcp'] },
    },
    {
        id: 'self-driving',
        title: 'Self-driving',
        description: 'Scouts that watch your product and open a pull request when something breaks.',
        token: 'orange',
        volume: 1,
        docsProduct: 'self-driving',
        learnPath: '/docs/self-driving/pocket-guide',
    },
]

/** The volume that teaches a product, if one does. Drives `GuidesForProduct` on tool docs pages. */
export function volumeForProduct(docsProduct: string): PocketGuideVolume | undefined {
    return POCKET_GUIDE_VOLUMES.find((v) => v.docsProduct === docsProduct && !v.comingSoon)
}

export function volumeById(id: string): PocketGuideVolume | undefined {
    return POCKET_GUIDE_VOLUMES.find((v) => v.id === id)
}

/** SEO title for a chapter. The intro chapter shares the volume's title, so it reads "A pocket guide to <volume>". */
export function pocketGuidePageTitle(volume: PocketGuideVolume, chapterTitle?: string): string {
    if (!chapterTitle || chapterTitle === volume.title) return `A pocket guide to ${volume.title}`
    return `${chapterTitle} – ${volume.title} pocket guide`
}

/** Covers, cards, and Pocket Guide links open the volume's configured entry route. */
export function pocketGuideUrl(volume: PocketGuideVolume): string {
    return volume.learnPath ?? `/pocket-guides/${volume.id}`
}

/** Resolve a source MDX URL to its public reader, preserving chapter, query, and fragment. */
export function pocketGuideDestination(url: string): string {
    const match =
        url.match(/^\/pocket-guides\/([^/?#]+)(.*)$/) ?? url.match(/^\/learn\/([^/]+)\/pocket-guide(?=\/|[?#]|$)(.*)$/)
    const volume = match && volumeById(match[1])
    return volume ? `${pocketGuideUrl(volume)}${match[2]}` : url
}

/**
 * Authored guide sources live at `/learn/<id>/pocket-guide/...`. The leading slash is optional
 * because Gatsby's MDX `slug` field omits it. gatsby/algoliaConfig.js (plain JS) keeps a copy.
 */
export const POCKET_GUIDE_SOURCE = /^\/?learn\/([^/]+)\/pocket-guide(?:\/|$)/

/** Identify authored guide content; never infer the topic from a public docs slug. */
export function pocketGuideSourceVolume(sourceSlug: string): PocketGuideVolume | undefined {
    const match = sourceSlug.match(POCKET_GUIDE_SOURCE)
    return match ? volumeById(match[1]) : undefined
}

/** Shared by full and preview builds. Skills, starters, and unordered drafts aren't pages. */
export function pocketGuidePageContext(sourceSlug: string, order?: number | null) {
    const volume = pocketGuideSourceVolume(sourceSlug)
    if (!volume || typeof order !== 'number' || sourceSlug.endsWith('/SKILL') || /\/_/.test(sourceSlug))
        return undefined
    const publicPath = pocketGuideDestination(sourceSlug).replace(/\/$/, '')
    return {
        publicPath,
        volumeId: volume.id,
        chapter: order === 0 ? '' : publicPath.split('/').pop() || '',
    }
}

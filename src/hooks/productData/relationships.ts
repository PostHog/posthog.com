/**
 * Single source of truth for how PostHog products relate to one another.
 *
 * Add or edit edges here to control what shows up in:
 *   - The Product Galaxy view (/products/galaxy)
 *   - The "Works with..." panel in the product sidebar
 *   - The "Pairs with..." slide on product landing pages
 *
 * Edges are stored using product `handle` (snake_case). Slugs and aliases
 * are normalized on read via SLUG_ALIASES below.
 */

export type ProductHandle = string

/**
 * Edge variants between two products.
 *
 * - `pairsWith`: canonical marketing pairing with a description. Drives the graph
 *   and the "Pairs with..." slide.
 * - `billedWith`: directional. Target is the parent product for pricing.
 * - `sharesFreeTier`: directional. Target is the product whose free tier is shared.
 * - `worksWith`: @deprecated loose integration tag retained only so the existing
 *   `ProductSidebar` "Works with..." accordion keeps rendering. Excluded from the
 *   Product Galaxy graph and recommendations. Migrate sidebars to read from
 *   `pairsWith` and drop this variant.
 */
export type EdgeType = 'pairsWith' | 'worksWith' | 'billedWith' | 'sharesFreeTier'

export interface ProductEdge {
    from: ProductHandle
    to: ProductHandle
    type: EdgeType
    /** Marketing copy for `pairsWith` edges. Optional for other edge types. */
    description?: string
}

export const EDGE_WEIGHTS: Record<EdgeType, number> = {
    pairsWith: 3,
    billedWith: 2,
    sharesFreeTier: 2,
    worksWith: 1,
}

export const EDGE_DIRECTED: Record<EdgeType, boolean> = {
    pairsWith: false,
    worksWith: false,
    billedWith: true,
    sharesFreeTier: true,
}

/**
 * Map of non-canonical references (kebab-case slugs, partial paths) to the
 * canonical product handle. Used when reading legacy data and when rendering
 * `pairsWith` entries whose slug field doesn't match a product's slug field.
 */
export const SLUG_ALIASES: Record<string, ProductHandle> = {
    'product-analytics': 'product_analytics',
    'session-replay': 'session_replay',
    'feature-flags': 'feature_flags',
    surveys: 'surveys',
    'data-warehouse': 'data_warehouse',
    'data-stack/managed-warehouse': 'data_warehouse',
    'realtime-destinations': 'realtime_destinations',
    'error-tracking': 'error_tracking',
    cdp: 'cdp',
    'web-analytics': 'web_analytics',
    experiments: 'experiments',
    ai: 'posthog_ai',
    'posthog-ai': 'posthog_ai',
    'llm-analytics': 'llm_analytics',
    'revenue-analytics': 'revenue_analytics',
    logs: 'logs',
    workflows: 'workflows_emails',
    workflows_emails: 'workflows_emails',
    endpoints: 'endpoints',
}

/** Reverse: handle → primary slug used for routing on the live site. */
export const HANDLE_TO_SLUG: Record<ProductHandle, string> = {
    product_analytics: 'product-analytics',
    session_replay: 'session-replay',
    feature_flags: 'feature-flags',
    surveys: 'surveys',
    data_warehouse: 'data-stack/managed-warehouse',
    realtime_destinations: 'realtime-destinations',
    error_tracking: 'error-tracking',
    cdp: 'cdp',
    web_analytics: 'web-analytics',
    experiments: 'experiments',
    posthog_ai: 'ai',
    llm_analytics: 'llm-analytics',
    revenue_analytics: 'revenue-analytics',
    logs: 'logs',
    workflows_emails: 'workflows',
    endpoints: 'endpoints',
}

/**
 * The 16 main billed products that appear as nodes in the Product Galaxy.
 * Mirrors `initialProducts` in `useProducts.tsx`.
 */
export const MAIN_PRODUCT_HANDLES: ReadonlyArray<ProductHandle> = [
    'product_analytics',
    'session_replay',
    'feature_flags',
    'surveys',
    'data_warehouse',
    'realtime_destinations',
    'error_tracking',
    'cdp',
    'web_analytics',
    'experiments',
    'posthog_ai',
    'llm_analytics',
    'revenue_analytics',
    'logs',
    'workflows_emails',
    'endpoints',
]

/**
 * Authoritative edge list. Lifted one-time from the per-product data files.
 * `worksWith` edges describe loose feature-level integration.
 * `pairsWith` edges are curated companion products with marketing copy.
 * `billedWith` and `sharesFreeTier` edges are directional (from -> to is the parent).
 */
export const productEdges: ProductEdge[] = [
    // -- product_analytics --
    { from: 'product_analytics', to: 'session_replay', type: 'worksWith' },
    { from: 'product_analytics', to: 'feature_flags', type: 'worksWith' },
    { from: 'product_analytics', to: 'surveys', type: 'worksWith' },
    {
        from: 'product_analytics',
        to: 'session_replay',
        type: 'pairsWith',
        description:
            'Jump into a playlist of session recordings directly from any point in a graph, or segment of a funnel',
    },
    {
        from: 'product_analytics',
        to: 'feature_flags',
        type: 'pairsWith',
        description: "See which feature flags are enabled for a user's session",
    },
    {
        from: 'product_analytics',
        to: 'experiments',
        type: 'pairsWith',
        description:
            'Generate a playlist of recordings limited to an A/B test or specific group within a multivariate experiment.',
    },

    // -- session_replay --
    {
        from: 'session_replay',
        to: 'product_analytics',
        type: 'pairsWith',
        description: 'Jump into a playlist of session recordings directly from any time series in a graph',
    },
    {
        from: 'session_replay',
        to: 'feature_flags',
        type: 'pairsWith',
        description: "See which feature flags are enabled for a user's session",
    },
    {
        from: 'session_replay',
        to: 'experiments',
        type: 'pairsWith',
        description:
            'Generate a playlist of recordings limited to an A/B test or specific group within a multivariate experiment.',
    },

    // -- feature_flags --
    {
        from: 'feature_flags',
        to: 'product_analytics',
        type: 'pairsWith',
        description:
            "Run any insight filtered by a flag's value, or group by flag to see usage across a flag's variants",
    },
    {
        from: 'feature_flags',
        to: 'session_replay',
        type: 'pairsWith',
        description: 'Filter recordings down to only when a feature flag was called, or to a specific value of a flag',
    },

    // -- surveys --
    {
        from: 'surveys',
        to: 'product_analytics',
        type: 'pairsWith',
        description: 'Use insights to breakdown average scores, analyze results over time, or find trends.',
    },
    {
        from: 'surveys',
        to: 'feature_flags',
        type: 'pairsWith',
        description: 'Connect a survey to a feature flag to gather feedback on your latest ideas and tests.',
    },
    {
        from: 'surveys',
        to: 'session_replay',
        type: 'pairsWith',
        description:
            "Watch recordings of users completing a survey to understand full context about a user's behavior.",
    },

    // -- data_warehouse --
    {
        from: 'data_warehouse',
        to: 'product_analytics',
        type: 'pairsWith',
        description: 'Analyze data from any source independently, or alongside product data.',
    },
    {
        from: 'data_warehouse',
        to: 'feature_flags',
        type: 'pairsWith',
        description: 'Use synced data to toggle feature flags, trigger A/B experiments, and more.',
    },
    {
        from: 'data_warehouse',
        to: 'experiments',
        type: 'pairsWith',
        description: 'You can use data warehouse data as primary or secondary metrics in experiments.',
    },

    // -- error_tracking --
    {
        from: 'error_tracking',
        to: 'session_replay',
        type: 'pairsWith',
        description: 'Watch exactly how an error occurred for a specific user',
    },
    {
        from: 'error_tracking',
        to: 'product_analytics',
        type: 'pairsWith',
        description: 'Analyze trends over time and get alerts when things go wrong',
    },
    {
        from: 'error_tracking',
        to: 'feature_flags',
        type: 'pairsWith',
        description: 'Roll back features that cause errors, or test fixes with slow rollouts',
    },

    // -- cdp --
    {
        from: 'cdp',
        to: 'product_analytics',
        type: 'pairsWith',
        description:
            'Get your source data into PostHog, then analyze it alongside your product data to unlock new insights and discover new user behaviors.',
    },
    {
        from: 'cdp',
        to: 'data_warehouse',
        type: 'pairsWith',
        description:
            'Build a data warehouse in PostHog and then pull in data from all your platforms to one place where it can be easily interrogated.',
    },

    // -- web_analytics --
    { from: 'web_analytics', to: 'product_analytics', type: 'billedWith' },
    {
        from: 'web_analytics',
        to: 'product_analytics',
        type: 'pairsWith',
        description: 'Go deeper than a dashboard by building your own insights and SQL queries from scratch.',
    },
    {
        from: 'web_analytics',
        to: 'session_replay',
        type: 'pairsWith',
        description:
            "Get more context by watching what users actually do on your site. Spot the nuances that quantifiable data doesn't tell you.",
    },
    {
        from: 'web_analytics',
        to: 'surveys',
        type: 'pairsWith',
        description:
            'Get even more context by sending surveys to users. Arrange interviews. Ask questions. Serve pop-ups.',
    },

    // -- experiments --
    { from: 'experiments', to: 'feature_flags', type: 'billedWith' },
    { from: 'experiments', to: 'feature_flags', type: 'sharesFreeTier' },
    {
        from: 'experiments',
        to: 'product_analytics',
        type: 'pairsWith',
        description: 'Run analysis based on the value of a test, or build a cohort of users from a test variant',
    },
    {
        from: 'experiments',
        to: 'session_replay',
        type: 'pairsWith',
        description:
            "Watch recordings of users in a variant to discover nuances in why they did or didn't complete the goal",
    },
    {
        from: 'experiments',
        to: 'feature_flags',
        type: 'pairsWith',
        description: 'Make changes to the feature flag the experiment uses - including JSON payload for each variant',
    },

    // -- posthog_ai --
    {
        from: 'posthog_ai',
        to: 'product_analytics',
        type: 'pairsWith',
        description:
            'Get your source data into PostHog, then analyze it alongside your product data to unlock new insights and discover new user behaviors.',
    },
    {
        from: 'posthog_ai',
        to: 'data_warehouse',
        type: 'pairsWith',
        description:
            'Build a data warehouse in PostHog and then pull in data from all your platforms to one place where it can be easily interrogated.',
    },

    // -- llm_analytics --
    { from: 'llm_analytics', to: 'product_analytics', type: 'worksWith' },
    { from: 'llm_analytics', to: 'session_replay', type: 'worksWith' },
    { from: 'llm_analytics', to: 'feature_flags', type: 'worksWith' },
    {
        from: 'llm_analytics',
        to: 'product_analytics',
        type: 'pairsWith',
        description: 'Correlate AI usage with user behavior and business metrics',
    },
    {
        from: 'llm_analytics',
        to: 'session_replay',
        type: 'pairsWith',
        description: 'Watch how users interact with AI features in real sessions',
    },
    {
        from: 'llm_analytics',
        to: 'feature_flags',
        type: 'pairsWith',
        description: 'Roll out AI features gradually and test different models',
    },

    // -- revenue_analytics --
    { from: 'revenue_analytics', to: 'data_warehouse', type: 'billedWith' },
    {
        from: 'revenue_analytics',
        to: 'product_analytics',
        type: 'pairsWith',
        description: 'Analyze revenue alongside user behavior and product usage',
    },
    {
        from: 'revenue_analytics',
        to: 'web_analytics',
        type: 'pairsWith',
        description: 'See revenue attribution by traffic source and campaign',
    },
    {
        from: 'revenue_analytics',
        to: 'data_warehouse',
        type: 'pairsWith',
        description: 'Connect payment platforms for automatic revenue tracking',
    },

    // -- workflows_emails --
    { from: 'workflows_emails', to: 'experiments', type: 'worksWith' },
    { from: 'workflows_emails', to: 'product_analytics', type: 'worksWith' },
    { from: 'workflows_emails', to: 'feature_flags', type: 'worksWith' },
    { from: 'workflows_emails', to: 'error_tracking', type: 'worksWith' },
    {
        from: 'workflows_emails',
        to: 'experiments',
        type: 'pairsWith',
        description:
            'Automatically follow up with users from test variants: send feedback surveys, activate successful groups, or roll out winning experiences.',
    },
    {
        from: 'workflows_emails',
        to: 'product_analytics',
        type: 'pairsWith',
        description:
            'Trigger automations from real user behavior. Every click, session, or conversion can start a workflow.',
    },
    {
        from: 'workflows_emails',
        to: 'feature_flags',
        type: 'pairsWith',
        description:
            'React when a feature is turned on, off, or rolled out to a specific segment. Target messages or follow-ups based on flag variations.',
    },
    {
        from: 'workflows_emails',
        to: 'error_tracking',
        type: 'pairsWith',
        description:
            'Trigger alerts or messages when errors spike, or notify engineering teams directly in Slack when exceptions occur.',
    },

    // -- realtime_destinations --
    {
        from: 'realtime_destinations',
        to: 'cdp',
        type: 'pairsWith',
        description: 'Stream events into the CDP and fan them back out to any downstream destination in real time.',
    },
    {
        from: 'realtime_destinations',
        to: 'workflows_emails',
        type: 'pairsWith',
        description: 'Trigger destination payloads as part of a multi-step workflow — alerts, syncs, follow-ups.',
    },
    {
        from: 'realtime_destinations',
        to: 'data_warehouse',
        type: 'pairsWith',
        description: 'Send live event data into your warehouse without batch ETL.',
    },

    // -- logs --
    {
        from: 'logs',
        to: 'error_tracking',
        type: 'pairsWith',
        description: 'Jump from a captured exception into the surrounding application logs without leaving PostHog.',
    },
    {
        from: 'logs',
        to: 'product_analytics',
        type: 'pairsWith',
        description: 'Correlate backend log volume and severity with user behavior and feature usage.',
    },
    {
        from: 'logs',
        to: 'llm_analytics',
        type: 'pairsWith',
        description: 'Inspect the raw log stream behind an LLM trace to debug latency, errors, and tool calls.',
    },

    // -- endpoints --
    { from: 'endpoints', to: 'product_analytics', type: 'worksWith' },
    { from: 'endpoints', to: 'session_replay', type: 'worksWith' },
    { from: 'endpoints', to: 'feature_flags', type: 'worksWith' },
    {
        from: 'endpoints',
        to: 'product_analytics',
        type: 'pairsWith',
        description:
            'Create insights in PostHog and expose their results through endpoints. Use trends, funnels, or retention analyses to power dashboards, feeds, or summaries in your application, without rebuilding the query elsewhere.',
    },
    {
        from: 'endpoints',
        to: 'data_warehouse',
        type: 'pairsWith',
        description:
            "Combine product analytics data with other datasets using SQL in PostHog's data warehouse. Expose the results through endpoints when you need more control over how data is shaped or joined.",
    },
]

/** Resolve a slug, alias, or already-canonical handle to a canonical handle, or `null` if unknown. */
export function normalizeHandle(rawRef: string): ProductHandle | null {
    if (!rawRef) return null
    if (MAIN_PRODUCT_HANDLES.includes(rawRef)) return rawRef
    if (rawRef in SLUG_ALIASES) return SLUG_ALIASES[rawRef]
    return null
}

/**
 * Re-derives the legacy `worksWith: ProductHandle[]` shape for a given product.
 *
 * @deprecated `worksWith` overlaps too much with `pairsWith` to justify its own
 * concept. It is kept only so `ProductSidebar` keeps rendering its "Works with..."
 * accordion without code changes. Migrate that consumer to read from
 * `getPairsWith` (or skip the section entirely) and then delete this function
 * along with the `'worksWith'` variant of {@link EdgeType}.
 */
export function getWorksWith(handle: ProductHandle): ProductHandle[] {
    const partners = new Set<ProductHandle>()
    for (const edge of productEdges) {
        if (edge.type !== 'worksWith') continue
        const from = normalizeHandle(edge.from)
        const to = normalizeHandle(edge.to)
        if (!from || !to) continue
        if (from === handle && to !== handle) partners.add(to)
        if (to === handle && from !== handle) partners.add(from)
    }
    return Array.from(partners)
}

/**
 * Re-derives the legacy `pairsWith: { slug, description }[]` shape for a given product.
 * Slug is computed from HANDLE_TO_SLUG. Falls back to the handle if no slug is known.
 */
export interface PairsWithEntry {
    slug: string
    description: string
}

export function getPairsWith(handle: ProductHandle): PairsWithEntry[] {
    const entries: PairsWithEntry[] = []
    for (const edge of productEdges) {
        if (edge.type !== 'pairsWith') continue
        const from = normalizeHandle(edge.from)
        const to = normalizeHandle(edge.to)
        if (from !== handle || !to) continue
        entries.push({
            slug: HANDLE_TO_SLUG[to] ?? to,
            description: edge.description ?? '',
        })
    }
    return entries
}

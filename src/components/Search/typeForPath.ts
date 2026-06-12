// Product landing page paths, mirroring the slugs in src/hooks/productData/
// (which can't be imported here — they pull in UI components, and this module
// is shared with the lightweight src/api/search.ts Gatsby Function)
const PRODUCT_PATHS = [
    'product-analytics',
    'session-replay',
    'feature-flags',
    'experiments',
    'surveys',
    'error-tracking',
    'cdp',
    'web-analytics',
    'data-stack/managed-warehouse',
    'endpoints',
    'logs',
    'workflows',
    'ai',
    'ai-observability',
]

// Maps a posthog.com pathname to the category types used by the search UI's
// filter tabs (mirrors the slug regexes in gatsby/algoliaConfig.js). Shared by
// the Inkeep proxy (src/api/search.ts) and the Algolia side of useHybridSearch
// so both engines bucket results into the same taxonomy.
const TYPE_BY_PATH: [RegExp, string][] = [
    [/^\/docs\/api(\/|$)/, 'api'],
    [/^\/docs\/cdp(\/|$)/, 'pipelines'],
    [/^\/docs\/apps(\/|$)/, 'apps'],
    [/^\/docs(\/|$)/, 'docs'],
    [/^\/handbook(\/|$)/, 'handbook'],
    [/^\/tutorials(\/|$)/, 'tutorial'],
    [/^\/questions(\/|$)/, 'question'],
    [/^\/posts(\/|$)/, 'post'],
    [/^\/(blog|spotlight|founders|newsletter|product-engineers)(\/|$)/, 'blog'],
    [/^\/customers(\/|$)/, 'customers'],
    [/^\/templates(\/|$)/, 'templates'],
    [/^\/teams(\/|$)/, 'team'],
    [new RegExp(`^\\/(${PRODUCT_PATHS.join('|')})(\\/|$)`), 'product'],
]

export const typeForPath = (pathname: string): string => {
    for (const [regex, type] of TYPE_BY_PATH) {
        if (regex.test(pathname)) return type
    }
    return 'docs'
}

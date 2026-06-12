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
]

export const typeForPath = (pathname: string): string => {
    for (const [regex, type] of TYPE_BY_PATH) {
        if (regex.test(pathname)) return type
    }
    return 'docs'
}

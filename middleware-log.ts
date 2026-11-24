/**
 * Logs one JSON line per /docs request the middleware handles: the request as it arrived, and what
 * the middleware served. Vercel's log drain carries the line into PostHog Logs.
 */

// Queries find the line by parsing each line of the entry body and matching `type` exactly, so this
// value must stay distinct from the other `type` values in PostHog Logs.
const LOG_TYPE = 'docs_request'
// Set by the middleware on its own fetch of a page's `.md` sibling, which passes through the
// middleware again and would otherwise be logged as a second request.
export const SUBREQUEST_HEADER = 'x-posthog-middleware-subrequest'
// The matcher in middleware.ts covers more prefixes; only /docs requests are logged.
const LOGGED_PATHS = /^\/docs(\/|$)/
// Logs are widely readable, so only values known to carry no credentials or IP are logged. Every other
// header and query parameter is logged by name only.
const LOGGED_HEADERS =
    /^(accept(-.+)?|user-agent|sec-ch-ua(-.+)?|sec-fetch-.+|signature(-input|-agent)?|referer|via|from|dnt|cache-control|priority|upgrade-insecure-requests|x-vercel-id|x-vercel-ip-(country|country-region|city))$/
const LOGGED_QUERY_PARAMS = /^(utm_.+|ref|source|via|format|tab)$/

type Negotiation = 'not_requested' | 'served' | 'no_sibling' | 'markdown_url'

export interface NegotiationResult {
    response: Response | undefined
    negotiation: Negotiation
    reason?: 'accept' | 'agent_fetcher'
    markdownFetchMs?: number
}

export function logRequest(request: Request, result: NegotiationResult): void {
    // Written out in full: the edge bundler substitutes only the literal expression, so a helper or
    // destructuring would read undefined.
    if (process.env.MIDDLEWARE_LOG_ENABLED !== 'true') return
    if (request.headers.has(SUBREQUEST_HEADER)) return
    const url = new URL(request.url)
    if (!LOGGED_PATHS.test(url.pathname)) return
    const query = split(url.searchParams, LOGGED_QUERY_PARAMS)
    const headers = split(request.headers, LOGGED_HEADERS)

    console.log(
        JSON.stringify({
            type: LOG_TYPE,
            method: request.method,
            path: url.pathname,
            served_format: result.response || result.negotiation === 'markdown_url' ? 'markdown' : 'html',
            negotiation: result.negotiation,
            markdown_reason: result.reason,
            markdown_fetch_ms: result.markdownFetchMs,
            query_params: query.values,
            other_query_param_names: query.otherNames,
            request_headers: headers.values,
            other_header_names: headers.otherNames,
        })
    )
}

function split(
    pairs: { forEach(callback: (value: string, name: string) => void): void },
    logged: RegExp
): { values: Record<string, string>; otherNames: string[] } {
    const values: Record<string, string> = {}
    const otherNames: string[] = []
    pairs.forEach((value, name) => {
        if (logged.test(name)) values[name] = value
        else otherNames.push(name)
    })
    return { values, otherNames }
}

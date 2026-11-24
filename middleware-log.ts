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
// Request headers not logged, because they carry credentials or secrets.
const EXCLUDED_HEADERS = /cookie|auth|token|secret|bypass|key|^x-vercel-(proxy-signature|sc-|internal-)/

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

    console.log(
        JSON.stringify({
            type: LOG_TYPE,
            method: request.method,
            url: request.url,
            served_format: result.response || result.negotiation === 'markdown_url' ? 'markdown' : 'html',
            negotiation: result.negotiation,
            markdown_reason: result.reason,
            markdown_fetch_ms: result.markdownFetchMs,
            request_headers: loggedHeaders(request.headers),
        })
    )
}

function loggedHeaders(headers: Headers): Record<string, string> {
    const logged: Record<string, string> = {}
    headers.forEach((value, name) => {
        if (!EXCLUDED_HEADERS.test(name)) logged[name] = value
    })
    return logged
}

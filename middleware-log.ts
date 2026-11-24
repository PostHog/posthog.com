/**
 * Logs one JSON line per /docs request the middleware handles, recording what the client asked for
 * and what it was served. Vercel's log drain carries the line into PostHog Logs with the request id,
 * client IP, path and status it already records. The line adds what the drain leaves out: the
 * negotiation and the raw request headers, some of which the drain also maps to attributes.
 */

// Queries find the line by parsing each line of the entry body and matching `type` exactly, so this
// value must stay distinct from the other `type` values in PostHog Logs.
const LOG_TYPE = 'docs_request'
// Set by the middleware on its own fetch of a page's `.md` sibling, which passes through the
// middleware again and would otherwise be logged as a second request.
export const SUBREQUEST_HEADER = 'x-posthog-middleware-subrequest'
// The matcher in middleware.ts covers more prefixes; only /docs requests are logged.
const LOGGED_PATHS = /^\/docs(\/|$)/
// Request headers not logged: credentials and secrets, Vercel's internal headers, and the client IP
// the drain already records.
const EXCLUDED_HEADERS =
    /cookie|auth|token|secret|bypass|key|^x-vercel-(proxy-signature|sc-|internal-)|^forwarded$|-for$|real-ip|client-ip|connecting-ip/

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

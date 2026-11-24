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
// Logs are widely readable, so values are logged only for headers and query parameters known to carry
// no credentials, IP or personal data. Every other one is logged by name only. `from` stays out because
// it carries an email address.
const HEADER_ALLOWLIST = new Set([
    'accept',
    'accept-encoding',
    'accept-language',
    'user-agent',
    'sec-ch-ua',
    'sec-ch-ua-mobile',
    'sec-ch-ua-platform',
    'sec-fetch-dest',
    'sec-fetch-mode',
    'sec-fetch-site',
    'sec-fetch-user',
    // Prefetch and prerender hints.
    'sec-purpose',
    'purpose',
    'x-purpose',
    'x-moz',
    // Web Bot Auth, sent by agents that sign their requests.
    'signature',
    'signature-input',
    'signature-agent',
    'referer',
    'via',
    'dnt',
    'cache-control',
    'priority',
    'upgrade-insecure-requests',
    'x-vercel-id',
    'x-vercel-ip-country',
    'x-vercel-ip-country-region',
    'x-vercel-ip-city',
])
const QUERY_PARAM_ALLOWLIST = new Set([
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'ref',
    'source',
    'via',
    'format',
    'tab',
])
const REDACTED = 'REDACTED'
// An email address in a path segment is personal data. The dot-suffixed domain keeps other uses of `@`
// readable.
const EMAIL_SEGMENT = /^[^/]*(?:@|%40)[^/]*\.[A-Za-z]{2,}$/i

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
    const headers = splitHeaders(request.headers)

    console.log(
        JSON.stringify({
            type: LOG_TYPE,
            method: request.method,
            url: scrubUrl(url),
            served_format: result.response || result.negotiation === 'markdown_url' ? 'markdown' : 'html',
            negotiation: result.negotiation,
            markdown_reason: result.reason,
            markdown_fetch_ms: result.markdownFetchMs,
            request_headers: headers.values,
            other_header_names: headers.otherNames,
        })
    )
}

// The path and query, with the value of every query parameter outside the allowlist replaced by
// REDACTED, and email address path segments by `{email}`.
function scrubUrl(url: URL): string {
    const path = url.pathname
        .split('/')
        .map((segment) => (EMAIL_SEGMENT.test(segment) ? '{email}' : segment))
        .join('/')
    if (!url.search) return path
    const query = new URLSearchParams()
    url.searchParams.forEach((value, name) => {
        query.append(name, QUERY_PARAM_ALLOWLIST.has(name.toLowerCase()) ? value : REDACTED)
    })
    return `${path}?${query}`
}

function splitHeaders(headers: Headers): { values: Record<string, string>; otherNames: string[] } {
    const values: Record<string, string> = {}
    const otherNames: string[] = []
    headers.forEach((value, name) => {
        if (HEADER_ALLOWLIST.has(name.toLowerCase())) values[name] = value
        else otherNames.push(name)
    })
    return { values, otherNames }
}

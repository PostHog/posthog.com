/// <reference lib="es2020" />
/**
 * Serve raw markdown to clients that ask for it with `Accept: text/markdown`,
 * and to agents that fetch a page for a user unless they ask for HTML (#21381).
 * Crawlers such as Googlebot and ClaudeBot keep the HTML. Mintlify-hosted docs
 * use the same user-agent and Accept split.
 *
 * This has to be middleware rather than a `vercel.json` rewrite. Vercel gives
 * the filesystem precedence over rewrites, and Gatsby writes an index.html for
 * every one of these paths, so a rewrite is never reached. Middleware is the
 * only hook that runs ahead of the filesystem.
 *
 * Two costs are worth knowing before this ships — see the PR description:
 *   1. The matcher is path-only. Vercel's generic (non-Next.js) middleware
 *      matcher has no `has` header condition, so this runs on every request to
 *      these prefixes, not only the ones asking for markdown.
 *   2. It therefore adds a hop ahead of the CDN cache for ordinary readers too.
 *
 * Returning `undefined` continues to the normal static response, so anything
 * this function declines to handle behaves exactly as it does today.
 */
export const config = {
    matcher: ['/docs/:path*', '/handbook/:path*', '/blog/:path*', '/newsletter/:path*', '/changelog', '/mcp'],
}

const USER_AGENT_FETCHERS = ['ChatGPT-User', 'Claude-User', 'Perplexity-User']
const USER_AGENT_FETCHERS_REGEX = new RegExp(`\\b(?:${USER_AGENT_FETCHERS.join('|')})\\b`, 'i')

// Queries find the line by parsing each line of the entry body and matching `type` exactly, so this
// value must stay distinct from the other `type` values in PostHog Logs.
const LOG_TYPE = 'docs_request'
// Set by the middleware on its own fetch of a page's `.md` sibling, which passes through the
// middleware again and would otherwise be logged as a second request.
const SUBREQUEST_HEADER = 'x-posthog-middleware-subrequest'
// The matcher covers more prefixes; only /docs requests are logged.
const LOGGED_PATHS = /^\/docs(\/|$)/
// Logs are widely readable, so values are logged only for headers and query parameters known to carry
// no credentials, IP or personal data. Every other one is logged by name only. `from` stays out because
// it carries an email address.
const HEADER_ALLOWLIST = [
    'accept',
    'accept-encoding',
    'accept-language',
    'accept-charset',
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
    // TLS fingerprints and the network's AS number, set by Vercel, which tell agents apart.
    'x-vercel-ja3-digest',
    'x-vercel-ja4-digest',
    'x-vercel-ip-as-number',
    // Sent by MCP clients that point at a page instead of the MCP server.
    'mcp-method',
    'mcp-protocol-version',
    // Revalidation and partial requests, which explain 304 and 206 responses.
    'if-none-match',
    'if-modified-since',
    'range',
    // The body of a POST, and the site behind a cross-origin request.
    'content-type',
    'content-length',
    'origin',
    // Set when a CDN or a Cloudflare Worker sits in front of the docs. `cf-worker` names that site.
    'cdn-loop',
    'cf-worker',
]
const HEADER_ALLOWLIST_REGEX = new RegExp(`^(?:${HEADER_ALLOWLIST.join('|')})$`, 'i')
const QUERY_PARAM_ALLOWLIST = [
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
]
const QUERY_PARAM_ALLOWLIST_REGEX = new RegExp(`^(?:${QUERY_PARAM_ALLOWLIST.join('|')})$`, 'i')
const REDACTED = 'REDACTED'
// An email address in a path segment is personal data. The dot-suffixed domain keeps other uses of `@`
// readable.
const EMAIL_SEGMENT = /^[^/]*(?:@|%40)[^/]*\.[A-Za-z]{2,}$/i

// Vercel typechecks this file with tsconfig.json, whose `lib` has no ES core library and which has no
// @types/node. Without these two declarations every build prints type errors for it.
declare const process: { env: { [name: string]: string | undefined } }

type Negotiation = 'not_requested' | 'served' | 'no_sibling' | 'markdown_url'

interface NegotiationResult {
    response: Response | undefined
    negotiation: Negotiation
    reason?: 'accept' | 'agent_fetcher'
    markdownFetchMs?: number
}

export default async function middleware(request: Request): Promise<Response | undefined> {
    const result = await negotiate(request)
    logRequest(request, result)
    return result.response
}

async function negotiate(request: Request): Promise<NegotiationResult> {
    const accept = request.headers.get('accept') || ''
    const acceptsMarkdown = accept.includes('text/markdown')
    const isAgentFetch =
        USER_AGENT_FETCHERS_REGEX.test(request.headers.get('user-agent') || '') && !accept.includes('text/html')

    const url = new URL(request.url)
    const pathname = url.pathname.replace(/\/$/, '')
    if (pathname.endsWith('.md')) return { response: undefined, negotiation: 'markdown_url' }
    if ((!acceptsMarkdown && !isAgentFetch) || !pathname) return { response: undefined, negotiation: 'not_requested' }
    const reason = acceptsMarkdown ? 'accept' : 'agent_fetcher'

    // Not every path under these prefixes has a generated `.md` sibling — the
    // section index pages (/docs, /blog, /handbook, /newsletter) don't. Ask for
    // it and fall through to the HTML when it isn't there, rather than keeping a
    // hand-maintained list of exceptions that silently rots.
    const started = Date.now()
    const markdown = await fetch(new URL(`${pathname}.md`, url.origin), {
        headers: { accept: 'text/plain', [SUBREQUEST_HEADER]: '1' },
    })
    const markdownFetchMs = Date.now() - started
    if (!markdown.ok) return { response: undefined, negotiation: 'no_sibling', reason, markdownFetchMs }

    const response = new Response(markdown.body, {
        status: 200,
        headers: {
            'content-type': 'text/markdown; charset=utf-8',
            'cache-control': markdown.headers.get('cache-control') || 'public, max-age=0, must-revalidate',
            vary: 'Accept, User-Agent',
        },
    })
    return { response, negotiation: 'served', reason, markdownFetchMs }
}

function logRequest(request: Request, result: NegotiationResult): void {
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
        query.append(name, QUERY_PARAM_ALLOWLIST_REGEX.test(name) ? value : REDACTED)
    })
    return `${path}?${query}`
}

function splitHeaders(headers: Headers): { values: { [name: string]: string }; otherNames: string[] } {
    const values: { [name: string]: string } = {}
    const otherNames: string[] = []
    headers.forEach((value, name) => {
        if (HEADER_ALLOWLIST_REGEX.test(name)) values[name] = value
        else otherNames.push(name)
    })
    return { values, otherNames }
}

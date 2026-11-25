/// <reference lib="es2020" />
/**
 * Serve raw markdown to clients whose Accept ranks `text/markdown` at least as
 * high as `text/html`, and to agents that fetch a page for a user unless they
 * ask for HTML (#21381).
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
 *
 * It also answers MCP clients that people point at a posthog.com page instead
 * of the MCP server, so they show where the server is rather than a parse
 * error. `/mcp.md` is in the matcher only for those clients.
 */
export const config = {
    matcher: [
        '/docs/:path*',
        '/handbook/:path*',
        '/blog/:path*',
        '/newsletter/:path*',
        '/changelog',
        '/mcp',
        '/mcp.md',
    ],
}

const USER_AGENT_FETCHERS = ['ChatGPT-User', 'Claude-User', 'Perplexity-User']
const USER_AGENT_FETCHERS_REGEX = new RegExp(`\\b(?:${USER_AGENT_FETCHERS.join('|')})\\b`, 'i')

// MCP clients list this in Accept on every request, as the MCP spec requires. Browsers and crawlers
// loading a page never do.
const MCP_CLIENT_ACCEPT = 'text/event-stream'
// A copy of MCP_SERVER_URL in src/constants. The middleware cannot import it: Vercel keeps import paths as
// written when it compiles the middleware, so the deployed file would import a `.ts` file that is not in
// the bundle. middleware.test.ts fails if the copy differs.
const MCP_SERVER_URL = 'https://mcp.posthog.com/mcp'
const MCP_SERVER_HINT = `This is posthog.com, not PostHog's MCP server. Use ${MCP_SERVER_URL}.`
// The middleware reads an MCP message only to echo its `id`. An `initialize` message is a few hundred
// bytes, and 64 KB leaves room for clients that send large capabilities. A larger body is not read, so a
// request cannot make the middleware buffer and parse megabytes of JSON.
const MCP_MESSAGE_MAX_BYTES = 64 * 1024

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
    'x-vercel-ip-continent',
    'x-vercel-ip-timezone',
    // Set by Vercel when the Host header names a different site than the TLS connection.
    'x-vercel-internal-is-domain-fronting',
    // TLS fingerprints and the network's AS number, set by Vercel, which tell agents apart.
    'x-vercel-ja3-digest',
    'x-vercel-ja4-digest',
    'x-vercel-ip-as-number',
    // Sent by MCP clients that point at a page instead of the MCP server.
    'mcp-method',
    'mcp-protocol-version',
    'x-mcp-features',
    // Set by Anthropic's and OpenAI's fetchers.
    'x-anthropic-client',
    'x-openai-host-hash',
    // Revalidation and partial requests, which explain 304 and 206 responses.
    'if-none-match',
    'if-modified-since',
    'range',
    // The body of a POST, and the site behind a cross-origin request.
    'content-type',
    'content-length',
    'origin',
    // Set when a CDN or a Cloudflare Worker sits in front of the docs. `cf-worker` names that site.
    // `cf-connecting-ip` and `cf-warp-tag-id` stay names only: an IP address and a device id.
    'cdn-loop',
    'cf-worker',
    'cf-ew-via',
    'cf-ray',
    'cf-visitor',
    'cf-ipcountry',
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

type Negotiation = 'not_requested' | 'served' | 'no_sibling' | 'markdown_url' | 'mcp_client'

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
    if (accept.includes(MCP_CLIENT_ACCEPT)) return { response: await mcpServerHint(request), negotiation: 'mcp_client' }
    const weights = acceptWeights(accept)
    const markdownWeight = weights.get('text/markdown') ?? 0
    const htmlWeight = weights.get('text/html') ?? weights.get('text/*') ?? weights.get('*/*') ?? 0
    // Ties go to Markdown: Claude Code lists `text/markdown, text/html, */*` and means Markdown.
    const acceptsMarkdown = markdownWeight > 0 && markdownWeight >= htmlWeight
    const isAgentFetch =
        USER_AGENT_FETCHERS_REGEX.test(request.headers.get('user-agent') || '') && !weights.get('text/html')

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

// The q-value of each media range in an Accept header, 1 when it has none. A range listed twice keeps its
// first weight.
function acceptWeights(accept: string): Map<string, number> {
    const weights = new Map<string, number>()
    for (const part of accept.split(',')) {
        const [range, ...params] = part.split(';').map((piece) => piece.trim().toLowerCase())
        if (!range || weights.has(range)) continue
        const q = params.find((param) => param.startsWith('q='))
        const weight = q === undefined ? 1 : Number(q.slice(2))
        weights.set(range, Number.isNaN(weight) ? 0 : weight)
    }
    return weights
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
            served_format: servedFormat(result),
            negotiation: result.negotiation,
            markdown_reason: result.reason,
            markdown_fetch_ms: result.markdownFetchMs,
            request_headers: headers.values,
            other_header_names: headers.otherNames,
        })
    )
}

function servedFormat(result: NegotiationResult): 'html' | 'markdown' | 'mcp_error' {
    if (result.negotiation === 'mcp_client') return 'mcp_error'
    return result.response || result.negotiation === 'markdown_url' ? 'markdown' : 'html'
}

// An MCP client opens with a JSON-RPC `initialize` POST. It shows the message of a JSON-RPC error sent
// with a 200; with a 4xx it shows the raw response body instead. An SSE client opens with a GET and
// reads only the status, so that gets a 405.
async function mcpServerHint(request: Request): Promise<Response> {
    if (request.method !== 'POST') {
        return new Response(MCP_SERVER_HINT, {
            status: 405,
            headers: { allow: 'POST', 'content-type': 'text/plain; charset=utf-8' },
        })
    }
    const id = await mcpMessageId(request)
    return new Response(JSON.stringify({ jsonrpc: '2.0', id, error: { code: -32600, message: MCP_SERVER_HINT } }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
    })
}

// A body without a content-length, or over the limit, is not read. JSON-RPC allows only a string, a
// number or null as an `id`, so any other value is not echoed back.
async function mcpMessageId(request: Request): Promise<string | number | null> {
    const length = Number(request.headers.get('content-length'))
    if (!length || length > MCP_MESSAGE_MAX_BYTES) return null
    const message = await readJsonUpTo(request, MCP_MESSAGE_MAX_BYTES)
    const id = message && typeof message === 'object' && 'id' in message ? message.id : null
    return typeof id === 'string' || typeof id === 'number' ? id : null
}

// The content-length header is the sender's claim, so the limit is also enforced on the bytes read.
async function readJsonUpTo(request: Request, maxBytes: number): Promise<unknown> {
    if (!request.body) return null
    const reader = request.body.getReader()
    const decoder = new TextDecoder()
    let text = ''
    let received = 0
    try {
        for (;;) {
            const { done, value } = await reader.read()
            if (done) break
            received += value.byteLength
            if (received > maxBytes) {
                await reader.cancel()
                return null
            }
            text += decoder.decode(value, { stream: true })
        }
        return JSON.parse(text + decoder.decode())
    } catch {
        return null
    }
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

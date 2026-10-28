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
 * Agent fetches are also recorded as an `agent page fetched` PostHog event, sent
 * with `waitUntil` so the response never waits on it. Ordinary browser requests
 * return before any of that runs.
 *
 * Returning `undefined` continues to the normal static response, so anything
 * this function declines to handle behaves exactly as it does today.
 */
export const config = {
    matcher: [
        '/docs/:path*',
        '/handbook/:path*',
        '/blog/:path*',
        '/newsletter/:path*',
        '/changelog',
        '/learn/:path*',
        '/pricing/:path*',
        '/llms.txt',
        '/(.*\\.md)',
    ],
}

const USER_AGENT_FETCHERS = ['ChatGPT-User', 'Claude-User', 'Perplexity-User']
const USER_AGENT_FETCHERS_REGEX = new RegExp(`\\b(?:${USER_AGENT_FETCHERS.join('|')})\\b`, 'i')

// Agents and crawlers worth recording even when they get the HTML. Anything else is
// recorded as `other`, and only when it asks for Markdown or fetches a `.md` URL.
const UA_FAMILIES: [string, RegExp][] = [
    ['Claude-User', /\bClaude-User\b/i],
    ['ChatGPT-User', /\bChatGPT-User\b/i],
    ['Perplexity-User', /\bPerplexity-User\b/i],
    ['ClaudeBot', /\bClaudeBot\b/i],
    ['GPTBot', /\bGPTBot\b/i],
    ['OAI-SearchBot', /\bOAI-SearchBot\b/i],
    ['PerplexityBot', /\bPerplexityBot\b/i],
    ['Google-Agent', /\bGoogle-Agent\b/i],
    ['OpenCode-User', /\bOpenCode(?:-User)?\b/i],
    ['Gemini CLI', /\bGemini[- ]?CLI\b/i],
    ['Cursor', /\bCursor\b/i],
    ['curl', /^curl\//i],
]

export const classifyUserAgent = (userAgent: string): string =>
    UA_FAMILIES.find(([, pattern]) => pattern.test(userAgent))?.[0] || 'other'

// Whether `accept` names `type` with a non-zero q-value. Wildcards don't count: every
// browser sends `*/*`, and that isn't a request for Markdown.
export const accepts = (accept: string, type: string): boolean =>
    accept.split(',').some((range) => {
        const [mediaType, ...params] = range.split(';').map((part) => part.trim().toLowerCase())
        if (mediaType !== type) return false
        const q = params.find((param) => param.startsWith('q='))
        return !q || Number(q.slice(2)) > 0
    })

// Set on the sibling fetch below, which comes back through this middleware as a `.md`
// request and would otherwise be counted twice.
const OWN_FETCH_HEADER = 'x-posthog-markdown-sibling'

// A daily-rotating pseudonym for the client, so the raw IP is never sent. The secret salt
// stops anyone reversing it by hashing every IPv4 address; the date stops it following a
// client from one day to the next.
export const hashClient = async (ip: string, userAgent: string, salt: string, date = new Date()): Promise<string> => {
    const day = date.toISOString().slice(0, 10)
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${salt}:${day}:${ip}:${userAgent}`))
    return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

interface RequestContext {
    waitUntil(promise: Promise<unknown>): void
}

interface FetchProperties {
    format: 'md' | 'html' | 'txt'
    negotiated_by: 'accept' | 'ua' | 'suffix' | 'default'
    requested_markdown: boolean
}

function capture(request: Request, context: RequestContext | undefined, properties: FetchProperties): void {
    const token = process.env.GATSBY_POSTHOG_API_KEY
    const host = process.env.GATSBY_POSTHOG_API_HOST
    const salt = process.env.AGENT_FETCH_SALT
    if (!token || !host || !salt || !context) return

    const userAgent = request.headers.get('user-agent') || ''
    const ip = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0].trim() || ''
    const send = async () => {
        const distinctId = await hashClient(ip, userAgent, salt)
        await fetch(`${host}/i/v0/e/`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                api_key: token,
                event: 'agent page fetched',
                distinct_id: distinctId,
                timestamp: new Date().toISOString(),
                properties: {
                    path: new URL(request.url).pathname,
                    ...properties,
                    accept: request.headers.get('accept'),
                    user_agent: userAgent,
                    ua_family: classifyUserAgent(userAgent),
                    signature_agent: request.headers.get('signature-agent') ?? undefined,
                    vercel_id: request.headers.get('x-vercel-id') ?? undefined,
                    $process_person_profile: false,
                    // The request reaches PostHog from Vercel, so its IP would geolocate Vercel.
                    $geoip_disable: true,
                },
            }),
        })
    }
    context.waitUntil(send().catch(() => undefined))
}

export default async function middleware(request: Request, context?: RequestContext): Promise<Response | undefined> {
    const url = new URL(request.url)

    // `.md` URLs are linked only from other `.md` files and llms.txt, so a direct fetch is
    // the closest signal we have that an agent followed a link. Record it and let the static
    // file serve. Same-origin requests are the site's own copy and view buttons.
    const suffixFormat = url.pathname === '/llms.txt' ? 'txt' : url.pathname.endsWith('.md') ? 'md' : undefined
    if (suffixFormat) {
        if (!request.headers.has(OWN_FETCH_HEADER) && request.headers.get('sec-fetch-site') !== 'same-origin') {
            capture(request, context, {
                format: suffixFormat,
                negotiated_by: 'suffix',
                requested_markdown: suffixFormat === 'md',
            })
        }
        return
    }

    const accept = request.headers.get('accept') || ''
    const userAgent = request.headers.get('user-agent') || ''
    const isUserAgentFetcher = USER_AGENT_FETCHERS_REGEX.test(userAgent)
    const acceptsMarkdown = accepts(accept, 'text/markdown')
    const isAgentFetch = isUserAgentFetcher && !accepts(accept, 'text/html')
    if (!acceptsMarkdown && !isAgentFetch) {
        if (classifyUserAgent(userAgent) !== 'other') {
            capture(request, context, {
                format: 'html',
                negotiated_by: isUserAgentFetcher ? 'accept' : 'default',
                requested_markdown: false,
            })
        }
        return
    }

    const pathname = url.pathname.replace(/\/$/, '')
    if (!pathname) return

    // Not every path under these prefixes has a generated `.md` sibling — the
    // section index pages (/docs, /blog, /handbook, /newsletter) don't. Ask for
    // it and fall through to the HTML when it isn't there, rather than keeping a
    // hand-maintained list of exceptions that silently rots.
    const markdown = await fetch(new URL(`${pathname}.md`, url.origin), {
        headers: { accept: 'text/plain', [OWN_FETCH_HEADER]: '1' },
    })
    if (!markdown.ok) {
        capture(request, context, { format: 'html', negotiated_by: 'default', requested_markdown: true })
        return
    }

    capture(request, context, {
        format: 'md',
        negotiated_by: acceptsMarkdown ? 'accept' : 'ua',
        requested_markdown: true,
    })
    return new Response(markdown.body, {
        status: 200,
        headers: {
            'content-type': 'text/markdown; charset=utf-8',
            'cache-control': markdown.headers.get('cache-control') || 'public, max-age=0, must-revalidate',
            vary: 'Accept, User-Agent',
        },
    })
}

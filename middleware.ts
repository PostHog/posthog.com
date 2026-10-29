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
 * It also records each page request that has no `Sec-Fetch-Site` header as a
 * `non-browser page request` PostHog event. Browsers send that header, and
 * posthog-js already records them. Everything else lands here: AI agents and
 * their fetch tools, search and AI crawlers, link previews, monitors, scripts,
 * and the few old browsers that predate the header. None of these run
 * posthog-js. The event is sent with `waitUntil`, so the response never waits
 * for it.
 *
 * Two costs are worth knowing — see the PR descriptions:
 *   1. The matcher is path-only. Vercel's generic (non-Next.js) middleware
 *      matcher has no `has` header condition, so this runs on every page
 *      request, not only the ones from agents.
 *   2. It therefore adds a hop ahead of the CDN cache for ordinary readers too.
 *
 * Returning `undefined` continues to the normal static response, so anything
 * this function declines to handle behaves exactly as it does today.
 */
export const config = {
    // Every page, plus `.md` and `.txt` files. Skips assets.
    matcher: [
        '/((?!(?:api|static|page-data|_gatsby)(?:/|$))(?!.*\\.(?:js|mjs|css|map|json|png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf|otf|eot|mp4|webm|mp3|lottie|webmanifest|xml|rss|pdf|zip)$).*)',
    ],
}

// Markdown negotiation stays on the paths it ran on before the matcher grew.
const NEGOTIATED_PATHS = /^\/(?:(?:docs|handbook|blog|newsletter)(?:\/|$)|changelog\/?$)/

const USER_AGENT_FETCHERS = ['ChatGPT-User', 'Claude-User', 'Perplexity-User']
const USER_AGENT_FETCHERS_REGEX = new RegExp(`\\b(?:${USER_AGENT_FETCHERS.join('|')})\\b`, 'i')

// Set on the sibling fetch below, which comes back through this middleware as a `.md` request.
const SIBLING_FETCH_HEADER = 'x-posthog-markdown-sibling'

interface RequestContext {
    waitUntil(promise: Promise<unknown>): void
}

// The client's network, not its address: the last octet of an IPv4 address and all but the
// first three groups of an IPv6 address become zero. GeoIP and IP-range bot rules still work.
const networkOf = (ip: string): string | undefined => {
    if (!ip) return undefined
    if (!ip.includes(':')) return [...ip.split('.').slice(0, 3), '0'].join('.')
    const [head, tail = ''] = ip.split('::')
    const groups = head.split(':').filter(Boolean)
    const tailGroups = tail.split(':').filter(Boolean)
    const full = [...groups, ...Array(Math.max(0, 8 - groups.length - tailGroups.length)).fill('0'), ...tailGroups]
    return `${full.slice(0, 3).join(':')}::`
}

const clientIp = (request: Request): string =>
    request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0].trim() || ''

// One pseudonymous ID per client network and user agent per day.
const clientId = async (request: Request, day = new Date().toISOString().slice(0, 10)): Promise<string> => {
    const input = `${day}:${networkOf(clientIp(request))}:${request.headers.get('user-agent') || ''}`
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input))
    return `nonbrowser_${[...new Uint8Array(digest).slice(0, 16)].map((b) => b.toString(16).padStart(2, '0')).join('')}`
}

function captureNonBrowserRequest(
    request: Request,
    context: RequestContext | undefined,
    servedFormat: 'markdown' | 'html' | 'text',
    markdownVia?: 'accept' | 'user_agent' | 'md_url'
): undefined {
    const token = process.env.GATSBY_POSTHOG_API_KEY
    const host = process.env.GATSBY_POSTHOG_API_HOST
    if (
        !context ||
        !token ||
        !host ||
        request.headers.has('sec-fetch-site') ||
        request.headers.has(SIBLING_FETCH_HEADER)
    ) {
        return
    }

    const url = new URL(request.url)
    const header = (name: string) => request.headers.get(name) ?? undefined
    const send = async () => {
        await fetch(`${host}/i/v0/e/`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                api_key: token,
                event: 'non-browser page request',
                distinct_id: await clientId(request),
                timestamp: new Date().toISOString(),
                properties: {
                    $current_url: request.url,
                    $host: url.host,
                    $pathname: url.pathname,
                    // Without `$ip`, PostHog would store Vercel's address for every event.
                    $ip: networkOf(clientIp(request)),
                    $raw_user_agent: header('user-agent'),
                    $referrer: header('referer'),
                    method: request.method,
                    accept: header('accept'),
                    served_format: servedFormat,
                    markdown_via: markdownVia,
                    signature_agent: header('signature-agent'),
                    vercel_id: header('x-vercel-id'),
                    $process_person_profile: false,
                },
            }),
        })
    }
    context.waitUntil(send().catch(() => undefined))
}

export default async function middleware(request: Request, context?: RequestContext): Promise<Response | undefined> {
    const url = new URL(request.url)
    const pathname = url.pathname.replace(/\/$/, '')
    if (pathname.endsWith('.md')) return captureNonBrowserRequest(request, context, 'markdown', 'md_url')
    if (pathname.endsWith('.txt')) return captureNonBrowserRequest(request, context, 'text')
    if (!NEGOTIATED_PATHS.test(url.pathname)) return captureNonBrowserRequest(request, context, 'html')

    const accept = request.headers.get('accept') || ''
    const acceptsMarkdown = accept.includes('text/markdown')
    const isAgentFetch =
        USER_AGENT_FETCHERS_REGEX.test(request.headers.get('user-agent') || '') && !accept.includes('text/html')
    if ((!acceptsMarkdown && !isAgentFetch) || !pathname) return captureNonBrowserRequest(request, context, 'html')

    // Not every path under these prefixes has a generated `.md` sibling — the
    // section index pages (/docs, /blog, /handbook, /newsletter) don't. Ask for
    // it and fall through to the HTML when it isn't there, rather than keeping a
    // hand-maintained list of exceptions that silently rots.
    const markdown = await fetch(new URL(`${pathname}.md`, url.origin), {
        headers: { accept: 'text/plain', [SIBLING_FETCH_HEADER]: '1' },
    })
    if (!markdown.ok) return captureNonBrowserRequest(request, context, 'html')

    captureNonBrowserRequest(request, context, 'markdown', acceptsMarkdown ? 'accept' : 'user_agent')
    return new Response(markdown.body, {
        status: 200,
        headers: {
            'content-type': 'text/markdown; charset=utf-8',
            'cache-control': markdown.headers.get('cache-control') || 'public, max-age=0, must-revalidate',
            vary: 'Accept, User-Agent',
        },
    })
}

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
import { captureRequest } from './middleware-capture.ts'
import type { NegotiationResult } from './middleware-capture.ts'

export const config = {
    matcher: ['/docs/:path*', '/handbook/:path*', '/blog/:path*', '/newsletter/:path*', '/changelog', '/mcp'],
}

const USER_AGENT_FETCHERS = ['ChatGPT-User', 'Claude-User', 'Perplexity-User']
const USER_AGENT_FETCHERS_REGEX = new RegExp(`\\b(?:${USER_AGENT_FETCHERS.join('|')})\\b`, 'i')

export default async function middleware(
    request: Request,
    context?: { waitUntil(promise: Promise<unknown>): void }
): Promise<Response | undefined> {
    const result = await negotiate(request)
    captureRequest(request, result, context && ((promise) => context.waitUntil(promise)))
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
        headers: { accept: 'text/plain' },
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

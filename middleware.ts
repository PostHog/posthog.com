/**
 * Serve raw markdown to clients that ask for it with `Accept: text/markdown`.
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
    matcher: ['/docs/:path*', '/handbook/:path*', '/blog/:path*', '/newsletter/:path*', '/changelog'],
}

export default async function middleware(request: Request): Promise<Response | undefined> {
    if (!(request.headers.get('accept') || '').includes('text/markdown')) return

    const url = new URL(request.url)
    const pathname = url.pathname.replace(/\/$/, '')
    if (!pathname || pathname.endsWith('.md')) return

    // Not every path under these prefixes has a generated `.md` sibling — the
    // section index pages (/docs, /blog, /handbook, /newsletter) don't. Ask for
    // it and fall through to the HTML when it isn't there, rather than keeping a
    // hand-maintained list of exceptions that silently rots.
    const markdown = await fetch(new URL(`${pathname}.md`, url.origin), {
        headers: { accept: 'text/plain' },
    })
    if (!markdown.ok) return

    return new Response(markdown.body, {
        status: 200,
        headers: {
            'content-type': 'text/markdown; charset=utf-8',
            'cache-control': markdown.headers.get('cache-control') || 'public, max-age=0, must-revalidate',
            vary: 'Accept',
        },
    })
}

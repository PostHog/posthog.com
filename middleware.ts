import { SKIP_TRANSLATION_COOKIE } from './src/i18n/cookie.ts'

/**
 * Serve raw markdown to clients that ask for it with `Accept: text/markdown`,
 * and to agents that fetch a page for a user but do not ask for markdown.
 * Crawlers such as Googlebot and ClaudeBot keep the HTML. Mintlify-hosted docs
 * use the same user-agent split.
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
    matcher: [
        '/',
        // Locale-shaped paths such as /pt-BR, /pt_br, and /PT. See LOCALE_PATH_REGEX.
        '/:locale([a-zA-Z][a-zA-Z][-_][a-zA-Z0-9]+)',
        '/:locale([A-Z][a-zA-Z]|[a-z][A-Z])',
        '/docs/:path*',
        '/handbook/:path*',
        '/blog/:path*',
        '/newsletter/:path*',
        '/changelog',
    ],
}

/**
 * The home page also runs through here, to send visitors to a translated copy of it. The same two
 * costs apply: every request to `/` takes this hop, not only the ones that get redirected.
 *
 * The Edge runtime cannot read the YAML in src/i18n/locales, so the codes are listed here too.
 * middleware.test.ts fails when this list and the YAML files disagree.
 */
export const TRANSLATED_LOCALES = ['pt', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'pl', 'tr', 'zh', 'ar']

/** A language subtag, then an optional region or script subtag: /pt-BR, /pt_br, /PT, /zh-Hant, /es-419. */
const LOCALE_PATH_REGEX = /^\/([a-z]{2})(?:[-_][a-z0-9]{2,4})?$/i

const SKIP_TRANSLATION_COOKIE_REGEX = new RegExp(`(?:^|;\\s*)${SKIP_TRANSLATION_COOKIE}=`)

const TRADITIONAL_CHINESE = ['hant', 'tw', 'hk', 'mo']

/**
 * The page for a language tag, or undefined when there is none. /zh is Simplified Chinese, so a
 * Traditional Chinese tag (zh-TW, zh-HK, zh-MO, zh-Hant) gets English rather than the wrong script.
 */
function translatedLocale(tag: string): string | undefined {
    const [language, ...subtags] = tag.toLowerCase().split(/[-_]/)
    const traditionalChinese =
        language === 'zh' && !subtags.includes('hans') && subtags.some((subtag) => TRADITIONAL_CHINESE.includes(subtag))
    return TRANSLATED_LOCALES.includes(language) && !traditionalChinese ? language : undefined
}

/** The translated locale the visitor ranks highest, or undefined when English ranks higher or none match. */
export function preferredLocale(acceptLanguage: string): string | undefined {
    const ranked = acceptLanguage
        .split(',')
        .map((entry) => {
            const [tag, ...params] = entry.trim().split(';')
            const q = params.map((param) => param.trim()).find((param) => param.startsWith('q='))
            return { tag, language: tag.split('-')[0].toLowerCase(), q: q ? Number(q.slice(2)) : 1 }
        })
        .filter(({ q }) => q > 0)
        .sort((a, b) => b.q - a.q)

    for (const { tag, language } of ranked) {
        if (language === 'en') return
        const locale = translatedLocale(tag)
        if (locale) return locale
    }
}

/** Sends a locale-shaped path to the translated page for its language: /pt-BR -> /pt. */
function localePathRedirect(pathname: string, search: string): Response | undefined {
    const language = translatedLocale(pathname.slice(1))
    if (!language || !LOCALE_PATH_REGEX.test(pathname) || pathname === `/${language}`) return

    return new Response(null, { status: 301, headers: { location: `/${language}${search}` } })
}

function translatedHomeRedirect(request: Request, search: string): Response | undefined {
    if (SKIP_TRANSLATION_COOKIE_REGEX.test(request.headers.get('cookie') || '')) return
    const locale = preferredLocale(request.headers.get('accept-language') || '')
    if (!locale) return

    return new Response(null, {
        status: 307,
        headers: {
            location: `/${locale}${search}`,
            vary: 'Accept-Language, Cookie',
            'cache-control': 'private, no-store',
        },
    })
}

const USER_AGENT_FETCHERS = ['ChatGPT-User', 'Claude-User', 'Perplexity-User']
const USER_AGENT_FETCHERS_REGEX = new RegExp(`\\b(?:${USER_AGENT_FETCHERS.join('|')})\\b`, 'i')

export default async function middleware(request: Request): Promise<Response | undefined> {
    const url = new URL(request.url)
    if (url.pathname === '/') return translatedHomeRedirect(request, url.search)
    if (LOCALE_PATH_REGEX.test(url.pathname)) return localePathRedirect(url.pathname, url.search)

    const acceptsMarkdown = (request.headers.get('accept') || '').includes('text/markdown')
    const isAgentFetch = USER_AGENT_FETCHERS_REGEX.test(request.headers.get('user-agent') || '')
    if (!acceptsMarkdown && !isAgentFetch) return

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
            vary: 'Accept, User-Agent',
        },
    })
}

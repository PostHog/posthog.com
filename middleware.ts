import { BOOTSTRAP_DISTINCT_ID_COOKIE, SKIP_TRANSLATION_COOKIE } from './src/i18n/cookie.ts'

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
export const TRANSLATED_LOCALES = ['pt', 'de', 'es', 'fr', 'it']

/** A language subtag, then an optional region or script subtag: /pt-BR, /pt_br, /PT, /zh-Hant, /es-419. */
const LOCALE_PATH_REGEX = /^\/([a-z]{2})(?:[-_][a-z0-9]{2,4})?$/i

const SKIP_TRANSLATION_COOKIE_REGEX = new RegExp(`(?:^|;\\s*)${SKIP_TRANSLATION_COOKIE}=`)

/** The translated locale the visitor ranks highest, or undefined when English ranks higher or none match. */
export function preferredLocale(acceptLanguage: string): string | undefined {
    const ranked = acceptLanguage
        .split(',')
        .map((entry) => {
            const [tag, ...params] = entry.trim().split(';')
            const q = params.map((param) => param.trim()).find((param) => param.startsWith('q='))
            return { language: tag.split('-')[0].toLowerCase(), q: q ? Number(q.slice(2)) : 1 }
        })
        .filter(({ q }) => q > 0)
        .sort((a, b) => b.q - a.q)

    for (const { language } of ranked) {
        if (language === 'en') return
        if (TRANSLATED_LOCALES.includes(language)) return language
    }
}

/** Sends a locale-shaped path to the translated page for its language: /pt-BR -> /pt. */
function localePathRedirect(pathname: string, search: string): Response | undefined {
    const language = pathname.match(LOCALE_PATH_REGEX)?.[1].toLowerCase()
    if (!language || !TRANSLATED_LOCALES.includes(language) || pathname === `/${language}`) return

    return new Response(null, { status: 301, headers: { location: `/${language}${search}` } })
}

/**
 * The redirect runs as a PostHog experiment: https://us.posthog.com/project/2/experiments/474419
 *
 * Asking /flags for the variant would hold every redirect for 130-270ms, so the visitor is bucketed here instead.
 * The variant matches what /flags returns because PostHog does not store assignments: it computes them from the
 * flag key and the distinct ID, the same way on every server and SDK. See getFeatureFlagHash and
 * getFeatureFlagVariant in posthog-js (packages/core/src/featureFlagLocalEvaluation.ts), which local evaluation in
 * posthog-node runs:
 *
 *   1. Hash `<flag key>.<distinct ID><salt>` with SHA-1.
 *   2. Read the first 15 hex digits as an integer and divide it by 0xfffffffffffffff, for a number from 0 to 1.
 *   3. The rollout check uses the salt "" and lets the visitor in when the number is at most the rollout
 *      percentage. The flag rolls out to 100%, so everyone gets in and this function skips that step.
 *   4. The variant uses the salt "variant". The variants split 0 to 1 into consecutive ranges in the order the
 *      flag lists them, and the visitor gets the variant whose range contains the number.
 *
 * This holds only while the flag has no release conditions, such as person properties or cohorts, because those
 * are not visible here. We checked it against /flags on live flags in this project, with a 25% rollout and with
 * 50/50 and 33/33/34 splits: 3,000 out of 3,000 distinct IDs matched.
 *
 * The variants, their order, and the 100% rollout are copied from the flag. A change to them in PostHog does
 * nothing until this list changes too.
 */
export const EXPERIMENT_FLAG = 'home-translation-redirect'
const EXPERIMENT_VARIANTS = [
    { key: 'control', rolloutPercentage: 50 },
    { key: 'test', rolloutPercentage: 50 },
]

/** PostHog's variant for a distinct ID. See the steps above. */
export async function experimentVariant(distinctId: string): Promise<string | undefined> {
    const digest = await crypto.subtle.digest(
        'SHA-1',
        new TextEncoder().encode(`${EXPERIMENT_FLAG}.${distinctId}variant`)
    )
    const hex = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
    const bucket = parseInt(hex.slice(0, 15), 16) / 0xfffffffffffffff

    let cumulative = 0
    for (const { key, rolloutPercentage } of EXPERIMENT_VARIANTS) {
        cumulative += rolloutPercentage / 100
        if (bucket < cumulative) return key
    }
}

/** The distinct ID in posthog-js's cookie, for a visitor who has been here before. */
function distinctIdFromCookie(cookie: string): string | undefined {
    const name = `ph_${process.env.GATSBY_POSTHOG_API_KEY}_posthog=`
    const value = cookie
        .split(/;\s*/)
        .find((entry) => entry.startsWith(name))
        ?.slice(name.length)
    try {
        return value ? JSON.parse(decodeURIComponent(value)).distinct_id || undefined : undefined
    } catch {
        return undefined
    }
}

function captureExposure(
    request: Request,
    distinctId: string,
    variant: string,
    locale: string
): Promise<unknown> | undefined {
    const { GATSBY_POSTHOG_API_KEY: apiKey, GATSBY_POSTHOG_API_HOST: apiHost } = process.env
    // Preview deployments run this middleware too. Their visitors are mostly the team, so keep them out of the results.
    if (!apiKey || !apiHost || new URL(request.url).host !== 'posthog.com') return

    return fetch(`${apiHost}/i/v0/e/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            api_key: apiKey,
            event: '$experiment_exposure',
            distinct_id: distinctId,
            properties: {
                $feature_flag: EXPERIMENT_FLAG,
                $feature_flag_response: variant,
                $current_url: request.url,
                $host: new URL(request.url).host,
                $pathname: '/',
                // The translation the visitor would get, in both variants. The experiment breaks its results down by it.
                translated_locale: locale,
                // Matches person_profiles: 'identified_only' in the posthog-js init.
                $process_person_profile: false,
            },
        }),
    }).catch(() => undefined)
}

type MiddlewareContext = { waitUntil(promise: Promise<unknown>): void }

async function translatedHomeRedirect(
    request: Request,
    search: string,
    context?: MiddlewareContext
): Promise<Response | undefined> {
    const cookie = request.headers.get('cookie') || ''
    if (SKIP_TRANSLATION_COOKIE_REGEX.test(cookie)) return
    const locale = preferredLocale(request.headers.get('accept-language') || '')
    if (!locale) return

    // A first-time visitor has no posthog-js cookie yet, so pick their distinct ID here and hand it to posthog-js
    // through the bootstrap cookie. Their pageviews and signup then count toward the variant they were given.
    const existingDistinctId = distinctIdFromCookie(cookie)
    const distinctId = existingDistinctId || crypto.randomUUID()
    const variant = await experimentVariant(distinctId)
    if (!variant) return

    const exposure = captureExposure(request, distinctId, variant, locale)
    if (exposure) context?.waitUntil(exposure)

    const headers = new Headers()
    if (!existingDistinctId) {
        headers.set('set-cookie', `${BOOTSTRAP_DISTINCT_ID_COOKIE}=${distinctId}; path=/; max-age=300; samesite=lax`)
    }

    if (variant !== 'test') {
        if (existingDistinctId) return
        // Serves the page as usual, with the cookie added. This is what next() in @vercel/functions returns.
        headers.set('x-middleware-next', '1')
        return new Response(null, { headers })
    }

    headers.set('location', `/${locale}${search}`)
    headers.set('vary', 'Accept-Language, Cookie')
    headers.set('cache-control', 'private, no-store')
    return new Response(null, { status: 307, headers })
}

const USER_AGENT_FETCHERS = ['ChatGPT-User', 'Claude-User', 'Perplexity-User']
const USER_AGENT_FETCHERS_REGEX = new RegExp(`\\b(?:${USER_AGENT_FETCHERS.join('|')})\\b`, 'i')

export default async function middleware(request: Request, context?: MiddlewareContext): Promise<Response | undefined> {
    const url = new URL(request.url)
    if (url.pathname === '/') return translatedHomeRedirect(request, url.search, context)
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

export type SiteExperimentVariant = 'control' | 'test'

export interface SiteExperimentConfig {
    enabled: boolean
    flagKey: string
    deploymentUrl: string
    projectToken: string
    flagsApiHost: string
    controlVariant: string
    testVariant: string
    bypassSecret?: string
}

interface PostHogFlagEvaluation {
    key: string
    enabled: boolean
    variant?: string | null
}

interface PostHogFlagsResponse {
    flags?: Record<string, PostHogFlagEvaluation>
    errorsWhileComputingFlags?: boolean
    quotaLimited?: string[]
}

const BOT_USER_AGENT =
    /bot|crawler|spider|slurp|googlebot|bingbot|yandex|duckduckbot|baiduspider|facebookexternalhit|linkedinbot|twitterbot|discordbot|slackbot|applebot|semrush|ahref|headlesschrome|phantomjs/i

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 90
const BYPASS_VARIANT_COOKIE = 'ph_site_variant_bypass'
const BYPASS_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 4

export function getSiteExperimentConfig(): SiteExperimentConfig | null {
    const projectToken = process.env.GATSBY_POSTHOG_API_KEY
    const deploymentUrl = process.env.SITE_EXPERIMENT_DEPLOYMENT_URL?.replace(/\/$/, '')
    const flagKey = process.env.SITE_EXPERIMENT_FLAG_KEY

    if (!projectToken || !deploymentUrl || !flagKey) {
        return null
    }

    return {
        enabled: process.env.SITE_EXPERIMENT_ENABLED === 'true',
        flagKey,
        deploymentUrl,
        projectToken,
        flagsApiHost: process.env.POSTHOG_FLAGS_API_HOST || 'https://us.i.posthog.com',
        controlVariant: process.env.SITE_EXPERIMENT_CONTROL_VARIANT || 'control',
        testVariant: process.env.SITE_EXPERIMENT_TEST_VARIANT || 'test',
        bypassSecret: process.env.SITE_EXPERIMENT_BYPASS_SECRET,
    }
}

export function shouldRunSiteExperiment(pathname: string): boolean {
    return !pathname.startsWith('/api/')
}

export function isBot(userAgent: string | null): boolean {
    if (!userAgent) {
        return false
    }

    return BOT_USER_AGENT.test(userAgent)
}

export function getCookie(request: Request, name: string): string | undefined {
    const cookieHeader = request.headers.get('cookie')
    if (!cookieHeader) {
        return undefined
    }

    const cookies = cookieHeader.split(';')
    for (const cookie of cookies) {
        const [rawName, ...rawValue] = cookie.trim().split('=')
        if (rawName === name) {
            return decodeURIComponent(rawValue.join('='))
        }
    }

    return undefined
}

export function getPostHogCookieKey(projectToken: string): string {
    return `ph_${projectToken}_posthog`
}

export function getDistinctId(request: Request, projectToken: string): string {
    const posthogCookie = getCookie(request, getPostHogCookieKey(projectToken))
    if (!posthogCookie) {
        return crypto.randomUUID()
    }

    try {
        const parsed = JSON.parse(posthogCookie) as { distinct_id?: string }
        if (parsed.distinct_id) {
            return parsed.distinct_id
        }
    } catch {
        // Fall through to a new ID if the cookie is malformed.
    }

    return crypto.randomUUID()
}

function shouldClearBypassCookie(request: Request): boolean {
    return new URL(request.url).searchParams.has('ph_site_clear_bypass')
}

function getBypassVariantFromUrl(request: Request, config: SiteExperimentConfig): SiteExperimentVariant | null {
    const url = new URL(request.url)
    const variant = url.searchParams.get('ph_site_variant')
    if (variant !== 'control' && variant !== 'test') {
        return null
    }

    if (config.bypassSecret) {
        const bypass = url.searchParams.get('ph_site_bypass')
        if (bypass !== config.bypassSecret) {
            return null
        }
    }

    return variant
}

function getBypassVariantFromCookie(request: Request): SiteExperimentVariant | null {
    const value = getCookie(request, BYPASS_VARIANT_COOKIE)
    if (value === 'control' || value === 'test') {
        return value
    }

    return null
}

export function getBypassVariant(request: Request, config: SiteExperimentConfig): SiteExperimentVariant | null {
    if (shouldClearBypassCookie(request)) {
        return null
    }

    const urlBypass = getBypassVariantFromUrl(request, config)
    if (urlBypass) {
        return urlBypass
    }

    return getBypassVariantFromCookie(request)
}

function clearBypassVariantCookie(secure: boolean): string {
    const parts = [`${BYPASS_VARIANT_COOKIE}=`, 'Path=/', 'Max-Age=0', 'SameSite=Lax']

    if (secure) {
        parts.push('Secure')
    }

    return parts.join('; ')
}

function buildBypassVariantCookie(variant: SiteExperimentVariant, secure: boolean): string {
    const parts = [
        `${BYPASS_VARIANT_COOKIE}=${variant}`,
        'Path=/',
        `Max-Age=${BYPASS_COOKIE_MAX_AGE_SECONDS}`,
        'SameSite=Lax',
    ]

    if (secure) {
        parts.push('Secure')
    }

    return parts.join('; ')
}

export function normalizeFlagVariant(
    flag: PostHogFlagEvaluation | undefined,
    config: SiteExperimentConfig
): SiteExperimentVariant {
    if (!flag?.enabled) {
        return 'control'
    }

    const variant = flag.variant
    if (variant) {
        if (variant.startsWith('holdout-')) {
            return 'control'
        }

        if (variant === config.testVariant) {
            return 'test'
        }

        return 'control'
    }

    return flag.enabled ? 'test' : 'control'
}

export interface SiteExperimentAssignment {
    variant: SiteExperimentVariant
    distinctId: string
}

export async function evaluateSiteExperimentVariant(
    request: Request,
    config: SiteExperimentConfig
): Promise<SiteExperimentAssignment> {
    const distinctId = getDistinctId(request, config.projectToken)

    const bypassVariant = getBypassVariant(request, config)
    if (bypassVariant) {
        return { variant: bypassVariant, distinctId }
    }

    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    const userAgent = request.headers.get('user-agent')
    if (userAgent) {
        headers.set('User-Agent', userAgent)
    }

    const origin = request.headers.get('origin')
    if (origin) {
        headers.set('Origin', origin)
    }

    const referer = request.headers.get('referer')
    if (referer) {
        headers.set('Referer', referer)
    }

    try {
        const response = await fetch(`${config.flagsApiHost}/flags?v=2`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                api_key: config.projectToken,
                distinct_id: distinctId,
            }),
        })

        if (!response.ok) {
            return { variant: 'control', distinctId }
        }

        const data = (await response.json()) as PostHogFlagsResponse
        if (data.errorsWhileComputingFlags || data.quotaLimited?.includes('feature_flags')) {
            return { variant: 'control', distinctId }
        }

        return {
            variant: normalizeFlagVariant(data.flags?.[config.flagKey], config),
            distinctId,
        }
    } catch {
        return { variant: 'control', distinctId }
    }
}

export function getRewriteUrl(request: Request, deploymentUrl: string): URL {
    const incomingUrl = new URL(request.url)
    return new URL(`${incomingUrl.pathname}${incomingUrl.search}`, deploymentUrl)
}

export function shouldRewriteToExperiment(variant: SiteExperimentVariant): boolean {
    return variant === 'test'
}

export function appendVariantCookies(
    response: Response,
    request: Request,
    config: SiteExperimentConfig,
    assignment: SiteExperimentAssignment
): Response {
    const secure = new URL(request.url).protocol === 'https:'
    const cookies: string[] = []

    if (shouldClearBypassCookie(request)) {
        cookies.push(clearBypassVariantCookie(secure))
    } else {
        const urlBypass = getBypassVariantFromUrl(request, config)
        if (urlBypass) {
            cookies.push(buildBypassVariantCookie(urlBypass, secure))
        }
    }

    const posthogCookie = getCookie(request, getPostHogCookieKey(config.projectToken))
    if (!posthogCookie) {
        const payload = encodeURIComponent(
            JSON.stringify({
                distinct_id: assignment.distinctId,
                $device_id: assignment.distinctId,
            })
        )
        const parts = [
            `${getPostHogCookieKey(config.projectToken)}=${payload}`,
            'Path=/',
            `Max-Age=${COOKIE_MAX_AGE_SECONDS}`,
            'SameSite=Lax',
        ]
        if (secure) {
            parts.push('Secure')
        }
        cookies.push(parts.join('; '))
    }

    for (const cookie of cookies) {
        response.headers.append('Set-Cookie', cookie)
    }

    response.headers.set('x-ph-site-variant', assignment.variant)

    return response
}

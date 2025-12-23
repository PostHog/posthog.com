import { getCookie, setCookie } from './utils'

/**
 * Product interest tracking for onboarding
 *
 * This module handles tracking which product landing or docs pages a user
 * has shown interest in by visiting them. When a user lands on a product-specific
 * page (like /product-analytics or /session-replay), we record the product's slug
 * into a cross-subdomain cookie.
 *
 * The main purpose is to enable a personalized onboarding experience:
 * - When a user signs up or returns to the site, we can show onboarding steps
 *   and product highlights tailored to the products they have visited.
 * - This works across posthog.com subdomains by using a shared cookie domain.
 *
 * Product interest is registered by calling `showedInterest(slug)`, and
 * you can retrieve the current list of interested product slugs via `getProductInterests()`.
 */

const COOKIE_NAME = 'ph_product_interest_onboarding'
const COOKIE_DAYS = 14 // Very short duration, only meant to show contextual information on onboarding

function getCookieDomain(): string | undefined {
    if (typeof window === 'undefined') return undefined

    const hostname = window.location.hostname

    // Local development - don't set domain so cookie works on localhost
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return undefined
    }

    // Preview environment on vercel, just set it to be shared across all vercel subdomains
    if (hostname.includes('vercel.app')) {
        return '.vercel.app'
    }

    // In any other case, cookie should be available across all of our posthog.com subdomains
    // to be able to use this both in posthog.com, us.posthog.com, and eu.posthog.com
    return '.posthog.com'
}

// Landing page/docs page slugs we want to track interest in
const PRODUCT_SLUGS = new Set([
    'product-analytics',
    'web-analytics',
    'session-replay',
    'feature-flags',
    'experiments',
    'error-tracking',
    'surveys',
    'data-warehouse',
    'llm-analytics',
    'revenue-analytics',
    'workflows',
    'logs',
    'endpoints',
])

export function getProductInterests(): string[] {
    if (typeof document === 'undefined') return []
    const raw = getCookie(COOKIE_NAME)
    if (!raw) return []
    try {
        return JSON.parse(raw)
    } catch {
        return []
    }
}

export function showedInterest(slug: string): void {
    if (typeof document === 'undefined') return

    const interests = getProductInterests()
    if (!interests.includes(slug)) {
        interests.push(slug)
        setCookie(COOKIE_NAME, JSON.stringify(interests), COOKIE_DAYS, getCookieDomain())
    }
}

export function getProductSlugFromPath(pathname: string): string | null {
    // Landing pages: /product-analytics, /session-replay, etc.
    const landingMatch = pathname.match(/^\/([a-z-]+)\/?$/)
    if (landingMatch && PRODUCT_SLUGS.has(landingMatch[1])) {
        return landingMatch[1]
    }

    // Docs pages: /docs/product-analytics/*, /docs/session-replay/*, etc.
    const docsMatch = pathname.match(/^\/docs\/([a-z-]+)/)
    if (docsMatch && PRODUCT_SLUGS.has(docsMatch[1])) {
        return docsMatch[1]
    }

    return null
}

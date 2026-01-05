/**
 * Product interest tracking for onboarding
 *
 * This module handles tracking which product landing or docs pages a user
 * has shown interest in by visiting them. When a user lands on a product-specific
 * page (like /product-analytics or /session-replay), we record the product's slug
 * using PostHog's cookie_persisted_properties feature.
 *
 * The main purpose is to enable a personalized onboarding experience:
 * - When a user signs up or returns to the site, we can show onboarding steps
 *   and product highlights tailored to the products they have visited.
 * - This works across posthog.com subdomains because PostHog's cross_subdomain_cookie
 *   is enabled by default, and we've added this property to cookie_persisted_properties.
 *
 * Product interest is registered by calling `showedInterest(slug)`, and
 * you can retrieve the current list of interested product slugs via `getProductInterests()`.
 */

// Property name used in PostHog - must match cookie_persisted_properties in posthog-init.js
const PROPERTY_NAME = 'prod_interest'

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

function getPostHog() {
    return typeof window !== 'undefined' ? window.posthog : undefined
}

export function getProductInterests(): string[] {
    const posthog = getPostHog()
    if (!posthog) return []

    const interests = posthog.get_property(PROPERTY_NAME)
    if (!interests || !Array.isArray(interests)) return []
    return interests
}

export function showedInterest(slug: string): void {
    const posthog = getPostHog()
    if (!posthog) return

    // Always add the new interest to the end of the list
    // and only keep at most 3 interests to keep the cookie size down
    const interests = [...getProductInterests().filter((interest) => interest !== slug), slug].slice(-3)
    posthog.register({ [PROPERTY_NAME]: interests })
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

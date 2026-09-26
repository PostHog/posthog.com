/**
 * Adds the posthog.com tracking parameter to an outbound link.
 *
 * Job and company URLs come from Strapi, and many already have a query string
 * (for example `?rs=1234`), so the parameter must be merged into the URL. A plain
 * string append makes a second `?` and breaks the link. Returns the URL unchanged
 * if it is not absolute, because there is nothing safe to merge into.
 */
export const withPostHogUtmSource = (url: string): string => {
    try {
        const parsed = new URL(url)
        parsed.searchParams.set('utm_source', 'posthog')
        return parsed.toString()
    } catch {
        return url
    }
}

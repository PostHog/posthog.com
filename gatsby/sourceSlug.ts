/* Derives the URL slug for a data warehouse source from its public API config.
 * Kept as a pure function so it can be unit tested without a full Gatsby build.
 * Run the test: npx tsx gatsby/sourceSlug.test.ts */

export type PublicSourceConfig = {
    name?: string
    label?: string
    docsUrl?: string | null
}

/* Returns the slug for a source, or null when the config cannot yield one.
 * A null result means the record is incomplete and must not publish a page or
 * nav link — an unchecked slug produces broken `/docs/.../sources/null` URLs. */
export function deriveSourceSlug(config: PublicSourceConfig): string | null {
    const displayName = config.label || config.name
    if (!displayName) return null

    // Prefer the slug from the source's own posthog.com docsUrl so the listing link always
    // matches the committed doc file (e.g. `active-campaign`, not the label-derived
    // `activecampaign`). Fall back to the label for sources without a posthog docs URL.
    const docsSlug = config.docsUrl?.match(/\/docs\/cdp\/sources\/([^/?#]+)/)?.[1]
    const labelSlug = displayName
        .toLowerCase()
        .replace(/\./g, '')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')

    return docsSlug || labelSlug || null
}

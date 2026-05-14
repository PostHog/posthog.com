/**
 * Subpaths under `/<slug>/` that are shared across products and should be
 * preserved when the user switches products. Add new entries as new shared
 * product surfaces (e.g. `'tutorials'`) come online.
 */
const KNOWN_SHARED_SECTIONS = ['pricing']

/**
 * Map the user's current URL onto the equivalent surface for a different
 * product. Used by `ProductSwitcher` to decide where to navigate when the
 * active product changes.
 *
 * Rules (in order):
 * - `/docs/<currentSlug>/...`        → `/docs/<newSlug>`        (always strip docs subpaths)
 * - `/<currentSlug>/<section>` where `section` is a known shared section
 *                                    → `/<newSlug>/<section>`
 * - anything else                    → `/<newSlug>`             (fall back to product root)
 */
export function getProductSurfaceUrl(currentPath: string, newSlug: string): string {
    const parts = currentPath
        .replace(/^\/+|\/+$/g, '')
        .split('/')
        .filter(Boolean)

    if (parts[0] === 'docs' && parts.length >= 2) {
        return `/docs/${newSlug}`
    }

    if (parts.length === 2 && KNOWN_SHARED_SECTIONS.includes(parts[1])) {
        return `/${newSlug}/${parts[1]}`
    }

    return `/${newSlug}`
}

export default getProductSurfaceUrl

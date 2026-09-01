/** Docs drop-down experiment: does grouping the menu by reader goal get more people into a pocket guide? */
export const DOCS_NAV_FLAG = 'docs-nav-goals'

export type DocsNavVariantId = 'control' | 'goals'

/** Index 0 is control, and control is the fallback for every failure mode. */
export const DOCS_NAV_VARIANTS: DocsNavVariantId[] = ['control', 'goals']

export const DEFAULT_DOCS_NAV_VARIANT: DocsNavVariantId = DOCS_NAV_VARIANTS[0]

/** Control covers SSR, ad-blocked visitors, absent flags, and any key we don't recognize. */
export function resolveDocsNavVariant(value: string | boolean | null | undefined): DocsNavVariantId {
    if (!value || typeof value !== 'string') {
        return DEFAULT_DOCS_NAV_VARIANT
    }
    const normalized = value.trim().toLowerCase() as DocsNavVariantId
    return DOCS_NAV_VARIANTS.includes(normalized) ? normalized : DEFAULT_DOCS_NAV_VARIANT
}

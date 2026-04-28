import React from 'react'

/**
 * A single entry in a product's `productMenu` (or `pricingMenu`). Defined on
 * the product data (e.g. `src/hooks/productData/session_replay.tsx`) and
 * consumed by `ProductReaderView` + `ProductNav`.
 *
 * `slug` is the anchor id used for in-page and cross-page navigation, and
 * doubles as the lookup key when rendering content (unless an explicit
 * `template` is provided).
 *
 * `template` is the key into the template registry that renders this section.
 * If omitted, it defaults to `slug` — so `{ slug: 'overview', name: 'Overview' }`
 * renders with the `overview` template.
 */
export interface ProductNavItem {
    slug: string
    name: string
    template?: string
    icon?: React.ReactNode
    /**
     * Consecutive items sharing the same `group` value are wrapped together in
     * a styled container by `ProductReaderView` (e.g. `'divided'` renders them
     * inside a `divide-y` panel with even vertical padding). Items without a
     * `group` render as standalone siblings.
     */
    group?: string
    /**
     * When true, the section is still rendered on the page but excluded from
     * the sidebar nav. Useful for legacy/in-progress sections that should be
     * visible during migration but not surfaced as anchors.
     */
    hideFromNav?: boolean
}

/**
 * Resolves a `ProductNavItem` to the template key that should render it,
 * falling back to the slug.
 */
export const resolveTemplate = (item: ProductNavItem): string => item.template || item.slug

export interface SectionComponentProps {
    /** HTML id applied to the `<section>` element; comes from the menu item's slug. */
    id: string
    productData: any
    data: any
    customers: any[]
    customerSlugs: string[]
    hasCaseStudy: (slug: string) => boolean
    allProducts: any[]
}

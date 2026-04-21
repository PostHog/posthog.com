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

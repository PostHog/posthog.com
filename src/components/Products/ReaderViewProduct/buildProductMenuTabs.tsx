import React from 'react'
import { TreeMenu } from 'components/TreeMenu'
import type { MenuTab } from 'components/ReaderView'
import { docsMenu } from '../../../navs'
import MarketingNav from './MarketingNav'
import ProductNav from './ProductNav'
import type { MarketingNavItem } from './types'

export type ProductSurface = 'about' | 'pricing' | 'docs'

interface BuildProductMenuTabsArgs {
    /**
     * Resolved product data from `useProduct(...)`. Must include `slug` and
     * `name`. Reads `marketingMenu` (About) and `pricingMenu` (Pricing) when
     * present.
     */
    productData:
        | {
              slug: string
              name: string
              marketingMenu?: MarketingNavItem[]
              pricingMenu?: MarketingNavItem[]
          }
        | null
        | undefined
    /**
     * Ref to the wrapping element containing the `<section id="..." />` nodes
     * on the active surface. Used by `MarketingNav` for in-page anchor scrolling
     * within the article column's ScrollArea. Only the tab whose `value`
     * matches `activeSurface` uses this ref; the other tabs fall back to
     * cross-page Gatsby links via `ProductNav`.
     */
    contentRef?: React.RefObject<HTMLElement>
    /** Seeds which tab is active on first render. */
    activeSurface: ProductSurface
}

const surfaceBasePath = (productSlug: string, surface: ProductSurface): string => {
    if (surface === 'pricing') return `/${productSlug}/pricing`
    return `/${productSlug}`
}

/**
 * Single source of truth for the LeftSidebar's tab strip across a product's
 * About (`/<slug>`), Pricing (`/<slug>/pricing`), and Docs (`/docs/<slug>`)
 * surfaces. Reads `marketingMenu` / `pricingMenu` from `productData` and
 * looks up the Docs menu from `docsMenu` so every surface renders an
 * identical sidebar.
 *
 * The active tab uses in-page anchor scrolling via `MarketingNav` (when
 * `contentRef` is provided); inactive tabs use `ProductNav` cross-page links.
 */
export function buildProductMenuTabs({ productData, contentRef, activeSurface }: BuildProductMenuTabsArgs): MenuTab[] {
    if (!productData) return []

    const { slug: productSlug, name: productName, marketingMenu = [], pricingMenu = [] } = productData

    const docsChildren =
        docsMenu.children.find(({ name }: { name: string }) => name.toLowerCase() === productName.toLowerCase())
            ?.children || []

    const tabs: MenuTab[] = []

    if (marketingMenu.length > 0) {
        tabs.push({
            label: 'About',
            value: 'about',
            default: activeSurface === 'about',
            menu:
                activeSurface === 'about' && contentRef ? (
                    <MarketingNav items={marketingMenu} contentRef={contentRef} />
                ) : (
                    <ProductNav items={marketingMenu} basePath={surfaceBasePath(productSlug, 'about')} />
                ),
        })
    }

    if (pricingMenu.length > 0) {
        tabs.push({
            label: 'Pricing',
            value: 'pricing',
            default: activeSurface === 'pricing',
            menu:
                activeSurface === 'pricing' && contentRef ? (
                    <MarketingNav items={pricingMenu} contentRef={contentRef} />
                ) : (
                    <ProductNav items={pricingMenu} basePath={surfaceBasePath(productSlug, 'pricing')} />
                ),
        })
    }

    if (docsChildren.length > 0) {
        tabs.push({
            label: 'Docs',
            value: 'docs',
            default: activeSurface === 'docs',
            menu: <TreeMenu items={docsChildren} />,
        })
    }

    return tabs
}

export default buildProductMenuTabs

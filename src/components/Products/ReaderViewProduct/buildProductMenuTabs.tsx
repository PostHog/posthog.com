import React from 'react'
import { TreeMenu } from 'components/TreeMenu'
import type { MenuTab } from 'components/ReaderView'
import { docsMenu } from '../../../navs'
import MarketingNav from './MarketingNav'
import ProductNav from './ProductNav'
import type { MarketingNavItem } from './types'

interface BuildProductMenuTabsArgs {
    /**
     * Resolved product data from `useProduct(...)`. Must include `slug`,
     * `name`, and `marketingMenu` (the list of About-surface sections).
     */
    productData:
        | {
              slug: string
              name: string
              marketingMenu?: MarketingNavItem[]
          }
        | null
        | undefined
    /**
     * Ref to the wrapping element containing the `<section id="..." />` nodes.
     * When provided, the About tab uses `MarketingNav` (in-page anchor scrolling
     * within the article column's ScrollArea). Omit when rendering on a page
     * that doesn't host the About sections — the About tab falls back to
     * `ProductNav` (cross-page Gatsby links).
     */
    aboutContentRef?: React.RefObject<HTMLElement>
    /** Seeds which tab is active on first render. */
    activeSurface: 'about' | 'docs'
}

/**
 * Single source of truth for the LeftSidebar's tab strip on a product's
 * About page (`/<slug>`) and Docs page (`/docs/<slug>`). Reads the
 * `marketingMenu` from `productData` and looks up the Docs menu from
 * `docsMenu` so both surfaces render an identical sidebar.
 */
export function buildProductMenuTabs({
    productData,
    aboutContentRef,
    activeSurface,
}: BuildProductMenuTabsArgs): MenuTab[] {
    if (!productData) return []

    const { slug: productSlug, name: productName, marketingMenu = [] } = productData

    const docsChildren =
        docsMenu.children.find(({ name }: { name: string }) => name.toLowerCase() === productName.toLowerCase())
            ?.children || []

    return [
        {
            label: 'About',
            value: 'about',
            default: activeSurface === 'about',
            menu: aboutContentRef ? (
                <MarketingNav items={marketingMenu} contentRef={aboutContentRef} />
            ) : (
                <ProductNav items={marketingMenu} basePath={`/${productSlug}`} />
            ),
        },
        {
            label: 'Docs',
            value: 'docs',
            default: activeSurface === 'docs',
            menu: <TreeMenu items={docsChildren} />,
        },
    ]
}

export default buildProductMenuTabs

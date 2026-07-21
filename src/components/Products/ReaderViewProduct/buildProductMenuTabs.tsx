import React, { useMemo } from 'react'
import { IconBook, IconPiggyBank, IconPresent } from '@posthog/icons'
import { TreeMenu } from 'components/TreeMenu'
import usePlatformList from 'hooks/docs/usePlatformList'
import type { MenuTab } from 'components/ReaderView'
import { docsMenu } from '../../../navs'
import ProductNav from './ProductNav'
import type { ProductNavItem } from './types'

const TAB_ICON: Record<'product' | 'pricing' | 'docs', React.ReactNode> = {
    product: <IconPresent className="size-4" />,
    pricing: <IconPiggyBank className="size-4" />,
    docs: <IconBook className="size-4" />,
}

export type ProductSurface = 'product' | 'pricing' | 'docs'

type DocsMenuItem = {
    name: string
    url?: string
    children?: DocsMenuItem[]
    [key: string]: unknown
}

/**
 * Renders the docs TreeMenu, injecting the install method pages as an
 * expandable submenu under the "Install" item. The list is sourced from the
 * product's install MDX pages (`usePlatformList`) so it's never hardcoded in
 * the nav — keeping a single source of truth. The first child links back to the
 * main Install page.
 */
const DocsTreeMenu = ({
    items,
    productName,
    variant,
    rootHeading,
}: {
    items: DocsMenuItem[]
    productName: string
    variant: 'grouped' | 'listed'
    rootHeading: string
}) => {
    const installItem = useMemo(() => items.find((i) => i.url && /\/installation$/.test(i.url)), [items])
    const installBase = installItem?.url ? installItem.url.replace(/^\//, '') : 'docs/__no-install__/installation'
    const platforms = usePlatformList(installBase, `${productName.toLowerCase()} installation`, { sortAlpha: true })

    const itemsWithInstall = useMemo(() => {
        if (!installItem || platforms.length === 0) return items
        return items.map((i) =>
            i === installItem
                ? {
                      // The main Install page is reached via the parent link itself, so no
                      // "Overview" child — children are just the per-language pages.
                      ...i,
                      children: platforms.map((p) => ({ name: p.label, url: p.url })),
                  }
                : i
        )
    }, [items, installItem, platforms])

    return <TreeMenu items={itemsWithInstall as any} variant={variant} appearance="sidebar" rootHeading={rootHeading} />
}

interface BuildProductMenuTabsArgs {
    /**
     * Resolved product data from `useProduct(...)`. Must include `slug` and
     * `name`. Reads `productMenu` (Product surface) and `pricingMenu`
     * (Pricing surface) when present.
     */
    productData:
        | {
              slug: string
              name: string
              productMenu?: ProductNavItem[]
              pricingMenu?: ProductNavItem[]
          }
        | null
        | undefined
    /**
     * Ref to the wrapping element containing the `<section id="..." />` nodes
     * on the active surface. Used by `ProductNav` for in-page anchor scrolling
     * within the article column's ScrollArea. Only the tab whose `value`
     * matches `activeSurface` uses this ref; the other tabs fall back to
     * cross-page Gatsby links.
     */
    contentRef?: React.RefObject<HTMLElement>
    /** Seeds which tab is active on first render. */
    activeSurface: ProductSurface
    /**
     * Optional override for the docs tab rendering style. When omitted, the
     * style is read from the product's `navStyle` in `docsMenu` so the index
     * and every interior docs page render the same nav.
     */
    navStyle?: 'grouped' | 'listed'
}

const surfaceBasePath = (productSlug: string, surface: ProductSurface): string => {
    if (surface === 'pricing') return `/${productSlug}/pricing`
    return `/${productSlug}`
}

/**
 * Single source of truth for the LeftSidebar's tab strip across a product's
 * Product (`/<slug>`), Pricing (`/<slug>/pricing`), and Docs (`/docs/<slug>`)
 * surfaces. Reads `productMenu` / `pricingMenu` from `productData` and looks
 * up the Docs menu from `docsMenu` so every surface renders an identical
 * sidebar.
 *
 * The active tab uses in-page anchor scrolling via `ProductNav` (when
 * `contentRef` is provided); inactive tabs fall back to cross-page links.
 */
export function buildProductMenuTabs({
    productData,
    contentRef,
    activeSurface,
    navStyle,
}: BuildProductMenuTabsArgs): MenuTab[] {
    if (!productData) return []

    const { slug: productSlug, name: productName, productMenu = [], pricingMenu = [] } = productData

    const navProductMenu = productMenu.filter((item) => !item.hideFromNav)
    const navPricingMenu = pricingMenu.filter((item) => !item.hideFromNav)

    const docsEntry = docsMenu.children.find(
        ({ name }: { name: string }) => name.toLowerCase() === productName.toLowerCase()
    )
    const docsChildren = docsEntry?.children || []
    const resolvedNavStyle: 'grouped' | 'listed' = navStyle ?? docsEntry?.navStyle ?? 'listed'

    const tabs: MenuTab[] = []

    if (navProductMenu.length > 0) {
        tabs.push({
            label: 'Product',
            value: 'product',
            icon: TAB_ICON.product,
            default: activeSurface === 'product',
            href: surfaceBasePath(productSlug, 'product'),
            menu: (
                <ProductNav
                    items={navProductMenu}
                    basePath={surfaceBasePath(productSlug, 'product')}
                    contentRef={activeSurface === 'product' ? contentRef : undefined}
                />
            ),
        })
    }

    if (navPricingMenu.length > 0) {
        tabs.push({
            label: 'Pricing',
            value: 'pricing',
            icon: TAB_ICON.pricing,
            default: activeSurface === 'pricing',
            href: surfaceBasePath(productSlug, 'pricing'),
            menu: (
                <ProductNav
                    items={navPricingMenu}
                    basePath={surfaceBasePath(productSlug, 'pricing')}
                    contentRef={activeSurface === 'pricing' ? contentRef : undefined}
                />
            ),
        })
    }

    if (docsChildren.length > 0) {
        tabs.push({
            label: 'Docs',
            value: 'docs',
            icon: TAB_ICON.docs,
            default: activeSurface === 'docs',
            href: `/docs/${productSlug}`,
            menu: (
                <DocsTreeMenu
                    items={docsChildren}
                    productName={productName}
                    variant={resolvedNavStyle}
                    rootHeading={productName}
                />
            ),
        })
    }

    return tabs
}

export default buildProductMenuTabs

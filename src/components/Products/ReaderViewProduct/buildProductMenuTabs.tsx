import React, { useMemo } from 'react'
import { IconBook, IconGraduationCap, IconPiggyBank, IconPresent } from '@posthog/icons'
import { TreeMenu } from 'components/TreeMenu'
import Link from 'components/Link'
import { learnChapterPath } from 'components/PocketGuides/LearnSurface'
import { DEFAULT_LEARN_PLACEMENT, type LearnPlacement } from './learnPlacement'
import { useBookPages } from 'components/PocketGuides/bookModel'
import usePlatformList from 'hooks/docs/usePlatformList'
import type { MenuTab } from 'components/ReaderView'
import { docsMenu } from '../../../navs'
import ProductNav from './ProductNav'
import type { ProductNavItem } from './types'

const TAB_ICON: Record<'product' | 'pricing' | 'docs' | 'learn', React.ReactNode> = {
    product: <IconPresent className="size-4" />,
    pricing: <IconPiggyBank className="size-4" />,
    docs: <IconBook className="size-4" />,
    learn: <IconGraduationCap className="size-4" />,
}

export type ProductSurface = 'product' | 'pricing' | 'docs' | 'learn'

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
    learnVolumeId,
    learnBasePath,
    activeUrl,
}: {
    items: DocsMenuItem[]
    productName: string
    variant: 'grouped' | 'listed'
    rootHeading: string
    /** Set only in the `nested` arm; empty yields no Learn item. */
    learnVolumeId?: string
    learnBasePath?: string
    activeUrl?: string
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

    // Unconditional: a hook cannot be called behind a branch.
    const learnPages = useBookPages(learnVolumeId || '')

    const itemsWithLearn = useMemo(() => {
        if (!learnVolumeId || !learnBasePath || learnPages.length === 0) return itemsWithInstall
        // A childless item with no `url` is how `buildSections` marks a heading.
        const learnSection = [
            { name: 'Learn' },
            ...learnPages.map((page) => ({
                name: page.shortTitle || page.title,
                url: learnChapterPath(learnBasePath, page),
            })),
        ]
        // Skips index 0, the root heading, so Learn lands after Overview.
        const firstHeading = itemsWithInstall.findIndex(
            (item, i) => i > 0 && !item.url && !(item.children && item.children.length > 0)
        )
        const at = firstHeading === -1 ? itemsWithInstall.length : firstHeading
        return [...itemsWithInstall.slice(0, at), ...learnSection, ...itemsWithInstall.slice(at)]
    }, [itemsWithInstall, learnVolumeId, learnBasePath, learnPages])

    return (
        <TreeMenu
            // `TreeMenu` freezes `props.items` (empty-dep `useMemo`); only a remount updates it.
            key={itemsWithLearn === itemsWithInstall ? 'docs' : 'docs-with-learn'}
            items={itemsWithLearn as any}
            variant={variant}
            appearance="sidebar"
            rootHeading={rootHeading}
            activeUrl={activeUrl}
        />
    )
}

/** One item per chapter, each its own page; `ProductNav` scrolls within one instead. */
const LearnNav = ({
    volumeId,
    basePath,
    currentPath,
}: {
    volumeId: string
    basePath: string
    currentPath?: string
}) => {
    const pages = useBookPages(volumeId)
    return (
        <nav>
            <ul className="list-none m-0 p-0 flex flex-col gap-px">
                {pages.map((page) => {
                    const to = learnChapterPath(basePath, page)
                    const active = currentPath ? currentPath.replace(/\/$/, '') === to : false
                    return (
                        <li key={page.url} className="m-0 p-0">
                            <Link
                                to={to}
                                className={`block w-full px-2 py-1 rounded text-sm hover:bg-accent ${
                                    active
                                        ? 'font-semibold text-primary bg-accent'
                                        : 'text-secondary hover:text-primary'
                                }`}
                            >
                                <span data-sidebar-label>{page.shortTitle || page.title}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
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
              /** Volume id from `src/constants/pocketGuides.ts`; setting it is the whole opt-in. */
              pocketGuideVolume?: string
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
    currentPath?: string
    /** From `useLearnPlacement()`: own tab, or heading the Docs tree. */
    learnPlacement?: LearnPlacement
    /**
     * Optional override for the docs tab rendering style. When omitted, the
     * style is read from the product's `navStyle` in `docsMenu` so the index
     * and every interior docs page render the same nav.
     */
    navStyle?: 'grouped' | 'listed'
}

const surfaceBasePath = (productSlug: string, surface: ProductSurface): string => {
    if (surface === 'pricing') return `/${productSlug}/pricing`
    // Under /docs so switching to Learn never leaves the docs sidebar.
    if (surface === 'learn') return `/docs/${productSlug}/learn`
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
    currentPath,
    learnPlacement = DEFAULT_LEARN_PLACEMENT,
    navStyle,
}: BuildProductMenuTabsArgs): MenuTab[] {
    if (!productData) return []

    const { slug: productSlug, name: productName, productMenu = [], pricingMenu = [], pocketGuideVolume } = productData

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
                    learnVolumeId={learnPlacement === 'nested' ? pocketGuideVolume : undefined}
                    learnBasePath={surfaceBasePath(productSlug, 'learn')}
                    activeUrl={currentPath}
                />
            ),
        })
    }

    if (pocketGuideVolume && learnPlacement === 'tab') {
        tabs.push({
            label: 'Learn',
            value: 'learn',
            icon: TAB_ICON.learn,
            default: activeSurface === 'learn',
            href: surfaceBasePath(productSlug, 'learn'),
            menu: (
                <LearnNav
                    volumeId={pocketGuideVolume}
                    basePath={surfaceBasePath(productSlug, 'learn')}
                    currentPath={activeSurface === 'learn' ? currentPath : undefined}
                />
            ),
        })
    }

    return tabs
}

export default buildProductMenuTabs

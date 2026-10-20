import React, { useMemo } from 'react'
import {
    IconArrowLeft,
    IconBook,
    IconCursorClick,
    IconEye,
    IconGraduationCap,
    IconTerminal,
    IconPiggyBank,
    IconPresent,
} from '@posthog/icons'
import { TreeMenu } from 'components/TreeMenu'
import Link from 'components/Link'
import { learnChapterPath, learnChapterSlug, useBookPages } from 'components/PocketGuides/bookModel'
import usePlatformList from 'hooks/docs/usePlatformList'
import usePostHog from 'hooks/usePostHog'
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
    activeUrl,
}: {
    items: DocsMenuItem[]
    productName: string
    variant: 'grouped' | 'listed'
    rootHeading: string
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

    return (
        <TreeMenu
            items={itemsWithInstall as any}
            variant={variant}
            appearance="sidebar"
            rootHeading={rootHeading}
            activeUrl={activeUrl}
        />
    )
}

const LearnHubNav = ({
    basePath,
    contentRef,
    volumeId,
}: {
    basePath: string
    contentRef?: React.RefObject<HTMLElement>
    volumeId: string
}) => {
    const posthog = usePostHog()
    return (
        <ProductNav
            basePath={basePath}
            contentRef={contentRef}
            onItemClick={(section) =>
                posthog?.capture('learn_section_selected', { volume: volumeId, section, placement: 'sidebar' })
            }
            items={[
                { slug: 'overview', name: 'Overview', icon: <IconEye className="size-4" /> },
                { slug: 'agent-teacher', name: 'Have your agent teach you', icon: <IconTerminal className="size-4" /> },
                { slug: 'learn-through-story', name: 'Learn through a story', icon: <IconBook className="size-4" /> },
                { slug: 'learn-by-doing', name: 'Learn by doing', icon: <IconCursorClick className="size-4" /> },
            ]}
        />
    )
}

/** Standard guides link between chapter pages; hub guides scroll between anchored sections. */
const LearnNav = ({
    volumeId,
    basePath,
    currentPath,
    hasLanding,
    hub,
    contentRef,
}: {
    volumeId: string
    basePath: string
    currentPath?: string
    hasLanding?: boolean
    hub?: boolean
    contentRef?: React.RefObject<HTMLElement>
}) => {
    const pages = useBookPages(volumeId)
    const posthog = usePostHog()
    const normalizedCurrentPath = currentPath?.replace(/\/$/, '')
    const normalizedBasePath = basePath.replace(/\/$/, '')

    if (hub && (!normalizedCurrentPath || normalizedCurrentPath === normalizedBasePath)) {
        return <LearnHubNav basePath={basePath} contentRef={contentRef} volumeId={volumeId} />
    }

    return (
        <nav>
            <ul className="list-none m-0 p-0 flex flex-col gap-px">
                {hasLanding ? (
                    <li className="m-0 mb-2 border-b border-primary/20 p-0 pb-2">
                        <Link
                            to={basePath}
                            onClick={() =>
                                posthog?.capture('learn_section_selected', {
                                    volume: volumeId,
                                    section: 'overview',
                                    placement: 'sidebar',
                                })
                            }
                            className="block w-full rounded px-2 py-1 text-sm !text-primary !no-underline hover:bg-dark/10 focus-visible:outline-offset-[-2px] dark:hover:bg-light/10"
                        >
                            <span className="inline-flex items-center gap-1.5">
                                <IconArrowLeft className="size-4 shrink-0" aria-hidden="true" />
                                <span data-sidebar-label>Back to Learn</span>
                            </span>
                        </Link>
                    </li>
                ) : null}
                {pages.map((page) => {
                    const to =
                        page.isFrontMatter && hasLanding ? `${basePath}/introduction` : learnChapterPath(basePath, page)
                    const active = currentPath ? currentPath.replace(/\/$/, '') === to : false
                    return (
                        <li key={page.url} className="m-0 p-0">
                            <Link
                                to={to}
                                onClick={() =>
                                    posthog?.capture('learn_chapter_selected', {
                                        volume: volumeId,
                                        chapter: page.isFrontMatter ? 'introduction' : learnChapterSlug(page),
                                        placement: 'sidebar',
                                    })
                                }
                                className={`block w-full px-2 py-1 rounded text-sm !no-underline focus-visible:outline-offset-[-2px] ${
                                    active
                                        ? 'bg-dark/15 dark:bg-light/15 !text-primary font-semibold'
                                        : '!text-primary hover:bg-dark/10 dark:hover:bg-light/10'
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
              /**
               * Docs URL slug, when the docs don't live at `/docs/<product slug>`
               * under an entry named after the product. Set it and the Docs tab
               * is looked up by `/docs/<docsSlug>` instead of by product name.
               */
              docsSlug?: string
              /** Volume id from `src/constants/pocketGuides.ts`; setting it is the whole opt-in. */
              pocketGuideVolume?: string
              /** Shows a learning hub with Product-style anchor navigation. */
              learnHub?: boolean
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
    /**
     * Optional override for the docs tab rendering style. When omitted, the
     * style is read from the product's `navStyle` in `docsMenu` so the index
     * and every interior docs page render the same nav.
     */
    navStyle?: 'grouped' | 'listed'
}

export const surfaceBasePath = (productSlug: string, surface: ProductSurface): string => {
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
    navStyle,
}: BuildProductMenuTabsArgs): MenuTab[] {
    if (!productData) return []

    const {
        slug: productSlug,
        name: productName,
        productMenu = [],
        pricingMenu = [],
        pocketGuideVolume,
        learnHub,
        docsSlug,
    } = productData
    const hasLearnLanding = Boolean(learnHub)

    const navProductMenu = productMenu.filter((item) => !item.hideFromNav)
    const navPricingMenu = pricingMenu.filter((item) => !item.hideFromNav)

    const docsBasePath = `/docs/${docsSlug ?? productSlug}`
    const docsEntry = docsSlug
        ? docsMenu.children.find(({ url }: { url?: string }) => url === docsBasePath)
        : docsMenu.children.find(({ name }: { name: string }) => name.toLowerCase() === productName.toLowerCase())
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
            href: docsBasePath,
            menu: (
                <DocsTreeMenu
                    items={docsChildren}
                    productName={productName}
                    variant={resolvedNavStyle}
                    rootHeading={productName}
                    activeUrl={currentPath}
                />
            ),
        })
    }

    if (pocketGuideVolume) {
        tabs.push({
            label: 'Learn',
            value: 'learn',
            icon: TAB_ICON.learn,
            default: activeSurface === 'learn',
            href: surfaceBasePath(productSlug, 'learn'),
            navigateOnActiveClick: hasLearnLanding,
            menu: (
                <LearnNav
                    volumeId={pocketGuideVolume}
                    basePath={surfaceBasePath(productSlug, 'learn')}
                    currentPath={activeSurface === 'learn' ? currentPath : undefined}
                    hasLanding={hasLearnLanding}
                    hub={learnHub}
                    contentRef={activeSurface === 'learn' ? contentRef : undefined}
                />
            ),
        })
    }

    return tabs
}

export default buildProductMenuTabs

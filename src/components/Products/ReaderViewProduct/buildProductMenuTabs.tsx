import React, { useMemo } from 'react'
import {
    IconBook,
    IconCursorClick,
    IconEye,
    IconGraduationCap,
    IconPiggyBank,
    IconPresent,
    IconTerminal,
} from '@posthog/icons'
import { TreeMenu } from 'components/TreeMenu'
import { learnChapterPath, learnChapterSlug, useBookPages } from 'components/PocketGuides/bookModel'
import { pocketGuideUrl, volumeById } from '../../../constants/pocketGuides'
import type { LearnHubPage } from '../../../constants/pocketGuides'
import usePlatformList from 'hooks/docs/usePlatformList'
import usePostHog from 'hooks/usePostHog'
import type { MenuTab } from 'components/ReaderView'
import { docsMenu } from '../../../navs'
import ProductNav from './ProductNav'
import type { ProductNavItem } from './types'

const HUB_PAGES: Record<LearnHubPage, { name: string; icon: React.ReactNode }> = {
    'agent-prompts-and-mcp': { name: 'Agent prompts and MCP', icon: <IconTerminal className="size-4" /> },
    'live-playground': { name: 'Live playground', icon: <IconCursorClick className="size-4" /> },
}

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

/** The same Learn tree is shown on the hub, agent page, and every chapter. */
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
    const posthog = usePostHog()
    const volume = volumeById(volumeId)
    const guideBasePath = volume ? pocketGuideUrl(volume) : basePath
    // Chapters are numbered as in the guide ("1. Events and properties"); the introduction is not.
    const chapters = pages.map((page) => ({
        name: page.page ? `${page.page}. ${page.shortTitle || page.title}` : page.shortTitle || page.title,
        url: learnChapterPath(guideBasePath, page),
    }))
    const hub = volume?.learnHub
    const items = hub
        ? [
              { name: 'Overview', url: basePath, icon: <IconEye className="size-4" /> },
              {
                  name: 'Pocket guide',
                  url: guideBasePath,
                  icon: <IconBook className="size-4" />,
                  children: chapters.filter((_, index) => !pages[index].isFrontMatter),
              },
              // Only the hub pages this volume has, so a smaller hub has no dead links.
              ...(hub.pages ?? []).map((page) => ({ ...HUB_PAGES[page], url: `${basePath}/${page}` })),
          ]
        : chapters

    // Chapter links report their chapter; the Overview link reports its section.
    const chapterByUrl = new Map(
        pages.map((page) => [
            learnChapterPath(guideBasePath, page),
            page.isFrontMatter ? 'introduction' : learnChapterSlug(page),
        ])
    )
    const trackClick = ({ url }: { url?: string }) => {
        const chapter = url && chapterByUrl.get(url)
        if (chapter) {
            posthog?.capture('learn_chapter_selected', { volume: volumeId, chapter, placement: 'sidebar' })
        } else if (url === basePath) {
            posthog?.capture('learn_section_selected', { volume: volumeId, section: 'overview', placement: 'sidebar' })
        }
    }

    return (
        // Master's Learn nav used taller rows (31px) than the docs sidebar; keep that spacing for Learn only.
        <div className="[&_a]:py-[5.5px]">
            <TreeMenu items={items} appearance="sidebar" activeUrl={currentPath} onItemClick={trackClick} />
        </div>
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
    // Learn has its own URL namespace and keeps the shared product sidebar.
    if (surface === 'learn') return `/learn/${productSlug}`
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
        docsSlug,
    } = productData

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

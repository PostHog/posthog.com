import React, { useEffect, useState, useMemo } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { IconPlus, IconMinus } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'
import { docsMenu } from '../../navs'
import * as NewIcons from '@posthog/icons'
import * as NotProductIcons from '../NotProductIcons'
import * as OSIcons from '../OSIcons/Icons'
import { PAGE_DEFINITIONS, PageKey } from './index'

interface NavItem {
    name: string
    url?: string
    icon?: React.ReactNode
    children?: NavItem[]
    type?: 'scroll' | 'link' | 'page'
    isActive?: boolean
}

interface ProductSidebarProps {
    product: {
        name: string
        url: string
        docsUrl?: string
        icon?: React.ReactNode
        children: NavItem[]
    }
    availablePages?: PageKey[]
    activePage?: PageKey
}

// Icon resolver for string icon names
const resolveIcon = (icon?: string | React.ReactNode, color?: string): React.ReactNode => {
    if (!icon) return null
    if (React.isValidElement(icon)) return icon
    if (typeof icon === 'string') {
        const IconComponent = (NewIcons as any)[icon] || (NotProductIcons as any)[icon] || (OSIcons as any)[icon]
        return IconComponent ? <IconComponent className={`size-4 ${color ? `text-${color}` : ''}`} /> : null
    }
    return null
}

// Get depth-based padding class (explicit classes for Tailwind JIT)
const getDepthPadding = (depth: number): string => {
    const paddingClasses = [
        '', // depth 0 - no padding
        'pl-4', // depth 1
        'pl-8', // depth 2
        'pl-12', // depth 3
        'pl-16', // depth 4
    ]
    return paddingClasses[Math.min(depth, paddingClasses.length - 1)]
}

// Page link component - handles hash-based page navigation
const PageLink = ({ item, depth, isActive }: { item: NavItem; depth: number; isActive?: boolean }) => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        if (item.url) {
            // Navigate to the hash URL
            if (typeof window !== 'undefined') {
                window.history.pushState(null, '', item.url)
                // Trigger a location change event
                window.dispatchEvent(new PopStateEvent('popstate'))
            }
        }
    }

    return (
        <OSButton
            active={isActive || item.isActive}
            align="left"
            width="full"
            size="md"
            hover="background"
            onClick={handleClick}
            className={getDepthPadding(depth)}
        >
            {item.name}
        </OSButton>
    )
}

// External link component - opens in new window
const ExternalLink = ({ item, depth, showIcon = false }: { item: NavItem; depth: number; showIcon?: boolean }) => {
    const { pathname } = useLocation()
    const itemPath = item.url?.split('#')[0]?.split('?')[0] || ''
    const isActive = pathname === itemPath || pathname === itemPath + '/'

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        if (item.url) {
            navigate(item.url, { state: { newWindow: true } })
        }
    }

    return (
        <OSButton
            active={isActive}
            align="left"
            width="full"
            size="md"
            hover="background"
            onClick={handleClick}
            className={getDepthPadding(depth)}
            icon={showIcon ? item.icon : undefined}
        >
            {item.name}
        </OSButton>
    )
}

// Section header (no URL) - used for grouping items
const SectionHeader = ({ item, depth }: { item: NavItem; depth: number }) => {
    return (
        <div className={`text-muted text-xs py-0.5 !mt-3 uppercase font-semibold ${getDepthPadding(depth)}`}>
            {item.name}
        </div>
    )
}

// Nav item renderer
const NavItemRenderer = ({
    item,
    depth = 0,
    showIcon = false,
    activePage,
}: {
    item: NavItem
    depth?: number
    showIcon?: boolean
    activePage?: string
}) => {
    if (!item.url) {
        return <SectionHeader item={item} depth={depth} />
    }

    // Page links use hash navigation
    if (item.type === 'page') {
        const pageKey = item.url?.split('#')[1]
        const isActive = pageKey === activePage
        return <PageLink item={item} depth={depth} isActive={isActive} />
    }

    return <ExternalLink item={item} depth={depth} showIcon={showIcon} />
}

// Collapsible menu item for nested navigation
const CollapsibleNavItem = ({
    item,
    depth = 0,
    showIcon = false,
    defaultOpen = false,
    activePage,
}: {
    item: NavItem
    depth?: number
    showIcon?: boolean
    defaultOpen?: boolean
    activePage?: string
}) => {
    const [open, setOpen] = useState(defaultOpen)
    const hasChildren = item.children && item.children.length > 0
    const { pathname, hash } = useLocation()

    // Check if this item or any descendant is active
    const isActiveOrHasActiveChild = useMemo(() => {
        const checkActive = (navItem: NavItem): boolean => {
            if (navItem.type === 'page') {
                const pageKey = navItem.url?.split('#')[1]
                if (pageKey === activePage) return true
            } else if (navItem.url) {
                const itemPath = navItem.url.split('#')[0]?.split('?')[0] || ''
                if (pathname === itemPath || pathname === itemPath + '/' || pathname.startsWith(itemPath + '/')) {
                    return true
                }
            }
            if (navItem.children) {
                return navItem.children.some(checkActive)
            }
            return false
        }
        return checkActive(item)
    }, [item, pathname, hash, activePage])

    // Auto-expand if a child is active
    useEffect(() => {
        if (isActiveOrHasActiveChild && !open) {
            setOpen(true)
        }
    }, [isActiveOrHasActiveChild])

    if (!hasChildren) {
        return <NavItemRenderer item={item} depth={depth} showIcon={showIcon} activePage={activePage} />
    }

    return (
        <Collapsible.Root open={open} onOpenChange={setOpen}>
            <Collapsible.Trigger asChild>
                <OSButton
                    align="left"
                    width="full"
                    className={`${getDepthPadding(depth)} justify-between`}
                    size="md"
                    hover="background"
                >
                    <span className="flex items-center gap-1">
                        {showIcon && item.icon}
                        <span className={open ? 'font-semibold' : ''}>{item.name}</span>
                    </span>
                    <span className="text-muted">
                        {open ? <IconMinus className="size-4" /> : <IconPlus className="size-4" />}
                    </span>
                </OSButton>
            </Collapsible.Trigger>

            <Collapsible.Content>
                <div className="space-y-px">
                    {item.children?.map((child, index) => {
                        const key = `${child.name}-${index}-${child.url}`
                        const hasNestedChildren = child.children && child.children.length > 0

                        return hasNestedChildren ? (
                            <CollapsibleNavItem
                                key={key}
                                item={child}
                                depth={depth + 1}
                                showIcon={true}
                                activePage={activePage}
                            />
                        ) : (
                            <NavItemRenderer
                                key={key}
                                item={child}
                                depth={depth + 1}
                                showIcon={true}
                                activePage={activePage}
                            />
                        )
                    })}
                </div>
            </Collapsible.Content>
        </Collapsible.Root>
    )
}

// Get all products from docsMenu
const getProducts = (): Array<{
    name: string
    url: string
    icon: string
    color?: string
    children?: any[]
}> => {
    const children = (docsMenu as any)?.children || []
    return children.map((product: any) => ({
        name: product.name,
        url: product.url,
        icon: product.icon,
        color: product.color,
        children: product.children || [],
    }))
}

export default function ProductSidebar({ product, availablePages = [], activePage }: ProductSidebarProps) {
    const allProducts = useMemo(() => getProducts(), [])

    // Current product's docs URL for matching
    const currentProductDocsUrl = product.docsUrl

    // Build page navigation items for the current product
    const pageNavItems: NavItem[] = useMemo(() => {
        return (Object.entries(PAGE_DEFINITIONS) as [PageKey, (typeof PAGE_DEFINITIONS)[PageKey]][])
            .filter(([key]) => availablePages.includes(key))
            .map(([key, def]) => ({
                name: def.name,
                url: `${product.url}#${key}`,
                type: 'page' as const,
            }))
    }, [availablePages, product.url])

    // Build the navigation structure with all products at top level
    const navigation = useMemo(() => {
        return allProducts.map((docProduct) => {
            const isCurrentProduct = docProduct.url === currentProductDocsUrl

            // For the current product, build a combined navigation:
            // 1. Page links (Overview, Features, Demos, etc.)
            // 2. External links (Docs, Roadmap, Forums, etc.) from product.children
            let productChildren: NavItem[] = []

            if (isCurrentProduct) {
                // Add page navigation items first
                productChildren = [...pageNavItems]

                // Then add external links (filter out scroll and page types since we handle those above)
                // Strip icons from these items - they should only show text
                const externalLinks = product.children
                    .filter((child) => child.type !== 'scroll' && child.type !== 'page')
                    .map((child) => ({
                        ...child,
                        icon: undefined, // Remove icons from external links
                    }))
                if (externalLinks.length > 0) {
                    productChildren = [...productChildren, ...externalLinks]
                }
            } else {
                // For other products, use their docs children
                productChildren =
                    docProduct.children?.map((child: any) => ({
                        name: child.name,
                        url: child.url,
                        children: child.children,
                    })) || []
            }

            return {
                name: docProduct.name,
                url: docProduct.url,
                icon: resolveIcon(docProduct.icon, docProduct.color),
                children: productChildren,
                isCurrentProduct,
            }
        })
    }, [allProducts, currentProductDocsUrl, product.children, pageNavItems])

    return (
        <div className="not-prose space-y-px">
            {navigation.map((productNav, index) => {
                const key = `product-${index}-${productNav.url}`
                const hasChildren = productNav.children && productNav.children.length > 0

                // Current product should be expanded by default and show icon
                if (hasChildren) {
                    return (
                        <CollapsibleNavItem
                            key={key}
                            item={productNav}
                            depth={0}
                            showIcon={true}
                            defaultOpen={productNav.isCurrentProduct}
                            activePage={activePage}
                        />
                    )
                }

                // Products without children - just a link
                return (
                    <OSButton
                        key={key}
                        align="left"
                        width="full"
                        size="md"
                        hover="background"
                        icon={productNav.icon}
                        onClick={() => navigate(productNav.url, { state: { newWindow: true } })}
                    >
                        {productNav.name}
                    </OSButton>
                )
            })}
        </div>
    )
}

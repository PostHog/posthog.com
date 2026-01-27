import React, { useEffect, useState, useMemo } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { IconChevronRight } from '@posthog/icons'
import { motion } from 'framer-motion'
import OSButton from 'components/OSButton'
import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'
import { docsMenu } from '../../navs'
import * as NewIcons from '@posthog/icons'
import * as NotProductIcons from '../NotProductIcons'
import * as OSIcons from '../OSIcons/Icons'

interface NavItem {
    name: string
    url?: string
    icon?: React.ReactNode
    children?: NavItem[]
    type?: 'scroll' | 'link'
}

interface ProductSidebarProps {
    product: {
        name: string
        url: string
        docsUrl?: string
        icon?: React.ReactNode
        children: NavItem[]
    }
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
}: {
    item: NavItem
    depth?: number
    showIcon?: boolean
}) => {
    if (!item.url) {
        return <SectionHeader item={item} depth={depth} />
    }
    return <ExternalLink item={item} depth={depth} showIcon={showIcon} />
}

// Collapsible menu item for nested navigation
const CollapsibleNavItem = ({
    item,
    depth = 0,
    showIcon = false,
    defaultOpen = false,
}: {
    item: NavItem
    depth?: number
    showIcon?: boolean
    defaultOpen?: boolean
}) => {
    const [open, setOpen] = useState(defaultOpen)
    const hasChildren = item.children && item.children.length > 0
    const { pathname, hash } = useLocation()

    // Check if this item or any descendant is active
    const isActiveOrHasActiveChild = useMemo(() => {
        const checkActive = (navItem: NavItem): boolean => {
            if (navItem.url) {
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
    }, [item, pathname, hash])

    // Auto-expand if a child is active
    useEffect(() => {
        if (isActiveOrHasActiveChild && !open) {
            setOpen(true)
        }
    }, [isActiveOrHasActiveChild])

    if (!hasChildren) {
        return <NavItemRenderer item={item} depth={depth} showIcon={showIcon} />
    }

    return (
        <Collapsible.Root open={open} onOpenChange={setOpen}>
            <Collapsible.Trigger asChild>
                <OSButton
                    align="left"
                    width="full"
                    className={getDepthPadding(depth)}
                    size="md"
                    hover="background"
                    icon={showIcon ? item.icon : undefined}
                >
                    <motion.div animate={{ rotate: open ? 90 : 0 }} className="mr-1">
                        <IconChevronRight className="size-4" />
                    </motion.div>
                    <span className={open ? 'font-semibold' : ''}>{item.name}</span>
                </OSButton>
            </Collapsible.Trigger>

            <Collapsible.Content>
                <div className="space-y-px">
                    {item.children?.map((child, index) => {
                        const key = `${child.name}-${index}-${child.url}`
                        const hasNestedChildren = child.children && child.children.length > 0

                        return hasNestedChildren ? (
                            <CollapsibleNavItem key={key} item={child} depth={depth + 1} showIcon={true} />
                        ) : (
                            <NavItemRenderer key={key} item={child} depth={depth + 1} showIcon={true} />
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

export default function ProductSidebar({ product }: ProductSidebarProps) {
    const allProducts = useMemo(() => getProducts(), [])

    // Current product's docs URL for matching
    const currentProductDocsUrl = product.docsUrl

    // Build the navigation structure with all products at top level
    const navigation = useMemo(() => {
        return allProducts.map((docProduct) => {
            const isCurrentProduct = docProduct.url === currentProductDocsUrl

            // For the current product, merge in the additional navigation children
            // (like Roadmap, Forums, etc.) from product.children that aren't in-page scroll links
            const productChildren: NavItem[] = isCurrentProduct
                ? product.children.filter((child) => child.type !== 'scroll')
                : docProduct.children?.map((child: any) => ({
                      name: child.name,
                      url: child.url,
                      children: child.children,
                  })) || []

            return {
                name: docProduct.name,
                url: docProduct.url,
                icon: resolveIcon(docProduct.icon, docProduct.color),
                children: productChildren,
                isCurrentProduct,
            }
        })
    }, [allProducts, currentProductDocsUrl, product.children])

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

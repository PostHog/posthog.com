import React, { useEffect, useState, useMemo } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { IconChevronRight } from '@posthog/icons'
import { motion } from 'framer-motion'
import OSButton from 'components/OSButton'
import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'
import { Select } from 'components/RadixUI/Select'
import { docsMenu } from '../../navs'

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
        docsUrl?: string // The docs URL for this product (for dropdown matching)
        icon?: React.ReactNode
        children: NavItem[]
    }
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

// Scroll link component - handles in-page navigation with smooth scroll
const ScrollLink = ({ item, depth, showIcon = false }: { item: NavItem; depth: number; showIcon?: boolean }) => {
    const { hash } = useLocation()

    const sectionId = item.url?.split('#')[1] || ''
    const currentHash = hash?.replace('#', '') || ''
    const isActive = currentHash === sectionId

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        if (!sectionId) return

        const scrollViewport = document.querySelector('[data-radix-scroll-area-viewport]')
        const targetElement = document.getElementById(sectionId)

        if (targetElement && scrollViewport) {
            const parentRect = scrollViewport.getBoundingClientRect()
            const targetRect = targetElement.getBoundingClientRect()
            const relativeTop = targetRect.top - parentRect.top + scrollViewport.scrollTop

            scrollViewport.scrollTo({
                top: relativeTop,
                behavior: 'smooth',
            })

            if (typeof window !== 'undefined') {
                window.history.pushState(null, '', item.url)
            }
        }
    }

    return (
        <OSButton
            active={isActive}
            align="left"
            width="full"
            size="md"
            hover="background"
            className={getDepthPadding(depth)}
            onClick={handleClick}
            icon={showIcon ? item.icon : undefined}
        >
            {item.name}
        </OSButton>
    )
}

// Regular external link component - opens in new window
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

    const isScrollLink = item.type === 'scroll' || (item.url?.includes('#') && !item.url?.startsWith('http'))

    if (isScrollLink) {
        return <ScrollLink item={item} depth={depth} showIcon={showIcon} />
    }

    return <ExternalLink item={item} depth={depth} showIcon={showIcon} />
}

// Collapsible menu item for nested navigation
const CollapsibleNavItem = ({
    item,
    depth = 0,
    showIcon = false,
}: {
    item: NavItem
    depth?: number
    showIcon?: boolean
}) => {
    const [open, setOpen] = useState(false)
    const hasChildren = item.children && item.children.length > 0
    const { pathname, hash } = useLocation()

    // Check if this item or any descendant is active
    const isActiveOrHasActiveChild = useMemo(() => {
        const checkActive = (navItem: NavItem): boolean => {
            if (navItem.type === 'scroll' || navItem.url?.includes('#')) {
                const sectionId = navItem.url?.split('#')[1] || ''
                const currentHash = hash?.replace('#', '') || ''
                if (currentHash === sectionId) return true
            } else if (navItem.url) {
                const itemPath = navItem.url.split('#')[0]?.split('?')[0] || ''
                if (pathname === itemPath || pathname === itemPath + '/') return true
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

// Get all products from docsMenu for the dropdown
const getProducts = () => {
    const children = (docsMenu as any)?.children || []
    return children.map((product: any) => ({
        value: product.url,
        label: product.name,
        icon: product.icon,
        color: product.color,
    }))
}

export default function ProductSidebar({ product }: ProductSidebarProps) {
    const products = useMemo(() => getProducts(), [])

    // Use docsUrl for dropdown matching (docsMenu has /docs/... URLs)
    const currentProductDocsUrl = product.docsUrl || product.url

    const handleProductChange = (value: string) => {
        navigate(value, { state: { newWindow: true } })
    }

    return (
        <div className="not-prose space-y-2">
            {/* Product dropdown selector */}
            <Select
                groups={[
                    {
                        label: '',
                        items: products,
                    },
                ]}
                placeholder="Select product..."
                ariaLabel="Products"
                className="w-full mb-2"
                value={currentProductDocsUrl}
                onValueChange={handleProductChange}
                dataScheme="primary"
            />

            {/* Top-level navigation items (no icons, flat) */}
            <div className="space-y-px">
                {product.children.map((item, index) => {
                    const key = `${item.name}-${index}-${item.url}`
                    const hasChildren = item.children && item.children.length > 0

                    return hasChildren ? (
                        <CollapsibleNavItem key={key} item={item} depth={0} showIcon={false} />
                    ) : (
                        <NavItemRenderer key={key} item={item} depth={0} showIcon={false} />
                    )
                })}
            </div>
        </div>
    )
}

import { MenuType } from 'components/RadixUI/MenuBar'
import React from 'react'
import { docsMenu, handbookSidebar } from '../../navs'
import * as Icons from '@posthog/icons'
import { useSmallTeamsMenuItems } from './SmallTeamsMenuItems'
import Logo from 'components/Logo'
import { APP_COUNT } from '../../constants'
import {
    categoryOrder,
    categoryDisplayNames,
    buildCategoryMenuItems,
    buildProductMenuItems,
    popularProducts,
    newestProducts
} from '../../constants/productNavigation'
import useProduct from '../../hooks/useProduct'

interface DocsMenuItem {
    name: string
    url?: string
    icon?: string
    color?: string
    children?: DocsMenuItem[]
}

interface DocsMenu {
    children: DocsMenuItem[]
}

// Recursively group items under section dividers at any level
const groupBySectionDividers = (items: DocsMenuItem[]): any[] => {
    const processedItems: any[] = []
    let currentSection: DocsMenuItem | null = null
    let currentSectionItems: any[] = []

    for (const item of items) {
        // Handle divider type: add separator for menu, skip otherwise
        if ((item as any).type === 'divider') {
            if (currentSection) {
                currentSectionItems.push({ type: 'separator' as const })
            } else {
                processedItems.push({ type: 'separator' as const })
            }
            continue
        }
        if (!item.name) continue

        // If this is a section header (only has name)
        if (!item.url && !item.children && !item.icon && !item.color) {
            // If we have a previous section, add it to processed items
            if (currentSection) {
                processedItems.push({
                    type: 'submenu' as const,
                    label: currentSection.name,
                    items: currentSectionItems,
                })
            }
            // Start a new section
            currentSection = item
            currentSectionItems = []
        } else {
            // Process the item recursively
            const processedItem = processMenuItemWithGrouping(item)
            if (processedItem) {
                if (currentSection) {
                    currentSectionItems.push(processedItem)
                } else {
                    processedItems.push(processedItem)
                }
            }
        }
    }

    // Add the last section if it exists
    if (currentSection && currentSectionItems.length > 0) {
        processedItems.push({
            type: 'submenu' as const,
            label: currentSection.name,
            items: currentSectionItems,
        })
    }

    return processedItems
}

const processMenuItemWithGrouping = (item: DocsMenuItem): any => {
    // Handle divider type: add separator for menu, skip otherwise
    if ((item as any).type === 'divider') {
        return { type: 'separator' as const }
    }
    if (!item.name) return null

    // Special case: If this is the Product OS menu, filter out 'Docs' and 'Overview' from its children
    let children = item.children
    if (item.name === 'Product OS' && Array.isArray(children)) {
        children = children.filter((child) => child.name !== 'Docs' && child.name !== 'Overview')
    }

    // If the item has children, process them recursively with grouping
    if (children) {
        const baseItem: any = {
            type: 'submenu' as const,
            label: item.name,
        }
        if (item.url) {
            baseItem.link = item.url
        }
        // Always set icon and color for submenus if present
        if (item.icon) {
            const IconComponent = Icons[item.icon as keyof typeof Icons]
            baseItem.icon = <IconComponent className={`text-${item.color || 'gray'} size-4`} />
        }
        let grouped = groupBySectionDividers(children)
        // FLATTEN: If the first child is a submenu with the same label, bring its children up one level
        if (grouped.length > 0 && grouped[0].type === 'submenu' && grouped[0].label === item.name) {
            grouped = [...grouped[0].items, ...grouped.slice(1)]
        }
        baseItem.items = grouped
        return baseItem
    }

    // If the item has a URL, it's a regular menu item
    if (item.url) {
        const baseItem: any = {
            type: 'item' as const,
            label: item.name,
            link: item.url,
        }
        if (item.icon) {
            const IconComponent = Icons[item.icon as keyof typeof Icons]
            baseItem.icon = <IconComponent className={`text-${item.color || 'gray'} size-4`} />
        }
        return baseItem
    }

    // If the item only has a name, it's a section divider (handled in grouping)
    return null
}

const getDocsMenuItems = () => {
    let items = groupBySectionDividers((docsMenu as DocsMenu).children)

    // Remove any item (submenu or section divider) with label 'Docs'
    items = items.filter((item) => {
        // Remove if submenu with label 'Docs'
        if (item.type === 'submenu' && item.label === 'Docs') return false
        return true
    })

    return items
}

const mergedDocsMenu = () => {
    return [...DocsItemsStart, ...getDocsMenuItems(), ...DocsItemsEnd]
}

// Process handbookSidebar into menu item structure
const processHandbookSidebar = (items: any[], isRoot = true): any[] => {
    return items
        .filter((item, idx) => {
            // Omit the first 'Handbook' item at the root level
            if (isRoot && idx === 0 && item.name === 'Handbook') return false
            return !!item.name
        })
        .map((item) => {
            if (item.children) {
                return {
                    type: 'submenu' as const,
                    label: item.name,
                    ...(item.url ? { link: item.url } : {}),
                    items: processHandbookSidebar(item.children, false),
                }
            }
            // If no url and no children, mark as disabled (label-like)
            if (!item.url && !item.children) {
                return {
                    type: 'item' as const,
                    label: item.name,
                    disabled: true,
                }
            }
            return {
                type: 'item' as const,
                label: item.name,
                ...(item.url ? { link: item.url } : {}),
            }
        })
}

// Build Product OS menu items with categories
const buildProductOSMenuItems = (allProducts: any[]) => {
    const items: any[] = [
        {
            type: 'item',
            label: `App library (${APP_COUNT - 1})`,
            link: '/products',
        },
        {
            type: 'separator',
        },
        {
            type: 'submenu',
            label: 'Popular products',
            items: buildProductMenuItems(popularProducts, allProducts),
        },
        {
            type: 'submenu',
            label: 'Newest products',
            items: buildProductMenuItems(newestProducts, allProducts),
        },
        {
            type: 'separator',
        },
        {
            type: 'item',
            label: 'Categories',
            disabled: true,
        },
    ]

    // Add category submenus
    categoryOrder.forEach((category) => {
        const categoryProducts = allProducts.filter((product: any) => product.category === category)
        if (categoryProducts.length === 0) return

        const categoryItems = buildCategoryMenuItems(category, allProducts)
        if (categoryItems.length > 0) {
            items.push({
                type: 'submenu',
                label: categoryDisplayNames[category] || category,
                items: categoryItems,
            })
        }
    })

    return items
}

export function useMenuData(): MenuType[] {
    const smallTeamsMenuItems = useSmallTeamsMenuItems()
    const allProducts = useProduct() as any[]

    return [
        {
            trigger: (
                <>
                    <Logo noText className="size-6" fill="primary" classic />
                </>
            ),
            items: [
                {
                    type: 'item',
                    label: 'About PostHog',
                    link: '/about',
                },
                {
                    type: 'item',
                    label: 'About this website',
                    link: '/credits',
                },
                {
                    type: 'item',
                    label: 'Disabled option',
                    disabled: true,
                },
                {
                    type: 'item',
                    label: 'Display options',
                    link: '/display-options',
                },
                { type: 'separator' },
                {
                    type: 'item',
                    label: 'Print a coloring book',
                    link: '/coloring-book.pdf',
                    shortcut: '⌘ P',
                },
            ],
        },
        {
            trigger: 'Product OS',
            items: buildProductOSMenuItems(allProducts),
        },

        {
            trigger: 'Pricing',
            items: [
                {
                    type: 'item',
                    label: 'Plans & usage-based pricing',
                    link: '/pricing',
                },
                {
                    type: 'item',
                    label: 'Pricing calculator',
                    link: '/pricing#calculator',
                },
                {
                    type: 'item',
                    label: 'Add-ons',
                    link: '/pricing#addons',
                },
                {
                    type: 'separator',
                },
                {
                    type: 'item',
                    label: 'PostHog for...',
                    disabled: true,
                },
                {
                    type: 'item',
                    label: 'Founder stack',
                    link: '/founders',
                },
                {
                    type: 'item',
                    label: 'Startups',
                    link: '/startups',
                },
                {
                    type: 'item',
                    label: 'Enterprise',
                    link: '/enterprise',
                },
                { type: 'separator' },
                {
                    type: 'item',
                    label: 'Bedtime reading',
                    disabled: true,
                },
                {
                    type: 'item',
                    label: 'Pricing philosophy',
                    link: '/pricing?tab=philosophy',
                },
                {
                    type: 'item',
                    label: 'How we do sales',
                    link: '/pricing#sales',
                },
            ],
        },
        {
            trigger: 'Docs',
            items: mergedDocsMenu(),
        },
        {
            trigger: 'Content',
            items: [
                {
                    type: 'item',
                    label: 'Newsletter',
                    link: '/newsletter',
                },
                {
                    type: 'item',
                    label: 'Product for engineers',
                    link: '/product-engineers',
                },
                {
                    type: 'item',
                    label: 'Founders hub',
                    link: '/founders',
                },
                {
                    type: 'item',
                    label: 'Blog',
                    link: '/blog',
                },
            ],
        },
        {
            trigger: 'Company',
            items: [
                {
                    type: 'item',
                    label: 'About',
                    link: '/about',
                },
                {
                    type: 'item',
                    label: 'People',
                    link: '/people',
                },
                {
                    type: 'submenu',
                    label: 'Small teams',
                    items: smallTeamsMenuItems,
                },
                {
                    type: 'submenu',
                    label: 'Handbook',
                    link: '/handbook',
                    items: processHandbookSidebar(handbookSidebar),
                },
                {
                    type: 'item',
                    label: 'Blog',
                    link: '/blog',
                },
                {
                    type: 'item',
                    label: 'Careers',
                    link: '/careers',
                },
                {
                    type: 'submenu',
                    label: 'Social media',
                    items: [
                        {
                            type: 'item',
                            label: 'X',
                            link: 'https://x.com/posthog',
                            external: true,
                        },
                        {
                            type: 'item',
                            label: 'LinkedIn',
                            link: 'https://www.linkedin.com/company/posthog',
                            external: true,
                        },
                        {
                            type: 'item',
                            label: 'Substack',
                            link: 'https://newsletter.posthog.com',
                            external: true,
                        },
                        {
                            type: 'item',
                            label: 'YouTube',
                            link: 'https://www.youtube.com/@posthog',
                            external: true,
                        },
                        {
                            type: 'item',
                            label: 'GitHub',
                            link: 'https://github.com/posthog',
                            external: true,
                        },
                    ],
                },
            ],
        },
        {
            trigger: (
                <>
                    <span className="ml-1">More</span>
                </>
            ),
            items: [
                {
                    type: 'item',
                    label: 'Merch store',
                    link: '/merch',
                },
                {
                    type: 'item',
                    label: 'Cool tech jobs',
                    link: '/cool-tech-jobs',
                },
                {
                    type: 'submenu',
                    label: 'Sexy legal stuff',
                    items: [
                        {
                            type: 'item',
                            label: 'Terms',
                            link: '/terms',
                        },
                        {
                            type: 'item',
                            label: 'Privacy',
                            link: '/privacy',
                        },
                        {
                            type: 'item',
                            label: 'DPA generator',
                            link: '/dpa',
                        },
                        {
                            type: 'item',
                            label: 'SOC ✌️',
                            link: '/handbook/company/security#soc-2',
                        },
                        {
                            type: 'item',
                            label: 'HIPAA',
                            link: '/docs/privacy/hipaa-compliance',
                        },
                    ],
                },
                {
                    type: 'separator',
                },
                {
                    type: 'item',
                    label: 'System status',
                    link: 'https://status.posthog.com',
                    external: true,
                },
            ],
        },
    ]
}

export const DocsItemsStart = [
    {
        type: 'item' as const,
        label: 'Overview',
        link: '/docs',
    },
    {
        type: 'separator' as const,
    },
]

export const DocsItemsEnd = [
    { type: 'separator' as const },
    {
        type: 'item' as const,
        label: 'Tutorials',
        link: '/tutorials',
    },
    {
        type: 'item' as const,
        label: 'Templates',
        link: '/templates',
    },
]

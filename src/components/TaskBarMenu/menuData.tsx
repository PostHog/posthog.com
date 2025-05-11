import { MenuType } from 'components/RadixUI/MenuBar'
import React from 'react'
import { IconApps, IconLogomark } from '@posthog/icons'
import { productMenu, docsMenu } from '../../navs'
import * as Icons from '@posthog/icons'

interface ProductMenuItem {
    name: string
    url: string
    icon: string
    color: string
}

interface ProductMenu {
    children: ProductMenuItem[]
}

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

const getProductMenuItems = () => {
    const products = (productMenu as ProductMenu).children
        .filter((product) => {
            const key = product.url.replace('/', '')
            // Only filter out the "All products" entry
            return key !== 'products'
        })
        .map((product) => {
            const IconComponent = Icons[product.icon as keyof typeof Icons]
            return {
                type: 'item' as const,
                label: product.name,
                link: product.url,
                icon: <IconComponent className={`text-${product.color} size-4`} />,
            }
        })

    // Add separator and "All Products" at the bottom
    return [
        ...products,
        { type: 'separator' as const },
        {
            type: 'item' as const,
            label: 'All Products',
            link: '/products',
            icon: <IconApps className="text-red size-4" />,
        },
    ]
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
        children = children.filter(
            (child) => child.name !== 'Docs' && child.name !== 'Overview'
        )
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
        if (
            grouped.length > 0 &&
            grouped[0].type === 'submenu' &&
            grouped[0].label === item.name
        ) {
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
        // Remove if section divider with label 'Docs' (no type, just label)
        if (!item.type && item.label === 'Docs') return false
        return true
    })

    return items
}

export const menuData: MenuType[] = [
    {
        trigger: (
            <>
                <IconLogomark className="size-6" />
            </>
        ),
        items: [
            {
                type: 'item',
                label: 'New Tab',
                shortcut: '⌘ T',
            },
            {
                type: 'item',
                label: 'New Window',
                shortcut: '⌘ N',
            },
            {
                type: 'item',
                label: 'New Incognito Window',
                disabled: true,
            },
            {
                type: 'item',
                label: 'Display options',
                link: '/display-options',
            },
        ],
    },
    {
        trigger: 'Products',
        items: getProductMenuItems(),
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
                link: '/calculator',
            },
            {
                type: 'item',
                label: 'Add-ons',
                link: '/addons',
            },
            {
                type: 'item',
                label: 'Pricing philosophy',
                link: '/pricing/philosophy',
            },
            {
                type: 'item',
                label: 'How we do sales',
                link: '/sales',
            },
            {
                type: 'item',
                label: 'Founder stack',
                link: '/founders',
            },
            {
                type: 'item',
                label: 'Enterprise',
                link: '/enterprise',
            },
        ],
    },
    {
        trigger: 'Docs',
        items: getDocsMenuItems(),
    },
    {
        trigger: 'Company',
        items: [
            {
                type: 'item',
                label: 'New Tab',
                shortcut: '⌘ T',
            },
            {
                type: 'item',
                label: 'New Window',
                shortcut: '⌘ N',
            },
            {
                type: 'item',
                label: 'New Incognito Window',
                disabled: true,
            },
            { type: 'separator' },
            {
                type: 'submenu',
                label: 'Share',
                items: [
                    {
                        type: 'item',
                        label: 'Email Link',
                    },
                    {
                        type: 'item',
                        label: 'Messages',
                    },
                    {
                        type: 'item',
                        label: 'Notes',
                    },
                ],
            },
            { type: 'separator' },
            {
                type: 'item',
                label: 'Print…',
                shortcut: '⌘ P',
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
                label: 'New Tab',
                shortcut: '⌘ T',
            },
            {
                type: 'item',
                label: 'New Window',
                shortcut: '⌘ N',
            },
            {
                type: 'item',
                label: 'New Incognito Window',
                disabled: true,
            },
        ],
    },
    {
        trigger: (
            <>
                <span className="ml-1 text-red">Get started - free</span>
            </>
        ),
        items: [
            {
                type: 'item',
                label: 'New Tab',
                shortcut: '⌘ T',
            },
            {
                type: 'item',
                label: 'New Window',
                shortcut: '⌘ N',
            },
            {
                type: 'item',
                label: 'New Incognito Window',
                disabled: true,
            },
        ],
    },
]

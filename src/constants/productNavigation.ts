import React from 'react'
import * as Icons from '@posthog/icons'

// Popular products to highlight in the menu
export const popularProducts = ['web_analytics', 'product_analytics', 'session_replay', 'feature_flags', 'experiments']

// Newest products to highlight in the menu
export const newestProducts = ['llm_analytics', 'error_tracking', 'revenue_analytics', 'web_analytics']

// Category ordering for display
export const categoryOrder = [
    'ai',
    'data',
    'analytics',
    'dataviz',
    'product',
    'engineering',
    'product_engineering',
    'communication',
    'product_os',
] as const

// Display names for categories
export const categoryDisplayNames: Record<string, string> = {
    ai: 'PostHog AI',
    data: 'Customer data infrastructure',
    analytics: 'Analytics dashboards',
    dataviz: 'Data visualization',
    product: 'Product',
    engineering: 'Engineering',
    product_engineering: 'Product engineering',
    communication: 'Communication',
    product_os: 'Utilities & add-ons',
}

// Icons and colors for categories
export const categoryIcons: Record<string, { icon: string; color: string }> = {
    ai: { icon: 'IconSparkles', color: 'purple' },
    data: { icon: 'IconDatabase', color: 'blue' },
    analytics: { icon: 'IconDashboard', color: 'green' },
    dataviz: { icon: 'IconTrends', color: 'yellow' },
    product: { icon: 'IconApps', color: 'red' },
    // engineering: { icon: 'IconWrench', color: 'gray' },
    product_engineering: { icon: 'IconCode2', color: 'seagreen' },
    communication: { icon: 'IconMessage', color: 'sky-blue' },
    product_os: { icon: 'IconGear', color: 'gray' },
}

// Product ordering within categories
// Products not listed here will be sorted alphabetically
export const productOrder: Record<string, string[]> = {
    ai: ['ai', 'max', 'raquel', 'annika', 'marius'],
    data: ['customer-data-infrastructure', 'cdp', 'data_in', 'transformations', 'data_warehouse', 'data_out'],
    analytics: [
        'web_analytics',
        'product_analytics',
        'revenue_analytics',
        'llm_analytics',
        'custom_dashboards',
        'group_analytics',
    ],
    dataviz: ['trends', 'funnels', 'bi'],
    product_engineering: ['session-replay', 'experiments', 'feature-flags', 'error-tracking', 'early_access'],
    communication: ['surveys', 'broadcasts', 'user-interviews'],
    product_os: ['api', 'dashboards', 'notebooks', 'activity', 'toolbar', 'teams', 'profiles'],
}

// Non-product pages that appear in the product navigation
// These need manual icon and link configuration
export const nonProductPages = {
    'customer-data-infrastructure': {
        slug: 'customer-data-infrastructure',
        url: 'customer-data-infrastructure',
        icon: 'IconDocument',
        color: 'blue',
        description: 'CDP manifesto',
    },
    'customer-data-infrastructure/sources': {
        slug: 'customer-data-infrastructure/sources',
        url: 'customer-data-infrastructure/sources',
        icon: 'IconArrowRight',
        color: 'orange',
    },
    'customer-data-infrastructure/transformations': {
        slug: 'customer-data-infrastructure/transformations',
        url: 'customer-data-infrastructure/transformations',
        icon: 'IconRefresh',
        color: 'green',
    },
    'customer-data-infrastructure/destinations': {
        slug: 'customer-data-infrastructure/destinations',
        url: 'customer-data-infrastructure/destinations',
        icon: 'IconDecisionTree',
        color: 'purple',
    },
    ai: {
        slug: 'ai',
        url: '/ai',
        category: 'ai',
        parentIcon: 'doc',
        icon: 'IconBrain',
        color: 'purple',
        description: 'AI suite',
    },
}

// Helper function to get products for a category in the correct order
export function getProductsForCategory(category: string, allProducts: any[]): any[] {
    const products = allProducts.filter((product: any) => product.category === category)
    const customOrder = productOrder[category]

    if (customOrder && customOrder.length > 0) {
        return products.sort((a: any, b: any) => {
            const aIndex = customOrder.indexOf(a.handle)
            const bIndex = customOrder.indexOf(b.handle)

            // If both products are in custom order, sort by that order
            if (aIndex !== -1 && bIndex !== -1) {
                return aIndex - bIndex
            }
            // If only one is in custom order, prioritize it
            if (aIndex !== -1) return -1
            if (bIndex !== -1) return 1
            // If neither is in custom order, sort alphabetically
            return a.name.localeCompare(b.name)
        })
    }

    // Fall back to alphabetical sorting
    return products.sort((a: any, b: any) => a.name.localeCompare(b.name))
}

// Helper function to build menu items for specific product handles
export function buildProductMenuItems(handles: string[], allProducts: any[]): any[] {
    return handles
        .map((handle) => {
            const product = allProducts.find((p: any) => p.handle === handle)
            if (!product) return null

            // Check if it's a non-product page
            const nonProductPage = Object.values(nonProductPages).find((p) => p.slug === product.slug)

            if (nonProductPage) {
                // Handle icon for non-product pages
                let iconElement = null
                if (nonProductPage.icon) {
                    const IconComponent = Icons[nonProductPage.icon as keyof typeof Icons]
                    if (IconComponent) {
                        iconElement = React.createElement(IconComponent, {
                            className: `text-${nonProductPage.color || product.color || 'gray'} size-4`,
                        })
                    }
                }

                return {
                    type: 'item' as const,
                    label: product.name,
                    link: nonProductPage.url,
                    icon: iconElement,
                }
            }

            // Regular product with icon
            const isDisabled = product.status === 'WIP'
            const iconElement = product.Icon
                ? React.createElement(product.Icon, {
                      className: isDisabled ? 'text-muted size-4' : `text-${product.color || 'gray'} size-4`,
                  })
                : null

            return {
                type: 'item' as const,
                label: product.name,
                ...(!isDisabled && { link: `/${product.slug}` }),
                icon: iconElement,
                ...(isDisabled && { disabled: true }),
            }
        })
        .filter(Boolean) // Remove any null items
}

// Helper function to build menu items for a category
export function buildCategoryMenuItems(category: string, allProducts: any[]): any[] {
    const products = getProductsForCategory(category, allProducts)

    return products.map((product) => {
        // Check if it's a non-product page
        const nonProductPage = Object.values(nonProductPages).find((p) => p.slug === product.slug)

        if (nonProductPage) {
            // Handle icon for non-product pages
            let iconElement = null
            if (nonProductPage.icon) {
                const IconComponent = Icons[nonProductPage.icon as keyof typeof Icons]
                if (IconComponent) {
                    iconElement = React.createElement(IconComponent, {
                        className: `text-${nonProductPage.color || product.color || 'gray'} size-4`,
                    })
                }
            }

            return {
                type: 'item' as const,
                label: product.name,
                link: nonProductPage.url,
                icon: iconElement,
            }
        }

        // Regular product with icon
        const isDisabled = product.status === 'WIP'
        const iconElement = product.Icon
            ? React.createElement(product.Icon, {
                  className: isDisabled ? 'text-muted size-4' : `text-${product.color || 'gray'} size-4`,
              })
            : null

        return {
            type: 'item' as const,
            label: product.name,
            ...(!isDisabled && { link: `/${product.slug}` }),
            icon: iconElement,
            ...(isDisabled && { disabled: true }),
        }
    })
}

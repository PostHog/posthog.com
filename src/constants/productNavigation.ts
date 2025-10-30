import React from 'react'
import * as Icons from '@posthog/icons'

// Popular products to highlight in the menu
export const popularProducts = ['web_analytics', 'product_analytics', 'session_replay', 'feature_flags', 'experiments']

// Newest products to highlight in the menu
export const newestProducts = ['posthog_ai', 'llm_analytics', 'error_tracking', 'revenue_analytics', 'web_analytics']

// Category ordering for display
export const categoryOrder = [
    'data',
    'analytics',
    'product_engineering',
    'dataviz',
    'product',
    // 'engineering',
    'automation',
    'communication',
    'product_os',
] as const

// Display names for categories
export const categoryDisplayNames: Record<string, string> = {
    data: 'Customer data infrastructure',
    product_engineering: 'Product engineering',
    analytics: 'Analytics dashboards',
    dataviz: 'Data visualization',
    product: 'Product',
    // engineering: 'Engineering',
    automation: 'Automation',
    communication: 'Communication',
    product_os: 'Utilities, add-ons, & packages',
}

// Icons and colors for categories
export const categoryIcons: Record<string, { icon: string; color: string }> = {
    data: { icon: 'IconDatabase', color: 'blue' },
    product_engineering: { icon: 'IconCode2', color: 'seagreen' },
    analytics: { icon: 'IconDashboard', color: 'green' },
    dataviz: { icon: 'IconTrends', color: 'yellow' },
    product: { icon: 'IconApps', color: 'red' },
    // engineering: { icon: 'IconWrench', color: 'gray' },
    automation: { icon: 'IconBolt', color: 'blue' },
    communication: { icon: 'IconMessage', color: 'sky-blue' },
    product_os: { icon: 'IconGear', color: 'gray' },
}

// Product ordering within categories
// Products not listed here will be sorted alphabetically
export const productOrder: Record<string, string[]> = {
    data: ['customer-data-infrastructure', 'integrations', 'data_in', 'transformations', 'visualize', 'data_out'],
    product_engineering: ['session_replay', 'experiments', 'feature_flags', 'error_tracking', 'early_access'],
    analytics: [
        'web_analytics',
        'product_analytics',
        'revenue_analytics',
        'llm_analytics',
        'custom_dashboards',
        'group_analytics',
        'custom_dashboards',
    ],
    dataviz: [
        'trends',
        'funnels',
        'user_paths',
        'correlation_analysis',
        'retention',
        'stickiness',
        'lifecycle',
        'sql',
        'bi',
    ],
    automation: ['posthog_ai', 'webhooks', 'workflows'],
    communication: ['surveys', 'messaging', 'user-interviews'],
    product_os: ['api', 'webhooks', 'notebooks', 'activity', 'toolbar', 'profiles', 'platform_packages'],
}

// Non-product pages that appear in the product navigation
// These need manual icon and link configuration
export const nonProductPages = {
    cdp: {
        slug: 'cdp',
        url: '/cdp',
        icon: 'IconPlug',
        color: 'sky-blue',
    },
    'data-warehouse': {
        slug: 'data-warehouse',
        url: '/data-warehouse',
        icon: 'IconAsterisk',
        color: 'purple',
    },
    'customer-data-infrastructure': {
        slug: 'customer-data-infrastructure',
        url: '/customer-data-infrastructure',
        icon: 'IconDocument',
        color: 'blue',
        description: 'CDP manifesto',
    },
    'customer-data-infrastructure/sources': {
        slug: 'customer-data-infrastructure/sources',
        url: '/customer-data-infrastructure/sources',
        icon: 'IconArrowRight',
        color: 'orange',
    },
    'customer-data-infrastructure/transformations': {
        slug: 'customer-data-infrastructure/transformations',
        url: '/customer-data-infrastructure/transformations',
        icon: 'IconRefresh',
        color: 'green',
    },
    'customer-data-infrastructure/destinations': {
        slug: 'customer-data-infrastructure/destinations',
        url: '/customer-data-infrastructure/destinations',
        icon: 'IconDecisionTree',
        color: 'purple',
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

// Helper function to build menu items for all products sorted alphabetically
export function buildAllProductsMenuItems(allProducts: any[]): any[] {
    // Handles to filter out
    const filteredHandles = ['ai', 'annika', 'marius', 'customer-data-infrastructure', 'data_in', 'data_out']

    // Label overrides by slug
    const labelOverrides: Record<string, string> = {
        cdp: 'Data pipelines',
        'data-warehouse': 'Data warehouse',
    }

    // Filter out products with status 'WIP' and specific handles
    const filteredProducts = allProducts.filter((product) => {
        // Filter out WIP status
        if (product.status === 'WIP') {
            return false
        }
        // Filter out specific handles
        if (filteredHandles.includes(product.handle)) {
            return false
        }
        return true
    })

    // Sort filtered products alphabetically by name
    const sortedProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name))

    return sortedProducts.map((product) => {
        // Check if it's a non-product page
        const nonProductPage = Object.values(nonProductPages).find((p) => p.slug === product.slug)

        // Apply label override if it exists
        const displayLabel = labelOverrides[product.slug] || product.name

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
                label: displayLabel,
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
            label: displayLabel,
            ...(!isDisabled && { link: `/${product.slug}` }),
            icon: iconElement,
            ...(isDisabled && { disabled: true }),
        }
    })
}

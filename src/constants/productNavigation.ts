import React from 'react'
import * as Icons from '@posthog/icons'

/**
 * Curated product/tool handles shown in the taskbar "Browse tools" menu and
 * the product-page sidebar switcher, in display order.
 *
 * Labels and icons come from product data via `useProduct()` — this list only
 * controls membership and order.
 */
export const BROWSE_TOOLS_HANDLES = [
    'product_analytics',
    'web_analytics',
    'ai_observability',
    'session_replay',
    'replay_vision',
    'feature_flags',
    'experiments',
    'error_tracking',
    'logs',
    'traces',
    'endpoints',
    'workflows_emails',
    'surveys',
    'support',
    'heatmaps',
    'group_analytics',
] as const

// Non-product pages that appear in the product navigation
// These need manual icon and link configuration
export const nonProductPages = {
    // MCP Analytics has no marketing page – the nav entry points straight at the docs.
    mcpAnalytics: {
        slug: 'mcp-analytics',
        url: '/docs/mcp-analytics',
        icon: 'IconPlug',
        color: 'blue',
    },
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

// Helper function to build menu items for all products sorted alphabetically
export function buildAllProductsMenuItems(allProducts: any[]): any[] {
    // Handles to filter out
    const filteredHandles = ['ai', 'annika', 'marius', 'data-stack', 'data_in', 'data_out']

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

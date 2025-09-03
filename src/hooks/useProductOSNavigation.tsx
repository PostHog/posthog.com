import { navigate } from 'gatsby'
import React from 'react'
import useProduct from './useProduct'

// Define the navigation structure with handles
const productOSStructure = [
    // 'Utilities & add-ons', // Section header
    // { name: 'Overview', url: '/products?category=product_os' }, // Manual entry
    'Core tools', // Section header
    'api',
    'webhooks',
    'notebooks',
    'Data management', // Section header
    'profiles',
    'activity',
    'Developer tools', // Section header
    'toolbar',
    'Platform', // Section header
    'platform_packages',
]

// Build navigation items from structure and products
const buildNavigationItems = (structure: any[], products: any[]) => {
    return structure
        .map((item) => {
            // Handle manual entries with name and url
            if (typeof item === 'object' && item.name) {
                return item
            }

            // Handle section headers (plain strings that aren't product handles)
            if (typeof item === 'string') {
                const product = products.find((p) => p.handle === item)

                if (!product) {
                    // It's a section header
                    return { name: item }
                }

                // It's a product handle - build the nav item
                const { Icon, color, name, slug } = product
                return {
                    name,
                    url: `/${slug}`,
                    icon: Icon ? <Icon className={`size-4 text-${color}`} /> : undefined,
                }
            }

            return null
        })
        .filter(Boolean)
}

// Component that renders the product OS navigation
export const ProductOSNav = () => {
    const products = useProduct()

    const navigationItems = React.useMemo(() => {
        if (Array.isArray(products)) {
            return buildNavigationItems(productOSStructure, products)
        }
        return []
    }, [products])

    return navigationItems
}

// Hook for programmatic navigation
export function useProductOSNavigation() {
    const products = useProduct()

    const navigation = React.useMemo(() => {
        const children = Array.isArray(products) ? buildNavigationItems(productOSStructure, products) : []

        return {
            name: 'Product OS',
            url: '/products',
            children,
        }
    }, [products])

    return {
        navigation,
        handleNavigate: (url: string) => {
            navigate(url)
        },
    }
}

// Static navigation for server-side rendering
export const productOSNav = {
    name: 'Product OS',
    url: '/products',
    children: [
        // { name: 'Utilities & add-ons' },
        // { name: 'Overview', url: '/products?category=product_os' },
        { name: 'Core tools' },
        { name: 'API', url: '/api' },
        { name: 'Webhooks', url: '/webhooks' },
        { name: 'Notebooks', url: '/notebooks' },
        { name: 'Data management' },
        { name: 'User profiles', url: '/profiles' },
        { name: 'User activity', url: '/activity' },
        { name: 'Developer tools' },
        { name: 'Toolbar', url: '/toolbar' },
        { name: 'Platform' },
        { name: 'Platform packages', url: '/platform-packages' },
    ],
}

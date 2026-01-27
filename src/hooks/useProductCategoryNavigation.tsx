import { useMemo } from 'react'
import useProduct from './useProduct'
import {
    categoryOrder,
    categoryDisplayNames,
    getProductsForCategory,
    nonProductPages,
} from '../constants/productNavigation'

interface NavItem {
    name: string
    url?: string
}

interface ProductCategoryNav {
    name: string
    url: string
    children: NavItem[]
}

/**
 * Hook to generate navigation items for all products grouped by category.
 * Used in ProductReaderView for left sidebar navigation.
 */
export function useProductCategoryNavigation(): ProductCategoryNav {
    const allProducts = useProduct() as any[]

    const navigation = useMemo(() => {
        const children: NavItem[] = []

        // Handles to filter out from navigation
        const filteredHandles = ['ai', 'annika', 'marius', 'data_in', 'data_out']

        categoryOrder.forEach((category) => {
            const categoryProducts = getProductsForCategory(category, allProducts)

            // Filter out WIP products and specific handles
            const visibleProducts = categoryProducts.filter((product: any) => {
                if (product.status === 'WIP') return false
                if (filteredHandles.includes(product.handle)) return false
                return true
            })

            if (visibleProducts.length === 0) return

            // Add category header (no url = section divider in TreeMenu)
            children.push({
                name: categoryDisplayNames[category] || category,
            })

            // Add products in this category
            visibleProducts.forEach((product: any) => {
                // Check if it's a non-product page with custom URL
                const nonProductPage = Object.values(nonProductPages).find((p) => p.slug === product.slug)

                children.push({
                    name: product.name,
                    url: nonProductPage?.url || `/${product.slug}`,
                })
            })
        })

        return {
            name: 'Products',
            url: '/products',
            children,
        }
    }, [allProducts])

    return navigation
}

export default useProductCategoryNavigation

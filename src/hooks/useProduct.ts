import { IconPieChart } from '@posthog/icons'
import useProducts from './useProducts'

const dedupe = (products) => {
    const deduped = {}
    for (const product of products) {
        if (!deduped[product.type]) {
            deduped[product.type] = product
        }
    }
    return Object.values(deduped)
}

export default function useProduct({ type } = {}) {
    const { products } = useProducts()
    const extendedProducts = [
        {
            ...products.find((product) => product.type === 'product_analytics'),
            name: 'Web analytics',
            Icon: IconPieChart,
            description: 'Monitor your website traffic. Built for people who really liked GA3...',
            type: 'web_analytics',
            color: '[#36C46F]',
            sharesFreeTier: 'product_analytics',
            worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: '/web-analytics',
        },
        {
            ...products.find((product) => product.type === 'product_analytics'),
            type: 'product_analytics',
            name: 'Product analytics',
        },
        ...products,
    ]

    const allProducts = extendedProducts.map((product) => ({
        ...product,
        sharesFreeTier: product.sharesFreeTier
            ? extendedProducts.find((extendedProduct) => extendedProduct.type === product.sharesFreeTier)
            : undefined,
        worksWith: product.worksWith
            ? product.worksWith.map((type) => extendedProducts.find((product) => product.type === type))
            : [],
    }))

    return type ? allProducts.find((product) => product.type === type) : dedupe(allProducts)
}

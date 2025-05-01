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
            slug: '/product-analytics',
            customers: [
                {
                    name: 'Y Combinator',
                    title: 'gathers 30% more data than with Google Analytics',
                    description: 'We could autocapture... events using the JS snippet and... configure custom events.'
                },
                {
                    name: 'Hasura',
                    title: 'improved conversion rates by 10-20%',
                    description: 'we observed drop-offs at very particular stages of our onboarding flow.'
                },
                {
                    name: 'Contra',
                    title: 'increased registrations by 30%',
                    description: 'From [funnels], we could easily jump to session replays to see the drop-off point.'
                },
                {
                    name: 'Speakeasy',
                    title: 'manages features and developer relations',
                    description: '...top-to-bottom view of conversion rates and user paths, without... extra setup time.'
                },
            ],
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

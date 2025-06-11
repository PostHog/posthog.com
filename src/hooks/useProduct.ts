import { IconPieChart, IconThoughtBubble, IconPlug, IconMessage, IconDashboard, IconNotebook } from '@posthog/icons'
import useProducts from './useProducts'

const dedupe = (products) => {
    const deduped = {}
    for (const product of products) {
        if (!deduped[product.name]) {
            deduped[product.name] = product
        }
    }
    return Object.values(deduped)
}

export default function useProduct({ handle }: { handle?: string } = {}) {
    const { products } = useProducts()
    const extendedProducts = [
        {
            ...products.find((product) => product.handle === 'web_analytics'),
            name: 'Web analytics',
            Icon: IconPieChart,
            description: 'Monitor your website traffic. Built for people who really liked GA3...',
            handle: 'web_analytics',
            color: 'green-2',
            sharesFreeTier: 'product_analytics',
            worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: '/web-analytics',
        },
        {
            ...products.find((product) => product.handle === 'product_analytics'),
            handle: 'product_analytics',
            name: 'Product analytics',
            slug: '/product-analytics',
        },
        {
            name: 'Broadcasts',
            Icon: IconMessage,
            description: 'send messages to users.',
            handle: 'broadcasts',
            color: 'blue',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: '/broadcasts',
            beta: true,
        },
        {
            name: 'User interviews',
            Icon: IconThoughtBubble,
            description: 'Get feedback from users.',
            handle: 'user_interviews',
            color: 'blue',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: '/user-interviews',
            beta: true,
        },
        {
            name: 'Data pipelines',
            Icon: IconPlug,
            description: 'Get data into PostHog and send it where it needs to go.',
            handle: 'data_pipelines',
            color: 'sky-blue',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: '/cdp',
        },
        {
            name: 'Dashboards',
            Icon: IconDashboard,
            description: 'Get data into PostHog and send it where it needs to go.',
            handle: 'dashboards',
            color: 'blue',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: '/dashboards',
        },
        {
            name: 'Notebooks',
            Icon: IconNotebook,
            description: 'Get data into PostHog and send it where it needs to go.',
            handle: 'notebooks',
            color: 'purple',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: '/notebooks',
        },
        ...products,
    ]

    const allProducts = extendedProducts.map((product) => ({
        ...product,
        sharesFreeTier: product.sharesFreeTier
            ? extendedProducts.find((extendedProduct) => extendedProduct.handle === product.sharesFreeTier)
            : undefined,
        worksWith: product.worksWith
            ? product.worksWith.map((handle) => extendedProducts.find((product) => product.handle === handle))
            : [],
    }))

    return handle ? allProducts.find((product) => product.handle === handle) : dedupe(allProducts)
}

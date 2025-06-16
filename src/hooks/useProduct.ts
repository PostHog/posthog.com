import {
    IconPieChart,
    IconThoughtBubble,
    IconPlug,
    IconMessage,
    IconDashboard,
    IconNotebook,
    IconAI,
    IconMagicWand,
    IconPiggyBank,
} from '@posthog/icons'
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
            colorSecondary: 'red',
            category: 'analytics',
            sharesFreeTier: 'product_analytics',
            worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: '/web-analytics',
        },

        // if we want to override props on something that exists in useProducts.tsx (since it will ultimately move to the billing API...)
        // {
        //     ...products.find((product) => product.handle === 'product_analytics'),
        //     handle: 'product_analytics',
        //     name: 'Product analytics',
        //     slug: '/product-analytics',
        // },

        {
            name: 'Broadcasts',
            Icon: IconMessage,
            description: 'send messages to users.',
            handle: 'broadcasts',
            color: 'blue',
            colorSecondary: 'sky-blue',
            // category: 'behavior',
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
            colorSecondary: 'purple',
            // category: 'behavior',
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
            colorSecondary: 'blue',
            category: 'tools',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: '/cdp',
        },
        {
            name: 'Revenue analytics',
            Icon: IconPiggyBank,
            description: 'Track your money',
            handle: 'data_pipelines',
            color: 'green',
            colorSecondary: 'green-2',
            category: 'analytics',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: 'revenue-analytics',
            status: 'beta',
        },
        {
            name: 'Dashboards',
            Icon: IconDashboard,
            description: 'Get data into PostHog and send it where it needs to go.',
            handle: 'dashboards',
            color: 'blue',
            colorSecondary: 'sky-blue',
            category: 'tools',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: '/dashboards',
        },
        {
            name: 'Notebooks',
            Icon: IconNotebook,
            description: 'Get data into PostHog and send it where it needs to go.',
            handle: 'notebooks',
            color: 'teal',
            colorSecondary: 'lilac',
            category: 'tools',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: '/notebooks',
        },
        {
            name: 'Max',
            Icon: IconMagicWand,
            description: 'AI-powered product analyst and assistant.',
            handle: 'max_ai',
            color: 'purple',
            colorSecondary: 'lilac',
            category: 'tools',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: '/max',
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

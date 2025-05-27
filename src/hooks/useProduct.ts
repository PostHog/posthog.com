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

export default function useProduct({ type } = {}) {
    const { products } = useProducts()
    const extendedProducts = [
        {
            ...products.find((product) => product.type === 'web_analytics'),
            name: 'Web analytics',
            Icon: IconPieChart,
            description: 'Monitor your website traffic. Built for people who really liked GA3...',
            type: 'web_analytics',
            color: 'green-2',
            sharesFreeTier: 'product_analytics',
            worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: '/web-analytics',
        },
        {
            ...products.find((product) => product.type === 'product_analytics'),
            type: 'product_analytics',
            name: 'Product analytics',
            slug: '/product-analytics',
            customers: {
                ycombinator: {
                    headline: 'gathers 30% more data than with Google Analytics',
                    description: 'We could autocapture... events using the JS snippet and... configure custom events.'
                },
                hasura: {
                    headline: 'improved conversion rates by 10-20%',
                    description: 'we observed drop-offs at very particular stages of our onboarding flow.'
                },
                contra: {
                    headline: 'increased registrations by 30%',
                    description: 'From [funnels], we could easily jump to session replays to see the drop-off point.'
                },
                speakeasy: {
                    headline: 'manages features and developer relations',
                    description: '...top-to-bottom view of conversion rates and user paths, without... extra setup time.'
                },
            },
        },
        {
            name: 'Broadcasts',
            Icon: IconMessage,
            description: 'send messages to users.',
            type: 'broadcasts',
            color: 'blue',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: '/broadcasts',
            beta: true,
        },
        {
            name: 'User interviews',
            Icon: IconThoughtBubble,
            description: 'Get feedback from users.',
            type: 'user_interviews',
            color: 'blue',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: '/user-interviews',
            beta: true,
        },
        {
            name: 'Data pipelines',
            Icon: IconPlug,
            description: 'Get data into PostHog and send it where it needs to go.',
            type: 'data_pipelines',
            color: 'sky-blue',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: '/cdp',
        },
        {
            name: 'Dashboards',
            Icon: IconDashboard,
            description: 'Get data into PostHog and send it where it needs to go.',
            type: 'dashboards',
            color: 'blue',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: '/dashboards',
        },
        {
            name: 'Notebooks',
            Icon: IconNotebook,
            description: 'Get data into PostHog and send it where it needs to go.',
            type: 'notebooks',
            color: 'purple',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: '/notebooks',
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

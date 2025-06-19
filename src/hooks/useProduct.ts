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
    IconToolbar,
    IconBrackets,
    IconAsterisk,
    IconWebhooks,
    IconClockRewind,
    IconRocket,
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
            slug: 'web-analytics',
            color: 'green-2',
            colorSecondary: 'red',
            category: 'analytics',
            sharesFreeTier: 'product_analytics',
            worksWith: ['product_analytics', 'session_replay', 'surveys'],
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
            category: 'marketing',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: '/broadcasts',
            status: 'WIP',
        },
        {
            name: 'User interviews',
            Icon: IconThoughtBubble,
            description: 'Get feedback from users.',
            handle: 'user_interviews',
            color: 'blue',
            colorSecondary: 'purple',
            category: 'product',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: '/user-interviews',
            status: 'WIP',
        },
        {
            name: 'Data pipelines',
            Icon: IconPlug,
            description: 'Get data into PostHog and send it where it needs to go.',
            handle: 'data_pipelines',
            slug: 'cdp',
            color: 'sky-blue',
            colorSecondary: 'blue',
            category: 'data',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
        },
        {
            name: 'SQL editor',
            Icon: IconAsterisk,
            description: 'Query your data warehouse.',
            handle: 'sql',
            slug: 'sql',
            color: 'blue',
            colorSecondary: 'blue',
            category: 'data',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
        },
        {
            name: 'Revenue analytics',
            Icon: IconPiggyBank,
            description: 'Track your money',
            handle: 'revenue_analytics',
            slug: 'revenue-analytics',
            color: 'green',
            colorSecondary: 'green-2',
            category: 'analytics',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            status: 'beta',
        },
        {
            name: 'LLM analytics',
            Icon: IconAI,
            description: 'Track your money',
            handle: 'llm_analytics',
            slug: 'llm-analytics',
            color: 'purple',
            colorSecondary: 'green-2',
            category: 'analytics',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            status: 'beta',
        },
        {
            name: 'Dashboards',
            Icon: IconDashboard,
            description: 'Get data into PostHog and send it where it needs to go.',
            handle: 'dashboards',
            color: 'blue',
            colorSecondary: 'sky-blue',
            category: 'product_os',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: '/dashboards',
        },
        {
            name: 'Heatmaps',
            Icon: IconToolbar,
            description: 'Visualize clicks in your product.',
            handle: 'heatmaps',
            slug: 'heatmaps',
            color: 'red',
            colorSecondary: 'sky-blue',
            category: 'marketing',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
        },
        {
            name: 'API',
            Icon: IconBrackets,
            description: 'Visualize clicks in your product.',
            handle: 'api',
            slug: 'api',
            color: 'secondary',
            colorSecondary: 'primary',
            category: 'data',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
        },
        {
            name: 'Webhooks',
            Icon: IconWebhooks,
            description: 'Visualize clicks in your product.',
            handle: 'webhooks',
            slug: 'webhooks',
            color: 'red',
            colorSecondary: 'sky-blue',
            category: 'data',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
        },
        {
            name: 'Notebooks',
            Icon: IconNotebook,
            description: 'Get data into PostHog and send it where it needs to go.',
            handle: 'notebooks',
            color: 'teal',
            colorSecondary: 'lilac',
            category: 'product_os',
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
            category: 'product_os',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: '/max',
            status: 'beta',
        },
        {
            name: 'User activity',
            Icon: IconClockRewind,
            description: 'See what users are doing in your product.',
            handle: 'activity',
            color: 'yellow',
            colorSecondary: 'yellow-2',
            category: 'product_os',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: '/activity',
        },
        {
            name: 'Toolbar',
            Icon: IconToolbar,
            description: 'Interact with PostHog directly on your site.',
            handle: 'toolbar',
            color: 'salmon',
            colorSecondary: 'red',
            category: 'product_os',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: '/toolbar',
        },
        {
            name: 'Early access features',
            Icon: IconRocket,
            description: 'Get early access to new features.',
            handle: 'early_access',
            color: 'orange',
            colorSecondary: 'orange-2',
            category: 'product',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: '/early-access-features',
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

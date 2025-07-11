import React from 'react'
import * as Icons from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'

interface ProductCardProps {
    name: string
    description: string
    freeTierLimit?: string
    startingPrice?: string
    url: string
    icon: React.ReactNode
    denominator?: string
    backContent: React.ReactNode
}

// Product details (from products.tsx)
const productDetails: Record<string, any> = {
    'product-analytics': {
        freeTierLimit: '1 million',
        denominator: 'event',
        startingPrice: '$0.00005',
        description: 'Understand user behavior with event-based analytics, cohorts, and conversion funnels',
    },
    'web-analytics': {
        freeTierLimit: '1 million',
        denominator: 'event',
        startingPrice: '$0.00005',
        description: 'Privacy-friendly website analytics with no cookie banner required',
    },
    'session-replay': {
        freeTierLimit: '5,000',
        denominator: 'recording',
        startingPrice: '$0.005',
        description: 'Watch people use your product to diagnose issues and understand user behavior',
    },
    'feature-flags': {
        freeTierLimit: '1 million',
        denominator: 'request',
        startingPrice: '$0.0001',
        description: 'Release features safely with targeted rollouts',
    },
    experiments: {
        freeTierLimit: '1 million',
        denominator: 'request',
        startingPrice: '$0.0001',
        description: 'Run A/B tests to optimize your product with statistical significance',
    },
    surveys: {
        freeTierLimit: '250',
        denominator: 'response',
        startingPrice: '$0.20',
        description: 'Get qualitative feedback from the right users at the right time',
    },
    'data-warehouse': {
        freeTierLimit: '1 million',
        denominator: 'row',
        startingPrice: '$0.000015',
        description: 'Query your data with SQL in our lightning-fast data warehouse',
    },
    cdp: {
        freeTierLimit: '1 million',
        denominator: 'event',
        startingPrice: '$0.000062',
        description: 'Send customer data anywhere with our CDP and reverse ETL pipeline',
    },
    'error-tracking': {
        freeTierLimit: '100,000',
        denominator: 'event',
        startingPrice: '$0.00037',
        description: 'Find and track errors in your product, then assign them as issues',
    },
    max: {
        description: 'AI-powered product analyst and assistant',
    },
}

// Product menu (from navs/index.js)
const productMenu = [
    { name: 'Product analytics', icon: 'IconGraph', color: 'blue', url: '/product-analytics' },
    { name: 'Web analytics', icon: 'IconPieChart', color: '[#36C46F]', url: '/web-analytics' },
    { name: 'Session replay', icon: 'IconRewindPlay', color: 'yellow', url: '/session-replay' },
    { name: 'Feature flags', icon: 'IconToggle', color: 'seagreen', url: '/feature-flags' },
    { name: 'Experiments', icon: 'IconFlask', color: 'purple', url: '/experiments' },
    { name: 'Error tracking', icon: 'IconWarning', color: 'orange', url: '/error-tracking' },
    { name: 'Surveys', icon: 'IconMessage', color: 'salmon', url: '/surveys' },
    { name: 'Data pipelines', icon: 'IconPlug', color: 'sky-blue', url: '/cdp' },
    { name: 'Data warehouse', icon: 'IconDatabase', color: 'lilac', url: '/data-warehouse' },
    { name: 'Max AI', icon: 'IconMagicWand', color: 'purple', url: '/max' },
]

export const startupProducts: ProductCardProps[] = productMenu
    .filter((p) => productDetails[p.url.replace('/', '')])
    .map((p) => {
        const key = p.url.replace('/', '')
        const details = productDetails[key]
        const IconComponent = Icons[p.icon as keyof typeof Icons]
        return {
            name: p.name,
            url: p.url,
            icon: <IconComponent className={`text-${p.color} size-4`} />,
            backContent: null, // not used anymore
            ...details,
        }
    })

export const StartupProductCards = ({
    products,
    leftContent,
}: {
    products: ProductCardProps[]
    leftContent: React.ReactNode
}) => {
    return (
        <section className="flex flex-col lg:flex-row gap-12 my-24 items-start w-full max-w-7xl mx-auto px-4 py-12 rounded-2xl bg-[#F7F8F2] dark:bg-accent-dark/60">
            <div className="w-full lg:w-[35%] flex flex-col justify-center mb-12 lg:mb-0 pr-0 lg:pr-16 min-w-[200px] max-w-lg">
                {leftContent}
            </div>
            <div className="w-full lg:w-[65%] flex justify-end">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    {products.map((product) => (
                        <div
                            key={product.name}
                            className="relative group rounded-2xl shadow-xl p-8 text-left bg-white dark:bg-accent-dark transition-all duration-300 cursor-pointer h-40 flex flex-col items-center w-full min-w-[160px] max-w-[200px] mx-auto hover:shadow-2xl hover:scale-[1.03]"
                        >
                            <div className="absolute inset-0 rounded-2xl bg-accent dark:bg-accent-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 p-8 flex flex-col justify-center items-center text-center">
                                <a href="/pricing" className="text-base font-medium underline text-primary">
                                    See pricing
                                </a>
                            </div>
                            <div className="relative z-20 group-hover:opacity-0 transition-opacity duration-300 flex flex-col items-center mb-0 w-full rounded-2xl">
                                {product.icon}
                                <h3 className="text-lg font-bold mt-0.5 mb-0 text-center">{product.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

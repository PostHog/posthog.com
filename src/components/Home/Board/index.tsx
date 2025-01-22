import React, { useMemo, useState } from 'react'
import {
    IconBrowser,
    IconLineGraph,
    IconHogQL,
    IconPieChart,
    IconGlobe,
    IconMegaphone,
    IconRewindPlay,
    IconClock,
    IconTerminal,
    IconPulse,
    IconRewind,
    IconBrackets,
    IconTestTube,
    IconToggle,
    IconFlask,
    IconBadge,
    IconTarget,
    IconPeople,
    IconCheckbox,
    IconPalette,
    IconMagicWand,
    IconMessage,
    IconShare,
    IconGear,
    IconPlug,
    IconDownload,
    IconDatabase,
    IconHandMoney,
    IconAI,
    IconDecisionTree,
    IconRetention,
    IconUserPaths,
    IconStickiness,
    IconLifecycle,
    IconTrends,
    IconFunnels,
    IconGraph,
} from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'
import useProducts from 'hooks/useProducts'
import { CallToAction } from 'components/CallToAction'

type Product = {
    name: string
    lottieSrc?: string
    color: string
    colorDark?: string
    Icon: React.ReactNode
    description: React.ReactNode
    pricingKey?: string
    types: string[]
    features?: { title: string; Icon: React.ReactNode }[]
    Images?: React.ReactNode
    status: string
    pricing?: {
        FreeTier?: React.ReactNode
        StartsAt?: React.ReactNode
        cta?: {
            url: string
            text: string
        }
    }
}

const products: Product[] = [
    {
        name: 'Product analytics',
        lottieSrc: '/lotties/product-icons/product-analytics.lottie',
        color: 'blue',
        Icon: IconGraph,
        description:
            'Understand user behavior with event-based analytics, cohorts, and conversion funnels. Includes auto capture & SQL access.',
        pricingKey: 'product_analytics',
        types: ['Product'],
        features: [
            { title: 'Funnels', Icon: IconFunnels },
            { title: 'Graphs & trends', Icon: IconTrends },
            { title: 'User paths', Icon: IconUserPaths },
            { title: 'Stickiness', Icon: IconStickiness },
            { title: 'Lifecycle', Icon: IconLifecycle },
            { title: 'Retention', Icon: IconRetention },
            { title: 'SQL', Icon: IconHogQL },
        ],
        Images: () => {
            return (
                <>
                    <div className="block dark:hidden">
                        <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/product-analytics/product-analytics-light.png" />
                    </div>
                    <div className="hidden dark:block">
                        <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/product-analytics/product-analytics-dark.png" />
                    </div>
                </>
            )
        },
        status: 'Production',
    },
    {
        name: 'Web analytics',
        lottieSrc: '/lotties/product-icons/web-analytics.lottie',
        color: '[#36C46F]',
        Icon: IconPieChart,
        description: "Enable aggregate website analytics with one click if you're already using PostHog.",
        pricingKey: 'web_analytics',
        types: ['Marketing'],
        features: [
            { title: 'Pageviews, sessions, unique visitors', Icon: IconLineGraph },
            { title: 'Top pages & paths', Icon: IconBrowser },
            { title: 'Device & location', Icon: IconGlobe },
            { title: 'Channels', Icon: IconMegaphone },
        ],
        Images: () => {
            return (
                <>
                    <div className="block dark:hidden">
                        <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/web-analytics/web-analytics-light.png" />
                    </div>
                    <div className="hidden dark:block">
                        <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/web-analytics/web-analytics-dark.png" />
                    </div>
                </>
            )
        },
        status: 'Production',
    },
    {
        name: 'Session replay',
        lottieSrc: '/lotties/product-icons/session-replay.lottie',
        color: 'yellow',
        Icon: IconRewindPlay,
        description:
            'Watch users interacting with your app or website. Available for web, Android (beta), and iOS (alpha).',
        pricingKey: 'session_replay',
        types: ['Product', 'Engineering'],
        features: [
            { title: 'Event timeline', Icon: IconClock },
            { title: 'Console logs', Icon: IconTerminal },
            { title: 'Network requests', Icon: IconPulse },
        ],
        Images: () => {
            return (
                <>
                    <div className="block dark:hidden">
                        <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/session-replay/session-replay-light.png" />
                    </div>
                    <div className="hidden dark:block">
                        <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/session-replay/session-replay-dark.png" />
                    </div>
                </>
            )
        },
        status: 'Production',
    },
    {
        name: 'Feature flags',
        lottieSrc: '/lotties/product-icons/feature-flags.lottie',
        color: 'seagreen',
        Icon: IconToggle,
        description: 'Safely roll out features to select users or cohorts.',
        pricingKey: 'feature_flags',
        types: ['Engineering'],
        features: [
            { title: 'Multivariate flags', Icon: IconTestTube },
            { title: 'JSON payloads', Icon: IconBrackets },
            { title: 'Instant rollbacks', Icon: IconRewind },
        ],
        Images: () => {
            return (
                <>
                    <div className="block dark:hidden">
                        <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/feature-flags/feature-flags-1-light.png" />
                    </div>
                    <div className="hidden dark:block">
                        <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/feature-flags/feature-flags-1-dark.png" />
                    </div>
                </>
            )
        },
        status: 'Production',
    },
    {
        name: 'Experiments',
        lottieSrc: '/lotties/product-icons/ab-testing.lottie',
        color: 'purple',
        Icon: IconFlask,
        description: 'Run experiments with statistical significance.',
        pricingKey: 'feature_flags',
        types: ['Product'],
        features: [
            { title: 'Goals & secondary metrics', Icon: IconBadge },
            { title: 'Targeting & exclusion rules ', Icon: IconTarget },
            { title: 'Dynamic cohort support', Icon: IconPeople },
        ],
        status: 'Production',
    },
    {
        name: 'Surveys',
        lottieSrc: '/lotties/product-icons/surveys.lottie',
        color: 'salmon',
        Icon: IconMessage,
        description: 'Collect in-app feedback from your users',
        pricingKey: 'surveys',
        types: ['Product'],
        features: [
            { title: 'Five question types (Multiple choice, text, rating, NPS, emoji reaction)', Icon: IconCheckbox },
            { title: 'User targeting', Icon: IconTarget },
            { title: 'Customize the on-page popup', Icon: IconPalette },
            { title: 'No-code or API', Icon: IconMagicWand },
        ],
        Images: () => {
            return (
                <>
                    <div className="block dark:hidden">
                        <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/surveys/survey.png" />
                    </div>
                    <div className="hidden dark:block">
                        <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/surveys/survey.png" />
                    </div>
                </>
            )
        },
        status: 'Production',
    },
    {
        name: 'Data pipelines',
        // lottieSrc: '/lotties/product-icons/data-pipeline.lottie',
        color: 'sky-blue',
        Icon: IconPlug,
        description: 'Build your customer data platform: Import data from your warehouse and send to 25+ destinations.',
        types: ['Data'],
        features: [
            { title: 'Sources', Icon: IconDownload },
            { title: 'Destinations', Icon: IconShare },
            { title: 'Transformations', Icon: IconGear },
        ],
        Images: () => {
            return (
                <>
                    <div className="block dark:hidden">
                        <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/cdp/pipeline-scene.png" />
                    </div>
                    <div className="hidden dark:block">
                        <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/cdp/pipeline-scene.png" />
                    </div>
                </>
            )
        },
        status: 'Production',
    },
    {
        name: 'Data warehouse',
        lottieSrc: '/lotties/product-icons/data-warehouse.lottie',
        color: 'lilac',
        Icon: IconDatabase,
        description: 'Sync data from Stripe, Hubspot, Zendesk, or custom sources.',
        pricingKey: 'data_warehouse',
        types: ['Data'],
        status: 'Production',
        Images: () => {
            return (
                <>
                    <div className="block dark:hidden">
                        <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/data-warehouse/warehouse-scene.png" />
                    </div>
                    <div className="hidden dark:block">
                        <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/data-warehouse/warehouse-scene.png" />
                    </div>
                </>
            )
        },
    },
    {
        name: 'LLM observability',
        color: '[#8B0DC8]',
        colorDark: '[#C170E8]',
        Icon: IconAI,
        description: 'Build AI features with full visibility – both in development and production.',
        pricingKey: 'llm-observability',
        types: ['AI'],
        features: [
            { title: 'LLM traces', Icon: IconDecisionTree },
            { title: 'AI usage and performance metrics', Icon: IconTrends },
            { title: 'Cost analysis', Icon: IconHandMoney },
        ],
        Images: () => {
            return (
                <>
                    <div className="block dark:hidden">
                        <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/llm_observability_dashboard_4_6b54d8abd7.png" />
                    </div>
                    <div className="hidden dark:block">
                        <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/llm_observability_dashboard_4_6b54d8abd7.png" />
                    </div>
                </>
            )
        },
        status: 'Beta',
        pricing: {
            FreeTier: () => (
                <p className="text-base m-0">
                    <strong>Unlimited</strong> during beta
                </p>
            ),
            StartsAt: () => (
                <p className="text-base m-0">
                    <strong>Free</strong> during beta
                </p>
            ),
            cta: {
                url: '/pricing',
                text: 'Request access',
            },
        },
    },
]

const numberToWords = (num: number) => {
    if (num >= 1_000_000_000) return num / 1_000_000_000 + ' billion'
    if (num >= 1_000_000) return num / 1_000_000 + ' million'
    if (num >= 1_000) return num / 1_000 + ' thousand'
    return num.toString()
}

const ProductDetails = ({ product }: { product: Product }) => {
    const { name, description, features, Images, Icon, color, colorDark, pricingKey, pricing } = product
    const products = useProducts()
    const billingData = products.products.find((billingProduct) => billingProduct.type === pricingKey)

    return (
        <div className="bg-white border border-border dark:border-dark max-w-[700px] w-full overflow-hidden">
            <div className="px-6 pt-6">
                <h2 className="text-xl m-0 flex space-x-2">
                    <Icon className={`size-8 text-${color} ${colorDark ? 'dark:text-${colorDark}' : ''}`} />
                    <span>{name}</span>
                </h2>
                <p className="text-base opacity-70 ml-10">{description}</p>
                {Images && (
                    <div className="-mb-32 h-[350px] relative">
                        <div className="absolute inset-0 w-full h-full">
                            <Images />
                        </div>
                    </div>
                )}
            </div>
            {features?.length > 0 && (
                <ul className="grid grid-cols-3 gap-4 list-none px-6 py-6 border-t border-border dark:border-dark relative bg-white">
                    {features?.map(({ title, Icon }) => (
                        <li key={title} className="flex items-center space-x-2 text-base font-semibold">
                            <div className="size-8 bg-accent dark:bg-accent-dark rounded-md p-1 flex items-center justify-center">
                                <Icon className="size-5" />
                            </div>
                            <span>{title}</span>
                        </li>
                    ))}
                </ul>
            )}
            {(billingData || pricing) && (
                <div className="grid grid-cols-3 p-6 border-t border-border dark:border-dark bg-white relative">
                    <div>
                        <h3 className="text-base opacity-70 font-semibold m-0">Monthly free tier</h3>
                        {pricing?.FreeTier ? (
                            <pricing.FreeTier />
                        ) : (
                            <p className="text-base text-green font-bold m-0">
                                {numberToWords(billingData?.freeLimit)} {billingData?.billingData.unit}s
                            </p>
                        )}
                    </div>
                    <div>
                        <h3 className="text-base opacity-70 font-semibold m-0">Starts at</h3>
                        {pricing?.StartsAt ? (
                            <pricing.StartsAt />
                        ) : (
                            <p className="text-base m-0">
                                <strong>${billingData?.startsAt}</strong>/{billingData?.billingData.unit}
                            </p>
                        )}
                    </div>
                    <div className="ml-auto">
                        <CallToAction type="outline" to={pricing?.cta?.url || '/pricing'}>
                            {pricing?.cta?.text || 'Explore'}
                        </CallToAction>
                    </div>
                </div>
            )}
        </div>
    )
}

export default function Hero(): JSX.Element {
    const [activeProduct, setActiveProduct] = useState<Product>(products[0])
    const groupedProducts = useMemo(() => {
        const groupedProducts: { [key: string]: Product[] } = {}

        products.forEach((product) => {
            product.types.forEach((type) => {
                if (!groupedProducts[type]) {
                    groupedProducts[type] = []
                }
                groupedProducts[type].push(product)
            })
        })
        return groupedProducts
    }, [products])

    return (
        <section className="max-w-screen-2xl mx-auto flex space-x-12 py-12">
            <ul className="grid grid-cols-3 gap-4 list-none m-0 p-0 flex-grow">
                {Object.entries(groupedProducts).map(([type, products]) => (
                    <li key={type}>
                        <h2 className="text-lg opacity-70 font-semibold m-0 mb-1">{type}</h2>
                        <ul className="list-none m-0 p-0 -mx-3 space-y-1">
                            {products.map((product) => {
                                const { Icon, name, color, colorDark } = product
                                const active = activeProduct.name === product.name
                                return (
                                    <li key={name}>
                                        <button
                                            className={`flex items-center gap-2 text-lg font-semibold hover:font-bold hover:bg-accent/60 dark:bg-accent-dark/60 click rounded-md px-3 py-1 ${
                                                active ? 'bg-accent dark:bg-accent-dark font-bold' : ''
                                            }`}
                                            onClick={() => setActiveProduct(product)}
                                        >
                                            <Icon
                                                className={`size-5 text-${color} ${
                                                    colorDark ? 'dark:text-${colorDark}' : ''
                                                }`}
                                            />
                                            <span>{name}</span>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </li>
                ))}
            </ul>
            <ProductDetails product={activeProduct} />
        </section>
    )
}

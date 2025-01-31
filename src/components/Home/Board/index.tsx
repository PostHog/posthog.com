import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
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
    IconX,
    IconLlmPromptManagement,
    IconCode,
    IconChatHelp,
    IconIssue,
    IconLlmPromptEvaluation,
    IconWarning,
    IconSend,
    IconLlmObservability,
    IconListCheck,
    IconApp,
    IconPhone,
    IconArrowLeft,
    IconArrowRight,
    IconHeadset,
} from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'
import useProducts from 'hooks/useProducts'
import { CallToAction } from 'components/CallToAction'
import { Feature } from 'components/Roadmap'
import { useRoadmaps } from 'hooks/useRoadmaps'
import { graphql } from 'gatsby'
import { useStaticQuery } from 'gatsby'
import { AnimatePresence, motion } from 'framer-motion'
import Slider from 'components/Slider'
import { PlayerEvents, DotLottiePlayer } from '@dotlottie/react-player'
import { MenuContainer } from 'components/PostLayout/MobileNav'

type Product = {
    name: string
    lottieSrc?: string
    color: string
    colorDark?: string
    Icon: React.ReactNode
    description?: React.ReactNode
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
    roadmapID?: number
    badge?: string
    roadmap?: any
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
            'Watch users interacting with your app or website. Available for web, Android, iOS, React Native, and Flutter.',
        pricingKey: 'session_replay',
        types: ['Product', 'Engineering'],
        features: [
            { title: 'Event timeline', Icon: IconClock },
            { title: 'Console logs', Icon: IconTerminal },
            { title: 'Network requests', Icon: IconPulse },
            { title: 'Mobile SDKs', Icon: IconPhone },
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
        name: 'CDP',
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
        Icon: IconLlmObservability,
        description: 'Build AI features with full visibility – both in development and production.',
        pricingKey: 'product_analytics',
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
        status: 'WIP',
        badge: 'ALPHA',
        pricing: {
            cta: {
                url: 'https://app.posthog.com/home#panel=feature-previews',
                text: 'Try it out',
            },
        },
    },
    {
        name: 'Messaging',
        color: 'blue',
        Icon: IconSend,
        types: ['Marketing'],
        status: 'Roadmap',
        roadmapID: 1999,
    },
    {
        name: 'Product tours',
        Icon: IconMegaphone,
        color: 'seagreen',
        types: ['Product'],
        status: 'Roadmap',
        roadmapID: 2111,
    },
    {
        name: 'Heatmaps',
        Icon: IconApp,
        color: 'yellow',
        types: ['Marketing'],
        status: 'Production',
        description: 'Visually track user interactions, clicks, and scrolling behavior.',
        Images: () => {
            return (
                <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/v1716592885/posthog.com/contents/docs/toolbar/settings.png" />
            )
        },
        features: [
            { title: 'Click tracking', Icon: IconApp },
            { title: 'Scroll depth', Icon: IconApp },
            { title: 'Rage clicks', Icon: IconApp },
            { title: 'Mouse movement', Icon: IconApp },
        ],
    },
    {
        name: 'Product roadmaps',
        Icon: IconListCheck,
        color: 'red',
        types: ['Product'],
        status: 'Roadmap',
        roadmapID: 2097,
    },
    {
        name: 'No-code A/B testing',
        Icon: IconTestTube,
        color: 'blue',
        types: ['Marketing'],
        status: 'WIP',
        roadmapID: 1809,
    },
    {
        name: 'Error tracking',
        Icon: IconWarning,
        color: 'yellow',
        types: ['Engineering'],
        status: 'WIP',
        roadmapID: 2017,
    },
    {
        name: 'Prompt evaluation',
        Icon: IconLlmPromptEvaluation,
        color: 'blue',
        types: ['AI'],
        status: 'Roadmap',
        roadmapID: 2167,
    },
    {
        name: 'Prompt management',
        Icon: IconLlmPromptManagement,
        color: 'yellow',
        types: ['AI'],
        status: 'Roadmap',
        roadmapID: 2168,
    },
    {
        name: 'Code editor',
        Icon: IconCode,
        color: 'seagreen',
        types: ['AI'],
        status: 'Roadmap',
        roadmapID: 2169,
    },
    {
        name: 'AI docs chat',
        Icon: IconChatHelp,
        color: 'blue',
        types: ['Support'],
        status: 'Roadmap',
        roadmapID: 2170,
    },
    {
        name: 'Issue tracker',
        Icon: IconIssue,
        color: 'red',
        types: ['Support'],
        status: 'Roadmap',
        roadmapID: 2171,
    },
    {
        name: 'CRM',
        Icon: IconHeadset,
        color: 'green',
        types: ['Sales'],
        status: 'Roadmap',
        roadmapID: 2110,
    },
]

const legend = [
    {
        name: 'Production',
    },
    {
        name: 'WIP',
        color: 'yellow',
    },
    {
        name: 'Roadmap',
        color: 'red',
    },
]

const filters = [{ name: 'All products' }, ...legend]

const numberToWords = (num: number) => {
    if (num >= 1_000_000_000) return num / 1_000_000_000 + ' billion'
    if (num >= 1_000_000) return num / 1_000_000 + ' million'
    if (num >= 1_000) return num / 1_000 + ',000'
    return num.toString()
}

const RoadmapProductDetails = ({
    product,
    onNext,
    onPrev,
}: {
    product: Product
    onNext: () => void
    onPrev: () => void
}) => {
    const { name, description, Icon, color, colorDark, roadmapID } = product
    const { roadmaps, mutate, isLoading } = useRoadmaps({
        params: {
            filters: {
                id: {
                    $eq: roadmapID,
                },
            },
        },
    })
    const roadmap = roadmaps[0]
    const likeCount = roadmap?.attributes?.likes?.data?.length || 0
    const staticLikeCount = product.roadmap?.githubPages?.[0]?.reactions?.total_count || 0

    return (
        <div className="bg-white dark:bg-accent-dark border border-border dark:border-dark md:max-w-[700px] w-full overflow-hidden">
            <div className="p-6 relative">
                <ProductNavButtons onNext={onNext} onPrev={onPrev} />
                <h2 className="text-xl m-0 flex space-x-2">
                    <Icon className={`size-8 text-${color} ${colorDark ? 'dark:text-${colorDark}' : ''}`} />
                    <span>{name}</span>
                </h2>
                {description && <p className="text-sm opacity-70 ml-10">{description}</p>}
                <div className="mt-4">
                    {isLoading ? (
                        <div className="h-64 bg-accent dark:bg-dark rounded-md animate-pulse" />
                    ) : roadmap ? (
                        <Feature
                            id={roadmap.id}
                            {...roadmap.attributes}
                            likeCount={likeCount + staticLikeCount}
                            onLike={mutate}
                            onUpdate={mutate}
                        />
                    ) : null}
                </div>
            </div>
        </div>
    )
}

const Lottie = ({ lottieRef, src, PlaceholderIcon }) => {
    const [ready, setReady] = useState(false)

    return (
        <>
            {src && (
                <DotLottiePlayer
                    autoplay={true}
                    style={{ display: ready ? 'inline-block' : 'none' }}
                    lottieRef={lottieRef}
                    src={src}
                    onEvent={(event) => {
                        if (event === PlayerEvents.Ready) {
                            setReady(true)
                        }
                    }}
                    className="size-8"
                />
            )}
            {!ready && <PlaceholderIcon />}
        </>
    )
}

const ProductNavButtons = ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) => {
    return (
        <div className="flex space-x-1 absolute top-2 right-2">
            <button
                className="flex items-start gap-1 text-sm font-medium click rounded-md px-1.5 py-0.5 transition-all w-full border border-b-3 border-light dark:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all"
                onClick={onPrev}
            >
                <IconArrowLeft className="size-5" />
            </button>
            <button
                className="flex items-start gap-1 text-sm font-medium click rounded-md px-1.5 py-0.5 transition-all w-full border border-b-3 border-light dark:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all"
                onClick={onNext}
            >
                <IconArrowRight className="size-5" />
            </button>
        </div>
    )
}

const ProductDetails = ({ product, onNext, onPrev }: { product: Product; onNext: () => void; onPrev: () => void }) => {
    const { name, description, features, Images, Icon, color, colorDark, pricingKey, pricing, badge, lottieSrc } =
        product
    const products = useProducts()
    const billingData = products.products.find((billingProduct) => billingProduct.type === pricingKey)
    const lottieRef = useRef()

    return (
        <div className="@container bg-white dark:bg-accent-dark border border-border dark:border-dark md:max-w-[700px] w-full overflow-hidden">
            <div className="px-6 pt-6 relative">
                <ProductNavButtons onNext={onNext} onPrev={onPrev} />
                <h2 className="text-xl m-0 flex space-x-2 items-center">
                    {lottieSrc ? (
                        <Lottie
                            lottieRef={lottieRef}
                            src={lottieSrc}
                            PlaceholderIcon={() => (
                                <Icon
                                    className={`!m-0 size-8 text-${color} ${colorDark ? `dark:text-${colorDark}` : ''}`}
                                />
                            )}
                        />
                    ) : (
                        <Icon className={`size-8 text-${color} ${colorDark ? `dark:text-${colorDark}` : ''}`} />
                    )}

                    <span>{name}</span>
                    {badge && (
                        <span className="bg-accent dark:bg-accent-dark rounded-md px-2 py-1 text-sm">{badge}</span>
                    )}
                </h2>
                {description && <p className="text-sm opacity-70 ml-10">{description}</p>}
                {Images && (
                    <div className="-mb-32 h-[350px] relative">
                        <div className="absolute inset-0 w-full h-full">
                            <Images />
                        </div>
                    </div>
                )}
            </div>
            {features?.length > 0 && (
                <ul className="grid @xs:grid-cols-2 @2xl:grid-cols-3 gap-x-4 gap-y-2 @xl:gap-x-8 list-none px-6 py-6 border-t border-border dark:border-dark relative bg-accent dark:bg-accent-dark">
                    {features?.map(({ title, Icon }) => (
                        <li key={title} className="flex items-start space-x-2 text-base font-semibold">
                            <div className="size-8 bg-border dark:bg-border-dark rounded-md p-1 flex items-center justify-center">
                                <Icon className="size-5" />
                            </div>
                            <span className="mt-1.5 text-sm">{title}</span>
                        </li>
                    ))}
                </ul>
            )}
            {(billingData || pricing) && (
                <div className="grid md:grid-cols-3 md:gap-0 gap-2 p-6 border-t border-border dark:border-dark bg-accent dark:bg-accent-dark relative">
                    <div>
                        <h3 className="text-sm opacity-60 font-semibold m-0">Monthly free tier</h3>
                        {pricing?.FreeTier ? (
                            <pricing.FreeTier />
                        ) : (
                            <p className="text-sm text-green font-bold m-0">
                                {numberToWords(billingData?.freeLimit)} {billingData?.billingData.unit}s
                            </p>
                        )}
                    </div>
                    <div>
                        <h3 className="text-sm opacity-60 font-semibold m-0">Starts at</h3>
                        {pricing?.StartsAt ? (
                            <pricing.StartsAt />
                        ) : (
                            <p className="text-sm m-0">
                                <strong>${billingData?.startsAt}</strong>
                                <span className="opacity-60">/{billingData?.billingData.unit}</span>
                            </p>
                        )}
                    </div>
                    <div className="md:ml-auto">
                        <CallToAction type="outline" size="sm" to={pricing?.cta?.url || '/pricing'}>
                            {pricing?.cta?.text || 'Explore'}
                        </CallToAction>
                    </div>
                </div>
            )}
        </div>
    )
}

const ProductModal = ({
    children,
    setProductModalOpen,
    productModalOpen,
}: {
    children: React.ReactNode
    setProductModalOpen: (open: boolean) => void
    productModalOpen: boolean
}) => {
    const [isBrowser, setIsBrowser] = useState(false)

    useEffect(() => {
        setIsBrowser(true)
    }, [])

    if (!isBrowser) {
        return null
    }

    return ReactDOM.createPortal(
        <AnimatePresence>
            {productModalOpen && (
                <motion.div
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: '0%' }}
                    exit={{ translateY: '100%' }}
                    transition={{ type: 'tween' }}
                    className="fixed bottom-[75.75px] md:bottom-0 md:hidden left-0 z-[999999] flex items-end justify-center h-full w-full"
                    onClick={() => setProductModalOpen(false)}
                >
                    <div className="relative w-full" onClick={(e) => e.stopPropagation()}>
                        <div>
                            <button
                                onClick={() => setProductModalOpen(false)}
                                className="absolute top-4 right-4 hover:opacity-100 opacity-70 transition-opacity"
                            >
                                <IconX className="size-5" />
                            </button>
                        </div>
                        <div className="max-h-[70vh] overflow-y-auto">{children}</div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    )
}

const sorted = ['Product', 'Marketing', 'Support', 'Sales', 'AI', 'Data', 'Engineering']

const ProductButton = ({
    type,
    products,
    activeProduct,
    activeStatus,
    setActiveProduct,
    setProductModalOpen,
}: {
    type: string
    products: Product[]
    activeProduct: Product | null
    activeStatus: string
    setActiveProduct: (product: Product) => void
    setProductModalOpen: (open: boolean) => void
}) => {
    return (
        <>
            <p className="text-sm opacity-70 m-0 mb-1 px-3">{type}</p>
            <ul className="list-none m-0 p-0 space-y-px">
                {products.map((product) => {
                    const { Icon, name, color, colorDark, status } = product
                    const active = activeProduct?.name === product.name
                    const isInActiveStatus = activeStatus === 'All products' || activeStatus === status
                    const statusColor = legend.find(
                        (legend) => legend.name.toLowerCase() === status.toLowerCase()
                    )?.color
                    return (
                        <li key={name}>
                            <button
                                className={`flex items-start gap-1 text-sm font-medium click rounded-md px-3 py-1.5 transition-all w-full 
                        border border-b-3 border-transparent hover:border-light dark:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all
                        ${active ? 'md:!border-light md:dark:!border-dark md:!bg-accent md:dark:!bg-accent-dark' : ''}
                        ${isInActiveStatus ? '' : 'opacity-30'} ${status === 'Roadmap' ? 'italic' : ''}`}
                                onClick={() => {
                                    setActiveProduct(product)
                                    if (window.innerWidth < 768) {
                                        setProductModalOpen(true)
                                    }
                                }}
                                onFocus={(e) => {
                                    if (e.type === 'focus' && !e.currentTarget.matches(':focus-visible')) {
                                        return
                                    }
                                    setActiveProduct(product)
                                }}
                            >
                                <Icon className={`size-5 text-${color} ${colorDark ? 'dark:text-${colorDark}' : ''}`} />
                                <div className="text-left">
                                    <span className="text-left">{name}</span>
                                    <span
                                        className={`inline-block mt-1.5 ml-1 size-2 bg-${statusColor} rounded-full`}
                                    />
                                </div>
                            </button>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
export default function Hero(): JSX.Element {
    const { staticRoadmaps } = useStaticQuery(graphql`
        {
            staticRoadmaps: allSqueakRoadmap {
                nodes {
                    githubPages {
                        reactions {
                            total_count
                        }
                    }
                    squeakId
                }
            }
        }
    `)

    const [productModalOpen, setProductModalOpen] = useState(false)
    const [activeStatus, setActiveStatus] = useState<string>('All products')
    const groupedProducts = useMemo(() => {
        const groupedProducts: { [key: string]: Product[] } = {}

        products.forEach((product) => {
            product.types.forEach((type) => {
                if (!groupedProducts[type]) {
                    groupedProducts[type] = []
                }
                groupedProducts[type].push({
                    ...product,
                    roadmap: staticRoadmaps.nodes.find((roadmap) => roadmap.squeakId === product.roadmapID),
                })
            })
        })
        return [...Object.entries(groupedProducts)].sort(
            ([typeA], [typeB]) => sorted.indexOf(typeA) - sorted.indexOf(typeB)
        )
    }, [])
    const [activeProduct, setActiveProduct] = useState<Product | null>(groupedProducts[0][1][0])

    const handleNext = () => {
        const products = groupedProducts
            .flatMap(([_type, products]) => products)
            .filter((product) => activeStatus === 'All products' || activeStatus === product.status)
        const nextIndex = products.findIndex((product) => product === activeProduct) + 1
        setActiveProduct(products[nextIndex] || products[0])
    }

    const handlePrev = () => {
        const products = groupedProducts
            .flatMap(([_type, products]) => products)
            .filter((product) => activeStatus === 'All products' || activeStatus === product.status)
        const prevIndex = products.findIndex((product) => product === activeProduct) - 1
        setActiveProduct(products[prevIndex] || products[products.length - 1])
    }

    const checkMobile = () => {
        const isMobile = window.innerWidth < 768
        setActiveProduct(isMobile ? null : groupedProducts[0][1][0])
    }

    useEffect(() => {
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        if (activeStatus !== 'All products' && activeProduct?.status !== activeStatus) {
            const newActiveProduct = groupedProducts
                .flatMap(([_type, products]) => products)
                .find((product) => product.status === activeStatus)
            setActiveProduct(newActiveProduct || groupedProducts[0][1][0])
        }
    }, [activeStatus])

    return (
        <section className="max-w-screen-2xl mx-auto py-12 md:px-4">
            <div>
                <Slider
                    activeIndex={filters.findIndex(({ name }) => name === activeStatus)}
                    className="max-w-screen px-5 md:px-0 overflow-x-auto flex space-x-4 m-0 p-0 list-none mb-6 border-b border-border dark:border-dark"
                >
                    {filters.map(({ name, color }) => {
                        const active = activeStatus === name
                        return (
                            <div className="relative" key={name}>
                                <button
                                    className={`text-[15px] font-semibold flex space-x-2 items-center px-3 py-1 whitespace-nowrap ${
                                        active ? 'font-bold' : 'opacity-75 hover:opacity-100'
                                    }`}
                                    onClick={() => setActiveStatus(name)}
                                    onFocus={(e) => {
                                        if (e.type === 'focus' && !e.currentTarget.matches(':focus-visible')) {
                                            return
                                        }
                                        setActiveStatus(name)
                                    }}
                                >
                                    <span>{name}</span>
                                    {color && <span className={`size-2 bg-${color} rounded-full`} />}
                                </button>
                                {active && (
                                    <span className="h-0.5 bg-red w-full absolute bottom-0 translate-y-1/2 left-0" />
                                )}
                            </div>
                        )
                    })}
                </Slider>
            </div>
            <div className="flex px-2 md:px-0 md:space-x-6 items-start">
                <ul className="flex-1 grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-2 gap-y-6 lg:gap-y-8 md:gap-4 list-none m-0 p-0 flex-grow flex-shrink-0">
                    {groupedProducts.map(([type, products]) =>
                        type === 'Sales' ? null : (
                            <li key={type}>
                                <ProductButton
                                    type={type}
                                    products={products}
                                    activeProduct={activeProduct}
                                    activeStatus={activeStatus}
                                    setActiveProduct={setActiveProduct}
                                    setProductModalOpen={setProductModalOpen}
                                />
                                {type === 'Support' ? (
                                    <div className="mt-2">
                                        <ProductButton
                                            type={'Sales'}
                                            products={groupedProducts.find(([type]) => type === 'Sales')[1]}
                                            activeProduct={activeProduct}
                                            activeStatus={activeStatus}
                                            setActiveProduct={setActiveProduct}
                                            setProductModalOpen={setProductModalOpen}
                                        />
                                    </div>
                                ) : null}
                            </li>
                        )
                    )}
                </ul>
                <div className="hidden md:block flex-[0_0_550px]">
                    {activeProduct && (
                        <div>
                            {activeProduct.roadmapID ? (
                                <RoadmapProductDetails
                                    product={activeProduct}
                                    onNext={handleNext}
                                    onPrev={handlePrev}
                                />
                            ) : (
                                <ProductDetails onNext={handleNext} onPrev={handlePrev} product={activeProduct} />
                            )}
                        </div>
                    )}
                </div>

                {productModalOpen && activeProduct && (
                    <MenuContainer
                        onClose={() => setProductModalOpen(false)}
                        backgroundClassName="top-auto bottom-[75px]"
                        cardContainerClassName="top-auto bottom-[75px]"
                    >
                        {activeProduct.roadmapID ? (
                            <RoadmapProductDetails product={activeProduct} onNext={handleNext} onPrev={handlePrev} />
                        ) : (
                            <ProductDetails onNext={handleNext} onPrev={handlePrev} product={activeProduct} />
                        )}
                    </MenuContainer>
                )}
            </div>
        </section>
    )
}

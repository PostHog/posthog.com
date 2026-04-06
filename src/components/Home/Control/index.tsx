import React, { useEffect, useState } from 'react'
import Link from 'components/Link'
import { IconArrowRight, IconInfo } from '@posthog/icons'
import {
    Digit0,
    Digit1,
    Digit2,
    Digit3,
    Digit4,
    Digit5,
    Digit6,
    Digit7,
    Digit8,
    Digit9,
    DigitDash,
} from 'components/OSIcons'
import OSButton from 'components/OSButton'
import useProduct from 'hooks/useProduct'
import { JsxComponentDescriptor } from '@mdxeditor/editor'
import Logo from 'components/Logo'
import { useApp } from '../../../context/App'
import { useWindow } from '../../../context/Window'
import MDXEditor from 'components/MDXEditor'
import { graphql, useStaticQuery } from 'gatsby'
import SEO from 'components/seo'
import usePostHog from 'hooks/usePostHog'
import Tooltip from 'components/RadixUI/Tooltip'
import { APP_COUNT } from '../../../constants'
import { CallToAction } from 'components/CallToAction'
import { ToggleGroup, ToggleOption } from 'components/RadixUI/ToggleGroup'
import ProductTabs from 'components/ProductTabs'
import IntegrationPrompt from 'components/IntegrationPrompt'
import { motion } from 'framer-motion'
import { RenderInClient } from 'components/RenderInClient'
import { Customers, getSharedDescriptors } from '../shared'

const AppCount = () => {
    return (
        <span className="flex items-center gap-1">
            <Link to="/products">Browse app library</Link>
            <span>({APP_COUNT})</span>
        </span>
    )
}

const Tagline = () => (
    <p className="text-base font-medium">We make dev tools that help product engineers build successful products.</p>
)

const CTAs = () => {
    const [showIntegrationPrompt, setShowIntegrationPrompt] = useState(false)
    return (
        <div>
            <div className="flex flex-col @xs:flex-row @xs:justify-center @xl:justify-start gap-3 @sm:gap-2">
                <CallToAction
                    to="https://app.posthog.com/signup"
                    size="md"
                    state={{ newWindow: true, initialTab: 'signup' }}
                >
                    Get started - free
                </CallToAction>
                <CallToAction type="secondary" size="md" onClick={() => setShowIntegrationPrompt(true)}>
                    Install with AI
                </CallToAction>
            </div>
            <motion.div
                className="overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: showIntegrationPrompt ? 'auto' : 0 }}
            >
                <div
                    data-scheme="secondary"
                    className="mt-4 p-4 border border-primary rounded-md bg-primary [&_h3]:mt-0 [&_ul]:mb-0 [&_ul]:p-0"
                >
                    <IntegrationPrompt />
                </div>
            </motion.div>
            <p className="mt-4">
                Questions?{' '}
                <Link to="/demo" className="font-semibold underline">
                    Watch a demo
                </Link>{' '}
                or{' '}
                <Link to="/talk-to-a-human" className="font-semibold underline">
                    talk to a human
                </Link>
                .
            </p>
        </div>
    )
}

const HomeHitCounter = () => {
    const [hitCount, setHitCount] = useState<number | null>(null)

    useEffect(() => {
        fetch(`/api/homepage-hits`)
            .then((res) => res.json())
            .then((count) => setHitCount(count))
            .catch((err) => console.error(err))
    }, [])

    const formatCount = (count: number) => {
        return count.toString().padStart(7, '0')
    }

    const getDigitComponent = (digit: string) => {
        const digitComponents: { [key: string]: React.ComponentType<any> } = {
            '0': Digit0,
            '1': Digit1,
            '2': Digit2,
            '3': Digit3,
            '4': Digit4,
            '5': Digit5,
            '6': Digit6,
            '7': Digit7,
            '8': Digit8,
            '9': Digit9,
        }
        return digitComponents[digit] || Digit0
    }

    return (
        <div className="flex flex-col justify-center text-center mt-20">
            <p className="mb-2">Thanks for being visitor number</p>
            <Tooltip
                trigger={
                    <div className="inline-flex bg-black divide-x divide-primary">
                        {hitCount !== null ? (
                            formatCount(hitCount)
                                .split('')
                                .map((digit, index) => {
                                    const DigitComponent = getDigitComponent(digit)
                                    return (
                                        <div
                                            key={index}
                                            className="max-w-7 max-h-8 flex items-center justify-center p-1.5"
                                        >
                                            <DigitComponent className="text-[#00FF00] w-full h-full" />
                                        </div>
                                    )
                                })
                        ) : (
                            <div className="flex gap-0">
                                {[...Array(7)].map((_, index) => (
                                    <div
                                        key={index}
                                        className="w-7 max-h-8 flex items-center justify-center text-red p-1.5 border-l border-primary"
                                    >
                                        <DigitDash className="text-red w-full h-full" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                }
                delay={0}
            >
                Total hit count to posthog.com
            </Tooltip>
        </div>
    )
}

const productCategories = [
    {
        name: 'Analytics',
        handles: [
            'web_analytics',
            'revenue_analytics',
            'trenationaldesignstudio',
            'funnels',
            'user_paths',
            'lifecycle',
            'retention',
            'stickiness',
            'correlation_analysis',
            'group_analytics',
        ],
    },
    {
        name: 'Data stack',
        handles: ['data_warehouse', 'cdp', 'data_in', 'sql_editor', 'bi', 'data_modeling', 'data_out'],
    },
    {
        name: 'Feature development',
        handles: [
            'posthog_code',
            'feature_flags',
            'workflows_emails',
            'webhooks',
            'endpoints',
            'product_tours',
            'early_access',
        ],
    },
    {
        name: 'Debugging & analysis',
        handles: ['session_replay', 'heatmaps', 'error_tracking', 'logs', 'profiles'],
    },
    {
        name: 'AI tools',
        handles: ['llm_traces', 'llm_generations', 'llm_evals'],
    },
    {
        name: 'Feedback & testing',
        handles: ['experiments', 'surveys', 'no_code_ab_testing', 'messaging', 'support', 'user_interviews'],
    },
    {
        name: 'Tools',
        handles: ['posthog_ai', 'dashboards', 'activity', 'notebooks'],
    },
]

const MAX_VISIBLE_ITEMS = 7
const TRUNCATED_VISIBLE = 6

const StatusDot = ({ status }: { status?: string }) => {
    if (!status) return null

    const isBeta = status === 'beta'
    const isAlpha = status === 'private alpha' || status === 'alpha' || status === 'WIP'

    if (!isBeta && !isAlpha) return null

    const dotColor = isBeta ? 'bg-yellow' : 'bg-red'
    const label = isBeta ? 'Beta' : 'Alpha'

    return (
        <Tooltip
            trigger={<span className={`inline-block size-2 rounded-full ${dotColor} shrink-0`} />}
            delay={0}
            side="top"
        >
            <span className="text-sm">{label}</span>
        </Tooltip>
    )
}

const ProductCategoryItem = ({
    product,
}: {
    product: { name: string; handle: string; slug?: string; color?: string; Icon?: any; status?: string }
}) => {
    const hasLink = !!product.slug
    const icon = product.Icon ? (
        <product.Icon className={`size-4 shrink-0 ${!hasLink ? 'text-muted' : `text-${product.color || 'gray'}`}`} />
    ) : null

    const content = (
        <span className="flex items-center gap-1.5 py-0.5">
            {icon}
            <span className={!hasLink ? 'text-muted' : ''}>{product.name}</span>
            <StatusDot status={product.status} />
        </span>
    )

    if (!hasLink) {
        return <span className="text-sm cursor-default">{content}</span>
    }

    return (
        <Link
            to={`/${product.slug}`}
            state={{ newWindow: true }}
            className="text-sm text-primary hover:text-primary !font-normal !no-underline hover:!underline"
            data-attr="product-grid-item"
        >
            {content}
        </Link>
    )
}

const ProductCategoryColumn = ({
    category,
    allProducts,
}: {
    category: { name: string; handles: string[] }
    allProducts: any[]
}) => {
    const [expanded, setExpanded] = useState(false)

    const products = category.handles.map((handle) => allProducts.find((p: any) => p.handle === handle)).filter(Boolean)

    const needsTruncation = products.length > MAX_VISIBLE_ITEMS
    const visibleProducts = needsTruncation && !expanded ? products.slice(0, TRUNCATED_VISIBLE) : products
    const remainingCount = products.length - TRUNCATED_VISIBLE

    return (
        <div className="flex flex-col gap-0.5">
            <h3 className="text-sm font-normal text-secondary !tracking-normal m-0 mb-1">{category.name}</h3>
            {visibleProducts.map((product: any) => (
                <ProductCategoryItem key={product.handle} product={product} />
            ))}
            {needsTruncation && !expanded && (
                <button
                    onClick={() => setExpanded(true)}
                    className="text-sm text-secondary hover:text-primary font-medium text-left py-0.5 flex items-center gap-1.5 cursor-pointer"
                >
                    <span className="size-4 shrink-0 flex items-center justify-center text-secondary text-xs font-bold">
                        &bull;&bull;&bull;
                    </span>
                    {remainingCount} more
                </button>
            )}
        </div>
    )
}

const ProductCategoryGrid = () => {
    const allProducts = useProduct() as any[]

    return (
        <div className="product-section-test @container mb-12">
            <div className="grid grid-cols-2 @xl:grid-cols-3 @3xl:grid-cols-4 gap-x-6 gap-y-8">
                {productCategories.map((category) => (
                    <ProductCategoryColumn key={category.name} category={category} allProducts={allProducts} />
                ))}
            </div>
        </div>
    )
}

const ProductsSectionControl = () => (
    <>
        <header className="flex flex-col items-center @xl:flex-row @xl:justify-between @xl:items-baseline [&_h2]:m-0 mt-10 mb-4">
            <h2 className="m-0 tracking-tight">
                Explore apps{' '}
                <span className="text-secondary text-sm font-normal tracking-normal">by company stage</span>
            </h2>
            <aside className="hidden @xl:inline-flex">
                <span>
                    <Link to="/products" state={{ newWindow: true }}>
                        Browse app library
                    </Link>{' '}
                    ({APP_COUNT})
                </span>
            </aside>
        </header>
        <CompanyStageTabs />
    </>
)

const ProductsSectionTest = () => (
    <>
        <header className="product-section-test flex flex-col items-center @xl:flex-row @xl:justify-between @xl:items-baseline [&_h2]:m-0 mt-10 mb-4">
            <h2 className="m-0 tracking-tight">Products</h2>
            <Link
                to="/products"
                state={{ newWindow: true }}
                className="text-sm font-semibold flex items-center gap-0.5"
            >
                Explore all products <IconArrowRight className="size-4" />
            </Link>
        </header>
        <ProductCategoryGrid />
    </>
)

const ProductsSection = () => {
    const posthog = usePostHog()
    return (
        <RenderInClient
            placeholder={<ProductsSectionControl />}
            render={() =>
                posthog?.getFeatureFlag?.('homepage-product-groupings', { fresh: true }) === 'experiment' ? (
                    <ProductsSectionTest />
                ) : (
                    <ProductsSectionControl />
                )
            }
        />
    )
}

const CompanyStageTabs = () => {
    const [selectedStage, setSelectedStage] = React.useState('growth')

    const companyStageOptions: ToggleOption[] = [
        {
            label: (
                <span>
                    Startup<span className="hidden @lg:inline"> / Side project</span>
                </span>
            ),
            value: 'startup',
        },
        {
            label: 'Growth',
            value: 'growth',
        },
        {
            label: 'Scale',
            value: 'scale',
        },
    ]

    return (
        <>
            <ToggleGroup
                hideTitle
                title="Company stage"
                options={companyStageOptions}
                onValueChange={setSelectedStage}
                value={selectedStage}
                className="mb-2"
            />

            {selectedStage === 'startup' && (
                <div className="flex flex-col gap-2">
                    <ProductTabs
                        productHandles={[
                            'web_analytics',
                            'session_replay',
                            'product_analytics',
                            'feature_flags',
                            'error_tracking',
                            'surveys',
                            'llm_analytics',
                        ]}
                    />
                </div>
            )}
            {selectedStage === 'growth' && (
                <div className="flex flex-col gap-2">
                    <ProductTabs
                        productHandles={[
                            'posthog_ai',
                            'session_replay',
                            'web_analytics',
                            'product_analytics',
                            'error_tracking',
                            'experiments',
                            'feature_flags',
                            'logs',
                            'cdp',
                            'workflows_emails',
                        ]}
                    />
                </div>
            )}
            {selectedStage === 'scale' && (
                <div className="flex flex-col gap-2">
                    <ProductTabs
                        productHandles={[
                            'data_warehouse',
                            'cdp',
                            'dashboards',
                            'product_analytics',
                            'experiments',
                            'feature_flags',
                            'error_tracking',
                        ]}
                        selectedStage="scale"
                    />
                </div>
            )}
        </>
    )
}

const Button = ({ url, children }: { url: string; children: React.ReactNode }) => {
    return (
        <OSButton asLink to={url} variant="secondary" size="md" state={{ newWindow: true }}>
            {children}
        </OSButton>
    )
}

const jsxComponentDescriptors: JsxComponentDescriptor[] = [
    { name: 'Tagline', kind: 'flow', props: [], Editor: () => <Tagline /> },
    { name: 'AppCount', kind: 'flow', props: [], Editor: () => <AppCount /> },
    { name: 'CompanyStageTabs', kind: 'flow', props: [], Editor: () => <CompanyStageTabs /> },
    { name: 'ProductsSection', kind: 'flow', props: [], Editor: () => <ProductsSection /> },
    { name: 'CTAs', kind: 'flow', props: [], Editor: () => <CTAs /> },
    { name: 'HomeHitCounter', kind: 'flow', props: [], Editor: () => <HomeHitCounter /> },
    { name: 'Customers', kind: 'flow', props: [], Editor: () => <Customers /> },
    {
        name: 'Logo',
        kind: 'flow',
        props: [],
        Editor: () => {
            const { siteSettings } = useApp()
            return <Logo className="inline-block" fill={siteSettings.theme === 'dark' ? 'white' : undefined} />
        },
    },
    {
        name: 'ButtonDataStack',
        kind: 'flow',
        props: [],
        Editor: () => <Button url="/data-stack">README: PostHog data stack.md</Button>,
    },
    { name: 'ButtonPricing', kind: 'flow', props: [], Editor: () => <Button url="/pricing">Explore pricing</Button> },
    { name: 'ButtonAI', kind: 'flow', props: [], Editor: () => <Button url="/ai">Learn about PostHog AI</Button> },
    { name: 'ButtonAbout', kind: 'flow', props: [], Editor: () => <Button url="/about">Read more about us</Button> },
    { name: 'HeroCarousel', kind: 'flow', props: [], Editor: () => <ProductsSection /> },
    { name: 'HeroImage', kind: 'flow', props: [], Editor: () => null },
    ...getSharedDescriptors(),
]

export default function Home() {
    const data = useStaticQuery(graphql`
        query {
            homepageMdx: mdx(fileAbsolutePath: { regex: "/contents/index\\.mdx/" }) {
                rawBody
                mdxBody: body
            }
        }
    `)
    const rawBody = data?.homepageMdx?.rawBody
    const mdxBody = data?.homepageMdx?.mdxBody
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()
    const posthog = usePostHog()

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'home.mdx')
        }
    }, [])

    return (
        <>
            <SEO
                title="PostHog – We make dev tools for product engineers"
                updateWindowTitle={false}
                description="All your developer tools in one place. PostHog gives engineers everything to build, test, measure, and ship successful products faster. Get started free."
                image="/images/og/default.png"
            />
            <MDXEditor
                jsxComponentDescriptors={jsxComponentDescriptors}
                body={rawBody}
                mdxBody={mdxBody}
                maxWidth={900}
                cta={{
                    url: `https://${
                        posthog?.isFeatureEnabled?.('direct-to-eu-cloud') ? 'eu' : 'app'
                    }.posthog.com/signup`,
                    label: 'Get started - free',
                }}
            />
        </>
    )
}

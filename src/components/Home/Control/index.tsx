import React, { useEffect, useState } from 'react'
import Link from 'components/Link'
import OSTable from 'components/OSTable'
import { useCustomers } from 'hooks/useCustomers'
import CTA from 'components/Home/CTA'
import { IconArrowRight, IconArrowUpRight, IconInfo, IconRefresh } from '@posthog/icons'
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
import Roadmap from 'components/Home/New/Roadmap'
import Pricing from 'components/Home/New/Pricing'
import OSButton from 'components/OSButton'
import useProduct from 'hooks/useProduct'
import { Accordion } from 'components/RadixUI/Accordion'
import { JsxComponentDescriptor } from '@mdxeditor/editor'

import Logo from 'components/Logo'
import { useApp } from '../../../context/App'
import { useWindow } from '../../../context/Window'
import MDXEditor from 'components/MDXEditor'
import { graphql, useStaticQuery } from 'gatsby'
import SEO from 'components/seo'
import usePostHog from 'hooks/usePostHog'
import Tooltip from 'components/RadixUI/Tooltip'
import { PRODUCT_COUNT, APP_COUNT } from '../../../constants'
import Start from 'components/Start'
import { CallToAction } from 'components/CallToAction'
import { ToggleGroup, ToggleOption } from 'components/RadixUI/ToggleGroup'
import ProductTabs from 'components/ProductTabs'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import CloudinaryImage from 'components/CloudinaryImage'
import HeroCarousel from 'components/Home/HeroCarousel'
import IntegrationPrompt from 'components/IntegrationPrompt'
import { motion } from 'framer-motion'
import SmallTeam from 'components/SmallTeam'
import { RenderInClient } from 'components/RenderInClient'
import WizardCommand from 'components/WizardCommand'
interface ProductButtonsProps {
    productTypes: string[]
    className?: string
    beta?: boolean
}

const ProductButtons: React.FC<ProductButtonsProps> = ({ productTypes, className = '', beta = false }) => {
    const allProducts = useProduct()

    // Helper to get product by handle
    const getProduct = (handle: string) =>
        Array.isArray(allProducts) ? allProducts.find((p: any) => p.handle === handle) : undefined

    return (
        <span className={`flex flex-wrap gap-1 pt-1 ${className}`}>
            {productTypes.map((type, index) => {
                const product = getProduct(type)
                return product ? (
                    <OSButton
                        key={type}
                        icon={product.Icon ? <product.Icon /> : undefined}
                        iconClassName={`text-${product.color}`}
                        color={product.color}
                        className="font-medium text-primary hover:text-primary"
                        to={`/${product.slug}`}
                        state={{ newWindow: true }}
                        asLink
                    >
                        {product.name}
                        {beta && <span className="text-xs opacity-50">beta</span>}
                    </OSButton>
                ) : null
            })}
        </span>
    )
}

const HomeHappyHog = () => {
    return (
        <img
            src="https://res.cloudinary.com/dmukukwp6/image/upload/happy_hog_ebc59e4658.png"
            alt="happy hog"
            className="@xl:float-right @xl:ml-2 max-w-[400px] max-h-48 -mt-2 -mr-2"
        />
    )
}

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

const COL1 = [
    'ycombinator',
    'airbus',
    'ukgovt',
    'nationaldesignstudio',
    'trust',
    'lovable',
    'startengine',
    'researchgate',
    'heygen',
]

const COL2 = [
    'supabase',
    'mistralai',
    'elevenlabs',
    'convex',
    'hasura',
    'exa',
    'raycast',
    'resend',
    'greptile',
    'wisprflow',
    'posthog',
]

const companyBreakdowns = {
    VCsLoveThem: { col1: 'VCs love them', col2: 'Product engineers love them' },
    colorful: { col1: 'Colorful logos', col2: '"Sleek" logos' },
    hardware: { col1: 'Hardware companies', col2: 'Not hardware companies' },
    planes: { col1: 'Builds planes', col2: "Doesn't build planes (yet)" },
    highValue: { col1: "Companies with >1 $B's in their valuations", col2: 'Everyone else (for now)' },
    caseStudy: { col1: 'Companies with PostHog case studies', col2: 'Companies who should do case studies' },
    easyToYell: { col1: 'Names you can yell easily', col2: 'Names that require breath control' },
    goodBandName: { col1: 'Good band names', col2: 'Could be mistaken for pharmaceuticals' },
    explainable: {
        col1: 'Companies you can explain to your parents',
        col2: 'Companies your parents will never understand',
    },
    shortNames: { col1: 'Names with 7 letters or less', col2: 'Names you can easily mistype' },
    realWords: { col1: 'Real words', col2: 'Not real words' },
    american: { col1: 'Founded in America', col2: 'Not founded in America' },
    pokemon: { col1: 'Could be a Pokémon', col2: 'Could be a Bond Villain' },
    arr: { col1: 'Measured in ARR', col2: 'Measured in GDP' },
    devTool: { col1: 'Trendy devtool', col2: 'Trendy, but not a devtool' },
}

const companyAttributes = {
    VCsLoveThem: [
        'ycombinator',
        'airbus',
        // "elevenlabs",
        // 'convex',
        'nationaldesignstudio',
        'ukgovt',
        'trust',
        'lovable',
        // "supabase",
        // "hasura",
        'startengine',
        // "mistralai",
        // "raycast",
        // "resend",
        'researchgate',
        // 'exa',
        'heygen',
        // 'greptile',
        // 'wisprflow',
        // "posthog"
    ],
    colorful: [
        'ycombinator',
        // "airbus",
        // "elevenlabs",
        'convex',
        'trust',
        'lovable',
        'supabase',
        // "hasura",
        'startengine',
        'mistralai',
        'raycast',
        // 'resend',
        // "researchgate",
        'heygen',
        // 'exa',
        // 'nationaldesignstudio',
        // 'ukgovt',
        // 'wisprflow',
        // 'greptile',
        'posthog',
    ],
    hardware: [
        // "ycombinator",
        'airbus',
        // "elevenlabs",
        // 'convex',
        // "trust",
        // "lovable",
        // "supabase",
        // "hasura",
        // "startengine",
        // "mistralai",
        // "raycast",
        // 'resend',
        // "researchgate",
        // "heygen",
        // 'exa',
        // 'nationaldesignstudio',
        // 'wisprflow',
        // 'greptile',
        'ukgovt',
        'posthog',
    ],
    planes: [
        // "ycombinator",
        'airbus',
        // 'nationaldesignstudio',
        'ukgovt',
        // "elevenlabs",
        // 'convex',
        // "trust",
        // "lovable",
        // "supabase",
        // "hasura",
        // "startengine",
        // "mistralai",
        // "raycast",
        // 'resend',
        // "researchgate",
        // "heygen",
        // 'exa',
        // 'wisprflow',
        // 'greptile',
        // "posthog"
    ],
    highValue: [
        'ukgovt',
        'airbus',
        'elevenlabs',
        // 'convex',
        // "ycombinator",
        'lovable',
        'supabase',
        // 'nationaldesignstudio',
        'hasura',
        // "trust",
        // "startengine",
        'mistralai',
        // "raycast",
        // 'resend',
        // "researchgate",
        // "heygen",
        // 'exa',
        // 'wisprflow',
        // 'greptile',
        // "posthog"
    ],
    caseStudy: [
        'ycombinator',
        // "airbus",
        'elevenlabs',
        // 'convex',
        // "trust",
        'lovable',
        'supabase',
        'hasura',
        // "startengine",
        // "mistralai",
        // "raycast",
        // 'resend',
        'researchgate',
        'exa',
        // "heygen",
        // 'nationaldesignstudio',
        // 'wisprflow',
        // 'greptile',
        // 'ukgovt',
        'posthog',
    ],
    easyToYell: [
        // "ycombinator",
        'airbus',
        // "elevenlabs",
        'trust',
        'convex',
        // "lovable",
        // "supabase",
        // "hasura",
        // "startengine",
        // "mistralai",
        'raycast',
        'resend',
        // "researchgate",
        'exa',
        'heygen',
        'posthog',
        'wisprflow',
        // 'greptile',
        // 'nationaldesignstudio',
        'ukgovt',
    ],
    goodBandName: [
        // "ycombinator",
        'elevenlabs',
        'lovable',
        // "hasura",
        'convex',
        'trust',
        // "airbus",
        // "supabase",
        'startengine',
        // "mistralai",
        'raycast',
        'resend',
        'researchgate',
        //'exa',
        // "heygen",
        'nationaldesignstudio',
        'wisprflow',
        // 'greptile',
        // 'ukgovt',
        'posthog',
    ],
    explainable: [
        'ycombinator',
        'airbus',
        // "trust",
        'lovable',
        // 'convex',
        // "elevenlabs",
        // "supabase",
        // "hasura",
        'startengine',
        // "mistralai",
        // "raycast",
        'researchgate',
        // 'resend',
        'exa',
        'nationaldesignstudio',
        'ukgovt',
        'wisprflow',
        // 'greptile',
        // "heygen",
        // "posthog"
    ],
    shortNames: [
        // "ycombinator",
        'airbus',
        'trust',
        'lovable',
        'convex',
        // "elevenlabs",
        // "supabase",
        'hasura',
        // "startengine",
        // "mistralai",
        'raycast',
        'resend',
        // "researchgate",
        'exa',
        'heygen',
        // 'greptile',
        // 'nationaldesignstudio',
        'wisprflow',
        'ukgovt',
        'posthog',
    ],
    realWords: [
        // "ycombinator",
        'airbus',
        'convex',
        'trust',
        'lovable',
        'elevenlabs',
        // "supabase",
        // "hasura",
        'startengine',
        // "mistralai",
        // "raycast",
        'resend',
        'researchgate',
        //'exa',
        // "heygen",
        'nationaldesignstudio',
        // 'ukgovt',
        // 'greptile',
        'wisprflow',
        'posthog',
    ],
    american: [
        'ycombinator',
        // "airbus",
        // "elevenlabs",
        'convex',
        'trust',
        // "lovable",
        'supabase',
        'hasura',
        'startengine',
        // "mistralai",
        // "raycast",
        'resend',
        'researchgate',
        'exa',
        'heygen',
        'nationaldesignstudio',
        // 'ukgovt',
        'wisprflow',
        'greptile',
        'posthog',
    ],
    pokemon: [
        // "ycombinator",
        // "airbus",
        // "elevenlabs",
        // "trust",
        'lovable',
        'convex',
        'supabase',
        'hasura',
        // "startengine",
        'mistralai',
        'raycast',
        'resend',
        // "researchgate",
        'exa',
        'heygen',
        // 'wisprflow',
        // 'nationaldesignstudio',
        // 'ukgovt',
        'greptile',
        // "posthog"
    ],
    arr: [
        'ycombinator',
        'airbus',
        'elevenlabs',
        'trust',
        'lovable',
        'convex',
        'supabase',
        'hasura',
        'startengine',
        'mistralai',
        'raycast',
        'resend',
        'researchgate',
        'exa',
        'heygen',
        'wisprflow',
        'greptile',
        // 'ukgovt',
        // 'nationaldesignstudio',
        'posthog',
    ],
    devTool: [
        'ycombinator',
        // 'airbus',
        'elevenlabs',
        // 'trust',
        // 'lovable',
        'convex',
        'supabase',
        'hasura',
        // 'startengine',
        'mistralai',
        'raycast',
        'resend',
        // 'researchgate',
        'exa',
        // 'heygen',
        // 'wisprflow',
        'greptile',
        // 'ukgovt',
        // 'nationaldesignstudio',
        'posthog',
    ],
}

interface CustomerProps {
    number: number
    customer: {
        logo?: {
            light: string
            dark: string
        }
        name: string
        toolsUsed?: string[]
        slug: string
        notes?: string
    }
}

const ProductCount = () => {
    return <strong>{PRODUCT_COUNT}+ products</strong>
}

const AppCount = () => {
    return (
        <span className="flex items-center gap-1">
            <Link to="/products">Browse app library</Link>
            <span>({APP_COUNT})</span>
        </span>
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
            // icon: <IconLaptop className="size-5" />,
        },
        {
            label: 'Growth',
            value: 'growth',
            // icon: <IconLaptop className="size-5" />,
        },
        {
            label: 'Scale',
            value: 'scale',
            // icon: <IconLaptop className="size-5" />,
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

const Image = ({ src, className }: { src: string; className?: string }) => {
    return <CloudinaryImage src={src} className={className} />
}

const PageNavigation = () => {
    const [showTableOfContents, setShowTableOfContents] = useState(false)
    return (
        <div className="mb-8">
            {!showTableOfContents && (
                <button
                    className="underline text-sm font-semibold"
                    onClick={() => setShowTableOfContents(!showTableOfContents)}
                >
                    table of contents
                </button>
            )}
            {showTableOfContents && (
                <Accordion
                    defaultValue="table-of-contents"
                    items={[
                        {
                            value: 'table-of-contents',
                            trigger: <strong>Contents</strong>,
                            content: (
                                <div data-scheme="primary">
                                    <ol className="pl-4">
                                        {sections.map((section) => (
                                            <li key={section.title}>
                                                <Link
                                                    to={`/#${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                                                    className="group flex items-center gap-1"
                                                >
                                                    <span>{section.title}</span>
                                                    <IconArrowRight className="inline-block rotate-90 size-3 text-primary opacity-0 group-hover:opacity-100" />
                                                </Link>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            ),
                        },
                    ]}
                />
            )}
        </div>
    )
}

const Customers = () => {
    const { getCustomers, hasCaseStudy } = useCustomers()
    const [currentBreakdown, setCurrentBreakdown] = React.useState('VCsLoveThem')
    const [isAnimating, setIsAnimating] = React.useState(false)
    const logoRefs = React.useRef<Record<string, HTMLElement>>({})
    const { websiteMode } = useApp()

    // Get all companies
    const allCompanies = [...COL1, ...COL2]

    // Get companies in column 1 (those in the breakdown) and column 2 (the rest)
    const companiesInCol1 = companyAttributes[currentBreakdown as keyof typeof companyAttributes] || []
    const companiesInCol2 = allCompanies.filter((company) => !companiesInCol1.includes(company))

    const column1 = getCustomers(companiesInCol1)
    const column2 = getCustomers(companiesInCol2)

    // Helper function to render logo - same logic as CustomersSlide.tsx
    const renderLogo = (customer: any) => {
        if (!customer.logo) {
            return <span className="text-xs">{customer.name}</span>
        }

        // Check if logo is a React component (single SVG format)
        if (typeof customer.logo === 'function') {
            const LogoComponent = customer.logo
            const heightClass = customer.height ? `h-${customer.height - 2}` : 'h-8'
            const className = `w-full fill-current object-contain ${heightClass} `.trim()

            return <LogoComponent className={className} />
        }

        // Otherwise, it's the existing light/dark object format
        const heightClass = customer.height ? `max-h-${customer.height}` : ''

        return (
            <>
                <img
                    src={customer.logo.light}
                    alt={customer.name}
                    className={`h-full w-auto object-contain dark:hidden ${heightClass}`}
                />
                <img
                    src={customer.logo.dark}
                    alt={customer.name}
                    className={`h-full w-auto object-contain hidden dark:block ${heightClass}`}
                />
            </>
        )
    }

    // Toggle function to change breakdown with FLIP animation
    const toggleBreakdown = () => {
        if (isAnimating) return

        // Step 1: Record current positions (First)
        const beforePositions: Record<string, DOMRect> = {}
        Object.keys(logoRefs.current).forEach((slug) => {
            const element = logoRefs.current[slug]
            if (element) {
                beforePositions[slug] = element.getBoundingClientRect()
            }
        })

        setIsAnimating(true)

        // Step 2: Change breakdown (Last)
        const breakdownKeys = Object.keys(companyBreakdowns)
        const currentIndex = breakdownKeys.indexOf(currentBreakdown)
        const availableBreakdowns = breakdownKeys.filter((_, index) => index !== currentIndex)
        const randomIndex = Math.floor(Math.random() * availableBreakdowns.length)
        setCurrentBreakdown(availableBreakdowns[randomIndex])

        // Step 3: Calculate and animate differences (Invert & Play)
        requestAnimationFrame(() => {
            Object.keys(logoRefs.current).forEach((slug) => {
                const element = logoRefs.current[slug]
                if (element && beforePositions[slug]) {
                    const afterPosition = element.getBoundingClientRect()
                    const deltaX = beforePositions[slug].left - afterPosition.left
                    const deltaY = beforePositions[slug].top - afterPosition.top

                    // Apply initial transform (Invert)
                    element.style.transform = `translate(${deltaX}px, ${deltaY}px)`
                    element.style.transition = 'none'

                    // Animate to final position (Play)
                    requestAnimationFrame(() => {
                        element.style.transition = 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)'
                        element.style.transform = 'translate(0, 0)'
                    })
                }
            })

            // Reset animation state
            setTimeout(() => {
                setIsAnimating(false)
                // Clean up transforms
                Object.keys(logoRefs.current).forEach((slug) => {
                    const element = logoRefs.current[slug]
                    if (element) {
                        element.style.transform = ''
                        element.style.transition = ''
                    }
                })
            }, 600)
        })
    }

    const currentLabels = companyBreakdowns[currentBreakdown as keyof typeof companyBreakdowns]
    const columns = [
        { name: currentLabels.col1, width: 'minmax(auto,1fr)', align: 'center' as const },
        { name: currentLabels.col2, width: 'minmax(auto,1fr)', align: 'center' as const },
    ]

    // Helper function to render customer with case study link
    const renderCustomerWithLink = (customer: any) => (
        <div
            key={customer.slug}
            className="inline-block"
            ref={(el: HTMLElement | null) => {
                if (el) logoRefs.current[customer.slug] = el
            }}
        >
            {hasCaseStudy(customer.slug) || customer.slug === 'posthog' ? (
                <OSButton
                    asLink
                    to={customer.slug === 'posthog' ? '/blog/posthog-marketing' : `/customers/${customer.slug}`}
                    state={{ newWindow: true }}
                    className="relative border border-transparent hover:border-primary rounded-sm"
                >
                    {renderLogo(customer)}
                    <Tooltip
                        trigger={
                            <span className="absolute top-1 right-0 inline-flex w-4 h-4 rounded-full bg-red border-2 border-white dark:border-dark"></span>
                        }
                        delay={0}
                        sideOffset={14}
                    >
                        <p className="text-sm mb-0">
                            {customer.slug === 'posthog' ? 'First PostHog customer!' : 'Read customer story'}
                        </p>
                    </Tooltip>
                </OSButton>
            ) : (
                <span className="inline-flex py-1.5 px-2">{renderLogo(customer)}</span>
            )}
        </div>
    )

    const rows = [
        {
            cells: [
                {
                    content: (
                        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center items-center">
                            {column1.map(renderCustomerWithLink)}
                        </div>
                    ),
                    className: '!p-4',
                },
                {
                    content: (
                        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center items-center">
                            {column2.map(renderCustomerWithLink)}
                        </div>
                    ),
                    className: '!p-4',
                },
            ],
        },
    ]

    return (
        <>
            <div className="inline-block">
                <div className="relative @xl:pt-1 pb-2 @xl:pb-0 @4xl:mt-8">
                    <div className="@xl:absolute right-0 -top-8">
                        <OSButton
                            onClick={toggleBreakdown}
                            variant="secondary"
                            size="sm"
                            className="font-semibold [&_span]:min-w-[146px]"
                            disabled={isAnimating}
                        >
                            {isAnimating ? (
                                '🔀 Shuffling...'
                            ) : (
                                <>
                                    <IconRefresh className="size-4 inline-block relative -top-px" /> Shuffle companies
                                </>
                            )}
                        </OSButton>
                    </div>

                    {/* 
            <select
                value={currentBreakdown}
                onChange={(e) => {
                    if (!isAnimating) {
                        // Record positions before change for FLIP animation
                        const beforePositions: Record<string, DOMRect> = {}
                        Object.keys(logoRefs.current).forEach(slug => {
                            const element = logoRefs.current[slug]
                            if (element) {
                                beforePositions[slug] = element.getBoundingClientRect()
                            }
                        })

                        setIsAnimating(true)
                        setCurrentBreakdown(e.target.value)

                        // Apply FLIP animation
                        requestAnimationFrame(() => {
                            Object.keys(logoRefs.current).forEach(slug => {
                                const element = logoRefs.current[slug]
                                if (element && beforePositions[slug]) {
                                    const afterPosition = element.getBoundingClientRect()
                                    const deltaX = beforePositions[slug].left - afterPosition.left
                                    const deltaY = beforePositions[slug].top - afterPosition.top

                                    element.style.transform = `translate(${deltaX}px, ${deltaY}px)`
                                    element.style.transition = 'none'

                                    requestAnimationFrame(() => {
                                        element.style.transition = 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)'
                                        element.style.transform = 'translate(0, 0)'
                                    })
                                }
                            })

                            setTimeout(() => {
                                setIsAnimating(false)
                                Object.keys(logoRefs.current).forEach(slug => {
                                    const element = logoRefs.current[slug]
                                    if (element) {
                                        element.style.transform = ''
                                        element.style.transition = ''
                                    }
                                })
                            }, 600)
                        })
                    }
                }}
                className="px-2 py-1 text-sm border border-primary rounded bg-primary text-primary"
                disabled={isAnimating}
            >
                {Object.entries(companyBreakdowns).map(([key, labels]) => (
                    <option key={key} value={key}>
                        {labels.col1} / {labels.col2}
                    </option>
                ))}
            </select>
             */}
                </div>
                <OSTable columns={columns} rows={rows} size="sm" rowAlignment="top" />
                <OSButton
                    asLink
                    to="/customers"
                    variant="secondary"
                    size="md"
                    className="mt-4"
                    state={{ newWindow: true }}
                >
                    Open customers.mdx
                </OSButton>
            </div>
        </>
    )
}

function TaglineControl(): JSX.Element {
    return (
        <p className="text-base font-medium">
            We make dev tools that help product engineers build successful products.
        </p>
    )
}

function TaglineExperiment(): JSX.Element {
    return (
        <div className="my-4 max-w-[650px]">
            <h1 className="!m-0">
                Make sense of how people use your product – <em>and how to make it better</em>
            </h1>
            <p className="!m-0 !mt-2 font-medium">PostHog has all the tools you need to build great products.</p>
        </div>
    )
}

function Tagline(): JSX.Element {
    const posthog = usePostHog()

    return (
        <RenderInClient
            placeholder={null}
            render={() =>
                posthog?.getFeatureFlag?.('home-tagline') === 'test' ? <TaglineExperiment /> : <TaglineControl />
            }
        />
    )
}

const jsxComponentDescriptors: JsxComponentDescriptor[] = [
    {
        name: 'Tagline',
        kind: 'flow',
        props: [],
        Editor: () => <Tagline />,
    },
    {
        name: 'AppCount',
        kind: 'flow',
        props: [],
        Editor: () => <AppCount />,
    },
    {
        name: 'CompanyStageTabs',
        kind: 'flow',
        props: [],
        Editor: () => <CompanyStageTabs />,
    },
    {
        name: 'ProductsSection',
        kind: 'flow',
        props: [],
        Editor: () => <ProductsSection />,
    },
    {
        name: 'CTAs',
        kind: 'flow',
        props: [],
        Editor: () => <CTAs />,
    },
    {
        name: 'HomeHitCounter',
        kind: 'flow',
        props: [],
        Editor: () => <HomeHitCounter />,
    },
    {
        name: 'Pricing',
        kind: 'flow',
        props: [],
        Editor: () => <Pricing />,
    },
    {
        name: 'Customers',
        kind: 'flow',
        props: [],
        Editor: () => <Customers />,
    },
    {
        name: 'CTA',
        kind: 'flow',
        props: [],
        Editor: () => (
            <>
                <p className="-mt-2">
                    If nothing else has sold you on PostHog, hopefully these classic marketing tactics will.
                </p>
                <CTA headline={false} />
            </>
        ),
    },
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
    {
        name: 'ButtonPricing',
        kind: 'flow',
        props: [],
        Editor: () => <Button url="/pricing">Explore pricing</Button>,
    },
    {
        name: 'ButtonAI',
        kind: 'flow',
        props: [],
        Editor: () => <Button url="/ai">Learn about PostHog AI</Button>,
    },
    {
        name: 'ButtonAbout',
        kind: 'flow',
        props: [],
        Editor: () => <Button url="/about">Read more about us</Button>,
    },
    {
        name: 'ImageDW',
        kind: 'flow',
        props: [],
        Editor: () => (
            <Image
                src="https://res.cloudinary.com/dmukukwp6/image/upload/data_warehouse_2c3928e9ad.png"
                className="max-w-[213px] absolute bottom-[-4px] right-0 rounded-br-sm"
            />
        ),
    },
    {
        name: 'ImageMoney',
        kind: 'flow',
        props: [],
        Editor: () => (
            <Image
                src="https://res.cloudinary.com/dmukukwp6/image/upload/dont_burn_money_28d5861fad.png"
                className="float-right max-w-[120px] @sm:max-w-[200px] ml-2 @sm:ml-4 mb-2 @sm:-mt-4"
            />
        ),
    },
    {
        name: 'ImageReading1',
        kind: 'flow',
        props: [],
        Editor: () => (
            <Image
                src="https://res.cloudinary.com/dmukukwp6/image/upload/reading_at_night_8397c5198c.png"
                className="@md:hidden @xl:block @lg:float-right max-w-full @xl:max-w-xs rotate-1 shadow-2xl rounded border-4 border-white dark:border-primary -mb-2 @lg:mb-2 @lg:ml-4 @lg:-mt-2"
            />
        ),
    },
    {
        name: 'ImageReading2',
        kind: 'flow',
        props: [],
        Editor: () => (
            <Image
                src="https://res.cloudinary.com/dmukukwp6/image/upload/reading_at_night_8397c5198c.png"
                className="hidden @md:block @md:float-right @xl:hidden @md:max-w-60 @xl:max-w-xs @sm:ml-4 @sm:mb-2 rotate-1 shadow-2xl rounded border-4 border-white dark:border-primary"
            />
        ),
    },
    {
        name: 'TooltipDW',
        kind: 'flow',
        props: [],
        Editor: () => (
            <Tooltip
                trigger={
                    <span>
                        <IconInfo className="size-4 inline-block relative -top-px" />
                    </span>
                }
                delay={0}
            >
                <p className="text-sm mb-0">You can also connect your own!</p>
            </Tooltip>
        ),
    },
    {
        name: 'SupportSmallTeamLink',
        kind: 'flow',
        props: [],
        Editor: () => (
            <SmallTeam slug="support" noMiniCrest>
                support folks
            </SmallTeam>
        ),
    },
    {
        name: 'HeroCarousel',
        kind: 'flow',
        props: [],
        Editor: () => <HeroCarousel />,
    },
    {
        name: 'HeroImage',
        kind: 'flow',
        props: [],
        Editor: () => (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/lazy_a2afd552f7.png"
                className="w-64 @2xl:float-right @2xl:ml-4"
            />
        ),
    },
    {
        name: 'FAQ',
        kind: 'flow',
        props: [{ name: 'children', type: 'expression' }],
        Editor: ({ children }: any) => <div>{children}</div>,
    },
    {
        name: 'FAQItem',
        kind: 'flow',
        props: [
            { name: 'trigger', type: 'string' },
            { name: 'children', type: 'expression' },
        ],
        Editor: ({ trigger, children }: any) => (
            <details>
                <summary className="font-bold cursor-pointer">{trigger}</summary>
                {children}
            </details>
        ),
    },
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

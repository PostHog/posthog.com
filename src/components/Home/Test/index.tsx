import React, { useEffect, useRef, useState } from 'react'
import Wizard from 'components/Wizard'
import { CallToAction } from 'components/CallToAction'
import ScrollArea from 'components/RadixUI/ScrollArea'
import Logo from 'components/Logo'
import SEO from 'components/seo'
import OSButton from 'components/OSButton'
import { useApp } from '../../../context/App'
import WistiaVideo, { WistiaVideoRef } from 'components/WistiaVideo'
import { Accordion } from 'components/RadixUI/Accordion'
import useProduct from 'hooks/useProduct'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { JsxComponentDescriptor } from '@mdxeditor/editor'
import MDXEditor from 'components/MDXEditor'
import OSTable from 'components/OSTable'
import { useCustomers } from 'hooks/useCustomers'
import CTA from 'components/Home/CTA'
import { IconCheck, IconCopy, IconInfo, IconRefresh, IconSparkles } from '@posthog/icons'
import Pricing from 'components/Home/New/Pricing'
import Tooltip from 'components/RadixUI/Tooltip'
import { APP_COUNT, getProseClasses, PRODUCT_COUNT } from '../../../constants'
import { ToggleGroup, ToggleOption } from 'components/RadixUI/ToggleGroup'
import ProductTabs from 'components/ProductTabs'
import CloudinaryImage from 'components/CloudinaryImage'
import IntegrationPrompt from 'components/IntegrationPrompt'
import { motion } from 'framer-motion'
import SmallTeam from 'components/SmallTeam'
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
import TVScreen from './TV'
import { IconArrowUpRight } from '@posthog/icons'

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

// Prompts with video IDs, grouped by slide (quotes added during render)
const PROMPTS = [
    { slide: 'analytics', text: 'Why has my traffic decreased?', videoId: 'pmh9dvfgj4' },
    { slide: 'analytics', text: 'Create an SEO/SEM dashboard for my marketing team', videoId: '79pshye67k' },
    { slide: 'analytics', text: 'Find issues with page performance', videoId: '1fxx4escag' },

    { slide: 'replay', text: 'Watch user sessions to find UX issues', videoId: '39pr1b86tw' },
    { slide: 'replay', text: 'Show me recordings of visitors using a feature', videoId: '1bct5lkhxh' },

    { slide: 'feature-flags', text: 'Create a feature flag', videoId: 'lqo8v51lw6' },

    { slide: 'data-warehouse', text: 'Write a SQL query', videoId: 'lw11gbdm03' },
]

// Map slide values to product handles
const SLIDE_TO_PRODUCT: Record<string, string> = {
    analytics: 'product_analytics',
    replay: 'session_replay',
    'feature-flags': 'feature_flags',
    'data-warehouse': 'data_warehouse',
}

// Get prompts with their global indices for dot navigation
const getPromptsForSlide = (slide: string) =>
    PROMPTS.map((p, i) => ({ ...p, globalIndex: i })).filter((p) => p.slide === slide)

// Helper component to use hooks for product data
function ProductTrigger({ handle }: { handle: string }) {
    const product = useProduct({ handle }) as
        | { Icon?: React.ComponentType<{ className?: string }>; color?: string; name?: string }
        | undefined
    const Icon = product?.Icon
    return (
        <div className="flex items-center gap-2">
            {Icon && <Icon className={`size-5 text-${product?.color}`} />}
            <h2 className="!m-0">{product?.name}</h2>
        </div>
    )
}

// Helper component for product name in video caption
function ProductName({ handle }: { handle: string }) {
    const product = useProduct({ handle }) as { name?: string } | undefined
    return <>{product?.name || ''}</>
}

// ============================================
// MDX Component Definitions (copied from main homepage)
// ============================================

const ProductCount = () => {
    return <strong>{PRODUCT_COUNT}+ products</strong>
}

const AppCount = () => {
    return <>{APP_COUNT}</>
}

const CTAs = () => {
    const [showIntegrationPrompt, setShowIntegrationPrompt] = useState(false)
    return (
        <div className="mb-4">
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

const Toolkits = () => {
    const toolkits = [
        {
            category: 'Data stack',
            productTypes: ['cdp', 'data_in', 'visualize', 'data_out'],
        },
        {
            category: 'Analytics & data viz',
            productTypes: [
                'web_analytics',
                'product_analytics',
                'trends',
                'funnels',
                'user_paths',
                'correlation_analysis',
                'retention',
                'stickiness',
                'lifecycle',
                'sql',
                'bi',
                'dashboards',
            ],
        },
        {
            category: 'Product development',
            productTypes: [
                'posthog_ai',
                'session_replay',
                'feature_flags',
                'experiments',
                'error_tracking',
                'llm_analytics',
                'revenue_analytics',
            ],
        },
        {
            category: 'Customer communication & automation',
            productTypes: ['posthog_ai', 'surveys', 'messaging', 'workflows', 'webhooks'],
        },
    ]

    const columns = [
        { name: '', width: 'auto', align: 'center' as const },
        { name: 'Category', width: 'minmax(150px,300px)', align: 'left' as const },
        { name: 'Tools', width: 'minmax(auto,1fr)', align: 'left' as const },
    ]

    const rows = toolkits.map((toolkit, index) => ({
        cells: [
            { content: index + 1 },
            {
                content: (
                    <div className="flex flex-col gap-1">
                        <span>{toolkit.category}</span>
                    </div>
                ),
                className: 'font-bold',
            },
            {
                content: <ProductButtons productTypes={toolkit.productTypes} />,
                className: 'text-sm',
            },
        ],
    }))

    return (
        <div>
            {/* Small container: Stacked card layout */}
            <div className="flex flex-col gap-4 @2xl:hidden">
                {toolkits.map((toolkit, index) => (
                    <div key={index} className="border border-primary">
                        <div className="bg-input px-3 py-2 border-b border-primary">
                            <span className="font-bold text-sm">
                                {index + 1}. {toolkit.category}
                            </span>
                        </div>
                        <div className="px-3 py-2">
                            <ProductButtons productTypes={toolkit.productTypes} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Larger container: Table layout */}
            <div className="hidden @2xl:block">
                <OSTable columns={columns} rows={rows} size="sm" rowAlignment="top" width="full" />
            </div>
        </div>
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
                            'session_replay',
                            'web_analytics',
                            'llm_analytics',
                            'product_analytics',
                            'error_tracking',
                            'experiments',
                            'feature_flags',
                            'surveys',
                            'dashboards',
                            'cdp',
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
    return <CloudinaryImage src={src as `https://res.cloudinary.com/${string}`} className={className} />
}

// Customer constants and breakdowns
const COL1 = ['ycombinator', 'airbus', 'trust', 'lovable', 'startengine', 'researchgate', 'exa', 'heygen']
const COL2 = ['supabase', 'mistralai', 'elevenlabs', 'hasura', 'raycast', 'posthog']

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
}

const companyAttributes = {
    VCsLoveThem: ['ycombinator', 'airbus', 'trust', 'lovable', 'startengine', 'researchgate', 'exa', 'heygen'],
    colorful: ['ycombinator', 'trust', 'lovable', 'supabase', 'startengine', 'mistralai', 'raycast', 'posthog'],
    hardware: ['airbus', 'posthog'],
    planes: ['airbus'],
    highValue: ['airbus', 'elevenlabs', 'lovable', 'supabase', 'hasura', 'mistralai'],
    caseStudy: ['ycombinator', 'elevenlabs', 'lovable', 'supabase', 'hasura', 'researchgate', 'exa', 'posthog'],
    easyToYell: ['airbus', 'trust', 'raycast', 'exa', 'heygen', 'posthog'],
    goodBandName: ['elevenlabs', 'lovable', 'trust', 'startengine', 'raycast', 'researchgate', 'posthog'],
    explainable: ['ycombinator', 'airbus', 'lovable', 'startengine', 'researchgate', 'exa'],
    shortNames: ['airbus', 'trust', 'lovable', 'hasura', 'raycast', 'exa', 'heygen', 'posthog'],
    realWords: ['airbus', 'trust', 'lovable', 'elevenlabs', 'startengine', 'researchgate', 'posthog'],
    american: ['ycombinator', 'trust', 'supabase', 'hasura', 'startengine', 'researchgate', 'exa', 'heygen', 'posthog'],
    pokemon: ['lovable', 'supabase', 'hasura', 'mistralai', 'raycast', 'exa', 'heygen'],
}

const Customers = () => {
    const { getCustomers, hasCaseStudy } = useCustomers()
    const [currentBreakdown, setCurrentBreakdown] = React.useState('VCsLoveThem')
    const [isAnimating, setIsAnimating] = React.useState(false)
    const logoRefs = React.useRef<Record<string, HTMLElement>>({})

    const allCompanies = [...COL1, ...COL2]
    const companiesInCol1 = companyAttributes[currentBreakdown as keyof typeof companyAttributes] || []
    const companiesInCol2 = allCompanies.filter((company) => !companiesInCol1.includes(company))

    const column1 = getCustomers(companiesInCol1)
    const column2 = getCustomers(companiesInCol2)

    const renderLogo = (customer: any) => {
        if (!customer.logo) {
            return <span className="text-xs">{customer.name}</span>
        }

        if (typeof customer.logo === 'function') {
            const LogoComponent = customer.logo
            const heightClass = customer.height ? `h-${customer.height - 2}` : 'h-8'
            const className = `w-full fill-current object-contain ${heightClass} `.trim()
            return <LogoComponent className={className} />
        }

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

    const toggleBreakdown = () => {
        if (isAnimating) return

        const beforePositions: Record<string, DOMRect> = {}
        Object.keys(logoRefs.current).forEach((slug) => {
            const element = logoRefs.current[slug]
            if (element) {
                beforePositions[slug] = element.getBoundingClientRect()
            }
        })

        setIsAnimating(true)

        const breakdownKeys = Object.keys(companyBreakdowns)
        const currentIndex = breakdownKeys.indexOf(currentBreakdown)
        const availableBreakdowns = breakdownKeys.filter((_, index) => index !== currentIndex)
        const randomIndex = Math.floor(Math.random() * availableBreakdowns.length)
        setCurrentBreakdown(availableBreakdowns[randomIndex])

        requestAnimationFrame(() => {
            Object.keys(logoRefs.current).forEach((slug) => {
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

    const shuffleButton = (
        <div className="mb-2">
            <OSButton
                onClick={toggleBreakdown}
                variant="secondary"
                size="sm"
                className="font-semibold [&_span]:min-w-[146px]"
                disabled={isAnimating}
            >
                {isAnimating ? (
                    'Shuffling...'
                ) : (
                    <>
                        <IconRefresh className="size-4 inline-block relative -top-px" /> Shuffle companies
                    </>
                )}
            </OSButton>
        </div>
    )

    return (
        <>
            {/* Small container: Stacked card layout */}
            <div className="@2xl:hidden">
                <div className="relative pt-1 pb-2">{shuffleButton}</div>
                <div className="flex flex-col gap-4">
                    <div className="border border-primary">
                        <div className="bg-input px-3 py-2 border-b border-primary">
                            <span className="font-bold text-sm">{currentLabels.col1}</span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center items-center p-4">
                            {column1.map(renderCustomerWithLink)}
                        </div>
                    </div>
                    <div className="border border-primary">
                        <div className="bg-input px-3 py-2 border-b border-primary">
                            <span className="font-bold text-sm">{currentLabels.col2}</span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center items-center p-4">
                            {column2.map(renderCustomerWithLink)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Larger container: Table layout */}
            <div className="hidden @2xl:block">
                <div className="relative @xl:pt-1 pb-2 @xl:pb-0">{shuffleButton}</div>
                <OSTable columns={columns} rows={rows} size="sm" rowAlignment="top" />
            </div>

            <OSButton asLink to="/customers" variant="secondary" size="md" className="mt-4" state={{ newWindow: true }}>
                Open customers.mdx
            </OSButton>
        </>
    )
}

// JSX Component Descriptors for MDXEditor
const jsxComponentDescriptors: JsxComponentDescriptor[] = [
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
        name: 'CTAs',
        kind: 'flow',
        props: [],
        Editor: () => <CTAs />,
    },
    {
        name: 'Toolkits',
        kind: 'flow',
        props: [],
        Editor: () => <Toolkits />,
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
                <span>support folks</span>
            </SmallTeam>
        ),
    },
]

// ============================================
// Main Component
// ============================================

export default function Home2() {
    const { siteSettings } = useApp()
    const videoRef = useRef<WistiaVideoRef>(null)
    const tvScreenRef = useRef<HTMLDivElement>(null)
    const [activePromptIndex, setActivePromptIndex] = useState(0)
    const [copied, setCopied] = useState(false)
    const [isPlaying, setIsPlaying] = useState(true)

    // Scroll TVScreen into view (for stacked layout on smaller windows)
    const scrollToVideo = () => {
        if (tvScreenRef.current) {
            // Small delay to allow state to update first
            setTimeout(() => {
                tvScreenRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
            }, 100)
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText('npx -y @posthog/wizard@latest')
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
    }

    // Video control handlers for TVScreen buttons
    const handlePrev = () => {
        setActivePromptIndex((prev) => (prev - 1 + PROMPTS.length) % PROMPTS.length)
    }

    const handlePlayPause = () => {
        if (isPlaying) {
            videoRef.current?.pause()
        } else {
            videoRef.current?.play()
        }
        setIsPlaying(!isPlaying)
    }

    const handleNext = () => {
        setActivePromptIndex((prev) => (prev + 1) % PROMPTS.length)
    }

    // Reset isPlaying to true when video changes (since new videos auto-play)
    useEffect(() => {
        setIsPlaying(true)
    }, [activePromptIndex])

    // GraphQL query for MDX content
    const {
        mdx: { rawBody, mdxBody },
    } = useStaticQuery(graphql`
        query {
            mdx(slug: { eq: "home" }) {
                rawBody
                mdxBody: body
            }
        }
    `)

    // Derived state
    const currentPrompt = PROMPTS[activePromptIndex]
    const activeAccordion = currentPrompt.slide
    const currentVideoId = currentPrompt.videoId

    // Handle video end - advance to next prompt, loop at end
    const handleVideoEnd = () => {
        setActivePromptIndex((prev) => (prev + 1) % PROMPTS.length)
    }

    // Handle manual accordion change
    const handleAccordionChange = (value: string) => {
        if (!value) return // Ignore collapse
        const firstPromptIndex = PROMPTS.findIndex((p) => p.slide === value)
        if (firstPromptIndex !== -1) {
            setActivePromptIndex(firstPromptIndex)
            scrollToVideo()
        }
    }

    // Handle manual prompt click - restart video if clicking active prompt
    const handlePromptClick = (index: number) => {
        if (index === activePromptIndex) {
            videoRef.current?.time(0)
            videoRef.current?.play()
        } else {
            setActivePromptIndex(index)
        }
        scrollToVideo()
    }

    // Build prompts with global index
    const promptsWithIndex = PROMPTS.map((p, i) => ({ ...p, globalIndex: i }))

    // Build accordion items
    const accordionItems = [
        {
            handle: 'product_analytics',
            value: 'analytics',
        },
        {
            handle: 'session_replay',
            value: 'replay',
        },
        {
            handle: 'feature_flags',
            value: 'feature-flags',
        },
        {
            handle: 'data_warehouse',
            value: 'data-warehouse',
        },
    ].map(({ handle, value }) => {
        const slidePrompts = promptsWithIndex.filter((p) => p.slide === value)

        return {
            value,
            trigger: <ProductTrigger handle={handle} />,
            content: (
                <div data-scheme="secondary" className="flex flex-col px-6 gap-px">
                    {slidePrompts.map((prompt) => (
                        <OSButton
                            key={prompt.globalIndex}
                            size="md"
                            width="full"
                            align="left"
                            onClick={() => handlePromptClick(prompt.globalIndex)}
                            className={`before:opacity-0 hover:!border-transparent before:content-["►"] before:text-base before:absolute before:-left-4 before:top-0.5 before:text-red dark:before:text-yellow active:!bg-transparent focus:!border-transparent ${
                                activePromptIndex === prompt.globalIndex
                                    ? 'font-bold before:opacity-100 !text-red dark:!text-yellow'
                                    : 'hover:underline hover:before:opacity-25 before:!text-primary'
                            }`}
                        >
                            "{prompt.text}"
                        </OSButton>
                    ))}
                </div>
            ),
        }
    })

    return (
        <ScrollArea
            data-scheme="primary"
            className="flex-1 w-full [&>div>div]:h-full [&>div>div]:!flex [&>div>div]:flex-col [&>div>div]:p-4 @lg:[&>div>div]:p-8 [&_.w-vulcan-v2]:!rounded-none bg-primary"
        >
            <article>
                {/* Video Hero Section */}
                <div className="flex flex-col @2xl:flex-row gap-8">
                    <div className="flex-1 @2xl:pt-2 @4xl:pt-8 @5xl:pt-8 @2xl:pt-16">
                        <h1 className="text-4xl font-bold mb-4">The AI platform for engineers</h1>
                        <p className="text-xl mb-8 mt-0">
                            Debug products. Ship features faster. <br />
                            With all user and product data in one stack.
                        </p>
                        <div className="@2xl:max-w-lg mb-6">
                            <Accordion
                                key={activeAccordion}
                                // skin={false}
                                items={accordionItems}
                                defaultValue={activeAccordion}
                                onValueChange={handleAccordionChange}
                                triggerClassName="[&_h2]:text-lg !bg-transparent"
                            />
                        </div>
                    </div>
                    <div ref={tvScreenRef} className="flex flex-col items-center">
                        <TVScreen
                            className="relative w-full @2xl:w-[560px]"
                            title={currentPrompt.text}
                            isPlaying={isPlaying}
                            videoNumber={activePromptIndex + 1}
                            onPrev={handlePrev}
                            onPlayPause={handlePlayPause}
                            onNext={handleNext}
                        >
                            <WistiaVideo
                                ref={videoRef}
                                videoId={currentVideoId}
                                onEnd={handleVideoEnd}
                                className="absolute inset-0 [&_.w-chrome]:!rounded-none [&_video]:m-0 [&_.w-vulcan-v2]:!rounded-none [&_.w-chrome]:![clip-path:none]"
                                hideInitialControls
                                hideAudioControls
                            />
                        </TVScreen>
                    </div>
                </div>
            </article>
        </ScrollArea>
    )
}

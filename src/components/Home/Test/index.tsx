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
import { graphql, useStaticQuery } from 'gatsby'
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

    return (
        <>
            <div className="relative @xl:pt-1 pb-2 @xl:pb-0">
                <div className="@xl:absolute right-0 -top-8">
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
            </div>
            <OSTable columns={columns} rows={rows} size="sm" rowAlignment="top" />
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
        name: 'ButtonCDI',
        kind: 'flow',
        props: [],
        Editor: () => <Button url="/customer-data-infrastructure">README: Data warehouse / CDP / ETL.md</Button>,
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
    const [activePromptIndex, setActivePromptIndex] = useState(0)
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText('npx -y @posthog/wizard@latest')
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
    }

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
                <div data-scheme="secondary" className="flex flex-col px-6 gap-px -mt-2">
                    {slidePrompts.map((prompt) => (
                        <OSButton
                            key={prompt.globalIndex}
                            size="md"
                            width="full"
                            align="left"
                            onClick={() => handlePromptClick(prompt.globalIndex)}
                            className={activePromptIndex === prompt.globalIndex ? 'bg-primary font-bold' : ''}
                        >
                            "{prompt.text}"
                        </OSButton>
                    ))}
                </div>
            ),
        }
    })

    return (
        <>
            <SEO
                title="Welcome to PostHog"
                description="PostHog is the only developer platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/default.png`}
            />
            <Wizard
                leftNavigation={
                    <div className="flex gap-x-2">
                        <CallToAction
                            to="https://app.posthog.com/signup"
                            size="md"
                            state={{ newWindow: true, initialTab: 'signup' }}
                        >
                            Get started - free
                        </CallToAction>
                        <CallToAction
                            type="secondary"
                            size="md"
                            to="/docs/getting-started/install?tab=wizard"
                            state={{ newWindow: true }}
                        >
                            Install with AI
                        </CallToAction>
                    </div>
                }
                rightNavigation={
                    <>
                        <OSButton
                            asLink
                            to="/talk-to-a-human"
                            size="md"
                            variant="underline"
                            className="font-semibold underline"
                            state={{ newWindow: true }}
                        >
                            Talk to a human
                        </OSButton>
                    </>
                }
            >
                <ScrollArea
                    data-scheme="primary"
                    className="flex-1 w-full [&>div>div]:h-full [&>div>div]:!flex [&>div>div]:flex-col [&>div>div]:p-4 @lg:[&>div>div]:p-8 [&>div>div]:!pt-2 [&_.w-vulcan-v2]:!rounded-none bg-primary"
                >
                    <article className={getProseClasses()}>
                        {/* Video Hero Section */}
                        <div className="flex flex-col @3xl:flex-row gap-8">
                            <div className="flex-1 pt-8">
                                <div className="mb-8">
                                    <Logo
                                        className="inline-block"
                                        fill={siteSettings.theme === 'dark' ? 'white' : undefined}
                                    />
                                </div>
                                <h1 className="!text-xl font-bold !mb-1">The AI platform for engineers</h1>
                                <p className="text-[15px]">
                                    Debug products. Ship features faster. With all user and product data in one stack.
                                </p>

                                <div className="max-w-md">
                                    <Accordion
                                        key={activeAccordion}
                                        skin={false}
                                        items={accordionItems}
                                        defaultValue={activeAccordion}
                                        onValueChange={handleAccordionChange}
                                        triggerClassName="[&_h2]:text-sm"
                                    />
                                </div>

                                <div
                                    data-scheme="secondary"
                                    className="mt-4 border border-primary bg-primary p-4 rounded"
                                >
                                    <p className="mt-0 mb-2">
                                        <strong>
                                            Install PostHog with AI{' '}
                                            <IconSparkles className="inline-block size-4 relative -top-px" />{' '}
                                        </strong>
                                    </p>

                                    <pre className="m-0 relative">
                                        npx -y @posthog/wizard@latest
                                        <button
                                            onClick={handleCopy}
                                            className="absolute right-1.5 top-1.5 p-0.5 border border-transparent hover:border-white rounded transition-colors"
                                            aria-label="Copy to clipboard"
                                        >
                                            {copied ? (
                                                <IconCheck className="size-5 text-green" />
                                            ) : (
                                                <IconCopy className="size-5" />
                                            )}
                                        </button>
                                    </pre>

                                    <p className="text-xs mt-2 mb-0">
                                        Works with Next.js and AI coding tools like Cursor and Bolt
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <WistiaVideo
                                    ref={videoRef}
                                    videoId={currentVideoId}
                                    onEnd={handleVideoEnd}
                                    className="w-full @3xl:w-[400px] @4xl:w-[540px] [&_.w-chrome]:!rounded-none [&_.w-vulcan-v2]:!rounded-none"
                                />
                                <p className="mt-4 mb-2 text-center italic">"{currentPrompt.text}"</p>
                                <p className="text-sm text-center opacity-70 mt-0 mb-2">
                                    PostHog AI + <ProductName handle={SLIDE_TO_PRODUCT[currentPrompt.slide]} />
                                </p>
                                <div className="flex gap-2">
                                    {getPromptsForSlide(currentPrompt.slide).map((prompt) => {
                                        const isActive = activePromptIndex === prompt.globalIndex
                                        return (
                                            <button
                                                key={prompt.globalIndex}
                                                onClick={() => setActivePromptIndex(prompt.globalIndex)}
                                                className={`size-3 rounded-full transition-colors ${
                                                    isActive ? 'bg-blue' : 'bg-accent hover:opacity-80'
                                                }`}
                                                aria-label={`Go to prompt: ${prompt.text}`}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <MDXEditor
                            noEditorWrapper
                            jsxComponentDescriptors={jsxComponentDescriptors}
                            body={rawBody}
                            mdxBody={mdxBody}
                        />
                    </article>
                </ScrollArea>
            </Wizard>
        </>
    )
}

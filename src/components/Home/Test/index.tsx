import React, { useEffect, useState } from 'react'
import Link from 'components/Link'
import OSTable from 'components/OSTable'
import { useCustomers } from 'hooks/useCustomers'
import CTA from 'components/Home/CTA'
import { IconArrowRight, IconHeadset, IconInfo, IconPlayFilled, IconRefresh } from '@posthog/icons'
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
    IconMCP,
} from 'components/OSIcons'
import Roadmap from 'components/Home/New/Roadmap'
import Pricing from 'components/Home/New/Pricing'
import OSButton from 'components/OSButton'
import useProduct from 'hooks/useProduct'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'components/RadixUI/Accordion'
import { Accordion as RadixAccordionPrimitives } from 'radix-ui'
import Logo from 'components/Logo'
import { useApp } from '../../../context/App'
import { useWindow } from '../../../context/Window'
import MDXEditor from 'components/MDXEditor'
import { JsxComponentDescriptor } from '@mdxeditor/editor'
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
import IntegrationPrompt from 'components/IntegrationPrompt'
import { motion } from 'framer-motion'
import SmallTeam from 'components/SmallTeam'
import { RenderInClient } from 'components/RenderInClient'
import HeroCarousel from 'components/Home/HeroCarousel'

interface ProductButtonsProps {
    productTypes: string[]
    className?: string
    beta?: boolean
}

const ProductButtons: React.FC<ProductButtonsProps> = ({ productTypes, className = '', beta = false }) => {
    const allProducts = useProduct()

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

const AppCount = () => <span className="text-xs font-normal">{APP_COUNT} apps</span>

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
                <CallToAction
                    type="secondary"
                    size="md"
                    onClick={() => setShowIntegrationPrompt((current) => !current)}
                >
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
            {/* @TODO(data-positioning): Restore the original test CTA row below once this experiment no longer needs control-matching primary buttons.
            Existing test CTA row retained for reference:
            <div className="flex gap-2 items-center">
                <div className="flex items-center gap-1">
                    <WizardCommand latest={false} slim className="border border-primary" />
                    <Tooltip trigger={<IconInfo className="size-4 text-primary inline-block" />}>
                        <div className="max-w-sm">
                            <p className="text-sm mb-1">
                                <strong className="block mb-1">Add PostHog to your project in ~8 minutes.</strong>
                            </p>
                            <p className="text-sm mb-0">
                                <Link to="/wizard" state={{ newWindow: true }}>
                                    <span className="underline font-bold">Learn more</span>{' '}
                                    <IconArrowUpRight className="size-4 inline-block" />
                                </Link>
                            </p>
                        </div>
                    </Tooltip>
                </div>
                <span className="text-sm">or </span>
                <CallToAction
                    to="https://app.posthog.com/signup"
                    size="sm"
                    state={{ newWindow: true, initialTab: 'signup' }}
                    type="plain"
                    className=""
                >
                    signup with email
                </CallToAction>
            </div>
            */}
            <p className="text-sm flex items-center gap-2 mt-4">
                <Link
                    to="/docs/model-context-protocol"
                    state={{ newWindow: true }}
                    className="text-secondary hover:text-primary"
                >
                    <IconMCP className="size-4 mr-1 inline-block relative -top-px" />
                    <span className="underline font-semibold">MCP</span>
                </Link>
                <span className="text-secondary">•</span>
                <Link to="/demo" state={{ newWindow: true }} className="text-secondary hover:text-primary">
                    <IconPlayFilled className="size-4 mr-1 inline-block relative -top-px" />
                    <span className="underline font-semibold">Watch a demo</span>
                </Link>
                <span className="text-secondary">•</span>
                <Link to="/talk-to-a-human" state={{ newWindow: true }} className="text-secondary hover:text-primary">
                    <IconHeadset className="size-4 mr-1 inline-block relative -top-px" />
                    <span className="underline font-semibold">Talk to a human</span>
                </Link>
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

    if (hitCount === null) return null

    const digits = formatCount(hitCount).split('')

    return (
        <span className="inline-flex items-center gap-0.5">
            {digits.map((digit, index) => {
                const DigitComp = getDigitComponent(digit)
                return <DigitComp key={index} className="h-4 w-auto" />
            })}
        </span>
    )
}

const Button = ({ url, children }: { url: string; children: React.ReactNode }) => (
    <Link to={url} state={{ newWindow: true }}>
        {children}
    </Link>
)

const Image = ({ src, className = '', alt = '' }: { src: string; className?: string; alt?: string }) => (
    <CloudinaryImage src={src} alt={alt} className={className} />
)

const CompanyStageTabs = () => {
    const [selectedStage, setSelectedStage] = React.useState('growth')

    const allProducts = useProduct()

    const getProduct = (handle: string) =>
        Array.isArray(allProducts) ? allProducts.find((p: any) => p.handle === handle) : undefined

    const stages = [
        {
            value: 'early',
            label: 'Early-stage',
            products: [
                { handle: 'product_analytics', text: 'for understanding user behavior' },
                { handle: 'session_replay', text: 'for watching real user sessions' },
                { handle: 'feature_flags', text: 'for safe feature rollouts' },
                { handle: 'surveys', text: 'for collecting user feedback' },
                { handle: 'web_analytics', text: 'for tracking website traffic' },
            ],
        },
        {
            value: 'growth',
            label: 'Growth',
            products: [
                { handle: 'experiments', text: 'for A/B testing ideas' },
                { handle: 'data_warehouse', text: 'for centralizing data' },
                { handle: 'error_tracking', text: 'for catching bugs fast' },
                { handle: 'cdp', text: 'for syncing data everywhere' },
                { handle: 'llm_analytics', text: 'for monitoring AI features' },
            ],
        },
        {
            value: 'scale',
            label: 'At scale',
            products: [
                { handle: 'data_warehouse', text: 'for advanced data modeling' },
                { handle: 'cdp', text: 'for complex data pipelines' },
                { handle: 'experiments', text: 'for optimizing conversion' },
                { handle: 'product_analytics', text: 'for deep cohort analysis' },
                { handle: 'web_analytics', text: 'for multi-channel attribution' },
            ],
        },
    ]

    const stageOptions: ToggleOption[] = stages.map((stage) => ({
        label: stage.label,
        value: stage.value,
    }))

    const selectedStageData = stages.find((s) => s.value === selectedStage) || stages[0]

    return (
        <div className="not-prose">
            <ToggleGroup
                options={stageOptions}
                value={selectedStage}
                onValueChange={setSelectedStage}
                className="mb-4"
            />
            <ul className="space-y-1.5 text-sm list-none p-0">
                {selectedStageData.products.map((item, idx) => {
                    const product = getProduct(item.handle)
                    return (
                        <li key={idx} className="flex items-center gap-1.5">
                            {product?.Icon && <product.Icon className={`size-4 text-${product.color}`} />}
                            <Link to={`/${product?.slug}`} state={{ newWindow: true }} className="font-semibold">
                                {product?.name}
                            </Link>
                            <span className="text-secondary">{item.text}</span>
                        </li>
                    )
                })}
            </ul>
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

const companyAttributes: Record<string, string[]> = {
    VCsLoveThem: [
        'ycombinator',
        'airbus',
        'nationaldesignstudio',
        'ukgovt',
        'trust',
        'lovable',
        'startengine',
        'researchgate',
        'heygen',
    ],
    colorful: [
        'ycombinator',
        'convex',
        'trust',
        'lovable',
        'supabase',
        'startengine',
        'mistralai',
        'raycast',
        'heygen',
        'posthog',
    ],
    hardware: ['airbus', 'ukgovt', 'posthog'],
    planes: ['airbus', 'ukgovt'],
    highValue: ['ukgovt', 'airbus', 'elevenlabs', 'lovable', 'supabase', 'hasura', 'mistralai'],
    caseStudy: ['ycombinator', 'elevenlabs', 'lovable', 'supabase', 'hasura', 'researchgate', 'exa', 'posthog'],
    easyToYell: ['airbus', 'trust', 'convex', 'raycast', 'resend', 'exa', 'heygen', 'posthog', 'wisprflow', 'ukgovt'],
    goodBandName: [
        'elevenlabs',
        'lovable',
        'convex',
        'trust',
        'startengine',
        'raycast',
        'resend',
        'researchgate',
        'nationaldesignstudio',
        'wisprflow',
        'posthog',
    ],
    explainable: [
        'ycombinator',
        'airbus',
        'lovable',
        'startengine',
        'researchgate',
        'exa',
        'nationaldesignstudio',
        'ukgovt',
        'wisprflow',
    ],
    shortNames: [
        'airbus',
        'trust',
        'lovable',
        'convex',
        'hasura',
        'raycast',
        'resend',
        'exa',
        'heygen',
        'wisprflow',
        'ukgovt',
        'posthog',
    ],
    realWords: [
        'airbus',
        'convex',
        'trust',
        'lovable',
        'elevenlabs',
        'startengine',
        'resend',
        'researchgate',
        'nationaldesignstudio',
        'wisprflow',
        'posthog',
    ],
    american: [
        'ycombinator',
        'convex',
        'trust',
        'supabase',
        'hasura',
        'startengine',
        'resend',
        'researchgate',
        'exa',
        'heygen',
        'nationaldesignstudio',
        'wisprflow',
        'greptile',
        'posthog',
    ],
    pokemon: ['lovable', 'convex', 'supabase', 'hasura', 'mistralai', 'raycast', 'resend', 'exa', 'heygen', 'greptile'],
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
        'posthog',
    ],
    devTool: [
        'ycombinator',
        'elevenlabs',
        'convex',
        'supabase',
        'hasura',
        'mistralai',
        'raycast',
        'resend',
        'exa',
        'greptile',
        'posthog',
    ],
}

const Customers = () => {
    const { getCustomers, hasCaseStudy } = useCustomers()
    const [currentBreakdown, setCurrentBreakdown] = React.useState('VCsLoveThem')
    const [isAnimating, setIsAnimating] = React.useState(false)
    const logoRefs = React.useRef<Record<string, HTMLElement>>({})

    const allCompanies = [...COL1, ...COL2]
    const companiesInCol1 = companyAttributes[currentBreakdown] || []
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
            return <LogoComponent className={`w-full fill-current object-contain ${heightClass}`} />
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
            if (element) beforePositions[slug] = element.getBoundingClientRect()
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
                </div>
                <OSTable columns={columns} rows={rows} size="sm" rowAlignment="top" className="bg-white" />
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

function HeroImage(): JSX.Element {
    return (
        <CloudinaryImage
            src="https://res.cloudinary.com/dmukukwp6/image/upload/lazy_a2afd552f7.png"
            className="w-64 @2xl:float-right @2xl:ml-4"
        />
    )
}

function TaglineControl(): JSX.Element {
    return (
        <>
            <h1 className="!text-2xl pt-4">The new way to build products</h1>
            <p>
                Product development used to mean manually writing code, running analysis, diagnosing bugs, and rolling
                out changes using dozens of tools.
            </p>

            <p>
                PostHog is the only platform that acts like a co-pilot for you (and your AI agents) to do it all &mdash;{' '}
                <em>autonomously</em>.
            </p>
        </>
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

const FAQ = ({ children }: { children: React.ReactNode }) => {
    const [value, setValue] = useState<string[]>([])

    const allValues = React.useMemo(() => {
        const values: string[] = []
        React.Children.forEach(children, (child) => {
            if (React.isValidElement(child) && child.props.trigger) {
                values.push(child.props.trigger)
            }
        })
        return values
    }, [children])

    return (
        <div>
            <div className="flex justify-end mb-2">
                <OSButton variant="secondary" size="sm" onClick={() => setValue(allValues)}>
                    Expand all
                </OSButton>
            </div>
            <RadixAccordionPrimitives.Root
                className="rounded border border-primary"
                type="multiple"
                value={value}
                onValueChange={setValue}
                data-scheme="primary"
            >
                {children}
            </RadixAccordionPrimitives.Root>
        </div>
    )
}

const FAQItem = ({ trigger, children }: { trigger: string; children: React.ReactNode }) => (
    <AccordionItem value={trigger} skin>
        <AccordionTrigger skin className="!text-base font-bold">
            {trigger}
        </AccordionTrigger>
        <AccordionContent skin>{children}</AccordionContent>
    </AccordionItem>
)

const jsxComponentDescriptors: JsxComponentDescriptor[] = [
    { name: 'Tagline', kind: 'flow', props: [], Editor: () => <Tagline /> },
    { name: 'AppCount', kind: 'flow', props: [], Editor: () => <AppCount /> },
    { name: 'CompanyStageTabs', kind: 'flow', props: [], Editor: () => <CompanyStageTabs /> },
    { name: 'CTAs', kind: 'flow', props: [], Editor: () => <CTAs /> },
    { name: 'HeroCarousel', kind: 'flow', props: [], Editor: () => <HeroCarousel /> },
    { name: 'HomeHitCounter', kind: 'flow', props: [], Editor: () => <HomeHitCounter /> },
    { name: 'Pricing', kind: 'flow', props: [], Editor: () => <Pricing /> },
    { name: 'Customers', kind: 'flow', props: [], Editor: () => <Customers /> },
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
            return (
                <>
                    <Logo className="inline-block h-9" fill={siteSettings.theme === 'dark' ? 'white' : undefined} />{' '}
                </>
            )
        },
    },
    {
        name: 'HeroImage',
        kind: 'flow',
        props: [],
        Editor: () => <HeroImage />,
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
        name: 'FAQ',
        kind: 'flow',
        props: [{ name: 'children', type: 'expression' }],
        Editor: ({ children }) => <FAQ>{children}</FAQ>,
    },
    {
        name: 'FAQItem',
        kind: 'flow',
        props: [
            { name: 'trigger', type: 'string' },
            { name: 'children', type: 'expression' },
        ],
        Editor: ({ trigger, children }) => <FAQItem trigger={trigger}>{children}</FAQItem>,
    },
]

export default function HomeTest() {
    const data = useStaticQuery(graphql`
        query HomeTestMdx {
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

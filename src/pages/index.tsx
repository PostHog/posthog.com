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
import { useApp } from '../context/App'
import { useWindow } from '../context/Window'
import MDXEditor from 'components/MDXEditor'
import { graphql, useStaticQuery } from 'gatsby'
import SEO from 'components/seo'
import usePostHog from 'hooks/usePostHog'
import Tooltip from 'components/RadixUI/Tooltip'
import { PRODUCT_COUNT, APP_COUNT } from '../constants'
import Start from 'components/Start'
import { CallToAction } from 'components/CallToAction'
import { ToggleGroup, ToggleOption } from 'components/RadixUI/ToggleGroup'
import ProductTabs from 'components/ProductTabs'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import CloudinaryImage from 'components/CloudinaryImage'
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
    return (
        <div className="flex flex-col @xs:flex-row @xs:justify-center @xl:justify-start gap-3 @sm:gap-2">
            <CallToAction
                to="https://app.posthog.com/signup"
                size="md"
                state={{ newWindow: true, initialTab: 'signup' }}
            >
                Get started - free
            </CallToAction>
            <CallToAction
                to="https://app.posthog.com/signup"
                type="secondary"
                size="md"
                state={{ newWindow: true, initialTab: 'ai' }}
            >
                Install with AI
            </CallToAction>
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

const AIAgents = () => {
    const columns = [
        { name: '', width: 'auto', align: 'center' as const },
        { name: 'Agent', width: 'minmax(150px,300px)', align: 'left' as const },
        { name: 'Skills', width: 'minmax(300px,1fr)', align: 'left' as const },
    ]

    const rows = [
        {
            cells: [
                { content: 1 },
                {
                    content: (
                        <div className="flex gap-2 items-center">
                            <span>
                                <Tooltip
                                    trigger={
                                        <Link to="/max" state={{ newWindow: true }}>
                                            <img
                                                src="https://res.cloudinary.com/dmukukwp6/image/upload/h_200,c_limit,q_auto,f_auto/ai_max_e80de99727.png"
                                                className="w-16 -m-2"
                                            />
                                        </Link>
                                    }
                                    delay={0}
                                >
                                    <div className="relative">
                                        <img
                                            src="https://res.cloudinary.com/dmukukwp6/image/upload/h_400,c_limit,q_auto,f_auto/ai_max_e80de99727.png"
                                            className=""
                                        />
                                        <div className="absolute top-[calc(100%-5rem)] text-center text-3xl font-bold font-squeak uppercase text-orange rotate-[3.5deg] left-0 right-4">
                                            Hi, I'm Max
                                        </div>
                                    </div>
                                </Tooltip>
                            </span>
                            <div className="flex flex-col">
                                <Link to="/max" state={{ newWindow: true }}>
                                    Max
                                </Link>
                                <span className="text-sm text-secondary">Helpful chatbot, data concierge</span>
                            </div>
                        </div>
                    ),
                },
                {
                    content: 'Writes SQL, builds data transformations, gathers context in insights',
                    className: 'text-sm',
                },
            ],
        },
        {
            cells: [
                { content: 2 },
                {
                    content: (
                        <div className="flex gap-2 items-center">
                            <span>
                                <Tooltip
                                    trigger={
                                        <Link to="/raquel" state={{ newWindow: true }}>
                                            <img
                                                src="https://res.cloudinary.com/dmukukwp6/image/upload/h_200,c_limit,q_auto,f_auto/ai_raquel_c56887c5b7.png"
                                                className="w-16 -m-2"
                                            />
                                        </Link>
                                    }
                                    delay={0}
                                >
                                    <div className="relative">
                                        <img
                                            src="https://res.cloudinary.com/dmukukwp6/image/upload/h_400,c_limit,q_auto,f_auto/ai_raquel_c56887c5b7.png"
                                            className=""
                                        />
                                        <div className="absolute top-[calc(100%-4.75rem)] text-center text-3xl font-bold font-squeak uppercase text-orange rotate-[-2.75deg] left-0 right-0">
                                            Hi, I'm Raquel
                                        </div>
                                    </div>
                                </Tooltip>
                            </span>
                            <div className="flex flex-col">
                                <span>
                                    <Link to="/raquel" state={{ newWindow: true }}>
                                        Raquel
                                    </Link>{' '}
                                    – <em>beta</em>
                                </span>
                                <span className="text-sm text-secondary">Hands-on exec</span>
                            </div>
                        </div>
                    ),
                },
                {
                    content: 'Researches complex data problems, summarizes session recordings',
                    className: 'text-sm',
                },
            ],
        },
        {
            cells: [
                { content: 3 },
                {
                    content: (
                        <div className="flex gap-2 items-center">
                            <span>
                                <Tooltip
                                    trigger={
                                        <img
                                            src="https://res.cloudinary.com/dmukukwp6/image/upload/h_200,c_limit,q_auto,f_auto/ai_annika_fb5ff41473.png"
                                            className="w-16 -m-2"
                                        />
                                    }
                                    delay={0}
                                >
                                    <div className="relative">
                                        <img
                                            src="https://res.cloudinary.com/dmukukwp6/image/upload/h_400,c_limit,q_auto,f_auto/ai_annika_fb5ff41473.png"
                                            className=""
                                        />
                                        <div className="absolute top-[calc(100%-4.75rem)] text-center text-3xl font-bold font-squeak uppercase text-orange rotate-[-2.75deg] left-0 right-0">
                                            Hi, I'm Annika
                                        </div>
                                    </div>
                                </Tooltip>
                            </span>
                            <div className="flex flex-col">
                                <span>
                                    <strong>Annika</strong> – <em>beta</em>
                                </span>
                                <span className="text-sm text-secondary">Product manager</span>
                            </div>
                        </div>
                    ),
                },
                {
                    content:
                        'Identifies errors and UX bugs, writes requirements docs, monitors code changes with phased rollouts',
                    className: 'text-sm',
                },
            ],
        },
        {
            cells: [
                { content: 4 },
                {
                    content: (
                        <div className="flex gap-2 items-center">
                            <span>
                                <Tooltip
                                    trigger={
                                        <img
                                            src="https://res.cloudinary.com/dmukukwp6/image/upload/h_200,c_limit,q_auto,f_auto/ai_marius_9c4cd7045d.png"
                                            className="w-16 -m-2"
                                        />
                                    }
                                    delay={0}
                                >
                                    <div className="relative">
                                        <img
                                            src="https://res.cloudinary.com/dmukukwp6/image/upload/h_400,c_limit,q_auto,f_auto/ai_marius_9c4cd7045d.png"
                                            className=""
                                        />
                                        <div className="absolute top-[calc(100%-5rem)] text-center text-3xl font-bold font-squeak uppercase text-orange rotate-[3.5deg] left-0 right-4">
                                            Hi, I'm Marius
                                        </div>
                                    </div>
                                </Tooltip>
                            </span>
                            <div className="flex flex-col">
                                <span>
                                    <strong>Marius</strong> – <em>beta</em>
                                </span>
                                <span className="text-sm text-secondary">10x engineer</span>
                            </div>
                        </div>
                    ),
                },
                {
                    content:
                        'Implements bug fixes, creates and configures feature flags, writes code and generates pull requests',
                    className: 'text-sm',
                },
            ],
        },
    ]

    return (
        <div className="mt-4">
            <OSTable columns={columns} rows={rows} size="sm" overflowX />
        </div>
    )
}

const COL1 = ['ycombinator', 'airbus', 'trust', 'lovable', 'startengine', 'researchgate', 'heygen']

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
    american: { col1: 'Founded in America', col2: 'Not founded in American' },
    pokemon: { col1: 'Could be a Pokémon', col2: 'Could be a Bond Villain' },
}

const companyAttributes = {
    VCsLoveThem: [
        'ycombinator',
        'airbus',
        // "elevenlabs",
        'trust',
        'lovable',
        // "supabase",
        // "hasura",
        'startengine',
        // "mistralai",
        // "raycast",
        'researchgate',
        'heygen',
        // "posthog"
    ],
    colorful: [
        'ycombinator',
        // "airbus",
        // "elevenlabs",
        'trust',
        'lovable',
        'supabase',
        // "hasura",
        'startengine',
        'mistralai',
        'raycast',
        // "researchgate",
        // "heygen",
        'posthog',
    ],
    hardware: [
        // "ycombinator",
        'airbus',
        // "elevenlabs",
        // "trust",
        // "lovable",
        // "supabase",
        // "hasura",
        // "startengine",
        // "mistralai",
        // "raycast",
        // "researchgate",
        // "heygen",
        'posthog',
    ],
    planes: [
        // "ycombinator",
        'airbus',
        // "elevenlabs",
        // "trust",
        // "lovable",
        // "supabase",
        // "hasura",
        // "startengine",
        // "mistralai",
        // "raycast",
        // "researchgate",
        // "heygen",
        // "posthog"
    ],
    highValue: [
        'airbus',
        'elevenlabs',
        // "ycombinator",
        'lovable',
        'supabase',
        'hasura',
        // "trust",
        // "startengine",
        'mistralai',
        // "raycast",
        // "researchgate",
        // "heygen",
        // "posthog"
    ],
    caseStudy: [
        'ycombinator',
        // "airbus",
        'elevenlabs',
        // "trust",
        'lovable',
        'supabase',
        'hasura',
        // "startengine",
        // "mistralai",
        // "raycast",
        'researchgate',
        // "heygen",
        'posthog',
    ],
    easyToYell: [
        // "ycombinator",
        'airbus',
        // "elevenlabs",
        'trust',
        // "lovable",
        // "supabase",
        // "hasura",
        // "startengine",
        // "mistralai",
        'raycast',
        // "researchgate",
        'heygen',
        'posthog',
    ],
    goodBandName: [
        // "ycombinator",
        'elevenlabs',
        'lovable',
        // "hasura",
        'trust',
        // "airbus",
        // "supabase",
        'startengine',
        // "mistralai",
        'raycast',
        'researchgate',
        // "heygen",
        'posthog',
    ],
    explainable: [
        'ycombinator',
        'airbus',
        // "trust",
        'lovable',
        // "elevenlabs",
        // "supabase",
        // "hasura",
        'startengine',
        // "mistralai",
        // "raycast",
        'researchgate',
        // "heygen",
        // "posthog"
    ],
    shortNames: [
        // "ycombinator",
        'airbus',
        'trust',
        'lovable',
        // "elevenlabs",
        // "supabase",
        'hasura',
        // "startengine",
        // "mistralai",
        'raycast',
        // "researchgate",
        'heygen',
        'posthog',
    ],
    realWords: [
        // "ycombinator",
        'airbus',
        'trust',
        'lovable',
        'elevenlabs',
        // "supabase",
        // "hasura",
        'startengine',
        // "mistralai",
        // "raycast",
        'researchgate',
        // "heygen",
        'posthog',
    ],
    american: [
        'ycombinator',
        // "airbus",
        // "elevenlabs",
        'trust',
        // "lovable",
        'supabase',
        'hasura',
        'startengine',
        // "mistralai",
        // "raycast",
        'researchgate',
        'heygen',
        'posthog',
    ],
    pokemon: [
        // "ycombinator",
        // "airbus",
        // "elevenlabs",
        // "trust",
        'lovable',
        'supabase',
        'hasura',
        // "startengine",
        'mistralai',
        'raycast',
        // "researchgate",
        'heygen',
        // "posthog"
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
    return APP_COUNT
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
                            'session_replay',
                            'web_analytics',
                            'product_analytics',
                            'feature_flags',
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
                            'product_analytics',
                            'web_analytics',
                            'session_replay',
                            'experiments',
                            'feature_flags',
                            'surveys',
                            'dashboards',
                            'error_tracking',
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
            <div className="relative @xl:pt-1">
                <div className="@xl:absolute right-0 -top-4">
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
            <OSTable columns={columns} rows={rows} size="sm" className="mt-4" rowAlignment="top" />
            <OSButton asLink to="/customers" variant="secondary" size="md" className="mt-4" state={{ newWindow: true }}>
                Open customers.mdx
            </OSButton>
        </>
    )
}

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
        name: 'AIAgents',
        kind: 'flow',
        props: [],
        Editor: () => <AIAgents />,
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
        name: 'ButtonAI',
        kind: 'flow',
        props: [],
        Editor: () => <Button url="/ai">Read AI agents.md</Button>,
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
]

export default function Home() {
    const {
        mdx: { rawBody, mdxBody },
    } = useStaticQuery(graphql`
        query {
            mdx(slug: { eq: "" }) {
                rawBody
                mdxBody: body
            }
        }
    `)
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
                title="PostHog is for product engineers"
                updateWindowTitle={false}
                description="Home"
                image="https://posthog.com/images/og/default.png"
            />
            <MDXEditor
                hideTitle={true}
                jsxComponentDescriptors={jsxComponentDescriptors}
                body={rawBody}
                mdxBody={mdxBody}
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

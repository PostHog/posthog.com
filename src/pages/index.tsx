import React, { useEffect, useState } from 'react'
import Link from 'components/Link'
import OSTable from 'components/OSTable'
import { useCustomers } from 'hooks/useCustomers'
import CTA from 'components/Home/CTA'
import { IconArrowRight, IconArrowUpRight } from '@posthog/icons'
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
interface ProductButtonsProps {
    productTypes: string[]
    className?: string
    beta?: boolean
}

const ProgressBar = ({ progress }: { progress: number }) => {
    return (
        <div>
            <Tooltip
                trigger={
                    <div className="flex items-center justify-between gap-1 pb-1">
                        <div className="w-full h-2 bg-accent rounded-sm flex min-w-[10rem]">
                            <div className="h-full bg-blue" style={{ width: `${progress}%` }}></div>
                        </div>
                        <span className="text-xs whitespace-nowrap">{progress}%</span>
                    </div>
                }
                delay={0}
            >
                <div>
                    <p className="mb-0">
                        <span>Toolkit completion: {progress}%</span>
                    </p>
                </div>
            </Tooltip>
        </div>
    )
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
            <CallToAction to="https://app.posthog.com/signup" size="md">
                Get started - free
            </CallToAction>
            <CallToAction to="#" type="secondary" size="md">
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
        { name: 'agent', width: 'minmax(150px,250px)', align: 'left' as const },
        { name: 'skills', width: 'minmax(auto,1fr)', align: 'left' as const },
    ]

    const rows = [
        {
            cells: [
                { content: 1 },
                {
                    content: (
                        <div className="flex flex-col gap-1">
                            <Link to="/max" state={{ newWindow: true }}>
                                Max - helpful chatbot <IconArrowUpRight className="inline-block size-4" />
                            </Link>
                            <ProgressBar progress={75} />
                        </div>
                    ),
                    className: 'font-bold',
                },
                {
                    content:
                        'writing SQL, building data transformations, gathering context in insights, summarizing session recordings',
                    className: 'text-sm',
                },
            ],
        },
        {
            cells: [
                { content: 2 },
                {
                    content: (
                        <div className="flex flex-col gap-1">
                            <span>Raquel - exec</span> <ProgressBar progress={40} />
                        </div>
                    ),
                    className: 'font-bold',
                },
                {
                    content: 'researches complex data problems',
                    className: 'text-sm',
                },
            ],
        },
        {
            cells: [
                { content: 3 },
                {
                    content: (
                        <div className="flex flex-col gap-1">
                            <span>Annika - product manager</span> <ProgressBar progress={25} />
                        </div>
                    ),
                    className: 'font-bold',
                },
                {
                    content:
                        'identifies errors and UX bugs, writes requirements docs, monitors code changes with phased rollouts',
                    className: 'text-sm',
                },
            ],
        },
        {
            cells: [
                { content: 4 },
                {
                    content: (
                        <div className="flex flex-col gap-1">
                            <span>Marius - engineer</span> <ProgressBar progress={10} />
                        </div>
                    ),
                    className: 'font-bold',
                },
                {
                    content: 'implementing bug fixes, creating and configuring feature flags, creating pull requests',
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

const CUSTOMER_ORDER = ['ycombinator', 'airbus', 'dhl', 'startengine']

const HUGE = ['ycombinator', 'airbus', 'dhl', 'startengine']

const GONNA_BE_HUGE = [
    'supabase',
    'mistralai',
    'elevenlabs',
    'raycast',
    'assemblyai',
    'hasura',
    'trust',
    'researchgate',
]

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
                    Startup<span className="hidden @lg:inline"> / Pre-PMF</span>
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
                    <p>
                        <strong>Startup / Pre-PMF</strong>
                        <p>blah</p>
                    </p>
                </div>
            )}
            {selectedStage === 'growth' && (
                <div className="flex flex-col gap-2">
                    <ProductTabs
                        productHandles={[
                            'session_replay',
                            'web_analytics',
                            'product_analytics',
                            'experiments',
                            'feature_flags',
                            'surveys',
                            'error_tracking',
                        ]}
                    />
                </div>
            )}
            {selectedStage === 'scale' && (
                <div className="flex flex-col gap-2">
                    <p>
                        <strong>Scale</strong>
                        <p>Blitzscale.</p>
                    </p>
                </div>
            )}
        </>
    )
}

const CustomerInfrastructureAccordion = () => {
    return (
        <div>
            <Accordion
                // defaultValue="customer-infrastructure"
                skin={false}
                triggerClassName="pl-0 -ml-1 flex-row-reverse [&>svg]:!-rotate-90 [&[data-state=open]>svg]:!rotate-0 [&_strong]:text-[15px]"
                items={[
                    {
                        value: 'customer-infrastructure',
                        trigger: <strong>learn more about customer infrastructure</strong>,
                        content: (
                            <div className="-my-4 -mx-2 text-[15px]">
                                <p>
                                    the problem with today’s customer data infrastructure is that there’s no single
                                    source of truth.
                                </p>
                                <p>
                                    most products only have a subset of customer data because each tool requires a
                                    manual integration. so your CRM contains different info about a customer than your
                                    support tool and your product analytics software has different data than you can
                                    pull from revenue insights.
                                </p>
                                <p>
                                    this mess of third party data integrations leads to siloed views of a customer.
                                    sure, you can make educated decisions from a subset of data but it’s{' '}
                                    <strong>an order of magnitude more powerful</strong> when you have the full picture.
                                </p>
                                <p>
                                    PostHog can import data from third party sources into our data warehouse, but as you
                                    start sending more data directly to PostHog OS,every PostHog product has access to
                                    the same data.
                                </p>
                                <p>
                                    and when you layer AI into the mix, you can produce more accurate, more valuable
                                    insights than in any single other product – because PostHog has access to nuanced
                                    data you never thought would be worth sending via an integration (or would be
                                    cost-prohibitive to do so).
                                </p>
                                <p>
                                    the fundamental difference with PostHog – this unified customer infrastructure –
                                    means everyone is working from the same central source of data.
                                </p>
                            </div>
                        ),
                    },
                ]}
            />
        </div>
    )
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
    const { getCustomers } = useCustomers()
    const hugeCustomers = getCustomers(HUGE)
    const gonnaBeHugeCustomers = getCustomers(GONNA_BE_HUGE)

    // Helper function to render logo - same logic as CustomersSlide.tsx
    const renderLogo = (customer: any) => {
        if (!customer.logo) {
            return <span className="text-xs">{customer.name}</span>
        }

        // Check if logo is a React component (single SVG format)
        if (typeof customer.logo === 'function') {
            const LogoComponent = customer.logo
            const heightClass = customer.height ? `h-${customer.height}` : 'h-6'
            const className = `w-full fill-current object-contain ${heightClass} max-h-6`.trim()

            return <LogoComponent className={className} />
        }

        // Otherwise, it's the existing light/dark object format
        const heightClass = customer.height ? `max-h-${customer.height}` : 'max-h-6'

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

    const columns = [
        { name: 'Huge companies', width: 'minmax(auto,1fr)', align: 'center' as const },
        { name: 'Gonna be huge companies', width: 'minmax(auto,1fr)', align: 'center' as const },
    ]

    const rows = [
        {
            cells: [
                {
                    content: (
                        <div className="flex flex-wrap gap-4 justify-center items-center">
                            {hugeCustomers.map((customer) => (
                                <div key={customer.slug} className="h-8 flex items-center justify-center">
                                    {renderLogo(customer)}
                                </div>
                            ))}
                        </div>
                    ),
                    className: '!p-4',
                },
                {
                    content: (
                        <div className="flex flex-wrap gap-4 justify-center items-center">
                            {gonnaBeHugeCustomers.map((customer) => (
                                <div key={customer.slug} className="h-8 flex items-center justify-center">
                                    {renderLogo(customer)}
                                </div>
                            ))}
                        </div>
                    ),
                    className: '!p-4',
                },
            ],
        },
    ]

    return <OSTable columns={columns} rows={rows} size="sm" className="mt-4" />
}

const jsxComponentDescriptors: JsxComponentDescriptor[] = [
    {
        name: 'ProductCount',
        kind: 'flow',
        props: [],
        Editor: () => <ProductCount />,
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
        name: 'PageNavigation',
        kind: 'flow',
        props: [],
        Editor: () => <PageNavigation />,
    },
    {
        name: 'HomeHappyHog',
        kind: 'flow',
        props: [],
        Editor: () => <HomeHappyHog />,
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
        name: 'Headline',
        kind: 'flow',
        props: [],
        Editor: () => (
            <h1 className="flex items-end gap-1">
                welcome to <Logo />
            </h1>
        ),
    },
    {
        name: 'AIAgents',
        kind: 'flow',
        props: [],
        Editor: () => <AIAgents />,
    },
    {
        name: 'CustomerInfrastructureAccordion',
        kind: 'flow',
        props: [],
        Editor: () => <CustomerInfrastructureAccordion />,
    },
    // {
    //     name: 'Pricing',
    //     kind: 'flow',
    //     props: [],
    //     Editor: () => <Pricing />,
    // },
    {
        name: 'Customers',
        kind: 'flow',
        props: [],
        Editor: () => <Customers />,
    },
    {
        name: 'DebugContainerQuery',
        kind: 'flow',
        props: [],
        Editor: () => <DebugContainerQuery />,
    },
    {
        name: 'CTA',
        kind: 'flow',
        props: [],
        Editor: () => (
            <>
                <p className="-mt-2">
                    if nothing else has sold you on PostHog, hopefully these classic marketing tactics will.
                </p>
                <CTA headline={false} />
            </>
        ),
    },
    {
        name: 'Logo',
        kind: 'flow',
        props: [],
        Editor: () => <Logo className="inline-block" />,
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
    const { setWindowTitle, isMobile, addWindow, updateWindow, siteSettings } = useApp()
    const posthog = usePostHog()
    const [positionUpdated, setPositionUpdated] = useState(false)

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'home.mdx')
            if (appWindow.location?.key === 'initial' && siteSettings.experience !== 'boring') {
                addWindow(
                    <Start
                        newWindow
                        location={{ pathname: `start` }}
                        key={`start`}
                        position={{
                            x: appWindow.position.x + 50,
                            y: appWindow.position.y + 200,
                        }}
                    />
                )
            }
        }
    }, [])

    useEffect(() => {
        if (appWindow && appWindow.location?.key === 'initial' && !isMobile && !positionUpdated) {
            updateWindow(appWindow, {
                position: { x: appWindow.position.x - 50, y: appWindow.position.y },
            })
            setPositionUpdated(true)
        }
    }, [appWindow])

    return (
        <>
            <SEO title="home.mdx" description="Home" image="https://posthog.com/og-image.png" />
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

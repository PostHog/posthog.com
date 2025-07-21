import React, { useEffect, useState } from 'react'
import Link from 'components/Link'
import OSTable from 'components/OSTable'
import { useCustomers } from 'hooks/useCustomers'
import CTA from 'components/Home/CTA'
import { IconArrowRight } from '@posthog/icons'
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
        <span className={`flex flex-wrap gap-1 ${className}`}>
            {productTypes.map((type, index) => {
                const product = getProduct(type)
                return product ? (
                    <OSButton
                        key={type}
                        variant="ghost"
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

const HappyHog = () => {
    return (
        <img
            src="https://res.cloudinary.com/dmukukwp6/image/upload/happy_hog_ebc59e4658.png"
            alt="happy hog"
            className="max-w-[400px] max-h-48 -mt-2 -mr-2"
        />
    )
}

const Products = () => {
    const columns = [
        { name: '', width: 'auto', align: 'center' as const },
        { name: 'goal', width: 'minmax(150px,250px)', align: 'left' as const },
        { name: 'products', width: 'minmax(auto,1fr)', align: 'left' as const },
    ]

    const rows = [
        {
            cells: [
                { content: 1 },
                { content: 'understand product usage', className: 'font-bold' },
                {
                    content: <ProductButtons productTypes={['web_analytics', 'product_analytics', 'session_replay']} />,
                    className: 'text-sm flex-wrap gap-px',
                },
            ],
        },
        {
            cells: [
                { content: 2 },
                { content: 'test new features', className: 'font-bold' },
                {
                    content: <ProductButtons productTypes={['feature_flags', 'experiments', 'error_tracking']} />,
                    className: 'text-sm',
                },
            ],
        },
        {
            cells: [
                { content: 3 },
                { content: 'talk to customers', className: 'font-bold' },
                {
                    content: <ProductButtons productTypes={['surveys', 'user_interviews', 'broadcasts']} />,
                    className: 'text-sm',
                },
            ],
        },
        {
            cells: [
                { content: 4 },
                { content: 'organize usage data', className: 'font-bold' },
                {
                    content: <ProductButtons productTypes={['data_warehouse', 'cdp']} />,
                    className: 'text-sm',
                },
            ],
        },
    ]

    return (
        <div className="mt-4">
            <OSTable columns={columns} rows={rows} size="sm" />
            <div className="bg-accent p-1 text-right text-xs border-primary border-x border-b">
                <Link to="/products" state={{ newWindow: true }} className="hover:underline">
                    Open product explorer <IconArrowRight className="inline-block -rotate-45 size-4 text-primary" />
                </Link>
            </div>

            <p className="mt-2 inline-flex items-center">
                <span>using these tools, you can track your findings with</span>
                <ProductButtons productTypes={['dashboards']} />

                <span>or create</span>
                <ProductButtons productTypes={['notebooks']} />
            </p>
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
                            {hugeCustomers.map((customer) =>
                                customer.logo ? (
                                    <div key={customer.slug} className="h-8 flex items-center justify-center">
                                        <img
                                            src={customer.logo.light}
                                            alt={customer.name}
                                            className={`h-full w-auto object-contain dark:hidden`}
                                            style={{ maxHeight: customer.height ? `${customer.height}px` : 'auto' }}
                                        />
                                        <img
                                            src={customer.logo.dark}
                                            alt={customer.name}
                                            className={`h-full w-auto object-contain hidden dark:block`}
                                            style={{ maxHeight: customer.height ? `${customer.height}px` : 'auto' }}
                                        />
                                    </div>
                                ) : null
                            )}
                        </div>
                    ),
                    className: '!p-4',
                },
                {
                    content: (
                        <div className="flex flex-wrap gap-4 justify-center items-center">
                            {gonnaBeHugeCustomers.map((customer) =>
                                customer.logo ? (
                                    <div key={customer.slug} className="h-8 flex items-center justify-center">
                                        <img
                                            src={customer.logo.light}
                                            alt={customer.name}
                                            className={`h-full w-auto object-contain dark:hidden`}
                                            style={{ maxHeight: customer.height ? `${customer.height}px` : 'auto' }}
                                        />
                                        <img
                                            src={customer.logo.dark}
                                            alt={customer.name}
                                            className={`h-full w-auto object-contain hidden dark:block`}
                                            style={{ maxHeight: customer.height ? `${customer.height}px` : 'auto' }}
                                        />
                                    </div>
                                ) : null
                            )}
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
        name: 'PageNavigation',
        kind: 'flow',
        props: [],
        Editor: () => <PageNavigation />,
    },
    {
        name: 'HappyHog',
        kind: 'flow',
        props: [],
        Editor: () => <HappyHog />,
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
        name: 'Products',
        kind: 'flow',
        props: [],
        Editor: () => <Products />,
    },
    {
        name: 'Roadmap',
        kind: 'flow',
        props: [],
        Editor: () => <Roadmap frame={false} />,
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
        Editor: () => <CTA />,
    },
    {
        name: 'Logo',
        kind: 'flow',
        props: [],
        Editor: () => <Logo noText className="inline-block" />,
    },
]

export default function ProductToolkit() {
    const {
        mdx: { rawBody },
    } = useStaticQuery(graphql`
        query {
            mdx(slug: { eq: "product-toolkit" }) {
                rawBody
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
            <SEO title="Welcome to PostHog!" description="Home" image="https://posthog.com/og-image.png" />
            <MDXEditor
                jsxComponentDescriptors={jsxComponentDescriptors}
                body={rawBody}
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

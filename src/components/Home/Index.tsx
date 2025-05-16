import React, { useEffect, useState } from 'react'
import SEO from 'components/seo'
import Link from 'components/Link'
import Editor from 'components/Editor'
import OSTable from 'components/OSTable'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { useCustomers } from 'hooks/useCustomers'
import Logo from 'components/Logo'
import CTA from './CTA'
import { IconArrowRight, IconGraph, IconPieChart, IconRewindPlay } from '@posthog/icons'
import Roadmap from './New/Roadmap'
import Pricing from './New/Pricing'
import OSButton from 'components/OSButton'
import useProduct from 'hooks/useProduct'
import { Accordion } from 'components/RadixUI/Accordion'

interface ProductButtonsProps {
    productTypes: string[]
    className?: string
}

const ProductButtons: React.FC<ProductButtonsProps> = ({ productTypes, className = "" }) => {
    const allProducts = useProduct()

    // Helper to get product by type or name
    const getProduct = (typeOrName: string) =>
        Array.isArray(allProducts)
            ? allProducts.find(
                (p: any) => p.type === typeOrName || p.name === typeOrName
            )
            : undefined

    return (
        <span className={`flex flex-wrap gap-1 ${className}`}>
            {productTypes.map((type) => {
                const product = getProduct(type)
                return product ? (
                    <OSButton
                        key={product.type}
                        variant="ghost"
                        icon={product.Icon ? <product.Icon /> : undefined}
                        iconClassName={`text-${product.color}`}
                        color={product.color}
                        className="font-medium text-primary hover:text-primary"
                        to={`${product.slug}`}
                        state={{ newWindow: true }}
                        asLink
                    >
                        {product.name}
                    </OSButton>
                ) : null
            })}
        </span>
    )
}

const Products = () => {
    const allProducts = useProduct() // This returns the deduped array of products

    // Helper to get product by type or name
    const getProduct = (typeOrName) =>
        allProducts.find(
            (p) => p.type === typeOrName || p.name === typeOrName
        )

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
                }
            ],
        },
        {
            cells: [
                { content: 2 },
                { content: 'test new features', className: 'font-bold' },
                { 
                    content: <ProductButtons productTypes={['feature_flags', 'experiments', 'error_tracking']} />,
                    className: 'text-sm' 
                },
            ],
        },
        {
            cells: [
                { content: 3 },
                { content: 'get feedback from users', className: 'font-bold' },
                { 
                    content: <ProductButtons productTypes={['surveys']} />,
                    className: 'text-sm' 
                },
            ],
        },
        {
            cells: [
                { content: 4 },
                { content: 'consolidate product usage data', className: 'font-bold' },
                { 
                    content: <ProductButtons productTypes={['data_warehouse', 'data_pipelines']} />,
                    className: 'text-sm' 
                },
            ],
        },
    ]

    return (
        <div>
            <OSTable columns={columns} rows={rows} />
            <div className="bg-accent p-1 text-right text-xs border-primary border-x border-b">
                <Link to="/products" state={{ newWindow: true }} className="hover:underline">
                    Open product explorer <IconArrowRight className="inline-block -rotate-45 size-4 text-primary" />
                </Link>
            </div>
        </div>
    )
}

const sections = [
    {
        title: 'products',
        description: 'PostHog helps you...',
        content: <Products />,
    },
    {
        title: 'roadmap',
        description: "we haven't built our defining feature. customers help us decide what to build next.",
        content: <Roadmap frame={false} />,
    },
    {
        title: 'pricing',
        description:
            'our usage-based pricing means you don\'t have to "talk to sales". plus each product has a generous monthly free tier – in fact, 98% of customers use PostHog for free!',
        content: <Pricing />,
    },
    {
        title: 'logos',
        description:
            "here are some of our paying customers. (yes they actually use us, no it's not just some random engineer that tried us out 2+ years ago.)",
        content: '', // component with logos
    },
    {
        title: 'why PostHog?',
        description: "we're different from most companies for a bunch of reasons:",
        content: (
            <>
                <ul>
                    <li>
                        <strong>transparency.</strong> read our <Link to="/handbook">company handbook</Link>, our{' '}
                        <Link to="/sales-manual">sales manual</Link>, or <Link to="/strategy">company strategy</Link>
                    </li>
                    <li>
                        <strong>we ship fast.</strong> see our <Link to="/changelog">changelog</Link>
                    </li>
                    <li>
                        <strong>actually-technical support.</strong> our <Link to="/support">support people</Link> all
                        have engineering backgrounds.
                    </li>
                </ul>
                <p>
                    <Link to="/company-tour">take the company tour</Link> →
                </p>
            </>
        ),
    },
    {
        title: 'bedtime reading',
        description: 'here are some links that may be interesting to you:',
        content: (
            <>
                <ul>
                    <li>
                        <Link to="/demo.mov">demo.mov</Link>
                    </li>
                    <li>
                        <Link to="/technical-docs">technical docs</Link>
                    </li>
                    <li>
                        <Link to="/api">api</Link>
                    </li>
                    <li>
                        <Link to="/ask-a-question">ask a question</Link>
                    </li>
                    <li>
                        <Link to="/small-teams-at-posthog">small teams at PostHog</Link>
                    </li>
                </ul>
            </>
        ),
    },
    {
        title: 'shameless CTA',
        // description: 'we have a lot of features. here are some of them.',
        content: <CTA />,
    },
]

const CUSTOMER_ORDER = [
    'ycombinator',
    'mistralai',
    'elevenlabs',
    'raycast',
    'airbus',
    'dhl',
    'startengine',
    'assemblyai',
    'hasura',
    'trust',
    'researchgate',
    'posthog',
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

const Customer = ({ number, customer }: CustomerProps) => {
    const { hasCaseStudy } = useCustomers()
    return {
        cells: [
            { content: number },
            {
                content: customer.logo ? (
                    <>
                        <img
                            src={customer.logo.light}
                            alt={customer.name}
                            className="w-auto object-contain dark:hidden"
                        />
                        <img
                            src={customer.logo.dark}
                            alt={customer.name}
                            className="w-auto object-contain hidden dark:block"
                        />
                    </>
                ) : (
                    <span>{customer.name}</span>
                ),
                className: '!p-4',
            },
            { content: customer.toolsUsed?.join(', '), className: 'text-sm' },
            { content: hasCaseStudy(customer.slug) ? <Link to={`/customers/${customer.slug}`}>Link</Link> : null },
            { content: customer.notes || '', className: 'text-sm' },
        ],
    }
}

export default function Home(): JSX.Element {
    const { getCustomers, hasCaseStudy } = useCustomers()
    const customers = getCustomers(CUSTOMER_ORDER)
    const [filteredCustomers, setFilteredCustomers] = useState<any>(null)

    const columns = [
        { name: '', width: 'auto', align: 'center' as const },
        { name: 'Company name', width: 'minmax(150px,1fr)', align: 'center' as const },
        { name: 'Product(s) used', width: 'minmax(auto,250px)' },
        { name: 'Case study?', width: 'minmax(auto,100px)', align: 'center' as const },
        { name: 'Notes', width: 'minmax(auto,180px)', align: 'center' as const },
    ]

    const rows = (filteredCustomers || customers).map((customer: CustomerProps, index: number) => {
        return Customer({
            number: index + 1,
            customer,
        })
    })

    return (
        <>
            <SEO title="home.mdx – PostHog" description="" image={`/images/og/customers.jpg`} />
            <Editor
                title="home"
                type="mdx"
                slug="/"
                availableFilters={[
                    {
                        label: 'company name',
                        options: [
                            { label: 'Any', value: null },
                            ...customers.map((customer) => ({
                                label: customer.name,
                                value: customer.name,
                            })),
                        ],
                        filter: (obj, value) => obj['name'] === value,
                        operator: 'equals',
                    },
                    {
                        label: 'product(s) used',
                        options: [
                            { label: 'Any', value: null },
                            ...Array.from(
                                new Set(
                                    customers
                                        .filter((customer) => customer.toolsUsed?.length)
                                        .flatMap((customer) => customer.toolsUsed || [])
                                )
                            ).map((tool) => ({
                                label: tool,
                                value: tool,
                            })),
                        ],
                        filter: (obj, value) => obj['toolsUsed'].includes(value),
                        operator: 'includes',
                    },
                    {
                        label: 'case study',
                        options: [
                            { label: 'Any', value: null },
                            { label: 'TRUE', value: true },
                            { label: 'FALSE', value: false },
                        ],
                        filter: (obj, value) => (value ? hasCaseStudy(obj.slug) : !hasCaseStudy(obj.slug)),
                        operator: 'equals',
                    },
                ]}
                dataToFilter={customers}
                onFilterChange={(data) => setFilteredCustomers(data)}
            >
                <ScrollArea>
                    <h1>
                        welcome to <Logo className="inline-block" />
                    </h1>
                    <p>we build tools for people who build products.</p>

                    <div data-scheme="secondary">
                        <Accordion
                        items={[
                            {
                                value: 'table-of-contents',
                                trigger: <strong>Contents</strong>,
                                content: <div>
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
                            }
                        ]}
                        />
                    </div>

                    <div className="space-y-8">
                        {sections.map((section, index) => (
                            <div key={section.title} id={section.title.toLowerCase().replace(/\s+/g, '-')}>
                                <h2>{section.title}</h2>
                                {section.description && <p>{section.description}</p>}
                                {section.content}
                            </div>
                        ))}
                    </div>

                    <OSTable columns={columns} rows={rows} />
                </ScrollArea>
            </Editor>
        </>
    )
}

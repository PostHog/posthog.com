import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import Tooltip from 'components/Tooltip'
import { graphql, useStaticQuery } from 'gatsby'
import slugify from 'slugify'
import TeamPatch from 'components/TeamPatch'
import { CallToAction } from 'components/CallToAction'
import { useUser } from 'hooks/useUser'
import SidebarSection from 'components/PostLayout/SidebarSection'
import { Contributor } from 'components/PostLayout/Contributors'
import { productMenu } from '../navs'
import RoadmapPreview from 'components/RoadmapPreview'
import { PRODUCT_COUNT } from '../constants'
import { FC, useState } from 'react'
import * as Icons from '@posthog/icons'
import { IconX, IconSearch } from '@posthog/icons'

interface ProductListingProps {
    name: string
    description: string
    freeTierLimit?: string
    startingPrice: string
    url: string
    icon: React.ReactNode
    color: string
    denominator: string
}

const ProductListing: FC<ProductListingProps> = ({
    name,
    description,
    freeTierLimit,
    startingPrice,
    url,
    icon,
    denominator,
    color,
}) => {
    return (
        <div className="flex flex-col items-start gap-2 bg-white dark:bg-accent-dark p-4 border border-light dark:border-dark rounded-sm">
            <Link href={url} className="flex items-center gap-2 hover:underline !text-primary dark:!text-primary-dark">
                {icon}
                <h2 className="text-lg mb-0 text-primary dark:text-primary-dark">{name}</h2>
            </Link>
            <p className="opacity-70 text-[15px] mb-2">{description}</p>
            <div className="mt-auto w-full">
                <dl className="grid @3xl:grid-cols-2 gap-x-2 @3xl:gap-y-1 text-sm mb-4 w-full">
                    <dt className="order-1 @3xl:order-none">
                        <label className="font-normal opacity-75">Monthly free tier</label>
                    </dt>
                    <dt className="order-3 @3xl:order-none">
                        <label className="font-normal opacity-75">Then pricing starts at</label>
                    </dt>
                    <dd className="order-2 @3xl:order-none pb-2 @3xl:pb-0">
                        <p className="mb-0 text-[15px]">
                            <strong className="text-green">
                                {freeTierLimit} {denominator}s
                            </strong>
                        </p>
                    </dd>
                    <dd className="order-4 @3xl:order-none">
                        <p className="mb-0 text-[15px]">
                            <strong>{startingPrice}</strong>/<span className="text-sm opacity-70">{denominator}</span>
                        </p>
                    </dd>
                </dl>
                <CallToAction to={url} type="secondary" size="sm" width="auto">
                    Explore
                </CallToAction>
            </div>
        </div>
    )
}

const productDetails: Record<
    string,
    {
        freeTierLimit: string
        startingPrice: string
        description: string
        denominator: string
        roles: string[]
        goals: string[]
        complexity: string[]
    }
> = {
    'product-analytics': {
        freeTierLimit: '1 million',
        denominator: 'event',
        startingPrice: '$0.00005',
        description: 'Understand user behavior with event-based analytics, cohorts, and conversion funnels',
        roles: ['Product engineers', 'Startups & founders'],
        goals: ['Understand user behavior', 'Improve product'],
        complexity: ['Low-code'],
    },
    'web-analytics': {
        freeTierLimit: '1 million',
        denominator: 'event',
        startingPrice: '$0.00005',
        description: 'Privacy-friendly website analytics with no cookie banner required',
        roles: ['Marketing', 'Sales'],
        goals: ['Understand user behavior', 'Data ops and monitoring'],
        complexity: ['Low-code'],
    },
    'session-replay': {
        freeTierLimit: '5,000',
        denominator: 'recording',
        startingPrice: '$0.005',
        description: 'Watch people use your product to diagnose issues and understand user behavior',
        roles: ['Support', 'Product engineers', 'Sales'],
        goals: ['Diagnose issues', 'Understand user behavior'],
        complexity: ['Low-code'],
    },
    'feature-flags': {
        freeTierLimit: '1 million',
        denominator: 'request',
        startingPrice: '$0.0001',
        description: 'Release features safely with targeted rollouts',
        roles: ['Product engineers', 'Startups & founders'],
        goals: ['Improve product', 'Diagnose issues'],
        complexity: ['People who code'],
    },
    experiments: {
        freeTierLimit: '1 million',
        denominator: 'request',
        startingPrice: '$0.0001',
        description: 'Run A/B tests to optimize your product with statistical significance',
        roles: ['Product people', 'Startups & founders'],
        goals: ['Improve product', 'Data ops and monitoring'],
        complexity: ['People who code'],
    },
    surveys: {
        freeTierLimit: '250',
        denominator: 'response',
        startingPrice: '$0.20',
        description: 'Get qualitative feedback from the right users at the right time',
        roles: ['Product people', 'Marketing', 'Sales'],
        goals: ['Understand user behavior', 'Improve product'],
        complexity: ['Low-code'],
    },
    'data-warehouse': {
        freeTierLimit: '1 million',
        denominator: 'row',
        startingPrice: '$0.000015',
        description: 'Query your data with SQL in our lightning-fast data warehouse',
        roles: ['Data engineers', 'Startups & founders'],
        goals: ['Data ops and monitoring', 'Improve product'],
        complexity: ['People who code'],
    },
    cdp: {
        freeTierLimit: '1 million',
        denominator: 'row',
        startingPrice: '$0.000062',
        description: 'Send customer data anywhere with our CDP and reverse ETL pipeline',
        roles: ['Data engineers', 'Marketing'],
        goals: ['Data ops and monitoring', 'Diagnose issues'],
        complexity: ['People who code'],
    },
}

const filters = [
    {
        name: 'roles',
        label: 'By role',
        options: [
            { name: 'Product engineers', icon: 'IconPullRequest', color: 'purple' },
            { name: 'Startups & founders', icon: 'IconRocket', color: 'blue' },
            { name: 'Product people', icon: 'IconGanttChart', color: 'pink' },
            { name: 'Marketing', icon: 'IconMegaphone', color: 'blue' },
            { name: 'Data engineers', icon: 'IconBinary', color: 'orange' },
            { name: 'Support', icon: 'IconSupport', color: 'red' },
            { name: 'Sales', icon: 'IconTrending', color: 'green' },
        ],
    },
    {
        name: 'goals',
        label: 'By goal',
        options: [
            { name: 'Understand user behavior', icon: 'IconLightBulb', color: 'purple' },
            { name: 'Improve product', icon: 'IconStarHalfFilled', color: 'blue' },
            { name: 'Diagnose issues', icon: 'IconStethoscope', color: 'orange' },
            { name: 'Data ops and monitoring', icon: 'IconPulse', color: 'pink' },
        ],
    },
    {
        name: 'complexity',
        label: 'By product type',
        options: [
            { name: 'People who code', icon: 'IconCode2', color: 'purple' },
            { name: 'Low-code', icon: 'IconCursor', color: 'blue' },
        ],
    },
]

const Teams: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [activeFilter, setActiveFilter] = useState<{ type: string; value: string } | null>(null)

    const { james, supportTeam } = useStaticQuery(graphql`
        {
            james: squeakProfile(squeakId: { eq: 27732 }) {
                squeakId
                firstName
                lastName
                avatar {
                    url
                }
                companyRole
            }
        }
    `)

    const products = productMenu.children
        .filter((product) => {
            const key = product.url.replace('/', '')
            return key !== 'product-os' && productDetails[key]
        })
        .map((product) => {
            const IconComponent = Icons[product.icon as keyof typeof Icons]
            const key = product.url.replace('/', '')
            const details = productDetails[key]

            return {
                name: product.name,
                url: product.url,
                icon: <IconComponent className={`text-${product.color} size-6`} />,
                color: product.color,
                ...details,
            }
        })

    const filteredProducts = products
        .filter((product) => {
            const searchable = `${product.name} ${product.description}`.toLowerCase()
            return searchable.includes(searchTerm.toLowerCase())
        })
        .filter((product) => {
            if (!activeFilter) {
                return true
            }
            return product[activeFilter.type].includes(activeFilter.value)
        })

    return (
        <Layout>
            <SEO
                title="Products"
                description={`${PRODUCT_COUNT} products and counting`}
                image={`/images/og/products.png`}
            />
            <PostLayout
                contentWidth="56rem"
                title={'Products'}
                hideSurvey
                sidebar={
                    <SidebarSection className="space-y-8">
                        <div className="">
                            <h3 className="text-lg mt-4 mb-2">Products</h3>
                            <p className="text-[15px]">
                                <strong>
                                    PostHog is an entire suite of products you can use to make your software successful.
                                </strong>
                            </p>

                            <p className="text-[15px] mb-0">
                                <strong>We have 10+ products today</strong> – but even if we don’t have it yet, we will
                                eventually. We are going to build every piece of SaaS you need to make your product
                                successful. Learn more about{' '}
                                <Link href="/why">why picking PostHog is a no-brainer</Link>.
                            </p>
                        </div>
                        <div className="">
                            <h3 className="text-lg mb-2">Product OS</h3>
                            <p className="text-[15px] mb-2">
                                Build and scale your product with our complete open source product operating system.
                            </p>
                            <p className="text-[15px] mb-2">
                                All our products are built on it, and it offers many features available to all of our
                                products, like:
                            </p>
                            <ul className="pl-4 mb-4 [&_li]:text-[15px]">
                                <li>Autocapture</li>
                                <li>Webhooks</li>
                                <li>Reverse proxy</li>
                                <li>API</li>
                                <li>SQL access</li>
                            </ul>
                            <CallToAction to="/product-os" size="sm" type="secondary">
                                Learn about Product OS
                            </CallToAction>
                        </div>
                        <div className="">
                            <h3 className="text-lg mb-2">Add-ons</h3>
                            <p className="text-[15px] mb-2">
                                Our a-la-carte model means you can pick and choose the features you need without paying
                                for anything you don't.
                            </p>
                            <p className="mb-2">
                                <strong>Available add-ons:</strong>
                            </p>
                            <ul className="pl-4 mb-4 [&_li]:text-[15px]">
                                <li>Teams features</li>
                                <li>Person profiles (identify users)</li>
                                <li>Group analytics</li>
                                <li>Data pipelines</li>
                            </ul>
                            <CallToAction to="/addons" size="sm" type="secondary">
                                Learn about add-ons
                            </CallToAction>
                        </div>
                    </SidebarSection>
                }
                menu={[
                    { name: 'Explore products' },
                    {
                        name: 'All products',
                        onClick: () => setActiveFilter(null),
                        active: !activeFilter,
                        icon: 'IconApps',
                        color: 'pink',
                    },
                    ...filters.flatMap((filter) => [
                        {
                            name: filter.label,
                        },
                        ...filter.options.map((option) => ({
                            name: option.name,
                            icon: option.icon,
                            onClick: () => {
                                setActiveFilter({ type: filter.name, value: option.name })
                            },
                            active: activeFilter?.type === filter.name && activeFilter?.value === option.name,
                            color: option.color,
                        })),
                    ]),
                ]}
            >
                <section className="mx-auto">
                    <div className="flex flex-col md:items-center md:justify-end md:flex-row-reverse gap-8 md:gap-2">
                        <div className="md:flex-1">
                            <div className="@container">
                                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4 w-full">
                                    <h1 className="text-2xl flex-1 mb-0">
                                        {activeFilter ? activeFilter.value : 'All products'}
                                    </h1>
                                    <aside>
                                        <div className="relative">
                                            <IconSearch className="size-5 absolute left-2 top-1/2 -translate-y-1/2 text-primary/50 dark:text-primary-dark/50" />
                                            <input
                                                type="text"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                placeholder="Search products"
                                                className="border border-light dark:border-dark rounded-sm py-1 pl-7 pr-8 w-full md:w-auto bg-white dark:bg-accent-dark text-[15px]"
                                            />
                                            {searchTerm && (
                                                <button
                                                    onClick={() => setSearchTerm('')}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                                >
                                                    <IconX className="size-4" />
                                                </button>
                                            )}
                                        </div>
                                    </aside>
                                </div>

                                {filteredProducts.length > 0 ? (
                                    <>
                                        <div className="grid grid-cols-1 @lg:grid-cols-2 gap-4">
                                            {filteredProducts.map((product) => (
                                                <ProductListing key={product.url} {...product} />
                                            ))}
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 mt-8">
                                            <CallToAction to="https://app.posthog.com/signup">
                                                Get started - free
                                            </CallToAction>
                                            <CallToAction to="/product-analytics" type="secondary">
                                                Explore products
                                            </CallToAction>
                                        </div>
                                    </>
                                ) : (
                                    <div className="p-8 rounded border border-light dark:border-dark bg-accent dark:bg-accent-dark">
                                        <p className="mb-2 opacity-70">No results</p>
                                        <h2 className="mb-1">We haven't built that one... but maybe we should?</h2>
                                        <p className="mb-4">Help us decide what to build by voting on our roadmap.</p>
                                        <CallToAction to="/roadmap" size="md">
                                            Visit our roadmap
                                        </CallToAction>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </PostLayout>
        </Layout>
    )
}

export default Teams

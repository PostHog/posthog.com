import React, { useEffect } from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import Link from 'components/Link'
import {
    IconArrowRight,
    IconArrowUpRight,
    IconAsterisk,
    IconClock,
    IconDatabase,
    IconDatabaseBolt,
    IconGraph,
    IconPlug,
    IconShuffle,
} from '@posthog/icons'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import { useApp } from '../../context/App'
import useProduct from '../../hooks/useProduct'
import CloudinaryImage from 'components/CloudinaryImage'
import { useWindow } from '../../context/Window'
import TeamMember from 'components/TeamMember'
import WistiaCustomPlayer from 'components/WistiaCustomPlayer'
import DuckDBWaitlistSurvey from 'components/DuckDBWaitlistSurvey'

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

export default function CDP(): JSX.Element {
    // Define the specific data products we want to display in order
    const dataProducts = ['sql', 'data_warehouse', 'cdp', 'api', 'webhooks']

    // Get all products and filter to only the data category ones we want
    const allProducts = useProduct()
    const products = Array.isArray(allProducts)
        ? dataProducts.map((handle) => allProducts.find((product: any) => product.handle === handle)).filter(Boolean)
        : []

    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'PostHog data stack.md')
        }
    }, [])

    const dataStackProducts: Array<{
        id: string
        title: string
        description: string
        url: string
        perfectFor?: string
        notReadyFor?: string
        badge?: string
        icon: string
        showWaitlist?: boolean
    }> = [
        {
            id: 'managed-duckdb',
            icon: 'IconDatabaseBolt',
            title: 'Managed DuckDB warehouse',
            url: '/customer-data-infrastructure/managed-warehouse',
            badge: 'Beta',
            description:
                "A single-tenant DuckDB warehouse that's automatically filled with your PostHog data - and anything else you sync in.",
            perfectFor: 'data engineers and analysts',
            showWaitlist: true,
        },
        {
            id: 'data-import',
            icon: 'IconArrowRight',
            title: 'Data sources & import (ELT)',
            url: 'customer-data-infrastructure/sources',
            description:
                'Use our bulk import sources to get data into your warehouse, including data from databases, ad platforms, SaaS tools, and more.',
            perfectFor: 'product teams, data engineers, and analysts',
        },
        {
            id: 'data-import',
            icon: 'IconPlug',
            title: 'CDP',
            url: '/cdp',
            description: 'Stream data through our 60+ sources send data wherever you need it.',
            perfectFor: 'product teams, data engineers, and analysts',
        },
        {
            id: 'modeling-transformation',
            icon: 'IconShuffle',
            title: 'Data Modeling',
            badge: 'Beta',
            url: 'customer-data-infrastructure/data-modeling',
            description: 'Build modular, testable data tables that load in an instant.',
            perfectFor: 'data analysts and product teams',
            notReadyFor:
                'data engineers. We recommend bringing your favorite tools like DBT for now until our tooling is more mature.',
        },
        {
            id: 'queries-visualization',
            icon: 'IconAsterisk',
            title: 'SQL editor',
            url: '/data-warehouse',
            description:
                'Explore your data with SQL, build business intelligence dashboards, and visualize key metrics.',
            perfectFor: 'product teams',
            notReadyFor:
                'data analysts. We recommend bringing your favorite tools like Hex for now until our tooling is more mature.',
        },
        {
            id: 'queries-visualization',
            icon: 'IconGraph',
            title: 'Business intelligence (BI)',
            url: '/customer-data-infrastructure/business-intelligence',
            description: 'Visualize your data with interactive dashboards and ad-hoc analyses right in PostHog.',
            perfectFor: 'product teams',
            notReadyFor:
                'data analysts. We recommend bringing your favorite tools like Hex for now until our tooling is more mature.',
        },
        {
            id: 'reverse-etl',
            icon: 'IconArrowUpRight',
            title: 'Export & Reverse ETL',
            badge: 'Beta',
            url: '/customer-data-infrastructure/export-reverse-etl',
            description: 'Get data out to the tools that run your business with reverse ETL & batch exports.',
            perfectFor: 'data engineers, product teams, and marketing teams',
        },
    ]

    return (
        <>
            <SEO
                title="Customer data infrastructure - PostHog"
                updateWindowTitle={false}
                description="Get all your data into PostHog with 60+ sources & destinations"
                image={`images/og/cdp.jpg`}
            />
            <ReaderView
                leftSidebar={<LeftSidebarContent />}
                title="posthog-data-stack.md"
                hideTitle={true}
                {...({
                    header: (
                        <>
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/data_factory_aed2d31fbf.png"
                                alt="Hedgehogs taking data to the data factory"
                                className="mt-4 px-4"
                                imgClassName="max-w-[542px] w-full mx-auto"
                            />
                            <h2 className="text-xl @md/reader-content-container:text-2xl font-bold m-4 text-center pb-4">
                                Your modern data stack on <span className="line-through">crack</span> DuckDB
                            </h2>
                        </>
                    ),
                } as any)}
            >
                {/* 
                
                TODO: Re-add this product grid later? I like it but don't have time to make it show the correct things right now.
                
                <div className="@2xl:float-right @2xl:w-[23.5rem] @2xl:ml-4 @3xl:ml-12">
                    <Fieldset legend="Customer data infrastructure">
                        <div
                            className={`not-prose grid grid-cols-[repeat(auto-fit,minmax(7rem,7rem))] gap-y-4 gap-x-1 relative [&>div]:mx-auto [&_figure]:text-center`}
                        >
                            {products.map((product: any) => (
                                <AppLink
                                    key={product.slug}
                                    label={product.name}
                                    url={`/${product.slug}`}
                                    Icon={product.parentIcon ? product.Icon : <IconPresentation />}
                                    orientation="column"
                                    parentIcon={product.parentIcon}
                                    color={product.color}
                                    background="bg-primary"
                                    className={`size-12 [&_.bg-front]:fill-${product.color} [&_.bg-rear]:fill-${product.colorSecondary}`}
                                >
                                    {!product.parentIcon &&
                                        product.Icon &&
                                        React.createElement(product.Icon, {
                                            className: `size-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[-.125rem]`,
                                        })}
                                    {product.status === 'beta' && (
                                        <span className="absolute bg-yellow top-0 left-1/2 -translate-1/2 uppercase text-2xs rounded-xs px-0.5 py-0.5 font-semibold text-black leading-none">
                                            Beta
                                        </span>
                                    )}
                                    {product.status === 'WIP' && (
                                        <span className="absolute bg-salmon text-white top-0 left-1/2 -translate-1/2 uppercase text-2xs rounded-xs px-0.5 py-0.5 font-semibold leading-none">
                                            WIP
                                        </span>
                                    )}
                                </AppLink>
                            ))}
                        </div>
                    </Fieldset>
                </div> */}
                <h3>
                    The most flexible integrated modern data stack – powered by PostHog, built on DuckDB, and designed
                    to scale
                </h3>
                <p>
                    Your data needs flexibility, tooling, and portability. We provide it all, in the most seamless data
                    warehousing experience available.
                </p>
                <p>
                    <span className="font-bold">Bring your own tools</span> like DBT and Hex to customize your
                    experience, or <span className="font-bold">use our built-in tooling</span> to get started quickly.
                    Anything that connects to Postgres can connect to your PostHog DuckDB warehouse using our{' '}
                    <Link to="https://github.com/posthog/duckgres">Duckgres wrapper</Link>.
                </p>
                <h3>
                    A modern data stack that's{' '}
                    <span className="bg-highlight p-0.5 font-bold text-red dark:text-yellow">
                        built for data engineers
                    </span>{' '}
                    and{' '}
                    <span className="bg-highlight p-0.5 font-bold text-red dark:text-yellow">
                        loved by product teams
                    </span>
                </h3>
                <p>
                    PostHog's data infrastructure is built for data engineers who need to build a{' '}
                    <span className="font-bold">robust and flexible data stack</span> to house all their business data.
                </p>

                <p>
                    And because the data is <span className="italic">seamlessly connected</span> to PostHog's product
                    ecosystem, product teams get to continue using the tools they love - like product analytics, feature
                    flags, and surveys - <span className="font-bold">all powered up by your clean & modeled data</span>.
                    It's, quite literally, the best of both worlds.
                </p>

                <h3>You get the keys to the (data) castle</h3>
                <p>
                    We give you the credentials to directly access your DuckDB data store for complete flexibility, so
                    you can bring whatever tooling fits your workflow. We also offer built-in tooling for CDP, data
                    modeling, and more so you can get started quickly.
                </p>

                <h3>Data stack products</h3>

                <ul className="list-none pl-0">
                    {dataStackProducts.map((product) => {
                        const iconMap: Record<string, typeof IconDatabase> = {
                            IconDatabaseBolt,
                            IconDatabase,
                            IconPlug,
                            IconShuffle,
                            IconAsterisk,
                            IconArrowUpRight,
                            IconArrowRight,
                            IconGraph,
                        }
                        const Icon = iconMap[product.icon]

                        return (
                            <li key={product.id} className="relative pl-8 mb-4">
                                <Icon className="size-6 inline-block text-muted absolute top-0 left-0" />
                                <Link to={product.url}>{product.title}</Link>
                                {product.badge && (
                                    <span className="rounded-sm bg-highlight py-0.5 ml-2 px-1 text-xs font-bold text-red dark:text-yellow">
                                        {product.badge}
                                    </span>
                                )}
                                <p className="text-sm text-secondary !my-0.5">{product.description}</p>
                                {product.perfectFor && (
                                    <>
                                        <p className="text-xs text-secondary ml-4 !my-0">
                                            <span className="font-bold">
                                                <IconArrowRight className="size-3 inline -mt-0.5" /> Perfect for:
                                            </span>{' '}
                                            {product.perfectFor}
                                        </p>
                                    </>
                                )}
                                {product.notReadyFor && (
                                    <>
                                        <p className="text-xs text-secondary ml-4 !my-0">
                                            <span className="font-bold">
                                                <IconClock className="size-3 inline -mt-0.5" /> Not quite ready for:
                                            </span>{' '}
                                            {product.notReadyFor}
                                        </p>
                                    </>
                                )}
                                {product.showWaitlist && (
                                    <div className="mt-2 max-w-sm">
                                        <DuckDBWaitlistSurvey />
                                    </div>
                                )}
                            </li>
                        )
                    })}
                </ul>

                {/* TODO: we might want to keep this diagram? */}
                {/* <h3>How it works</h3>
                <p>
                    Here's how data flows in and out of PostHog, and how you can transform and analyze it all in one
                    place.
                </p>
                <CDPDiagram className="max-w-lg fill-primary mx-auto" /> */}

                <h3>How our support engineers use the data warehouse</h3>
                <div>
                    <WistiaCustomPlayer mediaId="1cv9e1aimw" aspectRatio={16 / 9} className="max-w-4xl mx-auto" />
                </div>
                <p>
                    You can use data in the PostHog warehouse for almost anything, including building custom insights
                    and dashboards. One of the ways we use it ourselves is to track our support metrics, such as SLAs
                    and first response times. <TeamMember name="Abigail Richardson" photo /> writes up a summary based
                    on this data and shares it with the exec team weekly -&gt; and in the video above she explains how
                    she gathers the data using SQL.
                </p>
            </ReaderView>
        </>
    )
}

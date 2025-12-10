import React, { useEffect } from 'react'
import { Fieldset } from 'components/OSFieldset'
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
    IconPlug,
    IconShuffle,
    IconX,
} from '@posthog/icons'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import { AppLink } from 'components/OSIcons/AppIcon'
import { IconPresentation } from 'components/OSIcons'
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
    // Define table columns for each tab
    const dataInColumns = [
        { name: 'source type', width: 'minmax(170px, 1fr)', align: 'left' as const },
        { name: 'type of data', width: 'minmax(200px, 1fr)', align: 'left' as const },
        { name: 'example sources', width: 'minmax(100px, 2fr)', align: 'left' as const },
    ]

    const transformationColumns = [
        { name: 'transform type', width: 'minmax(170px, 1fr)', align: 'left' as const },
        { name: 'purpose', width: 'minmax(200px, 1fr)', align: 'left' as const },
        { name: 'example sources', width: 'minmax(100px, 2fr)', align: 'left' as const },
    ]

    const dataOutColumns = [
        { name: 'destination method', width: 'minmax(170px, 1fr)', align: 'left' as const },
        { name: 'type of data', width: 'minmax(200px, 1fr)', align: 'left' as const },
        { name: 'example destinations', width: 'minmax(100px, 2fr)', align: 'left' as const },
    ]

    // Data In tab rows
    const dataInRows = [
        {
            cells: [
                {
                    content: <Link to="/cdp?type=source">warehouse sources</Link>,
                },
                { content: 'import data from databases and SaaS tools' },
                {
                    content: 'Popular databases, Stripe, Salesforce, Snowflake, Zendesk, etc',
                    className: '',
                },
            ],
        },
        {
            cells: [
                {
                    content: <Link to="/docs/libraries">PostHog SDKs</Link>,
                },
                { content: 'customer activity in your product' },
                {
                    content: 'JS event tracking with autocapture, front end, server-side, and mobile libraries',
                    className: '',
                },
            ],
        },
        {
            cells: [
                {
                    content: <Link to="/cdp?type=source">incoming webhooks / event pipelines</Link>,
                },
                { content: 'send realtime data as events' },
                {
                    content: 'Stripe, HubSpot, Customer.io, Braze, Amplitude, Mixpanel',
                    className: '',
                },
            ],
        },
    ]

    // Transformation tab rows
    const transformationRows = [
        {
            cells: [
                {
                    content: <Link to="/cdp?type=transformation">data enrichment</Link>,
                },
                { content: 'add context and metadata to events' },
                {
                    content: 'GeoIP plugins, user agent parsing, property mapping, data validation apps',
                    className: '',
                },
            ],
        },
        {
            cells: [
                {
                    content: <Link to="/cdp?type=transformation">filtering & routing</Link>,
                },
                { content: 'control data flow and reduce noise' },
                {
                    content: 'Event filtering apps, PII scrubbing, conditional routing, sampling plugins',
                    className: '',
                },
            ],
        },
        {
            cells: [
                { content: 'custom transformations' },
                { content: 'apply business logic to your data' },
                {
                    content: 'Custom JavaScript apps, webhook transformations, API enrichment, normalization',
                    className: '',
                },
            ],
        },
    ]

    // Data Out tab rows
    const dataOutRows = [
        {
            cells: [
                {
                    content: <Link to="/cdp?type=destination">event pipelines</Link>,
                },
                { content: 'realtime event streaming to external systems' },
                {
                    content: 'Webhooks, Kafka, Amazon Kinesis, real-time dashboards',
                    className: '',
                },
            ],
        },
        {
            cells: [
                {
                    content: <Link to="/cdp?type=destination">batch exports</Link>,
                },
                { content: 'scheduled exports to data warehouses' },
                {
                    content: 'BigQuery, Snowflake, S3, PostgreSQL, ClickHouse',
                    className: '',
                },
            ],
        },
    ]

    // Define the specific data products we want to display in order
    const dataProducts = ['sql', 'data_warehouse', 'cdp', 'api', 'webhooks']

    // cdp, hog

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
            icon: 'IconPlug',
            title: 'Data import + CDP',
            url: 'TODO',
            description:
                'Use our 60+ sources to get data into your warehouse, including direct warehouse sources, SDKs, and webhooks.',
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
            title: 'Queries & visualization',
            url: '/data-warehouse',
            description:
                'Explore your data with SQL, build business intelligence dashboards, and visualize key metrics.',
            perfectFor: 'product teams',
            notReadyFor:
                'data analysts. We recommend bringing your favorite tools like Hex for now until our tooling is more mature.',
        },
        {
            id: 'reverse-etl',
            icon: 'IconArrowUpRight',
            title: 'Reverse ETL',
            badge: 'Beta',
            url: '/customer-data-infrastructure/destinations',
            description:
                'Get data out to the tools that run your business with realtime event streaming pipelines, batch exports, and webhooks.',
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
                </div>
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

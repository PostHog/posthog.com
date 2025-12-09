import React, { useEffect } from 'react'
import { Fieldset } from 'components/OSFieldset'
import OSTable from 'components/OSTable'
import OSTabs from 'components/OSTabs'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import OSButton from 'components/OSButton'
import CDPDiagram from './CDPDiagram'
import Link from 'components/Link'
import { IconArrowUpRight, IconAsterisk, IconDatabaseBolt } from '@posthog/icons'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import ZoomHover from 'components/ZoomHover'
import { AppIcon, AppIconName, AppLink } from 'components/OSIcons/AppIcon'
import { IconPresentation } from 'components/OSIcons'
import { useApp } from '../../context/App'
import useProduct from '../../hooks/useProduct'
import CloudinaryImage from 'components/CloudinaryImage'
import { TextureTan } from 'components/Textures'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import { useWindow } from '../../context/Window'
import TeamMember from 'components/TeamMember'
import WistiaCustomPlayer from 'components/WistiaCustomPlayer'

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
        // {
        //   cells: [
        //     { content: 'app integrations' },
        //     { content: 'sync data to customer-facing platforms' },
        //     {
        //       content: 'Salesforce, HubSpot, Customer.io, Braze, Amplitude, Mixpanel',
        //       className: '',
        //     },
        //   ],
        // },
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
            setWindowTitle(appWindow, 'warehouse vs ETL vs CDP??.md')
        }
    }, [])

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
                title="warehouse vs ETL vs CDP??.md"
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

                {/* <h3>data integrations</h3> */}
                {/* 
                <OSTabs
                    frame={true}
                    className="my-6"
                    triggerDataScheme="primary"
                    tabs={[
                        {
                            value: 'data-in',
                            label: 'data in',
                            content: <OSTable columns={dataInColumns} rows={dataInRows} editable={false} />,
                        },
                        {
                            value: 'transformation',
                            label: 'transformation',
                            content: (
                                <OSTable columns={transformationColumns} rows={transformationRows} editable={false} />
                            ),
                        },
                        {
                            value: 'data-out',
                            label: 'data out',
                            content: <OSTable columns={dataOutColumns} rows={dataOutRows} editable={false} />,
                        },
                    ]}
                    defaultValue="data-in"
                />
                <OSButton to="/cdp" variant="secondary" asLink>
                    view data connectors.db &rarr;
                </OSButton> 
                */}
                <h3>
                    A modern data stack that is{' '}
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

                <h3>As flexible as you are</h3>
                <p>
                    You get the keys to the (data) castle. Use our built-in tools to get started quickly, or bring your
                    own favorite tools to customize your experience.
                </p>

                <h3>Data stack products</h3>

                <ul className="list-none pl-0">
                    <li className="relative pl-8">
                        <IconArrowUpRight className="-scale-y-1 size-6 inline-block text-muted absolute top-0 left-0" />
                        <Link to="TODO">Managed DuckDB warehouse</Link>
                        <span className="rounded-sm bg-highlight py-0.5 ml-2 px-1 text-xs font-bold text-red dark:text-yellow">
                            Beta
                        </span>

                        <br />
                        <span className="text-sm text-secondary">
                            A single-tenant DuckDB warehouse that's automatically filled with your PostHog data - and
                            anything else you sync in.
                        </span>
                        <br />
                        <span className="text-sm text-secondary">Perfect for: data engineers and analysts</span>
                        <br />
                        <span className="text-sm text-secondary">TODO: waitlist entry</span>
                    </li>
                    <li className="relative pl-8">
                        <IconDatabaseBolt className="size-6 inline-block text-muted absolute top-0 left-0" />
                        <Link to="TODO">Shared Clickhouse warehouse</Link>
                        <br />
                        <span className="text-sm text-secondary">
                            Shared warehouse infrastructure for basic warehousing and analysis.
                        </span>
                        <br />
                        <span className="text-sm text-secondary">
                            Perfect for: founders, product teams, and product analysts
                        </span>
                    </li>
                    <li className="relative pl-8">
                        <IconDatabaseBolt className="size-6 inline-block text-muted absolute top-0 left-0" />
                        <Link to="TODO">Data import</Link>
                        <br />
                        <span className="text-sm text-secondary">
                            Use our 60+ sources to get data into your warehouse, including direct warehouse sources,
                            SDKs, and webhooks.
                        </span>
                        <br />
                        <span className="text-sm text-secondary">
                            Perfect for: product teams, data engineers, and analysts
                        </span>
                    </li>
                    <li className="relative pl-8">
                        <IconDatabaseBolt className="size-6 inline-block text-muted absolute top-0 left-0" />
                        <Link to="TODO">Modeling & transformation</Link>
                        <br />
                        <span className="text-sm text-secondary">
                            Build modular, testable data tables that load in an instant.
                        </span>
                        <br />
                        <span className="text-sm text-secondary">Perfect for: data analysts and product teams</span>
                        <br />
                        <span className="text-sm text-secondary">
                            Not quite ready for: data engineers. We recommend bringing your favorite tools like DBT for
                            now until our tooling is more mature.
                        </span>
                    </li>
                    <li className="relative pl-8">
                        <IconAsterisk className="size-6 inline-block text-muted absolute top-0 left-0" />
                        <Link to="/data-warehouse">Queries & visualization</Link>
                        <br />
                        <span className="text-sm text-secondary">
                            Explore your data with SQL, build business intelligence dashboards, and visualize key
                            metrics.
                        </span>
                        <br />
                        <span className="text-sm text-secondary">Perfect for: product teams</span>
                        <br />
                        <span className="text-sm text-secondary">
                            Not quite ready for: data analysts. We recommend bringing your favorite tools like Hex for
                            now until our tooling is more mature.
                        </span>
                    </li>
                    <li className="relative pl-8">
                        <IconArrowUpRight className="size-6 inline-block text-muted absolute top-0 left-0" />
                        <Link to="/customer-data-infrastructure/destinations">Reverse ETL</Link>
                        <br />
                        <span className="text-sm text-secondary">
                            Get data out to the tools that run your business with realtime event streaming pipelines,
                            batch exports, and webhooks.
                        </span>
                    </li>
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

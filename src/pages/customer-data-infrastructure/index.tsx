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
                                Unify external customer data with product usage data
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
                <p className="text-lg font-bold">
                    Analyze product and customer data in PostHog – <em>no matter where it was generated.</em>
                </p>
                <p>
                    Whether you're looking for an ETL, reverse ETL, a data warehouse, event pipelines, a CDP built for
                    product engineers, or another ambiguous industry term – it's all here.
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
                <h3>Built for product engineers</h3>
                <p>
                    PostHog's customer data infrastructure is built for product engineers who want to{' '}
                    <em>understand how product usage</em> (tracked with PostHog) <em>correlates with business data</em>{' '}
                    (generated elsewhere).
                </p>

                <ul className="list-none pl-0">
                    <li className="relative pl-8">
                        <IconArrowUpRight className="-scale-y-1 size-6 inline-block text-muted absolute top-0 left-0" />
                        <Link to="/customer-data-infrastructure/sources">Get data IN</Link>
                        <br />
                        <span className="text-sm text-secondary">SDKs, warehouse sources, webhooks</span>
                    </li>
                    <li className="relative pl-8">
                        <IconDatabaseBolt className="size-6 inline-block text-muted absolute top-0 left-0" />
                        <Link to="/customer-data-infrastructure/transformations">Transform data</Link>
                        <br />
                        <span className="text-sm text-secondary">HogQL, API, webhooks</span>
                    </li>
                    <li className="relative pl-8">
                        <IconAsterisk className="size-6 inline-block text-muted absolute top-0 left-0" />
                        <Link to="/data-warehouse">Query & visualize data</Link>
                        <br />
                        <span className="text-sm text-secondary">SQL editor, BI, data viz</span>
                    </li>
                    <li className="relative pl-8">
                        <IconArrowUpRight className="size-6 inline-block text-muted absolute top-0 left-0" />
                        <Link to="/customer-data-infrastructure/destinations">Send data OUT</Link>
                        <br />
                        <span className="text-sm text-secondary">
                            Realtime event streaming pipelines, batch exports, webhooks
                        </span>
                    </li>
                </ul>
                <h3>How it works</h3>
                <p>
                    Here's how data flows in and out of PostHog, and how you can transform and analyze it all in one
                    place.
                </p>
                <CDPDiagram className="max-w-lg fill-primary mx-auto" />
                <h3>🪦 RIP the modern data stack</h3>
                <p>
                    It was a great idea, but as the stage of your company changes, the “modern data stack” inevitably
                    devolves into a complicated mess of tools and integrations.
                </p>
                <p>
                    <strong>What’s worse:</strong> it usually means hiring someone to manage it all – and at that point,
                    the data becomes less accessible to the product engineers and product managers responsible for
                    building products.
                </p>
                <blockquote>
                    If you’re interested in reading more about how we feel about the modern data stack, read our{' '}
                    <em>definitely not-opinionated</em> blog post on it:{' '}
                    <Link to="/blog/modern-data-stack-sucks" state={{ newWindow: true }}>
                        The modern data stack sucks <IconArrowUpRight className="size-4 inline-block" />{' '}
                    </Link>
                </blockquote>
                <p>So what if it didn’t have to be this way?</p>
                <p>
                    That’s the idea with PostHog’s customer data infrastructure. everything can finally live in one
                    place, and can be analyzed with any of PostHog’s insight tools or BI visualizations. it doesn’t
                    require a data engineer, and it scales with you as you grow.
                </p>
                <p>
                    A customer data platform isn't just event pipelines and destinations. it’s not a regurgitated feed
                    of user activity. it’s not just a SQL editor and some transformations.
                </p>
                <p>
                    A true CDP is when you combine an ETL solution, event pipelines, modeling, data exporting and
                    realtime event streaming, <em>and</em> a way to analyze and visualize it (insights, product
                    analytics, BI) – all in a single place.
                </p>
                <p>
                    That's why we call it customer data infrastructure – as it's specifically built with the needs of
                    product engineers in mind – to help you get the data points you need to build success products –
                    without having to hire a dedicated team to handle it all.
                </p>
                {/* 
                <h3>Roadmap</h3>
                <p>
                    PostHog is always a work in progress. here’s what we’re working on next, and what we’re thinking
                    about building soon:
                </p>
                <h4>WIP</h4>
                <ul>
                    <li>item 1</li>
                    <li>item 2</li>
                </ul>
                <h4>Backlog</h4>
                <ul>
                    <li>item 1</li>
                    <li>item 2</li>
                </ul>
                 */}
            </ReaderView>
        </>
    )
}

import React from 'react'
import OSTable from 'components/OSTable'
import OSTabs from 'components/OSTabs'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import OSButton from 'components/OSButton'
import CDPDiagram from './CDPDiagram'
import Link from 'components/Link'
import { IconArrowUpRight } from '@posthog/icons'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'

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

    return (
        <>
            <SEO
                title="warehouse vs ETL vs CDP??.md"
                description="Get all your data into PostHog with 60+ sources & destinations"
                image={`images/og/cdp.jpg`}
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title="Customer data infrastructure" hideTitle={true}>
                <h2 className="text-2xl font-bold my-4">Unify external customer data with product usage data</h2>

                <img
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/w_800,c_limit,q_auto,f_auto/pipelines_e52c3f0e53.png"
                    className="not-prose @lg:float-right @lg:max-w-[250px] @xl:max-w-[300px] @lg:ml-4"
                />
                <p className="text-base font-semibold">
                    Analyze product and customer data in PostHog – <em>no matter where it was generated.</em>
                </p>
                <p>
                    Whether you're looking for an ETL, reverse ETL, a data warehouse, event pipelines, a CDP built for
                    product engineers, or another ambiguous industry term, it's all here.
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
                <ul>
                    <li>
                        <Link to="/customer-data-infrastructure/sources">Get data IN</Link>
                        <br />
                        <span className="text-sm text-secondary">SDKs, warehouse sources, webhooks</span>
                    </li>
                    <li>
                        <Link to="/customer-data-infrastructure/transformations">Transform data</Link>
                        <br />
                        <span className="text-sm text-secondary">HogQL, API, webhooks</span>
                    </li>
                    <li>
                        <Link to="/customer-data-infrastructure/query-data">Query & visualize data</Link>
                        <br />
                        <span className="text-sm text-secondary">SQL editor, BI, data viz</span>
                    </li>
                    <li>
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
            </ReaderView>
        </>
    )
}

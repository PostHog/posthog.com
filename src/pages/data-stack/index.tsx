import React, { useEffect } from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import Link from 'components/Link'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import { CallToAction } from 'components/CallToAction'
import { Accordion } from 'components/RadixUI/Accordion'

const SIGNUP_URL = 'https://app.posthog.com/signup'
const sectionHeadingClassName = 'my-6 mt-12 text-2xl font-bold @md/reader-content:text-3xl'

const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-highlight p-0.5 font-bold text-red dark:text-yellow">{children}</span>
)

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

const dataEngineerBullets = [
    'Set up CDC pipelines from Postgres, MySQL, and other sources',
    'Define and version core metrics so every team is working from the same numbers',
    'Build and manage reverse ETL syncs to keep downstream tools up to date',
    'Write transformation logic that enriches events with data from other systems',
    'Query billions of rows without managing a cluster',
    "Flexibility to use PostHog's full context warehouse or bring your own tools",
]

const productEngineerBullets = [
    'Sync external data sources and query them alongside your product events',
    'Build experiment cohorts from warehouse data without creating a custom pipeline',
    "Use PostHog AI to write SQL when you don't want to",
]

const storeBullets = [
    'Native connectors for the tools you already use',
    'Query using AI or our SQL Editor',
    'Use warehouse data to build cohorts, run experiments, power AI features',
]

const actBullets = [
    'Ask questions in plain English or write SQL directly',
    'Build dashboards and ad-hoc visualisations in PostHog',
    'Combine insights, replays, and experiments in a single document',
    'Sync data back to your CRM, support tools, and marketing platforms',
    'Automatically open PRs that use data to improve your product',
]

const growthColumns = ['Week 1', 'Month 3', 'Year 1'] as const

const growthRows: { label: string; cells: [string, string, string] }[] = [
    {
        label: 'Data in',
        cells: ['Send Events from your product', 'Sync Stripe and your CRM', 'Custom sources and transformation logic'],
    },
    {
        label: 'Storage',
        cells: ['No warehouse', 'Managed Warehouse, basic queries', 'Managed Warehouse, advanced modeling'],
    },
    {
        label: 'Data out',
        cells: [
            'Use PostHog Product Analytics',
            'Create Cohorts from combined data',
            'Reverse ETL to your whole stack',
        ],
    },
    {
        label: 'AI',
        cells: [
            'Ask PostHog MCP to set up your tools',
            'Use PostHog AI to query your data',
            'Get PostHog Code to self-drive your development',
        ],
    },
]

const catalogSections: {
    title: string
    items: { name: string; description: string; url: string }[]
}[] = [
    {
        title: 'Data Sources',
        items: [
            {
                name: 'Sources & Import (ELT)',
                description:
                    'Regularly sync or bulk import data into your warehouse from databases, ad platforms, SaaS tools, and more.',
                url: '/data-stack/sources',
            },
            {
                name: 'Managed Warehouse',
                description:
                    'Store, query, and join your product and business data in one place without maintaining any infrastructure.',
                url: '/data-stack/managed-warehouse',
            },
            {
                name: 'CDP',
                description:
                    'Ingest, transform, and route data between PostHog and the rest of your stack in real time.',
                url: '/cdp',
            },
            {
                name: 'Batch Exports',
                description: 'Send PostHog data to your existing warehouse or data lake on a schedule you control.',
                url: '/data-stack/reverse-etl-export',
            },
        ],
    },
    {
        title: 'Data Modeling',
        items: [
            {
                name: 'Models',
                description:
                    'Define your metrics to keep them consistent across PostHog products, update them on a schedule.',
                url: '/data-stack/data-modeling',
            },
            {
                name: 'Endpoints',
                description: 'Take any insight or SQL query and expose it as a stable API endpoint.',
                url: '/docs/api/endpoints',
            },
        ],
    },
    {
        title: 'Data Tools',
        items: [
            {
                name: 'PostHog AI',
                description:
                    'Ask questions about your data in plain English. Generates SQL, builds dashboards, and surfaces insights.',
                url: '/data-stack/posthog-ai',
            },
            {
                name: 'SQL Editor',
                description:
                    'Write and run HogQL or standard SQL directly against your data. For when you know exactly what you want and just need to ask for it properly.',
                url: '/data-stack/sql-editor',
            },
            {
                name: 'Notebooks',
                description:
                    "Combine insights, replays, flags, experiment results, and SQL into a single document. For when your analysis has a story and a dashboard isn't the right way to tell it.",
                url: '/docs/notebooks',
            },
            {
                name: 'Reverse ETL',
                description:
                    'Send data back to the tools that need it. Keep your CRM, support tools, and marketing platforms in sync.',
                url: '/data-stack/reverse-etl-export',
            },
            {
                name: 'Business Intelligence',
                description: 'Visualize your data with interactive dashboards and ad-hoc analyses right in PostHog.',
                url: '/data-stack/business-intelligence',
            },
        ],
    },
]

const faqItems = [
    {
        trigger: "Can I use PostHog's context warehouse with my existing warehouse?",
        content: (
            <p>
                Yes. You can query your existing Snowflake, BigQuery, or Redshift data inside PostHog without moving it.
                PostHog works alongside your current setup, or replaces parts of it, up to you.
            </p>
        ),
    },
    {
        trigger: "What if I'm already using Segment or Rudderstack?",
        content: (
            <p>
                You can migrate to PostHog's pipelines, or run them in parallel while you figure out what to move. The
                integrations overlap heavily, and switching is less painful than it sounds.
            </p>
        ),
    },
    {
        trigger: 'How does pricing work?',
        content: (
            <p>
                Pricing is based on compute usage. You pay for what you use. Right now many of our tools are waiting to
                be released and pricing will launch when they do.
            </p>
        ),
    },
    {
        trigger: "Is my data leaving PostHog's infrastructure?",
        content: (
            <p>
                Your PostHog data stays in PostHog Cloud (EU or US region, your choice). When you sync external sources
                into the warehouse, that data is stored in PostHog's managed infrastructure. Full details in the{' '}
                <Link to="/docs/privacy" state={{ newWindow: true }}>
                    docs
                </Link>
                .
            </p>
        ),
    },
    {
        trigger: 'How does this connect to the rest of PostHog?',
        content: (
            <p>
                Natively. Warehouse data can power cohorts used in experiments and flags. Pipeline data flows directly
                into analytics. DuckDB queries run on the same dataset your dashboards use. There's no separate sync to
                set up.
            </p>
        ),
    },
]

export default function DataStack(): JSX.Element {
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'context-warehouse.md')
        }
    }, [])

    return (
        <>
            <SEO
                title="Context warehouse - PostHog"
                updateWindowTitle={false}
                description="Every feature you ship is downstream of your data. Collect, store, transform, query using your context warehouse, and let PostHog self-drive development based on customer signals."
                image="https://res.cloudinary.com/dmukukwp6/image/upload/opengraph_3_cf73189604.png"
                imageType="absolute"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title="context-warehouse.md" hideTitle={true}>
                <div className="not-prose mb-4 w-full">
                    <h1 className="m-0 text-3xl font-bold !leading-[1.12] tracking-tight @md/reader-content:text-4xl @3xl/reader-content:text-5xl">
                        Give your agents the <Highlight>full context</Highlight>
                    </h1>
                    <p className="mb-0 mt-4 text-base font-semibold leading-relaxed text-primary">
                        Every feature you ship is downstream of your data.
                    </p>
                    <p className="mb-0 mt-2 text-base leading-relaxed text-secondary">
                        Collect, store, transform, query using your context warehouse, and let PostHog self-drive
                        development based on customer signals.
                    </p>
                </div>

                <CallToAction to={SIGNUP_URL} externalNoIcon size="sm" className="max-w-[175px]">
                    Get started
                </CallToAction>

                <h2 className={sectionHeadingClassName}>Built for data engineers, loved by product teams</h2>
                <div className="not-prose grid grid-cols-1 gap-6 @xl/reader-content:grid-cols-2">
                    <div className="rounded border border-primary bg-accent p-4 @md/reader-content:p-5">
                        <h3 className="mt-0 mb-2 text-lg font-bold">Data engineers</h3>
                        <p className="mt-0 mb-3 text-sm text-secondary">
                            Build complex models and transformations that need your expertise, not plumbing.
                        </p>
                        <ul className="mb-0 list-none space-y-2 pl-0 text-sm text-secondary">
                            {dataEngineerBullets.map((item) => (
                                <li key={item} className="relative pl-4">
                                    <span className="absolute left-0 top-2 size-1.5 rounded-full bg-red dark:bg-yellow" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded border border-primary bg-accent p-4 @md/reader-content:p-5">
                        <h3 className="mt-0 mb-2 text-lg font-bold">Product engineers</h3>
                        <p className="mt-0 mb-3 text-sm text-secondary">
                            Your data is already in PostHog. Query it, use it in experiments, and ship against it
                            without waiting on the data team.
                        </p>
                        <ul className="mb-0 list-none space-y-2 pl-0 text-sm text-secondary">
                            {productEngineerBullets.map((item) => (
                                <li key={item} className="relative pl-4">
                                    <span className="absolute left-0 top-2 size-1.5 rounded-full bg-blue" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <h2 className={sectionHeadingClassName}>Better data in, better AI out</h2>

                <h3>Start with data you trust</h3>
                <p>
                    AI products don't fail because the model is bad. They fail because the data feeding them is
                    incomplete, inconsistent, or stuck in a tool it can't reach.
                </p>
                <p>
                    PostHog's context warehouse gives your AI features a foundation that works: clean event data,
                    business context from your other tools, and full data ownership.
                </p>

                <h3>Ask @PostHog anything</h3>
                <p>
                    With all your data in one place, PostHog becomes omniscient about your business. Use PostHog AI or
                    our Slack app to generate SQL queries, model your data, and get insights about your users' behavior.
                </p>
                <p>
                    PostHog AI can be used by everyone, product teams can ask questions and get insights without relying
                    on the data team, freeing them up to build complex data models.
                </p>

                <h3>Let PostHog self-drive your development</h3>
                <p>
                    What are you going to do with all those insights? PostHog understands your product. It can identify
                    usage patterns, triage bugs, and open PRs automatically, self-driving development of your product
                    based on what it knows your users need.
                </p>

                <h3>Good solo, better together</h3>
                <p>
                    The modern data stack is a bunch of tools that can barely tolerate each other. But PostHog is a
                    system that works together.
                </p>
                <ul>
                    <li>Capture an event? It's in your analytics.</li>
                    <li>Data from Stripe? Use it with your flags.</li>
                    <li>Define a metric? Mention it in Slack.</li>
                </ul>

                <h2 className={sectionHeadingClassName}>Pipe data in</h2>
                <h3>Say goodbye pipeline wrangling</h3>
                <p>
                    Collect data from your product, website, and external tools. Filter, transform, and enrich them in
                    transit. Send them to your warehouse and build a bank of data that knows your business inside out.
                </p>
                <p>
                    It's a CDP, but because it's built into PostHog, everything you collect is immediately available in
                    your analytics, flags, and experiments. No syncing required.
                </p>
                <div className="not-prose grid grid-cols-1 gap-6 @md/reader-content:grid-cols-3 my-6">
                    <div>
                        <p className="mb-2 border-b border-primary pb-1 text-sm font-bold text-primary">
                            Business tools
                        </p>
                        <ul className="mb-0 list-none space-y-1 pl-0 text-sm text-secondary">
                            <li>Stripe</li>
                            <li>Google sheets</li>
                            <li>Hubspot</li>
                        </ul>
                    </div>
                    <div>
                        <p className="mb-2 border-b border-primary pb-1 text-sm font-bold text-primary">Storage</p>
                        <ul className="mb-0 list-none space-y-1 pl-0 text-sm text-secondary">
                            <li>Postgres</li>
                            <li>Supabase</li>
                            <li>MongoDB</li>
                        </ul>
                    </div>
                    <div>
                        <p className="mb-2 border-b border-primary pb-1 text-sm font-bold text-primary">Ad tools</p>
                        <ul className="mb-0 list-none space-y-1 pl-0 text-sm text-secondary">
                            <li>Google Ads</li>
                            <li>Meta Ads</li>
                            <li>LinkedIn Ads</li>
                        </ul>
                    </div>
                </div>
                <p>
                    <Link to="/data-stack/sources" state={{ newWindow: true }}>
                        See 60+ sources
                    </Link>
                </p>

                <h2 className={sectionHeadingClassName}>Store your data</h2>
                <h3>All your data, finally under the same roof.</h3>
                <p>
                    Don't move data between tools or warehouses just to join a revenue column to a signup event. Put it
                    in PostHog and it never needs to travel.
                </p>
                <ul>
                    {storeBullets.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
                <CallToAction to="/data-stack/managed-warehouse" state={{ newWindow: true }} size="sm" type="secondary">
                    Join the Waitlist
                </CallToAction>

                <h2 className={sectionHeadingClassName}>Give agents access</h2>
                <h3>
                    Good data = <Highlight>Great context</Highlight>
                </h3>
                <p>
                    Raw data is messy, data modelling is the fix. Lock in definitions that everyone agrees on so they
                    mean the same thing in every dashboard, experiment, and AI feature that depends on them.
                </p>
                <p>
                    PostHog pairs this with Endpoints. The models you build become stable APIs your product can call
                    directly. Power an embedded analytics view for your customers, or give your MCP access so your
                    customers can get information in the tools they are already using.
                </p>
                <CallToAction to="/docs/api/endpoints" state={{ newWindow: true }} size="sm" type="secondary">
                    Learn more
                </CallToAction>

                <h2 className={sectionHeadingClassName}>Act on your data</h2>
                <h3>Turn your data into action.</h3>
                <p>
                    Your data is only useful if someone can understand it and act on it. Close the loop from insight to
                    implementation without leaving PostHog.
                </p>
                <p>Analysis without switching tabs. Activation without a separate platform.</p>
                <ul>
                    {actBullets.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
                <p>
                    <Link to="#context-warehouse-catalog">Explore data tools</Link>
                </p>

                <h2 className={sectionHeadingClassName}>Set up in minutes, still useful in three years.</h2>
                <p>This context warehouse doesn't change as you grow. It just grows with you.</p>
                <div className="not-prose my-6 overflow-x-auto rounded border border-primary">
                    <table className="w-full min-w-[36rem] border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-primary bg-accent">
                                <th className="px-3 py-2 text-left font-bold text-primary" />
                                {growthColumns.map((column) => (
                                    <th key={column} className="px-3 py-2 text-left font-bold text-primary">
                                        {column}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {growthRows.map((row) => (
                                <tr key={row.label} className="border-b border-primary last:border-b-0">
                                    <th className="px-3 py-2.5 text-left font-semibold text-primary align-top">
                                        {row.label}
                                    </th>
                                    {row.cells.map((cell, index) => (
                                        <td key={growthColumns[index]} className="px-3 py-2.5 text-secondary align-top">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p>
                    No migration, re-instrumentation, or switching tools because you scaled out of them. If you really
                    want to, we give you the credentials to directly access your data store to bring your own tools or
                    export your data.
                </p>

                <h2 id="context-warehouse-catalog" className={sectionHeadingClassName}>
                    What's in your context warehouse
                </h2>
                <p>Use PostHog as the full context layer for your product, or mix and match with your own tools.</p>
                {catalogSections.map((section) => (
                    <div key={section.title} className="mb-8">
                        <h3>{section.title}</h3>
                        <ul className="not-prose list-none space-y-4 pl-0">
                            {section.items.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.url}
                                        state={{ newWindow: true }}
                                        className="font-semibold text-primary"
                                    >
                                        {item.name}
                                    </Link>
                                    <p className="mb-0 mt-1 text-sm text-secondary">{item.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                <div className="not-prose relative overflow-hidden bg-accent border border-primary rounded-md p-4 @md/reader-content:p-6 my-6">
                    <h3 className="mt-0 mb-3 text-2xl font-bold">Get started</h3>
                    <p className="mt-0 mb-4 text-secondary">
                        Your first data source is free to connect. So is your second. By the time you've connected your
                        third, you'll stop thinking about your stack entirely, which is the whole point.
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                        <CallToAction to={SIGNUP_URL} externalNoIcon size="md">
                            Get Connected
                        </CallToAction>
                        <p className="mb-0 text-sm text-secondary">
                            Not using PostHog?{' '}
                            <Link to={SIGNUP_URL} external className="font-semibold text-red dark:text-yellow">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>

                <h2 className={sectionHeadingClassName}>FAQ</h2>
                <div className="not-prose mt-4">
                    <Accordion
                        type="multiple"
                        triggerClassName="!px-3 !py-2"
                        contentClassName="!px-3 !py-2.5 !text-base !leading-relaxed"
                        items={faqItems}
                    />
                </div>
            </ReaderView>
        </>
    )
}

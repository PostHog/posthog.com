import React, { useEffect } from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import { CallToAction } from 'components/CallToAction'
import { HedgehogCodeBubble, HedgehogPuzzle } from '@posthog/brand/hoggies'
import { Accordion } from 'components/RadixUI/Accordion'
import OSTable from 'components/OSTable'
import TabbedCarousel from 'components/TabbedCarousel'
import type { TabbedCarouselTab } from 'components/TabbedCarousel'
import { WINDOW_BG } from '../../constants/frostedSurfaces'
import {
    IconBolt,
    IconBrackets,
    IconCode,
    IconDatabase,
    IconDecisionTree,
    IconDownload,
    IconFlask,
    IconGraph,
    IconMessage,
    IconNotebook,
    IconServer,
    IconShuffle,
    IconSparkles,
    IconStack,
    IconTarget,
    IconTerminal,
    IconUpload,
} from '@posthog/icons'

const SIGNUP_URL = 'https://app.posthog.com/signup'
const sectionHeadingClassName = 'my-6 mt-12 text-2xl font-bold @md/reader-content:text-3xl'

type IconComponent = React.ComponentType<{ className?: string }>
type CloudinarySrc = `https://res.cloudinary.com/${string}`

// c_crop trims the source PNG down to the database and editor panes: it drops a 1px
// near-black column on the left edge, the scrollbar and Max AI sidebar on the right,
// and cuts off partway through the results table.
const TAB_IMAGE_TRUST: CloudinarySrc =
    'https://res.cloudinary.com/dmukukwp6/image/upload/c_crop,x_2,y_0,w_1180,h_665/w_1600,c_limit,q_auto,f_auto/dw_temp_528efa76a2.png'
const TAB_IMAGE_ASK: CloudinarySrc =
    'https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Post_Hog_ai_response_ed994d3859.png'
const TAB_IMAGE_SELF_DRIVE: CloudinarySrc =
    'https://res.cloudinary.com/dmukukwp6/image/upload/inbox_prs_cloud_f44f8ba69b.png'
const CTA_HOG_IMAGE: CloudinarySrc =
    'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/data-warehouse/warehouse-hog.png'

const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-highlight p-0.5 font-bold text-red dark:text-yellow">{children}</span>
)

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

// Icon + text rows, used for the persona cards and the "store"/"act" feature lists.
const IconList = ({ items }: { items: { Icon: IconComponent; color: string; text: React.ReactNode }[] }) => (
    <ul className="mt-3 mb-0 list-none space-y-2 pl-0">
        {items.map(({ Icon, color, text }, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-secondary">
                <Icon className={`size-4 shrink-0 mt-0.5 ${color}`} />
                <span>{text}</span>
            </li>
        ))}
    </ul>
)

type TabPanelHighlightColor = 'blue' | 'red' | 'yellow' | 'green'

const tabPanelHighlightClasses: Record<TabPanelHighlightColor, string> = {
    blue: 'bg-blue/10 text-blue dark:bg-blue/20',
    red: 'bg-red/10 text-red dark:bg-red/20',
    yellow: 'bg-yellow/15 text-yellow dark:bg-yellow/20',
    green: 'bg-green/10 text-green dark:bg-green/20',
}

const TabPanel = ({
    title,
    highlightedTitle,
    titleSuffix,
    highlightColor = 'blue',
    children,
    image,
    imageHasChrome = false,
    illustration,
}: {
    title: string
    highlightedTitle?: string
    titleSuffix?: string
    highlightColor?: TabPanelHighlightColor
    children: React.ReactNode
    image?: CloudinarySrc
    /** Set for screenshots that already bake in rounded corners and a drop shadow. */
    imageHasChrome?: boolean
    /** Rendered instead of `image` for tabs illustrated with a hedgehog rather than a screenshot. */
    illustration?: React.ReactNode
}) => {
    const fullTitle = [title, highlightedTitle, titleSuffix].filter(Boolean).join(' ')

    // Flat screenshots get rounded top corners and a shadow so they read as a window
    // rising out of the panel. The wrapper is inset to leave room for that shadow,
    // and clips it where the image runs off the bottom of the card.
    const imageWrapperClassName = imageHasChrome
        ? '-mx-4 -mb-4 mt-4 overflow-hidden rounded-b leading-[0] @xl:-mx-6 @xl:-mb-6'
        : '-mx-4 -mb-4 mt-4 overflow-hidden rounded-b px-4 pt-3 leading-[0] @xl:-mx-6 @xl:-mb-6 @xl:px-6'
    const imgClassName = imageHasChrome
        ? 'w-full block'
        : 'w-full block rounded-t-md shadow-[0_2px_10px_rgba(0,0,0,0.12)]'

    const copy = (
        <>
            <h2 className="mt-0 mb-2 text-2xl font-bold">
                {title}
                {highlightedTitle ? (
                    <>
                        {' '}
                        <span className={`rounded-sm px-0.5 ${tabPanelHighlightClasses[highlightColor]}`}>
                            {highlightedTitle}
                        </span>
                        {titleSuffix ? ` ${titleSuffix}` : null}
                    </>
                ) : null}
            </h2>
            {/* text-[15px] matches the page body copy – the codebase defines .prose-sm as text-[15px] */}
            <div className="text-secondary text-[15px]">{children}</div>
        </>
    )

    // Illustrated tabs sit the hedgehog beside the copy; screenshot tabs run it full
    // width below, where it bleeds off the bottom of the card.
    if (illustration) {
        return (
            <div className="rounded bg-primary p-4 @xl:p-6">
                {/* items-start keeps the heading level with the screenshot tabs; the hedgehog is
                    taller than the copy, so centering the row would push the copy down. */}
                <div className="grid items-start gap-6 @md:grid-cols-[1fr_240px]">
                    <div>{copy}</div>
                    <div className="flex justify-center self-center">{illustration}</div>
                </div>
            </div>
        )
    }

    return (
        <div className="rounded bg-primary p-4 @xl:p-6">
            {copy}
            {image ? (
                <div className={imageWrapperClassName}>
                    <CloudinaryImage src={image} alt={fullTitle} imgClassName={imgClassName} />
                </div>
            ) : null}
        </div>
    )
}

const dataEngineerBullets: { Icon: IconComponent; color: string; text: string }[] = [
    {
        Icon: IconDatabase,
        color: 'text-blue',
        text: 'Set up CDC pipelines from Postgres, MySQL, and other sources',
    },
    {
        Icon: IconTarget,
        color: 'text-red',
        text: 'Define and version core metrics so every team is working from the same numbers',
    },
    {
        Icon: IconShuffle,
        color: 'text-purple',
        text: 'Build and manage reverse ETL syncs to keep downstream tools up to date',
    },
    {
        Icon: IconCode,
        color: 'text-green',
        text: 'Write transformation logic that enriches events with data from other systems',
    },
    { Icon: IconServer, color: 'text-orange', text: 'Query billions of rows without managing a cluster' },
    {
        Icon: IconStack,
        color: 'text-sky-blue',
        text: "Flexibility to use PostHog's full context warehouse or bring your own tools",
    },
]

const productEngineerBullets: { Icon: IconComponent; color: string; text: string }[] = [
    {
        Icon: IconShuffle,
        color: 'text-blue',
        text: 'Sync external data sources and query them alongside your product events',
    },
    {
        Icon: IconFlask,
        color: 'text-purple',
        text: 'Build experiment cohorts from warehouse data without creating a custom pipeline',
    },
    { Icon: IconSparkles, color: 'text-red', text: "Use PostHog AI to write SQL when you don't want to" },
]

const togetherBullets: { Icon: IconComponent; color: string; text: string }[] = [
    { Icon: IconBolt, color: 'text-yellow', text: "Capture an event? It's in your analytics." },
    { Icon: IconShuffle, color: 'text-purple', text: 'Data from Stripe? Use it with your flags.' },
    { Icon: IconMessage, color: 'text-sky-blue', text: 'Define a metric? Mention it in Slack.' },
]

const personas: {
    title: string
    description: string
    Icon: IconComponent
    iconColor: string
    bullets: { Icon: IconComponent; color: string; text: string }[]
}[] = [
    {
        title: 'Data engineers',
        description: 'Build complex models and transformations that need your expertise, not plumbing.',
        Icon: IconDatabase,
        iconColor: 'text-blue',
        bullets: dataEngineerBullets,
    },
    {
        title: 'Product engineers',
        description:
            'Your data is already in PostHog. Query it, use it in experiments, and ship against it without waiting on the data team.',
        Icon: IconCode,
        iconColor: 'text-red',
        bullets: productEngineerBullets,
    },
]

// The four sides of the "Better data in, better AI out" story, presented as carousel tabs.
const dataInTabs: TabbedCarouselTab[] = [
    {
        value: 'data-you-trust',
        label: 'Data you trust',
        color: 'bg-blue',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <TabPanel
                title="Start with"
                highlightedTitle="data you trust"
                highlightColor="blue"
                image={TAB_IMAGE_TRUST}
            >
                <p className="m-0">
                    AI products don't fail because the model is bad. They fail because the data feeding them is
                    incomplete, inconsistent, or stuck in a tool it can't reach.
                </p>
                <p className="m-0 mt-3">
                    PostHog's context warehouse gives your AI features a foundation that works: clean event data,
                    business context from your other tools, and full data ownership.
                </p>
            </TabPanel>
        ),
    },
    {
        value: 'ask-posthog',
        label: 'Ask @PostHog',
        color: 'bg-red',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <TabPanel title="Ask @PostHog" highlightedTitle="anything" highlightColor="red" image={TAB_IMAGE_ASK}>
                <p className="m-0">
                    With all your data in one place, PostHog becomes omniscient about your business. Use PostHog AI or
                    our Slack app to generate SQL queries, model your data, and get insights about your users' behavior.
                </p>
                <p className="m-0 mt-3">
                    PostHog AI can be used by everyone, product teams can ask questions and get insights without relying
                    on the data team, freeing them up to build complex data models.
                </p>
            </TabPanel>
        ),
    },
    {
        value: 'self-drive',
        label: 'Self-drive',
        color: 'bg-yellow',
        activeText: 'text-black',
        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
        content: (
            <TabPanel
                title="Let PostHog"
                highlightedTitle="self-drive"
                titleSuffix="your development"
                highlightColor="yellow"
                image={TAB_IMAGE_SELF_DRIVE}
                imageHasChrome
            >
                <p className="m-0">
                    What are you going to do with all those insights? PostHog understands your product. It can identify
                    usage patterns, triage bugs, and open PRs automatically, self-driving development of your product
                    based on what it knows your users need.
                </p>
            </TabPanel>
        ),
    },
    {
        value: 'better-together',
        label: 'Better together',
        color: 'bg-green',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <TabPanel
                title="Good solo,"
                highlightedTitle="better together"
                highlightColor="green"
                illustration={
                    <HedgehogPuzzle
                        size={240}
                        title="Two hedgehogs holding interlocking puzzle pieces"
                        className="w-full max-w-[240px]"
                    />
                }
            >
                <p className="m-0">
                    The modern data stack is a bunch of tools that can barely tolerate each other. But PostHog is a
                    system that works together.
                </p>
                <IconList items={togetherBullets} />
            </TabPanel>
        ),
    },
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

// Leading column is unlabeled – it holds the row's category rather than a timeframe.
const growthTableColumns = [
    { name: '', align: 'left' as const, width: 'minmax(5rem,max-content)' },
    ...growthColumns.map((column) => ({
        name: column,
        align: 'left' as const,
        width: 'minmax(10rem,1fr)',
    })),
]

const growthTableRows = growthRows.map((row) => ({
    key: row.label,
    cells: [
        { content: <span className="font-semibold text-primary">{row.label}</span> },
        ...row.cells.map((cell) => ({ content: <span className="text-secondary">{cell}</span> })),
    ],
}))

const catalogSections: {
    title: string
    items: { name: string; description: string; url: string; Icon: IconComponent; iconColor: string }[]
}[] = [
    {
        title: 'Data Sources',
        items: [
            {
                name: 'Sources & Import (ELT)',
                description:
                    'Regularly sync or bulk import data into your warehouse from databases, ad platforms, SaaS tools, and more.',
                url: '/data-stack/sources',
                Icon: IconDownload,
                iconColor: 'text-blue',
            },
            {
                name: 'Managed Warehouse',
                description:
                    'Store, query, and join your product and business data in one place without maintaining any infrastructure.',
                url: '/data-stack/managed-warehouse',
                Icon: IconDatabase,
                iconColor: 'text-purple',
            },
            {
                name: 'CDP',
                description:
                    'Ingest, transform, and route data between PostHog and the rest of your stack in real time.',
                url: '/cdp',
                Icon: IconShuffle,
                iconColor: 'text-red',
            },
            {
                name: 'Batch Exports',
                description: 'Send PostHog data to your existing warehouse or data lake on a schedule you control.',
                url: '/data-stack/reverse-etl-export',
                Icon: IconUpload,
                iconColor: 'text-green',
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
                Icon: IconDecisionTree,
                iconColor: 'text-blue',
            },
            {
                name: 'Endpoints',
                description: 'Take any insight or SQL query and expose it as a stable API endpoint.',
                url: '/docs/api/endpoints',
                Icon: IconBrackets,
                iconColor: 'text-purple',
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
                Icon: IconSparkles,
                iconColor: 'text-red',
            },
            {
                name: 'SQL Editor',
                description:
                    'Write and run HogQL or standard SQL directly against your data. For when you know exactly what you want and just need to ask for it properly.',
                url: '/data-stack/sql-editor',
                Icon: IconTerminal,
                iconColor: 'text-green',
            },
            {
                name: 'Notebooks',
                description:
                    "Combine insights, replays, flags, experiment results, and SQL into a single document. For when your analysis has a story and a dashboard isn't the right way to tell it.",
                url: '/docs/notebooks',
                Icon: IconNotebook,
                iconColor: 'text-blue',
            },
            {
                name: 'Reverse ETL',
                description:
                    'Send data back to the tools that need it. Keep your CRM, support tools, and marketing platforms in sync.',
                url: '/data-stack/reverse-etl-export',
                Icon: IconShuffle,
                iconColor: 'text-purple',
            },
            {
                name: 'Business Intelligence',
                description: 'Visualize your data with interactive dashboards and ad-hoc analyses right in PostHog.',
                url: '/data-stack/business-intelligence',
                Icon: IconGraph,
                iconColor: 'text-orange',
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
            <ReaderView
                leftSidebar={<LeftSidebarContent />}
                title="context-warehouse.md"
                hideTitle={true}
                className="overflow-x-hidden"
            >
                <div className="relative z-10">
                    <div className="max-w-4xl @7xl:max-w-7xl mx-auto">
                        {/* Hero */}
                        <div className="not-prose mb-8 pt-2 @lg/reader-content:pt-6 @3xl:mb-12">
                            <div className="grid items-center gap-6 @lg/reader-content:grid-cols-[1fr_280px]">
                                <div>
                                    <h1 className="m-0 text-3xl font-bold !leading-[1.12] tracking-tight @md/reader-content:text-4xl @3xl/reader-content:text-5xl">
                                        Give your agents the <Highlight>full context</Highlight>
                                    </h1>
                                    <p className="mb-0 mt-5 text-base font-semibold leading-relaxed text-primary @xl/reader-content:text-[17px]">
                                        Every feature you ship is downstream of your data.
                                    </p>
                                    <p className="mb-0 mt-2 max-w-3xl text-base leading-relaxed text-secondary @xl/reader-content:text-[17px]">
                                        Collect, store, transform, query using your context warehouse, and let PostHog
                                        self-drive development based on customer signals.
                                    </p>
                                    <div className="mt-6">
                                        <CallToAction
                                            to={SIGNUP_URL}
                                            externalNoIcon
                                            size="md"
                                            className="max-w-[175px]"
                                        >
                                            Get started
                                        </CallToAction>
                                    </div>
                                </div>
                                <div className="hidden justify-center @lg/reader-content:flex">
                                    <HedgehogCodeBubble size={280} className="w-full max-w-[280px]" />
                                </div>
                            </div>
                        </div>

                        {/* Built for data engineers, loved by product teams */}
                        <h2 className={sectionHeadingClassName}>Built for data engineers, loved by product teams</h2>
                        {/* One card split in two, so the shorter column's leftover space reads as
                            interior whitespace rather than an unfilled box. */}
                        <div className="not-prose overflow-hidden rounded-md border border-primary bg-primary shadow-sm">
                            <div className="grid grid-cols-1 divide-y divide-primary @xl/reader-content:grid-cols-2 @xl/reader-content:divide-x @xl/reader-content:divide-y-0">
                                {personas.map(({ title, description, Icon, iconColor, bullets }) => (
                                    <div key={title} className="p-5 @lg/reader-content:p-6">
                                        <p className="m-0 flex items-center gap-2 text-lg font-bold text-primary">
                                            <Icon className={`size-5 shrink-0 ${iconColor}`} />
                                            {title}
                                        </p>
                                        <p className="m-0 mt-2 text-sm text-secondary">{description}</p>
                                        <IconList items={bullets} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Better data in, better AI out */}
                        <h2 className={sectionHeadingClassName}>Better data in, better AI out</h2>
                        <div className="not-prose my-6">
                            {/* The screenshot tabs run well past the default min-height anyway;
                                dropping it stops the illustrated tab from padding out to match. */}
                            <TabbedCarousel tabs={dataInTabs} slideClassName="!min-h-0" />
                        </div>

                        {/* Set up in minutes, still useful in three years. */}
                        <h2 className={sectionHeadingClassName}>Set up in minutes, still useful in three years.</h2>
                        <p>This context warehouse doesn't change as you grow. It just grows with you.</p>
                        <div className="not-prose my-6">
                            <OSTable
                                columns={growthTableColumns}
                                rows={growthTableRows}
                                size="md"
                                rowAlignment="top"
                                className="text-sm"
                                width="full"
                            />
                        </div>
                        <p>
                            No migration, re-instrumentation, or switching tools because you scaled out of them. If you
                            really want to, we give you the credentials to directly access your data store to bring your
                            own tools or export your data.
                        </p>

                        {/* What's in your context warehouse */}
                        <h2 id="context-warehouse-catalog" className={sectionHeadingClassName}>
                            What's in your context warehouse
                        </h2>
                        <p>
                            Use PostHog as the full context layer for your product, or mix and match with your own
                            tools.
                        </p>
                        {catalogSections.map((section) => (
                            <div key={section.title} className="mb-8">
                                <h3>{section.title}</h3>
                                <div className="not-prose grid grid-cols-1 gap-3 @xl/reader-content:grid-cols-2">
                                    {section.items.map(({ name, description, url, Icon, iconColor }) => (
                                        <Link
                                            key={name}
                                            to={url}
                                            state={{ newWindow: true }}
                                            className="group flex min-h-full flex-col rounded-md border border-primary bg-primary p-4 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-secondary hover:shadow-md"
                                        >
                                            <p className="m-0 flex items-center gap-2 text-base font-bold text-primary group-hover:underline">
                                                <Icon className={`size-5 shrink-0 ${iconColor}`} />
                                                {name}
                                            </p>
                                            <p className="m-0 mt-1.5 text-sm text-secondary">{description}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Get started */}
                        <div
                            className={`not-prose relative my-6 overflow-hidden rounded-md border border-primary p-4 @md/reader-content:p-6 ${WINDOW_BG}`}
                        >
                            <div className="grid items-center gap-6 @lg/reader-content:grid-cols-[1fr_190px]">
                                <div>
                                    <h3 className="mt-0 mb-3 text-2xl font-bold">Get started</h3>
                                    <p className="mt-0 mb-4 text-secondary">
                                        Your first data source is free to connect. So is your second. By the time you've
                                        connected your third, you'll stop thinking about your stack entirely, which is
                                        the whole point.
                                    </p>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <CallToAction to={SIGNUP_URL} externalNoIcon size="md">
                                            Get Connected
                                        </CallToAction>
                                        <p className="mb-0 text-sm text-secondary">
                                            Not using PostHog?{' '}
                                            <Link
                                                to={SIGNUP_URL}
                                                external
                                                className="font-semibold text-red dark:text-yellow"
                                            >
                                                Sign up
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden self-end -mb-4 @lg/reader-content:block @md/reader-content:-mb-6">
                                    <CloudinaryImage
                                        src={CTA_HOG_IMAGE}
                                        alt="A hedgehog standing beside a data warehouse"
                                        className="w-full !block"
                                        imgClassName="w-full !block"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* FAQ */}
                        <h2 className={sectionHeadingClassName}>FAQ</h2>
                        <div className="not-prose mt-4">
                            <Accordion
                                type="multiple"
                                triggerClassName="!px-3 !py-2"
                                contentClassName="!px-3 !py-2.5 !text-base !leading-relaxed"
                                items={faqItems}
                            />
                        </div>
                    </div>
                </div>
            </ReaderView>
        </>
    )
}

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import {
    IconList,
    IconBrowser,
    IconPlaylist,
    IconCode,
    IconRecord,
    IconSearch,
    IconExpand,
    IconEye,
    IconPeople,
    IconInfo,
    IconMagic,
    IconPlay,
    IconCursorClick,
    IconSparkles,
    IconRocket,
    IconConfetti,
    IconReceipt,
    IconPieChart,
    IconCheckCircle,
    IconGraph,
} from '@posthog/icons'
import CodeBlock from 'components/Home/CodeBlock'
import CloudinaryImage from 'components/CloudinaryImage'
import OSTable from 'components/OSTable'
import { sessionReplay } from 'hooks/productData/session_replay'
import ProductReaderView from 'components/Products/ReaderViewProduct'
import type { CarouselSlide, ProductNavItem } from 'components/Products/ReaderViewProduct/types'
import {
    AI,
    Applications,
    ComparisonSummary,
    Customers,
    Demo,
    Eli5,
    FeatureComparison,
    Features,
    GettingStarted,
    Overview,
    PairsWith,
    Plans,
    Pricing,
    PricingCalculator,
    TopFeatures,
    UseCases,
} from 'components/Products/ReaderViewProduct/templates'
import { DebugContainerQuery } from 'components/DebugContainerQuery'

const f = sessionReplay.features

const FilterCriteria = ({ items }: { items: { label: string; description: string }[] }) => (
    <div className="inline-grid @lg:grid-cols-3 @lg:[&>*:nth-child(n+3)]:border-t @lg:[&>*:nth-child(n+3)]:border-primary">
        {items.map(({ label, description }) => (
            <React.Fragment key={label}>
                <div className="pt-2 @lg:pt-1 @lg:pb-1 font-bold">{label}</div>
                <div className="@lg:col-span-2 pb-2 @lg:pb-1 @lg:pt-1 @lg:pl-4 text-secondary text-[15px] border-b border-primary last:border-b-0 @lg:border-b-0 text-balance">
                    {description}
                </div>
            </React.Fragment>
        ))}
    </div>
)

const FilterTag = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center text-xs font-medium px-1.5 py-1 rounded-sm leading-none bg-yellow/20 text-[#B56C00] dark:text-yellow dark:bg-yellow/20">
        {children}
    </span>
)

const InlineCode = ({ children }: { children: React.ReactNode }) => (
    <code className="font-mono text-[0.82em] px-1 py-px rounded bg-yellow/10 border border-yellow/25 text-[#B56C00] dark:text-yellow dark:bg-yellow/20 dark:border-yellow/30 not-italic">
        {children}
    </code>
)

const applications: CarouselSlide[] = [
    {
        slug: 'filter',
        label: 'Search',
        icon: <IconSearch className="size-5" />,
        color: 'bg-white dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'Find something specific',
        description: (
            <>
                <p>You can search for sessions based on specific filtering criteria like a user's:</p>
                <aside>
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/detective_01aca25481.png"
                        className="float-right w-36 @xl/reader-content:w-48 ml-8 @4xl/reader-content:w-60 @4xl/reader-content:-mt-16"
                    />
                </aside>
                <div className="@container max-w-6xl">
                    <FilterCriteria
                        items={[
                            { label: 'Activity data', description: 'Page views, clicks, scrolls, form submissions' },
                            { label: 'Session data', description: 'Device type, browser, OS' },
                            { label: 'Personal properties', description: 'Email address, initial UTM source' },
                            {
                                label: 'Errors',
                                description: 'JavaScript errors, network failures, captured exceptions',
                            },
                            {
                                label: 'Custom event properties',
                                description: 'Plan name, organization name, tier, etc.',
                            },
                        ]}
                    />
                </div>
            </>
        ),
        image: 'filters',
    },
    {
        slug: 'explore',
        label: 'Browse',
        icon: <IconPlaylist className="size-5" />,
        color: 'bg-white dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'stack',
        heading: 'Browse recent sessions',
        description: (
            <>
                <p>
                    Crack open the PostHog Session Replay app and you'll see a list of recent sessions. Click through
                    them like you're watching TV. Scrub around to look for interesting points in the timeline.
                </p>
                <p>
                    Save any filter criteria as a playlist that automatically updates with new sessions as they meet the
                    criteria.
                </p>
            </>
        ),
        image: {
            ref: 'recordings',
            maxWidth: 'max-w-none',
            containerClassName: 'pb-0 leading-[0]',
            imgClassName: 'border-b-0 rounded-b-none',
        },
    },
    {
        slug: 'research',
        label: 'Editor / MCP',
        icon: <IconBrowser className="size-5" />,
        color: 'bg-white dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: 'Debug or research without leaving your coding environment',
        description:
            "Ask PostHog AI (also available with our MCP) to watch sessions or summarize recordings and get the data you're looking for without ever leaving your AI workflow.",
        image: { ref: 'chat', imgClassName: 'border-0 rounded-none' },
    },
]

const topFeatures: CarouselSlide[] = [
    {
        slug: 'event-timeline',
        label: 'Event timeline',
        icon: <IconList className="size-5" />,
        color: 'bg-white',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'float',
        heading: f.event_timeline.headline,
        description: (
            <>
                <p>
                    Scrub through an activity log of a user's session to jump directly to parts you want to watch. The
                    timeline shows you a full list of autocapture events (like page views), custom events, form
                    interactions, and errors the user may have encountered during their session.
                </p>
                <ul className="space-y-4 mb-4">
                    <li>
                        <strong>{f.event_properties.title}</strong>
                        <br /> {f.event_properties.description}
                    </li>
                    <li>
                        <strong>{f.error_details.title}</strong>
                        <br /> {f.error_details.description}
                    </li>
                    <li>
                        <strong>{f.web_vitals.title}</strong>
                        <br /> {f.web_vitals.description}
                    </li>
                </ul>
                <p>
                    Click on any row to jump to that point in the session, or click{' '}
                    <span className="inline-block">
                        the
                        <IconExpand className="size-5 inline-block" aria-label="Expand" /> icon
                    </span>{' '}
                    view the associated metadata.
                </p>
            </>
        ),
        image: { ref: 'overview', glow: true },
    },
    {
        slug: 'technical-context',
        label: 'Technical context',
        icon: <IconCode className="size-5" />,
        color: 'bg-white',
        activeText: 'text-primary',
        progressBar: 'bg-green',
        layout: 'stack',
        heading: f.technical_context.headline,
        description: (
            <>
                <p>{f.technical_context.description}</p>
                <ul className="space-y-4 mb-4">
                    <li>
                        <strong>{f.network_monitor.title}</strong>
                        <br /> {f.network_monitor.description}
                    </li>
                    <li>
                        <strong>{f.console_logs.title}</strong>
                        <br /> {f.console_logs.description}
                    </li>
                    <li>
                        <strong>{f.dom_explorer.title}</strong>
                        <br /> {f.dom_explorer.description}
                    </li>
                </ul>
            </>
        ),
        image: {
            ref: 'technical-context',
            maxWidth: 'max-w-none',
            srcMobileBreakpoint: '3xl',
            frameless: true,
            framePadding: '@3xl/reader-content:pt-4 @3xl/reader-content:px-4',
            containerClassName:
                '@3xl/reader-content:bg-tan dark:@3xl/reader-content:bg-dark @3xl/reader-content:border-t @3xl/reader-content:border-primary pb-0 leading-[0]',
            imgClassName: 'w-full !border-0 !rounded-none',
        },
    },
    {
        slug: 'recording-rules',
        label: 'Recording rules',
        icon: <IconRecord className="size-5" />,
        color: 'bg-white',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'Record the sessions you care about',
        description: (
            <>
                <p>
                    Recording every session gets noisy fast. Set recording rules to capture errors, target pages, and
                    specific users – and skip everything else.
                </p>
                <ul className="space-y-4 mb-4">
                    <li>
                        <strong>{f.sampling.title}</strong>
                        <br /> {f.sampling.description}
                    </li>
                    <li>
                        <strong>{f.url_event_triggers.title}</strong>
                        <br /> {f.url_event_triggers.description}
                    </li>
                    <li>
                        <strong>{f.feature_flag_targeting.title}</strong>
                        <br /> {f.feature_flag_targeting.description}
                    </li>
                    <li>
                        <strong>{f.privacy_masking.title}</strong>
                        <br /> {f.privacy_masking.description}
                    </li>
                </ul>
                <p>
                    Or take manual control – disable recording by default and enable it in code when conditions are met:
                </p>
                <CodeBlock
                    code={f.recording_rules.codeExample}
                    language="js"
                    hideNumbers={undefined}
                    lineNumberStart={undefined}
                    tooltips={undefined}
                />
            </>
        ),
    },
    {
        slug: 'analyze-behavior',
        label: 'Analyze behavior',
        icon: <IconSearch className="size-5" />,
        color: 'bg-white',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: 'Find the sessions you need',
        description: (
            <>
                <p>Filter recordings by almost anything.</p>
                <ul className="space-y-4 mb-4">
                    <li>
                        <strong>{f.event_filters.title}</strong>
                        <br /> {f.event_filters.description}
                    </li>
                    <li>
                        <strong>{f.person_properties.title}</strong>
                        <br /> {f.person_properties.description}
                    </li>
                    <li>
                        <strong>{f.frustration_signals.title}</strong>
                        <br /> {f.frustration_signals.description}
                    </li>
                    <li>
                        <strong>{f.ai_search.title}</strong>
                        <br /> {f.ai_search.description}
                    </li>
                </ul>
                <p>Save filters as dynamic playlists that automatically update as new sessions come in.</p>

                <OSTable
                    columns={[
                        { name: 'What you want to find', width: 'minmax(200px,1fr)', align: 'left' },
                        { name: 'Filter criteria', width: 'minmax(220px,1fr)', align: 'left' },
                    ]}
                    rows={[
                        {
                            cells: [
                                {
                                    content: (
                                        <>
                                            <div>Users who signed up but never got started</div>
                                            <FilterTag>Events (inclusion + exclusion)</FilterTag>
                                        </>
                                    ),
                                },
                                {
                                    content: (
                                        <>
                                            Did <InlineCode>signup_completed</InlineCode>, skipped{' '}
                                            <InlineCode>project_created</InlineCode>
                                        </>
                                    ),
                                },
                            ],
                        },
                        {
                            cells: [
                                {
                                    content: (
                                        <>
                                            <div>Users who bailed before checkout</div>
                                            <FilterTag>Events + URL</FilterTag>
                                        </>
                                    ),
                                },
                                {
                                    content: (
                                        <>
                                            Visited <InlineCode>/checkout</InlineCode>, never hit{' '}
                                            <InlineCode>purchase_completed</InlineCode>
                                        </>
                                    ),
                                },
                            ],
                        },
                        {
                            cells: [
                                {
                                    content: (
                                        <>
                                            <div>Frustration on a specific page</div>
                                            <FilterTag>Frustration signal + URL</FilterTag>
                                        </>
                                    ),
                                },
                                {
                                    content: (
                                        <>
                                            Rage clicks {'>'} 0 on <InlineCode>/pricing</InlineCode>
                                        </>
                                    ),
                                },
                            ],
                        },
                        {
                            cells: [
                                {
                                    content: (
                                        <>
                                            <div>What one specific customer is doing</div>
                                            <FilterTag>Person property</FilterTag>
                                        </>
                                    ),
                                },
                                {
                                    content: (
                                        <>
                                            Email matches <InlineCode>@acme.com</InlineCode>
                                        </>
                                    ),
                                },
                            ],
                        },
                        {
                            cells: [
                                {
                                    content: (
                                        <>
                                            <div>How enterprise users behaved this week</div>
                                            <FilterTag>Person property + date</FilterTag>
                                        </>
                                    ),
                                },
                                {
                                    content: (
                                        <>
                                            Plan = <InlineCode>enterprise</InlineCode>, last 7 days
                                        </>
                                    ),
                                },
                            ],
                        },
                        {
                            cells: [
                                {
                                    content: (
                                        <>
                                            <div>Sessions where someone hit a JS error</div>
                                            <FilterTag>Console logs</FilterTag>
                                        </>
                                    ),
                                },
                                {
                                    content: (
                                        <>
                                            Console level = <InlineCode>error</InlineCode>
                                        </>
                                    ),
                                },
                            ],
                        },
                        {
                            cells: [
                                {
                                    content: (
                                        <>
                                            <div>iOS users on slow connections</div>
                                            <FilterTag>Device + performance</FilterTag>
                                        </>
                                    ),
                                },
                                {
                                    content: (
                                        <>
                                            OS = <InlineCode>iOS</InlineCode>, FCP {'>'} 3s
                                        </>
                                    ),
                                },
                            ],
                        },
                        {
                            cells: [
                                {
                                    content: (
                                        <>
                                            <div>Who saw a specific A/B test variant</div>
                                            <FilterTag>Feature flag</FilterTag>
                                        </>
                                    ),
                                },
                                {
                                    content: (
                                        <>
                                            Flag <InlineCode>pricing-test</InlineCode> ={' '}
                                            <InlineCode>variant_b</InlineCode>
                                        </>
                                    ),
                                },
                            ],
                        },
                    ]}
                    size="sm"
                    rowAlignment="top"
                    width="full"
                />
            </>
        ),
    },
]

export const PRODUCT_HANDLE = 'session_replay'

export const productMenu: ProductNavItem[] = [
    { slug: 'overview', name: 'Overview', icon: <IconEye className="size-4" />, component: Overview },
    {
        slug: 'customers',
        name: 'Who uses it?',
        group: 'divided',
        icon: <IconPeople className="size-4" />,
        component: Customers,
    },
    {
        slug: 'eli5',
        name: 'What does it do?',
        group: 'divided',
        icon: <IconInfo className="size-4" />,
        component: Eli5,
    },
    {
        slug: 'use-cases',
        name: 'Who is it for?',
        group: 'divided',
        icon: <IconMagic className="size-4" />,
        component: UseCases,
    },
    { slug: 'demo', name: 'Demo', group: 'divided', icon: <IconPlay className="size-4" />, component: Demo },
    {
        slug: 'applications',
        name: 'How do I use it?',
        group: 'divided',
        icon: <IconCursorClick className="size-4" />,
        component: Applications,
        props: { slides: applications },
    },
    {
        slug: 'top-features',
        name: 'Top features',
        group: 'divided',
        icon: <IconSparkles className="size-4" />,
        component: TopFeatures,
        props: { slides: topFeatures },
    },
    { slug: 'features', name: 'Features (legacy)', group: 'divided', hideFromNav: true, component: Features },
    {
        slug: 'getting-started',
        name: 'Get started',
        group: 'divided',
        icon: <IconRocket className="size-4" />,
        component: GettingStarted,
    },
    { slug: 'ai', name: 'AI', hideFromNav: true, icon: <IconSparkles className="size-4" />, component: AI },
    {
        slug: 'pairs-with',
        name: 'Pairs with...',
        hideFromNav: true,
        icon: <IconConfetti className="size-4" />,
        component: PairsWith,
    },
]

export const pricingMenu: ProductNavItem[] = [
    { slug: 'rates', name: 'Session Replay rates', icon: <IconReceipt className="size-4" />, component: Pricing },
    {
        slug: 'calculator',
        name: 'Pricing calculator',
        icon: <IconPieChart className="size-4" />,
        component: PricingCalculator,
    },
    { slug: 'plans', name: 'Plans', icon: <IconCheckCircle className="size-4" />, component: Plans },
    {
        slug: 'comparison-summary',
        name: 'PostHog vs...',
        icon: <IconList className="size-4" />,
        component: ComparisonSummary,
    },
    {
        slug: 'feature-comparison',
        name: 'Feature comparison',
        icon: <IconGraph className="size-4" />,
        component: FeatureComparison,
    },
]

export default function SessionReplay(): JSX.Element {
    const data = useStaticQuery(graphql`
        query {
            allProductData {
                nodes {
                    products {
                        name
                        type
                        unit
                        addons {
                            name
                            type
                            unit
                            plans {
                                name
                                plan_key
                                included_if
                                features {
                                    key
                                    name
                                    description
                                    limit
                                    note
                                }
                            }
                        }
                        plans {
                            name
                            plan_key
                            free_allocation
                            included_if
                            features {
                                key
                                name
                                description
                                limit
                                note
                            }
                            tiers {
                                unit_amount_usd
                                up_to
                            }
                        }
                    }
                }
            }
        }
    `)

    return (
        <ProductReaderView
            productHandle={PRODUCT_HANDLE}
            data={data}
            productMenu={productMenu}
            pricingMenu={pricingMenu}
        />
    )
}

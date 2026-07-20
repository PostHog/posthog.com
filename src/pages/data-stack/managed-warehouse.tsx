import React from 'react'
import ReaderView from 'components/ReaderView'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import { ProductScreenshot } from 'components/ProductScreenshot'
import DuckDBWaitlistSurvey from 'components/DuckDBWaitlistSurvey'
import {
    IconDatabaseBolt,
    IconPlug,
    IconSparkles,
    IconServer,
    IconShuffle,
    IconRefresh,
    IconStack,
    IconShieldLock,
    IconGraph,
    IconFlask,
    IconPeople,
    IconGlobe,
    IconTarget,
} from '@posthog/icons'

type IconComponent = React.ComponentType<{ className?: string }>

const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-highlight p-0.5 font-bold text-red dark:text-yellow">{children}</span>
)

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

const questionExamples: { Icon: IconComponent; color: string; question: string; answer: React.ReactNode }[] = [
    {
        Icon: IconGraph,
        color: 'text-red',
        question: 'Which features drive revenue?',
        answer: 'Join PostHog feature adoption data with Stripe subscription events. See exactly which behaviors correlate with expansion, and which ones predict churn before it happens.',
    },
    {
        Icon: IconFlask,
        color: 'text-purple',
        question: 'Why did this experiment win for some users but not others?',
        answer: 'Join experiment results and feature flag exposure data with your revenue source to find the segment behind the win. Build the next test around it.',
    },
    {
        Icon: IconPeople,
        color: 'text-blue',
        question: 'Did the users who converted actually stick around?',
        answer: "Join funnel completion events with Stripe subscription data. See whether the users you're optimizing for are sticking around, and whether your conversion metric is measuring the right thing.",
    },
    {
        Icon: IconGlobe,
        color: 'text-green',
        question: 'Why does this variant perform better in Europe than in the US?',
        answer: 'Join A/B test results with revenue or demographic data from your CRM. Find the segment signal behind the regional split, and stop shipping variants that only work for half your user base.',
    },
    {
        Icon: IconTarget,
        color: 'text-orange',
        question: 'Where does your funnel leak?',
        answer: 'Query across signup events, CRM deal stage, and feature adoption in a single SQL statement. Get a precise answer, not a hypothesis about which step loses people and why.',
    },
]

const setupSteps: {
    Icon: IconComponent
    iconColor: string
    badge: string
    title: string
    description: React.ReactNode
}[] = [
    {
        Icon: IconDatabaseBolt,
        iconColor: 'text-purple',
        badge: 'bg-purple/10 text-purple',
        title: 'Your PostHog data is already there',
        description:
            'Events, persons, groups, recordings, feature flag evaluations. The moment you turn on the warehouse, PostHog starts writing to it. No config required.',
    },
    {
        Icon: IconPlug,
        iconColor: 'text-blue',
        badge: 'bg-blue/10 text-blue',
        title: 'Connect your external sources',
        description: (
            <>
                Pick a source from the list. Authenticate. Done.{' '}
                <Link to="/docs/cdp/sources/stripe" state={{ newWindow: true }}>
                    Stripe
                </Link>
                ,{' '}
                <Link to="/docs/cdp/sources/postgres" state={{ newWindow: true }}>
                    Postgres
                </Link>
                ,{' '}
                <Link to="/docs/cdp/sources/salesforce" state={{ newWindow: true }}>
                    Salesforce
                </Link>
                ,{' '}
                <Link to="/docs/cdp/sources/hubspot" state={{ newWindow: true }}>
                    HubSpot
                </Link>
                ,{' '}
                <Link to="/docs/cdp/sources/s3" state={{ newWindow: true }}>
                    S3
                </Link>
                ,{' '}
                <Link to="/docs/cdp/sources/mongodb" state={{ newWindow: true }}>
                    MongoDB
                </Link>
                ,{' '}
                <Link to="/docs/cdp/sources/clickhouse" state={{ newWindow: true }}>
                    ClickHouse
                </Link>
                , they all sync on a schedule you control, with schema drift handled automatically.
            </>
        ),
    },
    {
        Icon: IconSparkles,
        iconColor: 'text-red dark:text-yellow',
        badge: 'bg-red/10 text-red dark:bg-yellow/10 dark:text-yellow',
        title: 'Query everything, or let PostHog do it',
        description:
            "Ask a question in plain English using Slack, PostHog Code or the MCP and get the answer you're looking for. Or, let PostHog's AI features use the warehouse as context when they're deciding what to surface or fix.",
    },
]

const techFeatures: { Icon: IconComponent; color: string; title: string; description: React.ReactNode }[] = [
    {
        Icon: IconServer,
        color: 'text-blue',
        title: 'Durable object storage',
        description:
            "Data lives in S3-compatible object storage, not in-process. It survives restarts, scales horizontally, and doesn't disappear when a node does.",
    },
    {
        Icon: IconShuffle,
        color: 'text-purple',
        title: 'Automatic schema management',
        description:
            'When your source schema changes, a new column in Stripe, a renamed field in your CRM, the warehouse detects it and adapts. No manual migrations.',
    },
    {
        Icon: IconRefresh,
        color: 'text-green',
        title: 'Incremental sync engine',
        description:
            "Syncs are incremental by default. For Postgres sources, we support CDC (change data capture), so you're getting row-level changes in near real time, not full table scans on a schedule.",
    },
    {
        Icon: IconStack,
        color: 'text-orange',
        title: 'Cross-source query routing',
        description:
            "Queries against PostHog-native tables run close to the data. Joins across external sources are optimized at the query layer. You write the SQL you'd expect to write; we handle the execution.",
    },
    {
        Icon: IconShieldLock,
        color: 'text-red',
        title: 'Access controls and audit logging',
        description:
            'Row-level permissions, workspace isolation, and a full audit log. Useful when your data engineer asks how the marketing team got access to the production events table.',
    },
]

export default function ManagedWarehouse(): JSX.Element {
    return (
        <>
            <SEO
                title="Managed Warehouse - Context Warehouse"
                description="All your data, ready in PostHog's Managed Warehouse"
                image="https://res.cloudinary.com/dmukukwp6/image/upload/opengraph_3_cf73189604.png"
                imageType="absolute"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title="Your business context, ready in PostHog">
                <p className="text-lg mt-0">
                    Query everything your product touches without provisioning infrastructure, writing sync jobs, or
                    using a separate tool with PostHog's fully managed data warehouse.
                </p>
                <div className="not-prose mb-2 max-w-md">
                    <DuckDBWaitlistSurvey />
                </div>

                <h2 className="!mt-8 @2xl/reader-content-container:!mt-10">
                    A <Highlight>self-driving</Highlight> product is only as good as the data it runs on
                </h2>
                <p>Fragmented data = incomplete signals.</p>
                <p>
                    You can only act on what it can see. If your revenue data is in Stripe, your product data is in
                    PostHog, and your CRM is somewhere else entirely, you're going to have a hard time seeing the whole
                    picture.
                </p>
                <p>
                    The Managed Warehouse is your <strong>context layer</strong> for AI-driven product development. It's a lot more than just storage - it's what all of your PostHog tools run on. This means you're not left wondering "why did conversion drop?", but knowing "conversion in this funnel dropped, here's the revenue impact, the cohorts affected, and what those users have in common - _and_ here's a PR already open to fix the issue."
                </p>
                <ProductScreenshot
                    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/dw_temp_528efa76a2.png"
                    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/dw_temp_528efa76a2.png"
                    alt="Query product data alongside data from any source in PostHog"
                    classes="rounded"
                    zoom={false}
                />

                <h2 className="!mt-10 @2xl/reader-content-container:!mt-12">Questions worth asking</h2>
                <div className="not-prose grid grid-cols-1 @xl/reader-content-container:grid-cols-2 @4xl/reader-content-container:grid-cols-3 gap-3 mt-4 mb-4">
                    {questionExamples.map(({ Icon, color, question, answer }) => (
                        <div
                            key={question}
                            className="flex flex-col rounded-md border border-primary bg-primary p-4 transition-colors hover:border-input"
                        >
                            <div className="mb-2 flex items-start gap-2">
                                <Icon className={`size-5 shrink-0 ${color}`} />
                                <p className="m-0 text-[15px] font-bold text-primary leading-snug">{question}</p>
                            </div>
                            <p className="m-0 text-sm text-secondary leading-snug">{answer}</p>
                        </div>
                    ))}
                </div>

                <h2 className="!mt-10 @2xl/reader-content-container:!mt-12">
                    Three steps to set up. One of them is clicking connect
                </h2>
                <div className="my-4 flex flex-col gap-4">
                    {setupSteps.map(({ Icon, iconColor, badge, title, description }, index) => (
                        <div key={title} className="flex items-start gap-4">
                            <div
                                className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${badge}`}
                            >
                                {index + 1}
                            </div>
                            <div>
                                <p className="m-0 inline-flex items-center gap-1.5 text-base font-bold text-primary">
                                    <Icon className={`size-5 shrink-0 ${iconColor}`} />
                                    {title}
                                </p>
                                <p className="m-0 mt-1 text-sm text-secondary">{description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <h2 className="!mt-10 @2xl/reader-content-container:!mt-12">
                    Built on DuckDB. Enterprise-ready on top.
                </h2>
                <p>
                    <Link to="https://duckdb.org/" external={true}>
                        DuckDB
                    </Link>{' '}
                    runs analytical queries fast, on hardware most teams already have. Here's what we built on top of it to get it ready for production:
                </p>
                <ul className="not-prose my-4 list-none space-y-4 pl-0">
                    {techFeatures.map(({ Icon, color, title, description }) => (
                        <li key={title} className="flex items-start gap-3">
                            <Icon className={`mt-0.5 size-5 shrink-0 ${color}`} />
                            <div>
                                <p className="!m-0 text-base font-bold text-primary">{title}</p>
                                <p className="m-0 mt-0.5 text-sm text-secondary leading-snug">{description}</p>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="not-prose relative overflow-hidden bg-accent border border-primary rounded-md p-4 @md/reader-content-container:p-6 mt-10 @2xl/reader-content-container:mt-12 mb-6">
                    <div className="grid @lg/reader-content-container:grid-cols-[1fr_150px] gap-6 items-center">
                        <div>
                            <h2 className="!mt-0 mb-2 text-2xl font-bold">You found it before it's finished. Nice.</h2>
                            <p className="mt-0 mb-4 text-secondary">
                                The Managed Warehouse is in beta. Join the waitlist and we'll let you in as soon as it's
                                ready. No big bang migration, no infrastructure to provision, just your data in one
                                place.
                            </p>
                            <div className="max-w-md">
                                <DuckDBWaitlistSurvey />
                            </div>
                        </div>
                        <div className="hidden @lg/reader-content-container:block self-end -mb-4 @md/reader-content-container:-mb-6">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/data-warehouse/warehouse-hog.png"
                                alt="A hedgehog tending the warehouse"
                                className="w-full !block"
                                imgClassName="w-full !block"
                            />
                        </div>
                    </div>
                </div>
            </ReaderView>
        </>
    )
}

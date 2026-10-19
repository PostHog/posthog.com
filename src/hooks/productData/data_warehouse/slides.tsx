import React from 'react'
import {
    IconBrowser,
    IconDatabaseBolt,
    IconPlug,
    IconRefresh,
    IconServer,
    IconSparkles,
    IconStack,
} from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import PlatformInstall from 'components/PlatformInstall'
import { LabeledList } from 'components/Products/ReaderViewProduct/helpers'
import type { CarouselSlide, SectionComponentProps } from 'components/Products/ReaderViewProduct/types'

/**
 * Copy on these slides is checked against the warehouse docs
 * (contents/docs/data-warehouse/warehouse) and the sources docs
 * (contents/docs/cdp/sources). Keep it in line with them when either changes.
 */
const slideStyle = {
    color: 'bg-light dark:bg-dark',
    activeText: 'text-primary',
}

const list = (items: { label: string; description: string }[]) => (
    <div className="@container">
        <LabeledList items={items} />
    </div>
)

export const applications: CarouselSlide[] = [
    {
        ...slideStyle,
        slug: 'editor-mcp',
        label: 'Editor / MCP',
        icon: <IconBrowser className="size-5" />,
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: 'Query your warehouse from your editor',
        description: (
            <>
                <p>
                    Ask questions about product, revenue, and customer data from Cursor, Claude Code, VS Code, or any
                    MCP-compatible agent. Your agent writes the SQL, PostHog runs it.
                </p>
                <div className="@container">
                    <LabeledList
                        className="mb-8"
                        items={[
                            {
                                label: 'Check revenue impact before you ship',
                                description: "Ask which paying accounts use the code path you're about to change.",
                            },
                            {
                                label: 'Debug with real data',
                                description:
                                    'Pull the Postgres row, the Stripe subscription, and the event history for one user in one go.',
                            },
                            {
                                label: 'Explore schemas',
                                description:
                                    'Let your agent list synced tables and columns, then write joins that actually run.',
                            },
                            {
                                label: 'Turn answers into insights',
                                description: 'Save a query your agent wrote as an insight your team can reuse.',
                            },
                        ]}
                    />
                    <PlatformInstall />
                </div>
            </>
        ),
    },
    {
        ...slideStyle,
        slug: 'self-drive',
        label: 'Self-drive',
        icon: <IconSparkles className="size-5" />,
        progressBar: 'bg-yellow',
        layout: 'stack',
        heading: 'Let PostHog use your data as context',
        description: (
            <>
                <p>
                    A self-driving product is only as good as the data it runs on. PostHog's AI features can use the
                    warehouse as context, so they see revenue, plan, and account data, not just clicks.
                </p>
                {list([
                    {
                        label: 'Ask in plain English',
                        description: 'PostHog AI writes the SQL for questions about your product and business data.',
                    },
                    {
                        label: 'Segment-level explanations',
                        description: 'Find the cohort behind an experiment win, using CRM and billing data.',
                    },
                ])}
            </>
        ),
    },
]

export const topFeatures: CarouselSlide[] = [
    {
        ...slideStyle,
        slug: 'sources',
        label: 'Sources',
        icon: <IconPlug className="size-5" />,
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: 'Your PostHog data is already here. Add the rest in a click.',
        description: (
            <>
                <p>Let PostHog become the center of gravity for understanding your entire business.</p>
                {list([
                    {
                        label: 'PostHog data, zero config',
                        description:
                            'Your events and persons are backfilled, then kept up to date as new data arrives.',
                    },
                    {
                        label: 'Billing and CRM',
                        description: 'Stripe, HubSpot, Salesforce, and more, synced on a schedule you choose.',
                    },
                    { label: 'Databases and files', description: 'Postgres, MongoDB, ClickHouse, and files in S3.' },
                    {
                        label: 'Per-table control',
                        description: 'Pick which tables sync, how often, and whether they sync incrementally.',
                    },
                ])}
            </>
        ),
    },
    {
        ...slideStyle,
        slug: 'sync',
        label: 'Sync & CDC',
        icon: <IconRefresh className="size-5" />,
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'Only move what changed',
        description: (
            <>
                <p>
                    Incremental syncs only move new or updated rows. For Postgres, change data capture (in alpha)
                    streams inserts, updates, and deletes in near real time instead of rescanning whole tables.
                </p>
                {list([
                    {
                        label: 'Incremental syncs',
                        description: 'Sync only new or updated rows, keyed on a field like updated_at.',
                    },
                    {
                        label: 'Change data capture for Postgres',
                        description: 'Row-level inserts, updates, and deletes, close to real time. Currently in alpha.',
                    },
                    {
                        label: 'Schedules you control',
                        description: 'From every 5 minutes to monthly, or whatever cadence the table needs.',
                    },
                ])}
            </>
        ),
    },
    {
        ...slideStyle,
        slug: 'schema-changes',
        label: 'Schema changes',
        icon: <IconStack className="size-5" />,
        progressBar: 'bg-seagreen',
        layout: 'stack',
        heading: 'New columns, your call',
        description: (
            <>
                <p>
                    When a source table gains new columns, PostHog asks how to handle them, so a schema change doesn't
                    silently break your data.
                </p>
                {list([
                    { label: 'Sync forward only', description: 'New columns fill in for new data from now on.' },
                    { label: 'Full resync', description: 'Backfill the new columns for every existing row.' },
                ])}
            </>
        ),
    },
    {
        ...slideStyle,
        slug: 'query-engine',
        label: 'Query engine',
        icon: <IconDatabaseBolt className="size-5" />,
        progressBar: 'bg-orange',
        layout: 'stack',
        heading: 'DuckDB under the hood, Postgres on the outside',
        description: (
            <>
                <p>
                    Queries run on DuckDB workers reserved for your organization, and the warehouse speaks the
                    PostgreSQL wire protocol. Any Postgres client, driver, or BI tool connects without special adapters.
                </p>
                {list([
                    {
                        label: 'Bring your own tools',
                        description: 'Connect from psql, Metabase, Grafana, Tableau, or your own code.',
                    },
                    {
                        label: 'Dedicated compute',
                        description: 'No shared query queue, so other customers never compete with your queries.',
                    },
                    {
                        label: 'Or stay in PostHog',
                        description: 'Query it from the SQL editor, the MCP, or PostHog AI.',
                    },
                ])}
            </>
        ),
    },
    {
        ...slideStyle,
        slug: 'storage',
        label: 'Managed storage',
        icon: <IconServer className="size-5" />,
        progressBar: 'bg-green',
        layout: 'stack',
        heading: 'Durable storage you never provision',
        description: (
            <>
                <p>
                    Data lives as columnar files in S3-compatible object storage, in the open DuckLake format. It
                    survives any individual machine, and storage and compute scale independently.
                </p>
                {list([
                    { label: 'Fully managed', description: 'PostHog provisions and runs the warehouse for you.' },
                    { label: 'Open format', description: 'Parquet files tracked by a transactional catalog.' },
                ])}
            </>
        ),
    },
]

/** Replaces the shared "Get started – free" section while the warehouse is a sales-led beta. */
export const GetAccess = ({ id }: SectionComponentProps) => (
    <section id={id} className="scroll-mt-20 not-prose mb-20">
        <h2 className="text-3xl font-bold text-primary mt-0 mb-3">Get access</h2>
        <p className="text-base leading-relaxed m-0 mb-4">
            The Warehouse is in <strong>beta</strong>. Access is set up by our team, so the first step is a conversation
            about your stack and what you want to query.
        </p>
        <div className="grid grid-cols-1 @2xl/reader-content:grid-cols-2 gap-4">
            <div className="border border-primary rounded p-5 bg-primary">
                <h3 className="text-lg font-bold text-primary mt-0 mb-2">Talk to sales</h3>
                <p className="text-sm text-secondary leading-relaxed m-0 mb-4">
                    Tell us which sources you want to connect and roughly how much data you have. We'll get you into the
                    beta and help with setup.
                </p>
                <CallToAction to="/talk-to-a-human" size="md" type="primary" state={{ newWindow: true }}>
                    Contact sales
                </CallToAction>
            </div>
            <div className="border border-primary rounded p-5 bg-primary">
                <h3 className="text-lg font-bold text-primary mt-0 mb-2">Read the docs first</h3>
                <p className="text-sm text-secondary leading-relaxed m-0 mb-4">
                    See how sources, syncs, and querying work before you talk to us.
                </p>
                <CallToAction
                    to="/docs/data-warehouse/warehouse"
                    size="md"
                    type="secondary"
                    state={{ newWindow: true }}
                >
                    Read the docs
                </CallToAction>
            </div>
        </div>
    </section>
)

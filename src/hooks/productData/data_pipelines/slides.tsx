import React from 'react'
import { IconBolt, IconBrowser, IconCode, IconDownload, IconPlug, IconUpload } from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import useProduct from 'hooks/useProduct'
import PlatformInstall from 'components/PlatformInstall'
import { InlineCode, LabeledList, SectionHeading } from 'components/Products/ReaderViewProduct/helpers'
import type { CarouselSlide, SectionComponentProps } from 'components/Products/ReaderViewProduct/types'

/**
 * Copy on these slides is checked against the data pipelines docs
 * (contents/docs/data-pipelines, contents/docs/cdp). Keep it in line with them when either changes.
 */
const slideStyle = {
    color: 'bg-light dark:bg-dark',
    activeText: 'text-primary',
}

const list = (items: { label: string; description: React.ReactNode }[]) => (
    <div className="@container">
        <LabeledList items={items} />
    </div>
)

export const applications: CarouselSlide[] = [
    {
        ...slideStyle,
        slug: 'in-the-app',
        label: 'In the app',
        icon: <IconPlug className="size-5" />,
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'Build and monitor pipelines in PostHog',
        description: (
            <>
                <p>Configure sources, transformations, and destinations, then watch logs and metrics for each one.</p>
                {list([
                    {
                        label: 'Start from a template',
                        description:
                            'Pick from hundreds of sources and destinations. Most need only a set of credentials.',
                    },
                    {
                        label: 'Test with real data',
                        description: 'Send real events through a transformation or destination before you turn it on.',
                    },
                    {
                        label: 'Logs and metrics',
                        description: 'See successes, failures, and filtered events for every pipeline.',
                    },
                    {
                        label: 'History',
                        description: 'See who changed a pipeline, what they changed, and when.',
                    },
                ])}
            </>
        ),
    },
    {
        ...slideStyle,
        slug: 'editor-mcp',
        label: 'Editor / MCP',
        icon: <IconBrowser className="size-5" />,
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: 'Manage pipelines from your editor',
        description: (
            <>
                <p>
                    Create, update, test-invoke, and debug pipeline functions from Cursor, Claude Code, VS Code, or any
                    MCP-compatible agent.
                </p>
                <div className="@container">
                    <LabeledList
                        className="mb-8"
                        items={[
                            {
                                label: 'Write functions with AI',
                                description:
                                    'Describe what you want, like "post signups from paying companies to #sales", and your agent writes and tests it.',
                            },
                            {
                                label: 'Debug failures',
                                description:
                                    'Have your agent read the logs for a failing destination, find the bad payload, and fix the mapping.',
                            },
                            {
                                label: 'Check sync health',
                                description: 'Ask which sources failed overnight, and why, without opening the app.',
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
        slug: 'api',
        label: 'API',
        icon: <IconCode className="size-5" />,
        progressBar: 'bg-yellow',
        layout: 'stack',
        heading: 'Keep pipelines in your own config',
        description: (
            <>
                <p>
                    Manage Hog functions and batch exports with the API, so every new project gets the same pipelines.
                </p>
                {list([
                    {
                        label: 'Hog functions API',
                        description: 'Create transformations and destinations from a template or from your own code.',
                    },
                    {
                        label: 'Batch exports API',
                        description: 'Create exports, start backfills, and check the status of each run.',
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
        icon: <IconDownload className="size-5" />,
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: 'Import data from hundreds of tools and databases',
        description: (
            <>
                <p>
                    Give PostHog your credentials and it handles extract and load. Query the data next to your product
                    data, or write it straight to your own database.
                </p>
                {list([
                    {
                        label: 'Managed sources',
                        description: (
                            <>
                                Stripe, HubSpot, Salesforce, Zendesk, Postgres, MySQL, BigQuery, and{' '}
                                <Link
                                    to="/docs/data-pipelines/sources"
                                    className="font-bold underline"
                                    state={{ newWindow: true }}
                                >
                                    many more
                                </Link>
                                .
                            </>
                        ),
                    },
                    {
                        label: 'Incremental and CDC',
                        description: 'Sync only the rows that changed, or stream row-level changes from Postgres.',
                    },
                    {
                        label: 'Files and webhooks',
                        description:
                            'Upload CSV, JSON, or Parquet, read files in S3, GCS, R2, or Azure Blob, or push data in with a webhook.',
                    },
                    {
                        label: 'Write anywhere',
                        description:
                            'Land synced data in PostHog, or in your own Postgres, Snowflake, BigQuery, Redshift, Databricks, or S3.',
                    },
                ])}
            </>
        ),
    },
    {
        ...slideStyle,
        slug: 'transformations',
        label: 'Transformations',
        icon: <IconBolt className="size-5" />,
        progressBar: 'bg-orange',
        layout: 'stack',
        heading: "Fix your data before it's stored",
        description: (
            <>
                <p>
                    Transformations add, edit, or drop event properties as events are ingested, so bad data never gets
                    into your analytics.
                </p>
                {list([
                    {
                        label: 'Templates',
                        description: 'GeoIP enrichment, PII redaction, property filters, bot filtering, and more.',
                    },
                    {
                        label: 'Label events on the way in',
                        description: (
                            <>
                                Set properties like <InlineCode>user_tier</InlineCode> or{' '}
                                <InlineCode>page_category</InlineCode> once, so every insight and query is easier to
                                write.
                            </>
                        ),
                    },
                    {
                        label: 'Filters',
                        description: 'Run only on the events you choose, by event, property, or SQL expression.',
                    },
                    {
                        label: 'Custom code',
                        description:
                            "Edit any template's Hog code, or describe what you want and PostHog AI writes it.",
                    },
                    { label: 'Free', description: 'Transformations have no per-event charge.' },
                ])}
            </>
        ),
    },
    {
        ...slideStyle,
        slug: 'destinations',
        label: 'Destinations',
        icon: <IconUpload className="size-5" />,
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'Send events to other tools as they happen',
        description: (
            <>
                <p>
                    Send the events you care about to the tools your team already uses, in real time, with person and
                    event data attached.
                </p>
                {list([
                    {
                        label: 'Templates',
                        description: 'Slack, HubSpot, Salesforce, Intercom, Customer.io, Braze, Google Ads, and more.',
                    },
                    {
                        label: 'Webhooks to anything',
                        description: 'Any method, URL, and JSON payload. Mix fixed values with person and event data.',
                    },
                    {
                        label: 'Filters',
                        description: 'Send only the events and people that matter, with filters or SQL.',
                    },
                    {
                        label: 'Custom code',
                        description:
                            "Edit any template's Hog code, or describe what you want and PostHog AI writes it.",
                    },
                    {
                        label: 'Retries',
                        description: 'Failed calls retry automatically. Destinations that keep failing are paused.',
                    },
                    {
                        label: 'Warehouses',
                        description:
                            'Batch export PostHog data, or write synced source data, to Snowflake, BigQuery, Redshift, Databricks, Postgres, or S3.',
                    },
                ])}
            </>
        ),
    },
]

const compactNumber = new Intl.NumberFormat('en', { notation: 'compact' })

/** "1M rows" from a billing product or add-on's free plan, or null while billing data is missing. */
const freeAllowance = (billing: any): string | null => {
    const allocation = billing?.plans?.find((plan: any) => plan.free_allocation)?.free_allocation
    return allocation && billing?.unit ? `${compactNumber.format(allocation)} ${billing.unit}s` : null
}

/** Free tier cards, read from the billing products that Sources and Destinations are billed on. */
const useFreeTier = () => {
    const sourcesBilling = (useProduct({ handle: 'data_warehouse' }) as any)?.billingData
    const destinationsBilling = (useProduct({ handle: 'realtime_destinations' }) as any)?.billingData
    const sources = freeAllowance(sourcesBilling)
    const destinations = freeAllowance(destinationsBilling)
    const batchExports = freeAllowance(
        destinationsBilling?.addons?.find((addon: any) => addon.type === 'batch_exports')
    )

    return [
        sources && {
            label: 'Sources',
            value: `${sources} free`,
            // Same limits as the Sources free tier on /pricing (src/components/Pricing/Test/freeTierData.tsx).
            detail: 'Every month, plus free historical syncs for the first 7 days of each new source (up to 100M rows on the free plan)',
        },
        destinations && {
            label: 'Destinations',
            value: `${destinations} free`,
            detail: batchExports ? `Every month, plus ${batchExports} in batch exports` : 'Every month',
        },
        { label: 'Transformations', value: 'Free', detail: 'No per-event charge' },
    ].filter(Boolean) as { label: string; value: string; detail: string }[]
}

// Scrolls to a section's TL;DR heading. The intro sits at the top of the Sources section, so jumping to
// the section itself would land on the intro.
const scrollTo = (sectionId: string) => () =>
    Array.from(document.querySelectorAll(`#${sectionId} h2`))
        .find((heading) => heading.textContent?.includes('TL;DR'))
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })

const meters = [
    { selector: 'sources', button: 'See Sources pricing' },
    { selector: 'destinations', button: 'See Destinations pricing' },
]

/**
 * Opens the Pricing surface: explains the two meters and jumps to each one's TL;DR. Rendered inside the
 * Sources Plans block (its `intro`), so the pricing notes column starts at the top of the page.
 */
export const PricingIntro = () => (
    <div className="mb-12">
        <SectionHeading lede="Sources and destinations are priced separately, each with its own free tier every month. Transformations are free.">
            <span className="!text-4xl">How pricing works</span>
        </SectionHeading>
        <div className="flex flex-wrap gap-3">
            {meters.map(({ selector, button }) => (
                <OSButton key={selector} variant="secondary" size="md" onClick={scrollTo(selector)}>
                    {button}
                </OSButton>
            ))}
        </div>
    </div>
)

/** Replaces the shared "Get started" section, because pipelines bill in three units instead of one. */
export const GetStarted = ({ id }: SectionComponentProps) => {
    const freeTier = useFreeTier()

    return (
        <section id={id} className="scroll-mt-20 not-prose mb-20">
            <h2 className="text-3xl font-bold text-primary mt-0 mb-3">Get started – free</h2>
            <p className="text-base leading-relaxed m-0 mb-4">No credit card required. Every month you get:</p>
            <div className="grid grid-cols-1 @2xl/reader-content:grid-cols-3 gap-4 mb-4">
                {freeTier.map(({ label, value, detail }) => (
                    <div key={label} className="border border-primary rounded p-5 bg-primary">
                        <p className="text-xs font-semibold uppercase tracking-wide text-secondary m-0">{label}</p>
                        <p className="text-2xl font-bold text-primary m-0 mt-1">{value}</p>
                        <p className="text-sm text-secondary leading-relaxed m-0 mt-1">{detail}</p>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 @2xl/reader-content:grid-cols-2 gap-4">
                <div className="border border-primary rounded p-5 bg-primary">
                    <h3 className="text-lg font-bold text-primary mt-0 mb-2">Set it up yourself</h3>
                    <p className="text-sm text-secondary leading-relaxed m-0 mb-4">
                        Sign up for a free account, open Data pipelines, and pick a source, transformation, or
                        destination.
                    </p>
                    <CallToAction to="https://app.posthog.com/signup" size="md" type="primary">
                        Get started – free
                    </CallToAction>
                </div>
                <div className="border border-primary rounded p-5 bg-primary">
                    <h3 className="text-lg font-bold text-primary mt-0 mb-2">Read the docs first</h3>
                    <p className="text-sm text-secondary leading-relaxed m-0 mb-4">
                        See how sources, transformations, and destinations work before you start.
                    </p>
                    <CallToAction to="/docs/data-pipelines" size="md" type="secondary" state={{ newWindow: true }}>
                        Read the docs
                    </CallToAction>
                </div>
            </div>
        </section>
    )
}

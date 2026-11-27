import React from 'react'
import { Logo } from '@posthog/brand/logo'
import { IconCheckCircle, IconDatabase, IconSearch } from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import HeroCarousel from 'components/Home/HeroCarousel'
import { Tab } from 'components/Home/HeroCarousel/tabs'
import { getLogo } from 'constants/logos'
import useSourcePlatforms from 'hooks/useSourcePlatforms'

const SIGNUP_URL = 'https://app.posthog.com/signup'

export const POPULAR_SOURCES = [
    'stripe',
    'postgres',
    'hubspot',
    'salesforce',
    'mysql',
    'zendesk',
    'google-ads',
    'shopify',
    'mongodb',
]

const DESTINATIONS = [
    { label: 'Snowflake', image: getLogo('snowflake') },
    { label: 'BigQuery', image: getLogo('bigquery') },
    { label: 'Redshift', image: getLogo('redshift') },
    { label: 'Databricks' },
    { label: 'Postgres', image: getLogo('postgres') },
    { label: 'S3', image: getLogo('s3') },
    { label: 'Azure Blob', image: getLogo('azureBlob') },
    { label: 'PostHog' },
]

const SYNC_ROWS = [
    { table: 'charges', method: 'Webhook', frequency: 'Real time', status: 'Running' },
    { table: 'customers', method: 'Incremental', frequency: 'Every 5 mins', status: 'Completed' },
    { table: 'invoices', method: 'Append only', frequency: 'Every hour', status: 'Completed' },
    { table: 'products', method: 'Full table', frequency: 'Every day', status: 'Completed' },
]

const DemoFrame = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="not-prose border border-primary rounded bg-primary overflow-hidden">
        <div className="px-3 py-2 border-b border-primary bg-accent text-sm font-semibold">{title}</div>
        <div className="p-3 @md:p-4">{children}</div>
    </div>
)

const SourcePickerDemo = () => {
    const allSources = useSourcePlatforms()
    const sources = POPULAR_SOURCES.map((slug) =>
        allSources.find((source: { url: string }) => source.url === `/docs/data-pipelines/sources/${slug}`)
    ).filter(Boolean)

    return (
        <DemoFrame title="New source">
            <div className="flex items-center gap-2 border border-primary rounded px-2 py-1.5 mb-3 text-sm text-secondary">
                <IconSearch className="size-4 shrink-0" />
                Search 1,400+ sources
            </div>
            <ul className="grid grid-cols-2 @md:grid-cols-3 gap-2 list-none p-0 m-0">
                {sources.map(({ label, image }: { label: string; image: string }, index: number) => (
                    <li
                        key={label}
                        className={`flex items-center gap-2 rounded px-2 py-1.5 text-sm font-semibold border ${
                            index === 0 ? 'border-blue bg-blue/10' : 'border-primary bg-accent'
                        }`}
                    >
                        <img src={image} alt="" className="size-4 object-contain shrink-0" />
                        <span className="truncate">{label}</span>
                        {index === 0 && <IconCheckCircle className="ml-auto size-4 shrink-0 text-blue" />}
                    </li>
                ))}
            </ul>
        </DemoFrame>
    )
}

const DestinationPickerDemo = () => (
    <DemoFrame title="Choose a destination">
        <ul className="grid grid-cols-2 gap-2 list-none p-0 m-0">
            {DESTINATIONS.map(({ label, image }, index) => (
                <li
                    key={label}
                    className={`flex items-center gap-2 rounded px-2 py-1.5 text-sm font-semibold border ${
                        index === 0 ? 'border-teal bg-teal/10' : 'border-primary bg-accent'
                    }`}
                >
                    {image ? (
                        <img src={image} alt="" className="size-4 object-contain shrink-0" />
                    ) : label === 'PostHog' ? (
                        <Logo layout="logomark" variant="gradient" className="w-4 shrink-0" />
                    ) : (
                        <IconDatabase className="size-4 shrink-0 text-secondary" />
                    )}
                    <span className="truncate">{label}</span>
                    {index === 0 && <IconCheckCircle className="ml-auto size-4 shrink-0 text-teal hidden @md:block" />}
                    {label === 'PostHog' && (
                        <span className="ml-auto text-xs text-secondary font-normal hidden @md:inline">Default</span>
                    )}
                </li>
            ))}
        </ul>
    </DemoFrame>
)

const SyncManagerDemo = () => (
    <DemoFrame title="Stripe · Schemas">
        <table className="w-full text-sm m-0">
            <thead>
                <tr className="text-left text-xs text-secondary">
                    <th className="font-semibold pb-2">Table</th>
                    <th className="font-semibold pb-2">Sync method</th>
                    <th className="font-semibold pb-2 hidden @md:table-cell">Frequency</th>
                    <th className="font-semibold pb-2 text-right">Status</th>
                </tr>
            </thead>
            <tbody>
                {SYNC_ROWS.map(({ table, method, frequency, status }) => (
                    <tr key={table} className="border-t border-primary">
                        <td className="py-2 font-semibold">{table}</td>
                        <td className="py-2">{method}</td>
                        <td className="py-2 hidden @md:table-cell text-secondary">{frequency}</td>
                        <td className="py-2 text-right">
                            <span
                                className={`text-xs font-semibold border rounded px-1.5 py-0.5 ${
                                    status === 'Running'
                                        ? 'text-orange border-orange animate-pulse'
                                        : 'text-green border-green'
                                }`}
                            >
                                {status}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </DemoFrame>
)

export const SectionCTA = ({
    to,
    children,
    className = 'mt-4',
}: {
    to: string
    children: string
    className?: string
}) => (
    <div className={className}>
        <CallToAction type="primary" size="md" to={to} state={to.startsWith('/') ? { newWindow: true } : undefined}>
            {children}
        </CallToAction>
    </div>
)

const PipelineSlide = ({
    visual,
    title,
    children,
}: {
    visual: React.ReactNode
    title: string
    children: React.ReactNode
}) => (
    <div className="@container rounded p-4 @md:p-6 h-full flex items-center">
        <div className="w-full grid grid-cols-1 @2xl:grid-cols-[1.4fr_1fr] gap-6 @2xl:gap-8 items-center">
            <div className="min-w-0">{visual}</div>
            <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold m-0">{title}</h3>
                {children}
            </div>
        </div>
    </div>
)

const PIPELINE_TABS: Tab[] = [
    {
        value: 'source',
        label: '1. Select your source',
        content: (
            <PipelineSlide visual={<SourcePickerDemo />} title="Pick from 1,400+ sources">
                <p className="text-secondary m-0">
                    Choose a database, SaaS tool, or file. Paste in a read-only key, then pick the tables you want.
                </p>
                <SectionCTA to="/docs/data-pipelines/sources" className="self-start">
                    Browse all sources
                </SectionCTA>
            </PipelineSlide>
        ),
        color: 'bg-blue',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
    },
    {
        value: 'destination',
        label: '2. Select your destination',
        content: (
            <PipelineSlide visual={<DestinationPickerDemo />} title="Send it to any warehouse">
                <p className="text-secondary m-0">
                    Load into Snowflake, BigQuery, Redshift, Databricks, Postgres, or S3. Don't have a warehouse? Use
                    PostHog's and start querying straight away.
                </p>
                <SectionCTA to="/docs/data-pipelines/destinations/elt-destinations" className="self-start">
                    See all destinations
                </SectionCTA>
            </PipelineSlide>
        ),
        color: 'bg-teal',
        activeText: 'text-black',
        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
    },
    {
        value: 'manage',
        label: '3. Manage your syncs',
        content: (
            <PipelineSlide visual={<SyncManagerDemo />} title="Control every sync">
                <p className="text-secondary m-0">
                    Set a sync method and schedule for each table, as often as every 5 minutes. See the status and rows
                    synced for every table in one place.
                </p>
                <SectionCTA to={SIGNUP_URL} className="self-start">
                    Start syncing for free
                </SectionCTA>
            </PipelineSlide>
        ),
        color: 'bg-purple',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
    },
]

export default function SourcesPipelineCarousel(): JSX.Element {
    return <HeroCarousel tabs={PIPELINE_TABS} staticHeight />
}

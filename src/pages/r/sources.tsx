import React, { useState, useEffect, useMemo } from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import { QuestLog, QuestLogItem } from 'components/Docs/QuestLog'
import { CallToAction } from 'components/CallToAction'
import List from 'components/List'
import Link from 'components/Link'
import WizardCTA from 'components/WizardCTA'
import { ProductScreenshot } from 'components/ProductScreenshot'
import { HedgehogConstruction } from '@posthog/brand/hoggies'
import useSourcePlatforms from 'hooks/useSourcePlatforms'
import SourcesPipelineCarousel, { POPULAR_SOURCES, SectionCTA } from 'components/DataPipelines/SourcesPipelineCarousel'
import {
    IconColumns,
    IconTrending,
    IconRefresh,
    IconDatabase,
    IconLock,
    IconEye,
    IconShieldLock,
    IconGlobe,
    IconCheckCircle,
    IconWarning,
    IconX,
} from '@posthog/icons'

const SIGNUP_URL = 'https://app.posthog.com/signup'

const STATS = [
    { stat: '4x cheaper', label: 'than Fivetran at 100M rows' },
    { stat: '1M rows free', label: 'every month' },
    { stat: 'Free backfills', label: "for each new source's first seven days" },
]

const COMPARISON_TOOLS = ['PostHog Sources', 'Fivetran', 'Airbyte Cloud']

const COMPARISON: { label: string; values: React.ReactNode[] }[] = [
    {
        label: '100M rows/month',
        values: [
            <strong key="posthog">$735</strong>,
            '$2,894 (Standard, one Postgres connection)',
            '$2,226 (Plus, 603 credits); $3,010 on Standard',
        ],
    },
    {
        label: 'Free tier',
        values: ['1M rows/month, every month', '500,000 MAR', 'None; 30-day trial with 400 credits'],
    },
    {
        label: 'Pricing unit',
        values: [
            'Rows synced',
            'Monthly active rows, per connection',
            'Credits (rows for APIs, GB for databases and files)',
        ],
    },
    { label: 'Minimum spend', values: ['None', '$5/month per connection', '$20/month on Standard'] },
    {
        label: 'Historical backfills',
        values: [
            "Free for each new source's first seven days (up to 100M rows on the free plan)",
            'Count toward usage',
            'Count toward credits',
        ],
    },
]

type IconItem = { Icon: React.ComponentType<{ className?: string }>; color: string; text: React.ReactNode }

const FULLY_MANAGED: IconItem[] = [
    {
        Icon: IconColumns,
        color: 'text-blue',
        text: "Schema changes are picked up automatically, so a new column upstream doesn't break your sync.",
    },
    {
        Icon: IconTrending,
        color: 'text-green',
        text: 'Incremental syncs only move rows that changed since the last run.',
    },
    { Icon: IconRefresh, color: 'text-orange', text: 'Retries and rate limits are handled for you, per source.' },
    {
        Icon: IconDatabase,
        color: 'text-purple',
        text: 'Big tables sync reliably. Every incremental sync runs on deltalite, our own upsert engine. Memory scales with the batch, not the table.',
    },
]

const SECURE_BY_DEFAULT: IconItem[] = [
    { Icon: IconLock, color: 'text-red', text: 'We encrypt your credentials at rest.' },
    {
        Icon: IconEye,
        color: 'text-teal',
        text: 'Connect with a read-only user, so Sources can never change your data.',
    },
    {
        Icon: IconShieldLock,
        color: 'text-seagreen',
        text: (
            <>
                PostHog is{' '}
                <Link to="/docs/privacy/soc2" state={{ newWindow: true }} className="underline font-semibold">
                    SOC 2 certified.
                </Link>
            </>
        ),
    },
    { Icon: IconGlobe, color: 'text-yellow', text: 'EU data residency, and a HIPAA BAA if you need one.' },
]

const MIGRATION_REPORT: IconItem[] = [
    { Icon: IconCheckCircle, color: 'text-green', text: '17 of your 23 pipelines move as-is' },
    { Icon: IconWarning, color: 'text-yellow', text: '4 move with small differences' },
    { Icon: IconX, color: 'text-red', text: "2 aren't supported yet" },
]

const FeatureCards = ({ items }: { items: IconItem[] }) => (
    <ul className="grid grid-cols-1 @2xl:grid-cols-2 gap-3 not-prose list-none p-0 mb-6">
        {items.map(({ Icon, color, text }, index) => (
            <li key={index} className="flex gap-3 items-start border border-primary rounded-md p-4 bg-accent">
                <Icon className={`${color} size-7 shrink-0`} />
                <span className="text-[15px] leading-snug">{text}</span>
            </li>
        ))}
    </ul>
)

const scrollToQuestItem = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
        window.history.pushState(null, '', `#${id}`)
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}

export default function SourcesLanding(): JSX.Element {
    const [isIdle, setIsIdle] = useState(false)

    const allSources = useSourcePlatforms()
    const popularSources = useMemo(() => {
        const byUrl = new Map<string, (typeof allSources)[number]>(
            allSources.map((source: { url: string }) => [source.url, source])
        )
        return POPULAR_SOURCES.map((slug) => byUrl.get(`/docs/data-pipelines/sources/${slug}`)).filter(Boolean)
    }, [allSources])

    useEffect(() => {
        let idleTimer: ReturnType<typeof setTimeout>

        const handleActivity = () => {
            setIsIdle(false)
            clearTimeout(idleTimer)
            idleTimer = setTimeout(() => setIsIdle(true), 2000)
        }

        handleActivity()
        window.addEventListener('pointermove', handleActivity)
        window.addEventListener('keydown', handleActivity)

        const scrollViewport = document.querySelector('[data-radix-scroll-area-viewport]')
        scrollViewport?.addEventListener('scroll', handleActivity)

        return () => {
            clearTimeout(idleTimer)
            window.removeEventListener('pointermove', handleActivity)
            window.removeEventListener('keydown', handleActivity)
            scrollViewport?.removeEventListener('scroll', handleActivity)
        }
    }, [])

    return (
        <>
            <SEO
                title="PostHog Sources – Managed ELT for a fraction of the price"
                description="Sources is PostHog's ELT tool. Sync Stripe, Postgres, HubSpot, Salesforce, and 1,400+ other sources into Snowflake, BigQuery, Postgres, or any warehouse. Free for the first 1M rows every month, with free historical syncs."
                noindex
            />
            <ReaderView
                hideLeftSidebar
                hideRightSidebar
                hideTitle
                title="PostHog Sources"
                contentMaxWidthClass="max-w-5xl"
                showQuestions={false}
            >
                <div className="grid grid-cols-1 @lg:grid-cols-[1.2fr_1fr] gap-10 items-center mb-12">
                    <div>
                        <h1 className="text-3xl @2xl:text-5xl !mb-4">Sources, the ELT tool from PostHog</h1>
                        <p className="text-lg @2xl:text-xl mb-6 text-secondary">
                            Move data from 1,400+ tools and databases into Snowflake, BigQuery, Postgres, PostHog, or
                            any other warehouse.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <CallToAction type="primary" size="md" to={SIGNUP_URL}>
                                Get started free
                            </CallToAction>
                            <CallToAction
                                type="secondary"
                                size="md"
                                onClick={() => scrollToQuestItem('quest-item-pay-less-than-fivetran-or-airbyte')}
                            >
                                Compare pricing
                            </CallToAction>
                        </div>
                        <dl className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-primary not-prose">
                            {STATS.map(({ stat, label }) => (
                                <div key={stat}>
                                    <dt className="text-xl @2xl:text-2xl font-bold">{stat}</dt>
                                    <dd className="text-sm text-secondary m-0 leading-snug">{label}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex items-end justify-center">
                            <HedgehogConstruction variant="1" size={260} className="w-1/2 max-w-[260px] h-auto" />
                            <HedgehogConstruction variant="2" size={260} className="w-1/2 max-w-[260px] h-auto" />
                        </div>
                    </div>
                </div>

                <section className="mb-12">
                    <SourcesPipelineCarousel />
                </section>

                <div className={isIdle ? 'quest-idle' : ''}>
                    <QuestLog firstSpeechBubble="Let's move some data!" lastSpeechBubble="Time to cancel Fivetran!">
                        <QuestLogItem
                            title="Connect a source in minutes"
                            subtitle="Set it up once, then forget about it"
                            icon="IconPlug"
                        >
                            <p>
                                Got a lot of sources? The <strong>PostHog Wizard</strong> finds the databases and APIs
                                in your code and connects them for you.
                            </p>

                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2024_08_30_at_10_45_12_ef06f67105.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2024_08_30_at_10_47_20_f6c1d42503.png"
                                alt="Source settings in PostHog"
                                classes="rounded"
                                padding={false}
                                zoom={undefined}
                            />

                            <WizardCTA
                                command="warehouse"
                                title="Let AI connect your sources for you"
                                subtitle="Run this in your project and the wizard detects your databases and APIs, then connects them."
                            />

                            <h3 className="!text-lg">Popular sources</h3>

                            <List
                                className="grid gap-4 grid-cols-2 @2xl:grid-cols-3 not-prose"
                                items={popularSources}
                            />

                            <p className="mt-4">
                                Plus 1,400+ more.{' '}
                                <Link to="/docs/data-pipelines/sources" state={{ newWindow: true }}>
                                    See every source
                                </Link>
                                . Missing one you need?{' '}
                                <Link to="/talk-to-a-human" state={{ newWindow: true }}>
                                    Ask us
                                </Link>
                                .
                            </p>

                            <SectionCTA to={SIGNUP_URL}>Connect your first source</SectionCTA>
                        </QuestLogItem>

                        <QuestLogItem title="Leave the plumbing to us" subtitle="Fully managed syncs" icon="IconBolt">
                            <FeatureCards items={FULLY_MANAGED} />

                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_07_16_at_11_04_28_2x_905d242fe0.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_07_16_at_11_04_02_2x_690da5bd8b.png"
                                alt="Managed sources in PostHog with rows synced and sync status"
                                classes="rounded"
                                padding={false}
                                zoom={undefined}
                            />

                            <SectionCTA to="/docs/data-pipelines/sources#sync-methods">
                                Learn about sync methods
                            </SectionCTA>
                        </QuestLogItem>

                        <QuestLogItem title="Keep your data safe" subtitle="Secure by default" icon="IconShieldLock">
                            <FeatureCards items={SECURE_BY_DEFAULT} />

                            <p>Choose who can see each source and its tables, by person or by role.</p>

                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/source_access_control_light_dc6bd412f4.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/source_access_control_dark_39b0d2ea8a.png"
                                alt="Access control settings for a source in PostHog"
                                classes="rounded"
                                padding={false}
                                zoom={undefined}
                            />

                            <SectionCTA to="/docs/settings/warehouse-access-control">Set up access control</SectionCTA>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Pay less than Fivetran or Airbyte"
                            subtitle="Simple per-row pricing"
                            icon="IconPiggyBank"
                        >
                            <p>Sources bills per row synced. The price per row drops as you grow.</p>

                            <div className="hidden @3xl:block overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            {COMPARISON_TOOLS.map((tool) => (
                                                <th key={tool}>{tool}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {COMPARISON.map(({ label, values }) => (
                                            <tr key={label}>
                                                <td>
                                                    <strong>{label}</strong>
                                                </td>
                                                {values.map((value, index) => (
                                                    <td key={COMPARISON_TOOLS[index]}>{value}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="@3xl:hidden not-prose space-y-3">
                                {COMPARISON.map(({ label, values }) => (
                                    <div key={label} className="border border-primary rounded-md p-4 bg-accent">
                                        <p className="font-bold !mt-0 !mb-2">{label}</p>
                                        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm m-0">
                                            {values.map((value, index) => (
                                                <React.Fragment key={COMPARISON_TOOLS[index]}>
                                                    <dt className="text-secondary">{COMPARISON_TOOLS[index]}</dt>
                                                    <dd className="m-0">{value}</dd>
                                                </React.Fragment>
                                            ))}
                                        </dl>
                                    </div>
                                ))}
                            </div>

                            <SectionCTA to="/pricing">See full pricing</SectionCTA>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Switch without the risk"
                            subtitle="Use our migration wizard"
                            icon="IconDecisionTree"
                        >
                            <p>
                                Give the migration wizard a read-only API key from Fivetran or Airbyte. It pulls your
                                full setup – sources, tables, schedules, and destinations – and checks every pipeline
                                against Sources before anything changes.
                            </p>

                            {/* Example figures – swap for real ones once we have a customer migration to show */}
                            <div className="not-prose border border-primary rounded-md bg-accent p-4 mb-6">
                                <p className="text-sm font-semibold text-secondary !mt-0 !mb-3">
                                    Example migration report
                                </p>
                                <ul className="list-none p-0 m-0 space-y-2">
                                    {MIGRATION_REPORT.map(({ Icon, color, text }, index) => (
                                        <li key={index} className="flex gap-3 items-center">
                                            <Icon className={`${color} size-6 shrink-0`} />
                                            <span>{text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <p>Once you've reviewed the report, PostHog AI sets everything up for you.</p>

                            <ol>
                                <li>Paste in your API key</li>
                                <li>
                                    Review which pipelines move as-is, which need small changes, and which aren't
                                    supported yet
                                </li>
                                <li>
                                    Let PostHog AI recreate your sources with the same tables, schedules, and
                                    destinations
                                </li>
                                <li>Check the data, then switch off the old connector</li>
                            </ol>

                            <p>
                                Every row synced in a new source's first seven days is free (up to 100M rows on the free
                                plan, unlimited on paid plans), so the backfill costs nothing while you check it.
                            </p>

                            <div className="mt-4">
                                <CallToAction type="primary" size="md" to="/docs/data-pipelines/migrate-off-fivetran">
                                    Start your migration
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem title="Start for free" subtitle="Free 1M rows/mo" icon="IconHandMoney">
                            <p>
                                The first 1M rows you sync every month are free, and so are historical syncs in a new
                                source's first seven days (up to 100M rows on the free plan, unlimited on paid plans).
                                Since we don't charge per seat, your whole team can use it.
                            </p>

                            <p>That's it! Time to connect your first source.</p>

                            <div className="flex flex-wrap gap-2 mt-4">
                                <CallToAction type="primary" size="md" to={SIGNUP_URL}>
                                    Get started free
                                </CallToAction>
                                <CallToAction
                                    type="secondary"
                                    size="md"
                                    to="/talk-to-a-human"
                                    state={{ newWindow: true }}
                                >
                                    Talk to a human
                                </CallToAction>
                            </div>
                        </QuestLogItem>
                    </QuestLog>
                </div>
            </ReaderView>
        </>
    )
}

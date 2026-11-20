import React from 'react'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import WarehouseWizardHint from 'components/WarehouseWizardHint'
import {
    CARD,
    GuideCardActions,
    HIGHLIGHT_COLOR,
    JumpLinks,
    SECTION,
    Section,
    maxPromptUrl,
} from 'components/DataPipelines/SourcePage'
import {
    IconBell,
    IconBug,
    IconClock,
    IconClockRewind,
    IconColumns,
    IconDatabase,
    IconDatabaseBolt,
    IconFilter,
    IconLive,
    IconMessage,
    IconPeople,
    IconPulse,
    IconRefresh,
    IconRewindPlay,
    IconRocket,
    IconToggle,
    IconTrending,
    IconUserPaths,
} from '@posthog/icons'
import { HedgehogDataThief, HedgehogDollHouse } from '@posthog/brand/hoggies'

type IconComponent = React.ComponentType<{ className?: string }>

interface Question {
    Icon: IconComponent
    iconColor: string
    question: string
    answer: string
    href: string
}

interface QuestionGroup {
    role: string
    questions: Question[]
}

const questionGroups: QuestionGroup[] = [
    {
        role: 'Product',
        questions: [
            {
                Icon: IconRocket,
                iconColor: 'text-green',
                question: 'Which accounts actually activate?',
                answer: 'Join your accounts or organizations table to signup events and find the early actions that separate the accounts that stay from the ones that leave.',
                href: '/learn/warehouse/pocket-guide/activation-metrics',
            },
            {
                Icon: IconColumns,
                iconColor: 'text-purple',
                question: 'How does usage differ by plan, company size, or region?',
                answer: 'Use your app tables as dimensions, so you can break down any insight by customer attributes.',
                href: '/learn/warehouse/pocket-guide/dimension-tables',
            },
        ],
    },
    {
        role: 'Growth',
        questions: [
            {
                Icon: IconUserPaths,
                iconColor: 'text-blue',
                question: 'Where do new signups get stuck?',
                answer: 'Add setup steps, like connecting an integration or inviting a teammate, to your funnels and see where new accounts stop.',
                href: '/learn/warehouse/pocket-guide/conversion-metrics',
            },
            {
                Icon: IconTrending,
                iconColor: 'text-orange',
                question: 'Which accounts are ready to upgrade?',
                answer: 'Compare real product usage against the plan limits in your database and flag accounts sitting near or over the line while still on a smaller plan.',
                href: '/learn/warehouse/pocket-guide/upsell-ready-accounts',
            },
        ],
    },
    {
        role: 'Customer success',
        questions: [
            {
                Icon: IconPulse,
                iconColor: 'text-red',
                question: 'Which accounts are going quiet?',
                answer: 'Measure retention, stickiness, and lifecycle per account, using the account IDs from your database instead of stitching together anonymous users.',
                href: '/learn/warehouse/pocket-guide/product-usage-metrics',
            },
            {
                Icon: IconPeople,
                iconColor: 'text-salmon',
                question: 'Are my most valuable accounts engaged?',
                answer: 'Put contract value or seat count from your accounts table next to engagement, and find the large accounts that barely use your product before they come up for renewal.',
                href: '/learn/warehouse/pocket-guide/value-vs-engagement',
            },
        ],
    },
]

interface ProductUse {
    product: string
    Icon: IconComponent
    iconColor: string
    description: string
    prompt: string
}

const productUses: ProductUse[] = [
    {
        product: 'Feature flags',
        Icon: IconToggle,
        iconColor: 'text-green',
        description:
            'Roll out a feature to accounts on a specific plan, or to everyone who opted into the beta in your app.',
        prompt: 'Build a cohort of persons whose account in my Postgres [accounts] table has [plan = enterprise], matched to PostHog persons by [email / user ID]. Then create a feature flag called [flag-key] that rolls out to [100]% of that cohort.',
    },
    {
        product: 'Surveys',
        Icon: IconMessage,
        iconColor: 'text-salmon',
        description:
            'Ask accounts that signed up in the last two weeks how setup went, or survey only the admins on your largest accounts.',
        prompt: 'Build a cohort of persons whose account in my Postgres [accounts] table was created in the last [14] days, matched to PostHog persons by [email / user ID]. Then create a survey asking "[How was setting up your account?]" targeted only to that cohort.',
    },
    {
        product: 'Session replay',
        Icon: IconRewindPlay,
        iconColor: 'text-yellow',
        description:
            'Filter recordings to accounts on your top plan, or to accounts that hit a setup error your app logged, and see what happened.',
        prompt: 'Create a cohort of persons whose account in my Postgres [accounts] table has [seats > 50], matched by [email / user ID], and save it. Then open Session replay filtered to that cohort over the last [7] days and save it as a shared filter called "[Large accounts]."',
    },
    {
        product: 'Error tracking',
        Icon: IconBug,
        iconColor: 'text-red',
        description:
            'Rank exceptions by the plan or seat count of the accounts hitting them, so the bug that blocks your biggest customers gets fixed first.',
        prompt: 'Query my error tracking issues joined to my Postgres [accounts] table by [email / user ID], and rank the issues by the total [seats] of the accounts that hit them in the last [30] days. Show issue name, number of affected accounts, and their plans, highest first. Save it as an insight called "Errors by account size."',
    },
    {
        product: 'Alerts',
        Icon: IconBell,
        iconColor: 'text-blue',
        description:
            'Watch a number that only your database has, like new orders or active projects per day, and get notified when it drops below its normal range.',
        prompt: 'Build a trends insight of daily new rows in my Postgres [orders] table, using [created_at], over the last [8] weeks. Then set an alert that notifies [me / #channel] when that number drops below [threshold, e.g. 20% under its 8-week average].',
    },
]

interface SyncFeature {
    title: string
    Icon: IconComponent
    description: string
}

const syncFeatures: SyncFeature[] = [
    {
        title: 'Any table or view',
        Icon: IconDatabase,
        description: 'Sync tables and materialized views from any schema that PostHog can read.',
    },
    {
        title: 'Pick your columns',
        Icon: IconColumns,
        description: "Leave out columns you don't want in PostHog, like password hashes or internal notes.",
    },
    {
        title: 'Filter your rows',
        Icon: IconFilter,
        description: 'Add up to 20 row filters per table to sync only recent rows or a single tenant.',
    },
    {
        title: 'Live queries',
        Icon: IconLive,
        description: 'Query your database directly from the SQL editor, without copying the data into PostHog.',
    },
]

interface SyncMode {
    mode: string
    Icon: IconComponent
    description: string
}

const syncModes: SyncMode[] = [
    {
        mode: 'Change data capture (CDC)',
        Icon: IconDatabaseBolt,
        description: 'Streams inserts, updates, and deletes through logical replication, in near real time.',
    },
    {
        mode: 'Incremental',
        Icon: IconClock,
        description: 'Pulls changed rows on a schedule, using a cursor column like updated_at.',
    },
    {
        mode: 'xmin',
        Icon: IconClockRewind,
        description: 'Syncs inserts and updates incrementally when your table has no reliable cursor column.',
    },
    {
        mode: 'Append-only',
        Icon: IconTrending,
        description: 'Adds new rows on a schedule. Best for event or log tables that only grow.',
    },
    {
        mode: 'Full table',
        Icon: IconRefresh,
        description: 'Re-copies the whole table each time. Best for small tables that change often.',
    },
]

export default function PostgresSource(): JSX.Element {
    const pageRef = React.useRef<HTMLDivElement>(null)

    return (
        <>
            <SEO
                title="Query your Postgres data in PostHog"
                description="Connect your Postgres database to PostHog and answer questions about your accounts, plans, and usage in one place."
                image="/images/og/cdp.jpg"
            />
            <Editor
                slug="/data-pipelines/sources/postgres"
                maxWidth="100%"
                hasPadding={false}
                disableFormatting
                bookmark={{
                    title: 'Query your Postgres data in PostHog',
                    description: 'Connect Postgres to PostHog and join your app data to product data.',
                }}
            >
                <div ref={pageRef} className="@container not-prose mx-auto max-w-7xl p-4 pb-16 text-primary @xl:p-8">
                    <header className="grid gap-6 @3xl:grid-cols-[minmax(0,1fr)_minmax(12rem,15rem)] @3xl:items-center @3xl:gap-10">
                        <div className="min-w-0">
                            <h1 className="m-0 text-balance text-4xl font-bold leading-[1.1] tracking-tight @2xl:text-5xl">
                                Query your{' '}
                                <RoughAnnotation
                                    type="highlight"
                                    color={HIGHLIGHT_COLOR}
                                    strokeWidth={1}
                                    padding={2}
                                    delay={300}
                                    // The scroll trigger never fires this close to the top of the window
                                    show
                                    multiline
                                >
                                    Postgres data
                                </RoughAnnotation>{' '}
                                in PostHog
                            </h1>
                            <p className="m-0 mt-4 max-w-xl text-pretty text-lg text-secondary @2xl:text-xl">
                                Connect Postgres to PostHog to connect who your customers are to how they use your
                                product, so you can see which accounts activate and which are ready to upgrade.
                            </p>
                            <div className="mt-6">
                                <OSButton
                                    asLink
                                    to="/docs/data-pipelines/sources"
                                    state={{ newWindow: true }}
                                    variant="primary"
                                    size="xl"
                                >
                                    Connect Postgres to get started
                                </OSButton>
                            </div>
                        </div>
                        <HedgehogDollHouse className="hidden w-full max-w-[15rem] justify-self-end @3xl:block" />
                    </header>

                    <JumpLinks pageRef={pageRef} />

                    <Section
                        id="what-syncs"
                        title="What syncs from Postgres"
                        intro={
                            <>
                                Your schema is your own, so PostHog doesn't sync a fixed list of tables.{' '}
                                <strong className="text-primary">You choose the tables, columns, and rows</strong>, and
                                how each one stays up to date.
                            </>
                        }
                    >
                        <div className="grid grid-cols-1 gap-4 @md:grid-cols-2 @5xl:grid-cols-4">
                            {syncFeatures.map((f) => (
                                <div key={f.title} className={CARD}>
                                    <h3 className="m-0 mb-1 flex items-center gap-2 text-base font-bold">
                                        <f.Icon className="size-5 shrink-0 text-muted" />
                                        {f.title}
                                    </h3>
                                    <p className="m-0 text-[15px] text-secondary">{f.description}</p>
                                </div>
                            ))}
                        </div>

                        <h3 className="m-0 mb-3 mt-10 text-xl font-bold tracking-tight">
                            Choose a sync method per table
                        </h3>
                        <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2 @5xl:grid-cols-3">
                            {syncModes.map((m) => (
                                <div key={m.mode} className={CARD}>
                                    <h4 className="m-0 mb-1 flex items-center gap-2 text-base font-bold">
                                        <m.Icon className="size-5 shrink-0 text-muted" />
                                        {m.mode}
                                    </h4>
                                    <p className="m-0 text-[15px] text-secondary">{m.description}</p>
                                </div>
                            ))}
                        </div>
                        <p className="m-0 mt-4 max-w-3xl text-[15px] text-secondary">
                            With CDC, PostHog can keep a current-state table, a full change history table, or both. The
                            history table shows when each row changed, so you can see when an account changed plan.
                        </p>
                        <div className="mt-6">
                            <OSButton
                                asLink
                                to="/docs/data-pipelines/sources/postgres"
                                state={{ newWindow: true }}
                                variant="secondary"
                                size="md"
                            >
                                Read the docs
                            </OSButton>
                        </div>
                    </Section>

                    <Section
                        id="connect"
                        title="How to connect Postgres"
                        intro="Paste a connection string or enter your host details, then pick the tables to sync. PostHog connects over TLS from a fixed set of IP addresses you can allowlist, or through an SSH tunnel if your database isn't public. For scheduled syncs, a read-only user is all it needs."
                    >
                        <WarehouseWizardHint />
                    </Section>

                    <Section id="questions" title="Questions you can answer with Postgres and PostHog">
                        {questionGroups.map((group) => (
                            <div key={group.role} className="mt-8 first:mt-0">
                                <h3 className="m-0 mb-3 text-xl font-bold tracking-tight">{group.role}</h3>
                                <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2">
                                    {group.questions.map((q) => (
                                        <div key={q.question} className={CARD}>
                                            <q.Icon className={`mb-3 size-6 ${q.iconColor}`} />
                                            <h4 className="m-0 mb-2 text-lg font-bold leading-tight">{q.question}</h4>
                                            <p className="m-0 text-[15px] text-secondary">{q.answer}</p>
                                            <GuideCardActions href={q.href} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </Section>

                    <Section
                        id="across-posthog"
                        title="Use Postgres data across PostHog"
                        intro="Once it's in PostHog, your app data isn't stuck in the SQL editor. You can use it everywhere you already work."
                    >
                        <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2 @6xl:grid-cols-3">
                            {productUses.map((use) => (
                                <div key={use.product} className={CARD}>
                                    <h3 className="m-0 mb-2 flex items-center gap-2 text-lg font-bold leading-tight">
                                        <use.Icon className={`size-5 shrink-0 ${use.iconColor}`} />
                                        {use.product}
                                    </h3>
                                    <p className="m-0 text-[15px] text-secondary">{use.description}</p>
                                    <div className="mt-auto pt-4">
                                        <OSButton
                                            asLink
                                            to={maxPromptUrl(use.prompt)}
                                            external
                                            variant="secondary"
                                            size="sm"
                                        >
                                            Try it in PostHog AI
                                        </OSButton>
                                    </div>
                                </div>
                            ))}
                            <div className="flex h-full overflow-hidden rounded border border-primary bg-primary">
                                <div className="w-1 shrink-0 bg-green" aria-hidden />
                                <p className="m-0 p-5 text-[15px] text-secondary">
                                    <strong className="text-primary">Tip:</strong> Build an{' '}
                                    <em>&ldquo;enterprise plan, signed up this quarter&rdquo;</em> cohort once, then
                                    reuse the same group as a flag target, a survey audience, and an alert.
                                </p>
                            </div>
                        </div>
                    </Section>

                    <section className={SECTION}>
                        <div className="grid items-center gap-6 @3xl:grid-cols-[minmax(0,1fr)_minmax(10rem,13rem)] @3xl:gap-10">
                            <div className="min-w-0">
                                <h2 className="m-0 max-w-xl text-balance text-2xl font-bold tracking-tight @2xl:text-3xl">
                                    Your database has been holding out on you
                                </h2>
                                <p className="m-0 mt-2 max-w-2xl text-base text-secondary">
                                    It knows every account, plan, and signup. Connect Postgres and make it talk.
                                </p>
                                <div className="mt-5 flex flex-col items-start gap-3 @xs:flex-row @xs:items-center">
                                    <OSButton
                                        asLink
                                        to="/docs/data-pipelines/sources"
                                        state={{ newWindow: true }}
                                        variant="primary"
                                        size="xl"
                                    >
                                        Spill the tables
                                    </OSButton>
                                    <p className="m-0 text-sm text-secondary">
                                        Not using PostHog?{' '}
                                        <Link
                                            to="https://app.posthog.com/signup"
                                            external
                                            className="font-semibold text-red dark:text-yellow"
                                        >
                                            Sign up
                                        </Link>
                                    </p>
                                </div>
                            </div>
                            <HedgehogDataThief className="hidden w-full max-w-[13rem] justify-self-end @3xl:block" />
                        </div>
                    </section>
                </div>
            </Editor>
        </>
    )
}

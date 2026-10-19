import React from 'react'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import WarehouseWizardHint from 'components/WarehouseWizardHint'
import GuideCardActions from 'components/ContextWarehouse/GuideCardActions'
import {
    IconBell,
    IconBug,
    IconCart,
    IconClock,
    IconFlask,
    IconHandMoney,
    IconHeart,
    IconMessage,
    IconPieChart,
    IconReceipt,
    IconRefresh,
    IconRewindPlay,
    IconRocket,
    IconStack,
    IconTarget,
    IconToggle,
    IconWarning,
    IconWebhooks,
} from '@posthog/icons'
import { HedgehogHahaBizzniss, HedgehogMoney, HedgehogOrganized } from '@posthog/brand/hoggies'

type IconComponent = React.ComponentType<{ className?: string }>

/** Opens PostHog AI with the prompt pre-filled but not sent, so the reader can fill in the [placeholders] first. */
const maxPromptUrl = (prompt: string) => `https://app.posthog.com/#panel=max:${encodeURIComponent(prompt)}`

// Same highlight as the /enterprise hero.
const HIGHLIGHT_COLOR = 'rgba(247, 165, 1, 0.15)'

const CARD = 'flex h-full flex-col rounded border border-primary bg-primary p-5'
const SECTION = 'mt-12 border-t border-primary pt-10'

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
                Icon: IconPieChart,
                iconColor: 'text-green',
                question: 'Which features do my paying customers use?',
                answer: 'Join Stripe MRR to feature-usage events to rank features by the revenue of the people who use them.',
                href: '/pocket-guides/context-warehouse/features-drive-revenue',
            },
            {
                Icon: IconToggle,
                iconColor: 'text-purple',
                question: 'Did this new feature move revenue?',
                answer: "Split users on a feature flag or experiment, then compare Stripe revenue and retention between the group that saw it and the group that didn't.",
                href: '/pocket-guides/context-warehouse/feature-revenue-impact',
            },
        ],
    },
    {
        role: 'Growth',
        questions: [
            {
                Icon: IconTarget,
                iconColor: 'text-blue',
                question: 'Which channels bought customers who stuck around?',
                answer: 'Tie first-touch acquisition source to Stripe revenue, not just signups. The cheapest leads and the customers who still pay in month six may not come from the same channels.',
                href: '/pocket-guides/context-warehouse/acquisition-channels-retention',
            },
            {
                Icon: IconRocket,
                iconColor: 'text-orange',
                question: 'When are customers ready to grow to the next tier?',
                answer: 'Compare product usage against the plan limits in Stripe and flag accounts sitting near or over the line while still on a smaller tier.',
                href: '/pocket-guides/context-warehouse/upsell-ready-accounts',
            },
        ],
    },
    {
        role: 'Customer success',
        questions: [
            {
                Icon: IconWarning,
                iconColor: 'text-red',
                question: 'What do customers do right before they cancel?',
                answer: 'Pull cancellation dates from Stripe and look at the 30 days of activity before each one. Find out what the warning signs were so you can act on them next time.',
                href: '/pocket-guides/context-warehouse/pre-cancellation-behavior',
            },
            {
                Icon: IconHeart,
                iconColor: 'text-salmon',
                question: 'Are my biggest customers happy?',
                answer: "Put each account's revenue next to its engagement and find the high-paying, low-usage accounts so you can contact them before their contract is up for renewal.",
                href: '/pocket-guides/context-warehouse/value-vs-engagement',
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
        product: 'Surveys',
        Icon: IconMessage,
        iconColor: 'text-salmon',
        description:
            'Fire an NPS survey only at customers who\'ve paid for three months or more, or trigger a "what changed?" survey the moment someone drops a plan tier in Stripe.',
        prompt: 'Build a cohort of customers whose active Stripe subscription started [3] or more months ago, matched to PostHog persons by email. Then create an NPS survey targeted only to that cohort, showing it once per person with a [30]-day recurrence.',
    },
    {
        product: 'Session replay',
        Icon: IconRewindPlay,
        iconColor: 'text-yellow',
        description:
            'Filter recordings to your top accounts by MRR and use Replay Vision to summarize what they all have in common.',
        prompt: 'Create a cohort of my top [20] accounts by current Stripe MRR, matched to PostHog persons by email, and save it. Then open Session replay filtered to that cohort over the last [7] days and save it as a shared filter called "Top accounts."',
    },
    {
        product: 'Error tracking',
        Icon: IconBug,
        iconColor: 'text-red',
        description:
            'Sort exceptions by the revenue of the accounts hitting them, so the crash taking down three enterprise customers jumps the queue ahead of the one annoying a hundred free trials.',
        prompt: 'Query my error tracking issues joined to Stripe MRR by person email, and rank the issues by the total MRR of the accounts that hit them in the last [30] days. Show issue name, number of affected accounts, and total revenue affected, highest first. Save it as an insight called "Errors by revenue impact."',
    },
    {
        product: 'Alerts',
        Icon: IconBell,
        iconColor: 'text-blue',
        description:
            "Set an alert on a high-MRR cohort's usage dropping below its normal range, so a churning account lands in your inbox before it churns.",
        prompt: 'Build a trends insight of weekly active usage ([your key activation event]) for my high-MRR cohort which includes customers over [$500]/month in Stripe, matched by email, over the last [8] weeks. Then set an alert that notifies [me / #channel] when that number drops below [threshold, e.g. 20% under its 8-week average].',
    },
    {
        product: 'Experiments',
        Icon: IconFlask,
        iconColor: 'text-purple',
        description:
            'Set revenue as the goal metric so a pricing-page or checkout experiment is measured by what people paid, not how many reached the button.',
        prompt: 'For my experiment [experiment-name], add a revenue goal metric built from my Stripe data: total [charges / paid invoice amount] per exposed user in the [14] days after exposure, matched to PostHog persons by email, so the result is measured on revenue.',
    },
]

interface SyncedTableGroup {
    group: string
    Icon: IconComponent
    tables: string
}

const syncedTables: SyncedTableGroup[] = [
    {
        group: 'Billing core',
        Icon: IconReceipt,
        tables: 'Customers, charges, invoices, subscriptions, and subscription schedules.',
    },
    { group: 'Catalog', Icon: IconStack, tables: 'Products, prices, coupons, discounts, and tax rates.' },
    {
        group: 'Money movement',
        Icon: IconHandMoney,
        tables: 'Refunds, credit notes, payment intents, payouts, balance transactions, and disputes.',
    },
    { group: 'Checkout', Icon: IconCart, tables: 'Checkout sessions, payment links, setup intents, and quotes.' },
]

interface SyncMode {
    mode: string
    Icon: IconComponent
    description: string
}

const syncModes: SyncMode[] = [
    {
        mode: 'Webhook sync',
        Icon: IconWebhooks,
        description: 'Keeps data fresh in near real time and costs the least to run.',
    },
    { mode: 'Append-only sync', Icon: IconClock, description: 'Pulls new records on a schedule.' },
    {
        mode: 'Full refresh',
        Icon: IconRefresh,
        description: 'Re-downloads everything when you need every field reconciled.',
    },
]

function Section({
    id,
    title,
    intro,
    aside,
    children,
}: {
    id: string
    title: string
    intro?: React.ReactNode
    aside?: React.ReactNode
    children: React.ReactNode
}) {
    return (
        <section id={id} className={`${SECTION} scroll-mt-4`}>
            <div className="mb-6 grid items-end gap-6 @3xl:grid-cols-[minmax(0,1fr)_auto]">
                <div className="min-w-0">
                    <h2 className="m-0 text-balance text-2xl font-bold tracking-tight @2xl:text-3xl">{title}</h2>
                    {intro && <p className="m-0 mt-2 max-w-2xl text-pretty text-base text-secondary">{intro}</p>}
                </div>
                {aside && <div className="hidden @3xl:block">{aside}</div>}
            </div>
            {children}
        </section>
    )
}

const jumpLinks = [
    { id: 'questions', label: 'Questions you can answer' },
    { id: 'across-posthog', label: 'Use it across PostHog' },
    { id: 'what-syncs', label: 'What syncs' },
    { id: 'connect', label: 'How to connect' },
]

function JumpLinks() {
    return (
        <nav aria-label="On this page" className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span className="font-semibold text-muted">On this page:</span>
            {jumpLinks.map((link) => (
                <button
                    key={link.id}
                    type="button"
                    onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="font-semibold text-red dark:text-yellow"
                >
                    {link.label}
                </button>
            ))}
        </nav>
    )
}

export default function StripeSource(): JSX.Element {
    return (
        <>
            <SEO
                title="Query your Stripe data in PostHog"
                description="Connect Stripe to PostHog and answer revenue questions like which features drive revenue, or what customers do before they cancel."
                image="images/og/cdp.jpg"
            />
            <Editor
                slug="/context-warehouse/sources/stripe"
                maxWidth="100%"
                hasPadding={false}
                disableFormatting
                bookmark={{
                    title: 'Query your Stripe data in PostHog',
                    description: 'Connect Stripe to PostHog and answer revenue questions with product data.',
                }}
            >
                <div className="@container not-prose mx-auto max-w-7xl p-4 pb-16 text-primary @xl:p-8">
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
                                    Stripe data
                                </RoughAnnotation>{' '}
                                in PostHog
                            </h1>
                            <p className="m-0 mt-4 max-w-xl text-pretty text-lg text-secondary @2xl:text-xl">
                                Connect Stripe to PostHog to put your revenue and product data in one place, so you can
                                see which features drive revenue and what customers do before they cancel.
                            </p>
                            <div className="mt-6">
                                <OSButton
                                    asLink
                                    to="/docs/data-warehouse/sources"
                                    state={{ newWindow: true }}
                                    variant="primary"
                                    size="xl"
                                >
                                    Connect Stripe to get started
                                </OSButton>
                            </div>
                        </div>
                        <HedgehogMoney className="hidden w-full max-w-[15rem] justify-self-end @3xl:block" />
                    </header>

                    <JumpLinks />

                    <Section id="questions" title="Questions you can answer with Stripe and PostHog">
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
                        title="Use Stripe data across PostHog"
                        intro="Once it's in PostHog, Stripe data isn't trapped in an analytics tab. You can use it everywhere you already work."
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
                                    <strong className="text-primary">Tip:</strong> Build a{' '}
                                    <em>&ldquo;paying and near their plan limit&rdquo;</em> cohort once, then reuse the
                                    same group as a flag target, a survey audience, and an alert.
                                </p>
                            </div>
                        </div>
                    </Section>

                    <Section
                        id="what-syncs"
                        title="What syncs from Stripe"
                        intro={
                            <>
                                PostHog can sync <strong className="text-primary">40+ Stripe tables</strong>, so most of
                                your billing model comes across, not a thin slice of it, including:
                            </>
                        }
                        aside={<HedgehogOrganized className="w-full max-w-[9rem]" />}
                    >
                        <div className="grid grid-cols-1 gap-4 @md:grid-cols-2 @5xl:grid-cols-4">
                            {syncedTables.map((t) => (
                                <div key={t.group} className={CARD}>
                                    <h3 className="m-0 mb-1 flex items-center gap-2 text-base font-bold">
                                        <t.Icon className="size-5 shrink-0 text-muted" />
                                        {t.group}
                                    </h3>
                                    <p className="m-0 text-[15px] text-secondary">{t.tables}</p>
                                </div>
                            ))}
                        </div>

                        <h3 className="m-0 mb-3 mt-10 text-xl font-bold tracking-tight">Choose your sync mode</h3>
                        <div className="grid grid-cols-1 gap-4 @3xl:grid-cols-3">
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
                        <p className="m-0 mt-4 text-[15px] text-secondary">
                            PostHog handles the webhook signing secrets and updates subscriptions when you turn on new
                            tables.
                        </p>
                        <div className="mt-6">
                            <OSButton
                                asLink
                                to="/docs/cdp/sources/stripe"
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
                        title="How to connect Stripe"
                        intro="You don't need a data engineer or a warehouse of your own. The setup wizard walks you through it, and you choose which tables to sync and what access PostHog gets: connect with OAuth, or use a restricted API key with read access."
                    >
                        <WarehouseWizardHint />
                    </Section>

                    <section className={SECTION}>
                        <div className="grid items-center gap-6 @3xl:grid-cols-[minmax(0,1fr)_minmax(10rem,13rem)] @3xl:gap-10">
                            <div className="min-w-0">
                                <h2 className="m-0 max-w-xl text-balance text-2xl font-bold tracking-tight @2xl:text-3xl">
                                    You've exported from Stripe for the last time
                                </h2>
                                <p className="m-0 mt-2 max-w-2xl text-base text-secondary">
                                    Connect Stripe and never open a spreadsheet to answer one question again.
                                </p>
                                <div className="mt-5 flex flex-col items-start gap-3 @xs:flex-row @xs:items-center">
                                    <OSButton
                                        asLink
                                        to="/docs/data-warehouse/sources"
                                        state={{ newWindow: true }}
                                        variant="primary"
                                        size="xl"
                                    >
                                        Show me the money (data)
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
                            <HedgehogHahaBizzniss className="hidden w-full max-w-[13rem] justify-self-end @3xl:block" />
                        </div>
                    </section>
                </div>
            </Editor>
        </>
    )
}

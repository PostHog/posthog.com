import React from 'react'
import SourcePage, {
    SourceFeature,
    SourceProductUse,
    SourceQuestionGroup,
    SourceSyncMode,
} from 'components/DataPipelines/SourcePage'
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
import { HedgehogHahaBizzniss, HedgehogMoney } from '@posthog/brand/hoggies'

const questionGroups: SourceQuestionGroup[] = [
    {
        role: 'Product',
        questions: [
            {
                Icon: IconPieChart,
                iconColor: 'text-green',
                question: 'Which features do my paying customers use?',
                answer: 'Join Stripe MRR to feature-usage events to rank features by the revenue of the people who use them.',
                href: '/learn/warehouse/pocket-guide/features-drive-revenue',
            },
            {
                Icon: IconToggle,
                iconColor: 'text-purple',
                question: 'Did this new feature move revenue?',
                answer: "Split users on a feature flag or experiment, then compare Stripe revenue and retention between the group that saw it and the group that didn't.",
                href: '/learn/warehouse/pocket-guide/feature-revenue-impact',
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
                href: '/learn/warehouse/pocket-guide/acquisition-channels-retention',
            },
            {
                Icon: IconRocket,
                iconColor: 'text-orange',
                question: 'When are customers ready to grow to the next tier?',
                answer: 'Compare product usage against the plan limits in Stripe and flag accounts sitting near or over the line while still on a smaller tier.',
                href: '/learn/warehouse/pocket-guide/upsell-ready-accounts',
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
                href: '/learn/warehouse/pocket-guide/pre-cancellation-behavior',
            },
            {
                Icon: IconHeart,
                iconColor: 'text-salmon',
                question: 'Are my biggest customers happy?',
                answer: "Put each account's revenue next to its engagement and find the high-paying, low-usage accounts so you can contact them before their contract is up for renewal.",
                href: '/learn/warehouse/pocket-guide/value-vs-engagement',
            },
        ],
    },
]

const productUses: SourceProductUse[] = [
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

const syncedTables: SourceFeature[] = [
    {
        title: 'Billing core',
        Icon: IconReceipt,
        description: 'Customers, charges, invoices, subscriptions, and subscription schedules.',
    },
    {
        title: 'Catalog',
        Icon: IconStack,
        description: 'Products, prices, coupons, discounts, and tax rates.',
    },
    {
        title: 'Money movement',
        Icon: IconHandMoney,
        description: 'Refunds, credit notes, payment intents, payouts, balance transactions, and disputes.',
    },
    {
        title: 'Checkout',
        Icon: IconCart,
        description: 'Checkout sessions, payment links, setup intents, and quotes.',
    },
]

const syncModes: SourceSyncMode[] = [
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

export default function StripeSource(): JSX.Element {
    return (
        <SourcePage
            seo={{
                title: 'Query your Stripe data in PostHog',
                description:
                    'Connect Stripe to PostHog and answer revenue questions like which features drive revenue, or what customers do before they cancel.',
                image: 'images/og/cdp.jpg',
            }}
            slug="/data-pipelines/sources/stripe"
            bookmark={{
                title: 'Query your Stripe data in PostHog',
                description: 'Connect Stripe to PostHog and answer revenue questions with product data.',
            }}
            hero={{
                before: 'Query your',
                highlight: 'Stripe data',
                after: 'in PostHog',
                description:
                    'Connect Stripe to PostHog to put your revenue and product data in one place, so you can see which features drive revenue and what customers do before they cancel.',
                ctaLabel: 'Connect Stripe to get started',
                ctaTo: '/docs/data-pipelines/sources',
                Hedgehog: HedgehogMoney,
            }}
            whatSyncs={{
                title: 'What syncs from Stripe',
                intro: (
                    <>
                        PostHog can sync <strong className="text-primary">40+ Stripe tables</strong>, so most of your
                        billing model comes across, not a thin slice of it, including:
                    </>
                ),
                features: syncedTables,
                modesTitle: 'Choose your sync mode',
                modes: syncModes,
                note: 'PostHog handles the webhook signing secrets and updates subscriptions when you turn on new tables.',
                docsTo: '/docs/data-pipelines/sources/stripe',
            }}
            connect={{
                title: 'How to connect Stripe',
                intro: "You don't need a data engineer or a warehouse of your own. The setup wizard walks you through it, and you choose which tables to sync and what access PostHog gets: connect with OAuth, or use a restricted API key with read access.",
            }}
            questions={{
                title: 'Questions you can answer with Stripe and PostHog',
                groups: questionGroups,
            }}
            across={{
                title: 'Use Stripe data across PostHog',
                intro: "Once it's in PostHog, Stripe data isn't trapped in an analytics tab. You can use it everywhere you already work.",
                uses: productUses,
                tip: (
                    <>
                        Build a <strong>&ldquo;paying and near their plan limit&rdquo;</strong> cohort once, then reuse
                        the same group as a flag target, a survey audience, and an alert.
                    </>
                ),
            }}
            closing={{
                title: "You've exported from Stripe for the last time",
                description: 'Connect Stripe and never open a spreadsheet to answer one question again.',
                ctaLabel: 'Show me the money (data)',
                ctaTo: '/docs/data-pipelines/sources',
                Hedgehog: HedgehogHahaBizzniss,
            }}
        />
    )
}

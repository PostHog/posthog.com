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
    IconClock,
    IconColumns,
    IconDatabase,
    IconDatabaseBolt,
    IconLock,
    IconMessage,
    IconPulse,
    IconRefresh,
    IconRewindPlay,
    IconRocket,
    IconToggle,
    IconTrending,
    IconUser,
    IconUserPaths,
} from '@posthog/icons'
import { HedgehogRocket, HedgehogShocked } from '@posthog/brand/hoggies'

const questionGroups: SourceQuestionGroup[] = [
    {
        role: 'Product',
        questions: [
            {
                Icon: IconRocket,
                iconColor: 'text-green',
                question: 'Which signups activate?',
                answer: 'Join Supabase Auth users to their first week of product events. Find the early actions that separate users who stay from users who leave.',
                href: '/learn/warehouse/pocket-guide/activation-metrics',
            },
            {
                Icon: IconColumns,
                iconColor: 'text-purple',
                question: 'How does usage differ by plan or team size?',
                answer: 'Use your app tables as dimensions. Then break down any insight by the plan, seat count, or region your database stores.',
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
                question: 'Where do new users get stuck in setup?',
                answer: 'Add the rows your app writes, like a first project or an invited teammate, to your funnels. See which step new users skip.',
                href: '/learn/warehouse/pocket-guide/conversion-metrics',
            },
            {
                Icon: IconUser,
                iconColor: 'text-orange',
                question: 'Which users signed up and never came back?',
                answer: 'Compare the signup and last sign-in times in auth.users with product events. Find the users who left after day one, and what they saw first.',
            },
        ],
    },
    {
        role: 'Retention',
        questions: [
            {
                Icon: IconPulse,
                iconColor: 'text-red',
                question: 'Which accounts are going quiet?',
                answer: "Measure retention and stickiness per account, with the account IDs from your database. You don't need to stitch together anonymous users.",
                href: '/learn/warehouse/pocket-guide/product-usage-metrics',
            },
            {
                Icon: IconTrending,
                iconColor: 'text-salmon',
                question: 'Which power users are still on the free plan?',
                answer: "Put each account's plan from your database next to its product usage. Find the free accounts that use your product like paying ones.",
            },
        ],
    },
]

const productUses: SourceProductUse[] = [
    {
        product: 'Session replay',
        Icon: IconRewindPlay,
        iconColor: 'text-yellow',
        description: 'Watch the first session of every user who signed up this week. See where they got stuck.',
        prompt: 'Create a cohort of PostHog persons whose row in my Supabase auth.users table has created_at in the last [7] days, matched by email, and save it. Then open Session replay filtered to that cohort and save it as a shared filter called "[New signups]".',
    },
    {
        product: 'Feature flags',
        Icon: IconToggle,
        iconColor: 'text-green',
        description:
            "Roll out a feature to accounts on a specific plan in your database. You don't need to copy the plan into person properties.",
        prompt: 'Build a cohort of PostHog persons whose account in my Supabase [accounts] table has [plan = pro], matched by [email / user ID]. Then create a feature flag called [flag-key] that rolls out to [100]% of that cohort.',
    },
    {
        product: 'Surveys',
        Icon: IconMessage,
        iconColor: 'text-salmon',
        description:
            'Ask users who signed up this week how setup went. Or ask free power users what would make them upgrade.',
        prompt: 'Build a cohort of PostHog persons whose row in my Supabase auth.users table has created_at in the last [7] days, matched by email. Then create a survey asking "[How was setting up your account?]" targeted only to that cohort.',
    },
    {
        product: 'Error tracking',
        Icon: IconBug,
        iconColor: 'text-red',
        description:
            'Rank exceptions by the plan of the accounts that hit them. Fix the bug that blocks your paying users first.',
        prompt: 'Query my error tracking issues joined to my Supabase [accounts] table by [email / user ID], and rank the issues by the number of [paid] accounts that hit them in the last [14] days. Show issue name, affected accounts, and their plans, highest first. Save it as an insight called "Errors by plan".',
    },
    {
        product: 'Alerts',
        Icon: IconBell,
        iconColor: 'text-blue',
        description:
            'Watch a number only your database has, like new projects per day. Get an alert when it drops below normal.',
        prompt: 'Build a trends insight of daily new rows in my Supabase [projects] table, using [created_at], over the last [8] weeks. Then set an alert that notifies [me / #channel] when that number drops below [threshold, e.g. 20% under its 8-week average].',
    },
]

const syncFeatures: SourceFeature[] = [
    {
        title: 'Your app tables',
        Icon: IconDatabase,
        description: 'Sync tables and views from your public schema, or any other schema PostHog can read.',
    },
    {
        title: 'Supabase Auth users',
        Icon: IconUser,
        description: 'Sync auth.users to get the signup date, last sign-in, and sign-in provider for each user.',
    },
    {
        title: 'Pick your columns',
        Icon: IconColumns,
        description: "Leave out columns you don't want in PostHog, like tokens or private notes.",
    },
    {
        title: 'Secrets stay out',
        Icon: IconLock,
        description: "Vault tables and Realtime's daily message partitions don't sync unless you turn them on.",
    },
]

const syncModes: SourceSyncMode[] = [
    {
        mode: 'Change data capture',
        Icon: IconDatabaseBolt,
        description:
            "Streams inserts, updates, and deletes in near real time. Needs a direct connection and Supabase's IPv4 add-on.",
    },
    {
        mode: 'Incremental',
        Icon: IconClock,
        description: 'Pulls changed rows on a schedule, using a cursor column like updated_at.',
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

export default function SupabaseSource(): JSX.Element {
    return (
        <SourcePage
            seo={{
                title: 'Query your Supabase data in PostHog',
                description: 'Connect Supabase to PostHog to see what your users do in your product.',
                image: 'images/og/cdp.jpg',
            }}
            hero={{
                before: 'Query your',
                highlight: 'Supabase data',
                after: 'in PostHog',
                description:
                    'Connect Supabase to PostHog to link who your users are to how they use your product, so you can see which signups activate and which accounts go quiet.',
                ctaLabel: 'Connect Supabase to get started',
                ctaTo: '/docs/data-pipelines/sources',
                Hedgehog: HedgehogRocket,
            }}
            whatSyncs={{
                title: 'What syncs from Supabase',
                intro: (
                    <>
                        Supabase runs on Postgres, so PostHog doesn't sync a fixed list of tables.{' '}
                        <strong className="text-primary">You choose the tables and columns</strong>, and how each one
                        stays up to date.
                    </>
                ),
                features: syncFeatures,
                modesTitle: 'Choose a sync method per table',
                modes: syncModes,
                note: 'With change data capture, PostHog can also keep a history table of every change. Use it to see when an account changed plan.',
                docsTo: '/docs/data-pipelines/sources/supabase',
            }}
            connect={{
                title: 'How to connect Supabase',
                intro: "Enter your Session pooler host, database user, and password, then pick the tables to sync. Use your database password, not your Supabase account password. If row-level security blocks a table, give PostHog's role a policy for it.",
            }}
            questions={{
                title: 'Questions you can answer with Supabase and PostHog',
                groups: questionGroups,
            }}
            across={{
                title: 'Use Supabase data across PostHog',
                intro: "Once it's in PostHog, your app data isn't stuck in the SQL editor. You can use it everywhere you already work.",
                uses: productUses,
                tip: (
                    <>
                        Build a <strong>&ldquo;signed up this week&rdquo;</strong> cohort from auth.users once. Reuse it
                        as a replay filter, flag target, survey audience, and alert.
                    </>
                ),
            }}
            closing={{
                title: 'Find out who ghosted you after signup',
                description:
                    'auth.users knows when they signed up and when they last signed in. PostHog knows why they left.',
                ctaLabel: 'Stop getting ghosted',
                ctaTo: '/docs/data-pipelines/sources',
                Hedgehog: HedgehogShocked,
            }}
        />
    )
}

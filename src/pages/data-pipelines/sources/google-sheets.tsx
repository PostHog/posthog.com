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
    IconCalendar,
    IconCheckCircle,
    IconClock,
    IconColumns,
    IconDocument,
    IconEye,
    IconLightBulb,
    IconMegaphone,
    IconMessage,
    IconPeople,
    IconRefresh,
    IconRewindPlay,
    IconTarget,
    IconToggle,
    IconTrending,
} from '@posthog/icons'
import { HedgehogArtThief, HedgehogOrganized } from '@posthog/brand/hoggies'

const questionGroups: SourceQuestionGroup[] = [
    {
        role: 'Growth',
        questions: [
            {
                Icon: IconTarget,
                iconColor: 'text-green',
                question: "Are we on track for this month's goals?",
                answer: 'Keep monthly targets in a sheet. Plot them next to real signups and activations, so everyone sees the gap.',
            },
            {
                Icon: IconMegaphone,
                iconColor: 'text-orange',
                question: 'Do podcasts and sponsorships bring active users?',
                answer: 'Log spend for channels with no connector in a sheet. Compare each one with the signups and usage from its UTM source.',
            },
        ],
    },
    {
        role: 'Sales and events',
        questions: [
            {
                Icon: IconPeople,
                iconColor: 'text-blue',
                question: 'Did the people we met at the conference sign up?',
                answer: 'Sync the lead list from the event. Join it to signups by email and see who used your product afterward.',
            },
            {
                Icon: IconColumns,
                iconColor: 'text-purple',
                question: 'How does usage differ by segment or account owner?',
                answer: 'Keep a sheet that maps each account to a segment or owner. Use it as a dimension to break down any insight.',
                href: '/learn/warehouse/pocket-guide/dimension-tables',
            },
        ],
    },
    {
        role: 'Product',
        questions: [
            {
                Icon: IconCheckCircle,
                iconColor: 'text-salmon',
                question: 'Are the users who asked for this feature using it?',
                answer: 'Keep a sheet of who asked for each feature. After you ship, see who tried it and who never opened it.',
            },
            {
                Icon: IconLightBulb,
                iconColor: 'text-yellow',
                question: 'Which feature requests come from your most active users?',
                answer: 'Paste requests from sales calls or a feedback form into a sheet. Rank them by how active each requester is.',
            },
        ],
    },
]

const productUses: SourceProductUse[] = [
    {
        product: 'Feature flags',
        Icon: IconToggle,
        iconColor: 'text-green',
        description:
            "Turn on a beta feature for everyone on your beta list. You don't need to copy emails into PostHog.",
        prompt: 'Build a cohort of PostHog persons whose email is in my Google Sheets [beta testers] worksheet. Then create a feature flag called [flag-key] that rolls out to [100]% of that cohort.',
    },
    {
        product: 'Session replay',
        Icon: IconRewindPlay,
        iconColor: 'text-yellow',
        description: 'Watch how your beta testers use the new feature. See where they get stuck before they tell you.',
        prompt: 'Create a cohort of PostHog persons whose email is in my Google Sheets [beta testers] worksheet, and save it. Then open Session replay filtered to that cohort over the last [7] days and save it as a shared filter called "[Beta testers]".',
    },
    {
        product: 'Surveys',
        Icon: IconMessage,
        iconColor: 'text-salmon',
        description: 'Ask the people you met at an event what they think, right inside your product.',
        prompt: 'Build a cohort of PostHog persons whose email is in my Google Sheets [event leads] worksheet. Then create a survey asking "[What brought you to the product?]" targeted only to that cohort.',
    },
    {
        product: 'Error tracking',
        Icon: IconBug,
        iconColor: 'text-red',
        description: 'Rank exceptions by the key accounts that hit them. Fix the bug your biggest customers see first.',
        prompt: 'Query my error tracking issues joined to my Google Sheets [key accounts] worksheet by [email domain], and rank the issues by the total [contract value] of the accounts that hit them in the last [14] days. Show issue name, affected accounts, and total contract value, highest first. Save it as an insight called "Errors by key account".',
    },
    {
        product: 'Alerts',
        Icon: IconBell,
        iconColor: 'text-blue',
        description:
            'Get an alert when signups fall behind the target in your sheet. Find out mid-month, not at the end.',
        prompt: 'Build a trends insight of weekly signups over the last [8] weeks, divided by the weekly target in my Google Sheets [targets] worksheet using a formula. Then set an alert that notifies [me / #channel] when that ratio drops below [0.9].',
    },
]

const syncFeatures: SourceFeature[] = [
    {
        title: 'Every worksheet',
        Icon: IconDocument,
        description: 'Each worksheet becomes its own table. One source syncs one spreadsheet.',
    },
    {
        title: 'Headers become columns',
        Icon: IconColumns,
        description: 'PostHog reads the first row as column names. Each header needs a unique name.',
    },
    {
        title: 'Numbers and dates',
        Icon: IconCalendar,
        description: "PostHog reads numbers and dates in your spreadsheet's locale, so they keep their type.",
    },
    {
        title: 'Viewer access only',
        Icon: IconEye,
        description: "PostHog's service account only needs to view the sheet. It can't change anything.",
    },
]

const syncModes: SourceSyncMode[] = [
    {
        mode: 'Full refresh',
        Icon: IconRefresh,
        description: 'Re-imports the whole worksheet each time. Best for sheets people edit by hand.',
    },
    {
        mode: 'Incremental',
        Icon: IconClock,
        description: 'Fetches only the rows added since the last sync, using the id column.',
    },
    {
        mode: 'Append-only',
        Icon: IconTrending,
        description: 'Adds new rows without changing the old ones. Best for logs that only grow.',
    },
]

export default function GoogleSheetsSource(): JSX.Element {
    return (
        <SourcePage
            seo={{
                title: 'Query your Google Sheets data in PostHog',
                description:
                    'Connect Google Sheets to PostHog to join your spreadsheets to what users do in your product.',
                image: 'images/og/cdp.jpg',
            }}
            hero={{
                before: 'Query your',
                highlight: 'Google Sheets data',
                after: 'in PostHog',
                description:
                    'Connect Google Sheets to PostHog to link your spreadsheets to how customers use your product.',
                ctaLabel: 'Connect Google Sheets to get started',
                ctaTo: '/docs/data-pipelines/sources',
                Hedgehog: HedgehogOrganized,
            }}
            whatSyncs={{
                title: 'What syncs from Google Sheets',
                intro: (
                    <>
                        Each worksheet in your spreadsheet becomes a table.{' '}
                        <strong className="text-primary">The first row becomes the column names</strong>, so you can
                        join a sheet to your events like any other table.
                    </>
                ),
                features: syncFeatures,
                modesTitle: 'Choose a sync method per worksheet',
                modes: syncModes,
                note: 'Incremental and append-only syncs need a numeric column called id. Add one with the formula =ROW().',
                docsTo: '/docs/data-pipelines/sources/google-sheets',
            }}
            connect={{
                title: 'How to connect Google Sheets',
                intro: "Share the sheet with PostHog's service account as a viewer. Then paste the spreadsheet URL and pick the worksheets to sync. You don't need an API key.",
            }}
            questions={{
                title: 'Questions you can answer with Google Sheets and PostHog',
                groups: questionGroups,
            }}
            across={{
                title: 'Use Google Sheets data across PostHog',
                intro: "Once it's in PostHog, your spreadsheet isn't stuck in a tab nobody opens. You can use it everywhere you already work.",
                uses: productUses,
                tip: (
                    <>
                        Build a <strong>&ldquo;beta testers&rdquo;</strong> cohort from your sheet once. Reuse it as a
                        flag target, replay filter, survey audience, and alert.
                    </>
                ),
            }}
            closing={{
                title: 'Get your data out of its cell',
                description:
                    'Event leads, targets, and feature requests sit in a spreadsheet. Connect Google Sheets and put your data to work.',
                ctaLabel: 'Break it out',
                ctaTo: '/docs/data-pipelines/sources',
                Hedgehog: HedgehogArtThief,
            }}
        />
    )
}

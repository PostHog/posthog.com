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
    IconClock,
    IconCursorClick,
    IconFunnels,
    IconHeart,
    IconMegaphone,
    IconMessage,
    IconPeople,
    IconPhone,
    IconReceipt,
    IconRefresh,
    IconRewindPlay,
    IconSupport,
    IconToggle,
    IconTrending,
} from '@posthog/icons'
import { HedgehogDynamite, HedgehogPhoneCall } from '@posthog/brand/hoggies'

const questionGroups: SourceQuestionGroup[] = [
    {
        role: 'Sales',
        questions: [
            {
                Icon: IconPhone,
                iconColor: 'text-green',
                question: 'Which leads should sales call first?',
                answer: 'Score HubSpot contacts by what they did in your product this week. Then find the active ones nobody has contacted yet.',
                href: '/learn/warehouse/pocket-guide/lead-scoring',
            },
            {
                Icon: IconClock,
                iconColor: 'text-orange',
                question: 'Which open deals are going cold?',
                answer: 'Find open deals where the company stopped using your product in the last two weeks. The deal owner can follow up before it slips.',
            },
        ],
    },
    {
        role: 'Marketing',
        questions: [
            {
                Icon: IconMegaphone,
                iconColor: 'text-blue',
                question: 'Which campaigns bring leads who use the product?',
                answer: "Compare each lead's HubSpot source and campaign with what they did after signup. The campaign with the most leads may not bring the most active users.",
            },
            {
                Icon: IconCursorClick,
                iconColor: 'text-purple',
                question: 'Which pages do leads visit before they book a demo?',
                answer: 'Join HubSpot meetings to PostHog pageviews for the same contacts. See which pages prospects read in the days before they booked.',
            },
        ],
    },
    {
        role: 'Customer success',
        questions: [
            {
                Icon: IconHeart,
                iconColor: 'text-salmon',
                question: 'Are my biggest customers my happiest ones?',
                answer: "Put each company's deal value next to its product engagement. Find the large accounts that barely use your product before renewal.",
                href: '/learn/warehouse/pocket-guide/value-vs-engagement',
            },
            {
                Icon: IconSupport,
                iconColor: 'text-blue',
                question: 'Do support tickets predict churn?',
                answer: 'Join HubSpot tickets to product usage. Find the ticket categories that come before accounts stop using your product.',
            },
        ],
    },
]

const productUses: SourceProductUse[] = [
    {
        product: 'Session replay',
        Icon: IconRewindPlay,
        iconColor: 'text-yellow',
        description:
            'Watch what a prospect did in your product before the sales call. Start the call with what they tried.',
        prompt: 'Create a cohort of PostHog persons who are contacts on my open HubSpot deals in the [Negotiation] stage, matched by email, and save it. Then open Session replay filtered to that cohort over the last [14] days and save it as a shared filter called "[Open deals]".',
    },
    {
        product: 'Feature flags',
        Icon: IconToggle,
        iconColor: 'text-green',
        description:
            "Turn on a beta feature for every contact at a company in an open enterprise deal. You don't need a list of email addresses.",
        prompt: 'Build a cohort of PostHog persons whose company has an open HubSpot deal in the [Enterprise] pipeline, matched by [email domain]. Then create a feature flag called [flag-key] that rolls out to [100]% of that cohort.',
    },
    {
        product: 'Surveys',
        Icon: IconMessage,
        iconColor: 'text-salmon',
        description:
            'Ask new customers how onboarding is going in the weeks after their deal closes. Or ask lost prospects what they chose instead.',
        prompt: 'Build a cohort of PostHog persons who are contacts on HubSpot deals that closed won in the last [30] days, matched by email. Then create a survey asking "[How is onboarding going so far?]" targeted only to that cohort.',
    },
    {
        product: 'Error tracking',
        Icon: IconBug,
        iconColor: 'text-red',
        description:
            'Rank exceptions by the value of the open deals they affect. Fix the bug a big prospect hits before the next demo.',
        prompt: 'Query my error tracking issues joined to my open HubSpot deals by [email domain], and rank the issues by the total deal amount of the companies that hit them in the last [14] days. Show issue name, affected companies, and total deal amount, highest first. Save it as an insight called "Errors by deal value".',
    },
    {
        product: 'Alerts',
        Icon: IconBell,
        iconColor: 'text-blue',
        description:
            'Get an alert when a company in an open deal stops using your product. Set another for when a lead nobody has contacted becomes very active.',
        prompt: 'Build a trends insight of weekly active users at companies with an open HubSpot deal, matched by [email domain], over the last [8] weeks. Then set an alert that notifies [me / #channel] when that number drops below [threshold, e.g. 20% under its 8-week average].',
    },
]

const syncedTables: SourceFeature[] = [
    {
        title: 'CRM records',
        Icon: IconPeople,
        description:
            'Contacts, companies, deals, leads, tickets, quotes, feedback submissions, and marketing campaigns.',
    },
    {
        title: 'Sales activity',
        Icon: IconCalendar,
        description: 'Emails, meetings, calls, notes, tasks, communications, and conversation threads.',
    },
    {
        title: 'Commerce',
        Icon: IconReceipt,
        description: 'Products, line items, invoices, orders, subscriptions, and payments.',
    },
    {
        title: 'Pipelines and teams',
        Icon: IconFunnels,
        description: 'Pipelines, pipeline stages, owners, users, teams, and forecasts.',
    },
]

const syncModes: SourceSyncMode[] = [
    {
        mode: 'Incremental',
        Icon: IconTrending,
        description:
            'Imports everything once, then fetches only the records that changed since the last sync. Best for large portals.',
    },
    {
        mode: 'Full refresh',
        Icon: IconRefresh,
        description: 'Re-imports the whole table each time. Best for small tables.',
    },
]

export default function HubSpotSource(): JSX.Element {
    return (
        <SourcePage
            seo={{
                title: 'Query your HubSpot data in PostHog',
                description: 'Connect HubSpot to PostHog to see what your leads and customers do in your product.',
                image: 'images/og/cdp.jpg',
            }}
            hero={{
                before: 'Query your',
                highlight: 'HubSpot data',
                after: 'in PostHog',
                description:
                    'Connect HubSpot to PostHog to link who your leads and customers are to how they use your product, so you can see which leads to call and which deals are going cold.',
                ctaLabel: 'Connect HubSpot to get started',
                ctaTo: '/docs/data-pipelines/sources',
                Hedgehog: HedgehogPhoneCall,
            }}
            whatSyncs={{
                title: 'What syncs from HubSpot',
                intro: (
                    <>
                        PostHog syncs <strong className="text-primary">CRM records and the links between them</strong>,
                        so you can join contacts, companies, and deals. Tables include:
                    </>
                ),
                features: syncedTables,
                modesTitle: 'Choose your sync mode',
                modes: syncModes,
                note: 'Pick which HubSpot properties to sync for each table, including custom ones. Then pick which columns to keep.',
                docsTo: '/docs/data-pipelines/sources/hubspot',
            }}
            connect={{
                title: 'How to connect HubSpot',
                intro: "Sign in to HubSpot, approve access, and pick the tables to sync. You don't need an API key. Some tables, like leads, forecasts, and marketing campaigns, need a HubSpot Professional plan or higher.",
            }}
            questions={{
                title: 'Questions you can answer with HubSpot and PostHog',
                groups: questionGroups,
            }}
            across={{
                title: 'Use HubSpot data across PostHog',
                intro: "Once it's in PostHog, your CRM data isn't stuck in a sales report. You can use it everywhere you already work.",
                uses: productUses,
                tip: (
                    <>
                        Build an <strong>&ldquo;open deals&rdquo;</strong> cohort once. Reuse it as a replay filter,
                        flag target, survey audience, and alert.
                    </>
                ),
            }}
            closing={{
                title: 'Your best leads are already smoldering',
                description: 'Some of your leads used your product all week. Connect HubSpot and call them first.',
                ctaLabel: 'Turn up the heat',
                ctaTo: '/docs/data-pipelines/sources',
                Hedgehog: HedgehogDynamite,
            }}
        />
    )
}

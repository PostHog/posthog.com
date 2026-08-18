import React from 'react'

import Link from 'components/Link'

import usePostHog from '../../hooks/usePostHog'

/**
 * Shared vocabulary for the self-driving surfaces and the pocket guides, defined once so no
 * template carries the 101. Definitions are quoted from the docs page that owns each concept,
 * so this can't drift into a competing source.
 */

export interface TermDefinition {
    /** Display title in the hover card. */
    title: string
    /** One or two sentences, quoted from the owning docs page. */
    description: string
    /** The docs page that owns this concept; becomes the card's "Read the docs" link. */
    slug: string
}

export const TERMS = {
    scout: {
        title: 'Scout',
        description:
            'A scout is a scheduled agent that explores your PostHog data and raises a hand when it finds something worth knowing.',
        slug: '/docs/self-driving/scouts',
    },
    signal: {
        title: 'Signal',
        description:
            'A signal is a structured finding: something worth knowing, with the evidence behind it and a suggested action.',
        slug: '/docs/self-driving/signals',
    },
    report: {
        title: 'Report',
        description:
            'A report groups related signals into one item of work. Instead of triaging a noisy stream of findings, you get a single, framed problem with the evidence behind it.',
        slug: '/docs/self-driving/reports',
    },
    inbox: {
        title: 'Inbox',
        description:
            'The inbox is where self-driving hands work back to you. Reports and the pull requests the loop opens both land here, ranked by priority, so the most important work rises to the top.',
        slug: '/docs/self-driving/inbox',
    },
    'signal source': {
        title: 'Signal source',
        description:
            'Signal sources are built-in pipelines that watch one stream continuously: error tracking, session replay, and health checks inside PostHog, plus external tools like Zendesk, GitHub Issues, and Linear.',
        slug: '/docs/self-driving/inbox/sources',
    },
    person: {
        title: 'Person',
        description:
            'People in PostHog represent the users behind your events. People have person profiles with properties, which you can filter on, build cohorts from, and use to target feature flags.',
        slug: '/docs/data/persons',
    },
    'person property': {
        title: 'Person property',
        description:
            'Person properties enable you to capture, manage, and analyze specific data about a user. You can use them to create filters or cohorts, which can then be used in insights, feature flags, surveys, and more.',
        slug: '/docs/product-analytics/person-properties',
    },
    event: {
        title: 'Event',
        description:
            'An event is the core unit of data in PostHog. It represents an interaction a user has with your app or website: button clicks, pageviews, query completions, signups.',
        slug: '/docs/data/events',
    },
    session: {
        title: 'Session',
        description:
            'A session is a set of events that capture a single use of your product or visit to your website. A new session starts after 30 minutes of inactivity, and a new session triggers a new session replay.',
        slug: '/docs/data/sessions',
    },
    exception: {
        title: 'Exception',
        description:
            'Error tracking captures exceptions from across your stack and turns them into issues you can prioritize, assign, and resolve – each with the affected user’s session replay, events, and properties attached.',
        slug: '/docs/error-tracking',
    },
    'feature flag': {
        title: 'Feature flag',
        description:
            'Feature flags let you ship code without shipping the feature. Wrap a change in a flag, roll it out to 1% of users, watch what happens, and turn it off the moment something looks wrong.',
        slug: '/docs/feature-flags',
    },
    experiment: {
        title: 'Experiment',
        description:
            'Experiments let you test a change against a control and find out whether it actually worked. You define variants and metrics; PostHog randomizes your users and runs the statistics.',
        slug: '/docs/experiments',
    },
    funnel: {
        title: 'Funnel',
        description:
            'Funnels enable you to visualize your flows and understand where the friction points are so that you can improve them.',
        slug: '/docs/product-analytics/funnels',
    },
    autocapture: {
        title: 'Autocapture',
        description:
            'PostHog can automatically capture a variety of events in your app – clicks, form submissions, pageviews – without specific tracking code.',
        slug: '/docs/product-analytics/autocapture',
    },
    scanner: {
        title: 'Scanner',
        description:
            'A scanner is a Replay Vision probe you configure once: a prompt describing what to look for, a type deciding the shape of the answer, and filters choosing which recordings it runs against.',
        slug: '/docs/replay-vision/scanner-types',
    },
    observation: {
        title: 'Observation',
        description:
            "One scanner applied to one recording. Each observation is saved as a `$recording_observed` event, so a scanner's output behaves like any other event in PostHog.",
        slug: '/docs/replay-vision/observations',
    },
    masking: {
        title: 'Masking',
        description:
            'Masking replaces content with asterisks or a blank box before it leaves the device, so what you mask never reaches PostHog. It applies at capture time – a replay recorded unmasked stays that way.',
        slug: '/docs/session-replay/privacy',
    },
    'trigger group': {
        title: 'Trigger group',
        description:
            'A set of conditions that decide whether a session is recorded, with its own sample rate and minimum duration. Groups are ORed, so a session records if it matches any of them.',
        slug: '/docs/session-replay/how-to-control-which-sessions-you-record',
    },
    'rage click': {
        title: 'Rage click',
        description:
            'Several clicks in quick succession on the same element – PostHog captures it as a `$rageclick` event, and it usually means something looked clickable and did nothing.',
        slug: '/docs/session-replay/how-to-watch-recordings',
    },
    'replay vision': {
        title: 'Replay Vision',
        description:
            'Replay Vision uses AI to automatically watch your session recordings and turn what it sees into structured, queryable data. You configure scanners – named AI probes that describe what to look for – and PostHog applies them to your recordings.',
        slug: '/docs/replay-vision',
    },
    cohort: {
        title: 'Cohort',
        description:
            'Cohorts enable you to easily create a list of users who have something in common, such as completing an action or having the same property.',
        slug: '/docs/data/cohorts',
    },
    'self-driving': {
        title: 'Self-driving',
        description:
            'PostHog makes your product self-driving: it pairs the full context of your product with agents that find problems and opportunities and ship the fix – reactively when prompted, or proactively via the inbox.',
        slug: '/docs/self-driving',
    },
} satisfies Record<string, TermDefinition>

export type TermName = keyof typeof TERMS

interface TermProps {
    name: TermName
    /** Override the rendered text, e.g. to pluralize: <Term name="scout">scouts</Term>. */
    children?: React.ReactNode
    className?: string
}

/** First mention only – repeated, the dotted underlines stop reading as helpful. */
export default function Term({ name, children, className = '' }: TermProps): JSX.Element {
    const definition = TERMS[name]
    const posthog = usePostHog()

    // Fail soft on unknown names – an author typo prints plain text instead of crashing the page.
    if (!definition) {
        return <>{children ?? name}</>
    }

    return (
        <Link
            to={definition.slug}
            state={{ newWindow: true }}
            onMouseEnter={() => posthog?.capture('pocket_guide_interaction', { kind: 'term_hover', term: name })}
            // "Read the docs", not "Continue reading": the reader IS reading – this link leaves
            // the pocket guide for the docs page that owns the term.
            preview={{ ...definition, ctaLabel: 'Read the docs' }}
            // Orange dotted + help cursor is the "defined term" affordance; navigation links keep
            // a solid text-color underline. Color is what separates the two at body size – the
            // orange matches the book's other teaching apparatus (figure markers, the spine).
            className={`cursor-help underline decoration-orange decoration-dotted decoration-from-font underline-offset-4 ${className}`}
        >
            {children ?? name}
        </Link>
    )
}

import React from 'react'

import Link from 'components/Link'

import usePostHog from '../../hooks/usePostHog'

/**
 * Self-driving vocabulary, defined once so no template carries the 101. Definitions are quoted
 * from the docs page that owns each concept, so this can't drift into a competing source.
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

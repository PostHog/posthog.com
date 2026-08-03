import React from 'react'

import Link from 'components/Link'

/**
 * Self-driving vocabulary, defined once so no template carries the 101. Definitions are quoted
 * from the docs page that owns each concept, so this can't drift into a competing source.
 */

export interface TermDefinition {
    /** Display title in the hover card. */
    title: string
    /** One or two sentences, quoted from the owning docs page. */
    description: string
    /** The docs page that owns this concept; becomes the card's "Continue reading" link. */
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

    return (
        <Link
            to={definition.slug}
            state={{ newWindow: true }}
            preview={definition}
            // The dotted underline is the affordance – without it nobody knows to hover. The
            // pane is otherwise underline-free, so this reads as "defined term", not "link".
            className={`underline decoration-dotted decoration-from-font underline-offset-4 ${className}`}
        >
            {children ?? name}
        </Link>
    )
}

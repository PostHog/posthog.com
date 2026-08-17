import React from 'react'

import Link from 'components/Link'

import usePostHog from '../../hooks/usePostHog'

/**
 * The pocket guides' vocabulary, defined once so no chapter carries the 101. Definitions are
 * quoted from the docs page that owns each concept, so this can't drift into a competing source.
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
    generation: {
        title: 'Generation',
        description:
            'Generations are events that capture LLM calls and their responses. They represent interactions and conversations with an AI model, tracked as `$ai_generation` events.',
        slug: '/docs/ai-observability/generations',
    },
    'ai session': {
        title: 'AI session',
        description:
            'Sessions group related traces together through the $ai_session_id property, so a multi-turn conversation reads as one thread. This is separate from the PostHog session behind a session replay, and you set it yourself when you capture.',
        slug: '/docs/ai-observability/sessions',
    },
    trace: {
        title: 'Trace',
        description:
            'Traces are a collection of generations and spans that capture a full interaction between a user and an LLM, along with the properties PostHog autocaptures: the person, total cost, total latency, and more.',
        slug: '/docs/ai-observability/traces',
    },
    span: {
        title: 'Span',
        description:
            'Spans are units of work within an LLM trace: individual operations like function calls, vector searches, or data retrieval steps.',
        slug: '/docs/ai-observability/spans',
    },
    evaluation: {
        title: 'Evaluation',
        description:
            'Evaluations automatically assess the quality of your LLM generations. PostHog runs them as LLM-as-a-judge, deterministic code, or sentiment analysis.',
        slug: '/docs/ai-evals',
    },
    'LLM-as-a-judge': {
        title: 'LLM-as-a-judge',
        description:
            'Uses an LLM to score each generation against a prompt you define, returning a pass/fail result with reasoning. Great for nuanced, subjective checks like tone, helpfulness, or hallucination detection.',
        slug: '/docs/ai-evals',
    },
    'code-based evaluation': {
        title: 'Code-based evaluation',
        description:
            'Runs deterministic code you write against each generation, returning a pass/fail result. Great for rule-based checks like format validation, keyword detection, or length limits. Free to run with no LLM cost.',
        slug: '/docs/ai-evals',
    },
    hog: {
        title: 'Hog',
        description:
            "PostHog's own programming language, the one that also powers realtime destinations. It reads like JavaScript with := for assignment and runs inside PostHog, so there's no service of your own to keep alive. Not to be confused with HogQL, the SQL-like language for querying your data.",
        slug: '/docs/hog',
    },
    'custom property': {
        title: 'Custom property',
        description:
            'Metadata you attach to your AI generations – a feature name, a tenant, a prompt version – making it easier to filter, analyze, and understand your LLM usage patterns.',
        slug: '/docs/ai-observability/custom-properties',
    },
    'session replay': {
        title: 'Session replay',
        description:
            'Records what real users do in your product and plays it back like a DVR, with console logs, network requests, and errors at the exact moment they happened.',
        slug: '/docs/session-replay',
    },
    'feature flag': {
        title: 'Feature flag',
        description:
            'Feature flags let you ship code without shipping the feature. Wrap a change in a flag, roll it out to 1% of users, watch what happens, and turn it off the moment something looks wrong.',
        slug: '/docs/feature-flags',
    },
    exception: {
        title: 'Exception',
        description:
            'Error tracking captures exceptions from across your stack and turns them into issues you can prioritize, assign, and resolve – each one carrying the affected person, their session replay, and the events around it.',
        slug: '/docs/error-tracking',
    },
    'cost calculation': {
        title: 'Cost calculation',
        description:
            "PostHog computes each call's cost from input and output tokens, cached token reads and writes, and any per-request or web-search charges, using the provider and model on the event.",
        slug: '/docs/ai-observability/calculating-costs',
    },
    'AI Observability dashboard': {
        title: 'AI Observability dashboard',
        description:
            'An overview of your LLM usage and performance, with insights on users, generations, cost, latency, and errors available out of the box.',
        slug: '/docs/ai-observability/dashboard',
    },
    'errors tab': {
        title: 'Errors tab',
        description:
            'Groups and aggregates error messages from your LLM application, normalizing away ids and timestamps so the same underlying failure lands as one issue you can prioritize.',
        slug: '/docs/ai-observability/errors',
    },
    'user feedback': {
        title: 'User feedback',
        description:
            'A native Surveys integration that collects thumbs up/down responses and written feedback attached directly to a given trace, so a rating sits next to the generation it was about.',
        slug: '/docs/ai-observability/collect-user-feedback',
    },
    'prompt management': {
        title: 'Prompt management',
        description:
            'Create and update LLM prompts directly in PostHog. Prompts are fetched at runtime through the SDK, every change creates an immutable version, and a version links to the generations it produced.',
        slug: '/docs/prompt-management',
    },
    'sentiment analysis': {
        title: 'Sentiment analysis',
        description:
            'Classifies the sentiment of user messages as positive, neutral, or negative using a local ML model. Free to run with no LLM cost.',
        slug: '/docs/ai-observability/sentiment',
    },
} satisfies Record<string, TermDefinition>

export type TermName = keyof typeof TERMS

interface TermProps {
    /** A key of `TERMS`, matched case-insensitively – authors capitalize a term that opens a
     * sentence. Typed as `string` because MDX authors aren't type-checked, and an unknown name
     * fails soft below rather than failing the build. */
    name?: string
    /** Override the rendered text, e.g. to pluralize: <Term name="scout">scouts</Term>. */
    children?: React.ReactNode
    className?: string
}

/** Keys are lowercase; a term opening a sentence is written capitalized and still has to match. */
function lookUp(name?: string): TermDefinition | undefined {
    if (!name) {
        return undefined
    }
    const terms: Record<string, TermDefinition> = TERMS
    return terms[name] ?? terms[name.toLowerCase()]
}

/** First mention only – repeated, the dotted underlines stop reading as helpful. */
export default function Term({ name, children, className = '' }: TermProps): JSX.Element {
    const definition = lookUp(name)
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

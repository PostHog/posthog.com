import React from 'react'
import { IconGanttChart, IconWarning, IconRewindPlay, IconFunnels } from '@posthog/icons'

// "Your product, fixing itself" section. Each step below becomes a tab in the
// features slide. The section headline + intro stay constant across tabs, while
// the tab-specific copy changes. Per-tab illustrations will be added later –
// the `columns` layout leaves an aside slot ready for them.
const SELF_HEALING_HEADLINE = 'Your product, fixing itself'
const SELF_HEALING_INTRO =
    'Point a scout at your slowest traces. It runs on a schedule, and when a query or endpoint starts creeping up, it reports the regression and kicks off an investigation into why.'
const TRACE_IS_THE_EVIDENCE =
    'Throughout, the trace is the evidence: what the scout watches to raise the alarm, and what the agent reads to land the fix on the right line.'

// "Catnip for agents" cards. Mirrors the "Automatic PostHog instrumentation"
// section on the /code page: a 2-column grid of icon + title + description cards.
// The trace card is highlighted since it's the one that hands over the location.
const catnipSignals = [
    {
        icon: IconWarning,
        color: 'text-white/60',
        title: 'Error tracking',
        description: 'a request broke.',
    },
    {
        icon: IconRewindPlay,
        color: 'text-white/60',
        title: 'Session replay',
        description: 'a user waited, then left.',
    },
    {
        icon: IconFunnels,
        color: 'text-white/60',
        title: 'Funnel drop-off',
        description: 'checkout conversion fell.',
    },
    {
        icon: IconGanttChart,
        color: 'text-white',
        title: 'A trace',
        description: '“Checkout took 3.2s, and 2.8s of it was waiting on an N+1 query in the inventory service.”',
        highlight: true,
    },
]

const selfHealingSteps = [
    {
        title: 'Scout',
        copy: 'You set a scout to watch your slowest traces. It runs on a schedule and keeps an eye on the queries and endpoints that matter.',
    },
    {
        title: 'Signal',
        copy: 'Latency on GET /api/checkout starts climbing. The scout catches it and files a report. Nobody had to notice first.',
    },
    {
        title: 'Investigate',
        copy: 'The agent pulls the slow traces, lines them up against the fast ones, and finds the span they share: the inventory service firing one DB query per cart item. Classic N+1.',
    },
    {
        title: 'PR',
        copy: 'The agent fixes the exact query it located and opens a pull request, wired up with the instrumentation to measure whether it worked.',
    },
    {
        title: 'Merge',
        copy: 'You review the diff in your Inbox and hit merge. Nothing ships until you do.',
    },
]

export const traces = {
    name: 'Traces',
    Icon: IconGanttChart,
    description: 'Distributed tracing that goes straight to the line that broke',
    handle: 'traces',
    type: 'traces',
    slug: 'traces',
    color: 'purple',
    colorSecondary: 'blue',
    category: 'product_engineering',
    status: 'beta',
    seo: {
        title: 'Traces – Distributed tracing with PostHog',
        description:
            'Traces pinpoint the exact query that broke. PostHog Code opens the PR and sends it to your Inbox. You hit merge. That’s the whole job.',
    },
    overview: {
        title: 'Straight to the line that broke',
        description:
            'Traces pinpoint the exact query. PostHog Code opens the PR and sends it to your Inbox. You hit merge. That’s the whole job.',
        textColor: 'text-white',
        layout: 'stacked',
    },
    screenshots: {
        overview: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Group_144143_b7a6b4aa06.png',
            alt: 'Traces overview',
            classes: 'max-w-5xl mt-auto',
            imgClasses: '',
            classesMobile: '',
            imgClassesMobile: '',
        },
    },
    features: [
        // Tabbed "Your product, fixing itself" section (no template = tabs slide)
        ...selfHealingSteps.map((step) => ({
            title: step.title,
            headline: SELF_HEALING_HEADLINE,
            description: SELF_HEALING_INTRO,
            layout: 'columns',
            features: [
                {
                    title: step.title,
                    description: step.copy,
                },
                {
                    title: 'The trace is the evidence',
                    description: TRACE_IS_THE_EVIDENCE,
                },
            ],
            // TODO: add a per-tab illustration here later (renders in the aside slot)
            images: [],
        })),
        // Standalone split slide: copy on the left, screenshot on the right
        {
            title: 'Waterfall',
            handle: 'waterfall',
            template: 'splitImage',
            headline: 'Every span of a request, in one waterfall',
            description:
                '<span class="block mb-4">A trace stitches one request into a tree of spans across every service, queue, and third-party call it touches. Follow the <code>trace_id</code> and you get the full path: where the time went and which span actually broke, even across async boundaries, where stack traces give up.</span><span class="block">Built on OpenTelemetry, so there’s no proprietary SDK to adopt. Point your existing exporter at PostHog and you’re done. Traces land in the same project as your replays, errors, logs, and analytics, with correlated logs on every span.</span>',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_07_01_at_14_32_15_2x_1_2e2baf7533.png',
                    alt: 'A distributed trace shown as a waterfall of spans',
                    shadow: true,
                    className: 'justify-center items-center',
                },
            ],
        },
        // Standalone centered slide: why traces beat every other signal source
        {
            title: 'Catnip for agents',
            handle: 'catnip',
            template: 'grid',
            headline: 'Catnip for agents',
            description:
                'Every signal source tells self-driving <em>that</em> something is wrong. Traces are the only one that says <em>where and why.</em>',
            features: [],
            children: (
                <div className="max-w-4xl mx-auto text-left">
                    <ul className="grid @xl:grid-cols-2 gap-x-8 gap-y-6 p-0 m-0 list-none">
                        {catnipSignals.map(({ icon: Icon, color, title, description, highlight }) => (
                            <li
                                key={title}
                                className={`relative pl-9 ${
                                    highlight ? 'rounded-md bg-white/10 py-3 pr-4 pl-11' : ''
                                }`}
                            >
                                <Icon className={`size-6 absolute top-0.5 ${highlight ? 'left-4 top-3.5' : 'left-0'} ${color}`} />
                                <h3 className="text-xl font-bold mb-0">{title}</h3>
                                <p className="mt-1 text-lg !leading-normal">{description}</p>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-8 text-2xl @2xl:text-xl !leading-normal">
                        The first three are symptoms. The trace is the one that hands an agent the right location. The
                        agent starts where the trace points and fixes the span that’s actually slow.
                    </p>
                </div>
            ),
        },
    ],
    comparison: {
        summary: {
            them: [
                {
                    title: 'You need mature, full-featured tracing today. PostHog tracing is still in alpha.',
                },
                {
                    title: 'Your workflow is infrastructure-first, built around hosts, dashboards, and on-call.',
                },
                {
                    title: 'You want the deepest trace tooling and are happy running a separate observability vendor for it.',
                },
            ],
            us: [
                {
                    title: 'You want traces in the same project as your errors, replays, logs, and product analytics – the context that powers self-driving.',
                },
                {
                    title: 'You want an agent that reads the trace to locate a fix and open the PR, from your Inbox or by tagging in Slack.',
                },
                {
                    title: 'You want OpenTelemetry-native tracing with no proprietary SDK to adopt.',
                },
                {
                    title: 'You’d rather pay for usage than per host.',
                },
                {
                    title: 'You’re already in PostHog and want one less tool to run.',
                },
            ],
        },
    },
    presenterNotes: {
        'traces-comparison':
            'PostHog tracing is in alpha and free during alpha. Sentry’s native OTLP ingestion and its “Fix with Seer” Slack flow are both in beta. Datadog has no perpetual free APM tier (14-day trial), and it ingests OTLP but maps it to its own data model. Pricing accurate as of July 2026.',
    },
}

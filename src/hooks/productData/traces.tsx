import React from 'react'
import { IconGanttChart, IconWarning, IconRewindPlay, IconFunnels } from '@posthog/icons'

// "Catnip for agents" cards. Mirrors the "Automatic PostHog instrumentation"
// section on the /code page: a 2-column grid of icon + title + description cards.
// The trace card is highlighted since it's the one that hands over the location.
const catnipSignals = [
    {
        icon: IconWarning,
        color: 'text-white/60',
        title: 'Error tracking',
        description: 'A request broke.',
    },
    {
        icon: IconRewindPlay,
        color: 'text-white/60',
        title: 'Session replay',
        description: 'A user waited, then left.',
    },
    {
        icon: IconFunnels,
        color: 'text-white/60',
        title: 'Funnel drop-off',
        description: 'Checkout conversion fell.',
    },
    {
        icon: IconGanttChart,
        color: 'text-white',
        title: 'A trace',
        description: '“Checkout took 3.2s, and 2.8s of it was waiting on an N+1 query in the inventory service.”',
        highlight: true,
    },
]

export const traces = {
    name: 'Traces',
    Icon: IconGanttChart,
    description: 'Distributed tracing that goes straight to the line that broke',
    handle: 'traces',
    type: 'traces',
    slug: 'traces',
    color: 'blue',
    colorSecondary: 'sky-blue',
    category: 'product_engineering',
    status: 'beta',
    seo: {
        title: 'Traces – Distributed tracing with PostHog',
        description:
            'Traces pinpoint the exact query that broke. PostHog Desktop opens the PR and sends it to your Inbox. You hit merge. That’s the whole job.',
    },
    overview: {
        title: 'Straight to the line that broke',
        description:
            'A trace pinpoints the slow query, failed API call, or service that broke the request. The agent traces it to the right line of code, opens a PR with the fix, and sends it to your inbox. You hit merge. That’s the whole job.',
        textColor: 'text-white',
        layout: 'stacked',
    },
    screenshots: {
        overview: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Group_144145_2a408da79b.png',
            alt: 'Traces overview',
            classes: 'max-w-5xl mt-auto',
            imgClasses: 'rounded-md',
            classesMobile: '',
            imgClassesMobile: '',
        },
    },
    features: [
        // Standalone split slide: copy on the left, screenshot on the right.
        // Image pushed lower (mt-12) with rounded corners, matching the Logs
        // "Full stack context" slide.
        {
            title: 'Trace waterfall',
            handle: 'waterfall',
            template: 'splitImage',
            headline: 'Every span of a request, in one waterfall',
            description:
                '<ul class="list-disc pl-5 space-y-4"><li>One request becomes a tree of spans across every service, queue, and third-party call it touches.</li><li>Follow the <span class="font-code">trace_id</span> to see where the time went and which span actually broke – even across async boundaries, where stack traces give up.</li><li>Built on OpenTelemetry: no proprietary SDK. Point your existing exporter at PostHog and you’re done.</li><li>Traces land in the same project as your replays, errors, logs, and analytics – with correlated logs on every span.</li></ul>',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/image_3_c7dd33ad13.png',
                    alt: 'A distributed trace shown as a waterfall of spans',
                    shadow: true,
                    className: 'justify-center items-center mt-24 rounded-md',
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
                '<span class="text-2xl @2xl:text-3xl">Every signal source tells self-driving <em>that</em> something is wrong. Traces are the only one that says <em>where and why.</em></span>',
            features: [],
            children: (
                <div className="max-w-6xl mx-auto w-full text-left">
                    <ul className="grid @xl:grid-cols-2 gap-6 @2xl:gap-8 p-0 m-0 list-none">
                        {catnipSignals.map(({ icon: Icon, color, title, description, highlight }) => (
                            <li
                                key={title}
                                className={`flex items-start gap-5 rounded-lg border p-6 @2xl:p-8 ${
                                    highlight ? 'border-white/40 bg-white/10' : 'border-white/20'
                                }`}
                            >
                                <Icon className={`size-10 @2xl:size-12 shrink-0 ${color}`} />
                                <div>
                                    <h3 className="text-2xl @2xl:text-3xl font-bold mb-1">{title}</h3>
                                    <p className="m-0 text-lg @2xl:text-xl !leading-normal">{description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-14 mb-2 text-xl @2xl:text-2xl !leading-snug max-w-5xl">
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
                    title: 'You need a specialized, deep full-featured tracing today as a separate tool.',
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

import React from 'react'
import {
    IconChat,
    IconCheckCircle,
    IconCode,
    IconConfetti,
    IconCursorClick,
    IconEye,
    IconGanttChart,
    IconInfo,
    IconList,
    IconMagic,
    IconPieChart,
    IconRocket,
    IconSparkles,
} from '@posthog/icons'
import { getTool } from '../../data/tools'
import { applications, topFeatures } from './traces/slides'

export const traces = {
    ...getTool('traces'),
    Icon: IconGanttChart,
    type: 'traces',
    color: 'blue',
    colorSecondary: 'sky-blue',
    // The docs live at /docs/distributed-tracing, which matches neither the
    // product name nor its slug, so the Docs tab is pointed there explicitly.
    docsSlug: 'distributed-tracing',
    // Logs and Tracing are one product in billing – ingestion is metered on a
    // single GB meter with one shared free tier (the `logs` billing product,
    // shown as "Logs & Tracing"). Every number on the pricing tab comes from
    // there; nothing here is a hard-coded rate.
    sharesFreeTier: 'logs',
    // The logs billing product has a single plan feature named "Logs", which is
    // meaningless on this page. Platform features are shared, so show only those.
    hideProductFeatures: true,
    includeAddonRates: true,

    seo: {
        title: 'Tracing – Distributed tracing with PostHog',
        description:
            'Tracing pinpoints the exact query that broke. PostHog Desktop opens the PR and sends it to your Inbox. You hit merge. That’s the whole job.',
    },
    productMenu: [
        { slug: 'overview', name: 'Overview', icon: <IconEye className="size-4" /> },
        {
            slug: 'eli5',
            name: 'What does it do?',
            hideFromNav: true,
            group: 'divided',
            icon: <IconInfo className="size-4" />,
        },
        {
            slug: 'use-cases',
            name: 'Who is it for?',
            hideFromNav: true,
            group: 'divided',
            icon: <IconMagic className="size-4" />,
        },
        {
            slug: 'applications',
            name: 'How do I use it?',
            group: 'divided',
            icon: <IconCursorClick className="size-4" />,
            props: { slides: applications },
        },
        {
            slug: 'top-features',
            name: 'Top features',
            group: 'divided',
            icon: <IconSparkles className="size-4" />,
            props: { slides: topFeatures },
        },
        {
            slug: 'ask-anything',
            name: 'AI prompts',
            group: 'divided',
            icon: <IconChat className="size-4" />,
        },
        {
            slug: 'installation',
            name: 'Install',
            group: 'divided',
            icon: <IconCode className="size-4" />,
        },
        {
            slug: 'feature-comparison',
            name: 'Feature comparison',
            group: 'divided',
            icon: <IconList className="size-4" />,
        },
        { slug: 'pairs-with', name: 'Pairs with...', hideFromNav: true, icon: <IconConfetti className="size-4" /> },
        { slug: 'getting-started', name: 'Get started', group: 'divided', icon: <IconRocket className="size-4" /> },
    ],
    /** Pricing surface (`/tracing/pricing`) – the same four sections as Logs. */
    pricingMenu: [
        { slug: 'plans', name: 'Plans', icon: <IconCheckCircle className="size-4" /> },
        { slug: 'calculator', name: 'Pricing calculator', icon: <IconPieChart className="size-4" /> },
        { slug: 'comparison-summary', name: 'PostHog vs...', icon: <IconList className="size-4" /> },
        { slug: 'pricing-cta', name: 'Get started', hideFromNav: true },
    ],
    overview: {
        title: 'Straight to the line that broke',
        eli5: 'A trace is the record of one request as it moves through your system: every service it calls, every query it runs, and how long each step took. Point any OpenTelemetry (OTLP) exporter at PostHog (no proprietary SDK) and each request arrives as a tree of spans you can open as a waterfall. Because traces land in the same project as your errors, logs, replays, and analytics, an agent can read the trace to find the span that broke and fix the line behind it.',
    },
    screenshots: {
        home: {
            // c_crop trims the 1px dark line off the top of the source image – row 0 is
            // #393A39, row 1 onward is the light chrome. Original is 1114x555.
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/c_crop,y_1,h_554,w_1114/Group_144145_2a408da79b.png',
            alt: 'Tracing overview',
        },
        waterfall: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/image_3_c7dd33ad13.png',
            alt: 'A distributed trace shown as a waterfall of spans',
        },
    },
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
                    title: 'You want traces in the same project as your errors, replays, logs, and product analytics. That is the context that powers self-driving.',
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
        companies: [
            {
                name: 'Better Stack',
                key: 'better_stack',
            },
            {
                name: 'Datadog',
                key: 'datadog',
            },
            {
                name: 'Sentry',
                key: 'sentry',
            },
            {
                name: 'PostHog',
                key: 'posthog',
            },
        ],
        // `pricing` is skipped when a bare product name is expanded, so the
        // pricing rows come in by explicit path – the same pair of entries Logs
        // uses. Excluding it as a section keeps the platform pricing block out.
        rows: ['traces', 'traces.pricing.features'],
        excluded_sections: ['platform', 'pricing'],
    },
    useCases: {
        intro: 'Tracing is used across teams depending on your role.',
        rows: [
            [
                'Backend Engineers',
                'Follow one request across every service it touches to find the span that actually spent the time, including async work a stack trace never shows',
            ],
            [
                'Product Engineers',
                'Explain the slow page analytics flagged, down to the query behind it, without guessing which service to open first',
            ],
            [
                'Platform / DevOps',
                "Watch latency and request volume per service, and catch the p99 regressions you can't reproduce locally",
            ],
            [
                'Support Engineers',
                'Take a trace ID from a complaint and see exactly where that request stalled, then jump to the session replay beside it',
            ],
            [
                'AI-assisted teams',
                'Let scouts and coding agents read traces over MCP to locate a regression and open the pull request',
            ],
        ],
    },
    installation: {
        title: 'Install',
        headline: 'Install',
        description:
            'Tracing is built on OpenTelemetry, so any OTLP-compatible exporter works. There are no PostHog-specific tracing packages to adopt. Point your existing OpenTelemetry setup at PostHog and spans start arriving.',
        // The docs live under /docs/distributed-tracing, so the install guides do
        // too. Without this the grid would look for /docs/tracing/installation/*.
        productSlug: 'distributed-tracing',
        categories: ['web', 'backend-languages', 'backend-frameworks'],
    },
    pairsWith: [
        {
            slug: 'logs',
            description:
                'Every span carries its correlated logs, so you can read what a service was doing during the part of the request that ran slow',
        },
        {
            slug: 'error-tracking',
            description:
                'Open the trace behind an exception to see which upstream call put the request in the state that broke it',
        },
        {
            slug: 'session-replay',
            description:
                'Go from a slow span to the replay of the user who waited through it, and watch what they did next',
        },
        {
            slug: 'product-analytics',
            description: 'See whether the requests that ran slow are the ones users abandoned',
        },
    ],
    ai: {
        description: 'find the slow span and ship the fix',
        intro: 'Ask PostHog AI to pull traces, line slow requests up against fast ones, and explain where the time went.',
        mcpFeatures: ['tracing'],
        skills: [
            'Finds the traces you need from a plain description: a service, an endpoint, or a latency threshold',
            'Compares slow requests against fast ones and names the span they differ on',
            'Connects a span to the logs, errors, and replays recorded around it for the full picture',
        ],
        // Tool names verified against src/data/mcp-tools.json (the `tracing` category).
        groups: [
            {
                title: 'Query spans',
                tool: 'query-apm-spans',
                prompts: [
                    'Show me the slowest spans in the checkout service over the last hour',
                    'Find spans with a duration over 2 seconds since the last deploy',
                ],
            },
            {
                title: 'Read a trace',
                tool: 'apm-trace-get',
                prompts: ['Pull the full span tree for trace ID abc123 and tell me where the time went'],
            },
            {
                title: 'Latency over time',
                tool: 'apm-spans-latency-heatmap',
                prompts: [
                    'Show latency for GET /api/checkout over the last 24 hours and mark when it started climbing',
                ],
            },
            {
                title: 'Duration distribution',
                tool: 'apm-spans-duration-histogram',
                prompts: [
                    'What does the duration distribution for the inventory service look like? Is the p99 an outlier or the whole tail?',
                ],
            },
            {
                title: 'Call tree',
                tool: 'apm-spans-tree',
                prompts: [
                    'Aggregate the call tree for checkout requests and show me which child span is called most often',
                ],
            },
            {
                title: 'Services and attributes',
                tool: 'apm-services-list',
                prompts: [
                    'Which services are emitting spans, and which of them got slower this week?',
                    'What span attributes are available? Break latency down by http.route',
                ],
            },
        ],
    },
}

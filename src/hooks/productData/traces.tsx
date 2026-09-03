import React from 'react'
import { IconEye, IconGanttChart, IconCursorClick, IconList, IconRocket, IconSparkles } from '@posthog/icons'
import { getTool } from '../../data/tools'
import { applications, topFeatures } from './traces/slides'

export const traces = {
    ...getTool('traces'),
    Icon: IconGanttChart,
    type: 'traces',
    color: 'blue',
    colorSecondary: 'sky-blue',
    seo: {
        title: 'Traces – Distributed tracing with PostHog',
        description:
            'Traces pinpoint the exact query that broke. PostHog Desktop opens the PR and sends it to your Inbox. You hit merge. That’s the whole job.',
    },
    productMenu: [
        { slug: 'overview', name: 'Overview', icon: <IconEye className="size-4" /> },
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
            slug: 'comparison-summary',
            name: 'PostHog vs...',
            group: 'divided',
            icon: <IconList className="size-4" />,
        },
        { slug: 'getting-started', name: 'Get started', group: 'divided', icon: <IconRocket className="size-4" /> },
    ],
    overview: {
        title: 'Straight to the line that broke',
        description:
            'A trace pinpoints the slow query, failed API call, or service that broke the request. The agent traces it to the right line of code, opens a PR with the fix, and sends it to your inbox. You hit merge. That’s the whole job.',
    },
    screenshots: {
        home: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Group_144145_2a408da79b.png',
            alt: 'Traces overview',
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
}

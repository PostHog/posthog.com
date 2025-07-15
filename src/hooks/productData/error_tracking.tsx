import React from 'react'
import { IconWarning } from '@posthog/icons'

export const errorTracking = {
    Icon: IconWarning,
    name: 'Error tracking',
    slug: 'error-tracking',
    handle: 'error_tracking',
    type: 'error_tracking',
    color: 'orange',
    colorSecondary: 'red',
    category: 'engineering',
    seo: {
        title: 'Error Tracking - PostHog',
        description: 'Track errors and exceptions in your code, then assign them as issues.',
    },
    answersDescription: 'Track and resolve errors and exceptions in your application',
    overview: {
        title: 'Track errors and resolve issues',
        description: 'Take your product from exception to exceptional 🥁',
        textColor: 'text-black', // tw
    },
    screenshots: [
        {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_error_tracking_0f93eb652d.png',
            alt: 'Screenshot of the PostHog error tracking',
            classes: '',
        },
    ],
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/error_hog_c2eff84e29.png',
        alt: 'Just another hedgehog',
        classes: 'absolute bottom-0 right-0 max-w-[250px]',
    },
    slider: {
        marks: [100000, 1000000, 10000000, 50000000],
        min: 100000,
        max: 50000000,
    },
    volume: 100000,
    customers: {
        zealot: {
            headline: 'switched from BugSnag and Amplitude',
            description:
                'In two clicks, I can see who had an error, then their replays. The more of PostHog you use, the more powerful it becomes.',
        },
    },
    features: [
        {
            title: 'Alert',
            headline: 'Alert',
            description: 'Get notified of new issues by email, Slack, or webhook',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_alerts_00824b03f5.png',
                    alt: 'Alert',
                },
            ],
        },
        {
            title: 'Triage',
            headline: 'Triage',
            description: 'Assign issues to individuals or groups',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_assign_4c9bb9ee60.png',
                    alt: 'Triage',
                },
            ],
        },
        {
            title: 'Organize and prioritize',
            headline: 'Organize and prioritize',
            description: 'Merge issues, sort by frequency or recency, or use text search to find specific errors',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_organize_94b4d00ea2.png',
                    alt: 'Organize and prioritize',
                },
            ],
        },
        {
            title: 'Stack traces',
            headline: 'Stack traces',
            description:
                "Get code context automatically with PostHog's server-side libraries, or upload source maps for front-end frameworks",
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_trace_3fc569059c.png',
                    alt: 'Stack traces',
                },
            ],
        },
        {
            title: 'More features',
            headline: 'More features',
            features: [
                {
                    title: 'Session replay',
                    description:
                        'Watch session recordings of users who caused exceptions for more context about how to reproduce an issue',
                },
                {
                    title: 'Product analytics',
                    description:
                        'Graph your $exception events, use filters and breakdowns to determine where errors happen and what to prioritize',
                },
                {
                    title: 'Feature flags',
                    description: 'Test fixes by rolling out code changes only to affected users',
                },
                {
                    title: 'User profiles',
                    description:
                        'See all $exception events for specific users in their event history log and find which feature flags were enabled at the time an error occurred',
                },
            ],
        },
    ],
    questions: [
        {
            question: 'How can I analyze error patterns?',
            url: '/docs/error-tracking/monitoring',
        },
        {
            question: 'How do I set up error alerts?',
            url: '/docs/error-tracking/alerts',
        },
        {
            question: 'How do I manage and resolve issues?',
            url: '/docs/error-tracking/managing-issues',
        },
        {
            question: 'How can I reduce error tracking costs?',
            url: '/docs/error-tracking/cutting-costs',
        },
        {
            question: 'How do stack traces work?',
            url: '/docs/error-tracking/stack-traces',
        },
    ],
    comparison: {
        summary: {
            them: [
                {
                    title: 'Uptime monitoring',
                    subtitle: "We don't have uptime monitoring. Yet.",
                },
                {
                    title: 'Advanced alerting',
                    subtitle: 'We currently only support Slack and email alerts on custom criteria.',
                },
                {
                    title: 'Advanced error grouping systems',
                },
                {
                    title: 'Better mobile support',
                    subtitle: 'Even our team thinks Sentry is better if you need mobile support. For now!',
                },
            ],
            us: [
                {
                    title: 'Integration with other PostHog products',
                },
                {
                    title: 'Feature flags for error recovery',
                    subtitle: 'Quickly roll back features that cause errors.',
                },
                {
                    title: 'Simple, transparent pricing',
                },
            ],
        },
        features: [
            {
                feature: 'Error alerts',
                companies: {
                    Sentry: true,
                    LogRocket: true,
                    BugSnag: true,
                    Datadog: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Exception capture',
                companies: {
                    Sentry: true,
                    LogRocket: true,
                    BugSnag: true,
                    Datadog: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Issue management',
                companies: {
                    Sentry: true,
                    LogRocket: false,
                    BugSnag: true,
                    Datadog: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Network performance monitoring',
                companies: {
                    Sentry: true,
                    LogRocket: true,
                    BugSnag: true,
                    Datadog: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Error grouping',
                companies: {
                    Sentry: true,
                    LogRocket: true,
                    BugSnag: true,
                    Datadog: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Source map support',
                companies: {
                    Sentry: true,
                    LogRocket: true,
                    BugSnag: true,
                    Datadog: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Stack tracing',
                companies: {
                    Sentry: true,
                    LogRocket: false,
                    BugSnag: true,
                    Datadog: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Integration with product analytics',
                companies: {
                    Sentry: false,
                    LogRocket: true,
                    BugSnag: false,
                    Datadog: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Integration with session replays',
                companies: {
                    Sentry: true,
                    LogRocket: true,
                    BugSnag: false,
                    Datadog: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Integration with A/B experiments',
                companies: {
                    Sentry: false,
                    LogRocket: false,
                    BugSnag: true,
                    Datadog: false,
                    PostHog: true,
                },
            },
        ],
    },
    pairsWith: [
        {
            slug: 'session-replay',
            description: 'Watch exactly how an error occurred for a specific user',
        },
        {
            slug: 'product-analytics',
            description: 'Analyze trends over time and get alerts when things go wrong',
        },
        {
            slug: 'feature-flags',
            description: 'Roll back features that cause errors, or test fixes with slow rollouts',
        },
    ],
}

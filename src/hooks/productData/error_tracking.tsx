import React from 'react'
import { IconWarning } from '@posthog/icons'

export const errorTracking = {
    Icon: IconWarning,
    name: 'Error Tracking',
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
            title: 'Alerts',
            headline: 'Alerts',
            description: 'Get notified of new issues by email, Slack, or webhook',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_alerts_00824b03f5.png',
                    alt: 'Alert',
                    stylize: true,
                    shadow: true,
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
                    stylize: true,
                    shadow: true,
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
                    stylize: true,
                    shadow: true,
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
                    stylize: true,
                    shadow: true,
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
    presenterNotes: {
        overview:
            "<strong>Presenter notes:</strong> Error tracking that's actually connected to everything else. See an error? Watch the session replay to see exactly what happened. Check which feature flags were on. Roll back instantly. Most error tools are isolated - ours shows the full context.",
        customers:
            "Zealot switched from BugSnag and Amplitude. Why? 'In two clicks, I can see who had an error, then their replays.' That's the difference. Not just a stack trace - the whole story of what the user was doing when it broke.",
        features:
            "<strong>Alerts:</strong> Get notified via email, Slack, or webhooks when new errors appear. Set custom thresholds. No more finding out from angry users.<br /><br /><strong>Triage:</strong> Assign errors to people or teams. Track status. Know who's fixing what. Basic but essential.<br /><br /><strong>Organize and prioritize:</strong> Merge similar errors. Sort by frequency or recency. Search by error message. Focus on what matters most.<br /><br /><strong>Stack traces:</strong> Full stack traces with source maps. See exactly where errors happen. Works with all major frameworks.<br /><br /><strong>More features:</strong><br /><br /><strong>Session replay:</strong> Watch the user's session leading up to the error. No more 'can't reproduce' tickets.<br /><br /><strong>Product analytics:</strong> Graph error rates over time. Break down by user properties. Find patterns.<br /><br /><strong>Feature flags:</strong> Error in production? Turn off the feature instantly. Test fixes on small groups first.<br /><br /><strong>User profiles:</strong> See all errors for a specific user. Check their feature flags at error time.",
        answers:
            'Common questions with real answers. Analyze patterns by graphing errors over time. Set up alerts so you know before users complain. Manage issues with assignment and status tracking. Reduce costs by sampling or filtering non-critical errors. Stack traces work with source maps for minified code.',
        pricing:
            "100k error events free monthly. Then simple usage pricing. Compare to Sentry charging per seat plus usage. We're just usage-based. No surprise bills when you add developers.",
        'comparison-summary':
            "Sentry is the 800-pound gorilla. They're good at pure error tracking. But errors don't happen in isolation. We show you the full context - what the user did, which flags were on, the session replay. For mobile-heavy apps, Sentry's still better. For everything else, context wins.",
        'feature-comparison':
            "We have the core features. What we're missing: uptime monitoring, advanced alert rules, mobile SDK maturity. What we uniquely have: deep integration with analytics, replays, and feature flags. Pick based on what matters more.",
        docs: 'Setup guides for all major languages and frameworks. Source map upload instructions. Common patterns like error boundaries and custom grouping. Written by engineers who actually use this stuff.',
        'pairs-with':
            "Error happens → watch the replay → see the user's journey → check their feature flags → roll back if needed. This workflow is impossible with standalone tools. Everything connects because it's all in one platform.",
        'getting-started':
            "Add our SDK. Errors start flowing immediately. Set up alerts for critical errors. Use session replay to debug faster. Roll out fixes with feature flags. The integration is what makes it powerful - you're not just collecting errors, you're solving them faster.",
    },
}

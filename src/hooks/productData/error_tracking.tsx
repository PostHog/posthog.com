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
        squadsventures: {
            headline: 'consolidated three separate tools into one platform',
            description:
                "We ditched our previous error tracking SaaS so we could manage errors, see session replays, and do analytics all in one place. It's exactly what we were looking for.",
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
        companies: [
            {
                name: 'LogRocket',
                key: 'logrocket',
                link: '/blog/posthog-vs-logrocket',
            },
            {
                name: 'Sentry',
                key: 'sentry',
                link: '/blog/posthog-vs-sentry',
            },
            {
                name: 'Bugsnag',
                key: 'bugsnag',
            },
            {
                name: 'Datadog',
                key: 'datadog',
            },
            {
                name: 'PostHog',
                key: 'posthog',
            },
        ],
        features: [
            {
                feature: 'Error alerts',
                companies: {
                    sentry: true,
                    logrocket: true,
                    bugsnag: true,
                    datadog: true,
                    posthog: true,
                },
            },
            {
                feature: 'Exception capture',
                companies: {
                    sentry: true,
                    logrocket: true,
                    bugsnag: true,
                    datadog: true,
                    posthog: true,
                },
            },
            {
                feature: 'Issue management',
                companies: {
                    sentry: true,
                    logrocket: false,
                    bugsnag: true,
                    datadog: true,
                    posthog: true,
                },
            },
            {
                feature: 'Network performance monitoring',
                companies: {
                    sentry: true,
                    logrocket: true,
                    bugsnag: true,
                    datadog: true,
                    posthog: true,
                },
            },
            {
                feature: 'Error grouping',
                companies: {
                    sentry: true,
                    logrocket: true,
                    bugsnag: true,
                    datadog: true,
                    posthog: true,
                },
            },
            {
                feature: 'Source map support',
                companies: {
                    sentry: true,
                    logrocket: true,
                    bugsnag: true,
                    datadog: true,
                    posthog: true,
                },
            },
            {
                feature: 'Stack tracing',
                companies: {
                    sentry: true,
                    logrocket: false,
                    bugsnag: true,
                    datadog: true,
                    posthog: true,
                },
            },
            {
                feature: 'Integration with product analytics',
                companies: {
                    sentry: false,
                    logrocket: true,
                    bugsnag: false,
                    datadog: false,
                    posthog: true,
                },
            },
            {
                feature: 'Integration with session replays',
                companies: {
                    sentry: true,
                    logrocket: true,
                    bugsnag: false,
                    datadog: true,
                    posthog: true,
                },
            },
            {
                feature: 'Integration with A/B experiments',
                companies: {
                    sentry: false,
                    logrocket: false,
                    bugsnag: true,
                    datadog: false,
                    posthog: true,
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
            '<strong>Presenter notes:</strong> PostHog Error Tracking is connected to all other PostHog products. See an error? <em>Watch the session recording</em> to see exactly what happened. <em>Check which feature flags were on</em>. Roll back instantly. Most error tools are isolated whereas PostHog shows the full context.',
        customers:
            "Zealot switched from BugSnag and Amplitude. Squads Ventures ditched three separate tools and consolidated everything into one platform. (That'd be PostHog, if you weren't <em>tracking...</em> 🥁). Why? It's all about getting all the context they need in one place, reducing the friction of debugging and fixing errors faster than their legacy workflows.",
        product_os_benefits:
            "In case we haven't driven the point home by now, here's a slide all about it: PostHog Error Tracking is connected to all other PostHog products. It makes it faster to debug because you can see the full event log of what happened leading up to an error. You can watch a session recording to visualize it. You can see which feature flags were enabled at the time. And if you need to run a complex query, use the SQL editor or write a query directly from the PostHog Data Warehouse.",
        features:
            "<strong>Alerts:</strong> Get notified via email, Slack, or webhooks when new errors appear. Set custom thresholds. You don't have to wait for a spike in support tickets to know what issues users are facing. (This is also important because only a fraction of them are motivated enough to actually message you!)<br /><br /><strong>Triage:</strong> Assign errors to people or teams. Track status. Know who's fixing what. Basic but essential.<br /><br /><strong>Organize and prioritize:</strong> Merge similar errors, sort by frequency or recency, search by error message.<br /><br /><strong>Stack traces:</strong> Full stack traces with source maps. See exactly where errors happen. Works with all major frameworks.<br /><br /><strong>And then there's the convergence:</strong><br /><br /><strong>Session Replay:</strong> Watch the user's session leading up to the error. No more \"can't reproduce\" tickets.<br /><br /><strong>Product Analytics:</strong> Graph error rates over time. Break down by user properties. Find patterns.<br /><br /><strong>Feature Flags:</strong> Error in production? Turn off the feature instantly. Test fixes on small groups first.<br /><br /><strong>User Profiles:</strong> See all errors for a specific user in their dedicated activity timeline. Check their feature flags at error time.",
        answers:
            'Here are some guides about how to use Error Tracking. Some of the things you can do: Analyze patterns by graphing errors over time, set up alerts so you know before users complain, manage issues with assignment and status tracking, and reduce costs by sampling or filtering non-critical errors. And our stack traces work with source maps for minified code.',
        pricing:
            "Log up to 100k errors without even entering a credit card. You also get the monthly free tier even if you <em>have</em> added a card. Beyond that, it's simple, usage-based pricing. Compare that to Sentry who charges per seat <em>plus</em> usage. No surprise bills when you add developers, and you can set a billing limit so you never pay more than expected.",
        'comparison-summary':
            "Sentry is the 800-pound gorilla. They're <em>exception</em>ally good at pure error tracking. But errors don't happen in isolation. PostHog gives you the full context – what the user did, which flags were on, and the related session recording. For mobile-heavy apps, Sentry's still better (though we're actively working on that). For everything else, context wins.",
        'feature-comparison':
            "We have the core features. For now, we're missing a few things like uptime monitoring, advanced alert rules, and our mobile SDKs are in active development. But what we uniquely have: deep integration with analytics, replays, and feature flags. Choose according to your stage of growth, and keep in mind PostHog is designed to grow <em>with</em> you, so even if we don't have all the features you need, we likely will soon!",
        docs: 'Setup guides for all major languages and frameworks. Source map upload instructions. Common patterns like error boundaries and custom grouping. Written by engineers who actually built (and use) this stuff themselves!',
        'pairs-with':
            "Error happens → watch the replay → see the user's journey → check their feature flags → roll back if needed. This workflow is impossible with standalone tools. Everything connects because it's all in one platform.",
        'getting-started':
            'Add our SDK(s) and errors start flowing immediately. Set up Slack alerts for critical errors and start identifying core problems faster – and at a fraction of the cost vs. the big players!',
    },
}

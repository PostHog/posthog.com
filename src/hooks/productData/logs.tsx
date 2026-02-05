import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import { IconActivity } from '@posthog/icons'

export const logs = {
    name: 'Logs',
    Icon: IconActivity,
    description: 'Search and analyze your logs in PostHog',
    handle: 'logs',
    type: 'logs',
    slug: 'logs',
    color: 'red',
    colorSecondary: 'green-2',
    category: 'product_engineering',
    slider: {
        // Values in GB (display_friendly=true converts MB to GB)
        marks: [50, 100, 500, 1000, 5000],
        min: 50,
        max: 5000,
    },
    volume: 50,
    seo: {
        title: 'Logs that sync with customer data',
        description: 'Full backend context, with events, requests, and state changes in one place',
    },
    overview: {
        title: 'Logs that sync with customer data',
        description: 'Full backend context, with events, requests, and state changes in one place',
        textColor: 'text-white',
        layout: 'overlay',
    },
    videos: {
        overview: {
            wistia: 'm67tqy5vs8',
        },
    },
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/log_hog_55f5aaca56.png',
        alt: 'A hedgehog perusing some logs',
        classes: 'hidden @2xl:block max-w-sm',
    },
    screenshots: {
        overview: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/logs_overview_5408b3bed3.png',
            // srcMobile: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_overview_mobile_b9565d0690.png',
            alt: 'Logs overview',
            classes: 'max-w-5xl mt-auto',
            imgClasses: '',
            classesMobile: '',
            imgClassesMobile: '',
        },
        home: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/logs_light_ed58d98928.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/logs_dark_7f8310925f.png',
            alt: 'Logs screenshot',
            classes: 'justify-end items-end pl-4 @lg:pl-6',
            imgClasses: 'rounded-tl-md shadow-2xl',
        },
    },
    customers: {
        key: {
            headline: '',
            description: '',
        },
    },
    features: [
        {
            title: 'Queryable logs',
            headline: 'Logs you can actually query',
            template: 'splitImage',
            description: 'Filter, aggregate, and explore logs by attributes instead of scrolling text',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/logs_1_light_40dd0d8b26.png',
                    alt: 'Queryable logs',
                    className: 'justify-center items-center mt-12',
                },
            ],
            features: [
                {
                    title: 'Fast, reactive filtering',
                    description: 'Slice by surface, severity, or attributes and see patterns update instantly',
                },
                {
                    title: 'Visual feedback as you search',
                    description: 'Sparklines respond in real time so spikes and anomalies stand out immediately',
                },
                {
                    title: 'Attribute-driven navigation',
                    description:
                        'Pivot the entire log view around IDs and attributes instead of scrolling line by line',
                },
            ],
        },
        {
            title: 'Built on OpenTelemetry',
            template: 'splitImage',
            headline: 'Built on OpenTelemetry',
            description: 'Bring your existing logs without changing how you instrument',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/logs_2_light_160af6be32.png',
                    alt: 'Built on OpenTelemetry',
                    className: 'justify-center items-center mt-12',
                },
            ],
            features: [
                {
                    title: 'OTLP-compatible ingestion',
                    description: 'Send logs using standard OpenTelemetry SDKs. No proprietary agents required.',
                },
                {
                    title: 'No lock-in',
                    description: 'Your logging setup stays portable and standards-based',
                },
                {
                    title: 'Logs where your context already is',
                    description:
                        'Logs behave like your typical log tool. Having them right inside PostHog just adds the missing context',
                },
            ],
        },

        {
            title: 'Full stack context',
            template: 'splitImage',
            headline: 'Front end and back end context together',
            description: 'Follow an issue from the browser to the backend in a single tool',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/logs_3_light_4a3138862f.png',
                    alt: 'Full stack context',
                    className: 'justify-center items-center mt-12',
                },
            ],
            features: [
                {
                    title: 'Browser logs captured automatically',
                    description:
                        'Frontend logs from PostHog JS are ingested alongside backend logs – no extra setup required',
                },
                {
                    title: 'Linked to real users and sessions',
                    description:
                        'Frontend log entries are automatically associated with user IDs and session replays. Click on the user ID when debugging and immediately watch the session replay.',
                },
                {
                    title: 'One investigation, not four tools',
                    description: 'Session replay, errors, analytics, and logs stay connected as you debug',
                },
            ],
        },

        {
            title: 'AI',
            handle: 'ai',
            template: 'grid',
            className: 'bg-blue',
            headline: 'Get a sanity check from AI ✨',
            description:
                'PostHog AI can give on-demand summaries and highlight patterns. Think of it as your automatic backup; a second set of eyes on the problem.',
            children: (
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/logs_4_light_6b4cc017f6.png"
                    alt="AI"
                    className="w-full h-full object-contain"
                />
            ),
        },
    ],
    postHogOnPostHog: {
        title: 'How PostHog uses Logs',
        benefits: [
            {
                title: '…connects backend logs to session replays and errors to find root cause faster',
                description:
                    '“I can search for a front-end exception and jump directly into the session replay to watch the exact moment the bug happened.”',
            },
        ],
    },
    questions: [
        {
            question: 'Hmm?',
        },
    ],
    comparison: {
        summary: {
            them: [
                {
                    title: 'You want logs only, and plan to keep errors, replays, and analytics elsewhere',
                },
                {
                    title: 'You already have a mature observability stack and just need high-volume log storage',
                },
                {
                    title: 'Your debugging workflow is infrastructure-first',
                },
                {
                    title: 'You’re comfortable jumping between tools to reconstruct context manually',
                },
            ],
            us: [
                {
                    title: 'You want debugging context to stay connected automatically',
                },
                {
                    title: 'You want frontend and backend signals in the same tool',
                },
                {
                    title: 'You want OpenTelemetry-compatible logs without adding another tool',
                },
                {
                    title: 'You’re trying to reduce tool switching',
                    subtitle: 'Logs, replays, errors, and analytics live in the same debugging flow',
                },
            ],
        },
        companies: [
            {
                name: 'Grafana (Loki)',
                key: 'grafana_loki',
                // link: '/blog/posthog-vs-langfuse',
            },
            {
                name: 'Better Stack',
                key: 'better_stack',
            },
            {
                name: 'Datadog',
                key: 'datadog',
                // link: '/blog/posthog-vs-langsmith',
            },
            {
                name: 'Elastic',
                key: 'elastic',
                // link: '/blog/posthog-vs-elastic',
            },
            {
                name: 'PostHog',
                key: 'posthog',
            },
        ],
        rows: ['logs', 'logs.pricing.features'],
        excluded_sections: ['platform', 'pricing'],
    },
    // pairsWith: [
    //     {
    //         slug: 'product-analytics',
    //         description: 'Correlate AI usage with user behavior and business metrics',
    //     },
    //     {
    //         slug: 'dashboards',
    //         description: 'Build custom dashboards combining LLM and product metrics',
    //     },
    //     {
    //         slug: 'session-replay',
    //         description: 'Watch how users interact with AI features in real sessions',
    //     },
    //     {
    //         slug: 'feature-flags',
    //         description: 'Roll out AI features gradually and test different models',
    //     },
    // ],
    // worksWith: ['product_analytics', 'dashboards', 'session_replay', 'feature_flags'],
    // presenterNotes: {
    //     overview:
    //         '<strong>Presenter notes:</strong> Track conversations, model performance, spans, costs, latency, and traces in LLM applications – all as regular PostHog events - roughly 10x cheaper than other LLM observability tools.',
    // },
}

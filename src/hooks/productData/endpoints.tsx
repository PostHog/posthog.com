import React from 'react'
import {
    IconDashboard,
    IconGear,
    IconListTreeConnected,
    IconRewindPlay,
    IconSparkles,
    IconTarget,
    IconTrends,
    IconUser,
    IconWarning,
    IconMagicWand,
    IconLlmPromptEvaluation,
    IconTerminal,
} from '@posthog/icons'

import CloudinaryImage from 'components/CloudinaryImage'

export const endpoints = {
    name: 'Endpoints',
    Icon: IconTerminal,
    description: 'Custom API endpoints powered by your PostHog data.',
    handle: 'endpoints',
    type: 'endpoints',
    color: 'teal',
    colorSecondary: 'teal',
    category: 'product_engineering',
    slug: 'endpoints',
    status: 'beta',

    // slider: {
    //     marks: [100000, 1000000, 10000000, 100000000],
    //     min: 100000,
    //     max: 100000000,
    // },
    // volume: 100000,
    seo: {
        title: 'Endpoints – Custom API endpoints powered by your PostHog data',
        description:
            'Create custom API endpoints powered by your PostHog data. Use them to build embedded analytics, data feeds, and more.',
    },
    overview: {
        title: 'Custom API endpoints powered by your PostHog data',
        description:
            'Create custom API endpoints powered by your PostHog data. Use them to build embedded analytics, data feeds, and more.',
        textColor: 'text-black',
        layout: 'overlay',
    },
    videos: {
        overview: {
            wistia: 'bl174kpxu8',
        },
    },
    screenshots: {
        overview: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/endpoints_desktop_5ea67ee88c.png',
            srcMobile: 'https://res.cloudinary.com/dmukukwp6/image/upload/endpoints_mobile_de719b9fe0.png',
            alt: 'Endpoints',
            classes: 'mx-4 @2xl:mx-8',
            // imgClasses: 'rounded-tl-md shadow-2xl',
            classesMobile: '',
            imgClassesMobile: '',
        },
        home: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_llm_analytics_light_a436da72f7.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_llm_analytics_dark_d8f32c249b.png',
            alt: 'LLM Analytics screenshot',
            classes: 'justify-end items-end pl-4 @lg:pl-6',
            imgClasses: 'rounded-tl-md shadow-2xl',
        },
    },
    // hog: {
    //   src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/hogs/product-analytics-hog.png',
    //   alt: 'AI-powered hedgehog',
    //   classes: 'absolute bottom-0 right-4 max-w-lg',
    // },
    customers: {
        elevenlabs: {
            headline: 'uses LLM analytics with session replays (and everything else)',
            description:
                'PostHog is amazing. It reins in the chaos to have everything in one place. Otherwise it’s quite overwhelming to try and understand what’s working and what’s not.',
        },
        lovable: {
            headline: 'compared us to every other observability tool, just to be sure',
            description:
                "If you're building a new product, just use PostHog. It's a no-brainer. It's the only all-in-one platform like it for developers.",
        },
        posthog: {
            headline: 'monitors the usage and performance of PostHog AI with LLM Analytics',
            description:
                'We use our own AI observability product to attribute costs, monitor latency and errors, compare models, and iterate on prompts in production.',
        },
    },
    features: [
        {
            title: 'Dashboards',
            handle: 'dashboards',
            template: 'splitImage',
            headline: 'Build your own dashboards',
            description: 'Use your PostHog data to power dashboards outside the PostHog UI.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_trace_light_e4cea319cb.png',
                    srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_trace_dark_f49aa4dd89.png',
                    alt: 'LLM trace',
                    className: 'rounded-tl-md shadow-2xl justify-end items-end @2xl:mt-8 ml-8 @2xl:ml-0',
                },
            ],
            features: [
                {
                    icon: <IconListTreeConnected />,
                    title: 'Expose metrics as APIs',
                    description: 'Create endpoints from insights or SQL and fetch the results from your application.',
                },
                {
                    icon: <IconUser />,
                    title: 'Use the queries you already have',
                    description:
                        'Endpoints run the exact insight or SQL query defined in PostHog, including filters, breakdowns, and time range.',
                },
                {
                    icon: <IconRewindPlay />,
                    title: 'Designed to be called over and over ',
                    description:
                        'Endpoints are intended to be called regularly by dashboards, with higher rate limits than standard API queries.',
                },
            ],
            // children: (<></>)
        },
        {
            title: 'Use caes',
            handle: 'use_cases',
            template: 'splitImage',
            headline: 'Use PostHog data to build feeds, make recommendations, or for sales enrichment',
            description: 'Endpoints work well for lists and summaries that need to update regularly.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_cost_light_f2794e4e13.png',
                    srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_cost_dark_d1efde15fd.png',
                    alt: 'LLM cost analysis',
                    className: 'justify-center items-center',
                },
            ],
            features: [
                {
                    icon: <IconTrends />,
                    title: 'Predefined aggregate queries',
                    description:
                        'Create endpoints for queries like “top selling products for this week” or “most active users”.',
                },
                {
                    icon: <IconTarget />,
                    title: 'Stable URLs your app can keep calling',
                    description: 'Each endpoint has a consistent API URL that applications can call repeatedly.',
                },
                {
                    icon: <IconSparkles />,
                    title: 'Optional caching',
                    description: 'Endpoints return cached results when available, avoiding unnecessary recomputation.',
                },
            ],
        },
        {
            title: 'More',
            handle: 'more',
            template: 'grid',
            headline: 'When queries need to leave the dashboard',
            description:
                'Expose the results of PostHog insights or SQL queries so applications can fetch them directly. Insights keep their existing configuration, while SQL queries can be materialized for scheduled execution and higher rate limits.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_perf_light_d986541535.png',
                    srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_perf_dark_4e421717ba.png',
                    alt: 'LLM performance monitoring',
                    className: 'justify-center items-center',
                },
            ],
        },
    ],
    postHogOnPostHog: {
        title: 'How PostHog uses LLM Analytics',
        benefits: [
            {
                title: 'Analyze costs',
                description: 'by comparing models and analyzing usage',
            },
            {
                title: 'Spot emergencies',
                description: 'with latency and error rate alerting',
            },
            {
                title: 'Monitor performance',
                description: 'by comparing speed and reliability across models',
            },
            {
                title: 'Muck about',
                description: 'in the prompt playground (meaningfully)',
            },
            {
                title: 'Integrate with other tools',
                description: 'in your LLM observability stack',
            },
            {
                title: 'Build AI features',
                description: 'like PostHog AI, obviously',
            },
        ],
    },
    questions: [
        {
            question: 'What are my LLM costs by customer?',
        },
        {
            question: 'Which AI features have the highest error rates?',
        },
        {
            question: 'Are there latency spikes in my LLM calls?',
        },
        {
            question: 'Do AI features improve user retention?',
        },
        {
            question: 'Which prompts are most expensive?',
        },
        {
            question: 'How many tokens does each feature consume?',
        },
        {
            question: "What's the ROI of our AI features?",
        },
        {
            question: 'Which model gives the best cost/performance ratio?',
        },
    ],
    comparison: {
        summary: {
            them: [
                {
                    title: 'You want a standalone analytics API',
                    subtitle: 'and are happy managing data separately',
                },
                {
                    title: 'You’re building analytics directly from raw event data',
                },
                {
                    title: 'You don’t need dashboards, insights, or product context',
                },
                {
                    title: 'You’re okay duplicating analytics logic outside PostHog',
                },
            ],
            us: [
                {
                    title: 'Reuse existing insights or SQL queries already in PostHog',
                },
                {
                    title: 'You’re building on PostHog data',
                    subtitle: 'like customer-facing dashboards or internal tools',
                },
                {
                    title: 'You need stable, predefined endpoints',
                    subtitle: 'for feeds, rankings, or summaries',
                },
                {
                    title: 'You want to move away from ad-hoc Query API calls toward production-ready queries',
                },
            ],
        },
        companies: [
            {
                name: 'Tinybird',
                key: 'tinybird',
                // link: '/blog/posthog-vs-langfuse',
            },
            {
                name: 'ClickHouse Cloud',
                key: 'clickhouse_cloud',
                // link: '/blog/posthog-vs-langsmith',
            },
            {
                name: 'PostHog',
                key: 'posthog',
            },
        ],
        rows: ['endpoints', 'platform.deployment.open_core'],
        excluded_sections: ['platform'],
    },
    pairsWith: [
        {
            slug: 'product-analytics',
            description:
                'Create insights in PostHog and expose their results through endpoints. Use trends, funnels, or retention analyses to power dashboards, feeds, or summaries in your application, without rebuilding the query elsewhere.',
        },
        {
            slug: 'data-stack/managed-warehouse',
            description:
                'Combine product analytics data with other datasets using SQL in PostHog’s data warehouse. Expose the results through endpoints when you need more control over how data is shaped or joined.',
        },
    ],
    worksWith: ['product_analytics', 'dashboards', 'session_replay', 'feature_flags'],
    presenterNotes: {
        overview: '',
    },
}

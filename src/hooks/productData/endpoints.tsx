import React from 'react'
import {
    IconBell,
    IconClockRewind,
    IconDashboard,
    IconGear,
    IconGraph,
    IconHandMoney,
    IconLightBulb,
    IconListTreeConnected,
    IconLlmAnalytics,
    IconPiggyBank,
    IconRewindPlay,
    IconShield,
    IconSparkles,
    IconTarget,
    IconTrends,
    IconUser,
    IconWarning,
    IconGlobe,
    IconListCheck,
    IconMagicWand,
    IconLlmPromptManagement,
    IconLlmPromptEvaluation,
    IconDatabase,
    IconTerminal,
} from '@posthog/icons'
import {
    IconAnthropic,
    IconGemini,
    IconGrid,
    IconHelicone,
    IconKeywordsAI,
    IconLangChain,
    IconLangfuse,
    IconOpenAI,
    IconOpenRouter,
    IconTag,
    IconTraceloop,
    IconVercel,
} from 'components/OSIcons'

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
        title: 'ENDPOINTSSSS',
        description:
            'Product analytics for LLMs. Inspect traces, spans, latency, usage, and per-user costs for AI-powered features.',
        textColor: 'text-white',
        layout: 'overlay',
    },
    videos: {
        overview: {
            wistia: 'bl174kpxu8',
        },
    },
    screenshots: {
        overview: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_overview_desktop_2399cc57d6.png',
            srcMobile: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_overview_mobile_b9565d0690.png',
            alt: 'LLM analytics dashboard',
            classes: '',
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
            label: 'Features',
        },
        {
            title: 'Dashboard',
            icon: <IconDashboard />,
            color: 'purple',
            headline: 'Dashboard',
            description:
                "Get a comprehensive overview of where your LLM budget goes, who's using AI features, and how they perform.",
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/dashboard_screenshot_ce72bbf715.png',
                    alt: 'LLM Analytics dashboard',
                    className: 'justify-center items-center',
                },
            ],
        },
        {
            title: 'Generations',
            icon: <IconSparkles />,
            color: 'yellow',
            headline: 'Generations',
            description:
                'Every LLM call becomes a generation. See exactly what went in, what came out, and why it cost you $0.03.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/generations_screenshot_56f0f313ae.png',
                    alt: 'LLM Analytics generations',
                    className: 'justify-center items-center',
                },
            ],
        },
        {
            title: 'Traces',
            icon: <IconListTreeConnected />,
            color: 'seagreen',
            headline: 'Traces',
            description:
                'Debug entire conversations, not just individual calls. PostHog automatically captures properties like person, total cost, total latency, and more.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/trace_screenshot_1e0bdd0ad3.png',
                    alt: 'LLM Analytics traces',
                    className: 'justify-center items-center',
                },
            ],
        },
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
            template: 'stacked',
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
        {
            title: 'Users',
            icon: <IconUser />,
            color: 'red',
            headline: 'Users',
            description:
                "Spot your power users, your biggest fans, and who's hitting errors. Most teams discover 20% of users drive 80% of costs.",
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/users_screenshot_2_d93795cbdc.png',
                    alt: 'LLM Analytics users',
                    className: 'justify-center items-center',
                },
            ],
        },
        {
            title: 'Errors',
            icon: <IconWarning />,
            color: 'yellow',
            headline: 'Errors',
            description:
                'Debug failed LLM calls and monitor exception rates with the full story: prompt, response, parameters, and metadata.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/errors_screenshot_e413f3f20b.png',
                    alt: 'LLM Analytics errors',
                    className: 'justify-center items-center',
                },
            ],
        },
        {
            title: 'Sessions',
            icon: <IconRewindPlay />,
            color: 'yellow',
            headline: 'Sessions',
            description:
                'See complete user sessions with all LLM activity. Spot the difference: engaged at length, or stuck in a loop.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/sessions_screenshot_d6fc106ce9.png',
                    alt: 'LLM Analytics sessions',
                    className: 'justify-center items-center',
                },
            ],
        },
        {
            title: 'Playground',
            icon: <IconMagicWand />,
            color: 'purple',
            headline: 'Playground',
            description:
                'Iterate system prompts without pushing code. Swap models, adjust tools, test the cursed inputs users will inevitably throw at you.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/playground_screenshot_2_3364a67436.png',
                    alt: 'LLM Analytics playground',
                    className: 'justify-center items-center',
                },
            ],
        },
        {
            title: 'Evaluations',
            icon: <IconLlmPromptEvaluation />,
            color: 'blue',
            headline: 'Evaluations',
            description:
                'Catch regressions before users do. Run evals for hallucinations, toxicity, relevance, helpfulness, jailbreak attempts, or custom criteria.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/evaluations_screenshot_959ba893da.png',
                    alt: 'LLM Analytics evaluations',
                    className: 'justify-center items-center',
                },
            ],
        },
        // {
        //     title: 'Prompts',
        //     icon: <IconLlmPromptManagement />,
        //     color: 'purple',
        //     headline: 'Prompts',
        //     description: 'Create, manage, and version control your prompts from a central location',
        //     images: [
        //         {
        //             src: 'https://res.cloudinary.com/dmukukwp6/image/upload/evaluations_screenshot_959ba893da.png',
        //             alt: 'LLM Analytics prompts',
        //             className: 'justify-center items-center',
        //         },
        //     ],
        // },
        {
            label: 'Advanced analytics',
        },
        {
            title: 'Analysis',
            icon: <IconTrends />,
            color: 'blue',
            headline: 'Go beyond basic metrics',
            description:
                'LLM observability tools tell you "how many calls?" LLM analytics shows how your AI features drive retention, revenue, and engagement.',
            features: [
                {
                    title: 'Correlation analysis',
                    description:
                        'Connect AI performance to real business metrics. LLM traces, product analytics, session replay, and A/B testing in one tool.',
                },
                {
                    title: 'Funnel analysis',
                    description:
                        'Track users through the entire product journey. Pinpoint where they drop off, and how AI was involved — latency, output quality, or UX.',
                },
                {
                    title: 'Cohort analysis',
                    description:
                        'Compare AI power users vs tourists. Are frequent users your best customers or just more expensive? Do they convert? Upgrade? Now you have answers.',
                },
            ],
            layout: 'columns',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/LLM_features_analysis_500cdd8b92.png',
                    alt: 'LLM Analytics analysis',
                    className: 'justify-center items-center',
                },
            ],
        },
        {
            title: 'Customizations',
            icon: <IconGear />,
            color: 'seagreen',
            headline: 'Customizations',
            description:
                'LLM analytics works best when you can analyze prompts, cost, and latency alongside events and metrics that matter to you.',
            features: [
                {
                    title: 'Custom dashboards and SQL',
                    description:
                        'Build dashboards that show AI performance in context with user behavior, and use HogQL to query raw LLM data when you need more detail.',
                },
                {
                    title: 'Privacy without losing signal',
                    description:
                        'Exclude or hash sensitive prompt and response data while still keeping structure, metadata, and performance metrics.',
                },
                {
                    title: 'Works with your AI stack',
                    description:
                        'Already using an LLM observability tool? Send that data to PostHog to analyze alongside other product and user data.',
                },
            ],
            layout: 'columns',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/LLM_features_70ab277d76.png',
                    alt: 'LLM Analytics analysis',
                    className: 'justify-center items-center p-8',
                },
            ],
        },
        {
            title: 'Native integrations',
            handle: 'native_integrations',
            // Custom component handles this slide - no template needed
            headline: 'Works with your AI stack',
            description: 'Simple SDKs for popular LLM providers and observability platforms.',
        },
        // {
        //     title: 'Platform integrations',
        //     handle: 'platform_integrations',
        //     template: 'split',
        //     headline: 'Integrates with other LLM observability platforms',
        //     description:
        //         'Using another LLM observability platform? Send data to PostHog to analyze it with product usage data.',
        //     features: [
        //         {
        //             icon: <IconLangfuse />,
        //             title: 'Langfuse',
        //             description: '',
        //         },
        //         {
        //             icon: <IconHelicone />,
        //             title: 'Helicone',
        //             description: '',
        //         },
        //         {
        //             icon: <IconTraceloop />,
        //             title: 'Traceloop',
        //             description: '',
        //         },
        //         {
        //             icon: <IconKeywordsAI />,
        //             title: 'Keywords AI',
        //             description: '',
        //         },
        //     ],
        //     children: (
        //         <div className="prose-xl p-8">
        //             <h3>Answer questions like:</h3>
        //             <ul className="list-disc">
        //                 <li>What are my LLM costs by customer, model, and in total?</li>
        //                 <li>How many of my users are interacting with my LLM features?</li>
        //                 <li>Are there generation latency spikes?</li>
        //                 <li>
        //                     Does interacting with LLM features correlate with other metrics (retention, usage, revenue,
        //                     etc.)?
        //                 </li>
        //             </ul>
        //         </div>
        //     ),
        // },
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
                    title: 'You want a standalone analytics API and are happy managing data separately',
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
                    title: 'You already use PostHog and want to reuse existing insights or SQL queries',
                },
                {
                    title: 'You’re building customer-facing dashboards or internal tools with PostHog data',
                },
                {
                    title: 'You need stable, predefined endpoints for feeds, rankings, or summaries',
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
            description: 'Correlate AI usage with user behavior and business metrics',
        },
        {
            slug: 'dashboards',
            description: 'Build custom dashboards combining LLM and product metrics',
        },
        {
            slug: 'session-replay',
            description: 'Watch how users interact with AI features in real sessions',
        },
        {
            slug: 'feature-flags',
            description: 'Roll out AI features gradually and test different models',
        },
    ],
    worksWith: ['product_analytics', 'dashboards', 'session_replay', 'feature_flags'],
    presenterNotes: {
        overview:
            '<strong>Presenter notes:</strong> Track conversations, model performance, spans, costs, latency, and traces in LLM applications – all as regular PostHog events - roughly 10x cheaper than other LLM observability tools.',
    },
}

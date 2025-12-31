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

export const llmAnalytics = {
    name: 'LLM Analytics',
    Icon: IconLlmAnalytics,
    description: 'Track costs, performance, and usage of your AI features',
    handle: 'llm_analytics',
    type: 'llm_analytics',
    slug: 'llm-analytics',
    color: 'purple',
    colorSecondary: 'green-2',
    category: 'analytics',
    slider: {
        marks: [100000, 1000000, 10000000, 100000000],
        min: 100000,
        max: 100000000,
    },
    volume: 100000,
    seo: {
        title: 'LLM Analytics – Observe and optimize AI products in PostHog',
        description:
            'Monitor and optimize AI products with LLM Analytics. Get full observability across every conversation. See model performance, cost, and errors.',
    },
    overview: {
        title: 'Ship better AI products, faster',
        description: 'Analyze traces, spans, per-user costs, latency, and usage of your AI features',
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
            imgClasses: 'rounded-tl-lg shadow-2xl',
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
            description: 'Get a comprehensive overview of your LLM usage, costs, and performance',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/dashboard_screenshot_ce72bbf715.png',
                    alt: 'LLM Analytics dashboard',
                    className: 'justify-center items-center',
                },
            ],
        },
        {
            title: 'Traces',
            icon: <IconListTreeConnected />,
            color: 'seagreen',
            headline: 'Traces',
            description: 'Debug entire conversations, not just individual calls',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/trace_screenshot_1e0bdd0ad3.png',
                    alt: 'LLM Analytics traces',
                    className: 'justify-center items-center',
                },
            ],
        },
        {
            title: 'Traces',
            handle: 'trace_monitoring',
            template: 'splitImage',
            headline: 'Traces',
            description: 'Debug entire conversations, not just individual calls',
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
                    title: 'Multi-turn conversation history',
                    description: 'Track prompts, completions, and token counts for every interaction',
                },
                {
                    icon: <IconUser />,
                    title: 'User attribution',
                    description: 'Trace AI interactions to specific users and organizations',
                },
                {
                    icon: <IconRewindPlay />,
                    title: 'Integrated session recordings',
                    description: "Observe any changes to your UI based on the LLM's response",
                },
                {
                    icon: <IconTag />,
                    title: 'Metadata tracking',
                    description: 'Add custom properties like conversation ID, session, or feature',
                },
                {
                    icon: <IconShield />,
                    title: 'Privacy mode',
                    description: 'Optionally exclude sensitive prompt and completion data',
                },
            ],
            // children: (<></>)
        },
        {
            title: 'Cost analysis',
            handle: 'cost_analysis',
            template: 'splitImage',
            headline: 'Cost analysis',
            description: 'Track costs by model, user, feature, and time period to optimize spending and pricing',
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
                    title: 'Model comparison',
                    description: 'Compare costs across different models and providers',
                },
                {
                    icon: <IconTarget />,
                    title: 'Cost per user',
                    description: 'See which users or organizations are driving your LLM costs',
                },
                {
                    icon: <IconSparkles />,
                    title: 'Feature-level costs',
                    description: 'Understand the economics of each AI-powered feature',
                },
                {
                    icon: <IconPiggyBank />,
                    title: 'ROI analysis',
                    description: 'Connect AI costs to revenue data and user engagement metrics',
                },
            ],
        },
        {
            title: 'Performance monitoring',
            handle: 'performance_monitoring',
            template: 'splitImage',
            headline: 'Performance monitoring',
            description: 'Monitor latency, error rates, and model performance',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_perf_light_d986541535.png',
                    srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_perf_dark_4e421717ba.png',
                    alt: 'LLM performance monitoring',
                    className: 'justify-center items-center',
                },
            ],
            features: [
                {
                    icon: <IconDashboard />,
                    title: 'Latency tracking',
                    description: 'Monitor response times and identify performance bottlenecks',
                },
                {
                    icon: <IconWarning />,
                    title: 'Error monitoring',
                    description: 'Track API errors, rate limits, and model failures',
                },
                {
                    icon: <IconTrends />,
                    title: 'Model performance',
                    description: 'Compare speed and reliability across different models',
                },
                {
                    icon: <IconBell />,
                    title: 'Real-time alerts',
                    description: 'Get notified of latency spikes or error rate increases',
                },
                {
                    icon: <IconGlobe />,
                    title: 'Geographic performance',
                    description: 'See how performance varies by user location',
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
            title: 'Users',
            icon: <IconUser />,
            color: 'red',
            headline: 'Users',
            description:
                'See which users are interacting with your AI features and understand their usage pattern. Balance power users and tourists to refine your pricing model',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/users_screenshot_716215eebb.png',
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
                'Connect your LLM events to error tracking to debug failures and monitor exceptions. See the exact prompts, model responses, and metadata associated with failed AI workflows.',
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
            description: 'View session recordings alongside LLM traces to understand user interactions',
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
                'Test and iterate without touching production code. Experiment with different models, prompts, tool calls and configurations to find the best solution.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/playground_screenshot_eba10793cd.png',
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
                'Run evals for relevance, toxicity, hallucinations, and more. Select a pre-configured template to get started quickly, or create your own from scratch',
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
                'Go beyond "how many calls?" See how AI usage correlates with retention, revenue, and whether your feature is actually useful.',
            features: [
                {
                    title: 'Correlation analysis',
                    description: 'See how AI usage correlates with retention, revenue, and engagement',
                },
                {
                    title: 'Funnel analysis',
                    description: 'Track conversion through AI-powered features',
                },
                {
                    title: 'Cohort analysis',
                    description: 'Compare heavy vs light AI users behavior',
                },
            ],
            layout: 'single-column',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/evaluations_screenshot_959ba893da.png',
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
            description: "One size doesn't fit all. Build custom dashboards and insights to fit your needs",
            features: [
                {
                    title: 'Custom dashboards',
                    description: 'Build dashboards combining AI and product metrics',
                },
                {
                    title: 'SQL access',
                    description: 'Query raw LLM data with HogQL for custom analysis',
                },
                {
                    title: 'Privacy mode',
                    description:
                        'To avoid storing potentially sensitive prompt and completion data, you can enable privacy mode to exclude certain properties from being captured.',
                },
            ],
            layout: 'single-column',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/evaluations_screenshot_959ba893da.png',
                    alt: 'LLM Analytics customizations',
                    className: 'justify-center items-center',
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
                description: 'like Langfuse, Helicone, and more',
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
                    title: "You don't need any product insights",
                    subtitle: 'and only want to track operational metrics',
                },
                {
                    title: 'Deep mobile support',
                    subtitle: "if you're building a mobile-specific product",
                },
                {
                    title: "You don't want to use an open source product",
                },
            ],
            us: [
                {
                    title: 'You want to understand LLM costs on a per user basis',
                    subtitle: 'in addition to other axes',
                },
                {
                    title: 'You want to combine LLM analytics with other tools',
                    subtitle: 'like Error Tracking and Session Replay',
                },
                {
                    title: 'You need easy regulatory compliance for HIPAA and GDPR',
                    // subtitle: 'Exclude sensitive data with built-in privacy mode',
                },
            ],
        },
        companies: [
            {
                name: 'Langfuse',
                key: 'langfuse',
                // link: '/blog/posthog-vs-langfuse',
            },
            {
                name: 'Langsmith',
                key: 'langsmith',
                // link: '/blog/posthog-vs-langsmith',
            },
            {
                name: 'Helicone',
                key: 'helicone',
                // link: '/blog/posthog-vs-helicone',
            },
            {
                name: 'Braintrust',
                key: 'braintrust',
            },
            {
                name: 'PostHog',
                key: 'posthog',
            },
        ],
        rows: ['llm_analytics'],
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
        native_integrations:
            '<strong>Presenter notes:</strong> PostHog integrates with other LLM observability platforms including Langfuse, Helicone, Traceloop, and Keywords AI.',
    },
}

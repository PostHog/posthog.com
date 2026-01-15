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
        title: 'Observe and debug AI in production',
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
            title: 'Traces',
            handle: 'trace_monitoring',
            className: 'bg-trace-monitoring !bg-blue',
            template: 'splitImage',
            headline: 'Traces',
            description: 'See an interaction timeline including all generation and span events.',
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
                    description: 'Optionally exclude sensitive data from being captured',
                },
            ],
            // children: (<></>)
        },
        {
            title: 'Cost analysis',
            handle: 'cost_analysis',
            className: 'bg-cost-analysis !bg-purple',
            template: 'splitImage',
            headline: 'Cost analysis',
            description: 'Track costs by model, user, feature, and time period to optimize spending and pricing.',
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
            className: 'bg-performance-monitoring !bg-lilac',
            template: 'splitImage',
            headline: 'Performance monitoring',
            description: 'Monitor latency, error rates, and model performance over time.',
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
                    description: 'optimize response times and identify performance bottlenecks',
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
    },
}

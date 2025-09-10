import React from 'react'
import {
    IconBell,
    IconClockRewind,
    IconDashboard,
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
    IconDecisionTree,
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

export const realtimeDestinations = {
    name: 'Realtime destinations',
    Icon: IconDecisionTree,
    // description: 'Send data to tools such as Slack, Zapier, or Customer.io to receive notifications, trigger automations, send emails, and more.',
    type: 'realtime_destinations',
    handle: 'realtime_destinations',
    slug: 'realtime-destinations',
    color: 'seagreen',
    colorSecondary: 'green-2',
    // category: 'data', // Not set on purpose - this ensures it's hidden from navigation and products
    slider: {
        marks: [10000, 50000, 250000, 1000000, 10000000],
        min: 10000,
        max: 10000000,
    },
    volume: 10000,
    // seo: {
    //   title: 'LLM analytics - PostHog',
    //   description:
    //     'Track every conversation, model performance, costs, and errors in your LLM applications. 10x cheaper than other LLM observability tools.',
    // },
    // overview: {
    //   title: 'Monitor and debug your AI products',
    //   description:
    //     'Analyze traces, spans, per-user costs, latency, and usage of your AI features',
    //   textColor: 'text-white',
    //   layout: 'overlay',
    // },
    // screenshots: {
    //   overview: {
    //     src: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_overview_desktop_2399cc57d6.png',
    //     srcMobile: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_overview_mobile_b9565d0690.png',
    //     alt: 'LLM analytics dashboard',
    //     classes: '',
    //     // imgClasses: 'rounded-tl-md shadow-2xl',
    //     classesMobile: '',
    //     imgClassesMobile: '',
    //   },
    //   home: {
    //     src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_llm_analytics_light_a436da72f7.png',
    //     srcDark:
    //       'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_llm_analytics_dark_d8f32c249b.png',
    //     alt: 'LLM Analytics screenshot',
    //     classes: 'justify-end items-end pl-4 @lg:pl-6',
    //     imgClasses: 'rounded-tl-lg shadow-2xl',
    //   },
    // },
    // // hog: {
    // //   src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/hogs/product-analytics-hog.png',
    // //   alt: 'AI-powered hedgehog',
    // //   classes: 'absolute bottom-0 right-4 max-w-lg',
    // // },
    // customers: {
    //   elevenlabs: {
    //     headline: 'uses LLM analytics with session replays (and everything else)',
    //     description: 'PostHog is amazing. It reins in the chaos to have everything in one place. Otherwise it’s quite overwhelming to try and understand what’s working and what’s not.',
    //   },
    //   lovable: {
    //     headline: 'compared us to every other observability tool, just to be sure',
    //     description: "If you're building a new product, just use PostHog.It's a no-brainer. It's the only all-in -one platform like it for developers.",
    //   },
    // },
    // features: [
    //   {
    //     title: 'Trace monitoring',
    //     handle: 'trace_monitoring',
    //     template: 'splitImage',
    //     headline: 'Trace monitoring',
    //     description:
    //       'Debug entire conversations, not just individual calls',
    //     images: [
    //       {
    //         src: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_trace_light_e4cea319cb.png',
    //         srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_trace_dark_f49aa4dd89.png',
    //         alt: 'LLM trace',
    //         className: 'rounded-tl-md shadow-2xl justify-end items-end @2xl:mt-8 ml-8 @2xl:ml-0',
    //       },
    //     ],
    //     features: [
    //       {
    //         icon: <IconListTreeConnected />,
    //         title: 'Multi-turn conversation history',
    //         description: 'Track prompts, completions, and token counts for every interaction',
    //       },
    //       {
    //         icon: <IconUser />,
    //         title: 'User attribution',
    //         description: 'Trace AI interactions to specific users and organizations',
    //       },
    //       {
    //         icon: <IconRewindPlay />,
    //         title: 'Integrated session recordings',
    //         description: 'Observe any changes to your UI based on the LLM\'s response',
    //       },
    //       {
    //         icon: <IconTag />,
    //         title: 'Metadata tracking',
    //         description: 'Add custom properties like conversation ID, session, or feature',
    //       },
    //       {
    //         icon: <IconShield />,
    //         title: 'Privacy mode',
    //         description: 'Optionally exclude sensitive prompt and completion data',
    //       },
    //     ],
    //     // children: (<></>)
    //   },
    //   {
    //     title: 'Cost analysis',
    //     handle: 'cost_analysis',
    //     template: 'splitImage',
    //     headline: 'Cost analysis',
    //     description:
    //       'Track costs by model, user, feature, and time period to optimize spending and pricing',
    //     images: [
    //       {
    //         src: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_cost_light_f2794e4e13.png',
    //         srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_cost_dark_d1efde15fd.png',
    //         alt: 'LLM cost analysis',
    //         className: 'justify-center items-center',
    //       },
    //     ],
    //     features: [
    //       {
    //         icon: <IconTrends />,
    //         title: 'Model comparison',
    //         description: 'Compare costs across different models and providers',
    //       },
    //       {
    //         icon: <IconTarget />,
    //         title: 'Cost per user',
    //         description: 'See which users or organizations are driving your LLM costs',
    //       },
    //       {
    //         icon: <IconSparkles />,
    //         title: 'Feature-level costs',
    //         description: 'Understand the economics of each AI-powered feature',
    //       },
    //       {
    //         icon: <IconPiggyBank />,
    //         title: 'ROI analysis',
    //         description: 'Connect AI costs to revenue data and user engagement metrics',
    //       },
    //     ],
    //   },
    //   {
    //     title: 'Performance monitoring',
    //     handle: 'performance_monitoring',
    //     template: 'splitImage',
    //     headline: 'Performance monitoring',
    //     description:
    //       'Monitor latency, error rates, and model performance',
    //     images: [
    //       {
    //         src: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_perf_light_d986541535.png',
    //         srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_perf_dark_4e421717ba.png',
    //         alt: 'LLM performance monitoring',
    //         className: 'justify-center items-center',
    //       },
    //     ],
    //     features: [
    //       {
    //         icon: <IconDashboard />,
    //         title: 'Latency tracking',
    //         description: 'Monitor response times and identify performance bottlenecks',
    //       },
    //       {
    //         icon: <IconWarning />,
    //         title: 'Error monitoring',
    //         description: 'Track API errors, rate limits, and model failures',
    //       },
    //       {
    //         icon: <IconTrends />,
    //         title: 'Model performance',
    //         description: 'Compare speed and reliability across different models',
    //       },
    //       {
    //         icon: <IconBell />,
    //         title: 'Real-time alerts',
    //         description: 'Get notified of latency spikes or error rate increases',
    //       },
    //       {
    //         icon: <IconGlobe />,
    //         title: 'Geographic performance',
    //         description: 'See how performance varies by user location',
    //       },
    //     ],
    //   },
    //   {
    //     title: 'Native integrations',
    //     handle: 'native_integrations',
    //     template: 'grid',
    //     headline: 'Works with your AI stack',
    //     description: 'Simple SDKs for popular LLM providers and observability platforms.',
    //     features: [
    //       {
    //         icon: <IconOpenAI />,
    //         title: 'OpenAI SDK',
    //         // description: 'Drop-in integration for GPT models with one line of code',
    //       },
    //       {
    //         icon: <IconAnthropic />,
    //         title: 'Anthropic SDK',
    //         // description: 'Native support for Claude models',
    //       },
    //       {
    //         icon: <IconGemini />,
    //         title: 'Google Gemini',
    //         // description: 'Native support for Gemini models',
    //       },
    //       {
    //         icon: <IconLangChain />,
    //         title: 'LangChain',
    //         // description: 'Full observability for LangChain applications',
    //       },
    //       {
    //         icon: <IconVercel />,
    //         title: 'Vercel AI SDK',
    //         // description: 'Track streaming responses and edge functions',
    //       },
    //       {
    //         icon: <IconOpenRouter />,
    //         title: 'OpenRouter',
    //         // description: 'Native support for OpenRouter',
    //       },
    //     ],
    //   },
    //   {
    //     title: 'Platform integrations',
    //     handle: 'platform_integrations',
    //     template: 'split',
    //     headline: 'Integrates with other LLM observability platforms',
    //     description: 'Using another LLM observability platform? Send data to PostHog to analyze it with product usage data.',
    //     features: [
    //       {
    //         icon: <IconLangfuse />,
    //         title: 'Langfuse',
    //         description: '',
    //       },
    //       {
    //         icon: <IconHelicone />,
    //         title: 'Helicone',
    //         description: '',
    //       },
    //       {
    //         icon: <IconTraceloop />,
    //         title: 'Traceloop',
    //         description: '',
    //       },
    //       {
    //         icon: <IconKeywordsAI />,
    //         title: 'Keywords AI',
    //         description: '',
    //       },
    //     ],
    //     children: (
    //       <div className="prose-xl p-8">
    //         <h3>Answer questions like:</h3>
    //         <ul className="list-disc">
    //           <li>What are my LLM costs by customer, model, and in total?</li>
    //           <li>How many of my users are interacting with my LLM features?</li>
    //           <li>Are there generation latency spikes?</li>
    //           <li>Does interacting with LLM features correlate with other metrics (retention, usage, revenue, etc.)?</li>
    //         </ul>
    //       </div>
    //     ),
    //   },
    //   {
    //     title: 'Advanced analytics',
    //     handle: 'advanced_analytics',
    //     template: 'grid',
    //     headline: 'Go beyond basic metrics',
    //     description: "Use PostHog's full analytics suite to understand AI feature adoption and impact.",
    //     features: [
    //       {
    //         title: 'Correlation analysis',
    //         description: 'See how AI usage correlates with retention, revenue, and engagement',
    //       },
    //       {
    //         title: 'Funnel analysis',
    //         description: 'Track conversion through AI-powered features',
    //       },
    //       {
    //         title: 'Cohort analysis',
    //         description: 'Compare heavy vs light AI users behavior',
    //       },
    //       {
    //         title: 'Custom dashboards',
    //         description: 'Build dashboards combining AI and product metrics',
    //       },
    //       {
    //         title: 'SQL access',
    //         description: 'Query raw LLM data with HogQL for custom analysis',
    //       },
    //     ],
    //   },
    // ],
    // questions: [
    //   {
    //     question: 'What are my LLM costs by customer?',
    //   },
    //   {
    //     question: 'Which AI features have the highest error rates?',
    //   },
    //   {
    //     question: 'Are there latency spikes in my LLM calls?',
    //   },
    //   {
    //     question: 'Do AI features improve user retention?',
    //   },
    //   {
    //     question: 'Which prompts are most expensive?',
    //   },
    //   {
    //     question: 'How many tokens does each feature consume?',
    //   },
    //   {
    //     question: "What's the ROI of our AI features?",
    //   },
    //   {
    //     question: 'Which model gives the best cost/performance ratio?',
    //   },
    // ],
    // comparison: {
    //   summary: {
    //     them: [
    //       {
    //         title: "You don't need any product insights",
    //         subtitle: 'and only want to track operational metrics',
    //       },
    //       {
    //         title: 'Deep mobile support',
    //         subtitle: "if you're building a mobile-specific product",
    //       },
    //       {
    //         title: 'You don\'t want to use an open source product',
    //       },
    //     ],
    //     us: [
    //       {
    //         title: 'You want to understand LLM costs on a per user basis',
    //         subtitle: 'in addition to other axes',
    //       },
    //       {
    //         title: 'You want to combine LLM analytics with other tools',
    //         subtitle: 'like Error Tracking and Session Replay',
    //       },
    //       {
    //         title: 'You need easy regulatory compliance for HIPAA and GDPR',
    //         // subtitle: 'Exclude sensitive data with built-in privacy mode',
    //       },
    //     ],
    //   },
    //   companies: [
    //     {
    //       name: 'Langfuse',
    //       key: 'langfuse',
    //       // link: '/blog/posthog-vs-langfuse',
    //     },
    //     {
    //       name: 'Langsmith',
    //       key: 'langsmith',
    //       // link: '/blog/posthog-vs-langsmith',
    //     },
    //     {
    //       name: 'Helicone',
    //       key: 'helicone',
    //       // link: '/blog/posthog-vs-helicone',
    //     },
    //     {
    //       name: 'PostHog',
    //       key: 'posthog',
    //     },
    //   ],
    //   features: [
    //     {
    //       feature: 'Generation tracking',
    //       companies: {
    //         langfuse: true,
    //         langsmith: true,
    //         helicone: true,
    //         posthog: true,
    //       },
    //     },
    //     {
    //       feature: 'Latency tracking',
    //       companies: {
    //         langfuse: true,
    //         langsmith: true,
    //         helicone: true,
    //         posthog: true,
    //       },
    //     },
    //     {
    //       feature: 'Cost tracking, incl. cost-per-user',
    //       companies: {
    //         langfuse: true,
    //         langsmith: false,
    //         helicone: true,
    //         posthog: true,
    //       },
    //     },
    //     {
    //       feature: 'Trace visualization',
    //       companies: {
    //         langfuse: true,
    //         langsmith: true,
    //         helicone: true,
    //         posthog: true,
    //       },
    //     },
    //     {
    //       feature: 'Token tracking',
    //       companies: {
    //         langfuse: true,
    //         langsmith: true,
    //         helicone: true,
    //         posthog: true,
    //       },
    //     },
    //     {
    //       feature: 'Prompt playground',
    //       companies: {
    //         langfuse: true,
    //         langsmith: true,
    //         helicone: true,
    //         posthog: true,
    //       },
    //     },
    //     {
    //       feature: 'Prompt evaluations',
    //       companies: {
    //         langfuse: true,
    //         langsmith: true,
    //         helicone: true,
    //         posthog: false,
    //       },
    //     },
    //     {
    //       feature: 'Alerting',
    //       companies: {
    //         langfuse: false,
    //         langsmith: true,
    //         helicone: true,
    //         posthog: true,
    //       },
    //     },
    //     {
    //       feature: 'SOC 2 compliance',
    //       companies: {
    //         langfuse: true,
    //         langsmith: true,
    //         helicone: true,
    //         posthog: true,
    //       },
    //     },
    //     {
    //       feature: 'HIPAA and GDPR compliance',
    //       companies: {
    //         langfuse: true,
    //         langsmith: true,
    //         helicone: true,
    //         posthog: true,
    //       },
    //     },
    //   ],
    // },
    // pairsWith: [
    //   {
    //     slug: 'product-analytics',
    //     description: 'Correlate AI usage with user behavior and business metrics',
    //   },
    //   {
    //     slug: 'dashboards',
    //     description: 'Build custom dashboards combining LLM and product metrics',
    //   },
    //   {
    //     slug: 'session-replay',
    //     description: 'Watch how users interact with AI features in real sessions',
    //   },
    //   {
    //     slug: 'feature-flags',
    //     description: 'Roll out AI features gradually and test different models',
    //   },
    // ],
    // worksWith: ['product_analytics', 'dashboards', 'session_replay', 'feature_flags'],
    // presenterNotes: {
    //   overview:
    //     "<strong>Presenter notes:</strong> Track conversations, model performance, spans, costs, latency, and traces in LLM applications – all as regular PostHog events - roughly 10x cheaper than other LLM observability tools.",
    // },
}

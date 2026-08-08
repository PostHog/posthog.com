import React from 'react'
import {
    IconBell,
    IconDashboard,
    IconGear,
    IconGlobe,
    IconListTreeConnected,
    IconLlmPromptEvaluation,
    IconMagicWand,
    IconPiggyBank,
    IconPlug,
    IconRewindPlay,
    IconShield,
    IconSparkles,
    IconTarget,
    IconTrends,
    IconUser,
    IconWarning,
} from '@posthog/icons'
import { IconTag } from 'components/OSIcons'
import MCPInstall from 'components/Products/MCPInstall'

export const features = {
    dashboard: {
        title: 'Dashboard',
        headline: 'Dashboard',
        description:
            "Get a comprehensive overview of where your LLM budget goes, who's using AI features, and how they perform.",
        icon: <IconDashboard />,
        color: 'purple',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Dashboardscreenshot_36ce056f2d.png',
                alt: 'AI Observability dashboard',
            },
        ],
    },
    generations: {
        title: 'Generations',
        headline: 'Generations',
        description:
            'Every LLM call becomes a generation. See exactly what went in, what came out, and why it cost you $0.03.',
        icon: <IconSparkles />,
        color: 'yellow',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Generationsscreenshot_cc4d4f107e.png',
                alt: 'AI Observability generations',
            },
        ],
    },
    traces: {
        title: 'Traces',
        headline: 'Traces',
        description:
            'Debug entire conversations, not just individual calls. PostHog automatically captures properties like person, total cost, total latency, and more.',
        icon: <IconListTreeConnected />,
        color: 'seagreen',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/trace_screenshot_1e0bdd0ad3.png',
                alt: 'AI Observability traces',
            },
        ],
    },
    trace_monitoring: {
        title: 'Traces',
        headline: 'Traces',
        description: 'See an interaction timeline including all generation and span events.',
        icon: <IconListTreeConnected />,
        color: 'blue',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_trace_light_e4cea319cb.png',
                srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_trace_dark_f49aa4dd89.png',
                alt: 'LLM trace',
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
    },
    cost_analysis: {
        title: 'Cost analysis',
        headline: 'Cost analysis',
        description: 'Track costs by model, user, feature, and time period to optimize spending and pricing.',
        icon: <IconPiggyBank />,
        color: 'purple',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_cost_light_f2794e4e13.png',
                srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_cost_dark_d1efde15fd.png',
                alt: 'LLM cost analysis',
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
    performance_monitoring: {
        title: 'Performance monitoring',
        headline: 'Performance monitoring',
        description: 'Monitor latency, error rates, and model performance over time.',
        icon: <IconDashboard />,
        color: 'lilac',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_perf_light_d986541535.png',
                srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_perf_dark_4e421717ba.png',
                alt: 'LLM performance monitoring',
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
    users: {
        title: 'Users',
        headline: 'Users',
        description:
            "Spot your power users, your biggest fans, and who's hitting errors. Most teams discover 20% of users drive 80% of costs.",
        icon: <IconUser />,
        color: 'red',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Userscreenshot_0b8d02a617.png',
                alt: 'AI Observability users',
            },
        ],
    },
    errors: {
        title: 'Errors',
        headline: 'Errors',
        description:
            'Debug failed LLM calls and monitor exception rates with the full story: prompt, response, parameters, and metadata – the context agents use to fix what broke.',
        icon: <IconWarning />,
        color: 'yellow',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/errorscreenshot_6b30e34a4e.png',
                alt: 'AI Observability errors',
            },
        ],
    },
    sessions: {
        title: 'Sessions',
        headline: 'Sessions',
        description:
            'See complete user sessions with all LLM activity. Spot the difference: engaged at length, or stuck in a loop.',
        icon: <IconRewindPlay />,
        color: 'yellow',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/sessions_screenshot_d6fc106ce9.png',
                alt: 'AI Observability sessions',
            },
        ],
    },
    playground: {
        title: 'Playground',
        headline: 'Playground',
        description:
            'Iterate system prompts without pushing code. Swap models, adjust tools, test the cursed inputs users will inevitably throw at you.',
        icon: <IconMagicWand />,
        color: 'purple',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/playgroundscreenshot_29797c78d6.png',
                alt: 'AI Observability playground',
            },
        ],
    },
    evaluations: {
        title: 'Evaluations',
        headline: 'Evaluations',
        description:
            'Catch regressions before users do. Run evals for hallucinations, toxicity, relevance, helpfulness, jailbreak attempts, or custom criteria.',
        icon: <IconLlmPromptEvaluation />,
        color: 'blue',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/evaluations_screenshot_959ba893da.png',
                alt: 'AI Observability evaluations',
            },
        ],
    },
    // Prompts was commented out on the old slides page – preserved here until the
    // feature ships a screenshot of its own.
    // prompts: {
    //     title: 'Prompts',
    //     headline: 'Prompts',
    //     description: 'Create, manage, and version control your prompts from a central location',
    // },
    analysis: {
        title: 'Analysis',
        headline: 'Go beyond basic metrics',
        description:
            'LLM observability tools tell you "how many calls?" AI Observability shows how your AI features drive retention, revenue, and engagement.',
        icon: <IconTrends />,
        color: 'blue',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/LLM_features_analysis_500cdd8b92.png',
                alt: 'AI Observability analysis',
            },
        ],
        features: [
            {
                title: 'Correlation analysis',
                description:
                    'Connect AI performance to real business metrics. LLM traces, product analytics, session replay, and A/B testing in one tool.',
            },
            {
                title: 'Funnel analysis',
                description:
                    'Track users through the entire product journey. Pinpoint where they drop off, and how AI was involved – latency, output quality, or UX.',
            },
            {
                title: 'Cohort analysis',
                description:
                    'Compare AI power users vs tourists. Are frequent users your best customers or just more expensive? Do they convert? Upgrade? Now you have answers.',
            },
        ],
    },
    customizations: {
        title: 'Customizations',
        headline: 'Customizations',
        description:
            'AI Observability works best when you can analyze prompts, cost, and latency alongside events and metrics that matter to you.',
        icon: <IconGear />,
        color: 'seagreen',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/LLM_features_70ab277d76.png',
                alt: 'AI Observability customizations',
            },
        ],
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
    },
    native_integrations: {
        title: 'Native integrations',
        headline: 'Simple SDKs for popular LLM providers',
        description:
            'Instrument any LLM. Use PostHog-maintained wrappers for popular providers, or manual capture for everything else.',
        // The provider grid itself lives in `slides.tsx` – it needs the logo imports.
        footnote: 'Using another LLM observability tool? Analyze that data alongside product usage in PostHog.',
    },
    mcp: {
        title: 'MCP',
        headline: 'Query LLM traces from your editor',
        description:
            'Check LLM costs, monitor errors, and analyze model performance from Cursor, Claude Code, VS Code, or any MCP-compatible agent.',
        icon: <IconPlug />,
        color: 'blue',
        features: [
            {
                title: 'Check costs before and after deploys',
                description: 'Compare LLM spend across periods to spot unexpected jumps before they compound.',
            },
            {
                title: 'Monitor errors',
                description: 'Surface failing LLM calls so your agent can flag or fix them immediately.',
            },
            {
                title: 'Compare models',
                description: 'Evaluate cost, latency, and token usage across models to pick the right one per feature.',
            },
            {
                title: 'Find expensive traces',
                description: 'Drill into individual calls to identify optimization opportunities.',
            },
        ],
        children: <MCPInstall />,
    },
}

import React from 'react'
import {
    IconBell,
    IconBolt,
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
        description: "See where your LLM budget goes, who's using AI features, and how they perform.",
        icon: <IconDashboard />,
        color: 'purple',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/dashboard_screenshot_ce72bbf715.png',
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
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/generations_2_77391c6768.png',
                alt: 'A list of LLM generations with person, sentiment, model, and latency',
            },
        ],
        features: [
            {
                title: 'Full conversation context',
                description: 'The exact input and output of every call, including multi-turn history',
            },
            {
                title: 'Tokens and cost',
                description: 'Token counts per call, with cost calculated automatically from model pricing',
            },
            {
                title: 'Tool calls',
                description: 'Which tools the model called and what they returned',
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
        title: 'Tracing',
        headline: 'Trace every conversation end to end',
        description:
            'Debug entire conversations, not just individual calls. Every trace is a timeline of its generations and spans, with the person, total cost, and total latency attached.',
        icon: <IconListTreeConnected />,
        color: 'blue',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/trace_detail_2_e0a6a23865.png',
                alt: 'An LLM trace with its timeline, tree, and generation detail',
            },
        ],
        // Merged tracing + generations flow – the two were separate top features
        // saying the same thing.
        features: [
            {
                icon: <IconListTreeConnected />,
                title: 'Trace timeline',
                description: 'A waterfall of every span and generation, with latency and cost at each step',
            },
            {
                icon: <IconSparkles />,
                title: 'Full conversation context',
                description: 'The exact input and output of every call, including multi-turn history and tool calls',
            },
            {
                icon: <IconTag />,
                title: 'Tokens and cost',
                description: 'Token counts per call, with cost calculated automatically from model pricing',
            },
            {
                icon: <IconRewindPlay />,
                title: 'Integrated session recordings',
                description: 'Jump from a trace to the session recording and watch what the response did in your UI',
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
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/aio_costs_70f4cf9fdd.png',
                alt: 'Total LLM cost and cost by model insights',
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
                description: 'See which users or organizations drive spend, with full person profiles behind each',
            },
            {
                icon: <IconSparkles />,
                title: 'Cost by custom tags',
                description: 'Break down spending by feature, environment, or any metadata you attach',
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
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/performance_cf8ee79962.png',
                alt: 'Generation latency by model and error rate insights',
            },
        ],
        features: [
            {
                icon: <IconDashboard />,
                title: 'Latency tracking',
                description: 'Track response times and find the slow prompts, models, and workflow steps',
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
                title: 'Anomaly alerts',
                description:
                    'Detectors learn what normal looks like and notify you when cost, latency, or errors spike',
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
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/users_2_9211062ba1.png',
                alt: 'The AI observability users list with per-user generations, cost, and latency',
            },
        ],
        features: [
            {
                title: 'Per-user roll-ups',
                description: 'Generations, traces, cost, and latency for every person',
            },
            {
                title: 'Full person profiles',
                description: 'Jump from an expensive user to their events, sessions, and replays',
            },
        ],
    },
    errors: {
        title: 'Error analysis',
        headline: 'Error analysis',
        description:
            'Debug failed LLM calls and monitor exception rates with the full story: prompt, response, parameters, and metadata – the context agents use to fix what broke.',
        icon: <IconWarning />,
        color: 'yellow',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2026_08_12_at_4_26_05_PM_13782e124a.png',
                alt: 'The AI observability errors view with failed generations and exception rates',
            },
        ],
        features: [
            {
                title: 'Failed generations',
                description: 'Every failed call listed with its prompt, parameters, and provider error',
            },
            {
                title: 'Error tracking integration',
                description: 'LLM exceptions become issues you can triage, assign, and resolve',
            },
            {
                title: 'Error rate alerts',
                description: 'Anomaly detection fires when failures spike above your normal',
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
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/playground_screenshot_2_3364a67436.png',
                alt: 'AI Observability playground',
            },
        ],
    },
    evaluations: {
        title: 'Evaluations',
        headline: 'Evaluations',
        description:
            'Score live generations as they happen across hallucinations, toxicity, relevance, or custom criteria. Catch regressions before users do.',
        icon: <IconLlmPromptEvaluation />,
        color: 'blue',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/evals_3_0bd750f334.png',
                alt: 'Online evals overview with pass rate and configured evaluations',
            },
        ],
        features: [
            {
                title: 'LLM-as-a-judge',
                description: 'An LLM scores each generation against a prompt you define',
            },
            {
                title: 'Code-based (Hog)',
                description: 'Deterministic checks written in code',
            },
            {
                title: 'Sentiment analysis',
                description: 'Classifies user sentiment as positive, neutral, or negative',
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
    // Copy verified against the Self-driving docs (/docs/self-driving) and the
    // start-here quest log.
    self_driving: {
        title: 'Self-driving',
        headline: 'From LLM data to pull request',
        description:
            'Agents watch your LLM data, investigate issues, and file reports in your inbox – where one click turns it into a pull request.',
        icon: <IconBolt />,
        color: 'green',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/self_driving_3_832275c1ac.png',
                alt: 'Scout templates in the AI observability Self-driving tab',
            },
        ],
        features: [
            {
                title: 'Eval reports',
                description:
                    'An agent reviews each batch of evaluation results and summarizes what it found, with example generations as evidence',
            },
            {
                title: 'Anomaly investigations (alpha)',
                description:
                    'When an anomaly alert fires on cost, latency, or errors, an agent digs into the underlying traces and suppresses false positives',
            },
            {
                title: 'Scouts',
                description:
                    'Scheduled agents that watch for anything you describe in plain English. Plus we have templates to get you started!',
            },
        ],
    },
    native_integrations: {
        title: 'Native integrations',
        headline: 'Instrument any LLM stack',
        description:
            'PostHog-maintained wrappers for the major providers, 40+ documented integrations across gateways and agent frameworks, and manual capture for anything we missed.',
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

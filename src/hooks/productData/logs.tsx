import React from 'react'
import {
    IconActivity,
    IconEye,
    IconSparkles,
    IconList,
    IconRocket,
    IconPieChart,
    IconCheckCircle,
    IconCursorClick,
    IconChat,
    // IconInfo,
    // IconMagic,
    // IconCode,
    // IconMessage,
    // IconConfetti,
} from '@posthog/icons'
import { features } from './logs/features'
import { applications, topFeatures } from './logs/slides'
import { getTool } from '../../data/tools'

export const logs = {
    ...getTool('logs'),
    Icon: IconActivity,
    productVariantName: 'Logs ingestion (14-day retention)',
    type: 'logs',
    teamSlug: 'apm',
    // forumTopicId: /* TODO: community topic ID for /questions/topic/logs */,
    color: 'red',
    colorSecondary: 'green-2',
    wizardSupport: 'Coming soon',
    includeAddonRates: true,
    // From contents/docs/logs/pricing.mdx
    pricingDescription:
        'Logs is billed by the number of GB ingested. The price per GB changes based on your usage. Retention is 14 days by default; extend newly ingested logs to 30 days with an add-on.',
    seo: {
        title: 'Logs – Centralized log management with PostHog',
        description:
            'Works with your existing OTel setup. Backend context, user data, and session replays in one place – the context agents use to find a bug and ship the fix.',
    },
    /**
     * Sections rendered on the Product surface (`/logs`). Each entry
     * resolves to a section template via `templateRegistry[item.template ?? item.slug]`,
     * so the slug doubles as the lookup key when no explicit `template` is set.
     * `props` is passed straight to the resolved section component (used here to
     * feed the carousel templates their slide arrays).
     */
    productMenu: [
        { slug: 'overview', name: 'Overview', icon: <IconEye className="size-4" /> },
        // CONTENT GAP: needs overview.eli5 (see session_replay.overview.eli5)
        // {
        //     slug: 'eli5',
        //     name: 'What does it do?',
        //     hideFromNav: true,
        //     group: 'divided',
        //     icon: <IconInfo className="size-4" />,
        // },
        // CONTENT GAP: needs useCases { intro, rows: [role, useCase][] }
        // {
        //     slug: 'use-cases',
        //     name: 'Who is it for?',
        //     hideFromNav: true,
        //     group: 'divided',
        //     icon: <IconMagic className="size-4" />,
        // },
        {
            slug: 'applications',
            name: 'How do I use it?',
            group: 'divided',
            icon: <IconCursorClick className="size-4" />,
            props: { slides: applications },
        },
        {
            slug: 'top-features',
            name: 'Top features',
            group: 'divided',
            icon: <IconSparkles className="size-4" />,
            props: { slides: topFeatures },
        },
        {
            slug: 'ask-anything',
            name: 'AI prompts',
            group: 'divided',
            icon: <IconChat className="size-4" />,
        },
        // CONTENT GAP: needs installation.description (+ confirm categories;
        // taxonomy slug mismatches for javascript→web and ruby-on-rails→rails)
        // {
        //     slug: 'installation',
        //     name: 'Install',
        //     group: 'divided',
        //     icon: <IconCode className="size-4" />,
        // },
        {
            slug: 'feature-comparison',
            name: 'Feature comparison',
            group: 'divided',
            icon: <IconList className="size-4" />,
        },
        // CONTENT GAP: needs forumTopicId for CommunityQuestions
        // { slug: 'community', name: 'Questions?', group: 'divided', icon: <IconMessage className="size-4" /> },
        // CONTENT GAP: pairsWith was commented out on the old page – write descriptions first
        // { slug: 'pairs-with', name: 'Pairs with...', hideFromNav: true, icon: <IconConfetti className="size-4" /> },
        { slug: 'getting-started', name: 'Get started', group: 'divided', icon: <IconRocket className="size-4" /> },
    ],
    /**
     * Sections rendered on the Pricing surface (`/logs/pricing`).
     * Same shape as `productMenu`.
     */
    pricingMenu: [
        { slug: 'plans', name: 'Plans', icon: <IconCheckCircle className="size-4" /> },
        { slug: 'calculator', name: 'Pricing calculator', icon: <IconPieChart className="size-4" /> },
        { slug: 'comparison-summary', name: 'PostHog vs...', icon: <IconList className="size-4" /> },
        // Hidden footer CTA rendered at the bottom of the Pricing surface.
        { slug: 'pricing-cta', name: 'Get started', hideFromNav: true },
    ],
    overview: {
        title: 'Logs that already know your users',
        description:
            'Works with your existing OTel setup. Events, requests, state changes, and session replays in one place – one of the tools that makes your product self-driving by giving agents the backend signal to find a bug and ship the fix, tied to the user who hit it.',
        // eli5: /* TODO: plain-language explanation – see session_replay.overview.eli5 */,
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
    hogs: {
        default: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/log_hog_55f5aaca56.png',
            alt: 'A hedgehog perusing some logs',
        },
        // mobileHog: /* TODO: hog used by Eli5 float – see session_replay.hogs.mobileHog */,
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
    slider: {
        // Values in GB (display_friendly=true converts MB to GB)
        marks: [0, 10, 50, 100, 500, 1000, 5000],
        min: 10,
        scaleMin: 1,
        max: 5000,
    },
    volume: 10,
    addonSliders: [
        {
            key: 'logs_retention_30d',
            label: '30-day retention',
            sliderConfig: {
                marks: [0, 10, 50, 100, 500, 1000, 5000],
                min: 0,
                scaleMin: 1,
                max: 5000,
            },
            volume: 0,
            unit: 'GB',
            freeAllocation: 0,
        },
    ],
    customers: {
        key: {
            headline: '',
            description: '',
        },
    },
    // useCases: {
    //     intro: 'Logs is used across teams depending on your role.',
    //     rows: [
    //         ['Product Engineers', '…'],
    //         ['Support', '…'],
    //         // see session_replay.useCases for shape
    //     ],
    // },
    features,
    mcp: {
        title: 'MCP',
        headline: 'Debug logs from your editor',
        description:
            'Let your coding agent query logs, mine patterns, and manage alerts from Cursor, Claude Code, VS Code, or any MCP-compatible agent.',
    },
    // installation: {
    //     title: 'Install',
    //     headline: 'Install',
    //     description: /* TODO: one-liner – see session_replay.installation.description */,
    //     productSlug: 'logs',
    //     // Docs exist for: nodejs, python, go, java, nextjs, javascript, react-native,
    //     // ios, android, flutter, ruby-on-rails, datadog, other.
    //     // Taxonomy mismatches: javascript ≠ web, ruby-on-rails ≠ rails.
    //     categories: ['web', 'mobile', 'backend-languages', 'backend-frameworks'],
    // },
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
                    title: 'Agents can act on your logs to find a bug and ship the fix – the context that powers self-driving',
                },
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
    ai: {
        // image: /* TODO: dedicated AI/hog art – AskAnything falls back if omitted */,
        imageAlt: 'PostHog AI and logs',
        description: 'find the bug in your logs and ship the fix',
        // intro: /* TODO: one sentence before example prompts – see session_replay.ai.intro */,
        mcpFeatures: ['logs'],
        skills: [
            'Finds the exact log lines you need with natural language – no query syntax required',
            'Summarizes patterns, surfaces anomalies, and explains likely causes from a sea of log entries',
            'Connects log entries to related session replays, errors, and analytics for full debugging context',
        ],
        // Groups reshape the old `prompts` plus example prompts from
        // contents/docs/logs/surfaces/mcp.mdx. Tool names verified against mcp-tools.json.
        groups: [
            {
                title: 'Query',
                tool: 'query-logs',
                prompts: [
                    'Show me all error-level logs from the payments service in the last hour',
                    'Show me all error logs from the last hour',
                    'Find logs related to the spike in 500 errors after the latest deploy',
                    'Find logs related to trace ID abc123',
                    'Show me warning and error logs from the last 24 hours, excluding debug noise',
                ],
            },
            {
                title: 'Patterns',
                tool: 'logs-patterns',
                prompts: ["Summarize the most common errors users hit yesterday and what's causing them"],
            },
            {
                title: 'Compare windows',
                tool: 'logs-patterns-diff',
                prompts: ["Compare log patterns from today against yesterday and show me what's new"],
            },
            {
                title: 'Explore schema',
                tool: 'logs-attributes-list',
                prompts: ['What log attributes are available? Show me the values for service.name'],
            },
            {
                title: 'Services',
                tool: 'logs-services-create',
                prompts: ['What services are logging errors? Search for error logs from the payments service'],
            },
        ],
    },
    // presenterNotes: {
    //     overview:
    //         '<strong>Presenter notes:</strong> Track conversations, model performance, spans, costs, latency, and traces in LLM applications – all as regular PostHog events - roughly 10x cheaper than other LLM observability tools.',
    // },
}

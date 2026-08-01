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
    IconInfo,
    IconMagic,
    IconCode,
    IconConfetti,
} from '@posthog/icons'
import { HedgehogMagnifyingGlass } from '@posthog/brand/hoggies'
import { features } from './logs/features'
import { applications, topFeatures } from './logs/slides'
import { getTool } from '../../data/tools'

const logsHogAlt = 'A hedgehog inspecting logs with a magnifying glass'

export const logs = {
    ...getTool('logs'),
    Icon: IconActivity,
    productVariantName: 'Logs ingestion (14-day retention)',
    type: 'logs',
    teamSlug: 'apm',
    // No community topic for Logs yet (checked Squeak topics API – none with slug "logs").
    // forumTopicId: /* create topic, then uncomment community menu item below */,
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
        {
            slug: 'eli5',
            name: 'What does it do?',
            hideFromNav: true,
            group: 'divided',
            icon: <IconInfo className="size-4" />,
        },
        {
            slug: 'use-cases',
            name: 'Who is it for?',
            hideFromNav: true,
            group: 'divided',
            icon: <IconMagic className="size-4" />,
        },
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
        {
            slug: 'installation',
            name: 'Install',
            group: 'divided',
            icon: <IconCode className="size-4" />,
        },
        {
            slug: 'feature-comparison',
            name: 'Feature comparison',
            group: 'divided',
            icon: <IconList className="size-4" />,
        },
        // Needs forumTopicId once a Logs community topic exists.
        // { slug: 'community', name: 'Questions?', group: 'divided', icon: <IconMessage className="size-4" /> },
        { slug: 'pairs-with', name: 'Pairs with...', hideFromNav: true, icon: <IconConfetti className="size-4" /> },
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
            'Events, requests, state changes, and session replays in one place – one of the tools that makes your product self-driving by giving agents the backend signal to find a bug and ship the fix, tied to the user who hit it.',
        eli5: 'Logs stores the records your services emit at runtime – requests handled, errors hit, decisions made – so you can search by service, severity, and attribute instead of grepping text files. Point any OpenTelemetry (OTLP) client at PostHog (no proprietary SDK), group similar lines into patterns to see what changed, and open any record to have PostHog AI explain it.',
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
        footerClasses: 'max-w-[240px]',
    },
    hogs: {
        default: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/log_hog_55f5aaca56.png',
            alt: 'A hedgehog perusing some logs',
        },
        mobileHog: {
            Component: HedgehogMagnifyingGlass,
            alt: logsHogAlt,
        },
    },
    screenshots: {
        overview: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/logs_overview_5408b3bed3.png',
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
        min: 0,
        scaleMin: 1,
        max: 5000,
    },
    volume: 10,
    freeAllocationText: 'First 10 GB free – every month!',
    addonSliders: [
        {
            key: 'logs_retention_30d',
            label: '30-day retention',
            // Billing meters all ingested GB (any retention) on the base logs product, then bills
            // 30-day GB again at the add-on rate as a storage premium.
            countsTowardParentVolume: true,
            note: 'These GB also count toward logs ingestion above – this price is just the added cost of storing them longer.',
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
    // Roles/scenarios reshaped from contents/docs/logs/basics.mdx ("When logs save you")
    // and link-person / link-session-replay docs.
    useCases: {
        intro: 'Logs is used across teams depending on your role.',
        rows: [
            [
                'Product Engineers',
                "Debug production issues that analytics and error tracking alone can't explain – cache misses, third-party lag, silent parse failures",
            ],
            [
                'Support Engineers',
                'Jump from a person profile or session replay to every backend log written while that user was active',
            ],
            [
                'Platform / DevOps',
                'Alert on error volume by service, mine patterns after a deploy, and catch services that go quiet',
            ],
            [
                'Backend Engineers',
                'Inspect background jobs and request paths with no UI – the only window when something vanishes into a black box',
            ],
            [
                'AI-assisted teams',
                'Let coding agents query structured logs over MCP to find the bug and draft the fix without leaving the editor',
            ],
        ],
    },
    features,
    mcp: {
        title: 'MCP',
        headline: 'Debug logs from your editor',
        description:
            'Let your coding agent query logs, mine patterns, and manage alerts from Cursor, Claude Code, VS Code, or any MCP-compatible agent.',
    },
    // Description from contents/docs/logs/installation/index.mdx
    installation: {
        title: 'Install',
        headline: 'Install',
        description:
            "PostHog Logs works with any OpenTelemetry-compatible client. You don't need any PostHog-specific packages – just use standard OpenTelemetry libraries.",
        productSlug: 'logs',
        categories: ['web', 'mobile', 'backend-languages', 'backend-frameworks'],
    },
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
            },
            {
                name: 'Better Stack',
                key: 'better_stack',
            },
            {
                name: 'Datadog',
                key: 'datadog',
            },
            {
                name: 'Elastic',
                key: 'elastic',
            },
            {
                name: 'PostHog',
                key: 'posthog',
            },
        ],
        rows: ['logs', 'logs.pricing.features'],
        excluded_sections: ['platform', 'pricing'],
    },
    // Descriptions reshaped from contents/docs/logs/basics.mdx + link-session-replay / link-person
    pairsWith: [
        {
            slug: 'session-replay',
            description:
                'Navigate from a log entry directly to the session replay to see what the user was doing when the backend failed',
        },
        {
            slug: 'error-tracking',
            description: 'See Error Tracking issues that occurred during the same session directly in the log details',
        },
        {
            slug: 'product-analytics',
            description:
                'Go from a log line to product analytics for the same user – what they did, which path they took, and what broke in between',
        },
        {
            slug: 'feature-flags',
            description:
                'Include flag variants in log context so you can see which experiment or rollout a failing request was on',
        },
    ],
    worksWith: ['session_replay', 'error_tracking', 'product_analytics', 'feature_flags'],
    ai: {
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/log_hog_55f5aaca56.png',
        imageAlt: 'PostHog AI and logs',
        description: 'find the bug in your logs and ship the fix',
        intro: 'Ask PostHog AI to find error logs, mine patterns, and explain what changed.',
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
}

import React from 'react'
import {
    IconChat,
    IconCheckCircle,
    IconConfetti,
    IconCursorClick,
    IconEye,
    IconInfo,
    IconList,
    IconLlmAnalytics,
    IconMagic,
    IconMessage,
    IconPieChart,
    IconRocket,
    IconSparkles,
} from '@posthog/icons'
import { getTool } from '../../data/tools'
import { features } from './ai_observability/features'
import { applications, topFeatures } from './ai_observability/slides'

export const aiObservability = {
    ...getTool('ai_observability'),
    Icon: IconLlmAnalytics,
    type: 'ai_observability',
    // The billing service still exposes this product under its original type
    // (`llm_analytics`) from before the "AI Observability" rename. Billing data is
    // joined on this value so pricing/calculator surfaces can find it.
    billingType: 'llm_analytics',
    teamSlug: 'ai-observability',
    // Community topic is still labelled `llm-analytics` in the forum.
    forumTopicId: 390,
    color: 'purple',
    colorSecondary: 'green-2',
    wizardSupport: true,
    pricingDescription:
        'Generations, spans, and traces are captured as regular PostHog events and billed like them – no per-seat pricing, and no markup on the tokens you already pay your model provider for.',
    seo: {
        title: 'AI Observability – Observe and optimize AI products in PostHog',
        description:
            'Monitor and optimize AI products with AI Observability. Get full observability across every conversation. See model performance, cost, and errors.',
    },
    /**
     * Sections rendered on the Product surface (`/ai-observability`). Each entry
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
        { slug: 'pairs-with', name: 'Pairs with...', hideFromNav: true, icon: <IconConfetti className="size-4" /> },
        {
            slug: 'feature-comparison',
            name: 'Feature comparison',
            group: 'divided',
            icon: <IconList className="size-4" />,
        },
        { slug: 'community', name: 'Questions?', group: 'divided', icon: <IconMessage className="size-4" /> },
        // No `installation` section: the shared install taxonomy has no LLM provider
        // category, so it would list generic web/backend SDKs instead of the
        // per-provider guides. The provider grid lives in the Integrations slide of
        // `top-features` until the taxonomy gains an LLM category.
        { slug: 'getting-started', name: 'Get started', group: 'divided', icon: <IconRocket className="size-4" /> },
    ],
    /**
     * Sections rendered on the Pricing surface (`/ai-observability/pricing`).
     * Same shape as `productMenu`. Plans/calculator resolve billing through
     * `billingType`.
     */
    pricingMenu: [
        { slug: 'plans', name: 'Plans', icon: <IconCheckCircle className="size-4" /> },
        { slug: 'calculator', name: 'Pricing calculator', icon: <IconPieChart className="size-4" /> },
        { slug: 'comparison-summary', name: 'PostHog vs...', icon: <IconList className="size-4" /> },
        // Hidden footer CTA rendered at the bottom of the Pricing surface.
        { slug: 'pricing-cta', name: 'Get started', hideFromNav: true },
    ],
    overview: {
        title: 'Observe and debug AI in production',
        description:
            'Product analytics for LLMs. Inspect traces, spans, latency, usage, and per-user costs for AI-powered features – the context agents use to fix LLM behavior.',
        eli5: "AI Observability records every call your product makes to an LLM – the prompt that went in, the response that came out, which model answered, how long it took, what it cost, and who it was for. Calls that belong to the same conversation or agent run are stitched together into a trace, so a multi-step interaction reads as one story instead of a pile of unrelated requests. It's all captured as regular PostHog events, which is why your LLM data sits next to your product analytics, replays, and errors instead of in a separate tool.",
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
            alt: 'AI Observability dashboard',
            classes: '',
            classesMobile: '',
            imgClassesMobile: '',
        },
        home: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_llm_analytics_light_a436da72f7.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_llm_analytics_dark_d8f32c249b.png',
            alt: 'AI Observability screenshot',
            classes: 'justify-end items-end pl-4 @lg:pl-6',
            imgClasses: 'rounded-tl-md shadow-2xl',
        },
    },
    // Rendered in the Pricing surface footer CTA. The Product surface uses `hogs` below.
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_cash_64f561fac6.png',
        alt: 'A hedgehog showered in the money it saved on tokens',
        footerClasses: 'max-w-[220px]',
    },
    hogs: {
        default: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/pasted_image_2026_07_30_T02_00_13_105_Z_20a891ad6d.png',
            alt: 'A hedgehog inspecting a trace with a magnifying glass',
        },
        // Reused from the /docs/ai-observability hero – AI Observability has no
        // dedicated product hog yet.
        mobileHog: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/ai_robo_hog_9c1c225c94.png',
            alt: 'A hedgehog with a robot',
        },
    },
    slider: {
        marks: [100000, 1000000, 10000000, 100000000],
        min: 100000,
        max: 100000000,
    },
    volume: 100000,
    customers: {
        kilocode: {
            headline: 'keeps visibility into what its AI coding platform is actually doing',
            description:
                'Everything we do is about speed. PostHog helps us move fast without losing visibility into what’s actually happening.',
        },
        lovable: {
            headline: 'compared us to every other observability tool, just to be sure',
            description:
                "If you're building a new product, just use PostHog. It's a no-brainer. It's the only all-in-one platform like it for developers.",
        },
        posthog: {
            headline: 'monitors the usage and performance of PostHog AI with AI Observability',
            description:
                'We use our own AI observability product to attribute costs, monitor latency and errors, compare models, and iterate on prompts in production.',
        },
    },
    useCases: {
        intro: 'AI Observability is used across teams depending on your role.',
        rows: [
            ['AI Engineers', 'Debug traces span by span and compare models on cost, latency, and quality'],
            ['Product Engineers', 'Tie failed generations and latency spikes back to the users who hit them'],
            ['PMs', 'See which AI features people actually use, and whether using them changes retention'],
            ['Finance & leadership', 'Attribute token spend to models, features, and individual customers'],
            ['Support Engineers', 'Read the exact conversation behind a ticket, then watch the session it happened in'],
        ],
    },
    features,
    postHogOnPostHog: {
        title: 'How PostHog uses AI Observability',
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
    answersHeadline: 'What can AI Observability help me discover?',
    answersDescription: 'Track costs, performance, and usage of your AI features with detailed analytics',
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
                    title: 'Agents can act on your LLM traces, costs, and errors – the context that makes your product self-driving',
                },
                {
                    title: 'You want to understand LLM costs on a per user basis',
                    subtitle: 'in addition to other axes',
                },
                {
                    title: 'You want to combine AI Observability with other tools',
                    subtitle: 'like Error Tracking and Session Replay',
                },
                {
                    title: 'You need easy regulatory compliance for HIPAA and GDPR',
                },
            ],
        },
        companies: [
            {
                name: 'Langfuse',
                key: 'langfuse',
            },
            {
                name: 'Langsmith',
                key: 'langsmith',
            },
            {
                name: 'Helicone',
                key: 'helicone',
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
        rows: ['ai_observability'],
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
    ai: {
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_cde5a95040.png',
        imageAlt: 'PostHog AI and AI Observability',
        intro: 'Ask PostHog AI to check what your LLM calls cost, dig into traces, and compare models.',
        mcpFeatures: ['llm_analytics'],
        // Prompts lifted from contents/docs/ai-observability/query-traces-mcp.mdx.
        // Tool names verified against src/data/mcp-tools.json; groups without a
        // `tool` cover prompts whose tool routing isn't documented. Note that
        // `query-llm-traces-list` is filed under the `insights` MCP feature, so it
        // doesn't appear in the Tools tab unless `insights` is added above.
        groups: [
            {
                title: 'Costs',
                tool: 'get-llm-total-costs-for-project',
                prompts: [
                    'What are my total LLM costs this week, broken down by model?',
                    "What's my LLM spend today vs yesterday?",
                ],
            },
            {
                title: 'Find traces',
                tool: 'query-llm-traces-list',
                prompts: [
                    'Find the most expensive LLM calls from the last 24 hours.',
                    'Show me traces where a single call cost more than $0.50.',
                    'Show me the most expensive LLM call from today',
                ],
            },
            {
                title: 'Errors',
                prompts: ['Are there any LLM errors today?', 'Are there any LLM errors in the last hour?'],
            },
            {
                title: 'Compare models',
                prompts: [
                    'Compare token usage between GPT-4 and Claude for the search feature.',
                    'Compare latency between GPT-4 and Claude for the chat feature',
                    'How has LLM latency changed over the past 7 days?',
                ],
            },
        ],
    },
    presenterNotes: {
        overview:
            '<strong>Presenter notes:</strong> Track conversations, model performance, spans, costs, latency, and traces in LLM applications – all as regular PostHog events - roughly 10x cheaper than other LLM observability tools.',
    },
}

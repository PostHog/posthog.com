import React from 'react'
import {
    IconArrowUpRight,
    IconChat,
    IconCheckCircle,
    IconConfetti,
    IconCursorClick,
    IconEye,
    IconList,
    IconLlmAnalytics,
    IconMagic,
    IconMessage,
    IconPieChart,
    IconRocket,
    IconSparkles,
    IconWarning,
} from '@posthog/icons'
import OldWaySection from 'components/AIObservability/OldWaySection'
import PostHogWaySection from 'components/AIObservability/PostHogWaySection'
import Link from 'components/Link'
import { getTool } from '../../data/tools'
import { features } from './ai_observability/features'
import { applications, topFeatures, wizardSupports } from './ai_observability/slides'

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
    // Volume id in src/constants/pocketGuides.ts. Set it and the shared Questions section links
    // the product's pocket guide; products without a volume leave it out and show nothing.
    pocketGuideVolume: 'ai-observability',
    color: 'purple',
    colorSecondary: 'green-2',
    wizardSupport: true,
    // Wizard subcommand appended to `npx @posthog/wizard` in the hero and Get
    // started install CTAs – the bare wizard installs a generic SDK instead of
    // instrumenting LLM calls.
    wizardCommand: 'ai-observability',
    // The install CTAs list LLM providers instead of app frameworks – that's
    // what the ai-observability wizard actually instruments.
    wizardSupports,
    // Volume-pricing floor shown in the Get started section (see /docs/ai-observability/start-here).
    pricingFloor: '0.00006',
    pricingDescription:
        'Generations, spans, and traces are captured as regular PostHog events and billed like them – no per-seat pricing, and no markup on the tokens you already pay your model provider for.',
    seo: {
        title: 'AI Observability – Observe and optimize AI products in PostHog',
        description:
            'Monitor and optimize AI products with AI Observability. Trace every generation, score quality with evals, alert on anomalies, and turn findings into PRs.',
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
            slug: 'old-way',
            name: 'The old way',
            component: OldWaySection,
            group: 'divided',
            icon: <IconWarning className="size-4" />,
        },
        {
            slug: 'posthog-way',
            name: 'The PostHog way',
            component: PostHogWaySection,
            group: 'divided',
            icon: <IconSparkles className="size-4" />,
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
            slug: 'use-case-ramp',
            name: 'Ramp to self-driving',
            template: 'use-case-ramp',
            group: 'divided',
            icon: <IconArrowUpRight className="size-4" />,
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
        title: 'Observe and fix AI in production',
        description:
            'Trace agent loops, evaluate live traffic, and get alerted when cost, latency, or quality slips. Self-driving uses this context to automatically make improvements and fix issues.',
        // eli5 retired in favor of the old-way/PostHog-way sections – same story,
        // told as the two flow diagrams.
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
        // The detective hog is the product's identity – every hog slot on the
        // page uses it (per review).
        default: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/pasted_image_2026_07_30_T02_00_13_105_Z_20a891ad6d.png',
            alt: 'A hedgehog inspecting a trace with a magnifying glass',
        },
        // `mobileHog` renders on the Overview hero screenshot.
        mobileHog: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/pasted_image_2026_07_30_T02_00_13_105_Z_20a891ad6d.png',
            alt: 'A hedgehog inspecting a trace with a magnifying glass',
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
            headline: 'keeps visibility into what its AI coding platform is doing',
            description:
                'Everything we do is about speed. PostHog helps us move fast without losing visibility into what’s actually happening.',
        },
        posthog: {
            headline: 'monitors the usage and performance of PostHog AI with AI Observability',
            description:
                'We use our own AI observability product to attribute costs, monitor latency and errors, compare models, and iterate on prompts in production.',
        },
    },
    useCases: {
        intro: 'Different teams pull different answers from the same LLM data.',
        rows: [
            ['AI Engineers', 'Debug traces span by span and set up evals to catch quality regressions'],
            ['Product Engineers', 'Tie failed generations and latency spikes back to the users who hit them'],
            ['PMs', 'See which AI features get used – and whether using them changes retention'],
            ['Finance & leadership', 'Attribute token spend to models, features, and individual customers'],
            ['Support Engineers', 'Read the exact conversation behind a ticket, then watch the session it happened in'],
        ],
    },
    useCaseRamp: {
        intro: 'AI Observability works at three levels. You can read the traces yourself, ask an agent what your AI features cost and how fast they are, or let PostHog work proactively with your data.',
        scenario: 'Your token spend doubles overnight (wtf?!)',
        columns: [
            {
                level: 'Do it yourself',
                surfaces: ['web'],
                scenario: {
                    icon: 'IconLlmAnalytics',
                    steps: [
                        'The invoice from your model provider comes in higher than last month, so you open the cost dashboard',
                        'You break spend down by model, then by feature, and find one prompt sending far more tokens than you expected',
                        'You open a trace from that feature, then edit and trim that prompt in Prompt management',
                    ],
                },
                points: [
                    {
                        title: 'You can already alert on this',
                        icon: 'IconHandwave',
                        body: 'A native anomaly detection alert on the AI Observability dashboard can flag cost spikes before you think to check. Finding the cause of the spike is still on you, though.',
                    },
                    {
                        title: 'Point an agent at it instead',
                        icon: 'IconSparkles',
                        body: 'Every generation is captured with its model, latency, and cost attached. Point an agent at that data and it compares every trace at once, instead of you picking one to start with.',
                    },
                ],
            },
            {
                level: 'Ask an agent',
                surfaces: ['ai', 'slack', 'mcp', 'cli'],
                scenario: {
                    icon: 'IconMagicWand',
                    steps: [
                        'You ask PostHog AI what you spent this week, broken down by model',
                        'It names the model whose spend jumped, then pulls the most expensive calls behind it, along with the exceptions and session replays tied to those same traces',
                        'You tag @PostHog in Slack to trim that prompt in Prompt management and publish it, then ask it to confirm tomorrow that spend actually dropped',
                    ],
                },
                points: [
                    {
                        title: "Turns out, there's more",
                        icon: 'IconClockRewind',
                        body: "Prompt management keeps every version, so publishing the fix doesn't erase anything. It stays live behind a label, and undoing a bad edit is flipping that label back, not writing a second fix.",
                    },
                    {
                        title: 'No prompt required',
                        icon: 'IconMessage',
                        body: 'A plain alert only tells you something is off. A scout narrows that same spike to one model and one feature, attaches the sampled traces as evidence, and lands the finished investigation in your Inbox instead of just a ping.',
                    },
                ],
            },
            {
                level: 'Ship with PostHog',
                surfaces: ['inbox', 'slack', 'desktop'],
                scenario: {
                    icon: 'IconHandMoney',
                    steps: [
                        'An AI observability scout tracks spend against your own baseline, so it needs no budget threshold to tell that this is unusual',
                        'It narrows the jump to one model and one feature, and attaches the traces it sampled as evidence',
                        'The report lands in your Inbox and Slack, routed to whoever owns that feature',
                        'Rewriting a prompt is a product decision, so it asks rather than opening a pull request. Reply in the thread and it will publish the new version',
                    ],
                },
                points: [
                    {
                        title: 'Your own history is the threshold',
                        icon: 'IconBrain',
                        body: (
                            <>
                                A{' '}
                                <Link to="/docs/self-driving/scouts" state={{ newWindow: true }} className="underline">
                                    scout
                                </Link>{' '}
                                compares this week to your own history, not a number someone picked in advance. That's
                                what lets it flag one model drifting without treating a busy afternoon as an incident.
                            </>
                        ),
                    },
                    {
                        title: 'It watches your evaluations too',
                        icon: 'IconLlmPromptEvaluation',
                        body: 'Cost and latency are easy to put on a dashboard. A scoring evaluation drifting downward, or one that broke and has been passing everything since, is the kind of thing a scout is there to catch.',
                    },
                ],
            },
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
    answersDescription: 'Ask about the cost, performance, and usage of your AI features in plain English',
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
                    title: 'You want an AI gateway in the request path',
                    subtitle:
                        'Others can proxy your calls for caching, fallbacks, and rate limits – PostHog only observes',
                },
                {
                    title: 'You only want LLM ops metrics',
                    subtitle: 'and will never need the product context – retention, funnels, replays – around them',
                },
                {
                    title: "You don't want to use an open source product",
                },
            ],
            us: [
                {
                    title: 'Agents can act on your LLM traces, costs, and errors – the context that makes your agent self-driving',
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
            // Helicone removed per review – gateway-first and no longer a direct
            // comparison target. Revisit adding Raindrop here instead.
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
            slug: 'error-tracking',
            description: 'Failed LLM calls become issues you can triage, assign, and resolve',
        },
        {
            slug: 'session-replay',
            description: 'Watch how users interact with AI features in real sessions',
        },
        {
            slug: 'feature-flags',
            description: 'Roll out AI features gradually and switch models without a deploy',
        },
        {
            slug: 'experiments',
            description: 'A/B test prompts and models, measured on statistically significant results',
        },
    ],
    worksWith: ['product_analytics', 'dashboards', 'session_replay', 'feature_flags'],
    ai: {
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/pasted_image_2026_07_30_T02_00_13_105_Z_20a891ad6d.png',
        imageAlt: 'A hedgehog inspecting a trace with a magnifying glass',
        intro: 'Ask PostHog AI to check what your LLM calls cost, dig into traces, and compare models.',
        // Prompts copy to the clipboard instead of deep-linking into in-app
        // PostHog AI while its web runtime lags the MCP tool set.
        copyPrompts: true,
        mcpFeatures: ['llm_analytics'],
        // AIO ships the most MCP tools of any product – the tools tab shows one
        // row per use case (à la Replay Vision) instead of an 80-row list.
        // Tools are prefix-matched against these groups.
        toolGroups: [
            {
                name: 'Cost breakdown analysis',
                summary:
                    'Pull total spend, break it down by model or user, then open the exact traces behind a spike and have them summarized.',
                prefixes: ['query-llm-', 'get-llm-total-costs', 'llma-personal-spend', 'llma-summarization-'],
            },
            {
                name: 'Eval suite setup',
                summary:
                    'Create evaluations, curate datasets, and track pass rates – an agent can stand up a full eval suite from one conversation.',
                prefixes: ['llma-evaluation-', 'llma-dataset-', 'llma-score-'],
            },
            {
                name: 'Team trace review',
                summary: 'Build review queues, assign traces, and record structured verdicts without opening the app.',
                prefixes: ['llma-trace-review-', 'llma-review-'],
            },
            {
                name: 'Prompt shipping',
                summary: 'Version, label, and deploy prompts, and manage provider keys – prompt ops from your editor.',
                prefixes: ['llma-prompt-', 'llma-provider-'],
            },
            {
                name: 'Traffic classification',
                summary:
                    'Set up clustering jobs and taggers so recurring patterns in your traffic get labeled automatically.',
                prefixes: ['llma-clustering-', 'llma-tagger-'],
            },
        ],
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
                    'Compare token usage between GPT and Claude for the search feature.',
                    'Compare latency between GPT and Claude for the chat feature',
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

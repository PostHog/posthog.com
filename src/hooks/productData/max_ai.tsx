import React from 'react'
import {
    IconBolt,
    IconGraph,
    IconPieChart,
    IconToggle,
    IconRewindPlay,
    IconMessage,
    IconFlask,
    IconLlmAnalytics,
    IconWarning,
    IconAsterisk,
} from '@posthog/icons'
import { StickerPath } from 'components/Stickers/Stickers'

export const max_ai = {
    name: 'Max',
    parentIcon: 'aiMax',
    // Icon: IconMagicWand,
    description: 'Your AI-powered product analyst and product manager',
    role: 'Helpful chatbot',
    handle: 'max_ai',
    color: 'ai-blue',
    colorSecondary: 'lilac',
    category: 'ai',
    slug: 'max',
    status: 'beta',
    hideFromPricingTable: true,
    seo: {
        title: 'Max AI – Your AI copilot for PostHog data and insights',
        description:
            'Your AI-powered product analyst. Write natural language to query and analyze PostHog data instantly, find insights, and speed up product decisions with Max AI.',
    },
    overview: {
        title: 'Our resident AI agent who understands your product and data',
        description:
            'Max builds insights, automates manual tasks, and routes more complex tasks to other AI agents for specialized work.',
        layout: 'ai',
        textColor: 'text-white',
    },
    screenshots: {
        // overview: {
        //     src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-product-analytics.png',
        //     alt: 'Product analytics screenshot',
        //     classes: '',
        // },
        sidebarInitial: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/max_sidebar_initial_light_1fbdd896ec.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/max_sidebar_initial_dark_f80f0d13ac.png',
            alt: 'Max chat',
            // imgClasses: 'max-h-full'
        },
        sidebarInitialCropped: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/max_sidebar_initial_light_cropped_d4ac0441a1.png',
            srcDark:
                'https://res.cloudinary.com/dmukukwp6/image/upload/max_sidebar_initial_dark_cropped_240b38f95e.png',
            alt: 'Max chat',
            imgClasses: 'max-w-[444px]',
        },
    },
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/ai_max_e80de99727.png',
        alt: "Hi, I'm Max!",
        classes: 'max-w-[413px]',
    },
    skills: [
        {
            name: 'Answers product questions',
            percent: 95,
        },
        {
            name: 'Writes SQL queries',
            percent: 95,
        },
        {
            name: 'PostHog product expert',
            percent: 90,
        },
        {
            name: 'Builds data transformations',
            percent: 95,
        },
        {
            name: 'Analytics industry knowledge',
            percent: 80,
        },
    ],

    features: [
        {
            title: 'Web Analytics',
            headline: 'Web Analytics',
            layout: 'ai',
            icon: <IconPieChart className="size-5" />,
            color: 'green',
            description:
                "Privacy-friendly web analytics that doesn't require selling your soul (or your users' data). PostHog AI surfaces why traffic tanked, and what's actually converting.",
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1730807222/web_analytics_45ba970699.png',
                    alt: 'Web analytics',
                    className: 'max-h-64',
                    // stylize: true,
                    // shadow: true,
                },
            ],
            skills: [
                {
                    name: 'Traffic seer',
                    description: 'Illuminates pathways through clickthrough chaos and millions of pageviews',
                    sticker: <StickerPath className="size-12" />,
                    percent: 80,
                },
                {
                    name: 'UTM untangler',
                    description: "Makes sense of your team's chaotic campaign naming convention",
                    sticker: <StickerPath className="size-12" />,
                    percent: 100,
                },
                {
                    name: 'Funnel architect',
                    description: 'Suggests conversion pathways (but go on, take credit for them)',
                    sticker: <StickerPath className="size-12" />,
                    percent: 80,
                },
            ],
        },
        {
            title: 'Product Analytics',
            headline: 'Product Analytics',
            layout: 'ai',
            icon: <IconGraph className="size-5" />,
            color: 'blue',
            description:
                'Less digging - more dialogue. PostHog AI lives in your product data. Create insights and dashboards, and generate complex HogQL queries with natural language.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1730807086/product_analytics_90a59408f5.png',
                    alt: 'Product analytics',
                    className: 'max-h-64',
                    // stylize: true,
                    // shadow: true,
                },
            ],
            skills: [
                {
                    name: 'Insight composer',
                    description: 'Builds insights and entire dashboards from a single prompt',
                    sticker: <StickerPath className="size-6" />,
                    percent: 80,
                },
                {
                    name: 'Anomaly hunter',
                    description: 'Flags metric spikes, dips, and weirdness – and explains the root cause',
                    sticker: <StickerPath className="size-6" />,
                    percent: 100,
                },
                {
                    name: 'Query forgemaster',
                    description: 'Crafts optimized HogQL queries and teaches you the logic behind them',
                    sticker: <StickerPath className="size-6" />,
                    percent: 90,
                },
                {
                    name: 'Metric mapper',
                    description: 'Links multiple metrics to reveal data point bridges and product blind spots',
                    sticker: <StickerPath className="size-6" />,
                    percent: 70,
                },
            ],
        },
        {
            title: 'Experiments',
            headline: 'Experiments',
            layout: 'ai',
            icon: <IconFlask className="size-5" />,
            color: 'purple',
            description:
                "Statistical significance calculated automatically (p-values are no longer your problem). PostHog AI generates test variations you hadn't thought of.",
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1730807086/experiments_90a59408f5.png',
                    alt: 'Experiments',
                    className: 'max-h-64',
                    // stylize: true,
                    // shadow: true,
                },
            ],
            skills: [
                {
                    name: 'Bias buster',
                    description: 'Spots sampling errors to tell if results are real or random',
                    sticker: <StickerPath className="size-6" />,
                    percent: 80,
                },
                {
                    name: 'Variant champion',
                    description: 'Transmutes 30 shades of blue buttons into revenue (sometimes)',
                    sticker: <StickerPath className="size-6" />,
                    percent: 100,
                },
                {
                    name: 'Hypothesis assassin',
                    description: 'Murders your assumptions with cold, hard data',
                    sticker: <StickerPath className="size-6" />,
                    percent: 90,
                },
            ],
        },
        {
            title: 'Feature Flags',
            headline: 'Feature Flags',
            layout: 'ai',
            icon: <IconToggle className="size-5" />,
            color: 'green',
            description:
                'Feature flags without the config file? PostHog AI builds complex targeting logic, percentage splits, and override rules — all from a simple prompt.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1730807086/feature_flags_90a59408f5.png',
                    alt: 'Feature Flags',
                    className: 'max-h-64',
                    // stylize: true,
                    // shadow: true,
                },
            ],
            skills: [
                {
                    name: 'Multiverse manager',
                    description: 'Runs parallel realities where different features exist',
                    sticker: <StickerPath className="size-6" />,
                    percent: 80,
                },
                {
                    name: 'Chaos coordinator',
                    description: 'Sets up kill switches to mitigate damage control',
                    sticker: <StickerPath className="size-6" />,
                    percent: 100,
                },
                {
                    name: 'Targeting sniper',
                    description: 'Flags cohorts and specific users with surgical precision',
                    sticker: <StickerPath className="size-6" />,
                    percent: 90,
                },
            ],
        },
        {
            title: 'Session Replay',
            headline: 'Session Replay',
            layout: 'ai',
            icon: <IconRewindPlay className="size-5" />,
            color: 'yellow',
            description:
                "Don't scrub through hours of recordings — let a robot suffer instead. Ask PostHog AI for the bloopers, sizzle reel, or directors cut of user behavior.",
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1730807086/session_replay_90a59408f5.png',
                    alt: 'Session replay',
                    className: 'max-h-64',
                    // stylize: true,
                    // shadow: true,
                },
            ],
            skills: [
                {
                    name: 'Session summoner',
                    description: 'Filters 10,000 sessions and teleports you to the 3 that matter',
                    sticker: <StickerPath className="size-6" />,
                    percent: 80,
                },
                {
                    name: 'Rage click roundup',
                    description:
                        'Groups frustration patterns into categories (scroll loops, failed clicks, hesitations)',
                    sticker: <StickerPath className="size-6" />,
                    percent: 100,
                },
                {
                    name: 'Empathy engine',
                    description: 'Explains what the user was trying to do, not just what they did',
                    sticker: <StickerPath className="size-6" />,
                    percent: 90,
                },
            ],
        },
        {
            title: 'Surveys',
            headline: 'Surveys',
            layout: 'ai',
            icon: <IconMessage className="size-5" />,
            color: 'salmon',
            description:
                "Describe what you want to know, get a working survey in seconds. It's never been easier to get roasted by users (and advised on next steps by PostHog AI).",
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1730807086/surveys_90a59408f5.png',
                    alt: 'Surveys',
                    className: 'max-h-64',
                    // stylize: true,
                    // shadow: true,
                },
            ],
            skills: [
                {
                    name: 'Question smith',
                    description: 'Generates complete surveys based on your research goals',
                    sticker: <StickerPath className="size-6" />,
                    percent: 80,
                },
                {
                    name: 'Salt screen',
                    description: 'Separates legitimate responses from people having a bad day',
                    sticker: <StickerPath className="size-6" />,
                    percent: 100,
                },
                {
                    name: 'Query forgemaster',
                    description: 'Translates sentiment summaries into actionable product insights',
                    sticker: <StickerPath className="size-6" />,
                    percent: 90,
                },
            ],
        },
        {
            title: 'LLM Analytics',
            headline: 'LLM Analytics',
            layout: 'ai',
            icon: <IconLlmAnalytics className="size-5" />,
            color: 'purple',
            description:
                "Why was today's token spend more than your salary? Use LLM-as-a-judge for automated evals, then have PostHog AI interpret the scores.",
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1730807086/llm_analytics_90a59408f5.png',
                    alt: 'LLM Analytics',
                    className: 'max-h-64',
                    // stylize: true,
                    // shadow: true,
                },
            ],
            skills: [
                {
                    name: 'Eval',
                    description: 'Builds single dashboard entire dashboards from a single thought',
                    sticker: <StickerPath className="size-6" />,
                    percent: 80,
                },
                {
                    name: 'Eval',
                    description: 'Links multiple metrics together to uncover deeper relationships',
                    sticker: <StickerPath className="size-6" />,
                    percent: 100,
                },
                {
                    name: 'Eval',
                    description: 'Crafts optimized HogQL queries and teaches you the logic behind them',
                    sticker: <StickerPath className="size-6" />,
                    percent: 90,
                },
            ],
        },
        {
            title: 'Workflows',
            headline: 'Workflows',
            layout: 'ai',
            icon: <IconBolt className="size-5" />,
            color: 'blue',
            description: 'Need more info...',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1730807086/workflows_90a59408f5.png',
                    alt: 'Workflows',
                    className: 'max-h-64',
                    // stylize: true,
                    // shadow: true,
                },
            ],
            skills: [
                {
                    name: 'Skill name',
                    description: 'Skill description',
                    sticker: <StickerPath className="size-6" />,
                    percent: 80,
                },
                {
                    name: 'Skill name',
                    description: 'Skill description',
                    sticker: <StickerPath className="size-6" />,
                    percent: 100,
                },
                {
                    name: 'Skill name',
                    description: 'Skill description',
                    sticker: <StickerPath className="size-6" />,
                    percent: 90,
                },
                {
                    name: 'Skill name',
                    description: 'Skill description',
                    sticker: <StickerPath className="size-6" />,
                    percent: 70,
                },
            ],
        },
        {
            title: 'Error Tracking',
            headline: 'Error Tracking',
            layout: 'ai',
            icon: <IconWarning className="size-5" />,
            color: 'orange',
            description:
                'Find out what broke before your users tweet about it. PostHog AI helps identify error patterns and correlate signals across your product data.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1730807086/error_tracking_90a59408f5.png',
                    alt: 'Error Tracking',
                    className: 'max-h-64',
                    // stylize: true,
                    // shadow: true,
                },
            ],
            skills: [
                {
                    name: 'Stack trace decoder',
                    description: 'Translates cryptic errors into "oh, THAT\'S the problem."',
                    sticker: <StickerPath className="size-6" />,
                    percent: 80,
                },
            ],
        },
        {
            title: 'Data Warehouse',
            headline: 'Data Warehouse',
            layout: 'ai',
            icon: <IconAsterisk className="size-5" />,
            color: 'purple',
            description:
                'Dump all your Stripe, Hubspot, and whatever-else data into one place. PostHog AI generates HogQL queries to join tables you forgot existed.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1730807086/data_warehouse_90a59408f5.png',
                    alt: 'Data Warehouse',
                    className: 'max-h-64',
                    // stylize: true,
                    // shadow: true,
                },
            ],
            skills: [
                {
                    name: 'Query cupid',
                    description: 'Joins tables across tools like they were meant to be together',
                    sticker: <StickerPath className="size-6" />,
                    percent: 80,
                },
                {
                    name: 'Metric mapper',
                    description: 'Links multiple metrics together to uncover deeper relationships',
                    sticker: <StickerPath className="size-6" />,
                    percent: 100,
                },
            ],
        },
    ],
    answers: [
        {
            q: "What's my churn rate?",
        },
        {
            q: 'Show me user retention by country',
        },
        {
            q: "What's our most popular feature?",
        },
        {
            q: "What's my ARR?",
        },
        {
            q: 'Where do my users drop off?',
        },
        {
            q: 'What are my most popular pages?',
        },
        {
            q: 'What is distribution of paid vs. organic traffic?',
        },
        {
            q: 'Write a SQL query for me',
        },
        {
            q: 'How many pageviews did we get today?',
        },
        {
            q: 'Show me a signup funnel',
        },
    ],
    comparison: {
        comparison_companies: {
            Segment: true,
            mParticle: true,
            RudderStack: true,
            Fivetran: true,
        },
        comparison_rows: [
            {
                feature: 'Number of integrations',
                companies: {
                    Segment: '300+',
                    mParticle: '300+',
                    RudderStack: '200+',
                    Fivetran: '500+',
                    PostHog: '60+',
                },
            },
            {
                feature: 'Real-time streaming',
                companies: {
                    Segment: true,
                    mParticle: true,
                    RudderStack: true,
                    Fivetran: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Batch exports',
                companies: {
                    Segment: true,
                    mParticle: true,
                    RudderStack: true,
                    Fivetran: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Data warehouse sources',
                companies: {
                    Segment: false,
                    mParticle: false,
                    RudderStack: true,
                    Fivetran: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Built-in analytics',
                companies: {
                    Segment: false,
                    mParticle: false,
                    RudderStack: false,
                    Fivetran: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Starting price',
                companies: {
                    Segment: '$120/mo',
                    mParticle: 'Contact',
                    RudderStack: '$500/mo',
                    Fivetran: '$120/mo',
                    PostHog: 'Free sources',
                },
            },
        ],
    },
    pairsWith: [
        {
            slug: 'product-analytics',
            description:
                'Get your source data into PostHog, then analyze it alongside your product data to unlock new insights and discover new user behaviors.',
        },
        {
            slug: 'data-warehouse',
            description:
                'Build a data warehouse in PostHog and then pull in data from all your platforms to one place where it can be easily interrogated.',
        },
    ],
}

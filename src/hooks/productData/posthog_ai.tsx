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
    IconSparkles,
    IconPlug,
} from '@posthog/icons'
import { StickerPath } from 'components/Stickers/Stickers'

export const posthog_ai = {
    name: 'PostHog AI',
    parentIcon: 'aiMax',
    Icon: IconSparkles,
    description: 'Your AI-powered product analyst and product manager',
    role: 'Helpful chatbot',
    handle: 'posthog_ai',
    type: 'posthog_ai',
    color: 'blue',
    colorSecondary: 'lilac',
    category: 'automation',
    slug: 'ai',
    status: 'beta',
    slider: {
        marks: [2000, 10000, 50000, 100000],
        min: 2000,
        max: 100000,
    },
    volume: 2000,
    customPricingContent: <div data-scheme="secondary" className="prose prose-sm text-lg mt-8 mb-12 leading-normal"><h3 className="text-xl font-bold text-primary mb-4">How credits work</h3><p>AI credits are based on the underlying token costs, which reflect the effort required to complete your request.</p><ul><li><strong>Simple queries</strong> like "What were my daily active users in October?" use very few tokens, and therefore very few credits.</li><li><strong>More complex tasks</strong> like analyzing hundreds of session recordings or rewriting a SQL query multiple times use more tokens and consume more credits.
        While exact usage varies, credit consumption usually scales with complexity – more advanced tasks cost more but can deliver deeper insights and time savings. You’ll always see real-time cost information while using AI features.</li></ul><p>PostHog automatically selects the most efficient model for each AI feature. We apply a simple, consistent 20% markup over the underlying LLM provider’s cost: So 1 PostHog AI credit equals $0.8333 of raw inference, and 1,000 credits cost $10.</p></div>,
    seo: {
        title: 'PostHog AI – Your copilot for PostHog data and insights',
        description:
            'Your AI-powered product analyst. Write natural language to query and analyze PostHog data instantly, find insights, and speed up product decisions with PostHog AI.',
    },
    overview: {
        title: 'Our resident AI agent who understands your product and data',
        description:
            'PostHog AI builds insights, automates manual tasks, and routes more complex tasks to other AI agents for specialized work.',
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
            alt: 'PostHog AI chat',
            // imgClasses: 'max-h-full'
        },
        sidebarInitialCropped: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/max_sidebar_initial_light_cropped_d4ac0441a1.png',
            srcDark:
                'https://res.cloudinary.com/dmukukwp6/image/upload/max_sidebar_initial_dark_cropped_240b38f95e.png',
            alt: 'PostHog AI chat',
            imgClasses: 'max-w-[444px]',
        },
    },
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/ai_max_e80de99727.png',
        alt: 'Hello, PostHog AI!',
        classes: 'max-w-[413px]',
    },
    features: [
        {
            label: 'Analytics',
        },
        {
            title: 'Web Analytics',
            headline: 'Web Analytics',
            team: 'web-analytics',
            layout: 'ai',
            icon: <IconPieChart className="size-5" />,
            color: 'green',
            description:
                "Privacy-friendly web analytics that doesn't require selling your soul (or your users' data). PostHog AI surfaces why traffic tanked, and what's actually converting.",
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1730807222/web_analytics_45ba970699.png',
                    alt: 'Web analytics',
                    className: 'max-h-56 @2xl:mt-8',
                    // stylize: true,
                    // shadow: true,
                },
            ],
            skills: [
                {
                    name: 'Insight generation',
                    description:
                        'Create insights with text prompts to analyze traffic patterns, conversion funnels, or user journeys',
                    sticker: <StickerPath className="size-12" />,
                    percent: 30,
                },
                {
                    name: 'Conversational filters',
                    description: 'Apply filters by page path, geography, device type, or referrer using plain language',
                    sticker: <StickerPath className="size-12" />,
                    percent: 30,
                },
                {
                    name: 'Anomaly analysis',
                    description:
                        'Detect unusual traffic spikes or drops and get PostHog AI to explain potential causes',
                    sticker: <StickerPath className="size-12" />,
                    percent: 0,
                },
            ],
        },
        {
            title: 'Product Analytics',
            headline: 'Product Analytics',
            team: 'product-analytics',
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
                    name: 'Insight generation',
                    description: 'Build insights and entire dashboards from a single prompt',
                    sticker: <StickerPath className="size-6" />,
                    percent: 70,
                },
                {
                    name: 'Query assistance',
                    description: 'Create optimized HogQL queries and get an explanation of the logic behind them',
                    sticker: <StickerPath className="size-6" />,
                    percent: 50,
                },
                {
                    name: 'Auto-naming',
                    description: 'Automatically generate descriptive names for insights and dashboards',
                    sticker: <StickerPath className="size-6" />,
                    percent: 30,
                },
                {
                    name: 'Anomaly detection',
                    description: 'Detect outliers with AI and configure alerts to catch them',
                    sticker: <StickerPath className="size-6" />,
                    percent: 0,
                },
            ],
        },
        {
            title: 'LLM Analytics',
            headline: 'LLM Analytics',
            team: 'llm-analytics',
            layout: 'ai',
            icon: <IconLlmAnalytics className="size-5" />,
            color: 'purple',
            description:
                "Why was today's token spend more than your salary? Use LLM-as-a-judge for automated evals, then have PostHog AI interpret the scores.",
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1742425353/llm_obvs_86706b1ab7.png',
                    alt: 'LLM Analytics',
                    className: 'max-h-40 @2xl:mr-8 @2xl:mt-8',
                    // stylize: true,
                    // shadow: true,
                },
            ],
            skills: [
                {
                    name: 'LLMaaJ evals',
                    description: 'Use LLM-as-a-judge to evaluate other LLM traces at scale (inception)',
                    sticker: <StickerPath className="size-6" />,
                    percent: 30,
                },
                {
                    name: 'LLM trace summarization',
                    description: 'Understand complex interactions without reading full conversation logs',
                    sticker: <StickerPath className="size-6" />,
                    percent: 30,
                },
                {
                    name: 'LLM evals generator',
                    description: 'Create LLM-as-a-judge prompts from manually labeled traces',
                    sticker: <StickerPath className="size-6" />,
                    percent: 0,
                },
                {
                    name: 'Prompt experiments builder',
                    description: 'Set up system prompt experiments in natural language',
                    sticker: <StickerPath className="size-6" />,
                    percent: 0,
                },
                {
                    name: 'Chat with traces',
                    description: 'Query your trace data through the PostHog AI chat',
                    sticker: <StickerPath className="size-6" />,
                    percent: 0,
                },
            ],
        },
        {
            label: 'Product engineering',
        },
        {
            title: 'Session Replay',
            headline: 'Session Replay',
            team: 'replay',
            layout: 'ai',
            icon: <IconRewindPlay className="size-5" />,
            color: 'yellow',
            description:
                "Don't scrub through hours of recordings — let a robot suffer instead. Ask PostHog AI for the bloopers, sizzle reel, or directors cut of user behavior.",
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1730806654/session_replay_67e4cf38de.png',
                    alt: 'Session replay',
                    className: 'max-h-64 @2xl:mt-8',
                    // stylize: true,
                    // shadow: true,
                },
            ],
            skills: [
                {
                    name: 'Session search',
                    description: 'Find specific replays using natural language (e.g., "users who abandoned checkout")',
                    sticker: <StickerPath className="size-6" />,
                    percent: 70,
                },
                {
                    name: 'Session clustering',
                    description:
                        'Ask PostHog AI to group similar sessions and surface representative examples from thousands',
                    sticker: <StickerPath className="size-6" />,
                    percent: 30,
                },
                {
                    name: 'Configuration assistant',
                    description: 'Set up privacy masking, regex rules, and recording settings with natural language',
                    sticker: <StickerPath className="size-6" />,
                    percent: 0,
                },
            ],
        },
        {
            title: 'Feature Flags',
            headline: 'Feature Flags',
            team: 'feature-flags',
            layout: 'ai',
            icon: <IconToggle className="size-5" />,
            color: 'green',
            description:
                'PostHog AI sets up, monitors, manages, and rolls out your feature flags — making releases safe by default.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1730806653/feature_flags_150eb811c6.png',
                    alt: 'Feature Flags',
                    className: 'max-h-64 @2xl:mt-8 @2xl:mr-4',
                },
            ],
            skills: [
                {
                    name: 'Feature flag setup',
                    description: 'Create and configure feature flags using natural language',
                    sticker: <StickerPath className="size-6" />,
                    percent: 30,
                },
                {
                    name: 'Monitoring & anomaly detection',
                    description: 'Replace manual checks with automated performance reports',
                    sticker: <StickerPath className="size-6" />,
                    percent: 0,
                },
                {
                    name: 'Invisible rollout automation',
                    description: 'Delegate rule-based flag rollouts to AI',
                    sticker: <StickerPath className="size-6" />,
                    percent: 0,
                },
                {
                    name: 'Stale feature flag detection',
                    description: 'Detect stale feature flags and automatically remove them from your app and codebase',
                    sticker: <StickerPath className="size-6" />,
                    percent: 30,
                },
            ],
        },
        {
            title: 'Experiments',
            headline: 'Experiments',
            team: 'experiments',
            layout: 'ai',
            icon: <IconFlask className="size-5" />,
            color: 'purple',
            description:
                'Ship ideas like a mad scientist. PostHog AI handles setup, flags, and metrics — you decide what deploys (and which experiments never leave the lab).',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1730806654/experiments_1dc7831033.png',
                    alt: 'Experiments',
                    className: 'max-h-64 @2xl:mt-8',
                    // stylize: true,
                    // shadow: true,
                },
            ],
            skills: [
                {
                    name: 'Experiment builder',
                    description: 'Create and configure A/B tests using natural language prompts',
                    sticker: <StickerPath className="size-6" />,
                    percent: 30,
                },
                {
                    name: 'Results analysis',
                    description:
                        'Identify winning variants through AI summaries, and get recommendations for next steps',
                    sticker: <StickerPath className="size-6" />,
                    percent: 30,
                },
                {
                    name: 'Experiments doctor',
                    description: 'Troubleshoot setup issues with AI to ensure statistically valid and reliable results',
                    sticker: <StickerPath className="size-6" />,
                    percent: 0,
                },
                {
                    name: 'Opportunity detection',
                    description:
                        'Surface testing opportunities by analyzing metrics, behavior, and code changes with AI',
                    sticker: <StickerPath className="size-6" />,
                    percent: 0,
                },
            ],
        },
        {
            title: 'Error Tracking',
            headline: 'Error Tracking',
            team: 'error-tracking',
            layout: 'ai',
            icon: <IconWarning className="size-5" />,
            color: 'orange',
            description:
                'Find out what broke before your users tweet about it. PostHog AI connects exceptions to user sessions, revenue impact, and business context—not just stack traces.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1730806655/error_tracking_4e0dff38af.png',
                    alt: 'Error Tracking',
                    className: 'max-h-64 @2xl:mt-8',
                    // stylize: true,
                    // shadow: true,
                },
            ],
            skills: [
                {
                    name: 'Exception search',
                    description: 'Ask PostHog AI to find specific errors with natural language queries',
                    sticker: <StickerPath className="size-6" />,
                    percent: 70,
                },
                {
                    name: 'Impact scoring',
                    description: 'Surface high-impact exceptions based on affected users and business context',
                    sticker: <StickerPath className="size-6" />,
                    percent: 70,
                },
                {
                    name: 'Semantic grouping',
                    description: 'Group exceptions by root cause with AI analysis, not just stack traces',
                    sticker: <StickerPath className="size-6" />,
                    percent: 0,
                },
            ],
        },
        {
            label: 'Communication',
        },
        {
            title: 'Surveys',
            headline: 'Surveys',
            team: 'surveys',
            layout: 'ai',
            icon: <IconMessage className="size-5" />,
            color: 'salmon',
            description:
                "Describe what you want to know, get a working survey in seconds. It's never been easier to get roasted by users (and advised on next steps by PostHog AI).",
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1730806654/surveys_e13b99220b.png',
                    alt: 'Surveys',
                    className: 'max-h-64 @2xl:mt-8',
                    // stylize: true,
                    // shadow: true,
                },
            ],
            skills: [
                {
                    name: 'Survey creation',
                    description: 'Generate questions, configure targeting, and launch surveys with natural language',
                    sticker: <StickerPath className="size-6" />,
                    percent: 90,
                },
                {
                    name: 'Response synthesis',
                    description: 'Ask PostHog AI to surface themes and patterns from aggregated feedback',
                    sticker: <StickerPath className="size-6" />,
                    percent: 70,
                },
                {
                    name: 'Sentiment search',
                    description: 'Ask questions about survey responses and get answers by meaning, not keywords',
                    sticker: <StickerPath className="size-6" />,
                    percent: 0,
                },
            ],
        },
        {
            title: 'Workflows',
            headline: 'Workflows',
            team: 'workflows',
            layout: 'ai',
            icon: <IconBolt className="size-5" />,
            color: 'blue',
            description:
                'Why drag and drop when you can just ask? PostHog AI builds the workflow, sets the triggers, and ships it faster than you can say <em>“if this, then that.”</em>',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1743523365/messaging_crest_8de90d3c39.png',
                    alt: 'Workflows',
                    className: 'max-h-64 mt-8 mr-8',
                    // stylize: true,
                    // shadow: true,
                },
            ],
            skills: [
                {
                    name: 'Email template builder',
                    description: 'Ask PostHog AI to generate dynamic templates in your content library',
                    sticker: <StickerPath className="size-6" />,
                    percent: 50,
                },
                {
                    name: 'Workflow builder',
                    description:
                        'Create multi-step workflows using natural language to automate actions or send messages',
                    sticker: <StickerPath className="size-6" />,
                    percent: 0,
                },
            ],
        },
        {
            label: 'Customer data infrastructure',
        },
        {
            title: 'Data Stack',
            headline: 'Data Stack',
            team: 'data-stack',
            layout: 'ai',
            icon: <IconAsterisk className="size-5" />,
            color: 'purple',
            description:
                'Dump all your Stripe, Hubspot, and whatever-else data into one place. PostHog AI generates HogQL queries to join tables you forgot existed.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1730806654/data_warehouse_99ac92f444.png',
                    alt: 'Data Warehouse',
                    className: 'max-h-64 mt-8',
                    // stylize: true,
                    // shadow: true,
                },
            ],
            skills: [
                {
                    name: 'SQL error fixing',
                    description:
                        'Use PostHog AI to correct syntax and logic errors to ensure queries return the data you need',
                    sticker: <StickerPath className="size-6" />,
                    percent: 50,
                },
                {
                    name: 'Query autocomplete',
                    description: 'Complete code automatically so you can focus on analysis',
                    sticker: <StickerPath className="size-6" />,
                    percent: 0,
                },
            ],
        },
        {
            title: 'Data Pipelines',
            headline: 'Data Pipelines',
            team: 'workflows',
            layout: 'ai',
            icon: <IconPlug className="size-5" />,
            color: 'blue',
            description:
                'PostHog AI is your data plumber. It finds the leaks, clears the clogs, and keeps insights flowing without flooding your warehouse.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1742915575/ingestion_f1030194a7.png',
                    alt: 'Data Pipelines',
                    className: 'max-h-64 mt-8 mr-8',
                    // stylize: true,
                    // shadow: true,
                },
            ],
            skills: [
                {
                    name: 'Destination setup',
                    description: 'Configure integrations with AI-generated HogQL and automatic event filtering',
                    sticker: <StickerPath className="size-6" />,
                    percent: 70,
                },
                {
                    name: 'Data transformation',
                    description: 'Ask PostHog AI to Write custom logic to modify and enrich event data',
                    sticker: <StickerPath className="size-6" />,
                    percent: 70,
                },
            ],
        },
    ],
    videos: {
        investigating_web_traffic: {
            title: 'Investigating web traffic',
            author: 'Edwin Lim',
            wistia: 'tgws1dixc0',
            chapters: [
                {
                    title: 'Add a graph series for unique users',
                    time: 60,
                    copyable: true,
                },
                {
                    title: 'Create a dashboard of insights with traffic breakdowns by referral, country, user agent, and operating system',
                    time: 110,
                    copyable: true,
                },
                {
                    title: 'Find session recordings with filters based on the IP address over the last 60 days',
                    time: 246,
                    copyable: true,
                },
                {
                    title: 'Summarize these session recordings in a report for me and provide key findings',
                    time: 285,
                    copyable: true,
                },
            ]
        },
        maximizing_data_insights: {
            title: 'Maximizing data insights',
            author: 'Eric Duong',
            wistia: 'syysfftbzk',
            chapters: [
                {
                    title: 'Last 10 Stripe charges',
                    time: 18,
                    copyable: true,
                },
                {
                    title: 'All charges last 14 days with email',
                    time: 41,
                    copyable: true,
                },
                {
                    title: 'Make this query a CTE and bring in refunds as another CTE. Match the select values and union them for the result.',
                    time: 81,
                    copyable: true,
                },
                {
                    title: 'In Stripe data, what\'s the net amount charged and refunded in the last 7 days?',
                    time: 140,
                    copyable: true,
                },
            ]
        },
        answering_business_questions: {
            title: 'Answering business questions',
            author: 'Georgiy Tarasov',
            wistia: 'hjr4vq1py4',
            chapters: [
                {
                    title: 'What\'s the cache hit rate for AI generations?',
                    time: 30,
                    copyable: true,
                },
                {
                    title: 'Break down the chart by model',
                    time: 45,
                    copyable: true,
                },
                {
                    title: 'Include customer feedback for AI generations from the last 7 days',
                    time: 67,
                    copyable: true,
                },
                {
                    title: 'Summarize session recordings for the given filters',
                    time: 104,
                    copyable: true,
                },
            ]
        },
    },
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
    postHogOnPostHog: {
        title: 'How PostHog uses PostHog AI',
        benefits: [
            {
                title: 'Build insights and dashboards',
                description: 'using natural language',
            },
            {
                title: 'Create SQL queries',
                description: 'to use for detailed analysis',
            },
            {
                title: 'Summarize session replays',
                description: "so we don't have to watch them all",
            },
            {
                title: 'Get product advice',
                description: 'because we trained the AI on our blog too',
            },
            {
                title: 'Fix bugs in our implementation',
                description: 'way faster than reading all the docs',
            },
        ],
    },
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

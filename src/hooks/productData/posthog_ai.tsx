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
    slider: {
        marks: [2000, 10000, 50000, 100000],
        min: 2000,
        max: 100000,
    },
    volume: 2000,
    customPricingContent: (
        <div data-scheme="secondary" className="prose prose-sm text-lg mt-8 mb-12 leading-normal text-primary">
            <h3 className="text-xl font-bold text-primary mb-4">How credits work</h3>
            <p>
                AI credits are based on the underlying token costs, which reflect the effort required to complete your
                request.
            </p>
            <ul>
                <li>
                    <strong className="text-primary">Simple queries</strong> like "What were my daily active users in
                    October?" use very few tokens, and therefore very few credits.
                </li>
                <li>
                    <strong className="text-primary">More complex tasks</strong> like analyzing hundreds of session
                    recordings or rewriting a SQL query multiple times use more tokens and consume more credits. While
                    exact usage varies, credit consumption usually scales with complexity – more advanced tasks cost
                    more but can deliver deeper insights and time savings. You’ll always see real-time cost information
                    while using AI features.
                </li>
            </ul>
            <p>
                PostHog automatically selects the most efficient model for each AI feature. We apply a simple,
                consistent 20% markup over the underlying LLM provider’s cost: So 1 PostHog AI credit equals $0.8333 of
                raw inference, and 1,000 credits cost $10.
            </p>
        </div>
    ),
    seo: {
        title: 'PostHog AI – Your copilot for PostHog data and insights',
        description:
            'Your AI-powered product analyst. Write natural language to query and analyze PostHog data instantly, find insights, and speed up product decisions with PostHog AI.',
    },
    overview: {
        title: 'Ask questions about how people use your product',
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
        home: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog_ai_light_f654818fb0.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog_ai_dark_35c03e330c.png',
            alt: 'PostHog AI screenshot',
            classes: 'justify-start items-end pr-4 @lg:pr-6',
            imgClasses: 'rounded-tr-md shadow-2xl',
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
                    name: 'Deep dive',
                    description: 'Get suggestions for what to investigate next',
                    sticker: <StickerPath className="size-6" />,
                    percent: 30,
                },
                {
                    name: 'Auto-naming',
                    description: 'Automatically generate descriptive names for insights and dashboards',
                    sticker: <StickerPath className="size-6" />,
                    percent: 30,
                },
                // {
                //     name: 'Anomaly detection',
                //     description: 'Detect outliers with AI and configure alerts to catch them',
                //     sticker: <StickerPath className="size-6" />,
                //     percent: 0,
                // },
            ],
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
                    name: 'Conversational filters',
                    description: 'Apply filters by page path, geography, device type, or referrer using plain language',
                    sticker: <StickerPath className="size-12" />,
                    percent: 70,
                },
                {
                    name: 'Insight generation',
                    description:
                        'Create insights with text prompts to analyze traffic patterns, conversion funnels, or user journeys',
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
                // {
                //     name: 'Chat with traces',
                //     description: 'Query your trace data through the PostHog AI chat',
                //     sticker: <StickerPath className="size-6" />,
                //     percent: 0,
                // },
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
                    name: 'Session summaries',
                    description: 'Get a summary of one or more session replays',
                    sticker: <StickerPath className="size-6" />,
                    percent: 50,
                },
                {
                    name: 'Session clustering',
                    description:
                        'Ask PostHog AI to group similar sessions and surface representative examples from thousands',
                    sticker: <StickerPath className="size-6" />,
                    percent: 30,
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
                    percent: 70,
                },
                {
                    name: 'Stale feature flag detection',
                    description: 'Detect stale feature flags and automatically remove them from your app and codebase',
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
                    percent: 50,
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
            label: 'PostHog data stack',
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
            customThumb:
                'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_investigating_web_traffic_86c3caa67d.png',
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
            ],
        },
        maximizing_data_insights: {
            title: 'Maximizing data insights',
            author: 'Eric Duong',
            wistia: 'syysfftbzk',
            customThumb:
                'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_maximizing_data_insights_60ecdcb060.png',
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
                    title: "In Stripe data, what's the net amount charged and refunded in the last 7 days?",
                    time: 140,
                    copyable: true,
                },
            ],
        },
        answering_business_questions: {
            title: 'Answering business questions',
            author: 'Georgiy Tarasov',
            wistia: 'hjr4vq1py4',
            customThumb:
                'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_answering_business_questions_aed4278f7a.png',
            chapters: [
                {
                    title: "What's the cache hit rate for AI generations?",
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
            ],
        },
        integrating_external_data: {
            title: 'Integrating external data',
            author: 'Natlaia Amorim',
            wistia: '8yephrnt6h',
            customThumb:
                'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_integrating_external_data_ab4b91a189.png',
            chapters: [
                {
                    title: 'How can I import a google sheet into PostHog so I can use it as a data source',
                    time: 55,
                    copyable: true,
                },
                {
                    title: 'Now my table has been synced and is available as a data source. Help me create an insight where I can show our keyword rankings evolution over time (the Y axis should be the count, and X axis should be the month string and the ranking string.',
                    time: 143,
                    copyable: true,
                },
            ],
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
    presenterNotes: {
        overview:
            "<strong>Presenter notes:</strong> PostHog AI is an AI agent that lives inside PostHog and actually understands your product data. It's not a chatbot slapped onto a dashboard. You can ask it to build insights, write HogQL queries, summarize session recordings, create surveys, set up feature flags—basically handle the grunt work that normally takes 20 minutes of clicking around. It routes complex tasks to specialized AI agents and uses context from your actual data. The big difference: it's trained on PostHog's data model and your specific setup, so it actually knows what it's doing.",
        'posthog-on-posthog':
            "We use PostHog AI constantly. Like, genuinely use it—not in a 'marketing uses our own product once for a screenshot' way. Our engineers use it to write complex SQL queries against our data warehouse without having to remember every table schema. Product managers use it to build dashboards in seconds instead of bothering engineering. Support uses it to summarize session replays when debugging user issues. We trained it on our blog and docs too, so it can answer questions about how to use PostHog without you having to search through documentation. It's become the fastest way to go from question to answer.",
        features:
            "Each PostHog product has its own set of AI capabilities, and they're pretty specific to what you'd actually want to do in that context.<br /><br />In <strong>Product Analytics</strong>, you can generate insights and dashboards from plain English. Write 'show me DAU over the last month broken down by country' and it builds the chart. It also writes HogQL queries and explains what they do, which is useful when you're learning the syntax or dealing with complex joins.<br /><br />For <strong>Session Replay</strong>, you can search recordings using natural language ('users who abandoned checkout'), and it'll find the relevant sessions. You can also ask it to cluster similar sessions and pull out representative examples from thousands of recordings, which saves hours of manual review.<br /><br /><strong>Feature Flags</strong> setup becomes conversational. Describe what you want to roll out and it configures the flag. It can also detect stale flags in your codebase—super useful for cleanup.<br /><br /><strong>Experiments</strong> get easier too. Create A/B tests by describing what you're testing, and get AI-generated analysis of results with recommendations for next steps.<br /><br />For <strong>Surveys</strong>, describe what you want to learn and it generates questions, sets targeting rules, and later synthesizes responses to surface themes without you reading every single answer.<br /><br />In <strong>Error Tracking</strong>, you can search exceptions with natural language and get impact scoring based on affected users and business context—not just stack traces.<br /><br /><strong>LLM Analytics</strong> is where it gets meta: use LLM-as-a-judge to evaluate your own LLM traces at scale, summarize complex interactions, and analyze token spend without drowning in logs.<br /><br />The <strong>Data Warehouse</strong> integration means it can help fix SQL errors, generate queries that join your external data sources, and navigate schemas you don't have memorized.<br /><br />And with <strong>Workflows</strong>, you can build multi-step automations and generate email templates using natural language instead of dragging boxes around a UI builder.<br /><br />It's not about replacing what you do—it's about handling the repetitive parts so you can focus on the actual decision-making.",
        answers:
            "These are real questions our users ask. The useful thing about PostHog AI is it's not just searching your data—it's building the analysis for you. Want to know your churn rate? It'll create the cohort definition, run the calculation, and show you the visualization. Need to understand where users drop off? It builds the funnel and then lets you jump to session recordings of those exact users. The SQL query requests are probably the most common—people know what data they want but don't want to spend 30 minutes remembering the exact syntax and table names. It's basically your coworker who's really good at PostHog and has time to help.",
        pricing:
            "We charge for AI based on the actual token usage from the underlying LLM providers, with a 20% markup. One PostHog AI credit equals $0.8333 of raw inference cost, so 1,000 credits is $10. Simple queries like 'what were my daily active users in October?' use very few credits—maybe 50-100 credits. More complex tasks like analyzing hundreds of session recordings or rewriting SQL queries multiple times will consume more, but you see the cost in real-time so there's no surprises.<br /><br />Everyone starts with 2,000 free credits per month. After that, you pay for what you use. The more credits you need, the cheaper they get (volume pricing). We automatically route to the most efficient model for each task—you're not stuck paying GPT-4 prices when a smaller model works fine.<br /><br />The thing is, even complex queries are usually cheaper than the time you'd spend building them manually. A 500-credit task that saves you 20 minutes is still a good deal. And unlike seat-based pricing, your whole team can use it without multiplying costs.",
        'comparison-summary':
            "Most analytics platforms either (a) don't have AI, (b) slapped ChatGPT onto their dashboard and called it 'AI-powered,' or (c) have AI that only does one thing like anomaly detection. PostHog AI is different because it's deeply integrated into every product and actually understands your data model. It can write valid HogQL, knows your event names, understands your feature flags—it's not just a general-purpose LLM trying to help.<br /><br />The closest comparison is probably Amplitude's AI, but that only works inside Amplitude. We're open source, so you can see exactly how it works and even self-host if you want. Our pricing is also transparent and usage-based instead of requiring an enterprise contract.",
        docs: "The docs for PostHog AI explain how it works under the hood—what models we use, how we handle context, what each AI agent specializes in. We're upfront about limitations too: it's not perfect, it can make mistakes, and you should verify important queries before acting on them. That said, it's getting better fast. We're constantly training it on more examples and improving the prompts.<br /><br />If you run into issues or have ideas for how AI could be more useful in specific workflows, tell us. The team actively monitors feedback because this is still early days and we're trying to build something that's actually useful, not just a checkbox feature.",
        'pairs-with':
            "PostHog AI works across the entire platform, so it pairs with everything. But it's especially powerful when you combine products. For example: ask AI to find session replays of users who hit a specific error, then have it create a feature flag to roll out the fix to just those affected users, then build an experiment to test if it actually solved the problem. All of that without leaving PostHog or manually matching user IDs across tools.<br /><br />It also works with our data warehouse, so you can query external data from Stripe, HubSpot, etc. alongside your product data. Ask 'show me users who churned in the last 30 days and their LTV from Stripe' and it writes the join for you.",
        'getting-started':
            "PostHog AI is available in the sidebar of most PostHog pages—just click the icon and start asking questions. If you're not sure what to ask, try something simple like 'show me my top pages from last week' or 'create a funnel for signup to activation.' You'll immediately see how it interprets your request and builds the analysis.<br /><br />As you use it more, you'll learn what works well. Be specific when you can ('users in the US who signed up after Jan 1st'), and don't be afraid to iterate ('now add a breakdown by device type'). It's designed to have a conversation, not require perfect prompts on the first try.<br /><br />The AI credits you use are visible in real-time, so you'll quickly get a sense of what costs what. Most teams find that the time savings far outweigh the credit cost—especially for tasks like session replay analysis or complex SQL queries that would otherwise take significant manual effort.",
        demo: "These are all real questions you can ask PostHog AI right now. The examples show the range of what's possible—from high-level product questions ('What changed this week?') to specific technical tasks ('Write SQL for this query'). Notice they're not perfectly formatted prompts. You can be conversational. If you're signed into PostHog, you can click any of these and it'll actually start working on it for you. The demo cards highlight different capabilities: connecting data points across the platform, summarizing recordings, building dashboards from plain English, analyzing LLM usage (meta!), web traffic analysis, SQL debugging, joining external data, and answering 'how do I use PostHog' questions. The point is: it's not a toy. It's solving real problems that would otherwise eat up engineering time.",
        videos: "These are screen recordings of PostHog engineers actually using PostHog AI for real work—not staged demos. Watch Edwin investigate web traffic by asking AI to add graph series, create a dashboard with traffic breakdowns, find specific session recordings, and then summarize them into a report. Eric shows how to query Stripe data in the data warehouse, starting with simple requests and building up to complex CTEs and unions. Georgiy demonstrates business analysis: checking cache hit rates, breaking down by model, pulling in customer feedback, and summarizing session recordings. The videos show you can be conversational and iterate on your requests. You don't need to know the perfect query syntax upfront. The AI helps you refine as you go. These are the kinds of tasks that normally require SQL knowledge, data engineering skills, or significant manual work. PostHog AI handles them in minutes.",
        you: "This slide shows how PostHog AI helps different roles, but here's the real insight: it's most valuable when it removes bottlenecks between teams. Founders get instant answers without waiting for engineering. Product Engineers can analyze data without context-switching to another tool. Product Managers can run experiments and dig into data without needing a data analyst. Growth teams can build dashboards without SQL knowledge. Data Analysts can offload repetitive 'quick questions' and focus on harder problems. The common thread: everyone becomes more self-sufficient. You're not creating ticket queues or Slack threads asking someone else to pull data. You ask PostHog AI, verify the output makes sense, and keep moving. It's not about replacing these roles—it's about making each role more effective at their actual job instead of being blocked waiting for someone else.",
        roadmap:
            "We're constantly shipping new AI capabilities and making existing ones deeper. Some examples: anomaly detection that explains why metrics changed, semantic grouping of errors by root cause instead of just stack traces, configuration assistants that set up features using natural language. The goal isn't to automate everything — it's to handle the repetitive pattern-matching work so humans can focus on the decisions that actually require judgment. We're also training the AI on more domain knowledge so it gets better at understanding product analytics concepts, not just executing commands. Check the roadmap regularly because we're shipping new stuff constantly, and you can vote on what you want us to prioritize next.",
    },
}

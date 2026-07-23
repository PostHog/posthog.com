import React from 'react'
import {
    IconGraph,
    IconEye,
    IconSparkles,
    IconList,
    IconConfetti,
    IconRocket,
    IconPieChart,
    IconCheckCircle,
    IconInfo,
    IconCursorClick,
    IconMagic,
    IconChat,
    IconCode,
    IconMessage,
    IconNewspaper,
} from '@posthog/icons'
import { FIFTY_MILLION, MAX_PRODUCT_ANALYTICS, MILLION, TEN_MILLION } from 'components/Pricing/pricingLogic'
import { features } from './product_analytics/features'
import { applications, topFeatures } from './product_analytics/slides'

export const productAnalytics = {
    Icon: IconGraph,
    name: 'Product Analytics',
    handle: 'product_analytics',
    type: 'product_analytics',
    slug: 'product-analytics',
    teamSlug: 'product-analytics',
    forumTopicId: 349,
    color: 'blue',
    colorSecondary: 'sky-blue',
    category: 'analytics',
    wizardSupport: true,
    shortDescription: 'Understand how people use your product',
    pricingDescription:
        'Product analytics is billed on events captured – pageviews, clicks, custom events, and everything autocapture picks up. You get 1 million events free every month.',
    seo: {
        title: 'Product Analytics – Understand your product with PostHog',
        description:
            'Track usage, retention, and feature adoption with Product Analaytics. PostHog connects recordings, experiments, feature flags, and more for full product insight.',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/product_analytics_d5ab5a02cb.jpg',
    },
    /**
     * Sections rendered on the Product surface (`/product-analytics`). Each entry
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
        { slug: 'changelog', name: 'Changelog', group: 'divided', icon: <IconNewspaper className="size-4" /> },
        { slug: 'community', name: 'Questions?', group: 'divided', icon: <IconMessage className="size-4" /> },
        {
            slug: 'feature-comparison',
            name: 'Feature comparison',
            group: 'divided',
            icon: <IconList className="size-4" />,
        },
        {
            slug: 'installation',
            name: 'Install',
            group: 'divided',
            icon: <IconCode className="size-4" />,
        },
        { slug: 'getting-started', name: 'Get started', group: 'divided', icon: <IconRocket className="size-4" /> },
    ],
    /**
     * Sections rendered on the Pricing surface (`/product-analytics/pricing`).
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
        title: 'Product analytics with autocapture',
        description:
            'Product Analytics is one of the tools that makes your product self-driving: the measurement agents use to see what works. Built to natively work with session replay, feature flags, experiments, and surveys.',
        eli5: "Product Analytics turns what people do in your product into answers you can act on. Autocapture tracks pageviews, clicks, and form submissions without extra code. From there you build trends, funnels, retention curves, paths, and SQL queries – then jump straight into the session recordings behind any data point when you need the 'why'.",
        textColor: 'text-white', // tw
    },
    screenshots: {
        overview: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-product-analytics.png',
            alt: 'Product analytics screenshot',
            classes: '',
        },
        home: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_product_analytics_trend_light_703f700a5b.png',
            srcDark:
                'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_product_analytics_trend_dark_086dcec4b2.png',
            alt: 'Product analytics screenshot',
        },
        funnelVertical: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/funnel_vertical_light_3909cad637.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/funnel_vertical_dark_e0854a4c86.png',
            alt: 'Product analytics funnel',
        },
        funnels: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Products/Slider/images/funnel-basic.png',
            alt: 'Basic funnel visualization',
        },
        trends: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-trend-bar.png',
            alt: 'Trend bar visualization',
        },
        lifecycle: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-lifecycle.png',
            alt: 'Lifecycle visualization',
        },
        'user-paths': {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/user-guides/paths/example-light-mode.png',
            alt: 'User paths visualization',
        },
        'correlation-analysis': {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1716387676/posthog.com/contents/Screenshot_2024-05-22_at_3.20.17_PM.png',
            alt: 'Correlation analysis visualization',
        },
        retention: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/retention_light_805120c74c.png',
            alt: 'Retention visualization',
        },
        stickiness: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1716289464/posthog.com/contents/stickiness-light.png',
            alt: 'Stickiness visualization',
        },
        'sql-editor': {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_data_warehouse_light_b0cdbebe8f.png',
            alt: 'SQL editor',
        },
    },
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1/posthog.com/src/components/Product/hogs/product-analytics-hog.png',
        alt: 'A hedgehog presenting some shocking findings',
        classes: 'absolute bottom-0 right-4 max-w-lg',
    },
    hogs: {
        default: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1/posthog.com/src/components/Product/hogs/product-analytics-hog.png',
            alt: 'A hedgehog presenting some shocking findings',
        },
        mobileHog: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/PRODUCT_ANALYTICS_hog_23b2808c18.png',
            alt: 'A hedgehog presenting product analytics findings',
        },
    },
    slider: {
        // LogSlider uses Math.log – min/marks must be > 0 or labels stack at -Infinity.
        marks: [MILLION, TEN_MILLION, FIFTY_MILLION, MAX_PRODUCT_ANALYTICS],
        min: MILLION,
        max: MAX_PRODUCT_ANALYTICS,
    },
    volume: MILLION,
    worksWith: ['session_replay', 'feature_flags', 'surveys'],
    useCases: {
        intro: 'Product Analytics is used across teams depending on your role.',
        rows: [
            [
                'Product Engineers',
                'Check whether what you shipped is being used – and fix drop-off before the next release',
            ],
            [
                'Product Managers',
                'Dig into funnels, retention, and paths to guide roadmap decisions with real usage data',
            ],
            ['Growth Engineers', 'Find conversion leaks, measure experiments, and track activation end to end'],
            ['Founders', 'Monitor KPIs on a shared dashboard without waiting on a data team'],
            ['Support Engineers', 'Pull the events behind a customer report and jump into the matching session replay'],
        ],
    },
    features,
    mcp: {
        title: 'MCP',
        headline: 'Analyze product usage from your editor',
        description:
            'Query trends, funnels, retention, and usage metrics from Cursor, Claude Code, VS Code, or any MCP-compatible agent.',
    },
    installation: {
        title: 'Install',
        headline: 'Install',
        description:
            'Autocapture works out of the box on web. Add an SDK for mobile or backend when you need custom events.',
        productSlug: 'product-analytics',
        categories: ['web', 'mobile', 'backend-languages', 'backend-frameworks'],
    },
    postHogOnPostHog: {
        title: 'How PostHog uses Product Analytics',
        benefits: [
            {
                title: 'Track metrics',
                description: 'and monitor feature usage trends',
            },
            {
                title: 'Understand user behavior',
                description: 'by analyzing funnels and retention',
            },
            {
                title: 'Identify opportunities',
                description: 'by filtering based on drop-offs and conversion rates',
            },
            {
                title: 'Find out when things change',
                description: 'by setting up dashboards and alerts',
            },
            {
                title: 'Make data-driven decisions',
                description: 'by linking insights to session replays',
            },
        ],
    },
    questions: [
        {
            question: 'How do I calculate new vs returning users?',
            url: '/tutorials/track-new-returning-users',
        },
        {
            question: "What's my churn rate? / How can I reduce churn?",
            url: '/tutorials/churn-rate',
        },
        {
            question: 'What features have the highest churn?',
            url: '/tutorials/churn-rate#lifecycle-charts',
        },
        {
            question: 'Which of my features increase user retention?',
            url: '/tutorials/feature-retention',
        },
        {
            question: 'How do I track ad conversion?',
            url: '/tutorials/performance-marketing#tracking-conversion-from-traffic-to-signups',
        },
        {
            question: 'How can I find my power users? / What are my power users doing differently?',
            url: '/tutorials/power-users#identifying-your-power-user',
        },
        {
            question: 'Where do my users spend the most time on?',
            url: '/tutorials/session-metrics',
        },
        {
            question: 'How do I get insights about my data using regex?',
            url: '/tutorials/regex-basics',
        },
        {
            question: 'How are changes improving my activation flow?',
            url: '/tutorials/explore-insights-session-recordings#watching-users-through-funnels',
        },
        {
            question: 'How do far are my users scrolling down my app?',
            url: '/tutorials/scroll-depth',
        },
        {
            question: 'How to I track performance marketing?',
            url: '/tutorials/performance-marketing',
        },
        {
            question: 'How many users return to use my product each day?',
            url: '/tutorials/track-new-returning-users#calculating-returning-users',
        },
        {
            question: 'How many users return to use my product each week?',
            url: '/tutorials/track-new-returning-users',
        },
    ],
    comparison: {
        summary: {
            them: [
                {
                    title: 'You want to use your own warehouse like Snowflake',
                },
                {
                    title: 'You need something extremely simple',
                    subtitle: 'Just use Web Analytics!',
                    subtitleUrl: '/web-analytics',
                },
            ],
            us: [
                {
                    title: 'Agents can query your analytics and act on it – the context that powers self-driving',
                },
                {
                    title: 'Linking between analytics and other features, so you can jump from a graph to a relevant recording',
                },
                {
                    title: 'Formula mode and SQL access to enable deeper analysis',
                },
                {
                    title: 'Automatic correlation analysis to find significant events',
                },
                {
                    title: 'Group analytics for teams with B2B customers',
                },
            ],
        },
        companies: [
            {
                name: 'Amplitude',
                key: 'amplitude',
                link: '/blog/posthog-vs-amplitude',
            },
            {
                name: 'Mixpanel',
                key: 'mixpanel',
                link: '/blog/posthog-vs-mixpanel',
            },
            {
                name: 'Heap',
                key: 'heap',
                link: '/blog/posthog-vs-heap',
            },
            {
                name: 'Pendo',
                key: 'pendo',
                link: '/blog/posthog-vs-pendo',
            },
            {
                name: 'Statsig',
                key: 'statsig',
                link: '/blog/posthog-vs-statsig',
            },
            {
                name: 'PostHog',
                key: 'posthog',
            },
        ],
        rows: ['product_analytics'],
        excluded_sections: ['platform.integrations'],
        require_complete_data: true,
    },
    pairsWith: [
        {
            slug: 'session-replay',
            description:
                'Jump into a playlist of session recordings directly from any point in a graph, or segment of a funnel',
        },
        {
            slug: 'feature-flags',
            description: "See which feature flags are enabled for a user's session",
        },
        {
            slug: 'experiments',
            description:
                'Generate a playlist of recordings limited to an A/B test or specific group within a multivariate experiment.',
        },
    ],
    ai: {
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/PRODUCT_ANALYTICS_hog_23b2808c18.png',
        imageAlt: 'PostHog AI and product analytics',
        intro: 'Ask PostHog AI to answer product questions, build insights, and write SQL.',
        mcpFeatures: ['product_analytics', 'insights', 'sql', 'dashboards'],
        groups: [
            {
                title: 'Trends & usage',
                tool: 'query-trends',
                prompts: [
                    "What's our most popular feature?",
                    'Show daily active users for the last 30 days, broken down by plan',
                    'Why did sign-ups drop 12% last Tuesday?',
                    'Which features do my power users engage with most?',
                ],
            },
            {
                title: 'Funnels',
                tool: 'query-funnel',
                prompts: [
                    'Build a funnel from landing page to paid conversion, broken down by marketing source',
                    'Which events have the highest drop-off rate in the past 7 days?',
                    'Where do users drop off between signup and project_created?',
                    'Show me people who reached checkout but never purchased',
                ],
            },
            {
                title: 'Retention',
                tool: 'query-retention',
                prompts: [
                    'Build a retention curve to track user retention over time',
                    "Show weekly retention for users who completed onboarding vs those who didn't",
                    'Which features correlate with higher day-7 retention?',
                    "What's our churn rate for users who signed up last month?",
                ],
            },
            {
                title: 'Build & save',
                tool: 'insight-create',
                prompts: [
                    'Create a trend showing daily active users broken down by plan, then save it to a dashboard',
                    'Build a dashboard for onboarding activation metrics',
                    'Save a funnel from signup to paid as an insight named Activation',
                ],
            },
            {
                title: 'SQL',
                tool: 'execute-sql',
                prompts: [
                    'Write HogQL for unique users who triggered signup_completed but not project_created',
                    'Query the top 10 events by volume this week',
                    'Join person properties with event data to list enterprise accounts that churned',
                ],
            },
        ],
    },
    presenterNotes: {
        overview:
            "<strong>Presenter notes:</strong> Product analytics tells you what's happening in your product. PostHog is different than others because every product we build is natively integrated. This means you can jump from a graph to a session recording to visually see why something happened. Plus we use autocapture, which tracks every click and pageview automatically. No more realizing you forgot to track something important – you can define events retroactively (we call these 'actions').",
        features:
            "<strong>Funnels:</strong> Shows where users drop off. What's different: correlation analysis finds what makes users convert. Jump directly from any funnel step to watch those exact users' session recordings.<br /><br /><strong>Graph & trends:</strong> Your standard line charts plus formula mode for things like DAU/MAU. Break down by any property. Built-in sampling for when you have billions of events.<br /><br /><strong>Lifecycle:</strong> See who's new, returning, dormant, or coming back. Tells you if you're churning users as fast as you're getting them. Click any segment to dig deeper.<br /><br /><strong>User Paths:</strong> See the actual routes users take. Start anywhere, end anywhere. Use wildcards to group similar pages. Great for finding unexpected user behavior.<br /><br /><strong>Correlation Analysis:</strong> Automatically finds what successful users do differently. We've seen teams discover random actions that triple conversion rates.<br /><br /><strong>Retention:</strong> Define what 'return' means for your product. Compare cohorts. Click any data point to see the actual users. Way more flexible than standard retention charts.<br /><br /><strong>Stickiness:</strong> How often users do key actions. Different from retention - this is about depth, not just coming back. Helps you find power users.<br /><br /><strong>Powerful tools & features:</strong><br /><br /><strong>Dashboards:</strong> Unlimited. Real-time. Share publicly or embed. Subscribe via email/Slack.<br /><br /><strong>SQL:</strong> Write queries against your data. No separate data warehouse needed – though it works with yours if you have one, or you can <a href='/data-stack'>use ours</a>.<br /><br /><strong>Autocapture:</strong> Tracks everything automatically. Add custom events when you need them.<br /><br /><strong>Privacy controls:</strong> Mask sensitive data. Block internal users. EU data residency available.<br /><br /><strong>Group analytics:</strong> Track companies, not just users. See how all seat activity rolls up to the entire account level – essential for B2B.",
        answers:
            'These questions come from real users. The cool thing is you can answer them without writing code or bothering engineering. Define churn however you want, find those users, see what they did differently. Then watch their last sessions to understand why they left. Power users? We automatically find who uses features most. Make cohorts, message them differently, whatever you need.',
        pricing:
            "1 million events free every month. Forever. Then it's pay-as-you-go, and the price goes down as you use more. No seat limits - everyone on your team can use it. Anonymous events cost way less than identified ones. Set billing limits so there's no surprises. You see usage in real-time. No annual contracts required.",
        'comparison-summary':
            "Other companies buy tools and try to glue them together. We built everything from scratch to work as one system. Because it's one system, agents can act on your analytics directly – it's not just a dashboard, it's the context that makes your product self-driving. We're also open source, so you can self-host if you want. Our pricing actually makes sense at scale. Basically, we're built by engineers for engineers.",
        'feature-comparison':
            "We don't have everything. No predictive analytics (yet). But what we do have goes deeper than anyone else. Our funnels have correlation analysis. Our paths support regex. These details matter when you're trying to actually understand your data, not just make pretty charts.",
        docs: "Engineers write our docs. Not marketing, not technical writers - the people who built the features. So they're actually accurate and cover the weird edge cases you'll hit. We update them constantly based on user questions. Over 100k people read them every month because they're genuinely helpful.",
        'pairs-with':
            "This is where it gets good. See a drop in your funnel? Click to watch those exact users' sessions. Running an A/B test? All your analytics automatically filter by variant. Same user IDs, same properties, same everything. No CSV exports or data matching required.",
        'getting-started':
            "Add one line of code. You're now tracking everything - clicks, pageviews, the works. See data in minutes. As you grow, add custom events or whatever else you need. The whole thing scales with you. And since it's open source, you own your data forever.",
        ai: 'The PostHog MCP server gives your AI coding agent direct access to PostHog analytics. Query trends, funnels, retention, and custom HogQL – all from your code editor.',
    },
}

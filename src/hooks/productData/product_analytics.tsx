import React from 'react'
import {
    IconGraph,
    IconFunnels,
    IconTrends,
    IconLifecycle,
    IconUserPaths,
    IconCorrelationAnalysis,
    IconRetention,
    IconStickiness,
    IconDatabase,
    IconPeople,
} from '@posthog/icons'
import { FIFTY_MILLION, MAX_PRODUCT_ANALYTICS, MILLION, TEN_MILLION } from 'components/Pricing/pricingLogic'
import Link from 'components/Link'

export const productAnalytics = {
    Icon: IconGraph,
    name: 'Product Analytics',
    slug: 'product-analytics',
    handle: 'product_analytics',
    type: 'product_analytics',
    color: 'blue',
    colorSecondary: 'sky-blue',
    category: 'analytics',
    seo: {
        title: 'Product Analytics – Understand your product with PostHog',
        description:
            'Track usage, retention, and feature adoption with Product Analaytics. PostHog connects replays, experiments, feature flags, and more for full product insight.',
    },
    overview: {
        title: 'Product analytics with autocapture',
        description:
            'PostHog is the only product analytics platform built to natively work with session replay, feature flags, experiments, and surveys.',
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
    },
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1/posthog.com/src/components/Product/hogs/product-analytics-hog.png',
        alt: 'A hedgehog presenting some shocking findings',
        classes: 'absolute bottom-0 right-4 max-w-lg',
    },
    slider: {
        marks: [0, MILLION, TEN_MILLION, FIFTY_MILLION, MAX_PRODUCT_ANALYTICS],
        min: 0,
        max: MAX_PRODUCT_ANALYTICS,
    },
    volume: 1000000,
    worksWith: ['session_replay', 'feature_flags', 'surveys'],
    customers: {
        ycombinator: {
            headline: 'gathers 30% more data than with Google Analytics',
            description: 'We could autocapture... events using the JS snippet and... configure custom events.',
        },
        hasura: {
            headline: 'improved conversion rates by 10-20%',
            description: 'we observed drop-offs at very particular stages of our onboarding flow.',
        },
        contra: {
            headline: 'increased registrations by 30%',
            description: 'From [funnels], we could easily jump to session replays to see the drop-off point.',
        },
        speakeasy: {
            headline: 'manages features and developer relations',
            description: '...top-to-bottom view of conversion rates and user paths, without... extra setup time.',
        },
    },
    features: [
        {
            title: 'Funnels',
            headline: 'Find drop-off across a series of actions',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Products/Slider/images/funnel-basic.png',
                    alt: 'Basic funnel visualization',
                },
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Products/Slider/images/funnel-grouped.png',
                    alt: 'Grouped funnel visualization',
                },
            ],
            features: [
                {
                    title: 'Filtering',
                    description:
                        'Set filters for individual steps – or the entire funnel – by person property, group or cohort, or event property',
                },
                {
                    title: 'Graph types',
                    description:
                        "Track user progression between steps, conversion time between each step, and how a funnel's conversion rate changes over time",
                },
                {
                    title: 'Step ordering',
                    description:
                        'Choose between a sequential series of steps, a strict order, or any order of steps that lead to conversion',
                },
                {
                    title: 'Granular controls',
                    description:
                        'Set conversion window limit, add exclusionary steps, set attribution type, and see the relative conversion rate between each step',
                },
            ],
            icon: <IconFunnels />,
            color: 'blue',
        },
        {
            title: 'Graph & trends',
            headline: 'Visualize user data with graphs, tables, charts, maps, and more',
            icon: <IconTrends />,
            color: 'yellow',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-trend-bar.png',
                    alt: 'Trend bar visualization',
                },
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-trend-multiple-sparklines.png',
                    alt: 'Multiple sparklines visualization',
                },
            ],
            features: [
                {
                    title: 'Trends',
                    description:
                        'Plot any event over time, such as a feature being used. You can even do math and multiple series.',
                },
                {
                    title: 'Advanced filtering',
                    description:
                        'Apply however many filters you need to or breakdown by any event, user or group property with advanced logic.',
                },
                {
                    title: 'Breakout tables',
                    description: 'Break out your trends by any event property.',
                },
                {
                    title: 'Sampling',
                    description: 'Speed up long running queries across large datasets in one click.',
                },
            ],
        },
        {
            title: 'Lifecycle',
            headline: 'Track user engagement over time',
            description:
                'Analyze active users break down, highlighting those who have recently stopped being active or those who have just become active for the first time.',
            icon: <IconLifecycle />,
            color: 'purple',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-lifecycle.png',
                    alt: 'Lifecycle visualization',
                },
            ],
            features: [
                {
                    title: 'User categories',
                    description:
                        'Track new, returning, resurrecting, and dormant users to understand engagement patterns',
                },
                {
                    title: 'Time-based analysis',
                    description:
                        "Configure intervals (hour, day, week, month) to match your product's natural usage patterns",
                },
                {
                    title: 'Detailed breakdowns',
                    description:
                        'View individual users in each category and analyze their behavior through session recordings',
                },
                {
                    title: 'Integration',
                    description:
                        'Works with cohorts, feature flags, and other Product OS features and tools for comprehensive analysis',
                },
            ],
        },
        {
            title: 'User Paths',
            headline: 'Understand user navigation patterns',
            description:
                "Track how users navigate through your product, identify where they get stuck, and discover why they aren't finding new features.",
            icon: <IconUserPaths />,
            color: 'green',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/user-guides/paths/example-light-mode.png',
                    alt: 'User paths visualization',
                },
            ],
            features: [
                {
                    title: 'Path visualization',
                    description: 'See the most common paths users take through your product',
                },
                {
                    title: 'Drop-off analysis',
                    description: 'Identify where users are getting stuck or abandoning their journey',
                },
                {
                    title: 'Session recordings',
                    description: 'View recordings of user sessions to understand their behavior',
                },
                {
                    title: 'Cohort creation',
                    description: 'Create cohorts of users who follow specific paths for further analysis',
                },
            ],
        },
        {
            title: 'Correlation Analysis',
            headline: 'Discover factors affecting conversion',
            description: 'Automatically identify significant factors that impact user behavior and conversion rates.',
            icon: <IconCorrelationAnalysis />,
            color: 'red',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1716387676/posthog.com/contents/Screenshot_2024-05-22_at_3.20.17_PM.png',
                    alt: 'Correlation analysis visualization',
                },
            ],
            features: [
                {
                    title: 'Automatic detection',
                    description: 'Automatically highlight significant factors affecting conversion',
                },
                {
                    title: 'Property analysis',
                    description: 'Analyze how different user properties impact behavior',
                },
                {
                    title: 'Event correlation',
                    description: 'Discover which events are most strongly correlated with success',
                },
                {
                    title: 'Cohort creation',
                    description: 'Create cohorts based on correlation analysis results',
                },
            ],
        },
        {
            title: 'Retention',
            headline: 'Track user return rates',
            description:
                'Measure how many users come back to your product over time and compare retention between different user segments.',
            icon: <IconRetention />,
            color: 'blue',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/retention_light_805120c74c.png',
                    alt: 'Retention visualization',
                },
            ],
            features: [
                {
                    title: 'Cohort analysis',
                    description: 'Compare retention rates between different user cohorts',
                },
                {
                    title: 'Time-based tracking',
                    description: 'Track retention over hours, days, weeks, or months',
                },
                {
                    title: 'First-time vs recurring',
                    description: 'Analyze both first-time and recurring user retention',
                },
                {
                    title: 'Detailed breakdowns',
                    description: 'Break down retention by user properties and segments',
                },
            ],
        },
        {
            title: 'Stickiness',
            headline: 'Measure user engagement depth',
            description: 'Track how frequently users engage with your product and identify your most engaged users.',
            icon: <IconStickiness />,
            color: 'yellow',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1716289464/posthog.com/contents/stickiness-light.png',
                    alt: 'Stickiness visualization',
                },
            ],
            features: [
                {
                    title: 'Engagement frequency',
                    description: 'Track how many times users perform specific actions',
                },
                {
                    title: 'User segmentation',
                    description: 'Identify your most engaged users and their characteristics',
                },
                {
                    title: 'Feature analysis',
                    description: 'Determine which features drive the most engagement',
                },
                {
                    title: 'Time-based analysis',
                    description: 'Analyze engagement patterns over different time periods',
                },
            ],
        },
        {
            title: 'SQL editor',
            headline: 'Write SQL against your data',
            description:
                'No separate data warehouse needed – though it works with yours if you have one, or you can use ours.',
            icon: <IconDatabase />,
            color: 'purple',
            layout: 'columns',
            features: [
                {
                    title: 'Write custom queries',
                    description: 'Query product data and join tables to bring warehouse data into the mix',
                },
                {
                    title: 'Visualize data in tables, trends, charts and more',
                    description: 'Customize visualizations with colors, goals, scales, legends, and more',
                },
                {
                    title: 'Get help writing SQL',
                    description: (
                        <>
                            <Link href="/max" state={{ newWindow: true }}>
                                Max AI
                            </Link>{' '}
                            knows your data and can write syntax for you.
                        </>
                    ),
                },
            ],
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_data_warehouse_light_b0cdbebe8f.png',
                    alt: 'SQL editor',
                    shadow: true,
                },
            ],
        },
        {
            title: 'Group analytics',
            headline: 'Track companies, not just individuals',
            description: 'See how all seat activity rolls up to the entire account level – essential for B2B.',
            icon: <IconPeople />,
            color: 'green',
            features: [
                {
                    title: 'Track organizations, companies, teams, projects',
                    description: '',
                },
                {
                    title: 'Filter, build cohorts based on group properties',
                    description: '',
                },
                {
                    title: 'Measure activation and retention at a group level',
                    description: '',
                },
                {
                    title: 'Target feature flags at groups',
                    description: '',
                },
            ],
        },
    ],
    ai: {
        // title: '',
        description: 'answer product questions faster',
        skills: [
            'Creates insights and applies filters using natural language',
            'Creates dashboards',
            'Searches insights',
            'Researches complex questions with Deep Research mode',
        ],
        prompts: [
            "What's my churn rate?",
            'Show me user retention by country',
            'How many people signed up last month?',
            "What's my most popular feature?",
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
                    title: 'Linking between analytics and other features, so you can jump from a graph to a relevant recording',
                },
                // {
                //     title: 'Wide range of insight types for analyzing data',
                // },
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
                name: 'PostHog',
                key: 'posthog',
            },
        ],
        features: [
            {
                feature: 'Insights',
                type: 'header',
                companies: {
                    amplitude: '',
                    mixpanel: '',
                    heap: '',
                    pendo: '',
                    posthog: '',
                },
            },
            {
                feature: 'Ready-made insight types',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: true,
                    pendo: true,
                    posthog: true,
                },
            },
            {
                feature: 'SQL mode',
                companies: {
                    amplitude: 'Exports only',
                    mixpanel: 'JQL only',
                    heap: 'Exports only',
                    pendo: 'Exports only',
                    posthog: true,
                },
            },
            {
                feature: 'Funnels',
                type: 'header',
                companies: {
                    amplitude: '',
                    mixpanel: '',
                    heap: '',
                    pendo: '',
                    posthog: '',
                },
            },
            {
                feature: 'Conversion funnels',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: true,
                    pendo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Historical trends',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: true,
                    pendo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Time to convert insights',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: false,
                    pendo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Sequential step order',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: true,
                    pendo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Strict step order',
                companies: {
                    amplitude: true,
                    mixpanel: false,
                    heap: false,
                    pendo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Any step order',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: false,
                    pendo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Exclusion events',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: false,
                    pendo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Conversion windows',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: true,
                    pendo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Reveal user paths between steps',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: true,
                    pendo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Anomaly detection',
                companies: {
                    amplitude: true,
                    mixpanel: false,
                    heap: false,
                    pendo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Filter internal and test users',
                companies: {
                    amplitude: false,
                    mixpanel: false,
                    heap: false,
                    pendo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Filter by cohort',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: true,
                    pendo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Filter by person property',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: true,
                    pendo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Breakdown by person property',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: true,
                    pendo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Correlation analysis',
                companies: {
                    amplitude: true,
                    mixpanel: false,
                    heap: true,
                    pendo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Path analysis',
                type: 'header',
                companies: {
                    amplitude: '',
                    mixpanel: '',
                    heap: '',
                    pendo: '',
                    posthog: '',
                },
            },
            {
                feature: 'Reveal paths from a start point',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: true,
                    pendo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Reveal paths from an end point',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: true,
                    pendo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Reveal paths between points',
                companies: {
                    amplitude: false,
                    mixpanel: true,
                    heap: false,
                    pendo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Reveal paths within funnels',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: true,
                    pendo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Zoom in/out',
                companies: {
                    amplitude: true,
                    mixpanel: false,
                    heap: false,
                    pendo: false,
                    posthog: false,
                },
            },
            {
                feature: 'Define number of users on path',
                companies: {
                    amplitude: false,
                    mixpanel: false,
                    heap: false,
                    pendo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Track pageviews',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: true,
                    pendo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Track custom events',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: true,
                    pendo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Filter internal and test users',
                companies: {
                    amplitude: false,
                    mixpanel: false,
                    heap: false,
                    pendo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Filter by cohort',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: true,
                    pendo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Filter by events or person property',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: true,
                    pendo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Include and exclude Wildcards',
                companies: {
                    amplitude: false,
                    mixpanel: false,
                    heap: false,
                    pendo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Exclusion events',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: true,
                    pendo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Hide repeating steps',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: false,
                    pendo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Regex for path cleaning',
                companies: {
                    amplitude: false,
                    mixpanel: false,
                    heap: false,
                    pendo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Max number of steps',
                companies: {
                    amplitude: '50',
                    mixpanel: '120+',
                    heap: '10',
                    pendo: '20',
                    posthog: '20',
                },
            },
            {
                feature: 'Dashboards',
                type: 'header',
                companies: {
                    amplitude: '',
                    mixpanel: '',
                    heap: '',
                    pendo: '',
                    posthog: '',
                },
            },
            {
                feature: 'User-level permissions',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: true,
                    pendo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Project-level permissions',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: true,
                    pendo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Dashboard-level permissions',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: true,
                    pendo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Share dashboards externally',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: false,
                    pendo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Embed dashboards anywhere',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: false,
                    pendo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Subscribe to dashboards',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: false,
                    pendo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Pinned dashboards',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: true,
                    pendo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Dashboard & insight tags',
                companies: {
                    amplitude: false,
                    mixpanel: false,
                    heap: false,
                    pendo: false,
                    posthog: true,
                },
            },

            {
                feature: 'Annotations',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: false,
                    pendo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Private insights',
                companies: {
                    amplitude: true,
                    mixpanel: true,
                    heap: true,
                    pendo: true,
                    posthog: false,
                },
            },
        ],
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
    presenterNotes: {
        overview:
            "<strong>Presenter notes:</strong> Product analytics tells you what's happening in your product. PostHog is different than others because every product we build is natively integrated. This means you can jump from a graph to a session recording to visually see why something happened. Plus we use autocapture, which tracks every click and pageview automatically. No more realizing you forgot to track something important – you can define events retroactively (we call these 'actions').",
        customers:
            "Y Combinator gets 30% more data than they did with Google Analytics using a reverse proxy. Hasura found drop-offs they'd never seen before and fixed them. Contra watched recordings of users who dropped off and increased registrations by 30%. When you can understand the 'why' behind the numbers, fixing things gets a lot easier.",
        features:
            "<strong>Funnels:</strong> Shows where users drop off. What's different: correlation analysis finds what makes users convert. Jump directly from any funnel step to watch those exact users' session recordings.<br /><br /><strong>Graph & trends:</strong> Your standard line charts plus formula mode for things like DAU/MAU. Break down by any property. Built-in sampling for when you have billions of events.<br /><br /><strong>Lifecycle:</strong> See who's new, returning, dormant, or coming back. Tells you if you're churning users as fast as you're getting them. Click any segment to dig deeper.<br /><br /><strong>User Paths:</strong> See the actual routes users take. Start anywhere, end anywhere. Use wildcards to group similar pages. Great for finding unexpected user behavior.<br /><br /><strong>Correlation Analysis:</strong> Automatically finds what successful users do differently. We've seen teams discover random actions that triple conversion rates.<br /><br /><strong>Retention:</strong> Define what 'return' means for your product. Compare cohorts. Click any data point to see the actual users. Way more flexible than standard retention charts.<br /><br /><strong>Stickiness:</strong> How often users do key actions. Different from retention - this is about depth, not just coming back. Helps you find power users.<br /><br /><strong>Powerful tools & features:</strong><br /><br /><strong>Dashboards:</strong> Unlimited. Real-time. Share publicly or embed. Subscribe via email/Slack.<br /><br /><strong>SQL:</strong> Write queries against your data. No separate data warehouse needed – though it works with yours if you have one, or you can <a href='/data-warehouse'>use ours</a>.<br /><br /><strong>Autocapture:</strong> Tracks everything automatically. Add custom events when you need them.<br /><br /><strong>Privacy controls:</strong> Mask sensitive data. Block internal users. EU data residency available.<br /><br /><strong>Group analytics:</strong> Track companies, not just users. See how all seat activity rolls up to the entire account level – essential for B2B.",
        answers:
            'These questions come from real users. The cool thing is you can answer them without writing code or bothering engineering. Define churn however you want, find those users, see what they did differently. Then watch their last sessions to understand why they left. Power users? We automatically find who uses features most. Make cohorts, message them differently, whatever you need.',
        pricing:
            "1 million events free every month. Forever. Then it's pay-as-you-go, and the price goes down as you use more. No seat limits - everyone on your team can use it. Anonymous events cost way less than identified ones. Set billing limits so there's no surprises. You see usage in real-time. No annual contracts required.",
        'comparison-summary':
            "Other companies buy tools and try to glue them together. We built everything from scratch to work as one system. We're also open source, so you can self-host if you want. Our pricing actually makes sense at scale. Basically, we're built by engineers for engineers.",
        'feature-comparison':
            "We don't have everything. No predictive analytics (yet). But what we do have goes deeper than anyone else. Our funnels have correlation analysis. Our paths support regex. These details matter when you're trying to actually understand your data, not just make pretty charts.",
        docs: "Engineers write our docs. Not marketing, not technical writers - the people who built the features. So they're actually accurate and cover the weird edge cases you'll hit. We update them constantly based on user questions. Over 100k people read them every month because they're genuinely helpful.",
        'pairs-with':
            "This is where it gets good. See a drop in your funnel? Click to watch those exact users' sessions. Running an A/B test? All your analytics automatically filter by variant. Same user IDs, same properties, same everything. No CSV exports or data matching required.",
        'getting-started':
            "Add one line of code. You're now tracking everything - clicks, pageviews, the works. See data in minutes. As you grow, add custom events or whatever else you need. The whole thing scales with you. And since it's open source, you own your data forever.",
    },
}

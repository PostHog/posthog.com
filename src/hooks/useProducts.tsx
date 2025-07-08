import React from 'react'
import {
    IconDatabase,
    IconWarning,
    IconFlask,
    IconGraph,
    IconMessage,
    IconRewindPlay,
    IconPlug,
    IconToggle,
    IconFunnels,
    IconTrends,
    IconLifecycle,
    IconUserPaths,
    IconCorrelationAnalysis,
    IconRetention,
    IconStickiness,
    IconHogQL,
} from '@posthog/icons'
import { IconJavaScript, IconApple, IconAndroid, IconFlutter, IconReactNative } from 'components/OSIcons/Icons'
import { calculatePrice } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import { FIFTY_MILLION, MAX_PRODUCT_ANALYTICS, MILLION, TEN_MILLION } from 'components/Pricing/pricingLogic'
import { graphql, useStaticQuery } from 'gatsby'
import { useMemo, useState } from 'react'
import OSButton from 'components/OSButton'
import Link from 'components/Link'
import CodeBlock from 'components/Home/CodeBlock'
import CloudinaryImage from 'components/CloudinaryImage'
import SnippetRenderer from 'components/SnippetRenderer'

const initialProducts = [
    {
        Icon: IconGraph,
        name: 'Product analytics',
        slug: 'product-analytics',
        handle: 'product_analytics',
        type: 'product_analytics',
        color: 'blue',
        colorSecondary: 'sky-blue',
        category: 'analytics',
        seo: {
            title: 'Product analytics - PostHog',
            description:
                'PostHog is the only product analytics platform built to natively work with session replay, feature flags, experiments, and surveys.',
        },
        overview: {
            title: 'Product analytics with autocapture',
            description:
                'PostHog is the only product analytics platform built to natively work with session replay, feature flags, experiments, and surveys.',
            textColor: 'text-white', // tw
        },
        screenshots: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-product-analytics.png',
                alt: 'Product analytics screenshot',
                classes: '',
            },
        ],
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
        sharesFreeTier: 'web_analytics',
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
                headline: 'Track user engagement patterns over time',
                description:
                    'Discover how your active users break down, highlighting those who have recently stopped being active or those who have just become active for the first time.',
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
                            'Works with cohorts, feature flags, and other PostHog features for comprehensive analysis',
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
                description:
                    'Automatically identify significant factors that impact user behavior and conversion rates.',
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
                description:
                    'Track how frequently users engage with your product and identify your most engaged users.',
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
                title: 'Powerful tools & features',
                headline: 'Everything you need for comprehensive analytics',
                description:
                    'From automatic data capture to custom SQL queries, get all the tools for modern product analytics.',
                features: [
                    {
                        title: 'Dashboards',
                        description: 'Create custom dashboards to monitor key metrics and share insights',
                    },
                    {
                        title: 'HogQL',
                        description: 'Write SQL queries to analyze data in ways beyond standard insights',
                    },
                    {
                        title: 'Autocapture',
                        description:
                            'Automatically capture clicks, pageviews, and form submissions without manual tracking',
                    },
                    {
                        title: 'LLM insights',
                        description: 'Track costs, latency, and usage patterns for AI/LLM applications',
                    },
                    {
                        title: 'Privacy controls',
                        description: 'Limit data capture with sensitive info blocking and EU cloud options',
                    },
                    {
                        title: 'Sharing & embedding',
                        description: 'Share insights publicly or embed dashboards in your app',
                    },
                    {
                        title: 'Subscriptions',
                        description: 'Send regular reports via email or Slack on custom schedules',
                    },
                    {
                        title: 'Alerts',
                        description: 'Get notified when metrics exceed thresholds or change significantly',
                    },
                    {
                        title: 'Sampling',
                        description: 'Speed up complex queries on large datasets while maintaining accuracy',
                    },
                    {
                        title: 'Group analytics',
                        description: 'Analyze data at company or team level for B2B products',
                    },
                ],
            },
        ],
        questions: [
            {
                question: 'How do I calculate new vs returning users?',
                url: '/tutorials/track-new-returning-users',
            },
            {
                question: "What's my churn rate? / How can I lower my churn rate ? ",
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
                question: 'How do I measure growth loops?',
                url: '/blog/growth-loops#measuring-your-growth-loop',
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
                        title: 'Time-based analysis for web analytics (e.g. time on page)',
                        subtitle: "We're working on this!",
                        subtitleUrl: 'https://posthog.com/teams/web-analytics',
                    },
                    {
                        title: 'Predictive analytics for extrapolating events into the future',
                    },
                    {
                        title: 'Alerting for when events move beyond set thresholds',
                        subtitle: "We're working on this!",
                    },
                ],
                us: [
                    {
                        title: 'Linking between analytics and other features, so you can jump from a graph to a relevant recording',
                    },
                    {
                        title: 'Wide range of insight types for analyzing data',
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
            features: [
                {
                    feature: '<strong>Funnels</strong>',
                    companies: {
                        Amplitude: '',
                        Mixpanel: '',
                        Heap: '',
                        Pendo: '',
                        PostHog: '',
                    },
                },
                {
                    feature: 'Conversion funnels',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: true,
                        Pendo: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Historical trends',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: true,
                        Pendo: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Time to convert insights',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: false,
                        Pendo: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Sequential step order',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: true,
                        Pendo: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Strict step order',
                    companies: {
                        Amplitude: true,
                        Mixpanel: false,
                        Heap: false,
                        Pendo: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Any step order',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: false,
                        Pendo: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Exclusion events',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: false,
                        Pendo: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Conversion windows',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: true,
                        Pendo: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Reveal user paths between steps',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: true,
                        Pendo: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Anomaly detection',
                    companies: {
                        Amplitude: true,
                        Mixpanel: false,
                        Heap: false,
                        Pendo: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Filter internal and test users',
                    companies: {
                        Amplitude: false,
                        Mixpanel: false,
                        Heap: false,
                        Pendo: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Filter by cohort',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: true,
                        Pendo: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Filter by person property',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: true,
                        Pendo: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Breakdown by person property',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: true,
                        Pendo: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Correlation analysis',
                    companies: {
                        Amplitude: true,
                        Mixpanel: false,
                        Heap: true,
                        Pendo: false,
                        PostHog: true,
                    },
                },
                {
                    feature: '<strong>Path analysis</strong>',
                    companies: {
                        Amplitude: '',
                        Mixpanel: '',
                        Heap: '',
                        Pendo: '',
                        PostHog: '',
                    },
                },
                {
                    feature: 'Reveal paths from a start point',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: true,
                        Pendo: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Reveal paths from an end point',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: true,
                        Pendo: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Reveal paths between points',
                    companies: {
                        Amplitude: false,
                        Mixpanel: true,
                        Heap: false,
                        Pendo: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Reveal paths within funnels',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: true,
                        Pendo: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Zoom in/out',
                    companies: {
                        Amplitude: true,
                        Mixpanel: false,
                        Heap: false,
                        Pendo: false,
                        PostHog: false,
                    },
                },
                {
                    feature: 'Define number of users on path',
                    companies: {
                        Amplitude: false,
                        Mixpanel: false,
                        Heap: false,
                        Pendo: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Track pageviews',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: true,
                        Pendo: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Track custom events',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: true,
                        Pendo: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Filter internal and test users',
                    companies: {
                        Amplitude: false,
                        Mixpanel: false,
                        Heap: false,
                        Pendo: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Filter by cohort',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: true,
                        Pendo: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Filter by events or person property',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: true,
                        Pendo: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Include and exclude Wildcards',
                    companies: {
                        Amplitude: false,
                        Mixpanel: false,
                        Heap: false,
                        Pendo: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Exclusion events',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: true,
                        Pendo: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Hide repeating steps',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: false,
                        Pendo: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Regex for path cleaning',
                    companies: {
                        Amplitude: false,
                        Mixpanel: false,
                        Heap: false,
                        Pendo: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Max number of steps',
                    companies: {
                        Amplitude: '50',
                        Mixpanel: '120+',
                        Heap: '10',
                        Pendo: '20',
                        PostHog: '20',
                    },
                },
                {
                    feature: '<strong>Dashboards</strong>',
                    companies: {
                        Amplitude: '',
                        Mixpanel: '',
                        Heap: '',
                        Pendo: '',
                        PostHog: '',
                    },
                },
                {
                    feature: 'User-level permissions',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: true,
                        Pendo: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Project-level permissions',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: true,
                        Pendo: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Dashboard-level permissions',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: true,
                        Pendo: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Share dashboards externally',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: false,
                        Pendo: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Embed dashboards anywhere',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: false,
                        Pendo: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Subscribe to dashboards',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: false,
                        Pendo: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Pinned dashboards',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: true,
                        Pendo: true,
                        PostHog: true,
                    },
                },
                {
                    feature: '',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: true,
                        Pendo: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Dashboard & insight tags',
                    companies: {
                        Amplitude: false,
                        Mixpanel: false,
                        Heap: false,
                        Pendo: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Webhooks',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: false,
                        Pendo: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Annotations',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: false,
                        Pendo: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Private insights',
                    companies: {
                        Amplitude: true,
                        Mixpanel: true,
                        Heap: true,
                        Pendo: true,
                        PostHog: false,
                    },
                },
                {
                    feature: 'Apps / integrations',
                    companies: {
                        Amplitude: '70+',
                        Mixpanel: '50+',
                        Heap: '40+',
                        Pendo: '40+',
                        PostHog: '50+',
                    },
                },
            ],
        },
    },
    {
        Icon: IconRewindPlay,
        name: 'Session replay',
        handle: 'session_replay',
        type: 'session_replay',
        slug: 'session-replay',
        answersDescription: 'Understand user behavior, identify friction points, and improve your product experience',
        color: 'yellow',
        colorSecondary: '[#B56C00]',
        category: 'product',
        seo: {
            title: 'Session replay - PostHog',
            description: 'Watch people use your product to diagnose issues and understand user behavior',
        },
        overview: {
            title: 'Watch people use your product',
            description:
                'Play back sessions to diagnose UI issues, improve support, and get context on nuanced user behavior in your product, website, or mobile app.',
            textColor: 'text-black', // tw
        },
        screenshots: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/replay_screenshot_de8cb3a4ed.jpg',
                alt: 'Session replay screenshot',
                classes: 'absolute bottom-0 left-0 max-w-[525px] rounded-tr-md overflow-hidden shadow-2xl',
            },
        ],
        hog: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/replay_hog_20fc000c14.png',
            alt: 'A hedgehog watching some session recordings',
            classes: 'absolute bottom-0 right-0 max-w-[698px]',
        },
        slider: {
            marks: [5000, 25000, 120000, 500000],
            min: 5000,
            max: 500000,
        },
        volume: 5000,
        customers: {
            hasura: {
                headline: 'improved conversion rates by 10-20%',
                description: "We wouldn't have noticed that needed fixing without PostHog's session replays.",
            },
            elevenlabs: {
                headline: 'uses replays and surveys when testing ideas',
                description:
                    'We watch lots of replays when testing a feature, and love how easy it is to launch surveys',
            },
            netdata: {
                headline: 'reduced back-and-forth in community support',
                description: 'Session replay in PostHog is so much better than Smartlook, which we used to use.',
            },
            pry: {
                headline: 'improved registrations by 20-30%',
                description: "We've improved our whole onboarding flow by about 5% too, which is great.",
            },
        },
        features: [
            {
                title: 'Event timeline',
                headline: 'Event timeline',
                description:
                    "See the history of everything that happened in a user's session, including clicks, scrolls, and more.",
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/SessionReplay/images/timeline.png',
                        alt: 'Timeline',
                    },
                ],

                // features: [
                //     {
                //         title: 'Filtering',
                //         description:
                //             'Set filters for individual steps – or the entire funnel – by person property, group or cohort, or event property',
                //     },
                //     {
                //         title: 'Graph types',
                //         description:
                //             "Track user progression between steps, conversion time between each step, and how a funnel's conversion rate changes over time",
                //     },
                //     {
                //         title: 'Step ordering',
                //         description:
                //             'Choose between a sequential series of steps, a strict order, or any order of steps that lead to conversion',
                //     },
                //     {
                //         title: 'Granular controls',
                //         description:
                //             'Set conversion window limit, add exclusionary steps, set attribution type, and see the relative conversion rate between each step',
                //     },
                // ],
            },
            {
                title: 'Console logs',
                headline: 'Console logs',
                children: (
                    <>
                        <p className="leading-tight">
                            Console logs are useful for debugging and can be enabled by passing{' '}
                            <code>enable_recording_console_logs: true</code> or in your project's settings.
                        </p>
                        <div className="flex lg:flex-row lg:gap-x-6 flex-col">
                            <div className="shrink">
                                <h4 className="text-lg">Your code</h4>
                                <CodeBlock
                                    code={`posthog.init('<ph_project_api_key>', {
  api_host: '<ph_client_api_host>',
  defaults: '<ph_posthog_js_defaults>',
  enable_recording_console_log: true,
});`}
                                    language="js"
                                />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg">Console logs in a session replay</h4>
                                <CloudinaryImage
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/CodeBlocks/SessionReplay/console-logs.png"
                                    alt="Console logs in PostHog"
                                    placeholder="blurred"
                                />
                            </div>
                        </div>
                    </>
                ),
            },
            {
                title: 'Network monitor',
                headline: 'Network monitor',
                description: 'Analyze performance and network calls',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/SessionReplay/images/network.png',
                        alt: 'Network monitor',
                    },
                ],
            },
            {
                title: 'Autocapture',
                headline: 'Autocapture',
                description:
                    "Capture sessions without extra code. If you're already using PostHog.js for analytics, there's nothing else to install.",
                children: <SnippetRenderer />,
            },
            {
                title: 'Capture form inputs',
                headline: 'Capture form inputs',
                description:
                    "Capture sessions without extra code. If you're already using PostHog.js for analytics, there's nothing else to install.",
                children: (
                    <>
                        <p className="leading-tight">
                            <code>input</code> fields are masked by default. But if you'd like to see what users are
                            typing into a form, set <code>maskAllInputs</code> to <code>false</code>. (Password fields
                            will still remain masked.)
                        </p>
                        <div className="flex flex-col md:flex-row gap-x-6">
                            <div className="shrink">
                                <h4 className="text-lg">Your code</h4>
                                <CodeBlock
                                    code={`posthog.init('<YourPostHogKey>', {
    session_recording: {
        maskAllInputs: false
    }
})`}
                                    language="js"
                                />
                                <div className="pt-4">
                                    <CodeBlock
                                        code={`<label>Name</label>
<input type="text" />

<label>Email</label>
<input type="email" />

<label>Password</label>
<input type="password" />`}
                                        language="html"
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg">Session replay</h4>
                                <CloudinaryImage
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/CodeBlocks/SessionReplay/session-replay.png"
                                    alt="A screenshot of a session replay"
                                    placeholder="blurred"
                                />
                            </div>
                        </div>
                    </>
                ),
            },
            // {
            //     title: 'Collections',
            //     headline: 'Collections',
            //     description:
            //         'Create a dynamic playlist of sessions to watch based on visitor activity, user properties, or cohort',
            //     images: [
            //         {
            //             src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/SessionReplay/images/network.png',
            //             alt: 'Playlist',
            //         },
            //     ],
            // },
            {
                title: 'DOM explorer',
                headline: 'DOM explorer',
                description:
                    'Inspect the DOM as it was at this moment in the session. Analyze the structure and elements captured during the recording.',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/SessionReplay/images/network.png',
                        alt: 'DOM explorer',
                    },
                ],
            },
            {
                title: 'Record by feature flag',
                headline: 'Record by feature flag',
                description:
                    "If you don't want to record all user sessions, you can choose to only enable it when a user is opted in to a feature flag. You can also use feature flags to record only a specific volume of randomized traffic.",
                children: (
                    <div>
                        <h4 className="text-lg">Your code</h4>
                        <CodeBlock
                            code={`posthog.init('<ph_project_api_key>', {
  api_host: '<ph_client_api_host>',
  defaults: '<ph_posthog_js_defaults>',
  disable_session_recording: true,
});
window.posthog.onFeatureFlags(function () {
  if (window.posthog.isFeatureEnabled('your-feature-flag')) {
    window.posthog.startSessionRecording();
  }
});
`}
                            language="js"
                        />
                    </div>
                ),
            },
            {
                title: 'Supported platforms',
                headline: 'Supported platforms',
                description:
                    "Works with PostHog.js on the web. If you're already using product analytics, there's no separate installation.",
                children: (
                    <div className="max-w-xl mx-auto">
                        <fieldset className="bg-primary">
                            <legend className="text-lg font-semibold">Web</legend>
                            <OSButton
                                asLink
                                variant="ghost"
                                icon={<IconJavaScript className="size-8" />}
                                size="xl"
                                className="!text-xl text-primary font-semibold"
                                to="/docs/libraries/js"
                                state={{
                                    newWindow: true,
                                }}
                            >
                                <span>JavaScript</span>
                            </OSButton>
                        </fieldset>
                        <fieldset className="bg-primary">
                            <legend className="text-lg font-semibold">Mobile</legend>
                            <OSButton
                                asLink
                                variant="ghost"
                                icon={<IconApple className="size-8" />}
                                size="xl"
                                className="!text-xl text-primary font-semibold"
                                to="/docs/libraries/ios"
                                state={{
                                    newWindow: true,
                                }}
                            >
                                <span>iOS</span>
                            </OSButton>
                            <OSButton
                                asLink
                                variant="ghost"
                                icon={<IconAndroid className="size-8" />}
                                size="xl"
                                className="!text-xl text-primary font-semibold"
                                to="/docs/libraries/android"
                                state={{
                                    newWindow: true,
                                }}
                            >
                                <span>Android</span>
                            </OSButton>
                        </fieldset>
                        <fieldset className="bg-primary">
                            <legend className="text-lg font-semibold">Cross-platform</legend>
                            <OSButton
                                asLink
                                variant="ghost"
                                icon={<IconReactNative className="size-8" />}
                                size="xl"
                                className="!text-xl text-primary font-semibold"
                                to="/docs/libraries/ios"
                                state={{
                                    newWindow: true,
                                }}
                            >
                                <span>React Native</span>
                            </OSButton>
                            <OSButton
                                asLink
                                variant="ghost"
                                icon={<IconFlutter className="size-8" />}
                                size="xl"
                                className="!text-xl text-primary font-semibold"
                                to="/docs/libraries/android"
                                state={{
                                    newWindow: true,
                                }}
                            >
                                <span>Flutter</span>
                            </OSButton>
                        </fieldset>
                        <p className="">
                            *Mobile and cross-platform libraries available as an{' '}
                            <Link to="/addons" state={{ newWindow: true }}>
                                add-on
                            </Link>
                            .
                        </p>
                    </div>
                ),
            },
            {
                title: 'More features',
                headline: 'More features',
                features: [
                    {
                        title: 'Filter by event',
                        description: 'Filter by events to quickly find relevant recordings',
                    },
                    {
                        title: 'Filter by people',
                        description: 'Filter by person properties to quickly find relevant recordings',
                    },
                    {
                        title: 'Block sensitive data',
                        description:
                            'Disable capturing data from any DOM element with HTML attributes or a customizable config',
                    },
                    {
                        title: 'Share & embed',
                        description: 'Share recordings directly by URL or embed via iframe',
                    },
                    {
                        title: 'Minimum duration filter',
                        description: 'Only record sessions longer than a specified duration',
                    },
                    {
                        title: 'Sample recorded sessions',
                        description: 'Restrict the percentage of sessions that will be recorded',
                    },
                ],
            },
        ],
        questions: [
            {
                question: 'Why are users dropping off in my funnel?',
                url: '/tutorials/explore-insights-session-recordings#watching-users-through-funnels',
            },
            { question: 'How do I figure out how to lower churn?', url: '/tutorials/churn-rate#session-recordings' },
            {
                question: 'How can I understand what my power users are doing?',
                url: '/tutorials/explore-insights-session-recordings#find-and-analyze-outliers-in-trend-graphs',
            },
            { question: 'How do I see where errors happen?', url: '/tutorials/session-recordings-for-support' },
            { question: 'Which screens are loading slowly?', url: '/tutorials/performance-metrics' },
            {
                question: 'How do I understand sources of friction in my app?',
                url: '/tutorials/filter-session-recordings',
            },
            {
                question: "What is a user's First Contentful Paint time",
                url: '/tutorials/performance-metrics#1-first-contentful-paint',
            },
            {
                question: "What is a user's Dom Interactive time",
                url: '/tutorials/performance-metrics#2-dom-interactive',
            },
            {
                question: "What is a user's Page Loaded time",
                url: '/tutorials/performance - metrics#3 - page - loaded',
            },
            {
                question: 'How do I optimize site performance?',
                url: '/tutorials/performance-metrics#optimization-cheat-sheet',
            },
            {
                question: 'How can I improve customer support with screen recordings?',
                url: '/tutorials/session-recordings-for-support',
            },
        ],
        comparison: {
            summary: {
                them: [
                    {
                        title: 'Error tracking',
                        subtitle: 'In progress!',
                        subtitleUrl: 'https://github.com/PostHog/posthog/issues/23400',
                    },
                    {
                        title: 'Alerting',
                        subtitle: 'In progress!',
                        subtitleUrl: 'https://github.com/PostHog/posthog/issues/14331',
                    },
                ],
                us: [
                    {
                        title: 'Interlinking with feature flags and insights',
                        subtitle: 'Jump between them easily',
                    },
                    {
                        title: 'Collaboration, sharing, and embedding exporting recordings',
                    },
                    {
                        title: 'No limits on how many recordings captured',
                    },
                ],
            },
            features: [
                {
                    feature: 'Single-page app support',
                    companies: {
                        Hotjar: true,
                        LogRocket: true,
                        Matomo: true,
                        FullStory: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'iOS recordings',
                    companies: {
                        Hotjar: false,
                        LogRocket: true,
                        Matomo: false,
                        FullStory: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Android recordings',
                    companies: {
                        Hotjar: false,
                        LogRocket: true,
                        Matomo: false,
                        FullStory: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'React Native recordings',
                    companies: {
                        Hotjar: false,
                        LogRocket: true,
                        Matomo: false,
                        FullStory: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Flutter recordings',
                    companies: {
                        Hotjar: false,
                        LogRocket: false,
                        Matomo: false,
                        FullStory: false,
                        PostHog: '<a href="https://github.com/PostHog/posthog-flutter/issues/69">In beta</a>',
                    },
                },
                {
                    feature: 'Identity detection',
                    companies: {
                        Hotjar: false,
                        LogRocket: true,
                        Matomo: true,
                        FullStory: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Target recordings by URL',
                    companies: {
                        Hotjar: true,
                        LogRocket: true,
                        Matomo: true,
                        FullStory: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Target by sample size',
                    companies: {
                        Hotjar: true,
                        LogRocket: false,
                        Matomo: true,
                        FullStory: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Filter recordings by user or event',
                    companies: {
                        Hotjar: true,
                        LogRocket: true,
                        Matomo: true,
                        FullStory: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Rage-click detection',
                    companies: {
                        Hotjar: true,
                        LogRocket: true,
                        Matomo: false,
                        FullStory: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Privacy masking for sensitive content',
                    companies: {
                        Hotjar: true,
                        LogRocket: true,
                        Matomo: true,
                        FullStory: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Export recordings',
                    companies: {
                        Hotjar: true,
                        LogRocket: false,
                        Matomo: true,
                        FullStory: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Recording retention policy',
                    companies: {
                        Hotjar: '12 months',
                        LogRocket: '1 month',
                        Matomo: '24 months',
                        FullStory: '1 month',
                        PostHog: 'Up to 3 months',
                    },
                },
            ],
        },
        pairsWith: [
            {
                slug: 'product-analytics',
                description: 'Jump into a playlist of session recordings directly from any time series in a graph',
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
    },
    {
        Icon: IconToggle,
        name: 'Feature flags',
        handle: 'feature_flags',
        type: 'feature_flags',
        slug: 'feature-flags',
        color: 'green',
        colorSecondary: 'seagreen',
        category: 'engineering',
        seo: {
            title: 'Feature flags - PostHog',
            description: 'Safely roll out features to specific users or groups',
        },
        answersDescription: 'Control the release of new features to your users',
        overview: {
            title: 'Safely roll out features to specific users or groups',
            description:
                'Test changes with small groups of users before rolling out wider. Then analyze usage with product analytics and session replay.',
            textColor: 'text-white', // tw
        },
        screenshots: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1/posthog.com/src/components/Product/FeatureFlags/images/screenshot-feature-flags.png',
                alt: 'Feature flags screenshot',
                classes: '',
            },
        ],
        hog: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1/posthog.com/src/components/Product/hogs/feature-flags-hog.png',
            alt: 'A hedgehog toggling a feature flag',
            classes: 'absolute bottom-0 right-0 max-w-md',
        },
        slider: {
            marks: [1000000, 10000000, 100000000, 1000000000],
            min: 1000000,
            max: 1000000000,
        },
        volume: 1000000,
        customers: {
            phantom: {
                headline: 'cut failure rates by 90%',
                description:
                    'Feature flags are crucial for us. We use them as kill switches for all features and use the data to make decisions.',
            },
            contra: {
                headline: 'increased registrations 30%',
                description:
                    "Teams used to use different tools. That led to confusion because flags didn't integrate with our analytics or replays.",
            },
            elevenlabs: {
                headline: 'uses flags for feature testing',
                description:
                    'We test changes as simple as changing the null state of a page through to new onboarding flows or new pricing changes.',
            },
            carvertical: {
                headline: 'switched from in-house tools',
                description:
                    "Feature flags immediately bought a lot of value. What's really elegant is how flags interlink with product analytics.",
            },
        },
        features: [
            {
                title: 'Boolean & multivariate feature flags',
                headline: 'Boolean & multivariate feature flags',
                description:
                    'Create up to nine variants of a feature flag to test or release different versions of a feature.',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/FeatureFlags/images/multivariate.png',
                        alt: 'Multivariate feature flags',
                    },
                ],
            },
            {
                title: 'Test changes without pushing code',
                headline: 'Test changes without pushing code',
                description:
                    'JSON payloads let you change text, visuals, or entire blocks of code directly from within PostHog – no code deployments needed – using <code>getFeatureFlagPayload()</code>.',
                // images: [
                //     {
                //         src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/FeatureFlags/images/payloads.png',
                //         alt: 'Test changes without touching your codebase',
                //     },
                // ],
                children: (
                    <div className="grid grid-cols-12 gap-x-8 gap-y-4 -mt-4">
                        <div className="col-span-12">
                            <h4 className="text-xl mb-1">Feature flag payload</h4>
                            <p className="text-lg">
                                Enter the payload in the feature flag's settings (inside PostHog) as a value or an
                                object.
                            </p>
                            <CodeBlock
                                code={`{"title": "Test headline", "subtitle": "Test description"}`}
                                language="js"
                            />
                        </div>
                        <div className="col-span-7">
                            <h4 className="text-xl">Your code</h4>
                            <CodeBlock
                                code={`<h1>Default headline</h1>
<h2>Default description</h2>`}
                                language="html"
                            />
                            <CodeBlock
                                code={`posthog.onFeatureFlags(function () {
  if (posthog.isFeatureEnabled('headline-change')) {
    const swapText = posthog.getFeatureFlagPayload('headline-change');
    document.querySelector('h1').textContent = swapText.title;
    document.querySelector('h2').textContent = swapText.subtitle;
  }
});`}
                                language="js"
                            />
                        </div>
                        <div className="col-span-5">
                            <h4 className="text-xl">Output</h4>
                            <CodeBlock
                                code={`<h1>Test headline</h1>
<h2>Test description</h2>`}
                                language="html"
                            />
                            <p className="text-lg">
                                Serve any sort of changes from the payload like text or colors, or trigger functions.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                title: 'Release conditions',
                headline: 'Release conditions',
                description:
                    'Customize your rollout strategy by user or group properties, cohort, or traffic percentage.',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/FeatureFlags/images/release-conditions.png',
                        alt: 'Release conditions',
                    },
                ],
            },
            {
                title: 'Flag targeting',
                headline: 'Flag targeting',
                description: 'Target feature flag release conditions by group properties, not just user properties.',
            },
            {
                title: 'Local evaluation ',
                headline: 'Local evaluation',
                description:
                    "Improve speed by caching a flag's value on initial load.Or use the API to build your own UI. ",
                children: (
                    <>
                        <h4 className="text-xl mb-1">
                            Use a single API request to get feature flag definitions and match your users locally.
                        </h4>
                        <p className="text-lg">
                            The following will make an API request if the data is not already cached.
                        </p>
                        <CodeBlock
                            code={`await client.getAllFlags('distinct id', {
  groups: {},
  personProperties: { is_authorized: True },
  groupProperties: {},
});`}
                            language="js"
                        />
                    </>
                ),
            },
            {
                title: 'Bootstrapping',
                headline: 'Bootstrapping',
                description:
                    'Bootstrap flags on initialization so all flags are available immediately, without having to make extra network requests.',
                children: (
                    <div className="">
                        <h4 className="text-xl mb-1">
                            Make feature flags available at initialization without waiting for a response from PostHog
                        </h4>
                        <p className="text-lg">
                            This is useful for redirecting to another page based on feature flag or showing variants
                            instantly.
                        </p>
                        <CodeBlock
                            code={`posthog.init('<ph_project_api_key>', {
  api_host: '<ph_client_api_host>',
  defaults: '<ph_posthog_js_defaults>',
  bootstrap: {
    distinctID: 'your-anonymous-id',
    featureFlags: {
      'flag-1': true,
      'variant-flag': 'control',
      'other-flag': false,
    },
  },
});
`}
                            language="js"
                        />
                    </div>
                ),
            },
            {
                title: 'Testing & diagnostics',
                headline: 'Flag testing & diagnostics',
                description:
                    'See how many times a flag has been evaluated, how many times each variant has been returned, and what values users received.',
                children: (
                    <div className="-mt-5">
                        <h4 className="text-xl mb-1">Local development</h4>
                        <p className="text-lg">
                            When developing locally, you can set a flag's value in your browser's console.
                        </p>
                        <CodeBlock
                            code={`posthog.featureFlags.overrideFeatureFlags({ flags: {"myFlag": "test"}})`}
                            language="js"
                        />
                        <p className="text-lg">
                            This will persist until you call override again with the argument <code>false</code>.
                        </p>
                        <CodeBlock code={`posthog.featureFlags.overrideFeatureFlags(false)`} language="js" />
                    </div>
                ),
            },
            {
                title: 'Experiments',
                headline: 'Experiments',
                description:
                    'Test changes to your product and evaluate the impacts those changes make. Track additional metrics to see how your experiment affects other parts of your app or different flows. Run experiments on funnels to see the impact of a change on a aggregate values or a series of events, like a signup flow.',
            },
            {
                title: 'Statistical analysis',
                headline: 'Statistical analysis',
                description:
                    "Get a statistical analysis of your experiment results to see if the results are significant, or if they're likely just due to chance.",
            },
            {
                title: 'Developer-friendly automation',
                headline: 'Developer-friendly automation',
                description:
                    'Automated usage reports, IP address resolution (for location-based targeting), and recall person properties to avoid passing them manually every time.',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/FeatureFlags/images/reports.png',
                        alt: 'Developer-friendly automation',
                    },
                ],
            },
            {
                title: 'Early access feature opt-in widget',
                headline: 'Early access feature opt-in widget',
                description:
                    'Allow users to opt in to (or out of) specified features. Or use the API to build your own UI.',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/FeatureFlags/images/early-access.png',
                        alt: 'Early access feature opt-in widget',
                    },
                ],
            },
            {
                title: 'More features',
                headline: 'More features',
                features: [
                    {
                        title: 'Persist flags across authentication',
                        description:
                            "Persist feature flags across authentication events so that flag values don't change when an anonymous user logs in and becomes identified.",
                    },
                    {
                        title: 'History & activity feed',
                        description: "See who hit a feature flag, the flag's value, and which page they were on",
                    },
                    {
                        title: 'Instant rollbacks',
                        description: 'Disable a feature without touching your codebase',
                    },
                    {
                        title: 'Bootstrapping',
                        description: 'Get flags and values to trigger changes immediately on page load',
                    },
                    {
                        title: 'Persist flags across authentication steps',
                        description: 'Make sure users have a consistent experience after login',
                    },
                    {
                        title: 'Flag administration',
                        description:
                            'See the history of a feature flag or control who can modify flags with user roles',
                    },
                    {
                        title: 'SDKs or API',
                        description:
                            'Copy code snippets for your library of choice, or implement yourself with the API',
                    },
                    {
                        title: 'Multi-environment support',
                        description:
                            'Test flags in local development or staging by using the same flag key across PostHog projects',
                    },
                ],
            },
        ],
        questions: [
            {
                question: 'How do I test features internally?',
                url: '/product-engineers/feature-flag-benefits-use-cases#3-test-changes-in-production',
            },
            {
                question: 'How do I set up an allow or deny list?',
                url: '/product-engineers/feature-flag-benefits-use-cases#4-manage-access',
            },
            {
                question: 'How do I do a canary release?',
                url: '/tutorials/canary-release',
            },
            {
                question: 'How do I sample events for a high-volume API?',
                url: '/tutorials/track-high-volume-apis',
            },
        ],
        comparison: {
            summary: {
                them: [
                    {
                        title: 'Triggers and workflows to enable/disable flags on other events',
                    },
                    {
                        title: 'Data exports',
                    },
                ],
                us: [
                    {
                        title: 'Integration with other analysis products',
                        subtitle: 'View replays attached to a flag, analyze data based on a flag, etc.',
                    },
                    {
                        title: 'JSON payloads',
                        subtitle: 'Flags can return JSON and trigger other in-app changes (like displaying a banner)',
                    },
                    {
                        title: 'Early access management suite for toggling betas or new features',
                    },
                ],
            },
            features: [
                {
                    feature: 'Target by percentage',
                    companies: {
                        LaunchDarkly: true,
                        Optimizely: true,
                        Flagsmith: true,
                        GrowthBook: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Target by person properties',
                    companies: {
                        LaunchDarkly: true,
                        Optimizely: true,
                        Flagsmith: true,
                        GrowthBook: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Flag scheduling',
                    companies: {
                        LaunchDarkly: true,
                        Optimizely: false,
                        Flagsmith: false,
                        GrowthBook: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Experimentation',
                    companies: {
                        LaunchDarkly: true,
                        Optimizely: true,
                        Flagsmith: true,
                        GrowthBook: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Multivariate flags',
                    companies: {
                        LaunchDarkly: true,
                        Optimizely: false,
                        Flagsmith: true,
                        GrowthBook: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Unlimited flags for free',
                    companies: {
                        LaunchDarkly: false,
                        Optimizely: true,
                        Flagsmith: true,
                        GrowthBook: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Free third-party plugins',
                    companies: {
                        LaunchDarkly: true,
                        Optimizely: false,
                        Flagsmith: true,
                        GrowthBook: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Activity logs',
                    companies: {
                        LaunchDarkly: true,
                        Optimizely: false,
                        Flagsmith: true,
                        GrowthBook: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Data export',
                    companies: {
                        LaunchDarkly: true,
                        Optimizely: true,
                        Flagsmith: false,
                        GrowthBook: true,
                        PostHog: false,
                    },
                },
                {
                    feature: 'Multi-environment support',
                    companies: {
                        LaunchDarkly: true,
                        Optimizely: true,
                        Flagsmith: true,
                        GrowthBook: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Automatic IP resolution',
                    companies: {
                        LaunchDarkly: false,
                        Optimizely: false,
                        Flagsmith: false,
                        GrowthBook: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Recall person properties by default',
                    companies: {
                        LaunchDarkly: false,
                        Optimizely: false,
                        Flagsmith: false,
                        GrowthBook: false,
                        PostHog: true,
                    },
                },
            ],
        },
        pairsWith: [
            {
                slug: 'product-analytics',
                description:
                    "Run any insight filtered by a flag's value, or group by flag to see usage across a flag's variants",
            },
            {
                slug: 'product-analytics',
                description: "User paths: See how a flag's value influenced an intended outcome",
            },
            {
                slug: 'session-replay',
                description:
                    'Filter recordings down to only when a feature flag was called, or to a specific value of a flag',
            },
        ],
    },
    {
        Icon: IconMessage,
        name: 'Surveys',
        handle: 'surveys',
        type: 'surveys',
        slug: 'surveys',
        color: 'salmon',
        colorSecondary: 'red',
        category: 'product',
        seo: {
            title: 'Surveys - PostHog',
            description: 'Ask anything with no-code surveys – or use the API for complete control.',
        },
        answersDescription: 'Get feedback from your users with customizable surveys',
        overview: {
            title: 'Ask anything with no-code surveys',
            description:
                'Build in-app popups with freeform text responses, multiple choice, NPS, ratings, and emoji reactions. Or use the API for complete control.',
            textColor: 'text-black', // tw
        },
        screenshots: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/products/screenshot-surveys.png',
                alt: 'Screenshot of survey results in PostHog',
                classes: '',
            },
        ],
        hog: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/Slider/images/surveys-hog.png',
            alt: 'A hedgehog looking at survey results',
            classes: 'absolute bottom-0 right-0 max-w-md',
        },
        slider: {
            marks: [250, 2000, 15000, 100000],
            min: 250,
            max: 100000,
        },
        volume: 250,
        customers: {
            purplewave: {
                headline: 'reached a 25% response rate with surveys',
                description:
                    'I hate having to switch software. With PostHog, all our data and survey responses were centralized in one platform.',
            },
            elevenlabs: {
                headline: 'uses surveys to organize interviews and more',
                description:
                    'We even use surveys to send a little pop-up to our most active users and ask them to review us on G2.',
            },
        },
        features: [
            {
                title: 'Question types',
                headline: 'Question types',
                description: 'Multiple choice, multi-select, numerical rating, emoji reaction, embedded links',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/Surveys/images/question-types.png',
                        alt: 'Question types',
                    },
                ],
            },
            {
                title: 'Templates',
                headline: 'Templates',
                description: 'Choose from the library or start from scratch',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/Surveys/images/templates.png',
                        alt: 'Templates',
                    },
                ],
            },
            {
                title: 'Display conditions',
                headline: 'Display conditions',
                description:
                    'Display surveys based on URL, person property, or feature flag when used with Feature Flags',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/Surveys/images/targeting.png',
                        alt: 'Display conditions',
                    },
                ],
            },
            {
                title: 'Multi-step surveys',
                headline: 'Multi-step surveys',
                description: 'Up to 10 questions',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/Surveys/images/steps.png',
                        alt: 'Multi-step surveys',
                    },
                ],
            },
            {
                title: 'Link somewhere',
                headline: 'Link somewhere',
                description: 'Send users to a webpage or invite them to book a meeting with a calendar invite',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/Surveys/images/link-scheduler.png',
                        alt: 'Link somewhere',
                    },
                ],
            },
            {
                title: 'No-code and API',
                headline: 'No-code? Yes. API? Yes.',
                description:
                    'Using PostHog.js? No more code required. But want to create your own UI? Check out the Surveys API.',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/Surveys/images/api.png',
                        alt: 'No-code and API',
                    },
                ],
            },
            {
                title: 'More features',
                headline: 'More features',
                features: [
                    {
                        title: 'Aggregated results',
                        description: 'See feedback summarized and broken down per response',
                    },
                    {
                        title: 'Slack notifications',
                        description: 'Send realtime survey responses to a Slack channel',
                    },
                    {
                        title: 'Customizable wait periods',
                        description: 'Set a delay before a survey opens',
                    },
                ],
            },
        ],
        questions: [
            {
                question: 'Would you like to book a user interview?',
                url: '/tutorials/feedback-interviews-site-apps',
            },
            {
                question: 'Would you like to be interviewed by our product team?',
            },
            {
                question: 'How would you feel if you could no longer use this product?',
            },
            {
                question: "How satisfied are you with the support you've received?",
            },
        ],
        comparison: {
            summary: {
                them: [
                    {
                        title: 'Forms',
                        subtitle:
                            "PostHog offers multi-step surveys, but they won't be full-page forms such as Typeform or Google Forms",
                    },
                    {
                        title: 'AI-powered analysis or recommendations based on results',
                    },
                    {
                        title: 'Limited formatting options',
                    },
                ],
                us: [
                    {
                        title: 'No-code surveys with customizable colors and removable branding',
                    },
                    {
                        title: 'Automatic NPS score calculations',
                    },
                    {
                        title: 'Robust targeting & integration with feature flags',
                    },
                    {
                        title: 'Tight integration with analytics, experiments, and session replay',
                    },
                ],
            },
            features: [
                {
                    feature: 'Customizable pop-ups',
                    companies: {
                        Pendo: true,
                        Hotjar: true,
                        Sprig: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Live previews',
                    companies: {
                        Pendo: true,
                        Hotjar: true,
                        Sprig: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Multi-step surveys',
                    companies: {
                        Pendo: true,
                        Hotjar: true,
                        Sprig: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'API access',
                    companies: {
                        Pendo: true,
                        Hotjar: true,
                        Sprig: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Single choice questions',
                    companies: {
                        Pendo: true,
                        Hotjar: true,
                        Sprig: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Multiple choice questions',
                    companies: {
                        Pendo: true,
                        Hotjar: true,
                        Sprig: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Open text questions',
                    companies: {
                        Pendo: true,
                        Hotjar: true,
                        Sprig: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Numerical rating questions',
                    companies: {
                        Pendo: true,
                        Hotjar: true,
                        Sprig: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Emoji rating questions',
                    companies: {
                        Pendo: true,
                        Hotjar: true,
                        Sprig: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Third-party link support',
                    companies: {
                        Pendo: true,
                        Hotjar: false,
                        Sprig: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Target by property',
                    companies: {
                        Pendo: true,
                        Hotjar: true,
                        Sprig: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Target by URL',
                    companies: {
                        Pendo: true,
                        Hotjar: true,
                        Sprig: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Target by feature flag',
                    companies: {
                        Pendo: false,
                        Hotjar: false,
                        Sprig: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Survey scheduling',
                    companies: {
                        Pendo: true,
                        Hotjar: false,
                        Sprig: false,
                        PostHog: false,
                    },
                },
                {
                    feature: 'Export responses',
                    companies: {
                        Pendo: true,
                        Hotjar: true,
                        Sprig: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Slack integration',
                    companies: {
                        Pendo: true,
                        Hotjar: true,
                        Sprig: true,
                        PostHog: true,
                    },
                },
            ],
        },
        pairsWith: [
            {
                slug: 'product-analytics',
                description: 'Use insights to breakdown average scores, analyze results over time, or find trends.',
            },
            {
                slug: 'feature-flags',
                description: 'Connect a survey to a feature flag to gather feedback on your latest ideas and tests.',
            },
            {
                slug: 'session-replay',
                description:
                    "Watch recordings of users completing a survey to understand full context about a user's behavior.",
            },
        ],
    },
    {
        Icon: IconDatabase,
        name: 'Data warehouse',
        handle: 'data_warehouse',
        type: 'data_warehouse',
        slug: 'data-warehouse',
        color: 'purple',
        colorSecondary: 'lilac',
        category: 'data',
        seo: {
            title: 'Data Warehouse - PostHog',
            description: 'Unify and query data from any source and analyze it alongside your product data.',
        },
        answersDescription: 'Unify and query data from any source',
        overview: {
            title: 'All your data in one place',
            description: 'Unify and query data from any source and analyze it alongside your product data.',
            textColor: 'text-white', // tw
        },
        screenshots: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/products/screenshot-data-warehouse.png',
                alt: 'Screenshot of the PostHog data warehouse',
                classes: '',
            },
        ],
        hog: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/data-warehouse/warehouse-hog.png',
            alt: 'Just another hedgehog',
            classes: 'absolute bottom-0 right-0 max-w-[140px]',
        },
        slider: {
            marks: [1000000, 10000000, 100000000, 1000000000],
            min: 1000000,
            max: 1000000000,
        },
        volume: 1000000,
        customers: {
            headshotpro: {
                headline: 'analyzes Google Adwords data in PostHog',
                description: 'I needed one source of truth for both marketing and developers to share.',
            },
            webshare: {
                headline: 'syncs Intercom messages and customer contacts',
                description: "PostHog is the single source of truth for us. We've put everything in one place.",
            },
        },
        features: [
            {
                title: 'Sync from Stripe',
                headline: 'Sync from Stripe',
                description: 'Combine financial and product data to see how usage turns into growth.',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/DataWarehouse/images/stripe.png',
                        alt: 'Sync from Stripe',
                    },
                ],
            },
            {
                title: 'Sync from Hubspot',
                headline: 'Sync from Hubspot',
                description: 'Bring your CRM into the mix and track your sales funnel directly in PostHog.',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/DataWarehouse/images/hubspot.png',
                        alt: 'Sync from Hubspot',
                    },
                ],
            },
            {
                title: 'Sync from Zendesk',
                headline: 'Sync from Zendesk',
                description: 'See how ticket volumes and SLA breaches impact sign-ups and churn.',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/DataWarehouse/images/zendesk.png',
                        alt: 'Sync from Zendesk',
                    },
                ],
            },
            {
                title: 'Sync from anywhere',
                headline: 'Sync from anywhere',
                description: 'Adwords? Salesforce? Grab anything you want using custom sources.',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/DataWarehouse/images/custom.png',
                        alt: 'Sync from anywhere',
                    },
                ],
            },
            {
                title: 'More features',
                headline: 'More features',
                features: [
                    {
                        title: 'Link multiple sources',
                        description: 'Add joins to link tables together and connect run advanced queries',
                    },
                    {
                        title: 'Query with SQL',
                        description: 'Directly access your data, join sources, and build custom queries',
                    },
                    {
                        title: 'Save queries as views',
                        description: 'Save time by saving visualized data as tables, graphics, and more',
                    },
                    {
                        title: 'Custom sync periods',
                        description: 'Decide whether to sync data sources daily, weekly, or monthly',
                    },
                ],
            },
        ],
        questions: [
            {
                question: 'How do specific user behaviours correlate to MRR?',
                url: '/tutorials/stripe-reports',
            },
            {
                question: 'How is user retention affected by SLA breaches in Zendesk?',
                url: '/tutorials/zendesk-reports',
            },
            {
                question: 'How are inbound leads using my product?',
                url: '/tutorials/hubspot-reports#usage-by-lead',
            },
            {
                question: 'How does predicted revenue compare to my actual revenue?',
                url: '/tutorials/hubspot-reports#getting-revenue-from-closed-deals-by-joining-with-stripe',
            },
            {
                question: 'How much revenue am I churning each month?',
                url: '/tutorials/stripe-reports#revenue-churn',
            },
            {
                question: 'Who are my power users, and how do they use my product?',
                url: '/tutorials/stripe-reports#usage-by-top-customers',
            },
        ],
        pairsWith: [
            {
                slug: 'product-analytics',
                description: 'Analyze data from any source independently, or alongside product data.',
            },
            {
                slug: 'feature-flags',
                description: 'Use synced data to toggle feature flags, trigger A/B experiments, and more.',
            },
            {
                slug: 'docs/sql',
                description: 'Create entirely custom queries, join sources, and get the answers you need.',
            },
        ],
    },
    {
        Icon: IconWarning,
        name: 'Error tracking',
        slug: 'error-tracking',
        handle: 'error_tracking',
        type: 'error_tracking',
        color: 'orange',
        colorSecondary: 'red',
        category: 'engineering',
        seo: {
            title: 'Error Tracking - PostHog',
            description: 'Track errors and exceptions in your code, then assign them as issues.',
        },
        answersDescription: 'Track and resolve errors and exceptions in your application',
        overview: {
            title: 'Track errors and resolve issues',
            description: 'Take your product from exception to exceptional',
            textColor: 'text-white', // tw
        },
        screenshots: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_error_tracking_0f93eb652d.png',
                alt: 'Screenshot of the PostHog error tracking',
                classes: '',
            },
        ],
        hog: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/error_hog_c2eff84e29.png',
            alt: 'Just another hedgehog',
            classes: 'absolute bottom-0 right-0 max-w-[250px]',
        },
        slider: {
            marks: [100000, 1000000, 10000000, 50000000],
            min: 100000,
            max: 50000000,
        },
        volume: 100000,
        customers: {
            zealot: {
                headline: 'switched from BugSnag and Amplitude',
                description:
                    'In two clicks, I can see who had an error, then their replays. The more of PostHog you use, the more powerful it becomes.',
            },
        },
        features: [
            {
                title: 'Alert',
                headline: 'Alert',
                description: 'Get notified of new issues by email, Slack, or webhook',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_alerts_00824b03f5.png',
                        alt: 'Alert',
                    },
                ],
            },
            {
                title: 'Triage',
                headline: 'Triage',
                description: 'Assign issues to individuals or groups',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_assign_4c9bb9ee60.png',
                        alt: 'Triage',
                    },
                ],
            },
            {
                title: 'Organize and prioritize',
                headline: 'Organize and prioritize',
                description: 'Merge issues, sort by frequency or recency, or use text search to find specific errors',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_organize_94b4d00ea2.png',
                        alt: 'Organize and prioritize',
                    },
                ],
            },
            {
                title: 'Stack traces',
                headline: 'Stack traces',
                description:
                    "Get code context automatically with PostHog's server-side libraries, or upload source maps for front-end frameworks",
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_trace_3fc569059c.png',
                        alt: 'Stack traces',
                    },
                ],
            },
            {
                title: 'More features',
                headline: 'More features',
                features: [
                    {
                        title: 'Session replay',
                        description:
                            'Watch session recordings of users who caused exceptions for more context about how to reproduce an issue',
                    },
                    {
                        title: 'Product analytics',
                        description:
                            'Graph your $exception events, use filters and breakdowns to determine where errors happen and what to prioritize',
                    },
                    {
                        title: 'Feature flags',
                        description: 'Test fixes by rolling out code changes only to affected users',
                    },
                    {
                        title: 'User profiles',
                        description:
                            'See all $exception events for specific users in their event history log and find which feature flags were enabled at the time an error occurred',
                    },
                ],
            },
        ],
        questions: [
            {
                question: 'How do I track errors in my application?',
                url: '/docs/error-tracking/installation',
            },
            {
                question: 'How can I analyze error patterns?',
                url: '/docs/error-tracking/monitoring',
            },
            {
                question: 'How do I set up error alerts?',
                url: '/docs/error-tracking/alerts',
            },
            {
                question: 'How can I integrate with existing tools?',
                url: '/docs/error-tracking/integrations',
            },
            {
                question: 'How do I manage error retention?',
                url: '/docs/error-tracking/retention',
            },
            {
                question: 'How can I use session replay with errors?',
                url: '/docs/error-tracking/session-replay',
            },
        ],
        comparison: {
            summary: {
                them: [
                    {
                        title: 'Uptime monitoring',
                        subtitle: "We don't have uptime monitoring. Yet.",
                    },
                    {
                        title: 'Advanced alerting',
                        subtitle: 'We currently only support Slack and email alerts on custom criteria.',
                    },
                    {
                        title: 'Advanced error grouping systems',
                    },
                    {
                        title: 'Better mobile support',
                        subtitle: 'Even our team thinks Sentry is better if you need mobile support. For now!',
                    },
                ],
                us: [
                    {
                        title: 'Integration with other PostHog products',
                    },
                    {
                        title: 'Feature flags for error recovery',
                        subtitle: 'Quickly roll back features that cause errors.',
                    },
                    {
                        title: 'Simple, transparent pricing',
                    },
                ],
            },
            features: [
                {
                    feature: 'Error alerts',
                    companies: {
                        Sentry: true,
                        LogRocket: true,
                        BugSnag: true,
                        Datadog: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Exception capture',
                    companies: {
                        Sentry: true,
                        LogRocket: true,
                        BugSnag: true,
                        Datadog: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Issue management',
                    companies: {
                        Sentry: true,
                        LogRocket: false,
                        BugSnag: true,
                        Datadog: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Network performance monitoring',
                    companies: {
                        Sentry: true,
                        LogRocket: true,
                        BugSnag: true,
                        Datadog: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Error grouping',
                    companies: {
                        Sentry: true,
                        LogRocket: true,
                        BugSnag: true,
                        Datadog: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Source map support',
                    companies: {
                        Sentry: true,
                        LogRocket: true,
                        BugSnag: true,
                        Datadog: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Stack tracing',
                    companies: {
                        Sentry: true,
                        LogRocket: false,
                        BugSnag: true,
                        Datadog: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Integration with product analytics',
                    companies: {
                        Sentry: false,
                        LogRocket: true,
                        BugSnag: false,
                        Datadog: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Integration with session replays',
                    companies: {
                        Sentry: true,
                        LogRocket: true,
                        BugSnag: false,
                        Datadog: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Integration with A/B experiments',
                    companies: {
                        Sentry: false,
                        LogRocket: false,
                        BugSnag: true,
                        Datadog: false,
                        PostHog: true,
                    },
                },
            ],
        },
        pairsWith: [
            {
                slug: 'session-replay',
                description: 'Watch exactly how an error occurred for a specific user',
            },
            {
                slug: 'product-analytics',
                description: 'Analyze trends over time and get alerts when things go wrong',
            },
            {
                slug: 'feature-flags',
                description: 'Roll back features that cause errors, or test fixes with slow rollouts',
            },
        ],
    },
    {
        Icon: IconPlug,
        name: 'CDP',
        description: 'Get data into PostHog and send it where it needs to go.',
        // handle: 'data_pipelines',
        handle: 'cdp',
        type: 'cdp',
        slug: 'cdp',
        color: 'sky-blue',
        colorSecondary: 'blue',
        category: 'data',
        seo: {
            title: 'CDP sources & destinations - PostHog',
            description: 'Get all your data into PostHog with 60+ sources & destinations',
        },
        answersDescription: 'Ingest, transform, and send data between 25+ tools',
        overview: {
            title: 'Ingest, transform, and send data between 25+ tools',
            description:
                "PostHog's customer data platform (CDP) makes it easy to import data from a warehouse, sync with event data, and export to other products in your stack.",
            textColor: 'text-white', // tw
        },
        screenshots: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/products/screenshot-cdp.png',
                alt: "Screenshot of PostHog's CDP",
                classes: '',
            },
        ],
        features: [
            {
                title: 'Sources & destinations',
                headline: 'Connect 60+ tools to your data pipeline',
                description: 'Import data from your existing systems and export PostHog data anywhere you need it.',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/products/screenshot-cdp.png',
                        alt: 'CDP sources and destinations',
                    },
                ],
                features: [
                    {
                        title: 'Data warehouse sources',
                        description: 'Import from Stripe, Hubspot, Salesforce, and more to join with product data',
                    },
                    {
                        title: 'Real-time destinations',
                        description: 'Send events to Slack, webhooks, and 40+ tools as they happen',
                    },
                    {
                        title: 'Batch exports',
                        description: 'Reliable scheduled exports to S3, Snowflake, BigQuery, and more',
                    },
                    {
                        title: 'Custom transformations',
                        description: 'Filter, modify, and enrich data before sending to destinations',
                    },
                    {
                        title: 'No-code setup',
                        description: 'Configure sources and destinations through the UI, no engineering required',
                    },
                ],
            },
            {
                title: 'Data transformation',
                headline: 'Clean, filter, and enrich your data',
                description: 'Apply custom logic to your data pipeline with transformations that run on every event.',
                features: [
                    {
                        title: 'Schema enforcement',
                        description: 'Ensure data quality by validating events against defined schemas',
                    },
                    {
                        title: 'Event labeling',
                        description: 'Add custom properties to categorize and organize your events',
                    },
                    {
                        title: 'Data filtering',
                        description: 'Remove unwanted events or properties before they reach destinations',
                    },
                    {
                        title: 'Property mapping',
                        description: 'Transform property names and values to match destination requirements',
                    },
                    {
                        title: 'Custom code',
                        description: 'Write JavaScript transformations for complex logic',
                    },
                ],
            },
            {
                title: 'Reliability & monitoring',
                headline: 'Enterprise-grade data pipeline',
                description:
                    'Built for scale with monitoring, retries, and error handling to ensure your data flows reliably.',
                features: [
                    {
                        title: 'Automatic retries',
                        description: 'Failed deliveries retry automatically with exponential backoff',
                    },
                    {
                        title: 'Error monitoring',
                        description: 'Track delivery success rates and debug failures',
                    },
                    {
                        title: 'Dead letter queue',
                        description: 'Capture and recover events that fail processing',
                    },
                    {
                        title: 'Performance metrics',
                        description: 'Monitor throughput, latency, and resource usage',
                    },
                    {
                        title: 'Scalable infrastructure',
                        description: 'Handles millions of events per day without breaking a sweat',
                    },
                ],
            },
        ],
        answers: [
            {
                q: "What's the difference between sources and destinations?",
                a: 'Sources bring data INTO PostHog from external systems like your CRM or payment processor. Destinations send data FROM PostHog to other tools in your stack. Both work together to create a complete data pipeline.',
            },
            {
                q: 'How reliable are batch exports?',
                a: 'Very reliable. Batch exports run on a schedule with automatic retries, monitoring, and a dead letter queue for failed events. We guarantee at-least-once delivery to your destination.',
            },
            {
                q: 'Can I transform data before sending it?',
                a: 'Yes! Transformations let you filter, modify, and enrich events before they reach destinations. You can enforce schemas, add labels, map properties, or write custom JavaScript logic.',
            },
            {
                q: "What's included in the free tier?",
                a: 'The CDP add-on is required for destinations, but sources are free. You can import data from external systems at no cost - you only pay for the events you capture in PostHog.',
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
                    'Get your source data into PostHog, then analyze it alongside your product data to unlock new insights and discover new user behaviours.',
            },
            {
                slug: 'data-warehouse',
                description:
                    'Build a data warehouse in PostHog and then pull in data from all your platforms to one place where it can be easily interrogated.',
            },
        ],
    },
    {
        Icon: IconGraph, // Using IconGraph for web analytics
        name: 'Web analytics',
        handle: 'web_analytics',
        type: 'web_analytics',
        slug: 'web-analytics',
        color: '[#36C46F]',
        colorSecondary: 'green',
        category: 'analytics',
        seo: {
            title: 'Web analytics - PostHog',
            description:
                'Privacy-focused web analytics with pre-built dashboards, real-time data, and no sampling. The Google Analytics alternative that actually makes sense.',
        },
        answersDescription: 'Monitor your website traffic',
        sharesFreeTier: 'product_analytics',
        overview: {
            title: 'Web analytics that just works',
            description:
                "Track visitors, pageviews, and conversions with a pre-built dashboard. No complex setup, real-time data, and privacy-focused. The GA4 alternative you've been looking for.",
            textColor: 'text-white', // tw
        },
        screenshots: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_web_analytics_2a101a8558.png',
                alt: 'Screenshot of web analytics in PostHog',
                classes: '',
            },
        ],
        customers: {
            ycombinator: {
                headline: 'gets 30% more data than with GA4',
                description: 'Other platforms we looked at dropped data due to adblockers and third-party cookies.',
            },
            significa: {
                headline: 'switched from Plausible',
                description:
                    'PostHog is way more powerful and insightful than Plausible. We have more info than we used to have.',
            },
            creatify: {
                headline: 'switched from Google Analytics',
                description:
                    'Web analytics gives us all the metrics we really care about. It is so much better than GA4.',
            },
        },
        features: [
            {
                title: 'Core metrics',
                headline: 'All the essential web analytics metrics',
                description:
                    'Track visitors, pageviews, sessions, bounce rate, and more with a pre-built dashboard that just works.',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/web_analytics_top_light_mode_2024_10_be53cf5325.png',
                        alt: 'Web analytics dashboard',
                    },
                ],
                features: [
                    {
                        title: 'Visitors & pageviews',
                        description: 'Track unique visitors and total page views with real-time updates',
                    },
                    {
                        title: 'Sessions & duration',
                        description: 'Monitor visit frequency and how long users stay engaged',
                    },
                    {
                        title: 'Bounce rate',
                        description: 'See what percentage of users leave after viewing one page',
                    },
                    {
                        title: 'Entry & exit paths',
                        description: 'Understand where users start and end their journeys',
                    },
                    {
                        title: 'Real-time visitors',
                        description: 'See who is on your site right now with 30-second refresh',
                    },
                ],
            },
            {
                title: 'Traffic sources',
                headline: 'Know exactly where your visitors come from',
                description:
                    'Track channels, referrers, UTMs, and create custom attribution channels for comprehensive source analysis.',
                images: [
                    {
                        src: '/images/products/web-analytics/top-referrers.jpg',
                        alt: 'Traffic sources',
                    },
                ],
                features: [
                    {
                        title: 'Channel attribution',
                        description: 'Automatic categorization into Direct, Organic, Paid, Social, etc.',
                    },
                    {
                        title: 'Referrer tracking',
                        description: 'See which websites send you the most valuable traffic',
                    },
                    {
                        title: 'UTM parameters',
                        description: 'Full support for campaign, source, medium, content, and term',
                    },
                    {
                        title: 'Custom channels',
                        description: 'Define your own channels like AI, partners, or affiliates',
                    },
                    {
                        title: 'Session explorer',
                        description: 'Deep dive into individual session attribution details',
                    },
                ],
            },
            {
                title: 'Advanced analytics',
                headline: 'Go beyond basic metrics with powerful insights',
                description: 'Track scroll depth, web vitals, conversions, and revenue directly in your web analytics.',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1716289464/posthog.com/contents/stickiness-light.png',
                        alt: 'Advanced analytics',
                    },
                ],
                features: [
                    {
                        title: 'Scroll depth tracking',
                        description: 'See how far users scroll and what content they actually read',
                    },
                    {
                        title: 'Web vitals (LCP, FCP, INP, CLS)',
                        description: 'Monitor Core Web Vitals for performance optimization',
                    },
                    {
                        title: 'Conversion goals',
                        description: 'Set up and track multiple conversion events',
                    },
                    {
                        title: 'Revenue tracking',
                        description: 'Connect revenue data from events or payment platforms',
                    },
                    {
                        title: 'Active hours heatmap',
                        description: 'Visualize when your users are most active',
                    },
                ],
            },
            {
                title: 'Privacy & compliance',
                headline: 'Analytics that respects user privacy',
                description:
                    'GDPR compliant, cookieless options, and ad blocker resilient tracking for better data coverage.',
                features: [
                    {
                        title: 'Cookieless tracking',
                        description: 'Option to track without cookies for strict privacy requirements',
                    },
                    {
                        title: 'Anonymous mode',
                        description: 'Significantly reduce costs with anonymous visitor tracking',
                    },
                    {
                        title: 'GDPR compliant',
                        description: 'Built with privacy regulations in mind from the start',
                    },
                    {
                        title: 'Ad blocker resilient',
                        description: 'Reverse proxy option reduces blocking by 70%+',
                    },
                    {
                        title: 'Data residency',
                        description: 'Choose between US and EU cloud hosting',
                    },
                ],
            },
            {
                title: 'Device & demographics',
                headline: 'Understand your audience better',
                description: 'Break down traffic by device, browser, OS, and location to optimize for your users.',
                images: [
                    {
                        src: '/images/products/web-analytics/world-map.jpg',
                        alt: 'Demographics',
                    },
                ],
                features: [
                    {
                        title: 'Device types',
                        description: 'Desktop vs mobile vs tablet breakdown',
                    },
                    {
                        title: 'Browsers & OS',
                        description: 'See which browsers and operating systems to support',
                    },
                    {
                        title: 'Geographic data',
                        description: 'Country and city-level visitor location data',
                    },
                    {
                        title: 'Screen sizes',
                        description: 'Optimize for your most common screen resolutions',
                    },
                    {
                        title: 'Bot detection',
                        description: 'Automatic filtering of crawler and bot traffic',
                    },
                ],
            },
            {
                title: 'Integration benefits',
                headline: 'More than just web analytics',
                description: 'Seamlessly switch between web and product analytics, all in one platform.',
                features: [
                    {
                        title: 'Unified platform',
                        description: 'Web analytics + product analytics + session replay + more',
                    },
                    {
                        title: 'Shared events',
                        description: 'Same events power multiple features, no duplicate tracking',
                    },
                    {
                        title: 'Cross-domain tracking',
                        description: 'Track users across multiple domains and subdomains',
                    },
                    {
                        title: 'Backend integration',
                        description: 'Connect server-side events with frontend sessions',
                    },
                    {
                        title: 'Cost efficient',
                        description: 'No additional cost beyond event usage',
                    },
                ],
            },
        ],
        questions: [
            {
                question: 'How many visitors have I had this week?',
            },
            {
                question: "What's my average bounce rate?",
            },
            {
                question: 'Where in the world are my visitors coming from?',
            },
            {
                question: 'Are my users mostly on mobile, tablet, or desktop?',
            },
            {
                question: "What's my most popular blog post from the last month?",
            },
            {
                question: 'What other websites are sending me the most traffic?',
            },
            {
                question: 'How many visitors are coming back to my site regularly?',
            },
            {
                question: 'Which marketing campaigns drive the most conversions?',
            },
            {
                question: 'How far are users scrolling on my landing pages?',
            },
            {
                question: "What's my site's Core Web Vitals performance?",
            },
            {
                question: 'How much revenue is each traffic source generating?',
            },
            {
                question: 'When are my users most active during the day?',
            },
        ],
        comparison: {
            summary: {
                them: [
                    {
                        title: 'Complex setup and configuration',
                        subtitle: 'GA4 requires extensive setup and custom events for basic tracking',
                    },
                    {
                        title: 'Sampled data',
                        subtitle: 'GA4 samples data for large sites, missing important insights',
                    },
                    {
                        title: 'Limited real-time data',
                        subtitle: 'Most tools have delays or limited real-time capabilities',
                    },
                ],
                us: [
                    {
                        title: 'Pre-built dashboard ready in minutes',
                        subtitle: 'No complex setup - just add one snippet and go',
                    },
                    {
                        title: '100% accurate data, no sampling',
                        subtitle: 'Every visitor and event is tracked, no matter your traffic',
                    },
                    {
                        title: 'Privacy-focused with cookieless options',
                        subtitle: 'GDPR compliant with EU hosting and anonymous tracking',
                    },
                    {
                        title: 'Integrated with product analytics',
                        subtitle: 'Seamlessly switch between web and product insights',
                    },
                    {
                        title: 'Ad blocker resilient',
                        subtitle: 'Reverse proxy reduces blocking by 70%+',
                    },
                ],
            },
            features: [
                {
                    feature: 'Pre-configured dashboards',
                    companies: {
                        Matomo: true,
                        GA4: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Visitor and view tracking',
                    companies: {
                        Matomo: true,
                        GA4: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Session and duration tracking',
                    companies: {
                        Matomo: true,
                        GA4: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Bounce rate tracking',
                    companies: {
                        Matomo: true,
                        GA4: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Breakdown by GeoIP',
                    companies: {
                        Matomo: true,
                        GA4: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Breakdown by device and browser',
                    companies: {
                        Matomo: true,
                        GA4: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Web Vitals reporting',
                    companies: {
                        Matomo: true,
                        GA4: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Revenue tracking',
                    companies: {
                        Matomo: true,
                        GA4: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Real-time reporting',
                    companies: {
                        Matomo: true,
                        GA4: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Open source',
                    companies: {
                        Matomo: true,
                        GA4: false,
                        PostHog: true,
                    },
                },
                {
                    feature: '1st party cookies',
                    companies: {
                        Matomo: true,
                        GA4: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Cookieless tracking',
                    companies: {
                        Matomo: true,
                        GA4: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'HIPAA compliance',
                    companies: {
                        Matomo: true,
                        GA4: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'GDPR compliance',
                    companies: {
                        Matomo: true,
                        GA4: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'No data sampling',
                    companies: {
                        Matomo: true,
                        GA4: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Scroll depth tracking',
                    companies: {
                        Matomo: false,
                        GA4: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Custom channel types',
                    companies: {
                        Matomo: false,
                        GA4: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Integrated product analytics',
                    companies: {
                        Matomo: false,
                        GA4: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Revenue attribution',
                    companies: {
                        Matomo: false,
                        GA4: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Ad blocker resilient',
                    companies: {
                        Matomo: false,
                        GA4: false,
                        PostHog: true,
                    },
                },
            ],
        },
        pairsWith: [
            {
                slug: 'product-analytics',
                description:
                    'Need to go deeper than a dashboard? Building your own insights and SQL queries from scratch!',
            },
            {
                slug: 'session-replay',
                description:
                    "Get more context by watching what users actually do on your site. Spot the nuances that quantifiable data doesn't tell you.",
            },
            {
                slug: 'surveys',
                description:
                    'Get even more context by sending surveys to users. Arrange interviews. Ask questions. Serve pop-ups.',
            },
        ],
    },
    {
        Icon: IconFlask,
        name: 'Experiments',
        handle: 'experiments',
        type: 'feature_flags', // Uses feature_flags billing
        slug: 'experiments',
        color: 'purple',
        colorSecondary: 'lilac',
        category: 'product',
        billedWith: 'Feature flags',
        seo: {
            title: 'Experiments - PostHog',
            description: 'Run statistically-significant multivariate tests and robust targeting & exclusion rules.',
        },
        answersDescription: 'Test changes with statistical significance',
        sharesFreeTier: 'feature_flags',
        overview: {
            title: 'Test changes with statistical significance',
            description:
                'Run A/B tests with our advanced Bayesian statistical engine. Check results anytime without p-hacking concerns, get clear win probabilities, and make confident decisions faster.',
            textColor: 'text-white', // tw
        },
        screenshots: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Xnapper_2025_01_20_15_25_58_0867c02f69.png',
                alt: 'Screenshot of managing an A/B test in PostHog',
                classes: '',
            },
        ],
        hog: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/hogs/ab-testing-hog.png',
            alt: 'Hedgehog experimenting',
            classes: 'absolute bottom-0 right-0 max-w-md',
        },
        customers: {
            ycombinator: {
                headline: 'boosted community engagement by 40%',
                description:
                    "Y Combinator uses PostHog's experiments to try new ideas, which has led to significant improvements.",
            },
            researchgate: {
                headline: 'tests product changes for over 25M users',
                description:
                    'Our data scientists are able to rapidly and autonomously iterate on the data models that power our home feed.',
            },
            vendasta: {
                headline: 'increased registrations by 30%',
                description:
                    "This experiment cuts drop-off in half – that's a 50% improvement without a single user complaining!",
            },
            assemblyai: {
                headline: 'switched from Mixpanel for a leaner stack',
                description: 'I feel like, every single week, we discover something new that makes a difference.',
            },
        },
        features: [
            {
                title: 'Bayesian statistical engine',
                headline: 'Advanced Bayesian statistics for faster decisions',
                description:
                    'Check results anytime without p-hacking concerns. Get clear win probabilities and credible intervals that show the likely range of improvement.',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/AbTesting/images/goals.png',
                        alt: 'Bayesian statistics visualization',
                    },
                ],
                features: [
                    {
                        title: 'Real-time results',
                        description:
                            'Check experiment results anytime without statistical penalties or peeking problems',
                    },
                    {
                        title: 'Clear probability statements',
                        description:
                            'Get direct statements like "95% probability that variant B is better than control"',
                    },
                    {
                        title: 'Credible intervals',
                        description: 'See the likely range of improvement with visual confidence bands',
                    },
                    {
                        title: 'No fixed sample sizes',
                        description:
                            'Make decisions when you have enough evidence, not when you hit an arbitrary number',
                    },
                ],
            },
            {
                title: 'Flexible experiment types',
                headline: 'Test any metric that matters to your business',
                description:
                    'Support for conversion funnels, count-based trends, value-based metrics, and custom goals',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/AbTesting/images/targeting-ab.png',
                        alt: 'Experiment metrics and goals',
                    },
                ],
                features: [
                    {
                        title: 'Funnel metrics',
                        description: 'Test conversion rates through multi-step user journeys',
                    },
                    {
                        title: 'Count-based trends',
                        description: 'Measure events like pageviews, clicks, or feature usage',
                    },
                    {
                        title: 'Value-based trends',
                        description: 'Track revenue, time spent, or any numeric value',
                    },
                    {
                        title: 'Primary & secondary metrics',
                        description: 'Monitor main goals while watching for negative side effects',
                    },
                    {
                        title: 'Shared metrics library',
                        description: 'Create reusable metrics across experiments for consistency',
                    },
                ],
            },
            {
                title: 'Smart recommendations',
                headline: 'Built-in guidance for successful experiments',
                description:
                    'Get automatic recommendations for sample size, test duration, and minimum detectable effects based on your data',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/AbTesting/images/recommendations.png',
                        alt: 'Smart recommendations',
                    },
                ],
                features: [
                    {
                        title: 'Sample size calculator',
                        description: 'Know how many users you need based on your minimum detectable effect',
                    },
                    {
                        title: 'Duration estimates',
                        description: 'Get recommendations on how long to run your test',
                    },
                    {
                        title: 'Pre-launch checklist',
                        description: 'Ensure your experiment is set up correctly before launch',
                    },
                    {
                        title: 'Health monitoring',
                        description: 'Automatic alerts for sample ratio mismatch and other issues',
                    },
                ],
            },
            {
                title: 'Advanced targeting',
                headline: 'Precise control over who sees your experiments',
                description: 'Target by user properties, cohorts, geographic location, or custom conditions',
                features: [
                    {
                        title: 'User property targeting',
                        description: 'Target based on any user attribute you track',
                    },
                    {
                        title: 'Cohort integration',
                        description: 'Run experiments on specific user segments or behavioral cohorts',
                    },
                    {
                        title: 'Geographic targeting',
                        description: 'Test changes in specific countries or regions',
                    },
                    {
                        title: 'Percentage rollouts',
                        description: 'Start small with 5% of users and scale up safely',
                    },
                    {
                        title: 'Group-level experiments',
                        description: 'Test at organization or team level for B2B products',
                    },
                ],
            },
            {
                title: 'Developer-friendly implementation',
                headline: 'Simple integration with powerful capabilities',
                description: 'Built on our feature flag infrastructure with all major SDKs supported',
                features: [
                    {
                        title: 'Feature flag foundation',
                        description: 'Each experiment is a feature flag with statistical superpowers',
                    },
                    {
                        title: 'JSON payloads',
                        description: 'Pass configuration data to dynamically change experiences',
                    },
                    {
                        title: 'Multivariate testing',
                        description: 'Test up to 9 variants against a control group',
                    },
                    {
                        title: 'Local evaluation',
                        description: 'Zero latency with cached flag values',
                    },
                    {
                        title: 'All major platforms',
                        description: 'SDKs for web, mobile, backend, and more',
                    },
                ],
            },
        ],
        questions: [
            {
                question: 'Does this new onboarding flow increase conversion?',
            },
            {
                question: 'How does this affect adoption in Europe?',
            },
            {
                question: 'Will enterprise customers like this new feature?',
            },
            {
                question: 'Which pricing model generates more revenue?',
            },
            {
                question: 'Does simplifying our signup form reduce drop-off?',
            },
            {
                question: 'Will this UI change improve user engagement?',
            },
            {
                question: 'Should we show social proof on the landing page?',
            },
            {
                question: 'Does the new checkout flow reduce cart abandonment?',
            },
        ],
        comparison: {
            summary: {
                them: [
                    {
                        title: 'No-code experiments or CMS capabilities',
                        subtitle: "You'll still need a designer/engineer to create experiments",
                    },
                    {
                        title: 'No integration with Google Ads',
                        subtitle:
                            "PostHog can't run ad experiments, or target users into an experiment based on an ad variant engagement.",
                    },
                ],
                us: [
                    {
                        title: 'Bayesian statistical engine',
                        subtitle:
                            'Check results anytime without p-hacking. Get clear win probabilities instead of confusing p-values.',
                    },
                    {
                        title: 'Integration with other PostHog products',
                        subtitle:
                            'Attach surveys to experiments or view replays for a test group. Analyze results beyond your initial hypothesis or goal metric.',
                    },
                    {
                        title: 'No fixed sample size requirements',
                        subtitle: 'Make decisions when you have enough evidence, not when you hit an arbitrary number',
                    },
                    {
                        title: 'Group-level experiments for B2B',
                        subtitle:
                            'Test features at the organization level to avoid contamination between users in the same company',
                    },
                    {
                        title: 'Shared metrics library',
                        subtitle: 'Create consistent, reusable metrics across all experiments',
                    },
                ],
            },
            features: [
                {
                    feature: 'Unlimited experiments',
                    companies: {
                        AmplitudeExperiments: true,
                        Optimizely: true,
                        VWO: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Multivariate experiments',
                    companies: {
                        AmplitudeExperiments: true,
                        Optimizely: true,
                        VWO: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Secondary goals',
                    companies: {
                        AmplitudeExperiments: true,
                        Optimizely: true,
                        VWO: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Minimum goals',
                    companies: {
                        AmplitudeExperiments: true,
                        Optimizely: true,
                        VWO: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Duration prediction',
                    companies: {
                        AmplitudeExperiments: false,
                        Optimizely: false,
                        VWO: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Cross-domain experiments',
                    companies: {
                        AmplitudeExperiments: false,
                        Optimizely: true,
                        VWO: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Traffic allocation',
                    companies: {
                        AmplitudeExperiments: false,
                        Optimizely: true,
                        VWO: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Target by location',
                    companies: {
                        AmplitudeExperiments: true,
                        Optimizely: true,
                        VWO: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Target by cohort',
                    companies: {
                        Pendo: true,
                        Optimizely: true,
                        VWO: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Target by person property',
                    companies: {
                        Pendo: true,
                        Optimizely: true,
                        VWO: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Bayesian statistics',
                    companies: {
                        AmplitudeExperiments: false,
                        Optimizely: false,
                        VWO: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Check results anytime',
                    companies: {
                        AmplitudeExperiments: false,
                        Optimizely: false,
                        VWO: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Group-level experiments',
                    companies: {
                        AmplitudeExperiments: false,
                        Optimizely: false,
                        VWO: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Integrated session replay',
                    companies: {
                        AmplitudeExperiments: false,
                        Optimizely: false,
                        VWO: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Shared metrics library',
                    companies: {
                        AmplitudeExperiments: false,
                        Optimizely: false,
                        VWO: false,
                        PostHog: true,
                    },
                },
            ],
        },
        pairsWith: [
            {
                slug: 'product-analytics',
                description:
                    'Run analysis based on the value of a test, or build a cohort of users from a test variant',
            },
            {
                slug: 'session-replay',
                description:
                    "Watch recordings of users in a variant to discover nuances in why they did or didn't complete the goal",
            },
            {
                slug: 'feature-flags',
                description:
                    'Make changes to the feature flag the experiment uses - including JSON payload for each variant',
            },
        ],
    },
]

export default function useProducts() {
    const {
        allProductData: {
            nodes: [{ products: billingProducts }],
        },
    } = useStaticQuery(allProductsData)

    const [products, setProducts] = useState(
        initialProducts
            .filter((product, index) => {
                // Only show products that have direct billing data OR have a billedWith property
                const hasBillingData = billingProducts.find(
                    (billingProduct: any) => billingProduct.type === product.handle
                )
                const hasBilledWith = product.billedWith

                // Avoid duplicate Experiments entries - keep only the first one
                if (product.name === 'Experiments' && hasBilledWith) {
                    const firstExperimentsIndex = initialProducts.findIndex(
                        (p) => p.name === 'Experiments' && p.billedWith
                    )
                    return index === firstExperimentsIndex
                }

                return hasBillingData || hasBilledWith
            })
            .map((product) => {
                const billingData = billingProducts.find(
                    (billingProduct: any) => billingProduct.type === product.handle
                )
                const paidPlan = billingData?.plans.find((plan: any) => plan.tiers)
                const startsAt = paidPlan?.tiers?.find((tier: any) => tier.unit_amount_usd !== '0')?.unit_amount_usd
                const freeLimit = paidPlan?.tiers?.find((tier: any) => tier.unit_amount_usd === '0')?.up_to
                const unit = billingData?.unit
                return {
                    ...product,
                    cost: 0,
                    billingData,
                    costByTier: paidPlan?.tiers ? calculatePrice(product.volume || 0, paidPlan.tiers).costByTier : [],
                    freeLimit,
                    startsAt: startsAt && startsAt.length <= 3 ? Number(startsAt).toFixed(2) : startsAt,
                    unit,
                }
            })
    )

    const monthlyTotal = useMemo(() => products.reduce((acc, product) => acc + product.cost, 0), [products])

    const setProduct = (handle: string, data: any) => {
        setProducts((products) =>
            products.map((product) => {
                if (product.handle === handle && !product.billedWith) {
                    return {
                        ...product,
                        ...data,
                    }
                }
                return product
            })
        )
    }

    const setVolume = (handle: string, volume: number) => {
        const rounded = Math.round(volume)
        const product = products.find((product) => product.handle === handle)
        const { total, costByTier } = calculatePrice(
            rounded,
            product?.billingData.plans.find((plan: any) => plan.tiers)?.tiers
        )
        setProduct(handle, {
            volume: rounded,
            cost: total,
            costByTier,
        })
    }

    return { products, setVolume, setProduct, monthlyTotal }
}

const allProductsData = graphql`
    query {
        allProductData {
            nodes {
                products {
                    description
                    docs_url
                    image_url
                    icon_key
                    inclusion_only
                    contact_support
                    addons {
                        contact_support
                        description
                        docs_url
                        image_url
                        icon_key
                        inclusion_only
                        name
                        type
                        unit
                        legacy_product
                        features {
                            key
                            name
                            description
                            category
                            limit
                            note
                            entitlement_only
                            is_plan_default
                            unit
                        }
                        plans {
                            description
                            docs_url
                            image_url
                            name
                            plan_key
                            product_key
                            unit
                            flat_rate
                            unit_amount_usd
                            features {
                                key
                                name
                                description
                                category
                                limit
                                note
                                entitlement_only
                                is_plan_default
                                unit
                            }
                            tiers {
                                current_amount_usd
                                current_usage
                                flat_amount_usd
                                unit_amount_usd
                                up_to
                            }
                        }
                    }
                    name
                    type
                    unit
                    usage_key
                    legacy_product
                    plans {
                        description
                        docs_url
                        features {
                            key
                            name
                            description
                            category
                            limit
                            note
                            entitlement_only
                            is_plan_default
                            unit
                        }
                        free_allocation
                        image_url
                        included_if
                        name
                        plan_key
                        product_key
                        contact_support
                        unit_amount_usd
                        tiers {
                            current_amount_usd
                            current_usage
                            flat_amount_usd
                            unit_amount_usd
                            up_to
                        }
                        unit
                    }
                }
            }
        }
    }
`

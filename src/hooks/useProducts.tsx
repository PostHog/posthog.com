import React from 'react'
import {
    IconDatabase,
    IconWarning,
    IconFlask,
    IconGraph,
    IconMessage,
    IconRewindPlay,
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
import { allProductsData } from 'components/Pricing/Pricing'
import { calculatePrice } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import { FIFTY_MILLION, MAX_PRODUCT_ANALYTICS, MILLION, TEN_MILLION } from 'components/Pricing/pricingLogic'
import { useStaticQuery } from 'gatsby'
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
                title: 'Dashboards',
                headline: 'Create custom analytics dashboards',
                description: 'Build and customize dashboards to monitor key metrics and share insights with your team.',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/web_analytics_top_light_mode_2024_10_be53cf5325.png',
                        alt: 'Dashboard visualization',
                    },
                ],
                features: [
                    {
                        title: 'Custom layouts',
                        description: 'Arrange insights in custom layouts to tell your data story',
                    },
                    {
                        title: 'Real-time updates',
                        description: 'See your metrics update in real-time as new data comes in',
                    },
                    {
                        title: 'Sharing',
                        description: 'Share dashboards with team members and stakeholders',
                    },
                    {
                        title: 'Templates',
                        description: 'Use pre-built templates for common analytics needs',
                    },
                ],
            },
            {
                title: 'SQL',
                headline: 'Write custom SQL queries',
                description:
                    'Create custom insights using SQL to analyze your data in ways that go beyond standard insights.',
                icon: <IconHogQL />,
                color: 'purple',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-sql.png',
                        alt: 'SQL query visualization',
                    },
                ],
                features: [
                    {
                        title: 'Custom queries',
                        description: 'Write SQL queries to analyze your data in any way you need',
                    },
                    {
                        title: 'Advanced analysis',
                        description: 'Perform complex calculations and data transformations',
                    },
                    {
                        title: 'Data export',
                        description: 'Export query results for further analysis',
                    },
                    {
                        title: 'Query templates',
                        description: 'Save and reuse common queries',
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
                question: 'What’s my churn rate? / How can I lower my churn rate?',
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
                slug: '/product-analytics',
                description: 'Jump into a playlist of session recordings directly from any time series in a graph',
            },
            {
                slug: '/feature-flags',
                description: "See which feature flags are enabled for a user's session",
            },
            {
                slug: '/experiments',
                description:
                    'Generate a playlist of recordings limited to an A/B test or specific group within a multivariate experiment.',
            },
        ],
    },
    {
        Icon: IconToggle,
        name: 'Feature flags',
        handle: 'feature_flags',
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
                    'Feature flags immediately bought a lot of value. What’s really elegant is how flags interlink with product analytics.',
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
                                Enter the payload in the feature flag’s settings (inside PostHog) as a value or an
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
                    'Improve speed by caching a flag’s value on initial load. Or use the API to build your own UI. ',
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
                            When developing locally, you can set a flag's value in your browser’s console.
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
                        description: 'See who hit a feature flag, the flag’s value, and which page they were on',
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
                slug: '/product-analytics',
                description:
                    "Run any insight filtered by a flag's value, or group by flag to see usage across a flag's variants",
            },
            {
                slug: '/product-analytics',
                description: 'User paths: See how a flag’s value influenced an intended outcome',
            },
            {
                slug: '/session-replay',
                description:
                    'Filter recordings down to only when a feature flag was called, or to a specific value of a flag',
            },
        ],
    },
    {
        Icon: IconFlask,
        name: 'Experiments',
        handle: 'feature_flags',
        color: 'purple',
        colorSecondary: 'lilac',
        category: 'product',
        billedWith: 'Feature flags',
        slug: '/experiments',
    },
    {
        Icon: IconMessage,
        name: 'Surveys',
        handle: 'surveys',
        slug: 'surveys',
        color: 'salmon',
        colorSecondary: 'red',
        category: 'product',
        slider: {
            marks: [250, 2000, 15000, 100000],
            min: 250,
            max: 100000,
        },
        volume: 250,
    },
    {
        Icon: IconDatabase,
        name: 'Data warehouse',
        handle: 'data_warehouse',
        slug: 'data-warehouse',
        color: 'purple',
        colorSecondary: 'lilac',
        category: 'data',
        slider: {
            marks: [1000000, 10000000, 100000000, 1000000000],
            min: 1000000,
            max: 1000000000,
        },
        volume: 1000000,
    },
    {
        Icon: IconWarning,
        name: 'Error tracking',
        slug: 'error-tracking',
        handle: 'error_tracking',
        color: 'orange',
        colorSecondary: 'red',
        category: 'engineering',
        slider: {
            marks: [100000, 1000000, 10000000, 50000000],
            min: 100000,
            max: 50000000,
        },
        volume: 100000,
    },
]

export default function useProducts() {
    const {
        allProductData: {
            nodes: [{ products: billingProducts }],
        },
    } = useStaticQuery(allProductsData)

    const [products, setProducts] = useState(
        initialProducts.map((product) => {
            const billingData = billingProducts.find((billingProduct: any) => billingProduct.type === product.handle)
            const paidPlan = billingData?.plans.find((plan: any) => plan.tiers)
            const startsAt = paidPlan?.tiers?.find((tier: any) => tier.unit_amount_usd !== '0')?.unit_amount_usd
            const freeLimit = paidPlan?.tiers?.find((tier: any) => tier.unit_amount_usd === '0')?.up_to
            const unit = billingData?.unit
            return {
                ...product,
                cost: 0,
                billingData,
                costByTier: calculatePrice(product.volume || 0, paidPlan?.tiers).costByTier,
                freeLimit,
                startsAt: startsAt.length <= 3 ? Number(startsAt).toFixed(2) : startsAt,
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

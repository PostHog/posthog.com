import React from 'react'
import { IconPiggyBank } from '@posthog/icons'

export const revenueAnalytics = {
    name: 'Revenue Analytics',
    Icon: IconPiggyBank,
    handle: 'revenue_analytics',
    slug: 'revenue-analytics',
    color: 'green',
    colorSecondary: 'green-2',
    category: 'analytics',
    status: 'beta',
    billedWith: 'Data warehouse',
    seo: {
        title: 'Revenue Analytics - PostHog',
        description:
            'Track your revenue alongside product metrics, deferred recognition for subscriptions, and multi-currency support all in one place.',
    },
    overview: {
        title: 'Track revenue alongside product metrics',
        description: (
            <>
                Revenue attribution, deferred recognition for subscriptions, and multi-currency support all in one
                place.{' '}
                <span className="text-2xl">
                    <br />
                    Supports Stripe and events-based tracking.
                </span>
            </>
        ),
        textColor: 'text-white',
    },
    screenshots: {
        overview: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/revenue_analytics_light_8c167328e5.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/revenue_analytics_dark_03ce149b78.png',
            alt: 'Revenue Analytics dashboard',
            classes: 'mt-12 @2xl:mt-0 px-4 @2xl:px-12',
            imgClasses: 'rounded-md overflow-hidden shadow-2xl',
        },
    },
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/revenue_analytics_hog_81ae754b5e.png',
        alt: 'Hedgehog holding a big dollar coin',
        classes: 'absolute bottom-0 -right-4 max-w-sm',
    },
    customers: {
        // assemblyai: {
        //     headline: 'tracks revenue per customer segment',
        //     description: 'We can see exactly which features drive revenue and which customer segments are most valuable.',
        // },
        // hasura: {
        //     headline: 'connects Stripe data with product usage',
        //     description: 'Revenue analytics shows us the direct impact of product changes on our bottom line.',
        // },
        // contra: {
        //     headline: 'attributes revenue to marketing channels',
        //     description: 'Finally we can see which campaigns actually generate revenue, not just clicks.',
        // },
        // ycombinator: {
        //     headline: 'monitors portfolio company metrics',
        //     description: 'Revenue tracking alongside product metrics gives us a complete picture of company health.',
        // },
    },
    features: [
        {
            title: 'Revenue data sources',
            headline: 'Flexible ways to track revenue',
            description: 'Connect your revenue data directly through our data warehouse or via manual events.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_09_05_at_14_05_35_288e8e0d6c.png',
                    srcDark:
                        'https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_09_05_at_14_06_29_e4fe61d678.png',
                    alt: 'Revenue analytics dashboard',
                },
            ],
            features: [
                {
                    title: 'Event properties',
                    description: 'Add value and currency properties to any revenue-generating event',
                },
                {
                    title: 'Stripe integration',
                    description: 'Connect Stripe directly for automatic revenue tracking',
                },
                {
                    title: 'Backend events',
                    description: 'Track server-side purchases with session association',
                },
                {
                    title: 'Multi-currency support',
                    description: 'Handle payments in any currency with automatic conversion to your favorite currency',
                },
                {
                    title: 'Coming soon',
                    description: 'Chargebee, RevenueCat and Polar integrations',
                },
            ],
        },
        {
            title: 'Subscription analytics',
            headline: 'Built for recurring revenue',
            description: 'Automatic deferred revenue recognition and subscription metrics for SaaS businesses.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_09_05_at_17_26_03_12faf2da1c.png',
                    srcDark:
                        'https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_09_05_at_17_26_33_17f5406845.png',
                    alt: 'Revenue analytics dashboard charts',
                },
            ],
            features: [
                {
                    title: 'Deferred revenue',
                    description: 'Automatically spread subscription revenue across service periods',
                },
                {
                    title: 'MRR/ARR tracking',
                    description: 'Monitor monthly and annual recurring revenue trends',
                },
                {
                    title: 'Multiple breakdowns',
                    description: 'Break your revenue down by product, plan, customer, coupon, customer cohort, etc.',
                },
                {
                    title: 'Churn analysis',
                    description: 'See revenue churn alongside user churn metrics',
                },
                {
                    title: 'Expansion revenue',
                    description: 'Track upgrades, downgrades, and expansion revenue',
                },
                {
                    title: 'Future revenue',
                    description: 'Visualize committed revenue from existing subscriptions',
                },
            ],
        },
        {
            title: 'Unify revenue & product data',
            headline: 'Revenue data alongside your persons/groups',
            description: 'See how revenue behaves for individual customers/companies.',
            features: [
                {
                    title: 'Explore SQL data',
                    description: 'Query revenue data with SQL for custom analysis',
                },
                {
                    title: 'CRM integration (coming soon)',
                    description:
                        'CRM product is coming soon letting you see how revenue behaves for each of your customers/companies',
                },
                {
                    title: 'Dashboard integration',
                    description: 'Add revenue metrics to any dashboard relating to persons/groups',
                },
            ],
        },
        {
            title: 'Coming soon',
            headline: 'Roadmap for revenue analytics',
            description: "We're actively developing new features based on user feedback.",
            features: [
                {
                    title: 'CAC & CPC metrics',
                    description:
                        'Connect your marketing data to track your customer acquisition cost and cost per click',
                },
                {
                    title: 'More integrations',
                    description: 'Chargebee, RevenueCat, Polar and custom payment platforms',
                },
                {
                    title: 'Advanced forecasting',
                    description: 'Revenue predictions based on historical data',
                },
                {
                    title: 'Profit tracking',
                    description: 'Connect cost data for margin analysis',
                },
            ],
        },
    ],
    questions: [
        {
            question: 'What revenue sources can I connect?',
            url: '/docs/revenue-analytics/payment-platforms',
            type: 'docs',
        },
        {
            question: 'Can I capture revenue from events?',
            url: '/docs/revenue-analytics/capture-revenue-events',
            type: 'docs',
        },
        {
            question: 'How can I track my MRR/ARR?',
            url: '/docs/revenue-analytics/dashboard#mrr-and-arr',
            type: 'docs',
        },
        {
            question: 'How can I track my user/revenue churn?',
            url: '/docs/revenue-analytics/dashboard#subscriptions-and-customers',
            type: 'docs',
        },
        {
            question: "What's the revenue impact of our latest product change?",
            url: '/docs/revenue-analytics/dashboard#filters-and-breakdowns',
            type: 'docs',
        },
        {
            question: 'Which countries generate the most revenue per user?',
            url: '/docs/revenue-analytics/dashboard#filters-and-breakdowns',
            type: 'docs',
        },
        {
            question: 'How can I explore the data being used for revenue analytics?',
            url: '/docs/revenue-analytics/managed-views',
            type: 'docs',
        },
        {
            question: "What's deferred revenue?",
            url: '/docs/revenue-analytics/deferred-revenue',
            type: 'docs',
        },
        {
            question: 'What currencies do you support?',
            url: '/docs/revenue-analytics/common-questions#which-currencies-do-you-support',
            type: 'docs',
        },
        {
            question: 'Can I query converted rates?',
            url: '/docs/revenue-analytics/common-questions#can-i-query-converted-rates',
            type: 'docs',
        },
    ],
    comparison: {
        summary: {
            them: [
                {
                    title: 'You collect revenue in a platform other than Stripe',
                    subtitle: 'Chargebee, RevenueCat, Polar, etc. are not supported (yet!)',
                },
                {
                    title: 'Advanced forecasting',
                    subtitle: "We can't (yet!) predict revenue based on historical data",
                },
                {
                    title: 'Connect with marketing/operational expenses',
                },
            ],
            us: [
                {
                    title: 'Unified revenue and product data',
                    subtitle: 'See revenue alongside user behavior in one platform',
                },
                {
                    title: 'Automatic deferred recognition',
                    subtitle: 'Built-in support for subscription revenue accounting',
                },
                {
                    title: 'Multi-currency with conversion',
                    subtitle: 'Handle global payments with automatic currency conversion',
                },
                {
                    title: 'SQL access to all data',
                    subtitle: 'Query revenue data directly with PostHog SQL',
                },
            ],
        },
        features: [
            {
                feature: 'Revenue tracking',
                companies: {
                    Stripe: true,
                    Mixpanel: true,
                    Amplitude: true,
                    Baremetrics: true,
                    ChartMogul: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Event-based revenue tracking',
                companies: {
                    Stripe: false,
                    Mixpanel: true,
                    Amplitude: true,
                    Baremetrics: true,
                    ChartMogul: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Native multi-source revenue tracking',
                companies: {
                    Stripe: false,
                    Mixpanel: false,
                    Amplitude: false,
                    Baremetrics: true,
                    ChartMogul: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Deferred revenue',
                companies: {
                    Stripe: true,
                    Mixpanel: false,
                    Amplitude: false,
                    Baremetrics: true,
                    ChartMogul: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Product analytics integration',
                companies: {
                    Stripe: false,
                    Mixpanel: true,
                    Amplitude: true,
                    Baremetrics: false,
                    ChartMogul: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Multi-currency support',
                companies: {
                    Stripe: true,
                    Mixpanel: false,
                    Amplitude: false,
                    Baremetrics: true,
                    ChartMogul: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Revenue prediction',
                companies: {
                    Stripe: false,
                    Mixpanel: false,
                    Amplitude: false,
                    Baremetrics: true,
                    ChartMogul: true,
                    PostHog: false,
                },
            },
            {
                feature: 'API access to revenue data',
                companies: {
                    Stripe: false,
                    Mixpanel: false,
                    Amplitude: false,
                    Baremetrics: true,
                    ChartMogul: true,
                    PostHog: false,
                },
            },
            {
                feature: 'Market benchmark data',
                companies: {
                    Stripe: false,
                    Mixpanel: false,
                    Amplitude: false,
                    Baremetrics: true,
                    ChartMogul: true,
                    PostHog: false,
                },
            },
            {
                feature: 'SQL access to revenue data',
                companies: {
                    Stripe: false,
                    Mixpanel: false,
                    Amplitude: false,
                    Baremetrics: false,
                    ChartMogul: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Free during beta',
                companies: {
                    Stripe: false,
                    Mixpanel: false,
                    Amplitude: false,
                    Baremetrics: false,
                    ChartMogul: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Open source',
                companies: {
                    Stripe: false,
                    Mixpanel: false,
                    Amplitude: false,
                    Baremetrics: false,
                    ChartMogul: false,
                    PostHog: true,
                },
            },
        ],
    },
    pairsWith: [
        {
            slug: 'product-analytics',
            description: 'Analyze revenue alongside user behavior and product usage',
        },
        {
            slug: 'web-analytics',
            description: 'See revenue attribution by traffic source and campaign',
        },
        {
            slug: 'data-warehouse',
            description: 'Connect payment platforms for automatic revenue tracking',
        },
    ],
    presenterNotes: {
        overview:
            "<strong>Presenter notes:</strong> You already have everything in PostHog: who your customers are, how they use the app, what they like, what they don't. What if you also had how much money they're making and you could use that to power your product decisions? KA-CHOW, REVENUE ANALYTICS IS HERE, EXPLOSION MEME, YEAAAAH",
        'feature-comparison':
            "Other product analytics tools don't support revenue tracking natively, you've always got to build it yourself. Baremetrics and ChartMogul have more advanced features (for example, revenue prediction) but don't let you massage the data however you want. PostHog on the other hand? All the cool things you need with the extra power of using SQL to query your data.",
        'getting-started':
            "Setup takes seconds. Connect to your revenue data source and we'll start tracking your data straight away - including historical data.",
        docs: "Setup takes seconds. Connect to your revenue data source and we'll start tracking your data straight away - including historical data.",
        'pairs-with':
            "Wanna see how your revenue correlates to user behavior? We've got you covered, just hop onto the SQL editor and you have all your data!",
    },
}

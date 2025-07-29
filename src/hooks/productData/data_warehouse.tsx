import React from 'react'
import { IconDatabase } from '@posthog/icons'

export const dataWarehouse = {
    Icon: IconDatabase,
    name: 'Data Warehouse',
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
    presenterNotes: {
        overview:
            "<strong>Presenter notes:</strong> Your product data is lonely. It needs friends - Stripe data, CRM data, support data. Our data warehouse brings them all together. Now you can answer questions like 'What do high-value customers actually do in our product?' No ETL pipelines, no data engineering team required.",
        customers:
            "HeadshotPro analyzes Adwords alongside product usage - marketing and engineering finally speak the same language. Webshare syncs Intercom data to see how support interactions affect retention. These aren't special cases - everyone needs this.",
        features:
            "<strong>Sync from Stripe:</strong> Connect revenue to product usage. See which features drive MRR. Track churn by usage patterns. Finally answer 'what makes customers pay more?'<br /><br /><strong>Sync from Hubspot:</strong> Link your CRM to product data. See how leads use your product before they buy. Track deal velocity by feature adoption.<br /><br /><strong>Sync from Zendesk:</strong> Connect support tickets to user behavior. Do angry users churn more? Which features cause the most tickets?<br /><br /><strong>Sync from anywhere:</strong> Google Ads, Salesforce, custom databases. If it has data, we can sync it. CSV uploads for everything else.<br /><br /><strong>More features:</strong><br /><br /><strong>Link multiple sources:</strong> Join Stripe customers to PostHog users. Connect everything with simple UI.<br /><br /><strong>Query with SQL:</strong> Full SQL access to everything. No vendor lock-in - it's just SQL.<br /><br /><strong>Save queries as views:</strong> Build once, use everywhere. Turn complex joins into simple tables.<br /><br /><strong>Custom sync periods:</strong> Daily for critical data, monthly for the rest. You control the schedule.",
        answers:
            'These are real questions our customers answer. MRR vs behavior - join Stripe and product data. Support impact - connect Zendesk to retention metrics. Lead quality - link HubSpot to usage patterns. Revenue predictions - compare CRM forecasts to actual Stripe data. Churn analysis - see payment failures alongside last product usage.',
        pricing:
            "1 million rows synced free monthly. Then simple per-row pricing. Compare to Fivetran charging thousands per month. We're 10x cheaper because we built for product teams, not enterprise IT.",
        'comparison-summary':
            'Traditional data warehouses (Snowflake, BigQuery) require data teams. ETL tools (Fivetran, Stitch) just move data around. We do both - sync and analyze in one place. Perfect for product teams who need answers, not infrastructure.',
        'feature-comparison':
            "We don't have every connector Fivetran has. We don't need Snowflake's scale. What we have: dead-simple setup, built-in analytics, and it works with all your PostHog data. For most teams, that's exactly enough.",
        docs: "Step-by-step guides for each integration. Common query patterns documented. Real examples like 'revenue per feature' and 'support ticket impact on churn.' No data engineering degree required.",
        'pairs-with':
            "The magic happens when everything connects. Stripe revenue in your funnels. CRM data in your experiments. Support tickets next to session replays. This is why we built it - your data shouldn't live in silos.",
        'getting-started':
            "Pick your most important external data source. Usually Stripe or your CRM. Click connect, authenticate, pick tables. Data starts syncing immediately. Write your first JOIN query in 5 minutes. That 'aha' moment when revenue meets product data? Priceless.",
    },
}

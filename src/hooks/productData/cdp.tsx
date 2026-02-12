import React from 'react'
import { IconPlug } from '@posthog/icons'

// this data powers the CDP page, but the product icons that appear on /products and in the menu bar are defined in productNavigation.ts under the 'integrations' handle.

export const cdp = {
    parentIcon: 'spreadsheetSearch',
    Icon: IconPlug,
    name: 'CDP', // Integrations library (145+)
    description: 'Get data into PostHog and send it where it needs to go.',
    handle: 'cdp',
    type: 'cdp',
    slug: 'cdp',
    color: 'sky-blue',
    colorSecondary: 'blue',
    // category: 'data',
    hideFromPricingTableAndCalculator: true,
    seo: {
        title: 'CDP sources & destinations - PostHog',
        description: 'Get all your data into PostHog with 60+ sources & destinations',
    },
    answersDescription: 'Ingest, transform, and send data between 145+ tools',
    overview: {
        title: 'Ingest, transform, and send data between 145+ tools',
        description:
            "PostHog's customer data platform (CDP) makes it easy to import data from a warehouse, sync with event data, and export to other products in your stack.",
        textColor: 'text-white', // tw
    },
    screenshots: {
        overview: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/products/screenshot-cdp.png',
            alt: "Screenshot of PostHog's CDP",
            classes: '',
        },
        home: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_cdp_dark_5610c405b2.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_cdp_light_97bc52e8f9.png',
            alt: 'CDP screenshot',
            classes: 'justify-center items-end px-4 @lg:px-6',
            imgClasses: 'rounded-t shadow-2xl',
        },
    },
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
        rows: ['cdp'],
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
            "Data stuck in silos is useless. Our CDP gets it moving - from anywhere into PostHog, then out to wherever you need it. No complex pipelines, no data engineering. Just connect, transform if needed, and send. It's plumbing that actually works.",
        customers:
            "Teams use this to sync Stripe data for revenue analytics, send alerts to Slack when key events happen, and export to their data warehouse for deeper analysis. The common thread? They're tired of building custom integrations for every tool.",
        features:
            '<strong>Sources & destinations:</strong> 60+ integrations and growing. Import from data warehouses, CRMs, payment systems. Export to Slack, webhooks, S3, Snowflake, BigQuery. Real-time streaming or scheduled batches. No-code setup for everything.<br /><br /><strong>Data transformation:</strong> Clean messy data before it spreads. Enforce schemas, filter junk, map properties, add custom logic with JavaScript. Stop bad data at the source.<br /><br /><strong>Reliability & monitoring:</strong> Automatic retries with exponential backoff. Dead letter queue catches failures. Monitor success rates, debug errors, track performance. Built to handle millions of events without drama.',
        answers:
            'Sources bring data IN (Stripe → PostHog). Destinations send data OUT (PostHog → Slack). Batch exports are rock solid with retries and monitoring. Transform data with filters, property mapping, or custom JavaScript. Sources are free - you only pay for events captured.',
        pricing:
            "Sources are completely free. Import all the data you want. Destinations require the CDP add-on. Still way cheaper than Segment's $120/month starting price or RudderStack's $500/month. We don't charge by 'MTUs' or other made-up metrics.",
        'comparison-summary':
            "Segment and mParticle have more integrations but cost 10x more. Fivetran is great for data warehouse ETL but can't do real-time. RudderStack is closest to us but lacks built-in analytics. We have fewer integrations but everything you actually need, plus it works with all PostHog features.",
        'feature-comparison':
            'We have 60+ integrations vs their 300+. But honestly, how many do you actually use? We have the important ones. What we uniquely offer: built-in analytics on all your data. Others just move data - we help you understand it.',
        docs: 'Each integration has its own guide with screenshots. Common patterns documented - like Stripe revenue tracking or Slack alerting. Transformation recipes for cleaning data. All written by engineers who use these integrations daily.',
        'pairs-with':
            'Import Stripe data → analyze revenue by product feature. Send key events → Slack for real-time alerts. Export everything → your data warehouse for custom analysis. The CDP ties your whole data stack together.',
        'getting-started':
            'Start with one integration. Usually Slack for alerts or a data source you need. Click add, authenticate, configure, done. Data flows immediately. Add transformations later if needed. The goal is moving data, not perfecting it.',
    },
}

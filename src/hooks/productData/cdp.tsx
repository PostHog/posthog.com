import React from 'react'
import { IconPlug } from '@posthog/icons'

export const cdp = {
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
}

import React from 'react'
import { IconMagicWand, IconEmoji } from '@posthog/icons'

// not currently in use. check useProducts.ts
export const cdp = {
    Icon: IconMagicWand,
    name: 'Max',
    description: 'Max is a tool that helps you analyze your data and make decisions.',
    // handle: 'data_pipelines',
    handle: 'max_ai',
    type: 'max_ai',
    slug: 'max',
    color: 'purple',
    colorSecondary: 'lilac',
    category: 'ai',
    seo: {
        title: 'Max AI - PostHog',
        description: 'Max AI is a tool that helps you analyze your data and make decisions.',
    },
    overview: {
        title: 'Max AI is a tool that helps you analyze your data and make decisions.',
        description: 'Max AI is a tool that helps you analyze your data and make decisions.',
        textColor: 'text-white', // tw
    },
    screenshots: [
        {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/products/screenshot-cdp.png',
            alt: "Screenshot of PostHog's CDP",
            classes: 'absolute bottom-0 left-0 max-w-[525px] rounded-tr-md overflow-hidden shadow-2xl',
        },
    ],
    features: [
        {
            icon: IconEmoji,
            title: 'Context-aware',
            headline: 'Context-aware',
            children: (
                <ul className="divide-y divide-y-primary">
                    <li>Understands your event schema and property definitions</li>
                    <li>
                        Ability to factor in business context
                        <br />
                        <em>
                            ie: customer profile (B2B, B2C, B2B2C), stage of company (pre-product-market fit, growth
                            stage, etc.), market conditions, seasonality, current challenges, quarterly goals
                        </em>
                    </li>
                </ul>
            ),
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

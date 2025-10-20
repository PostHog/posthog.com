import React from 'react'
import { IconBolt, IconCursor, IconGraph, IconMagicWand, IconPieChart } from '@posthog/icons'
import { IconBrain } from 'components/OSIcons/Icons'
import { StickerPath } from 'components/Stickers/Stickers'

export const max_ai = {
    name: 'Max',
    parentIcon: 'aiMax',
    // Icon: IconMagicWand,
    description: 'Your AI-powered product analyst and product manager',
    role: 'Helpful chatbot',
    handle: 'max_ai',
    color: 'ai-blue',
    colorSecondary: 'lilac',
    category: 'ai',
    slug: 'max',
    status: 'beta',
    hideFromPricingTable: true,
    seo: {
        title: 'Max AI – Your AI copilot for PostHog data and insights',
        description:
            'Your AI-powered product analyst. Write natural language to query and analyze PostHog data instantly, find insights, and speed up product decisions with Max AI.',
    },
    overview: {
        title: 'Our resident AI agent who understands your product and data',
        description:
            'Max builds insights, automates manual tasks, and routes more complex tasks to other AI agents for specialized work.',
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
            alt: 'Max chat',
            // imgClasses: 'max-h-full'
        },
        sidebarInitialCropped: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/max_sidebar_initial_light_cropped_d4ac0441a1.png',
            srcDark:
                'https://res.cloudinary.com/dmukukwp6/image/upload/max_sidebar_initial_dark_cropped_240b38f95e.png',
            alt: 'Max chat',
            imgClasses: 'max-w-[444px]',
        },
    },
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/ai_max_e80de99727.png',
        alt: "Hi, I'm Max!",
        classes: 'max-w-[413px]',
    },
    skills: [
        {
            name: 'Answers product questions',
            percent: 95,
        },
        {
            name: 'Writes SQL queries',
            percent: 95,
        },
        {
            name: 'PostHog product expert',
            percent: 90,
        },
        {
            name: 'Builds data transformations',
            percent: 95,
        },
        {
            name: 'Analytics industry knowledge',
            percent: 80,
        },
    ],

    features: [
        {
            title: 'Web Analytics',
            headline: 'Web Analytics',
            layout: 'ai',
            icon: <IconPieChart className="size-5 text-green" />,
            color: 'green',
            description:
                "Privacy-friendly web analytics that doesn't require selling your soul (or your users' data). PostHog AI surfaces why traffic tanked, and what's actually converting.",
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1730807222/web_analytics_45ba970699.png',
                    alt: 'Stack traces',
                    // stylize: true,
                    // shadow: true,
                },
            ],
            skills: [
                {
                    name: 'Traffic seer',
                    description: 'Illuminates pathways through clickthrough chaos and millions of pageviews',
                    sticker: <StickerPath className="size-6" />,
                    percent: 80,
                },
                {
                    name: 'Writes SQL queries',
                    percent: 95,
                },
                {
                    name: 'PostHog product expert',
                    percent: 90,
                },
                {
                    name: 'Builds data transformations',
                    percent: 95,
                },
                {
                    name: 'Analytics industry knowledge',
                    percent: 80,
                },
            ],
        },
        {
            title: 'Product Analytics',
            headline: 'Product Analytics',
            layout: 'ai',
            icon: <IconGraph className="size-5 text-blue" />,
            color: 'blue',
            description:
                'Less digging - more dialogue. PostHog AI lives in your product data. Create insights and dashboards, and generate complex HogQL queries with natural language. ',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1730807086/product_analytics_90a59408f5.png',
                    alt: 'Stack traces',
                    // stylize: true,
                    // shadow: true,
                },
            ],
            skills: [
                {
                    name: 'Insight composer',
                    description: 'Builds insights and entire dashboards from a single prompt',
                    sticker: <StickerPath className="size-6" />,
                    percent: 80,
                },
                {
                    name: 'Writes SQL queries',
                    percent: 95,
                },
                {
                    name: 'PostHog product expert',
                    percent: 90,
                },
                {
                    name: 'Builds data transformations',
                    percent: 95,
                },
                {
                    name: 'Analytics industry knowledge',
                    percent: 80,
                },
            ],
        },
    ],
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
}

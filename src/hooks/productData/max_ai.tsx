import { IconBolt, IconCursor, IconGraph, IconMagicWand } from '@posthog/icons'
import { IconBrain } from 'components/OSIcons/Icons'

export const max_ai = {
    name: 'Max',
    parentIcon: 'aiMax',
    // Icon: IconMagicWand,
    description: 'Your AI-powered product analyst and product manager',
    handle: 'max_ai',
    color: 'ai-blue',
    colorSecondary: 'lilac',
    category: 'ai',
    slug: 'max',
    status: 'beta',
    seo: {
        title: 'Max AI - PostHog',
        description: 'Your AI-powered product analyst and product manager',
    },
    overview: {
        title: 'Our resident AI agent who understands your product and data',
        description:
            'Max builds insights, automates manual tasks, and routes more complex tasks to other AI agents for specialized work.',
        layout: 'ai',
    },
    // screenshots: [
    //     {
    //         src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/products/screenshot-cdp.png',
    //         alt: "Screenshot of PostHog's CDP",
    //         classes: 'absolute bottom-0 left-0 max-w-[525px] rounded-tr-md overflow-hidden shadow-2xl',
    //     },
    // ],
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/ai_max_e80de99727.png',
        alt: "Hi, I'm Max!",
        classes: 'max-w-[413px]',
    },
    features: [
        {
            title: 'Max answers product questions',
            headline: 'answers product questions',
            description:
                'Getting insights from an analytics suite can sometimes feel like navigating an airplane cockpit. Max eliminates the need to fiddle with a bunch of controls. Just ask a question and Max will give you a direct answer.',
            features: [
                {
                    icon: IconBrain,
                    title: 'Context-aware',
                    items: [
                        'Understands your event schema and property definitions',
                        'Ability to factor in business context<br /><p class="italic leading-normal text-secondary text-[15px]">ie: customer profile (B2B, B2C, B2B2C), stage of company (pre-product-market fit, growth stage, etc.), market conditions, seasonality, current challenges, quarterly goals</p>',
                    ],
                },
                {
                    icon: IconBolt,
                    title: 'Queries your data stack',
                    items: [
                        'Has access to your events and actions, people, user sessions, groups, and cohorts',
                        'Sources data from your connected data warehouse sources',
                    ],
                },
                {
                    icon: IconGraph,
                    title: 'Generates insights',
                    items: [
                        'Builds data visualizations',
                        'Capable of answers specific data questions without needing to generate visualizations',
                    ],
                },
                {
                    icon: IconCursor,
                    title: 'Navigates the query building interface',
                    items: [
                        "Assists in sets date ranges and applying filters, data breakdowns, and formulas when you want to take manual control but don't want to do <em>all</em> the work yourself",
                    ],
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
            q: 'Write an SQL query for me?',
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
                'Get your source data into PostHog, then analyze it alongside your product data to unlock new insights and discover new user behaviours.',
        },
        {
            slug: 'data-warehouse',
            description:
                'Build a data warehouse in PostHog and then pull in data from all your platforms to one place where it can be easily interrogated.',
        },
    ],
}

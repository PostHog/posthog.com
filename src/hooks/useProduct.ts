import {
    IconPieChart,
    IconThoughtBubble,
    IconPlug,
    IconMessage,
    IconDashboard,
    IconNotebook,
    IconAI,
    IconMagicWand,
    IconPiggyBank,
    IconToolbar,
    IconBrackets,
    IconAsterisk,
    IconWebhooks,
    IconClockRewind,
    IconRocket,
    IconLifecycle,
    IconClock,
    IconPeople,
    IconDatabase,
    IconTerminal,
    IconGraph,
    IconFunnels,
    IconBolt,
    IconArrowUpRight,
} from '@posthog/icons'
import useProducts from './useProducts'
import { IconBrain } from 'components/OSIcons'

const dedupe = (products) => {
    const deduped = {}
    for (const product of products) {
        if (!deduped[product.name]) {
            deduped[product.name] = product
        }
    }
    return Object.values(deduped)
}

export default function useProduct({ handle }: { handle?: string } = {}) {
    const { products } = useProducts()
    const extendedProducts = [
        // add alpha/beta products here, or "products" that aren't actually products (like dashboards, notebooks, etc).
        // once a product is ready to be released, it should be added to useProducts.tsx.
        // it needs either billing info or billed_with to appear in the products section. if neither of those are true, use this file.

        // if we want to override props on something that exists in useProducts.tsx (since it will ultimately move to the billing API...)
        // {
        //     ...products.find((product) => product.handle === 'product_analytics'),
        //     handle: 'product_analytics',
        //     name: 'Product analytics',
        //     slug: 'product-analytics',
        // },

        {
            name: 'Broadcasts',
            Icon: IconMessage,
            description: 'send messages to users.',
            handle: 'broadcasts',
            color: 'blue',
            colorSecondary: 'sky-blue',
            category: 'communication',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: 'broadcasts',
            status: 'WIP',
        },
        {
            name: 'User interviews',
            Icon: IconThoughtBubble,
            description: 'Get feedback from users.',
            handle: 'user_interviews',
            color: 'blue',
            colorSecondary: 'purple',
            category: 'communication',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: 'user-interviews',
            status: 'WIP',
        },
        {
            name: 'Group Analytics',
            Icon: IconPeople,
            description: 'Analyze multi-seat accounts and other groups.',
            handle: 'group_analytics',
            color: 'blue',
            colorSecondary: 'purple',
            category: 'analytics',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: 'group-analytics',
        },
        {
            name: 'Teams (add-on)',
            Icon: IconPeople,
            description: 'Features for teams.',
            handle: 'teams',
            color: 'blue',
            colorSecondary: 'purple',
            category: 'product_os',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: 'teams',
        },
        {
            name: 'User profiles',
            Icon: IconPeople,
            description: 'Analyze multi-seat accounts and other groups.',
            handle: 'profiles',
            color: 'blue',
            colorSecondary: 'purple',
            category: 'product_os',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: 'profiles',
        },
        {
            name: 'Revenue Analytics',
            Icon: IconPiggyBank,
            description: 'Track revenue directly alongside your product analytics',
            handle: 'revenue_analytics',
            slug: 'revenue-analytics',
            color: 'green',
            colorSecondary: 'green-2',
            category: 'analytics',
            status: 'beta',
            seo: {
                title: 'Revenue Analytics - PostHog',
                description:
                    'Track revenue from events or payment platforms. See revenue attribution by marketing channel, deferred revenue recognition, and multi-currency support.',
            },
            overview: {
                title: 'Track revenue alongside product metrics',
                description:
                    'Connect revenue data from events or payment platforms like Stripe. See revenue attribution, deferred recognition for subscriptions, and multi-currency support all in one place.',
                textColor: 'text-white',
                layout: 'columns',
            },
            screenshots: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_06_25_at_19_51_33_9f5267a861.png',
                    alt: 'Revenue analytics dashboard',
                    classes: '',
                },
            ],
            hog: {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/hogs/product-analytics-hog.png',
                alt: 'Hedgehog counting money',
                classes: 'absolute bottom-0 right-4 max-w-lg',
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
                    description:
                        'Send revenue data via events or connect payment platforms directly through our data warehouse.',
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/revenue_light_d1249bb62b.png',
                            alt: 'Revenue data sources',
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
                            description: 'Handle payments in any currency with automatic conversion',
                        },
                        {
                            title: 'Coming soon',
                            description: 'Chargebee and other payment platform integrations',
                        },
                    ],
                },
                {
                    title: 'Revenue attribution',
                    headline: 'See where your revenue really comes from',
                    description:
                        'Attribute revenue to marketing channels, campaigns, and customer segments for true ROI analysis.',
                    features: [
                        {
                            title: 'Channel attribution',
                            description: 'Track revenue by direct, organic, paid, social, and custom channels',
                        },
                        {
                            title: 'Campaign tracking',
                            description: 'See revenue generated by each marketing campaign via UTMs',
                        },
                        {
                            title: 'Customer segmentation',
                            description: 'Break down revenue by user properties and cohorts',
                        },
                        {
                            title: 'Product attribution',
                            description: 'Connect revenue to specific features and user actions',
                        },
                        {
                            title: 'Geographic analysis',
                            description: 'Understand revenue distribution by location',
                        },
                    ],
                },
                {
                    title: 'Subscription analytics',
                    headline: 'Built for recurring revenue',
                    description: 'Automatic deferred revenue recognition and subscription metrics for SaaS businesses.',
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
                    title: 'Product analytics integration',
                    headline: 'Revenue data everywhere',
                    description:
                        'Use revenue data in funnels, cohorts, and custom insights for deeper product analysis.',
                    features: [
                        {
                            title: 'Revenue funnels',
                            description: 'Build conversion funnels that show revenue at each step',
                        },
                        {
                            title: 'User journey analysis',
                            description: 'See paths that lead to high-value purchases',
                        },
                        {
                            title: 'Cohort segmentation',
                            description: 'Create cohorts based on revenue contribution',
                        },
                        {
                            title: 'SQL access',
                            description: 'Query revenue data with HogQL for custom analysis',
                        },
                        {
                            title: 'Dashboard integration',
                            description: 'Add revenue metrics to any dashboard',
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
                            description: 'Customer acquisition cost and cost per click tracking',
                        },
                        {
                            title: 'More integrations',
                            description: 'Chargebee, PayPal, and custom payment platforms',
                        },
                        {
                            title: 'Advanced forecasting',
                            description: 'Revenue predictions based on historical data',
                        },
                        {
                            title: 'Profit tracking',
                            description: 'Connect cost data for margin analysis',
                        },
                        {
                            title: 'Invoice management',
                            description: 'Track invoice status and payment timelines',
                        },
                    ],
                },
            ],
            questions: [
                {
                    question: 'Which marketing channels generate the most revenue?',
                },
                {
                    question: "What's our MRR growth rate?",
                },
                {
                    question: 'Which features do our highest-paying customers use?',
                },
                {
                    question: 'How much revenue comes from each customer segment?',
                },
                {
                    question: "What's the revenue impact of our latest product change?",
                },
                {
                    question: 'Which countries generate the most revenue per user?',
                },
                {
                    question: 'How much expansion revenue are we generating?',
                },
                {
                    question: "What's our revenue churn rate by cohort?",
                },
            ],
            comparison: {
                summary: {
                    them: [
                        {
                            title: 'Separate revenue and product analytics',
                            subtitle: 'Most tools require switching between platforms',
                        },
                        {
                            title: 'Limited attribution options',
                            subtitle: 'Basic channel tracking without product context',
                        },
                        {
                            title: 'Manual data export and analysis',
                            subtitle: 'Export data to spreadsheets for custom analysis',
                        },
                    ],
                    us: [
                        {
                            title: 'Unified revenue and product data',
                            subtitle: 'See revenue alongside user behavior in one platform',
                        },
                        {
                            title: 'Full attribution stack',
                            subtitle: 'Connect revenue to channels, features, and user actions',
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
                            subtitle: 'Query revenue data directly with HogQL',
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
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Channel attribution',
                        companies: {
                            Stripe: false,
                            Mixpanel: false,
                            Amplitude: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Deferred revenue',
                        companies: {
                            Stripe: true,
                            Mixpanel: false,
                            Amplitude: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Product analytics integration',
                        companies: {
                            Stripe: false,
                            Mixpanel: true,
                            Amplitude: true,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Multi-currency support',
                        companies: {
                            Stripe: true,
                            Mixpanel: false,
                            Amplitude: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'SQL access',
                        companies: {
                            Stripe: false,
                            Mixpanel: false,
                            Amplitude: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Free during beta',
                        companies: {
                            Stripe: false,
                            Mixpanel: false,
                            Amplitude: false,
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
                {
                    slug: 'dashboards',
                    description: 'Add revenue metrics to any dashboard',
                },
            ],
            worksWith: ['product_analytics', 'web_analytics', 'data_warehouse', 'dashboards'],
        },
        {
            name: 'LLM Analytics',
            Icon: IconAI,
            description: 'Track costs, performance, and usage of your AI features',
            handle: 'llm_analytics',
            slug: 'llm-analytics',
            color: 'purple',
            colorSecondary: 'green-2',
            category: 'analytics',
            status: 'beta',
            seo: {
                title: 'LLM analytics - PostHog',
                description:
                    'Track every conversation, model performance, costs, and errors in your LLM applications. 10x cheaper than other LLM observability tools.',
            },
            overview: {
                title: 'X-ray vision into your LLM applications',
                description:
                    'Track conversations, model performance, costs by user, and full traces. All as regular PostHog events - roughly 10x cheaper than other LLM observability tools.',
                textColor: 'text-white',
                layout: 'columns',
            },
            screenshots: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1713967763/posthog.com/contents/docs/langfuse-dash.png',
                    alt: 'LLM analytics dashboard',
                    classes: '',
                },
            ],
            hog: {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/hogs/product-analytics-hog.png',
                alt: 'AI-powered hedgehog',
                classes: 'absolute bottom-0 right-4 max-w-lg',
            },
            customers: {
                // ycombinator: {
                //     headline: 'tracks AI costs per customer',
                //     description: 'We can finally see which users are expensive and optimize our AI features accordingly.',
                // },
                // hasura: {
                //     headline: 'monitors LLM performance in production',
                //     description: 'LLM analytics helps us catch latency spikes and errors before users complain.',
                // },
                // contra: {
                //     headline: 'correlates AI usage with retention',
                //     description: 'We discovered that users who interact with AI features have 3x higher retention.',
                // },
                // assemblyai: {
                //     headline: 'reduced LLM costs by 40%',
                //     description: 'Tracking costs by model and user helped us optimize prompts and switch models strategically.',
                // },
            },
            features: [
                {
                    title: 'Conversation tracking',
                    headline: 'Track every LLM interaction',
                    description:
                        'Capture inputs, outputs, tokens, and metadata for every conversation in your application.',
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1713967763/posthog.com/contents/docs/langfuse-dash.png',
                            alt: 'Conversation tracking',
                        },
                    ],
                    features: [
                        {
                            title: 'Full conversation history',
                            description: 'Track prompts, completions, and token counts for every interaction',
                        },
                        {
                            title: 'User attribution',
                            description: 'Connect AI interactions to specific users and organizations',
                        },
                        {
                            title: 'Privacy mode',
                            description: 'Optionally exclude sensitive prompt and completion data',
                        },
                        {
                            title: 'Metadata tracking',
                            description: 'Add custom properties like conversation ID, session, or feature',
                        },
                        {
                            title: 'Multi-turn conversations',
                            description: 'Track entire conversation threads, not just individual calls',
                        },
                    ],
                },
                {
                    title: 'Cost analytics',
                    headline: 'Understand your AI economics',
                    description:
                        'Track costs by model, user, feature, and time period to optimize spending and pricing.',
                    features: [
                        {
                            title: 'Cost per user',
                            description: 'See which users or organizations are driving your LLM costs',
                        },
                        {
                            title: 'Model comparison',
                            description: 'Compare costs across different models and providers',
                        },
                        {
                            title: 'Feature-level costs',
                            description: 'Understand the economics of each AI-powered feature',
                        },
                        {
                            title: 'Cost trends',
                            description: 'Monitor how costs change over time and with usage patterns',
                        },
                        {
                            title: 'ROI analysis',
                            description: 'Connect AI costs to revenue and user engagement metrics',
                        },
                    ],
                },
                {
                    title: 'Performance monitoring',
                    headline: 'Keep your AI fast and reliable',
                    description:
                        'Monitor latency, error rates, and model performance to ensure great user experiences.',
                    features: [
                        {
                            title: 'Latency tracking',
                            description: 'Monitor response times and identify performance bottlenecks',
                        },
                        {
                            title: 'Error monitoring',
                            description: 'Track API errors, rate limits, and model failures',
                        },
                        {
                            title: 'Model performance',
                            description: 'Compare speed and reliability across different models',
                        },
                        {
                            title: 'Real-time alerts',
                            description: 'Get notified of latency spikes or error rate increases',
                        },
                        {
                            title: 'Geographic performance',
                            description: 'See how performance varies by user location',
                        },
                    ],
                },
                {
                    title: 'Native integrations',
                    headline: 'Works with your AI stack',
                    description: 'Simple SDKs for popular LLM providers and observability platforms.',
                    features: [
                        {
                            title: 'OpenAI SDK',
                            description: 'Drop-in integration for GPT models with one line of code',
                        },
                        {
                            title: 'Anthropic SDK',
                            description: 'Native support for Claude models',
                        },
                        {
                            title: 'LangChain',
                            description: 'Full observability for LangChain applications',
                        },
                        {
                            title: 'Vercel AI SDK',
                            description: 'Track streaming responses and edge functions',
                        },
                        {
                            title: 'Platform integrations',
                            description: 'Works with Langfuse, Helicone, Traceloop, and Keywords AI',
                        },
                    ],
                },
                {
                    title: 'Advanced analytics',
                    headline: 'Go beyond basic metrics',
                    description: "Use PostHog's full analytics suite to understand AI feature adoption and impact.",
                    features: [
                        {
                            title: 'Correlation analysis',
                            description: 'See how AI usage correlates with retention, revenue, and engagement',
                        },
                        {
                            title: 'Funnel analysis',
                            description: 'Track conversion through AI-powered features',
                        },
                        {
                            title: 'Cohort analysis',
                            description: 'Compare heavy vs light AI users behavior',
                        },
                        {
                            title: 'Custom dashboards',
                            description: 'Build dashboards combining AI and product metrics',
                        },
                        {
                            title: 'SQL access',
                            description: 'Query raw LLM data with HogQL for custom analysis',
                        },
                    ],
                },
            ],
            questions: [
                {
                    question: 'What are my LLM costs by customer?',
                },
                {
                    question: 'Which AI features have the highest error rates?',
                },
                {
                    question: 'Are there latency spikes in my LLM calls?',
                },
                {
                    question: 'Do AI features improve user retention?',
                },
                {
                    question: 'Which prompts are most expensive?',
                },
                {
                    question: 'How many tokens does each feature consume?',
                },
                {
                    question: "What's the ROI of our AI features?",
                },
                {
                    question: 'Which model gives the best cost/performance ratio?',
                },
            ],
            comparison: {
                summary: {
                    them: [
                        {
                            title: 'Expensive specialized tools',
                            subtitle: 'Most LLM observability tools charge premium prices',
                        },
                        {
                            title: 'Limited analytics capabilities',
                            subtitle: 'Basic dashboards without correlation to product metrics',
                        },
                        {
                            title: 'Separate from your product data',
                            subtitle: "Can't connect AI usage to business outcomes",
                        },
                    ],
                    us: [
                        {
                            title: '10x cheaper than alternatives',
                            subtitle: 'Same pricing as regular events, not premium LLM pricing',
                        },
                        {
                            title: 'Full analytics platform',
                            subtitle: 'Connect AI metrics to retention, revenue, and engagement',
                        },
                        {
                            title: 'Privacy-first options',
                            subtitle: 'Exclude sensitive data with built-in privacy mode',
                        },
                        {
                            title: 'All major LLMs supported',
                            subtitle: 'OpenAI, Anthropic, LangChain, and more',
                        },
                        {
                            title: 'No proxy or latency',
                            subtitle: "Async tracking that doesn't slow down your app",
                        },
                    ],
                },
                features: [
                    {
                        feature: 'Conversation tracking',
                        companies: {
                            Langfuse: true,
                            Helicone: true,
                            DataDog: true,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Cost tracking',
                        companies: {
                            Langfuse: true,
                            Helicone: true,
                            DataDog: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Product analytics',
                        companies: {
                            Langfuse: false,
                            Helicone: false,
                            DataDog: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Privacy mode',
                        companies: {
                            Langfuse: true,
                            Helicone: false,
                            DataDog: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: '10x cheaper',
                        companies: {
                            Langfuse: false,
                            Helicone: false,
                            DataDog: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Open source',
                        companies: {
                            Langfuse: true,
                            Helicone: false,
                            DataDog: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'SQL access',
                        companies: {
                            Langfuse: false,
                            Helicone: false,
                            DataDog: false,
                            PostHog: true,
                        },
                    },
                ],
            },
            pairsWith: [
                {
                    slug: 'product-analytics',
                    description: 'Correlate AI usage with user behavior and business metrics',
                },
                {
                    slug: 'dashboards',
                    description: 'Build custom dashboards combining LLM and product metrics',
                },
                {
                    slug: 'session-replay',
                    description: 'Watch how users interact with AI features in real sessions',
                },
                {
                    slug: 'feature-flags',
                    description: 'Roll out AI features gradually and test different models',
                },
            ],
            worksWith: ['product_analytics', 'dashboards', 'session_replay', 'feature_flags'],
        },
        {
            name: 'Custom dashboards',
            Icon: IconDashboard,
            description: 'Track all your most important product and performance metrics in one place.',
            handle: 'dashboards',
            color: 'blue',
            colorSecondary: 'sky-blue',
            category: 'analytics',
            slug: 'dashboards',
            seo: {
                title: 'Dashboards - PostHog',
                description:
                    'Track all your most important product and performance metrics. Create custom dashboards or use templates for website analytics, product health, and more.',
            },
            overview: {
                title: 'Track all your metrics in one place',
                description:
                    'Create custom dashboards to monitor product health, website traffic, user behavior, and business metrics. Start from templates or build your own.',
                textColor: 'text-white',
                layout: 'columns',
            },
            screenshots: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/dashboard_light_61b3bab3b6.png',
                    alt: 'PostHog dashboard example',
                    classes: '',
                },
            ],
            hog: {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/hogs/product-analytics-hog.png',
                alt: 'Hedgehog monitoring dashboards',
                classes: 'absolute bottom-0 right-4 max-w-lg',
            },
            customers: {
                // ycombinator: {
                //     headline: 'monitors startup metrics across their portfolio',
                //     description: 'We use dashboards to track product health metrics across different cohorts and time periods.',
                // },
                // hasura: {
                //     headline: 'tracks product adoption with custom dashboards',
                //     description: 'Dashboards help us monitor feature usage, retention, and engagement all in one place.',
                // },
                // contra: {
                //     headline: 'combines analytics with real business data',
                //     description: 'We connect Stripe data to see revenue alongside product metrics on the same dashboard.',
                // },
                // assemblyai: {
                //     headline: 'replaced multiple tools with unified dashboards',
                //     description: 'PostHog dashboards give us everything we had in separate tools, all in one place.',
                // },
            },
            features: [
                {
                    title: 'Dashboard templates',
                    headline: 'Start with pre-built templates for common use cases',
                    description:
                        'Choose from templates for website analytics, product health, growth metrics, and more. Customize them to fit your needs.',
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/dashboard_light_61b3bab3b6.png',
                            alt: 'Dashboard templates',
                        },
                    ],
                    features: [
                        {
                            title: 'Website analytics',
                            description: 'Track traffic, visitors, pageviews, bounce rates, and SEO performance',
                        },
                        {
                            title: 'Product health',
                            description: 'Monitor sign-ups, active users, feature adoption, and retention',
                        },
                        {
                            title: 'Business metrics',
                            description: 'Track revenue with Stripe, sales with HubSpot, or support with Zendesk',
                        },
                        {
                            title: 'Growth dashboards',
                            description: 'AARRR metrics, cohort analysis, and funnel performance',
                        },
                        {
                            title: 'AI/LLM monitoring',
                            description: 'Track traces, costs, latency, and performance of AI applications',
                        },
                    ],
                },
                {
                    title: 'Flexible insights',
                    headline: 'Combine any PostHog insights in one view',
                    description:
                        'Add trends, funnels, retention charts, user paths, and more. Each insight updates in real-time.',
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/video/upload/dashboard_filters_light_b410a86c0b.mp4',
                            alt: 'Dashboard insights',
                        },
                    ],
                    features: [
                        {
                            title: 'All insight types',
                            description: 'Trends, funnels, retention, paths, lifecycle, stickiness, and SQL queries',
                        },
                        {
                            title: 'Drag-and-drop layout',
                            description: 'Arrange insights however you want with responsive grid system',
                        },
                        {
                            title: 'Text cards',
                            description: 'Add context with Markdown-formatted text and images',
                        },
                        {
                            title: 'Mobile responsive',
                            description: 'Separate layouts for desktop and mobile viewing',
                        },
                        {
                            title: 'Insight reuse',
                            description: 'Use the same insight on multiple dashboards without duplication',
                        },
                    ],
                },
                {
                    title: 'Dashboard filters',
                    headline: 'Apply filters across all insights at once',
                    description:
                        'Filter by date ranges, user properties, cohorts, feature flags, or any custom criteria.',
                    features: [
                        {
                            title: 'Date range overrides',
                            description: 'Force all insights to use the same time period',
                        },
                        {
                            title: 'Property filters',
                            description: 'Filter by event, person, or group properties across all insights',
                        },
                        {
                            title: 'Cohort filtering',
                            description: 'Show dashboard for specific user segments',
                        },
                        {
                            title: 'Feature flag filters',
                            description: 'Compare metrics between test and control groups',
                        },
                        {
                            title: 'Quick comparisons',
                            description: 'Duplicate dashboards with different filters to compare segments',
                        },
                    ],
                },
                {
                    title: 'Sharing and embedding',
                    headline: 'Share dashboards publicly or embed them anywhere',
                    description:
                        'Generate secure links, embed in your app, or display on TV screens with auto-refresh.',
                    features: [
                        {
                            title: 'Public sharing',
                            description: 'Create secure links to share dashboards without login',
                        },
                        {
                            title: 'Iframe embedding',
                            description: 'Embed dashboards in your website or internal tools',
                        },
                        {
                            title: 'Auto-refresh',
                            description: 'Set automatic refresh intervals for real-time monitoring',
                        },
                        {
                            title: 'Access controls',
                            description: 'Restrict edit access to specific team members',
                        },
                        {
                            title: 'TV mode',
                            description: 'Fullscreen mode perfect for office displays',
                        },
                    ],
                },
                {
                    title: 'Data integrations',
                    headline: 'Combine product data with business metrics',
                    description: 'Connect external data sources to see everything in one place.',
                    features: [
                        {
                            title: 'Data warehouse',
                            description: 'Query any data in your warehouse with SQL',
                        },
                        {
                            title: 'Stripe integration',
                            description: 'Show revenue alongside product metrics',
                        },
                        {
                            title: 'HubSpot integration',
                            description: 'Track sales and CRM data with usage',
                        },
                        {
                            title: 'Custom integrations',
                            description: 'Bring any data via API or data pipelines',
                        },
                        {
                            title: 'Real-time updates',
                            description: 'All data refreshes automatically as events come in',
                        },
                    ],
                },
            ],
            questions: [
                {
                    question: 'What are our key product health metrics?',
                },
                {
                    question: 'How is website traffic trending month-over-month?',
                },
                {
                    question: 'Which features are driving the most engagement?',
                },
                {
                    question: 'How does retention vary across customer segments?',
                },
                {
                    question: 'What is our revenue per active user?',
                },
                {
                    question: 'Which marketing channels drive the best users?',
                },
                {
                    question: 'How are our AI features performing?',
                },
                {
                    question: 'What is our weekly active user growth rate?',
                },
            ],
            comparison: {
                summary: {
                    them: [
                        {
                            title: 'Limited dashboard creation',
                            subtitle: 'Many tools limit dashboards based on pricing tier',
                        },
                        {
                            title: 'No integrated product analytics',
                            subtitle: 'Separate tools needed for web analytics vs product analytics',
                        },
                        {
                            title: 'Static snapshots',
                            subtitle: 'Many BI tools require manual refreshes or scheduled updates',
                        },
                    ],
                    us: [
                        {
                            title: 'Unlimited dashboards',
                            subtitle: 'Create as many dashboards as you need, no restrictions',
                        },
                        {
                            title: 'All analytics in one place',
                            subtitle: 'Combine web analytics, product analytics, and business data',
                        },
                        {
                            title: 'Real-time updates',
                            subtitle: 'Dashboards update automatically as new data arrives',
                        },
                        {
                            title: 'Self-serve templates',
                            subtitle: 'Start from pre-built templates or create custom dashboards',
                        },
                        {
                            title: 'Integrated with everything',
                            subtitle: 'Works with feature flags, experiments, and session replay',
                        },
                    ],
                },
                features: [
                    {
                        feature: 'Unlimited dashboards',
                        companies: {
                            Mixpanel: false,
                            Amplitude: false,
                            GoogleAnalytics: true,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Dashboard templates',
                        companies: {
                            Mixpanel: true,
                            Amplitude: true,
                            GoogleAnalytics: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Public sharing',
                        companies: {
                            Mixpanel: true,
                            Amplitude: true,
                            GoogleAnalytics: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Iframe embedding',
                        companies: {
                            Mixpanel: false,
                            Amplitude: false,
                            GoogleAnalytics: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Real-time updates',
                        companies: {
                            Mixpanel: false,
                            Amplitude: false,
                            GoogleAnalytics: true,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'SQL queries',
                        companies: {
                            Mixpanel: false,
                            Amplitude: false,
                            GoogleAnalytics: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Text annotations',
                        companies: {
                            Mixpanel: false,
                            Amplitude: false,
                            GoogleAnalytics: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Auto-refresh',
                        companies: {
                            Mixpanel: false,
                            Amplitude: false,
                            GoogleAnalytics: true,
                            PostHog: true,
                        },
                    },
                ],
            },
            pairsWith: [
                {
                    slug: 'product-analytics',
                    description: 'Add any product analytics insight to your dashboards',
                },
                {
                    slug: 'web-analytics',
                    description: 'Track website metrics alongside product data',
                },
                {
                    slug: 'data-warehouse',
                    description: 'Query external data sources and add to dashboards',
                },
                {
                    slug: 'notebooks',
                    description: 'Do deeper analysis and link findings to dashboards',
                },
            ],
            worksWith: ['product_analytics', 'web_analytics', 'data_warehouse', 'session_replay'],
        },
        {
            name: 'README: Data warehouse / CDP / ETL.md',
            // Icon: IconDatabase,
            parentIcon: 'documentCanvas',
            description: 'CDP manifesto',
            handle: 'customer-data-infrastructure',
            type: 'cdp_manifesto',
            color: 'blue',
            colorSecondary: 'lilac',
            category: 'data',
            slug: 'customer-data-infrastructure',
        },
        {
            name: 'AI agents.md',
            // Icon: IconMagicWand,
            parentIcon: 'doc',
            description: 'AI suite',
            handle: 'ai',
            color: 'blue',
            colorSecondary: 'lilac',
            category: 'ai',
            slug: 'ai',
            seo: {
                title: 'AI @ PostHog',
                description: 'Your AI-powered product agents',
            },
            overview: {
                title: 'Your AI product analyst and assistant',
                description:
                    'Max is an AI-powered product analyst that lives in PostHog. Research answers to product questions by querying data, get things done quickly in the PostHog UI, and learn all about PostHog features.',
                textColor: 'text-white',
                layout: 'columns',
            },
        },
        {
            name: 'Trends',
            Icon: IconGraph,
            description: 'Graphs & trends',
            handle: 'trends',
            color: 'blue',
            colorSecondary: 'lilac',
            category: 'dataviz',
            slug: 'trends',
        },
        {
            name: 'Funnels',
            Icon: IconFunnels,
            description: 'Funnels',
            handle: 'funnels',
            color: 'blue',
            colorSecondary: 'lilac',
            category: 'dataviz',
            slug: 'funnels',
        },
        {
            name: 'BI',
            Icon: IconMagicWand,
            description: 'Business intelligence',
            handle: 'bi',
            color: 'blue',
            colorSecondary: 'lilac',
            category: 'dataviz',
            slug: 'bi',
            status: 'beta',
            seo: {
                title: 'BI @ PostHog',
                description: 'Business intelligence built on PostHog',
            },
            overview: {
                title: 'Business intelligence',
                description:
                    'Max is an AI-powered product analyst that lives in PostHog. Research answers to product questions by querying data, get things done quickly in the PostHog UI, and learn all about PostHog features.',
                textColor: 'text-white',
                layout: 'columns',
            },
        },
        {
            name: 'Raquel',
            parentIcon: 'aiRaquel',
            // Icon: IconMagicWand,
            description: 'Your AI-powered product analyst',
            handle: 'raquel_ai',
            color: 'red',
            colorSecondary: 'lilac',
            category: 'ai',
            slug: 'raquel',
            status: 'beta',
            seo: {
                title: 'Raquel - PostHog',
                description: 'Your AI-powered data analyst',
            },
            overview: {
                title: 'Your AI data analyst',
                description:
                    'Raquel researches complex data problems, summarizes session recordings, and finds insights that would have been impossible to find manually.',
            },
            hog: {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/ai_raquel_c56887c5b7.png',
                alt: "Hi, I'm Raquel!",
                classes: 'max-w-[407px]',
            },
            features: [
                {
                    title: 'Raquel researches complex data problems',
                    headline: 'researches complex data problems',
                    description:
                        'Gathering context from dozens of insights is time consuming. Raquel can do it for you.',
                    features: [
                        {
                            icon: IconBolt,
                            title: 'Deep research',
                            items: [
                                'Raquel creates detailed analysis for your product questions by creating as many insights as needed to uncover answers.',
                            ],
                        },
                        {
                            icon: IconBrain,
                            title: 'Summarizes session recordings',
                            items: [
                                'Each user session is a trove of knowledge – but the more recordings and events there are, the harder it is to go through them manually. Raquel analyzes batches of sessions for you, delivering signal on a silver platter for you.',
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: 'Annika',
            parentIcon: 'aiAnnika',
            // Icon: IconMagicWand,
            description: 'Your AI-powered product analyst and product manager',
            handle: 'annika',
            color: 'green',
            colorSecondary: 'lilac',
            category: 'ai',
            slug: 'annika',
            status: 'WIP',
            seo: {
                title: 'Annika - PostHog',
                description: 'Your AI-powered product analyst and product manager',
            },
            overview: {
                title: 'Annika',
                description: 'Annika.',
                textColor: 'text-white',
            },
        },
        {
            name: 'Marius',
            parentIcon: 'aiMarius',
            // Icon: IconMagicWand,
            description: 'Your AI-powered product analyst and product manager',
            handle: 'marius',
            color: 'blue',
            colorSecondary: 'lilac',
            category: 'ai',
            slug: 'marius',
            status: 'WIP',
            seo: {
                title: 'Marius - PostHog',
                description: 'Your AI-powered product analyst and product manager',
            },
            overview: {
                title: 'Marius',
                description: 'Marius.',
                textColor: 'text-white',
            },
        },
        {
            name: 'User activity',
            Icon: IconClockRewind,
            description: 'See what users are doing in your product.',
            handle: 'activity',
            color: 'yellow',
            colorSecondary: 'yellow-2',
            category: 'product_os',
            // worksWith: ['product_analytics', 'session_replay', 'surveys'],
            slug: 'activity',
        },
        {
            name: 'Toolbar',
            Icon: IconToolbar,
            description: 'Interact with PostHog directly on your site.',
            handle: 'toolbar',
            color: 'salmon',
            colorSecondary: 'red',
            category: 'product_os',
            slug: 'toolbar',
            seo: {
                title: 'Toolbar - PostHog',
                description:
                    '"Inspect Element" for PostHog. Create actions, visualize heatmaps, override feature flags, and more directly on your website.',
            },
            overview: {
                title: 'Like "Inspect Element" for PostHog',
                description:
                    'The toolbar appears as an overlay on your product or website. With it, you can interact with elements to create actions, visualize heatmaps, override feature flags, and more.',
                textColor: 'text-white',
                layout: 'columns',
            },
            screenshots: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/video/upload/posthog.com/contents/images/tutorials/toolbar/setup-toolbar-light-mode.mp4',
                    alt: 'PostHog toolbar setup',
                    classes: '',
                },
            ],
            hog: {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/hogs/product-analytics-hog.png',
                alt: 'Toolbar hedgehog',
                classes: 'absolute bottom-0 right-4 max-w-lg',
            },
            customers: {
                // ycombinator: {
                //     headline: 'creates actions without code',
                //     description: 'The toolbar lets us click on elements to create tracking actions instantly, no developer needed.',
                // },
                // hasura: {
                //     headline: 'tests feature flags live',
                //     description: 'We override feature flags in the toolbar to see how changes affect our site before rolling out.',
                // },
                // contra: {
                //     headline: 'visualizes user behavior',
                //     description: 'Heatmaps in the toolbar show us exactly where users click and how they interact with our UI.',
                // },
                // assemblyai: {
                //     headline: 'debugs tracking issues',
                //     description: 'The toolbar helps us verify that actions are firing correctly by highlighting tracked elements.',
                // },
            },
            features: [
                {
                    title: 'Point-and-click action creation',
                    headline: 'Create tracking without touching code',
                    description:
                        "Click the inspect button, select any element on your page, and create an action. It's that simple.",
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/video/upload/posthog.com/contents/images/products/product-analytics/toolbar-create-new-action-light-mode.mp4',
                            alt: 'Creating actions with toolbar',
                        },
                    ],
                    features: [
                        {
                            title: 'Visual element selection',
                            description: 'Click on any element to track it - buttons, links, forms, anything',
                        },
                        {
                            title: 'Advanced selectors',
                            description: 'Edit CSS selectors, use IDs, classes, or data attributes',
                        },
                        {
                            title: 'Multiple elements',
                            description: 'Create OR conditions by selecting multiple elements for one action',
                        },
                        {
                            title: 'URL filtering',
                            description: 'Restrict actions to specific pages or URL patterns',
                        },
                        {
                            title: 'View existing actions',
                            description: 'See all tracked elements highlighted on your page',
                        },
                    ],
                },
                {
                    title: 'Feature flag overrides',
                    headline: 'Test your flags before release',
                    description:
                        'Override any feature flag value in your browser to test how your site behaves with different configurations.',
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/video/upload/posthog.com/contents/images/products/product-analytics/toolbar-feature-flags-light-mode.mp4',
                            alt: 'Feature flag overrides',
                        },
                    ],
                    features: [
                        {
                            title: 'Instant overrides',
                            description: 'Toggle flags on/off without changing code or config',
                        },
                        {
                            title: 'Multivariate testing',
                            description: 'Test different variant values for percentage rollouts',
                        },
                        {
                            title: 'Browser-only changes',
                            description: 'Changes only affect your browser, not other users',
                        },
                        {
                            title: 'Payload preview',
                            description: 'See the exact payload each flag returns',
                        },
                        {
                            title: 'Search and filter',
                            description: 'Quickly find flags by name or key',
                        },
                    ],
                },
                {
                    title: 'Heatmap visualization',
                    headline: 'See user behavior overlaid on your site',
                    description:
                        'Visualize clicks, scrolls, and rage clicks directly on your pages. No setup required.',
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/toolbar/posthog-heatmap-example.png',
                            alt: 'Heatmap visualization',
                        },
                    ],
                    features: [
                        {
                            title: 'Click heatmaps',
                            description: 'See where users click most with visual overlays',
                        },
                        {
                            title: 'Scroll depth',
                            description: 'Understand how far users scroll on each page',
                        },
                        {
                            title: 'Rage click detection',
                            description: 'Identify frustration points where users click repeatedly',
                        },
                        {
                            title: 'Element counts',
                            description: 'See exact click counts for every element',
                        },
                        {
                            title: 'Create from heatmaps',
                            description: 'Turn any clicked element into a tracked action',
                        },
                    ],
                },
            ],
            answers: [
                {
                    q: 'Do my users see the toolbar?',
                    a: 'No. The toolbar is only visible to authenticated PostHog users who have explicitly launched it. Your users will never see it.',
                },
                {
                    q: 'Does the toolbar work on all sites?',
                    a: "The toolbar works on any site with the PostHog JavaScript SDK installed. It's not available for mobile apps or server-side implementations.",
                },
                {
                    q: 'Can I use the toolbar in production?',
                    a: "Yes! The toolbar is designed to work safely in production. It only loads for authenticated users and doesn't affect your site's performance.",
                },
                {
                    q: 'What if my site has a CSP policy?',
                    a: 'You may need to add PostHog domains to your Content Security Policy. The toolbar requires the ability to load scripts from app.posthog.com.',
                },
            ],
            comparison: {
                comparison_companies: {
                    'Google Tag Manager': true,
                    FullStory: 'Inspector',
                    Heap: 'Visual Labeling',
                    Pendo: 'Visual Design Studio',
                },
                comparison_rows: [
                    {
                        feature: 'No-code action creation',
                        companies: {
                            'Google Tag Manager': true,
                            FullStory: true,
                            Heap: true,
                            Pendo: true,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Feature flag testing',
                        companies: {
                            'Google Tag Manager': false,
                            FullStory: false,
                            Heap: false,
                            Pendo: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Heatmap overlay',
                        companies: {
                            'Google Tag Manager': false,
                            FullStory: false,
                            Heap: false,
                            Pendo: true,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'CSS selector editing',
                        companies: {
                            'Google Tag Manager': true,
                            FullStory: true,
                            Heap: true,
                            Pendo: true,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Works in production',
                        companies: {
                            'Google Tag Manager': true,
                            FullStory: true,
                            Heap: true,
                            Pendo: true,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Free to use',
                        companies: {
                            'Google Tag Manager': true,
                            FullStory: false,
                            Heap: false,
                            Pendo: false,
                            PostHog: true,
                        },
                    },
                ],
            },
            pairsWith: [
                {
                    slug: 'product-analytics',
                    description: 'Create actions that power your analytics insights',
                },
                {
                    slug: 'heatmaps',
                    description: 'Visualize user behavior directly on your site',
                },
                {
                    slug: 'feature-flags',
                    description: 'Test feature flag variations before rolling out',
                },
                {
                    slug: 'session-replay',
                    description: 'Jump from toolbar insights to watch actual user sessions',
                },
            ],
            worksWith: ['product_analytics', 'heatmaps', 'feature_flags', 'session_replay'],
        },
        {
            name: 'Early Access Features',
            Icon: IconRocket,
            description: 'Let users opt into betas and register interest in upcoming features',
            handle: 'early_access',
            color: 'orange',
            colorSecondary: 'orange-2',
            category: 'product_engineering',
            slug: 'early-access-features',
            seo: {
                title: 'Early access feature management - PostHog',
                description:
                    'Run beta programs without custom code. Let users opt into features, create waitlists, and manage feature lifecycle from concept to GA.',
            },
            overview: {
                title: 'Beta programs without the hassle',
                description:
                    'Let users opt into betas, register interest in concepts, and control their product experience. No custom beta management system needed.',
                textColor: 'text-white',
                layout: 'columns',
            },
            screenshots: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/features/feature-flags/early-access-feature-demo.png',
                    alt: 'Early access features modal',
                    classes: '',
                },
            ],
            hog: {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/hogs/product-analytics-hog.png',
                alt: 'Hedgehog in beta',
                classes: 'absolute bottom-0 right-4 max-w-lg',
            },
            customers: {
                // ycombinator: {
                //     headline: 'runs community beta programs',
                //     description: 'Early access features let our community test new features and provide feedback before launch.',
                // },
                // hasura: {
                //     headline: 'validates features with power users',
                //     description: 'We use early access to test enterprise features with select customers before GA.',
                // },
                // contra: {
                //     headline: 'builds hype with waitlists',
                //     description: 'Coming soon features generate excitement and help us prioritize based on interest.',
                // },
                // assemblyai: {
                //     headline: 'reduced support tickets by 50%',
                //     description: 'Users can opt into experimental features knowing they\'re in beta, setting expectations.',
                // },
            },
            features: [
                {
                    title: 'Feature lifecycle stages',
                    headline: 'Manage features from concept to GA',
                    description:
                        'Track features through their entire lifecycle with built-in stages and automatic feature flag management.',
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/features/feature-flags/create-new-feature-flag-light-mode.png',
                            alt: 'Feature lifecycle stages',
                        },
                    ],
                    features: [
                        {
                            title: 'Concept stage',
                            description: 'Coming soon features where users can register interest',
                        },
                        {
                            title: 'Alpha stage',
                            description: 'Limited testing with select users or internal teams',
                        },
                        {
                            title: 'Beta stage',
                            description: 'Public opt-in testing with automatic feature flags',
                        },
                        {
                            title: 'General availability',
                            description: 'Full release with opt-in history preserved',
                        },
                        {
                            title: 'Automatic flag creation',
                            description: 'Feature flags created and linked automatically',
                        },
                    ],
                },
                {
                    title: 'User opt-in experience',
                    headline: 'Beautiful opt-in UI out of the box',
                    description:
                        'Pre-built site app or custom implementation for users to discover and control their beta features.',
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/features/feature-flags/early-access-feature-demo.png',
                            alt: 'User opt-in interface',
                        },
                    ],
                    features: [
                        {
                            title: 'Pre-built modal',
                            description: 'Ready-to-use UI with zero frontend work required',
                        },
                        {
                            title: 'Preview & coming soon tabs',
                            description: 'Separate sections for available and upcoming features',
                        },
                        {
                            title: 'Feature descriptions',
                            description: 'Include documentation links and detailed explanations',
                        },
                        {
                            title: 'Instant opt-in/out',
                            description: 'Users control their experience with one click',
                        },
                        {
                            title: 'Custom integration',
                            description: 'Full API for building your own opt-in experience',
                        },
                    ],
                },
                {
                    title: 'Wait list & interest tracking',
                    headline: 'Build hype for upcoming features',
                    description:
                        'Let users register interest in concepts to validate ideas and prioritize development.',
                    features: [
                        {
                            title: 'Interest registration',
                            description: 'Users can sign up for features still in development',
                        },
                        {
                            title: 'Prioritization data',
                            description: 'See which concepts have the most interest',
                        },
                        {
                            title: 'User segments',
                            description: 'Understand which user types want which features',
                        },
                        {
                            title: 'Automatic notifications',
                            description: 'Alert interested users when features move to beta',
                        },
                        {
                            title: 'Conversion tracking',
                            description: 'See how many interested users actually opt in',
                        },
                    ],
                },
                {
                    title: 'Beta management',
                    headline: 'Control who gets access and when',
                    description: 'Manage beta access with overriding conditions and manual controls.',
                    features: [
                        {
                            title: 'Override conditions',
                            description: 'User opt-ins override any feature flag release conditions',
                        },
                        {
                            title: 'Manual management',
                            description: 'Add or remove specific users from betas in PostHog',
                        },
                        {
                            title: 'Cohort integration',
                            description: 'See beta users as a cohort for analysis',
                        },
                        {
                            title: 'Usage tracking',
                            description: 'Monitor how beta users interact with features',
                        },
                        {
                            title: 'Feedback collection',
                            description: 'Combine with surveys to gather beta feedback',
                        },
                    ],
                },
                {
                    title: 'Developer experience',
                    headline: 'Simple implementation, powerful results',
                    description: 'JavaScript SDK with easy methods for both pre-built and custom implementations.',
                    features: [
                        {
                            title: 'One-line setup',
                            description: 'Enable site app with just opt_in_site_apps: true',
                        },
                        {
                            title: 'Custom API',
                            description: 'getEarlyAccessFeatures and updateEnrollment methods',
                        },
                        {
                            title: 'React hooks',
                            description: 'useActiveFeatureFlags for reactive UI updates',
                        },
                        {
                            title: 'Stage filtering',
                            description: 'Fetch only the feature stages you need',
                        },
                        {
                            title: 'Cache control',
                            description: 'Force reload for real-time updates when needed',
                        },
                    ],
                },
            ],
            questions: [
                {
                    question: 'How do I run a beta program for new features?',
                },
                {
                    question: 'Can users opt themselves into experimental features?',
                },
                {
                    question: 'How do I build a waitlist for upcoming features?',
                },
                {
                    question: 'Which users are interested in which features?',
                },
                {
                    question: 'How many beta users actually use the feature?',
                },
                {
                    question: 'Can I control who gets access to alpha features?',
                },
                {
                    question: 'How do I collect feedback from beta users?',
                },
                {
                    question: "Can users opt out of features they don't like?",
                },
            ],
            comparison: {
                summary: {
                    them: [
                        {
                            title: 'Build custom beta management',
                            subtitle: 'Most companies build their own opt-in systems',
                        },
                        {
                            title: 'Manual access lists',
                            subtitle: 'Maintain spreadsheets of who has access to what',
                        },
                        {
                            title: 'No waitlist functionality',
                            subtitle: "Can't gauge interest in upcoming features",
                        },
                    ],
                    us: [
                        {
                            title: 'Complete beta platform',
                            subtitle: 'Everything you need for beta programs out of the box',
                        },
                        {
                            title: 'User-controlled access',
                            subtitle: 'Let users opt in and out of features themselves',
                        },
                        {
                            title: 'Built-in waitlists',
                            subtitle: "Register interest in concepts before they're built",
                        },
                        {
                            title: 'Automatic feature flags',
                            subtitle: 'No manual flag management for beta features',
                        },
                        {
                            title: 'Usage analytics included',
                            subtitle: 'See how beta users actually use features',
                        },
                    ],
                },
                features: [
                    {
                        feature: 'Self-serve opt-in',
                        companies: {
                            LaunchDarkly: false,
                            Optimizely: false,
                            Custom: true,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Waitlist management',
                        companies: {
                            LaunchDarkly: false,
                            Optimizely: false,
                            Custom: true,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Pre-built UI',
                        companies: {
                            LaunchDarkly: false,
                            Optimizely: false,
                            Custom: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Feature lifecycle',
                        companies: {
                            LaunchDarkly: false,
                            Optimizely: false,
                            Custom: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Usage analytics',
                        companies: {
                            LaunchDarkly: false,
                            Optimizely: false,
                            Custom: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Override conditions',
                        companies: {
                            LaunchDarkly: false,
                            Optimizely: false,
                            Custom: true,
                            PostHog: true,
                        },
                    },
                ],
            },
            pairsWith: [
                {
                    slug: 'feature-flags',
                    description: 'Automatic feature flag creation and management for beta features',
                },
                {
                    slug: 'surveys',
                    description: 'Collect feedback from beta users about their experience',
                },
                {
                    slug: 'product-analytics',
                    description: 'Track how beta users interact with new features',
                },
                {
                    slug: 'session-replay',
                    description: 'Watch how beta users actually use experimental features',
                },
            ],
            worksWith: ['feature_flags', 'surveys', 'product_analytics', 'session_replay'],
        },
        {
            name: 'API',
            Icon: IconTerminal,
            description: 'Powerful APIs and SDKs to build analytics into your product',
            handle: 'api',
            color: 'teal',
            colorSecondary: 'sky-blue',
            category: 'product_os',
            slug: 'api',
            seo: {
                title: 'API - PostHog',
                description:
                    'Capture events, query data, manage feature flags, and more. 14+ SDKs, no rate limits on event capture, and comprehensive REST APIs.',
            },
        },
        {
            name: 'Notebooks',
            Icon: IconNotebook,
            description: 'Combine analytics, replays, and notes in collaborative docs',
            handle: 'notebooks',
            color: 'orange',
            colorSecondary: 'yellow',
            category: 'product_os',
            slug: 'notebooks',
            seo: {
                title: 'Notebooks - PostHog',
                description:
                    'Collaborative analytics notebooks. Combine insights, replays, feature flags, and notes in a single document for ad-hoc analysis and documentation.',
            },
            overview: {
                title: 'Your ever-present place to collect and explore data',
                description:
                    'Notebooks enable you to combine the tools of PostHog into a single space. Rather than jumping between dashboards, insights, replays, and more, your chain of analysis exists on a single page.',
                textColor: 'text-white',
                layout: 'columns',
            },
            screenshots: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/announcing-notebooks/notebooks.jpg',
                    alt: 'PostHog notebooks interface',
                    classes: '',
                },
            ],
            hog: {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/hogs/product-analytics-hog.png',
                alt: 'Note-taking hedgehog',
                classes: 'absolute bottom-0 right-4 max-w-lg',
            },
            customers: {
                // ycombinator: {
                //     headline: 'creates shareable bug reports',
                //     description: 'Drag and drop session replays into a scratchpad and watch them as normal, or add timestamped comments to break things down.',
                // },
                // hasura: {
                //     headline: 'runs engineering sprints',
                //     description: 'We\'ve created notebooks for running engineering sprints, tracking marketing activities, and monitoring feature adoption.',
                // },
                // contra: {
                //     headline: 'researches new ideas seamlessly',
                //     description: 'Collect insights and add them to your proposal seamlessly, alongside survey results or cohorts.',
                // },
                // assemblyai: {
                //     headline: 'plans feature launches',
                //     description: 'Embed the feature flags, events, persons, or cohorts you\'ll need to deploy changes and track success.',
                // },
            },
            features: [
                {
                    title: 'All of PostHog in one place',
                    headline: 'Drag and drop almost anything from PostHog',
                    description:
                        'Add insights, replays, feature flags, surveys, and more. Your entire analysis workflow in a single document.',
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/video/upload/posthog.com/contents/images/docs/notebooks/drag-light-mode.mp4',
                            alt: 'Drag and drop into notebooks',
                        },
                    ],
                    features: [
                        {
                            title: 'All insight types',
                            description: 'Trends, funnels, retention, paths, SQL - fully customizable',
                        },
                        {
                            title: 'Session replays',
                            description: 'Embed replays with comments at specific timestamps',
                        },
                        {
                            title: 'Feature flags & surveys',
                            description: 'Show flag status, rollout conditions, and survey results',
                        },
                        {
                            title: 'Events & persons',
                            description: 'Include raw data, user profiles, and cohort lists',
                        },
                        {
                            title: 'Rich text & images',
                            description: 'Add context with markdown, LaTeX, images, and GIFs',
                        },
                    ],
                },
                {
                    title: 'Collaborative analysis',
                    headline: 'Work together on investigations',
                    description: 'Share notebooks with your team, leave comments, and build analysis together.',
                    features: [
                        {
                            title: 'Real-time sharing',
                            description: 'Team members can view and edit your notebooks instantly',
                        },
                        {
                            title: 'Comments on replays',
                            description: 'Add timestamped comments to session recordings',
                        },
                        {
                            title: 'Canvas mode',
                            description: 'Quick shareable links for temporary analysis',
                        },
                        {
                            title: 'Conflict detection',
                            description: 'Warns when multiple people edit the same notebook',
                        },
                        {
                            title: 'Access from anywhere',
                            description: 'Notebook popover accessible throughout PostHog',
                        },
                    ],
                },
                {
                    title: 'Flexible workflows',
                    headline: 'Adapt to how you work',
                    description:
                        'Use slash commands, drag and drop, or the plus menu. Rearrange content as your analysis evolves.',
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/video/upload/posthog.com/contents/images/docs/notebooks/slash-light-mode.mp4',
                            alt: 'Slash commands in notebooks',
                        },
                    ],
                    features: [
                        {
                            title: 'Slash commands',
                            description: 'Type / to quickly add any content type',
                        },
                        {
                            title: 'Drag to reorder',
                            description: 'Rearrange components as your story develops',
                        },
                        {
                            title: 'Popover scratchpad',
                            description: 'Quick access from anywhere for ad-hoc notes',
                        },
                        {
                            title: 'Templates coming soon',
                            description: 'Start from common analysis patterns',
                        },
                        {
                            title: 'Export options',
                            description: 'Share as link or export for presentations',
                        },
                    ],
                },
            ],
            answers: [
                {
                    q: 'How are notebooks different from dashboards?',
                    a: 'Dashboards are for metrics you check repeatedly. Notebooks are for ad-hoc analysis, investigations, and storytelling. Think of dashboards as your monitoring and notebooks as your research lab.',
                },
                {
                    q: 'Can I use notebooks for documentation?',
                    a: 'Yes! Many teams use notebooks for feature documentation, onboarding guides, and analysis playbooks. The ability to embed live data makes them perfect for living documentation.',
                },
                {
                    q: 'Do notebooks update in real-time?',
                    a: "Yes, all embedded insights and data update automatically. When you open a notebook, you'll see the latest data for all included components.",
                },
                {
                    q: 'Can I share notebooks externally?',
                    a: 'Currently notebooks are only shareable within your organization. External sharing is on our roadmap - you can request it in the notebook sharing menu.',
                },
            ],
            comparison: {
                comparison_companies: {
                    Notion: 'Analytics',
                    Jupyter: true,
                    Observable: true,
                    Hex: true,
                },
                comparison_rows: [
                    {
                        feature: 'Product analytics',
                        companies: {
                            Notion: false,
                            Jupyter: false,
                            Observable: false,
                            Hex: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Session replays',
                        companies: {
                            Notion: false,
                            Jupyter: false,
                            Observable: false,
                            Hex: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Collaborative editing',
                        companies: {
                            Notion: true,
                            Jupyter: '$$$',
                            Observable: true,
                            Hex: true,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Drag and drop',
                        companies: {
                            Notion: true,
                            Jupyter: false,
                            Observable: false,
                            Hex: true,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Live data updates',
                        companies: {
                            Notion: false,
                            Jupyter: false,
                            Observable: true,
                            Hex: true,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Free to use',
                        companies: {
                            Notion: true,
                            Jupyter: true,
                            Observable: true,
                            Hex: false,
                            PostHog: true,
                        },
                    },
                ],
            },
            pairsWith: [
                {
                    slug: 'product-analytics',
                    description: 'Embed any insight type directly in your notebooks',
                },
                {
                    slug: 'session-replay',
                    description: 'Add replays with timestamped comments for bug reports',
                },
                {
                    slug: 'feature-flags',
                    description: 'Document feature releases with flag status and rollout data',
                },
                {
                    slug: 'surveys',
                    description: 'Include survey results and user feedback in your analysis',
                },
            ],
            worksWith: ['product_analytics', 'session_replay', 'feature_flags', 'surveys'],
        },
        {
            name: 'Heatmaps',
            Icon: IconClockRewind,
            description: 'See where users click, scroll, and move on your site',
            handle: 'heatmaps',
            color: 'red',
            colorSecondary: 'orange',
            category: 'dataviz',
            slug: 'heatmaps',
            seo: {
                title: 'Heatmaps - PostHog',
                description:
                    'Visual analytics showing where users click, scroll, and move. Includes clickmaps, scrollmaps, and rageclicks detection.',
            },
            overview: {
                title: "See your site through your users' eyes",
                description:
                    'Visualize user behavior with heatmaps, clickmaps, and scrollmaps. Discover where users click, how far they scroll, and where they get frustrated.',
                textColor: 'text-white',
                layout: 'columns',
            },
            screenshots: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/toolbar/posthog-heatmap-example.png',
                    alt: 'PostHog heatmaps interface',
                    classes: '',
                },
            ],
            hog: {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/hogs/product-analytics-hog.png',
                alt: 'Heat-detecting hedgehog',
                classes: 'absolute bottom-0 right-4 max-w-lg',
            },
            customers: {
                // ycombinator: {
                //     headline: 'optimizes landing pages with heatmaps',
                //     description: 'Heatmaps showed us users were missing our main CTA. We moved it up and doubled conversions.',
                // },
                // hasura: {
                //     headline: 'identifies UI confusion points',
                //     description: 'Rageclicks revealed where our docs were confusing. We fixed those areas and reduced support tickets.',
                // },
                // contra: {
                //     headline: 'improves form completion rates',
                //     description: 'Scrollmaps showed users weren\'t reaching our signup form. Shortening the page increased signups 40%.',
                // },
                // assemblyai: {
                //     headline: 'discovers hidden user patterns',
                //     description: 'Heatmaps revealed users were trying to click non-clickable elements. We made them interactive.',
                // },
            },
            features: [
                {
                    title: 'Visual behavior analytics',
                    headline: 'Three ways to see user behavior',
                    description:
                        'Different map types reveal different insights. Use them together for the complete picture.',
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1716592885/posthog.com/contents/docs/toolbar/settings.png',
                            alt: 'Heatmap types',
                        },
                    ],
                    features: [
                        {
                            title: 'Heatmaps',
                            description: 'See mouse movements, clicks, and interactions across your page',
                        },
                        {
                            title: 'Clickmaps',
                            description: 'Count clicks on every element with automatic element detection',
                        },
                        {
                            title: 'Scrollmaps',
                            description: 'Discover how far users scroll and where they stop reading',
                        },
                        {
                            title: 'Rageclick detection',
                            description: 'Spot frustration with automatic rageclick identification',
                        },
                        {
                            title: 'Dead click tracking',
                            description: 'Find where users expect interactivity but get nothing',
                        },
                    ],
                },
                {
                    title: 'Flexible configuration',
                    headline: 'Adapt heatmaps to your needs',
                    description: 'Configure heatmaps to match your analysis requirements and site design.',
                    features: [
                        {
                            title: 'Viewport tolerance',
                            description: 'Include data from different screen sizes for broader insights',
                        },
                        {
                            title: 'Fixed element detection',
                            description: 'Accurately track clicks on headers, modals, and sticky elements',
                        },
                        {
                            title: 'Color customization',
                            description: "Choose palettes that work with your site's design",
                        },
                        {
                            title: 'Unique vs total counts',
                            description: 'Toggle between counting events or unique users',
                        },
                        {
                            title: 'Wildcard URLs',
                            description: 'Combine data from similar pages like product listings',
                        },
                    ],
                },
                {
                    title: 'Actionable insights',
                    headline: 'Turn discoveries into improvements',
                    description: "Don't just observe - take action on what you learn from heatmaps.",
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/products/product-analytics/heatmaps-create-action.mp4',
                            alt: 'Create actions from heatmaps',
                        },
                    ],
                    features: [
                        {
                            title: 'Create actions instantly',
                            description: 'Click any element to create tracked actions for analytics',
                        },
                        {
                            title: 'Link to replays',
                            description: 'Watch sessions of users who clicked specific elements',
                        },
                        {
                            title: 'URL-based matching',
                            description: 'Track dynamic content by matching target URLs',
                        },
                        {
                            title: 'Toolbar integration',
                            description: 'Access heatmaps while browsing your live site',
                        },
                        {
                            title: 'No extra billing',
                            description: 'Heatmap data is captured with regular events - no extra cost',
                        },
                    ],
                },
            ],
            answers: [
                {
                    q: 'How do heatmaps work?',
                    a: 'PostHog captures interaction data (clicks, mouse movements, scroll depth) along with regular events. This data is then visualized as overlays on your site through the toolbar or in-app view.',
                },
                {
                    q: 'Do heatmaps slow down my site?',
                    a: 'No. Heatmap data is collected efficiently alongside regular analytics events. The visualization only happens when you view heatmaps, not for your users.',
                },
                {
                    q: 'Can I use heatmaps on dynamic content?',
                    a: 'Yes! Use wildcard URLs to combine data from similar pages, and URL-based matching for dynamic lists. This works great for product pages, user profiles, and search results.',
                },
                {
                    q: "What's the difference between heatmaps and clickmaps?",
                    a: 'Heatmaps show all interactions including mouse movements and can track clicks anywhere on the page. Clickmaps use autocapture to show exact click counts on specific elements.',
                },
            ],
            comparison: {
                comparison_companies: {
                    Hotjar: true,
                    FullStory: 'Heatmaps',
                    'Microsoft Clarity': true,
                    CrazyEgg: true,
                },
                comparison_rows: [
                    {
                        feature: 'Click heatmaps',
                        companies: {
                            Hotjar: true,
                            FullStory: true,
                            'Microsoft Clarity': true,
                            CrazyEgg: true,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Scroll heatmaps',
                        companies: {
                            Hotjar: true,
                            FullStory: true,
                            'Microsoft Clarity': true,
                            CrazyEgg: true,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Rageclick detection',
                        companies: {
                            Hotjar: true,
                            FullStory: true,
                            'Microsoft Clarity': true,
                            CrazyEgg: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Session replay integration',
                        companies: {
                            Hotjar: true,
                            FullStory: true,
                            'Microsoft Clarity': true,
                            CrazyEgg: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Create events from clicks',
                        companies: {
                            Hotjar: false,
                            FullStory: false,
                            'Microsoft Clarity': false,
                            CrazyEgg: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Free tier',
                        companies: {
                            Hotjar: 'Limited',
                            FullStory: false,
                            'Microsoft Clarity': true,
                            CrazyEgg: false,
                            PostHog: true,
                        },
                    },
                ],
            },
            pairsWith: [
                {
                    slug: 'session-replay',
                    description: 'Watch sessions of users who clicked specific elements',
                },
                {
                    slug: 'product-analytics',
                    description: 'Create actions from heatmap discoveries for deeper analysis',
                },
                {
                    slug: 'toolbar',
                    description: 'View heatmaps directly on your live site',
                },
                {
                    slug: 'web-analytics',
                    description: 'Combine with traffic data for complete visitor insights',
                },
            ],
            worksWith: ['session_replay', 'product_analytics', 'toolbar', 'web_analytics'],
        },
        {
            name: 'User activity',
            Icon: IconClock,
            description: 'Track user engagement patterns and identify churn risks',
            handle: 'activity',
            slug: 'activity',
            color: 'purple',
            colorSecondary: 'blue',
            category: 'analytics',
            seo: {
                title: 'User activity analytics - PostHog',
                description:
                    "Track user lifecycle states, understand engagement patterns, and prevent churn with PostHog's user activity insights.",
            },
            overview: {
                title: 'Understand user engagement patterns',
                description:
                    "Visualize new, returning, resurrecting, and dormant users to see what's really happening with your user growth.",
                textColor: 'text-white', // tw
            },
            screenshots: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/product-analytics/lifecycle-chart-light-mode.png',
                    alt: 'User activity lifecycle chart',
                    classes: '',
                },
            ],
            hog: {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1/posthog.com/src/components/Product/hogs/product-analytics-hog.png',
                alt: 'A hedgehog analyzing user patterns',
                classes: 'absolute bottom-0 right-4 max-w-lg',
            },
            customers: {
                // ycombinator: {
                //     headline: 'reduced churn by 25%',
                //     description: 'The lifecycle chart showed us users were churning after day 3. We fixed the onboarding.',
                // },
                // hasura: {
                //     headline: 'increased retention by 40%',
                //     description: 'Identifying resurrecting users helped us understand what brought people back.',
                // },
                // contra: {
                //     headline: 'doubled returning users',
                //     description: 'Lifecycle analysis revealed our weekly cadence matched user expectations perfectly.',
                // },
                // speakeasy: {
                //     headline: 'prevented 50% of dormant users',
                //     description: 'Early warning signs in the lifecycle chart let us re-engage users before they churned.',
                // },
            },
            features: [
                {
                    title: 'Lifecycle states',
                    headline: 'Track four key user states',
                    description: 'Understand user behavior through clear lifecycle categorization.',
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/product-analytics/lifecycle-chart-light-mode.png',
                            alt: 'Lifecycle chart showing user states',
                        },
                    ],
                    features: [
                        {
                            title: 'New users',
                            description: 'First-time users who performed the event during this period',
                        },
                        {
                            title: 'Returning users',
                            description: 'Active in both the current and previous interval',
                        },
                        {
                            title: 'Resurrecting users',
                            description: 'Previously inactive users who came back',
                        },
                        {
                            title: 'Dormant users',
                            description: 'Previously active users who stopped engaging',
                        },
                        {
                            title: 'Custom time intervals',
                            description: 'Group by hour, day, week, or month based on your product cadence',
                        },
                    ],
                },
                {
                    title: 'Session analytics',
                    headline: 'Deep dive into user sessions',
                    description: 'Analyze how users interact with your product during each visit.',
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1716849942/posthog.com/contents/images/docs/user-guides/sessions/entry-light.png',
                            alt: 'Session analytics breakdown',
                        },
                    ],
                    features: [
                        {
                            title: 'Session duration',
                            description: 'Track how long users spend in your product',
                        },
                        {
                            title: 'Entry and exit points',
                            description: 'See where users start and end their sessions',
                        },
                        {
                            title: 'Activity tracking',
                            description: 'Monitor events per session and engagement intensity',
                        },
                        {
                            title: 'Bounce rate analysis',
                            description: 'Identify single-pageview sessions automatically',
                        },
                        {
                            title: 'Cross-tab sessions',
                            description: 'Track users across multiple browser tabs and windows',
                        },
                    ],
                },
                {
                    title: 'Actionable insights',
                    headline: 'Turn patterns into action',
                    description: "Don't just observe user behavior - act on it to improve retention.",
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/product-analytics/detail-light-mode.png',
                            alt: 'Drill down into user cohorts',
                        },
                    ],
                    features: [
                        {
                            title: 'Cohort creation',
                            description: 'Create cohorts from any lifecycle segment for targeted analysis',
                        },
                        {
                            title: 'Individual user view',
                            description: 'Click through to see specific users in each state',
                        },
                        {
                            title: 'Session replay integration',
                            description: 'Watch replays of users in different lifecycle states',
                        },
                        {
                            title: 'Event filtering',
                            description: 'Define activity with any event or action in your product',
                        },
                        {
                            title: 'Property breakdowns',
                            description: 'Segment lifecycle states by user properties',
                        },
                    ],
                },
            ],
            answers: [
                {
                    q: 'What defines an active user?',
                    a: 'You define activity by selecting any event or action that represents meaningful engagement in your product. Common choices include pageviews, key feature usage, or any custom event you track.',
                },
                {
                    q: 'How do I choose the right time interval?',
                    a: "Match the interval to your product's natural usage frequency. B2B SaaS might use daily intervals, while consumer apps might use hourly. If you see too many resurrecting users, your interval might be too short.",
                },
                {
                    q: 'Can I track team or company activity?',
                    a: 'Yes! You can aggregate lifecycle data by groups (like companies or teams) instead of individual users if you have group analytics set up.',
                },
                {
                    q: 'How do I reduce dormant users?',
                    a: 'First, identify when users typically become dormant using the lifecycle chart. Then create cohorts of at-risk users and run targeted re-engagement campaigns or product improvements.',
                },
            ],
            comparison: {
                comparison_companies: {
                    Amplitude: 'Lifecycle',
                    Mixpanel: 'Retention',
                    'Google Analytics': false,
                    Heap: 'Limited',
                },
                comparison_rows: [
                    {
                        feature: 'Lifecycle visualization',
                        companies: {
                            Amplitude: true,
                            Mixpanel: true,
                            'Google Analytics': false,
                            Heap: true,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Custom activity definitions',
                        companies: {
                            Amplitude: true,
                            Mixpanel: true,
                            'Google Analytics': false,
                            Heap: true,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Session analytics',
                        companies: {
                            Amplitude: true,
                            Mixpanel: 'Limited',
                            'Google Analytics': true,
                            Heap: true,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Group-level lifecycle',
                        companies: {
                            Amplitude: true,
                            Mixpanel: false,
                            'Google Analytics': false,
                            Heap: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Drill-down to individuals',
                        companies: {
                            Amplitude: true,
                            Mixpanel: true,
                            'Google Analytics': false,
                            Heap: true,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Session replay integration',
                        companies: {
                            Amplitude: false,
                            Mixpanel: false,
                            'Google Analytics': false,
                            Heap: true,
                            PostHog: true,
                        },
                    },
                ],
            },
            pairsWith: [
                {
                    slug: 'session-replay',
                    description: 'Watch replays of users in different lifecycle states',
                },
                {
                    slug: 'product-analytics',
                    description: 'Combine with funnels and retention for complete user journey analysis',
                },
                {
                    slug: 'cohorts',
                    description: 'Create targeted user segments from lifecycle states',
                },
                {
                    slug: 'experiments',
                    description: 'Test changes to improve user retention and reduce churn',
                },
            ],
            worksWith: ['product_analytics', 'session_replay', 'cohorts', 'experiments'],
        },
        {
            name: 'Get data into PostHog',
            parentIcon: 'dataIn',
            // Icon: IconArrowUpRight,
            description: 'Get data into PostHog',
            handle: 'data_in',
            color: 'green',
            colorSecondary: 'lilac',
            category: 'data',
            slug: 'customer-data-infrastructure/sources',
        },
        {
            name: 'Transform data',
            parentIcon: 'dataBlender',
            // Icon: IconArrowUpRight,
            description: 'Transform data',
            handle: 'transformations',
            color: 'red',
            colorSecondary: 'lilac',
            category: 'data',
            slug: 'customer-data-infrastructure/transformations',
        },
        {
            name: 'Send data out of PostHog',
            parentIcon: 'dataOut',
            // Icon: IconArrowUpRight,
            description: 'Send data out of PostHog',
            handle: 'data_out',
            color: 'green',
            colorSecondary: 'lilac',
            category: 'data',
            slug: 'customer-data-infrastructure/destinations',
        },

        {
            name: 'SQL editor',
            // Icon: IconDatabase,
            parentIcon: 'SQL',
            handle: 'sql',
            color: 'blue',
            colorSecondary: 'lilac',
            category: 'cdi',
            slug: 'docs/sql',
        },
        ...products,
    ]

    const allProducts = extendedProducts.map((product) => ({
        ...product,
        sharesFreeTier: product.sharesFreeTier
            ? extendedProducts.find((extendedProduct) => extendedProduct.handle === product.sharesFreeTier)
            : undefined,
        worksWith: product.worksWith
            ? product.worksWith.map((handle) => extendedProducts.find((product) => product.handle === handle))
            : [],
    }))

    return handle ? allProducts.find((product) => product.handle === handle) : dedupe(allProducts)
}

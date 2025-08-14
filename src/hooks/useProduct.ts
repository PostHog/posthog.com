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
} from '@posthog/icons'
import useProducts from './useProducts'

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
            name: 'SQL editor',
            Icon: IconAsterisk,
            description: 'Query your entire data warehouse with HogQL',
            handle: 'sql',
            slug: 'sql',
            color: 'blue',
            colorSecondary: 'blue',
            category: 'data',
            seo: {
                title: 'SQL editor - PostHog',
                description:
                    'Query events, persons, and external data with SQL. Create custom insights, export data, and build complex analyses with HogQL.',
            },
            overview: {
                title: 'Full SQL access to all your data',
                description:
                    'Query events, persons, and external sources with SQL. Build custom insights, export data, and answer any question about your users.',
                textColor: 'text-white',
                layout: 'columns',
            },
            screenshots: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/features/hogql/sql-light.png',
                    alt: 'SQL editor interface',
                    classes: '',
                },
            ],
            hog: {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/hogs/product-analytics-hog.png',
                alt: 'Hedgehog writing SQL',
                classes: 'absolute bottom-0 right-4 max-w-lg',
            },
            customers: {
                // ycombinator: {
                //     headline: 'analyzes complex user journeys',
                //     description: 'SQL lets us answer questions that would be impossible with standard analytics tools.',
                // },
                // hasura: {
                //     headline: 'combines product and business data',
                //     description: 'We query PostHog events alongside Stripe data to understand revenue per feature.',
                // },
                // contra: {
                //     headline: 'exports custom reports daily',
                //     description: 'SQL queries power our automated reporting pipeline for stakeholders.',
                // },
                // assemblyai: {
                //     headline: 'debugs data quality issues',
                //     description: 'Direct SQL access helps us audit events and ensure data accuracy.',
                // },
            },
            features: [
                {
                    title: 'HogQL - SQL for PostHog',
                    headline: 'ClickHouse SQL with product analytics superpowers',
                    description:
                        'Our SQL dialect wraps ClickHouse with simplified property access, better null handling, and product-specific functions.',
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/features/hogql/expression-light.png',
                            alt: 'HogQL features',
                        },
                    ],
                    features: [
                        {
                            title: 'Simplified syntax',
                            description: 'Access properties with dot notation like properties.$browser',
                        },
                        {
                            title: 'Smart joins',
                            description: 'Automatic joins between events, persons, and groups',
                        },
                        {
                            title: 'Product functions',
                            description: 'Built-in functions for cohorts, feature flags, and more',
                        },
                        {
                            title: 'ClickHouse power',
                            description: 'Full access to ClickHouse functions and performance',
                        },
                        {
                            title: 'Time zone handling',
                            description: 'Automatic time zone conversion for your project',
                        },
                    ],
                },
                {
                    title: 'SQL insights',
                    headline: 'Custom analytics beyond standard charts',
                    description:
                        'Build any analysis with SELECT, JOIN, WHERE, GROUP BY and visualize results in multiple formats.',
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/features/hogql/sql-light.png',
                            alt: 'SQL insights',
                        },
                    ],
                    features: [
                        {
                            title: 'Complex queries',
                            description: 'Multi-step CTEs, window functions, and subqueries',
                        },
                        {
                            title: 'Multiple visualizations',
                            description: 'Tables, line charts, bar charts, and more',
                        },
                        {
                            title: 'Save & share',
                            description: 'Save queries as insights to add to dashboards',
                        },
                        {
                            title: 'Export results',
                            description: 'Download query results as CSV or JSON',
                        },
                        {
                            title: 'Query templates',
                            description: 'Start from examples or save your own templates',
                        },
                    ],
                },
                {
                    title: 'Data exploration',
                    headline: 'Browse and query all available tables',
                    description:
                        'Explore events, persons, sessions, and external data sources with schema browser and auto-complete.',
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/features/hogql/warehouse-light.png',
                            alt: 'Data exploration',
                        },
                    ],
                    features: [
                        {
                            title: 'Schema browser',
                            description: 'See all tables, columns, and data types',
                        },
                        {
                            title: 'Auto-complete',
                            description: 'IntelliSense for tables, columns, and functions',
                        },
                        {
                            title: 'Sample data',
                            description: 'Preview table contents before querying',
                        },
                        {
                            title: 'Query history',
                            description: 'Access and rerun previous queries',
                        },
                        {
                            title: 'Performance hints',
                            description: 'Optimization suggestions for slow queries',
                        },
                    ],
                },
                {
                    title: 'External data sources',
                    headline: 'Query PostHog alongside business data',
                    description: 'Join events with data from Stripe, HubSpot, databases, and more in a single query.',
                    features: [
                        {
                            title: 'Data warehouse',
                            description: 'Connect external sources like Stripe, HubSpot, and databases',
                        },
                        {
                            title: 'Unified queries',
                            description: 'JOIN PostHog events with external tables',
                        },
                        {
                            title: 'Custom views',
                            description: 'Create reusable views combining multiple sources',
                        },
                        {
                            title: 'Scheduled syncs',
                            description: 'Keep external data fresh with automatic updates',
                        },
                        {
                            title: 'S3 & BigQuery',
                            description: 'Query data directly from cloud storage',
                        },
                    ],
                },
                {
                    title: 'SQL API',
                    headline: 'Programmatic access for automation',
                    description: 'Query PostHog data from your applications, notebooks, or BI tools via API.',
                    features: [
                        {
                            title: 'REST API',
                            description: 'Simple HTTP endpoints for SQL queries',
                        },
                        {
                            title: 'Authentication',
                            description: 'Secure access with personal API keys',
                        },
                        {
                            title: 'Structured responses',
                            description: 'JSON results with types and metadata',
                        },
                        {
                            title: 'Python & JS SDKs',
                            description: 'Native libraries for common languages',
                        },
                        {
                            title: 'BI tool integration',
                            description: 'Connect Tableau, Looker, and other tools',
                        },
                    ],
                },
            ],
            questions: [
                {
                    question: 'How do I query for users who did X but not Y?',
                },
                {
                    question: "What's the average time between two specific events?",
                },
                {
                    question: 'Can I join PostHog data with my database?',
                },
                {
                    question: 'How do I export custom user segments?',
                },
                {
                    question: "What's the P95 response time by feature flag variant?",
                },
                {
                    question: 'Can I query session recordings metadata?',
                },
                {
                    question: 'How do I calculate custom business metrics?',
                },
                {
                    question: 'Can I automate reports with SQL queries?',
                },
            ],
            comparison: {
                summary: {
                    them: [
                        {
                            title: 'Limited to pre-built reports',
                            subtitle: "Most analytics tools don't offer SQL access",
                        },
                        {
                            title: 'Separate data warehouse needed',
                            subtitle: 'Export data to query it with SQL elsewhere',
                        },
                        {
                            title: 'No real-time queries',
                            subtitle: 'Work with stale exports or delayed syncs',
                        },
                    ],
                    us: [
                        {
                            title: 'Full SQL access included',
                            subtitle: 'Query any data directly in PostHog',
                        },
                        {
                            title: 'Real-time data',
                            subtitle: 'Query events as they arrive, no delays',
                        },
                        {
                            title: 'External data sources',
                            subtitle: 'Join PostHog with Stripe, databases, and more',
                        },
                        {
                            title: 'Save as insights',
                            subtitle: 'Turn SQL queries into dashboard widgets',
                        },
                        {
                            title: 'API access',
                            subtitle: 'Query programmatically for automation',
                        },
                    ],
                },
                features: [
                    {
                        feature: 'SQL access',
                        companies: {
                            Mixpanel: false,
                            Amplitude: false,
                            GoogleAnalytics: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'External data joins',
                        companies: {
                            Mixpanel: false,
                            Amplitude: false,
                            GoogleAnalytics: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Real-time queries',
                        companies: {
                            Mixpanel: false,
                            Amplitude: false,
                            GoogleAnalytics: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Query API',
                        companies: {
                            Mixpanel: false,
                            Amplitude: false,
                            GoogleAnalytics: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Custom visualizations',
                        companies: {
                            Mixpanel: false,
                            Amplitude: false,
                            GoogleAnalytics: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Query templates',
                        companies: {
                            Mixpanel: false,
                            Amplitude: false,
                            GoogleAnalytics: false,
                            PostHog: true,
                        },
                    },
                ],
            },
            pairsWith: [
                {
                    slug: 'data-warehouse',
                    description: 'Query external data sources alongside PostHog events',
                },
                {
                    slug: 'product-analytics',
                    description: 'Go beyond standard insights with custom SQL queries',
                },
                {
                    slug: 'dashboards',
                    description: 'Add SQL insights to any dashboard',
                },
                {
                    slug: 'notebooks',
                    description: 'Combine SQL queries with narrative analysis',
                },
            ],
            worksWith: ['data_warehouse', 'product_analytics', 'dashboards', 'notebooks'],
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
            name: 'Dashboards',
            Icon: IconDashboard,
            description: 'Track all your most important product and performance metrics in one place.',
            handle: 'dashboards',
            color: 'blue',
            colorSecondary: 'sky-blue',
            category: 'product_os',
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
            name: 'warehouse vs ETL vs CDP??.md',
            // Icon: IconDatabase,
            parentIcon: 'doc',
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
                    'Max builds insights, automates many manual tasks, and routes more complex tasks to other AI agents for specialized work.',
                layout: 'ai',
            },
            screenshots: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_05_30_at_09_57_49_2e30546e93.png',
                    alt: 'Max AI in the sidebar',
                    classes: 'absolute bottom-0 left-0 max-w-[525px] rounded-tr-md overflow-hidden shadow-2xl',
                },
            ],
            hog: {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/hogs/product-analytics-hog.png',
                alt: 'AI-powered hedgehog',
                classes: 'absolute bottom-0 right-4 max-w-lg',
            },
            customers: {
                // ycombinator: {
                //     headline: 'accelerates product decisions',
                //     description: 'Max helps us explore data in depth and generate PostHog visualizations instantly.',
                // },
                // hasura: {
                //     headline: 'saves hours on analysis',
                //     description: 'Instead of writing complex queries, we just ask Max and get insights immediately.',
                // },
                // contra: {
                //     headline: 'onboards new team members',
                //     description: 'Max answers questions from our docs, helping new team members get up to speed quickly.',
                // },
                // assemblyai: {
                //     headline: 'automates routine tasks',
                //     description: 'Max updates filters and creates insights for us, saving time on repetitive work.',
                // },
            },
            features: [
                {
                    title: 'Data analysis superpowers',
                    headline: 'Max understands your data',
                    description:
                        'Unlike generic AI agents, Max can explore your PostHog data, generate visualizations, and write complex HogQL queries.',
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/max_data_analysis_9f8e7d6c5a.png',
                            alt: 'Max analyzing data',
                        },
                    ],
                    features: [
                        {
                            title: 'Query your data',
                            description: 'Access events, persons, sessions, groups, actions, and cohorts',
                        },
                        {
                            title: 'Generate insights',
                            description: 'Create PostHog data visualizations and complex HogQL queries',
                        },
                        {
                            title: 'Smart summaries',
                            description: 'Get high-level numbers or detailed user lists with properties',
                        },
                        {
                            title: 'Data warehouse access',
                            description: 'Query your connected data warehouse schema',
                        },
                        {
                            title: 'Context-aware',
                            description: 'Understands your event and property definitions',
                        },
                    ],
                },
                {
                    title: 'UI automation',
                    headline: 'Get things done without clicking',
                    description:
                        'Max can interact with the PostHog UI for you - updating filters, editing insights, and navigating the product.',
                    features: [
                        {
                            title: 'Update filters',
                            description: 'Change date ranges, properties, and segments with natural language',
                        },
                        {
                            title: 'Edit insights',
                            description: 'Modify charts, funnels, and dashboards through conversation',
                        },
                        {
                            title: 'Navigate PostHog',
                            description: 'Jump to specific features or pages instantly',
                        },
                        {
                            title: 'Coming soon',
                            description: 'Create feature flags, experiments, and surveys',
                        },
                        {
                            title: 'Memory system',
                            description: 'Max remembers context from your chats for better assistance',
                        },
                    ],
                },
                {
                    title: 'Future capabilities',
                    headline: 'Max is getting smarter every day',
                    description:
                        "We're actively developing new features based on user feedback. Vote on our roadmap to influence what comes next.",
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/max_roadmap_8a9b7c6d5e.png',
                            alt: 'Max AI roadmap',
                        },
                    ],
                    features: [
                        {
                            title: 'Watch session replays',
                            description: 'Analyze user behavior from recordings',
                        },
                        {
                            title: 'Write Hog functions',
                            description: 'Generate code for real-time destinations',
                        },
                        {
                            title: 'Proactive insights',
                            description: 'Get alerted to important changes in your metrics',
                        },
                        {
                            title: 'Team collaboration',
                            description: 'Share Max conversations with your team',
                        },
                        {
                            title: 'API access',
                            description: 'Integrate Max into your own workflows',
                        },
                    ],
                },
            ],
            answers: [
                {
                    q: 'What can Max access in my project?',
                    a: 'Max can read events, persons, sessions, groups, actions, cohorts, event definitions, property definitions, and data warehouse schema. This enables comprehensive data analysis while maintaining security.',
                },
                {
                    q: 'Is my data shared with third parties?',
                    a: "We use OpenAI and Anthropic for Max's core functionality, Azure for semantic search, and Perplexity for product context (domain name only). All have data processing agreements in place.",
                },
                {
                    q: "How does Max's memory work?",
                    a: 'Max has project-specific memory to remember relevant information from your chats. You can explicitly ask Max to remember details and edit the memory in PostHog settings.',
                },
                {
                    q: 'Is Max included in my plan?',
                    a: 'Max is currently free during beta. Because it uses third-party LLM providers, first use requires org admin approval to ensure compliance with data policies.',
                },
            ],
            comparison: {
                comparison_companies: {
                    ChatGPT: true,
                    'GitHub Copilot': true,
                    'Mixpanel Spark': true,
                    'Amplitude Insights': true,
                },
                comparison_rows: [
                    {
                        feature: 'Product analytics context',
                        companies: {
                            ChatGPT: false,
                            'GitHub Copilot': false,
                            'Mixpanel Spark': true,
                            'Amplitude Insights': true,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Query your data',
                        companies: {
                            ChatGPT: false,
                            'GitHub Copilot': false,
                            'Mixpanel Spark': true,
                            'Amplitude Insights': true,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'UI automation',
                        companies: {
                            ChatGPT: false,
                            'GitHub Copilot': false,
                            'Mixpanel Spark': false,
                            'Amplitude Insights': false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Generate SQL queries',
                        companies: {
                            ChatGPT: true,
                            'GitHub Copilot': true,
                            'Mixpanel Spark': false,
                            'Amplitude Insights': false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Docs knowledge',
                        companies: {
                            ChatGPT: false,
                            'GitHub Copilot': true,
                            'Mixpanel Spark': true,
                            'Amplitude Insights': true,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Free during beta',
                        companies: {
                            ChatGPT: false,
                            'GitHub Copilot': false,
                            'Mixpanel Spark': false,
                            'Amplitude Insights': false,
                            PostHog: true,
                        },
                    },
                ],
            },
            pairsWith: [
                {
                    slug: 'product-analytics',
                    description: 'Max can query and visualize all your analytics data',
                },
                {
                    slug: 'data-warehouse',
                    description: "Access external data sources through Max's queries",
                },
                {
                    slug: 'sql',
                    description: 'Max generates complex HogQL queries for you',
                },
                {
                    slug: 'dashboards',
                    description: 'Create and modify dashboard insights through conversation',
                },
            ],
            worksWith: ['product_analytics', 'data_warehouse', 'sql', 'dashboards'],
        },
        {
            name: 'Raquel',
            parentIcon: 'ai',
            // Icon: IconMagicWand,
            description: 'Your AI-powered product analyst and product manager',
            handle: 'raquel',
            color: 'red',
            colorSecondary: 'lilac',
            category: 'ai',
            slug: 'raquel',
            status: 'beta',
            seo: {
                title: 'Raquel - PostHog',
                description: 'Your AI-powered product analyst and product manager',
            },
            overview: {
                title: 'Raquel',
                description: 'Raquel.',
                textColor: 'text-white',
            },
        },
        {
            name: 'Annika',
            Icon: IconMagicWand,
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
            Icon: IconMagicWand,
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
            name: 'Capture API',
            Icon: IconTerminal,
            description: 'Powerful APIs and SDKs to build analytics into your product',
            handle: 'capture_api',
            color: 'teal',
            colorSecondary: 'sky-blue',
            category: 'data',
            slug: 'capture-api',
            seo: {
                title: 'Capture API - PostHog',
                description:
                    'Capture events, query data, manage feature flags, and more. 14+ SDKs, no rate limits on event capture, and comprehensive REST APIs.',
            },
            overview: {
                title: "Build with PostHog's powerful APIs",
                description:
                    'Capture events, query analytics, manage feature flags, and integrate PostHog into your stack. With 14+ SDKs and no rate limits on event capture.',
                textColor: 'text-white',
                layout: 'columns',
            },
            screenshots: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/api_docs_f0cfafd4a0.png',
                    alt: 'PostHog API documentation',
                    classes: '',
                },
            ],
            hog: {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/hogs/product-analytics-hog.png',
                alt: 'API-powered hedgehog',
                classes: 'absolute bottom-0 right-4 max-w-lg',
            },
            customers: {
                // ycombinator: {
                //     headline: 'embeds analytics in their platform',
                //     description: 'PostHog\'s APIs let us show founders their metrics without building our own analytics.',
                // },
                // hasura: {
                //     headline: 'tracks backend events at scale',
                //     description: 'No rate limits mean we can send millions of events without worrying about quotas.',
                // },
                // contra: {
                //     headline: 'builds customer-facing dashboards',
                //     description: 'The query API powers our freelancer analytics dashboards with real-time data.',
                // },
                // assemblyai: {
                //     headline: 'automates feature flag rollouts',
                //     description: 'We use the API to programmatically manage feature flags based on usage patterns.',
                // },
            },
            features: [
                {
                    title: 'Event capture API',
                    headline: 'Send events from anywhere, no limits',
                    description:
                        'Capture events from your backend, frontend, mobile apps, or IoT devices. No rate limits, automatic retries, and batch support.',
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/api_capture_63a9c6a3a1.png',
                            alt: 'Event capture API',
                        },
                    ],
                    features: [
                        {
                            title: 'No rate limits',
                            description: 'Send as many events as you need without throttling or quotas',
                        },
                        {
                            title: 'Batch endpoint',
                            description: 'Send up to 1000 events in a single request for efficiency',
                        },
                        {
                            title: 'Backend attribution',
                            description: 'Associate server-side events with frontend sessions',
                        },
                        {
                            title: 'Automatic retries',
                            description: 'Built-in retry logic for failed requests',
                        },
                        {
                            title: '20MB payloads',
                            description: 'Send large payloads with complex properties',
                        },
                    ],
                },
                {
                    title: 'Query API',
                    headline: 'Get your data out programmatically',
                    description:
                        'Query events, persons, and insights using HogQL. Build custom integrations and embed analytics in your product.',
                    features: [
                        {
                            title: 'HogQL queries',
                            description: 'Full SQL access to your data with our ClickHouse wrapper',
                        },
                        {
                            title: 'Insight data',
                            description: 'Fetch results from saved insights and dashboards',
                        },
                        {
                            title: 'Person profiles',
                            description: 'Query and update user properties and cohorts',
                        },
                        {
                            title: 'Export automation',
                            description: 'Schedule exports and integrate with your data stack',
                        },
                        {
                            title: 'Aggregations',
                            description: 'Get pre-computed metrics without raw event access',
                        },
                    ],
                },
                {
                    title: '14+ SDKs',
                    headline: 'Native libraries for every platform',
                    description:
                        'Official SDKs for web, mobile, and backend. Plus community libraries for niche platforms.',
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/sdks_overview_f7d8e8d8e8.png',
                            alt: 'PostHog SDKs',
                        },
                    ],
                    features: [
                        {
                            title: 'JavaScript/TypeScript',
                            description: 'Full-featured SDK for web apps with autocapture',
                        },
                        {
                            title: 'React/Vue/Angular',
                            description: 'Framework-specific integrations and hooks',
                        },
                        {
                            title: 'iOS/Android/React Native',
                            description: 'Native mobile SDKs with offline support',
                        },
                        {
                            title: 'Python/Node/Ruby/Go',
                            description: 'Backend SDKs for server-side tracking',
                        },
                        {
                            title: 'PHP/.NET/Java/Rust',
                            description: 'Additional languages with full API support',
                        },
                    ],
                },
            ],
            answers: [
                {
                    q: "What can I build with PostHog's APIs?",
                    a: 'Common use cases include embedding analytics in your product, automating feature flag management, building internal dashboards, exporting data to your warehouse, tracking backend events, and creating custom integrations.',
                },
                {
                    q: 'Are there rate limits?',
                    a: "Event capture and feature flags have no rate limits. Query endpoints have generous limits (120-600 requests/minute depending on endpoint). We'll never throttle your critical event data.",
                },
                {
                    q: 'How do I authenticate?',
                    a: 'Use project API keys for public endpoints (event capture, feature flags) and personal API keys for private endpoints (queries, CRUD operations). Both can be scoped for security.',
                },
                {
                    q: 'Which SDK should I use?',
                    a: 'Use our JavaScript SDK for web apps (it includes autocapture), mobile SDKs for iOS/Android, and backend SDKs for server-side events. Check our docs for framework-specific guides.',
                },
            ],
            comparison: {
                comparison_companies: {
                    Mixpanel: 'API',
                    Amplitude: 'API',
                    Segment: true,
                    mParticle: true,
                },
                comparison_rows: [
                    {
                        feature: 'Event capture rate limits',
                        companies: {
                            Mixpanel: '2,000/minute',
                            Amplitude: '1,000/second',
                            Segment: '500/second',
                            mParticle: 'Varies',
                            PostHog: 'None',
                        },
                    },
                    {
                        feature: 'Batch size',
                        companies: {
                            Mixpanel: '2,000 events',
                            Amplitude: '2,000 events',
                            Segment: '500KB',
                            mParticle: '1MB',
                            PostHog: '1,000 events',
                        },
                    },
                    {
                        feature: 'Official SDKs',
                        companies: {
                            Mixpanel: '9',
                            Amplitude: '12',
                            Segment: '20+',
                            mParticle: '15+',
                            PostHog: '14+',
                        },
                    },
                    {
                        feature: 'Query API',
                        companies: {
                            Mixpanel: true,
                            Amplitude: true,
                            Segment: false,
                            mParticle: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'SQL access',
                        companies: {
                            Mixpanel: false,
                            Amplitude: false,
                            Segment: false,
                            mParticle: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Real-time webhooks',
                        companies: {
                            Mixpanel: false,
                            Amplitude: false,
                            Segment: true,
                            mParticle: true,
                            PostHog: true,
                        },
                    },
                ],
            },
            pairsWith: [
                {
                    slug: 'data-warehouse',
                    description: 'Query external data sources alongside PostHog events via API',
                },
                {
                    slug: 'cdp',
                    description: 'Send events to other tools using webhooks and destinations',
                },
                {
                    slug: 'feature-flags',
                    description: 'Evaluate and manage feature flags programmatically',
                },
                {
                    slug: 'product-analytics',
                    description: 'Query insights and build custom analytics experiences',
                },
            ],
            worksWith: ['data_warehouse', 'data_pipelines', 'feature_flags', 'product_analytics'],
        },
        {
            name: 'Webhooks',
            Icon: IconWebhooks,
            description: 'Send events to any destination in real-time',
            handle: 'webhooks',
            color: 'purple',
            colorSecondary: 'teal',
            category: 'data',
            slug: 'webhooks',
            seo: {
                title: 'Webhooks - PostHog',
                description:
                    'Export events in real-time to any destination. 40+ pre-built integrations, custom webhooks, filtering, and transformation capabilities.',
            },
            overview: {
                title: 'Real-time data export to anywhere',
                description:
                    'Send events as they happen to 40+ destinations or any custom webhook. Filter, transform, and route data to power your entire stack.',
                textColor: 'text-white',
                layout: 'columns',
            },
            screenshots: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/webhooks_overview_8f7d8e8e8e.png',
                    alt: 'PostHog webhooks interface',
                    classes: '',
                },
            ],
            hog: {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/hogs/product-analytics-hog.png',
                alt: 'Webhook-powered hedgehog',
                classes: 'absolute bottom-0 right-4 max-w-lg',
            },
            customers: {
                // ycombinator: {
                //     headline: 'alerts teams on critical user actions',
                //     description: 'Webhooks notify our team in Slack whenever a portfolio company hits key milestones.',
                // },
                // hasura: {
                //     headline: 'syncs product data to their CRM',
                //     description: 'Real-time webhook export keeps our sales team updated on customer usage patterns.',
                // },
                // contra: {
                //     headline: 'triggers marketing automation',
                //     description: 'We use webhooks to trigger email campaigns based on user behavior in our product.',
                // },
                // assemblyai: {
                //     headline: 'powers custom integrations',
                //     description: 'Webhooks send data to our internal services for real-time processing and alerting.',
                // },
            },
            features: [
                {
                    title: 'Pre-built destinations',
                    headline: '40+ integrations ready to use',
                    description:
                        "Connect to popular tools in seconds. From Slack to Salesforce, we've got you covered.",
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/destinations_grid_9a8b7c6d5e.png',
                            alt: 'Webhook destinations',
                        },
                    ],
                    features: [
                        {
                            title: 'Communication',
                            description: 'Slack, Discord, Microsoft Teams for team alerts',
                        },
                        {
                            title: 'Marketing',
                            description: 'HubSpot, Mailchimp, Klaviyo for automation',
                        },
                        {
                            title: 'Ad platforms',
                            description: 'Google, Meta, TikTok for conversion tracking',
                        },
                        {
                            title: 'CRM & Support',
                            description: 'Salesforce, Intercom, Zendesk for customer data',
                        },
                        {
                            title: 'Custom webhooks',
                            description: 'Send to any HTTP endpoint for internal tools',
                        },
                    ],
                },
                {
                    title: 'Smart filtering',
                    headline: 'Send only the data you need',
                    description: 'Filter events by type, properties, or complex SQL conditions before sending.',
                    features: [
                        {
                            title: 'Event filtering',
                            description: 'Send specific events like purchases or sign-ups',
                        },
                        {
                            title: 'Property matching',
                            description: 'Filter by user properties, plans, or custom attributes',
                        },
                        {
                            title: 'SQL conditions',
                            description: 'Use complex logic for advanced filtering',
                        },
                        {
                            title: 'Action matching',
                            description: 'Trigger on specific user actions or sequences',
                        },
                        {
                            title: 'Sampling',
                            description: 'Send a percentage of events for high-volume streams',
                        },
                    ],
                },
                {
                    title: 'Data transformation',
                    headline: 'Shape data exactly how you need it',
                    description:
                        'Transform payloads with templates or custom code. Send clean, structured data to any system.',
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/webhook_template_7d8e9f0a1b.png',
                            alt: 'Webhook payload customization',
                        },
                    ],
                    features: [
                        {
                            title: 'Template syntax',
                            description: 'Use {event.properties.value} to build custom payloads',
                        },
                        {
                            title: 'JSON formatting',
                            description: 'Create any JSON structure your destination expects',
                        },
                        {
                            title: 'Property access',
                            description: 'Include event, person, and group properties',
                        },
                        {
                            title: 'Custom functions',
                            description: 'Write Hog code for complex transformations',
                        },
                        {
                            title: 'Error handling',
                            description: 'Automatic retries and fallback options',
                        },
                    ],
                },
            ],
            answers: [
                {
                    q: "What's the difference between webhooks and batch exports?",
                    a: 'Webhooks send data in real-time as events happen, perfect for alerts and automation. Batch exports send data in scheduled chunks, ideal for data warehouses and large-scale processing.',
                },
                {
                    q: 'Can I send data to multiple destinations?',
                    a: 'Yes! Create as many webhook destinations as you need. Each can have different filters and transformations. Many teams use separate webhooks for alerts, CRM sync, and marketing automation.',
                },
                {
                    q: 'How reliable are webhooks?',
                    a: 'PostHog automatically retries failed requests up to 3 times. We monitor destination performance and alert you to issues. For critical data, combine webhooks with batch exports as a backup.',
                },
                {
                    q: 'Can I customize the webhook payload?',
                    a: 'Absolutely. Use our template syntax to shape data exactly how your destination expects it. For advanced cases, write custom Hog code to transform data however you need.',
                },
            ],
            comparison: {
                comparison_companies: {
                    Segment: 'Destinations',
                    mParticle: 'Connections',
                    RudderStack: true,
                    Fivetran: 'HVR',
                },
                comparison_rows: [
                    {
                        feature: 'Pre-built destinations',
                        companies: {
                            Segment: '300+',
                            mParticle: '300+',
                            RudderStack: '200+',
                            Fivetran: '500+',
                            PostHog: '40+',
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
                        feature: 'Custom webhooks',
                        companies: {
                            Segment: true,
                            mParticle: true,
                            RudderStack: true,
                            Fivetran: false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Filtering',
                        companies: {
                            Segment: true,
                            mParticle: true,
                            RudderStack: true,
                            Fivetran: true,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Transformation',
                        companies: {
                            Segment: '$$$',
                            mParticle: true,
                            RudderStack: true,
                            Fivetran: true,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Monitoring',
                        companies: {
                            Segment: true,
                            mParticle: true,
                            RudderStack: true,
                            Fivetran: true,
                            PostHog: true,
                        },
                    },
                ],
            },
            pairsWith: [
                {
                    slug: 'cdp',
                    description: 'Part of our complete customer data platform solution',
                },
                {
                    slug: 'product-analytics',
                    description: 'Export analytics events for processing in other tools',
                },
                {
                    slug: 'surveys',
                    description: 'Send survey responses to CRM or support tools',
                },
                {
                    slug: 'feature-flags',
                    description: 'Trigger actions when features are enabled or experiments conclude',
                },
            ],
            worksWith: ['data_pipelines', 'product_analytics', 'surveys', 'feature_flags'],
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
            name: 'Hog',
            Icon: IconBrackets,
            description: 'Transform and export data in real-time with our programming language',
            handle: 'hog',
            slug: 'hog',
            color: 'pink',
            colorSecondary: 'purple',
            category: 'data',
            seo: {
                title: 'Hog programming language - PostHog',
                description:
                    "Build custom data transformations and real-time destinations with Hog, PostHog's powerful programming language.",
            },
            overview: {
                title: 'The language that powers PostHog',
                description:
                    'Write custom destinations, transform data in real-time, and build powerful integrations with Hog - a SQL-compatible language designed for data pipelines.',
                textColor: 'text-white', // tw
            },
            screenshots: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/custom_destination_input_f74eb7947d.png',
                    alt: 'Hog destination code editor',
                    classes: '',
                },
            ],
            hog: {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1/posthog.com/src/components/Product/hogs/product-analytics-hog.png',
                alt: 'A hedgehog writing code',
                classes: 'absolute bottom-0 right-4 max-w-lg',
            },
            customers: {
                // ycombinator: {
                //     headline: 'sends events to custom endpoints',
                //     description: 'We use Hog to route specific events to our internal analytics systems.',
                // },
                // hasura: {
                //     headline: 'transforms data before export',
                //     description: 'Hog lets us reshape data to match our data warehouse schema perfectly.',
                // },
                // contra: {
                //     headline: 'builds custom integrations',
                //     description: 'Created a Hog destination to sync user events with our CRM in real-time.',
                // },
                // speakeasy: {
                //     headline: 'filters sensitive data',
                //     description: 'Hog functions strip PII before sending events to third-party services.',
                // },
            },
            features: [
                {
                    title: 'SQL-compatible syntax',
                    headline: 'Familiar language for data teams',
                    description:
                        'If you know SQL, you already know most of Hog. Built to feel natural for data analysis.',
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/hog/hog-code-example.png',
                            alt: 'Hog code example',
                        },
                    ],
                    features: [
                        {
                            title: 'SQL expressions',
                            description: 'All SQL expressions work as Hog code',
                        },
                        {
                            title: 'Variables and functions',
                            description: 'Full programming language with functions, loops, and conditionals',
                        },
                        {
                            title: 'String templates',
                            description: 'F-string support for easy string formatting',
                        },
                        {
                            title: 'Pattern matching',
                            description: 'Regex and LIKE operators for string matching',
                        },
                        {
                            title: 'Type conversion',
                            description: 'Built-in functions for converting between types',
                        },
                    ],
                },
                {
                    title: 'Real-time destinations',
                    headline: 'Send data anywhere, instantly',
                    description: 'Build custom destinations that process and route your data in real-time.',
                    images: [
                        {
                            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/custom_destination_input_f74eb7947d.png',
                            alt: 'Destination configuration',
                        },
                    ],
                    features: [
                        {
                            title: 'HTTP requests',
                            description: 'Send data to any webhook or API endpoint',
                        },
                        {
                            title: 'Async execution',
                            description: 'Pause and resume execution across fetch calls',
                        },
                        {
                            title: 'Error handling',
                            description: 'Gracefully handle failures with retries',
                        },
                        {
                            title: 'Input validation',
                            description: 'Define input schemas for reusable destinations',
                        },
                        {
                            title: 'Debug mode',
                            description: 'Print variables and trace execution flow',
                        },
                    ],
                },
                {
                    title: 'Secure execution',
                    headline: 'Run untrusted code safely',
                    description: 'The HogVM provides a secure sandbox for running user-provided code at scale.',
                    features: [
                        {
                            title: 'Bytecode VM',
                            description: 'Stack-based virtual machine with predictable behavior',
                        },
                        {
                            title: 'Resource limits',
                            description: 'Automatic timeouts and memory constraints',
                        },
                        {
                            title: 'No side effects',
                            description: 'Sandboxed execution prevents system access',
                        },
                        {
                            title: 'Serializable state',
                            description: 'Pause, serialize, and resume execution anywhere',
                        },
                        {
                            title: 'Multi-language support',
                            description: 'VMs in Python, TypeScript, and soon Rust',
                        },
                    ],
                },
            ],
            answers: [
                {
                    q: 'How is Hog different from HogQL?',
                    a: 'HogQL is our SQL dialect for querying data. Hog is a full programming language for transforming and routing data in real-time. While HogQL queries your data, Hog processes it as it flows through your pipeline.',
                },
                {
                    q: 'Can I test Hog code locally?',
                    a: 'Yes! Clone the PostHog repo and use `bin/hog` to run .hog files locally. You can also compile to bytecode with `bin/hoge` for debugging.',
                },
                {
                    q: 'What makes Hog secure?',
                    a: 'Hog runs in a sandboxed VM with no access to the file system or network beyond explicit fetch() calls. Execution is limited by timeouts and memory constraints, making it safe to run user-provided code.',
                },
                {
                    q: 'Why 1-indexed arrays?',
                    a: 'Hog is SQL-compatible, and SQL has always used 1-indexed arrays. While it might feel odd coming from other languages, it ensures consistency with our SQL expressions.',
                },
            ],
            comparison: {
                comparison_companies: {
                    'AWS Lambda': 'Functions',
                    'Cloudflare Workers': true,
                    'Google Cloud Functions': true,
                    'Custom microservices': true,
                },
                comparison_rows: [
                    {
                        feature: 'SQL compatibility',
                        companies: {
                            'AWS Lambda': false,
                            'Cloudflare Workers': false,
                            'Google Cloud Functions': false,
                            'Custom microservices': false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Built for data pipelines',
                        companies: {
                            'AWS Lambda': false,
                            'Cloudflare Workers': false,
                            'Google Cloud Functions': false,
                            'Custom microservices': 'Manual',
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Pausable execution',
                        companies: {
                            'AWS Lambda': false,
                            'Cloudflare Workers': 'Limited',
                            'Google Cloud Functions': false,
                            'Custom microservices': 'Complex',
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'No cold starts',
                        companies: {
                            'AWS Lambda': false,
                            'Cloudflare Workers': true,
                            'Google Cloud Functions': false,
                            'Custom microservices': true,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Integrated with analytics',
                        companies: {
                            'AWS Lambda': false,
                            'Cloudflare Workers': false,
                            'Google Cloud Functions': false,
                            'Custom microservices': false,
                            PostHog: true,
                        },
                    },
                    {
                        feature: 'Visual configuration',
                        companies: {
                            'AWS Lambda': 'Limited',
                            'Cloudflare Workers': false,
                            'Google Cloud Functions': 'Limited',
                            'Custom microservices': false,
                            PostHog: true,
                        },
                    },
                ],
            },
            pairsWith: [
                {
                    slug: 'cdp',
                    description: 'Power real-time destinations with custom Hog functions',
                },
                {
                    slug: 'sql',
                    description: 'Query data with HogQL, transform it with Hog',
                },
                {
                    slug: 'data-warehouse',
                    description: 'Transform data before sending to your warehouse',
                },
                {
                    slug: 'webhooks',
                    description: 'Build custom webhook processors with full control',
                },
            ],
            worksWith: ['cdp', 'sql', 'data_warehouse', 'webhooks'],
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

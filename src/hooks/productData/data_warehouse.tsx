import React from 'react'
import { IconAsterisk } from '@posthog/icons'
import Link from 'components/Link'

// this data powers the data warehouse page, but the product icons that appear on /products and in the menu bar are defined in productNavigation.ts under the 'visualize' handle.

export const dataWarehouse = {
    parentIcon: 'SQL',
    Icon: IconAsterisk,
    name: 'Data warehouse', // Query & visualize data
    handle: 'data_warehouse',
    type: 'data_warehouse',
    slug: 'data-warehouse',
    color: 'purple',
    colorSecondary: 'lilac',
    // category: 'data',
    seo: {
        title: 'Data Warehouse – Sync and query product data in PostHog',
        description:
            "Centralize your product data with PostHog's Data Warehouse. Query events, sync external sources, and visualize results in one place.",
    },
    overview: {
        title: 'Query & visualize product and third party data together',
        description: 'Unify and query data from any source and analyze it alongside your product data.',
        textColor: 'text-white', // tw
    },
    screenshots: {
        overview: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/dw_temp_528efa76a2.png',
            alt: 'Screenshot of the PostHog data warehouse',
            classes: '',
        },
        home: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_data_warehouse_light_b0cdbebe8f.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_data_warehouse_dark_8f465ecfaa.png',
            alt: 'Data Warehouse screenshot',
            classes: 'justify-center items-end px-4 @lg:px-6',
            imgClasses: 'rounded-t shadow-2xl',
        },
    },
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
    includeAddonRates: true,
    addonSliders: [
        {
            key: 'data_warehouse_historical',
            label: 'Data warehouse historical syncs',
            sliderConfig: {
                marks: [1000000, 10000000, 100000000, 1000000000, 10000000000],
                min: 1000000,
                max: 10000000000,
            },
            volume: 1000000,
            unit: 'row',
            freeAllocationText: 'Free for the first 7 days of each new source (100M on free plan, unlimited on paid)',
        },
    ],
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
            title: 'Query with PostHog SQL',
            headline: 'Query with PostHog SQL',
            description: 'Directly access your data, join sources, and interrogate data however you want',
            layout: 'columns',
            features: [
                {
                    title: 'Add queries to notebooks',
                    description:
                        'Use PostHog notebooks to collect warehouse info, research topics, or just as a scratch pad',
                },
                {
                    title: 'Save queries as views',
                    description: 'Visualize your results as tables, graphs, and more, then save them for easy access',
                },
                {
                    title: 'Write SQL without knowing SQL',
                    description: 'Nobody likes writing SQL, except for PostHog AI',
                },
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
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/DataWarehouse/images/stripe.png',
                    alt: '',
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
            title: 'Hog',
            features: [
                {
                    title: 'SQL-compatible syntax',
                    headline: 'Familiar language for data teams',
                    description: (
                        <>
                            If you know SQL, you already know most of{' '}
                            <Link to="/docs/hog" state={{ newWindow: true }}>
                                Hog
                            </Link>
                            . Built to feel natural for data analysis.
                        </>
                    ),
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
        },
        {
            title: 'Data exploration',
            headline: 'Browse and query all available tables',
            description:
                'Explore events, persons, sessions, and external data sources with schema browser and auto-complete. Visualize your data warehouse data using tables, trends, and more. You can also use data warehouse data with insights.',
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
                    description:
                        'Save data as views to reuse in other queries. Materialize them to improve performance',
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
        {
            title: 'Variables',
            headline: 'Variables',
            description:
                'Use variables to customize queries for different users, customers, timeframes, and other filters.',
        },
        {
            title: 'Sync from anywhere',
            headline: 'Sync from anywhere',
            description: 'Stripe, Hubspot, Zendesk, Adwords, Salesforce, and major databases.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/DataWarehouse/images/custom.png',
                    alt: 'Sync from anywhere',
                },
            ],
        },
        {
            title: 'Person joins',
            headline: 'Person joins',
            description:
                'Join warehouse data on PostHog persons to easily access that data wherever you access the person profile.',
        },
        {
            title: 'Combine PostHog data with other sources',
            headline: 'Combine PostHog data with other sources',
            description:
                'Combine your product data with revenue, CRM, logs, and much more to get a full picture of your business.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/DataWarehouse/images/custom.png',
                    alt: 'Sync from anywhere',
                },
            ],
        },
        {
            title: 'Connectors',
            headline: 'Connectors',
            description:
                "Use Temporal to sync data from your sources into PostHog's S3 storage smoothly. We'll handle the data flow for you.",
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/DataWarehouse/images/custom.png',
                    alt: 'Sync from anywhere',
                },
            ],
        },
        // {
        //     title: 'Sync from Stripe',
        //     headline: 'Sync from Stripe',
        //     description: 'Combine financial and product data to see how usage turns into growth.',
        //     images: [
        //         {
        //             src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/DataWarehouse/images/stripe.png',
        //             alt: 'Sync from Stripe',
        //         },
        //     ],
        // },
        // {
        //     title: 'Sync from Hubspot',
        //     headline: 'Sync from Hubspot',
        //     description: 'Bring your CRM into the mix and track your sales funnel directly in PostHog.',
        //     images: [
        //         {
        //             src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/DataWarehouse/images/hubspot.png',
        //             alt: 'Sync from Hubspot',
        //         },
        //     ],
        // },
        // {
        //     title: 'Sync from Zendesk',
        //     headline: 'Sync from Zendesk',
        //     description: 'See how ticket volumes and SLA breaches impact sign-ups and churn.',
        //     images: [
        //         {
        //             src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/DataWarehouse/images/zendesk.png',
        //             alt: 'Sync from Zendesk',
        //         },
        //     ],
        // },
    ],
    questions: [
        {
            question: 'How do specific user behaviors correlate to MRR?',
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
            slug: 'experiments',
            description: 'You can use data warehouse data as primary or secondary metrics in experiments.',
        },
        {
            slug: 'docs/sql',
            description: 'Create entirely custom queries, join sources, and get the answers you need.',
        },
    ],
    presenterNotes: {
        overview:
            '<strong>Presenter notes:</strong> Your product data is lonely inside your data warehouse unless it has all the relevant context you need to make decisions across your entire organization. PostHog\'s Data Warehouse brings them all together so you can answer questions like "What do high-value customers actually do in our product?" No ETL pipelines, no data engineering team required.',
        customers:
            "HeadshotPro analyzes Adwords alongside product usage - marketing and engineering finally speak the same language. Webshare syncs Intercom data to see how support interactions affect retention. These aren't special cases - everyone needs this. Even if you don't have a warehouse now, you'll need it eventually, so start small and ours will grow with you.",
        features:
            "<strong>More features:</strong><br /><br /><strong>Link multiple sources:</strong> Join Stripe customers to PostHog users. Connect everything with simple UI.<br /><br /><strong>Query with SQL:</strong> Full SQL access to everything. No vendor lock-in - it's just SQL.<br /><br /><strong>Save queries as views:</strong> Build once, use everywhere. Turn complex joins into simple tables.<br /><br /><strong>Custom sync periods:</strong> Daily for critical data, monthly for the rest. You control the schedule.<br /><br /><strong>Sync from Stripe:</strong> Connect revenue to product usage. See which features drive MRR. Track churn by usage patterns. Finally answer 'what makes customers pay more?'<br /><br /><strong>Sync from Hubspot:</strong> Link your CRM to product data. See how leads use your product before they buy. Track deal velocity by feature adoption.<br /><br /><strong>Sync from Zendesk:</strong> Connect support tickets to user behavior. Do angry users churn more? Which features cause the most tickets?<br /><br /><strong>Sync from anywhere:</strong> Google Ads, Salesforce, custom databases. If it has data, we can sync it. CSV uploads for everything else.",
        answers:
            'These are real questions our customers answer with PostHog. <em>MRR vs behavior?</em> Join Stripe and product data. <em>Support impact?</em> Connect Zendesk to retention metrics. <em>Lead quality?</em> Link HubSpot to usage patterns. <em>Revenue predictions?</em> Compare CRM forecasts to actual Stripe data. <em>Churn analysis</em> See payment failures alongside last product usage.',
        pricing:
            "1 million rows sync free every month, then it's simple per-row pricing. Compare that to Fivetran who charges thousands per month! We're 10x cheaper because we built for product teams, not enterprise IT. We grow with you vs. trying to lock you in with value-based pricing.",
        'comparison-summary':
            'Traditional data warehouses (Snowflake, BigQuery) require data teams. ETL tools (Fivetran, Stitch) just move data around. We do both - sync and analyze in one place. Perfect for product teams who need answers, not infrastructure.',
        'feature-comparison':
            "We don't have every connector Fivetran has. We don't need Snowflake's scale. What we have: dead-simple setup, built-in analytics, and it works with all your PostHog data. For most teams, that's exactly enough.",
        docs: "Step-by-step guides for each integration. Common query patterns documented. Real examples like 'revenue per feature' and 'support ticket impact on churn.' No data engineering degree required.",
        'pairs-with':
            "The magic happens when everything connects. Stripe revenue in your funnels. CRM data in your experiments. Support tickets next to session replays. This is why we built it - your data shouldn't live in silos.",
        'getting-started':
            "All you need to do get started is connect a source, authenticate, and pick the tables you want to sync. Data starts syncing immediately. Write your first JOIN query in 5 minutes. And if you're using Product Analytics, you can leverage customer usage data to answer questions that would have required stitching together and normalizing additional sources.",
    },
}

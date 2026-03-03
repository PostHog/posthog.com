import React from 'react'
import {
    IconDashboard,
    IconGear,
    IconListTreeConnected,
    IconRewindPlay,
    IconSparkles,
    IconTarget,
    IconTrends,
    IconUser,
    IconWarning,
    IconMagicWand,
    IconLlmPromptEvaluation,
    IconTerminal,
    IconEndpoints,
} from '@posthog/icons'

import CloudinaryImage from 'components/CloudinaryImage'

export const endpoints = {
    name: 'Endpoints',
    Icon: IconEndpoints,
    description: 'Custom API endpoints powered by your PostHog data.',
    handle: 'endpoints',
    type: 'endpoints',
    color: 'teal',
    colorSecondary: 'teal',
    category: 'product_engineering',
    slug: 'endpoints',

    // slider: {
    //     marks: [100000, 1000000, 10000000, 100000000],
    //     min: 100000,
    //     max: 100000000,
    // },
    // volume: 100000,
    seo: {
        title: 'Endpoints – Custom API endpoints powered by your PostHog data',
        description:
            'Create custom API endpoints powered by your PostHog data. Use them to build embedded analytics, data feeds, and more.',
    },
    overview: {
        title: 'Custom API endpoints powered by your PostHog data',
        description: 'Use them to build embedded analytics, data feeds, and more – no backend required.',
        textColor: 'text-black',
        layout: 'overlay',
    },
    videos: {
        overview: {
            wistia: 'bl174kpxu8',
        },
    },
    screenshots: {
        overview: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/endpoints_desktop_5ea67ee88c.png',
            srcMobile: 'https://res.cloudinary.com/dmukukwp6/image/upload/endpoints_mobile_de719b9fe0.png',
            alt: 'Endpoints',
            classes: 'mx-4 @2xl:mx-8',
            // imgClasses: 'rounded-tl-md shadow-2xl',
            classesMobile: '',
            imgClassesMobile: '',
        },
        home: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_llm_analytics_light_a436da72f7.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_llm_analytics_dark_d8f32c249b.png',
            alt: 'LLM Analytics screenshot',
            classes: 'justify-end items-end pl-4 @lg:pl-6',
            imgClasses: 'rounded-tl-md shadow-2xl',
        },
    },
    // hog: {
    //   src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/hogs/product-analytics-hog.png',
    //   alt: 'AI-powered hedgehog',
    //   classes: 'absolute bottom-0 right-4 max-w-lg',
    // },
    customers: {
        elevenlabs: {
            headline: 'uses LLM analytics with session replays (and everything else)',
            description:
                'PostHog is amazing. It reins in the chaos to have everything in one place. Otherwise it’s quite overwhelming to try and understand what’s working and what’s not.',
        },
        lovable: {
            headline: 'compared us to every other observability tool, just to be sure',
            description:
                "If you're building a new product, just use PostHog. It's a no-brainer. It's the only all-in-one platform like it for developers.",
        },
        posthog: {
            headline: 'monitors the usage and performance of PostHog AI with LLM Analytics',
            description:
                'We use our own AI observability product to attribute costs, monitor latency and errors, compare models, and iterate on prompts in production.',
        },
    },
    features: [
        {
            title: 'Dashboards',
            handle: 'dashboards',
            template: 'splitImage',
            headline: 'Build your own dashboards',
            description: 'Use your PostHog data to power dashboards outside the PostHog UI.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/endpoints_dashboard_a1e300960b.png',
                    // srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_trace_dark_f49aa4dd89.png',
                    alt: 'A dashboard powered by endpoints',
                    className: 'justify-end items-end @2xl:mt-8 ml-8 @2xl:ml-0 rounded-md',
                },
            ],
            features: [
                {
                    // icon: <IconListTreeConnected />,
                    title: 'Expose metrics as APIs',
                    description: 'Create endpoints from insights or SQL and fetch the results from your application.',
                },
                {
                    // icon: <IconUser />,
                    title: 'Use the queries you already have',
                    description:
                        'Endpoints run the exact insight or SQL query defined in PostHog, including filters, breakdowns, and time range.',
                },
                {
                    // icon: <IconRewindPlay />,
                    title: 'Designed to be called over and over ',
                    description:
                        'Endpoints are intended to be called regularly by dashboards, with higher rate limits than standard API queries.',
                },
            ],
            // children: (<></>)
        },
        {
            title: 'Use cases',
            handle: 'use_cases',
            template: 'splitImage',
            headline: 'Build custom feeds',
            description:
                'Make recommendations or build sales enrichment tools. Endpoints work well for lists and summaries that need to update regularly.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/create_endpoint_query_a7a9087c5a.png',
                    // srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_cost_dark_d1efde15fd.png',
                    alt: 'Create an endpoint',
                    className: 'mx-4 @2xl:mx-0 @2xl:mt-8',
                },
            ],
            features: [
                {
                    // icon: <IconTrends />,
                    title: 'Predefined aggregate queries',
                    description:
                        'Create endpoints for queries like “top selling products for this week” or “most active users”.',
                },
                {
                    // icon: <IconTarget />,
                    title: 'Stable URLs your app can keep calling',
                    description: 'Each endpoint has a consistent API URL that applications can call repeatedly.',
                },
                {
                    // icon: <IconSparkles />,
                    title: 'Optional caching',
                    description: 'Endpoints return cached results when available, avoiding unnecessary recomputation.',
                },
            ],
        },
        {
            title: 'SQL endpoints',
            handle: 'sql_endpoints',
            template: 'grid',
            headline: 'Ship APIs without building a backend',
            description:
                'Expose the results of PostHog insights or SQL queries so applications can fetch them directly. Insights keep their existing configuration, while SQL queries can be materialized for scheduled execution and higher rate limits.',
            children: (
                <div>
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/create_endpoint_builder_66ff485fc4.png"
                        alt="Create an endpoint"
                        className="w-full h-full object-contain"
                    />
                </div>
            ),
        },
    ],
    // postHogOnPostHog: {
    //     title: 'How PostHog uses LLM Analytics',
    //     benefits: [
    //         {
    //             title: 'Analyze costs',
    //             description: 'by comparing models and analyzing usage',
    //         },
    //         {
    //             title: 'Spot emergencies',
    //             description: 'with latency and error rate alerting',
    //         },
    //         {
    //             title: 'Monitor performance',
    //             description: 'by comparing speed and reliability across models',
    //         },
    //         {
    //             title: 'Muck about',
    //             description: 'in the prompt playground (meaningfully)',
    //         },
    //         {
    //             title: 'Integrate with other tools',
    //             description: 'in your LLM observability stack',
    //         },
    //         {
    //             title: 'Build AI features',
    //             description: 'like PostHog AI, obviously',
    //         },
    //     ],
    // },
    // questions: [
    //     {
    //         question: 'What are my LLM costs by customer?',
    //     },
    //     {
    //         question: 'Which AI features have the highest error rates?',
    //     },
    //     {
    //         question: 'Are there latency spikes in my LLM calls?',
    //     },
    //     {
    //         question: 'Do AI features improve user retention?',
    //     },
    //     {
    //         question: 'Which prompts are most expensive?',
    //     },
    //     {
    //         question: 'How many tokens does each feature consume?',
    //     },
    //     {
    //         question: "What's the ROI of our AI features?",
    //     },
    //     {
    //         question: 'Which model gives the best cost/performance ratio?',
    //     },
    // ],
    comparison: {
        summary: {
            them: [
                {
                    title: 'You want a standalone analytics API',
                    subtitle: 'and are happy managing data separately',
                },
                {
                    title: 'You’re building analytics directly from raw event data',
                },
                {
                    title: 'You don’t need dashboards, insights, or product context',
                },
                {
                    title: 'You’re okay duplicating analytics logic outside PostHog',
                },
            ],
            us: [
                {
                    title: 'Reuse existing insights or SQL queries already in PostHog',
                },
                {
                    title: 'You’re building on PostHog data',
                    subtitle: 'like customer-facing dashboards or internal tools',
                },
                {
                    title: 'You need stable, predefined endpoints',
                    subtitle: 'for feeds, rankings, or summaries',
                },
                {
                    title: 'You want to move away from ad-hoc Query API calls toward production-ready queries',
                },
            ],
        },
        companies: [
            {
                name: 'Tinybird',
                key: 'tinybird',
                // link: '/blog/posthog-vs-langfuse',
            },
            {
                name: 'ClickHouse Cloud',
                key: 'clickhouse_cloud',
                // link: '/blog/posthog-vs-langsmith',
            },
            {
                name: 'PostHog',
                key: 'posthog',
            },
        ],
        rows: ['endpoints', 'platform.deployment.open_core'],
        excluded_sections: ['platform'],
    },
    pairsWith: [
        {
            slug: 'product-analytics',
            description:
                'Create insights in PostHog and expose their results through endpoints. Use trends, funnels, or retention analyses to power dashboards, feeds, or summaries in your application, without rebuilding the query elsewhere.',
        },
        {
            slug: 'data-stack/managed-warehouse',
            description:
                'Combine product analytics data with other datasets using SQL in PostHog’s data warehouse. Expose the results through endpoints when you need more control over how data is shaped or joined.',
        },
    ],
    worksWith: ['product_analytics', 'dashboards', 'session_replay', 'feature_flags'],
    presenterNotes: {
        overview:
            "<strong>Presenter notes:</strong> Endpoints let you take any insight or SQL query you've already built in PostHog and expose it as a stable API endpoint. Instead of cobbling together your own analytics API or hammering the Query API with ad-hoc requests, you define a query once and get back a URL your application can call repeatedly. The use cases are broad: embedded analytics dashboards for your customers, live metrics on your landing page, data feeds powering recommendations or leaderboards, or internal tools that need product data without the overhead of a custom pipeline. It's a simple three-step workflow – define your data, create the endpoint, retrieve the results – and it's designed to be production-ready from day one, with higher rate limits, optional materialization, caching, versioning, and an OpenAPI spec for every endpoint. During beta, it's completely free to use.",
        features:
            "<strong>Dashboards:</strong> The most common use case is building customer-facing dashboards. You already have insights in PostHog – trends, funnels, retention charts – and now you can expose those exact results through an API. Your application fetches the data and renders it however you want. The key thing here is that the query logic stays in PostHog. You're not duplicating analytics code in your app or maintaining a separate data pipeline. When you update the insight in PostHog, the endpoint returns the new results. And because endpoints support higher rate limits than standard API queries, they're designed to be called repeatedly by dashboards without running into throttling issues.<br /><br /><strong>Use cases:</strong> Beyond dashboards, endpoints work well for any scenario where you need aggregated data from PostHog in your application. Think top-selling products for a homepage, most active users for a sales enrichment tool, or a weekly summary feed. You can use SQL-based endpoints with variables to make them dynamic – pass in a customer ID and get back just their data. Each endpoint has a stable URL that doesn't change, so your integrations don't break when you update the underlying query. And with optional caching, you avoid unnecessary recomputation when the same data is requested multiple times.<br /><br /><strong>More:</strong> Under the hood, endpoints give you fine-grained control over performance. Materialization lets you pre-compute expensive queries on a schedule – hourly, daily, or weekly – so responses come back instantly from stored results instead of hitting the database. This is especially useful for high-traffic endpoints or complex queries that scan a lot of data. You also get versioning out of the box, so every time you update a query, the previous version is still accessible. This means you can safely iterate on queries without breaking production integrations. And if you prefer managing things as code, there's a CLI that lets you pull, push, and diff endpoint definitions as YAML files.",
        dashboards:
            "This is the most straightforward use case for endpoints: powering dashboards outside of PostHog. You already have insights built – trends, funnels, retention – and endpoints let you expose those exact results as APIs your application can fetch. The query logic stays in PostHog, so you're not duplicating analytics code or maintaining a separate data pipeline. When you update the insight, the endpoint automatically returns the updated results. Endpoints are designed to be called repeatedly, with higher rate limits than the standard Query API, so your dashboard can poll for fresh data without getting throttled. And because each endpoint runs the exact query you defined – including filters, breakdowns, and time ranges – what your customers see matches what you see in PostHog.",
        use_cases:
            "Beyond dashboards, endpoints are a good fit anywhere you need aggregated PostHog data in your application. A homepage showing top-selling products this week, a sales tool enriched with user activity data, a recommendation engine pulling the most-engaged-with content – these are all queries you can define once and call from anywhere. SQL-based endpoints support variables, so you can make them dynamic: pass in a customer ID or date range and get back filtered results. Each endpoint has a stable URL that doesn't change when you update the query, so your integrations stay intact. And with configurable caching – anywhere from 5 minutes to 24 hours – you avoid re-running the same expensive query every time the endpoint is called.",
        more: "Endpoints bridge the gap between PostHog's internal analytics and your production application. For insight-based endpoints, you get the exact same query the visual builder produces – no SQL required. For SQL-based endpoints, you have full flexibility to shape the output however you need, including joins across tables in the data warehouse. Materialization is the key feature here: you can pre-compute query results on a schedule – hourly, daily, or weekly – so responses come back instantly from stored results in S3 instead of hitting the database. This is especially useful for expensive queries or high-traffic endpoints. You also get versioning, so every time you update a query, the previous version remains accessible. And there's a CLI for managing endpoints as code – pull definitions as YAML, push changes, and diff local versus remote – so your endpoint configurations can live alongside your application code in version control.",
        playground:
            "Pick a scenario from the dropdown, see the SQL query that powers it, and preview the API URL you'd call. This is great for demos and for getting a feel for how the whole flow works – from defining the query to seeing the response format. In the actual product, every endpoint has its own playground tab where you can test with different variable values and see the exact response structure, including columns and result format. It removes the guesswork from integration.",
        'comparison-summary':
            "<strong>TL;DR:</strong> If you're already using PostHog and need to get your analytics data into an application, endpoints are the simplest path. You're reusing queries you've already built – insights or SQL – and exposing them as stable, optimized APIs. The alternative is building your own analytics backend on top of something like Tinybird or ClickHouse Cloud, which makes sense if you're working with raw event data outside of PostHog or need a standalone analytics API. But if your data is already in PostHog and you want to avoid duplicating logic, endpoints save you a lot of plumbing.",
        'feature-comparison':
            "This comparison focuses on the differences between using PostHog Endpoints versus building your own analytics API layer on tools like Tinybird or ClickHouse Cloud. The main advantage of endpoints is that they sit directly on top of PostHog's data and query engine – no ETL, no syncing, no separate infrastructure. You get materialization, caching, versioning, and OpenAPI specs as built-in features rather than things you have to build yourself. The trade-off is that endpoints are scoped to PostHog data, so if you need to query data that lives entirely outside PostHog, a standalone tool may be a better fit.",
        docs: "The endpoints documentation covers everything from the initial setup to advanced topics like materialization, variables, versioning, and the CLI. We've included step-by-step guides for common patterns – customer-facing analytics, internal tools with Retool, breakdown variables, and SQL variables with filtering. There are code examples in cURL, Python, Node.js, TypeScript, and Go, plus a guide on generating typed SDKs from the OpenAPI spec. If you're evaluating whether to use endpoints or the Query API, there's a dedicated comparison page that lays out the trade-offs.",
        'pairs-with':
            "Endpoints are most powerful when combined with the rest of PostHog. Product analytics is the natural pairing – create an insight showing daily active users or conversion rates, then expose it as an endpoint your customer dashboard can call. You're not rebuilding the query; you're reusing the exact same insight. The data warehouse integration is equally useful – join product data with revenue data, CRM records, or anything else you've synced into PostHog, shape it with SQL, and serve it through an endpoint. The point is that endpoints aren't a standalone product. They're the bridge between PostHog's analytics and the rest of your application stack.",
        'getting-started':
            "Getting started is straightforward. If you already have insights or SQL queries in PostHog, you're most of the way there. Create an endpoint from any insight or query, grab the URL, and call it from your app. The playground lets you test everything before writing integration code, and the OpenAPI spec means you can generate a typed client in your language of choice. During beta, it's free – no credit card, no usage limits to worry about. We'll notify all beta users before any pricing changes take effect. If you want to manage endpoints as code, the CLI supports pull, push, and diff workflows so you can version-control your endpoint definitions alongside your application code.",
    },
}

import React from 'react'
import {
    IconChat,
    IconConfetti,
    IconCursorClick,
    IconEndpoints,
    IconEye,
    IconInfo,
    IconList,
    IconMagic,
    IconMessage,
    IconRocket,
    IconSparkles,
} from '@posthog/icons'
import { features } from './endpoints/features'
import { applications, topFeatures } from './endpoints/slides'
import { getTool } from '../../data/tools'

export const endpoints = {
    ...getTool('endpoints'),
    Icon: IconEndpoints,
    type: 'endpoints',
    // Beta in product/docs; no billing product yet (free during beta).
    status: 'beta',
    teamSlug: 'data-modeling',
    // Squeak topic: /questions/topic/endpoints (squeakId from page-data).
    forumTopicId: 393,
    color: 'teal',
    colorSecondary: 'teal',
    shortDescription: 'Custom API endpoints powered by your PostHog data',
    pricingDescription:
        'Endpoints is free during beta. When pricing ships, it will be usage-based with a generous monthly free tier – billed on compute time and data scanned, like the rest of PostHog.',
    // Same "How pricing works" section chrome as Experiments (`BilledWithPricing`).
    pricingLead: 'Pricing is coming soon.',
    pricingHighlights: [
        "We'll offer usage-based pricing with a generous monthly free tier – like we do with all of our paid products.",
    ],
    pricingFooter: 'Endpoints is free during beta.',
    pricingEventsLink: false,
    seo: {
        title: 'Endpoints – Custom API endpoints powered by your PostHog data',
        description:
            'Custom API endpoints powered by your PostHog data – the context agents need to build embedded analytics, data feeds, and make your product self-driving.',
    },
    /**
     * Sections rendered on the Product surface (`/endpoints`). Each entry
     * resolves to a section template via `templateRegistry[item.template ?? item.slug]`.
     * `props` is passed straight to the resolved section component.
     */
    productMenu: [
        { slug: 'overview', name: 'Overview', icon: <IconEye className="size-4" /> },
        {
            slug: 'eli5',
            name: 'What does it do?',
            hideFromNav: true,
            group: 'divided',
            icon: <IconInfo className="size-4" />,
        },
        {
            slug: 'use-cases',
            name: 'Who is it for?',
            hideFromNav: true,
            group: 'divided',
            icon: <IconMagic className="size-4" />,
        },
        {
            slug: 'applications',
            name: 'How do I use it?',
            group: 'divided',
            icon: <IconCursorClick className="size-4" />,
            props: { slides: applications },
        },
        {
            slug: 'top-features',
            name: 'Top features',
            group: 'divided',
            icon: <IconSparkles className="size-4" />,
            props: { slides: topFeatures },
        },
        {
            slug: 'ask-anything',
            name: 'AI prompts',
            group: 'divided',
            icon: <IconChat className="size-4" />,
        },
        // No `installation` section: Endpoints isn't an SDK install product.
        // Getting started is create-an-endpoint → call the URL (see docs start-here).
        {
            slug: 'feature-comparison',
            name: 'Feature comparison',
            group: 'divided',
            icon: <IconList className="size-4" />,
        },
        { slug: 'community', name: 'Questions?', group: 'divided', icon: <IconMessage className="size-4" /> },
        { slug: 'pairs-with', name: 'Pairs with...', hideFromNav: true, icon: <IconConfetti className="size-4" /> },
        { slug: 'getting-started', name: 'Get started', group: 'divided', icon: <IconRocket className="size-4" /> },
    ],
    /**
     * Pricing surface (`/endpoints/pricing`). No billing product yet – Plans /
     * calculator omitted until billing ships. Uses the same BilledWithPricing
     * section as Experiments for the coming-soon copy, then comparison-summary.
     * When billing ships, replace `billed-with` with:
     *   { slug: 'plans', name: 'Plans', icon: <IconCheckCircle className="size-4" /> },
     *   { slug: 'calculator', name: 'Pricing calculator', icon: <IconPieChart className="size-4" /> },
     */
    pricingMenu: [
        { slug: 'billed-with', name: 'How pricing works', icon: <IconInfo className="size-4" /> },
        { slug: 'comparison-summary', name: 'PostHog vs...', icon: <IconList className="size-4" /> },
        { slug: 'pricing-cta', name: 'Get started', hideFromNav: true },
    ],
    overview: {
        title: 'Custom API endpoints powered by your PostHog data',
        description:
            "Use them to build embedded analytics, data feeds, and more – no backend required. Endpoints are how your product's context flows out to the agents and tools that make it self-driving.",
        eli5: 'Endpoints turns any saved insight or SQL query into a stable, authenticated HTTP URL. You define the query once in PostHog – filters, breakdowns, variables, and all – and your app, agent, or internal tool fetches the results over HTTP. No custom analytics backend, no CSV exports on Monday, no Query API spaghetti. Versioning, caching, materialization, and an OpenAPI spec come with it.',
        textColor: 'text-black',
        layout: 'overlay',
    },
    // Previous wistia ID was shared with AI Observability – likely a copy-paste.
    // Add a real Endpoints overview video when one exists.
    // videos: { overview: { wistia: '...' } },
    screenshots: {
        overview: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/endpoints_desktop_5ea67ee88c.png',
            srcMobile: 'https://res.cloudinary.com/dmukukwp6/image/upload/endpoints_mobile_de719b9fe0.png',
            alt: 'Endpoints',
            classes: 'mx-4 @2xl:mx-8',
            classesMobile: '',
            imgClassesMobile: '',
        },
        // Full hero composition (scientist hog + SQL → dashboard). No separate
        // hogs.default – the hog is already in the art; Overview hog overlay is optional.
        home: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/endpoints_desktop_5ea67ee88c.png',
            alt: 'Endpoints: turn a PostHog query into an API that powers your analytics',
            classes: 'justify-end items-end pl-4 @lg:pl-6',
            imgClasses: 'rounded-tl-md shadow-2xl',
        },
        dashboards: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/endpoints_dashboard_a1e300960b.png',
            alt: 'A dashboard powered by endpoints',
        },
        create_query: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/create_endpoint_query_a7a9087c5a.png',
            alt: 'Create an endpoint',
        },
        create_builder: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/create_endpoint_builder_66ff485fc4.png',
            alt: 'Create an endpoint',
        },
    },
    // Pricing footer CTA only – reuse the hero composite.
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/endpoints_desktop_5ea67ee88c.png',
        alt: 'Endpoints: turn a PostHog query into an API that powers your analytics',
        footerClasses: 'max-w-[550px]',
    },
    useCases: {
        intro: 'Endpoints is used across teams depending on your role.',
        rows: [
            [
                'Product Engineers',
                'Ship customer-facing analytics or data feeds without building and owning an analytics API',
            ],
            ['PMs & ops', 'Turn a saved insight into a production URL – no ticket to data engineering required'],
            ['AI / agent builders', 'Give MCP clients and agent runtimes stable HTTP access to live product context'],
            [
                'Growth & marketing',
                'Automate reports and rankings that used to mean CSV exports or brittle Query API calls',
            ],
            ['Data teams', 'Stop being the bottleneck on getting numbers out of PostHog and into other tools'],
        ],
    },
    features,
    mcp: {
        title: 'MCP',
        headline: features.mcp.headline,
        description: features.mcp.description,
    },
    comparison: {
        summary: {
            them: [
                {
                    title: 'You want a standalone analytics API',
                    subtitle: 'and are happy managing data separately',
                },
                {
                    title: "You're building analytics directly from raw event data",
                },
                {
                    title: "You don't need dashboards, insights, or product context",
                },
                {
                    title: "You're okay duplicating analytics logic outside PostHog",
                },
            ],
            us: [
                {
                    title: "Agents and tools can pull your product's context through a stable API – the data that powers self-driving",
                },
                {
                    title: 'Reuse existing insights or SQL queries already in PostHog',
                },
                {
                    title: "You're building on PostHog data",
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
            },
            {
                name: 'ClickHouse Cloud',
                key: 'clickhouse_cloud',
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
            slug: 'context-warehouse/managed-warehouse',
            description:
                "Combine product analytics data with other datasets using SQL in PostHog's data warehouse. Expose the results through endpoints when you need more control over how data is shaped or joined.",
            className: '!size-6',
        },
    ],
    worksWith: ['product_analytics', 'dashboards', 'session_replay', 'feature_flags'],
    /**
     * Prompts from contents/docs/endpoints/surfaces/mcp.mdx plus additional
     * prompts that map 1:1 to verified MCP tools in src/data/mcp-tools.json.
     * TODO: ai.image / imageAlt once an Endpoints AI hero asset exists.
     */
    ai: {
        intro: 'Ask PostHog AI to create, run, debug, and materialize endpoints.',
        mcpFeatures: ['endpoints'],
        groups: [
            {
                title: 'Create',
                tool: 'endpoint-create',
                prompts: [
                    'Create an endpoint called weekly-signups from this SQL query',
                    'Create an endpoint from my daily active users insight',
                ],
            },
            {
                title: 'List',
                tool: 'endpoints-get-all',
                prompts: ['List every endpoint in this project', "Which endpoints haven't been called recently?"],
            },
            {
                title: 'Test',
                tool: 'endpoint-run',
                prompts: [
                    'Run weekly-signups with customer_id set to cust_123 and show me the rows',
                    'Call my top-products endpoint for the last 7 days and summarize the results',
                ],
            },
            {
                title: 'Debug',
                tool: 'endpoint-logs',
                prompts: [
                    'Pull the error logs for weekly-signups from the last hour and tell me what broke',
                    'Show ERROR logs for weekly-signups from the last 24 hours',
                ],
            },
            {
                title: 'Materialize',
                tool: 'endpoint-materialization-suggestion',
                prompts: ["weekly-signups can't be materialized – suggest a rewrite that can"],
            },
            {
                title: 'Versions',
                tool: 'endpoint-versions',
                prompts: ['List every version of weekly-signups with the last execution time'],
            },
            {
                title: 'OpenAPI',
                tool: 'endpoint-openapi-spec',
                prompts: ['Fetch the OpenAPI spec for weekly-signups so I can generate a typed client'],
            },
        ],
    },
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
            "<strong>TL;DR:</strong> If you're already using PostHog and need to get your analytics data into an application, endpoints are the simplest path. You're reusing queries you've already built – insights or SQL – and exposing them as stable, optimized APIs. The alternative is building your own analytics backend on top of something like Tinybird or ClickHouse Cloud, which makes sense if you're working with raw event data outside of PostHog or need a standalone analytics API. But if your data is already in PostHog and you want to avoid duplicating logic, endpoints save you a lot of plumbing. They're also how your product's context flows out to the agents and tools that act on it – the API layer behind a self-driving product.",
        'feature-comparison':
            "This comparison focuses on the differences between using PostHog Endpoints versus building your own analytics API layer on tools like Tinybird or ClickHouse Cloud. The main advantage of endpoints is that they sit directly on top of PostHog's data and query engine – no ETL, no syncing, no separate infrastructure. You get materialization, caching, versioning, and OpenAPI specs as built-in features rather than things you have to build yourself. The trade-off is that endpoints are scoped to PostHog data, so if you need to query data that lives entirely outside PostHog, a standalone tool may be a better fit.",
        docs: "The endpoints documentation covers everything from the initial setup to advanced topics like materialization, variables, versioning, and the CLI. We've included step-by-step guides for common patterns – customer-facing analytics, internal tools with Retool, breakdown variables, and SQL variables with filtering. There are code examples in cURL, Python, Node.js, TypeScript, and Go, plus a guide on generating typed SDKs from the OpenAPI spec. If you're evaluating whether to use endpoints or the Query API, there's a dedicated comparison page that lays out the trade-offs.",
        'pairs-with':
            "Endpoints are most powerful when combined with the rest of PostHog. Product analytics is the natural pairing – create an insight showing daily active users or conversion rates, then expose it as an endpoint your customer dashboard can call. You're not rebuilding the query; you're reusing the exact same insight. The data warehouse integration is equally useful – join product data with revenue data, CRM records, or anything else you've synced into PostHog, shape it with SQL, and serve it through an endpoint. The point is that endpoints aren't a standalone product. They're the bridge between PostHog's analytics and the rest of your application stack.",
        'getting-started':
            "Getting started is straightforward. If you already have insights or SQL queries in PostHog, you're most of the way there. Create an endpoint from any insight or query, grab the URL, and call it from your app. The playground lets you test everything before writing integration code, and the OpenAPI spec means you can generate a typed client in your language of choice. During beta, it's free – no credit card, no usage limits to worry about. We'll notify all beta users before any pricing changes take effect. If you want to manage endpoints as code, the CLI supports pull, push, and diff workflows so you can version-control your endpoint definitions alongside your application code.",
    },
}

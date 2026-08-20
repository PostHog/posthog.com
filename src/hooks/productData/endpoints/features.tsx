import React from 'react'
import { IconBrackets, IconCode, IconDashboard, IconLaptop, IconPlug, IconTerminal, IconTrends } from '@posthog/icons'
import CloudinaryImage from 'components/shared/media/CloudinaryImage'
import MCPInstall from 'components/Products/MCPInstall'

/**
 * Feature content from the previous Slides-era endpoints.tsx features array,
 * plus surface copy from contents/docs/endpoints/surfaces/*.mdx and the
 * docs landing page.
 */
export const features = {
    dashboards: {
        title: 'Dashboards',
        handle: 'dashboards',
        headline: 'Build your own dashboards',
        description: 'Use your PostHog data to power dashboards outside the PostHog UI.',
        icon: <IconDashboard />,
        color: 'teal',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/endpoints_dashboard_a1e300960b.png',
                alt: 'A dashboard powered by endpoints',
                className: 'justify-end items-end @2xl:mt-8 ml-8 @2xl:ml-0 rounded-md',
            },
        ],
        features: [
            {
                title: 'Expose metrics as APIs',
                description: 'Create endpoints from insights or SQL and fetch the results from your application.',
            },
            {
                title: 'Use the queries you already have',
                description:
                    'Endpoints run the exact insight or SQL query defined in PostHog, including filters, breakdowns, and time range.',
            },
            {
                title: 'Designed to be called over and over',
                description:
                    'Endpoints are intended to be called regularly by dashboards, with higher rate limits than standard API queries.',
            },
        ],
    },
    use_cases: {
        title: 'Use cases',
        handle: 'use_cases',
        headline: 'Build custom feeds',
        description:
            'Make recommendations or build sales enrichment tools. Endpoints work well for lists and summaries that need to update regularly.',
        icon: <IconTrends />,
        color: 'blue',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/create_endpoint_query_a7a9087c5a.png',
                alt: 'Create an endpoint',
                className: 'mx-4 @2xl:mx-0 @2xl:mt-8',
            },
        ],
        features: [
            {
                title: 'Predefined aggregate queries',
                description:
                    'Create endpoints for queries like "top selling products for this week" or "most active users".',
            },
            {
                title: 'Stable URLs your app can keep calling',
                description: 'Each endpoint has a consistent API URL that applications can call repeatedly.',
            },
            {
                title: 'Optional caching',
                description: 'Endpoints return cached results when available, avoiding unnecessary recomputation.',
            },
        ],
    },
    sql_endpoints: {
        title: 'SQL endpoints',
        handle: 'sql_endpoints',
        headline: 'Ship APIs without building a backend',
        description:
            'Expose the results of PostHog insights or SQL queries so applications can fetch them directly. Insights keep their existing configuration, while SQL queries can be materialized for scheduled execution and higher rate limits.',
        icon: <IconTerminal />,
        color: 'seagreen',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/create_endpoint_builder_66ff485fc4.png',
                alt: 'Create an endpoint',
            },
        ],
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
    web_app: {
        title: 'PostHog Web',
        headline: 'Build and monitor endpoints in the web app',
        description:
            'Create endpoints, test them in the playground, and watch usage and execution logs – all in PostHog.',
        icon: <IconLaptop />,
        color: 'blue',
        features: [
            {
                title: 'Create from SQL or insights',
                description: 'Start from a SQL query in the editor or a new or existing insight.',
            },
            {
                title: 'Test in the playground',
                description:
                    'Run the endpoint with real variable values and read the response before writing client code.',
            },
            {
                title: 'Versions, logs, and performance',
                description:
                    'Inspect versions, read execution logs, and tune materialization and data freshness on the Configuration tab.',
            },
        ],
    },
    api: {
        title: 'API',
        headline: 'Call a named route from your app',
        description:
            'Your app makes one authenticated request to a named route. PostHog runs the saved query and returns the rows – no query construction in client code.',
        icon: <IconBrackets />,
        color: 'seagreen',
        features: [
            {
                title: 'Parameterize the query',
                description: 'Pass variables so one endpoint serves many customers, date ranges, or breakdowns.',
            },
            {
                title: 'Pin to a version',
                description: "Target a specific version so a query change doesn't break a deployed client.",
            },
            {
                title: 'Generate a typed client',
                description:
                    'Each endpoint publishes an OpenAPI 3.0 spec you can feed to openapi-generator or @hey-api/openapi-ts.',
            },
        ],
    },
    desktop: {
        title: 'PostHog Desktop',
        headline: 'Build endpoints next to the code that calls them',
        description:
            'The agent has your repo, your endpoints, and PostHog endpoint skills in one place – create an endpoint and wire it into your app in the same session.',
        icon: <IconCode />,
        color: 'green',
        features: [
            {
                title: 'Build and consume in one pass',
                description: 'Create the endpoint, test it, then write the typed client code that calls it.',
            },
            {
                title: 'Audit and diagnose',
                description:
                    'Find unused endpoints, check pinned versions, and work through execution logs and materialization status.',
            },
            {
                title: 'Self-driving inbox',
                description: 'Endpoint failures land as signals you can read alongside the rest of your work.',
            },
        ],
    },
    /**
     * Capability bullets from contents/docs/endpoints/surfaces/mcp.mdx
     * ("What you can do here").
     */
    mcp: {
        title: 'MCP',
        headline: 'Manage endpoints from your editor',
        description: 'Create, run, version, and debug endpoints from Claude Code, Cursor, or any MCP-compatible agent.',
        icon: <IconPlug />,
        color: 'blue',
        features: [
            {
                title: 'Create and update endpoints',
                description:
                    'Create endpoints from a SQL or insight query, and list what already exists in the project.',
            },
            {
                title: 'Run with real variables',
                description:
                    'Execute an endpoint and read the rows back to check the response shape before writing client code.',
            },
            {
                title: 'Manage versions and logs',
                description:
                    'List saved versions with query snapshots, and read execution logs filtered by level, time range, or text.',
            },
            {
                title: 'Materialization and OpenAPI',
                description:
                    "Preview materialization, check status, ask for a rewrite when a query isn't eligible, and fetch an OpenAPI spec.",
            },
        ],
        children: <MCPInstall />,
    },
}

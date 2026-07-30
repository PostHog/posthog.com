import React from 'react'
import { IconDashboard, IconPlug, IconTerminal, IconTrends } from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'
import MCPInstall from 'components/Products/MCPInstall'

/**
 * Feature content lifted from the previous Slides-era `endpoints.tsx` features
 * array, plus MCP copy from `contents/docs/endpoints/surfaces/mcp.mdx`.
 * Do not invent blurbs here – fill gaps in the parent hook / menu stubs.
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
                title: 'Designed to be called over and over ',
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
                    'Create endpoints for queries like “top selling products for this week” or “most active users”.',
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
    /**
     * Capability bullets adapted from contents/docs/endpoints/surfaces/mcp.mdx
     * ("What you can do here") – not invented marketing copy.
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
                    'Preview materialization, check status, ask for a rewrite when a query isn’t eligible, and fetch an OpenAPI spec.',
            },
        ],
        children: <MCPInstall />,
    },
}

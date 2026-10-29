import React from 'react'
import { IconSearch, IconServer, IconStack, IconPlug } from '@posthog/icons'
import MCPInstall from 'components/Products/MCPInstall'

export const features = {
    queryable_logs: {
        title: 'Queryable logs',
        headline: 'Logs you can actually query',
        description:
            'Filter, aggregate, and explore logs by attributes instead of scrolling text. No need to learn another query language',
        icon: <IconSearch />,
        color: 'red',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/logs_1_light_40dd0d8b26.png',
                alt: 'Queryable logs',
            },
        ],
        features: [
            {
                title: 'Fast, reactive filtering',
                description: 'Slice by surface, severity, or attributes and see patterns update instantly',
            },
            {
                title: 'Visual feedback as you search',
                description: 'Sparklines respond in real time so spikes and anomalies stand out immediately',
            },
            {
                title: 'Attribute-driven navigation',
                description: 'Pivot the entire log view around IDs and attributes instead of scrolling line by line',
            },
        ],
    },
    opentelemetry: {
        title: 'Built on OpenTelemetry',
        headline: 'Built on OpenTelemetry',
        description: 'Built on the standard your team has already invested in',
        icon: <IconServer />,
        color: 'blue',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/logs_2_light_160af6be32.png',
                alt: 'Built on OpenTelemetry',
            },
        ],
        features: [
            {
                title: 'OTLP-compatible ingestion',
                description: 'Send logs using standard OpenTelemetry SDKs. No proprietary agents required.',
            },
            {
                title: 'No lock-in',
                description: 'No migration, no ripping out your existing setup. And no extra vendor to pay for.',
            },
            {
                title: 'Logs where your context already is',
                description:
                    'Logs behave like your typical log tool. Having them right inside PostHog just adds the missing context and removes the separate bill.',
            },
        ],
    },
    full_stack_context: {
        title: 'Full stack context',
        headline: 'Front end and back end context together',
        description: 'Follow an issue from the browser to the backend so agents can find the bug and ship the fix',
        icon: <IconStack />,
        color: 'green',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/logs_3_light_4a3138862f.png',
                alt: 'Full stack context',
            },
        ],
        features: [
            {
                title: 'Browser logs captured automatically',
                description:
                    'Frontend logs from PostHog JS are ingested alongside backend logs – no extra setup required',
            },
            {
                title: 'Linked to real users and sessions',
                description:
                    'Frontend log entries are automatically associated with user IDs and session replays. Click on the user ID when debugging and immediately watch the session replay.',
            },
            {
                title: 'One investigation, not four tools',
                description: 'Session replay, errors, analytics, and logs stay connected as you debug',
            },
        ],
    },
    // MCP copy reshaped from contents/docs/logs/surfaces/mcp.mdx ("What you can do here").
    mcp: {
        title: 'MCP',
        headline: 'Debug logs from your editor',
        description:
            'Let your coding agent query logs, mine patterns, and manage alerts from Cursor, Claude Code, VS Code, or any MCP-compatible agent.',
        icon: <IconPlug />,
        color: 'purple',
        features: [
            {
                title: 'Query and count logs',
                description:
                    'Filter by severity, service, time range, and free text, and pull counts or sparklines to see how a problem is trending.',
            },
            {
                title: "Discover what's available",
                description:
                    'List log attributes and their values, and list the services sending logs with their volume and error rate.',
            },
            {
                title: 'Mine and diff patterns',
                description:
                    'Group similar log lines into templates, and compare two time ranges to see which patterns are new or spiking.',
            },
            {
                title: 'Manage alerts',
                description:
                    'Create, read, update, and delete log alerts, attach destinations, and simulate a threshold against historical logs.',
            },
        ],
        children: <MCPInstall />,
    },
}

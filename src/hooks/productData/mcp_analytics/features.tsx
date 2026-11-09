import React from 'react'
import { IconPulse, IconPuzzle, IconRewindPlay, IconTarget, IconThoughtBubble } from '@posthog/icons'

/**
 * Top features for MCP Analytics. Copy comes from the reviewed copy draft and is checked against
 * contents/docs/mcp-analytics (events, intent, conversation-id, missing-capability). Backticks in a
 * string render as inline code (see `inlineCode` in ./slides). A feature's `images[0]` (light `src`,
 * dark `srcDark`) floats to the right of its carousel slide.
 */
export const features = {
    tool_calls: {
        title: 'MCP Dashboard',
        headline: 'Every tool call',
        description:
            'Each tool call becomes an event with response, duration, and errors. See exactly how many tool calls you run and which ones fail.',
        icon: <IconTarget />,
        color: 'blue',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/NEW_MCP_analytics_dashboard_light_ab100d9fb3.png',
                srcDark:
                    'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/NEW_MCP_analytics_dashboard_dark_44a5c6b92a.png',
                alt: 'MCP Analytics dashboard showing tool calls, error rates, and latency',
            },
        ],
        features: [
            {
                title: 'The call',
                description:
                    'Tool name and description, sanitized arguments and response, and duration in milliseconds',
            },
            {
                title: 'Clients',
                description: "Know who's calling with details on harness, user agent, and client name",
            },
            {
                title: 'Models',
                description: "Know which models are most used from client metadata or the agent's own report",
            },
            {
                title: 'Failures',
                description:
                    'Error type and message on every failed call, plus an `$exception` event so the tool shows up in Error tracking',
            },
        ],
    },
    intent: {
        title: 'Agent intent',
        headline: 'Agent intent',
        description:
            "We ask agents what they were trying to achieve. It's like a mini user interview to help you make better tools.",
        icon: <IconThoughtBubble />,
        color: 'seagreen',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/NEW_MCP_analytics_Agent_Intent_card_light_1680172b9f.png',
                srcDark:
                    'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/NEW_MCP_analytics_Agent_Intent_card_dark_759504e902.png',
                alt: 'Activity feed showing the intent an agent gave for each tool call',
            },
        ],
        features: [
            {
                title: 'Captured automatically',
                description: 'The SDK adds a context argument to tool schemas and saves the answer as `$mcp_intent`',
            },
            { title: 'Invisible to your code', description: 'The SDK removes the argument before your handler runs' },
            { title: 'Fallback', description: 'An intent callback fills in intent when an agent skips it' },
        ],
    },
    tool_quality: {
        title: 'Tool quality',
        headline: 'Errors and Latency',
        description:
            'Monitor error rates, call volume, and latency percentiles for each tool, next to the failed calls and their error details.',
        icon: <IconPulse />,
        color: 'red',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/NEW_MCP_analytics_Tool_quality_light_533c21dd9d.png',
                srcDark:
                    'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/NEW_MCP_analytics_Tool_quality_dark_cb1fba0d29.png',
                alt: 'Tool quality report with calls, error rate, and latency for each tool',
            },
        ],
        features: [
            { title: 'Health', description: 'Calls, error rate, and p50 and p95 latency for each tool' },
            { title: 'Failure groups', description: 'Errors sorted by type, with the exact messages in each group' },
            { title: 'Fix tasks', description: 'Create a fix task for a coding agent to open a pull request' },
        ],
    },
    sessions: {
        title: 'Sessions',
        headline: 'Sessions',
        description:
            "See the whole session, call by call. Conversation IDs keep calls from stateless servers together, so one task doesn't split into a dozen sessions.",
        icon: <IconRewindPlay />,
        color: 'yellow',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/NEW_MCP_analytics_Sessions_light_1_c792451020.png',
                srcDark:
                    'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/NEW_MCP_analytics_Sessions_dark_1_f86ef60006.png',
                alt: "A session showing an agent's tool calls in order",
            },
        ],
        features: [
            {
                title: 'Same context',
                description: 'Calls are grouped by user and conversation IDs, transport session and server session',
            },
            { title: 'Filter', description: 'By customer, client, or time window' },
            {
                title: 'Investigate',
                description: "Read a session call by call, or generate a summary of the agent's goal",
            },
        ],
    },
    missing_capabilities: {
        title: 'Missing capabilities',
        headline: 'Missing capabilities',
        description: 'Find out what agents wish they could do with your MCP through agent feedback.',
        icon: <IconPuzzle />,
        color: 'orange',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/NEW_MCP_analytics_Missing_capabilities_component_light_2c22cc73ba.png',
                srcDark:
                    'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/NEW_MCP_analytics_Missing_capabilities_component_dark_1ecca229f5.png',
                alt: "Missing capability reports with the agent's reasoning for each request",
            },
        ],
        features: [
            {
                title: 'get_more_tools',
                description: "An opt-in virtual tool that agents call when your tools can't do the job",
            },
            {
                title: 'Each report',
                description: "A `$mcp_missing_capability` event with the agent's reasoning, the client, and the person",
            },
            {
                title: "Your MCP server's roadmap",
                description: 'Use the insights captured to inform your team what to build next.',
            },
        ],
    },
}

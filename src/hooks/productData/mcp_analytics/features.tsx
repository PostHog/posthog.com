import React from 'react'
import { IconPlug, IconPulse, IconPuzzle, IconRewindPlay, IconTarget, IconThoughtBubble } from '@posthog/icons'

/**
 * Top features for MCP Analytics. Copy comes from the reviewed copy draft and is checked against
 * contents/docs/mcp-analytics (events, intent, conversation-id, missing-capability). Backticks in a
 * string render as inline code (see `inlineCode` in ./slides). Screenshots are intentionally left out
 * for now; add an `images` array to a feature when they exist.
 */
export const features = {
    tool_calls: {
        title: 'Every tool call',
        headline: 'Every tool call',
        description:
            'Each tool call becomes an event with response, duration, and errors. See exactly how many tool calls you run and which ones fail.',
        icon: <IconTarget />,
        color: 'blue',
        features: [
            {
                title: 'The call',
                description:
                    'Tool name and description, sanitized arguments and response, and duration in milliseconds',
            },
            {
                title: 'The caller',
                description:
                    'Client name and version, MCP protocol version, session, and the model when the client or agent reports it',
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
        headline: 'Tool quality',
        description:
            'Monitor error rates, call volume, and latency percentiles for each tool, next to the failed calls and their error details.',
        icon: <IconPulse />,
        color: 'red',
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
        description:
            "Agents self-report when a tool is missing, through the `get_more_tools` virtual tool. It's completely automated feedback that your users would never take the time to file.",
        icon: <IconPuzzle />,
        color: 'orange',
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
    clients_and_models: {
        title: 'Clients and models',
        headline: 'Clients and models',
        description:
            'Tell Claude Code, Claude Desktop, Cursor, Codex, and ChatGPT apart, and compare tool quality by model.',
        icon: <IconPlug />,
        color: 'purple',
        features: [
            {
                title: 'Clients',
                description: "Know who's calling with details on harness, user agent, and client name",
            },
            {
                title: 'Models',
                description: "Know which models are most used from client metadata or the agent's own report",
            },
        ],
    },
}

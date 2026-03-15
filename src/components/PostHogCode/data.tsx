import React from 'react'
import { IconChat, IconSparkles, IconGear, IconCode } from '@posthog/icons'
import { Section } from './types'
import Link from 'components/Link'

export const aboutSectionTypewriterSegments = [
    {
        type: 'text' as const,
        value: 'PostHog Code is an AI coding agent that understands your product. It connects directly to your PostHog instance through the ',
    },
    { type: 'node' as const, value: <Link to="/docs/model-context-protocol">Model Context Protocol (MCP)</Link> },
    {
        type: 'text' as const,
        value: ', giving it access to your analytics, session recordings, feature flags, and experiments while it writes code.\n\nThis means instead of context-switching between your analytics dashboard and your editor, you can ask PostHog Code to:\n\n• Query your product data while writing code – "Which pages have the highest bounce rate?" then fix them\n• Watch session recordings to understand bugs before fixing them\n• Create and manage feature flags directly from your coding session\n• Set up experiments with proper instrumentation baked in\n• Build dashboards to track the impact of your changes\n\nIt works with Claude Code, Cursor, Windsurf, and any editor that supports MCP. Your data never leaves PostHog – the agent queries it in real time through our API.',
    },
]

export const sections: Section[] = [
    {
        id: 'about',
        title: 'What is PostHog Code?',
        icon: IconChat,
        conversation: [
            { type: 'user', content: 'What is PostHog Code?' },
            { type: 'tool', toolName: 'Read', toolDetail: 'docs/posthog-code/overview.md' },
            { type: 'tool', toolName: 'Grep', toolDetail: '"PostHog MCP" src/' },
            {
                type: 'think',
                content:
                    'The user wants to understand what PostHog Code is. Let me explain the product, its key value proposition, and how it connects to PostHog data...',
            },
            {
                type: 'agent',
                content: (
                    <>
                        <p className="m-0 mb-2">
                            PostHog Code is an AI coding agent that understands your product. It connects directly to
                            your PostHog instance through the{' '}
                            <Link to="/docs/model-context-protocol">Model Context Protocol (MCP)</Link>, giving it
                            access to your analytics, session recordings, feature flags, and experiments while it writes
                            code.
                        </p>
                        <p className="m-0 mb-2">
                            This means instead of context-switching between your analytics dashboard and your editor,
                            you can ask PostHog Code to:
                        </p>
                        <ul className="m-0 mb-2 pl-4 list-disc">
                            <li>
                                Query your product data while writing code – &quot;Which pages have the highest bounce
                                rate?&quot; then fix them
                            </li>
                            <li>Watch session recordings to understand bugs before fixing them</li>
                            <li>Create and manage feature flags directly from your coding session</li>
                            <li>Set up experiments with proper instrumentation baked in</li>
                            <li>Build dashboards to track the impact of your changes</li>
                        </ul>
                        <p className="m-0">
                            It works with Claude Code, Cursor, Windsurf, and any editor that supports MCP. Your data
                            never leaves PostHog – the agent queries it in real time through our API.
                        </p>
                    </>
                ),
            },
        ],
    },
    {
        id: 'features',
        title: 'Features',
        icon: IconSparkles,
        conversation: [
            { type: 'user', content: 'Show me what PostHog Code can do.' },
            {
                type: 'tool',
                toolName: 'PostHog',
                toolDetail:
                    'execute-sql: SELECT event, count() FROM events WHERE timestamp > now() - INTERVAL 7 DAY GROUP BY event ORDER BY count() DESC LIMIT 10',
            },
            {
                type: 'agent',
                content: (
                    <>
                        <p className="m-0 mb-2 font-semibold">Here are the key things PostHog Code can do for you:</p>
                        <p className="m-0 mb-2">
                            <strong>Query analytics in natural language</strong> – Ask questions about your product data
                            and get SQL queries executed against your PostHog instance. &quot;What&apos;s our signup
                            conversion rate this week?&quot; becomes a real query with real results, not a
                            hallucination.
                        </p>
                    </>
                ),
            },
            { type: 'user', content: 'What about session recordings?' },
            { type: 'tool', toolName: 'PostHog', toolDetail: 'list-errors: limit=5' },
            {
                type: 'agent',
                content: (
                    <>
                        <p className="m-0 mb-2">
                            <strong>Debug with session recordings</strong> – PostHog Code can find session recordings
                            where users hit errors, rage-clicked, or dropped off. Instead of guessing what went wrong,
                            you see exactly what happened – then fix it in the same session.
                        </p>
                        <p className="m-0 mb-2">
                            <strong>Manage feature flags</strong> – Create, update, and roll out feature flags without
                            leaving your editor. PostHog Code understands your flag configuration and can instrument new
                            flags directly in your code with the right SDK calls.
                        </p>
                        <p className="m-0 mb-2">
                            <strong>Run experiments</strong> – Set up A/B tests with proper statistical rigor. PostHog
                            Code creates the experiment in PostHog, adds the feature flag, instruments your code, and
                            sets up the right metrics to track – all in one conversation.
                        </p>
                        <p className="m-0">
                            <strong>Build and update dashboards</strong> – After shipping a change, create a dashboard
                            to monitor its impact. PostHog Code knows your event taxonomy and can build insights that
                            actually match your data.
                        </p>
                    </>
                ),
            },
        ],
    },
    {
        id: 'how-it-works',
        title: 'How it works',
        icon: IconGear,
        conversation: [
            { type: 'user', content: 'How does PostHog Code connect to my data?' },
            { type: 'tool', toolName: 'Read', toolDetail: 'posthog-mcp/src/server.ts' },
            { type: 'tool', toolName: 'Read', toolDetail: 'posthog-mcp/src/tools/index.ts' },
            {
                type: 'think',
                content:
                    'The user wants to understand the technical architecture. I should explain MCP, how the server connects to PostHog, and what data flows where...',
            },
            {
                type: 'agent',
                content: (
                    <>
                        <p className="m-0 mb-2">
                            PostHog Code uses the Model Context Protocol (MCP) – an open standard that lets AI agents
                            connect to external tools and data sources. Here&apos;s how it works:
                        </p>
                        <p className="m-0 mb-2">
                            <strong>1. MCP server runs locally</strong> – When you start a coding session, an MCP server
                            runs on your machine. It authenticates with your PostHog instance using a personal API key.
                            No data is stored or cached – every query is made in real time.
                        </p>
                        <p className="m-0 mb-2">
                            <strong>2. Tools are exposed to the agent</strong> – The MCP server exposes a set of tools
                            the agent can call: execute-sql, insight-query, list-errors, create-feature-flag,
                            experiment-create, and more. The agent decides which tools to call based on your request.
                        </p>
                        <p className="m-0 mb-2">
                            <strong>3. Data stays in PostHog</strong> – Your product data never leaves PostHog&apos;s
                            infrastructure. The MCP server sends API requests to PostHog and returns structured results
                            to the agent. The agent sees aggregated data and query results, not raw user data.
                        </p>
                        <p className="m-0">
                            <strong>4. Works with any MCP-compatible editor</strong> – Claude Code, Cursor, Windsurf, VS
                            Code with Copilot – any editor that supports MCP can use PostHog Code. The same tools and
                            data access work across all of them.
                        </p>
                    </>
                ),
            },
        ],
    },
    {
        id: 'getting-started',
        title: 'Getting started',
        icon: IconCode,
        conversation: [
            { type: 'user', content: 'How do I set up PostHog Code?' },
            {
                type: 'tool',
                toolName: 'Bash',
                toolDetail: 'npx posthog-mcp@latest init',
                expanded: (
                    <pre className="m-0 p-3 text-sm font-code text-secondary overflow-x-auto whitespace-pre-wrap">
                        {`PostHog MCP Server v1.0.0

? PostHog host: https://us.posthog.com
? Personal API key: phx_**********************
? Default project ID: 12345

✓ Configuration saved to .posthog-mcp.json
✓ MCP server config added to .claude/settings.json

Ready! Start a Claude Code session and ask about your product data.`}
                    </pre>
                ),
            },
            {
                type: 'agent',
                content: (
                    <>
                        <p className="m-0 mb-2 font-semibold">Getting started takes about 2 minutes:</p>
                        <p className="m-0 mb-2">
                            <strong>Step 1: Install the MCP server</strong> – Run{' '}
                            <code>npx posthog-mcp@latest init</code> in your project directory. It will prompt you for
                            your PostHog host, personal API key, and project ID.
                        </p>
                        <p className="m-0 mb-2">
                            <strong>Step 2: Get your API key</strong> – Go to{' '}
                            <Link to="/docs/model-context-protocol">PostHog Settings → Personal API Keys</Link> and
                            create a new key. Give it read access to the data you want the agent to query.
                        </p>
                        <p className="m-0 mb-2">
                            <strong>Step 3: Start coding</strong> – Open your editor and start a session. Ask something
                            like &quot;What are the most common errors this week?&quot; and PostHog Code will query your
                            data and help you fix them.
                        </p>
                        <p className="m-0">
                            For detailed setup instructions for each editor, see the{' '}
                            <Link to="/docs/model-context-protocol">MCP documentation</Link>.
                        </p>
                    </>
                ),
            },
        ],
    },
]

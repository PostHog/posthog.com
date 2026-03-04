import React from 'react'
import { IconChat, IconSparkles, IconGear, IconQuestion, IconCode } from '@posthog/icons'
import { Section } from './types'
import Link from 'components/Link'

export const sections: Section[] = [
    {
        id: 'about',
        title: 'What is PostHog Code?',
        icon: IconChat,
        conversation: [
            {
                type: 'user',
                content: 'What is PostHog Code?',
            },
            {
                type: 'tool',
                toolName: 'Read',
                toolDetail: 'docs/posthog-code/overview.md',
            },
            {
                type: 'tool',
                toolName: 'Grep',
                toolDetail: '"PostHog MCP" src/',
            },
            {
                type: 'think',
                content:
                    'The user wants to understand what PostHog Code is. Let me explain the product, its key value proposition, and how it connects to PostHog data...',
            },
            {
                type: 'agent',
                content: (
                    <>
                        <p>
                            <strong>PostHog Code</strong> is an AI coding agent that understands your product. It
                            connects directly to your PostHog instance through the{' '}
                            <Link to="/docs/model-context-protocol">Model Context Protocol (MCP)</Link>, giving it
                            access to your analytics, session recordings, feature flags, and experiments while it writes
                            code.
                        </p>
                        <p>
                            This means instead of context-switching between your analytics dashboard and your editor,
                            you can ask PostHog Code to:
                        </p>
                        <ul>
                            <li>
                                <strong>Query your product data</strong> while writing code &mdash; "Which pages have
                                the highest bounce rate?" then fix them
                            </li>
                            <li>
                                <strong>Watch session recordings</strong> to understand bugs before fixing them
                            </li>
                            <li>
                                <strong>Create and manage feature flags</strong> directly from your coding session
                            </li>
                            <li>
                                <strong>Set up experiments</strong> with proper instrumentation baked in
                            </li>
                            <li>
                                <strong>Build dashboards</strong> to track the impact of your changes
                            </li>
                        </ul>
                        <p>
                            It works with Claude Code, Cursor, Windsurf, and any editor that supports MCP. Your data
                            never leaves PostHog &mdash; the agent queries it in real time through our API.
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
            {
                type: 'user',
                content: 'Show me what PostHog Code can do.',
            },
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
                        <p>Here are the key things PostHog Code can do for you:</p>

                        <p>
                            <strong>Query analytics in natural language</strong>
                        </p>
                        <p>
                            Ask questions about your product data and get SQL queries executed against your PostHog
                            instance. "What's our signup conversion rate this week?" becomes a real query with real
                            results, not a hallucination.
                        </p>
                    </>
                ),
            },
            {
                type: 'user',
                content: 'What about session recordings?',
            },
            {
                type: 'tool',
                toolName: 'PostHog',
                toolDetail: 'list-errors: limit=5',
            },
            {
                type: 'agent',
                content: (
                    <>
                        <p>
                            <strong>Debug with session recordings</strong>
                        </p>
                        <p>
                            PostHog Code can find session recordings where users hit errors, rage-clicked, or dropped
                            off. Instead of guessing what went wrong, you see exactly what happened &mdash; then fix it
                            in the same session.
                        </p>

                        <p>
                            <strong>Manage feature flags</strong>
                        </p>
                        <p>
                            Create, update, and roll out feature flags without leaving your editor. PostHog Code
                            understands your flag configuration and can instrument new flags directly in your code with
                            the right SDK calls.
                        </p>

                        <p>
                            <strong>Run experiments</strong>
                        </p>
                        <p>
                            Set up A/B tests with proper statistical rigor. PostHog Code creates the experiment in
                            PostHog, adds the feature flag, instruments your code, and sets up the right metrics to
                            track &mdash; all in one conversation.
                        </p>

                        <p>
                            <strong>Build and update dashboards</strong>
                        </p>
                        <p>
                            After shipping a change, create a dashboard to monitor its impact. PostHog Code knows your
                            event taxonomy and can build insights that actually match your data.
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
            {
                type: 'user',
                content: 'How does PostHog Code connect to my data?',
            },
            {
                type: 'tool',
                toolName: 'Read',
                toolDetail: 'posthog-mcp/src/server.ts',
            },
            {
                type: 'tool',
                toolName: 'Read',
                toolDetail: 'posthog-mcp/src/tools/index.ts',
            },
            {
                type: 'think',
                content:
                    'The user wants to understand the technical architecture. I should explain MCP, how the server connects to PostHog, and what data flows where...',
            },
            {
                type: 'agent',
                content: (
                    <>
                        <p>
                            PostHog Code uses the <strong>Model Context Protocol (MCP)</strong> &mdash; an open standard
                            that lets AI agents connect to external tools and data sources. Here's how it works:
                        </p>

                        <p>
                            <strong>1. MCP server runs locally</strong>
                        </p>
                        <p>
                            When you start a coding session, an MCP server runs on your machine. It authenticates with
                            your PostHog instance using a personal API key. No data is stored or cached &mdash; every
                            query is made in real time.
                        </p>

                        <p>
                            <strong>2. Tools are exposed to the agent</strong>
                        </p>
                        <p>
                            The MCP server exposes a set of tools the agent can call: <code>execute-sql</code>,{' '}
                            <code>insight-query</code>, <code>list-errors</code>, <code>create-feature-flag</code>,{' '}
                            <code>experiment-create</code>, and more. The agent decides which tools to call based on
                            your request.
                        </p>

                        <p>
                            <strong>3. Data stays in PostHog</strong>
                        </p>
                        <p>
                            Your product data never leaves PostHog's infrastructure. The MCP server sends API requests
                            to PostHog and returns structured results to the agent. The agent sees aggregated data and
                            query results, not raw user data.
                        </p>

                        <p>
                            <strong>4. Works with any MCP-compatible editor</strong>
                        </p>
                        <p>
                            Claude Code, Cursor, Windsurf, VS Code with Copilot &mdash; any editor that supports MCP can
                            use PostHog Code. The same tools and data access work across all of them.
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
            {
                type: 'user',
                content: 'How do I set up PostHog Code?',
            },
            {
                type: 'tool',
                toolName: 'Bash',
                toolDetail: 'npx posthog-mcp@latest init',
                expanded: (
                    <pre className="text-xs font-code text-secondary p-3 whitespace-pre-wrap">
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
                        <p>Getting started takes about 2 minutes:</p>

                        <p>
                            <strong>Step 1: Install the MCP server</strong>
                        </p>
                        <p>
                            Run <code>npx posthog-mcp@latest init</code> in your project directory. It will prompt you
                            for your PostHog host, personal API key, and project ID.
                        </p>

                        <p>
                            <strong>Step 2: Get your API key</strong>
                        </p>
                        <p>
                            Go to{' '}
                            <Link to="https://us.posthog.com/settings/user-api-keys">
                                PostHog Settings &rarr; Personal API Keys
                            </Link>{' '}
                            and create a new key. Give it read access to the data you want the agent to query.
                        </p>

                        <p>
                            <strong>Step 3: Start coding</strong>
                        </p>
                        <p>
                            Open your editor and start a session. Ask something like "What are the most common errors
                            this week?" and PostHog Code will query your data and help you fix them.
                        </p>

                        <p>
                            For detailed setup instructions for each editor, see the{' '}
                            <Link to="/docs/model-context-protocol">MCP documentation</Link>.
                        </p>
                    </>
                ),
            },
        ],
    },
    {
        id: 'faq',
        title: 'FAQs',
        icon: IconQuestion,
        conversation: [
            {
                type: 'user',
                content: 'Is my data safe?',
            },
            {
                type: 'agent',
                content: (
                    <>
                        <p>
                            Yes. PostHog Code queries your data through the PostHog API using your personal API key.
                            Data is never stored, cached, or sent anywhere other than to PostHog's servers. The MCP
                            server runs locally on your machine, and you control exactly what the agent can access
                            through your API key's permissions.
                        </p>
                    </>
                ),
            },
            {
                type: 'user',
                content: 'What AI models does it work with?',
            },
            {
                type: 'agent',
                content: (
                    <>
                        <p>PostHog Code works with any MCP-compatible AI coding agent. Currently supported:</p>
                        <ul>
                            <li>
                                <strong>Claude Code</strong> &mdash; Anthropic's CLI agent
                            </li>
                            <li>
                                <strong>Cursor</strong> &mdash; AI-native code editor
                            </li>
                            <li>
                                <strong>Windsurf</strong> &mdash; Codeium's AI IDE
                            </li>
                            <li>
                                <strong>VS Code + Copilot</strong> &mdash; with MCP extension
                            </li>
                        </ul>
                        <p>The MCP standard is growing fast, so more editors will be supported over time.</p>
                    </>
                ),
            },
            {
                type: 'user',
                content: 'How much does it cost?',
            },
            {
                type: 'agent',
                content: (
                    <>
                        <p>
                            The PostHog MCP server is <strong>free and open source</strong>. You just need a PostHog
                            account (the generous free tier works) and an API key from your AI provider.
                        </p>
                        <p>
                            PostHog Code reads from your existing PostHog data, so you only pay for the PostHog products
                            you already use. There's no additional charge for MCP access.
                        </p>
                    </>
                ),
            },
            {
                type: 'user',
                content: 'Can it modify my PostHog configuration?',
            },
            {
                type: 'agent',
                content: (
                    <>
                        <p>
                            PostHog Code can both read and write to PostHog, depending on your API key permissions. It
                            can create feature flags, set up experiments, build dashboards, and define actions. Every
                            write operation requires explicit approval from the agent's permission system &mdash;
                            nothing happens without your confirmation.
                        </p>
                    </>
                ),
            },
        ],
    },
]

import React from 'react'
import AgentPromptsPage from 'components/Learn/AgentPromptsPage'
import { ERROR_TRACKING_PROMPTS } from 'components/Learn/learnPrompts'

const mcpTools = [
    { tool: 'query-error-tracking-issues-list', use: 'Listing, filtering, and sorting issues' },
    {
        tool: 'query-error-tracking-issue',
        use: "One issue's details and impact, including the pages and browsers it happens on",
    },
    { tool: 'query-error-tracking-issue-events', use: 'Sample exceptions, with stack traces and session IDs' },
    { tool: 'query-session-recordings-list', use: 'The session replays for those session IDs' },
    { tool: 'execute-sql', use: 'Joining exceptions to people, accounts, sessions, and synced sources' },
    { tool: 'read-data-schema', use: 'Checking which events and properties exist before it queries' },
    { tool: 'metric-list', use: 'Finding governed metrics, like MRR, in your semantic layer' },
]

export default function ErrorTrackingAgentTeaching(): JSX.Element {
    return (
        <AgentPromptsPage {...ERROR_TRACKING_PROMPTS}>
            <section className="min-w-0 border-t border-primary pt-6">
                <h2 className="mt-0 mb-4 text-xl font-semibold">Available MCP tools</h2>
                <p className="mt-0 mb-2 leading-relaxed">You can query exceptions using these MCP tools:</p>
                <ul className="m-0 space-y-2 pl-5 marker:text-primary [&>li]:!list-disc">
                    {mcpTools.map(({ tool, use }) => (
                        <li key={tool}>
                            <code>{tool}</code>: {use}
                        </li>
                    ))}
                </ul>
            </section>
        </AgentPromptsPage>
    )
}

import React from 'react'
import AgentPromptsPage from 'components/PocketGuides/AgentPromptsPage'

const chapterPrompts = [
    {
        title: 'Capture exceptions',
        prompt: `Teach me PostHog Error Tracking using the exceptions in my app. Explain how exceptions become issues, and how grouping and source maps decide what I see. Help me check that my exceptions reach PostHog with readable stack traces, and fix any issues that are grouped wrong.`,
    },
    {
        title: 'Query and measure impact',
        prompt: `Teach me how to query PostHog exceptions alongside the rest of my data. Explain the keys that join an exception to people, sessions, and accounts. Help me find which issues hit my most valuable accounts, and which ones stop people from finishing what they started.`,
    },
    {
        title: 'Triage, alerts, and scouts',
        prompt: `Teach me how to automate PostHog Error Tracking. Explain assignment rules, alerts, and the scouts that report on errors. Help me route issues to the team that owns each part of my code, alert on regressions and spikes, and turn on the error scouts.`,
    },
]

export default function ErrorTrackingAgentTeaching(): JSX.Element {
    return (
        <AgentPromptsPage
            productHandle="error_tracking"
            productName="Error Tracking"
            docsSlug="error-tracking"
            focus="issues, grouping, queries, and alerts"
            chapterPrompts={chapterPrompts}
        />
    )
}

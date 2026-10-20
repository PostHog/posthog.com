import React from 'react'
import AgentPromptsPage from 'components/PocketGuides/AgentPromptsPage'

const chapterPrompts = [
    {
        title: 'Recording setup',
        prompt: `Teach me PostHog Session Replay setup using my product. Explain what a replay records and how the player rebuilds it. Help me decide which sessions to record with sampling, minimum duration, and triggers, and estimate how many recordings my settings would keep.`,
    },
    {
        title: 'Finding and watching replays',
        prompt: `Teach me how to find and watch the right replay in PostHog using a real problem in my product. Explain how to filter recordings by events, properties, and people, and how the player connects the event stream, console logs, and network requests. Help me find a session that explains the problem.`,
    },
]

export default function SessionReplayAgentTeaching(): JSX.Element {
    return (
        <AgentPromptsPage
            productHandle="session_replay"
            productName="Session Replay"
            docsSlug="session-replay"
            focus="recording settings, masking, replays, and gaps"
            chapterPrompts={chapterPrompts}
        />
    )
}

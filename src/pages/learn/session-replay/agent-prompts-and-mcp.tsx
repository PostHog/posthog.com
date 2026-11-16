import React from 'react'
import AgentPromptsPage from 'components/Learn/AgentPromptsPage'
import { SESSION_REPLAY_PROMPTS } from 'components/Learn/learnPrompts'

export default function SessionReplayAgentTeaching(): JSX.Element {
    return <AgentPromptsPage {...SESSION_REPLAY_PROMPTS} />
}

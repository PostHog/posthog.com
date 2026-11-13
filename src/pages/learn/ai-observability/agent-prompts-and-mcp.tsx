import React from 'react'
import AgentPromptsPage from 'components/Learn/AgentPromptsPage'
import { AI_OBSERVABILITY_PROMPTS } from 'components/Learn/learnPrompts'

export default function AiObservabilityAgentTeaching(): JSX.Element {
    return <AgentPromptsPage {...AI_OBSERVABILITY_PROMPTS} />
}

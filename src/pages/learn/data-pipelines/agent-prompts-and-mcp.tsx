import React from 'react'
import AgentPromptsPage from 'components/Learn/AgentPromptsPage'
import { DATA_PIPELINES_PROMPTS } from 'components/Learn/learnPrompts'

export default function DataPipelinesAgentTeaching(): JSX.Element {
    return <AgentPromptsPage {...DATA_PIPELINES_PROMPTS} />
}

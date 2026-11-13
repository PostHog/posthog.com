import React from 'react'
import AgentPromptsPage from 'components/Learn/AgentPromptsPage'
import { FEATURE_FLAGS_PROMPTS } from 'components/Learn/learnPrompts'

export default function FeatureFlagsAgentTeaching(): JSX.Element {
    return <AgentPromptsPage {...FEATURE_FLAGS_PROMPTS} />
}

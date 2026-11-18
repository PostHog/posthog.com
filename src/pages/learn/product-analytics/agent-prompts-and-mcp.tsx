import React from 'react'
import AgentPromptsPage from 'components/Learn/AgentPromptsPage'
import { PRODUCT_ANALYTICS_PROMPTS } from 'components/Learn/learnPrompts'

export default function ProductAnalyticsAgentTeaching(): JSX.Element {
    return <AgentPromptsPage {...PRODUCT_ANALYTICS_PROMPTS} />
}

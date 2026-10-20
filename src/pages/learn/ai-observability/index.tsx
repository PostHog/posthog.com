import React from 'react'

import LearnLanding from 'components/PocketGuides/LearnLanding'
import LearnPage from 'components/PocketGuides/LearnPage'

export default function AiObservabilityLearn(): JSX.Element {
    return (
        <LearnPage
            productHandle="ai_observability"
            title="Learn AI Observability – PostHog"
            description="Learn to trace your LLM calls, understand their cost, and evaluate whether the outputs give users what they need."
            landing={LearnLanding}
        />
    )
}

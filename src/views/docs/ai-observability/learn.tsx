import React from 'react'

import LearnPage from 'components/PocketGuides/LearnPage'

export default function AIObservabilityLearn(): JSX.Element {
    return (
        <LearnPage
            productHandle="ai_observability"
            title="Learn AI Observability – PostHog"
            description="Tracing every LLM call, scoring what comes back, and seeing what users do with it."
        />
    )
}

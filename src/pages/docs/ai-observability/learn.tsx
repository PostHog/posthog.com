import React from 'react'

import LearnPage from 'components/PocketGuides/LearnPage'

/** The Learn index: the volume's front matter. Chapters live at `learn/<chapter>`. */
export default function AIObservabilityLearn(): JSX.Element {
    return (
        <LearnPage
            productHandle="ai_observability"
            title="Learn AI Observability – PostHog"
            description="Tracing every LLM call, scoring what comes back, and seeing what users do with it."
        />
    )
}

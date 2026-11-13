import React from 'react'
import LearnPage from 'components/Learn/LearnPage'
import EvalsPlayground from 'components/Learn/EvalsPlayground'

export default function AiObservabilityEvalsPlayground(): JSX.Element {
    return (
        <LearnPage
            productHandle="ai_observability"
            title="AI evaluations, explained side by side – AI Observability – PostHog"
            description="Compare offline AI tests on your local machine or CI with online evaluations in PostHog. One interactive workflow, side by side."
        >
            <EvalsPlayground />
        </LearnPage>
    )
}

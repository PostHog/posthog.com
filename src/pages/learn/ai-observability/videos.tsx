import React from 'react'
import LearnVideosPage from 'components/Learn/LearnVideosPage'

export default function AiObservabilityVideos(): JSX.Element {
    return (
        <LearnVideosPage
            productHandle="ai_observability"
            productName="AI Observability"
            intro="Each lesson covers a real problem in one of Twig's AI features and solves it in PostHog, step by step."
        />
    )
}

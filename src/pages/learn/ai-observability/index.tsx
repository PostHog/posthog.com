import React from 'react'

import LearnLanding from 'components/Learn/LearnLanding'
import { TwigTripTracesFigure } from 'components/Learn/TwigExhibits/AiObservabilityPlaygroundExhibits'
import LearnPage from 'components/Learn/LearnPage'
import type { LearnLandingProps } from 'components/Learn/LearnPage'

const Landing = (props: LearnLandingProps): JSX.Element => (
    <LearnLanding {...props} playground={{ figure: <TwigTripTracesFigure /> }} />
)

export default function AiObservabilityLearn(): JSX.Element {
    return (
        <LearnPage
            productHandle="ai_observability"
            title="Learn AI Observability – PostHog"
            description="Learn to trace your LLM calls, understand their cost, and evaluate whether the outputs give users what they need."
            landing={Landing}
        />
    )
}

import React from 'react'
import { useLocation } from '@reach/router'

import LearnPage from 'components/PocketGuides/LearnPage'

const BASE = '/docs/ai-observability/learn'

/** Client-only; the indexed copy is /pocket-guides. */
export default function AIObservabilityLearnChapter(): JSX.Element {
    const location = useLocation()
    const chapter = (location?.pathname || '').replace(/\/$/, '').slice(BASE.length).replace(/^\//, '')

    return (
        <LearnPage
            productHandle="ai_observability"
            chapter={chapter}
            title="Learn AI Observability – PostHog"
            description="Tracing every LLM call, scoring what comes back, and seeing what users do with it."
        />
    )
}

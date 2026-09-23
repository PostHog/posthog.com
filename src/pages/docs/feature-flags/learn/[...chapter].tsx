import React from 'react'
import { useLocation } from '@reach/router'

import LearnPage from 'components/PocketGuides/LearnPage'

const BASE = '/docs/feature-flags/learn'

/** Client-only; the indexed copy is /pocket-guides. */
export default function FeatureFlagsLearnChapter(): JSX.Element {
    const location = useLocation()
    const chapter = (location?.pathname || '').replace(/\/$/, '').slice(BASE.length).replace(/^\//, '')

    return (
        <LearnPage
            productHandle="feature_flags"
            chapter={chapter}
            title="Learn Feature Flags – PostHog"
            description="Ship code turned off, then decide from PostHog who gets it – and turn it back off in seconds."
        />
    )
}

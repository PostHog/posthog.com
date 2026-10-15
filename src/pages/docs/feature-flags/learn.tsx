import React from 'react'

import LearnPage from 'components/PocketGuides/LearnPage'

export default function FeatureFlagsLearn(): JSX.Element {
    return (
        <LearnPage
            productHandle="feature_flags"
            title="Learn Feature Flags – PostHog"
            description="Ship code turned off, then decide from PostHog who gets it – and turn it back off in seconds."
        />
    )
}

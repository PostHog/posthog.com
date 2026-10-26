import React from 'react'

import LearnLanding from 'components/PocketGuides/LearnLanding'
import LearnPage from 'components/PocketGuides/LearnPage'

export default function FeatureFlagsLearn(): JSX.Element {
    return (
        <LearnPage
            productHandle="feature_flags"
            title="Learn Feature Flags – PostHog"
            description="Learn to check a flag in code, roll it out a few people at a time, switch it off when something breaks, and remove it once it has done its job."
            landing={LearnLanding}
        />
    )
}

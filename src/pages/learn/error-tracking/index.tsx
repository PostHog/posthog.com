import React from 'react'

import LearnLanding from 'components/PocketGuides/LearnLanding'
import LearnPage from 'components/PocketGuides/LearnPage'

export default function ErrorTrackingLearn(): JSX.Element {
    return (
        <LearnPage
            productHandle="error_tracking"
            title="Learn Error Tracking – PostHog"
            description="Learn to group exceptions into issues, read stack traces, query exceptions alongside the rest of your data, and let scouts and agents handle the fixes."
            landing={LearnLanding}
        />
    )
}

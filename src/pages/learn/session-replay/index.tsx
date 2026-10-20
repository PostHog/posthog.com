import React from 'react'

import LearnLanding from 'components/PocketGuides/LearnLanding'
import LearnPage from 'components/PocketGuides/LearnPage'

export default function SessionReplayLearn(): JSX.Element {
    return (
        <LearnPage
            productHandle="session_replay"
            title="Learn Session Replay – PostHog"
            description="Learn to set up recordings, protect user privacy, find the sessions that matter, and investigate what happened."
            landing={LearnLanding}
        />
    )
}

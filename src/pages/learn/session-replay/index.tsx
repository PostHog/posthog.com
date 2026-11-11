import React from 'react'

import LearnLanding from 'components/Learn/LearnLanding'
import { SessionReplayLinkFigure } from 'components/Learn/TwigExhibits/ProductAnalyticsIdentityExhibits'
import LearnPage from 'components/Learn/LearnPage'
import type { LearnLandingProps } from 'components/Learn/LearnPage'

const Landing = (props: LearnLandingProps): JSX.Element => (
    <LearnLanding {...props} playground={{ figure: <SessionReplayLinkFigure />, fullWidth: true }} />
)

export default function SessionReplayLearn(): JSX.Element {
    return (
        <LearnPage
            productHandle="session_replay"
            title="Learn Session Replay – PostHog"
            description="Learn to set up recordings, protect user privacy, find the sessions that matter, and investigate what happened."
            landing={Landing}
        />
    )
}

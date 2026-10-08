import React from 'react'
import { useLocation } from '@reach/router'

import LearnPage from 'components/PocketGuides/LearnPage'

const BASE = '/docs/session-replay/learn'

/** Client-only; the indexed copy is /pocket-guides. */
export default function SessionReplayLearnChapter(): JSX.Element {
    const location = useLocation()
    const chapter = (location?.pathname || '').replace(/\/$/, '').slice(BASE.length).replace(/^\//, '')

    return (
        <LearnPage
            productHandle="session_replay"
            chapter={chapter}
            title="Learn Session Replay – PostHog"
            description="Watch how people actually use your product – or let Replay Vision watch it for you."
        />
    )
}

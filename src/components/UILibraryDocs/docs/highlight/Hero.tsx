import React from 'react'
import { Highlight } from 'components/UI/Highlight'
import { Underline } from 'components/UI/Underline'

export default function Hero(): JSX.Element {
    return (
        <p className="!m-0 max-w-[42ch] text-balance @xl:text-wrap text-[17px]">
            PostHog ingests and stores your <Highlight>analytics, errors, replays, and business data</Highlight> so you
            and your <Underline delay={900}>agents</Underline> can query and act on it.
        </p>
    )
}

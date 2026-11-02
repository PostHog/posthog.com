import React, { useEffect, useState } from 'react'
import Link from 'components/Link'

import Callout from './Callout'

// TODO: Remove this file and its uses in LearnSurface.tsx and ProductAnalyticsLearnLanding.tsx after the Product Book Club (Nov 4, 2026).
const EVENT_URL = 'https://discord.gg/posthog?event=1562955389635526777'
// The event runs 18:30-20:00 UTC; the callout hides itself once it ends.
const EVENT_ENDS_AT = Date.parse('2026-11-04T20:00:00Z')

/** Promotes the Product Book Club on the Product Analytics pocket guide pages and the Learn hub. */
export default function BookClubCallout(): JSX.Element | null {
    // Check the clock after mount, so the first client render matches the prebuilt HTML.
    const [expired, setExpired] = useState(false)
    useEffect(() => setExpired(Date.now() >= EVENT_ENDS_AT), [])

    if (expired) return null

    return (
        <Callout to={EVENT_URL} label="Join the event">
            <strong className="text-primary">We have a book club. Yes, really.</strong> Wed Nov 4, 1:30pm ET on Discord.
            We'll read through the{' '}
            <Link to="/learn/product-analytics/pocket-guide">Product Analytics Pocket Guide</Link> together, then set it
            up on Twig so you can watch it work on a real product.
        </Callout>
    )
}

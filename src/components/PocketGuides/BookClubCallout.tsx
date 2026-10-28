import React from 'react'

import Callout from './Callout'

// TODO: Remove this file and its use in LearnSurface.tsx after the Product Book Club (Nov 4, 2026).
const EVENT_URL = 'https://discord.gg/posthog?event=1562955389635526777'
// The event runs 18:30-20:00 UTC; the callout hides itself once it ends.
const EVENT_ENDS_AT = Date.parse('2026-11-04T20:00:00Z')

/** Promotes the Product Book Club on every page of the Product Analytics pocket guide. */
export default function BookClubCallout(): JSX.Element | null {
    if (Date.now() >= EVENT_ENDS_AT) return null

    return (
        <Callout to={EVENT_URL} label="Join the event">
            <strong className="text-primary">We have a book club. Yes, really.</strong> Wed Nov 4, 1:30pm ET on Discord.
            We'll read through the Product Analytics Pocket Guide together, then set it up on Twig so you can watch it
            work on a real product.
        </Callout>
    )
}

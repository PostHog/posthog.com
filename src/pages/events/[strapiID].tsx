import React from 'react'
import { PageProps } from 'gatsby'
import SEO from 'components/seo'
import { EventsContent } from '../events'

export default function ClientSideEventPage({ params }: PageProps) {
    const strapiID = parseInt(params.strapiID || params['*'])

    if (!strapiID || isNaN(strapiID)) {
        return null
    }

    return (
        <>
            <SEO
                title="Cool tech events - PostHog"
                description="Real-life events for people who like tech and people who build things"
                image="/images/og/default.png"
            />
            <EventsContent initialSelectedId={strapiID} />
        </>
    )
}

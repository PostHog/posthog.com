import React from 'react'
import SEO from 'components/seo'
import { EventsContent, transformStrapiEvent, Event as EventType } from '../views/events'
import type { EventProps } from '../lib/content/events'

const getOgImage = (event: EventType | null) => {
    if (!event?.photos?.[0]?.url) {
        return `/images/og/default.png`
    }

    const photoUrl = event.photos[0].url
    const fullUrl = photoUrl.startsWith('http')
        ? photoUrl
        : `${import.meta.env.PUBLIC_SQUEAK_API_HOST || ''}${photoUrl}`

    // Resize the square image to fit by height and pad the width with a light PostHog background
    return fullUrl.replace('/upload/', '/upload/c_lpad,w_1200,h_630,b_rgb:EEEFE9/')
}

const EventTemplate = ({ strapiID, attributes }: EventProps) => {
    const event = transformStrapiEvent({ id: strapiID, attributes })
    const title = event?.name ? `${event.name} - PostHog` : 'Cool tech events - PostHog'
    const description = event?.description || 'Real-life events for people who like tech and people who build things'
    const image = getOgImage(event)
    const imageType = image.startsWith('http') ? 'absolute' : 'relative'

    return (
        <>
            <SEO title={title} description={description} image={image} imageType={imageType} />
            <EventsContent initialSelectedEvent={event || undefined} initialSelectedId={event?.id} />
        </>
    )
}

export default EventTemplate

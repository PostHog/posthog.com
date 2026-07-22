import React from 'react'
import { graphql, PageProps } from 'gatsby'
import SEO from 'components/seo'
import { EventsContent, transformStrapiEvent, Event as EventType } from '../pages/events'

type EventPageData = {
    event: {
        attributes: any
    } | null
}

type EventPageContext = {
    id: string
    strapiID: number
}

const getOgImage = (event: EventType | null) => {
    if (!event?.photos?.[0]?.url) {
        return `/images/og/default.png`
    }

    const photoUrl = event.photos[0].url
    const fullUrl = photoUrl.startsWith('http') ? photoUrl : `${process.env.GATSBY_SQUEAK_API_HOST || ''}${photoUrl}`

    // Resize the square image to fit by height and pad the width with a light PostHog background
    return fullUrl.replace('/upload/', '/upload/c_lpad,w_1200,h_630,b_rgb:EEEFE9/')
}

const EventTemplate = ({ data, pageContext }: PageProps<EventPageData, EventPageContext>) => {
    const event = data.event
        ? transformStrapiEvent({ id: pageContext.strapiID, attributes: data.event.attributes })
        : null
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

export const query = graphql`
    query EventTemplate($id: String!) {
        event(id: { eq: $id }) {
            attributes {
                name
                description
                date
                private
                format
                audience
                speakerTopic
                attendees
                vibeScore
                video
                presentation
                link
                location {
                    label
                    lat
                    lng
                    venue {
                        name
                    }
                }
                speakers {
                    data {
                        attributes {
                            firstName
                            lastName
                        }
                    }
                }
                partners {
                    name
                    url
                }
                photos {
                    data {
                        id
                        attributes {
                            url
                        }
                    }
                }
            }
        }
    }
`

export default EventTemplate

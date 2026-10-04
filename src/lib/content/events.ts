// Event pages (/events/<strapiID>): the events app with one event open.
import { nodes } from '../../data-layer'
import type { EventNode } from '../../data-layer/types'

export interface EventProps {
    strapiID: number
    /** The Strapi attributes the events app reads (see `transformStrapiEvent` in src/views/events.tsx). */
    attributes: Record<string, unknown>
}

const FIELDS = [
    'name',
    'description',
    'date',
    'private',
    'format',
    'audience',
    'speakerTopic',
    'attendees',
    'vibeScore',
    'video',
    'presentation',
    'link',
    'location',
    'speakers',
    'partners',
    'photos',
] as const

const names = ({ data }: { data?: { attributes?: { firstName?: string; lastName?: string } }[] } = {}) => ({
    data: data?.map(({ attributes }) => ({
        attributes: { firstName: attributes?.firstName, lastName: attributes?.lastName },
    })),
})

function eventProps(node: EventNode): EventProps {
    const attributes: Record<string, any> = Object.fromEntries(FIELDS.map((field) => [field, node.attributes[field]]))
    attributes.speakers = attributes.speakers && names(attributes.speakers)
    attributes.partners = attributes.partners?.map(({ name, url }: { name: string; url?: string }) => ({ name, url }))
    attributes.photos = attributes.photos && {
        data: attributes.photos.data?.map(({ id, attributes }: { id: number; attributes: Record<string, any> }) => ({
            id,
            attributes: { url: attributes?.url, name: attributes?.name },
        })),
    }
    return { strapiID: node.strapiID, attributes }
}

export const eventPages = () =>
    nodes<EventNode>('Event')
        .filter((node) => node.strapiID)
        .map((node) => ({ params: { strapiID: String(node.strapiID) }, props: eventProps(node) }))

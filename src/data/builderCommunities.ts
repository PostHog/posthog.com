/*
    Builder communities directory — powers /cool-builder-communities

    To add a community, copy the template below into the array. Anyone can open a PR!

    {
        id: 6, // next unused number — never reuse an existing id
        name: 'Group name',
        location: { label: 'City, Country', lat: 0, lng: 0 }, // right-click the spot in Google Maps to copy lat/lng
        url: 'https://example.com',
        status: 'active', // 'active' | 'inactive-seeking-support' | 'inactive'
        type: 'builder-group', // 'builder-group' | 'hacker-house' | 'builder-collective'
        organizers: [{ name: 'Organizer name', url: 'https://linkedin.com/in/...' }],
        logo: 'https://res.cloudinary.com/...', // optional, shown in the list and detail panel
        photos: ['https://res.cloudinary.com/...'], // optional, shown in the detail panel
        nextSession: { date: 'YYYY-MM-DD', url: 'https://lu.ma/...' }, // optional
        posthogIncubator: true, // only for PostHog community incubator chapters
    }

    Entries without lat/lng still appear in the list, just not on the map.
*/

export type CommunityStatus = 'active' | 'inactive-seeking-support' | 'inactive'
export type CommunityType = 'builder-group' | 'hacker-house' | 'builder-collective'

export interface BuilderCommunity {
    id: number
    name: string
    location: {
        label: string
        lat?: number
        lng?: number
    }
    url?: string
    status: CommunityStatus
    type: CommunityType
    organizers?: { name: string; url?: string }[]
    logo?: string
    photos?: string[]
    nextSession?: { date?: string; url?: string }
    posthogIncubator?: boolean
}

export const communityStatusLabels: Record<CommunityStatus, string> = {
    active: 'Active',
    'inactive-seeking-support': 'Seeking organizers',
    inactive: 'Inactive',
}

export const communityTypeLabels: Record<CommunityType, string> = {
    'builder-group': 'Builder group',
    'hacker-house': 'Hacker house',
    'builder-collective': 'Builder collective',
}

export const builderCommunities: BuilderCommunity[] = [
    {
        id: 1,
        name: 'Austin Builders',
        location: { label: 'Austin, TX, USA', lat: 30.2672, lng: -97.7431 },
        url: 'https://github.com/PostHog/meta/issues/327',
        status: 'active',
        type: 'builder-group',
        organizers: [{ name: 'Kliment Minchev', url: 'https://www.linkedin.com/in/kliment-minchev-a1847160' }],
        posthogIncubator: true,
    },
    {
        id: 2,
        name: 'Barcelona Builders',
        location: { label: 'Barcelona, Spain', lat: 41.3874, lng: 2.1686 },
        url: 'https://github.com/PostHog/meta/issues/331',
        status: 'active',
        type: 'builder-group',
        organizers: [
            { name: 'Guillem Tarraga', url: 'https://www.linkedin.com/in/guillem-tarraga' },
            { name: 'Jose (Jesaú) Ra Oller', url: 'https://www.linkedin.com/in/jesauraoller' },
        ],
        posthogIncubator: true,
    },
    {
        id: 3,
        name: 'TechTank TO Builder Group',
        location: { label: 'Toronto, Canada', lat: 43.6532, lng: -79.3832 },
        url: 'http://techtankto.com/',
        status: 'active',
        type: 'builder-group',
        organizers: [{ name: 'Niki Fereidooni', url: 'https://www.linkedin.com/in/nfereidooni' }],
        posthogIncubator: true,
    },
    {
        id: 4,
        name: 'Tel Aviv Builders',
        location: { label: 'Tel Aviv, Israel', lat: 32.0853, lng: 34.7818 },
        url: 'https://github.com/PostHog/requests-for-comments-public/issues/554',
        status: 'active',
        type: 'builder-group',
        organizers: [{ name: 'Jonathan Harel', url: 'https://www.linkedin.com/in/jonathan-harel' }],
        posthogIncubator: true,
    },
    {
        id: 5,
        name: 'Give(a)Go',
        location: { label: 'Dublin, Ireland', lat: 53.3498, lng: -6.2603 },
        url: 'https://www.giveago.co/',
        status: 'active',
        type: 'builder-group',
        nextSession: { url: 'https://lu.ma/giveago' },
    },
]

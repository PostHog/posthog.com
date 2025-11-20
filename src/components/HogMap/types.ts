export enum EventType {
    CONFERENCE = 'conference',
    WORKSHOP = 'workshop',
    MEETUP = 'meetup',
    SMALL_OFFSITE = 'small-offsite',
    COMPANY_OFFSITE = 'company-offsite',
}

export enum PlaceType {
    RESTAURANT = 'restaurant',
    CAFE = 'cafe',
    HOTEL = 'hotel',
    AIRBNB = 'airbnb',
    CO_WORKING = 'co-working',
    OFFSITE = 'offsite',
}
export interface PlaceItem {
    id: number
    name: string
    address: string
    latitude: number
    longitude: number
    type: PlaceType
}

export interface EventItem {
    id: number
    name: string
    dateStart: string
    dateEnd: string
    type: EventType
    location: {
        label: string
        lat?: number
        lng?: number
        venue?: {
            name?: string
        }
    }
    link?: string
}

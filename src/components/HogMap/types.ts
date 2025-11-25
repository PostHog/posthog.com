export enum EventType {
    CONFERENCE = 'conference',
    WORKSHOP = 'workshop',
    MEETUP = 'meetup',
    SMALL_OFFSITE = 'small-offsite',
    COMPANY_OFFSITE = 'company-offsite',
}

export enum PlaceType {
    RESTAURANT = 'Restaurant',
    COFFEE = 'Coffee',
    HOTEL = 'Hotel',
    AIRBNB = 'Airbnb',
    CO_WORKING = 'Co-working',
    OFFSITE = 'Offsite',
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
    // Optional unified date field (for simplified consumers)
    date?: string
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

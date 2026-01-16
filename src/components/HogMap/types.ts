export enum PlaceType {
    RESTAURANT = 'Restaurant',
    COFFEE = 'Coffee',
    HOTEL = 'Hotel',
    AIRBNB = 'Airbnb',
    CO_WORKING = 'Co-working',
    BAR = 'Bar',
    //OFFSITE = 'Offsite',
}
export interface PlaceItem {
    id: number
    name: string
    address: string
    latitude: number | null
    longitude: number | null
    type: PlaceType
}

export interface PlaceTag {
    id: number
    attributes: {
        label: string
    }
}

export interface PlaceReview {
    id: number
    rating: number
    subcategoryRatings?: {
        ratingCategory: string
        ratingValue: number
    }[]
    notes: string
    events: string
    tags: PlaceTag[]
    place: PlaceItem
    createdAt: string
    wouldGoBack?: boolean
}

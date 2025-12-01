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
    latitude: number | null
    longitude: number | null
    type: PlaceType
}

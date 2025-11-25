import { EventItem, PlaceItem } from './types'

let _events: EventItem[] = []
let _places: PlaceItem[] = []

export const getEvents = (): EventItem[] => _events
export const setEvents = (next: EventItem[]): void => {
    _events = Array.isArray(next) ? next : []
}

export const getPlaces = (): PlaceItem[] => _places
export const setPlaces = (next: PlaceItem[]): void => {
    _places = Array.isArray(next) ? next : []
}

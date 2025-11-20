import { useEffect, useState } from 'react'
import { EventItem } from './types'

export interface Coordinates {
    latitude: number
    longitude: number
}

export const useEventsMapData = (isClient: boolean, token?: string) => {
    const [events, setEvents] = useState<EventItem[]>([])
    const [coordsByEventId, setCoordsByEventId] = useState<Record<number, Coordinates>>({})

    // Fetch events from Strapi (client-side)
    useEffect(() => {
        if (!isClient) {
            return
        }
        let cancelled = false
        const fetchPage = async (page: number) => {
            const host = process.env.GATSBY_SQUEAK_API_HOST
            if (!host) {
                return null
            }
            const url = new URL(`${host}/api/events`)
            url.searchParams.set('pagination[page]', String(page))
            url.searchParams.set('pagination[pageSize]', '100')
            url.searchParams.append('sort[0]', 'date:desc')
            url.searchParams.append('populate[location][populate][0]', 'venue')
            try {
                const resp = await fetch(url.toString())
                if (!resp.ok) {
                    return null
                }
                const json = await resp.json()
                return json
            } catch {
                return null
            }
        }
        const loadAll = async () => {
            const first = await fetchPage(1)
            if (!first) {
                return
            }
            const allItems = Array.isArray(first.data) ? first.data : []
            const pageCount = first?.meta?.pagination?.pageCount || 1
            const morePages = []
            for (let p = 2; p <= pageCount; p++) {
                morePages.push(fetchPage(p))
            }
            const rest = await Promise.all(morePages)
            rest.forEach((r) => {
                if (r && Array.isArray(r.data)) {
                    allItems.push(...r.data)
                }
            })
            const normalized: EventItem[] = allItems.map((item: any) => {
                const attrs = item?.attributes || {}
                const loc = attrs?.location || {}
                const venueName = loc?.venue?.data?.attributes?.name
                return {
                    id: item?.id,
                    name: attrs?.name,
                    date: attrs?.date,
                    location: {
                        label: loc?.label,
                        lat: loc?.lat ?? undefined,
                        lng: loc?.lng ?? undefined,
                        venue: venueName ? { name: venueName } : undefined,
                    },
                    link: attrs?.link || undefined,
                }
            })
            if (!cancelled) {
                setEvents(normalized)
            }
        }
        loadAll()
        return () => {
            cancelled = true
        }
    }, [isClient])

    // Seed coords from events that already have lat/lng
    useEffect(() => {
        if (!isClient) {
            return
        }
        const seeded: Record<number, Coordinates> = {}
        events.forEach((e) => {
            if (typeof e.location.lat === 'number' && typeof e.location.lng === 'number') {
                seeded[e.id] = { latitude: e.location.lat as number, longitude: e.location.lng as number }
            }
        })
        if (Object.keys(seeded).length > 0) {
            setCoordsByEventId((prev) => ({ ...seeded, ...prev }))
        }
    }, [isClient, events])

    // Geocode events missing coordinates
    useEffect(() => {
        if (!isClient || !token) {
            return
        }
        const toFetch = events.filter(
            (e) =>
                !(typeof e.location.lat === 'number' && typeof e.location.lng === 'number') &&
                !coordsByEventId[e.id] &&
                e.location.label
        )
        if (toFetch.length === 0) {
            return
        }
        let cancelled = false
        const fetchAll = async () => {
            const results: Record<number, Coordinates> = {}
            await Promise.all(
                toFetch.map(async (e) => {
                    try {
                        const url = new URL('https://api.mapbox.com/search/geocode/v6/forward')
                        url.searchParams.set('q', e.location.label)
                        url.searchParams.set('types', 'place,region,country')
                        url.searchParams.set('access_token', token)
                        const resp = await fetch(url.toString())
                        const json = await resp.json()
                        const coords = json?.features?.[0]?.geometry?.coordinates
                        if (Array.isArray(coords) && coords.length >= 2) {
                            results[e.id] = { longitude: coords[0], latitude: coords[1] }
                        }
                    } catch {
                        // ignore
                    }
                })
            )
            if (!cancelled && Object.keys(results).length > 0) {
                setCoordsByEventId((prev) => ({ ...prev, ...results }))
            }
        }
        fetchAll()
        return () => {
            cancelled = true
        }
    }, [isClient, token, events, coordsByEventId])

    return { events, coordsByEventId }
}

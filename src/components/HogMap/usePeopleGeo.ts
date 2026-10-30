import { useEffect, useMemo, useState } from 'react'

export type Coordinates = { latitude: number; longitude: number }
export type BBox = [number, number, number, number] // [minLng, minLat, maxLng, maxLat]
export type GeocodedArea = {
    center: [number, number] // [lng, lat]
    bbox: BBox
    label: string
}

export type GeoProfile = {
    location?: string
    country?: string
}

const LONDON: Coordinates = { longitude: -0.1276, latitude: 51.5074 }

// Collapse whitespace and dashes so a "#Jean-Luc-Picard" hash matches "Jean-Luc Picard".
const normalizeName = (s: string): string =>
    (s || '')
        .toLowerCase()
        .replace(/[-\s]+/g, ' ')
        .trim()

export const findEmployeeByName = <T extends { firstName?: string; lastName?: string }>(
    members: T[],
    term: string
): T | null => {
    const t = normalizeName(term)
    if (!t) return null
    return members.find((m) => normalizeName([m.firstName, m.lastName].filter(Boolean).join(' ')) === t) || null
}

export const buildMemberQuery = (m: GeoProfile): string | null => {
    const location = m.location && m.location.trim()
    const country = m.country && m.country.trim()
    const parts: string[] = []
    if (location) {
        parts.push(location)
    }
    if (country) {
        parts.push(country)
    }
    const q = parts.join(', ')
    return q || null
}

export const isWithinBbox = (coords: Coordinates, bbox: BBox): boolean => {
    const [minLng, minLat, maxLng, maxLat] = bbox
    return (
        coords.longitude >= minLng &&
        coords.longitude <= maxLng &&
        coords.latitude >= minLat &&
        coords.latitude <= maxLat
    )
}

// Forward-geocode each unique "location, country" string, cached by query.
export const useCoordsByQuery = (
    isClient: boolean,
    token: string | undefined,
    members: GeoProfile[]
): Record<string, Coordinates> => {
    const [coordsByQuery, setCoordsByQuery] = useState<Record<string, Coordinates>>({})
    const queries = useMemo(() => {
        const set = new Set<string>()
        members.forEach((m) => {
            const q = buildMemberQuery(m)
            if (q) {
                set.add(q)
            }
        })
        return Array.from(set)
    }, [members])
    useEffect(() => {
        if (!isClient || !token) {
            return
        }
        const toFetch = queries.filter((q) => !coordsByQuery[q])
        if (toFetch.length === 0) {
            return
        }
        let cancelled = false
        const fetchAll = async () => {
            const results: Record<string, Coordinates> = {}
            await Promise.all(
                toFetch.map(async (q) => {
                    try {
                        const url = new URL('https://api.mapbox.com/search/geocode/v6/forward')
                        url.searchParams.set('q', q)
                        url.searchParams.set('types', 'place,region,country')
                        url.searchParams.set('access_token', token)
                        const resp = await fetch(url.toString())
                        const json = await resp.json()
                        const feature = json?.features?.[0]
                        const coords = feature?.geometry?.coordinates
                        if (Array.isArray(coords) && coords.length >= 2) {
                            results[q] = { longitude: coords[0], latitude: coords[1] }
                        } else {
                            results[q] = { ...LONDON }
                        }
                    } catch {
                        results[q] = { ...LONDON }
                    }
                })
            )
            if (!cancelled && Object.keys(results).length > 0) {
                setCoordsByQuery((prev) => ({ ...prev, ...results }))
            }
        }
        fetchAll()
        return () => {
            cancelled = true
        }
    }, [isClient, token, queries, coordsByQuery])
    return coordsByQuery
}

// Use the feature's bbox, or a small box around a point result if it has none.
const bboxForFeature = (feature: any): BBox | null => {
    const bbox = feature?.bbox ?? feature?.properties?.bbox
    if (Array.isArray(bbox) && bbox.length >= 4) {
        return [bbox[0], bbox[1], bbox[2], bbox[3]]
    }
    const coords = feature?.geometry?.coordinates
    if (Array.isArray(coords) && coords.length >= 2) {
        const [lng, lat] = coords
        const pad = 0.75
        return [lng - pad, lat - pad, lng + pad, lat + pad]
    }
    return null
}

// Geocode a query into an area, or null when it isn't a place (a name/role) —
// the signal to fall back to text search.
export const useGeocodedArea = (query: string, token: string | undefined): GeocodedArea | null => {
    const [area, setArea] = useState<GeocodedArea | null>(null)
    const trimmed = query.trim()

    useEffect(() => {
        if (!trimmed) {
            setArea(null)
            return
        }

        if (typeof window === 'undefined' || !token || trimmed.length < 2) {
            setArea(null)
            return
        }

        const controller = new AbortController()
        const handle = setTimeout(async () => {
            try {
                const url = new URL('https://api.mapbox.com/search/geocode/v6/forward')
                url.searchParams.set('q', trimmed)
                url.searchParams.set('types', 'country,region,place,district,locality')
                url.searchParams.set('limit', '1')
                url.searchParams.set('access_token', token)
                const resp = await fetch(url.toString(), { signal: controller.signal })
                const json = await resp.json()
                const feature = json?.features?.[0]
                if (!feature) {
                    setArea(null)
                    return
                }
                const bbox = bboxForFeature(feature)
                const coords = feature?.geometry?.coordinates
                if (!bbox || !Array.isArray(coords) || coords.length < 2) {
                    setArea(null)
                    return
                }
                setArea({
                    bbox,
                    center: [coords[0], coords[1]],
                    label: feature?.properties?.name || trimmed,
                })
            } catch (e) {
                if ((e as { name?: string })?.name !== 'AbortError') {
                    setArea(null)
                }
            }
        }, 250)

        return () => {
            clearTimeout(handle)
            controller.abort()
        }
    }, [trimmed, token])

    return area
}

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

type MemberGeocode = { query: string; countryFilter: string | null }

const MEMBER_PLACE_TYPES = 'place,locality,district,region,country'

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

export const buildMemberGeocode = (m: GeoProfile): MemberGeocode | null => {
    const location = m.location?.trim()
    const country = m.country?.trim()
    const countryFilter = country && /^[a-z]{2}$/i.test(country) ? country.toLowerCase() : null
    const query = countryFilter ? location || country : buildMemberQuery(m)
    if (!query) {
        return null
    }
    return { query, countryFilter }
}

const buildForwardGeocodeUrl = (query: string, types: string, token: string, countryFilter?: string | null): URL => {
    const url = new URL('https://api.mapbox.com/search/geocode/v6/forward')
    url.searchParams.set('q', query)
    url.searchParams.set('types', types)
    if (countryFilter) {
        url.searchParams.set('country', countryFilter)
    }
    url.searchParams.set('access_token', token)
    return url
}

const geocodeMemberPlace = async (
    { query, countryFilter }: MemberGeocode,
    token: string
): Promise<Coordinates | null> => {
    try {
        const resp = await fetch(buildForwardGeocodeUrl(query, MEMBER_PLACE_TYPES, token, countryFilter).toString())
        const json = await resp.json()
        const coords = json?.features?.[0]?.geometry?.coordinates
        if (!Array.isArray(coords) || coords.length < 2) {
            return null
        }
        return { longitude: coords[0], latitude: coords[1] }
    } catch {
        return null
    }
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

// Forward-geocode each unique "location, country" string, cached by query; unresolved places stay unpinned.
export const useCoordsByQuery = (
    isClient: boolean,
    token: string | undefined,
    members: GeoProfile[]
): Record<string, Coordinates> => {
    const [coordsByQuery, setCoordsByQuery] = useState<Record<string, Coordinates | null>>({})
    const geocodeByQuery = useMemo(() => {
        const byQuery: Record<string, MemberGeocode> = {}
        members.forEach((m) => {
            const q = buildMemberQuery(m)
            const geocode = buildMemberGeocode(m)
            if (q && geocode) {
                byQuery[q] = geocode
            }
        })
        return byQuery
    }, [members])
    useEffect(() => {
        if (!isClient || !token) {
            return
        }
        const toFetch = Object.keys(geocodeByQuery).filter((q) => !(q in coordsByQuery))
        if (toFetch.length === 0) {
            return
        }
        let cancelled = false
        const fetchAll = async () => {
            const results: Record<string, Coordinates | null> = {}
            await Promise.all(
                toFetch.map(async (q) => {
                    results[q] = await geocodeMemberPlace(geocodeByQuery[q], token)
                })
            )
            if (!cancelled) {
                setCoordsByQuery((prev) => ({ ...prev, ...results }))
            }
        }
        fetchAll()
        return () => {
            cancelled = true
        }
    }, [isClient, token, geocodeByQuery, coordsByQuery])
    return useMemo(() => {
        const resolvedCoordsByQuery: Record<string, Coordinates> = {}
        Object.entries(coordsByQuery).forEach(([q, coords]) => {
            if (coords) {
                resolvedCoordsByQuery[q] = coords
            }
        })
        return resolvedCoordsByQuery
    }, [coordsByQuery])
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
export const useGeocodedArea = (
    query: string,
    token: string | undefined,
    countryFilter?: string | null
): GeocodedArea | null => {
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
                const url = buildForwardGeocodeUrl(
                    trimmed,
                    'country,region,place,district,locality',
                    token,
                    countryFilter
                )
                url.searchParams.set('limit', '1')
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
    }, [trimmed, token, countryFilter])

    return area
}

import { graphql, useStaticQuery } from 'gatsby'
import { useEffect, useMemo, useState } from 'react'

export interface Coordinates {
    latitude: number
    longitude: number
}

export interface ProfileNode {
    id: string
    squeakId: string
    firstName: string
    lastName: string
    companyRole: string
    color: string
    country: string
    location: string
    avatar?: {
        url?: string
    }
}

const QUERY_PEOPLE = graphql`
    query PeopleMapQuery {
        allSqueakProfile(
            filter: { teams: { data: { elemMatch: { id: { ne: null } } } } }
            sort: { fields: startDate, order: ASC }
        ) {
            nodes {
                id
                squeakId
                firstName
                lastName
                companyRole
                color
                country
                location
                avatar {
                    url
                }
            }
        }
    }
`

export const usePeopleMapData = (isClient: boolean, token?: string) => {
    const data = useStaticQuery(QUERY_PEOPLE) as {
        allSqueakProfile: { nodes: ProfileNode[] }
    }

    const members = useMemo(
        () => data.allSqueakProfile.nodes.filter((m) => (m.country || '').trim().toLowerCase() !== 'world'),
        [data.allSqueakProfile.nodes]
    )

    const [coordsByQuery, setCoordsByQuery] = useState<Record<string, Coordinates>>({})

    const queries = useMemo(() => {
        const set = new Set<string>()
        members.forEach((m) => {
            const q = (m.location && m.location.trim()) || (m.country && m.country.trim())
            if (q) {
                set.add(q)
            }
        })
        return Array.from(set)
    }, [members])

    useEffect(() => {
        if (!isClient) {
            return
        }
        if (!token) {
            return
        }
        // Only fetch for unknown queries
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
                        }
                    } catch (e) {
                        // ignore single failure
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

    return { members, coordsByQuery }
}

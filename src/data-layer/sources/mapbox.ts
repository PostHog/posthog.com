// MapboxLocation: geocoded locations of team members.
// `profileId` is the SqueakProfile `id` (squeak-profile-<squeakId>), as it was the profile's node id.
import type { Source } from '../index'
import { nodes } from '../index'
import { env } from '../env'
import type { MapboxLocationNode, SqueakProfileNode } from '../types'

/* Mapbox API */

export interface MapboxBatchQuery {
    q: string
    types: string[]
}

export interface MapboxBatchResponse {
    batch: { features: { geometry?: { coordinates?: [number, number] } }[] }[]
}

const BATCH_SIZE = 50

const locationForProfile = (profile: SqueakProfileNode): MapboxBatchQuery =>
    profile.location
        ? { q: profile.location, types: ['place', 'region', 'country'] }
        : { q: profile.country ?? '', types: ['country'] }

export const mapboxSource: Source = {
    name: 'mapbox-locations',
    types: ['MapboxLocation'],
    requires: ['MAPBOX_TOKEN'],
    after: ['squeak'],
    async fetch() {
        // Profiles without a team are old profiles
        const profiles = nodes<SqueakProfileNode>('SqueakProfile').filter(
            (profile) => (profile.teams?.data?.length ?? 0) > 0 && (profile.location || profile.country)
        )
        const locations: MapboxLocationNode[] = []
        for (let i = 0; i < profiles.length; i += BATCH_SIZE) {
            const batch = profiles.slice(i, i + BATCH_SIZE)
            try {
                const response = await fetch(
                    `https://api.mapbox.com/search/geocode/v6/batch?access_token=${env('MAPBOX_TOKEN')}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(batch.map(locationForProfile)),
                    }
                )
                if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
                const body = (await response.json()) as MapboxBatchResponse
                body.batch.forEach((entry, index) => {
                    const [longitude, latitude] = entry.features?.[0]?.geometry?.coordinates ?? []
                    if (!longitude || !latitude) return
                    const profile = batch[index]
                    locations.push({
                        id: `mapbox-location-${profile.id}`,
                        profileId: profile.id,
                        location: locationForProfile(profile).q,
                        coordinates: { latitude, longitude },
                    })
                })
            } catch (error) {
                console.warn(`[data-layer] Mapbox batch ${i / BATCH_SIZE + 1} failed: ${(error as Error).message}`)
            }
        }
        return { MapboxLocation: locations }
    },
}

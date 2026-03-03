import { useEffect, useState } from 'react'
import { PlaceItem } from './types'
import { getPlaces } from './data'

export interface Coordinates {
    latitude: number
    longitude: number
}

export const usePlacesMapData = (isClient: boolean, getJwt: () => Promise<string | null>) => {
    const [places, setPlaces] = useState<PlaceItem[]>([])
    const [coordsByPlaceId, setCoordsByPlaceId] = useState<Record<number, Coordinates>>({})

    // Fetch places from Strapi (client-side)
    useEffect(() => {
        if (!isClient) {
            return
        }
        let cancelled = false

        const fetchData = async () => {
            try {
                const data = await getPlaces()

                if (!cancelled) {
                    // The API returns latitude/longitude fields
                    const placesData = data.map((item: any) => {
                        const lat = typeof item.latitude === 'number' ? item.latitude : null
                        const long = typeof item.longitude === 'number' ? item.longitude : null

                        return {
                            id: item.id,
                            name: item.name || '',
                            address: item.address || '',
                            type: item.type || 'Coffee',
                            latitude: lat,
                            longitude: long,
                        }
                    })

                    setPlaces(placesData)

                    // Build coordsByPlaceId
                    const coords: Record<number, Coordinates> = {}
                    placesData.forEach((p: PlaceItem) => {
                        // Check if coordinates exist and are valid numbers (not null, not 0)
                        if (
                            p.latitude !== null &&
                            p.longitude !== null &&
                            typeof p.latitude === 'number' &&
                            typeof p.longitude === 'number' &&
                            p.latitude !== 0 &&
                            p.longitude !== 0 &&
                            !isNaN(p.latitude) &&
                            !isNaN(p.longitude)
                        ) {
                            coords[p.id] = { latitude: p.latitude, longitude: p.longitude }
                        }
                    })
                    setCoordsByPlaceId(coords)
                }
            } catch (error) {
                console.error('Failed to fetch places:', error)
            }
        }

        fetchData()

        // Listen for updates to places
        const handleUpdate = () => fetchData()
        window.addEventListener('hogmap:places-updated', handleUpdate)

        return () => {
            cancelled = true
            window.removeEventListener('hogmap:places-updated', handleUpdate)
        }
    }, [isClient, getJwt])

    return { places, coordsByPlaceId }
}

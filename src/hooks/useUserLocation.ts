import { useState, useEffect } from 'react'

interface UserLocation {
    latitude: number
    longitude: number
    country?: string
    city?: string
}

const DEFAULT_LOCATION: UserLocation = {
    latitude: 51.5074,
    longitude: -0.1276,
    country: 'GB',
    city: 'London',
}

// Module-level cache (in-memory only, not persisted to storage)
let cachedLocation: UserLocation | null = null
let fetchPromise: Promise<UserLocation> | null = null

/**
 * Hook to get the user's approximate location based on their IP address.
 * Caches the result in memory for the browser session (no persistent storage).
 * Falls back to London if geolocation fails or is unavailable.
 */
export function useUserLocation(): { location: UserLocation; isLoading: boolean } {
    const [location, setLocation] = useState<UserLocation>(cachedLocation || DEFAULT_LOCATION)
    const [isLoading, setIsLoading] = useState<boolean>(!cachedLocation)

    useEffect(() => {
        // Only run on client side
        if (typeof window === 'undefined') return

        // If we already have a cached location, use it
        if (cachedLocation) {
            setLocation(cachedLocation)
            setIsLoading(false)
            return
        }

        // If a fetch is already in progress, wait for it
        if (fetchPromise) {
            fetchPromise.then((loc) => {
                setLocation(loc)
                setIsLoading(false)
            })
            return
        }

        // Start a new fetch
        fetchPromise = fetch('https://ipapi.co/json/')
            .then((response) => response.json())
            .then((data) => {
                if (data.latitude && data.longitude) {
                    const userLocation: UserLocation = {
                        latitude: data.latitude,
                        longitude: data.longitude,
                        country: data.country_code,
                        city: data.city,
                    }
                    cachedLocation = userLocation
                    return userLocation
                }
                cachedLocation = DEFAULT_LOCATION
                return DEFAULT_LOCATION
            })
            .catch((error) => {
                console.log('Could not determine user location, using default:', error)
                cachedLocation = DEFAULT_LOCATION
                return DEFAULT_LOCATION
            })

        fetchPromise.then((loc) => {
            setLocation(loc)
            setIsLoading(false)
        })
    }, [])

    return { location, isLoading }
}

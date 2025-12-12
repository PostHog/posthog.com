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

/**
 * Hook to get the user's approximate location based on their IP address.
 * Falls back to London if geolocation fails or is unavailable.
 */
export function useUserLocation(): UserLocation {
    const [location, setLocation] = useState<UserLocation>(DEFAULT_LOCATION)

    useEffect(() => {
        // Only run on client side
        if (typeof window === 'undefined') return

        // Check if we've already fetched and cached the location
        const cachedLocation = sessionStorage.getItem('userLocation')
        if (cachedLocation) {
            try {
                setLocation(JSON.parse(cachedLocation))
                return
            } catch {
                // Invalid cache, continue to fetch
            }
        }

        // Fetch user's approximate location from ipapi.co (free tier: 1000 requests/day)
        fetch('https://ipapi.co/json/')
            .then((response) => response.json())
            .then((data) => {
                if (data.latitude && data.longitude) {
                    const userLocation: UserLocation = {
                        latitude: data.latitude,
                        longitude: data.longitude,
                        country: data.country_code,
                        city: data.city,
                    }
                    setLocation(userLocation)
                    // Cache for the session
                    sessionStorage.setItem('userLocation', JSON.stringify(userLocation))
                }
            })
            .catch((error) => {
                console.log('Could not determine user location, using default:', error)
                // Use default location (London) if geolocation fails
            })
    }, [])

    return location
}

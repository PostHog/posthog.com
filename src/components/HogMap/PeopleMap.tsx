import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { navigate } from 'gatsby'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useUserLocation } from '../../hooks/useUserLocation'
import {
    computeOffsets,
    getMapbox,
    ensureClusterSource,
    ensureClusterLayers,
    setClusterVisibility,
    CLUSTER_ZOOM,
    isStyleReady,
    DEFAULT_SPREAD_RADIUS,
} from './hogMapUtils'

const PopupHtml = ({
    name,
    role,
    flagEmoji,
    locationText,
    label,
}: {
    name: string
    role: string
    flagEmoji: string
    locationText: string
    label: string
}): string => {
    return `
        <div class="text-sm max-w-sm text-center text-primary bg-primary p-2 rounded shadow-2xl" data-scheme="primary">
            <div class="font-semibold font-squeak text-xl uppercase leading-tight">${name || 'Team member'}</div>
            ${role ? `<div class="mt-1 text-secondary text-balance">${role}</div>` : ''}
            ${
                flagEmoji || locationText
                    ? `<div class="mt-1 text-secondary justify-center flex gap-1 items-center">${
                          flagEmoji ? `<span>${flagEmoji}</span>` : ''
                      }${locationText ? `<span>${locationText}</span>` : ''}</div>`
                    : `<div class="text-secondary">${label}</div>`
            }
        </div>
    `
}

type Coordinates = { latitude: number; longitude: number }
type ProfileNode = {
    id?: string
    squeakId?: string
    firstName: string
    lastName: string
    companyRole?: string
    color?: string
    country?: string
    location?: string
    avatar?: { url?: string }
}

const buildMemberQuery = (m: ProfileNode): string | null => {
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

const useCoordsByQuery = (isClient: boolean, token: string | undefined, members: ProfileNode[]) => {
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
                            // Fallback to London if geocoding fails
                            results[q] = { longitude: -0.1276, latitude: 51.5074 }
                        }
                    } catch {
                        // On failure, fallback to London
                        results[q] = { longitude: -0.1276, latitude: 51.5074 }
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

export default function PeopleMap({ members: membersProp }: { members?: any[] }): JSX.Element {
    const [isClient, setIsClient] = useState(false)
    const { location: userLocation, isLoading: isLocationLoading } = useUserLocation()

    useEffect(() => {
        setIsClient(true)
    }, [])

    const mapContainerRef = useRef<HTMLDivElement | null>(null)
    const mapRef = useRef<any>(null)
    const markersRef = useRef<any[]>([])
    const renderMarkersRef = useRef<(() => void) | null>(null)
    const membersRef = useRef<ProfileNode[]>([])
    const coordsByQueryRef = useRef<Record<string, Coordinates>>({})
    const jitteredPositionsByGroupRef = useRef<Record<string, Array<{ longitude: number; latitude: number }>>>({})

    const token = typeof window !== 'undefined' ? process.env.GATSBY_MAPBOX_TOKEN : undefined
    const styleUrl = 'mapbox://styles/mapbox/streets-v12'

    const members = useMemo(
        () => (Array.isArray(membersProp) ? (membersProp as ProfileNode[]) : ([] as ProfileNode[])),
        [membersProp]
    )

    const coordsByQuery = useCoordsByQuery(isClient, token, members)

    useEffect(() => {
        membersRef.current = members
    }, [members])

    useEffect(() => {
        coordsByQueryRef.current = coordsByQuery
    }, [coordsByQuery])

    // Precompute static spread positions for members that share the same location query
    useEffect(() => {
        const next: Record<string, Array<{ longitude: number; latitude: number }>> = {}
        // Build groups by resolved coordinates (rounded) so similar queries share jitter set
        const groups = members.reduce((acc, m) => {
            const q = buildMemberQuery(m)
            if (!q) {
                return acc
            }
            const coords = coordsByQuery[q]
            if (!coords) {
                return acc
            }
            const key = `${coords.longitude.toFixed(4)},${coords.latitude.toFixed(4)}`
            if (!acc[key]) {
                acc[key] = { coords, profiles: [] as ProfileNode[] }
            }
            acc[key].profiles.push(m)
            return acc
        }, {} as Record<string, { coords: Coordinates; profiles: ProfileNode[] }>)
        Object.entries(groups).forEach(([key, { coords, profiles }]) => {
            const offsets = computeOffsets(profiles.length, DEFAULT_SPREAD_RADIUS)
            next[key] = offsets.map(({ dx, dy }) => ({
                longitude: coords.longitude + dx,
                latitude: coords.latitude + dy,
            }))
        })
        jitteredPositionsByGroupRef.current = next
        // If map is ready, refresh markers to reflect the precomputed spread
        if (mapRef.current && isStyleReady(mapRef.current)) {
            try {
                renderMarkersRef.current && renderMarkersRef.current()
            } catch {
                // ignore
            }
        }
    }, [members, coordsByQuery])

    const setupMap = useCallback(() => {
        if (!isClient) {
            console.error('Not client')
            return
        }
        if (isLocationLoading) {
            // Wait for location to load before initializing map
            return
        }
        const mapboxgl = getMapbox()
        if (!mapboxgl) {
            console.error('No mapboxgl')
            return
        }
        if (!token) {
            // No token available on client – do not init the map
            console.error('No token')
            return
        }
        const clearMarkers = () => {
            markersRef.current.forEach((m) => m.remove())
            markersRef.current = []
        }

        const renderMarkers = () => {
            if (!mapRef.current) return
            // Avoid manipulating sources/layers before the style is fully loaded
            if (!isStyleReady(mapRef.current)) {
                return
            }
            clearMarkers()
            const zoom = mapRef.current.getZoom()

            // Use Mapbox clusters when zoomed out
            if (zoom < CLUSTER_ZOOM) {
                // People clusters
                const peopleFeatures = membersRef.current
                    .map((m) => {
                        const q = buildMemberQuery(m)
                        if (!q) return null
                        const coords = coordsByQueryRef.current[q]
                        if (!coords) return null
                        return {
                            type: 'Feature',
                            properties: { type: 'person' },
                            geometry: { type: 'Point', coordinates: [coords.longitude, coords.latitude] },
                        }
                    })
                    .filter(Boolean)
                const peopleData = { type: 'FeatureCollection', features: peopleFeatures as any[] }
                ensureClusterSource(mapRef.current, 'people-source', peopleData)
                ensureClusterLayers(mapRef.current, 'people-source')
                setClusterVisibility(mapRef.current, 'people-source', true)
                // Skip HTML markers in clustered view
                return
            } else {
                setClusterVisibility(mapRef.current, 'people-source', false)
            }

            // Show individual people markers when zoomed in
            // Group members by their geocode query so people in the same location are combined
            const groups = membersRef.current.reduce((acc, m) => {
                const q = buildMemberQuery(m)
                if (!q) {
                    return acc
                }
                const coords = coordsByQueryRef.current[q]
                if (!coords) {
                    return acc
                }
                const key = `${coords.longitude.toFixed(4)},${coords.latitude.toFixed(4)}`
                if (!acc[key]) {
                    acc[key] = { coords, profiles: [] as ProfileNode[], label: q, key }
                }
                acc[key].profiles.push(m)
                return acc
            }, {} as Record<string, { coords: Coordinates; profiles: ProfileNode[]; label: string; key: string }>)

            Object.values(groups).forEach(({ coords: { longitude, latitude }, profiles, label, key }) => {
                const avatarFallback =
                    'https://res.cloudinary.com/dmukukwp6/image/upload/v1698231117/max_6942263bd1.png'
                const positions = jitteredPositionsByGroupRef.current[key] || []
                profiles.forEach((p, idx) => {
                    const pos = positions[idx] || { longitude, latitude }
                    const el = document.createElement('div')
                    el.className = 'size-12 rounded-full flex items-center justify-center overflow-hidden'
                    const img = document.createElement('img')
                    img.src = p.avatar?.url || avatarFallback
                    img.alt = [p.firstName, p.lastName].filter(Boolean).join(' ') || 'Team member'
                    img.classList.add(
                        `bg-${p.color ?? 'white'}`,
                        'border-2',
                        'border-white',
                        'rounded-full',
                        'shadow-sm',
                        'w-full',
                        'h-full',
                        'object-cover'
                    )
                    el.appendChild(img)
                    const name = [p.firstName, p.lastName].filter(Boolean).join(' ')
                    const role = p.companyRole || ''
                    const href = p.squeakId ? `/community/profiles/${p.squeakId}` : ''
                    // Generate flag emoji from country code
                    const getFlagEmoji = (countryCode: string) => {
                        if (!countryCode) return ''
                        if (countryCode.toLowerCase() === 'world') return '🌎'
                        const codePoints = countryCode
                            .toUpperCase()
                            .split('')
                            .map((char) => 127397 + char.charCodeAt(0))
                        return String.fromCodePoint(...codePoints)
                    }
                    const flagEmoji = p.country ? getFlagEmoji(p.country) : ''
                    const locationText = p.country === 'world' ? 'Planet Earth' : p.location || p.country || ''
                    const popupHtml = PopupHtml({ name, role, flagEmoji, locationText, label })

                    const popup = new mapboxgl.Popup({ offset: 12, className: 'ph-mapbox-popup' }).setHTML(popupHtml)
                    const marker = new mapboxgl.Marker({ element: el })
                        .setLngLat([pos.longitude, pos.latitude])
                        .setPopup(popup)
                        .addTo(mapRef.current)
                    marker.getElement().addEventListener('mouseenter', () => marker.togglePopup())
                    marker.getElement().addEventListener('mouseleave', () => marker.togglePopup())
                    if (href) {
                        marker.getElement().style.cursor = 'pointer'
                        marker.getElement().addEventListener('click', () => {
                            navigate(href, { state: { newWindow: true } })
                        })
                    }
                    markersRef.current.push(marker)
                })
            })
        }
        renderMarkersRef.current = renderMarkers

        if (mapRef.current) {
            // Map already exists: update markers and return
            renderMarkers()
            return
        }

        // Initialize map then render markers and attach listeners
        mapboxgl.accessToken = token
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current as HTMLDivElement,
            style: styleUrl,
            center: [userLocation.longitude, userLocation.latitude],
            zoom: 4,
            attributionControl: true,
        })
        mapRef.current.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'top-right')
        mapRef.current.on('load', () => {
            renderMarkers()
        })
        mapRef.current.on('zoomend', () => {
            renderMarkers()
        })
        const handleResize = () => {
            if (mapRef.current) {
                mapRef.current.resize()
                renderMarkers()
            }
        }
        window.addEventListener('resize', handleResize)
        mapRef.current.on('resize', () => {
            renderMarkers()
        })
        // Observe container size changes (e.g., flex/layout changes) and refresh map/markers
        let resizeObserver: ResizeObserver | null = null
        if (mapContainerRef.current && typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(() => {
                if (mapRef.current) {
                    mapRef.current.resize()
                    renderMarkers()
                }
            })
            resizeObserver.observe(mapContainerRef.current)
        }

        return () => {
            window.removeEventListener('resize', handleResize)
            if (resizeObserver) {
                resizeObserver.disconnect()
                resizeObserver = null
            }
            if (mapRef.current) {
                clearMarkers()
                mapRef.current.remove()
                mapRef.current = null
            }
        }
    }, [isClient, token, styleUrl, isLocationLoading, userLocation])

    useEffect(() => {
        return setupMap()
    }, [setupMap])

    useEffect(() => {
        if (mapRef.current && (typeof mapRef.current.isStyleLoaded !== 'function' || mapRef.current.isStyleLoaded())) {
            try {
                renderMarkersRef.current && renderMarkersRef.current()
            } catch {
                console.error('Error rendering markers')
            }
        }
    }, [coordsByQuery, members])

    return (
        <div className="box-border w-full h-full rounded border border-primary overflow-hidden relative">
            {isLocationLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-primary/50 z-20">
                    <div className="text-primary text-sm">Loading map...</div>
                </div>
            )}
            <div ref={mapContainerRef} className="w-full h-full" />
        </div>
    )
}

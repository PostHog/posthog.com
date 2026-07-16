import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { useUserLocation } from '../../hooks/useUserLocation'
import { BuilderCommunity, communityStatusLabels, communityTypeLabels } from '../../data/builderCommunities'
import {
    computeOffsets,
    getMapbox,
    loadMapbox,
    ensureClusterSource,
    ensureClusterLayers,
    setClusterVisibility,
    CLUSTER_ZOOM,
    isStyleReady,
    DEFAULT_SPREAD_RADIUS,
} from './hogMapUtils'

interface Coordinates {
    latitude: number
    longitude: number
}

const PopupHtml = ({
    name,
    label,
    typeLabel,
    statusLabel,
    isIncubator,
}: {
    name: string
    label: string
    typeLabel: string
    statusLabel: string
    isIncubator: boolean
}): string => {
    return `
        <div class="text-sm max-w-sm text-center text-primary bg-primary p-2 rounded shadow-2xl" data-scheme="primary">
            <div class="font-semibold text-lg">${name}</div>
            <div class="text-secondary">${label}</div>
            <div class="text-secondary mt-1">${typeLabel} · ${statusLabel}</div>
            ${isIncubator ? `<div class="text-orange font-semibold mt-1">PostHog community incubator</div>` : ''}
        </div>`
}

export default function CommunitiesMap({
    communities,
    onCommunityClick,
    selectedCommunityId,
}: {
    communities: BuilderCommunity[]
    onCommunityClick?: (id: number) => void
    selectedCommunityId?: number | null
}): JSX.Element {
    const [isClient, setIsClient] = useState(false)
    const [mapboxReady, setMapboxReady] = useState(false)
    const { location: userLocation, isLoading: isLocationLoading } = useUserLocation()

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        loadMapbox().then((m) => {
            if (m) {
                setMapboxReady(true)
            }
        })
    }, [])

    const mapContainerRef = useRef<HTMLDivElement | null>(null)
    const mapRef = useRef<any>(null)
    const markersRef = useRef<any[]>([])
    const markerByIdRef = useRef<Record<number, any>>({})
    const renderMarkersRef = useRef<(() => void) | null>(null)
    const communitiesRef = useRef<BuilderCommunity[]>([])
    const coordsByIdRef = useRef<Record<number, Coordinates>>({})
    const jitteredCoordsByIdRef = useRef<Record<number, Coordinates>>({})
    const prevSelectedIdRef = useRef<number | null>(null)
    const skipNextSelectionTransitionRef = useRef<boolean>(false)

    const token = typeof window !== 'undefined' ? process.env.GATSBY_MAPBOX_TOKEN : undefined
    const styleUrl = 'mapbox://styles/mapbox/streets-v12'

    // Data is static and curated (lat/lng stored in src/data/builderCommunities.ts),
    // so there's no runtime geocoding here — entries without coordinates just don't get a pin
    const coordsById = useMemo(() => {
        const next: Record<number, Coordinates> = {}
        communities.forEach((community) => {
            const { lat, lng } = community.location
            if (typeof lat === 'number' && typeof lng === 'number') {
                next[community.id] = { latitude: lat, longitude: lng }
            }
        })
        return next
    }, [communities])

    useEffect(() => {
        communitiesRef.current = communities
    }, [communities])

    useEffect(() => {
        coordsByIdRef.current = coordsById
    }, [coordsById])

    // Precompute static spread positions for communities that share the same exact coordinates
    useEffect(() => {
        const byKey: Record<string, { coords: Coordinates; ids: number[] }> = {}
        communities.forEach((community) => {
            const coords = coordsById[community.id]
            if (!coords) return
            const key = `${coords.longitude.toFixed(4)},${coords.latitude.toFixed(4)}`
            if (!byKey[key]) {
                byKey[key] = { coords, ids: [] }
            }
            byKey[key].ids.push(community.id)
        })
        const next: Record<number, Coordinates> = {}
        Object.values(byKey).forEach(({ coords, ids }) => {
            const sortedIds = [...ids].sort((a, b) => a - b)
            const offsets = computeOffsets(sortedIds.length, DEFAULT_SPREAD_RADIUS)
            sortedIds.forEach((id, idx) => {
                const { dx, dy } = offsets[idx] || { dx: 0, dy: 0 }
                next[id] = { latitude: coords.latitude + dy, longitude: coords.longitude + dx }
            })
        })
        jitteredCoordsByIdRef.current = next
        if (mapRef.current && (typeof mapRef.current.isStyleLoaded !== 'function' || mapRef.current.isStyleLoaded())) {
            try {
                renderMarkersRef.current && renderMarkersRef.current()
            } catch {
                // ignore
            }
        }
    }, [communities, coordsById])

    const setupMap = useCallback(() => {
        if (!isClient) {
            return
        }
        if (isLocationLoading) {
            // Wait for location to load before initializing map
            return
        }
        const mapboxgl = getMapbox()
        if (!mapboxgl) {
            return
        }
        if (!token) {
            // No token available on client – do not init the map
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
            markerByIdRef.current = {}

            // Use Mapbox clusters when zoomed out
            if (zoom < CLUSTER_ZOOM) {
                const features = communitiesRef.current
                    .map((community) => {
                        const coords = coordsByIdRef.current[community.id]
                        if (!coords) return null
                        return {
                            type: 'Feature',
                            properties: { type: 'community' },
                            geometry: { type: 'Point', coordinates: [coords.longitude, coords.latitude] },
                        }
                    })
                    .filter(Boolean)
                const data = { type: 'FeatureCollection', features: features as any[] }
                ensureClusterSource(mapRef.current, 'communities-source', data)
                ensureClusterLayers(mapRef.current, 'communities-source')
                setClusterVisibility(mapRef.current, 'communities-source', true)
                // Skip HTML markers in clustered view
                return
            } else {
                setClusterVisibility(mapRef.current, 'communities-source', false)
            }

            communitiesRef.current.forEach((community) => {
                const base = coordsByIdRef.current[community.id]
                if (!base) return
                const jitter = jitteredCoordsByIdRef.current[community.id] || base
                const el = document.createElement('div')
                el.classList.add(
                    'w-5',
                    'h-5',
                    'rounded-full',
                    community.status === 'active' ? 'bg-yellow' : 'bg-gray',
                    'border-2',
                    'border-white',
                    'shadow'
                )
                if (community.posthogIncubator) {
                    el.classList.add('outline', 'outline-2', 'outline-orange')
                }

                const popupHtml = PopupHtml({
                    name: community.name,
                    label: community.location.label,
                    typeLabel: communityTypeLabels[community.type],
                    statusLabel: communityStatusLabels[community.status],
                    isIncubator: !!community.posthogIncubator,
                })
                const popup = new mapboxgl.Popup({ offset: 12, className: 'ph-mapbox-popup' }).setHTML(popupHtml)
                const marker = new mapboxgl.Marker({ element: el })
                    .setLngLat([jitter.longitude, jitter.latitude])
                    .setPopup(popup)
                    .addTo(mapRef.current)
                // Clicking a marker shows the popup and selects the community (no navigation)
                markerByIdRef.current[community.id] = marker
                marker.getElement().style.cursor = 'pointer'
                marker.getElement().addEventListener('click', () => {
                    try {
                        marker.togglePopup()
                    } catch {
                        console.error('Error toggling popup')
                    }
                    if (typeof onCommunityClick === 'function') {
                        try {
                            // Selection originated from map; skip external transition
                            skipNextSelectionTransitionRef.current = true
                            onCommunityClick(community.id)
                        } catch {
                            console.error('Error calling onCommunityClick')
                        }
                    }
                })
                marker.getElement().addEventListener('mouseenter', () => marker.togglePopup())
                marker.getElement().addEventListener('mouseleave', () => marker.togglePopup())
                markersRef.current.push(marker)
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
            zoom: 2,
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
    }, [isClient, mapboxReady, token, styleUrl, isLocationLoading, userLocation])

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
    }, [communities, coordsById])

    const handleExternalSelection = useCallback(() => {
        const id = selectedCommunityId
        if (!mapRef.current || id == null) return
        const coords = jitteredCoordsByIdRef.current[id] || coordsByIdRef.current[id]
        if (!coords) return
        const targetZoom = 8
        // If the selection originated from a map click, just ensure popup is open without camera transition
        if (skipNextSelectionTransitionRef.current) {
            skipNextSelectionTransitionRef.current = false
            const marker = markerByIdRef.current[id]
            if (marker) {
                try {
                    marker.togglePopup()
                } catch {
                    console.error('Error toggling popup')
                }
            }
            return
        }
        const openPopup = () => {
            try {
                const marker = markerByIdRef.current[id]
                if (marker) {
                    try {
                        marker.togglePopup()
                    } catch {
                        console.error('Error toggling popup')
                    }
                }
            } catch {
                console.error('Error opening popup')
            }
        }
        const goToTarget = () => {
            try {
                mapRef.current.easeTo({
                    center: [coords.longitude, coords.latitude],
                    zoom: Math.max(mapRef.current.getZoom ? mapRef.current.getZoom() : targetZoom, targetZoom),
                    duration: 2000,
                })
            } catch {
                console.error('Error easing to coordinates')
            }
            // Open popup after arriving at target
            try {
                if (typeof mapRef.current.once === 'function') {
                    mapRef.current.once('moveend', openPopup)
                } else {
                    setTimeout(openPopup, 950)
                }
            } catch {
                setTimeout(openPopup, 950)
            }
        }
        const prevId = prevSelectedIdRef.current
        prevSelectedIdRef.current = id
        const prevCoords = prevId != null ? coordsByIdRef.current[prevId] : null
        // If switching between two communities, zoom out first for a nicer transition, then zoom in
        if (prevCoords && (prevCoords.latitude !== coords.latitude || prevCoords.longitude !== coords.longitude)) {
            // Midpoint between previous and new locations
            const midLng = (prevCoords.longitude + coords.longitude) / 2
            const midLat = (prevCoords.latitude + coords.latitude) / 2
            const zoomOutLevel = 3
            try {
                mapRef.current.easeTo({
                    center: [midLng, midLat],
                    zoom: Math.min(mapRef.current.getZoom ? mapRef.current.getZoom() : zoomOutLevel, zoomOutLevel),
                    duration: 800,
                })
                if (typeof mapRef.current.once === 'function') {
                    mapRef.current.once('moveend', goToTarget)
                } else {
                    setTimeout(goToTarget, 850)
                }
            } catch {
                goToTarget()
            }
        } else {
            // No previous selection or same spot – just go to target
            goToTarget()
        }
    }, [selectedCommunityId])

    // Focus a marker when a community is selected externally
    useEffect(() => {
        handleExternalSelection()
    }, [handleExternalSelection])

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

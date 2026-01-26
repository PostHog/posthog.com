import React, { useEffect, useRef, useState, useCallback } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import { PlaceType, PlaceItem } from './types'
import { useUser } from '../../hooks/useUser'
import { useUserLocation } from '../../hooks/useUserLocation'
import SearchBar, { createSearchMarker } from './SearchBar'
import { usePlacesMapData, Coordinates } from './PlacesLayer'
import { renderToString } from 'react-dom/server'
import { IconBuilding, IconBed, IconBurger, IconCoffee, IconLaptop, IconTelescope, IconFlask } from '@posthog/icons'
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

// Get icon and color for different place types
export const getPlaceIcon = (type: string, size = 'size-4'): { icon: JSX.Element; colorClass: string } => {
    switch (type) {
        case PlaceType.RESTAURANT:
            return { icon: <IconBurger className={size} />, colorClass: 'bg-red text-white' }
        case PlaceType.COFFEE:
            return { icon: <IconCoffee className={size} />, colorClass: 'bg-yellow text-dark' }
        case PlaceType.HOTEL:
            return { icon: <IconBuilding className={size} />, colorClass: 'bg-blue text-white' }
        case PlaceType.AIRBNB:
            return { icon: <IconBed className={size} />, colorClass: 'bg-purple text-white' }
        case PlaceType.CO_WORKING:
            return { icon: <IconLaptop className={size} />, colorClass: 'bg-green text-white' }
        case PlaceType.BAR:
            return { icon: <IconFlask className={size} />, colorClass: 'bg-teal text-white' }
        case PlaceType.OFFSITE:
            return { icon: <IconTelescope className={size} />, colorClass: 'bg-orange text-white' }
        default:
            return { icon: <IconCoffee className={size} />, colorClass: 'bg-gray text-white' }
    }
}

const PopupHtml = ({ name, address, type }: { name: string; address: string; type: string }): string => {
    return `
        <div class="text-sm max-w-sm text-center text-primary bg-primary p-2 rounded shadow-2xl" data-scheme="primary">
            <div class="font-semibold text-lg mb-1">${name}</div>
            <div class="text-secondary text-xs mb-1">${type}</div>
            ${address ? `<div class="text-secondary">${address}</div>` : ''}
        </div>`
}

export default function PlacesMap({
    layers,
    onPlaceClick,
    selectedPlaceId,
    onPlacesLoaded,
}: {
    layers?: string[]
    onPlaceClick?: (id: number) => void
    selectedPlaceId?: number | null
    onPlacesLoaded?: (places: PlaceItem[]) => void
}): JSX.Element {
    const [isClient, setIsClient] = useState(false)
    const { isModerator, getJwt } = useUser()
    const { location: userLocation, isLoading: isLocationLoading } = useUserLocation()

    useEffect(() => {
        setIsClient(true)
    }, [])

    const mapContainerRef = useRef<HTMLDivElement | null>(null)
    const mapRef = useRef<any>(null)
    const markersRef = useRef<any[]>([])
    const markerByPlaceIdRef = useRef<Record<number, any>>({})
    const renderMarkersRef = useRef<(() => void) | null>(null)
    const placesRef = useRef<PlaceItem[]>([])
    const coordsByPlaceIdRef = useRef<Record<number, { latitude: number; longitude: number }>>({})
    const jitteredCoordsByPlaceIdRef = useRef<Record<number, { latitude: number; longitude: number }>>({})
    const layersRef = useRef<string[] | undefined>(layers)
    const prevSelectedIdRef = useRef<number | null>(null)
    const skipNextSelectionTransitionRef = useRef<boolean>(false)
    const searchRef = useRef<any>(null)
    const searchMarkerRef = useRef<any>(null)

    const token = typeof window !== 'undefined' ? process.env.GATSBY_MAPBOX_TOKEN : undefined
    const styleUrl = 'mapbox://styles/mapbox/streets-v12'

    const { places, coordsByPlaceId } = usePlacesMapData(isClient, getJwt)

    useEffect(() => {
        placesRef.current = places
        // Notify parent component when places are loaded
        if (onPlacesLoaded) {
            onPlacesLoaded(places)
        }
    }, [places, onPlacesLoaded])

    useEffect(() => {
        coordsByPlaceIdRef.current = coordsByPlaceId
    }, [coordsByPlaceId])

    // Precompute static spread positions for places that share the same exact coordinates
    useEffect(() => {
        const byKey: Record<string, { coords: Coordinates; placeIds: number[] }> = {}
        places.forEach((p) => {
            const id = p?.id
            if (id == null) return
            const coords = coordsByPlaceId[id]
            if (!coords) return
            // Group by rounded lat/lng
            const key = `${coords.longitude.toFixed(4)},${coords.latitude.toFixed(4)}`
            if (!byKey[key]) {
                byKey[key] = { coords, placeIds: [] }
            }
            byKey[key].placeIds.push(id)
        })
        const next: Record<number, { latitude: number; longitude: number }> = {}
        Object.values(byKey).forEach(({ coords, placeIds }) => {
            // Stable ordering for deterministic assignment
            const sortedIds = [...placeIds].sort((a, b) => a - b)
            const offsets = computeOffsets(sortedIds.length, DEFAULT_SPREAD_RADIUS)
            sortedIds.forEach((pid, idx) => {
                const { dx, dy } = offsets[idx] || { dx: 0, dy: 0 }
                next[pid] = { latitude: coords.latitude + dy, longitude: coords.longitude + dx }
            })
        })
        jitteredCoordsByPlaceIdRef.current = next
        // If map is ready, refresh markers to reflect the precomputed spread
        if (mapRef.current && (typeof mapRef.current.isStyleLoaded !== 'function' || mapRef.current.isStyleLoaded())) {
            try {
                renderMarkersRef.current && renderMarkersRef.current()
            } catch {
                // ignore
            }
        }
    }, [places, coordsByPlaceId])
    // Refresh markers when the visible layers change
    useEffect(() => {
        layersRef.current = layers
        if (mapRef.current && (typeof mapRef.current.isStyleLoaded !== 'function' || mapRef.current.isStyleLoaded())) {
            try {
                renderMarkersRef.current && renderMarkersRef.current()
            } catch {
                // ignore
            }
        }
    }, [layers])

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
            console.error('No token')
            return
        }
        const clearMarkers = () => {
            markersRef.current.forEach((m) => m.remove())
            markersRef.current = []
        }
        const renderMarkers = () => {
            if (!mapRef.current) return
            if (!isStyleReady(mapRef.current)) return

            clearMarkers()
            const zoom = mapRef.current.getZoom()
            markerByPlaceIdRef.current = {}

            const currentLayers = layersRef.current

            // Filter places by layer if specified
            const filteredPlaces = !Array.isArray(currentLayers)
                ? placesRef.current // Show all if layers is undefined
                : currentLayers.length === 0
                ? [] // Show none if layers is empty array
                : placesRef.current.filter((p) => currentLayers.includes(p.type))

            // Use Mapbox clusters when zoomed out
            if (zoom < CLUSTER_ZOOM) {
                // Create a single cluster for all places together
                const features = filteredPlaces
                    .map((p) => {
                        const coords = coordsByPlaceIdRef.current[p.id]
                        if (!coords) return null
                        return {
                            type: 'Feature',
                            properties: { type: 'place' },
                            geometry: { type: 'Point', coordinates: [coords.longitude, coords.latitude] },
                        }
                    })
                    .filter(Boolean)
                const data = { type: 'FeatureCollection', features: features as any[] }
                ensureClusterSource(mapRef.current, 'places-source', data)
                ensureClusterLayers(mapRef.current, 'places-source')
                setClusterVisibility(mapRef.current, 'places-source', true)
                return
            } else {
                // Hide place clusters when zoomed in
                setClusterVisibility(mapRef.current, 'places-source', false)
            }

            // Render individual markers
            filteredPlaces.forEach((place: PlaceItem) => {
                const base = coordsByPlaceIdRef.current[place.id]
                if (!base) return

                const jitter = jitteredCoordsByPlaceIdRef.current[place.id] || base
                const { icon, colorClass } = getPlaceIcon(place.type)

                // Create marker element with icon
                const el = document.createElement('div')
                el.className = `flex items-center justify-center w-8 h-8 rounded-full ${colorClass} border-2 border-white shadow-lg cursor-pointer`
                el.innerHTML = renderToString(icon)

                const popupHtml = PopupHtml({
                    name: place.name,
                    address: place.address,
                    type: place.type,
                })
                const popup = new mapboxgl.Popup({ offset: 12, className: 'ph-mapbox-popup' }).setHTML(popupHtml)
                const marker = new mapboxgl.Marker({ element: el })
                    .setLngLat([jitter.longitude, jitter.latitude])
                    .setPopup(popup)
                    .addTo(mapRef.current)

                markerByPlaceIdRef.current[place.id] = marker
                marker.getElement().style.cursor = 'pointer'
                marker.getElement().addEventListener('click', () => {
                    try {
                        marker.togglePopup()
                    } catch {
                        console.error('Error toggling popup')
                    }
                    if (typeof onPlaceClick === 'function') {
                        try {
                            skipNextSelectionTransitionRef.current = true
                            onPlaceClick(place.id)
                        } catch {
                            console.error('Error calling onPlaceClick')
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
            zoom: 4,
            attributionControl: true,
        })
        mapRef.current.dragRotate.disable()
        mapRef.current.touchZoomRotate.disableRotation()
        mapRef.current.addControl(new mapboxgl.NavigationControl({ showCompass: false, showZoom: true }), 'top-right')
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
    }, [places, coordsByPlaceId])

    const handleExternalSelection = useCallback(() => {
        const id = selectedPlaceId
        if (!mapRef.current || id == null) return
        const coords = jitteredCoordsByPlaceIdRef.current[id] || coordsByPlaceIdRef.current[id]
        if (!coords) return
        const targetZoom = 8
        if (skipNextSelectionTransitionRef.current) {
            skipNextSelectionTransitionRef.current = false
            const marker = markerByPlaceIdRef.current[id]
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
                const marker = markerByPlaceIdRef.current[id]
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
        const prevCoords = prevId != null ? coordsByPlaceIdRef.current[prevId] : null
        if (prevCoords && (prevCoords.latitude !== coords.latitude || prevCoords.longitude !== coords.longitude)) {
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
            goToTarget()
        }
    }, [selectedPlaceId])

    useEffect(() => {
        handleExternalSelection()
    }, [handleExternalSelection])

    const handleSearchSelect = useCallback(
        (result: { longitude: number; latitude: number; label: string; address: string }) => {
            if (!mapRef.current) return
            const mapboxgl = getMapbox()
            if (!mapboxgl) return

            searchMarkerRef.current = createSearchMarker({
                map: mapRef.current,
                getMapbox,
                longitude: result.longitude,
                latitude: result.latitude,
                label: result.label,
                address: result.address,
                prevMarker: searchMarkerRef.current,
                searchRef,
                getJwt,
            })
        },
        [getJwt]
    )

    return (
        <div className="box-border w-full h-full overflow-hidden relative">
            {isLocationLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-primary/50 z-20">
                    <div className="text-primary text-sm">Loading map...</div>
                </div>
            )}
            <div ref={mapContainerRef} className="w-full h-full" />
            {isModerator && (
                <div className="absolute top-4 left-4 z-10">
                    <SearchBar
                        ref={searchRef}
                        token={token}
                        onSelect={handleSearchSelect}
                        placeholder="Search for a place to add..."
                        className=""
                    />
                </div>
            )}
        </div>
    )
}

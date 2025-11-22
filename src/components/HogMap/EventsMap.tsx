import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useEventsMapData } from './EventsLayer'
import 'mapbox-gl/dist/mapbox-gl.css'
type EventItem = {
    id: number
    date?: string
    name?: string
    link?: string
    location?: { label?: string }
}
import {
    computeOffsets,
    getMapbox,
    ensureClusterSource,
    ensureClusterLayers,
    setClusterVisibility,
    CLUSTER_ZOOM,
    computeJitterRadius,
    isStyleReady,
} from './hogMapUtils'

export const LAYER_EVENTS_UPCOMING = 'layer-events-upcoming'
export const LAYER_EVENTS_PAST = 'layer-events-past'
interface Coordinates {
    latitude: number
    longitude: number
}

const PopupHtml = ({
    name,
    dateText,
    label,
    desc,
    href,
    variant,
}: {
    name: string
    dateText: string
    label: string
    desc: string
    href: string
    variant: 'upcoming' | 'past'
}): string => {
    const linkText = variant === 'past' ? 'Click to view details →' : 'View details →'
    const nameClass = variant === 'past' ? 'font-semibold mb-1 text-lg' : 'font-semibold text-lg'
    return `
        <div class="text-sm max-w-sm text-center text-primary bg-primary p-2 rounded shadow-2xl" data-scheme="primary">
            <div class="${nameClass}">${name}</div>
            ${dateText ? `<div class="text-secondary mb-1">${dateText}</div>` : ''}
            <div class="text-secondary">${label}</div>
            ${desc ? `<div class="text-secondary mt-1">${desc}</div>` : ''}
            ${href ? `<a class="underline font-semibold" href="${href}">${linkText}</a>` : ''}
        </div>`
}

export default function EventsMap({
    layers,
    onEventClick,
    selectedEventId,
}: {
    layers?: string[]
    onEventClick?: (id: number) => void
    selectedEventId?: number | null
}): JSX.Element {
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])

    const mapContainerRef = useRef<HTMLDivElement | null>(null)
    const mapRef = useRef<any>(null)
    const markersRef = useRef<any[]>([])
    const markerByEventIdRef = useRef<Record<number, any>>({})
    const renderMarkersRef = useRef<(() => void) | null>(null)
    const eventsRef = useRef<any[]>([])
    const coordsByEventIdRef = useRef<Record<number, { latitude: number; longitude: number }>>({})
    const layersRef = useRef<string[] | undefined>(layers)
    const prevSelectedIdRef = useRef<number | null>(null)
    const skipNextSelectionTransitionRef = useRef<boolean>(false)

    const token = typeof window !== 'undefined' ? process.env.GATSBY_MAPBOX_TOKEN : undefined
    const styleUrl = 'mapbox://styles/mapbox/streets-v12'

    const { events, coordsByEventId } = useEventsMapData(isClient, token)

    useEffect(() => {
        eventsRef.current = events as any[]
    }, [events])

    useEffect(() => {
        coordsByEventIdRef.current = coordsByEventId
    }, [coordsByEventId])
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
            markerByEventIdRef.current = {}

            const currentLayers = layersRef.current
            const showUpcoming =
                !Array.isArray(currentLayers) ||
                currentLayers.length === 0 ||
                currentLayers.includes(LAYER_EVENTS_UPCOMING)
            const showPast =
                !Array.isArray(currentLayers) || currentLayers.length === 0 || currentLayers.includes(LAYER_EVENTS_PAST)
            const today = new Date()

            // Use Mapbox clusters when zoomed out
            if (zoom < CLUSTER_ZOOM) {
                if (showUpcoming) {
                    const upcomingFeatures = eventsRef.current
                        .filter((e) => (e.date ? new Date(e.date) >= today : false))
                        .map((e) => {
                            const coords = coordsByEventIdRef.current[e.id]
                            if (!coords) return null
                            return {
                                type: 'Feature',
                                properties: { type: 'event-upcoming' },
                                geometry: { type: 'Point', coordinates: [coords.longitude, coords.latitude] },
                            }
                        })
                        .filter(Boolean)
                    const upcomingData = { type: 'FeatureCollection', features: upcomingFeatures as any[] }
                    ensureClusterSource(mapRef.current, 'events-upcoming-source', upcomingData)
                    ensureClusterLayers(mapRef.current, 'events-upcoming-source')
                    setClusterVisibility(mapRef.current, 'events-upcoming-source', true)
                } else {
                    setClusterVisibility(mapRef.current, 'events-upcoming-source', false)
                }
                if (showPast) {
                    const pastFeatures = eventsRef.current
                        .filter((e) => (e.date ? new Date(e.date) < today : false))
                        .map((e) => {
                            const coords = coordsByEventIdRef.current[e.id]
                            if (!coords) return null
                            return {
                                type: 'Feature',
                                properties: { type: 'event-past' },
                                geometry: { type: 'Point', coordinates: [coords.longitude, coords.latitude] },
                            }
                        })
                        .filter(Boolean)
                    const pastData = { type: 'FeatureCollection', features: pastFeatures as any[] }
                    ensureClusterSource(mapRef.current, 'events-past-source', pastData)
                    ensureClusterLayers(mapRef.current, 'events-past-source')
                    setClusterVisibility(mapRef.current, 'events-past-source', true)
                } else {
                    setClusterVisibility(mapRef.current, 'events-past-source', false)
                }
                // Skip HTML markers in clustered view
                return
            } else {
                setClusterVisibility(mapRef.current, 'events-upcoming-source', false)
                setClusterVisibility(mapRef.current, 'events-past-source', false)
            }

            if (showUpcoming) {
                const jitterRadius = computeJitterRadius(zoom)
                // Group upcoming events by coordinate
                const upcomingEvents = eventsRef.current.filter((e) => (e.date ? new Date(e.date) >= today : false))
                const groups = upcomingEvents.reduce((acc, e) => {
                    const coords = coordsByEventIdRef.current[e.id]
                    if (!coords) {
                        return acc
                    }
                    const key = `${coords.longitude.toFixed(4)},${coords.latitude.toFixed(4)}`
                    if (!acc[key]) {
                        acc[key] = {
                            coords,
                            events: [] as EventItem[],
                            label: e.location?.label || 'Event',
                        }
                    }
                    acc[key].events.push(e)
                    return acc
                }, {} as Record<string, { coords: Coordinates; events: EventItem[]; label: string }>)

                ;(Object.values(groups) as Array<{ coords: Coordinates; events: EventItem[]; label: string }>).forEach(
                    ({ coords: { longitude, latitude }, events, label }) => {
                        const offsets = computeOffsets(events.length, jitterRadius)
                        ;(events as EventItem[]).forEach((ev: EventItem, idx: number) => {
                            const { dx, dy } = offsets[idx]
                            const el = document.createElement('div')
                            el.style.width = '20px'
                            el.style.height = '20px'
                            el.style.borderRadius = '10px'
                            el.style.background = '#FF9500' // upcoming
                            el.style.border = '2px solid #ffffff'
                            el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.25)'

                            const date = ev.date
                                ? new Date(ev.date).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                  })
                                : ''
                            const href = ev.link || ''
                            const name = ev.name || 'Event'
                            const desc = (ev as any).description || ''
                            const popupHtml = PopupHtml({
                                name,
                                dateText: date,
                                label,
                                desc,
                                href,
                                variant: 'upcoming',
                            })
                            const popup = new mapboxgl.Popup({ offset: 12, className: 'ph-mapbox-popup' }).setHTML(
                                popupHtml
                            )

                            const marker = new mapboxgl.Marker({ element: el })
                                .setLngLat([longitude + dx, latitude + dy])
                                .setPopup(popup)
                                .addTo(mapRef.current)
                            // Clicking a marker should show the popup (no navigation)
                            markerByEventIdRef.current[ev.id] = marker
                            marker.getElement().style.cursor = 'pointer'
                            marker.getElement().addEventListener('click', () => {
                                try {
                                    marker.togglePopup()
                                } catch {
                                    console.error('Error toggling popup')
                                }
                                if (typeof onEventClick === 'function') {
                                    try {
                                        // Selection originated from map; skip external transition
                                        skipNextSelectionTransitionRef.current = true
                                        onEventClick(ev.id as number)
                                    } catch {
                                        console.error('Error calling onEventClick')
                                    }
                                }
                            })
                            marker.getElement().addEventListener('mouseenter', () => marker.togglePopup())
                            marker.getElement().addEventListener('mouseleave', () => marker.togglePopup())
                            markersRef.current.push(marker)
                        })
                    }
                )
            }
            if (showPast) {
                const jitterRadius = computeJitterRadius(zoom)
                // Group past events by coordinate
                const pastEvents = eventsRef.current.filter((e) => (e.date ? new Date(e.date) < today : false))
                const groups = pastEvents.reduce((acc, e) => {
                    const coords = coordsByEventIdRef.current[e.id]
                    if (!coords) {
                        return acc
                    }
                    const key = `${coords.longitude.toFixed(4)},${coords.latitude.toFixed(4)}`
                    if (!acc[key]) {
                        acc[key] = {
                            coords,
                            events: [] as EventItem[],
                            label: e.location?.label || 'Event',
                        }
                    }
                    acc[key].events.push(e)
                    return acc
                }, {} as Record<string, { coords: Coordinates; events: EventItem[]; label: string }>)

                ;(Object.values(groups) as Array<{ coords: Coordinates; events: EventItem[]; label: string }>).forEach(
                    ({ coords: { longitude, latitude }, events, label }) => {
                        const offsets = computeOffsets(events.length, jitterRadius)
                        ;(events as EventItem[]).forEach((ev: EventItem, idx: number) => {
                            const { dx, dy } = offsets[idx]
                            const el = document.createElement('div')
                            el.classList.add(
                                'w-5',
                                'h-5',
                                'rounded-full',
                                'bg-gray',
                                'border-2',
                                'border-white',
                                'shadow'
                            )

                            const date = ev.date
                                ? new Date(ev.date).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                  })
                                : ''
                            const href = ev.link || ''
                            const name = ev.name || 'Event'
                            const desc = (ev as any).description || ''
                            const popupHtml = PopupHtml({
                                name,
                                dateText: date,
                                label,
                                desc,
                                href,
                                variant: 'past',
                            })
                            const popup = new mapboxgl.Popup({ offset: 12, className: 'ph-mapbox-popup' }).setHTML(
                                popupHtml
                            )

                            const marker = new mapboxgl.Marker({ element: el })
                                .setLngLat([longitude + dx, latitude + dy])
                                .setPopup(popup)
                                .addTo(mapRef.current)
                            // Clicking a marker should show the popup (no navigation)
                            markerByEventIdRef.current[ev.id] = marker
                            marker.getElement().style.cursor = 'pointer'
                            marker.getElement().addEventListener('click', () => {
                                try {
                                    marker.togglePopup()
                                } catch {
                                    console.error('Error toggling popup')
                                }
                                if (typeof onEventClick === 'function') {
                                    try {
                                        // Selection originated from map; skip external transition
                                        skipNextSelectionTransitionRef.current = true
                                        onEventClick(ev.id as number)
                                    } catch {
                                        console.error('Error calling onEventClick')
                                    }
                                }
                            })
                            marker.getElement().addEventListener('mouseenter', () => marker.togglePopup())
                            marker.getElement().addEventListener('mouseleave', () => marker.togglePopup())
                            markersRef.current.push(marker)
                        })
                    }
                )
            }
            // No places or people in EventsMap
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
            center: [-0.1276, 51.5074], // London
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
    }, [isClient, token, styleUrl])

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
    }, [events, coordsByEventId])

    const handleExternalSelection = useCallback(() => {
        const id = selectedEventId
        if (!mapRef.current || id == null) return
        const coords = coordsByEventIdRef.current[id]
        if (!coords) return
        const targetZoom = 8
        // If the selection originated from a map click, just ensure popup is open without camera transition
        if (skipNextSelectionTransitionRef.current) {
            skipNextSelectionTransitionRef.current = false
            const marker = markerByEventIdRef.current[id]
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
                const marker = markerByEventIdRef.current[id]
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
        const prevCoords = prevId != null ? coordsByEventIdRef.current[prevId] : null
        // If switching between two events, zoom out first for a nicer transition, then zoom in
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
    }, [selectedEventId])

    // Focus a marker when an event is selected externally
    useEffect(() => {
        handleExternalSelection()
    }, [handleExternalSelection])

    return (
        <div className="box-border w-full h-full rounded border border-primary overflow-hidden">
            <div ref={mapContainerRef} className="w-full h-full" />
        </div>
    )
}

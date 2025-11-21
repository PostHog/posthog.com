import React, { useEffect, useRef, useState } from 'react'
import { useEventsMapData } from './EventsLayer'
import 'mapbox-gl/dist/mapbox-gl.css'
import { EventItem } from './types'

export const LAYER_EVENTS_UPCOMING = 'layer-events-upcoming'
export const LAYER_EVENTS_PAST = 'layer-events-past'
interface Coordinates {
    latitude: number
    longitude: number
}

// Delay requiring mapbox-gl until client to avoid SSR issues
const getMapbox = () => {
    if (typeof window === 'undefined') {
        return null
    }
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mapboxgl = require('mapbox-gl')
    return mapboxgl
}

// Compute small lat/lng offsets to spread overlapping markers
const computeOffsets = (count: number, baseRadius: number): Array<{ dx: number; dy: number }> => {
    if (count <= 1) {
        return [{ dx: 0, dy: 0 }]
    }
    const offsets: Array<{ dx: number; dy: number }> = []
    const rings = Math.ceil((count - 1) / 6)
    let remaining = count
    for (let ring = 1; remaining > 0; ring++) {
        const inRing = Math.min(6, remaining)
        const radius = baseRadius * ring * 1.5
        for (let i = 0; i < inRing; i++) {
            const angle = (i / inRing) * Math.PI * 2
            const dx = radius * Math.cos(angle)
            const dy = radius * Math.sin(angle)
            offsets.push({ dx, dy })
        }
        remaining -= inRing
        if (ring >= rings) {
            break
        }
    }
    while (offsets.length < count) {
        offsets.push({ dx: 0, dy: 0 })
    }
    return offsets
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
    useEffect(() => {
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
        const CLUSTER_ZOOM = 4
        const clearMarkers = () => {
            markersRef.current.forEach((m) => m.remove())
            markersRef.current = []
        }
        const ensureClusterSource = (id: string, data: any) => {
            if (!mapRef.current) return
            const existing = mapRef.current.getSource(id) as any
            if (existing) {
                existing.setData(data)
                return
            }
            mapRef.current.addSource(id, {
                type: 'geojson',
                data,
                cluster: true,
                clusterMaxZoom: 12,
                clusterRadius: 50,
            } as any)
        }
        const ensureClusterLayers = (id: string) => {
            if (!mapRef.current) return
            const clustersId = `${id}-clusters`
            const countId = `${id}-cluster-count`
            if (!mapRef.current.getLayer(clustersId)) {
                mapRef.current.addLayer({
                    id: clustersId,
                    type: 'circle',
                    source: id,
                    filter: ['has', 'point_count'],
                    paint: {
                        'circle-color': '#111827',
                        'circle-stroke-color': '#ffffff',
                        'circle-stroke-width': 2,
                        'circle-radius': ['step', ['get', 'point_count'], 14, 10, 18, 25, 24],
                    },
                } as any)
            }
            if (!mapRef.current.getLayer(countId)) {
                mapRef.current.addLayer({
                    id: countId,
                    type: 'symbol',
                    source: id,
                    filter: ['has', 'point_count'],
                    layout: {
                        'text-field': '{point_count_abbreviated}',
                        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                        'text-size': 12,
                    },
                    paint: {
                        'text-color': '#ffffff',
                    },
                } as any)
            }
            const clickHandler = (e: any) => {
                const features = mapRef.current.queryRenderedFeatures(e.point, { layers: [clustersId] })
                const clusterId = features?.[0]?.properties?.cluster_id
                const source = mapRef.current.getSource(id) as any
                if (clusterId && source && source.getClusterExpansionZoom) {
                    source.getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
                        if (err) return
                        mapRef.current.easeTo({ center: features[0].geometry.coordinates, zoom })
                    })
                }
            }
            mapRef.current.off('click', clustersId, clickHandler)
            mapRef.current.on('click', clustersId, clickHandler)
        }
        const setClusterVisibility = (id: string, visible: boolean) => {
            if (!mapRef.current) return
            const clustersId = `${id}-clusters`
            const countId = `${id}-cluster-count`
            ;[clustersId, countId].forEach((layerId) => {
                if (mapRef.current.getLayer(layerId)) {
                    mapRef.current.setLayoutProperty(layerId, 'visibility', visible ? 'visible' : 'none')
                }
            })
        }
        const renderMarkers = () => {
            if (!mapRef.current) return
            // Avoid manipulating sources/layers before the style is fully loaded
            if (typeof mapRef.current.isStyleLoaded === 'function' && !mapRef.current.isStyleLoaded()) {
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
                    ensureClusterSource('events-upcoming-source', upcomingData)
                    ensureClusterLayers('events-upcoming-source')
                    setClusterVisibility('events-upcoming-source', true)
                } else {
                    setClusterVisibility('events-upcoming-source', false)
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
                    ensureClusterSource('events-past-source', pastData)
                    ensureClusterLayers('events-past-source')
                    setClusterVisibility('events-past-source', true)
                } else {
                    setClusterVisibility('events-past-source', false)
                }
                // Skip HTML markers in clustered view
                return
            } else {
                setClusterVisibility('events-upcoming-source', false)
                setClusterVisibility('events-past-source', false)
            }

            if (showUpcoming) {
                const jitterRadius = Math.max(0.0001, Math.min(1.8, 1.8 / Math.pow(Math.max(zoom, 1), 2.8)))
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
                            const popupHtml = `
                            <div class="text-sm max-w-sm text-center text-primary bg-primary p-2 rounded shadow-2xl" data-scheme="primary">
                                <div class="font-semibold text-lg">${name}</div>
                                ${date ? `<div class="text-secondary mb-1">${date}</div>` : ''}
                                <div class="text-secondary">${label}</div>
                                ${desc ? `<div class="text-secondary mt-1">${desc}</div>` : ''}
                                ${href ? `<a class="underline font-semibold" href="${href}">View details →</a>` : ''}
                            </div>`
                            const popup = new mapboxgl.Popup({ offset: 12 }).setHTML(popupHtml)

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
                const jitterRadius = Math.max(0.0001, Math.min(1.8, 1.8 / Math.pow(Math.max(zoom, 1), 2.8)))
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
                            const popupHtml = `
                            <div class="text-sm max-w-sm text-center text-primary bg-primary p-2 rounded shadow-2xl" data-scheme="primary">
                                <div class="font-semibold mb-1 text-lg">${name}</div>
                                ${date ? `<div class="text-secondary mb-1">${date}</div>` : ''}
                                <div class="text-secondary">${label}</div>
                                ${desc ? `<div class="text-secondary mt-1">${desc}</div>` : ''}
                                ${
                                    href
                                        ? `<a class="underline font-semibold" href="${href}">Click to view details →</a>`
                                        : ''
                                }
                            </div>`
                            const popup = new mapboxgl.Popup({ offset: 12 }).setHTML(popupHtml)

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
        if (mapRef.current && (typeof mapRef.current.isStyleLoaded !== 'function' || mapRef.current.isStyleLoaded())) {
            try {
                renderMarkersRef.current && renderMarkersRef.current()
            } catch {
                console.error('Error rendering markers')
            }
        }
    }, [events, coordsByEventId])

    // Focus a marker when an event is selected externally
    useEffect(() => {
        const id = selectedEventId
        if (!mapRef.current || id == null) return
        const coords = coordsByEventIdRef.current[id]
        if (!coords) return
        const targetZoom = 8
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
                    duration: 900,
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

    return (
        <div className="box-border w-full h-full rounded border border-primary overflow-hidden">
            <div ref={mapContainerRef} className="w-full h-full" />
        </div>
    )
}

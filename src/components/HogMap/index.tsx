import React, { useEffect, useRef, useState } from 'react'
import { usePeopleMapData, ProfileNode, Coordinates } from './PeopleLayer'
import { useEventsMapData, EventItem } from './EventsLayer'
import { navigate } from 'gatsby'
import 'mapbox-gl/dist/mapbox-gl.css'

export const LAYER_PEOPLE = 'layer-people'
export const LAYER_EVENTS = 'layer-events'

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
        const radius = baseRadius * ring
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

export default function HogMap({ layers }: { layers: string[] }): JSX.Element {
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])

    const mapContainerRef = useRef<HTMLDivElement | null>(null)
    const mapRef = useRef<any>(null)
    const markersRef = useRef<any[]>([])

    const token = typeof window !== 'undefined' ? process.env.GATSBY_MAPBOX_TOKEN : undefined
    const styleUrl = 'mapbox://styles/mapbox/streets-v12'

    const { members, coordsByQuery } = usePeopleMapData(isClient, token)
    const { events, coordsByEventId } = useEventsMapData(isClient, token)

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

            const showPeople = Array.isArray(layers) && layers.includes(LAYER_PEOPLE)
            const showEvents = Array.isArray(layers) && layers.includes(LAYER_EVENTS)

            // Use Mapbox clusters when zoomed out
            if (zoom < CLUSTER_ZOOM) {
                if (showPeople) {
                    const peopleFeatures = members
                        .map((m) => {
                            const q = (m.location && m.location.trim()) || (m.country && m.country.trim())
                            if (!q) return null
                            const coords = coordsByQuery[q]
                            if (!coords) return null
                            return {
                                type: 'Feature',
                                properties: { type: 'person' },
                                geometry: { type: 'Point', coordinates: [coords.longitude, coords.latitude] },
                            }
                        })
                        .filter(Boolean)
                    const peopleData = { type: 'FeatureCollection', features: peopleFeatures as any[] }
                    ensureClusterSource('people-source', peopleData)
                    ensureClusterLayers('people-source')
                    setClusterVisibility('people-source', true)
                } else {
                    setClusterVisibility('people-source', false)
                }
                if (showEvents) {
                    const eventFeatures = events
                        .map((e) => {
                            const coords = coordsByEventId[e.id]
                            if (!coords) return null
                            return {
                                type: 'Feature',
                                properties: { type: 'event' },
                                geometry: { type: 'Point', coordinates: [coords.longitude, coords.latitude] },
                            }
                        })
                        .filter(Boolean)
                    const eventsData = { type: 'FeatureCollection', features: eventFeatures as any[] }
                    ensureClusterSource('events-source', eventsData)
                    ensureClusterLayers('events-source')
                    setClusterVisibility('events-source', true)
                } else {
                    setClusterVisibility('events-source', false)
                }
                // Skip HTML markers in clustered view
                return
            } else {
                setClusterVisibility('people-source', false)
                setClusterVisibility('events-source', false)
            }

            if (showPeople) {
                // Jitter radius scales with zoom (more spread when zoomed out, less when zoomed in)
                const jitterRadius = Math.max(0.003, 0.08 / Math.max(zoom, 1))
                // Group members by their geocode query so people in the same location are combined
                const groups = members.reduce((acc, m) => {
                    const q = (m.location && m.location.trim()) || (m.country && m.country.trim())
                    if (!q) {
                        return acc
                    }
                    const coords = coordsByQuery[q]
                    if (!coords) {
                        return acc
                    }
                    if (!acc[q]) {
                        acc[q] = { coords, profiles: [] as ProfileNode[], label: q }
                    }
                    acc[q].profiles.push(m)
                    return acc
                }, {} as Record<string, { coords: Coordinates; profiles: ProfileNode[]; label: string }>)

                Object.values(groups).forEach(({ coords: { longitude, latitude }, profiles, label }) => {
                    const avatarFallback =
                        'https://res.cloudinary.com/dmukukwp6/image/upload/v1698231117/max_6942263bd1.png'
                    const offsets = computeOffsets(profiles.length, jitterRadius)
                    profiles.forEach((p, idx) => {
                        const { dx, dy } = offsets[idx]
                        const el = document.createElement('div')
                        el.style.width = '48px'
                        el.style.height = '48px'
                        el.style.borderRadius = '50%'
                        el.style.display = 'flex'
                        el.style.alignItems = 'center'
                        el.style.justifyContent = 'center'
                        el.style.overflow = 'hidden'
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
                        const popupHtml = `
                            <div class="text-sm max-w-[240px]">
                                <div class="font-semibold mb-1">${name || 'Team member'}</div>
                                ${role ? `<div class="text-secondary mb-1">${role}</div>` : ''}
                                <div class="text-secondary">${label}</div>
                                ${
                                    href
                                        ? `<span class="underline font-semibold cursor-pointer" onclick="window.open('${href}', '_blank', 'noopener,noreferrer')">Click to view profile →</span>`
                                        : ''
                                }
                            </div>`
                        const popup = new mapboxgl.Popup({ offset: 12 }).setHTML(popupHtml)
                        const marker = new mapboxgl.Marker({ element: el })
                            .setLngLat([longitude + dx, latitude + dy])
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

            if (showEvents) {
                const jitterRadius = Math.max(0.003, 0.08 / Math.max(zoom, 1))
                // Group events by coordinate (rounded) to combine overlapping markers
                const groups = events.reduce((acc, e) => {
                    const coords = coordsByEventId[e.id]
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

                Object.values(groups).forEach(({ coords: { longitude, latitude }, events, label }) => {
                    const offsets = computeOffsets(events.length, jitterRadius)
                    events.forEach((ev, idx) => {
                        const { dx, dy } = offsets[idx]
                        const el = document.createElement('div')
                        el.style.width = '20px'
                        el.style.height = '20px'
                        el.style.borderRadius = '10px'
                        el.style.background = '#FF9500'
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
                        const popupHtml = `
                            <div class="text-sm max-w-[240px]">
                                <div class="font-semibold mb-1">${name}</div>
                                ${date ? `<div class="text-secondary mb-1">${date}</div>` : ''}
                                <div class="text-secondary">${label}</div>
                                ${href ? `<a class="underline font-semibold" href="${href}">View details →</a>` : ''}
                            </div>`
                        const popup = new mapboxgl.Popup({ offset: 12 }).setHTML(popupHtml)

                        const marker = new mapboxgl.Marker({ element: el })
                            .setLngLat([longitude + dx, latitude + dy])
                            .setPopup(popup)
                            .addTo(mapRef.current)
                        if (href) {
                            marker.getElement().style.cursor = 'pointer'
                            marker.getElement().addEventListener('click', () => {
                                if (href.startsWith('/')) {
                                    navigate(href, { state: { newWindow: true } })
                                } else if (typeof window !== 'undefined') {
                                    window.open(href, '_blank', 'noopener,noreferrer')
                                }
                            })
                        } else {
                            marker.getElement().style.cursor = 'pointer'
                            marker.getElement().addEventListener('click', () => {
                                navigate('/events', { state: { newWindow: true } })
                            })
                        }
                        marker.getElement().addEventListener('mouseenter', () => marker.togglePopup())
                        marker.getElement().addEventListener('mouseleave', () => marker.togglePopup())
                        markersRef.current.push(marker)
                    })
                })
            }
        }

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
            center: [0, 20],
            zoom: 1.1,
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
    }, [isClient, token, styleUrl, coordsByQuery, members, layers, events, coordsByEventId])

    return (
        <div className="box-border w-full h-full rounded border border-primary overflow-hidden">
            <div ref={mapContainerRef} className="w-full h-full" />
        </div>
    )
}

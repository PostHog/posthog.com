import React, { useEffect, useRef, useState } from 'react'
import { usePeopleMapData, ProfileNode, Coordinates } from './PeopleLayer'
import { useEventsMapData } from './EventsLayer'
import { navigate } from 'gatsby'
import 'mapbox-gl/dist/mapbox-gl.css'
import Menu from './Menu'
import SearchBar, { createSearchMarker } from './SearchBar'
import { PlaceType, EventType } from './types'
import { getPlaces } from './data'
import { EventItem } from './types'
import { IconBuilding, IconBed, IconBurger, IconCoffee, IconLaptop, IconTelescope } from '@posthog/icons'
import { renderToStaticMarkup } from 'react-dom/server'
import { createAlienSkyboxLayer, loadThreeJS } from './HogAlien'
import { useUser } from 'hooks/useUser'

export const LAYER_PEOPLE = 'layer-people'
export const LAYER_EVENTS_UPCOMING = 'layer-events-upcoming'
export const LAYER_EVENTS_PAST = 'layer-events-past'
export const LAYER_PLACES = 'layer-places'
export const LAYER_OFFSITES_UPCOMING = 'layer-offsites-upcoming'
export const LAYER_OFFSITES_PAST = 'layer-offsites-past'

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

export default function HogMap({ layers }: { layers?: string[] }): JSX.Element {
    const [isClient, setIsClient] = useState(false)
    const { getJwt } = useUser()
    useEffect(() => {
        setIsClient(true)
    }, [])

    const mapContainerRef = useRef<HTMLDivElement | null>(null)
    const mapRef = useRef<any>(null)
    const markersRef = useRef<any[]>([])
    const searchMarkerRef = useRef<any>(null)
    const searchRef = useRef<any>(null)
    const renderMarkersRef = useRef<(() => void) | null>(null)
    const enabledLayersRef = useRef<string[]>([])
    const membersRef = useRef<ProfileNode[]>([])
    const coordsByQueryRef = useRef<Record<string, Coordinates>>({})
    const eventsRef = useRef<any[]>([])
    const coordsByEventIdRef = useRef<Record<number, { latitude: number; longitude: number }>>({})

    const token = typeof window !== 'undefined' ? process.env.GATSBY_MAPBOX_TOKEN : undefined
    const styleUrl = 'mapbox://styles/mapbox/streets-v12'

    const { members, coordsByQuery } = usePeopleMapData(isClient, token)
    const { events, coordsByEventId } = useEventsMapData(isClient, token)

    const normalizeLayers = (input: string[] | undefined): string[] => {
        const result = new Set<string>()
        const items = Array.isArray(input) ? input : []
        items.forEach((l) => {
            if (l === LAYER_PEOPLE) {
                result.add(LAYER_PEOPLE)
            } else if (l === 'layer-events' /* backward compat */) {
                result.add(LAYER_EVENTS_UPCOMING)
                result.add(LAYER_EVENTS_PAST)
            } else if (l === LAYER_EVENTS_UPCOMING) {
                result.add(LAYER_EVENTS_UPCOMING)
            } else if (l === LAYER_EVENTS_PAST) {
                result.add(LAYER_EVENTS_PAST)
            } else if (Object.values(PlaceType).includes(l as PlaceType)) {
                result.add(l)
            } else if (Object.values(EventType).includes(l as EventType)) {
                result.add(l)
            }
        })
        if (result.size === 0) {
            // default to all layers when none provided
            result.add(LAYER_PEOPLE)
            result.add(LAYER_EVENTS_UPCOMING)
            result.add(LAYER_EVENTS_PAST)
            Object.values(PlaceType).forEach((pt) => result.add(pt))
            Object.values(EventType).forEach((et) => result.add(et))
        }
        return Array.from(result)
    }

    const [enabledLayers, setEnabledLayers] = useState<string[]>(normalizeLayers(layers))
    const toggleLayer = (layer: string) => {
        setEnabledLayers((prev) => (prev.includes(layer) ? prev.filter((l) => l !== layer) : [...prev, layer]))
    }

    // Keep internal state in sync if the caller passes new layers prop
    useEffect(() => {
        const next = normalizeLayers(layers)
        setEnabledLayers(next)
    }, [layers])
    useEffect(() => {
        enabledLayersRef.current = enabledLayers
    }, [enabledLayers])
    useEffect(() => {
        membersRef.current = members
    }, [members])
    useEffect(() => {
        coordsByQueryRef.current = coordsByQuery
    }, [coordsByQuery])
    useEffect(() => {
        eventsRef.current = events as any[]
    }, [events])
    useEffect(() => {
        coordsByEventIdRef.current = coordsByEventId
    }, [coordsByEventId])
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

            const currentEnabled = enabledLayersRef.current
            const showPeople = Array.isArray(currentEnabled) && currentEnabled.includes(LAYER_PEOPLE)
            const showUpcoming = Array.isArray(currentEnabled) && currentEnabled.includes(LAYER_EVENTS_UPCOMING)
            const showPast = Array.isArray(currentEnabled) && currentEnabled.includes(LAYER_EVENTS_PAST)
            const today = new Date()

            // Use Mapbox clusters when zoomed out
            if (zoom < CLUSTER_ZOOM) {
                if (showPeople) {
                    const peopleFeatures = membersRef.current
                        .map((m) => {
                            const q = (m.location && m.location.trim()) || (m.country && m.country.trim())
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
                    ensureClusterSource('people-source', peopleData)
                    ensureClusterLayers('people-source')
                    setClusterVisibility('people-source', true)
                } else {
                    setClusterVisibility('people-source', false)
                }
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
                setClusterVisibility('people-source', false)
                setClusterVisibility('events-upcoming-source', false)
                setClusterVisibility('events-past-source', false)
            }

            if (showPeople) {
                // Jitter radius scales with zoom (much more spread when zoomed out, tighter when zoomed in)
                const jitterRadius = Math.max(0.0001, Math.min(1.8, 1.8 / Math.pow(Math.max(zoom, 1), 2.8)))
                // Group members by their geocode query so people in the same location are combined
                const groups = membersRef.current.reduce((acc, m) => {
                    const q = (m.location && m.location.trim()) || (m.country && m.country.trim())
                    if (!q) {
                        return acc
                    }
                    const coords = coordsByQueryRef.current[q]
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
                                'bg-muted',
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
                    }
                )
            }
            // Render saved places if their place-type layers are enabled
            const activePlaceTypes = Object.values(PlaceType).filter((pt) => currentEnabled.includes(pt))
            if (activePlaceTypes.length > 0) {
                const jitterRadius = Math.max(0.0001, Math.min(1.8, 1.8 / Math.pow(Math.max(zoom, 1), 2.8)))
                getJwt().then((jwt) => {
                    if (!jwt) return
                    getPlaces(jwt).then((allPlaces: any[]) => {
                        const activePlaces = (allPlaces as any[]).filter((p: any) =>
                            activePlaceTypes.includes(p.type as PlaceType)
                        )
                        const groups = (activePlaces as any[]).reduce(
                            (acc: Record<string, { coords: Coordinates; places: any[] }>, p: any) => {
                                const lon = Number(p.longitude)
                                const lat = Number(p.latitude)
                                const key = `${lon.toFixed(4)},${lat.toFixed(4)}`
                                if (!acc[key]) {
                                    acc[key] = {
                                        coords: { longitude: lon, latitude: lat },
                                        places: [] as any[],
                                    }
                                }
                                acc[key].places.push(p as any)
                                return acc
                            },
                            {} as Record<string, { coords: Coordinates; places: any[] }>
                        )
                        ;(Object.values(groups) as Array<{ coords: Coordinates; places: any[] }>).forEach(
                            ({ coords: { longitude, latitude }, places }) => {
                                const offsets = computeOffsets(places.length, jitterRadius)
                                ;(places as any[]).forEach((pl: any, idx: number) => {
                                    const { dx, dy } = offsets[idx]
                                    const el = document.createElement('div')
                                    el.className =
                                        'w-[24px] h-[24px] rounded-full bg-orange border-2 border-white shadow-md flex items-center justify-center'
                                    // Icon based on place type
                                    const lowerType = String((pl as any).type || '').toLowerCase()
                                    const icon =
                                        lowerType === 'hotel' ? (
                                            <IconBuilding className="w-[24px] h-[24px] p-1" />
                                        ) : lowerType === 'airbnb' ? (
                                            <IconBed className="w-[24px] h-[24px] p-1" />
                                        ) : lowerType === 'restaurant' ? (
                                            <IconBurger className="w-[24px] h-[24px] p-1" />
                                        ) : lowerType === 'cafe' ? (
                                            <IconCoffee className="w-[24px] h-[24px] p-1" />
                                        ) : lowerType === 'co-working' ? (
                                            <IconLaptop className="w-[24px] h-[24px] p-1" />
                                        ) : lowerType === 'offsite' ? (
                                            <IconTelescope className="w-[24px] h-[24px] p-1" />
                                        ) : (
                                            <IconBuilding className="w-[24px] h-[24px] p-1" />
                                        )
                                    const iconWrapper = document.createElement('div')
                                    iconWrapper.className = 'text-white leading-none flex items-center justify-center'
                                    iconWrapper.innerHTML = renderToStaticMarkup(icon)
                                    el.appendChild(iconWrapper)
                                    const popupHtml = `
                                    <div class="text-sm max-w-[240px]">
                                         <div class="font-semibold mb-1">${(pl as any).name}</div>
                                         ${
                                             (pl as any).address
                                                 ? `<div class="text-secondary mb-1">${(pl as any).address}</div>`
                                                 : ''
                                         }
                                         <div class="text-secondary">Lat ${Number((pl as any).latitude).toFixed(
                                             5
                                         )}, Lng ${Number((pl as any).longitude).toFixed(5)}</div>
                                         <div class="mt-1 text-secondary capitalize">${(pl as any).type}</div>
                                    </div>`
                                    const mapboxgl = getMapbox()
                                    if (!mapboxgl) return
                                    const popup = new mapboxgl.Popup({ offset: 12 }).setHTML(popupHtml)
                                    const marker = new mapboxgl.Marker({ element: el })
                                        .setLngLat([longitude + dx, latitude + dy])
                                        .setPopup(popup)
                                        .addTo(mapRef.current)
                                    marker.getElement().addEventListener('mouseenter', () => marker.togglePopup())
                                    marker.getElement().addEventListener('mouseleave', () => marker.togglePopup())
                                    markersRef.current.push(marker)
                                })
                            }
                        )
                    })
                })
            }
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
            projection: { name: 'globe' },
        })
        mapRef.current.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'top-right')

        // Load Three.js and add alien skybox layer
        loadThreeJS()
            .then(() => {
                const alienSkyboxLayer = createAlienSkyboxLayer()
                if (alienSkyboxLayer && mapRef.current && mapRef.current.isStyleLoaded()) {
                    if (!mapRef.current.getLayer('alien-skybox')) {
                        // Add before the first layer so it appears behind everything
                        const layers = mapRef.current.getStyle()?.layers
                        const firstLayerId = layers && layers.length > 0 ? layers[0].id : undefined
                        mapRef.current.addLayer(alienSkyboxLayer, firstLayerId)
                    }
                }
            })
            .catch((err) => {
                console.warn('Failed to load alien skybox:', err)
            })

        mapRef.current.on('load', () => {
            // Add the alien skybox layer when style is loaded
            const alienSkyboxLayer = createAlienSkyboxLayer()
            if (alienSkyboxLayer && mapRef.current && !mapRef.current.getLayer('alien-skybox')) {
                const layers = mapRef.current.getStyle()?.layers
                const firstLayerId = layers && layers.length > 0 ? layers[0].id : undefined
                mapRef.current.addLayer(alienSkyboxLayer, firstLayerId)
            }

            // Configure sky layer for atmosphere
            if (!mapRef.current.getLayer('sky')) {
                mapRef.current.addLayer({
                    id: 'sky',
                    type: 'sky',
                    paint: {
                        'sky-type': 'atmosphere',
                        'sky-atmosphere-sun': [0.0, 90.0],
                        'sky-atmosphere-sun-intensity': 5,
                    },
                })
            }

            renderMarkers()
        })
        mapRef.current.on('zoomend', () => {
            renderMarkers()
        })
        // Re-render when places array is updated elsewhere
        const onPlacesUpdated = () => renderMarkers()
        window.addEventListener('hogmap:places-updated', onPlacesUpdated)
        // Enable specific layer on demand (e.g., when adding a place)
        const onEnableLayer = (e: any) => {
            const layer = e?.detail?.layer as string | undefined
            if (!layer) return
            setEnabledLayers((prev) => (prev.includes(layer) ? prev : [...prev, layer]))
            // Also re-render to reflect new visibility
            renderMarkers()
        }
        window.addEventListener('hogmap:enable-layer', onEnableLayer)
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
            window.removeEventListener('hogmap:places-updated', onPlacesUpdated)
            window.removeEventListener('hogmap:enable-layer', onEnableLayer)
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
    }, [coordsByQuery, members, enabledLayers, events, coordsByEventId])

    return (
        <div className="box-border w-full h-full rounded border border-primary overflow-hidden">
            {typeof layers === 'undefined' && (
                <Menu
                    enabledLayers={enabledLayers}
                    onToggle={toggleLayer}
                    ids={{
                        people: LAYER_PEOPLE,
                        upcoming: LAYER_EVENTS_UPCOMING,
                        past: LAYER_EVENTS_PAST,
                    }}
                />
            )}
            {token && (
                <div className="absolute top-3 left-3 z-10">
                    <SearchBar
                        ref={searchRef}
                        token={token}
                        onSelect={({
                            longitude,
                            latitude,
                            label,
                            address,
                        }: {
                            longitude: number
                            latitude: number
                            label?: string
                            address?: string
                        }) => {
                            const newMarker = createSearchMarker({
                                map: mapRef.current,
                                getMapbox,
                                longitude,
                                latitude,
                                label,
                                address,
                                prevMarker: searchMarkerRef.current,
                                searchRef,
                                getJwt,
                            })
                            if (newMarker) {
                                searchMarkerRef.current = newMarker
                            }
                        }}
                    />
                </div>
            )}
            <div ref={mapContainerRef} className="w-full h-full" />
        </div>
    )
}

import React, { useEffect, useRef, useState } from 'react'
import { usePeopleMapData, ProfileNode, Coordinates } from './PeopleLayer'
import { useEventsMapData, EventItem } from './EventsLayer'
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

// Build a compact grouped avatar element for locations with multiple profiles
const createAvatarGroupElement = (profiles: ProfileNode[]): HTMLDivElement => {
    const containerSize = 86
    const avatarSizeMedium = 48
    const avatarSizeLarge = 48

    const count = profiles.length

    const container = document.createElement('div')
    container.style.position = 'relative'
    container.style.width = `${containerSize}px`
    container.style.height = `${containerSize}px`
    container.style.borderRadius = '8px'
    container.style.overflow = 'visible'
    container.style.display = 'block'

    type Pos = { left: number; top: number; size: number }
    const positions: Pos[] = []

    const centerCoord = (size: number) => (containerSize - size) / 2

    if (count === 2) {
        const size = avatarSizeLarge
        positions.push(
            { left: 0, top: centerCoord(size), size },
            { left: containerSize - size, top: centerCoord(size), size }
        )
    } else if (count === 3) {
        const size = avatarSizeMedium
        positions.push(
            { left: centerCoord(size), top: 0, size }, // top middle
            { left: 0, top: containerSize - size, size }, // bottom left
            { left: containerSize - size, top: containerSize - size, size } // bottom right
        )
    } else if (count === 4) {
        const size = avatarSizeLarge
        positions.push(
            { left: 0, top: 0, size },
            { left: containerSize - size, top: 0, size },
            { left: 0, top: containerSize - size, size },
            { left: containerSize - size, top: containerSize - size, size }
        )
    } else if (count === 5) {
        const size = avatarSizeMedium
        positions.push(
            { left: centerCoord(size), top: 0, size }, // top
            { left: 0, top: centerCoord(size), size }, // left
            { left: containerSize - size, top: centerCoord(size), size }, // right
            { left: centerCoord(size), top: containerSize - size, size }, // bottom
            { left: centerCoord(size), top: centerCoord(size), size } // center
        )
    } else {
        // 6+ — use a compact grid layout
        const gap = 2
        const columns = Math.ceil(Math.sqrt(count))
        const rows = Math.ceil(count / columns)
        // Derive a cell size to keep container roughly around containerSize
        const cellSize = 48
        const widthPx = cellSize * columns + gap * (columns - 1)
        const heightPx = cellSize * rows + gap * (rows - 1)
        container.style.display = 'grid'
        container.style.gridTemplateColumns = `repeat(${columns}, ${cellSize}px)`
        container.style.gridAutoRows = `${cellSize}px`
        container.style.gap = `${gap}px`
        container.style.width = `${widthPx}px`
        container.style.height = `${heightPx}px`
        container.style.borderRadius = '8px'
        // Build grid items
        profiles.forEach((profile) => {
            const wrap = document.createElement('div')
            wrap.classList.add(
                `bg-${profile.color ?? 'white'}`,
                'overflow-hidden',
                'border-2',
                'border-white',
                'rounded-full',
                'shadow-sm',
                'object-cover'
            )
            wrap.style.width = `${cellSize}px`
            wrap.style.height = `${cellSize}px`
            const img = document.createElement('img')
            img.src =
                profile.avatar?.url ||
                'https://res.cloudinary.com/dmukukwp6/image/upload/v1698231117/max_6942263bd1.png'
            img.alt = [profile.firstName, profile.lastName].filter(Boolean).join(' ') || 'Team member'
            img.classList.add('w-full', 'h-full', 'object-cover')
            wrap.appendChild(img)
            container.appendChild(wrap)
        })
        return container
    }

    positions.slice(0, profiles.length).forEach((pos, idx) => {
        const profile = profiles[idx]
        const wrap = document.createElement('div')
        wrap.classList.add(
            `bg-${profile.color ?? 'white'}`,
            'overflow-hidden',
            'border-2',
            'border-white',
            'rounded-full',
            'shadow-sm',
            'object-cover'
        )
        wrap.style.position = 'absolute'
        wrap.style.width = `${pos.size}px`
        wrap.style.height = `${pos.size}px`
        wrap.style.left = `${pos.left}px`
        wrap.style.top = `${pos.top}px`

        const img = document.createElement('img')
        img.src =
            profile.avatar?.url || 'https://res.cloudinary.com/dmukukwp6/image/upload/v1698231117/max_6942263bd1.png'
        img.alt = [profile.firstName, profile.lastName].filter(Boolean).join(' ') || 'Team member'
        img.classList.add('w-full', 'h-full', 'object-cover')
        wrap.appendChild(img)

        container.appendChild(wrap)
    })

    return container
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
        const DETAIL_ZOOM = 6
        const clearMarkers = () => {
            markersRef.current.forEach((m) => m.remove())
            markersRef.current = []
        }
        const renderMarkers = () => {
            if (!mapRef.current) return
            clearMarkers()
            const zoom = mapRef.current.getZoom()

            const showPeople = Array.isArray(layers) && layers.includes(LAYER_PEOPLE)
            const showEvents = Array.isArray(layers) && layers.includes(LAYER_EVENTS)

            if (showPeople) {
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
                    const first = profiles[0]
                    const avatarFallback =
                        'https://res.cloudinary.com/dmukukwp6/image/upload/v1698231117/max_6942263bd1.png'

                    // Popup lists all people in the location
                    const peopleList = profiles
                        .map((p) => {
                            const name = [p.firstName, p.lastName].filter(Boolean).join(' ')
                            const role = p.companyRole || ''
                            const href = p.squeakId ? `/community/profiles/${p.squeakId}` : ''
                            return `<li class="mb-1"><a class="underline font-semibold" href="${href}">${name}</a>${
                                role ? ` <span class="text-secondary">— ${role}</span>` : ''
                            }</li>`
                        })
                        .join('')
                    const popupHtml = `
                        <div class="text-sm max-w-[240px]">
                            <div class="font-semibold mb-1">${label}</div>
                            <ul class="m-0 p-0 list-none">${peopleList}</ul>
                        </div>`

                    const popup = new mapboxgl.Popup({ offset: 12 }).setHTML(popupHtml)

                    // Marker element
                    const el = document.createElement('div')

                    const isClusterMode = profiles.length > 1 && zoom < DETAIL_ZOOM
                    if (isClusterMode) {
                        // Show a circle with the count
                        el.style.width = '36px'
                        el.style.height = '36px'
                        el.style.borderRadius = '18px'
                        el.style.background = '#111827'
                        el.style.color = '#ffffff'
                        el.style.display = 'flex'
                        el.style.alignItems = 'center'
                        el.style.justifyContent = 'center'
                        el.style.border = '2px solid #ffffff'
                        el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.25)'
                        el.style.fontWeight = '600'
                        el.style.fontSize = '12px'
                        el.textContent = String(profiles.length)
                    } else {
                        el.style.width = profiles.length > 1 ? '56px' : '48px'
                        el.style.height = '48px'
                        el.style.borderRadius = '50%'
                        el.style.display = 'flex'
                        el.style.alignItems = 'center'
                        el.style.justifyContent = 'center'
                        el.style.overflow = 'hidden'

                        if (profiles.length === 1) {
                            // Single avatar
                            const img = document.createElement('img')
                            img.src = first.avatar?.url || avatarFallback
                            img.alt = [first.firstName, first.lastName].filter(Boolean).join(' ') || 'Team member'
                            img.classList.add(
                                `bg-${first.color ?? 'white'}`,
                                'border-2',
                                'border-white',
                                'rounded-full',
                                'shadow-sm',
                                'w-full',
                                'h-full',
                                'object-cover'
                            )
                            el.appendChild(img)
                        } else {
                            const groupEl = createAvatarGroupElement(profiles)
                            el.style.borderRadius = '8px'
                            el.style.overflow = 'visible'
                            el.appendChild(groupEl)
                        }
                    }

                    const marker = new mapboxgl.Marker({ element: el })
                        .setLngLat([longitude, latitude])
                        .setPopup(popup)
                        .addTo(mapRef.current)

                    // Hover behavior
                    marker.getElement().addEventListener('mouseenter', () => marker.togglePopup())
                    marker.getElement().addEventListener('mouseleave', () => marker.togglePopup())

                    markersRef.current.push(marker)
                })
            }

            if (showEvents) {
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
                    const popupList = events
                        .map((ev) => {
                            const date = ev.date
                                ? new Date(ev.date).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                  })
                                : ''
                            const href = ev.link || ''
                            const name = ev.name || 'Event'
                            return `<li class="mb-1"><a class="underline font-semibold" href="${href}">${name}</a>${
                                date ? ` <span class="text-secondary">— ${date}</span>` : ''
                            }</li>`
                        })
                        .join('')
                    const popupHtml = `
                        <div class="text-sm max-w-[260px]">
                            <div class="font-semibold mb-1">${label}</div>
                            <ul class="m-0 p-0 list-none">${popupList}</ul>
                        </div>`
                    const popup = new mapboxgl.Popup({ offset: 12 }).setHTML(popupHtml)

                    // Marker element
                    const el = document.createElement('div')
                    const isClusterMode = events.length > 1 && zoom < DETAIL_ZOOM
                    if (isClusterMode) {
                        // Cluster-style count bubble (match people styling)
                        el.style.width = '36px'
                        el.style.height = '36px'
                        el.style.borderRadius = '18px'
                        el.style.background = '#111827'
                        el.style.color = '#ffffff'
                        el.style.display = 'flex'
                        el.style.alignItems = 'center'
                        el.style.justifyContent = 'center'
                        el.style.border = '2px solid #ffffff'
                        el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.25)'
                        el.style.fontWeight = '600'
                        el.style.fontSize = '12px'
                        el.textContent = String(events.length)
                    } else {
                        if (events.length === 1) {
                            // Single event: small orange dot with white border
                            el.style.width = '20px'
                            el.style.height = '20px'
                            el.style.borderRadius = '10px'
                            el.style.background = '#FF9500'
                            el.style.border = '2px solid #ffffff'
                            el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.25)'
                        } else {
                            // Multiple events at same spot: compact grid of orange dots
                            const container = document.createElement('div')
                            const count = Math.min(events.length, 9)
                            const columns = Math.ceil(Math.sqrt(count))
                            const rows = Math.ceil(count / columns)
                            const cell = 10
                            const gap = 2
                            container.style.display = 'grid'
                            container.style.gridTemplateColumns = `repeat(${columns}, ${cell}px)`
                            container.style.gridAutoRows = `${cell}px`
                            container.style.gap = `${gap}px`
                            container.style.padding = '2px'
                            container.style.background = '#ffffff'
                            container.style.border = '2px solid #ffffff'
                            container.style.borderRadius = '6px'
                            container.style.boxShadow = '0 2px 6px rgba(0,0,0,0.25)'
                            container.style.width = `${columns * cell + gap * (columns - 1) + 4}px`
                            container.style.height = `${rows * cell + gap * (rows - 1) + 4}px`
                            for (let i = 0; i < count; i++) {
                                const dot = document.createElement('div')
                                dot.style.width = `${cell}px`
                                dot.style.height = `${cell}px`
                                dot.style.borderRadius = '50%'
                                dot.style.background = '#FF9500'
                                container.appendChild(dot)
                            }
                            el.appendChild(container)
                        }
                    }

                    const marker = new mapboxgl.Marker({ element: el })
                        .setLngLat([longitude, latitude])
                        .setPopup(popup)
                        .addTo(mapRef.current)

                    // Hover behavior
                    marker.getElement().addEventListener('mouseenter', () => marker.togglePopup())
                    marker.getElement().addEventListener('mouseleave', () => marker.togglePopup())

                    markersRef.current.push(marker)
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

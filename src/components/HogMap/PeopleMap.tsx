import React, { useEffect, useRef, useState } from 'react'
import { usePeopleMapData, ProfileNode, Coordinates } from './PeopleLayer'
import { navigate } from 'gatsby'
import 'mapbox-gl/dist/mapbox-gl.css'
import { computeOffsets } from './hogMapUtils'

// Delay requiring mapbox-gl until client to avoid SSR issues
const getMapbox = () => {
    if (typeof window === 'undefined') {
        return null
    }
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mapboxgl = require('mapbox-gl')
    return mapboxgl
}

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

export default function PeopleMap(): JSX.Element {
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])

    const mapContainerRef = useRef<HTMLDivElement | null>(null)
    const mapRef = useRef<any>(null)
    const markersRef = useRef<any[]>([])
    const renderMarkersRef = useRef<(() => void) | null>(null)
    const membersRef = useRef<ProfileNode[]>([])
    const coordsByQueryRef = useRef<Record<string, Coordinates>>({})

    const token = typeof window !== 'undefined' ? process.env.GATSBY_MAPBOX_TOKEN : undefined
    const styleUrl = 'mapbox://styles/mapbox/streets-v12'

    const { members, coordsByQuery } = usePeopleMapData(isClient, token)
    useEffect(() => {
        membersRef.current = members
    }, [members])
    useEffect(() => {
        coordsByQueryRef.current = coordsByQuery
    }, [coordsByQuery])
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

            // Use Mapbox clusters when zoomed out
            if (zoom < CLUSTER_ZOOM) {
                // People clusters
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
                // Skip HTML markers in clustered view
                return
            } else {
                setClusterVisibility('people-source', false)
            }

            // Show individual people markers when zoomed in
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
    }, [coordsByQuery, members])

    return (
        <div className="box-border w-full h-full rounded border border-primary overflow-hidden">
            <div ref={mapContainerRef} className="w-full h-full" />
        </div>
    )
}

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import SEO from 'components/seo'
import 'mapbox-gl/dist/mapbox-gl.css'

// Delay requiring mapbox-gl until client to avoid SSR issues
const getMapbox = () => {
    if (typeof window === 'undefined') {
        return null
    }
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mapboxgl = require('mapbox-gl')
    return mapboxgl
}

const QUERY = graphql`
    query PeopleMapQuery {
        allSqueakProfile(
            filter: { teams: { data: { elemMatch: { id: { ne: null } } } } }
            sort: { fields: startDate, order: ASC }
        ) {
            nodes {
                id
                squeakId
                firstName
                lastName
                companyRole
                color
                country
                location
                avatar {
                    url
                }
            }
        }
    }
`

interface Coordinates {
    latitude: number
    longitude: number
}

interface ProfileNode {
    id: string
    squeakId: string
    firstName: string
    lastName: string
    companyRole: string
    color: string
    country: string
    location: string
    avatar?: {
        url?: string
    }
}

export default function HogMap(): JSX.Element {
    const data = useStaticQuery(QUERY) as {
        allSqueakProfile: { nodes: ProfileNode[] }
    }

    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])

    const mapContainerRef = useRef<HTMLDivElement | null>(null)
    const mapRef = useRef<any>(null)
    const markersRef = useRef<any[]>([])

    const token = typeof window !== 'undefined' ? process.env.GATSBY_MAPBOX_TOKEN : undefined
    const styleUrl = 'mapbox://styles/mapbox/streets-v12'

    const members = useMemo(
        () => data.allSqueakProfile.nodes.filter((m) => (m.country || '').trim().toLowerCase() !== 'world'),
        [data.allSqueakProfile.nodes]
    )

    // Client geocoding for member locations (simple and cached per render)
    const [coordsByQuery, setCoordsByQuery] = useState<Record<string, Coordinates>>({})
    const queries = useMemo(() => {
        const set = new Set<string>()
        members.forEach((m) => {
            const q = (m.location && m.location.trim()) || (m.country && m.country.trim())
            if (q) {
                set.add(q)
            }
        })
        return Array.from(set)
    }, [members])

    useEffect(() => {
        if (!isClient) {
            return
        }
        if (!token) {
            return
        }
        // Only fetch for unknown queries
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
                        }
                    } catch (e) {
                        // ignore single failure
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
        const DETAIL_ZOOM = 3.5
        const clearMarkers = () => {
            markersRef.current.forEach((m) => m.remove())
            markersRef.current = []
        }
        const renderMarkers = () => {
            if (!mapRef.current) return
            clearMarkers()
            // Group members by their geocode query so people in the same location are combined
            console.log(members)
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

            const zoom = mapRef.current.getZoom()

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
                    el.style.width = profiles.length > 1 ? `${profiles.length * 48}px` : '48px'
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
                        // Multi avatar stack
                        el.style.borderRadius = '8px'
                        el.style.gap = '0px'
                        el.style.padding = '2px'
                        el.style.overflow = 'visible'
                        const stack = document.createElement('div')
                        stack.style.display = 'flex'
                        stack.style.alignItems = 'center'
                        stack.style.justifyContent = 'center'
                        stack.style.width = '100%'
                        stack.style.height = '100%'

                        profiles.forEach((p, idx) => {
                            const wrap = document.createElement('div')
                            wrap.classList.add(
                                `bg-${p.color ?? 'white'}`,
                                'overflow-hidden',
                                'border-2',
                                'border-white',
                                'rounded-full',
                                'shadow-sm',
                                'object-cover',
                                'h-full'
                            )
                            if (idx > 0) {
                                wrap.style.marginLeft = '-8px'
                            }
                            const img = document.createElement('img')
                            img.src = p.avatar?.url || avatarFallback
                            img.alt = [p.firstName, p.lastName].filter(Boolean).join(' ') || 'Team member'
                            img.classList.add('w-full', 'h-full', 'object-cover')
                            wrap.appendChild(img)
                            stack.appendChild(wrap)
                        })

                        el.appendChild(stack)
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
    }, [isClient, token, styleUrl, coordsByQuery, members])

    return (
        <div className="box-border w-full h-full rounded border border-primary overflow-hidden">
            <div ref={mapContainerRef} className="w-full h-full" />
        </div>
    )
}

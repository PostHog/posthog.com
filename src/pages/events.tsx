import React, { useEffect, useState, useLayoutEffect, useRef, useCallback } from 'react'
import SEO from 'components/seo'
import Explorer from 'components/Explorer'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import OSButton from 'components/OSButton'
import TeamMember from 'components/TeamMember'
import * as am5 from '@amcharts/amcharts5'
import * as am5map from '@amcharts/amcharts5/map'
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow'
import am5geodata_usaLow from '@amcharts/amcharts5-geodata/usaLow'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import { ZoomImage } from 'components/ZoomImage'
import { useWindow } from '../context/Window'
import { graphql, useStaticQuery } from 'gatsby'
import dayjs from 'dayjs'
import { AnimatePresence, motion } from 'framer-motion'
import EventForm from 'components/EventForm'
import { useUser } from 'hooks/useUser'
import qs from 'qs'
import { IconPencil, IconTrash } from '@posthog/icons'
import { useToast } from '../context/Toast'

export type Event = {
    date: string // YYYY-MM-DD
    name: string
    description?: string
    location: {
        label: string // Location display name
        lat?: number
        lng?: number
        venue?: {
            name: string
        }
    }
    private?: boolean
    format?: string[]
    audience?: string[]
    speakers?: string[]
    speakerTopic?: string
    partners?: Array<{ name: string; url?: string }>
    attendees?: number
    vibeScore?: number
    photos?: { id: number; url: string }[]
    video?: string
    presentation?: string
    link?: string
    startTime?: string // HH:mm format
    id: number
}

const transformStrapiEvent = (strapiEvent: any): Event => {
    const {
        private: isPrivate,
        speakers: speakersData,
        partners: partnersData,
        photos: photosData,
    } = strapiEvent.attributes

    const photos = photosData?.data?.map((photo: any) => ({ id: photo.id, url: photo.attributes?.url }))
    const speakers = speakersData?.data?.map((s: any) =>
        [s.attributes?.firstName, s.attributes?.lastName].filter(Boolean).join(' ')
    )
    const partners = partnersData?.map((p: any) => ({ name: p.name, url: p.url || undefined }))

    return {
        ...strapiEvent.attributes,
        private: isPrivate === true,
        speakers,
        partners,
        photos,
        id: strapiEvent.id,
    }
}

const useEvents = (): { events: Event[]; refreshEvents: () => void; deleteEvent: (eventId: number) => void } => {
    const { getJwt } = useUser()
    const { addToast } = useToast()
    const [events, setEvents] = useState<Event[]>([])
    const fetchEvents = async (page = 1) => {
        const eventsQuery = qs.stringify(
            {
                pagination: {
                    page,
                    pageSize: 100,
                },
                sort: ['date:desc'],
                populate: {
                    location: {
                        populate: ['venue'],
                    },
                    photos: true,
                    speakers: true,
                    partners: true,
                },
            },
            { encodeValuesOnly: true }
        )
        const eventsUrl = `${process.env.GATSBY_SQUEAK_API_HOST}/api/events?${eventsQuery}`
        const { data: events, meta } = await fetch(eventsUrl).then((res) => res.json())
        setEvents((prev) => [...prev, ...events.map(transformStrapiEvent)])
        if (meta?.pagination?.pageCount > meta?.pagination?.page) await fetchEvents(page + 1)
    }

    const deleteEvent = async (eventId: number) => {
        if (confirm('Are you sure you want to delete this event?')) {
            try {
                const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/events/${eventId}`, {
                    headers: {
                        Authorization: `Bearer ${await getJwt()}`,
                    },
                    method: 'DELETE',
                })

                if (!response.ok) {
                    throw new Error(response.statusText)
                }

                addToast({ title: 'Event deleted', description: 'The event was deleted successfully.' })
                refreshEvents()
            } catch (error: any) {
                addToast({
                    title: 'Failed to delete event',
                    description: error?.message || 'An unexpected error occurred while deleting the event.',
                    error: true,
                })
            }
        }
    }

    const refreshEvents = useCallback(() => {
        setEvents([])
        fetchEvents()
    }, [])

    useEffect(() => {
        refreshEvents()
    }, [])

    return { events, refreshEvents, deleteEvent }
}

const EventCard = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0, translateX: '-50%' }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: '-50%' }}
            transition={{ duration: 0.3 }}
            className="absolute left-4 top-4 bottom-4 w-96 rounded bg-primary border border-primary shadow-lg z-10 overflow-hidden flex flex-col"
        >
            <button
                onClick={onClose}
                className="absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center rounded hover:bg-accent text-primary hover:text-primary text-xl leading-none"
            >
                ✕
            </button>

            <ScrollArea className="flex-1">{children}</ScrollArea>
        </motion.div>
    )
}

function Events() {
    const { isModerator } = useUser()
    const { events: eventsData, refreshEvents, deleteEvent } = useEvents()
    const [activeTab, setActiveTab] = useState<'past' | 'upcoming'>('upcoming')
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
    const [hoveredEvent, setHoveredEvent] = useState<Event | null>(null)
    const [chartKey, setChartKey] = useState(0)
    const [creatingEvent, setCreatingEvent] = useState(false)
    const [editingEvent, setEditingEvent] = useState<boolean>(false)
    const chartRef = useRef<HTMLDivElement>(null)
    const chartInstanceRef = useRef<am5map.MapChart | null>(null)
    const pointSeriesRef = useRef<am5map.ClusteredPointSeries | null>(null)
    const { appWindow } = useWindow()

    // Generate unique event key
    const getEventKey = (event: Event) => {
        const slug = event.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        return `${event.date}-${event.id}-${slug}`
    }

    const today = new Date()
    const pastEvents = eventsData
        .filter((event) => new Date(event.date) < today)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    const upcomingEvents = eventsData
        .filter((event) => new Date(event.date) >= today)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const displayEvents = activeTab === 'past' ? pastEvents : upcomingEvents

    const handleEventClick = (event: Event) => {
        setSelectedEvent(event)
        setEditingEvent(false)
        setCreatingEvent(false)
        // Hide tooltip and zoom to the event location with animation (deeper zoom for active state)
        if (chartInstanceRef.current && pointSeriesRef.current && event.location.lat && event.location.lng) {
            pointSeriesRef.current.hideTooltip()

            // Calculate longitude offset to account for detail panel (384px wide)
            // At zoom level 8, roughly 1 degree = 100px, so offset by ~4 degrees to the right
            const zoomLevel = 10
            const longitudeOffset = -6 // Shift the map center to the right

            chartInstanceRef.current.zoomToGeoPoint(
                {
                    latitude: event.location.lat,
                    longitude: event.location.lng + longitudeOffset,
                },
                zoomLevel,
                true
            )
        }
    }

    // Handle ESC key to close detail panel
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && selectedEvent) {
                setSelectedEvent(null)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [selectedEvent])

    // Initialize the map
    useLayoutEffect(() => {
        console.log('🚀 Map initialization started')
        if (!chartRef.current) {
            console.log('❌ Chart ref not available')
            return
        }

        const rect = chartRef.current.getBoundingClientRect()
        console.log('📐 Container dimensions:', { width: rect.width, height: rect.height })

        if (rect.width === 0 || rect.height === 0) {
            console.log('⚠️ Warning: Container has 0 dimensions')
        }

        console.log('📦 Creating amCharts root')
        am5.addLicense('AM5M-1930-8548-3690-4255')

        const root = am5.Root.new(chartRef.current)
        root.setThemes([am5themes_Animated.new(root)])
        console.log('✅ Root created')

        console.log('🗺️ Creating map chart')
        const chart = root.container.children.push(
            am5map.MapChart.new(root, {
                projection: am5map.geoMercator(),
                panX: 'translateX',
                panY: 'translateY',
                wheelY: 'zoom',
                maxZoomLevel: 10,
                minZoomLevel: 1,
            })
        )
        console.log('✅ Map chart created')

        chartInstanceRef.current = chart

        // Add zoom control
        const zoomControl = am5map.ZoomControl.new(root, {})
        chart.set('zoomControl', zoomControl)
        zoomControl.homeButton.set('visible', true)

        // Add polygon series (countries)
        console.log('🌍 Creating polygon series for countries')
        const polygonSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {
                geoJSON: am5geodata_worldLow,
                exclude: ['AQ'], // Antarctica
            })
        )
        console.log('✅ Polygon series created')

        polygonSeries.mapPolygons.template.setAll({
            fill: am5.color(0xd1d5db),
            fillOpacity: 1,
            stroke: am5.color(0xffffff),
            strokeWidth: 0.5,
            interactive: false,
        })

        polygonSeries.mapPolygons.template.states.create('hover', {
            fill: am5.color(0x9ca3af),
        })

        // Add US states and Canadian provinces layer (shown when zoomed in)
        // We'll create this as a separate series that sits on top of the base map
        console.log('🗺️ Creating sub-region series for US states')
        const subRegionSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {
                geoJSON: am5geodata_usaLow,
            })
        )
        console.log('✅ Sub-region series created')

        subRegionSeries.mapPolygons.template.setAll({
            fill: am5.color(0xd1d5db),
            fillOpacity: 0, // Transparent fill, only borders visible
            stroke: am5.color(0x666666),
            strokeWidth: 1,
            strokeOpacity: 0, // Start hidden, will be shown via animation
            interactive: false,
        })

        // Wait for the series data to be loaded before setting up zoom handlers
        subRegionSeries.events.once('datavalidated', () => {
            console.log('🗺️ Sub-region series loaded with', subRegionSeries.mapPolygons.length, 'polygons')

            // Now set up zoom handler
            const updateBordersAndStates = () => {
                const zoomLevel = chart.get('zoomLevel', 1)
                console.log('🔍 Zoom level:', zoomLevel)

                // Update country borders
                if (zoomLevel > 2) {
                    polygonSeries.mapPolygons.template.setAll({
                        strokeWidth: 1.5,
                        strokeOpacity: 0.8,
                    })
                } else {
                    polygonSeries.mapPolygons.template.setAll({
                        strokeWidth: 0.5,
                        strokeOpacity: 1,
                    })
                }

                // Show/hide state/province borders based on zoom
                const targetOpacity = zoomLevel > 3 ? 0.5 : 0
                console.log('🗺️ Setting sub-region strokeOpacity to:', targetOpacity)

                subRegionSeries.mapPolygons.each((polygon) => {
                    polygon.animate({
                        key: 'strokeOpacity',
                        to: targetOpacity,
                        duration: 300,
                        easing: am5.ease.out(am5.ease.cubic),
                    })
                })
            }

            // Attach zoom handlers
            ;(chart.events as any).on('wheelended', updateBordersAndStates)
            ;(chart.events as any).on('panended', updateBordersAndStates)
            ;(chart.events as any).on('zoomended', updateBordersAndStates)

            // Run once to set initial state
            updateBordersAndStates()
        })

        // Add point series (event markers) with clustering
        console.log('📍 Creating point series for event markers')
        const pointSeries = chart.series.push(
            am5map.ClusteredPointSeries.new(root, {
                minDistance: 30, // Minimum distance between markers before clustering
            })
        )
        pointSeriesRef.current = pointSeries
        console.log('✅ Point series created')

        // Individual marker bullet
        pointSeries.bullets.push((root, _series, dataItem) => {
            const container = am5.Container.new(root, {})
            const eventData = dataItem.dataContext as any
            const isSelected = eventData?.isSelected
            const isHovered = eventData?.isHovered

            const circle = container.children.push(
                am5.Circle.new(root, {
                    radius: 8,
                    fill: isSelected
                        ? am5.color(0x2f80fa) // Blue when selected (active)
                        : isHovered
                        ? am5.color(0xef4444) // Red when hovered
                        : am5.color(0xff9500), // Orange by default
                    stroke: am5.color(0xffffff), // Always white border
                    strokeWidth: isSelected ? 3 : 2,
                    tooltipText: '{name}\n{location}\n{date}',
                    cursorOverStyle: 'pointer',
                    scale: 1,
                    centerX: am5.p50,
                    centerY: am5.p50,
                })
            )

            circle.states.create('hover', {
                scale: 1.3,
            })

            // Handle clicks on the circle
            circle.events.on('click', () => {
                const event = eventData.eventData as Event
                if (event) {
                    pointSeries.hideTooltip()
                    handleEventClick(event)
                }
            })

            // Adjust marker size to remain constant at different zoom levels
            ;(chart.events as any).on('wheelended', () => {
                const zoomLevel = chart.get('zoomLevel', 1)
                const baseScale = 1 / Math.sqrt(zoomLevel)
                circle.set('scale', Math.max(baseScale, 0.6))
            })

            return am5.Bullet.new(root, {
                sprite: container,
            })
        })

        // Store cluster bullets for manual updates
        const clusterBullets = new Map<any, am5.Circle>()

        // Cluster bullet
        pointSeries.set('clusteredBullet', (root, _series, dataItem) => {
            const container = am5.Container.new(root, {
                cursorOverStyle: 'pointer',
            })

            const circle = container.children.push(
                am5.Circle.new(root, {
                    radius: 12,
                    tooltipText: '{value} events',
                    fill: am5.color(0xff9500), // Orange by default
                    stroke: am5.color(0xffffff), // White border
                    strokeWidth: 2,
                })
            )

            // Store reference to this cluster circle for manual updates
            clusterBullets.set(dataItem, circle)

            // Add hover state for clusters
            circle.states.create('hover', {
                scale: 1.2,
            })

            container.children.push(
                am5.Label.new(root, {
                    centerX: am5.p50,
                    centerY: am5.p50,
                    fill: am5.color(0xffffff),
                    fontSize: 11,
                    fontWeight: 'bold',
                    populateText: true,
                    text: '{value}',
                })
            )

            // Handle click to zoom in on cluster
            circle.events.on('click', () => {
                pointSeries.hideTooltip()
                if (dataItem && chartInstanceRef.current) {
                    const lat = dataItem.get('latitude') as number
                    const lng = dataItem.get('longitude') as number
                    const currentZoom = chartInstanceRef.current.get('zoomLevel', 1)
                    // Zoom in more aggressively to break up clusters
                    const newZoom = Math.min(currentZoom * 3.5, 10)
                    chartInstanceRef.current.zoomToGeoPoint({ latitude: lat, longitude: lng }, newZoom, true)
                }
            })

            return am5.Bullet.new(root, {
                sprite: container,
            })
        })

        // Configure tooltip with no animations or fades
        const tooltip = am5.Tooltip.new(root, {
            getFillFromSprite: false,
            getStrokeFromSprite: false,
            autoTextColor: false,
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 12,
            paddingRight: 12,
            animationDuration: 0,
        })

        tooltip.get('background')?.setAll({
            fill: am5.color(0x1d1d1d),
            fillOpacity: 1,
            stroke: am5.color(0xffffff),
            strokeWidth: 1,
        })

        tooltip.label.setAll({
            fill: am5.color(0xffffff),
            fontSize: 12,
        })

        // Completely disable all animations on show and hide
        tooltip.show(0)
        tooltip.hide(0)

        // Set animation properties to 0
        tooltip.set('animationDuration', 0)
        tooltip.set('animationEasing', am5.ease.linear)

        // Disable fade animations on the background
        const tooltipBg = tooltip.get('background')
        if (tooltipBg) {
            tooltipBg.set('opacity', 1)
            tooltipBg.states.create('default', { opacity: 1 })
            tooltipBg.states.create('hidden', { opacity: 1 })
        }

        pointSeries.set('tooltip', tooltip)

        // Hide tooltip when zoom/pan starts
        ;(chart.events as any).on('wheelstarted', () => {
            pointSeries.hideTooltip()
        })
        ;(chart.events as any).on('panstarted', () => {
            pointSeries.hideTooltip()
        })

        // Function to update cluster colors based on hover state
        const updateClusterColors = () => {
            if (!pointSeriesRef.current) return

            // Get all current data with hover states
            const allData = pointSeriesRef.current.data.values as any[]

            // Create a map of hovered event coordinates
            const hoveredCoords = new Set<string>()
            for (const data of allData) {
                if (data.isHovered && data.geometry?.coordinates) {
                    const [lng, lat] = data.geometry.coordinates
                    hoveredCoords.add(`${lat.toFixed(4)},${lng.toFixed(4)}`)
                }
            }

            // For each cluster bullet, check if it contains a hovered event
            clusterBullets.forEach((circle, clusterDataItem) => {
                const clusterLat = clusterDataItem.get('latitude')
                const clusterLng = clusterDataItem.get('longitude')

                if (!clusterLat || !clusterLng) {
                    circle.set('fill', am5.color(0xff9500))
                    return
                }

                // Find all events at or very near this cluster location
                // Clusters form when multiple points are within minDistance (30px)
                // At different zoom levels this is different geographic distances
                // Use a smaller threshold and check for near-exact matches
                let hasHoveredEvent = false
                let eventsInCluster = 0

                for (const data of allData) {
                    if (data.geometry?.coordinates) {
                        const [lng, lat] = data.geometry.coordinates
                        // Check if this event is very close to cluster center
                        const latDiff = Math.abs(lat - clusterLat)
                        const lngDiff = Math.abs(lng - clusterLng)

                        // Use a small threshold (about 1km at equator)
                        if (latDiff < 0.01 && lngDiff < 0.01) {
                            eventsInCluster++
                            if (data.isHovered) {
                                console.log(
                                    '✅ Found hovered event in cluster:',
                                    data.name,
                                    'at',
                                    [lat, lng],
                                    'cluster center:',
                                    [clusterLat, clusterLng]
                                )
                                hasHoveredEvent = true
                                break
                            }
                        }
                    }
                }

                if (eventsInCluster > 0 && hoveredCoords.size > 0) {
                    console.log(
                        `📊 Cluster at [${clusterLat}, ${clusterLng}] has ${eventsInCluster} events, hasHovered: ${hasHoveredEvent}`
                    )
                }

                // Update circle color based on whether it contains hovered event
                if (hasHoveredEvent) {
                    circle.set('fill', am5.color(0xef4444)) // Red when contains hovered event
                } else {
                    circle.set('fill', am5.color(0xff9500)) // Orange by default
                }
            })
        }

        // Store reference for use in effects
        chartInstanceRef.current = chart
        ;(chartInstanceRef.current as any).updateClusterColors = updateClusterColors
        ;(chartInstanceRef.current as any).clusterBullets = clusterBullets

        // Handle window/container resize
        let lastWidth = 0
        let lastHeight = 0
        let resizeTimeout: NodeJS.Timeout | null = null

        const handleResize = () => {
            if (!chartRef.current || root.isDisposed()) return

            const rect = chartRef.current.getBoundingClientRect()
            const { width, height } = rect

            // Skip if dimensions haven't changed significantly
            const widthChanged = Math.abs(width - lastWidth) > 5
            const heightChanged = Math.abs(height - lastHeight) > 5

            if (!widthChanged && !heightChanged) {
                return
            }

            // Skip if dimensions are invalid
            if (width === 0 || height === 0) {
                return
            }

            // Check if canvas exists
            const canvasElements = chartRef.current.querySelectorAll('canvas')

            if (canvasElements.length === 0) {
                // Force a complete remount of the chart by updating the key
                setChartKey((prev) => prev + 1)
                return
            }

            lastWidth = width
            lastHeight = height

            try {
                root.resize()
            } catch (err) {
                console.error('Error resizing map:', err)
            }
        }

        const debouncedResize = () => {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout)
            }
            // Wait 500ms after resize stops before re-rendering
            resizeTimeout = setTimeout(handleResize, 500)
        }

        const resizeObserver = new ResizeObserver(() => {
            debouncedResize()
        })

        if (chartRef.current) {
            resizeObserver.observe(chartRef.current)
            // Store initial dimensions
            const rect = chartRef.current.getBoundingClientRect()
            lastWidth = rect.width
            lastHeight = rect.height
        }

        // Check if canvas was created and force resize if needed
        setTimeout(() => {
            if (chartRef.current) {
                const canvasElements = chartRef.current.querySelectorAll('canvas')
                const rect = chartRef.current.getBoundingClientRect()
                console.log('🎨 Canvas check after initialization:', canvasElements.length, 'canvas elements found')
                console.log('📐 Container dimensions during check:', { width: rect.width, height: rect.height })

                if (canvasElements.length === 0) {
                    console.error('❌ ERROR: No canvas elements were created during initialization!')
                    console.log('🔄 Attempting to force resize...')

                    if (rect.width > 0 && rect.height > 0) {
                        try {
                            root.resize()
                            console.log('✅ Forced resize completed')

                            // Check again after resize
                            setTimeout(() => {
                                const canvasCheck = chartRef.current?.querySelectorAll('canvas')
                                console.log(
                                    '🎨 Canvas check after forced resize:',
                                    canvasCheck?.length || 0,
                                    'elements'
                                )
                                if (!canvasCheck || canvasCheck.length === 0) {
                                    console.error('❌ Still no canvas after forced resize - triggering remount')
                                    setChartKey((prev) => prev + 1)
                                }
                            }, 100)
                        } catch (err) {
                            console.error('Error forcing resize:', err)
                        }
                    } else {
                        console.error('❌ Container still has 0 dimensions - will wait for resize event')
                    }
                } else {
                    console.log('✅ Map initialization complete and canvas rendered')
                }
            }
        }, 150)

        return () => {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout)
            }
            resizeObserver.disconnect()
            root.dispose()
        }
    }, [chartKey, appWindow])

    // Update map data when displayEvents, selectedEvent, or hoveredEvent changes
    useEffect(() => {
        if (!pointSeriesRef.current || !chartInstanceRef.current) return

        // Filter events that have coordinates
        const eventsWithCoords = displayEvents.filter((e) => e.location.lat && e.location.lng)

        const pointsData = eventsWithCoords.map((event) => ({
            geometry: { type: 'Point', coordinates: [event.location.lng!, event.location.lat!] },
            name: event.name,
            location: event.location.label,
            date: new Date(event.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            }),
            eventData: event,
            isSelected: selectedEvent ? getEventKey(selectedEvent) === getEventKey(event) : false,
            isHovered: hoveredEvent ? getEventKey(hoveredEvent) === getEventKey(event) : false,
        }))

        pointSeriesRef.current.data.setAll(pointsData)

        // Force complete refresh to update both individual and cluster bullets
        pointSeriesRef.current.markDirty()

        // Update cluster colors based on hover state
        if ((chartInstanceRef.current as any).updateClusterColors) {
            setTimeout(() => {
                const hoveredName = hoveredEvent?.name
                if (hoveredName) {
                    console.log('🎯 Updating clusters for hovered event:', hoveredName)
                    const hoveredData = pointsData.find((p) => p.eventData.name === hoveredName)
                    if (hoveredData?.geometry?.coordinates) {
                        console.log('📍 Hovered event coords:', hoveredData.geometry.coordinates)
                    }

                    const clusterBullets = (chartInstanceRef.current as any).clusterBullets
                    console.log('🔵 Total cluster bullets:', clusterBullets?.size || 0)
                }
                ;(chartInstanceRef.current as any).updateClusterColors()
            }, 50)
        }
    }, [displayEvents, selectedEvent, hoveredEvent])

    // Center map on events when switching tabs or first load (separate effect to avoid zoom on hover)
    useEffect(() => {
        if (!chartInstanceRef.current) return
        if (selectedEvent || displayEvents.length === 0) return

        // Small delay to ensure data is rendered
        setTimeout(() => {
            if (!chartInstanceRef.current) return

            // Filter events with coordinates
            const eventsWithCoords = displayEvents.filter((e) => e.location.lat && e.location.lng)
            if (eventsWithCoords.length === 0) return

            // Calculate bounds of all events
            const lats = eventsWithCoords.map((e) => e.location.lat!)
            const lngs = eventsWithCoords.map((e) => e.location.lng!)
            const minLat = Math.min(...lats)
            const maxLat = Math.max(...lats)
            const minLng = Math.min(...lngs)
            const maxLng = Math.max(...lngs)

            // Calculate center point
            const centerLat = (minLat + maxLat) / 2
            const centerLng = (minLng + maxLng) / 2

            // Calculate span in degrees
            const latSpan = maxLat - minLat
            const lngSpan = maxLng - minLng
            const maxSpan = Math.max(latSpan, lngSpan)

            // Calculate appropriate zoom level (empirical formula)
            // Zoom level roughly corresponds to how many degrees are visible
            // Lower span = higher zoom needed
            let zoomLevel = 1.5
            if (maxSpan < 5) zoomLevel = 5
            else if (maxSpan < 10) zoomLevel = 4
            else if (maxSpan < 20) zoomLevel = 3
            else if (maxSpan < 40) zoomLevel = 2.5
            else if (maxSpan < 80) zoomLevel = 2

            chartInstanceRef.current.zoomToGeoPoint({ latitude: centerLat, longitude: centerLng }, zoomLevel, true)
        }, 100)
    }, [displayEvents, selectedEvent])

    // Zoom back to show all events when closing detail pane
    useEffect(() => {
        if (!selectedEvent && chartInstanceRef.current && displayEvents.length > 0) {
            // Filter events with coordinates
            const eventsWithCoords = displayEvents.filter((e) => e.location.lat && e.location.lng)
            if (eventsWithCoords.length === 0) return

            // Calculate bounds of all events
            const lats = eventsWithCoords.map((e) => e.location.lat!)
            const lngs = eventsWithCoords.map((e) => e.location.lng!)
            const minLat = Math.min(...lats)
            const maxLat = Math.max(...lats)
            const minLng = Math.min(...lngs)
            const maxLng = Math.max(...lngs)

            // Calculate center point
            const centerLat = (minLat + maxLat) / 2
            const centerLng = (minLng + maxLng) / 2

            // Calculate span in degrees
            const latSpan = maxLat - minLat
            const lngSpan = maxLng - minLng
            const maxSpan = Math.max(latSpan, lngSpan)

            // Calculate appropriate zoom level
            let zoomLevel = 1.5
            if (maxSpan < 5) zoomLevel = 5
            else if (maxSpan < 10) zoomLevel = 4
            else if (maxSpan < 20) zoomLevel = 3
            else if (maxSpan < 40) zoomLevel = 2.5
            else if (maxSpan < 80) zoomLevel = 2

            chartInstanceRef.current.zoomToGeoPoint({ latitude: centerLat, longitude: centerLng }, zoomLevel, true)
        }
    }, [selectedEvent, displayEvents])

    useEffect(() => {
        const newSelectedEvent = selectedEvent && eventsData.find((event) => selectedEvent.id === event.id)
        if (newSelectedEvent && newSelectedEvent !== selectedEvent) {
            setSelectedEvent(newSelectedEvent)
        }
    }, [eventsData])

    return (
        <>
            <SEO
                title="Cool tech events - PostHog"
                description="Real-life events for people who like tech and people who build things"
                image={`/images/og/default.png`}
            />

            <Explorer
                template="generic"
                slug="events"
                title="Cool tech events"
                fullScreen
                viewportClasses="[&>div>div]:h-full"
            >
                <div data-scheme="primary" className="flex flex-col @xl:flex-row text-primary h-full">
                    <aside
                        data-scheme="secondary"
                        className="basis-3/5 @xl:basis-80 bg-primary @xl:border-r border-primary h-full flex flex-col"
                    >
                        <div className="border-b border-primary px-4 pt-4 pb-4">
                            <ToggleGroup
                                title=""
                                hideTitle
                                options={[
                                    { label: `Upcoming (${upcomingEvents.length})`, value: 'upcoming' },
                                    { label: `Past (${pastEvents.length})`, value: 'past' },
                                ]}
                                onValueChange={(value) => setActiveTab(value as 'past' | 'upcoming')}
                                value={activeTab}
                            />
                        </div>

                        <ScrollArea className="flex-1">
                            <div className="p-4 h-96 @xl:h-full">
                                <div className="space-y-3">
                                    {isModerator && (
                                        <OSButton
                                            variant="primary"
                                            width="full"
                                            size="md"
                                            onClick={() => {
                                                setCreatingEvent(true)
                                                setSelectedEvent(null)
                                                setEditingEvent(false)
                                            }}
                                        >
                                            Add event
                                        </OSButton>
                                    )}
                                    {displayEvents.map((event) => (
                                        <OSButton
                                            data-scheme="primary"
                                            key={getEventKey(event)}
                                            onClick={() => handleEventClick(event)}
                                            onMouseEnter={() => setHoveredEvent(event)}
                                            onMouseLeave={() => setHoveredEvent(null)}
                                            align="left"
                                            width="full"
                                            zoomHover="md"
                                            className={`bg-primary border border-primary active:bg-primary
                      
                      ${
                          selectedEvent && getEventKey(selectedEvent) === getEventKey(event)
                              ? 'border-primary outline outline-orange outline-2 outline-offset-1'
                              : 'border-primary'
                      }
                    `}
                                        >
                                            <div className="w-full">
                                                {event.photos && event.photos.length > 0 && (
                                                    <div className="float-right ml-2 max-w-20">
                                                        {event.photos[0] && (
                                                            <img
                                                                src={event.photos[0].url}
                                                                alt={`Event photo`}
                                                                className="w-20 max-h-20 object-cover rounded"
                                                            />
                                                        )}
                                                    </div>
                                                )}
                                                <div className="text-secondary text-[13px]">
                                                    {new Date(event.date).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </div>
                                                <div className="font-semibold text-sm line-clamp-2">{event.name}</div>
                                                <div className="text-[13px] text-secondary">
                                                    <div>{event.location.label}</div>

                                                    {event.vibeScore && (
                                                        <div className="flex items-center gap-1">
                                                            {Array.from({ length: event.vibeScore }).map((_, i) => (
                                                                <span key={i}>🔥</span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </OSButton>
                                    ))}
                                </div>
                            </div>
                        </ScrollArea>
                    </aside>

                    <div className="flex-1 relative h-full border-primary border-t @xl:border-t-0">
                        <AnimatePresence>
                            {(editingEvent || creatingEvent) && isModerator ? (
                                <EventCard
                                    onClose={() => {
                                        setCreatingEvent(false)
                                        setEditingEvent(false)
                                        setSelectedEvent(null)
                                    }}
                                >
                                    <div className="p-4">
                                        <EventForm
                                            event={editingEvent && selectedEvent ? selectedEvent : undefined}
                                            onSuccess={() => {
                                                if (editingEvent) {
                                                    setEditingEvent(false)
                                                } else {
                                                    setCreatingEvent(false)
                                                }
                                                refreshEvents()
                                            }}
                                        />
                                    </div>
                                </EventCard>
                            ) : (
                                selectedEvent && (
                                    <EventCard onClose={() => setSelectedEvent(null)}>
                                        <div className="p-4">
                                            <h2 className="text-xl font-bold mb-1 pr-12">{selectedEvent.name}</h2>
                                            <div className="mb-2 text-secondary">
                                                {dayjs(selectedEvent.date).format('MMMM D, YYYY')}
                                            </div>

                                            <div className="space-y-3 text-sm mb-4">
                                                {selectedEvent.private && (
                                                    <div
                                                        data-scheme="secondary"
                                                        className="border border-primary bg-primary rounded p-2"
                                                    >
                                                        <div className="text-secondary text-[13px]">
                                                            This event is closed to the public
                                                        </div>
                                                    </div>
                                                )}

                                                {selectedEvent.startTime && (
                                                    <div>
                                                        <div className="text-secondary text-[13px] mb-1">
                                                            Start time
                                                        </div>
                                                        <div>
                                                            {dayjs(
                                                                `${selectedEvent.date} ${selectedEvent.startTime}`
                                                            ).format('h:mm A')}
                                                        </div>
                                                    </div>
                                                )}

                                                <div>
                                                    <div className="text-secondary text-[13px] mb-1">Location</div>
                                                    {selectedEvent.location.venue && (
                                                        <div className="text-primary font-semibold mt-1">
                                                            {selectedEvent.location.venue.name}
                                                        </div>
                                                    )}
                                                    <div>{selectedEvent.location.label}</div>
                                                </div>

                                                {selectedEvent.description && (
                                                    <div>
                                                        <div className="text-secondary text-[13px] mb-1">
                                                            Description
                                                        </div>
                                                        <div className="text-sm leading-relaxed">
                                                            {selectedEvent.description}
                                                        </div>
                                                    </div>
                                                )}

                                                {selectedEvent.speakers && selectedEvent.speakers.length > 0 && (
                                                    <div>
                                                        <div className="text-secondary text-[13px] mb-1">
                                                            Speaker{selectedEvent.speakers.length > 1 ? 's' : ''}
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {selectedEvent.speakers.map((speaker, i) => (
                                                                <TeamMember key={i} name={speaker} photo />
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {selectedEvent.speakerTopic && (
                                                    <div>
                                                        <div className="text-secondary text-[13px] mb-1">Topic</div>
                                                        <div>{selectedEvent.speakerTopic}</div>
                                                        {selectedEvent.presentation && (
                                                            <a
                                                                href={selectedEvent.presentation}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="block mt-1 font-semibold underline"
                                                            >
                                                                View slide deck
                                                            </a>
                                                        )}
                                                    </div>
                                                )}

                                                {selectedEvent.format && (
                                                    <div>
                                                        <div className="text-secondary text-[13px] mb-1">Format</div>
                                                        <div>{selectedEvent.format.join(', ')}</div>
                                                    </div>
                                                )}

                                                {selectedEvent.audience && selectedEvent.audience.length > 0 && (
                                                    <div>
                                                        <div className="text-secondary text-[13px] mb-1">Audience</div>
                                                        <div>{selectedEvent.audience.join(', ')}</div>
                                                    </div>
                                                )}

                                                {selectedEvent.partners && selectedEvent.partners.length > 0 && (
                                                    <div>
                                                        <div className="text-secondary text-[13px] mb-1">Partners</div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {selectedEvent.partners.map((partner, i) =>
                                                                partner.url ? (
                                                                    <a
                                                                        key={i}
                                                                        href={partner.url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-orange hover:underline"
                                                                    >
                                                                        {partner.name}
                                                                    </a>
                                                                ) : (
                                                                    <span key={i}>{partner.name}</span>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {selectedEvent.attendees && (
                                                    <div>
                                                        <div className="text-secondary text-[13px] mb-1">Attendees</div>
                                                        <div>{selectedEvent.attendees} people</div>
                                                    </div>
                                                )}

                                                {selectedEvent.vibeScore && (
                                                    <div>
                                                        <div className="text-secondary text-[13px] mb-1">
                                                            Vibe Score
                                                        </div>
                                                        <div className="flex gap-1">
                                                            {Array.from({ length: selectedEvent.vibeScore }).map(
                                                                (_, i) => (
                                                                    <span key={i} className="text-lg">
                                                                        🔥
                                                                    </span>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {selectedEvent.photos && selectedEvent.photos.length > 0 && (
                                                    <div>
                                                        <div className="text-secondary text-[13px] mb-1">Photos</div>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {selectedEvent.photos.map((photo, i) => (
                                                                <ZoomImage key={i}>
                                                                    <img
                                                                        src={photo.url}
                                                                        alt={`Event photo ${i + 1}`}
                                                                        className="w-full h-32 object-cover rounded"
                                                                    />
                                                                </ZoomImage>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {selectedEvent.video && (
                                                    <div>
                                                        <div className="text-secondary text-[13px] mb-1">Video</div>
                                                        <a
                                                            href={selectedEvent.video}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-orange hover:underline text-sm"
                                                        >
                                                            Watch video →
                                                        </a>
                                                    </div>
                                                )}

                                                {selectedEvent.link && (
                                                    <div>
                                                        <OSButton
                                                            asLink
                                                            to={selectedEvent.link}
                                                            variant={
                                                                new Date(selectedEvent.date) >=
                                                                new Date(new Date().toISOString().split('T')[0])
                                                                    ? 'primary'
                                                                    : 'secondary'
                                                            }
                                                            width="full"
                                                            size="md"
                                                            external
                                                        >
                                                            View details
                                                        </OSButton>
                                                    </div>
                                                )}
                                                {isModerator && (
                                                    <div className="mt-2 flex justify-end gap-1">
                                                        <OSButton
                                                            size="md"
                                                            tooltip="Edit this event"
                                                            icon={<IconPencil />}
                                                            onClick={() => {
                                                                setEditingEvent(true)
                                                            }}
                                                        />
                                                        <OSButton
                                                            size="md"
                                                            tooltip="Delete this event"
                                                            icon={<IconTrash />}
                                                            onClick={() => {
                                                                deleteEvent(selectedEvent.id)
                                                                setSelectedEvent(null)
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </EventCard>
                                )
                            )}
                        </AnimatePresence>

                        <div key={chartKey} ref={chartRef} className="w-full h-full" />
                    </div>
                </div>
            </Explorer>
        </>
    )
}

export default Events

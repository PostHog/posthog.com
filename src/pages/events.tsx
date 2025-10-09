import React, { useState, useMemo, useEffect } from 'react'
import { SEO } from 'components/seo'
import ReaderView from 'components/ReaderView'
import OSTable from 'components/OSTable'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import { Select } from 'components/RadixUI/Select'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import TeamMember from 'components/TeamMember'
import OSTabs from 'componsdfghjkl;sents/OSTabs'

// Animated Image Stack Component
const AnimatedImageStack: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    
    const images = [
        'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/d9bb0df4_b5c9_433f_ba89_809e3ec79975_1_1_d84dc9e2d4.jpg',
        'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/PXL_20251007_194137524_MP_f660a14a54.jpg',
        'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/PXL_20251006_133710093_53f185d91a.jpg',
    ]
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentImageIndex(prev => (prev + 1) % images.length)
        }, 800) // 800ms delay between each image
        
        return () => clearTimeout(timer)
    }, [currentImageIndex, images.length])
    
    return (
        <div className="relative w-[220px] h-[220px] mx-auto">
            {images.slice(0, currentImageIndex + 1).map((src, index) => (
                <img
                    key={index}
                    src={src}
                    alt={`Party image ${index + 1}`}
                    className={`absolute top-0 left-0 w-full h-full rounded-lg object-cover transition-all duration-500 ${
                        index === currentImageIndex 
                            ? 'opacity-100' 
                            : 'opacity-80'
                    }`}
                    style={{
                        zIndex: index,
                        transform: `translate(${index * 4}px, ${index * 4}px) scale(${1 - index * 0.02})`
                    }}
                />
            ))}
        </div>
    )
}

interface Event {
    name: string
    location: string
    date: string
    format: string
    audience: string
    attendees: number
    speaker: string | React.ReactElement
    partners: string
    vibeScore: number
    link: string
    coordinates?: [number, number] // [longitude, latitude]
}

const eventsData: Event[] = [
    {
        name: "AGI Builders Meetup",
        location: "SF",
        date: "July 22",
        format: "Talks, Fireside",
        audience: "SF AI Enthusiasts",
        attendees: 112,
        speaker: <TeamMember name="Peter Kirkham" photo />,
        partners: "AGI Builders",
        vibeScore: 5,
        link: "https://github.com/PostHog/company-internal/issues/1999",
        coordinates: [-122.4194, 37.7749]
    },
    {
        name: "AI Breakfast: Decisioning",
        location: "Austin",
        date: "August 12",
        format: "Breakfast + OST",
        audience: "AI Engineers",
        attendees: 25,
        speaker: <TeamMember name="Haven Barnes" photo />,
        partners: "AITX",
        vibeScore: 5,
        link: "https://github.com/PostHog/meta/issues/334",
        coordinates: [-97.7431, 30.2672]
    },
    {
        name: "PostHog hardware hacknight",
        location: "Vermont",
        date: "September 16",
        format: "Meetup",
        audience: "Engineers and founders",
        attendees: 19,
        speaker: <TeamMember name="Danilo Campos" photo />,
        partners: "-",
        vibeScore: 5,
        link: "https://github.com/PostHog/meta/issues/322",
        coordinates: [-72.5805, 44.2664]
    },
    {
        name: "MCP Builders Breakfast",
        location: "Amsterdam",
        date: "September 25",
        format: "Breakfast + OST",
        audience: "MCP practitioners",
        attendees: 20,
        speaker: <TeamMember name="Jon Lu" photo />,
        partners: "Fiberplane",
        vibeScore: 5,
        link: "https://github.com/PostHog/meta/issues/356",
        coordinates: [4.9041, 52.3676]
    },
    {
        name: "From Open Source to Scale: A Conversation with PostHog's Tim Glaser",
        location: "Dublin",
        date: "September 26",
        format: "Panel",
        audience: "Founders",
        attendees: 55,
        speaker: <TeamMember name="Tim Glaser" photo />,
        partners: "-",
        vibeScore: 5,
        link: "https://github.com/PostHog/meta/issues/371",
        coordinates: [-6.2603, 53.3498]
    },
    {
        name: "Paellas and Agents with PostHog",
        location: "Barcelona",
        date: "September 28",
        format: "Workshop",
        audience: "AI engineers",
        attendees: 22,
        speaker: <TeamMember name="Georgiy Tarasov" photo />,
        partners: "-",
        vibeScore: 5,
        link: "https://github.com/PostHog/meta/issues/333",
        coordinates: [2.1734, 41.3851]
    },
    {
        name: "Valio Con",
        location: "San Diego",
        date: "September 14",
        format: "Conf sponsorship",
        audience: "Designers",
        attendees: 65,
        speaker: <TeamMember name="Cory Watilo" photo />,
        partners: "-",
        vibeScore: 4,
        link: "https://github.com/PostHog/meta/issues/343",
        coordinates: [-117.1611, 32.7157]
    },
    {
        name: "PostHog Founders Lunch",
        location: "Cardiff",
        date: "September 23",
        format: "Lunch + OST",
        audience: "Founders",
        attendees: 25,
        speaker: <TeamMember name="Adam Leith" photo />,
        partners: "-",
        vibeScore: 4,
        link: "https://github.com/PostHog/meta/issues/372",
        coordinates: [-3.1791, 51.4816]
    },
    {
        name: "[Closed Event] James dinner with ODF founders",
        location: "SF",
        date: "September 24",
        format: "Dinner",
        audience: "Founders",
        attendees: 11,
        speaker: <TeamMember name="James Hawkins" photo />,
        partners: "ODF",
        vibeScore: 4,
        link: "https://posthog.slack.com/archives/C08CG24E3SR/p1758828510754499",
        coordinates: [-122.4194, 37.7749]
    },
    {
        name: "Jersey City Tech Meetup with PostHog",
        location: "Jersey City",
        date: "September 30",
        format: "Talks, Panel, Networking",
        audience: "Product managers and engineers",
        attendees: 70,
        speaker: <TeamMember name="Abe Basu" photo />,
        partners: "Apprenticeio",
        vibeScore: 4,
        link: "https://github.com/PostHog/meta/issues/339",
        coordinates: [-74.0776, 40.7178]
    },
    {
        name: "MCP After Hours: AI Dev Tools Demo Night",
        location: "SF",
        date: "July 10",
        format: "Talks",
        audience: "Founders, engineers",
        attendees: 85,
        speaker: <TeamMember name="Peter Kirkham" photo />,
        partners: "Speakeasy",
        vibeScore: 3,
        link: "https://github.com/PostHog/meta/issues/325",
        coordinates: [-122.4194, 37.7749]
    },
    {
        name: "Building With and For AI: Developer Tools for Modern Apps",
        location: "NYC",
        date: "August 21",
        format: "Talks, Networking",
        audience: "Engineers, Engineering managers",
        attendees: 50,
        speaker: <TeamMember name="Abe Basu" photo />,
        partners: "Vercel, Profound",
        vibeScore: 3,
        link: "https://github.com/PostHog/meta/issues/342",
        coordinates: [-74.0060, 40.7128]
    },
    {
        name: "The Future of Developer Experience: Toronto Edition",
        location: "Toronto",
        date: "August 26",
        format: "Talks, Networking",
        audience: "Startup founders",
        attendees: 75,
        speaker: <TeamMember name="Vincent Ge" photo />,
        partners: "Deskree",
        vibeScore: 3,
        link: "https://github.com/PostHog/meta/issues/347",
        coordinates: [-79.3832, 43.6532]
    },
    {
        name: "Stealth Mode Mornings with PostHog",
        location: "NYC",
        date: "July 24",
        format: "Breakfast",
        audience: "Stealth founders",
        attendees: 7,
        speaker: <TeamMember name="Mine Kansu" photo />,
        partners: "Starcycle, Cooley",
        vibeScore: 2,
        link: "https://github.com/PostHog/meta/issues/330",
        coordinates: [-74.0060, 40.7128]
    },
    {
        name: "Pubquiz at Flutter & friends",
        location: "Stockholm",
        date: "August 31",
        format: "Pub quiz",
        audience: "Flutter engineers",
        attendees: 50,
        speaker: <TeamMember name="Manoel Aranda Neto" photo />,
        partners: "-",
        vibeScore: 2,
        link: "https://github.com/PostHog/meta/issues/358",
        coordinates: [18.0686, 59.3293]
    },
    {
        name: "München Hogtoberfest '25",
        location: "Munich",
        date: "September 24",
        format: "Drinks",
        audience: "Founders and engineers",
        attendees: 7,
        speaker: "-",
        partners: "Speedinvest",
        vibeScore: 2,
        link: "https://github.com/PostHog/meta/issues/361",
        coordinates: [11.5761, 48.1351]
    }
]

// Map component for displaying events
const EventsMap: React.FC<{ events: Event[] }> = ({ events }) => {
    const [hoveredEvent, setHoveredEvent] = useState<Event | null>(null)
    const [mapScale, setMapScale] = useState(285)
    const [mapCenter, setMapCenter] = useState([0, 20])
    
    const eventsWithCoordinates = events.filter(event => event.coordinates)
    
    return (
        <div className="relative bg-accent border border-primary rounded-lg p-4">
            {/* Map Legend */}
            <div className="flex items-center justify-center gap-6 mb-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#F54E00]"></div>
                    <span className="text-secondary">High Vibe (4-5 stars)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#F7A501]"></div>
                    <span className="text-secondary">Medium Vibe (3 stars)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#bfbfbd]"></div>
                    <span className="text-secondary">Lower Vibe (1-2 stars)</span>
                </div>
            </div>
            <ComposableMap
                projection="geoEqualEarth"
                projectionConfig={{
                    scale: mapScale,
                    center: mapCenter
                }}
                className="w-full h-96"
                style={{
                    width: "100%",
                    height: "400px"
                }}
            >
                <Geographies geography="/world-countries-sans-antarctica.json">
                    {({ geographies }: { geographies: any[] }) =>
                        geographies.map((geo: any) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                style={{
                                    default: { 
                                        outline: 'none',
                                        fill: '#bfbfbd',
                                        stroke: '#e0e0e0',
                                        strokeWidth: 0.5
                                    },
                                    hover: { 
                                        outline: 'none',
                                        fill: '#a0a0a0'
                                    },
                                    pressed: { 
                                        outline: 'none',
                                        fill: '#909090'
                                    },
                                }}
                            />
                        ))
                    }
                </Geographies>
                {eventsWithCoordinates.map((event, index) => (
                    <Marker key={index} coordinates={event.coordinates!}>
                        <g
                            onMouseEnter={() => setHoveredEvent(event)}
                            onMouseLeave={() => setHoveredEvent(null)}
                            className="cursor-pointer"
                        >
                            <circle className="animate-ping" r={7} fill="white" />
                            <circle 
                                r={6} 
                                fill={event.vibeScore >= 4 ? "#F54E00" : event.vibeScore >= 3 ? "#F7A501" : "#bfbfbd"}
                                stroke="white"
                                strokeWidth={2}
                            />
                            <title>{event.name} - {event.location}</title>
                        </g>
                    </Marker>
                ))}
            </ComposableMap>
            
            {/* Zoom and Pan Controls */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
                <button
                    onClick={() => {
                        setMapScale(prev => Math.min(prev * 1.2, 1000))
                    }}
                    className="bg-white border border-primary rounded p-2 hover:bg-accent transition-colors shadow-sm"
                    title="Zoom In"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
                <button
                    onClick={() => {
                        setMapScale(prev => Math.max(prev / 1.2, 100))
                    }}
                    className="bg-white border border-primary rounded p-2 hover:bg-accent transition-colors shadow-sm"
                    title="Zoom Out"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
                <button
                    onClick={() => {
                        setMapScale(285)
                        setMapCenter([0, 20])
                    }}
                    className="bg-white border border-primary rounded p-2 hover:bg-accent transition-colors shadow-sm"
                    title="Reset View"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                        <path d="M3 3v5h5"></path>
                        <path d="M21 12a9 9 0 1 1-9 9 9.75 9.75 0 0 1 6.74-2.74L21 16"></path>
                        <path d="M21 21v-5h-5"></path>
                    </svg>
                </button>
            </div>
            
            {/* Pan Controls */}
            <div className="absolute bottom-4 left-4 flex gap-2">
                <button
                    onClick={() => {
                        setMapCenter(prev => [prev[0] - 20, prev[1]])
                    }}
                    className="bg-white border border-primary rounded p-2 hover:bg-accent transition-colors shadow-sm"
                    title="Pan Left"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                </button>
                <button
                    onClick={() => {
                        setMapCenter(prev => [prev[0] + 20, prev[1]])
                    }}
                    className="bg-white border border-primary rounded p-2 hover:bg-accent transition-colors shadow-sm"
                    title="Pan Right"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                </button>
                <button
                    onClick={() => {
                        setMapCenter(prev => [prev[0], prev[1] + 10])
                    }}
                    className="bg-white border border-primary rounded p-2 hover:bg-accent transition-colors shadow-sm"
                    title="Pan Up"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="18,15 12,9 6,15"></polyline>
                    </svg>
                </button>
                <button
                    onClick={() => {
                        setMapCenter(prev => [prev[0], prev[1] - 10])
                    }}
                    className="bg-white border border-primary rounded p-2 hover:bg-accent transition-colors shadow-sm"
                    title="Pan Down"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                </button>
            </div>
            
            {/* Hover tooltip */}
            {hoveredEvent && (
                <div className="absolute top-4 right-4 bg-primary border border-primary rounded-lg p-4 shadow-lg max-w-sm z-10">
                    <h4 className="font-semibold text-primary mb-2">{hoveredEvent.name}</h4>
                    <div className="space-y-1 text-sm text-secondary">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">📍</span>
                            <span>{hoveredEvent.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">📅</span>
                            <span>{hoveredEvent.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">👥</span>
                            <span>{hoveredEvent.attendees} attendees</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">🎤</span>
                            {typeof hoveredEvent.speaker === 'string' ? (
                                hoveredEvent.speaker !== "-" ? (
                                    <TeamMember name={hoveredEvent.speaker} photo />
                                ) : (
                                    <span className="text-muted">-</span>
                                )
                            ) : (
                                hoveredEvent.speaker
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">⭐</span>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <span
                                        key={i}
                                        className={`text-sm ${
                                            i < hoveredEvent.vibeScore ? 'text-yellow' : 'text-muted'
                                        }`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const EventsPage: React.FC = () => {
    const [sortBy, setSortBy] = useState<string>('vibe')
    const [filterBy, setFilterBy] = useState<string>('all')
    const [viewMode, setViewMode] = useState<'table' | 'map'>('table')
    const [tableSortBy, setTableSortBy] = useState<string>('name')
    const [tableSortDirection, setTableSortDirection] = useState<'asc' | 'desc'>('desc')
    
    // Handle table column sorting
    const handleTableSort = (column: string) => {
        if (tableSortBy === column) {
            setTableSortDirection(tableSortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setTableSortBy(column)
            setTableSortDirection('desc')
        }
    }
    
    // Get featured events (highest vibe score)
    const featuredEvents = eventsData.filter(event => event.vibeScore >= 5).slice(0, 3)
    
    // Filter and sort events
    const filteredAndSortedEvents = useMemo(() => {
        let filtered = [...eventsData]
        
        // Apply filters
        if (filterBy !== 'all') {
            if (filterBy === 'upcoming') {
                // Filter for events that haven't happened yet (simplified logic)
                filtered = filtered.filter(event => {
                    const eventDate = new Date(event.date + ' 2024')
                    return eventDate >= new Date()
                })
            } else if (filterBy === 'past') {
                filtered = filtered.filter(event => {
                    const eventDate = new Date(event.date + ' 2024')
                    return eventDate < new Date()
                })
            } else if (filterBy === 'high-vibe') {
                filtered = filtered.filter(event => event.vibeScore >= 4)
            }
        }
        
        // Apply sorting
        return filtered.sort((a, b) => {
            const currentSortBy = tableSortBy
            const currentDirection = tableSortDirection
            
            let comparison = 0
            
            if (currentSortBy === 'vibe') {
                comparison = a.vibeScore - b.vibeScore
            } else if (currentSortBy === 'date') {
                // Parse dates more robustly
                const parseDate = (dateStr: string) => {
                    const [month, day] = dateStr.split(' ')
                    const monthMap: { [key: string]: number } = {
                        'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
                        'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
                    }
                    return new Date(2024, monthMap[month] || 0, parseInt(day) || 1)
                }
                const aDate = parseDate(a.date)
                const bDate = parseDate(b.date)
                comparison = aDate.getTime() - bDate.getTime()
            } else if (currentSortBy === 'attendees') {
                comparison = a.attendees - b.attendees
            } else if (currentSortBy === 'name') {
                comparison = a.name.localeCompare(b.name)
            } else if (currentSortBy === 'location') {
                comparison = a.location.localeCompare(b.location)
            } else if (currentSortBy === 'format') {
                comparison = a.format.localeCompare(b.format)
            } else if (currentSortBy === 'audience') {
                comparison = a.audience.localeCompare(b.audience)
            } else if (currentSortBy === 'speaker') {
                // Handle both string and React element speakers
                const aSpeaker = typeof a.speaker === 'string' ? a.speaker : a.speaker.props?.name || ''
                const bSpeaker = typeof b.speaker === 'string' ? b.speaker : b.speaker.props?.name || ''
                comparison = aSpeaker.localeCompare(bSpeaker)
            } else {
                // Default fallback - sort by name if unknown column
                comparison = a.name.localeCompare(b.name)
            }
            
            return currentDirection === 'desc' ? -comparison : comparison
        })
    }, [filterBy, tableSortBy, tableSortDirection])

    const columns = [
        { 
            name: (
                <button 
                    onClick={() => handleTableSort('name')}
                    className="flex items-center gap-1 hover:text-accent"
                >
                    Event
                    {tableSortBy === 'name' && (
                        <span className="text-xs">
                            {tableSortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                    )}
                </button>
            ), 
            width: 'minmax(300px,4fr)', 
            align: 'left' as const 
        },
        { 
            name: (
                <button 
                    onClick={() => handleTableSort('date')}
                    className="flex items-center gap-1 hover:text-accent"
                >
                    Date
                    {tableSortBy === 'date' && (
                        <span className="text-xs">
                            {tableSortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                    )}
                </button>
            ), 
            width: 'minmax(120px,1fr)', 
            align: 'center' as const 
        },
        { 
            name: (
                <button 
                    onClick={() => handleTableSort('format')}
                    className="flex items-center gap-1 hover:text-accent"
                >
                    Format
                    {tableSortBy === 'format' && (
                        <span className="text-xs">
                            {tableSortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                    )}
                </button>
            ), 
            width: 'minmax(140px,1fr)', 
            align: 'center' as const 
        },
        { 
            name: (
                <button 
                    onClick={() => handleTableSort('audience')}
                    className="flex items-center gap-1 hover:text-accent"
                >
                    Audience
                    {tableSortBy === 'audience' && (
                        <span className="text-xs">
                            {tableSortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                    )}
                </button>
            ), 
            width: 'minmax(180px,1fr)', 
            align: 'center' as const 
        },
        { 
            name: (
                <button 
                    onClick={() => handleTableSort('attendees')}
                    className="flex items-center gap-1 hover:text-accent"
                >
                    Attendees
                    {tableSortBy === 'attendees' && (
                        <span className="text-xs">
                            {tableSortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                    )}
                </button>
            ), 
            width: 'minmax(100px,1fr)', 
            align: 'center' as const 
        },
        { 
            name: (
                <button 
                    onClick={() => handleTableSort('speaker')}
                    className="flex items-center gap-1 hover:text-accent"
                >
                    Speaker
                    {tableSortBy === 'speaker' && (
                        <span className="text-xs">
                            {tableSortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                    )}
                </button>
            ), 
            width: 'minmax(150px,1fr)', 
            align: 'center' as const 
        },
        { 
            name: (
                <button 
                    onClick={() => handleTableSort('vibe')}
                    className="flex items-center gap-1 hover:text-accent"
                >
                    Vibe
                    {tableSortBy === 'vibe' && (
                        <span className="text-xs">
                            {tableSortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                    )}
                </button>
            ), 
            width: 'minmax(100px,1fr)', 
            align: 'center' as const 
        },
    ]

    const rows = filteredAndSortedEvents.map((event, index) => ({
        key: index.toString(),
        cells: [
            {
                content: (
                    <div className="flex flex-col">
                        <Link 
                            to={event.link} 
                            externalNoIcon
                            className="font-semibold text-primary hover:text-accent text-sm leading-tight"
                        >
                            {event.name}
                        </Link>
                        <span className="text-xs text-secondary mt-1">{event.location}</span>
                    </div>
                )
            },
            { content: event.date },
            { content: event.format },
            { content: event.audience },
            { content: event.attendees.toString() },
            { 
                content: typeof event.speaker === 'string' ? (
                    event.speaker !== "-" ? (
                        <TeamMember name={event.speaker} photo />
                    ) : (
                        <span className="text-muted">-</span>
                    )
                ) : (
                    event.speaker
                )
            },
            {
                content: (
                    <div className="flex items-center justify-center">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <span
                                    key={i}
                                    className={`text-lg ${
                                        i < event.vibeScore ? 'text-yellow' : 'text-muted'
                                    }`}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>
                )
            }
        ]
    }))

    return (
        <>
            <SEO 
                title="Events - PostHog" 
                description="Join PostHog at events around the world. Connect with the community, learn from experts, and discover the latest in product analytics."
                image="/images/og/default.png"
            />
                <ReaderView
                    title="Party with PostHog"
                    hideTitle={true}
                    description="Connect with PostHog at events around the world"
                proseSize="base"
            >
                <section className="max-w-6xl">
                    {/* Hero Section */}
                    <div className="flex flex-col @lg:flex-row @lg:items-start gap-8 mb-12">
                        <div className="@lg:flex-1">
                            <h1>Party with PostHog</h1>
                            <p className="text-secondary text-lg">
                                We run all sorts of events and parties around the world. From AI meetups to founder breakfasts, 
                                we just want to have a good time and spend all this VC money on the community. In a responsible, safe way. Probably. 
                            </p>
                            <blockquote className="border-l-4 border-accent pl-4 mt-4 italic text-secondary">
                                Want to collab? Chat to our party planner, <TeamMember name="Daniel Zaltsman" photo />, or <a href="https://github.com/PostHog/meta/issues" className="text-accent">open an issue</a>.
                            </blockquote>
                        </div>
                        <div className="@lg:flex-shrink-0">
                            <AnimatedImageStack />
                        </div>
                    </div>

                    {/* Featured Events Section */}
                    {featuredEvents.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold mb-6">Upcoming events with great vibe potential...</h2>
                            <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-6">
                                {featuredEvents.map((event, index) => (
                                    <div 
                                        key={index}
                                        className="bg-accent border border-primary rounded-lg p-6 hover:border-accent transition-colors"
                                    >
                                        <div className="mb-3">
                                            <h3 className="font-semibold text-primary text-lg leading-tight">
                                                {event.name}
                                            </h3>
                                        </div>
                                        <div className="space-y-2 text-sm text-secondary">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">📍</span>
                                                <span>{event.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">📅</span>
                                                <span>{event.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">👥</span>
                                                <span>{event.attendees} attendees</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">🎤</span>
                                                {typeof event.speaker === 'string' ? (
                                                    event.speaker !== "-" ? (
                                                        <TeamMember name={event.speaker} photo />
                                                    ) : (
                                                        <span className="text-muted">-</span>
                                                    )
                                                ) : (
                                                    event.speaker
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <CallToAction 
                                                to={event.link}
                                                externalNoIcon
                                                size="sm"
                                                width="full"
                                            >
                                                Learn More
                                            </CallToAction>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


                    {/* All Events Section */}
                    <div className="mb-8">
                        <div className="flex flex-col @md:flex-row @md:items-center @md:justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">All Events</h2>
                                <p className="text-secondary">
                                    Browse our complete calendar of events. {filteredAndSortedEvents.length} events found.
                                </p>
                            </div>
                            <div className="flex flex-col @sm:flex-row gap-4 mt-4 @md:mt-0">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-primary">Filter by:</label>
                                    <Select
                                        groups={[
                                            {
                                                label: '',
                                                items: [
                                                    { value: 'all', label: 'All Events' },
                                                    { value: 'upcoming', label: 'Upcoming' },
                                                    { value: 'past', label: 'Past Events' },
                                                    { value: 'high-vibe', label: 'High Vibe (4+ stars)' }
                                                ]
                                            }
                                        ]}
                                        placeholder="Filter events"
                                        ariaLabel="Filter events"
                                        className="w-full @sm:w-48"
                                        value={filterBy}
                                        onValueChange={(value: string) => setFilterBy(value)}
                                        dataScheme="primary"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-primary">Sort by:</label>
                                    <Select
                                        groups={[
                                            {
                                                label: '',
                                                items: [
                                                    { value: 'vibe', label: 'Vibe Score' },
                                                    { value: 'date', label: 'Date' },
                                                    { value: 'attendees', label: 'Attendees' }
                                                ]
                                            }
                                        ]}
                                        placeholder="Sort events"
                                        ariaLabel="Sort events"
                                        className="w-full @sm:w-48"
                                        value={sortBy}
                                        onValueChange={(value: string) => setSortBy(value)}
                                        dataScheme="primary"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* View Mode Tabs */}
                        <OSTabs
                            className="mb-6"
                            tabs={[
                                {
                                    label: 'Table View',
                                    value: 'table',
                                    content: (
                                        <OSTable
                                            columns={columns}
                                            rows={rows}
                                            size="md"
                                            className="text-sm"
                                        />
                                    )
                                },
                                {
                                    label: 'Map View',
                                    value: 'map',
                                    content: (
                                        <EventsMap events={filteredAndSortedEvents} />
                                    )
                                }
                            ]}
                            value={viewMode}
                            onValueChange={(value: string) => setViewMode(value as 'table' | 'map')}
                            triggerDataScheme="primary"
                            border={true}
                            padding={true}
                        />
                    </div>

                    {/* Stats Section with Ad */}
                    <div className="grid grid-cols-1 @md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-accent border border-primary rounded-lg p-6 text-center">
                            <div className="text-4xl font-bold text-primary mb-2">
                                16
                            </div>
                            <div className="text-lg font-semibold text-primary mb-2">parties planned</div>
                            <div className="text-sm text-secondary italic">
                                (17, actually. But we don't talk about HostHog)
                            </div>
                        </div>
                        <div className="bg-accent border border-primary rounded-lg p-6 text-center">
                            <div className="text-4xl font-bold text-primary mb-2">
                                3.8
                            </div>
                            <div className="text-lg font-semibold text-primary mb-2">average vibe score</div>
                            <div className="text-sm text-secondary italic">
                                Maybe you can get this number up for us?
                            </div>
                        </div>
                        <div className="bg-accent border border-primary rounded-lg p-6 text-center">
                            <div className="text-4xl font-bold text-primary mb-2">
                                0
                            </div>
                            <div className="text-lg font-semibold text-primary mb-2">webinars planned</div>
                            <div className="text-sm text-secondary italic">
                                Webinars are boring. We do IRL parties instead.
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-accent border border-primary rounded-lg pt-4 pb-8 px-8 text-center">
                        <h3 className="text-xl font-bold mb-2">Want to host an event with us?</h3>
                        <p className="text-secondary mb-6">
                            Rewards include free merch, invites to exclusive organizer events, PostHog credits, and more. Plus, we're always willing to collab with interesting companies.
                        </p>
                        <div className="flex flex-col @sm:flex-row gap-4 justify-center">
                            <CallToAction 
                                to="//community/profiles/34023"
                                size="md"
                            >
                                Chat to our party planner
                            </CallToAction>
                            <CallToAction 
                                to="/community-incubator"
                                size="md"
                                type="secondary"
                            >
                                Join the Community Incubator
                            </CallToAction>
                        </div>
                    </div>
                </section>
            </ReaderView>
        </>
    )
}

export default EventsPage
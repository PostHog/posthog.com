import React, { useState, useMemo } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { useStaticQuery, graphql } from 'gatsby'
import CloudinaryImage from 'components/CloudinaryImage'
import Tooltip from 'components/RadixUI/Tooltip'

const GEO_URL = '/world-countries-sans-antarctica.json'

// Simple coordinate mapping for common locations
// Format: [longitude, latitude]
const LOCATION_COORDS: { [key: string]: [number, number] } = {
    // North America - Cities
    'san francisco': [-122.4194, 37.7749],
    'new york': [-74.006, 40.7128],
    'los angeles': [-118.2437, 34.0522],
    seattle: [-122.3321, 47.6062],
    portland: [-122.6765, 45.5231],
    chicago: [-87.6298, 41.8781],
    austin: [-97.7431, 30.2672],
    denver: [-104.9903, 39.7392],
    boston: [-71.0589, 42.3601],
    toronto: [-79.3832, 43.6532],
    montreal: [-73.5673, 45.5017],
    vancouver: [-123.1207, 49.2827],

    // Europe - Cities
    london: [-0.1276, 51.5074],
    paris: [2.3522, 48.8566],
    berlin: [13.405, 52.52],
    amsterdam: [4.9041, 52.3676],
    barcelona: [2.1734, 41.3851],
    madrid: [-3.7038, 40.4168],
    rome: [12.4964, 41.9028],
    lisbon: [-9.1393, 38.7223],
    dublin: [-6.2603, 53.3498],
    edinburgh: [-3.1883, 55.9533],
    manchester: [-2.2426, 53.4808],
    stockholm: [18.0686, 59.3293],
    copenhagen: [12.5683, 55.6761],
    oslo: [10.7522, 59.9139],
    helsinki: [24.9384, 60.1695],
    warsaw: [21.0122, 52.2297],
    prague: [14.4378, 50.0755],
    vienna: [16.3738, 48.2082],
    budapest: [19.0402, 47.4979],
    zurich: [8.5417, 47.3769],
    munich: [11.582, 48.1351],
    brussels: [4.3517, 50.8503],
    athens: [23.7275, 37.9838],
    krakow: [19.945, 50.0647],
    porto: [-8.6291, 41.1579],
    valencia: [-0.3763, 39.4699],

    // South America
    bogotá: [-74.0721, 4.711],
    bogota: [-74.0721, 4.711],
    'são paulo': [-46.6333, -23.5505],
    'buenos aires': [-58.3816, -34.6037],
    santiago: [-70.6693, -33.4489],
    lima: [-77.0428, -12.0464],

    // Asia
    singapore: [103.8198, 1.3521],
    tokyo: [139.6917, 35.6895],
    bangkok: [100.5018, 13.7563],
    dubai: [55.2708, 25.2048],
    'tel aviv': [34.7818, 32.0853],
    istanbul: [28.9784, 41.0082],

    // Oceania
    sydney: [151.2093, -33.8688],
    melbourne: [144.9631, -37.8136],
    auckland: [174.7633, -36.8485],

    // Countries (fallback to capitals)
    'united states': [-95.7129, 37.0902],
    usa: [-95.7129, 37.0902],
    'united kingdom': [-0.1276, 51.5074],
    uk: [-0.1276, 51.5074],
    canada: [-106.3468, 56.1304],
    germany: [13.405, 52.52],
    france: [2.3522, 48.8566],
    spain: [-3.7038, 40.4168],
    italy: [12.4964, 41.9028],
    netherlands: [4.9041, 52.3676],
    belgium: [4.3517, 50.8503],
    portugal: [-9.1393, 38.7223],
    poland: [21.0122, 52.2297],
    sweden: [18.0686, 59.3293],
    norway: [10.7522, 59.9139],
    denmark: [12.5683, 55.6761],
    finland: [24.9384, 60.1695],
    ireland: [-6.2603, 53.3498],
    switzerland: [8.5417, 47.3769],
    austria: [16.3738, 48.2082],
    greece: [23.7275, 37.9838],
    colombia: [-74.0721, 4.711],
    brazil: [-46.6333, -23.5505],
    argentina: [-58.3816, -34.6037],
    chile: [-70.6693, -33.4489],
    australia: [151.2093, -33.8688],
    'new zealand': [174.7633, -36.8485],
    singapore: [103.8198, 1.3521],
}

function getCoordinates(location?: string, country?: string): [number, number] | null {
    const searchTerms = [location, country].filter(Boolean).map((s) => s?.toLowerCase().trim())

    for (const term of searchTerms) {
        if (term && LOCATION_COORDS[term]) {
            return LOCATION_COORDS[term]
        }
    }

    return null
}

// Avoid displaying markers too close to each other
const isOverlapping = (lat: number, lng: number, locations: LocationGroup[], offset = 3) => {
    return locations.some((group) => {
        return Math.abs(group.coordinates[1] - lat) < offset && Math.abs(group.coordinates[0] - lng) < offset
    })
}

interface TeamMember {
    id: string
    squeakId: string
    firstName: string
    lastName: string
    location?: string
    country?: string
    avatar?: { url: string }
    companyRole?: string
}

interface LocationGroup {
    coordinates: [number, number]
    location: string
    members: TeamMember[]
}

export default function TeamLocationMap(): JSX.Element {
    const [selectedLocation, setSelectedLocation] = useState<LocationGroup | null>(null)

    const data = useStaticQuery(graphql`
        query TeamLocationMapQuery {
            team: allSqueakProfile(
                filter: { teams: { data: { elemMatch: { id: { ne: null } } } } }
                sort: { fields: startDate, order: ASC }
            ) {
                teamMembers: nodes {
                    id
                    squeakId
                    firstName
                    lastName
                    location
                    country
                    avatar {
                        url
                    }
                    companyRole
                }
            }
        }
    `)

    const teamMembers: TeamMember[] = data.team.teamMembers

    // Group team members by location
    const locationGroups: LocationGroup[] = useMemo(() => {
        const groups: LocationGroup[] = []

        teamMembers.forEach((member) => {
            const coords = getCoordinates(member.location, member.country)
            if (!coords) return

            const [lng, lat] = coords
            const displayLocation = member.location || member.country || 'Unknown'

            // Check if this location overlaps with existing ones
            if (isOverlapping(lat, lng, groups)) {
                // Find the overlapping group and add this member to it
                const overlappingGroup = groups.find(
                    (g) => Math.abs(g.coordinates[1] - lat) < 3 && Math.abs(g.coordinates[0] - lng) < 3
                )
                if (overlappingGroup) {
                    overlappingGroup.members.push(member)
                    return
                }
            }

            // Create a new location group
            groups.push({
                coordinates: coords,
                location: displayLocation,
                members: [member],
            })
        })

        return groups
    }, [teamMembers])

    const totalMapped = locationGroups.reduce((sum, group) => sum + group.members.length, 0)
    const uniqueLocations = locationGroups.length

    return (
        <div className="w-full">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Where we're based</h2>
                <p className="text-base opacity-75">
                    {uniqueLocations > 0 ? (
                        <>
                            PostHog team members are distributed across <strong>{uniqueLocations} locations</strong>{' '}
                            around the world.
                            {totalMapped < teamMembers.length && (
                                <span className="ml-1">
                                    (Showing {totalMapped} of {teamMembers.length} team members with location data)
                                </span>
                            )}
                        </>
                    ) : (
                        <>
                            No team members with mappable location data found. Check the console for details about
                            available locations.
                        </>
                    )}
                </p>
            </div>

            <div className="relative bg-white dark:bg-gray-900 rounded-lg border border-light dark:border-dark overflow-hidden">
                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{
                        scale: 147,
                        center: [0, 20],
                    }}
                    className="w-full"
                    style={{ width: '100%', height: 'auto' }}
                >
                    <Geographies geography={GEO_URL}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="#E5E7EB"
                                    stroke="#D1D5DB"
                                    strokeWidth={0.5}
                                    style={{
                                        default: { outline: 'none' },
                                        hover: { outline: 'none', fill: '#F3F4F6' },
                                        pressed: { outline: 'none' },
                                    }}
                                />
                            ))
                        }
                    </Geographies>
                    {locationGroups.map((group, index) => (
                        <Marker
                            key={`${group.coordinates[0]},${group.coordinates[1]}-${index}`}
                            coordinates={group.coordinates}
                        >
                            <Tooltip
                                trigger={
                                    <g
                                        className="cursor-pointer transition-all hover:scale-110"
                                        onClick={() =>
                                            setSelectedLocation(
                                                selectedLocation?.location === group.location ? null : group
                                            )
                                        }
                                    >
                                        <circle
                                            r={Math.min(3 + group.members.length * 0.5, 12)}
                                            fill="#F54E00"
                                            className="animate-pulse"
                                            opacity={0.3}
                                        />
                                        <circle
                                            r={Math.min(2 + group.members.length * 0.3, 8)}
                                            fill="#F54E00"
                                            stroke="#fff"
                                            strokeWidth={1}
                                        />
                                        <text
                                            textAnchor="middle"
                                            y={-8}
                                            style={{
                                                fontSize: '5px',
                                                fill: '#000',
                                                fontWeight: 'bold',
                                                pointerEvents: 'none',
                                            }}
                                        >
                                            {group.members.length}
                                        </text>
                                    </g>
                                }
                            >
                                <div className="text-sm">
                                    <div className="font-bold mb-1">{group.location}</div>
                                    <div className="text-xs opacity-75">
                                        {group.members.length} team {group.members.length === 1 ? 'member' : 'members'}
                                    </div>
                                    <div className="mt-2 text-xs">Click to see details</div>
                                </div>
                            </Tooltip>
                        </Marker>
                    ))}
                </ComposableMap>
            </div>

            {selectedLocation && (
                <div className="mt-6 p-4 bg-accent dark:bg-accent-dark rounded-lg border border-light dark:border-dark">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold">{selectedLocation.location}</h3>
                        <button
                            onClick={() => setSelectedLocation(null)}
                            className="text-sm opacity-60 hover:opacity-100 transition-opacity"
                        >
                            ✕ Close
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {selectedLocation.members.map((member) => (
                            <a
                                key={member.squeakId}
                                href={`/community/profiles/${member.squeakId}`}
                                className="flex flex-col items-center p-3 bg-white dark:bg-gray-900 rounded border border-light dark:border-dark hover:border-primary dark:hover:border-primary transition-colors"
                            >
                                <CloudinaryImage
                                    width={80}
                                    src={
                                        member.avatar?.url ||
                                        'https://res.cloudinary.com/dmukukwp6/image/upload/v1698231117/max_6942263bd1.png'
                                    }
                                    alt={`${member.firstName} ${member.lastName}`}
                                    imgClassName="w-16 h-16 rounded-full object-cover mb-2"
                                />
                                <div className="text-center">
                                    <div className="font-bold text-sm">
                                        {member.firstName} {member.lastName}
                                    </div>
                                    {member.companyRole && (
                                        <div className="text-xs opacity-75 mt-1">{member.companyRole}</div>
                                    )}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-6 text-sm opacity-75">
                <p>
                    Click on any location marker to see team members based there. Marker size indicates the number of
                    team members.
                </p>
            </div>
        </div>
    )
}

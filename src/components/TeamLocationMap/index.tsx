import React, { useState, useMemo } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { useStaticQuery, graphql } from 'gatsby'
import CloudinaryImage from 'components/CloudinaryImage'
import Tooltip from 'components/RadixUI/Tooltip'

const GEO_URL = '/world-countries-sans-antarctica.json'

// Avoid displaying two locations that are too close to each other
const isOverlapping = (lat: number, lng: number, locations: LocationGroup[], offset = 2) => {
    return locations.some((otherLocation) => {
        return (
            Math.abs(otherLocation.coordinates[1] - lat) < offset &&
            Math.abs(otherLocation.coordinates[0] - lng) < offset
        )
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
            allMapboxLocation {
                nodes {
                    profileId
                    location
                    coordinates {
                        latitude
                        longitude
                    }
                }
            }
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

    const mapboxLocations = data.allMapboxLocation.nodes
    const teamMembers: TeamMember[] = data.team.teamMembers

    // Create a map of profileId to team member
    const profileMap = useMemo(() => {
        const map: { [key: string]: TeamMember } = {}
        teamMembers.forEach((member) => {
            map[member.id] = member
        })
        return map
    }, [teamMembers])

    // Group team members by location, avoiding overlaps
    const locationGroups: LocationGroup[] = useMemo(() => {
        const groups: LocationGroup[] = []

        mapboxLocations.forEach((mapboxLocation: any) => {
            const member = profileMap[mapboxLocation.profileId]
            if (!member) return

            const { longitude, latitude } = mapboxLocation.coordinates
            const coords: [number, number] = [longitude, latitude]

            // Check if this location overlaps with existing ones
            if (isOverlapping(latitude, longitude, groups)) {
                // Find the overlapping group and add this member to it
                const overlappingGroup = groups.find(
                    (g) => Math.abs(g.coordinates[1] - latitude) < 2 && Math.abs(g.coordinates[0] - longitude) < 2
                )
                if (overlappingGroup) {
                    overlappingGroup.members.push(member)
                }
            } else {
                // Create a new location group
                groups.push({
                    coordinates: coords,
                    location: mapboxLocation.location,
                    members: [member],
                })
            }
        })

        return groups
    }, [mapboxLocations, profileMap])

    const totalMapped = locationGroups.reduce((sum, group) => sum + group.members.length, 0)
    const uniqueLocations = locationGroups.length

    return (
        <div className="w-full">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Where we're based</h2>
                <p className="text-base opacity-75">
                    PostHog team members are distributed across <strong>{uniqueLocations} locations</strong> around the
                    world.
                    {totalMapped < teamMembers.length && (
                        <span className="ml-1">
                            (Showing {totalMapped} of {teamMembers.length} team members with location data)
                        </span>
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

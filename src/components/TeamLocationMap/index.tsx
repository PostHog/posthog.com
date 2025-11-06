import React, { useState, useMemo } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { useStaticQuery, graphql } from 'gatsby'
import CloudinaryImage from 'components/CloudinaryImage'
import Tooltip from 'components/RadixUI/Tooltip'

const GEO_URL = '/world-countries-sans-antarctica.json'

// Mapping of locations to coordinates
const locationCoordinates: { [key: string]: [number, number] } = {
    // North America
    'San Francisco': [-122.4194, 37.7749],
    'New York': [-74.006, 40.7128],
    'Los Angeles': [-118.2437, 34.0522],
    Seattle: [-122.3321, 47.6062],
    Portland: [-122.6765, 45.5231],
    Chicago: [-87.6298, 41.8781],
    Austin: [-97.7431, 30.2672],
    Denver: [-104.9903, 39.7392],
    Boston: [-71.0589, 42.3601],
    Washington: [-77.0369, 38.9072],
    Philadelphia: [-75.1652, 39.9526],
    Miami: [-80.1918, 25.7617],
    Toronto: [-79.3832, 43.6532],
    Montreal: [-73.5673, 45.5017],
    Vancouver: [-123.1207, 49.2827],
    'Mexico City': [-99.1332, 19.4326],

    // South America
    Bogotá: [-74.0721, 4.711],
    Bogota: [-74.0721, 4.711],
    'São Paulo': [-46.6333, -23.5505],
    'Buenos Aires': [-58.3816, -34.6037],
    Lima: [-77.0428, -12.0464],
    Santiago: [-70.6693, -33.4489],

    // Europe
    London: [-0.1276, 51.5074],
    Paris: [2.3522, 48.8566],
    Berlin: [13.405, 52.52],
    Madrid: [-3.7038, 40.4168],
    Rome: [12.4964, 41.9028],
    Amsterdam: [4.9041, 52.3676],
    Brussels: [4.3517, 50.8503],
    Vienna: [16.3738, 48.2082],
    Stockholm: [18.0686, 59.3293],
    Copenhagen: [12.5683, 55.6761],
    Oslo: [10.7522, 59.9139],
    Helsinki: [24.9384, 60.1695],
    Dublin: [-6.2603, 53.3498],
    Edinburgh: [-3.1883, 55.9533],
    Munich: [11.582, 48.1351],
    Hamburg: [9.9937, 53.5511],
    Barcelona: [2.1734, 41.3851],
    Lisbon: [-9.1393, 38.7223],
    Warsaw: [21.0122, 52.2297],
    Prague: [14.4378, 50.0755],
    Budapest: [19.0402, 47.4979],
    Athens: [23.7275, 37.9838],
    Zurich: [8.5417, 47.3769],
    Geneva: [6.1432, 46.2044],
    Milan: [9.19, 45.4642],
    Manchester: [-2.2426, 53.4808],
    Bristol: [-2.5879, 51.4545],
    Cambridge: [0.1218, 52.2053],
    Krakow: [19.945, 50.0647],
    Gdansk: [18.6466, 54.352],
    Wroclaw: [17.0385, 51.1079],
    Valencia: [-0.3763, 39.4699],
    Porto: [-8.6291, 41.1579],

    // Asia
    Tokyo: [139.6917, 35.6895],
    Singapore: [103.8198, 1.3521],
    'Hong Kong': [114.1694, 22.3193],
    Shanghai: [121.4737, 31.2304],
    Beijing: [116.4074, 39.9042],
    Seoul: [126.978, 37.5665],
    Bangkok: [100.5018, 13.7563],
    Mumbai: [72.8777, 19.076],
    Delhi: [77.1025, 28.7041],
    Bangalore: [77.5946, 12.9716],
    Hyderabad: [78.4867, 17.385],
    Dubai: [55.2708, 25.2048],
    'Tel Aviv': [34.7818, 32.0853],
    Istanbul: [28.9784, 41.0082],
    Manila: [120.9842, 14.5995],
    Jakarta: [106.8456, -6.2088],
    'Kuala Lumpur': [101.6869, 3.139],
    'Ho Chi Minh City': [106.6297, 10.8231],

    // Oceania
    Sydney: [151.2093, -33.8688],
    Melbourne: [144.9631, -37.8136],
    Brisbane: [153.0251, -27.4698],
    Perth: [115.8605, -31.9505],
    Auckland: [174.7633, -36.8485],
    Wellington: [174.7762, -41.2865],

    // Africa
    'Cape Town': [18.4241, -33.9249],
    Johannesburg: [28.0473, -26.2041],
    Nairobi: [36.8219, -1.2921],
    Cairo: [31.2357, 30.0444],
    Lagos: [3.3792, 6.5244],
    Casablanca: [-7.6162, 33.5731],

    // Countries (fallback to capital cities)
    'United States': [-95.7129, 37.0902],
    US: [-95.7129, 37.0902],
    USA: [-95.7129, 37.0902],
    'United Kingdom': [-0.1276, 51.5074],
    UK: [-0.1276, 51.5074],
    Germany: [13.405, 52.52],
    France: [2.3522, 48.8566],
    Spain: [-3.7038, 40.4168],
    Italy: [12.4964, 41.9028],
    Netherlands: [4.9041, 52.3676],
    Belgium: [4.3517, 50.8503],
    Poland: [21.0122, 52.2297],
    Portugal: [-9.1393, 38.7223],
    Sweden: [18.0686, 59.3293],
    Norway: [10.7522, 59.9139],
    Denmark: [12.5683, 55.6761],
    Finland: [24.9384, 60.1695],
    Ireland: [-6.2603, 53.3498],
    Switzerland: [8.5417, 47.3769],
    Austria: [16.3738, 48.2082],
    'Czech Republic': [14.4378, 50.0755],
    Hungary: [19.0402, 47.4979],
    Greece: [23.7275, 37.9838],
    Canada: [-106.3468, 56.1304],
    Mexico: [-99.1332, 19.4326],
    Brazil: [-46.6333, -23.5505],
    Argentina: [-58.3816, -34.6037],
    Colombia: [-74.0721, 4.711],
    Chile: [-70.6693, -33.4489],
    Peru: [-77.0428, -12.0464],
    Australia: [151.2093, -33.8688],
    'New Zealand': [174.7633, -36.8485],
    Japan: [139.6917, 35.6895],
    China: [116.4074, 39.9042],
    India: [77.1025, 28.7041],
    Singapore: [103.8198, 1.3521],
    'South Korea': [126.978, 37.5665],
    Thailand: [100.5018, 13.7563],
    UAE: [55.2708, 25.2048],
    Israel: [34.7818, 32.0853],
    Turkey: [28.9784, 41.0082],
    'South Africa': [18.4241, -33.9249],
    Kenya: [36.8219, -1.2921],
    Egypt: [31.2357, 30.0444],
    Nigeria: [3.3792, 6.5244],
    Morocco: [-7.6162, 33.5731],
}

// Get coordinates for a location, with fallback logic
function getCoordinates(location?: string, country?: string): [number, number] | null {
    if (location && locationCoordinates[location]) {
        return locationCoordinates[location]
    }
    if (country && locationCoordinates[country]) {
        return locationCoordinates[country]
    }
    // Try case-insensitive match
    const locationLower = location?.toLowerCase()
    const countryLower = country?.toLowerCase()

    for (const [key, coords] of Object.entries(locationCoordinates)) {
        if (locationLower && key.toLowerCase() === locationLower) {
            return coords
        }
        if (countryLower && key.toLowerCase() === countryLower) {
            return coords
        }
    }

    return null
}

interface TeamMember {
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
        const groups: { [key: string]: LocationGroup } = {}

        teamMembers.forEach((member) => {
            const coords = getCoordinates(member.location, member.country)
            if (!coords) return

            const locationKey = `${coords[0]},${coords[1]}`
            const displayLocation = member.location || member.country || 'Unknown'

            if (!groups[locationKey]) {
                groups[locationKey] = {
                    coordinates: coords,
                    location: displayLocation,
                    members: [],
                }
            }
            groups[locationKey].members.push(member)
        })

        return Object.values(groups)
    }, [teamMembers])

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
                    {locationGroups.map((group) => (
                        <Marker key={`${group.coordinates[0]},${group.coordinates[1]}`} coordinates={group.coordinates}>
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

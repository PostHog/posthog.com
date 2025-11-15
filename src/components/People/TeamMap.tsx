import React, { useEffect, useMemo, useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps'
import CloudinaryImage from 'components/CloudinaryImage'
import Link from 'components/Link'
import clsx from 'clsx'

const GEO_URL = '/world-countries-sans-antarctica.json'

type TeamMember = {
    id: string
    squeakId: string
    firstName: string
    lastName: string
    companyRole: string | null
    country: string | null
    location: string | null
    color?: string | null
    pronouns?: string | null
    avatar?: {
        url?: string | null
    } | null
}

type MapboxLocation = {
    profileId: string
    location: string
    coordinates: {
        latitude: number
        longitude: number
    }
}

type MemberWithLocation = TeamMember & {
    mapboxLocation: MapboxLocation
}

type GroupedLocation = {
    key: string
    coordinates: {
        latitude: number
        longitude: number
    }
    locationName: string
    members: MemberWithLocation[]
}

type TeamMapProps = {
    teamMembers: TeamMember[]
    locations: MapboxLocation[]
}

const getMarkerSize = (memberCount: number) => {
    const base = 8
    const scale = Math.min(memberCount, 25)
    return base + Math.sqrt(scale) * 3
}

const formatLocationName = (member: TeamMember, location: MapboxLocation): string => {
    return member.location || location.location || (member.country ? member.country : 'Somewhere on planet Earth')
}

const buildGroups = (teamMembers: TeamMember[], locations: MapboxLocation[]): GroupedLocation[] => {
    const locationByProfile = new Map<string, MapboxLocation>()
    locations.forEach((location) => {
        locationByProfile.set(location.profileId, location)
    })

    const groups = new Map<string, GroupedLocation>()

    teamMembers.forEach((member) => {
        const locationNode = locationByProfile.get(member.id)
        if (!locationNode) {
            return
        }

        const key = `${locationNode.coordinates.latitude.toFixed(2)}-${locationNode.coordinates.longitude.toFixed(2)}`
        const displayName = formatLocationName(member, locationNode)

        if (!groups.has(key)) {
            groups.set(key, {
                key,
                coordinates: locationNode.coordinates,
                locationName: displayName,
                members: [],
            })
        }

        const group = groups.get(key)!
        group.members.push({ ...member, mapboxLocation: locationNode })

        if (!group.locationName && displayName) {
            group.locationName = displayName
        }
    })

    return Array.from(groups.values())
        .map((group) => ({
            ...group,
            members: group.members.sort((a, b) => a.firstName.localeCompare(b.firstName)),
        }))
        .sort((a, b) => b.members.length - a.members.length)
}

const StatsSummary = ({ groups }: { groups: GroupedLocation[] }) => {
    const { totalMembers, countryCount } = useMemo(() => {
        const countrySet = new Set<string>()
        const total = groups.reduce((acc, group) => {
            group.members.forEach((member) => {
                if (member.country) {
                    countrySet.add(member.country)
                }
            })
            return acc + group.members.length
        }, 0)

        return {
            totalMembers: total,
            countryCount: countrySet.size,
        }
    }, [groups])

    return (
        <div className="bg-accent dark:bg-accent-dark rounded-lg border border-light dark:border-dark p-6">
            <h2 className="text-2xl font-bold mb-2">PostHog across the globe</h2>
            <p className="text-secondary max-w-xl">
                {`We've mapped ${totalMembers} PostHog team ${totalMembers === 1 ? 'member' : 'members'} across ${
                    groups.length
                } location${groups.length === 1 ? '' : 's'} in ${countryCount} ${
                    countryCount === 1 ? 'country' : 'countries'
                }.`}
            </p>
            <p className="text-sm text-secondary mt-2">
                We update this map automatically as new teammates join or move somewhere new.
            </p>
        </div>
    )
}

const MemberList = ({ location }: { location: GroupedLocation }) => {
    return (
        <div className="bg-primary dark:bg-primary-dark rounded-lg border border-light dark:border-dark p-6">
            <h3 className="text-xl font-semibold mb-1">{location.locationName}</h3>
            <p className="text-secondary mb-4">
                {location.members.length} {location.members.length === 1 ? 'Hog calls' : 'Hogs call'} this place home.
            </p>
            <ul className="space-y-3">
                {location.members.map((member) => {
                    const name = [member.firstName, member.lastName].filter(Boolean).join(' ')
                    return (
                        <li
                            key={`${member.id}-${member.squeakId}`}
                            className="flex items-center gap-3 border border-dashed border-light dark:border-dark rounded-md p-3"
                        >
                            <div className="size-12 rounded-full overflow-hidden border border-light dark:border-dark bg-accent/50">
                                {member.avatar?.url ? (
                                    <CloudinaryImage
                                        alt={name}
                                        src={member.avatar.url}
                                        imgClassName="w-full h-full object-cover"
                                        className="w-full h-full"
                                        width={96}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-lg font-semibold text-primary">
                                        {member.firstName?.[0]}
                                        {member.lastName?.[0]}
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <Link
                                    to={`/community/profiles/${member.squeakId}`}
                                    state={{ newWindow: true }}
                                    className="font-semibold text-lg block truncate"
                                >
                                    {name}
                                    {member.pronouns && (
                                        <span className="text-sm text-secondary ml-2">({member.pronouns})</span>
                                    )}
                                </Link>
                                {member.companyRole && (
                                    <p className="text-sm text-secondary truncate">{member.companyRole}</p>
                                )}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default function TeamMap({ teamMembers, locations }: TeamMapProps) {
    const groups = useMemo(() => buildGroups(teamMembers, locations), [teamMembers, locations])
    const [selectedKey, setSelectedKey] = useState<string | null>(null)

    useEffect(() => {
        if (!selectedKey && groups.length > 0) {
            setSelectedKey(groups[0].key)
        }
    }, [groups, selectedKey])

    const selectedLocation = groups.find((group) => group.key === selectedKey)

    if (groups.length === 0) {
        return (
            <div className="bg-accent dark:bg-accent-dark rounded-lg border border-light dark:border-dark p-6">
                <h2 className="text-2xl font-semibold mb-2">We're still charting our teammates</h2>
                <p className="text-secondary max-w-2xl">
                    It looks like we couldn't find any location data just yet. Check back soon to see where the PostHog
                    crew is spread around the world.
                </p>
            </div>
        )
    }

    return (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-start">
            <div className="bg-primary dark:bg-primary-dark rounded-lg border border-light dark:border-dark overflow-hidden shadow-lg">
                <div className="aspect-[4/3]">
                    <ComposableMap projectionConfig={{ scale: 150 }} className="w-full h-full">
                        <ZoomableGroup zoom={1} center={[0, 20]}>
                            <Geographies geography={GEO_URL}>
                                {({ geographies }) =>
                                    geographies.map((geo) => (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill="#E6E8EB"
                                            stroke="#C1C6CC"
                                            strokeWidth={0.5}
                                            style={{
                                                default: { outline: 'none' },
                                                hover: { outline: 'none' },
                                                pressed: { outline: 'none' },
                                            }}
                                        />
                                    ))
                                }
                            </Geographies>
                            {groups.map((group) => {
                                const size = getMarkerSize(group.members.length)
                                const isActive = selectedLocation?.key === group.key
                                return (
                                    <Marker
                                        key={group.key}
                                        coordinates={[group.coordinates.longitude, group.coordinates.latitude]}
                                    >
                                        <g
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => setSelectedKey(group.key)}
                                            onKeyDown={(event) => {
                                                if (event.key === 'Enter' || event.key === ' ') {
                                                    event.preventDefault()
                                                    setSelectedKey(group.key)
                                                }
                                            }}
                                            onMouseEnter={() => setSelectedKey(group.key)}
                                            className="cursor-pointer"
                                        >
                                            <title>
                                                {group.locationName} – {group.members.length}{' '}
                                                {group.members.length === 1 ? 'teammate' : 'teammates'}
                                            </title>
                                            <circle
                                                r={size}
                                                fill={isActive ? '#F54E00' : '#FF9755'}
                                                stroke="#fff"
                                                strokeWidth={isActive ? 3 : 2}
                                                className={clsx('transition-all duration-300 ease-out', {
                                                    'opacity-90': !isActive,
                                                })}
                                            />
                                            <text
                                                textAnchor="middle"
                                                y={4}
                                                fontSize={size / 1.8}
                                                fill="#ffffff"
                                                fontWeight={600}
                                            >
                                                {group.members.length}
                                            </text>
                                        </g>
                                    </Marker>
                                )
                            })}
                        </ZoomableGroup>
                    </ComposableMap>
                </div>
            </div>
            <div className="space-y-6">
                <StatsSummary groups={groups} />
                <div className="bg-primary dark:bg-primary-dark rounded-lg border border-light dark:border-dark p-4">
                    <h3 className="text-lg font-semibold mb-3">Explore locations</h3>
                    <div className="max-h-[24rem] overflow-auto pr-1">
                        <ul className="space-y-2">
                            {groups.map((group) => {
                                const isActive = selectedLocation?.key === group.key
                                return (
                                    <li key={`list-${group.key}`}>
                                        <button
                                            onClick={() => setSelectedKey(group.key)}
                                            className={clsx(
                                                'w-full text-left border rounded-lg px-4 py-3 transition-colors',
                                                isActive
                                                    ? 'bg-accent/60 border-primary dark:border-primary-dark'
                                                    : 'border-light dark:border-dark hover:bg-accent/40'
                                            )}
                                        >
                                            <div className="flex items-center justify-between gap-4">
                                                <div>
                                                    <p className="font-semibold text-base">{group.locationName}</p>
                                                    <p className="text-sm text-secondary">
                                                        {group.members.length}{' '}
                                                        {group.members.length === 1 ? 'person' : 'people'}
                                                    </p>
                                                </div>
                                                <div className="flex items-center -space-x-2">
                                                    {group.members.slice(0, 4).map((member) => {
                                                        const name = [member.firstName, member.lastName]
                                                            .filter(Boolean)
                                                            .join(' ')
                                                        return member.avatar?.url ? (
                                                            <CloudinaryImage
                                                                key={`avatar-${group.key}-${member.id}`}
                                                                alt={name}
                                                                src={member.avatar.url}
                                                                className="size-9 rounded-full border-2 border-white shadow-sm"
                                                                imgClassName="w-full h-full object-cover rounded-full"
                                                                width={72}
                                                            />
                                                        ) : (
                                                            <span
                                                                key={`avatar-${group.key}-${member.id}`}
                                                                className="size-9 rounded-full border-2 border-white shadow-sm bg-accent flex items-center justify-center text-sm font-semibold"
                                                            >
                                                                {member.firstName?.[0]}
                                                                {member.lastName?.[0]}
                                                            </span>
                                                        )
                                                    })}
                                                    {group.members.length > 4 && (
                                                        <span className="size-9 rounded-full bg-accent text-sm font-semibold border-2 border-white flex items-center justify-center">
                                                            +{group.members.length - 4}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                {selectedLocation && <MemberList location={selectedLocation} />}
            </div>
        </div>
    )
}

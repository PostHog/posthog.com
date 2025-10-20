import { IconPlus } from '@posthog/icons'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import Tooltip from 'components/RadixUI/Tooltip'
import ReaderView from 'components/ReaderView'
import { SEO } from 'components/seo'
import TeamPatch from 'components/TeamPatch'
import { TreeMenu } from 'components/TreeMenu'
import { graphql, useStaticQuery } from 'gatsby'
import { useUser } from 'hooks/useUser'
import React, { useEffect, useMemo, useState } from 'react'

const TeamsPage = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const { isModerator } = useUser()

    const { allTeams } = useStaticQuery(graphql`
        {
            allTeams: allSqueakTeam(filter: { name: { ne: "Hedgehogs" }, crest: { publicId: { ne: null } } }) {
                nodes {
                    id
                    name
                    slug
                    createdAt
                    tagline
                    description
                    profiles {
                        data {
                            id
                            attributes {
                                color
                                firstName
                                lastName
                                avatar {
                                    data {
                                        attributes {
                                            url
                                        }
                                    }
                                }
                            }
                        }
                    }
                    leadProfiles {
                        data {
                            id
                        }
                    }
                    crest {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    crestOptions {
                        textColor
                        textShadow
                        fontSize
                        frame
                        frameColor
                        plaque
                        plaqueColor
                        imageScale
                        imageXOffset
                        imageYOffset
                    }
                }
            }
        }
    `)

    // Create teams navigation for sidebar
    const teamsNavigation = useMemo(() => {
        return [
            {
                name: 'Teams',
            },
            ...allTeams.nodes
                .sort((a: any, b: any) => a.name.localeCompare(b.name))
                .map((team: any) => ({
                    name: team.name,
                    url: `/teams/${team.slug}`,
                })),
        ]
    }, [allTeams.nodes])

    // Filter teams based on search term
    const filteredTeams = useMemo(() => {
        if (!searchTerm.trim()) {
            return allTeams.nodes
        }

        const searchLower = searchTerm.toLowerCase()

        return allTeams.nodes.filter((team: any) => {
            // Search in team name
            if (team.name?.toLowerCase().includes(searchLower)) {
                return true
            }

            // Search in team slug
            if (team.slug?.toLowerCase().includes(searchLower)) {
                return true
            }

            // Search in team member names
            const memberMatch = team.profiles?.data?.some((profile: any) => {
                const firstName = profile.attributes?.firstName?.toLowerCase() || ''
                const lastName = profile.attributes?.lastName?.toLowerCase() || ''
                const fullName = `${firstName} ${lastName}`.trim()

                return (
                    firstName.includes(searchLower) || lastName.includes(searchLower) || fullName.includes(searchLower)
                )
            })

            return memberMatch
        })
    }, [allTeams.nodes, searchTerm])

    // Reset selection when search results change
    useEffect(() => {
        setSelectedIndex(0)
    }, [filteredTeams.length])

    // Function to highlight matching text in team names
    const highlightText = (text: string, searchTerm: string) => {
        if (!searchTerm.trim()) return text

        const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
        const parts = text.split(regex)

        return parts.map((part, index) =>
            regex.test(part) ? (
                <span key={index} className="bg-yellow/30 dark:bg-yellow/20 px-0.5 -mx-0.5 rounded">
                    {part}
                </span>
            ) : (
                part
            )
        )
    }

    // Function to check if a team member matches the search
    const isTeamMemberMatch = (profile: any, searchTerm: string) => {
        if (!searchTerm.trim()) return false

        const searchLower = searchTerm.toLowerCase()
        const firstName = profile.attributes?.firstName?.toLowerCase() || ''
        const lastName = profile.attributes?.lastName?.toLowerCase() || ''
        const fullName = `${firstName} ${lastName}`.trim()

        return firstName.includes(searchLower) || lastName.includes(searchLower) || fullName.includes(searchLower)
    }

    // Create New team button for header
    const newTeamButton = isModerator ? (
        <span>
            <Tooltip trigger={<OSButton asLink to="/teams/new" size="md" icon={<IconPlus />} />}>
                New small team
            </Tooltip>
        </span>
    ) : null

    return (
        <>
            <SEO
                title="Teams – PostHog"
                description="PostHog teams and their missions"
                image={`/images/og/teams.jpg`}
            />
            <ReaderView
                title="Small teams"
                hideTitle={false}
                leftSidebar={<TreeMenu items={teamsNavigation} />}
                homeURL="/teams"
                description="PostHog teams and their missions"
                proseSize="base"
                onSearch={(query) => setSearchTerm(query)}
                rightActionButtons={newTeamButton}
            >
                <div className="@container">
                    <p className="mt-0">
                        We've organized the company into small teams that are multi-disciplinary and as self-sufficient
                        as possible.{' '}
                        <Link to="/handbook/company/small-teams" state={{ newWindow: true }}>
                            Learn how small teams work.
                        </Link>{' '}
                    </p>

                    <div className="not-prose grid grid-cols-2 @lg/reader-content-container:grid-cols-2 @2xl/reader-content-container:grid-cols-3 @4xl/reader-content-container:grid-cols-4 @5xl/reader-content-container:grid-cols-5 @6xl/reader-content-container:grid-cols-6 gap-4 mb-8">
                        {filteredTeams
                            .sort((a: any, b: any) => a.name.localeCompare(b.name))
                            .map(
                                (
                                    {
                                        id,
                                        name,
                                        slug,
                                        createdAt,
                                        tagline,
                                        description,
                                        profiles,
                                        crest,
                                        crestOptions,
                                        leadProfiles,
                                    }: any,
                                    index: number
                                ) => {
                                    // Check if any team member matches the search
                                    const hasMatchingMember =
                                        searchTerm &&
                                        profiles?.data?.some((profile: any) => isTeamMemberMatch(profile, searchTerm))

                                    return (
                                        <Link
                                            to={`/teams/${slug}`}
                                            key={id}
                                            className="group relative mb-6 hover:scale-[1.01] active:scale-[1] hover:top-[-.5px] active:top-px"
                                        >
                                            <div className="">
                                                <TeamPatch
                                                    name={name}
                                                    imageUrl={crest?.data?.attributes?.url}
                                                    {...crestOptions}
                                                    className="w-full"
                                                />
                                            </div>

                                            <div className="relative bottom-4 left-0 right-0 justify-center -mr-3 transform transition-all duration-100">
                                                <div className="flex flex-wrap justify-center" dir="rtl">
                                                    {profiles.data.length > 6 && (
                                                        <span
                                                            className={`${
                                                                hasMatchingMember
                                                                    ? 'visible'
                                                                    : 'invisible group-hover:visible'
                                                            } cursor-default -ml-3 relative hover:z-10 rounded-full border-1 border-accent dark:border-accent-dark ${
                                                                hasMatchingMember
                                                                    ? ''
                                                                    : 'animate-jump-out transform scale-[0%] group-hover:animate-jump-in group-hover:animate-once group-hover:animate-duration-500'
                                                            } group-hover:animate-delay-[${5 * 100}ms]`}
                                                        >
                                                            <Tooltip
                                                                trigger={
                                                                    <div className="size-10 rounded-full bg-accent dark:bg-accent-dark border border-light dark:border-dark flex items-center justify-center text-sm font-semibold transform scale-100 hover:scale-125 transition-all">
                                                                        {profiles.data.length - 5}+
                                                                    </div>
                                                                }
                                                                side="bottom"
                                                            >
                                                                {profiles.data.length - 5} more
                                                            </Tooltip>
                                                        </span>
                                                    )}
                                                    {profiles.data
                                                        .slice()
                                                        .sort((a: any, b: any) => {
                                                            const aIsLead = leadProfiles.data.some(
                                                                ({ id: leadID }: { id: string }) => leadID === a.id
                                                            )
                                                            const bIsLead = leadProfiles.data.some(
                                                                ({ id: leadID }: { id: string }) => leadID === b.id
                                                            )
                                                            return aIsLead === bIsLead ? 0 : aIsLead ? -1 : 1
                                                        })
                                                        .slice(0, profiles.data.length > 6 ? 5 : undefined)
                                                        .reverse()
                                                        .map(
                                                            (
                                                                {
                                                                    id,
                                                                    attributes: { firstName, lastName, avatar, color },
                                                                },
                                                                index: number
                                                            ) => {
                                                                const name = [firstName, lastName]
                                                                    .filter(Boolean)
                                                                    .join(' ')
                                                                const isTeamLead = leadProfiles.data.some(
                                                                    ({ id: leadID }: { id: string }) => leadID === id
                                                                )
                                                                const isMatchingMember = isTeamMemberMatch(
                                                                    { attributes: { firstName, lastName } },
                                                                    searchTerm
                                                                )
                                                                return (
                                                                    <span
                                                                        key={`${name}-${index}`}
                                                                        className={`${
                                                                            hasMatchingMember
                                                                                ? 'visible'
                                                                                : 'invisible group-hover:visible'
                                                                        } cursor-default -ml-3 relative hover:z-10 rounded-full border-1 ${
                                                                            isMatchingMember
                                                                                ? 'border-red dark:border-yellow shadow-lg shadow-red/50 z-10'
                                                                                : 'border-accent dark:border-accent-dark'
                                                                        } ${
                                                                            hasMatchingMember
                                                                                ? ''
                                                                                : 'animate-jump-out transform scale-[0%] group-hover:animate-jump-in group-hover:animate-once group-hover:animate-duration-500'
                                                                        } group-hover:animate-delay-[${
                                                                            (Math.min(
                                                                                profiles.data.length > 6
                                                                                    ? 5
                                                                                    : profiles.data.length,
                                                                                6
                                                                            ) -
                                                                                index -
                                                                                1) *
                                                                            100
                                                                        }ms]`}
                                                                    >
                                                                        <Tooltip
                                                                            trigger={
                                                                                <img
                                                                                    src={avatar?.data?.attributes?.url}
                                                                                    className={`size-10 rounded-full bg-${
                                                                                        color ??
                                                                                        'accent dark:bg-accent-dark'
                                                                                    } border ${
                                                                                        isMatchingMember
                                                                                            ? 'border-red dark:border-yellow'
                                                                                            : 'border-light dark:border-dark'
                                                                                    } transform ${
                                                                                        isMatchingMember
                                                                                            ? 'scale-125'
                                                                                            : 'scale-100'
                                                                                    } hover:scale-125 transition-all`}
                                                                                    alt={name}
                                                                                />
                                                                            }
                                                                            side="bottom"
                                                                            delay={0}
                                                                        >
                                                                            {name} {isTeamLead ? '(Team lead)' : ''}
                                                                        </Tooltip>
                                                                    </span>
                                                                )
                                                            }
                                                        )}
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                }
                            )}
                    </div>

                    {filteredTeams.length === 0 && searchTerm && (
                        <div className="text-center py-12">
                            <p className="text-lg text-secondary">No teams found matching "{searchTerm}"</p>
                            <button onClick={() => setSearchTerm('')} className="mt-4 text-blue hover:underline">
                                Clear search
                            </button>
                        </div>
                    )}
                </div>
            </ReaderView>
        </>
    )
}

export default TeamsPage

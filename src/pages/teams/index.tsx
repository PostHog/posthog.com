import React, { useState, useMemo, useEffect } from 'react'
import { SEO } from 'components/seo'
import Link from 'components/Link'
import { graphql, useStaticQuery } from 'gatsby'
import TeamPatch from 'components/TeamPatch'
import { useUser } from 'hooks/useUser'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import Tooltip from "components/RadixUI/Tooltip"
import { IconPlus, IconX } from '@posthog/icons'
import OSButton from 'components/OSButton'

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
                }))
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
            <Tooltip trigger={<OSButton
                asLink
                to="/teams/new"
                size="md"
                icon={<IconPlus />}
            />}
            >
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

                    <div className="relative mb-6 mt-8">
                        {searchTerm && (
                            <>
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary hover:text-primary transition-colors"
                                    aria-label="Clear search"
                                >
                                    <IconX className="w-4 h-4" />
                                </button>
                                {/* 
                                this doesn't work anymore now that we use <ReaderView /> search
                                    <p className="text-sm text-secondary mt-2 mb-4">
                                        Use <KeyboardShortcut text="↑" size="sm" /> /{' '}
                                        <KeyboardShortcut text="↓" size="sm" /> to navigate between results
                                    </p>

                                     */}
                            </>
                        )}
                    </div>

                    <div className="not-prose grid @xl:grid-cols-2 @7xl:grid-cols-3 gap-4">
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
                                ) => (
                                    <Link
                                        to={`/teams/${slug}`}
                                        key={id}
                                        className={`group relative mb-6 hover:scale-[1.01] active:scale-[1] hover:top-[-.5px] active:top-px flex ${searchTerm && index === selectedIndex
                                            ? 'ring-2 ring-blue rounded bg-light dark:bg-dark'
                                            : ''
                                            }`}
                                    >
                                        <div className="w-48">
                                            <TeamPatch
                                                name={name}
                                                imageUrl={crest?.data?.attributes?.url}
                                                {...crestOptions}
                                                className="w-full"
                                                fontSize="xl"
                                            />
                                        </div>

                                        <div className="flex-1 pt-8">
                                            <h3 className="mb-1">{highlightText(name, searchTerm)}</h3>

                                            {(tagline || description) && (
                                                <p className="text-sm opacity-80 mb-1 line-clamp-3">
                                                    {tagline || description}
                                                </p>
                                            )}

                                            {createdAt && (
                                                <p className="text-sm text-secondary opacity-70 mb-2">
                                                    Est.{' '}
                                                    {new Date(createdAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                </p>
                                            )}

                                            <div className="flex flex-wrap justify-end pl-3" dir="rtl">
                                                {profiles.data.length > 6 && (
                                                    <span
                                                        className={`cursor-default -ml-3 relative hover:z-10 rounded-full border-1 border-accent`}
                                                    >
                                                        <Tooltip
                                                            trigger={
                                                                <div className="size-10 rounded-full bg-accent border border-primary flex items-center justify-center text-sm font-semibold transform scale-100 hover:scale-125 transition-all">
                                                                    {profiles.data.length - 5}+
                                                                </div>
                                                            }
                                                        >
                                                            {`${profiles.data.length - 5} more`}
                                                        </Tooltip>
                                                    </span>
                                                )}
                                                {profiles.data
                                                    .slice()
                                                    .sort((a: any, b: any) => {
                                                        const aIsLead = leadProfiles?.data?.some(
                                                            (lead: any) => lead.id === a.id
                                                        )
                                                        const bIsLead = leadProfiles?.data?.some(
                                                            (lead: any) => lead.id === b.id
                                                        )
                                                        if (aIsLead && !bIsLead) return -1
                                                        if (bIsLead && !aIsLead) return 1
                                                        return 0
                                                    })
                                                    .slice(0, 6)
                                                    .map((profile: any) => {
                                                        const isLead = leadProfiles?.data?.some(
                                                            (lead: any) => lead.id === profile.id
                                                        )
                                                        const isMatch = isTeamMemberMatch(profile, searchTerm)
                                                        const { firstName, lastName, avatar, color } =
                                                            profile.attributes
                                                        const name = `${firstName} ${lastName}`
                                                        return (
                                                            <span
                                                                key={profile.id}
                                                                className={`cursor-default -ml-3 relative hover:z-10 rounded-full border-1 ${isMatch
                                                                    ? 'border-red dark:border-yellow shadow-lg shadow-red/50 z-10'
                                                                    : 'border-accent'
                                                                    }`}
                                                            >
                                                                <Tooltip trigger={
                                                                    <img
                                                                        src={avatar?.data?.attributes?.url}
                                                                        className={`size-10 rounded-full bg-${color ??
                                                                            'accent dark:bg-accent-dark'
                                                                            } border transform ${isMatch
                                                                                ? 'scale-125 border-red dark:border-yellow'
                                                                                : 'scale-100 border-primary'
                                                                            } hover:scale-125 transition-all`}
                                                                        alt={name}
                                                                    />
                                                                }
                                                                    delay={0}
                                                                    side="bottom"
                                                                >
                                                                    {`${name}${isLead ? ' (Team lead)' : ''}`}
                                                                </Tooltip>
                                                            </span>
                                                        )
                                                    })}
                                            </div>
                                        </div>
                                    </Link>
                                )
                            )}
                    </div>

                    {filteredTeams.length === 0 && searchTerm && (
                        <div className="text-center py-12">
                            <p className="text-lg text-secondary">
                                No teams found matching "{searchTerm}"
                            </p>
                            <button
                                onClick={() => setSearchTerm('')}
                                className="mt-4 text-blue hover:underline"
                            >
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
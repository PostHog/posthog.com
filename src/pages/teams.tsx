import React, { useState, useMemo, useRef, useEffect } from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import Tooltip from 'components/Tooltip'
import { graphql, navigate, useStaticQuery } from 'gatsby'
import slugify from 'slugify'
import TeamPatch from 'components/TeamPatch'
import { CallToAction } from 'components/CallToAction'
import { useUser } from 'hooks/useUser'
import HeaderBar from 'components/OSChrome/HeaderBar'
import { Select } from 'components/RadixUI/Select'
import { productMenu, companyMenu } from '../navs'
import { useNavigate, useLocation } from '@gatsbyjs/reach-router'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import { IconX } from '@posthog/icons'
import KeyboardShortcut from 'components/KeyboardShortcut'
import { useWindow } from '../context/Window'

const Teams: React.FC = () => {
    const { appWindow } = useWindow()
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

    useEffect(() => {
        if (appWindow?.ref?.current) {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    setSearchTerm('')
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault()
                    setSelectedIndex((prev) => (prev < filteredTeams.length - 1 ? prev + 1 : prev))
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault()
                    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
                } else if (e.key === 'Enter' && filteredTeams[selectedIndex]) {
                    e.preventDefault()
                    navigate(`/teams/${filteredTeams[selectedIndex].slug}`)
                }
            }

            appWindow.ref?.current?.addEventListener('keydown', handleKeyDown)

            return () => {
                appWindow.ref?.current?.removeEventListener('keydown', handleKeyDown)
            }
        }
    }, [appWindow?.ref, filteredTeams, selectedIndex])

    return (
        <ReaderView
            onSearch={(searchTerm) => setSearchTerm(searchTerm)}
            leftSidebar={<TreeMenu items={companyMenu.children.map((child) => ({ ...child, children: [] }))} />}
        >
            <SEO
                title="Teams - PostHog"
                description="We're organized into multi-disciplinary small teams."
                image={`/images/small-teams.png`}
            />
            <section data-scheme="primary" className="bg-primary">
                {/* <DebugContainerQuery /> */}
                <div className="flex flex-col md:items-center md:justify-end md:flex-row-reverse gap-8 md:gap-2">
                    <div className="md:flex-1">
                        <h1>Small teams</h1>
                        <p>
                            We've organized the company into{' '}
                            <Link
                                to="/handbook/company/small-teams"
                                state={{ newWindow: true }}
                                className="font-semibold underline"
                            >
                                small teams
                            </Link>{' '}
                            that are multi-disciplinary and as self-sufficient as possible.
                        </p>

                        <div className="relative mb-6">
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary hover:text-primary transition-colors"
                                    aria-label="Clear search"
                                >
                                    <IconX className="w-4 h-4" />
                                </button>
                            )}
                            {searchTerm && (
                                <p className="text-sm text-secondary mt-2 mb-4">
                                    Use <KeyboardShortcut text="↑" size="sm" /> /{' '}
                                    <KeyboardShortcut text="↓" size="sm" /> to navigate between results
                                </p>
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
                                            className={`group relative mb-6 hover:scale-[1.01] active:scale-[1] hover:top-[-.5px] active:top-px flex ${
                                                searchTerm && index === selectedIndex
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
                                                                content={`${profiles.data.length - 5} more`}
                                                                placement="bottom"
                                                            >
                                                                <div className="size-10 rounded-full bg-accent border border-primary flex items-center justify-center text-sm font-semibold transform scale-100 hover:scale-125 transition-all">
                                                                    {profiles.data.length - 5}+
                                                                </div>
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
                                                                }: any,
                                                                index: number
                                                            ) => {
                                                                const name = [firstName, lastName]
                                                                    .filter(Boolean)
                                                                    .join(' ')
                                                                const isTeamLead = leadProfiles.data.some(
                                                                    ({ id: leadID }: { id: string }) => leadID === id
                                                                )
                                                                const isMatchingMember = isTeamMemberMatch(
                                                                    {
                                                                        attributes: {
                                                                            firstName,
                                                                            lastName,
                                                                            avatar,
                                                                            color,
                                                                        },
                                                                    },
                                                                    searchTerm
                                                                )

                                                                return (
                                                                    <span
                                                                        key={`${name}-${index}`}
                                                                        className={`cursor-default -ml-3 relative hover:z-10 rounded-full border-1 ${
                                                                            isMatchingMember
                                                                                ? 'border-red dark:border-yellow shadow-lg shadow-red/50 z-10'
                                                                                : 'border-accent'
                                                                        }`}
                                                                    >
                                                                        <Tooltip
                                                                            content={`${name} ${
                                                                                isTeamLead ? '(Team lead)' : ''
                                                                            }`}
                                                                            placement="bottom"
                                                                        >
                                                                            <img
                                                                                src={avatar?.data?.attributes?.url}
                                                                                className={`size-10 rounded-full bg-${
                                                                                    color ??
                                                                                    'accent dark:bg-accent-dark'
                                                                                } border transform ${
                                                                                    isMatchingMember
                                                                                        ? 'scale-125 border-red dark:border-yellow'
                                                                                        : 'scale-100 border-primary'
                                                                                } hover:scale-125 transition-all`}
                                                                                alt={name}
                                                                            />
                                                                        </Tooltip>
                                                                    </span>
                                                                )
                                                            }
                                                        )}
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                )}
                            {isModerator && (
                                <div className="flex justify-center items-center">
                                    <CallToAction to="/teams/new" size="md">
                                        New team
                                    </CallToAction>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </ReaderView>
    )
}

export default Teams

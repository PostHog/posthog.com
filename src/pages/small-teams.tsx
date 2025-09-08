import React, { useState, useMemo } from 'react'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
import SEO from 'components/seo'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'
import Link from 'components/Link'
import { graphql, useStaticQuery } from 'gatsby'
import TeamPatch from 'components/TeamPatch'
import { useUser } from 'hooks/useUser'
import OSButton from 'components/OSButton'
import OSTable from 'components/OSTable'

const SmallTeamsPage = () => {
    const [searchTerm, setSearchTerm] = useState('')
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
                    leadProfiles {
                        data {
                            id
                        }
                    }
                    profiles {
                        data {
                            id
                            attributes {
                                firstName
                                lastName
                                color
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
                    crest {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    miniCrest {
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

    // Filter teams based on search term (team names only)
    const filteredTeams = useMemo(() => {
        if (!searchTerm.trim()) {
            return allTeams.nodes
        }

        const searchLower = searchTerm.toLowerCase()
        return allTeams.nodes.filter((team: any) => {
            return team.name?.toLowerCase().includes(searchLower)
        })
    }, [allTeams.nodes, searchTerm])

    // Sort teams by name
    const sortedTeams = useMemo(() => {
        return [...filteredTeams].sort((a: any, b: any) => a.name.localeCompare(b.name))
    }, [filteredTeams])

    // Create table columns
    const tableColumns = [
        {
            name: '#',
            align: 'center' as const,
            width: '60px',
        },
        {
            name: 'Team',
            align: 'left' as const,
            width: 'minmax(300px, 1fr)',
        },
        {
            name: 'Description',
            align: 'left' as const,
            width: '300px',
        },
        {
            name: 'Team lead',
            align: 'left' as const,
            width: '200px',
        },
    ]

    // Create table rows
    const tableRows = sortedTeams.map((team: any, index: number) => {
        // Find the lead profile by matching IDs
        const leadId = team.leadProfiles?.data?.[0]?.id
        const leadProfile = leadId ? team.profiles?.data?.find((profile: any) => profile.id === leadId) : null
        const leadName = leadProfile
            ? `${leadProfile.attributes?.firstName || ''} ${leadProfile.attributes?.lastName || ''}`.trim()
            : 'No lead'
        const leadAvatar = leadProfile?.attributes?.avatar?.data?.attributes?.url
        const leadColor = leadProfile?.attributes?.color

        return {
            key: team.id,
            cells: [
                {
                    content: <span className="text-muted">{index + 1}</span>,
                },
                {
                    content: (
                        <Link
                            to={`/teams/${team.slug}`}
                            state={{ newWindow: true }}
                            className="flex items-center gap-3 !no-underline !font-normal"
                        >
                            <div className="w-10 h-10 flex-shrink-0">
                                <img
                                    src={team.miniCrest?.data?.attributes?.url || team.crest?.data?.attributes?.url}
                                    alt={team.name}
                                    className="w-full h-full"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="!font-semibold !underline">{team.name}</span>
                                {team.createdAt && (
                                    <span className="text-xs text-secondary">
                                        Est.{' '}
                                        {new Date(team.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </span>
                                )}
                            </div>
                        </Link>
                    ),
                },
                {
                    content: team.tagline ? (
                        <span className="text-sm text-secondary line-clamp-2">{team.tagline}</span>
                    ) : (
                        <span className="text-sm text-muted">—</span>
                    ),
                },
                {
                    content: leadProfile ? (
                        <Link
                            to={`/community/profiles/${leadProfile.id}`}
                            className="flex items-center gap-2"
                            state={{ newWindow: true }}
                        >
                            {leadAvatar ? (
                                <img
                                    src={leadAvatar}
                                    alt={leadName}
                                    className={`size-8 rounded-full border border-primary object-cover bg-${
                                        leadColor ?? 'accent dark:bg-accent-dark'
                                    }`}
                                />
                            ) : (
                                <div
                                    className={`size-8 rounded-full border border-primary flex items-center justify-center text-xs font-bold bg-${
                                        leadColor ?? 'accent dark:bg-accent-dark'
                                    }`}
                                >
                                    {leadProfile.attributes?.firstName?.[0]}
                                    {leadProfile.attributes?.lastName?.[0]}
                                </div>
                            )}
                            <span className="text-sm">{leadName}</span>
                        </Link>
                    ) : (
                        <span className="text-sm text-muted">—</span>
                    ),
                },
            ],
        }
    })

    const { handleTabChange, tabs, tabContainerClassName, className } = useCompanyNavigation({
        value: '/small-teams',
        content: (
            <div className="max-w-screen-lg mx-auto mt-6 px-4">
                <section data-scheme="primary" className="bg-primary">
                    <div className="mb-8">
                        <h1>Small teams</h1>
                        <p className="mt-0">
                            We've organized the company into small teams that are multi-disciplinary and as
                            self-sufficient as possible.
                        </p>
                        <div className="flex gap-2">
                            <OSButton asLink to="/teams" variant="primary" size="md" state={{ newWindow: true }}>
                                Explore our teams ({allTeams.nodes.length})
                            </OSButton>
                            <OSButton
                                asLink
                                to="/handbook/company/small-teams"
                                variant="secondary"
                                size="md"
                                state={{ newWindow: true }}
                            >
                                Learn about small teams
                            </OSButton>
                        </div>
                    </div>

                    <div className="mt-8">
                        <OSTable
                            columns={tableColumns}
                            rows={tableRows}
                            className="bg-primary"
                            size="md"
                            rowAlignment="center"
                        />
                    </div>

                    {filteredTeams.length === 0 && searchTerm && (
                        <div className="text-center py-12">
                            <p className="text-lg text-secondary">No teams found matching "{searchTerm}"</p>
                            <button onClick={() => setSearchTerm('')} className="mt-4 text-blue hover:underline">
                                Clear search
                            </button>
                        </div>
                    )}
                </section>
            </div>
        ),
    })

    return (
        <>
            <SEO
                title="Small teams – PostHog"
                description="PostHog teams and their missions"
                image={`/images/og/teams.jpg`}
            />
            <Editor
                type="teams"
                maxWidth="100%"
                proseSize="base"
                onSearchChange={(query) => setSearchTerm(query)}
                bookmark={{
                    title: 'Small teams',
                    description: 'PostHog teams and their missions',
                }}
            >
                <OSTabs
                    tabs={tabs}
                    defaultValue="/small-teams"
                    onValueChange={handleTabChange}
                    frame={false}
                    tabContainerClassName={tabContainerClassName}
                    className={className}
                    triggerDataScheme="primary"
                    centerTabs
                />
            </Editor>
        </>
    )
}

export default SmallTeamsPage

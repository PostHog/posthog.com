import Team from 'components/Team'
import React, { useState, useRef, useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { useUser } from 'hooks/useUser'
import { IconPencil } from '@posthog/icons'
import OSButton from 'components/OSButton'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'

type TeamPageProps = {
    params: {
        slug: string
    }
}

export default function TeamPage(props: TeamPageProps) {
    const { slug } = props?.params || {}
    const [editing, setEditing] = useState(false)
    const [saving, setSaving] = useState(false)
    const { user } = useUser()
    const isModerator = user?.role?.type === 'moderator'
    const onSaveRef = useRef<(() => void) | null>(null)

    const data = useStaticQuery(graphql`
        {
            allTeams: allMdx(filter: { fields: { slug: { regex: "/^/teams/[^/]+$/" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    body
                }
            }
            allObjectives: allMdx(filter: { fields: { slug: { regex: "/^/teams/[^/]+/objectives$/" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    body
                }
            }
            allSqueakTeam {
                nodes {
                    id
                    name
                    slug
                    emojis {
                        name
                        localFile {
                            publicURL
                        }
                    }
                    roadmaps {
                        squeakId
                        betaAvailable
                        complete
                        dateCompleted
                        title
                        description
                        media {
                            gatsbyImageData
                            publicId
                            data {
                                attributes {
                                    mime
                                }
                            }
                        }
                        githubPages {
                            title
                            html_url
                            number
                            closed_at
                            reactions {
                                hooray
                                heart
                                eyes
                                plus1
                            }
                        }
                        projectedCompletion
                        cta {
                            label
                            url
                        }
                    }
                }
            }
        }
    `)
    
    const body = data?.allTeams?.nodes?.find((node: any) => node?.fields?.slug === `/teams/${slug}`)?.body
    const objectives = data?.allObjectives?.nodes?.find(
        (node: any) => node?.fields?.slug === `/teams/${slug}/objectives`
    )?.body
    const team = data?.allSqueakTeam?.nodes?.find((node: any) => node?.slug === slug)
    
    // Create teams navigation for sidebar
    const teamsNavigation = useMemo(() => {
        const teams = data?.allSqueakTeam?.nodes || []
        return [
            {
                name: 'Teams',
            },
            {
                name: 'All teams',
                url: '/teams',
                icon: 'IconPeople',
            },
            ...teams
                .filter((t: any) => t.name)
                .sort((a: any, b: any) => a.name.localeCompare(b.name))
                .map((t: any) => ({
                    name: t.name,
                    url: `/teams/${t.slug}`,
                    active: t.slug === slug,
                }))
        ]
    }, [data?.allSqueakTeam?.nodes, slug])

    const handleSave = async () => {
        // Call the save function from Team component
        if (onSaveRef.current) {
            onSaveRef.current()
        }
    }

    const handleCancel = () => {
        // The Team component will handle the actual cancel logic
        setEditing(false)
    }

    const editButton = isModerator ? (
        <>{!editing && <OSButton size="md" icon={<IconPencil />} onClick={() => setEditing(true)} />}</>
    ) : null

    const editActions =
        editing && isModerator ? (
            <>
                <OSButton size="md" variant="secondary" onClick={handleCancel}>
                    Cancel
                </OSButton>
                <OSButton size="md" variant="primary" onClick={handleSave} disabled={saving}>
                    Save
                </OSButton>
            </>
        ) : null

    return (
        <>
            <SEO
                title={`${team?.name || slug} Team – PostHog`}
                description={`Learn about the ${team?.name || slug} team at PostHog`}
                image={`/images/og/teams.jpg`}
            />
            <ReaderView
                title={`${team?.name || slug} Team`}
                hideTitle={true}
                leftSidebar={<TreeMenu items={teamsNavigation} />}
                homeURL="/teams"
                description={`Learn about the ${team?.name || slug} team at PostHog`}
                proseSize="base"
                rightActionButtons={editing ? editActions : editButton}
            >
                <div className="max-w-screen-lg mx-auto px-4">
                    <Team
                        emojis={team?.emojis}
                        roadmaps={team?.roadmaps}
                        objectives={objectives}
                        body={body}
                        slug={slug?.split('/').pop() || ''}
                        editing={editing}
                        setEditing={setEditing}
                        saving={saving}
                        setSaving={setSaving}
                        onSaveRef={onSaveRef}
                    />
                </div>
            </ReaderView>
        </>
    )
}
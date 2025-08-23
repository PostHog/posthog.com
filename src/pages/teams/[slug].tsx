import Team from 'components/Team'
import React, { useState, useRef } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { useUser } from 'hooks/useUser'
import { IconPencil } from '@posthog/icons'
import OSButton from 'components/OSButton'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
import SEO from 'components/seo'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'

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

    // These variables are defined but not used in this component
    // const navigate = useNavigate()
    // const location = useLocation()
    // const currentPath = location.pathname.replace('/', '')

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

    const { handleTabChange, tabs, tabContainerClassName, className } = useCompanyNavigation({
        value: '/teams',
        content: (
            <div className="max-w-screen-lg mx-auto mt-6 px-4">
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
        ),
    })

    return (
        <>
            <SEO
                title={`Team ${slug} – PostHog`}
                description={`Learn about the ${slug} team at PostHog`}
                image={`/images/og/teams.jpg`}
            />
            <Editor
                maxWidth="full"
                type="teams"
                proseSize="base"
                bookmark={{
                    title: `Team ${slug}`,
                    description: `${slug} team at PostHog`,
                }}
            >
                <div className="absolute right-4 top-2 flex gap-2">{editing ? editActions : editButton}</div>
                <OSTabs
                    tabs={tabs}
                    defaultValue="/teams"
                    onValueChange={handleTabChange}
                    frame={false}
                    tabContainerClassName={tabContainerClassName}
                    className={className}
                    triggerDataScheme="primary"
                />
            </Editor>
        </>
    )
}

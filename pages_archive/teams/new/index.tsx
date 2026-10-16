import Team from 'components/Team'
import React, { useState, useRef, useMemo } from 'react'
import { useUser } from 'hooks/useUser'
import OSButton from 'components/OSButton'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'
import { graphql, useStaticQuery } from 'gatsby'

type TeamPageProps = {
    params: {
        slug: string
    }
}

export default function NewTeam(props: TeamPageProps) {
    const [editing, setEditing] = useState(true)
    const [saving, setSaving] = useState(false)
    const { user } = useUser()
    const isModerator = user?.role?.type === 'moderator'
    const onSaveRef = useRef<(() => void) | null>(null)

    const data = useStaticQuery(graphql`
        {
            allSqueakTeam {
                nodes {
                    id
                    name
                    slug
                }
            }
        }
    `)

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
                }))
        ]
    }, [data?.allSqueakTeam?.nodes])

    const handleSave = async () => {
        // Call the save function from Team component
        if (onSaveRef.current) {
            onSaveRef.current()
        }
    }

    const editActions = isModerator ? (
        <>
            <OSButton size="md" variant="primary" onClick={handleSave} disabled={saving}>
                Save & publish
            </OSButton>
        </>
    ) : null

    return (
        <>
            <SEO title="New Team – PostHog" description="Create a new team at PostHog" image={`/images/og/teams.jpg`} />
            <ReaderView
                title="New Team"
                hideTitle={true}
                leftSidebar={<TreeMenu items={teamsNavigation} />}
                homeURL="/teams"
                description="Create a new team at PostHog"
                proseSize="base"
                rightActionButtons={editActions}
            >
                <div className="max-w-screen-lg mx-auto px-4">
                    <Team
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

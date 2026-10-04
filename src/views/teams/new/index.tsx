import Team from 'components/Team'
import React, { useState, useRef, useMemo } from 'react'
import { useUser } from 'hooks/useUser'
import OSButton from 'components/OSButton'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'
import teamsJson from '@data/people-teams.json'
import type { Teams } from '~/data-layer/queries/people'

const allTeams = teamsJson as Teams

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

    // Create teams navigation for sidebar
    const teamsNavigation = useMemo(() => {
        return [
            {
                name: 'Teams',
            },
            {
                name: 'All teams',
                url: '/teams',
                icon: 'IconPeople',
            },
            ...allTeams
                .filter((t) => t.name)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((t) => ({
                    name: t.name,
                    url: `/teams/${t.slug}`,
                })),
        ]
    }, [])

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
                proseSize="base"
                rightActionButtons={editActions}
                hideAppOptions
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

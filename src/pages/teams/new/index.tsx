import Team from 'components/Team'
import React, { useState, useRef } from 'react'
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

export default function NewTeam(props: TeamPageProps) {
    const [editing, setEditing] = useState(true)
    const [saving, setSaving] = useState(false)
    const { user } = useUser()
    const isModerator = user?.role?.type === 'moderator'
    const onSaveRef = useRef<(() => void) | null>(null)

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

    const editButton = isModerator ? (
        <>{!editing && <OSButton size="md" icon={<IconPencil />} onClick={() => setEditing(true)} />}</>
    ) : null

    const editActions =
        editing && isModerator ? (
            <>
                <OSButton size="md" variant="primary" onClick={handleSave} disabled={saving}>
                    Save & publish
                </OSButton>
            </>
        ) : null

    const { activeTab, handleTabChange, createTabs } = useCompanyNavigation()

    // Create tabs using the shared hook
    const tabs = createTabs((tabValue, item) => (
        <div className="w-full">
            {tabValue === 'teams' ? (
                <Team
                    editing={editing}
                    setEditing={setEditing}
                    saving={saving}
                    setSaving={setSaving}
                    onSaveRef={onSaveRef}
                />
            ) : (
                <div className="p-8 text-center text-muted">
                    <p>Loading {item.name} content...</p>
                </div>
            )}
        </div>
    ))

    return (
        <>
            <SEO title="New Team – PostHog" description="Create a new team at PostHog" image={`/images/og/teams.jpg`} />
            <Editor
                title="Company"
                type="teams"
                proseSize="base"
                bookmark={{
                    title: 'New Team',
                    description: 'Create a new team',
                }}
            >
                <div className="absolute right-4 top-2 flex gap-2">{editing ? editActions : editButton}</div>
                <OSTabs
                    tabs={tabs}
                    value={activeTab}
                    onValueChange={handleTabChange}
                    frame={false}
                    className="-mx-4 -mt-4"
                    triggerDataScheme="primary"
                />
            </Editor>
        </>
    )
}

import Team from 'components/Team'
import { companyMenu } from '../../../navs'
import React, { useState, useRef } from 'react'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import { useUser } from 'hooks/useUser'
import { IconPencil } from '@posthog/icons'
import OSButton from 'components/OSButton'

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

    return (
        <ReaderView
            leftSidebar={<TreeMenu items={companyMenu.children.map((child) => ({ ...child, children: [] }))} />}
            rightActionButtons={editing ? editActions : editButton}
            isEditing={editing}
        >
            <Team
                editing={editing}
                setEditing={setEditing}
                saving={saving}
                setSaving={setSaving}
                onSaveRef={onSaveRef}
            />
        </ReaderView>
    )
}

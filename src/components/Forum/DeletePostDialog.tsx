import React, { useState } from 'react'
import Modal from 'components/RadixUI/Modal'
import OSButton from 'components/OSButton'
import { useForumPost } from './hooks'
import { commentCount } from './PostRow'

// Confirms and deletes a post or draft. The server deletes every comment on it too.
export default function DeletePostDialog({
    postId,
    open,
    onOpenChange,
    onDeleted,
    draft = false,
    numComments = 0,
}: {
    postId: number
    open: boolean
    onOpenChange: (open: boolean) => void
    onDeleted: () => void
    draft?: boolean
    numComments?: number
}) {
    const { deletePost } = useForumPost()
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState('')
    const noun = draft ? 'draft' : 'post'

    const confirm = async () => {
        setDeleting(true)
        setError('')
        try {
            await deletePost(postId)
            onOpenChange(false)
            onDeleted()
        } catch (err) {
            setError((err as Error).message)
        }
        setDeleting(false)
    }

    return (
        <Modal open={open} onOpenChange={onOpenChange} title={`Delete ${noun}`} maxWidth={440}>
            <div className="bg-primary text-primary p-4 space-y-3 text-sm">
                <p className="m-0 text-secondary">
                    {numComments > 0
                        ? `This deletes the ${noun} and its ${commentCount(numComments)}, including other people's.`
                        : `This deletes the ${noun}.`}{' '}
                    You cannot undo this.
                </p>
                {error && <p className="m-0 text-red dark:text-yellow">{error}</p>}
                <div className="flex justify-end gap-2">
                    <OSButton size="md" onClick={() => onOpenChange(false)}>
                        Cancel
                    </OSButton>
                    <OSButton size="md" variant="primary" disabled={deleting} onClick={confirm}>
                        {deleting ? 'Deleting…' : `Delete ${noun}`}
                    </OSButton>
                </div>
            </div>
        </Modal>
    )
}

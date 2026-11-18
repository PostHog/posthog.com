import React, { useState } from 'react'
import { AlertDialog } from 'components/UI/AlertDialog'
import { Button } from 'components/UI/Button'

const deleteDelay = 1200

export default function AlertDialogDelete(): JSX.Element {
    const [open, setOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const deleteProject = () => {
        setDeleting(true)
        setTimeout(() => {
            setDeleting(false)
            setOpen(false)
        }, deleteDelay)
    }

    return (
        <AlertDialog.Root open={open} onOpenChange={(next) => !deleting && setOpen(next)}>
            <AlertDialog.Trigger render={<Button appearance="raised" />}>Delete project</AlertDialog.Trigger>
            <AlertDialog.Popup>
                <AlertDialog.Header>Delete project?</AlertDialog.Header>
                <AlertDialog.Body>
                    <AlertDialog.Description>
                        This deletes all events, insights, and recordings in Hogflix. You cannot undo this.
                    </AlertDialog.Description>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                    <AlertDialog.Close render={<Button />} disabled={deleting}>
                        Cancel
                    </AlertDialog.Close>
                    <Button appearance="raised" variant="danger" loading={deleting} onClick={deleteProject}>
                        Delete project
                    </Button>
                </AlertDialog.Footer>
            </AlertDialog.Popup>
        </AlertDialog.Root>
    )
}

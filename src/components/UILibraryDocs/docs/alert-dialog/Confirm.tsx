import React from 'react'
import { AlertDialog } from 'components/UI/AlertDialog'
import { Button } from 'components/UI/Button'

export default function AlertDialogConfirm(): JSX.Element {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger render={<Button />}>Discard draft</AlertDialog.Trigger>
            <AlertDialog.Popup>
                <AlertDialog.Header>Discard draft?</AlertDialog.Header>
                <AlertDialog.Body>
                    <AlertDialog.Description>
                        Your changes to this draft are lost. You cannot undo this.
                    </AlertDialog.Description>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                    <AlertDialog.Close render={<Button />}>Cancel</AlertDialog.Close>
                    <AlertDialog.Close render={<Button appearance="raised" variant="danger" />}>
                        Discard
                    </AlertDialog.Close>
                </AlertDialog.Footer>
            </AlertDialog.Popup>
        </AlertDialog.Root>
    )
}

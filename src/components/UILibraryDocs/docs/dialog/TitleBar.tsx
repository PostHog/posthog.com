import React from 'react'
import { Button } from 'components/UI/Button'
import { Dialog } from 'components/UI/Dialog'

export default function DialogTitleBar(): JSX.Element {
    return (
        <Dialog.Root>
            <Dialog.Trigger render={<Button appearance="raised" />}>Share insight</Dialog.Trigger>
            <Dialog.Popup>
                <Dialog.Header>Share insight</Dialog.Header>
                <Dialog.Body>
                    <Dialog.Description>
                        Anyone with the link can see this insight. They cannot change it.
                    </Dialog.Description>
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.Close render={<Button />}>Cancel</Dialog.Close>
                    <Dialog.Close render={<Button appearance="raised" variant="primary" />}>Copy link</Dialog.Close>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog.Root>
    )
}

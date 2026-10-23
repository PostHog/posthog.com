import React, { useState } from 'react'
import { Button } from 'components/UI/Button'
import { Dialog } from 'components/UI/Dialog'
import { Field } from 'components/UI/Field'

export default function DialogForm(): JSX.Element {
    const [open, setOpen] = useState(false)
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger render={<Button variant="secondary" />}>Invite a teammate</Dialog.Trigger>
            <Dialog.Popup className="max-w-md">
                <Dialog.Header>Invite a teammate</Dialog.Header>
                <form
                    className="contents"
                    onSubmit={(event) => {
                        event.preventDefault()
                        setOpen(false)
                    }}
                >
                    <Dialog.Body>
                        <Dialog.Description>They get access to every project in Hogflix.</Dialog.Description>
                        <Field.Root>
                            <Field.Label>Email</Field.Label>
                            <Field.Control type="email" required placeholder="max@hogflix.com" />
                        </Field.Root>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Dialog.Close render={<Button />}>Cancel</Dialog.Close>
                        <Button type="submit" variant="primary">
                            Send invite
                        </Button>
                    </Dialog.Footer>
                </form>
            </Dialog.Popup>
        </Dialog.Root>
    )
}

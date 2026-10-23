import React, { useState } from 'react'
import { Button } from 'components/UI/Button'
import { Field } from 'components/UI/Field'
import { Form } from 'components/UI/Form'

const takenUsernames = ['max', 'hoggy']

export default function ServerErrors(): JSX.Element {
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [claimedUsername, setClaimedUsername] = useState<string | null>(null)

    const claimUsername = (username: string) => {
        if (takenUsernames.includes(username.trim().toLowerCase())) {
            setErrors({ username: `Someone already has the username ${username}.` })
            setClaimedUsername(null)
            return
        }
        setErrors({})
        setClaimedUsername(username)
    }

    return (
        <Form className="max-w-xs" errors={errors} onFormSubmit={(values) => claimUsername(String(values.username))}>
            <Field.Root name="username">
                <Field.Label>Username</Field.Label>
                <Field.Control required defaultValue="max" />
                <Field.Description>The usernames max and hoggy are taken.</Field.Description>
                <Field.Error />
            </Field.Root>
            <div className="flex items-center gap-3">
                <Button type="submit" variant="primary">
                    Claim
                </Button>
                {claimedUsername && <span className="text-sm text-secondary">You are {claimedUsername}</span>}
            </div>
        </Form>
    )
}

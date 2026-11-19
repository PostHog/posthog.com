import React, { useState } from 'react'
import { Button } from 'components/UI/Button'
import { Field } from 'components/UI/Field'
import { Fieldset } from 'components/UI/Fieldset'
import { Form } from 'components/UI/Form'
import { Textarea } from 'components/UI/Textarea'

export default function ContactForm(): JSX.Element {
    const [sentFrom, setSentFrom] = useState<string | null>(null)

    return (
        <Form className="max-w-md" onFormSubmit={(values) => setSentFrom(String(values.email))}>
            <Fieldset.Root>
                <Fieldset.Legend>Contact sales</Fieldset.Legend>
                <Field.Root name="email">
                    <Field.Label>Work email</Field.Label>
                    <Field.Control type="email" required placeholder="max@posthog.com" />
                    <Field.Error />
                </Field.Root>
                <Field.Root name="message">
                    <Field.Label>Message</Field.Label>
                    <Textarea required autoExpand placeholder="What do you want to talk about?" />
                    <Field.Error />
                </Field.Root>
            </Fieldset.Root>
            <div className="flex items-center gap-3">
                <Button type="submit" appearance="raised" variant="primary">
                    Send
                </Button>
                {sentFrom && <span className="text-sm text-secondary">Sent from {sentFrom}</span>}
            </div>
        </Form>
    )
}

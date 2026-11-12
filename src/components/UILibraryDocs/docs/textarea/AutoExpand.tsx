import React from 'react'
import { Field } from 'components/UI/Field'
import { Textarea } from 'components/UI/Textarea'

export default function AutoExpandTextarea(): JSX.Element {
    return (
        <Field.Root className="max-w-md">
            <Field.Label>Message</Field.Label>
            <Textarea autoExpand placeholder="What do you want to talk about?" />
            <Field.Description>This box grows as you type.</Field.Description>
        </Field.Root>
    )
}

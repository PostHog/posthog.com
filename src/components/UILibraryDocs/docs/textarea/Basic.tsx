import React from 'react'
import { Field } from 'components/UI/Field'
import { Textarea } from 'components/UI/Textarea'

export default function BasicTextarea(): JSX.Element {
    return (
        <Field.Root className="max-w-md">
            <Field.Label>Feedback</Field.Label>
            <Textarea placeholder="What can we do better?" />
            <Field.Description>Drag the bottom corner to make the box taller.</Field.Description>
        </Field.Root>
    )
}

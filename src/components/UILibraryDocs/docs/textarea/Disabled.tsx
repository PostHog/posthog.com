import React from 'react'
import { Field } from 'components/UI/Field'
import { Textarea } from 'components/UI/Textarea'

export default function DisabledTextarea(): JSX.Element {
    return (
        <Field.Root disabled className="max-w-md">
            <Field.Label>Release notes</Field.Label>
            <Textarea defaultValue="Session replay now records canvas elements." />
            <Field.Description>Release notes lock when the release ships.</Field.Description>
        </Field.Root>
    )
}

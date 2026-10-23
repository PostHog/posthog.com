import React from 'react'
import { Field } from 'components/UI/Field'

export default function BasicField(): JSX.Element {
    return (
        <Field.Root className="max-w-xs">
            <Field.Label>Project name</Field.Label>
            <Field.Control placeholder="Hogflix" />
            <Field.Description>Visible to everyone in your organization.</Field.Description>
        </Field.Root>
    )
}

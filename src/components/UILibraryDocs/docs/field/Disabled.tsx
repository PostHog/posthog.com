import React from 'react'
import { Field } from 'components/UI/Field'

export default function DisabledField(): JSX.Element {
    return (
        <Field.Root disabled className="max-w-xs">
            <Field.Label>Project name</Field.Label>
            <Field.Control defaultValue="Hogflix" />
            <Field.Description>Only admins can rename the project.</Field.Description>
        </Field.Root>
    )
}

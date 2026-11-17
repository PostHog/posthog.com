import React from 'react'
import { Field } from 'components/UI/Field'

export default function FieldStates(): JSX.Element {
    return (
        <div className="grid gap-4 @xl:grid-cols-3">
            <Field.Root>
                <Field.Label>Enabled</Field.Label>
                <Field.Control defaultValue="Hogflix" />
            </Field.Root>
            <Field.Root invalid>
                <Field.Label>Invalid</Field.Label>
                <Field.Control defaultValue="max@" />
                <Field.Error match>Enter a valid email address.</Field.Error>
            </Field.Root>
            <Field.Root disabled>
                <Field.Label>Disabled</Field.Label>
                <Field.Control defaultValue="Hogflix" />
            </Field.Root>
        </div>
    )
}

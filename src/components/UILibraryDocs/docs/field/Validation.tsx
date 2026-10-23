import React from 'react'
import { Field } from 'components/UI/Field'

export default function FieldValidation(): JSX.Element {
    return (
        <Field.Root validationMode="onBlur" className="max-w-xs">
            <Field.Label>Email</Field.Label>
            <Field.Control type="email" required placeholder="max@posthog.com" />
            <Field.Error match="valueMissing">Enter an email address.</Field.Error>
            <Field.Error match="typeMismatch">Enter a valid email address.</Field.Error>
        </Field.Root>
    )
}

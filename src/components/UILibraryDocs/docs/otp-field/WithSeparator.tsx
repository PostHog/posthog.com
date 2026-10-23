import React from 'react'
import { Field } from 'components/UI/Field'
import { OTPField } from 'components/UI/OTPField'

export default function OTPFieldWithSeparator(): JSX.Element {
    return (
        <Field.Root>
            <Field.Label>Verification code</Field.Label>
            <OTPField.Root length={6}>
                <OTPField.Input />
                <OTPField.Input aria-label="Character 2 of 6" />
                <OTPField.Input aria-label="Character 3 of 6" />
                <OTPField.Separator />
                <OTPField.Input aria-label="Character 4 of 6" />
                <OTPField.Input aria-label="Character 5 of 6" />
                <OTPField.Input aria-label="Character 6 of 6" />
            </OTPField.Root>
            <Field.Description>Enter the 6-digit code that we sent to your email.</Field.Description>
        </Field.Root>
    )
}

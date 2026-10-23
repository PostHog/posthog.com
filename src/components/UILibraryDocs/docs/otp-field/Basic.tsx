import React from 'react'
import { Field } from 'components/UI/Field'
import { OTPField } from 'components/UI/OTPField'

const CODE_LENGTH = 6

const characterPositions = Array.from({ length: CODE_LENGTH }, (_, index) => index + 1)

export default function OTPFieldBasic(): JSX.Element {
    return (
        <Field.Root>
            <Field.Label>Verification code</Field.Label>
            <OTPField.Root length={CODE_LENGTH}>
                {characterPositions.map((position) => (
                    <OTPField.Input
                        key={position}
                        aria-label={position === 1 ? undefined : `Character ${position} of ${CODE_LENGTH}`}
                    />
                ))}
            </OTPField.Root>
            <Field.Description>Enter the 6-digit code that we sent to your email.</Field.Description>
        </Field.Root>
    )
}

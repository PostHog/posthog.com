import React from 'react'
import { Field } from 'components/UI/Field'
import { NumberField } from 'components/UI/NumberField'

export default function NumberFieldDisabled(): JSX.Element {
    return (
        <Field.Root disabled>
            <NumberField.Root min={1} defaultValue={5}>
                <NumberField.ScrubArea>
                    <Field.Label>Team seats</Field.Label>
                </NumberField.ScrubArea>
                <NumberField.Group />
            </NumberField.Root>
        </Field.Root>
    )
}

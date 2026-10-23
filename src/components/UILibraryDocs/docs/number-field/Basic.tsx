import React from 'react'
import { Field } from 'components/UI/Field'
import { NumberField } from 'components/UI/NumberField'

export default function NumberFieldBasic(): JSX.Element {
    return (
        <Field.Root>
            <NumberField.Root min={0} max={100} step={1} defaultValue={10}>
                <NumberField.ScrubArea>
                    <Field.Label>Monthly events (millions)</Field.Label>
                    <NumberField.ScrubAreaCursor />
                </NumberField.ScrubArea>
                <NumberField.Group />
            </NumberField.Root>
            <Field.Description>Drag the label left or right to change the value.</Field.Description>
        </Field.Root>
    )
}

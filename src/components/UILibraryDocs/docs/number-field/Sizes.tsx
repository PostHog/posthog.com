import React from 'react'
import { NumberField } from 'components/UI/NumberField'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

export default function Sizes(): JSX.Element {
    return (
        <DemoRows>
            {(['sm', 'md', 'lg'] as const).map((size) => (
                <DemoRow key={size} label={size}>
                    <NumberField.Root defaultValue={10}>
                        <NumberField.Group size={size}>
                            <NumberField.Input aria-label={`${size} number`} />
                            <NumberField.Steppers />
                        </NumberField.Group>
                    </NumberField.Root>
                </DemoRow>
            ))}
        </DemoRows>
    )
}

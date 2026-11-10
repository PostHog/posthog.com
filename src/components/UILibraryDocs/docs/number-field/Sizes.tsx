import React from 'react'
import { NumberField } from 'components/UI/NumberField'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const sizes = [
    { size: 'sm', label: 'sm · dense UI' },
    { size: 'md', label: 'md · default' },
    { size: 'lg', label: 'lg · hero field' },
] as const

export default function Sizes(): JSX.Element {
    return (
        <DemoRows>
            {sizes.map(({ size, label }) => (
                <DemoRow key={size} label={label}>
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

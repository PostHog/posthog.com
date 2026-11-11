import React from 'react'
import { Field } from 'components/UI/Field'
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
                    <Field.Root className="w-full max-w-xs">
                        <Field.Control size={size} aria-label={`${size} field`} placeholder="Project name" />
                    </Field.Root>
                </DemoRow>
            ))}
        </DemoRows>
    )
}

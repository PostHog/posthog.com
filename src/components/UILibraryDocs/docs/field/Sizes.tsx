import React from 'react'
import { Field } from 'components/UI/Field'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

export default function Sizes(): JSX.Element {
    return (
        <DemoRows>
            {(['sm', 'md', 'lg'] as const).map((size) => (
                <DemoRow key={size} label={size}>
                    <Field.Root className="w-full max-w-xs">
                        <Field.Control size={size} aria-label={`${size} field`} placeholder="Project name" />
                    </Field.Root>
                </DemoRow>
            ))}
        </DemoRows>
    )
}

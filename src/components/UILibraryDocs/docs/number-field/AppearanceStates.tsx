import React from 'react'
import { Field } from 'components/UI/Field'
import { NumberField } from 'components/UI/NumberField'
import type { FieldAppearance } from 'components/UI/styles'

function StateColumn({ appearance }: { appearance: FieldAppearance }): JSX.Element {
    return (
        <div className="flex flex-col gap-5">
            <Field.Root>
                <NumberField.Root min={0} max={100}>
                    <Field.Label>Empty</Field.Label>
                    <NumberField.Group appearance={appearance} />
                </NumberField.Root>
            </Field.Root>
            <Field.Root>
                <NumberField.Root min={0} max={100} defaultValue={10}>
                    <Field.Label>Filled</Field.Label>
                    <NumberField.Group appearance={appearance} />
                </NumberField.Root>
            </Field.Root>
            <Field.Root invalid>
                <NumberField.Root defaultValue={250}>
                    <Field.Label>Invalid</Field.Label>
                    <NumberField.Group appearance={appearance} />
                </NumberField.Root>
                <Field.Error match>Enter 100 or less.</Field.Error>
            </Field.Root>
            <Field.Root disabled>
                <NumberField.Root defaultValue={10}>
                    <Field.Label>Disabled</Field.Label>
                    <NumberField.Group appearance={appearance} />
                </NumberField.Root>
            </Field.Root>
        </div>
    )
}

export default function States(): JSX.Element {
    return (
        <div className="grid gap-8 @2xl:grid-cols-2">
            <div className="flex flex-col gap-3">
                <span className="text-sm font-bold">Inset (default)</span>
                <StateColumn appearance="inset" />
            </div>
            <div className="flex flex-col gap-3">
                <span className="text-sm font-bold">Line</span>
                <StateColumn appearance="line" />
            </div>
        </div>
    )
}

import React from 'react'
import { Field } from 'components/UI/Field'
import { NumberField } from 'components/UI/NumberField'
import type { FieldAppearance } from 'components/UI/styles'
import { DemoColumn, DemoColumns } from 'components/UILibraryDocs/DemoLayout'

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
        <DemoColumns>
            <DemoColumn label="Inset (default)">
                <StateColumn appearance="inset" />
            </DemoColumn>
            <DemoColumn label="Line">
                <StateColumn appearance="line" />
            </DemoColumn>
        </DemoColumns>
    )
}

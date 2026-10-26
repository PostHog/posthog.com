import React from 'react'
import { Field } from 'components/UI/Field'
import type { FieldAppearance } from 'components/UI/styles'

function StateColumn({ appearance }: { appearance: FieldAppearance }): JSX.Element {
    return (
        <div className="flex flex-col gap-5">
            <Field.Root>
                <Field.Label>Empty</Field.Label>
                <Field.Control appearance={appearance} placeholder="Hogflix" />
            </Field.Root>
            <Field.Root>
                <Field.Label>Filled</Field.Label>
                <Field.Control appearance={appearance} defaultValue="Hedgebox" />
            </Field.Root>
            <Field.Root invalid>
                <Field.Label>Invalid</Field.Label>
                <Field.Control appearance={appearance} defaultValue="Hogflix" />
                <Field.Error match>A project with this name already exists.</Field.Error>
            </Field.Root>
            <Field.Root disabled>
                <Field.Label>Disabled</Field.Label>
                <Field.Control appearance={appearance} defaultValue="Hogflix" />
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

import React from 'react'
import { Field } from 'components/UI/Field'
import type { FieldAppearance } from 'components/UI/styles'
import { DemoColumn, DemoColumns } from 'components/UILibraryDocs/DemoLayout'

function StateColumn({ appearance }: { appearance: FieldAppearance }): JSX.Element {
    return (
        <div className="flex flex-col gap-5">
            <Field.Root>
                <Field.Label>Empty</Field.Label>
                <Field.Control appearance={appearance} placeholder="Project name" />
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

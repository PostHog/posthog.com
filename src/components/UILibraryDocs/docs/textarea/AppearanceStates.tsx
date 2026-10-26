import React from 'react'
import { Field } from 'components/UI/Field'
import { Textarea } from 'components/UI/Textarea'
import type { FieldAppearance } from 'components/UI/styles'

function StateColumn({ appearance }: { appearance: FieldAppearance }): JSX.Element {
    return (
        <div className="flex flex-col gap-5">
            <Field.Root>
                <Field.Label>Empty</Field.Label>
                <Textarea appearance={appearance} placeholder="What does this project track?" />
            </Field.Root>
            <Field.Root>
                <Field.Label>Filled</Field.Label>
                <Textarea appearance={appearance} defaultValue="Signups and activation for the Hogflix web app." />
            </Field.Root>
            <Field.Root invalid>
                <Field.Label>Invalid</Field.Label>
                <Textarea appearance={appearance} defaultValue="TBD" />
                <Field.Error match>Write at least 10 characters.</Field.Error>
            </Field.Root>
            <Field.Root disabled>
                <Field.Label>Disabled</Field.Label>
                <Textarea appearance={appearance} defaultValue="Signups and activation for the Hogflix web app." />
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

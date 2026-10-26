import React from 'react'
import { Field } from 'components/UI/Field'
import { OTPField } from 'components/UI/OTPField'
import type { FieldAppearance } from 'components/UI/styles'

const CODE_LENGTH = 6

const characterPositions = Array.from({ length: CODE_LENGTH }, (_, index) => index + 1)

function Code({ appearance, defaultValue }: { appearance: FieldAppearance; defaultValue?: string }): JSX.Element {
    return (
        <OTPField.Root length={CODE_LENGTH} defaultValue={defaultValue} appearance={appearance}>
            {characterPositions.map((position) => (
                <OTPField.Input
                    key={position}
                    aria-label={position === 1 ? undefined : `Character ${position} of ${CODE_LENGTH}`}
                />
            ))}
        </OTPField.Root>
    )
}

function StateColumn({ appearance }: { appearance: FieldAppearance }): JSX.Element {
    return (
        <div className="flex flex-col gap-5">
            <Field.Root>
                <Field.Label>Empty</Field.Label>
                <Code appearance={appearance} />
            </Field.Root>
            <Field.Root>
                <Field.Label>Filled</Field.Label>
                <Code appearance={appearance} defaultValue="482913" />
            </Field.Root>
            <Field.Root invalid>
                <Field.Label>Invalid</Field.Label>
                <Code appearance={appearance} defaultValue="000000" />
                <Field.Error match>This code is not correct.</Field.Error>
            </Field.Root>
            <Field.Root disabled>
                <Field.Label>Disabled</Field.Label>
                <Code appearance={appearance} defaultValue="482913" />
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

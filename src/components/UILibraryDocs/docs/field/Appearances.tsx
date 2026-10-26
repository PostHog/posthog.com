import React from 'react'
import { Field } from 'components/UI/Field'
import { Select } from 'components/UI/Select'
import { Textarea } from 'components/UI/Textarea'
import type { FieldAppearance } from 'components/UI/styles'

const regions = [
    { value: 'us', label: 'US Cloud' },
    { value: 'eu', label: 'EU Cloud' },
]

function ProjectForm({ appearance }: { appearance: FieldAppearance }): JSX.Element {
    return (
        <div className="flex flex-col gap-4">
            <Field.Root>
                <Field.Label>Project name</Field.Label>
                <Field.Control appearance={appearance} placeholder="Hogflix" />
            </Field.Root>
            <Select.Root items={regions} defaultValue="us" appearance={appearance}>
                <div className="flex flex-col gap-1">
                    <Select.Label>Region</Select.Label>
                    <Select.Trigger>
                        <Select.Value />
                        <Select.Icon />
                    </Select.Trigger>
                </div>
                <Select.Popup>
                    {regions.map((region) => (
                        <Select.Item key={region.value} value={region.value}>
                            {region.label}
                        </Select.Item>
                    ))}
                </Select.Popup>
            </Select.Root>
            <Field.Root>
                <Field.Label>Description</Field.Label>
                <Textarea appearance={appearance} placeholder="What does this project track?" />
            </Field.Root>
        </div>
    )
}

export default function Appearances(): JSX.Element {
    return (
        <div className="grid gap-8 @2xl:grid-cols-2">
            <div className="flex flex-col gap-3">
                <span className="text-sm font-bold">Inset (default)</span>
                <ProjectForm appearance="inset" />
            </div>
            <div className="flex flex-col gap-3">
                <span className="text-sm font-bold">Line</span>
                <ProjectForm appearance="line" />
            </div>
        </div>
    )
}

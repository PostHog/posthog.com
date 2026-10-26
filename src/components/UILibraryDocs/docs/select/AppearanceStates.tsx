import React from 'react'
import { Field } from 'components/UI/Field'
import { Select } from 'components/UI/Select'
import type { FieldAppearance } from 'components/UI/styles'

const regions = [
    { value: 'us', label: 'US Cloud' },
    { value: 'eu', label: 'EU Cloud' },
    { value: 'self-hosted', label: 'Self-hosted' },
]

function RegionSelect({
    appearance,
    label,
    defaultValue,
}: {
    appearance: FieldAppearance
    label: string
    defaultValue?: string
}): JSX.Element {
    return (
        <Select.Root items={regions} defaultValue={defaultValue} appearance={appearance}>
            <Select.Label>{label}</Select.Label>
            <Select.Trigger>
                <Select.Value placeholder="Choose a region" />
                <Select.Icon />
            </Select.Trigger>
            <Select.Popup>
                {regions.map((region) => (
                    <Select.Item key={region.value} value={region.value}>
                        {region.label}
                    </Select.Item>
                ))}
            </Select.Popup>
        </Select.Root>
    )
}

function StateColumn({ appearance }: { appearance: FieldAppearance }): JSX.Element {
    return (
        <div className="flex flex-col gap-5">
            <Field.Root>
                <RegionSelect appearance={appearance} label="Empty" />
            </Field.Root>
            <Field.Root>
                <RegionSelect appearance={appearance} label="Filled" defaultValue="eu" />
            </Field.Root>
            <Field.Root invalid>
                <RegionSelect appearance={appearance} label="Invalid" defaultValue="self-hosted" />
                <Field.Error match>Self-hosted is not available on this plan.</Field.Error>
            </Field.Root>
            <Field.Root disabled>
                <RegionSelect appearance={appearance} label="Disabled" defaultValue="us" />
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

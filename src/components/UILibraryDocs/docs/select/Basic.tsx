import React from 'react'
import { Select } from 'components/UI/Select'

const regions = [
    { value: 'us', label: 'US Cloud' },
    { value: 'eu', label: 'EU Cloud' },
    { value: 'self-hosted', label: 'Self-hosted' },
]

export default function SelectBasic(): JSX.Element {
    return (
        <div className="flex flex-col items-start gap-1">
            <Select.Root items={regions} defaultValue="us">
                <Select.Label>Region</Select.Label>
                <Select.Trigger>
                    <Select.Value />
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
        </div>
    )
}

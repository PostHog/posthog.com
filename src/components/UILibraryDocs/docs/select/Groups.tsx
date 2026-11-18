import React from 'react'
import { Select } from 'components/UI/Select'

const regions = [
    { value: 'us', label: 'US Cloud' },
    { value: 'eu', label: 'EU Cloud' },
    { value: 'self-hosted', label: 'Self-hosted' },
]

export default function SelectGroups(): JSX.Element {
    return (
        <div className="flex flex-col items-start gap-1">
            <Select.Root items={regions} defaultValue="us">
                <Select.Label>Region</Select.Label>
                <Select.Trigger>
                    <Select.Value />
                    <Select.Icon />
                </Select.Trigger>
                <Select.Popup>
                    <Select.Group>
                        <Select.GroupLabel>Cloud</Select.GroupLabel>
                        <Select.Item value="us">US Cloud</Select.Item>
                        <Select.Item value="eu">EU Cloud</Select.Item>
                    </Select.Group>
                    <Select.Separator />
                    <Select.Item value="self-hosted" disabled>
                        Self-hosted
                    </Select.Item>
                </Select.Popup>
            </Select.Root>
        </div>
    )
}

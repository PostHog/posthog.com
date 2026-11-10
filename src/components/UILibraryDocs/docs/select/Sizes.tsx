import React from 'react'
import { Select } from 'components/UI/Select'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const items = ['Product analytics', 'Session replay', 'Feature flags'].map((value) => ({ value, label: value }))

const sizes = [
    { size: 'sm', label: 'sm · dense UI' },
    { size: 'md', label: 'md · default' },
    { size: 'lg', label: 'lg · hero field' },
] as const

export default function Sizes(): JSX.Element {
    return (
        <DemoRows>
            {sizes.map(({ size, label }) => (
                <DemoRow key={size} label={label}>
                    <Select.Root size={size} items={items} defaultValue="Product analytics">
                        <Select.Trigger aria-label={`${size} product`}>
                            <Select.Value />
                            <Select.Icon />
                        </Select.Trigger>
                        <Select.Popup>
                            {items.map((item) => (
                                <Select.Item key={item.value} value={item.value}>
                                    {item.label}
                                </Select.Item>
                            ))}
                        </Select.Popup>
                    </Select.Root>
                </DemoRow>
            ))}
        </DemoRows>
    )
}

import React from 'react'
import { Select } from 'components/UI/Select'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const items = ['Product analytics', 'Session replay', 'Feature flags'].map((value) => ({ value, label: value }))

export default function Sizes(): JSX.Element {
    return (
        <DemoRows>
            {(['sm', 'md', 'lg'] as const).map((size) => (
                <DemoRow key={size} label={size}>
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

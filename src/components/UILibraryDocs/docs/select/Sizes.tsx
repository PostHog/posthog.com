import React from 'react'
import { Select } from 'components/UI/Select'
import { Button } from 'components/UI/Button'

const items = ['Product analytics', 'Session replay', 'Feature flags'].map((value) => ({ value, label: value }))

export default function Sizes(): JSX.Element {
    return (
        <div className="flex flex-col gap-4">
            {(['sm', 'md', 'lg'] as const).map((size) => (
                <div key={size} className="flex flex-wrap items-start gap-2">
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
                    <Button size={size} variant="secondary">
                        {size}
                    </Button>
                </div>
            ))}
        </div>
    )
}

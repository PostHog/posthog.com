import React, { useState } from 'react'
import { Checkbox, CheckboxGroup } from 'components/UI/Checkbox'

const productOptions = [
    { value: 'analytics', label: 'Product analytics' },
    { value: 'replay', label: 'Session replay' },
    { value: 'flags', label: 'Feature flags' },
]

export default function ProductCheckboxGroup(): JSX.Element {
    const [selected, setSelected] = useState(['replay'])

    return (
        <CheckboxGroup
            aria-label="Products"
            value={selected}
            onValueChange={setSelected}
            allValues={productOptions.map(({ value }) => value)}
        >
            <label className="flex items-center gap-2 text-sm font-semibold">
                <Checkbox.Root parent>
                    <Checkbox.Indicator />
                </Checkbox.Root>
                All products
            </label>
            {productOptions.map(({ value, label }) => (
                <label key={value} className="flex items-center gap-2 pl-7 text-sm">
                    <Checkbox.Root value={value}>
                        <Checkbox.Indicator />
                    </Checkbox.Root>
                    {label}
                </label>
            ))}
        </CheckboxGroup>
    )
}

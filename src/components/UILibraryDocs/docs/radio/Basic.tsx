import React from 'react'
import { Radio, RadioGroup } from 'components/UI/Radio'

const billingPeriods = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'annual', label: 'Annual' },
]

export default function BasicRadioGroup(): JSX.Element {
    return (
        <RadioGroup defaultValue="monthly" aria-label="Billing period">
            {billingPeriods.map(({ value, label }) => (
                <label key={value} className="flex items-center gap-2 text-sm">
                    <Radio.Root value={value}>
                        <Radio.Indicator />
                    </Radio.Root>
                    {label}
                </label>
            ))}
        </RadioGroup>
    )
}

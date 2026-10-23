import React from 'react'
import { Radio, RadioGroup } from 'components/UI/Radio'

const billingPeriods = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'annual', label: 'Annual' },
    { value: 'never', label: 'Never (disabled)', disabled: true },
]

export default function DisabledRadio(): JSX.Element {
    return (
        <RadioGroup defaultValue="monthly" aria-label="Billing period">
            {billingPeriods.map(({ value, label, disabled }) => (
                <label key={value} className={`flex items-center gap-2 text-sm ${disabled ? 'text-muted' : ''}`}>
                    <Radio.Root value={value} disabled={disabled}>
                        <Radio.Indicator />
                    </Radio.Root>
                    {label}
                </label>
            ))}
        </RadioGroup>
    )
}

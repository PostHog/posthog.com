import React, { useState } from 'react'
import { Radio, RadioGroup } from 'components/UI/Radio'

const billingPeriods = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'annual', label: 'Annual' },
]

export default function ControlledRadioGroup(): JSX.Element {
    const [billingPeriod, setBillingPeriod] = useState('annual')

    return (
        <div className="flex flex-col gap-3">
            <RadioGroup value={billingPeriod} onValueChange={setBillingPeriod} aria-label="Billing period">
                {billingPeriods.map(({ value, label }) => (
                    <label key={value} className="flex items-center gap-2 text-body-sm">
                        <Radio.Root value={value}>
                            <Radio.Indicator />
                        </Radio.Root>
                        {label}
                    </label>
                ))}
            </RadioGroup>
            <span className="text-body-sm text-secondary">Billing period: {billingPeriod}</span>
        </div>
    )
}

import React from 'react'
import { Radio, RadioGroup } from 'components/UI/Radio'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const periods = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'annual', label: 'Annual' },
    { value: 'quarterly', label: 'Quarterly' },
]

function PeriodGroup({
    groupDisabled,
    disabledValue,
}: {
    groupDisabled?: boolean
    disabledValue?: string
}): JSX.Element {
    return (
        <RadioGroup
            defaultValue="monthly"
            aria-label="Billing period"
            disabled={groupDisabled}
            className="flex-row flex-wrap gap-4"
        >
            {periods.map(({ value, label }) => {
                const disabled = groupDisabled || value === disabledValue
                return (
                    <label
                        key={value}
                        className={`flex items-center gap-2 text-body-sm ${disabled ? 'text-muted' : ''}`}
                    >
                        <Radio.Root value={value} disabled={value === disabledValue}>
                            <Radio.Indicator />
                        </Radio.Root>
                        {label}
                    </label>
                )
            })}
        </RadioGroup>
    )
}

export default function DisabledRadio(): JSX.Element {
    return (
        <DemoRows>
            <DemoRow label="One option">
                <PeriodGroup disabledValue="quarterly" />
            </DemoRow>
            <DemoRow label="Whole group">
                <PeriodGroup groupDisabled />
            </DemoRow>
        </DemoRows>
    )
}

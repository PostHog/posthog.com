import React, { useState } from 'react'
import { NonLinearSlider, nonLinearCurve, reverseNonLinearCurve } from '../PricingSlider/Slider'
import { getRetentionMonths, RETENTION_SLIDER_STEPS } from './calculatorLogic'
import type { RetentionConfig } from './calculatorLogic'

const monthsText = (months: number) => `${months} ${months === 1 ? 'month' : 'months'}`

/** The unit beside the months input: the included default, or the months kept. */
export const retentionInputUnit = (retention: RetentionConfig, months: number): string =>
    months ? `${months === 1 ? 'month' : 'months'} kept` : retention.includedLabel || ''

/**
 * How long data is kept: the included default at the start, then every whole month up to `maxMonths`, on the
 * volume sliders' curve so the first year takes about half the track. Marks are labels only.
 */
export const RetentionSlider = ({
    retention,
    value,
    onChange,
}: {
    retention: RetentionConfig
    value: number
    onChange: (months: number) => void
}): JSX.Element => (
    <NonLinearSlider
        stepsInRange={RETENTION_SLIDER_STEPS}
        marks={retention.marks || []}
        min={0}
        max={retention.maxMonths}
        value={nonLinearCurve(value)}
        onChange={(position) => onChange(getRetentionMonths(retention, reverseNonLinearCurve(position)))}
        formatMark={(months) =>
            months === 0 ? retention.includedMark || '' : months % 12 === 0 ? `${months / 12}y` : `${months}m`
        }
        formatTip={(position) => {
            const months = getRetentionMonths(retention, position)
            return months ? monthsText(months) : retention.includedLabel || ''
        }}
    />
)

/** Months kept, as a number. Empty or 0 is the included default; values are kept within 0 and `maxMonths`. */
export const RetentionMonthsInput = ({
    retention,
    value,
    onChange,
    className = '',
}: {
    retention: RetentionConfig
    value: number
    onChange: (months: number) => void
    className?: string
}): JSX.Element => {
    // What the visitor is typing, until they leave the field
    const [draft, setDraft] = useState<string | null>(null)
    const change = (text: string) => {
        const digits = text.replace(/\D/g, '')
        const months = getRetentionMonths(retention, digits ? Number(digits) : 0)
        setDraft(digits && Number(digits) !== months ? String(months) : digits)
        onChange(months)
    }
    return (
        <input
            type="text"
            inputMode="numeric"
            aria-label={`${retention.label} months`}
            placeholder="0"
            value={draft ?? (value ? String(value) : '')}
            onFocus={(event) => event.currentTarget.select()}
            onChange={(event) => change(event.target.value)}
            onBlur={() => setDraft(null)}
            onKeyDown={(event) => {
                if (event.key === 'Enter') event.currentTarget.blur()
            }}
            className={className}
        />
    )
}

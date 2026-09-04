import React from 'react'
import {
    LogSlider,
    NonLinearSlider,
    inverseCurve,
    sliderCurve,
    nonLinearCurve,
    reverseNonLinearCurve,
} from '../PricingSlider/Slider'
import { formatCompact, parseCompact } from '../utils'

export const UsageSliderHeader = ({ unit }: { unit: string }) => (
    <div className="flex items-center gap-4 pb-1">
        <span className="w-48 shrink-0 text-xs uppercase text-secondary font-semibold">Usage</span>
        <span className="flex-1" />
        <span className="text-xs uppercase text-secondary shrink-0 font-semibold">{unit} / mo</span>
    </div>
)

export default function UsageSliderRow({
    label,
    labelAccessory,
    subtitle,
    value,
    onChange,
    marks,
    min,
    max,
    scaleMin,
    curve = 'nonlinear',
}: {
    label: string
    labelAccessory?: React.ReactNode
    subtitle?: string
    value: number
    onChange: (value: number) => void
    marks: number[]
    min: number
    max: number
    scaleMin?: number
    curve?: 'log' | 'nonlinear'
}) {
    const effectiveScaleMin = scaleMin ?? marks.find((mark) => mark > 0) ?? 1
    const sliderValue = Math.max(value || 0, effectiveScaleMin)

    const handleLogChange = (next: number) => {
        const rounded = Math.round(sliderCurve(next))
        onChange(rounded <= effectiveScaleMin ? 0 : rounded)
    }

    return (
        <div className={`flex items-center gap-4 py-3 ${value ? '' : 'opacity-60'}`}>
            <div className="w-48 shrink-0">
                <div className="flex items-center gap-1 mb-0.5">
                    <p className="m-0 text-sm font-bold first-letter:uppercase">{label}</p>
                    {labelAccessory}
                </div>
                {subtitle ? <p className="m-0 text-xs text-secondary">{subtitle}</p> : null}
            </div>
            <div className="flex-1 flex justify-end min-w-0">
                <div className="w-full @md:w-3/4 pb-5">
                    {curve === 'nonlinear' ? (
                        <NonLinearSlider
                            stepsInRange={100}
                            marks={marks}
                            min={0}
                            max={max}
                            onChange={(next) => onChange(reverseNonLinearCurve(next))}
                            value={nonLinearCurve(value || 0)}
                        />
                    ) : (
                        <LogSlider
                            stepsInRange={100}
                            marks={marks}
                            min={0}
                            scaleMin={effectiveScaleMin}
                            max={max}
                            onChange={handleLogChange}
                            value={inverseCurve(sliderValue)}
                        />
                    )}
                </div>
            </div>
            <input
                type="text"
                className="w-14 bg-transparent text-center font-bold text-sm border border-light dark:border-dark rounded-md py-1 px-1.5 focus:ring-0 focus:border-red dark:focus:border-yellow focus:bg-white dark:focus:bg-accent-dark"
                value={formatCompact(value)}
                onChange={(e) => onChange(parseCompact(e.target.value))}
            />
        </div>
    )
}

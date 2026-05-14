import React from 'react'

type Props = {
    label: string
    value: number
    onChange: (value: number) => void
    min?: number
    max?: number
    step?: number
    suffix?: string
}

export default function Slider({ label, value, onChange, min = 0, max = 100, step = 1, suffix }: Props) {
    return (
        <div>
            <div className="flex items-baseline justify-between">
                <label className="text-xs text-secondary uppercase tracking-wide">{label}</label>
                <span className="text-xs text-secondary font-mono">
                    {value}
                    {suffix}
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full accent-red dark:accent-yellow"
            />
        </div>
    )
}

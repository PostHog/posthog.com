import React from 'react'
import { Select } from 'components/RadixUI/Select'

type Option<T> = { label: string; value: T; icon?: React.ReactNode }

// A select for use inside a Modal. Its list renders in a portal, so the Modal's overflow does not cut it off
// (OSSelect draws its list inside its parent). Values can be numbers; Radix works with strings.
export default function DialogSelect<T extends string | number>({
    label,
    placeholder,
    value,
    onChange,
    options,
}: {
    label?: string
    placeholder?: string
    value?: T | null
    onChange: (value: T) => void
    options: Option<T>[]
}) {
    const byKey = new Map(options.map((option) => [String(option.value), option.value]))
    const select = (
        <Select
            className="w-full"
            position="popper"
            placeholder={placeholder}
            value={value === undefined || value === null ? undefined : String(value)}
            onValueChange={(key) => {
                const next = byKey.get(key)
                if (next !== undefined) onChange(next)
            }}
            groups={[
                {
                    label: '',
                    items: options.map((option) => ({
                        label: option.label,
                        value: String(option.value),
                        icon: option.icon,
                    })),
                },
            ]}
        />
    )
    return label ? (
        <div>
            <div className="text-[15px] mb-1">{label}</div>
            {select}
        </div>
    ) : (
        select
    )
}

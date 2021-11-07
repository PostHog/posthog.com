import React from 'react'
import { Check } from '../Icons/Icons'

export default function Checkbox({
    value,
    className,
    onChange,
    checked,
    ...other
}: {
    value: string
    className: string
    onChange: () => void
    checked: boolean
}): JSX.Element {
    return (
        <div {...other} className={`relative flex items-center space-x-2 text-base font-semibold ${className}`}>
            <span>
                <input
                    checked={checked}
                    type="checkbox"
                    onChange={onChange}
                    value={value}
                    id={value}
                    aria-describedby={`${value}-description`}
                    name={value}
                    className="focus:ring-primary h-4 w-4 text-primary border border-primary bg-primary rounded checkbox appearance-none bg-opacity-0 absolute transition-all"
                />
                <Check className="w-4 h-4 relative invisible text-white pointer-events-none" />
            </span>
            <label className="flex" htmlFor={value}>
                <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
            </label>
        </div>
    )
}

import React from 'react'
import { Check } from '../Icons/Icons'

export default function Checkbox({
    value,
    className = '',
    onChange,
    checked,
    id,
    ...other
}: {
    value: string
    className?: string
    onChange: () => void
    checked: boolean
    id?: string
}): JSX.Element {
    return (
        <div {...other} className={`relative flex items-center space-x-2 text-lg font-semibold ${className}`}>
            <span>
                <input
                    checked={checked}
                    type="checkbox"
                    onChange={onChange}
                    value={value}
                    id={value || id}
                    aria-describedby={`${value}-description`}
                    name={value}
                    className="focus:ring-primary h-4 w-4 text-primary border-2 border-gray-accent-light bg-white dark:bg-gray-accent-dark rounded-[2px] checkbox appearance-none absolute transition-all"
                />
                <Check className="w-4 h-4 relative invisible text-primary dark:text-white pointer-events-none" />
            </span>
            <label className="flex" htmlFor={value || id}>
                <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
            </label>
        </div>
    )
}

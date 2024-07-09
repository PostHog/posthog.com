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
        <div {...other} className={`relative flex items-center space-x-2 !text-[15px] ${checked ? 'font-bold' : 'font-medium'} ${className}`}>
            <span>
                <input
                    checked={checked}
                    type="checkbox"
                    onChange={onChange}
                    value={value}
                    id={value || id}
                    aria-describedby={`${value}-description`}
                    name={value}
                    className="focus:ring-primary size-5 text-green border-2 border-gray-accent-light bg-white dark:bg-green rounded-[2px] checkbox appearance-none absolute transition-all cursor-pointer"
                />
                <Check className="size-5 relative invisible text-white dark:text-white pointer-events-none" />
            </span>
            <label className="flex cursor-pointer" htmlFor={value || id}>
                <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
            </label>
        </div>
    )
}

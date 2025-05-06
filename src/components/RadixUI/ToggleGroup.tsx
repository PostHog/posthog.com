import React from 'react'
import { ToggleGroup as RadixToggleGroup } from 'radix-ui'

const toggleGroupItemClasses =
    'flex-1 flex p-1 items-center justify-center bg-white leading-4 text-sm font-medium text-primary dark:text-primary-dark rounded hover:bg-accent-2 dark:hover:bg-accent-dark focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none data-[state=on]:bg-accent-2 data-[state=on]:bg-accent-2'

export interface ToggleOption {
    label: string
    value: string
    icon?: React.ReactNode
    default?: boolean
}

export interface ToggleGroupProps {
    title: string
    options: ToggleOption[]
    onValueChange: (value: string) => void
    value: string
}

export const ToggleGroup = ({ title, options, onValueChange, value }: ToggleGroupProps) => {
    const defaultValue = options.find((option) => option.default)?.value || options[0]?.value

    return (
        <>
            <label className="pt-1.5 text-sm">{title}</label>
            <RadixToggleGroup.Root
                className="flex space-x-px rounded p-1 bg-white dark:bg-accent-dark border border-light dark:border-dark"
                type="single"
                defaultValue={defaultValue}
                aria-label={title}
                onValueChange={onValueChange}
                value={value}
            >
                {options.map((option) => (
                    <RadixToggleGroup.Item
                        key={option.value}
                        className={toggleGroupItemClasses}
                        value={option.value}
                        aria-label={option.label}
                    >
                        {option.icon ? option.icon : option.label}
                    </RadixToggleGroup.Item>
                ))}
            </RadixToggleGroup.Root>
        </>
    )
}

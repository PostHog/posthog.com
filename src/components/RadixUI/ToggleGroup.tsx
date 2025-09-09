import React from 'react'
import { ToggleGroup as RadixToggleGroup } from 'radix-ui'

const toggleGroupItemClasses =
    'flex-1 flex border border-transparent p-1 items-center justify-center bg-primary leading-4 text-sm font-medium text-primary rounded hover:bg-accent focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-primary focus:outline-none data-[state=on]:bg-accent data-[state=on]:bg-accent skin-classic:data-[state=on]:border-primary skin-classic:border skin-classic:border-b-3 skin-classic:hover:border-primary skin-classic:hover:border-b-3'

export interface ToggleOption {
    label: React.ReactNode
    value: string
    icon?: React.ReactNode
    default?: boolean
}

export interface ToggleGroupProps {
    title: string
    options: ToggleOption[]
    onValueChange: (value: string) => void
    value: string
    hideTitle?: boolean
    className?: string
}

export const ToggleGroup = ({
    title,
    options,
    onValueChange,
    value,
    hideTitle = false,
    className = '',
}: ToggleGroupProps) => {
    const defaultValue = options.find((option) => option.default)?.value || options[0]?.value

    return (
        <>
            {!hideTitle && <label className="pt-1.5 text-[15px] block mb-1">{title}</label>}
            <RadixToggleGroup.Root
                className={`flex space-x-px rounded p-1 bg-primary border border-primary ${className}`}
                type="single"
                data-scheme="primary"
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
                        aria-label={typeof option.label === 'string' ? option.label : option.value}
                    >
                        {option.icon ? option.icon : option.label}
                    </RadixToggleGroup.Item>
                ))}
            </RadixToggleGroup.Root>
        </>
    )
}

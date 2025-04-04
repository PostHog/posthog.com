import React from 'react'
import { IconTextWidth } from '@posthog/icons'
import { IconTextWidthFixed } from 'components/OSIcons'
import { ToggleGroup as RadixToggleGroup } from 'radix-ui'

const toggleGroupItemClasses =
    'flex p-1 aspect-square items-center justify-center bg-white leading-4 text-primary dark:text-primary-dark rounded hover:bg-accent-2 dark:hover:bg-accent-dark focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none data-[state=on]:bg-accent-2 data-[state=on]:bg-accent-2'

export interface ToggleOption {
    label: string
    value: string
    icon?: React.ReactNode
    default?: boolean
}

export interface ToggleGroupProps {
    title: string
    options: ToggleOption[]
}

export const ToggleGroup = ({ title, options }: ToggleGroupProps) => {
    const defaultValue = options.find((option) => option.default)?.value || options[0]?.value

    return (
        <RadixToggleGroup.Root
            className="inline-flex space-x-px rounded p-1 bg-white dark:bg-accent-dark border border-light dark:border-dark"
            type="single"
            defaultValue={defaultValue}
            aria-label={title}
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
    )
}

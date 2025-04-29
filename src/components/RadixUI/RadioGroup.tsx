import React from 'react'
import * as RadixRadioGroup from '@radix-ui/react-radio-group'

const radioGroupItemClasses =
    'group flex items-center gap-2 cursor-pointer'

const radioGroupIndicatorOuterClasses =
    'inline-block w-5 h-5 rounded-full border border-primary group-hover:border-orange flex items-center justify-center bg-primary'

const radioGroupIndicatorInnerClasses =
    'w-3 h-3 rounded-full block bg-orange border-orange'

export interface RadioOption {
    label: string
    value: string
    icon?: React.ReactNode
    default?: boolean
}

export interface RadioGroupProps {
    title: string
    options: RadioOption[]
    onValueChange: (value: string) => void
    value: string
}

export const RadioGroup = ({ title, options, onValueChange, value }: RadioGroupProps) => {
    const defaultValue = options.find((option) => option.default)?.value || options[0]?.value

    return (
        <RadixRadioGroup.Root
            className="flex flex-col gap-2"
            defaultValue={defaultValue}
            aria-label={title}
            onValueChange={onValueChange}
            value={value}
        >
            {options.map((option) => (
                <RadixRadioGroup.Item
                    key={option.value}
                    className={radioGroupItemClasses}
                    value={option.value}
                    aria-label={option.label}
                    data-scheme="primary"
                >
                    <span className={radioGroupIndicatorOuterClasses} data-scheme="primary">
                        <RadixRadioGroup.Indicator asChild>
                            <span className={radioGroupIndicatorInnerClasses} />
                        </RadixRadioGroup.Indicator>
                    </span>
                    <span className="text-sm">{option.label}</span>
                </RadixRadioGroup.Item>
            ))}
        </RadixRadioGroup.Root>
    )
}

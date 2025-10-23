import React from 'react'
import { Checkbox as RadixCheckbox } from 'radix-ui'
import { IconCheck } from '@posthog/icons'

type CheckboxProps = {
    checked?: boolean
    defaultChecked?: boolean
    onCheckedChange?: (checked: boolean) => void
    disabled?: boolean
    required?: boolean
    name?: string
    value?: string
    id?: string
    ariaLabel?: string
    dataScheme?: string
    className?: string
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
    (
        {
            checked,
            defaultChecked,
            onCheckedChange,
            disabled,
            required,
            name,
            value,
            id,
            ariaLabel,
            dataScheme = 'primary',
            className = '',
        },
        ref
    ) => {
        return (
            <RadixCheckbox.Root
                ref={ref}
                checked={checked}
                defaultChecked={defaultChecked}
                onCheckedChange={onCheckedChange}
                disabled={disabled}
                required={required}
                name={name}
                value={value}
                id={id}
                aria-label={ariaLabel}
                data-scheme={dataScheme}
                className={`flex size-5 items-center justify-center rounded border border-primary bg-primary text-primary outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-accent data-[state=checked]:border-accent ${className}`}
            >
                <RadixCheckbox.Indicator className="text-primary">
                    <IconCheck className="size-4" />
                </RadixCheckbox.Indicator>
            </RadixCheckbox.Root>
        )
    }
)

Checkbox.displayName = 'Checkbox'

import React from 'react'
import { Toggle as BaseToggle } from '@base-ui/react/toggle'
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group'
import { cn } from '../../../utils'
import { Button, ButtonGroup } from '../Button'
import type { ButtonSize, ButtonVariant } from '../Button'

export type ToggleVariant = ButtonVariant

const flatToggleText = 'text-secondary data-[pressed]:text-primary'

const ToggleGroupVariantContext = React.createContext<ToggleVariant | null>(null)

export type ToggleProps = Omit<BaseToggle.Props, 'ref' | 'render' | 'className'> & {
    variant?: ToggleVariant
    size?: ButtonSize
    className?: string
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
    { variant: ownVariant = 'default', size = 'md', className, ...props },
    ref
) {
    const variant = React.useContext(ToggleGroupVariantContext) ?? ownVariant
    return (
        <BaseToggle
            ref={ref}
            render={
                <Button
                    variant={variant}
                    size={size}
                    className={cn(variant === 'default' && flatToggleText, className)}
                />
            }
            {...props}
        />
    )
})

export type ToggleGroupProps = Omit<BaseToggleGroup.Props, 'ref' | 'render' | 'className'> & {
    variant?: ToggleVariant
    size?: ButtonSize
    className?: string
    required?: boolean
}

export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(function ToggleGroup(
    {
        variant = 'default',
        size = 'md',
        className,
        required = false,
        multiple = false,
        disabled,
        onValueChange,
        ...props
    },
    ref
) {
    return (
        <ToggleGroupVariantContext.Provider value={variant}>
            <BaseToggleGroup
                ref={ref}
                render={<ButtonGroup variant={variant} size={size} disabled={disabled} className={className} />}
                {...props}
                disabled={disabled}
                multiple={multiple}
                onValueChange={(value, details) => {
                    if (required && value.length === 0) {
                        details.cancel()
                        return
                    }
                    onValueChange?.(value, details)
                }}
            />
        </ToggleGroupVariantContext.Provider>
    )
})

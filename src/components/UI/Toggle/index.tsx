import React from 'react'
import { Toggle as BaseToggle } from '@base-ui/react/toggle'
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group'
import { cn } from '../../../utils'
import { Button, ButtonGroup } from '../Button'
import type { ButtonAppearance, ButtonSize, ButtonVariant } from '../Button'

export type ToggleAppearance = ButtonAppearance
export type ToggleVariant = ButtonVariant

const flatToggleText = 'text-secondary data-[pressed]:text-primary'

const ToggleGroupLookContext = React.createContext<{ appearance: ToggleAppearance; variant: ToggleVariant } | null>(
    null
)

export type ToggleProps = Omit<BaseToggle.Props, 'ref' | 'render' | 'className'> & {
    appearance?: ToggleAppearance
    variant?: ToggleVariant
    size?: ButtonSize
    className?: string
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
    { appearance: ownAppearance = 'flat', variant: ownVariant = 'secondary', size = 'md', className, ...props },
    ref
) {
    const group = React.useContext(ToggleGroupLookContext)
    const appearance = group?.appearance ?? ownAppearance
    const variant = group?.variant ?? ownVariant
    return (
        <BaseToggle
            ref={ref}
            render={
                <Button
                    appearance={appearance}
                    variant={variant}
                    size={size}
                    className={cn(appearance === 'flat' && variant === 'secondary' && flatToggleText, className)}
                />
            }
            {...props}
        />
    )
})

export type ToggleGroupProps = Omit<BaseToggleGroup.Props, 'ref' | 'render' | 'className'> & {
    appearance?: ToggleAppearance
    variant?: ToggleVariant
    size?: ButtonSize
    className?: string
    required?: boolean
}

export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(function ToggleGroup(
    {
        appearance = 'raised',
        variant = 'secondary',
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
    const look = React.useMemo(() => ({ appearance, variant }), [appearance, variant])
    return (
        <ToggleGroupLookContext.Provider value={look}>
            <BaseToggleGroup
                ref={ref}
                render={
                    <ButtonGroup
                        appearance={appearance}
                        variant={variant}
                        size={size}
                        disabled={disabled}
                        className={className}
                    />
                }
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
        </ToggleGroupLookContext.Provider>
    )
})

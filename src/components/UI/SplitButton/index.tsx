import React from 'react'
import { IconChevronDown } from '@posthog/icons'
import { Button, ButtonGroup, IconButton } from '../Button'
import type { ButtonAppearance, ButtonGroupProps, ButtonProps, ButtonSize } from '../Button'
import { Menu } from '../Menu'
import type { MenuPopupProps } from '../Menu'

type SplitButtonContextValue = {
    disabled: boolean
    appearance: ButtonAppearance
    size: ButtonSize
}

const SplitButtonContext = React.createContext<SplitButtonContextValue>({
    disabled: false,
    appearance: 'flat',
    size: 'md',
})

const flatTriggerPadding: Record<ButtonSize, string> = { sm: 'px-[3px]', md: 'px-[5px]', lg: 'px-[7px]' }

const raisedTriggerPadding: Record<ButtonSize, string> = {
    sm: '[&>[data-button-face]]:px-[3px]',
    md: '[&>[data-button-face]]:px-[5px]',
    lg: '[&>[data-button-face]]:px-[7px]',
}

export type SplitButtonRootProps = Omit<React.ComponentProps<typeof Menu.Root>, 'children'> &
    Pick<ButtonGroupProps, 'appearance' | 'variant' | 'size' | 'className' | 'aria-label' | 'children'> & {
        disabled?: boolean
    }

function Root({
    appearance = 'raised',
    variant = 'secondary',
    size = 'md',
    className,
    disabled = false,
    children,
    'aria-label': label,
    ...props
}: SplitButtonRootProps): JSX.Element {
    const context = React.useMemo(() => ({ disabled, appearance, size }), [disabled, appearance, size])
    return (
        <SplitButtonContext.Provider value={context}>
            <Menu.Root {...props}>
                <ButtonGroup
                    appearance={appearance}
                    variant={variant}
                    size={size}
                    disabled={disabled}
                    className={className}
                    aria-label={label}
                >
                    {children}
                </ButtonGroup>
            </Menu.Root>
        </SplitButtonContext.Provider>
    )
}

const Action = React.forwardRef<HTMLElement, ButtonProps>(function SplitButtonAction(props, ref) {
    const { disabled } = React.useContext(SplitButtonContext)
    return <Button ref={ref} {...props} disabled={disabled || props.disabled} />
})

export type SplitButtonTriggerProps = Omit<React.ComponentProps<typeof Menu.Trigger>, 'render' | 'children'>

const Trigger = React.forwardRef<HTMLButtonElement, SplitButtonTriggerProps>(function SplitButtonTrigger(
    { 'aria-label': label = 'More actions', ...props },
    ref
) {
    const { disabled, appearance, size } = React.useContext(SplitButtonContext)
    return (
        <Menu.Trigger
            ref={ref}
            {...props}
            disabled={disabled || props.disabled}
            render={
                <IconButton
                    icon={<IconChevronDown className="scale-125" />}
                    aria-label={label}
                    className={appearance === 'raised' ? raisedTriggerPadding[size] : flatTriggerPadding[size]}
                />
            }
        />
    )
})

const Popup = React.forwardRef<HTMLDivElement, MenuPopupProps>(function SplitButtonPopup(props, ref) {
    return <Menu.Popup ref={ref} align="end" {...props} />
})

export const SplitButton = { Root, Button: Action, Trigger, Popup }

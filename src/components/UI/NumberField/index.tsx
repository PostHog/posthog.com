import React from 'react'
import { NumberField as BaseNumberField } from '@base-ui/react/number-field'
import { IconChevronDown } from '@posthog/icons'
import { cn } from '../../../utils'
import {
    fieldSizes,
    fieldStepperSizes,
    bareInput,
    fieldAppearanceShape,
    fieldDivider,
    fieldGroupSurface,
} from '../styles'
import type { FieldAppearance, FieldSize } from '../styles'
import { mergeClassName, withClassName } from '../utils'

const Root = withClassName(BaseNumberField.Root, 'flex flex-col gap-1')

const ScrubArea = withClassName(
    BaseNumberField.ScrubArea,
    'self-start cursor-ew-resize data-[disabled]:cursor-not-allowed data-[readonly]:cursor-default [&_label]:cursor-[inherit]'
)

const scrubCursorGlyph = (
    <svg
        viewBox="0 0 26 14"
        width={26}
        height={14}
        aria-hidden
        className="block -translate-x-1/2 -translate-y-1/2 fill-black stroke-white"
    >
        <path d="M1 7l5.5-5v3.5h13V2L25 7l-5.5 5V8.5h-13V12z" strokeLinejoin="round" />
    </svg>
)

const ScrubAreaCursor = React.forwardRef<HTMLSpanElement, BaseNumberField.ScrubAreaCursor.Props>(
    function NumberFieldScrubAreaCursor({ className, children = scrubCursorGlyph, ...props }, ref) {
        return (
            <BaseNumberField.ScrubAreaCursor
                ref={ref}
                className={mergeClassName('z-50 drop-shadow', className)}
                {...props}
            >
                {children}
            </BaseNumberField.ScrubAreaCursor>
        )
    }
)

const SizeContext = React.createContext<FieldSize>('md')
const AppearanceContext = React.createContext<FieldAppearance>('inset')
const Input = React.forwardRef<HTMLInputElement, Omit<BaseNumberField.Input.Props, 'size'>>(function NumberFieldInput(
    { className, ...props },
    ref
) {
    const size = React.useContext(SizeContext)
    const appearance = React.useContext(AppearanceContext)
    return (
        <BaseNumberField.Input
            ref={ref}
            className={mergeClassName(
                `${bareInput} ${fieldSizes[size]} h-auto tabular-nums data-[disabled]:cursor-not-allowed ${fieldAppearanceShape[appearance]}`,
                className
            )}
            {...props}
        />
    )
})

const stepButton =
    'flex min-h-0 flex-1 select-none items-center justify-center text-secondary transition-colors duration-100 ease-out hover:bg-[rgb(var(--text-primary)/0.07)] hover:text-primary active:bg-[rgb(var(--text-primary)/0.1)] motion-reduce:transition-none data-[disabled]:cursor-not-allowed data-[disabled]:text-muted data-[disabled]:hover:bg-transparent'

const Increment = React.forwardRef<HTMLButtonElement, BaseNumberField.Increment.Props>(function NumberFieldIncrement(
    { className, children = <IconChevronDown aria-hidden className="size-3 rotate-180" />, ...props },
    ref
) {
    return (
        <BaseNumberField.Increment ref={ref} className={mergeClassName(stepButton, className)} {...props}>
            {children}
        </BaseNumberField.Increment>
    )
})

const Decrement = React.forwardRef<HTMLButtonElement, BaseNumberField.Decrement.Props>(function NumberFieldDecrement(
    { className, children = <IconChevronDown aria-hidden className="size-3" />, ...props },
    ref
) {
    return (
        <BaseNumberField.Decrement
            ref={ref}
            className={mergeClassName(`${stepButton} border-t ${fieldDivider}`, className)}
            {...props}
        >
            {children}
        </BaseNumberField.Decrement>
    )
})

const Steppers = ({ className }: { className?: string }): JSX.Element => {
    const size = React.useContext(SizeContext)
    const appearance = React.useContext(AppearanceContext)
    return (
        <span
            className={cn(
                `flex shrink-0 flex-col self-stretch ${fieldDivider} ${fieldStepperSizes[size]}`,
                appearance === 'inset' && 'border-l',
                className
            )}
        >
            <Increment />
            <Decrement />
        </span>
    )
}

const defaultGroupContent = (
    <>
        <Input />
        <Steppers />
    </>
)

export type NumberFieldGroupProps = BaseNumberField.Group.Props & { size?: FieldSize; appearance?: FieldAppearance }
const Group = React.forwardRef<HTMLDivElement, NumberFieldGroupProps>(function NumberFieldGroup(
    { size = 'md', appearance = 'inset', className, children = defaultGroupContent, ...props },
    ref
) {
    return (
        <SizeContext.Provider value={size}>
            <AppearanceContext.Provider value={appearance}>
                <BaseNumberField.Group
                    ref={ref}
                    className={mergeClassName(
                        `${fieldGroupSurface(appearance)} flex w-32 overflow-hidden ${
                            fieldSizes[size]
                        } px-0 text-primary ${fieldAppearanceShape[appearance]}`,
                        className
                    )}
                    {...props}
                >
                    {children}
                </BaseNumberField.Group>
            </AppearanceContext.Provider>
        </SizeContext.Provider>
    )
})

export const NumberField = { Root, ScrubArea, ScrubAreaCursor, Group, Input, Steppers, Increment, Decrement }

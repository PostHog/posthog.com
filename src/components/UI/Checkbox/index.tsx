import React from 'react'
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group'
import { cn } from '../../../utils'
import { controlSurface, disabledControl, focusRing } from '../styles'
import { mergeClassName, withClassName } from '../utils'

const checkboxBox = cn(
    'group flex size-5 shrink-0 items-center justify-center rounded text-white',
    controlSurface,
    'transition-[background-color,border-color] duration-150 ease-out motion-reduce:transition-none',
    'data-[checked]:shadow-none data-[indeterminate]:shadow-none dark:data-[checked]:shadow-none dark:data-[indeterminate]:shadow-none',
    'data-[checked]:border-button data-[checked]:bg-orange dark:data-[checked]:border-button-dark dark:data-[checked]:bg-orange',
    'data-[indeterminate]:border-button data-[indeterminate]:bg-orange dark:data-[indeterminate]:border-button-dark dark:data-[indeterminate]:bg-orange',
    disabledControl
)

const Root = withClassName(BaseCheckbox.Root, cn(checkboxBox, focusRing))

const stroke =
    '[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-100 ease-out motion-reduce:transition-none'

const drawnGlyphs = (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden className="size-3">
        <path
            d="M2.5 6.5 5 9l4.5-5.5"
            pathLength={1}
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
                stroke,
                'group-data-[checked]:delay-75 group-data-[checked]:duration-200 group-data-[checked]:ease-out group-data-[checked]:[stroke-dashoffset:0]'
            )}
        />
        <path
            d="M3 6h6"
            pathLength={1}
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            className={cn(
                stroke,
                'group-data-[indeterminate]:delay-75 group-data-[indeterminate]:duration-200 group-data-[indeterminate]:ease-out group-data-[indeterminate]:[stroke-dashoffset:0]'
            )}
        />
    </svg>
)

const Indicator = React.forwardRef<HTMLSpanElement, BaseCheckbox.Indicator.Props>(function CheckboxIndicator(
    { className, children = drawnGlyphs, keepMounted = true, ...props },
    ref
) {
    return (
        <BaseCheckbox.Indicator
            ref={ref}
            keepMounted={keepMounted}
            className={mergeClassName('flex', className)}
            {...props}
        >
            {children}
        </BaseCheckbox.Indicator>
    )
})

type MarkProps = {
    checked?: boolean
    indeterminate?: boolean
    disabled?: boolean
    className?: string
}

const presenceAttribute = (present: boolean | undefined) => (present ? '' : undefined)

function Mark({ checked, indeterminate, disabled, className }: MarkProps): JSX.Element {
    return (
        <span
            aria-hidden
            data-checked={presenceAttribute(checked && !indeterminate)}
            data-indeterminate={presenceAttribute(indeterminate)}
            data-disabled={presenceAttribute(disabled)}
            className={cn(checkboxBox, 'pointer-events-none', className)}
        >
            <span className="flex">{drawnGlyphs}</span>
        </span>
    )
}

export const Checkbox = { Root, Indicator, Mark }

export const CheckboxGroup = withClassName(BaseCheckboxGroup, 'flex flex-col gap-2')

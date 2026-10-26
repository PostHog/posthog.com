import React from 'react'
import { Field as BaseField } from '@base-ui/react/field'
import { fieldAppearanceShape, fieldSizes, textInputFor } from '../styles'
import type { FieldAppearance, FieldSize } from '../styles'
import { mergeClassName, withClassName } from '../utils'

const Root = withClassName(BaseField.Root, 'flex flex-col gap-1')

const Label = withClassName(BaseField.Label, 'text-sm font-semibold text-primary data-[disabled]:text-muted')

export type FieldControlProps = Omit<BaseField.Control.Props, 'size'> & {
    size?: FieldSize
    appearance?: FieldAppearance
}

const Control = React.forwardRef<HTMLInputElement, FieldControlProps>(function FieldControl(
    { size = 'md', appearance = 'inset', className, ...props },
    ref
) {
    return (
        <BaseField.Control
            ref={ref}
            className={mergeClassName(
                `${textInputFor(appearance)} ${fieldSizes[size]} ${fieldAppearanceShape[appearance]}`,
                className
            )}
            {...props}
        />
    )
})

const Description = withClassName(BaseField.Description, 'm-0 text-[13px] text-secondary')

const errorReveal =
    'grid grid-rows-[1fr] transition-[grid-template-rows,opacity,margin-top] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] data-[ending-style]:duration-150 data-[starting-style]:-mt-1 data-[starting-style]:grid-rows-[0fr] data-[starting-style]:opacity-0 data-[ending-style]:-mt-1 data-[ending-style]:grid-rows-[0fr] data-[ending-style]:opacity-0 motion-reduce:transition-none'

const ErrorMessage = React.forwardRef<HTMLDivElement, Omit<BaseField.Error.Props, 'render'>>(function FieldError(
    { className, ...props },
    ref
) {
    return (
        <BaseField.Error
            ref={ref}
            className={mergeClassName(`m-0 text-[13px] text-red dark:text-yellow ${errorReveal}`, className)}
            render={(errorProps) => (
                <div {...errorProps}>
                    <span className="min-h-0 overflow-hidden">{errorProps.children}</span>
                </div>
            )}
            {...props}
        />
    )
})

export const Field = { Root, Label, Control, Description, Error: ErrorMessage, Validity: BaseField.Validity }

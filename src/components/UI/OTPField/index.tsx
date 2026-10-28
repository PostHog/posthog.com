import React from 'react'
import { OTPField as BaseOTPField } from '@base-ui/react/otp-field'
import { fieldAppearanceShape, textInputFor } from '../styles'
import type { FieldAppearance } from '../styles'
import { mergeClassName, withClassName } from '../utils'

const AppearanceContext = React.createContext<FieldAppearance>('inset')

export type OTPFieldRootProps = BaseOTPField.Root.Props & { appearance?: FieldAppearance }

const Root = React.forwardRef<HTMLDivElement, OTPFieldRootProps>(function OTPFieldRoot(
    { appearance = 'inset', className, ...props },
    ref
) {
    return (
        <AppearanceContext.Provider value={appearance}>
            <BaseOTPField.Root
                ref={ref}
                className={mergeClassName('group flex items-center gap-2', className)}
                {...props}
            />
        </AppearanceContext.Provider>
    )
})

const Input = React.forwardRef<HTMLInputElement, BaseOTPField.Input.Props>(function OTPFieldInput(
    { className, ...props },
    ref
) {
    const appearance = React.useContext(AppearanceContext)
    return (
        <BaseOTPField.Input
            ref={ref}
            className={mergeClassName(
                `${textInputFor(
                    appearance
                )} size-10 shrink-0 p-0 text-center text-lg font-semibold [@media(pointer:coarse)]:text-lg tabular-nums ${
                    fieldAppearanceShape[appearance]
                }`,
                className
            )}
            {...props}
        />
    )
})
const Separator = withClassName(
    BaseOTPField.Separator,
    'h-0.5 w-2.5 shrink-0 rounded-full bg-[rgb(var(--text-secondary))] group-data-[disabled]:opacity-50'
)

export const OTPField = { Root, Input, Separator }

import React from 'react'
import { Input as BaseInput } from '@base-ui/react/input'
import { fieldAppearanceShape, fieldSizes, textInputFor } from '../styles'
import type { FieldAppearance, FieldSize } from '../styles'
import { mergeClassName } from '../utils'

export type InputProps = Omit<BaseInput.Props, 'size'> & { size?: FieldSize; appearance?: FieldAppearance }

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
    { size = 'md', appearance = 'inset', className, ...props },
    ref
) {
    return (
        <BaseInput
            ref={ref}
            className={mergeClassName(
                `${textInputFor(appearance)} ${fieldSizes[size]} ${fieldAppearanceShape[appearance]}`,
                className
            )}
            {...props}
        />
    )
})

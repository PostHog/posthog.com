import React from 'react'
import { Input as BaseInput } from '@base-ui/react/input'
import { textInput, fieldSizes } from '../styles'
import type { FieldSize } from '../styles'
import { mergeClassName } from '../utils'

export type InputProps = Omit<BaseInput.Props, 'size'> & { size?: FieldSize }

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
    { size = 'md', className, ...props },
    ref
) {
    return <BaseInput ref={ref} className={mergeClassName(`${textInput} ${fieldSizes[size]}`, className)} {...props} />
})

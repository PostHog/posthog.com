import React, { forwardRef } from 'react'

export type AutosizeInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    /** Classes for the input. Kept from react-input-autosize, which this replaces. */
    inputClassName?: string
}

/**
 * A text input as wide as its value. `field-sizing: content` sizes it exactly where the browser
 * supports it; elsewhere the `size` attribute sizes it in characters.
 */
const AutosizeInput = forwardRef<HTMLInputElement, AutosizeInputProps>(function AutosizeInput(
    { inputClassName = '', className = '', value, placeholder, ...props },
    ref
) {
    const size = Math.max(String(value ?? '').length, placeholder?.length ?? 0, 1)
    return (
        <input
            ref={ref}
            value={value}
            placeholder={placeholder}
            size={size}
            className={`[field-sizing:content] ${inputClassName} ${className}`}
            {...props}
        />
    )
})

export default AutosizeInput

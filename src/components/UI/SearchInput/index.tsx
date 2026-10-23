import React from 'react'
import { IconSearch, IconX } from '@posthog/icons'
import { Input } from '@base-ui/react/input'
import type { InputProps } from '../Input'
import { Kbd } from '../Kbd'
import { Spinner } from '../Spinner'
import { bareInput, fieldSizes, inputGroup, insetFocusRing } from '../styles'
import { cn } from '../../../utils'

const searchIconSizes = { sm: 'size-3.5', md: 'size-4', lg: 'size-5' } as const

export type SearchInputProps = Omit<InputProps, 'value' | 'defaultValue' | 'onValueChange' | 'className' | 'render'> & {
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
    loading?: boolean
    loadingLabel?: string
    clearLabel?: string
    shortcut?: readonly string[]
    className?: string
    inputClassName?: string
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
    {
        value,
        defaultValue = '',
        onValueChange,
        size = 'md',
        loading = false,
        loadingLabel = 'Searching',
        clearLabel = 'Clear search',
        shortcut,
        className,
        inputClassName,
        disabled,
        readOnly,
        onKeyDown,
        onFocus,
        onBlur,
        ...props
    },
    ref
) {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const [focused, setFocused] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)
    const currentValue = value ?? internalValue
    const canClear = currentValue.length > 0 && !disabled && !readOnly

    function changeValue(nextValue: string) {
        if (value === undefined) setInternalValue(nextValue)
        onValueChange?.(nextValue)
    }

    function clear() {
        changeValue('')
        inputRef.current?.focus()
    }

    return (
        <div
            className={cn(inputGroup, fieldSizes[size], 'min-h-0 gap-2', className)}
            data-disabled={disabled ? '' : undefined}
            data-invalid={props['aria-invalid'] === true || props['aria-invalid'] === 'true' ? '' : undefined}
        >
            {loading ? (
                <Spinner size={size} label={loadingLabel} className="text-secondary" />
            ) : (
                <IconSearch aria-hidden="true" className={cn('shrink-0 text-secondary', searchIconSizes[size])} />
            )}
            <Input
                {...props}
                ref={inputRef}
                type="search"
                value={currentValue}
                disabled={disabled}
                readOnly={readOnly}
                onValueChange={changeValue}
                className={cn(
                    bareInput,
                    'text-inherit [&::-webkit-search-cancel-button]:appearance-none',
                    inputClassName
                )}
                onFocus={(event) => {
                    setFocused(true)
                    onFocus?.(event)
                }}
                onBlur={(event) => {
                    setFocused(false)
                    onBlur?.(event)
                }}
                onKeyDown={(event) => {
                    onKeyDown?.(event)
                    if (
                        event.key === 'Escape' &&
                        !event.defaultPrevented &&
                        !event.nativeEvent.isComposing &&
                        canClear
                    ) {
                        event.preventDefault()
                        event.stopPropagation()
                        clear()
                    }
                }}
            />
            {canClear ? (
                <button
                    type="button"
                    aria-label={clearLabel}
                    className={cn(
                        'flex size-5 shrink-0 items-center justify-center rounded text-secondary hover:bg-[rgb(var(--text-primary)/0.07)] hover:text-primary',
                        insetFocusRing
                    )}
                    onClick={clear}
                >
                    <IconX aria-hidden="true" className="size-3.5" />
                </button>
            ) : shortcut && !currentValue && !focused ? (
                <Kbd.Shortcut keys={shortcut} size={size === 'lg' ? 'md' : 'sm'} className="shrink-0" />
            ) : null}
        </div>
    )
})

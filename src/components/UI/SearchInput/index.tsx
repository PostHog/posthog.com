import React from 'react'
import { IconSearch, IconX } from '@posthog/icons'
import { Input } from '@base-ui/react/input'
import type { InputProps } from '../Input'
import { Kbd } from '../Kbd'
import { Spinner } from '../Spinner'
import { IconButton } from '../Button'
import {
    bareInput,
    fieldIconButtonIconSize,
    fieldIconButtonSizes,
    fieldSizes,
    fieldAppearanceShape,
    iconSizes,
    searchGroupFor,
    searchRoundPadding,
} from '../styles'
import type { SearchAppearance } from '../styles'
import { cn } from '../../../utils'

const clearButtonEdge = {
    box: { sm: '-mr-[6px]', md: '-mr-[7px]', lg: '-mr-[9px]' },
    round: { sm: '-mr-[10px] rounded-full', md: '-mr-[13px] rounded-full', lg: '-mr-[17px] rounded-full' },
    line: { sm: '', md: '', lg: '' },
} as const

export type SearchInputProps = Omit<
    InputProps,
    'value' | 'defaultValue' | 'onValueChange' | 'className' | 'render' | 'appearance'
> & {
    appearance?: SearchAppearance
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
        appearance = 'inset',
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

    const round = appearance === 'pill' || appearance === 'floating'

    function clear() {
        changeValue('')
        inputRef.current?.focus()
    }

    return (
        <div
            className={cn(
                searchGroupFor(appearance),
                fieldSizes[size],
                round && searchRoundPadding[size],
                'min-h-0 gap-2',
                !round && fieldAppearanceShape[appearance],
                className
            )}
            data-disabled={disabled ? '' : undefined}
            data-invalid={props['aria-invalid'] === true || props['aria-invalid'] === 'true' ? '' : undefined}
            onMouseDown={(event) => {
                if ((event.target as HTMLElement).closest('input, button')) return
                event.preventDefault()
                inputRef.current?.focus()
            }}
        >
            {loading ? (
                <Spinner size={size} label={loadingLabel} className="text-secondary" />
            ) : (
                <IconSearch aria-hidden="true" className={cn('shrink-0 text-secondary', iconSizes[size])} />
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
                <IconButton
                    appearance="flat"
                    type="button"
                    size={fieldIconButtonIconSize[size]}
                    aria-label={clearLabel}
                    icon={<IconX />}
                    className={cn(
                        fieldIconButtonSizes[size],
                        'mt-0 self-center',
                        clearButtonEdge[round ? 'round' : appearance === 'line' ? 'line' : 'box'][size]
                    )}
                    onClick={clear}
                />
            ) : shortcut && !currentValue && !focused ? (
                <Kbd.Shortcut keys={shortcut} size={size === 'lg' ? 'md' : 'sm'} className="shrink-0" />
            ) : null}
        </div>
    )
})

import React from 'react'
import { IconCheck, IconX } from '@posthog/icons'
import OSButton from 'components/OSButton'

type SelectOption = {
    label: string
    value: any
}

export default function CreatableMultiSelect({
    label,
    placeholder,
    description,
    options,
    value,
    onChange,
    onBlur,
    touched,
    error,
    allowCreate = true,
    onCreate,
    hideLabel = false,
    required = true,
}: {
    label: string
    placeholder?: string
    description?: string
    options: SelectOption[]
    value: any[]
    onChange: (next: any[]) => void
    onBlur?: () => void
    touched?: boolean
    error?: string
    allowCreate?: boolean
    hideLabel?: boolean
    onCreate?: (value: string) => void
    required?: boolean
}): JSX.Element {
    const [query, setQuery] = React.useState('')
    const [focused, setFocused] = React.useState(false)
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1)
    const listRef = React.useRef<HTMLDivElement | null>(null)

    const filtered = React.useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return options
        return options.filter((opt) => opt.label.toLowerCase().includes(q))
    }, [query, options])

    React.useEffect(() => {
        if (!focused || filtered.length === 0) {
            setHighlightedIndex(-1)
        }
    }, [filtered, focused])

    React.useEffect(() => {
        if (!listRef.current || highlightedIndex < 0) return
        const child = listRef.current.children[highlightedIndex] as HTMLElement | undefined
        child?.scrollIntoView({ block: 'nearest' })
    }, [highlightedIndex])

    const addValue = (valueToAdd: any) => {
        if (!valueToAdd) return
        const next = Array.from(new Set([...(value || []), valueToAdd]))
        onChange(next)
        setQuery('')
    }

    const removeValue = (item: any) => {
        onChange((value || []).filter((v) => v !== item))
    }

    const createNewOption = (label: string) => {
        const normalized = label.trim()
        if (!normalized) return
        onCreate?.(normalized)
        addValue(normalized)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            if (highlightedIndex >= 0 && highlightedIndex < filtered.length) {
                addValue(filtered[highlightedIndex].value)
            } else if (query.trim()) {
                if (allowCreate) {
                    createNewOption(query)
                } else {
                    const candidate =
                        filtered.find((opt) => opt.label.toLowerCase() === query.trim().toLowerCase()) || filtered[0]
                    if (candidate) addValue(candidate.value)
                }
            }
        } else if (e.key === 'Backspace' && !query && value.length > 0) {
            removeValue(value[value.length - 1])
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            setHighlightedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1))
        } else if (e.key === 'Escape') {
            e.preventDefault()
            setFocused(false)
        }
    }

    const canCreate =
        allowCreate && query.trim() && !options.some((o) => o.label.toLowerCase() === query.trim().toLowerCase())

    return (
        <div className="flex flex-col space-y-1">
            {!hideLabel && (
                <div className="w-full">
                    <label className="text-[15px]">
                        <span>
                            {label}
                            {required && <span className="text-red dark:text-yellow ml-0.5">*</span>}
                        </span>
                    </label>
                    {description && <p className="text-sm text-secondary m-0 mt-0.5">{description}</p>}
                </div>
            )}
            <div
                className={`bg-primary border rounded ring-0 px-2.5 py-1 ${
                    touched && error ? 'border-red dark:border-yellow' : 'border-primary'
                }`}
                onMouseDown={(e) => {
                    if ((e.target as HTMLElement).tagName !== 'INPUT') {
                        e.preventDefault()
                    }
                }}
            >
                <div className="flex flex-wrap gap-1">
                    {(value || []).map((v) => {
                        const chip = options.find((o) => o.value === v) || { label: String(v), value: v }
                        return (
                            <span
                                key={String(v)}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-primary text-xs bg-accent h-[28px]"
                            >
                                <span>{chip.label}</span>
                                <button
                                    type="button"
                                    aria-label={`Remove ${String(v)}`}
                                    onClick={() => removeValue(v)}
                                    className="text-secondary hover:text-primary size-3"
                                >
                                    <IconX />
                                </button>
                            </span>
                        )
                    })}
                    <input
                        className="flex-1 min-w-[8rem] bg-transparent outline-none border-0 ring-0 focus:ring-0 text-[15px] px-0 py-0.5"
                        placeholder={placeholder || label}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => {
                            setTimeout(() => setFocused(false), 200)
                            onBlur?.()
                        }}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                {filtered.length > 0 && focused && (
                    <div
                        ref={listRef}
                        role="listbox"
                        className="mt-1 max-h-40 overflow-auto rounded border border-primary bg-primary"
                    >
                        {filtered.map((opt, idx) => {
                            const isSelected = (value || []).includes(opt.value)
                            return (
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={idx === highlightedIndex}
                                    key={`${String(opt.value)}-${opt.label}`}
                                    className={`block w-full text-left px-2.5 py-1 text-sm ${
                                        idx === highlightedIndex ? 'bg-accent' : 'hover:bg-accent'
                                    }`}
                                    onMouseEnter={() => setHighlightedIndex(idx)}
                                    onMouseDown={(e) => {
                                        e.preventDefault()
                                        if (isSelected) {
                                            removeValue(opt.value)
                                        } else {
                                            addValue(opt.value)
                                        }
                                    }}
                                >
                                    <span className="flex items-center justify-between gap-2">
                                        <span>{opt.label}</span>
                                        {isSelected && <IconCheck className="size-4 text-primary opacity-80" />}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                )}
                {canCreate && (
                    <div className="mt-1">
                        <OSButton
                            size="sm"
                            variant="default"
                            onMouseDown={(e) => {
                                e.preventDefault()
                                createNewOption(query)
                            }}
                        >
                            Add "{query.trim()}"
                        </OSButton>
                    </div>
                )}
            </div>
            {touched && error && <p className="text-sm text-red dark:text-yellow m-0 mt-1">{error}</p>}
        </div>
    )
}

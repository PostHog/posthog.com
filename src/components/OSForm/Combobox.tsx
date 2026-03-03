import React from 'react'
import { IconX, IconCheck } from '@posthog/icons'
import OSButton from 'components/OSButton'

type SelectOption = {
    label: string
    value: any
}

export function Combobox({
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
}) {
    const [availableOptions, setAvailableOptions] = React.useState<SelectOption[]>(options)
    const [query, setQuery] = React.useState<string>('')
    const [focused, setFocused] = React.useState<boolean>(false)
    const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1)
    const listRef = React.useRef<HTMLDivElement | null>(null)

    const filtered = React.useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return availableOptions
        return availableOptions.filter((opt) => opt.label.toLowerCase().includes(q))
    }, [query, availableOptions])

    React.useEffect(() => {
        // Clamp or reset highlighted index when the filtered list changes or focus toggles
        if (!focused || filtered.length === 0) {
            setHighlightedIndex(-1)
            return
        }
        setHighlightedIndex((prev) => (prev >= 0 && prev < filtered.length ? prev : -1))
    }, [filtered, focused])

    React.useEffect(() => {
        if (!listRef.current) return
        if (highlightedIndex < 0) return
        const child = listRef.current.children[highlightedIndex] as HTMLElement | undefined
        child?.scrollIntoView({ block: 'nearest' })
    }, [highlightedIndex])

    const addValueByValue = (valueToAdd: any) => {
        if (!valueToAdd) return
        const next = Array.from(new Set([...(value || []), valueToAdd]))
        onChange(next)
        setQuery('')
    }

    const createAndAdd = (labelText: string) => {
        const normalized = labelText.trim()
        if (!normalized) return
        const newOption: SelectOption = { label: normalized, value: normalized }
        setAvailableOptions((prev) => {
            if (prev.find((o) => o.value === newOption.value)) {
                return prev
            }
            return [...prev, newOption]
        })
        addValueByValue(newOption.value)
    }

    const removeValue = (item: any) => {
        onChange((value || []).filter((v) => v !== item))
    }

    return (
        <div className="flex flex-col space-y-1">
            <div className="w-full">
                <label className="text-[15px]">
                    <span>
                        {label}
                        <span className="text-red dark:text-yellow ml-0.5">*</span>
                    </span>
                </label>
                {description && <p className="text-sm text-secondary m-0 mt-0.5">{description}</p>}
            </div>
            <div
                className={`bg-primary border border-primary rounded ring-0 px-2.5 py-2 ${
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
                        const chip =
                            availableOptions.find((o) => o.value === v) ||
                            ({ label: String(v), value: v } as SelectOption)
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
                            setTimeout(() => setFocused(false), 0)
                            onBlur?.()
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                const hasHighlighted = highlightedIndex >= 0 && highlightedIndex < filtered.length
                                if (hasHighlighted) {
                                    addValueByValue(filtered[highlightedIndex].value)
                                } else {
                                    if (allowCreate) {
                                        createAndAdd(query)
                                    } else {
                                        const candidate =
                                            filtered.find(
                                                (opt) => opt.label.toLowerCase() === query.trim().toLowerCase()
                                            ) || filtered[0]
                                        if (candidate) {
                                            addValueByValue(candidate.value)
                                        }
                                    }
                                }
                            } else if (e.key === 'Backspace' && !query && value.length > 0) {
                                removeValue(value[value.length - 1])
                            } else if (e.key === 'ArrowDown') {
                                e.preventDefault()
                                if (!focused) setFocused(true)
                                setHighlightedIndex((prev) => {
                                    const next = prev + 1
                                    if (filtered.length === 0) return -1
                                    return next >= filtered.length ? 0 : next
                                })
                            } else if (e.key === 'ArrowUp') {
                                e.preventDefault()
                                if (!focused) setFocused(true)
                                setHighlightedIndex((prev) => {
                                    if (filtered.length === 0) return -1
                                    const next = prev - 1
                                    if (prev < 0) return filtered.length - 1
                                    return next < 0 ? filtered.length - 1 : next
                                })
                            } else if (e.key === 'Escape') {
                                e.preventDefault()
                                setFocused(false)
                                setHighlightedIndex(-1)
                            }
                        }}
                    />
                </div>
                {filtered.length > 0 && focused && (
                    <div
                        ref={listRef}
                        role="listbox"
                        className="mt-1 max-h-40 overflow-auto rounded border border-primary bg-primary focus:outline-none"
                    >
                        {filtered.map((opt, idx) => (
                            <button
                                type="button"
                                role="option"
                                aria-selected={idx === highlightedIndex}
                                key={`${String(opt.value)}-${opt.label}`}
                                className={`block w-full text-left px-2.5 py-1 text-sm focus:outline-none ${
                                    idx === highlightedIndex ? 'bg-accent' : 'hover:bg-accent'
                                }`}
                                onMouseEnter={() => setHighlightedIndex(idx)}
                                onMouseDown={(e) => {
                                    e.preventDefault()
                                    addValueByValue(opt.value)
                                }}
                            >
                                <span className="flex items-center justify-between gap-2">
                                    <span>{opt.label}</span>
                                    {(value || []).includes(opt.value) && (
                                        <span
                                            className="inline-flex items-center justify-center"
                                            onMouseDown={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                removeValue(opt.value)
                                            }}
                                            aria-label="Deselect"
                                            title="Deselect"
                                            role="button"
                                        >
                                            <IconCheck className="size-4 text-primary opacity-80 cursor-pointer" />
                                        </span>
                                    )}
                                </span>
                            </button>
                        ))}
                    </div>
                )}
                {allowCreate &&
                    query &&
                    !availableOptions.some((o) => o.label === query.trim() || String(o.value) === query.trim()) && (
                        <div className="mt-1">
                            <OSButton
                                size="sm"
                                variant="default"
                                onMouseDown={(e) => {
                                    e.preventDefault()
                                    createAndAdd(query)
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

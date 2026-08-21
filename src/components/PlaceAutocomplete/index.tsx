import { IconPin } from '@posthog/icons'
import OSInput from 'components/OSForm/input'
import React, { useEffect, useRef, useState } from 'react'
import { PlaceSuggestion, usePlaceSuggestions } from './usePlaceSuggestions'

export type { PlaceSuggestion }

interface PlaceAutocompleteProps {
    value: string
    /** Fires on every keystroke and on selection – free text stays allowed */
    onChange: (value: string) => void
    /** Fires only when a Mapbox suggestion is picked, with its country code */
    onSelect?: (place: PlaceSuggestion) => void
    label?: string
    name?: string
    placeholder?: string
    description?: string
    tooltip?: string | React.ReactNode
    error?: string
    /** Defaults to GATSBY_MAPBOX_TOKEN; without a token this is a plain text input */
    token?: string
    types?: string
    direction?: 'row' | 'column'
    size?: 'sm' | 'md' | 'lg'
    dataScheme?: 'primary' | 'secondary' | 'tertiary'
    className?: string
}

/**
 * Location field with Mapbox place suggestions – the same dropdown the people map
 * search uses, so a location picked here geocodes to a pin on /people/map.
 */
export default function PlaceAutocomplete({
    value,
    onChange,
    onSelect,
    label = 'Location',
    name = 'location',
    placeholder = 'Start typing a city or country…',
    description,
    tooltip,
    error,
    token,
    types,
    direction = 'column',
    size = 'md',
    dataScheme = 'primary',
    className = '',
}: PlaceAutocompleteProps): JSX.Element {
    const [isOpen, setIsOpen] = useState(false)
    const [highlightIndex, setHighlightIndex] = useState(-1)
    const containerRef = useRef<HTMLDivElement>(null)
    const mapboxToken = token ?? process.env.GATSBY_MAPBOX_TOKEN
    // The dropdown only opens on typing, and suggestions are only fetched while it's
    // open, so loading a saved location (or picking a suggestion) costs no requests.
    const { suggestions, resetSession } = usePlaceSuggestions(value ?? '', mapboxToken, { types, enabled: isOpen })

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        window.addEventListener('click', onClick)
        return () => window.removeEventListener('click', onClick)
    }, [])

    const commit = (suggestion: PlaceSuggestion) => {
        setIsOpen(false)
        setHighlightIndex(-1)
        onChange(suggestion.label)
        onSelect?.(suggestion)
        resetSession()
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen || suggestions.length === 0) return
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setHighlightIndex((idx) => (idx + 1) % suggestions.length)
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setHighlightIndex((idx) => (idx - 1 + suggestions.length) % suggestions.length)
        } else if (e.key === 'Enter') {
            e.preventDefault()
            const suggestion = suggestions[highlightIndex] || suggestions[0]
            if (suggestion) commit(suggestion)
        } else if (e.key === 'Escape') {
            setIsOpen(false)
        }
    }

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <OSInput
                label={label}
                name={name}
                value={value ?? ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange(e.target.value)
                    setIsOpen(true)
                    setHighlightIndex(-1)
                }}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                description={description}
                tooltip={tooltip}
                error={error}
                touched={!!error}
                direction={direction}
                size={size}
                dataScheme={dataScheme}
                showLabel={true}
                autoComplete="off"
                aria-autocomplete="list"
                aria-expanded={isOpen && suggestions.length > 0}
            />
            {isOpen && suggestions.length > 0 && (
                <ul
                    role="listbox"
                    data-scheme="primary"
                    className="not-prose list-none absolute z-30 left-0 right-0 top-full mt-1 max-h-60 overflow-auto rounded-md border border-primary bg-primary shadow-2xl p-1 m-0"
                >
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={suggestion.id}
                            role="option"
                            aria-selected={highlightIndex === index}
                            onMouseEnter={() => setHighlightIndex(index)}
                            onClick={() => commit(suggestion)}
                            title={suggestion.subtitle || suggestion.name}
                            className={`flex items-start gap-2 rounded px-2 py-1.5 cursor-pointer text-primary ${
                                highlightIndex === index ? 'bg-accent' : 'hover:bg-accent'
                            }`}
                        >
                            <IconPin className="size-4 mt-0.5 text-muted shrink-0" />
                            <div className="min-w-0 leading-tight">
                                <div className="text-sm text-primary truncate">{suggestion.name}</div>
                                {suggestion.subtitle && (
                                    <div className="text-xs text-secondary truncate">{suggestion.subtitle}</div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

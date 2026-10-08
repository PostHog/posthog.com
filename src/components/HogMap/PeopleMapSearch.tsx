import { AVATAR_FALLBACK_URL } from 'constants/index'
import { IconPin } from '@posthog/icons'
import React, { useEffect, useMemo, useRef, useState } from 'react'

interface EmployeeLike {
    squeakId?: string | number
    firstName?: string
    lastName?: string
    companyRole?: string
    location?: string
    country?: string
    avatar?: { url?: string }
}

interface LocationSuggestion {
    id: string
    name: string
    subtitle: string
}

type DropdownItem = { type: 'employee'; member: EmployeeLike } | { type: 'location'; suggestion: LocationSuggestion }

interface PeopleMapSearchProps {
    members: EmployeeLike[]
    token?: string
    value?: string
    placeholder?: string
    className?: string
    onSelectEmployee: (member: EmployeeLike) => void
    onSelectLocation: (label: string) => void
    onClear?: () => void
}

const fullName = (m: EmployeeLike): string => [m.firstName, m.lastName].filter(Boolean).join(' ')

// Session token for Search Box API billing (rotated after each selection)
const makeSessionToken = (): string =>
    typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)

// Map search box: matches team members by name first, then Mapbox places.
export default function PeopleMapSearch({
    members,
    token,
    value = '',
    placeholder = 'Search people or places…',
    className = '',
    onSelectEmployee,
    onSelectLocation,
    onClear,
}: PeopleMapSearchProps): JSX.Element {
    const [query, setQuery] = useState(value)
    const [locationResults, setLocationResults] = useState<LocationSuggestion[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [highlightIndex, setHighlightIndex] = useState(-1)
    const [sessionToken, setSessionToken] = useState(makeSessionToken)
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const abortRef = useRef<AbortController | null>(null)

    // Sync the input when the committed term changes (e.g. hash load)
    useEffect(() => {
        setQuery(value)
    }, [value])

    const employeeMatches = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return []
        return members.filter((m) => fullName(m).toLowerCase().includes(q)).slice(0, 6)
    }, [members, query])

    // Debounced Mapbox place suggestions
    useEffect(() => {
        const q = query.trim()
        const canSearch = typeof window !== 'undefined' && token && q.length >= 2
        if (!canSearch) {
            if (abortRef.current) {
                abortRef.current.abort()
                abortRef.current = null
            }
            setLocationResults([])
            return
        }
        const controller = new AbortController()
        abortRef.current = controller
        const handle = setTimeout(async () => {
            try {
                const url = new URL('https://api.mapbox.com/search/searchbox/v1/suggest')
                url.searchParams.set('q', q)
                url.searchParams.set('limit', '5')
                // Countries, regions, and cities only (Mapbox "place" == city/town)
                url.searchParams.set('types', 'country,region,place')
                url.searchParams.set('language', 'en')
                url.searchParams.set('session_token', sessionToken)
                url.searchParams.set('access_token', token as string)
                const resp = await fetch(url.toString(), { signal: controller.signal })
                const json = await resp.json()
                const feats = Array.isArray(json?.suggestions) ? json.suggestions : []
                setLocationResults(
                    feats.map((f: Record<string, any>) => ({
                        id: f.mapbox_id || f.feature_id || f.id,
                        name: f.name || f.place_formatted || f.description || 'Unknown',
                        subtitle: f.place_formatted || f.full_address || '',
                    }))
                )
            } catch {
                // ignore (including aborts)
            }
        }, 200)
        return () => {
            clearTimeout(handle)
            controller.abort()
        }
    }, [query, token, sessionToken])

    const items: DropdownItem[] = useMemo(
        () => [
            ...employeeMatches.map((member) => ({ type: 'employee' as const, member })),
            ...locationResults.map((suggestion) => ({ type: 'location' as const, suggestion })),
        ],
        [employeeMatches, locationResults]
    )

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        window.addEventListener('click', onClick)
        return () => window.removeEventListener('click', onClick)
    }, [])

    const commitItem = (item: DropdownItem) => {
        setIsOpen(false)
        setHighlightIndex(-1)
        if (item.type === 'employee') {
            setQuery(fullName(item.member))
            onSelectEmployee(item.member)
        } else {
            setQuery(item.suggestion.name)
            onSelectLocation(item.suggestion.name)
        }
        setSessionToken(makeSessionToken())
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen || items.length === 0) return
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setHighlightIndex((idx) => (idx + 1) % items.length)
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setHighlightIndex((idx) => (idx - 1 + items.length) % items.length)
        } else if (e.key === 'Enter') {
            e.preventDefault()
            const item = items[highlightIndex] || items[0]
            if (item) commitItem(item)
        } else if (e.key === 'Escape') {
            setIsOpen(false)
        }
    }

    const handleClear = () => {
        setQuery('')
        setLocationResults([])
        setIsOpen(false)
        setHighlightIndex(-1)
        onClear?.()
    }

    const hasEmployees = employeeMatches.length > 0
    const hasLocations = locationResults.length > 0

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                    setIsOpen(true)
                    setHighlightIndex(-1)
                }}
                onFocus={() => items.length > 0 && setIsOpen(true)}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                name="people-map-search"
                aria-autocomplete="list"
                aria-expanded={isOpen && items.length > 0}
                className="h-[34px] w-full min-w-[12rem] box-border rounded border border-primary bg-primary text-primary placeholder:text-secondary px-2 pr-7 text-sm leading-none outline-none focus:ring-2 focus:ring-orange"
            />
            {query && (
                <button
                    type="button"
                    onClick={handleClear}
                    aria-label="Clear search"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center size-5 rounded text-secondary hover:text-primary hover:bg-accent text-sm leading-none"
                >
                    ✕
                </button>
            )}
            {isOpen && items.length > 0 && (
                <ul
                    role="listbox"
                    className="not-prose list-none absolute z-30 mt-1 max-h-80 w-full overflow-auto rounded-md border border-primary bg-primary shadow-2xl p-1 m-0"
                >
                    {hasEmployees && (
                        <li className="select-none px-2 pt-1 pb-1 text-[11px] font-semibold uppercase tracking-wide leading-none text-muted">
                            Team members
                        </li>
                    )}
                    {employeeMatches.map((member, i) => {
                        const idx = i
                        const name = fullName(member)
                        const locationText =
                            member.country === 'world' ? 'Planet Earth' : member.location || member.country || ''
                        const subtitle = [member.companyRole, locationText].filter(Boolean).join(' · ')
                        return (
                            <li
                                key={`emp-${member.squeakId ?? name}`}
                                role="option"
                                aria-selected={highlightIndex === idx}
                                onMouseEnter={() => setHighlightIndex(idx)}
                                onClick={() => commitItem({ type: 'employee', member })}
                                className={`flex items-center gap-2 rounded px-2 py-1.5 cursor-pointer text-primary ${
                                    highlightIndex === idx ? 'bg-accent' : 'hover:bg-accent'
                                }`}
                            >
                                <img
                                    src={member.avatar?.url || AVATAR_FALLBACK_URL}
                                    alt={name}
                                    className="size-7 rounded-full object-cover bg-accent shrink-0"
                                />
                                <div className="min-w-0 leading-tight">
                                    <div className="text-sm font-semibold text-primary truncate">{name}</div>
                                    {subtitle && <div className="text-xs text-secondary truncate">{subtitle}</div>}
                                </div>
                            </li>
                        )
                    })}
                    {hasLocations && (
                        <li
                            className={`select-none px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide leading-none text-muted ${
                                hasEmployees ? 'pt-2 mt-1 border-t border-primary' : 'pt-1'
                            }`}
                        >
                            Places
                        </li>
                    )}
                    {locationResults.map((suggestion, i) => {
                        const idx = employeeMatches.length + i
                        return (
                            <li
                                key={`loc-${suggestion.id}`}
                                role="option"
                                aria-selected={highlightIndex === idx}
                                onMouseEnter={() => setHighlightIndex(idx)}
                                onClick={() => commitItem({ type: 'location', suggestion })}
                                title={suggestion.subtitle || suggestion.name}
                                className={`flex items-start gap-2 rounded px-2 py-1.5 cursor-pointer text-primary ${
                                    highlightIndex === idx ? 'bg-accent' : 'hover:bg-accent'
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
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

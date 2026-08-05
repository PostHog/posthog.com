import React, { useEffect, useRef, useState, useImperativeHandle } from 'react'
import { createRoot } from 'react-dom/client'
import type mapboxgl from 'mapbox-gl'
import { addPlace } from './data'
import { PlaceType } from './types'
import OSButton from 'components/OSButton'

interface SearchBarProps {
    token?: string
    onSelect?: (result: { longitude: number; latitude: number; label: string; address: string }) => void
    placeholder?: string
    className?: string
}

interface SearchResult {
    id: string
    name: string
    subtitle: string
    coordinates: null
}

export interface SearchBarHandle {
    clear: () => void
    focus: () => void
}

function SearchBarImpl(
    { token, onSelect, placeholder = 'Search city or place…', className = '' }: SearchBarProps,
    ref: React.Ref<SearchBarHandle>
) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [highlightIndex, setHighlightIndex] = useState(-1)
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const abortRef = useRef<AbortController | null>(null)
    const [sessionToken, setSessionToken] = useState('')

    const canSearch = typeof window !== 'undefined' && token && query.trim().length >= 2

    useImperativeHandle(ref, () => ({
        clear: () => {
            setQuery('')
            setResults([])
            setIsOpen(false)
            setHighlightIndex(-1)
            if (inputRef.current) {
                inputRef.current.value = ''
            }
        },
        focus: () => {
            inputRef.current?.focus()
        },
    }))

    // Create a session token for Search Box API billing
    useEffect(() => {
        const newToken =
            typeof crypto !== 'undefined' && crypto.randomUUID
                ? crypto.randomUUID()
                : Math.random().toString(36).slice(2) + Date.now().toString(36)
        setSessionToken(newToken)
    }, [])

    // Fetch suggestions with debounce
    useEffect(() => {
        if (!canSearch) {
            if (abortRef.current) {
                abortRef.current.abort()
                abortRef.current = null
            }
            setResults([])
            setIsOpen(false)
            setHighlightIndex(-1)
            return
        }
        const controller = new AbortController()
        abortRef.current = controller
        const handle = setTimeout(async () => {
            try {
                const url = new URL('https://api.mapbox.com/search/searchbox/v1/suggest')
                url.searchParams.set('q', query.trim())
                url.searchParams.set('limit', '8')
                url.searchParams.set('types', 'place,city,locality,neighborhood,street,address,poi,category')
                url.searchParams.set('language', 'en')
                url.searchParams.set('session_token', sessionToken)
                url.searchParams.set('access_token', token)
                const resp = await fetch(url.toString(), { signal: controller.signal })
                const json = await resp.json()
                const feats = Array.isArray(json?.suggestions) ? json.suggestions : []
                setResults(
                    feats.map((f: Record<string, unknown>) => {
                        // Build comprehensive address from multiple fields
                        const buildFullAddress = () => {
                            // Start with the most complete formatted address if available
                            if (f.full_address) return f.full_address
                            if (f.place_formatted) return f.place_formatted

                            // Otherwise build from parts
                            const parts: string[] = []

                            // Add address/street if available
                            if (f.address && typeof f.address === 'string') parts.push(f.address)

                            // Add context information (neighborhood, place, region, etc.)
                            if (f.context && typeof f.context === 'object' && f.context !== null) {
                                const context = f.context as Record<string, { name?: string }>
                                const contextParts = [
                                    context.neighborhood?.name,
                                    context.place?.name,
                                    context.region?.name,
                                    context.country?.name,
                                    context.postcode?.name,
                                ].filter(Boolean) as string[]
                                parts.push(...contextParts)
                            }

                            // Fallback to place_name or description
                            if (parts.length === 0) {
                                return f.place_name || f.description || ''
                            }

                            return parts.join(', ')
                        }

                        return {
                            id: f.mapbox_id || f.feature_id || f.id,
                            name:
                                f.name ||
                                f.full_address ||
                                f.place_formatted ||
                                f.description ||
                                f.place_name ||
                                'Unknown',
                            subtitle: buildFullAddress(),
                            coordinates: null,
                        }
                    })
                )
                setIsOpen(true)
                setHighlightIndex(-1)
            } catch (e) {
                // ignore
            }
        }, 200)
        return () => {
            clearTimeout(handle)
            controller.abort()
        }
    }, [query, token, sessionToken])

    // Close on outside click
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (!containerRef.current) return
            if (!containerRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        window.addEventListener('click', onClick)
        return () => window.removeEventListener('click', onClick)
    }, [])

    const handleSelect = async (item: SearchResult) => {
        console.log(item)
        try {
            setQuery(item.name)
            setIsOpen(false)
            setHighlightIndex(-1)
            if (!item?.id || !token) return
            const url = new URL(`https://api.mapbox.com/search/searchbox/v1/retrieve/${encodeURIComponent(item.id)}`)
            url.searchParams.set('session_token', sessionToken)
            url.searchParams.set('access_token', token)
            const resp = await fetch(url.toString())
            const json = await resp.json()
            console.log(json)
            const feat =
                (Array.isArray(json?.features) && json.features[0]) || json?.feature || json?.results?.[0] || null
            const coords = feat?.coordinates || feat?.geometry?.coordinates || null
            const resolvedName = feat?.name || feat?.properties?.name || feat?.place_name || item.name

            // Build comprehensive address from retrieve response
            const buildResolvedAddress = () => {
                const props = feat?.properties || {}

                // Try formatted addresses first
                if (props.full_address) return props.full_address
                if (props.place_formatted) return props.place_formatted
                if (feat?.place_name) return feat.place_name

                // Build from individual components
                const parts: string[] = []
                if (props.address) parts.push(props.address)

                // Add context fields
                if (props.context) {
                    const contextParts = [
                        props.context.neighborhood?.name,
                        props.context.place?.name,
                        props.context.region?.name,
                        props.context.country?.name,
                        props.context.postcode?.name,
                    ].filter(Boolean)
                    parts.push(...contextParts)
                }

                return parts.length > 0 ? parts.join(', ') : item.subtitle || ''
            }

            const resolvedAddress = buildResolvedAddress()
            let longitude = null
            let latitude = null
            if (coords) {
                if (Array.isArray(coords) && coords.length >= 2) {
                    longitude = coords[0]
                    latitude = coords[1]
                } else if (typeof coords?.longitude === 'number' && typeof coords?.latitude === 'number') {
                    longitude = coords.longitude
                    latitude = coords.latitude
                }
            }
            if (onSelect && longitude != null && latitude != null) {
                onSelect({ longitude, latitude, label: resolvedName, address: resolvedAddress })
            }
        } catch (e) {
            // ignore
        } finally {
            // Start a new session token after selection as per session semantics
            const newToken =
                typeof crypto !== 'undefined' && crypto.randomUUID
                    ? crypto.randomUUID()
                    : Math.random().toString(36).slice(2) + Date.now().toString(36)
            setSessionToken(newToken)
        }
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen || results.length === 0) return
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setHighlightIndex((idx) => (idx + 1) % results.length)
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setHighlightIndex((idx) => (idx - 1 + results.length) % results.length)
        } else if (e.key === 'Enter') {
            e.preventDefault()
            const item = results[highlightIndex] || results[0]
            if (item) {
                handleSelect(item)
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false)
        }
    }

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => results.length > 0 && setIsOpen(true)}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                className="w-72 rounded border border-primary bg-primary text-primary placeholder:text-secondary px-3 py-2 outline-none focus:ring-2 focus:ring-orange shadow-lg"
                aria-autocomplete="list"
                aria-expanded={isOpen}
                aria-controls="map-search-list"
            />
            {isOpen && results.length > 0 && (
                <ul
                    id="map-search-list"
                    role="listbox"
                    className="absolute mt-1 max-h-72 w-full overflow-auto rounded border border-primary bg-primary shadow-2xl z-20"
                >
                    {results.map((item, idx) => (
                        <li
                            key={item.id}
                            role="option"
                            aria-selected={highlightIndex === idx}
                            className={`px-3 py-2 cursor-pointer ${highlightIndex === idx ? 'bg-accent' : ''}`}
                            onMouseEnter={() => setHighlightIndex(idx)}
                            onMouseLeave={() => setHighlightIndex(-1)}
                            onClick={() => handleSelect(item)}
                            title={item.subtitle || item.name}
                        >
                            <div className="text-sm font-semibold text-primary">{item.name}</div>
                            <div className="text-xs text-secondary mt-0.5">
                                {item.subtitle || 'No address available'}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

const SearchBar = React.forwardRef<SearchBarHandle, SearchBarProps>(SearchBarImpl)
SearchBar.displayName = 'SearchBar'
export default SearchBar

interface CreateSearchMarkerParams {
    map: mapboxgl.Map
    getMapbox: () => typeof mapboxgl
    longitude: number
    latitude: number
    label: string
    address: string
    prevMarker: mapboxgl.Marker | null
    searchRef: React.RefObject<SearchBarHandle>
    getJwt: () => Promise<string | null>
}

// Helper to create and manage a one-off search marker with popup on a Mapbox map
export function createSearchMarker({
    map,
    getMapbox,
    longitude,
    latitude,
    label,
    address,
    prevMarker,
    searchRef,
    getJwt,
}: CreateSearchMarkerParams): mapboxgl.Marker | null {
    if (!map) return null
    // Recenter and zoom in a bit
    try {
        map.easeTo({
            center: [longitude, latitude],
            zoom: Math.max(10, map.getZoom ? map.getZoom() : 10),
        })
    } catch {
        console.error('Error easing to center')
    }
    const mapboxgl = getMapbox && getMapbox()
    if (!mapboxgl) return null
    // Remove previous marker if provided
    if (prevMarker) {
        try {
            prevMarker.remove()
        } catch {
            console.error('Error removing previous search marker')
        }
    }
    // Create marker element using Tailwind classes
    const el = document.createElement('div')
    el.className = 'w-[18px] h-[18px] rounded-full bg-orange border-2 border-white shadow-md'
    // Build popup DOM with details + form
    const container = document.createElement('div')
    container.className = 'text-sm max-w-sm text-left text-primary bg-primary p-4 rounded shadow-2xl relative'

    // Close button in top-right
    const closeBtn = document.createElement('button')
    closeBtn.className =
        'absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded hover:bg-accent text-primary text-lg leading-none'
    closeBtn.innerHTML = '✕'
    closeBtn.setAttribute('aria-label', 'Close')

    const title = document.createElement('div')
    title.className = 'font-semibold mb-2 pr-6'
    title.textContent = label || 'Selected place'
    const addr = document.createElement('div')
    addr.className = 'text-secondary mb-3 text-xs'
    addr.textContent = address || ''
    const selectWrap = document.createElement('div')
    selectWrap.className = 'mb-3'
    const selectLabel = document.createElement('label')
    selectLabel.className = 'block text-xs text-secondary mb-1'
    selectLabel.textContent = 'Place type'
    const select = document.createElement('select')
    ;['Coffee', 'Restaurant', 'Airbnb', 'Hotel', 'Co-working', 'Bar'].forEach((opt) => {
        const o = document.createElement('option')
        o.value = opt
        o.textContent = opt
        select.appendChild(o)
    })
    select.className = 'w-full border border-primary rounded px-2 py-1 bg-primary text-primary'
    selectWrap.appendChild(selectLabel)
    selectWrap.appendChild(select)

    // Button container with OSButton
    const buttonWrap = document.createElement('div')
    buttonWrap.className = 'flex justify-end'

    container.appendChild(closeBtn)
    container.appendChild(title)
    if (address) container.appendChild(addr)
    container.appendChild(selectWrap)
    container.appendChild(buttonWrap)

    // Render OSButton using createRoot
    const root = createRoot(buttonWrap)
    root.render(
        <OSButton
            size="sm"
            variant="primary"
            onClick={() => {
                /* Will be wired up after render */
            }}
        >
            Add place
        </OSButton>
    )
    const popup = new mapboxgl.Popup({ offset: 12 }).setDOMContent(container)
    const marker = new mapboxgl.Marker({ element: el }).setLngLat([longitude, latitude]).setPopup(popup)
    marker.addTo(map)
    try {
        marker.togglePopup()
    } catch {
        console.error('Error opening popup')
    }
    // Wire close button
    closeBtn.onclick = () => {
        try {
            marker.remove()
        } catch {
            console.error('Error removing search marker')
        }
        if (searchRef?.current?.clear) {
            try {
                searchRef.current.clear()
            } catch {
                console.error('Error clearing search bar')
            }
        }
    }

    // Wire add button - need to wait for ReactDOM render, then attach handler
    setTimeout(() => {
        const addBtn = buttonWrap.querySelector('button')
        if (!addBtn) return

        addBtn.onclick = async () => {
            // Show loading state by disabling button and changing text
            root.render(
                <OSButton
                    size="sm"
                    variant="primary"
                    disabled
                    onClick={() => {
                        /* Disabled during loading */
                    }}
                >
                    Adding...
                </OSButton>
            )

            try {
                const selected = (select && select.value) || PlaceType.COFFEE
                const type = (Object.values(PlaceType) as string[]).includes(selected) ? selected : PlaceType.COFFEE

                const item = {
                    name: label || 'Selected place',
                    address: address || '',
                    latitude: Number(latitude),
                    longitude: Number(longitude),
                    type: type.charAt(0).toUpperCase() + type.slice(1),
                }
                let newPlaceId: number | null = null
                try {
                    const jwt = typeof getJwt === 'function' ? await getJwt() : null
                    if (jwt) {
                        const response = await addPlace(jwt, item)
                        const data = (response as { data?: { id?: number } })?.data
                        newPlaceId = data?.id ?? null
                    }
                } catch (e) {
                    console.error('Error adding place', e)
                    // Restore button state on error
                    root.render(
                        <OSButton
                            size="sm"
                            variant="primary"
                            onClick={() => {
                                /* Will be re-wired */
                            }}
                        >
                            Add place
                        </OSButton>
                    )
                    // Re-wire the button after restore
                    setTimeout(() => {
                        const btn = buttonWrap.querySelector('button')
                        if (btn) btn.onclick = addBtn.onclick
                    }, 0)
                    return
                }
                try {
                    window.dispatchEvent(new CustomEvent('hogmap:places-updated', { detail: { placeId: newPlaceId } }))
                } catch {
                    console.error('Error dispatching places updated event')
                }
                // Close popup after adding
                try {
                    const p = marker.getPopup && marker.getPopup()
                    if (p) {
                        p.remove()
                    }
                } catch {
                    console.error('Error removing popup')
                }
                // Remove the temporary marker since place will render via places layer
                try {
                    marker.remove()
                } catch {
                    console.error('Error removing marker')
                }
                // Ensure the corresponding place layer is enabled upstream
                try {
                    window.dispatchEvent(new CustomEvent('hogmap:enable-layer', { detail: { layer: type } }))
                } catch {
                    console.error('Error dispatching enable layer event')
                }
                // Clear search input
                if (searchRef?.current?.clear) {
                    try {
                        searchRef.current.clear()
                    } catch {
                        console.error('Error clearing search bar')
                    }
                }
            } catch (e) {
                console.error('Error adding place', e)
            }
        }
    }, 0)
    // Also clear the search input after placing marker
    if (searchRef?.current?.clear) {
        try {
            searchRef.current.clear()
        } catch {
            console.error('Error clearing search bar')
        }
    }
    return marker
}

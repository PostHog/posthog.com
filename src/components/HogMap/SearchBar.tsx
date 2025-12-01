import React, { useEffect, useRef, useState, useImperativeHandle } from 'react'
import { addPlace } from './data'
import { PlaceType } from './types'

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
                    feats.map((f: any) => ({
                        id: f.mapbox_id || f.feature_id || f.id,
                        name:
                            f.name || f.full_address || f.place_formatted || f.description || f.place_name || 'Unknown',
                        subtitle: f.place_formatted || f.full_address || f.place_name || f.description || '',
                        // coordinates will be retrieved via /retrieve
                        coordinates: null,
                    }))
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
            const resolvedAddress =
                feat?.properties?.place_formatted ||
                feat?.properties?.full_address ||
                feat?.place_name ||
                item.subtitle ||
                ''
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
                            {item.subtitle && <div className="text-xs text-secondary">{item.subtitle}</div>}
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
    map: any
    getMapbox: () => any
    longitude: number
    latitude: number
    label: string
    address: string
    prevMarker: any
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
}: CreateSearchMarkerParams) {
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
    container.className = 'text-sm max-w-sm text-center text-primary bg-primary p-2 rounded shadow-2xl'
    const title = document.createElement('div')
    title.className = 'font-semibold mb-1'
    title.textContent = label || 'Selected place'
    const addr = document.createElement('div')
    addr.className = 'text-secondary mb-1'
    addr.textContent = address || ''
    const coordsWrap = document.createElement('div')
    coordsWrap.className = 'text-secondary mb-2'
    coordsWrap.textContent = `Lat ${Number(latitude).toFixed(5)}, Lng ${Number(longitude).toFixed(5)}`
    const selectWrap = document.createElement('div')
    selectWrap.className = 'mb-2'
    const select = document.createElement('select')
    ;['Coffee', 'Restaurant', 'Airbnb', 'Hotel', 'Co-working'].forEach((opt) => {
        const o = document.createElement('option')
        o.value = opt
        o.textContent = opt
        select.appendChild(o)
    })
    select.className = 'w-full border border-primary rounded px-2 py-1 bg-primary text-primary'
    selectWrap.appendChild(select)
    const buttons = document.createElement('div')
    buttons.className = 'flex gap-2 justify-end'
    const cancelBtn = document.createElement('button')
    cancelBtn.className = 'px-2 py-1 rounded border border-primary bg-primary text-primary hover:bg-accent'
    cancelBtn.textContent = 'Cancel'
    const addBtn = document.createElement('button')
    addBtn.className = 'px-2 py-1 rounded border border-primary bg-primary text-primary hover:bg-accent font-semibold'
    addBtn.textContent = 'Add'
    buttons.appendChild(cancelBtn)
    buttons.appendChild(addBtn)
    container.appendChild(title)
    if (address) container.appendChild(addr)
    container.appendChild(coordsWrap)
    container.appendChild(selectWrap)
    container.appendChild(buttons)
    const popup = new mapboxgl.Popup({ offset: 12 }).setDOMContent(container)
    const marker = new mapboxgl.Marker({ element: el }).setLngLat([longitude, latitude]).setPopup(popup)
    marker.addTo(map)
    try {
        marker.togglePopup()
    } catch {
        console.error('Error opening popup')
    }
    // Wire buttons
    cancelBtn.onclick = () => {
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
    addBtn.onclick = async () => {
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
                    newPlaceId = (response as any)?.data?.id || null
                }
            } catch (e) {
                console.error('Error adding place', e)
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

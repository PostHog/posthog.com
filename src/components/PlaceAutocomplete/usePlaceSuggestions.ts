import { useCallback, useEffect, useRef, useState } from 'react'

export interface PlaceSuggestion {
    id: string
    /** Mapbox's short name for the place, e.g. "Barcelona" */
    name: string
    /** Everything above it in the hierarchy, e.g. "Catalonia, Spain" */
    subtitle: string
    /** ISO 3166-1 alpha-2 code, e.g. "ES" – matches the profile `country` field */
    countryCode?: string
    /** Name plus its parent region, e.g. "Barcelona, Catalonia" – what we store as a location */
    label: string
}

interface Options {
    /** Mapbox feature types to suggest. Defaults to cities, regions, and countries. */
    types?: string
    limit?: number
    minLength?: number
    debounceMs?: number
    /** Set false to pause requests (e.g. while the dropdown is closed) */
    enabled?: boolean
}

// Session token for Search Box API billing (rotated after each selection)
const makeSessionToken = (): string =>
    typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)

// "Barcelona, Catalonia" geocodes as reliably as Mapbox's full "Barcelona, Catalonia, Spain"
// but reads better on a profile – and we store the country separately anyway.
const buildLabel = (name: string, context?: Record<string, any>): string => {
    const region = context?.region?.name
    const country = context?.country?.name
    const parent = region && region !== name ? region : country && country !== name ? country : null
    return parent ? `${name}, ${parent}` : name
}

/**
 * Debounced Mapbox Search Box place suggestions, shared by the people map search
 * and the profile location field so both resolve locations the same way.
 */
export const usePlaceSuggestions = (
    query: string,
    token: string | undefined,
    { types = 'country,region,place', limit = 5, minLength = 2, debounceMs = 200, enabled = true }: Options = {}
): { suggestions: PlaceSuggestion[]; resetSession: () => void } => {
    const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([])
    const [sessionToken, setSessionToken] = useState(makeSessionToken)
    const abortRef = useRef<AbortController | null>(null)

    useEffect(() => {
        const q = query.trim()
        const canSearch = enabled && typeof window !== 'undefined' && token && q.length >= minLength
        if (!canSearch) {
            if (abortRef.current) {
                abortRef.current.abort()
                abortRef.current = null
            }
            setSuggestions([])
            return
        }
        const controller = new AbortController()
        abortRef.current = controller
        const handle = setTimeout(async () => {
            try {
                const url = new URL('https://api.mapbox.com/search/searchbox/v1/suggest')
                url.searchParams.set('q', q)
                url.searchParams.set('limit', String(limit))
                url.searchParams.set('types', types)
                url.searchParams.set('language', 'en')
                url.searchParams.set('session_token', sessionToken)
                url.searchParams.set('access_token', token as string)
                const resp = await fetch(url.toString(), { signal: controller.signal })
                const json = await resp.json()
                const feats = Array.isArray(json?.suggestions) ? json.suggestions : []
                setSuggestions(
                    feats.map((f: Record<string, any>) => {
                        const name = f.name || f.place_formatted || f.description || 'Unknown'
                        return {
                            id: f.mapbox_id || f.feature_id || f.id,
                            name,
                            subtitle: f.place_formatted || f.full_address || '',
                            countryCode: f.context?.country?.country_code || undefined,
                            label: buildLabel(name, f.context),
                        }
                    })
                )
            } catch {
                // ignore (including aborts)
            }
        }, debounceMs)
        return () => {
            clearTimeout(handle)
            controller.abort()
        }
    }, [query, token, sessionToken, types, limit, minLength, debounceMs, enabled])

    // Mapbox session semantics: start a fresh session once a suggestion is picked
    const resetSession = useCallback(() => {
        setSuggestions([])
        setSessionToken(makeSessionToken())
    }, [])

    return { suggestions, resetSession }
}

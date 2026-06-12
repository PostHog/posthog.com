import { useEffect, useRef, useState } from 'react'

export type SemanticSearchResult = {
    type: string
    title: string
    url: string
    fragment?: string
    excerpt: string
}

const DEBOUNCE_MS = 400
const CACHE_MAX_ENTRIES = 50

// Session-lived response cache, keyed by trimmed query. Repeat queries —
// restoring a parked query after the Spotlight filter picker, Esc-then-retype,
// backspacing to an earlier prefix — skip the proxy (and its ~1.5–2s RAG
// round-trip) entirely. Content only changes on deploy, so no TTL needed.
const responseCache = new Map<string, SemanticSearchResult[]>()

const cacheResponse = (query: string, results: SemanticSearchResult[]): void => {
    if (responseCache.size >= CACHE_MAX_ENTRIES) {
        const oldest = responseCache.keys().next().value
        if (oldest !== undefined) responseCache.delete(oldest)
    }
    responseCache.set(query, results)
}

/**
 * Debounced semantic search against the Inkeep RAG proxy (src/api/search.ts).
 * Stale responses are discarded via AbortController. Previous results linger
 * in state while a new query is in flight, but `loading` is true for the whole
 * flight — consumers (useHybridSearch) gate on it rather than showing them.
 */
export const useInkeepSearch = (
    query: string
): { results: SemanticSearchResult[]; loading: boolean; error: string | null } => {
    const [results, setResults] = useState<SemanticSearchResult[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const abortRef = useRef<AbortController | null>(null)

    // Depend on the trimmed query so whitespace-only edits don't refire the effect
    const trimmed = query.trim()

    useEffect(() => {
        abortRef.current?.abort()

        if (!trimmed) {
            setResults([])
            setLoading(false)
            setError(null)
            return
        }

        const cached = responseCache.get(trimmed)
        if (cached) {
            setResults(cached)
            setLoading(false)
            setError(null)
            return
        }

        setLoading(true)
        const controller = new AbortController()
        abortRef.current = controller

        const timeout = setTimeout(async () => {
            try {
                const res = await fetch('/api/search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: trimmed }),
                    signal: controller.signal,
                })
                if (!res.ok) throw new Error(`Search failed (${res.status})`)
                const data = await res.json()
                const fetched = Array.isArray(data?.results) ? data.results : []
                cacheResponse(trimmed, fetched)
                setResults(fetched)
                setError(null)
                setLoading(false)
            } catch (err) {
                if ((err as Error)?.name !== 'AbortError') {
                    setError('Search failed')
                    setLoading(false)
                }
            }
        }, DEBOUNCE_MS)

        return () => {
            clearTimeout(timeout)
            controller.abort()
        }
    }, [trimmed])

    return { results, loading, error }
}

import { useEffect, useRef, useState } from 'react'

export type SemanticSearchResult = {
    type: string
    title: string
    url: string
    fragment?: string
    excerpt: string
}

const DEBOUNCE_MS = 400
const MIN_QUERY_LENGTH = 3

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

    useEffect(() => {
        abortRef.current?.abort()

        const trimmed = query.trim()
        if (trimmed.length < MIN_QUERY_LENGTH) {
            setResults([])
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
                setResults(Array.isArray(data?.results) ? data.results : [])
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
    }, [query])

    return { results, loading, error }
}

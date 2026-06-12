import { useEffect, useState } from 'react'

export type SearchMode = 'semantic' | 'keyword'

const STORAGE_KEY = 'search-mode'
const SEARCH_MODE_EVENT = 'search-mode-change'

const getSearchMode = (): SearchMode =>
    typeof window !== 'undefined' && window.localStorage?.getItem(STORAGE_KEY) === 'semantic' ? 'semantic' : 'keyword'

/**
 * The user's preferred search engine: keyword (Algolia, the default) or
 * semantic (Inkeep RAG). Toggled by the SpotlightSearch "switch search" action
 * and persisted in localStorage. Each call site gets its own state instance,
 * so setters broadcast a window event to keep them in sync (same pattern as
 * useHedgehogMode).
 */
export const useSearchMode = (): [SearchMode, (mode: SearchMode) => void] => {
    const [mode, setMode] = useState<SearchMode>(getSearchMode())

    useEffect(() => {
        const sync = () => setMode(getSearchMode())
        window.addEventListener(SEARCH_MODE_EVENT, sync)
        return () => window.removeEventListener(SEARCH_MODE_EVENT, sync)
    }, [])

    const set = (next: SearchMode) => {
        localStorage.setItem(STORAGE_KEY, next)
        setMode(next)
        window.dispatchEvent(new Event(SEARCH_MODE_EVENT))
    }

    return [mode, set]
}

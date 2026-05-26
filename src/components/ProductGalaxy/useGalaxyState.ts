import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from '@reach/router'
import { MAIN_PRODUCT_HANDLES, normalizeHandle } from 'hooks/productData/relationships'
import type { ProductHandle } from 'hooks/productData/relationships'
import { buildGraph, recommend } from './graph'
import type { Suggestion } from './graph'

const QUERY_PARAM = 'using'

function parseUsingParam(search: string): Set<ProductHandle> {
    if (!search) return new Set()
    const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
    const raw = params.get(QUERY_PARAM)
    if (!raw) return new Set()
    const handles = new Set<ProductHandle>()
    for (const token of raw.split(',')) {
        const handle = normalizeHandle(token.trim())
        if (handle) handles.add(handle)
    }
    return handles
}

function serializeUsingParam(selected: ReadonlySet<ProductHandle>): string {
    if (selected.size === 0) return ''
    return Array.from(selected).sort().join(',')
}

export interface GalaxyState {
    graph: ReturnType<typeof buildGraph>
    /** The user's fleet — products they say they use. Drives the recommendation engine and visual cues. */
    selected: Set<ProductHandle>
    /** Transient: the node currently under the mouse, for highlight only. */
    hovered: ProductHandle | null
    suggestions: Suggestion[]
    /** Add to / remove from the fleet. The graph click handler and the chip tray both call this. */
    toggleSelected: (handle: ProductHandle) => void
    /** Empty the fleet. Bound to the "Reset" link in the selection tray. */
    clearSelected: () => void
    setHovered: (handle: ProductHandle | null) => void
}

export function useGalaxyState(): GalaxyState {
    const location = useLocation()
    const graph = useMemo(() => buildGraph(MAIN_PRODUCT_HANDLES), [])

    const [selected, setSelected] = useState<Set<ProductHandle>>(() => parseUsingParam(location.search || ''))
    const [hovered, setHovered] = useState<ProductHandle | null>(null)

    // Sync URL when selection changes. Use replaceState so we don't pollute history.
    useEffect(() => {
        if (typeof window === 'undefined') return
        const serialized = serializeUsingParam(selected)
        const params = new URLSearchParams(window.location.search)
        if (serialized) {
            params.set(QUERY_PARAM, serialized)
        } else {
            params.delete(QUERY_PARAM)
        }
        const search = params.toString()
        const newUrl = `${window.location.pathname}${search ? '?' + search : ''}${window.location.hash}`
        window.history.replaceState(null, '', newUrl)
    }, [selected])

    const toggleSelected = useCallback((handle: ProductHandle) => {
        setSelected((prev) => {
            const next = new Set(prev)
            if (next.has(handle)) next.delete(handle)
            else next.add(handle)
            return next
        })
    }, [])

    const clearSelected = useCallback(() => setSelected(new Set()), [])

    const suggestions = useMemo(() => recommend(selected, graph, 4), [selected, graph])

    return {
        graph,
        selected,
        hovered,
        suggestions,
        toggleSelected,
        clearSelected,
        setHovered,
    }
}

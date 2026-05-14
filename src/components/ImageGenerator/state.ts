import { useCallback, useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'
import type { GeneratorState } from './types'
import { eventDefaults } from './templates/event/defaults'

const QUERY_KEY = 's'

export function encodeState(state: GeneratorState): string {
    const json = JSON.stringify(state)
    if (typeof window === 'undefined') return ''
    return window.btoa(unescape(encodeURIComponent(json)))
}

export function decodeState(encoded: string): GeneratorState | null {
    if (!encoded) return null
    try {
        const json = decodeURIComponent(escape(window.atob(encoded)))
        return JSON.parse(json) as GeneratorState
    } catch {
        return null
    }
}

function getDefaults(): GeneratorState {
    return eventDefaults()
}

export function useGeneratorState(): {
    state: GeneratorState
    setState: (next: GeneratorState | ((prev: GeneratorState) => GeneratorState)) => void
    update: <K extends keyof GeneratorState>(key: K, value: GeneratorState[K]) => void
} {
    const location = useLocation()
    const [state, setStateInner] = useState<GeneratorState>(() => {
        if (typeof window === 'undefined') return getDefaults()
        const params = new URLSearchParams(location.search)
        const encoded = params.get(QUERY_KEY)
        return (encoded && decodeState(encoded)) || getDefaults()
    })

    useEffect(() => {
        if (typeof window === 'undefined') return
        const params = new URLSearchParams(window.location.search)
        params.set(QUERY_KEY, encodeState(state))
        const url = `${window.location.pathname}?${params.toString()}`
        window.history.replaceState(null, '', url)
    }, [state])

    const setState = useCallback((next: GeneratorState | ((prev: GeneratorState) => GeneratorState)) => {
        setStateInner((prev) => (typeof next === 'function' ? (next as any)(prev) : next))
    }, [])

    const update = useCallback(<K extends keyof GeneratorState>(key: K, value: GeneratorState[K]) => {
        setStateInner((prev) => ({ ...prev, [key]: value }))
    }, [])

    return { state, setState, update }
}

export function buildGeneratorUrl(state: GeneratorState): string {
    return `/image-generator?${QUERY_KEY}=${encodeState(state)}`
}

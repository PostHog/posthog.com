// The site's breakpoint media queries. Every query is false during server rendering.
import { useSyncExternalStore } from 'react'

const queries = {
    xs: '(max-width: 390px)',
    sm: '(max-width: 767px)',
    md: '(max-width: 1023px)',
    lg: '(max-width: 1279px)',
    xl: '(max-width: 1535px)',
    '2xl': '(max-width: 2560px)',
} as const

export type Breakpoints = Record<keyof typeof queries, boolean>

const serverSnapshot: Breakpoints = { xs: false, sm: false, md: false, lg: false, xl: false, '2xl': false }
let snapshot: Breakpoints = serverSnapshot

function read(): Breakpoints {
    const next = Object.fromEntries(
        Object.entries(queries).map(([name, query]) => [name, window.matchMedia(query).matches])
    ) as Breakpoints
    if (Object.keys(next).some((name) => next[name as keyof Breakpoints] !== snapshot[name as keyof Breakpoints])) {
        snapshot = next
    }
    return snapshot
}

function subscribe(onChange: () => void) {
    const lists = Object.values(queries).map((query) => window.matchMedia(query))
    lists.forEach((list) => list.addEventListener('change', onChange))
    return () => lists.forEach((list) => list.removeEventListener('change', onChange))
}

export function useBreakpoint(): Breakpoints {
    return useSyncExternalStore(subscribe, read, () => serverSnapshot)
}

export default useBreakpoint

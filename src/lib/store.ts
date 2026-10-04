// Module-level state shared by every React island on the page.
//
// Astro hydrates each island as its own React root, so React context cannot carry state from the
// chrome (taskbar, desktop) to the page or back. All islands import the same module instance, so a
// store at module level is shared. On the server, `use` always reads the initial state, so one
// page's render cannot leak into the next page's HTML.
import { useRef, useSyncExternalStore } from 'react'

type Updater<T> = Partial<T> | ((state: T) => Partial<T>)

export interface Store<T extends object> {
    get: () => T
    set: (update: Updater<T>) => void
    subscribe: (listener: () => void) => () => void
    /** Reads a slice of state. Re-renders only when the selected value changes (shallowly for objects). */
    use: <S>(selector: (state: T) => S) => S
}

function shallowEqual(a: any, b: any): boolean {
    if (Object.is(a, b)) return true
    if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return false
    const keys = Object.keys(a)
    return keys.length === Object.keys(b).length && keys.every((key) => Object.is(a[key], b[key]))
}

export function createStore<T extends object>(initial: T): Store<T> {
    let state = initial
    const listeners = new Set<() => void>()

    const store: Store<T> = {
        get: () => state,
        set(update) {
            const partial = typeof update === 'function' ? update(state) : update
            const next = { ...state, ...partial }
            if (shallowEqual(next, state)) return
            state = next
            listeners.forEach((listener) => listener())
        },
        subscribe(listener) {
            listeners.add(listener)
            return () => listeners.delete(listener)
        },
        use<S>(selector: (state: T) => S): S {
            const cache = useRef<{ value: S } | null>(null)
            const select = (source: T) => {
                const value = selector(source)
                if (cache.current && shallowEqual(cache.current.value, value)) return cache.current.value
                cache.current = { value }
                return value
            }
            return useSyncExternalStore(
                store.subscribe,
                () => select(state),
                () => select(initial)
            )
        },
    }
    return store
}

/** A `useState`-shaped hook over one store key, for converting a provider's local state to shared state. */
export function useStoreState<T extends object, K extends keyof T>(
    store: Store<T>,
    key: K
): [T[K], (value: T[K] | ((previous: T[K]) => T[K])) => void] {
    const value = store.use((state) => state[key])
    const setValue = (next: T[K] | ((previous: T[K]) => T[K])) => {
        store.set(
            (state) =>
                ({
                    [key]: typeof next === 'function' ? (next as (previous: T[K]) => T[K])(state[key]) : next,
                }) as unknown as Partial<T>
        )
    }
    return [value, setValue]
}

import { useCallback, useEffect, useState } from 'react'

// Single source of truth for which desktop icons have been dragged into the Trash.
// Icons are identified by their `label` (the same key used for render keys and
// `desktop-icon-positions`). We store labels only because an `AppItem` isn't
// serializable (its `Icon` is a React element and some carry `onClick` closures);
// the visuals are reconstructed from the exported app lists when needed.
const STORAGE_KEY = 'desktop-trashed-icons'

// Same-document sync channel. The `/trash` window renders in the SAME document as
// the desktop (not an iframe), and the native `storage` event only fires in OTHER
// tabs — so this CustomEvent is the load-bearing sync between the two windows.
const CHANGE_EVENT = 'desktop-trashed-change'

// Labels that must never be trashed (the Trash can't throw itself away).
const NEVER_TRASH = new Set<string>(['Trash'])

const readTrashed = (): string[] => {
    if (typeof window === 'undefined') return []
    try {
        const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
        return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : []
    } catch (error) {
        // localStorage might not be available (SSR, private browsing, etc.)
        console.warn('Failed to read trashed icons from localStorage:', error)
        return []
    }
}

export function useTrashedIcons() {
    // Empty on the server and first client paint → no hydration mismatch.
    const [trashedItems, setTrashedItems] = useState<string[]>([])

    useEffect(() => {
        const sync = () => setTrashedItems(readTrashed())
        sync()

        const onStorage = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY) sync()
        }

        // Same-document windows (desktop <-> /trash) sync via CustomEvent;
        // other browser tabs sync via the native `storage` event (bonus).
        window.addEventListener(CHANGE_EVENT, sync)
        window.addEventListener('storage', onStorage)
        return () => {
            window.removeEventListener(CHANGE_EVENT, sync)
            window.removeEventListener('storage', onStorage)
        }
    }, [])

    const persist = useCallback((next: string[]) => {
        setTrashedItems(next)
        if (typeof window === 'undefined') return
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch (error) {
            console.warn('Failed to save trashed icons to localStorage:', error)
        }
        window.dispatchEvent(new CustomEvent(CHANGE_EVENT))
    }, [])

    // Mutations read fresh from storage as their base so concurrent hook
    // instances (desktop + /trash open at once) stay consistent.
    const trashItem = useCallback(
        (label: string) => {
            if (NEVER_TRASH.has(label)) return
            persist(Array.from(new Set([...readTrashed(), label])))
        },
        [persist]
    )

    const restoreItem = useCallback(
        (label: string) => {
            persist(readTrashed().filter((l) => l !== label))
        },
        [persist]
    )

    const emptyTrash = useCallback(() => persist([]), [persist])

    return { trashedItems, trashItem, restoreItem, emptyTrash }
}

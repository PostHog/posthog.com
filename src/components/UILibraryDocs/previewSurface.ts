import { useSyncExternalStore } from 'components/UI/utils'

export type PreviewSurface = 'card' | 'window'

const STORAGE_KEY = 'ui-library-preview-surface'

const DEFAULT_SURFACE: PreviewSurface = 'card'

const listeners = new Set<() => void>()

function readSurface(): PreviewSurface {
    return localStorage.getItem(STORAGE_KEY) === 'window' ? 'window' : DEFAULT_SURFACE
}

function subscribe(onChange: () => void): () => void {
    listeners.add(onChange)
    window.addEventListener('storage', onChange)
    return () => {
        listeners.delete(onChange)
        window.removeEventListener('storage', onChange)
    }
}

export function setPreviewSurface(surface: PreviewSurface): void {
    localStorage.setItem(STORAGE_KEY, surface)
    listeners.forEach((listener) => listener())
}

export function usePreviewSurface(): PreviewSurface {
    return useSyncExternalStore(subscribe, readSurface, () => DEFAULT_SURFACE)
}

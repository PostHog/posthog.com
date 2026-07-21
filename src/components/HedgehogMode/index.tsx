import React, { lazy, Suspense, useEffect, useSyncExternalStore } from 'react'

const HedgeHogModeRenderer =
    typeof window !== 'undefined'
        ? lazy(() => import('@posthog/hedgehog-mode').then((module) => ({ default: module.HedgehogModeRenderer })))
        : () => null

const HEDGEHOG_MODE_STORAGE_KEY = 'hedgehog-mode-enabled'

// localStorage is the source of truth; an external store lets every caller
// (the menu toggle and the renderer) stay in sync and re-render live, without a
// reload. The `storage` event keeps separate tabs in sync.
const listeners = new Set<() => void>()

const getHedgehogModeEnabled = (): boolean => {
    return typeof window !== 'undefined' && localStorage.getItem(HEDGEHOG_MODE_STORAGE_KEY) === 'true'
}

const setHedgehogModeEnabledStore = (enabled: boolean): void => {
    if (typeof window === 'undefined') {
        return
    }
    localStorage.setItem(HEDGEHOG_MODE_STORAGE_KEY, enabled.toString())
    listeners.forEach((listener) => listener())
}

const subscribe = (listener: () => void): (() => void) => {
    listeners.add(listener)
    window.addEventListener('storage', listener)
    return () => {
        listeners.delete(listener)
        window.removeEventListener('storage', listener)
    }
}

export const useHedgehogMode = (): [boolean, (enabled: boolean) => void] => {
    const hedgehogModeEnabled = useSyncExternalStore(
        subscribe,
        getHedgehogModeEnabled,
        () => false // server snapshot
    )
    return [hedgehogModeEnabled, setHedgehogModeEnabledStore]
}

export default function HedgeHogModeEmbed(): JSX.Element | null {
    const [hedgehogModeEnabled, setHedgehogModeEnabled] = useHedgehogMode()

    useEffect(() => {
        // check if we have a hedgehog-mode query param
        const hedgehogModeForceValue = window.location.search.includes('hedgehog_mode=true')
            ? true
            : window.location.search.includes('hedgehog_mode=false')
            ? false
            : undefined

        if (hedgehogModeForceValue !== undefined && hedgehogModeForceValue !== hedgehogModeEnabled) {
            setHedgehogModeEnabled(hedgehogModeForceValue)
        }
    }, [])

    return typeof window !== 'undefined' && hedgehogModeEnabled ? (
        <Suspense fallback={<span>Loading...</span>}>
            <HedgeHogModeRenderer
                config={{
                    assetsUrl: '/hedgehog-mode',
                    platforms: {
                        selector: '.border, .border-t, .AppWindow',
                        viewportPadding: {
                            top: 100,
                        },
                        minWidth: 50,
                    },
                    onQuit: () => setHedgehogModeEnabled(false),
                }}
                onGameReady={() => void 0}
                style={{
                    position: 'fixed',
                    zIndex: 999998,
                }}
            />
        </Suspense>
    ) : null
}

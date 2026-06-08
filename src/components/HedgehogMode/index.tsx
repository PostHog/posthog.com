import React, { lazy, Suspense, useEffect, useState } from 'react'

const HedgeHogModeRenderer =
    typeof window !== 'undefined'
        ? lazy(() => import('@posthog/hedgehog-mode').then((module) => ({ default: module.HedgehogModeRenderer })))
        : () => null

const HEDGEHOG_MODE_STORAGE_KEY = 'hedgehog-mode-enabled'
const HEDGEHOG_MODE_EVENT = 'hedgehog-mode-changed'

const getHedgehogModeEnabled = () => {
    return typeof window !== 'undefined' && localStorage.getItem(HEDGEHOG_MODE_STORAGE_KEY) === 'true'
}

// Shared across every caller so a toggle in one place (e.g. the menu) updates the
// renderer live, without a reload. State changes broadcast a window event; the
// `storage` event keeps it in sync across tabs.
export const useHedgehogMode = (): [boolean, (enabled: boolean) => void] => {
    const [hedgehogModeEnabled, setHedgehogModeEnabled] = useState(getHedgehogModeEnabled())

    useEffect(() => {
        const sync = () => setHedgehogModeEnabled(getHedgehogModeEnabled())
        window.addEventListener(HEDGEHOG_MODE_EVENT, sync)
        window.addEventListener('storage', sync)
        return () => {
            window.removeEventListener(HEDGEHOG_MODE_EVENT, sync)
            window.removeEventListener('storage', sync)
        }
    }, [])

    const _setHedgehogModeEnabled = (enabled: boolean) => {
        localStorage.setItem(HEDGEHOG_MODE_STORAGE_KEY, enabled.toString())
        window.dispatchEvent(new Event(HEDGEHOG_MODE_EVENT))
    }

    return [hedgehogModeEnabled, _setHedgehogModeEnabled]
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

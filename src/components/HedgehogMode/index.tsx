import React, { lazy, Suspense, useEffect, useState } from 'react'

const HedgeHogModeRenderer =
    typeof window !== 'undefined'
        ? lazy(() => import('@posthog/hedgehog-mode').then((module) => ({ default: module.HedgehogModeRenderer })))
        : () => null

const getHedgehogModeEnabled = () => {
    return typeof window !== 'undefined' && localStorage.getItem('hedgehog-mode-enabled') === 'true'
}

const HEDGEHOG_MODE_EVENT = 'hedgehog-mode-change'

export const useHedgehogMode = (): [boolean, (enabled: boolean) => void] => {
    const [hedgehogModeEnabled, setHedgehogModeEnabled] = useState(getHedgehogModeEnabled())

    // Each call site gets its own state instance, so toggles broadcast a window
    // event to keep them in sync (e.g. the SpotlightSearch action toggling the
    // embed rendered by Desktop)
    useEffect(() => {
        const sync = () => setHedgehogModeEnabled(getHedgehogModeEnabled())
        window.addEventListener(HEDGEHOG_MODE_EVENT, sync)
        return () => window.removeEventListener(HEDGEHOG_MODE_EVENT, sync)
    }, [])

    const _setHedgehogModeEnabled = (enabled: boolean) => {
        localStorage.setItem('hedgehog-mode-enabled', enabled.toString())
        setHedgehogModeEnabled(enabled)
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

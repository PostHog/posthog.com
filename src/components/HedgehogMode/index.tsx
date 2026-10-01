import React, { lazy, Suspense, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import type { HedgeHogMode, HedgehogActorFlagOption } from '@posthog/hedgehog-mode'
import { useTranslation } from 'i18n'

const HedgeHogModeRenderer =
    typeof window !== 'undefined'
        ? lazy(() => import('@posthog/hedgehog-mode').then((module) => ({ default: module.HedgehogModeRenderer })))
        : () => null

const HEDGEHOG_MODE_STORAGE_KEY = 'hedgehog-mode-enabled'
// Set when a visitor quits the hedgehog that a translated home page turned on, so it stays off.
const LOCALE_HEDGEHOG_DISMISSED_STORAGE_KEY = 'hedgehog-mode-locale-dismissed'

// A translated home page turns hedgehog mode on, and the hedgehog holds the flag of that locale.
// pt.yml is Brazilian Portuguese. Arabic has no single country, so its hedgehog holds the globe.
const LOCALE_FLAGS: Record<string, HedgehogActorFlagOption> = {
    pt: 'brazil',
    de: 'germany',
    es: 'mexico',
    fr: 'france',
    it: 'italy',
    ja: 'japan',
    ko: 'south-korea',
    pl: 'poland',
    tr: 'turkiye',
    zh: 'china',
    ar: 'earth',
}

// localStorage is the source of truth; an external store lets every caller
// (the menu toggle and the renderer) stay in sync and re-render live, without a
// reload. The `storage` event keeps separate tabs in sync.
const listeners = new Set<() => void>()

const getStoredBoolean = (key: string): boolean => {
    return typeof window !== 'undefined' && localStorage.getItem(key) === 'true'
}

const setStoredBoolean = (key: string, value: boolean): void => {
    if (typeof window === 'undefined') {
        return
    }
    localStorage.setItem(key, value.toString())
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

const useStoredBoolean = (key: string): boolean =>
    useSyncExternalStore(
        subscribe,
        () => getStoredBoolean(key),
        () => false // server snapshot
    )

export const useHedgehogMode = (): [boolean, (enabled: boolean) => void] => {
    const hedgehogModeEnabled = useStoredBoolean(HEDGEHOG_MODE_STORAGE_KEY)
    return [hedgehogModeEnabled, (enabled) => setStoredBoolean(HEDGEHOG_MODE_STORAGE_KEY, enabled)]
}

export default function HedgeHogModeEmbed(): JSX.Element | null {
    const [hedgehogModeEnabled, setHedgehogModeEnabled] = useHedgehogMode()
    const localeHedgehogDismissed = useStoredBoolean(LOCALE_HEDGEHOG_DISMISSED_STORAGE_KEY)
    const [game, setGame] = useState<HedgeHogMode>()
    const { locale } = useTranslation()
    const localeFlag = LOCALE_FLAGS[locale]
    // The game keeps the onQuit it started with, so it reads the locale of the current page from here.
    const localeFlagRef = useRef(localeFlag)
    localeFlagRef.current = localeFlag

    // Only for this page: the setting itself stays as it is, so other pages keep the visitor's choice.
    const localeHedgehogEnabled = !!localeFlag && !localeHedgehogDismissed
    const enabled = hedgehogModeEnabled || localeHedgehogEnabled

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

    useEffect(() => {
        if (!enabled) {
            setGame(undefined)
        }
    }, [enabled])

    // Hold the flag of the current locale without saving it, so it goes away on an English page.
    useEffect(() => {
        game?.getPlayableHedgehog()?.updateOptions({
            flag: localeFlag ?? game.stateManager?.getState().options.flag ?? null,
        })
    }, [game, localeFlag])

    const handleQuit = () => {
        setHedgehogModeEnabled(false)
        if (localeFlagRef.current) {
            setStoredBoolean(LOCALE_HEDGEHOG_DISMISSED_STORAGE_KEY, true)
        }
    }

    return typeof window !== 'undefined' && enabled ? (
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
                    onQuit: handleQuit,
                }}
                onGameReady={setGame}
                style={{
                    position: 'fixed',
                    zIndex: 999998,
                }}
            />
        </Suspense>
    ) : null
}

import React, { lazy, Suspense, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import type { HedgeHogMode, HedgehogActorFlagOption } from '@posthog/hedgehog-mode'
import { useTranslation } from 'i18n'
import { preferredTag } from 'i18n/preferredLocale'
import { localeFlag as getLocaleFlag } from './localeFlag'

const HedgeHogModeRenderer =
    typeof window !== 'undefined'
        ? lazy(() => import('@posthog/hedgehog-mode').then((module) => ({ default: module.HedgehogModeRenderer })))
        : () => null

const HEDGEHOG_MODE_STORAGE_KEY = 'hedgehog-mode-enabled'
// Set when a visitor quits the hedgehog that a translated home page turned on, so it stays off.
const LOCALE_HEDGEHOG_DISMISSED_STORAGE_KEY = 'hedgehog-mode-locale-dismissed'
// The hedgehog waves only on the ground. One that doesn't land and wave in this time dies anyway.
const GOODBYE_WAVE_TIMEOUT_MS = 4000
// The ghost floats for 7s from the death. The hedgehog fades out over the first 2s.
const GOODBYE_GHOST_MS = 5000

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
    const gameRef = useRef(game)
    gameRef.current = game
    // A new key starts a new game.
    const [rendererKey, setRendererKey] = useState(0)
    const { locale } = useTranslation()
    // A translated home page turns hedgehog mode on when the visitor's browser picks that page, and
    // the hedgehog holds a flag from the region of the visitor. The server has no navigator, so this
    // waits until after hydration.
    const [localeFlag, setLocaleFlag] = useState<HedgehogActorFlagOption>()
    // The game keeps the onQuit it started with, so it reads the locale of the current page from here.
    const localeFlagRef = useRef(localeFlag)
    localeFlagRef.current = localeFlag
    useEffect(() => {
        const flag = getLocaleFlag(locale, preferredTag(navigator.languages ?? [navigator.language]))
        const game = gameRef.current
        const hedgehog = game?.getPlayableHedgehog()
        // Leaving the page takes away the hedgehog that it turned on, so the hedgehog waves goodbye and
        // dies first. The visitor's own hedgehog mode keeps it alive.
        if (flag || !localeFlagRef.current || hedgehogModeEnabled || !game || !hedgehog || hedgehog.isDead) {
            setLocaleFlag(flag)
            return
        }

        hedgehog.updateOptions({ ai_enabled: false, controls_enabled: false })
        hedgehog.walkSpeed = 0
        let done = false
        let ghostTimeout: ReturnType<typeof setTimeout> | undefined
        const waveTimeout = setTimeout(() => hedgehog.destroy(), GOODBYE_WAVE_TIMEOUT_MS)
        // In the air, the engine shows the hedgehog falling, so it waits to land before it waves. A
        // bounce stops the wave, so the wave starts again on the next landing.
        const goodbye = () => {
            if (!hedgehog.isDead && hedgehog.getGround() && hedgehog.currentSprite !== 'wave') {
                hedgehog.setVelocity({ x: 0, y: 0 })
                hedgehog.updateSprite('wave', {
                    reset: true,
                    // The engine only walks, jumps, and falls with a flag, unless the skin is forced.
                    forceSkin: hedgehog.options.skin ?? 'default',
                    onComplete: () => hedgehog.destroy(),
                })
            }
            // The engine removes the hedgehog after its death. The ghost stays a little longer.
            if (!game.elements.includes(hedgehog)) {
                game.app.ticker.remove(goodbye)
                ghostTimeout = setTimeout(() => {
                    done = true
                    setLocaleFlag(undefined)
                }, GOODBYE_GHOST_MS)
            }
        }
        game.app.ticker.add(goodbye)
        return () => {
            clearTimeout(waveTimeout)
            clearTimeout(ghostTimeout)
            game.app.ticker?.remove(goodbye)
            // Another locale before the goodbye ends: start again with a new hedgehog, or none.
            if (!done) {
                gameRef.current = undefined
                setGame(undefined)
                setRendererKey((key) => key + 1)
            }
        }
    }, [locale])

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
                key={rendererKey}
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

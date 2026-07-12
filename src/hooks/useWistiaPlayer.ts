import { useCallback, useEffect, useRef, useState } from 'react'
import usePostHog from './usePostHog'

/**
 * Shared loading/error/retry logic for the Wistia embed components
 * (`MediaPlayer`, `WistiaVideo`, `WistiaCustomPlayer`).
 *
 * Each of those components loads Wistia's `E-v1.js` script and then waits for
 * the player to report ready (via `_wq.push({ onReady })` or by polling
 * `Wistia.api()`). When the script is blocked (ad blockers are common in
 * PostHog's developer-heavy audience) or `onReady`/`api()` never fires, the
 * embed used to sit on an eternal loading spinner with no way to recover.
 *
 * This hook centralizes:
 *   - Deduplicated script loading with an `error` handler (blocked script).
 *   - A single timeout covering the whole load → ready window, so a hung
 *     script or a player that never reports ready falls back to an error state.
 *   - A `retry()` that re-runs initialization.
 *   - A `posthog.capture` on failure so the previously-invisible stuck state
 *     becomes measurable.
 */

declare global {
    interface Window {
        Wistia?: any
        _wq?: any[]
    }
}

const WISTIA_SCRIPT_SRC = 'https://fast.wistia.com/assets/external/E-v1.js'

// Default time to wait for the player to report ready before giving up. Kept
// generous so genuinely slow connections aren't shown a false error, but well
// under the 30s+ some users were observed waiting before giving up manually.
const DEFAULT_TIMEOUT_MS = 10000

let scriptPromise: Promise<void> | null = null

/** Load Wistia's external embed script once, shared across all players. */
function loadWistiaScript(): Promise<void> {
    if (typeof window === 'undefined') {
        return Promise.reject(new Error('Wistia can only load in the browser'))
    }
    if (window.Wistia) {
        return Promise.resolve()
    }
    if (scriptPromise) {
        return scriptPromise
    }

    scriptPromise = new Promise<void>((resolve, reject) => {
        const script = document.createElement('script')
        script.src = WISTIA_SCRIPT_SRC
        script.async = true
        script.addEventListener('load', () => resolve())
        script.addEventListener('error', () => {
            // Allow a later retry to attempt a fresh load (e.g. if the user
            // disables their ad blocker) rather than caching the failure.
            scriptPromise = null
            script.remove()
            reject(new Error('Failed to load the Wistia script'))
        })
        document.head.appendChild(script)
    })

    return scriptPromise
}

export type WistiaStatus = 'loading' | 'ready' | 'error'

type WistiaFailureReason = 'script_error' | 'timeout'

interface UseWistiaPlayerOptions {
    videoId: string
    /** Set false to skip loading entirely (e.g. thumbnail/preview mode). */
    enabled?: boolean
    /** Identifies the calling surface in telemetry (e.g. 'MediaPlayer'). */
    component: string
    timeoutMs?: number
}

interface UseWistiaPlayerResult {
    status: WistiaStatus
    /** True once the script has loaded and the player can be initialized. */
    scriptLoaded: boolean
    /** Increment used as an effect dependency to re-run initialization. */
    attempt: number
    /** Call from the player's `onReady`/ready handler to clear the timeout. */
    markReady: () => void
    /** Re-run script loading and initialization from a failed/blocked state. */
    retry: () => void
}

export default function useWistiaPlayer({
    videoId,
    enabled = true,
    component,
    timeoutMs = DEFAULT_TIMEOUT_MS,
}: UseWistiaPlayerOptions): UseWistiaPlayerResult {
    const posthog = usePostHog()
    const [status, setStatus] = useState<WistiaStatus>('loading')
    const [scriptLoaded, setScriptLoaded] = useState(false)
    const [attempt, setAttempt] = useState(0)

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const capturedRef = useRef(false)

    const clearTimer = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
    }, [])

    const fail = useCallback(
        (reason: WistiaFailureReason) => {
            clearTimer()
            setStatus((prev) => (prev === 'ready' ? prev : 'error'))
            if (!capturedRef.current) {
                capturedRef.current = true
                posthog?.capture?.('wistia_video_load_failed', {
                    video_id: videoId,
                    component,
                    reason,
                })
            }
        },
        [clearTimer, component, posthog, videoId]
    )

    const markReady = useCallback(() => {
        clearTimer()
        setStatus('ready')
    }, [clearTimer])

    const retry = useCallback(() => {
        capturedRef.current = false
        setScriptLoaded(false)
        setStatus('loading')
        setAttempt((n) => n + 1)
    }, [])

    useEffect(() => {
        if (!enabled) {
            clearTimer()
            return
        }

        let cancelled = false
        capturedRef.current = false
        setStatus('loading')
        setScriptLoaded(false)

        // A single timeout guards the whole load → ready window so that a hung
        // script (never fires load or error) is also caught, not just a player
        // that loads but never reports ready.
        clearTimer()
        timeoutRef.current = setTimeout(() => {
            if (!cancelled) {
                fail('timeout')
            }
        }, timeoutMs)

        loadWistiaScript()
            .then(() => {
                if (!cancelled) {
                    setScriptLoaded(true)
                }
            })
            .catch(() => {
                if (!cancelled) {
                    fail('script_error')
                }
            })

        return () => {
            cancelled = true
            clearTimer()
        }
    }, [enabled, videoId, attempt, timeoutMs, clearTimer, fail])

    return { status, scriptLoaded, attempt, markReady, retry }
}

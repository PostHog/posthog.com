import { useEffect, useState } from 'react'
import usePostHog from './usePostHog'

/**
 * Returns the list of currently-enabled PostHog feature flag keys, updating
 * reactively as flags resolve in the browser. Returns `null` until flags load
 * (and during SSR), so callers should treat `null` as "flags not yet known".
 *
 * Note: posthog-js calls the `onFeatureFlags` listener whenever flags change,
 * and returns an unsubscribe function we use for cleanup.
 */
export const useActiveFeatureFlags = (): string[] | null => {
    const posthog = usePostHog()
    const [flags, setFlags] = useState<string[] | null>(null)

    useEffect(() => {
        if (!posthog?.onFeatureFlags) {
            return
        }
        return posthog.onFeatureFlags((enabledFlags: string[]) => {
            setFlags(enabledFlags)
        })
    }, [posthog])

    return flags
}

/**
 * Recursively filters a menu tree, dropping any item whose `featureFlag` is not
 * in `activeFlags`. Items without a `featureFlag` are always kept.
 *
 * Fails closed: while `activeFlags` is `null` (SSR / flags not yet loaded),
 * flagged items are hidden. This avoids flashing gated entries to users who
 * shouldn't see them, at the cost of a brief delay before they appear for users
 * who should. Generic so it works with any nav-item shape.
 */
export const filterMenuByFlags = <T extends { featureFlag?: string; children?: T[] }>(
    items: T[] | undefined,
    activeFlags: string[] | null
): T[] | undefined =>
    items
        ?.filter((item) => !item.featureFlag || !!activeFlags?.includes(item.featureFlag))
        .map((item) => ({
            ...item,
            children: item.children ? filterMenuByFlags(item.children, activeFlags) : item.children,
        }))

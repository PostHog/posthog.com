import { useEffect, useState } from 'react'
import usePostHog from './usePostHog'

type Cloud = 'eu' | 'us'

/**
 * Returns the user's target cloud region, or `null` until it's known.
 *
 * The region comes from PostHog feature flags. Those are absent during SSR but
 * resolve synchronously from cache on the client for returning visitors, so
 * reading them during the first client render diverges from the server-rendered
 * markup and trips React hydration error #425 (e.g. the install command gains a
 * `--region` suffix that the server never rendered). Keeping the value `null`
 * until after mount makes the first client render match SSR, then it reconciles
 * reactively as flags load.
 */
export default function useCloud(): Cloud | null {
    const posthog = usePostHog()
    const [cloud, setCloud] = useState<Cloud | null>(null)

    useEffect(() => {
        if (!posthog?.onFeatureFlags) {
            return
        }
        return posthog.onFeatureFlags(() => {
            const isEU = posthog.isFeatureEnabled?.('direct-to-eu-cloud')
            const isUS = posthog.isFeatureEnabled?.('direct-to-us-cloud')
            setCloud(isEU ? 'eu' : isUS ? 'us' : null)
        })
    }, [posthog])

    return cloud
}

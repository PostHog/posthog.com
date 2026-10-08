import { useEffect } from 'react'
import usePostHog from './usePostHog'

const POLL_INTERVAL_MS = 300
const GIVE_UP_MS = 6000
const STAGES = ['concept', 'alpha', 'beta']

/**
 * Loads the Early Access Feature list into posthog-js persistence so that a later
 * `updateEarlyAccessFeatureEnrollment` call attaches `$early_access_feature_name` to the
 * `$feature_enrollment_update` event — the Customer.io "Waitlist, Alpha, Beta onboarding"
 * flow only triggers when both that property and `$feature_enrollment_stage` are present.
 * Call it from any component that fires the enrollment (e.g. waitlist forms), passing the
 * feature's flag key; it no-ops when the key is undefined.
 *
 * posthog-js is loaded as a CDN snippet; `getEarlyAccessFeatures` only exists once the
 * async `array.js` has loaded, so this polls briefly for the method before giving up.
 */
export function usePrimeEarlyAccessFeatures(flagKey?: string): void {
    const posthog = usePostHog()

    useEffect(() => {
        if (!flagKey || typeof window === 'undefined') {
            return
        }

        const tryLoad = (): boolean => {
            if (typeof posthog?.getEarlyAccessFeatures !== 'function') {
                return false
            }
            // Force reload: posthog-js caches the list keyed without the stage filter, so a
            // prior beta-only fetch elsewhere on the site would otherwise mask concept items.
            posthog.getEarlyAccessFeatures(() => undefined, true, STAGES)
            return true
        }

        if (tryLoad()) {
            return
        }

        const interval = setInterval(() => {
            if (tryLoad()) {
                clearInterval(interval)
            }
        }, POLL_INTERVAL_MS)
        const giveUp = setTimeout(() => clearInterval(interval), GIVE_UP_MS)

        return () => {
            clearInterval(interval)
            clearTimeout(giveUp)
        }
    }, [flagKey, posthog])
}

export default usePrimeEarlyAccessFeatures

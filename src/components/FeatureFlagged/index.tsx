import { useActiveFeatureFlags } from 'hooks/useActiveFeatureFlags'
import React from 'react'

interface FeatureFlaggedProps {
    /** Key of the feature flag that gates `children`. */
    flag: string
    children: React.ReactNode
    /** Rendered instead of `children` when the flag is off. */
    fallback?: React.ReactNode
}

/**
 * Renders `children` only when `flag` is enabled for the current visitor,
 * otherwise `fallback`.
 *
 * Fails closed: flags resolve in the browser, so during SSR and until they load
 * the fallback is what renders. That means flagged content never flashes to
 * visitors who shouldn't see it, at the cost of a beat before it appears for
 * those who should — the right trade for pre-launch content.
 */
export function FeatureFlagged({ flag, children, fallback = null }: FeatureFlaggedProps): JSX.Element {
    const activeFlags = useActiveFeatureFlags()
    return <>{activeFlags?.includes(flag) ? children : fallback}</>
}

export default FeatureFlagged

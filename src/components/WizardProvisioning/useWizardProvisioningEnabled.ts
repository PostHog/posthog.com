import { useActiveFeatureFlags } from '../../hooks/useActiveFeatureFlags'
import usePostHog from '../../hooks/usePostHog'

export const WIZARD_PROVISIONING_FLAG = 'wizard-provisioning'

/**
 * Whether the GitHub provisioning flow should take over the wizard hero.
 *
 * Gated on the `wizard-provisioning` experiment: only the `test` variant enables it; `control` and
 * unflagged visitors get the classic terminal-first hero. `flags` (from onFeatureFlags) is the
 * reactive trigger (it flips non-null once flags resolve), while getFeatureFlag returns the
 * assigned variant and emits the `$feature_flag_called` exposure. Fail-closed while flags load.
 *
 * Call this in exactly one place (the hero) so the exposure isn't double-counted; the hero mounts
 * <WizardProvisioning /> only when this is true, so the component itself never needs to re-check.
 *
 * In local `gatsby develop`, posthog never loads (the custom `src/html.tsx` that injects it isn't
 * applied in dev), so the flag can't resolve, so always enable in development so the flow is testable
 * locally. This branch is dead-code-eliminated from production builds, where the experiment variant
 * is the only gate.
 */
export function useWizardProvisioningEnabled(): boolean {
    const flags = useActiveFeatureFlags()
    const posthog = usePostHog()
    return (
        process.env.NODE_ENV === 'development' ||
        (!!flags && posthog?.getFeatureFlag?.(WIZARD_PROVISIONING_FLAG) === 'test')
    )
}

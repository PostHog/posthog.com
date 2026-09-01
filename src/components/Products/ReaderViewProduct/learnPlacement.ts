import usePostHog from '../../../hooks/usePostHog'

/** Learn as its own tab, or a section heading the Docs tree. Both arms ship it. */
export const LEARN_PLACEMENT_FLAG = 'docs-learn-placement'

export type LearnPlacement = 'tab' | 'nested'

/** Flags resolve client-side, so the default is the control arm. */
export const DEFAULT_LEARN_PLACEMENT: LearnPlacement = 'tab'

export function useLearnPlacement(): LearnPlacement {
    const posthog = usePostHog()
    return posthog?.getFeatureFlag?.(LEARN_PLACEMENT_FLAG) === 'nested' ? 'nested' : DEFAULT_LEARN_PLACEMENT
}

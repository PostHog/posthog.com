import { useCallback, useEffect, useRef, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import usePostHog from './usePostHog'

export type EarlyAccessFeatureStage = 'concept' | 'alpha' | 'beta' | 'general-availability'

export interface EarlyAccessFeature {
    name: string
    description: string
    stage: EarlyAccessFeatureStage
    documentationUrl: string
    flagKey: string
    /**
     * Arbitrary JSON set on the Early Access Feature in PostHog and served by the public
     * EAF endpoint. For Coming Soon items this carries the linked waitlist survey:
     * `{ survey_id, survey_question_id }`. (posthog-js doesn't type `payload` yet, but it
     * passes it through at runtime — see PostHog/posthog-js#2642.)
     */
    payload?: Record<string, any>
}

export interface GroupedEarlyAccessFeatures {
    /** Stage `beta` — available to try right now via in-app feature previews. */
    beta: EarlyAccessFeature[]
    /** Stages `concept` + `alpha` — "coming soon", join the waitlist. */
    comingSoon: EarlyAccessFeature[]
}

const DEFAULT_STAGES: EarlyAccessFeatureStage[] = ['concept', 'alpha', 'beta']
const POLL_INTERVAL_MS = 300
const GIVE_UP_MS = 6000

interface UseEarlyAccessFeaturesOptions {
    /** Which stages the client-side revalidation requests. Defaults to concept + alpha + beta. */
    stages?: EarlyAccessFeatureStage[]
    /**
     * Bypass posthog-js's cached EAF result when revalidating. Defaults to true: posthog-js
     * caches the list keyed without the stage filter, so a prior default (beta-only) fetch
     * elsewhere on the site would otherwise mask the concept/alpha "coming soon" items here.
     */
    forceReload?: boolean
}

interface UseEarlyAccessFeaturesResult {
    features: EarlyAccessFeature[]
    grouped: GroupedEarlyAccessFeatures
    loading: boolean
    error: boolean
    refetch: () => void
}

/**
 * PostHog Early Access Features, grouped by stage. Stale-while-revalidate:
 *  - Seeded from build-time nodes (`gatsby/sourceNodes.ts` → `EarlyAccessFeature`), so the
 *    list server-renders instantly and is indexable.
 *  - Revalidated client-side via posthog-js once it loads, so features added in-app since
 *    the last deploy still appear without a rebuild.
 *
 * posthog-js is loaded as a CDN snippet; its EAF methods only exist once the async
 * `array.js` has loaded, so revalidation polls for `getEarlyAccessFeatures` before calling
 * it and guards SSR (the snippet stub / window are absent at build time).
 */
export function useEarlyAccessFeatures(options: UseEarlyAccessFeaturesOptions = {}): UseEarlyAccessFeaturesResult {
    const { stages = DEFAULT_STAGES, forceReload = true } = options
    const posthog = usePostHog()

    const staticData = useStaticQuery(graphql`
        query EarlyAccessFeaturesQuery {
            allEarlyAccessFeature {
                nodes {
                    name
                    description
                    stage
                    documentationUrl
                    flagKey
                    payload
                }
            }
        }
    `)
    const staticFeatures: EarlyAccessFeature[] = staticData?.allEarlyAccessFeature?.nodes || []

    const [features, setFeatures] = useState<EarlyAccessFeature[]>(staticFeatures)
    const [loading, setLoading] = useState(staticFeatures.length === 0)
    const [error, setError] = useState(false)
    const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const stagesKey = JSON.stringify(stages)

    const fetchFeatures = useCallback(() => {
        // SSR guard + method-availability guard (the snippet stub doesn't expose EAF methods yet).
        if (typeof window === 'undefined' || typeof posthog?.getEarlyAccessFeatures !== 'function') {
            return false
        }

        // Attach each feature's waitlist survey by matching the survey's linked_flag_key to
        // the feature's flagKey (mirrors the build-time join in gatsby/sourceNodes.ts).
        // Explicit payload from the feature wins; the flag-key join is the fallback.
        const applyFeatures = (result: EarlyAccessFeature[]) => {
            // Keep the build-time list when the live response is empty/invalid.
            if (!Array.isArray(result) || result.length === 0) {
                setLoading(false)
                return
            }
            const finish = (features: EarlyAccessFeature[]) => {
                setFeatures(features)
                setLoading(false)
            }
            if (typeof posthog.getSurveys !== 'function') {
                finish(result)
                return
            }
            posthog.getSurveys((surveys: any[]) => {
                const waitlistSurveyByFlagKey: Record<string, { survey_id: string; survey_question_id?: string }> = {}
                if (Array.isArray(surveys)) {
                    surveys
                        .filter((s) => s?.type === 'api' && s?.linked_flag_key && s?.start_date && !s?.end_date)
                        .forEach((s) => {
                            waitlistSurveyByFlagKey[s.linked_flag_key] = {
                                survey_id: s.id,
                                survey_question_id: s.questions?.[0]?.id,
                            }
                        })
                }
                finish(
                    result.map((feature) => ({
                        ...feature,
                        payload: { ...waitlistSurveyByFlagKey[feature.flagKey], ...(feature.payload || {}) },
                    }))
                )
            })
        }

        try {
            posthog.getEarlyAccessFeatures(applyFeatures, forceReload, stages)
            return true
        } catch {
            setError(true)
            setLoading(false)
            return true
        }
        // stagesKey stands in for `stages` (a fresh array each render) in the dep list.
    }, [posthog, forceReload, stagesKey])

    useEffect(() => {
        if (fetchFeatures()) return

        pollRef.current = setInterval(() => {
            if (fetchFeatures() && pollRef.current) {
                clearInterval(pollRef.current)
                pollRef.current = null
            }
        }, POLL_INTERVAL_MS)

        const giveUp = setTimeout(() => {
            if (pollRef.current) {
                clearInterval(pollRef.current)
                pollRef.current = null
            }
            setLoading(false)
        }, GIVE_UP_MS)

        return () => {
            if (pollRef.current) {
                clearInterval(pollRef.current)
                pollRef.current = null
            }
            clearTimeout(giveUp)
        }
    }, [fetchFeatures])

    const grouped: GroupedEarlyAccessFeatures = {
        beta: features.filter((f) => f.stage === 'beta'),
        comingSoon: features.filter((f) => f.stage === 'concept' || f.stage === 'alpha'),
    }

    return { features, grouped, loading, error, refetch: fetchFeatures }
}

export default useEarlyAccessFeatures

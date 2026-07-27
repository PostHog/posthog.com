import { useCallback, useMemo } from 'react'
import useEarlyAccessFeatures, { EarlyAccessFeature } from './useEarlyAccessFeatures'
import { useFeatureOwnership } from './useFeatureOwnership'
import { ROADMAP_TEAM_OVERRIDES } from 'components/Roadmap/roadmapTeamOverrides'

export interface RoadmapEarlyAccessFeature extends EarlyAccessFeature {
    teamSlug?: string
}

interface UseRoadmapEarlyAccessFeaturesOptions {
    teamSlug?: string
}

type UseRoadmapEarlyAccessFeaturesResult = Omit<ReturnType<typeof useEarlyAccessFeatures>, 'features' | 'grouped'> & {
    features: RoadmapEarlyAccessFeature[]
    grouped: {
        beta: RoadmapEarlyAccessFeature[]
        comingSoon: RoadmapEarlyAccessFeature[]
    }
    teamForFeature: (feature: EarlyAccessFeature) => string | undefined
}

const slugify = (text: string): string =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

/**
 * Adds the roadmap's canonical team ownership to each Early Access Feature.
 * Consumers can optionally select one small team's roadmap without duplicating
 * the override and feature-ownership resolution used by /roadmap.
 */
export function useRoadmapEarlyAccessFeatures({
    teamSlug,
}: UseRoadmapEarlyAccessFeaturesOptions = {}): UseRoadmapEarlyAccessFeaturesResult {
    const earlyAccessFeatures = useEarlyAccessFeatures()
    const { features: ownedFeatures } = useFeatureOwnership()

    const teamByFeatureSlug = useMemo(() => {
        const map: Record<string, string> = {}
        ownedFeatures.forEach((feature) => {
            if (feature.owner?.[0]) {
                map[feature.slug] = feature.owner[0]
            }
        })
        return map
    }, [ownedFeatures])

    const teamForFeature = useCallback(
        (feature: EarlyAccessFeature): string | undefined =>
            ROADMAP_TEAM_OVERRIDES[feature.flagKey] ||
            teamByFeatureSlug[feature.flagKey] ||
            teamByFeatureSlug[slugify(feature.name)],
        [teamByFeatureSlug]
    )

    const features = useMemo<RoadmapEarlyAccessFeature[]>(() => {
        const withTeams = earlyAccessFeatures.features.map((feature) => ({
            ...feature,
            teamSlug: teamForFeature(feature),
        }))
        return teamSlug ? withTeams.filter((feature) => feature.teamSlug === teamSlug) : withTeams
    }, [earlyAccessFeatures.features, teamForFeature, teamSlug])

    const grouped = useMemo(
        () => ({
            beta: features.filter((feature) => feature.stage === 'beta'),
            comingSoon: features.filter((feature) => feature.stage === 'concept' || feature.stage === 'alpha'),
        }),
        [features]
    )

    return {
        ...earlyAccessFeatures,
        features,
        grouped,
        teamForFeature,
    }
}

export default useRoadmapEarlyAccessFeatures

import { useCallback, useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
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

interface SqueakTeamAttributionNode {
    slug?: string
    name?: string
    profiles?: {
        data?: {
            attributes?: {
                firstName?: string
                lastName?: string
            }
        }[]
    }
}

/**
 * Adds the roadmap's canonical team ownership to each Early Access Feature.
 * Consumers can optionally select one small team's roadmap without duplicating
 * the override and feature-ownership resolution used by /roadmap.
 *
 * Resolution order per feature:
 *  1. A role assignee from the PostHog app (an explicit statement of team ownership),
 *     matched to a small team by slugified role name.
 *  2. `ROADMAP_TEAM_OVERRIDES` — manual corrections by flag key.
 *  3. A person assignee from the PostHog app (often just the creation default), matched
 *     to the first small team whose roster includes them.
 *  4. The feature-ownership map (`useFeatureOwnership`).
 *
 * Assignees come from the public EAF endpoint and require PostHog/posthog#73466 to be
 * deployed; until then only steps 2 and 4 apply.
 */
export function useRoadmapEarlyAccessFeatures({
    teamSlug,
}: UseRoadmapEarlyAccessFeaturesOptions = {}): UseRoadmapEarlyAccessFeaturesResult {
    const earlyAccessFeatures = useEarlyAccessFeatures()
    const { features: ownedFeatures } = useFeatureOwnership()

    const { allSqueakTeam } = useStaticQuery<{ allSqueakTeam: { nodes: SqueakTeamAttributionNode[] } }>(graphql`
        query RoadmapTeamAttributionQuery {
            allSqueakTeam {
                nodes {
                    slug
                    name
                    profiles {
                        data {
                            attributes {
                                firstName
                                lastName
                            }
                        }
                    }
                }
            }
        }
    `)

    const teamByFeatureSlug = useMemo(() => {
        const map: Record<string, string> = {}
        ownedFeatures.forEach((feature) => {
            if (feature.owner?.[0]) {
                map[feature.slug] = feature.owner[0]
            }
        })
        return map
    }, [ownedFeatures])

    const { teamSlugByTeamName, teamSlugByPersonName } = useMemo(() => {
        const byTeamName: Record<string, string> = {}
        const byPersonName: Record<string, string> = {}
        ;(allSqueakTeam?.nodes || []).forEach((team) => {
            if (!team.slug) {
                return
            }
            byTeamName[team.slug] = team.slug
            if (team.name) {
                byTeamName[slugify(team.name)] = team.slug
            }
            team.profiles?.data?.forEach((profile) => {
                const personKey = slugify(
                    [profile.attributes?.firstName, profile.attributes?.lastName].filter(Boolean).join(' ')
                )
                // People can be on multiple teams — first team wins.
                if (personKey && !byPersonName[personKey]) {
                    byPersonName[personKey] = team.slug
                }
            })
        })
        return { teamSlugByTeamName: byTeamName, teamSlugByPersonName: byPersonName }
    }, [allSqueakTeam])

    const teamFromAssignee = useCallback(
        (assignee: EarlyAccessFeature['assignee']): string | undefined => {
            if (!assignee?.name) {
                return undefined
            }
            const key = slugify(assignee.name)
            return assignee.type === 'role' ? teamSlugByTeamName[key] : teamSlugByPersonName[key]
        },
        [teamSlugByTeamName, teamSlugByPersonName]
    )

    const teamForFeature = useCallback(
        (feature: EarlyAccessFeature): string | undefined => {
            const assigneeTeam = teamFromAssignee(feature.assignee)
            return (
                (feature.assignee?.type === 'role' ? assigneeTeam : undefined) ||
                ROADMAP_TEAM_OVERRIDES[feature.flagKey] ||
                (feature.assignee?.type === 'user' ? assigneeTeam : undefined) ||
                teamByFeatureSlug[feature.flagKey] ||
                teamByFeatureSlug[slugify(feature.name)]
            )
        },
        [teamByFeatureSlug, teamFromAssignee]
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

import { useCallback, useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import useEarlyAccessFeatures, { EarlyAccessFeature } from './useEarlyAccessFeatures'

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

/** Case-, whitespace-, and diacritic-insensitive key for matching people and team names. */
const normalizeName = (name: string): string =>
    name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim()

/**
 * Normalized candidates for matching a role assignee to a small team. PostHog roles are
 * conventionally named "Team X" while Squeak team names are just "X", so try the name
 * with a leading "team " (or trailing " team") stripped as well as verbatim.
 */
const roleNameCandidates = (name: string): string[] => {
    const normalized = normalizeName(name)
    const stripped = normalized.replace(/^team /, '').replace(/ team$/, '')
    return stripped && stripped !== normalized ? [normalized, stripped] : [normalized]
}

interface SqueakTeamOwnershipNode {
    slug: string
    name: string
    profiles?: { data?: { attributes?: { firstName?: string; lastName?: string } }[] }
}

/**
 * Adds small-team ownership to each Early Access Feature, resolved from the feature's
 * assignee in PostHog (served by the public EAF endpoint as a display name):
 *  - a `role` assignee matches a small team by name or slug,
 *  - a `user` assignee matches a team member profile by full name and takes that
 *    person's team.
 * Ownership therefore lives on the Early Access Feature itself — change the assignee in
 * the PostHog app to change the team shown here; there is no hard-coded feature-to-team
 * list on the website. Consumers can optionally select one small team's roadmap for
 * embedded views such as /ai.
 */
export function useRoadmapEarlyAccessFeatures({
    teamSlug,
}: UseRoadmapEarlyAccessFeaturesOptions = {}): UseRoadmapEarlyAccessFeaturesResult {
    const earlyAccessFeatures = useEarlyAccessFeatures()

    const { allSqueakTeam } = useStaticQuery<{ allSqueakTeam: { nodes: SqueakTeamOwnershipNode[] } }>(graphql`
        {
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

    const { teamSlugByPerson, teamSlugByTeamName, teamSlugs } = useMemo(() => {
        const byPerson: Record<string, string> = {}
        const byTeamName: Record<string, string> = {}
        const slugs = new Set<string>()
        allSqueakTeam.nodes.forEach((team) => {
            if (!team.slug) {
                return
            }
            slugs.add(team.slug)
            byTeamName[normalizeName(team.name)] = team.slug
            team.profiles?.data?.forEach((profile) => {
                const fullName = normalizeName(
                    [profile.attributes?.firstName, profile.attributes?.lastName].filter(Boolean).join(' ')
                )
                // People can appear on multiple teams (e.g. leads); keep their first team.
                if (fullName && !byPerson[fullName]) {
                    byPerson[fullName] = team.slug
                }
            })
        })
        return { teamSlugByPerson: byPerson, teamSlugByTeamName: byTeamName, teamSlugs: slugs }
    }, [allSqueakTeam])

    const teamForFeature = useCallback(
        (feature: EarlyAccessFeature): string | undefined => {
            const assignee = feature.assignee
            if (!assignee?.name) {
                return undefined
            }
            if (assignee.type === 'role') {
                for (const candidate of roleNameCandidates(assignee.name)) {
                    const asSlug = slugify(candidate)
                    const match = teamSlugByTeamName[candidate] || (teamSlugs.has(asSlug) ? asSlug : undefined)
                    if (match) {
                        return match
                    }
                }
                return undefined
            }
            return teamSlugByPerson[normalizeName(assignee.name)]
        },
        [teamSlugByPerson, teamSlugByTeamName, teamSlugs]
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

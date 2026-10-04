// Roadmap, changelog, and community data: SqueakRoadmap, the Strapi changelog (Roadmap), SqueakTeam roadmaps,
// early access features, achievements, rewards, community stats, post categories, and forum topic groups.
import dayjs from 'dayjs'
import { nodes } from '../index'
import type {
    AchievementGroupNode,
    AchievementNode,
    CommunityStatsNode,
    EarlyAccessFeatureNode,
    GithubPage,
    PostCategoryNode,
    RewardNode,
    RoadmapNode,
    SqueakRoadmapNode,
    SqueakTeamNode,
    SqueakTopicGroupNode,
} from '../types'
import type { QueryResult } from './index'

const roadmaps = () => nodes<SqueakRoadmapNode>('SqueakRoadmap')

/** Strapi changelog entries that shipped, newest first. */
const shippedChanges = () =>
    nodes<RoadmapNode>('Roadmap')
        .filter((change) => change.complete === true && change.date != null)
        .sort((a, b) => (b.date as string).localeCompare(a.date as string))

const reactionCount = (roadmap: SqueakRoadmapNode) =>
    (roadmap.githubPages[0] as GithubPage | undefined)?.reactions?.total_count ?? 0

/** Ascending, with missing values last. */
const ascending = (a: unknown, b: unknown) => {
    if (a == null || b == null) return (a == null ? 1 : 0) - (b == null ? 1 : 0)
    return String(a).localeCompare(String(b))
}

const formatDate = (date: string | null, format: string) => (date ? dayjs(date).format(format) : null)

/** Strapi `group(field)` results: the distinct values, sorted. */
const distinct = (values: (string | null | undefined)[]) =>
    [...new Set(values.filter((value): value is string => !!value))].sort()

interface AchievementItem {
    id: number
    title: string
    description: string | null
    points: number | null
    iconUrl: string | null
}

interface AchievementGroupItem {
    id: string
    title: string
    description: string | null
    tiered: boolean | null
    iconUrl: string | null
    achievements: AchievementItem[]
}

export const queries = {
    // GitHub reaction counts of the first linked issue, by SqueakRoadmap squeakId (zero counts left out).
    // Added to Strapi likes on the home board, the roadmap, and community feature requests.
    'roadmap-github-reactions': (): Record<number, number> =>
        Object.fromEntries(
            roadmaps()
                .map((roadmap) => [roadmap.squeakId, reactionCount(roadmap)])
                .filter(([, count]) => count > 0)
        ),

    // Milestones for the home timelines, oldest first.
    'roadmap-milestones': () =>
        roadmaps()
            .filter((roadmap) => roadmap.milestone === true)
            .sort((a, b) => ascending(a.dateCompleted, b.dateCompleted))
            .map(({ squeakId, dateCompleted, projectedCompletion, title, category, description }) => ({
                squeakId,
                dateCompleted: formatDate(dateCompleted, 'YYYY-MM-DD'),
                projectedCompletion: formatDate(projectedCompletion, 'YYYY-MM-DD'),
                title,
                category,
                description,
            })),

    // The home page roadmap tabs (Home/New/Roadmap): in-progress items and the size of each tab.
    'roadmap-home-tabs': () => {
        const wip = roadmaps()
            .filter((roadmap) => roadmap.complete !== true && roadmap.projectedCompletion != null)
            .sort((a, b) => ascending(a.createdAt, b.createdAt))
        return {
            wipCount: wip.length,
            // The tab shows the first five.
            wip: wip
                .slice(0, 5)
                .map(({ title, betaAvailable, description }) => ({ title, betaAvailable, description })),
            underConsiderationCount: roadmaps().filter(
                (roadmap) => roadmap.dateCompleted == null && roadmap.projectedCompletion == null
            ).length,
        }
    },

    // The older home page roadmap (Home/Roadmap.jsx): titles with vote counts, most votes first.
    'roadmap-home-votes': () => {
        // The old query read `githubPages.reactions` off an array, so only Strapi likes ever counted.
        const byVotes = (list: SqueakRoadmapNode[]) =>
            list
                .map(({ squeakId, title, likes }) => ({ squeakId, title, votes: likes?.data?.length ?? 0 }))
                .sort((a, b) => b.votes - a.votes)
        return {
            wip: byVotes(
                roadmaps().filter((roadmap) => roadmap.complete !== true && roadmap.projectedCompletion != null)
            ),
            underConsideration: byVotes(
                roadmaps().filter((roadmap) => roadmap.dateCompleted == null && roadmap.projectedCompletion == null)
            ),
        }
    },

    // In-progress roadmap items of each small team, for TeamRoadmap (via hooks/useRoadmap).
    'roadmap-team-roadmaps': () => {
        const byId = new Map(roadmaps().map((roadmap) => [roadmap.id, roadmap]))
        return nodes<SqueakTeamNode>('SqueakTeam').map(({ name, roadmaps: refs }) => ({
            name,
            roadmaps: refs
                .map((ref) => byId.get(ref.id))
                .filter((roadmap): roadmap is SqueakRoadmapNode => !!roadmap?.projectedCompletion && !roadmap.complete)
                .map((roadmap) => ({
                    squeakId: roadmap.squeakId,
                    betaAvailable: roadmap.betaAvailable,
                    complete: roadmap.complete,
                    dateCompleted: roadmap.dateCompleted,
                    title: roadmap.title,
                    description: roadmap.description,
                    image: roadmap.url ? { url: roadmap.url } : null,
                    githubPages: roadmap.githubPages
                        .filter((page): page is GithubPage => 'title' in page)
                        .map(({ title, html_url, number, closed_at, reactions }) => ({
                            title,
                            html_url,
                            number,
                            closed_at,
                            reactions: {
                                hooray: reactions.hooray,
                                heart: reactions.heart,
                                eyes: reactions.eyes,
                                plus1: reactions.plus1,
                            },
                        })),
                    projectedCompletion: roadmap.projectedCompletion,
                })),
        }))
    },

    // Small teams and their members' full names, to resolve early access feature assignees to a team.
    'roadmap-team-members': () =>
        nodes<SqueakTeamNode>('SqueakTeam').map(({ slug, name, profiles }) => ({
            slug,
            name,
            members: (profiles?.data ?? []).map(({ attributes }) =>
                [attributes?.firstName, attributes?.lastName].filter(Boolean).join(' ')
            ),
        })),

    // Build-time early access features. useEarlyAccessFeatures revalidates them in the browser.
    'roadmap-early-access-features': () =>
        nodes<EarlyAccessFeatureNode>('EarlyAccessFeature').map(
            ({ name, description, stage, documentationUrl, flagKey, featureId, waitlistCount, payload, assignee }) => ({
                name,
                description,
                stage,
                documentationUrl,
                flagKey,
                featureId,
                waitlistCount,
                payload,
                assignee: assignee ? { type: assignee.type, name: assignee.name } : null,
            })
        ),

    // Topic and team options for the changelog filters.
    'roadmap-changelog-filters': () => {
        const changes = shippedChanges()
        return {
            topics: distinct(changes.map((change) => change.topic?.data?.attributes?.label)),
            teams: distinct(
                changes.flatMap((change) => (change.teams?.data ?? []).map((team) => team.attributes?.name))
            ),
        }
    },

    // The latest shipped change of each team, for Product/RecentChange.
    'roadmap-latest-change-by-team': () => {
        const changes = nodes<RoadmapNode>('Roadmap')
            .filter((change) => change.complete === true)
            .sort((a, b) => ascending(b.date, a.date))
        const latest: Record<string, Omit<RecentChanges[number], 'date'> & { date: string | null }> = {}
        for (const change of changes) {
            for (const team of change.teams?.data ?? []) {
                const name = team.attributes?.name
                if (!name || latest[name]) continue
                latest[name] = {
                    title: change.title,
                    date: formatDate(change.date, 'MMM YYYY'),
                    description: change.description,
                    cta: change.cta ? { label: change.cta.label, url: change.cta.url } : null,
                }
            }
        }
        return latest
    },

    // The 50 latest shipped changes, for Hogpedia's recent changes page.
    'roadmap-recent-changes': () =>
        shippedChanges()
            .slice(0, 50)
            .map(({ date, title, description, cta }) => ({
                date: date as string,
                title,
                description,
                cta: cta ? { label: cta.label, url: cta.url } : null,
            })),

    // Forum topic groups and their topics, for the questions nav.
    'roadmap-topic-groups': () =>
        nodes<SqueakTopicGroupNode>('SqueakTopicGroup').map(({ label, topics }) => ({
            label,
            topics: topics.map((topic) => ({ label: topic.label, slug: topic.slug })),
        })),

    // Forum question counts by topic id, for the product page Questions section.
    'roadmap-topic-question-counts': (): Record<number, number> =>
        Object.fromEntries(
            nodes<CommunityStatsNode>('CommunityStats')
                .filter((stats) => stats.topicId != null)
                .map(({ topicId, questions }) => [topicId, questions])
        ),

    // Blog post categories (first node per folder) with their tag labels, and every tag across them, sorted.
    'roadmap-post-categories': () => {
        const excluded = new Set(['customers', 'spotlight', 'changelog', 'comparisons', 'notes', 'repost'])
        const categories = nodes<PostCategoryNode>('PostCategory').filter(
            ({ attributes }) => attributes.folder != null && !excluded.has(attributes.folder)
        )
        const tagLabels = (category: PostCategoryNode) =>
            (category.attributes.post_tags?.data ?? []).map((tag) => tag.attributes.label)
        return {
            categories: categories
                .filter(
                    (category, index) =>
                        index ===
                        categories.findIndex((other) => other.attributes.folder === category.attributes.folder)
                )
                .map((category) => ({
                    label: category.attributes.label,
                    folder: category.attributes.folder as string,
                    tags: tagLabels(category),
                })),
            allTags: [...new Set(categories.flatMap(tagLabels))].sort((a, b) => a.localeCompare(b)),
        }
    },

    // Community achievements: standalone achievements with points, and achievement groups, by points.
    'roadmap-achievements': (): (AchievementItem | AchievementGroupItem)[] => {
        const standalone: AchievementItem[] = nodes<AchievementNode>('Achievement')
            .filter((achievement) => (achievement.points ?? 0) > 0 && achievement.achievement_group?.data?.id == null)
            .map(({ strapiID, title, description, points, icon }) => ({
                id: strapiID,
                title,
                description,
                points,
                iconUrl: icon?.data?.attributes?.url ?? null,
            }))
        const groups: AchievementGroupItem[] = nodes<AchievementGroupNode>('AchievementGroup').map(
            ({ id, Title, description, tiered, icon, achievements }) => ({
                id,
                title: Title,
                description,
                tiered,
                iconUrl: icon?.data?.attributes?.url ?? null,
                achievements: (achievements?.data ?? []).map(({ id, attributes }) => ({
                    id,
                    title: attributes.title,
                    description: attributes.description,
                    points: attributes.points,
                    iconUrl: attributes.icon?.data?.attributes?.url ?? null,
                })),
            })
        )
        const points = (item: AchievementItem | AchievementGroupItem) =>
            ('achievements' in item ? item.achievements[0]?.points : item.points) ?? 0
        return [...standalone, ...groups].sort((a, b) => points(a) - points(b))
    },

    // Merch rewards that points can be spent on.
    'roadmap-rewards': () =>
        nodes<RewardNode>('Reward').map(
            ({ id, handle, title, description, price, image, merchStoreHandle, discountAmount }) => ({
                id,
                handle,
                title,
                description,
                price,
                image,
                merchStoreHandle,
                discountAmount: discountAmount ?? null,
            })
        ),
}

export type RoadmapGithubReactions = QueryResult<typeof queries, 'roadmap-github-reactions'>
export type RoadmapMilestones = QueryResult<typeof queries, 'roadmap-milestones'>
export type RoadmapHomeTabs = QueryResult<typeof queries, 'roadmap-home-tabs'>
export type RoadmapHomeVotes = QueryResult<typeof queries, 'roadmap-home-votes'>
export type TeamRoadmaps = QueryResult<typeof queries, 'roadmap-team-roadmaps'>
export type TeamMembers = QueryResult<typeof queries, 'roadmap-team-members'>
export type StaticEarlyAccessFeatures = QueryResult<typeof queries, 'roadmap-early-access-features'>
export type ChangelogFilters = QueryResult<typeof queries, 'roadmap-changelog-filters'>
export type LatestChangeByTeam = QueryResult<typeof queries, 'roadmap-latest-change-by-team'>
export type RecentChanges = QueryResult<typeof queries, 'roadmap-recent-changes'>
export type TopicGroups = QueryResult<typeof queries, 'roadmap-topic-groups'>
export type TopicQuestionCounts = QueryResult<typeof queries, 'roadmap-topic-question-counts'>
export type PostCategories = QueryResult<typeof queries, 'roadmap-post-categories'>
export type Achievements = QueryResult<typeof queries, 'roadmap-achievements'>
export type Rewards = QueryResult<typeof queries, 'roadmap-rewards'>
export type { AchievementGroupItem, AchievementItem }

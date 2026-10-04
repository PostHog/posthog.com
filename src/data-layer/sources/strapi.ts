// Strapi (Squeak) content types: Roadmap, PostCategory, CommunityStats,
// SdkReferences, Event, Achievement, AchievementGroup, Reward. Also the request helpers that squeak.ts uses.
import type { Source } from '../index'
import { SQUEAK_API_HOST } from '../env'
import { fetchJson, mapLimit } from '../http'
import { strapiImageNode } from '../images'
import type {
    AchievementAttributes,
    AchievementGroupAttributes,
    AchievementGroupNode,
    AchievementNode,
    CloudinaryMedia,
    CommunityStatsNode,
    EventAttributes,
    EventNode,
    PostCategoryAttributes,
    PostCategoryNode,
    Reward,
    RewardNode,
    RoadmapNode,
    SdkReferencesNode,
    SqueakRoadmapAttributes,
    SqueakTopicAttributes,
    StrapiEntity,
    StrapiMedia,
} from '../types'
import { SUPPORTED_SDK_IDS } from '../../components/SdkReferences/utils'

/* Strapi API responses */

export interface StrapiPagination {
    page: number
    pageSize: number
    pageCount: number
    total: number
}

export interface StrapiResponse<T> {
    data: T
    meta?: { pagination?: StrapiPagination }
}

export type StrapiListResponse<A> = StrapiResponse<StrapiEntity<A>[]>

export interface SdkReferenceAttributes {
    referenceId: string
    version: string
    data: SdkReferencesNode | null
}

export interface RewardsResponse {
    success: boolean
    data: Reward[]
}

/* Requests */

export type StrapiQueryValue =
    string | number | boolean | Date | null | undefined | StrapiQueryValue[] | { [key: string]: StrapiQueryValue }

/**
 * Serializes a Strapi query the way `qs.stringify(query, { encodeValuesOnly: true })` does:
 * nested keys in brackets, array items by index, dates as ISO strings, only values encoded.
 */
export function strapiQuery(query: { [key: string]: StrapiQueryValue }): string {
    // RFC 3986, as qs encodes: encodeURIComponent leaves !'()* alone
    const encode = (value: string) =>
        encodeURIComponent(value).replace(/[!'()*]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`)
    const parts: string[] = []
    const add = (key: string, value: StrapiQueryValue) => {
        if (value === undefined) return
        if (value === null) parts.push(`${key}=`)
        else if (value instanceof Date) parts.push(`${key}=${encode(value.toISOString())}`)
        else if (Array.isArray(value)) value.forEach((item, i) => add(`${key}[${i}]`, item))
        else if (typeof value === 'object')
            Object.entries(value).forEach(([inner, item]) => add(`${key}[${inner}]`, item))
        else parts.push(`${key}=${encode(String(value))}`)
    }
    Object.entries(query).forEach(([key, value]) => add(key, value))
    return parts.join('&')
}

export function strapi<T>(path: string, query: { [key: string]: StrapiQueryValue } = {}): Promise<T> {
    return fetchJson<T>(`${SQUEAK_API_HOST()}/api/${path}?${strapiQuery(query)}`)
}

/** Every entry of a paginated collection, 100 per request. */
export async function strapiAll<A>(
    path: string,
    query: { [key: string]: StrapiQueryValue } = {}
): Promise<StrapiEntity<A>[]> {
    const rows: StrapiEntity<A>[] = []
    for (let page = 1; ; page++) {
        const { data, meta } = await strapi<StrapiListResponse<A>>(path, {
            ...query,
            pagination: { page, pageSize: 100 },
        })
        rows.push(...(data ?? []))
        if (!((meta?.pagination?.pageCount ?? 0) > page)) return rows
    }
}

/** A Strapi media field with its Cloudinary fields (see images.ts). */
export const cloudinaryMedia = (media: StrapiMedia | null | undefined): CloudinaryMedia | null =>
    strapiImageNode(media) as CloudinaryMedia | null

const HOST = ['PUBLIC_SQUEAK_API_HOST']

/* Sources */

export interface RoadmapAttributes extends SqueakRoadmapAttributes {
    githubPRMetadata?: unknown
}

export const roadmapSource: Source = {
    name: 'strapi-roadmap',
    types: ['Roadmap'],
    requires: HOST,
    async fetch() {
        const roadmaps = await strapiAll<RoadmapAttributes>('roadmaps', {
            populate: {
                image: true,
                teams: { populate: { miniCrest: true } },
                topic: true,
                cta: true,
                profiles: { populate: { avatar: true, teams: { populate: { miniCrest: true } } } },
                githubUrls: true,
                githubPRMetadata: true,
            },
        })
        const nodes: RoadmapNode[] = roadmaps.map(({ id, attributes }) => {
            const { image, projectedCompletion, dateCompleted, category, ...other } = attributes
            const date = dateCompleted || projectedCompletion
            return {
                strapiID: id,
                date,
                media: cloudinaryMedia(image),
                type: category,
                // Strapi date fields are YYYY-MM-DD, so the year is the first four characters
                year: date ? Number(date.slice(0, 4)) : null,
                projectedCompletion,
                dateCompleted,
                ...other,
                id: `roadmap-${id}`,
            }
        })
        return { Roadmap: nodes }
    },
}

export const postCategorySource: Source = {
    name: 'strapi-post-categories',
    types: ['PostCategory'],
    requires: HOST,
    async fetch() {
        const categories = await strapiAll<PostCategoryAttributes>('post-categories', { populate: '*' })
        const nodes: PostCategoryNode[] = categories.map(({ id, attributes }) => ({
            attributes,
            id: `post-category-${id}`,
        }))
        return { PostCategory: nodes }
    },
}

export const communityStatsSource: Source = {
    name: 'strapi-community-stats',
    types: ['CommunityStats'],
    requires: HOST,
    async fetch() {
        const notArchived = { $or: [{ archived: { $null: true } }, { archived: { $eq: false } }] }
        const total = async (path: 'questions' | 'replies', filters: { [key: string]: StrapiQueryValue }) => {
            try {
                const res = await strapi<StrapiListResponse<unknown>>(path, {
                    filters,
                    fields: ['id'],
                    pagination: { pageSize: 1, withCount: true },
                })
                return res.meta?.pagination?.total ?? 0
            } catch (error) {
                console.warn(`[data-layer] community stats (${path}) failed: ${(error as Error).message}`)
                return 0
            }
        }
        let topics: StrapiEntity<Partial<SqueakTopicAttributes>>[] = []
        try {
            const res = await strapi<StrapiListResponse<Partial<SqueakTopicAttributes>>>('topics', {
                fields: ['label', 'slug'],
                pagination: { pageSize: 200 },
            })
            topics = res.data ?? []
        } catch (error) {
            console.warn(`[data-layer] community stats topics failed: ${(error as Error).message}`)
        }
        const targets: Pick<CommunityStatsNode, 'topicId' | 'topicSlug' | 'topicLabel'>[] = [
            { topicId: null, topicSlug: null, topicLabel: null },
            ...topics.map((topic) => ({
                topicId: topic.id,
                topicSlug: topic.attributes?.slug ?? null,
                topicLabel: topic.attributes?.label ?? null,
            })),
        ]
        const nodes: CommunityStatsNode[] = await mapLimit(targets, 8, async (target) => {
            const questionTopic = target.topicId ? { topics: { id: { $eq: target.topicId } } } : {}
            const replyTopic = target.topicId ? { question: { topics: { id: { $eq: target.topicId } } } } : {}
            const [questions, resolved, replies, helpful] = await Promise.all([
                total('questions', { ...notArchived, ...questionTopic }),
                total('questions', { ...notArchived, ...questionTopic, resolved: { $eq: true } }),
                total('replies', { ...replyTopic }),
                total('replies', { ...replyTopic, helpful: { $eq: true } }),
            ])
            return {
                id: `community-stats-${target.topicId ?? 'site'}`,
                ...target,
                questions,
                resolved,
                replies,
                helpful,
            }
        })
        return { CommunityStats: nodes }
    },
}

/** Keep the pinned `latest` row and the newest N versioned rows per SDK, so builds stay fast. */
const MAX_VERSIONS_PER_SDK = 10

export const sdkReferencesSource: Source = {
    name: 'strapi-sdk-references',
    types: ['SdkReferences'],
    requires: HOST,
    async fetch() {
        const rows = async (filters: { [key: string]: StrapiQueryValue }, pageSize: number) =>
            (
                await strapi<StrapiListResponse<SdkReferenceAttributes>>('sdk-references', {
                    filters,
                    pagination: { page: 1, pageSize },
                    sort: ['createdAt:desc'],
                })
            ).data ?? []
        const batches = await mapLimit(
            SUPPORTED_SDK_IDS.flatMap((referenceId) => [
                () => rows({ referenceId: { $eq: referenceId }, version: { $containsi: 'latest' } }, 1),
                () =>
                    rows(
                        { referenceId: { $eq: referenceId }, version: { $notContainsi: 'latest' } },
                        MAX_VERSIONS_PER_SDK
                    ),
            ]),
            6,
            (task) => task()
        )
        // The node is the reference payload itself, which carries its own unique `id` (e.g. posthog-js-1.2.3)
        const byId = new Map<string, SdkReferencesNode>()
        for (const reference of batches.flat()) {
            const data = reference.attributes?.data
            if (data) byId.set(data.id, data)
        }
        return { SdkReferences: [...byId.values()] }
    },
}

export const eventSource: Source = {
    name: 'strapi-events',
    types: ['Event'],
    requires: HOST,
    async fetch() {
        const events = await strapiAll<EventAttributes>('events', {
            sort: ['date:desc'],
            populate: { location: { populate: ['venue'] }, photos: true, speakers: true, partners: true },
        })
        const nodes: EventNode[] = events.map((event) => ({ ...event, strapiID: event.id, id: `event-${event.id}` }))
        return { Event: nodes }
    },
}

export const achievementSource: Source = {
    name: 'strapi-achievements',
    types: ['Achievement', 'AchievementGroup'],
    requires: HOST,
    async fetch() {
        const [achievements, groups] = await Promise.all([
            strapi<StrapiListResponse<AchievementAttributes>>('achievements', {
                populate: ['icon', 'achievement_group.achievements.icon'],
                publicationState: 'preview',
            }),
            strapi<StrapiListResponse<AchievementGroupAttributes>>('achievement-groups', {
                populate: ['achievements.icon', 'icon'],
                publicationState: 'preview',
            }),
        ])
        const Achievement: AchievementNode[] = achievements.data.map(({ id, attributes }) => ({
            strapiID: id,
            ...attributes,
            id: `achievement-${id}`,
        }))
        const AchievementGroup: AchievementGroupNode[] = groups.data.map(({ id, attributes }) => ({
            strapiID: id,
            ...attributes,
            id: `achievement-group-${id}`,
        }))
        return { Achievement, AchievementGroup }
    },
}

export const rewardSource: Source = {
    name: 'strapi-rewards',
    types: ['Reward'],
    requires: HOST,
    async fetch() {
        const { data } = await strapi<RewardsResponse>('points/rewards')
        const nodes: RewardNode[] = data.map((reward) => ({ ...reward, id: `reward-${reward.handle}` }))
        return { Reward: nodes }
    },
}

export const strapiSources: Source[] = [
    roadmapSource,
    postCategorySource,
    communityStatsSource,
    sdkReferencesSource,
    eventSource,
    achievementSource,
    rewardSource,
]

// Squeak (Strapi) profiles, teams, roadmaps and topics.
//
// Linked fields are plain data that a query joins itself:
// - SqueakTopicGroup.topics: embedded topics (`{ id, squeakId, slug, label, ... }`). Topics the
//   SqueakTopic list does not hold are dropped.
// - SqueakTeam.roadmaps: `[{ id, squeakId }]`, where `id` is a SqueakRoadmap id. Join with
//   `nodes('SqueakRoadmap')`. Not embedded, because roadmaps link back to teams.
// - SqueakRoadmap.teams: `[{ id, squeakId }]`, where `id` is a SqueakTeam id.
// - SqueakTeam.emojis: the raw list of emoji names. Join with `nodes('SlackEmoji')` by `name`.
// - AuthorsJson.profile_id and contributor GitHub URLs join to SqueakProfile by `squeakId` / `github`.
import fs from 'node:fs'
import path from 'node:path'
import type { Source } from '../index'
import { env, MINIMAL_BUILD } from '../env'
import { mapLimit } from '../http'
import { ROOT } from '../paths'
import type {
    Author,
    CloudinaryFields,
    GithubPage,
    SqueakProfileAttributes,
    SqueakProfileNode,
    SqueakRoadmapAttributes,
    SqueakRoadmapNode,
    SqueakTeamAttributes,
    SqueakTeamNode,
    SqueakTopicAttributes,
    SqueakTopicGroupNode,
    SqueakTopicNode,
    StrapiMedia,
    StrapiRelationList,
} from '../types'
import { cloudinaryMedia, strapi, strapiAll, type StrapiListResponse } from './strapi'

/* Strapi API responses */

export interface SqueakTopicGroupAttributes {
    label: string
    slug: string | null
    topics: StrapiRelationList<Record<string, never>>
    [key: string]: unknown
}

/** A GitHub issue or pull request in the roadmap reactions query. */
export interface GithubIssue {
    title: string
    url: string
    number: number
    closedAt: string | null
    reactionGroups: { content: string; reactors: { totalCount: number } }[]
}

export interface GithubIssuesResponse {
    data?: { repository: Record<string, GithubIssue | null> | null } | null
}

const started = () => ({ $and: [{ startDate: { $notNull: true } }, { startDate: { $lte: new Date() } }] })

/** The Cloudinary fields of a Strapi media field, without the Strapi data around them. */
function cloudinaryFields(media: StrapiMedia | null | undefined): Partial<CloudinaryFields> {
    const image = cloudinaryMedia(media)
    if (!image?.publicId) return {}
    const { cloudName, publicId, originalWidth, originalHeight, originalFormat, gatsbyImageData } = image
    return { cloudName, publicId, originalWidth, originalHeight, originalFormat, gatsbyImageData }
}

async function fetchProfiles(): Promise<SqueakProfileNode[]> {
    const authors: Author[] = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/authors.json'), 'utf8'))
    const authorProfileIds = authors.flatMap((author) => (author.profile_id ? [author.profile_id] : []))
    // Active team members, and any author with a profile
    const profiles = await strapiAll<SqueakProfileAttributes>('profiles', {
        filters: { $or: [started(), { id: { $in: authorProfileIds } }] },
        populate: ['avatar', 'teams', 'leadTeams', 'quotes', 'color'],
    })
    return profiles.map(({ id, attributes }) => {
        const { avatar, ...profileData } = attributes
        return {
            squeakId: id,
            avatar: avatar?.data?.attributes ?? null,
            ...profileData,
            id: `squeak-profile-${id}`,
        }
    })
}

async function fetchTopics(): Promise<{ SqueakTopic: SqueakTopicNode[]; SqueakTopicGroup: SqueakTopicGroupNode[] }> {
    const [groups, topics] = await Promise.all([
        strapi<StrapiListResponse<SqueakTopicGroupAttributes>>('topic-groups', {
            populate: { topics: { fields: ['id'] } },
        }),
        strapi<StrapiListResponse<SqueakTopicAttributes>>('topics', { pagination: { page: 1, pageSize: 100 } }),
    ])
    const SqueakTopic: SqueakTopicNode[] = topics.data.map(({ id, attributes }) => ({
        squeakId: id,
        ...attributes,
        id: `squeak-topic-${id}`,
    }))
    const topicsById = new Map(SqueakTopic.map((topic) => [topic.squeakId, topic]))
    const SqueakTopicGroup: SqueakTopicGroupNode[] = groups.data.map(({ id, attributes }) => {
        const { topics: groupTopics, ...rest } = attributes
        return {
            squeakId: id,
            ...rest,
            topics: (groupTopics?.data ?? []).flatMap((topic) => topicsById.get(topic.id) ?? []),
            id: `squeak-topic-group-${id}`,
        }
    })
    return { SqueakTopic, SqueakTopicGroup }
}

async function fetchTeams(): Promise<SqueakTeamNode[]> {
    const teams = await strapi<StrapiListResponse<SqueakTeamAttributes>>('teams', {
        pagination: { page: 1, pageSize: 100 },
        populate: {
            roadmaps: { fields: ['id'] },
            profiles: { filters: started(), populate: '*' },
            leadProfiles: { filters: started(), fields: 'id' },
            crest: true,
            crestOptions: true,
            miniCrest: true,
            teamImage: { populate: { image: true } },
            tagline: true,
        },
    })
    return teams.data.map(({ id, attributes }) => {
        const { roadmaps, crest, miniCrest, teamImage, ...rest } = attributes
        return {
            squeakId: id,
            teamImage: teamImage ? { ...teamImage, ...cloudinaryFields(teamImage.image) } : null,
            crest: { ...crest, ...cloudinaryFields(crest) },
            miniCrest: { ...miniCrest, ...cloudinaryFields(miniCrest) },
            ...rest,
            roadmaps: (roadmaps?.data ?? []).map((roadmap) => ({
                id: `squeak-roadmap-${roadmap.id}`,
                squeakId: roadmap.id,
            })),
            id: `squeak-team-${id}`,
        }
    })
}

const isGitHubUrl = (url: string) => {
    try {
        return new URL(url).hostname === 'github.com'
    } catch {
        return false
    }
}

// Roadmap vote counts come from GitHub issues, fetched with batched GraphQL queries: 50 issues per
// query, 4 at once, 3 attempts each. A missing issue keeps an empty slot.
async function fetchGitHubPages(urls: string[]): Promise<Map<string, GithubPage>> {
    const byRepo = new Map<string, { url: string; number: string }[]>()
    for (const url of new Set(urls)) {
        const [owner, repo, , segment] = url.split('/').slice(3)
        // Some URLs carry a #comment anchor or a comma-joined list: read the leading number
        const number = segment?.match(/^\d+/)?.[0]
        if (!number) continue
        byRepo.set(`${owner}/${repo}`, [...(byRepo.get(`${owner}/${repo}`) || []), { url, number }])
    }
    const chunks = [...byRepo].flatMap(([repo, issues]) =>
        Array.from({ length: Math.ceil(issues.length / 50) }, (_, i) => ({
            repo,
            issues: issues.slice(i * 50, i * 50 + 50),
        }))
    )
    const fields = 'title url number closedAt reactionGroups { content reactors { totalCount } }'
    const pages = new Map<string, GithubPage>()

    await mapLimit(chunks, 4, async ({ repo, issues }) => {
        const [owner, name] = repo.split('/')
        const selections = issues
            .map(
                ({ number }, i) =>
                    `i${i}: issueOrPullRequest(number: ${number}) { ... on Issue { ${fields} } ... on PullRequest { ${fields} } }`
            )
            .join('\n')
        const query = `query { repository(owner: ${JSON.stringify(owner)}, name: ${JSON.stringify(
            name
        )}) { ${selections} } }`
        for (let attempt = 1; ; attempt++) {
            try {
                const response = await fetch('https://api.github.com/graphql', {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${env('GITHUB_API_KEY')}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query }),
                })
                if (!response.ok) throw new Error(`GitHub GraphQL responded ${response.status}`)
                // Issues that no longer exist come back as null with a NOT_FOUND error
                const { data } = (await response.json()) as GithubIssuesResponse
                if (!data) throw new Error('GitHub GraphQL returned no data')
                issues.forEach(({ url }, i) => {
                    const issue = data.repository?.[`i${i}`]
                    if (!issue) return
                    const count = (content: string) =>
                        issue.reactionGroups.find((group) => group.content === content)?.reactors.totalCount || 0
                    pages.set(url, {
                        title: issue.title,
                        html_url: issue.url,
                        number: issue.number,
                        closed_at: issue.closedAt,
                        reactions: {
                            total_count: issue.reactionGroups.reduce(
                                (sum, group) => sum + group.reactors.totalCount,
                                0
                            ),
                            plus1: count('THUMBS_UP'),
                            minus1: count('THUMBS_DOWN'),
                            hooray: count('HOORAY'),
                            heart: count('HEART'),
                            eyes: count('EYES'),
                        },
                    })
                })
                return
            } catch (error) {
                if (attempt >= 3) {
                    console.warn(`[data-layer] GitHub issues for ${repo} failed: ${(error as Error).message}`)
                    return
                }
                await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000 * 2 ** attempt))
            }
        }
    })
    return pages
}

async function fetchRoadmaps(): Promise<SqueakRoadmapNode[]> {
    const roadmaps = await strapiAll<SqueakRoadmapAttributes>('roadmaps', {
        populate: { teams: { fields: ['id'] }, image: { fields: '*' }, likes: true, cta: true },
    })
    const githubPages =
        env('GITHUB_API_KEY') && !MINIMAL_BUILD()
            ? await fetchGitHubPages(
                  roadmaps.flatMap((roadmap) => (roadmap.attributes.githubUrls || []).filter(isGitHubUrl))
              )
            : null
    return roadmaps.map(({ id, attributes }) => {
        const { teams, image, ...rest } = attributes
        return {
            squeakId: id,
            ...rest,
            media: cloudinaryMedia(image),
            ...(image?.data && { url: image.data.attributes.url }),
            teams: (teams?.data ?? []).map((team) => ({ id: `squeak-team-${team.id}`, squeakId: team.id })),
            githubPages: githubPages
                ? (rest.githubUrls || []).filter(isGitHubUrl).map((url) => githubPages.get(url) || {})
                : [],
            id: `squeak-roadmap-${id}`,
        }
    })
}

export const squeakSource: Source = {
    name: 'squeak',
    types: ['SqueakProfile', 'SqueakTopicGroup', 'SqueakTopic', 'SqueakTeam', 'SqueakRoadmap'],
    requires: ['PUBLIC_SQUEAK_API_HOST'],
    async fetch() {
        const [SqueakProfile, topics, SqueakTeam, SqueakRoadmap] = await Promise.all([
            fetchProfiles(),
            fetchTopics(),
            fetchTeams(),
            fetchRoadmaps(),
        ])
        return { SqueakProfile, ...topics, SqueakTeam, SqueakRoadmap }
    },
}

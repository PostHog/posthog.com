import { useEffect, useState } from 'react'
import qs from 'qs'
import { useUser } from './useUser'

/**
 * Powers /community/alerts — the map of which question topics notify which teams in which
 * Slack channel.
 *
 * The wiring lives in Strapi as `Topic.teamSubscribers -> Team -> Team.slackChannel`, and
 * squeak-strapi's question lifecycle posts to those channels when a question is created.
 * We read it from the Team side because `Team.topicSubscriptions` is the inverse relation
 * and moderators already hold `api::team.team.update` (they do *not* hold
 * `api::topic.topic.update`), so every edit here is a PUT to /api/teams/:id.
 *
 * This hook owns the topic <-> team associations only. The channel ID itself is edited on
 * each team's own page (/teams/<slug>); `slackChannel` is read here purely to flag teams
 * that are subscribed to topics but have no channel, which post nothing.
 */

const API_HOST = process.env.GATSBY_SQUEAK_API_HOST

export interface AlertTeam {
    id: number
    name: string
    slug: string
    slackChannel: string | null
    topicIDs: number[]
    /** Unpublished teams don't appear on /teams, but they still receive alerts — see below. */
    draft: boolean
}

export interface AlertTopic {
    id: number
    label: string
    slug: string
    group: string | null
    teams: AlertTeam[]
}

// `publicationState: 'preview'` is deliberate, not a copy-paste from useTeam. The question
// lifecycle in squeak-strapi reads teamSubscribers through the entity service without passing
// a publicationState, so no published_at filter is applied and unpublished teams get notified
// just like published ones. Querying 'live' here would hide teams that really do receive
// alerts (as of writing: CDP, PostHog AI, and Pipeline are all unpublished but subscribed).
const teamsQuery = qs.stringify(
    {
        fields: ['name', 'slug', 'publishedAt', 'slackChannel'],
        populate: {
            topicSubscriptions: {
                fields: ['id'],
            },
        },
        publicationState: 'preview',
        pagination: { pageSize: 200 },
        sort: ['name:asc'],
    },
    { encodeValuesOnly: true }
)

const topicsQuery = qs.stringify(
    {
        fields: ['label', 'slug'],
        pagination: { pageSize: 200 },
        sort: ['label:asc'],
    },
    { encodeValuesOnly: true }
)

// Only the group -> topic mapping. Deliberately not reusing Squeak's `fetchTopicGroups`,
// which also pulls every question in every topic.
const topicGroupsQuery = qs.stringify(
    {
        fields: ['label'],
        populate: {
            topics: {
                fields: ['id'],
            },
        },
        pagination: { pageSize: 100 },
    },
    { encodeValuesOnly: true }
)

export default function useCommunityAlerts() {
    const { getJwt, isModerator } = useUser()
    const [topics, setTopics] = useState<AlertTopic[]>([])
    const [teams, setTeams] = useState<AlertTeam[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchAlerts = async () => {
        const jwt = await getJwt()
        const headers = jwt ? { Authorization: `Bearer ${jwt}` } : undefined

        const [teamsRes, topicsRes, groupsRes] = await Promise.all([
            fetch(`${API_HOST}/api/teams?${teamsQuery}`, { headers }).then((res) => res.json()),
            fetch(`${API_HOST}/api/topics?${topicsQuery}`).then((res) => res.json()),
            fetch(`${API_HOST}/api/topic-groups?${topicGroupsQuery}`).then((res) => res.json()),
        ])

        const nextTeams: AlertTeam[] = (teamsRes?.data ?? []).map((team: any) => ({
            id: team.id,
            name: team.attributes.name,
            slug: team.attributes.slug,
            slackChannel: team.attributes.slackChannel ?? null,
            topicIDs: (team.attributes.topicSubscriptions?.data ?? []).map((topic: any) => topic.id),
            draft: !team.attributes.publishedAt,
        }))

        const groupByTopicID = new Map<number, string>()
        for (const group of groupsRes?.data ?? []) {
            for (const topic of group.attributes.topics?.data ?? []) {
                groupByTopicID.set(topic.id, group.attributes.label)
            }
        }

        const nextTopics: AlertTopic[] = (topicsRes?.data ?? []).map((topic: any) => ({
            id: topic.id,
            label: topic.attributes.label,
            slug: topic.attributes.slug,
            group: groupByTopicID.get(topic.id) ?? null,
            teams: nextTeams.filter((team) => team.topicIDs.includes(topic.id)),
        }))

        setTeams(nextTeams)
        setTopics(nextTopics)
    }

    // Mutations surface failures through `error` rather than rejecting, so callers can fire
    // and forget without leaving unhandled rejections behind.
    const updateTeam = async (teamID: number, data: Record<string, unknown>) => {
        setError(null)
        try {
            const jwt = await getJwt()
            const res = await fetch(`${API_HOST}/api/teams/${teamID}`, {
                method: 'PUT',
                body: JSON.stringify({ data }),
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'content-type': 'application/json',
                },
            })
            if (!res.ok) throw new Error(`Strapi returned ${res.status}`)
            await fetchAlerts()
        } catch (err: any) {
            setError(`Couldn't save: ${err.message}`)
        }
    }

    const subscribeTeam = (topicID: number, teamID: number) =>
        updateTeam(teamID, { topicSubscriptions: { connect: [topicID] } })

    const unsubscribeTeam = (topicID: number, teamID: number) =>
        updateTeam(teamID, { topicSubscriptions: { disconnect: [topicID] } })

    useEffect(() => {
        if (!isModerator) return
        setLoading(true)
        setError(null)
        fetchAlerts()
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [isModerator])

    return {
        topics,
        teams,
        loading,
        error,
        fetchAlerts,
        subscribeTeam,
        unsubscribeTeam,
    }
}

import { useMemo } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import useSWRInfinite from 'swr/infinite'
import qs from 'qs'
import slugify from 'slugify'
import { useUser } from 'hooks/useUser'
import { useToast } from '../../context/Toast'
import { useQuestions } from 'hooks/useQuestions'
import { ForumSubscription, ForumTagData, ForumTopicData, StrapiRecord } from 'lib/strapi'

const API = `${process.env.GATSBY_SQUEAK_API_HOST}/api`

export type ForumSort = 'latest' | 'active' | 'popular'
export type ForumTopic = StrapiRecord<ForumTopicData>
export type ForumTag = StrapiRecord<ForumTagData>
export type DeliveryMode = ForumSubscription['deliveryMode']

export const toSlug = (label: string) => slugify(label, { lower: true, strict: true })

export const THROTTLED_MESSAGE = 'You are doing that too often. Please wait a minute, then try again.'

// Strapi's rate limit answers 429. One notice at a time is enough, even when several requests hit the limit.
let lastThrottleNotice = 0

// Sends a request to Strapi and throws the server's error message, so forms can show it. A throttled request also
// shows a notice, because some callers (votes, subscriptions) have no place to show an error.
const useForumRequest = () => {
    const { getJwt } = useUser()
    const { addToast } = useToast()
    return async <T = any>(path: string, { method = 'GET', body }: { method?: string; body?: unknown } = {}) => {
        const jwt = await getJwt()
        const res = await fetch(`${API}${path}`, {
            method,
            headers: {
                ...(body ? { 'Content-Type': 'application/json' } : {}),
                ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
            },
            ...(body ? { body: JSON.stringify(body) } : {}),
        })
        const json = await res.json().catch(() => null)
        if (res.status === 429) {
            if (Date.now() - lastThrottleNotice > 10000) {
                lastThrottleNotice = Date.now()
                addToast({ error: true, title: 'You are going a little fast', description: THROTTLED_MESSAGE })
            }
            throw new Error(THROTTLED_MESSAGE)
        }
        if (!res.ok) throw new Error(json?.error?.message || `Request failed (${res.status})`)
        return json as T
    }
}

const topicsQuery = qs.stringify(
    {
        sort: ['sortOrder:asc', 'label:asc'],
        pagination: { pageSize: 100 },
        populate: {
            tags: { fields: ['label', 'slug', 'sortOrder', 'description'], sort: ['sortOrder:asc', 'label:asc'] },
        },
    },
    { encodeValuesOnly: true }
)

export type TopicInput = Omit<ForumTopicData, 'tags'>

export const useForumTopics = () => {
    const request = useForumRequest()
    const { data, mutate, isLoading } = useSWR<{ data: ForumTopic[] }>(
        `${API}/forum-topics?${topicsQuery}`,
        (url: string) => fetch(url).then((res) => res.json())
    )
    const topics = data?.data ?? []

    return {
        topics,
        isLoading,
        refresh: mutate,
        getTopic: (slug?: string) => topics.find((topic) => topic.attributes.slug === slug),
        createTopic: async (topic: TopicInput) => {
            const res = await request<{ data: ForumTopic }>('/forum-topics', { method: 'POST', body: { data: topic } })
            await mutate()
            return res.data
        },
        updateTopic: async (id: number, topic: Partial<TopicInput>) => {
            await request(`/forum-topics/${id}`, { method: 'PUT', body: { data: topic } })
            await mutate()
        },
        // Saves a new sidebar order. Each topic whose place changes gets its index as its sortOrder, which also
        // separates topics that had the same sortOrder.
        reorderTopics: async (ids: number[]) => {
            const byId = new Map(topics.map((topic) => [topic.id, topic]))
            const ordered = ids.flatMap((id) => byId.get(id) ?? [])
            const moved = ordered.map((topic, index) => ({
                ...topic,
                attributes: { ...topic.attributes, sortOrder: index },
            }))
            const changed = moved.filter(
                (topic, index) => topic.attributes.sortOrder !== ordered[index].attributes.sortOrder
            )
            if (!changed.length) return
            await mutate({ data: moved }, false)
            try {
                await Promise.all(
                    changed.map((topic) =>
                        request(`/forum-topics/${topic.id}`, {
                            method: 'PUT',
                            body: { data: { sortOrder: topic.attributes.sortOrder } },
                        })
                    )
                )
            } finally {
                await mutate()
            }
        },
        // A topic with posts must say where they go. The forum UI offers move and delete, not detach.
        deleteTopic: async (id: number, posts?: { action: 'move'; moveTo: number } | { action: 'delete' }) => {
            const params =
                posts?.action === 'move' ? { posts: 'move', moveTo: posts.moveTo } : posts && { posts: 'delete' }
            await request(`/forum-topics/${id}${params ? `?${qs.stringify(params)}` : ''}`, { method: 'DELETE' })
            await mutate()
        },
        countPosts: async (id: number) => {
            const query = qs.stringify(
                { filters: { forumTopic: { id: { $eq: id } } }, fields: ['id'], pagination: { pageSize: 1 } },
                { encodeValuesOnly: true }
            )
            const res = await request<{ meta: { pagination: { total: number } } }>(`/questions?${query}`)
            return res.meta.pagination.total
        },
    }
}

// One topic's tags for its Tags page, searched on the server, 10 at a time, each with its post count. loadMore adds
// the next 10, so the page stays fast as the list grows.
export const useForumTagSearch = (topicId: number | undefined, search: string, pageSize = 10) => {
    const { data, size, setSize, mutate, isLoading, isValidating } = useSWRInfinite<{
        data: ForumTag[]
        meta: { pagination: { total: number } }
    }>(
        (index) =>
            topicId
                ? `${API}/forum-tags?${qs.stringify(
                      {
                          sort: ['label:asc'],
                          filters: {
                              topic: { id: { $eq: topicId } },
                              ...(search.trim() ? { label: { $containsi: search.trim() } } : {}),
                          },
                          fields: ['label', 'slug', 'sortOrder', 'description'],
                          populate: { questions: { count: true } },
                          pagination: { page: index + 1, pageSize },
                      },
                      { encodeValuesOnly: true }
                  )}`
                : null,
        (url: string) => fetch(url).then((res) => res.json()),
        // A new search keeps the old results on screen until its own arrive, so the list does not flash empty.
        { keepPreviousData: true }
    )
    const tags = data?.flatMap((page) => page.data ?? []) ?? []
    const total = data?.[0]?.meta?.pagination?.total ?? 0
    return {
        tags,
        total,
        hasMore: tags.length < total,
        isLoading: isLoading || (isValidating && size > (data?.length ?? 0)),
        isValidating,
        loadMore: () => setSize(size + 1),
        refresh: mutate,
    }
}

// Published forum posts whose title contains the search, for `#` suggestions in the editor. Searches start at two
// characters.
export const useForumPostSearch = (search: string, pageSize = 5) => {
    const query = search.trim()
    const { data, isValidating } = useSWR<{
        data: {
            id: number
            attributes: { subject: string; permalink: string; forumTopic?: { data: ForumTopic | null } }
        }[]
    }>(
        query.length >= 2
            ? `${API}/questions?${qs.stringify(
                  {
                      sort: ['activeAt:desc'],
                      filters: { forumTopic: { id: { $notNull: true } }, subject: { $containsi: query } },
                      fields: ['subject', 'permalink'],
                      populate: { forumTopic: { fields: ['slug'] } },
                      pagination: { pageSize },
                  },
                  { encodeValuesOnly: true }
              )}`
            : null,
        (url: string) => fetch(url).then((res) => res.json()),
        { keepPreviousData: true }
    )
    return { posts: query.length >= 2 ? data?.data ?? [] : [], isValidating }
}

export type TagInput = { label: string; description?: string | null }

// Every tag with its topic, for the tag filter on All posts and Following. A topic has at most 30 tags, so one
// page is enough for a forum with a few topics.
export const useForumTags = () => {
    const request = useForumRequest()
    const { mutate: mutateKey } = useSWRConfig()
    const query = qs.stringify(
        {
            sort: ['sortOrder:asc', 'label:asc'],
            populate: { topic: { fields: ['label', 'slug'] } },
            pagination: { pageSize: 100 },
        },
        { encodeValuesOnly: true }
    )
    const { data, mutate } = useSWR<{ data: ForumTag[] }>(`${API}/forum-tags?${query}`, (url: string) =>
        fetch(url).then((res) => res.json())
    )
    // Topic feeds and the Edit tags dialog read tags from the topic list, so a change refreshes it too.
    const refreshAll = () => Promise.all([mutate(), mutateKey(`${API}/forum-topics?${topicsQuery}`)])

    return {
        tags: data?.data ?? [],
        refresh: mutate,
        createTag: async (topicId: number, { label, description }: TagInput) => {
            const res = await request<{ data: ForumTag }>('/forum-tags', {
                method: 'POST',
                body: { data: { label, slug: toSlug(label), description: description || null, topic: topicId } },
            })
            await refreshAll()
            return res.data
        },
        updateTag: async (id: number, { label, description }: TagInput) => {
            await request(`/forum-tags/${id}`, {
                method: 'PUT',
                body: { data: { label, slug: toSlug(label), description: description || null } },
            })
            await refreshAll()
        },
        // With moveTo, the tag's posts and subscriptions move to that tag (in the same topic) first.
        deleteTag: async (id: number, moveTo?: number) => {
            await request(`/forum-tags/${id}${moveTo ? `?${qs.stringify({ posts: 'move', moveTo })}` : ''}`, {
                method: 'DELETE',
            })
            await refreshAll()
        },
    }
}

export const useForumSubscriptions = () => {
    const { user } = useUser()
    const request = useForumRequest()
    const { data, mutate } = useSWR<{ data: ForumSubscription[] }>(user ? ['forum-subscriptions', user.id] : null, () =>
        request('/forum-subscriptions')
    )
    const subscriptions = data?.data ?? []

    return {
        // Signed in, and the list has not arrived yet.
        isLoading: !!user && !data,
        subscriptions,
        topicSubscription: (topicId?: number) => subscriptions.find((sub) => sub.forumTopic?.id === topicId),
        tagSubscription: (tagId?: number) => subscriptions.find((sub) => sub.forumTag?.id === tagId),
        // PUT creates a subscription or changes its delivery mode, then returns the full list.
        subscribe: async (target: { forumTopic: number } | { forumTag: number }, deliveryMode: DeliveryMode) => {
            const res = await request<{ data: ForumSubscription[] }>('/forum-subscriptions', {
                method: 'PUT',
                body: { data: { ...target, deliveryMode } },
            })
            await mutate(res, false)
        },
        unsubscribe: async (id: number) => {
            await mutate({ data: subscriptions.filter((sub) => sub.id !== id) }, false)
            await request(`/forum-subscriptions/${id}`, { method: 'DELETE' })
            await mutate()
        },
    }
}

// True when the collection has at least one record that matches the filters.
const hasAny = (collection: 'questions' | 'replies', filters: Record<string, unknown>) =>
    fetch(
        `${API}/${collection}?${qs.stringify(
            { filters, fields: ['id'], pagination: { pageSize: 1 } },
            { encodeValuesOnly: true }
        )}`
    )
        .then((res) => res.json())
        .then((res) => res.meta.pagination.total > 0)

// The first steps that the signed-in user has done, for the getting started checklist. Only published posts count.
export const useForumProgress = (enabled = true) => {
    const { user } = useUser()
    const profileId = user?.profile?.id
    const { subscriptions, isLoading: subscriptionsLoading } = useForumSubscriptions()
    const { data, isLoading } = useSWR(enabled && profileId ? ['forum-progress', profileId] : null, async () => {
        const profile = { id: { $eq: profileId } }
        const [introduced, replied, shared] = await Promise.all([
            hasAny('questions', { profile, forumTopic: { slug: { $eq: 'introductions' } } }),
            hasAny('replies', { profile, question: { forumTopic: { id: { $notNull: true } } } }),
            hasAny('questions', { profile, forumTopic: { slug: { $eq: 'shipped-and-learned' } } }),
        ])
        return { introduced, replied, shared }
    })

    return {
        isLoading: isLoading || subscriptionsLoading,
        progress: data && { ...data, subscribed: subscriptions.some((sub) => sub.forumTopic) },
    }
}

const profileFields = {
    fields: ['firstName', 'lastName', 'color', 'gravatarURL'],
    populate: { avatar: { fields: ['url'] } },
}

const feedPopulate = {
    profile: profileFields,
    lastReplyBy: profileFields,
    forumTopic: { fields: ['label', 'slug', 'icon'] },
    forumTags: { fields: ['label', 'slug'] },
}

const feedFields = [
    'subject',
    'permalink',
    'body',
    'numUpvotes',
    'numReplies',
    'activeAt',
    'createdAt',
    'publishedAt',
    'lastReplyAt',
    'pinnedToTopic',
    'resolved',
    'locked',
]

// Active and Popular use scores that Strapi stores on each post: log10(1 + comments or upvotes) plus the time of the
// last activity or of publishing, divided by a decay. Newer posts rank higher unless older ones have many more.
const sorts: Record<ForumSort, string[]> = {
    latest: ['publishedAt:desc', 'id:desc'],
    active: ['activeScore:desc', 'id:desc'],
    popular: ['popularScore:desc', 'id:desc'],
}

export type AlertTeam = {
    id: number
    name: string
    slug: string
    slackChannel: string | null
    topicIds: number[]
    tagIds: number[]
}

type TeamSubscriptionField = 'forumTopicSubscriptions' | 'forumTagSubscriptions'

type TeamAlertsData = StrapiRecord<{
    name: string
    slug: string
    slackChannel: string | null
    forumTopicSubscriptions?: { data: { id: number }[] }
    forumTagSubscriptions?: { data: { id: number }[] }
}>

const alertTeamsQuery = qs.stringify(
    {
        fields: ['name', 'slug', 'slackChannel'],
        sort: ['name:asc'],
        populate: { forumTopicSubscriptions: { fields: ['id'] }, forumTagSubscriptions: { fields: ['id'] } },
        pagination: { pageSize: 100 },
    },
    { encodeValuesOnly: true }
)

const toAlertTeam = ({ id, attributes }: TeamAlertsData): AlertTeam => ({
    id,
    name: attributes.name,
    slug: attributes.slug,
    slackChannel: attributes.slackChannel || null,
    topicIds: attributes.forumTopicSubscriptions?.data.map((topic) => topic.id) ?? [],
    tagIds: attributes.forumTagSubscriptions?.data.map((tag) => tag.id) ?? [],
})

const withSubscription = (
    data: { data: TeamAlertsData[] } | undefined,
    teamId: number,
    field: TeamSubscriptionField,
    targetId: number,
    subscribed: boolean
) =>
    data && {
        ...data,
        data: data.data.map((team) => {
            if (team.id !== teamId) return team
            const current = team.attributes[field]?.data ?? []
            const next = subscribed
                ? [...current.filter((target) => target.id !== targetId), { id: targetId }]
                : current.filter((target) => target.id !== targetId)
            return { ...team, attributes: { ...team.attributes, [field]: { data: next } } }
        }),
    }

export const useForumAlerts = () => {
    const request = useForumRequest()
    const { data, mutate, isLoading, error } = useSWR<{ data: TeamAlertsData[] }>(
        `${API}/teams?${alertTeamsQuery}`,
        async (url: string) => {
            const res = await fetch(url)
            if (!res.ok) throw new Error(`Teams request failed (${res.status})`)
            return res.json()
        }
    )

    const setSubscription = (teamId: number, field: TeamSubscriptionField, targetId: number, subscribed: boolean) =>
        mutate(
            async () => {
                await request(`/teams/${teamId}`, {
                    method: 'PUT',
                    body: { data: { [field]: { [subscribed ? 'connect' : 'disconnect']: [targetId] } } },
                })
                return withSubscription(data, teamId, field, targetId, subscribed)
            },
            {
                optimisticData: withSubscription(data, teamId, field, targetId, subscribed),
                rollbackOnError: true,
                revalidate: true,
            }
        )

    return {
        teams: (data?.data ?? []).map(toAlertTeam),
        isLoading,
        loadFailed: !!error,
        setTopicSubscription: (teamId: number, topicId: number, subscribed: boolean) =>
            setSubscription(teamId, 'forumTopicSubscriptions', topicId, subscribed),
        setTagSubscription: (teamId: number, tagId: number, subscribed: boolean) =>
            setSubscription(teamId, 'forumTagSubscriptions', tagId, subscribed),
    }
}

export type FeedOptions = {
    sort: ForumSort
    topicId?: number
    tagIds?: number[]
    // Unanswered: posts that nobody has replied to.
    unanswered?: boolean
    // Following: posts in any subscribed topic or with any subscribed tag.
    following?: { topicIds: number[]; tagIds: number[] }
}

export const useForumFeed = ({ sort, topicId, tagIds = [], unanswered, following }: FeedOptions) => {
    const conditions = useMemo(() => {
        const all: any[] = [{ forumTopic: { id: { $notNull: true } } }]
        if (topicId) all.push({ forumTopic: { id: { $eq: topicId } } })
        if (tagIds.length) all.push({ forumTags: { id: { $in: tagIds } } })
        // Strapi stores the reply count on each post, so this needs no join.
        if (unanswered) all.push({ numReplies: { $eq: 0 } })
        if (following) {
            all.push({
                $or: [
                    { forumTopic: { id: { $in: following.topicIds.length ? following.topicIds : [0] } } },
                    { forumTags: { id: { $in: following.tagIds.length ? following.tagIds : [0] } } },
                ],
            })
        }
        return all
    }, [topicId, tagIds.join(','), unanswered, following?.topicIds.join(','), following?.tagIds.join(',')])

    return useQuestions({
        limit: 20,
        // A sort or filter change keeps the old rows on screen, so the feed can reorder them instead of emptying.
        keepPreviousData: true,
        // Pinned posts lead a single topic's feed.
        sort: topicId ? ['pinnedToTopic:desc', ...sorts[sort]] : sorts[sort],
        fields: feedFields,
        populate: feedPopulate,
        // $and keeps the archive $or that useQuestions adds to every query.
        filters: { $and: conditions },
    })
}

// The signed-in user's forum drafts, newest edit first.
export const useForumDrafts = () => {
    const { user } = useUser()
    return useQuestions({
        limit: 50,
        publicationState: 'preview',
        sort: ['updatedAt:desc', 'id:desc'],
        fields: ['subject', 'body', 'updatedAt'],
        populate: { forumTopic: { fields: ['label', 'slug', 'icon'] } },
        filters: {
            $and: [
                { forumTopic: { id: { $notNull: true } } },
                { publishedAt: { $null: true } },
                { profile: { id: { $eq: user?.profile?.id ?? 0 } } },
            ],
        },
    })
}

// One of the signed-in user's drafts, for the composer.
export const useForumDraft = (id?: number) => {
    const request = useForumRequest()
    const query = qs.stringify(
        {
            publicationState: 'preview',
            filters: { id: { $eq: id }, publishedAt: { $null: true } },
            fields: ['subject', 'body'],
            populate: { forumTopic: { fields: ['id'] }, forumTags: { fields: ['id'] } },
        },
        { encodeValuesOnly: true }
    )
    const { data, isLoading } = useSWR<{ data: StrapiRecord<any>[] }>(id ? ['forum-draft', id] : null, () =>
        request(`/questions?${query}`)
    )
    return { draft: data?.data?.[0], isLoading: !!id && isLoading }
}

export const useForumPost = () => {
    const request = useForumRequest()
    return {
        // Deletes the post and every comment on it. Authors can delete their own posts; staff can delete any.
        deletePost: (id: number) => request(`/questions/${id}`, { method: 'DELETE' }),
        setUpvote: (id: number, upvote: boolean) =>
            request<{ data: { hasUpvoted: boolean; numUpvotes: number } }>(`/questions/${id}/upvote`, {
                method: upvote ? 'PUT' : 'DELETE',
            }).then((res) => res.data),
        updatePost: (id: number, data: Record<string, unknown>) =>
            request(`/questions/${id}`, { method: 'PUT', body: { data } }),
    }
}

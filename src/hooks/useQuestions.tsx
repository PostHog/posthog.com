import React, { useEffect } from 'react'

import useSWRInfinite from 'swr/infinite'
import qs from 'qs'
import { QuestionData, StrapiResult, StrapiRecord } from 'lib/strapi'
import usePostHog from './usePostHog'
import { useUser } from './useUser'

type UseQuestionsOptions = {
    slug?: string
    profileId?: number
    topicId?: number
    limit?: number
    sortBy?: 'newest' | 'popular' | 'activity'
    filters?: any
}

const query = (offset: number, options?: UseQuestionsOptions) => {
    const { slug, topicId, profileId, limit = 20, sortBy = 'newest', filters } = options || {}
    const params = {
        pagination: {
            start: offset * limit,
            limit,
        },
        sort: 'createdAt:desc',
        filters: {
            $or: [
                {
                    archived: {
                        $null: true,
                    },
                },
                {
                    archived: {
                        $eq: false,
                    },
                },
            ],
        },
        populate: {
            pinnedTopics: true,
            topics: true,
            profile: {
                fields: ['firstName', 'lastName', 'gravatarURL'],
                populate: {
                    avatar: {
                        fields: ['url'],
                    },
                },
            },
            replies: {
                populate: {
                    profile: {
                        populate: {
                            user: {
                                populate: ['role'],
                                fields: ['role'],
                            },
                        },
                        fields: ['firstName', 'lastName'],
                    },
                },
                fields: ['id', 'createdAt', 'updatedAt'],
            },
        },
    }

    switch (sortBy) {
        case 'newest':
            params.sort = 'createdAt:desc'
            break
        case 'popular':
            params.sort = 'numReplies:desc'
            break
        case 'activity':
            params.sort = 'activeAt:desc'
            break
    }

    if (slug) {
        params.filters = {
            ...params.filters,
            slugs: {
                slug,
            },
        }
    }

    if (topicId) {
        params.filters = {
            ...params.filters,
            topics: {
                id: {
                    $eq: topicId,
                },
            },
        }
    }

    if (profileId) {
        params.filters = {
            ...params.filters,
            $or: [
                {
                    profile: {
                        id: {
                            $eq: profileId,
                        },
                    },
                },
                {
                    replies: {
                        profile: {
                            id: {
                                $eq: profileId,
                            },
                        },
                    },
                },
            ],
        }
    }

    if (filters) {
        params.filters = {
            ...params.filters,
            ...filters,
        }
    }

    return qs.stringify(params, {
        encodeValuesOnly: true, // prettify URL
    })
}

export const useQuestions = (options?: UseQuestionsOptions) => {
    const { getJwt, user } = useUser()
    const posthog = usePostHog()

    const { data, size, setSize, isLoading, error, mutate, isValidating } = useSWRInfinite<
        StrapiResult<QuestionData[]>
    >(
        (offset) => `${process.env.GATSBY_SQUEAK_API_HOST}/api/questions?${query(offset, options)}`,
        async (url: string) => {
            const jwt = await getJwt()
            return fetch(url, user && jwt ? { headers: { Authorization: `Bearer ${jwt}` } } : undefined).then((r) =>
                r.json()
            )
        }
    )

    if (error) {
        posthog?.capture('squeak error', {
            source: 'useQuestions',
            options: JSON.stringify(options),
            error: error.message,
        })
    }

    const questions: Omit<StrapiResult<QuestionData[]>, 'meta'> = React.useMemo(() => {
        return {
            data: data?.reduce((acc, cur) => [...acc, ...(cur.data || [])], [] as StrapiRecord<QuestionData>[]) ?? [],
        }
    }, [size, data])

    const total = data && data[0]?.meta?.pagination?.total
    const hasMore = total ? questions?.data.length < total : false

    useEffect(() => {
        mutate()
    }, [user])

    return {
        hasMore,
        questions,
        fetchMore: () => setSize(size + 1),
        isLoading: isLoading || isValidating,
        refresh: () => mutate(),
    }
}

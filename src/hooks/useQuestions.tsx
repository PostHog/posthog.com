import React from 'react'

import useSWRInfinite from 'swr/infinite'
import qs from 'qs'
import { QuestionData, StrapiResult, StrapiRecord } from 'lib/strapi'
import usePostHog from './usePostHog'

type UseQuestionsOptions = {
    slug?: string
    profileId?: number
    topicId?: number
    limit?: number
    sortBy?: 'newest' | 'popular' | 'activity'
}

const query = (offset: number, options?: UseQuestionsOptions) => {
    const { slug, topicId, profileId, limit = 20, sortBy = 'newest' } = options || {}

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
            profile: {
                fields: ['firstName', 'lastName', 'gravatarURL'],
                populate: {
                    avatar: {
                        fields: ['url'],
                    },
                },
            },
            replies: {
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
            params.sort = 'updatedAt:desc'
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

    return qs.stringify(params, {
        encodeValuesOnly: true, // prettify URL
    })
}

export const useQuestions = (options?: UseQuestionsOptions) => {
    const posthog = usePostHog()

    const { data, size, setSize, isLoading, error, mutate } = useSWRInfinite<StrapiResult<QuestionData[]>>(
        (offset) => `${process.env.GATSBY_SQUEAK_API_HOST}/api/questions?${query(offset, options)}`,
        (url: string) => fetch(url).then((r) => r.json())
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
            data: data?.reduce((acc, cur) => [...acc, ...cur.data], [] as StrapiRecord<QuestionData>[]) ?? [],
        }
    }, [size, data])

    const total = data && data[0]?.meta?.pagination?.total
    const hasMore = total ? questions?.data.length < total : false

    return {
        hasMore,
        questions,
        fetchMore: () => setSize(size + 1),
        isLoading,
        refresh: () => mutate(),
    }
}

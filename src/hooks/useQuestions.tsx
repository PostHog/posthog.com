import React from 'react'

import useSWRInfinite from 'swr/infinite'
import qs from 'qs'
import { QuestionData, StrapiResult, StrapiRecord } from 'lib/strapi'
import usePostHog from './usePostHog'
import { useUser } from './useUser'

type UseQuestionsOptions = {
    slug?: string
    profileId?: number
    userId?: number
    topicId?: number
    limit?: number
    sortBy?: 'newest' | 'popular' | 'activity'
    filters?: any
}

const query = (offset: number, options?: UseQuestionsOptions) => {
    const { slug, topicId, profileId, userId, limit = 20, sortBy = 'newest', filters } = options || {}
    const params: QueryParamsType = {
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
            $and: [
                profileId !== userId && params.filters['$or'] ? { $or: [...params.filters['$or']] } : {},
                {
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
                },
            ],
        }

        delete params.filters['$or']
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
    const posthog = usePostHog()
    const { user } = useUser()

    const { data, size, setSize, isLoading, error, mutate, isValidating } = useSWRInfinite<
        StrapiResult<QuestionData[]>
    >(
        (offset) =>
            `${process.env.GATSBY_SQUEAK_API_HOST}/api/questions?${query(offset, { ...options, userId: user?.id })}`,
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
        isLoading: isLoading || isValidating,
        refresh: () => mutate(),
    }
}

interface QueryParamsType {
    pagination: {
        start: number
        limit: number
    }
    sort: string
    filters: {
        $or?: {
            archived: {
                $null?: true
                $eq?: boolean
            }
        }[]
        slugs?: {
            slug: string
        }
        topics?: {
            id: {
                $eq: number
            }
        }
        $and?: (
            | {
                  $or: Array<
                      | {
                            profile: {
                                id: {
                                    $eq: string
                                }
                            }
                        }
                      | {
                            replies: {
                                profile: {
                                    id: {
                                        $eq: string
                                    }
                                }
                            }
                        }
                  >
              }
            | {
                  [key: string]: any // Allow other filters
              }
        )[]
    }
    populate: {
        pinnedTopics: boolean
        topics: boolean
        profile: {
            fields: string[]
            populate: {
                avatar: {
                    fields: string[]
                }
            }
        }
        replies: {
            populate: {
                profile: {
                    fields: string[]
                }
            }
            fields: string[]
        }
    }
}

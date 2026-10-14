import React from 'react'

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
    // These replace the defaults below when set. The forum feed uses them to request a lighter payload and its own sorts.
    sort?: string[]
    populate?: Record<string, unknown>
    fields?: string[]
    // 'preview' lists the caller's own drafts as well; the server hides everyone else's.
    publicationState?: 'live' | 'preview'
    filters?: any
    revalidateOnFocus?: boolean
    // Keeps the current results on screen while a changed query loads, so a list can fade and reorder instead of
    // emptying.
    keepPreviousData?: boolean
}

const query = (offset: number, options?: UseQuestionsOptions, isModerator?: boolean) => {
    const { slug, topicId, profileId, limit = 20, sortBy = 'newest', filters } = options || {}
    const params: Record<string, any> = {
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
            edits: {
                sort: ['date:desc'],
                populate: {
                    by: {
                        fields: ['firstName', 'lastName', 'color', 'gravatarURL'],
                        populate: {
                            avatar: {
                                fields: ['url'],
                            },
                        },
                    },
                },
            },
            resolvedBy: {
                select: ['id'],
            },
            profile: {
                select: ['id', 'firstName', 'lastName', 'gravatarURL'],
                populate: {
                    avatar: {
                        select: ['id', 'url'],
                    },
                    ...(isModerator
                        ? {
                              user: {
                                  fields: ['distinctId', 'email'],
                              },
                          }
                        : null),
                },
            },
            replies: {
                sort: ['createdAt:asc'],
                populate: {
                    profile: {
                        fields: ['id', 'firstName', 'lastName', 'gravatarURL', 'pronouns'],
                        populate: {
                            edits: {
                                sort: ['date:desc'],
                                populate: {
                                    by: {
                                        fields: ['firstName', 'lastName', 'color', 'gravatarURL'],
                                        populate: {
                                            avatar: {
                                                fields: ['url'],
                                            },
                                        },
                                    },
                                },
                            },
                            avatar: {
                                fields: ['id', 'url'],
                            },
                            teams: {
                                fields: ['id'],
                            },
                            user: {
                                populate: ['role'],
                                fields: ['id'],
                            },
                        },
                    },
                },
            },
            topics: true,
            slugs: true,
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

    if (options?.sort) params.sort = options.sort
    if (options?.populate) params.populate = options.populate
    if (options?.fields) params.fields = options.fields
    if (options?.publicationState) params.publicationState = options.publicationState

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
    const isModerator = user?.role?.type === 'moderator'
    const { data, size, setSize, isLoading, error, mutate, isValidating } = useSWRInfinite<
        StrapiResult<QuestionData[]>
    >(
        (offset) => `${process.env.GATSBY_SQUEAK_API_HOST}/api/questions?${query(offset, options, isModerator)}`,
        async (url: string) => {
            const jwt = await getJwt()
            return fetch(url, user && jwt ? { headers: { Authorization: `Bearer ${jwt}` } } : undefined).then((r) =>
                r.json()
            )
        },
        {
            revalidateOnFocus: false,
            keepPreviousData: options?.keepPreviousData,
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

    return {
        hasMore,
        questions,
        fetchMore: () => setSize(size + 1),
        isLoading: isLoading || isValidating,
        // Finer states for lists that animate. isLoading above stays as it was for other callers.
        isFirstLoad: isLoading && !data,
        isSwitching: isLoading && !!data,
        isLoadingMore: !isLoading && isValidating && size > (data?.length ?? 0),
        refresh: () => mutate(),
    }
}

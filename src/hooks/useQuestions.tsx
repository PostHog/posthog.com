import React from 'react'

import useSWRInfinite from 'swr/infinite'
import qs from 'qs'
import { QuestionData, StrapiResult, StrapiRecord } from 'lib/strapi'

type UseQuestionsOptions = {
    slug?: string
    profileId?: number
    topicId?: number
    limit?: number
}

// TODO: Add sort by
export const useQuestions = (options?: UseQuestionsOptions) => {
    const { slug, topicId, profileId, limit = 20 } = options || {}

    const query = (offset: number) => {
        const params = {
            pagination: {
                start: offset * limit,
                limit,
            },
            sort: 'createdAt:desc',
            filters: {},
            populate: {
                profile: {
                    fields: ['firstName', 'lastName'],
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
                profile: {
                    id: {
                        $eq: profileId,
                    },
                },
            }
        }

        return qs.stringify(params, {
            encodeValuesOnly: true, // prettify URL
        })
    }

    const { data, size, setSize, isLoading, mutate } = useSWRInfinite<StrapiResult<QuestionData[]>>(
        (offset) => `${process.env.GATSBY_SQUEAK_API_HOST}/api/questions?${query(offset)}`,
        (url: string) => fetch(url).then((r) => r.json())
    )

    const questions: Omit<StrapiResult<QuestionData[]>, 'meta'> = React.useMemo(() => {
        return {
            data: data?.reduce((acc, cur) => [...acc, ...cur.data], [] as StrapiRecord<QuestionData>[]) ?? [],
        }
    }, [size, data])

    return {
        questions,
        fetchMore: () => setSize(size + 1),
        isLoading,
        refresh: () => mutate(),
    }
}

import React from 'react'
import useSWRInfinite from 'swr/infinite'
import qs from 'qs'

const query = (params: any, offset: number, limit = 20) => {
    const query = {
        populate: {
            updates: {
                populate: ['question', 'team'],
            },
            teams: {
                populate: ['leadProfiles', 'miniCrest'],
            },
            likes: true,
            topic: true,
            image: true,
            cta: true,
        },
        sort: 'updatedAt:desc',
        pagination: {
            start: offset * limit,
            limit: limit,
        },
        ...params,
    }
    return qs.stringify(query, {
        encodeValuesOnly: true,
    })
}

export const useRoadmaps = ({ params = {}, limit }: { params?: any; limit?: number }) => {
    const { data, size, setSize, isLoading, mutate, isValidating } = useSWRInfinite(
        (offset) => `${process.env.GATSBY_SQUEAK_API_HOST}/api/roadmaps?${query(params, offset, limit)}`,
        (url: string) => fetch(url).then((r) => r.json())
    )
    const roadmaps = React.useMemo(() => {
        return data?.reduce((acc, cur) => [...(acc || []), ...(cur.data || [])], []) ?? []
    }, [size, data])

    const total = data && data[0]?.meta?.pagination?.total
    const hasMore = total ? roadmaps?.length < total : false

    return {
        roadmaps,
        isLoading,
        isValidating,
        fetchMore: () => setSize(size + 1),
        mutate,
        hasMore,
    }
}

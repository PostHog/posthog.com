import React from 'react'
import useSWRInfinite from 'swr/infinite'
import qs from 'qs'

const query = (params: any, offset: number) => {
    const query = {
        populate: {
            updates: {
                populate: ['question', 'team'],
            },
            teams: {
                populate: ['leadProfiles'],
            },
        },
        sort: 'updatedAt:desc',
        pagination: {
            start: offset * 20,
            limit: 20,
        },
        ...params,
    }
    console.log(query)
    return qs.stringify(query, {
        encodeValuesOnly: true,
    })
}

export const useRoadmaps = ({ params = {} }: { params?: any }) => {
    const { data, size, setSize, isLoading, error, mutate, isValidating } = useSWRInfinite(
        (offset) => `${process.env.GATSBY_SQUEAK_API_HOST}/api/roadmaps?${query(params, offset)}`,
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

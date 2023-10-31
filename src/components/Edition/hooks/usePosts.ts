import React from 'react'
import useSWRInfinite from 'swr/infinite'
import qs from 'qs'

const query = (params: any, offset: number) => {
    return qs.stringify(
        {
            populate: ['featuredImage.image', 'post_category.defaultImage', 'authors.avatar', 'likes'],
            sort: 'date:desc',
            pagination: {
                start: offset * 20,
                limit: 20,
            },
            ...params,
        },
        {
            encodeValuesOnly: true,
        }
    )
}

export const usePosts = ({ params }: { params: any }) => {
    const { data, size, setSize, isLoading, error, mutate, isValidating } = useSWRInfinite(
        (offset) => `${process.env.GATSBY_SQUEAK_API_HOST}/api/posts?${query(params, offset)}`,
        (url: string) => fetch(url).then((r) => r.json())
    )
    const posts = React.useMemo(() => {
        return data?.reduce((acc, cur) => [...(acc || []), ...(cur.data || [])], []) ?? []
    }, [size, data])

    const total = data && data[0]?.meta?.pagination?.total
    const hasMore = total ? posts?.length < total : false

    return {
        posts,
        isLoading,
        isValidating,
        fetchMore: () => setSize(size + 1),
        mutate,
        hasMore,
    }
}

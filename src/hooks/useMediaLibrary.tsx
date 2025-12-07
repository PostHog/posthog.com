import React from 'react'
import useSWRInfinite from 'swr/infinite'
import qs from 'qs'
import { useUser } from './useUser'

type UseMediaLibraryOptions = {
    showAll?: boolean
    tag?: string
    search?: string
    limit?: number
    revalidateOnFocus?: boolean
}

const query = (offset: number, options?: UseMediaLibraryOptions) => {
    const { limit = 50, search, tag } = options || {}

    const params: any = {
        pagination: {
            start: offset,
            limit,
        },
        sort: ['createdAt:desc'],
    }

    const filters: any = {}

    if (search) {
        filters.name = {
            $containsi: search,
        }
    }

    if (tag && tag !== 'all-tags') {
        filters.tags = {
            id: {
                $eq: tag,
            },
        }
    }

    if (Object.keys(filters).length > 0) {
        params.filters = filters
    }

    return qs.stringify(params, {
        encodeValuesOnly: true,
    })
}

export const useMediaLibrary = (options?: UseMediaLibraryOptions) => {
    const { getJwt, user } = useUser()
    const { showAll = false } = options || {}

    const { data, size, setSize, isLoading, error, mutate, isValidating } = useSWRInfinite<any>(
        (offset) => (showAll ? `${process.env.GATSBY_SQUEAK_API_HOST}/api/upload/all?${query(offset, options)}` : null),
        async (url: string) => {
            const jwt = await getJwt()
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })

            if (!response.ok) {
                const body = await response.json().catch(() => null)
                const message = body?.error?.message || `Request failed with status ${response.status}`
                throw new Error(message)
            }

            return response.json()
        },
        {
            revalidateOnFocus: options?.revalidateOnFocus ?? false,
        }
    )

    const images = React.useMemo(() => {
        if (!showAll) {
            const userImages = user?.profile?.images?.filter?.((image: any) => !!image?.provider_metadata) || []
            return userImages
                .filter((image: any) =>
                    options?.search ? image.name?.toLowerCase().includes(options?.search?.toLowerCase()) : true
                )
                .filter((image: any) =>
                    options?.tag && options?.tag !== 'all-tags'
                        ? image.tags?.some((imgTag: any) => imgTag.id === options?.tag)
                        : true
                )
                .map((image: any) => ({
                    ...image,
                    profiles: image.related?.filter((related: any) => related.__type === 'api::profile.profile') || [],
                }))
        }

        return data?.reduce((acc, cur) => [...acc, ...(cur.data || [])], [] as any[]) ?? []
    }, [data, showAll, user, options?.search, options?.tag])

    const total = data && data[0]?.meta?.pagination?.total
    const hasMore = total ? images.length < total : false

    return {
        images,
        hasMore,
        fetchMore: () => setSize(size + 1),
        isLoading: isLoading || isValidating,
        error,
        refresh: () => mutate(),
    }
}

import useSWR from 'swr'
import qs from 'qs'
import { useUser } from './useUser'

export interface Mixtape {
    id: number
    attributes: {
        title: string
        description?: string
        genres?: string[]
        tracks: Array<{
            id: string
            title: string
            youtubeUrl: string
        }>
        metadata?: {
            cassetteColor?: string
            labelColor?: string
            labelBackground?: {
                url: string
                backgroundSize?: string
                backgroundRepeat?: string
                backgroundPosition?: string
            }
        }
        creator?: {
            data: Array<{
                id: number
                attributes: {
                    firstName: string
                    lastName?: string
                    avatar?: {
                        formats: {
                            thumbnail: {
                                url: string
                            }
                        }
                    }
                }
            }>
        }
        createdAt: string
        updatedAt: string
    }
}

interface StrapiResponse {
    data: Mixtape[]
    meta: {
        pagination: {
            page: number
            pageSize: number
            pageCount: number
            total: number
        }
    }
}

interface UseMixtapesOptions {
    limit?: number
}

export const useMixtapes = (options?: UseMixtapesOptions) => {
    const { getJwt, user } = useUser()
    const { limit = 100 } = options || {}

    const query = qs.stringify(
        {
            pagination: {
                page: 1,
                pageSize: limit,
            },
            sort: ['createdAt:desc'],
            populate: {
                tracks: true,
                metadata: true,
                creator: {
                    populate: ['profile'],
                },
            },
        },
        {
            encodeValuesOnly: true,
        }
    )

    const { data, error, isLoading, mutate } = useSWR<StrapiResponse>(
        `${process.env.GATSBY_SQUEAK_API_HOST}/api/mixtapes?${query}`,
        async (url: string) => {
            const jwt = await getJwt()
            return fetch(
                url,
                user && jwt
                    ? {
                          headers: {
                              Authorization: `Bearer ${jwt}`,
                          },
                      }
                    : undefined
            ).then((r) => r.json())
        },
        {
            revalidateOnFocus: false,
        }
    )

    return {
        mixtapes: data?.data || [],
        isLoading,
        error,
        refresh: mutate,
    }
}

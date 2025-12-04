import React from 'react'
import useSWRInfinite from 'swr/infinite'
import qs from 'qs'
import { useUser } from './useUser'

const query = (params: any, offset: number, limit = 20, isModerator = false) => {
    const query = {
        populate: {
            ...(isModerator
                ? {
                      subscribers: {
                          populate: {
                              user: true,
                          },
                      },
                      likes: {
                          populate: {
                              user: true,
                          },
                      },
                  }
                : { likes: true }),
            updates: {
                populate: ['question', 'team'],
            },
            teams: {
                populate: ['leadProfiles', 'miniCrest', 'profiles'],
            },
            topic: true,
            image: true,
            cta: true,
            profiles: true,
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
    const { isModerator, getJwt } = useUser()
    const { data, size, setSize, isLoading, mutate, isValidating } = useSWRInfinite(
        (offset) => `${process.env.GATSBY_SQUEAK_API_HOST}/api/roadmaps?${query(params, offset, limit, isModerator)}`,
        async (url: string) => {
            try {
                const jwt = isModerator && (await getJwt())
                const response = await fetch(url, jwt ? { headers: { Authorization: `Bearer ${jwt}` } } : undefined)

                if (!response.ok) {
                    throw new Error(`Failed to fetch roadmaps: ${response.status}`)
                }

                return response.json()
            } catch (error) {
                console.error('Error fetching roadmaps:', error)
                throw error
            }
        }
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

// Emoji reaction type matching the new API structure
export type EmojiReaction = {
    emoji: string
    profiles: Array<{
        id: number
        firstName?: string
        lastName?: string
    }>
}

// Fetch emoji reactions for a single roadmap
export const fetchRoadmapReactions = async (roadmapId: number | string): Promise<EmojiReaction[]> => {
    try {
        const url = `${process.env.GATSBY_SQUEAK_API_HOST}/api/roadmap/${roadmapId}/emoji-reactions`
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Failed to fetch roadmap emoji reactions: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error('Error fetching roadmap emoji reactions:', error)
        return []
    }
}

export const addRoadmapEmojiReaction = async ({
    roadmapId,
    emoji,
    remove = false,
    jwt,
}: {
    roadmapId: number
    emoji: string
    remove?: boolean
    jwt: string | null
}) => {
    if (!jwt || !roadmapId || !emoji) {
        throw new Error('Missing required parameters')
    }

    const endpoint = remove ? 'remove' : 'add'
    const url = `${process.env.GATSBY_SQUEAK_API_HOST}/api/roadmap/${roadmapId}/emoji-reactions/${endpoint}`

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                emoji,
            }),
        })

        if (!response.ok) {
            const errorData = await response.text()
            console.error('Error response:', errorData)
            throw new Error(`Failed to ${remove ? 'remove' : 'add'} emoji reaction: ${response.status} ${errorData}`)
        }

        return await response.json()
    } catch (error) {
        console.error('Error updating emoji reaction:', error)
        throw error
    }
}

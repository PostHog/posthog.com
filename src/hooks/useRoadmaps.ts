import React, { useState } from 'react'
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

// Hook to manage on-demand emoji reactions for individual roadmaps
export const useRoadmapEmojiReactions = () => {
    const { getJwt } = useUser()
    const [emojiReactionsMap, setEmojiReactionsMap] = useState<Map<number | string, any>>(new Map())

    // Fetch fresh emoji reactions for a single roadmap (on-demand)
    const fetchRoadmapReactions = async (roadmapId: number | string) => {
        try {
            const jwt = await getJwt()

            const query = {
                populate: {
                    emojiReactions: {
                        populate: ['profiles'],
                    },
                },
                filters: {
                    id: {
                        $eq: roadmapId,
                    },
                },
            }

            const queryString = qs.stringify(query, { encodeValuesOnly: true })
            const url = `${process.env.GATSBY_SQUEAK_API_HOST}/api/roadmaps?${queryString}`

            const response = await fetch(url, jwt ? { headers: { Authorization: `Bearer ${jwt}` } } : undefined)

            if (!response.ok) {
                throw new Error(`Failed to fetch roadmap emoji reactions: ${response.status}`)
            }

            const result = await response.json()

            // Update only this roadmap in the map
            if (result.data?.[0]) {
                const reactions = result.data[0].attributes?.emojiReactions || []
                setEmojiReactionsMap((prev) => {
                    const newMap = new Map(prev)
                    newMap.set(roadmapId, reactions)
                    return newMap
                })
            }
        } catch (error) {
            console.error('❌ Error fetching roadmap emoji reactions:', error)
        }
    }

    return {
        emojiReactionsMap,
        fetchRoadmapReactions,
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
    const url = `${process.env.GATSBY_SQUEAK_API_HOST}/api/roadmap/${roadmapId}/emoji-reaction/${endpoint}`

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

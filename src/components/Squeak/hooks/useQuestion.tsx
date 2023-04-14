import qs from 'qs'
import { ProfileData, QuestionData, StrapiRecord } from 'lib/strapi'
import useSWR from 'swr'
import { useUser } from 'hooks/useUser'

type UseQuestionOptions = {
    data?: StrapiRecord<QuestionData>
}

export const useQuestion = (id: number | string, options?: UseQuestionOptions) => {
    const isPermalink = typeof id === 'string'

    const query = qs.stringify(
        {
            filters: {
                ...(isPermalink
                    ? {
                          permalink: {
                              $eq: id,
                          },
                      }
                    : {
                          id: {
                              $eq: id,
                          },
                      }),
            },
            populate: {
                resolvedBy: {
                    select: ['id'],
                },
                profile: {
                    select: ['id', 'firstName', 'lastName'],
                    populate: {
                        avatar: {
                            select: ['id', 'url'],
                        },
                    },
                },
                replies: {
                    publicationState: 'preview',
                    sort: ['createdAt:asc'],
                    populate: {
                        profile: {
                            fields: ['id', 'firstName', 'lastName', 'gravatarURL'],
                            populate: {
                                avatar: {
                                    fields: ['id', 'url'],
                                },
                            },
                        },
                    },
                },
            },
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    )

    const {
        data: question,
        error,
        isLoading,
        mutate,
    } = useSWR<StrapiRecord<QuestionData>>(
        `${process.env.GATSBY_SQUEAK_API_HOST}/api/questions?${query}`,
        async (url) => {
            const res = await fetch(url)
            const { data } = await res.json()
            return data?.[0]
        }
    )

    const { getJwt, fetchUser } = useUser()

    const reply = async (body: string) => {
        const token = await getJwt()

        await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/replies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                data: {
                    body,
                    question: question?.id,
                },
                populate: {
                    profile: {
                        fields: ['id', 'firstName', 'lastName'],
                        populate: {
                            avatar: {
                                fields: ['id', 'url'],
                            },
                        },
                    },
                },
            }),
        })

        mutate()
    }

    const questionData: StrapiRecord<QuestionData> | undefined = question || options?.data

    const handlePublishReply = async (published: boolean, id: number) => {
        const replyRes = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/replies/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                data: {
                    publishedAt: published ? null : new Date(),
                },
            }),
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${await getJwt()}`,
            },
        })

        if (!replyRes.ok) {
            throw new Error('Failed to update reply data')
        }

        await replyRes.json()

        mutate()
    }

    const handleResolve = async (resolved: boolean, resolvedBy: number | null) => {
        const replyRes = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/questions/${question?.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                data: {
                    resolved,
                    resolvedBy,
                },
            }),
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${await getJwt()}`,
            },
        })

        if (!replyRes.ok) {
            throw new Error('Failed to update reply data')
        }

        await replyRes.json()

        mutate()
    }

    const handleReplyDelete = async (id: number) => {
        const replyRes = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/replies/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${await getJwt()}`,
            },
        })

        if (!replyRes.ok) {
            throw new Error('Failed to delete reply')
        }

        await replyRes.json()

        mutate()
    }

    const isSubscribed = async (profile: StrapiRecord<ProfileData>): Promise<boolean> => {
        const query = qs.stringify({
            filters: {
                id: {
                    $eq: id,
                },
                profileSubscribers: {
                    id: {
                        $eq: profile?.id,
                    },
                },
            },
            populate: {
                profileSubscribers: true,
            },
        })
        const questionRes = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/questions?${query}`)

        if (!questionRes.ok) {
            throw new Error('Failed to fetch question')
        }

        const { data } = await questionRes.json()

        return data?.length > 0
    }

    const subscribe = async (profile: StrapiRecord<ProfileData> | undefined): Promise<void> => {
        if (!profile) return

        const body = {
            data: {
                questionSubscriptions: {
                    connect: [id],
                },
            },
        }

        await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles/${profile?.id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await getJwt()}`,
            },
        })

        await fetchUser()
    }

    const unsubscribe = async (profile: StrapiRecord<ProfileData> | undefined): Promise<void> => {
        if (!profile) return

        const body = {
            data: {
                questionSubscriptions: {
                    disconnect: [id],
                },
            },
        }

        await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles/${profile?.id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await getJwt()}`,
            },
        })

        await fetchUser()
    }

    return {
        question: questionData,
        reply,
        error,
        isLoading: isLoading && !questionData,
        isError: error,
        handlePublishReply,
        handleResolve,
        handleReplyDelete,
        isSubscribed,
        subscribe,
        unsubscribe,
    }
}

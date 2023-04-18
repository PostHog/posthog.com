import qs from 'qs'
import { ProfileData, QuestionData, StrapiRecord, TopicData } from 'lib/strapi'
import useSWR, { useSWRConfig } from 'swr'
import { useUser } from 'hooks/useUser'
import usePostHog from 'hooks/usePostHog'

type UseQuestionOptions = {
    data?: StrapiRecord<QuestionData>
}

const query = (id: string | number) =>
    qs.stringify(
        {
            filters: {
                ...(typeof id === 'string'
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
                topics: true,
            },
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    )

export const useQuestion = (id: number | string, options?: UseQuestionOptions) => {
    const { getJwt, fetchUser, user } = useUser()
    const { mutate: globalMutate } = useSWRConfig()
    const posthog = usePostHog()

    const key = `${process.env.GATSBY_SQUEAK_API_HOST}/api/questions?${query(id)}`

    const {
        data: question,
        error,
        isLoading,
    } = useSWR<StrapiRecord<QuestionData>>(key, async (url) => {
        const res = await fetch(url)
        const { data } = await res.json()
        return data?.[0]
    })

    if (error) {
        posthog?.capture('squeak error', {
            source: 'useQuestion',
            questionId: id,
            error: JSON.stringify(error),
        })
    }

    const questionData: StrapiRecord<QuestionData> | undefined = question || options?.data

    // This mutate method takes into account the fact that both ids and permalinks can be
    // used interchangeably to fetch a question.
    //
    // This ensures that data is kept in sync across all instances of the same question.
    const mutate = async (data?: any) => {
        // First, we mutate the key for whichever type of identifier was passed in to,
        // this specific hook.
        globalMutate(key, data, {
            optimisticData: data,
        })

        if (!question) return

        // Then, based on if it's a permalink or an id, we mutate the other key as well.
        if (typeof id === 'string') {
            globalMutate(`${process.env.GATSBY_SQUEAK_API_HOST}/api/questions?${query(question.id)}`, data, {
                optimisticData: data,
            })
        } else {
            globalMutate(
                `${process.env.GATSBY_SQUEAK_API_HOST}/api/questions?${query(question?.attributes?.permalink)}`,
                data,
                {
                    optimisticData: data,
                }
            )
        }
    }

    const reply = async (body: string) => {
        try {
            posthog?.capture('squeak reply start', {
                questionId: question?.id,
            })

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

            posthog?.capture('squeak reply', {
                questionId: question?.id,
            })

            fetchUser()

            mutate()
        } catch (error) {
            posthog?.capture('squeak error', {
                source: 'useQuestion.reply',
                questionId: question?.id,
                body,
                error: JSON.stringify(error),
            })

            throw error
        }
    }

    const handlePublishReply = async (published: boolean, id: number) => {
        try {
            posthog?.capture('squeak publish reply start', {
                questionId: question?.id,
                replyId: id,
                published,
            })

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

            posthog?.capture('squeak publish reply', {
                questionId: question?.id,
                replyId: id,
                published,
            })
        } catch (error) {
            posthog?.capture('squeak error', {
                source: 'useQuestion.handlePublishReply',
                questionId: question?.id,
                published,
                replyId: id,
                error: JSON.stringify(error),
            })

            throw error
        }
    }

    const handleResolve = async (resolved: boolean, resolvedBy: number | null) => {
        try {
            posthog?.capture('squeak resolve start', {
                questionId: question?.id,
                resolved,
                resolvedBy,
            })

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

            posthog?.capture('squeak resolve', {
                questionId: question?.id,
                resolved,
                resolvedBy,
            })
        } catch (error) {
            posthog?.capture('squeak error', {
                source: 'useQuestion.handleResolve',
                questionId: question?.id,
                resolved,
                resolvedBy,
                error: JSON.stringify(error),
            })

            throw error
        }
    }

    const handleReplyDelete = async (id: number) => {
        try {
            posthog?.capture('squeak delete reply start', {
                questionId: question?.id,
                replyId: id,
            })

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

            posthog?.capture('squeak delete reply', {
                questionId: question?.id,
                replyId: id,
            })
        } catch (error) {
            posthog?.capture('squeak error', {
                source: 'useQuestion.handleReplyDelete',
                questionId: question?.id,
                replyId: id,
                error: JSON.stringify(error),
            })

            throw error
        }
    }

    const isSubscribed = async (): Promise<boolean> => {
        const query = qs.stringify({
            filters: {
                id: {
                    $eq: id,
                },
                profileSubscribers: {
                    id: {
                        $eq: user?.profile?.id,
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

    const subscribe = async (): Promise<void> => {
        const profile = user?.profile
        if (!profile) return

        const body = {
            data: {
                questionSubscriptions: {
                    connect: [question?.id],
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

    const unsubscribe = async (): Promise<void> => {
        const profile = user?.profile
        if (!profile) return

        const body = {
            data: {
                questionSubscriptions: {
                    disconnect: [question?.id],
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

    const addTopic = async (topic: StrapiRecord<TopicData>): Promise<void> => {
        await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/questions/${question?.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                data: {
                    topics: {
                        connect: [topic.id],
                    },
                },
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await getJwt()}`,
            },
        })

        const copiedData = Object.assign({}, questionData)

        copiedData.attributes?.topics?.data?.push(topic)

        await mutate(copiedData)
    }

    const removeTopic = async (topic: StrapiRecord<TopicData>): Promise<void> => {
        await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/questions/${question?.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                data: {
                    topics: {
                        disconnect: [topic.id],
                    },
                },
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await getJwt()}`,
            },
        })

        const copiedData = Object.assign({}, questionData)

        if (!copiedData.attributes?.topics?.data) return

        copiedData.attributes.topics.data = copiedData.attributes?.topics?.data?.filter((t) => t.id !== topic.id)

        await mutate(copiedData)
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
        addTopic,
        removeTopic,
    }
}

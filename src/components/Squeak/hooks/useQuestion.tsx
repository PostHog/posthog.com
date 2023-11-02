import qs from 'qs'
import { QuestionData, StrapiRecord, TopicData } from 'lib/strapi'
import useSWR from 'swr'
import { useUser } from 'hooks/useUser'
import usePostHog from 'hooks/usePostHog'

type UseQuestionOptions = {
    data?: StrapiRecord<QuestionData>
}

const query = (id: string | number, isModerator: boolean) =>
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
                        ...(isModerator
                            ? {
                                  user: {
                                      fields: ['distinctId', 'email'],
                                  },
                              }
                            : null),
                    },
                },
                replies: {
                    publicationState: 'preview',
                    sort: ['createdAt:asc'],
                    populate: {
                        profile: {
                            fields: ['id', 'firstName', 'lastName', 'gravatarURL', 'pronouns'],
                            populate: {
                                avatar: {
                                    fields: ['id', 'url'],
                                },
                                teams: {
                                    fields: ['id'],
                                },
                            },
                        },
                    },
                },
                topics: true,
                pinnedTopics: true,
                slugs: true,
            },
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    )

export const useQuestion = (id: number | string, options?: UseQuestionOptions) => {
    const { getJwt, fetchUser, user, isModerator } = useUser()
    const posthog = usePostHog()

    const key = `${process.env.GATSBY_SQUEAK_API_HOST}/api/questions?${query(id, isModerator)}`

    const {
        data: question,
        error,
        isLoading,
        mutate,
    } = useSWR<StrapiRecord<QuestionData>>(key, async (url) => {
        const res = await fetch(
            url,
            user
                ? {
                      headers: {
                          Authorization: `Bearer ${await getJwt()}`,
                      },
                  }
                : undefined
        )

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

        mutate()
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

        mutate()
    }

    const archive = async (archive: boolean) => {
        const body = JSON.stringify({
            data: {
                archived: archive,
            },
        })
        await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/questions/${questionData?.id}`, {
            method: 'PUT',
            body,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await getJwt()}`,
            },
        })

        mutate()
    }

    const escalate = async (message?: string) => {
        const body = JSON.stringify({
            id: questionData?.id,
            message,
        })
        await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/escalate`, {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await getJwt()}`,
            },
        })

        mutate()
    }

    const pinTopics = async (topicIDs: number[]) => {
        if (!topicIDs) return
        const body = JSON.stringify({
            data: {
                pinnedTopics: topicIDs,
            },
        })

        await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/questions/${questionData?.id}`, {
            method: 'PUT',
            body,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await getJwt()}`,
            },
        })

        mutate()
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
        addTopic,
        removeTopic,
        archive,
        pinTopics,
        escalate,
        mutate,
    }
}

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
            publicationState: isModerator ? 'preview' : 'live',
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
                edits: {
                    sort: ['date:desc'],
                    populate: {
                        by: {
                            fields: ['firstName', 'lastName', 'color', 'gravatarURL'],
                            populate: {
                                avatar: {
                                    fields: ['url'],
                                },
                            },
                        },
                    },
                },
                resolvedBy: {
                    select: ['id'],
                },
                profile: {
                    select: ['id', 'firstName', 'lastName', 'color'],
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
                    sort: ['createdAt:asc'],
                    populate: {
                        edits: {
                            sort: ['date:desc'],
                            populate: {
                                by: {
                                    fields: ['firstName', 'lastName', 'color', 'gravatarURL'],
                                    populate: {
                                        avatar: {
                                            fields: ['url'],
                                        },
                                    },
                                },
                            },
                        },
                        profile: {
                            fields: ['id', 'firstName', 'lastName', 'gravatarURL', 'pronouns', 'color', 'startDate'],
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
    const { getJwt, fetchUser, user, isModerator, isValidating } = useUser()
    const posthog = usePostHog()

    const key =
        isValidating || options?.data
            ? null
            : `${process.env.GATSBY_SQUEAK_API_HOST}/api/questions?${query(id, isModerator)}`

    const {
        data: question,
        error,
        isLoading,
        mutate,
    } = useSWR<StrapiRecord<QuestionData>>(key, async (url) => {
        const jwt = user && (await getJwt())
        const res = await fetch(
            url,
            jwt
                ? {
                      headers: {
                          Authorization: `Bearer ${jwt}`,
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
    const questionID = typeof id !== 'string' ? id : question?.id

    const reply = async (body: string) => {
        try {
            posthog?.capture('squeak reply start', {
                questionId: questionID,
            })

            const token = await getJwt()

            const data = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/replies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    data: {
                        body,
                        question: questionID,
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
            }).then((res) => res.json())

            posthog?.capture('squeak reply', {
                questionId: questionID,
            })

            await fetchUser()

            await mutate()

            return data
        } catch (error) {
            posthog?.capture('squeak error', {
                source: 'useQuestion.reply',
                questionId: questionID,
                body,
                error: JSON.stringify(error),
            })

            throw error
        }
    }

    const handlePublishReply = async (published: boolean, id: number) => {
        try {
            posthog?.capture('squeak publish reply start', {
                questionId: questionID,
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
                questionId: questionID,
                replyId: id,
                published,
            })
        } catch (error) {
            posthog?.capture('squeak error', {
                source: 'useQuestion.handlePublishReply',
                questionId: questionID,
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
                questionId: questionID,
                resolved,
                resolvedBy,
            })

            const replyRes = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/questions/${questionID}`, {
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
                questionId: questionID,
                resolved,
                resolvedBy,
            })
        } catch (error) {
            posthog?.capture('squeak error', {
                source: 'useQuestion.handleResolve',
                questionId: questionID,
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
                questionId: questionID,
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
                questionId: questionID,
                replyId: id,
            })
        } catch (error) {
            posthog?.capture('squeak error', {
                source: 'useQuestion.handleReplyDelete',
                questionId: questionID,
                replyId: id,
                error: JSON.stringify(error),
            })

            throw error
        }
    }

    const addTopic = async (topic: StrapiRecord<TopicData>): Promise<void> => {
        await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/questions/${questionID}`, {
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
        await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/questions/${questionID}`, {
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
        await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/questions/${questionID}`, {
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
            id: questionID,
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

        await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/questions/${questionID}`, {
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
        isLoading: isValidating || (isLoading && !questionData),
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

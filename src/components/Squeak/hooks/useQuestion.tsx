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
                    select: ['id', 'firstName', 'lastName', 'color', 'reputation'],
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
                    publicationState: isModerator ? 'preview' : 'live',
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
                        upvoteProfiles: {
                            fields: ['id'],
                        },
                        downvoteProfiles: {
                            fields: ['id'],
                        },
                        profile: {
                            fields: [
                                'id',
                                'firstName',
                                'lastName',
                                'gravatarURL',
                                'pronouns',
                                'color',
                                'startDate',
                                'reputation',
                            ],
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

            if (questionData) {
                const now = new Date().toISOString()
                const optimisticReply = {
                    id: Date.now(),
                    attributes: {
                        body,
                        createdAt: now,
                        updatedAt: now,
                        publishedAt: now,
                        profile: {
                            data: user?.profile
                                ? {
                                      id: user.profile.id,
                                      attributes: user.profile,
                                  }
                                : null,
                        },
                        upvoteProfiles: { data: [] },
                        downvoteProfiles: { data: [] },
                    },
                }

                const optimisticData = {
                    ...questionData,
                    attributes: {
                        ...questionData.attributes,
                        replies: {
                            data: [...(questionData.attributes.replies?.data || []), optimisticReply],
                        },
                    },
                }

                mutate(optimisticData, false)
            }

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

            await mutate()

            throw error
        }
    }

    const voteReply = async (replyId: number, type: 'up' | 'down') => {
        const profileID = user?.profile?.id
        if (!profileID) return

        if (questionData) {
            const profileRef = { id: profileID }
            const replies = questionData.attributes.replies?.data || []
            const optimisticReplies = replies.map((r) => {
                if (r.id !== replyId) return r
                const upvotes = r.attributes.upvoteProfiles?.data || []
                const downvotes = r.attributes.downvoteProfiles?.data || []
                const alreadyUp = upvotes.some((p) => p.id === profileID)
                const alreadyDown = downvotes.some((p) => p.id === profileID)
                return {
                    ...r,
                    attributes: {
                        ...r.attributes,
                        upvoteProfiles: {
                            data:
                                type === 'up'
                                    ? alreadyUp
                                        ? upvotes.filter((p) => p.id !== profileID)
                                        : [...upvotes, profileRef]
                                    : upvotes.filter((p) => p.id !== profileID),
                        },
                        downvoteProfiles: {
                            data:
                                type === 'down'
                                    ? alreadyDown
                                        ? downvotes.filter((p) => p.id !== profileID)
                                        : [...downvotes, profileRef]
                                    : downvotes.filter((p) => p.id !== profileID),
                        },
                    },
                }
            })
            mutate(
                {
                    ...questionData,
                    attributes: { ...questionData.attributes, replies: { data: optimisticReplies } },
                } as StrapiRecord<QuestionData>,
                false
            )
        }

        try {
            const jwt = await getJwt()
            await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/replies/${replyId}/${type}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
            })
            await mutate()
        } catch {
            await mutate()
        }
    }

    const handlePublishReply = async (published: boolean, id: number) => {
        try {
            posthog?.capture('squeak publish reply start', {
                questionId: questionID,
                replyId: id,
                published,
            })

            if (questionData) {
                const replies = questionData.attributes.replies?.data || []
                const optimisticReplies = replies.map((r) =>
                    r.id === id
                        ? {
                              ...r,
                              attributes: {
                                  ...r.attributes,
                                  publishedAt: published ? null : new Date().toISOString(),
                              },
                          }
                        : r
                )
                mutate(
                    {
                        ...questionData,
                        attributes: { ...questionData.attributes, replies: { data: optimisticReplies } },
                    } as StrapiRecord<QuestionData>,
                    false
                )
            }

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
                const errorText = await replyRes.text()
                throw new Error(`Failed to update reply data: ${replyRes.status} ${errorText}`)
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

            await mutate()

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

            if (questionData) {
                mutate(
                    {
                        ...questionData,
                        attributes: {
                            ...questionData.attributes,
                            resolved,
                            resolvedBy: resolvedBy ? { data: { id: resolvedBy } } : null,
                        },
                    } as StrapiRecord<QuestionData>,
                    false
                )
            }

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

            await mutate()

            throw error
        }
    }

    const handleReplyDelete = async (id: number) => {
        try {
            posthog?.capture('squeak delete reply start', {
                questionId: questionID,
                replyId: id,
            })

            if (questionData) {
                mutate(
                    {
                        ...questionData,
                        attributes: {
                            ...questionData.attributes,
                            replies: {
                                data: questionData.attributes.replies?.data?.filter((r) => r.id !== id) || [],
                            },
                        },
                    },
                    false
                )
            }

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

            await mutate()

            throw error
        }
    }

    const addTopic = async (topic: StrapiRecord<TopicData>): Promise<void> => {
        if (questionData) {
            const currentTopics = questionData.attributes.topics?.data || []
            mutate(
                {
                    ...questionData,
                    attributes: {
                        ...questionData.attributes,
                        topics: { data: [...currentTopics, topic] },
                    },
                },
                false
            )
        }

        try {
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
            await mutate()
        } catch {
            await mutate()
        }
    }

    const removeTopic = async (topic: StrapiRecord<TopicData>): Promise<void> => {
        if (questionData) {
            const currentTopics = questionData.attributes.topics?.data || []
            mutate(
                {
                    ...questionData,
                    attributes: {
                        ...questionData.attributes,
                        topics: { data: currentTopics.filter((t) => t.id !== topic.id) },
                    },
                },
                false
            )
        }

        try {
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
            await mutate()
        } catch {
            await mutate()
        }
    }

    const archive = async (shouldArchive: boolean) => {
        if (questionData) {
            mutate(
                {
                    ...questionData,
                    attributes: { ...questionData.attributes, archived: shouldArchive },
                },
                false
            )
        }

        try {
            await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/questions/${questionID}`, {
                method: 'PUT',
                body: JSON.stringify({ data: { archived: shouldArchive } }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await getJwt()}`,
                },
            })
            await mutate()
        } catch {
            await mutate()
        }
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
        voteReply,
        addTopic,
        removeTopic,
        archive,
        pinTopics,
        escalate,
        mutate,
    }
}

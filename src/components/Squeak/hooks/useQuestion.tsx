import qs from 'qs'
import { QuestionData, StrapiRecord } from 'lib/strapi'
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
                profile: {
                    select: ['id', 'firstName', 'lastName'],
                    populate: {
                        avatar: {
                            select: ['id', 'url'],
                        },
                    },
                },
                replies: {
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

    const { getJwt } = useUser()

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

    return {
        question: questionData,
        reply,
        error,
        isLoading: isLoading && !questionData,
        isError: error,
    }

    /*const handleResolve = async (resolved: boolean, replyId: string | null = null) => {
        await post(apiHost, '/api/question/resolve', {
            messageId: question?.id,
            replyId,
            organizationId,
            resolved,
        })
        setResolved(resolved)
        setResolvedBy(replyId)
        if (onResolve) {
            onResolve(resolved, replyId)
        }
    }

    const handleReply = async (reply: Record<string, any>) => {
        setReplies((replies) => [...replies, reply])
    }

    const handleReplyDelete = async (id: string) => {
        await doDelete(apiHost, `/api/replies/${id}`, { organizationId })
        setReplies(replies.filter((reply) => id !== reply.id))
    }

    const handlePublish = async (id: string, published: boolean) => {
        await patch(apiHost, `/api/replies/${id}`, {
            organizationId: organizationId,
            published,
        })
        const newReplies = [...replies]
        newReplies.some((reply) => {
            if (reply.id === id) {
                reply.published = published
                return true
            }
        })
        setReplies(newReplies)
    }*/
}

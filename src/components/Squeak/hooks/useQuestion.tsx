import qs from 'qs'
import { ProfileData, ReplyData, StrapiData, StrapiRecord, StrapiResult } from 'lib/strapi'
import useSWR from 'swr'

type QuestionData = {
    subject: string
    permalink: string
    resolved: boolean
    body: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    profile?: StrapiData<ProfileData>
    replies?: StrapiData<ReplyData[]>
}

export const useQuestion = (id: number | string) => {
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
    } = useSWR<StrapiRecord<QuestionData>>(
        `${process.env.GATSBY_SQUEAK_API_HOST}/api/questions?${query}`,
        async (url) => {
            const res = await fetch(url)
            const { data } = await res.json()
            return data?.[0]
        }
    )

    return {
        question,
        error,
        isLoading,
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

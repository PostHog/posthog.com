import { useState, useEffect } from 'react'
import qs from 'qs'
import { QuestionData } from 'lib/strapi'
import { useUser } from './useUser'

const meQuery = qs.stringify(
    {
        populate: {
            profile: {
                populate: {
                    questionSubscriptions: {
                        sort: 'activeAt:desc',
                        filters: {
                            $and: [
                                {
                                    $or: [
                                        {
                                            archived: {
                                                $null: true,
                                            },
                                        },
                                        {
                                            archived: {
                                                $eq: false,
                                            },
                                        },
                                    ],
                                },
                                {
                                    subject: {
                                        $ne: '',
                                    },
                                },
                                {
                                    slugs: {
                                        slug: {
                                            $notContainsi: '/community/profiles',
                                        },
                                    },
                                },
                            ],
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
                                select: ['id', 'firstName', 'lastName', 'gravatarURL'],
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
                                        fields: ['id', 'firstName', 'lastName', 'gravatarURL', 'pronouns'],
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
                                            avatar: {
                                                fields: ['id', 'url'],
                                            },
                                            teams: {
                                                fields: ['id'],
                                            },
                                            user: {
                                                populate: ['role'],
                                                fields: ['role'],
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
                },
            },
        },
    },
    {
        encodeValuesOnly: true,
    }
)

export const useSubscribedQuestions = () => {
    const { getJwt } = useUser()
    const [questions, setQuestions] = useState<QuestionData[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setIsLoading(true)
                const token = await getJwt()
                const data = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/users/me?${meQuery}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((res) => res.json())
                setQuestions(data?.profile?.questionSubscriptions || [])
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchQuestions()
    }, [])

    return { questions, isLoading }
}

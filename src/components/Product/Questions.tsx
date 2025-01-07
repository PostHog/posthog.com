import QuestionsTable from 'components/Questions/QuestionsTable'
import { useQuestions } from 'hooks/useQuestions'
import React from 'react'

type QuestionsProps = {
    topicIds?: number[]
}

export default function Questions({ topicIds = [] }: QuestionsProps): JSX.Element {
    const { questions, isLoading } = useQuestions({
        limit: 10,
        sortBy: 'activity',
        filters: {
            topics: {
                id: {
                    $in: [topicIds],
                },
            },
            subject: {
                $ne: '',
            },
            slugs: {
                slug: {
                    $notContainsi: '/community/profiles',
                },
            },
            $or: [
                {
                    resolved: {
                        $eq: true,
                    },
                },
                {
                    resolved: {
                        $eq: false,
                    },
                    replies: {
                        profile: {
                            teams: {
                                id: {
                                    $notNull: true,
                                },
                            },
                        },
                    },
                },
            ],
        },
    })

    return (
        <QuestionsTable
            className="sm:grid-cols-4"
            questions={questions}
            isLoading={isLoading}
            sortBy="activity"
            showBody
        />
    )
}

import QuestionsTable from 'components/Questions/QuestionsTable'
import { useQuestions } from 'hooks/useQuestions'
import React from 'react'

export default function Questions({ topicIds = [] }) {
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
            hasMore={false}
            className="sm:grid-cols-4"
            questions={questions}
            isLoading={isLoading}
            sortBy="activity"
            showBody
        />
    )
}

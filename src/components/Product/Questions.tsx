import QuestionsTable from 'components/Questions/QuestionsTable'
import { useQuestions } from 'hooks/useQuestions'
import React from 'react'

export default function Questions({ topicIds = [] }) {
    const { questions, isLoading } = useQuestions({
        limit: 10,
        sortBy: 'newest',
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
        },
    })
    return (
        <QuestionsTable
            hasMore={false}
            className="sm:grid-cols-4"
            questions={questions}
            isLoading={isLoading}
            showBody
        />
    )
}

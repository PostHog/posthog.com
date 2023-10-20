import QuestionsTable from 'components/Questions/QuestionsTable'
import { useQuestions } from 'hooks/useQuestions'
import React from 'react'

export default function Questions({ topicId }) {
    const { questions, isLoading } = useQuestions({
        limit: 10,
        sortBy: 'newest',
        topicId,
        filters: {
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

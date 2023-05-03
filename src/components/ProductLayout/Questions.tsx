import React from 'react'
import { useQuestions } from 'hooks/useQuestions'
import QuestionsTable from 'components/Questions/QuestionsTable'
import QuestionForm from 'components/Questions/QuestionForm'

export default function Questions({ topicId }: { topicId: number }) {
    const { questions, isLoading, fetchMore, hasMore, refresh } = useQuestions({
        limit: 20,
        sortBy: 'newest',
        topicId,
    })
    return (
        <div className="max-w-screen-2xl mx-auto">
            <div className="flex justify-end mb-8">
                <QuestionForm topicID={topicId} onSubmit={refresh} />
            </div>
            <QuestionsTable
                hasMore={hasMore}
                className="sm:grid-cols-4"
                questions={questions}
                isLoading={isLoading}
                fetchMore={fetchMore}
            />
        </div>
    )
}

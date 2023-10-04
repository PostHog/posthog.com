import React from 'react'
import { useQuestions } from 'hooks/useQuestions'
import QuestionsTable from 'components/Questions/QuestionsTable'
import QuestionForm from 'components/Questions/QuestionForm'
import Link from 'components/Link'

export default function Questions({ topicId }: { topicId: number }) {
    const { questions, isLoading, fetchMore, hasMore, refresh } = useQuestions({
        limit: 20,
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
        <div className="max-w-screen-2xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 md:mb-4">
                <div>
                    <h2 className="mb-1">Community questions</h2>
                    <p className="text-sm">
                        Here's what people are asking in the PostHog community.{' '}
                        <Link to="/questions">Visit the forums</Link> for more.
                    </p>
                </div>
                <QuestionForm topicID={topicId} onSubmit={refresh} />
            </div>
            <QuestionsTable
                hasMore={hasMore}
                className="sm:grid-cols-4"
                questions={questions}
                isLoading={isLoading}
                fetchMore={fetchMore}
                showBody
            />
        </div>
    )
}

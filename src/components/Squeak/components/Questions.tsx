import React, { useRef } from 'react'
import { Question } from './Question'
import { QuestionForm } from './QuestionForm'
import { useQuestions } from 'hooks/useQuestions'

type QuestionsProps = {
    slug?: string
    limit?: number
    profileId?: number
    topicId?: number
    showForm?: boolean
    title?: string
}

export const Questions = ({ slug, limit, topicId, profileId, showForm = true, title }: QuestionsProps) => {
    const containerRef = useRef<HTMLDivElement>(null)

    const { questions, fetchMore, refresh } = useQuestions({ slug, limit, topicId, profileId })
    const hasQuestions = questions.data && questions.data.length > 0
    return (
        <div>
            {hasQuestions && title && <h3>{title}</h3>}
            {hasQuestions && (
                <ul className="m-0 p-0 list-none mb-6">
                    {questions.data.map((question) => {
                        return (
                            <li key={question.id} className="py-4 first:pt-0">
                                <Question id={question.id} question={question} />
                            </li>
                        )
                    })}
                </ul>
            )}

            {/*start + limit < count && (
                    <button disabled={loading} className="squeak-show-more-questions-button" onClick={fetchMore}>
                        Show more
                    </button>
                )*/}

            {/* TODO: Pass refresh for now questions */}
            {showForm && <QuestionForm onSubmit={refresh} formType="question" slug={slug} />}
        </div>
    )
}

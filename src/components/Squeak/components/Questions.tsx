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
    parentName?: string
    buttonText?: React.ReactNode | string
    subject?: boolean
    initialView?: string
    disclaimer?: boolean
    autoFocus?: boolean
    noQuestionsMessage?: React.ReactNode
}

export const Questions = ({
    slug,
    limit,
    topicId,
    profileId,
    showForm = true,
    title,
    parentName,
    buttonText,
    subject,
    initialView,
    disclaimer,
    autoFocus,
    noQuestionsMessage,
}: QuestionsProps) => {
    const containerRef = useRef<HTMLDivElement>(null)

    const { questions, fetchMore, refresh, isLoading } = useQuestions({ slug, limit, topicId, profileId })
    const hasQuestions = questions.data && questions.data.length > 0
    return (
        <div>
            {hasQuestions && title && <h3>{title}</h3>}
            {hasQuestions && (
                <ul className="not-prose m-0 p-0 list-none mb-6">
                    {questions.data.map((question) => {
                        return (
                            <li key={question.id} className="py-4 first:pt-0">
                                <Question id={question.id} />
                            </li>
                        )
                    })}
                </ul>
            )}
            {!isLoading && !hasQuestions && noQuestionsMessage}

            {/*start + limit < count && (
                    <button disabled={loading} className="squeak-show-more-questions-button" onClick={fetchMore}>
                        Show more
                    </button>
                )*/}

            {/* TODO: Pass refresh for now questions */}
            {showForm && (
                <QuestionForm
                    autoFocus={autoFocus}
                    buttonText={buttonText}
                    parentName={parentName}
                    initialView={initialView}
                    onSubmit={refresh}
                    formType="question"
                    slug={slug}
                    subject={subject}
                    disclaimer={disclaimer}
                />
            )}
        </div>
    )
}

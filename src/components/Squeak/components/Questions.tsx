import React, { useRef } from 'react'
import root from 'react-shadow/styled-components'

import { Question } from './Question'
import { QuestionForm } from './QuestionForm'
import { Theme } from './Theme'
import { useQuestions } from 'hooks/useQuestions'

type QuestionsProps = {
    slug?: string
    limit?: number
    profileId?: number
    topicId?: number
    showForm?: boolean
}

export const Questions = ({ slug, limit, topicId, profileId, showForm = true }: QuestionsProps) => {
    const containerRef = useRef<HTMLDivElement>(null)

    const { questions, fetchMore, refresh } = useQuestions({ slug, limit, topicId, profileId })

    return (
        <root.div ref={containerRef}>
            <Theme containerRef={containerRef} />
            <div className="squeak">
                {questions.data && questions.data.length > 0 && (
                    <ul className="squeak-questions">
                        {questions.data.map((question) => {
                            return (
                                <li key={question.id}>
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
                {showForm && <QuestionForm onSubmit={refresh} formType="question" />}
            </div>
        </root.div>
    )
}

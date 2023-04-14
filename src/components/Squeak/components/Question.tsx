import React, { useState, useRef, createContext, useEffect } from 'react'
import root from 'react-shadow/styled-components'

import { Theme } from './Theme'
import { Replies } from './Replies'
import { Profile } from './Profile'
import { QuestionData, StrapiRecord } from 'lib/strapi'
import Days from './Days'
import Markdown from './Markdown'
import { QuestionForm } from './QuestionForm'
import { useQuestion } from '../hooks/useQuestion'
import QuestionSkeleton from './QuestionSkeleton'
import SubscribeButton from './SubscribeButton'

type QuestionProps = {
    // TODO: Deal with id possibly being undefined at first
    id: number
    question?: StrapiRecord<QuestionData>
    expanded?: boolean
}

export const CurrentQuestionContext = createContext<any>({})

export const Question = (props: QuestionProps) => {
    const { id, question } = props
    const [expanded, setExpanded] = useState(props.expanded || false)
    const containerRef = useRef<HTMLDivElement>(null)

    // TODO: Default to question data if passed in
    const {
        question: questionData,
        isLoading,
        isError,
        error,
        reply,
        handlePublishReply,
        handleResolve,
        handleReplyDelete,
    } = useQuestion(id, { data: question })

    if (isLoading) {
        return <QuestionSkeleton />
    }

    if (isError) {
        return <div>Error: {JSON.stringify(error)}</div>
    }

    if (!questionData) {
        return <div>Question not found</div>
    }

    const resolved = questionData.attributes.resolved

    return (
        <root.div ref={containerRef}>
            <Theme containerRef={containerRef} />
            <CurrentQuestionContext.Provider
                value={{
                    question: { id, ...(questionData?.attributes ?? {}) },
                    handlePublishReply,
                    handleResolve,
                    handleReplyDelete,
                }}
            >
                <div className="squeak">
                    <div className="squeak-question-container squeak-post">
                        <div className="squeak-post-author">
                            <Profile profile={questionData.attributes.profile?.data} />
                            <Days created={questionData.attributes.createdAt} />
                            {!resolved && (
                                <div className="squeak-subscribe-button-container">
                                    <SubscribeButton question={questionData} />
                                </div>
                            )}
                        </div>
                        <div className="squeak-post-content">
                            <h3 className="squeak-subject">
                                <a href={`/questions/${questionData.attributes.permalink}`} className="!no-underline">
                                    {questionData.attributes.subject}
                                </a>
                            </h3>

                            <Markdown>{questionData.attributes.body}</Markdown>
                        </div>

                        <Replies expanded={expanded} setExpanded={setExpanded} />

                        {resolved ? (
                            <div className="squeak-locked-message">
                                <p>This thread has been closed</p>
                            </div>
                        ) : (
                            <div className="squeak-reply-form-container">
                                <QuestionForm questionId={questionData.id} formType="reply" reply={reply} />
                            </div>
                        )}
                    </div>
                </div>
            </CurrentQuestionContext.Provider>
        </root.div>
    )
}

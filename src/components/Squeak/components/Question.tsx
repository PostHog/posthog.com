import React, { useState, useRef } from 'react'
import root from 'react-shadow/styled-components'

import { Theme } from './Theme'
import { Replies } from './Replies'
import { Profile } from './Profile'
import { QuestionData, StrapiRecord } from 'lib/strapi'
import Days from './Days'
import Markdown from 'markdown-to-jsx'
import { QuestionForm } from './QuestionForm'
import { useQuestion } from '../hooks/useQuestion'

type QuestionProps = {
    // TODO: Deal with id possibly being undefined at first
    id: number | string
    question?: StrapiRecord<QuestionData>
    onSubmit: (question: any) => void
    onResolve: (resolved: boolean, replyId: string | null) => void
}

export const Question = ({ id, onSubmit, onResolve, question }: QuestionProps) => {
    console.log(id)
    const [expanded, setExpanded] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const { question: questionData, isLoading, isError, error } = useQuestion(id)

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error: {JSON.stringify(error)}</div>
    }

    if (!questionData) {
        return <div>Question not found</div>
    }

    const handleContainerClick = (e: React.MouseEvent) => {}

    /*const { questionAuthorId, resolved, resolvedBy, handleResolve, handlePublish, handleReplyDelete } = question
        const [confirmDelete, setConfirmDelete] = useState(false)
        const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            if (confirmDelete) {
                handleReplyDelete(id)
            } else {
                setConfirmDelete(true)
            }
        }

        const handleContainerClick = () => {
            setConfirmDelete(false)
        }*/

    /*const getQuestion = async () => {
        const permalink = window.location.pathname
        // @ts-ignore
        const { response, data: question } =
          (await get(apiHost, '/api/question', {
            organizationId,
            permalink
          })) || {}

        if (response?.status !== 200) return null

        return question
      }

      useEffect(() => {
        if (!question && permalink_base) {
          getQuestion().then((question) => {
            setQuestion(question?.question)
            setReplies(question?.replies || [])
          })
        }
      }, [organizationId, question, permalink_base])

      useEffect(() => {
        setQuestion(other?.question)
      }, [other?.question])*/

    return (
        <root.div ref={containerRef}>
            <Theme containerRef={containerRef} />
            <div className="squeak squeak-question-container">
                <div onClick={handleContainerClick}>
                    <div className="squeak-post-author">
                        <Profile profile={questionData.attributes.profile?.data} />

                        <Days created={questionData.attributes.createdAt} />
                    </div>
                    <div className="squeak-post-content">
                        <h3 className="squeak-subject">
                            <a href={`/questions/${questionData.id}`}>{questionData.attributes.subject}</a>
                        </h3>

                        <Markdown>{questionData.attributes.body}</Markdown>
                    </div>
                </div>

                <Replies
                    expanded={expanded}
                    setExpanded={setExpanded}
                    resolved={questionData.attributes.resolved}
                    replies={questionData.attributes.replies}
                />

                {questionData.attributes.resolved ? (
                    <div className="squeak-locked-message">
                        <p>This thread has been closed</p>
                    </div>
                ) : (
                    <div className="squeak-reply-form-container">
                        <QuestionForm onSubmit={onSubmit} questionId={questionData.id} formType="reply" />
                    </div>
                )}
            </div>
        </root.div>
    )
}

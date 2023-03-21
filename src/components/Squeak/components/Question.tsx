import React, { useState, useRef } from 'react'
import root from 'react-shadow/styled-components'
import { useOrg } from '../hooks/useOrg'
import { Provider as QuestionProvider } from '../hooks/useQuestion'

import Reply from './Reply'
import { Theme } from './Theme'
import ErrorBoundary from './ErrorBoundary'
import { Replies } from './Replies'

type Reply = {
    id: string
    profile: Record<string, any>
    created_at: string
    body: string
    badgeText: string
    published: boolean
}

type Question = {
    id: string
    subject: string
    permalink: string | null
    published: boolean
    replies: Reply[]
}

export type QuestionProps = {
    onSubmit: (question: any) => void
    onResolve: (resolved: boolean, replyId: string | null) => void
    apiHost: string
    question?: Question
}

export const Question = ({ onSubmit, onResolve, apiHost, ...other }: QuestionProps) => {
    const [expanded, setExpanded] = useState(false)
    const [question, setQuestion] = useState(other?.question)
    const [replies, setReplies] = useState(other?.question?.replies || [])
    const [firstReply] = replies
    const containerRef = useRef<HTMLDivElement>(null)

    const {
        config: { permalink_base, permalinks_enabled },
    } = useOrg()

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

    return question ? (
        <ErrorBoundary>
            {/* @ts-ignore */}
            <root.div ref={containerRef}>
                <Theme containerRef={containerRef} />
                <div className="squeak squeak-question-container">
                    <Reply
                        permalink={
                            permalinks_enabled && question?.permalink && `/${permalink_base}/${question?.permalink}`
                        }
                        className="squeak-post"
                        subject={question.subject}
                        {...firstReply}
                    />
                    <QuestionProvider onSubmit={onSubmit} question={question} replies={replies} onResolve={onResolve}>
                        <Replies expanded={expanded} setExpanded={setExpanded} />
                    </QuestionProvider>
                </div>
            </root.div>
        </ErrorBoundary>
    ) : null
}

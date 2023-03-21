import React, { useState, useRef } from 'react'
import root from 'react-shadow/styled-components'
import useSWR from 'swr'

import { ReplyData } from './Reply'
import { Theme } from './Theme'
import ErrorBoundary from './ErrorBoundary'
import { Replies } from './Replies'
import { Profile, ProfileData } from './Profile'
import { StrapiData, StrapiRecord, StrapiResult } from '../util/types'
import Days from './Days'
import Markdown from 'markdown-to-jsx'

// TODO: Allow passing in permalink instead of id
export const useQuestion = (id: number) => {
    const { data, error } = useSWR<StrapiResult<QuestionData>>(
        `${process.env.GATSBY_SQUEAK_API_HOST}/api/questions/${id}?populate=*`,
        async (url) => {
            const res = await fetch(url)
            return res.json()
        }
    )

    return {
        question: data?.data,
        error,
        isLoading: !error && !data,
        isError: error,
    }
}

type QuestionData = {
    subject: string
    permalink: string
    resolved: boolean
    body: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    profile?: StrapiData<ProfileData>
    replies?: StrapiData<ReplyData[]>
}

type QuestionProps = {
    // TODO: Deal with id possibly being undefined at first
    id: number
    question?: StrapiRecord<QuestionData>
    onSubmit: (question: any) => void
    onResolve: (resolved: boolean, replyId: string | null) => void
}

export const Question = ({ id, onSubmit, onResolve, question }: QuestionProps) => {
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

    return question ? (
        <ErrorBoundary>
            {/* @ts-ignore */}
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
                    {/*<QuestionProvider onSubmit={onSubmit} question={question} replies={replies} onResolve={onResolve}>*/}
                    <Replies expanded={expanded} setExpanded={setExpanded} />
                    {/*</QuestionProvider>*/}
                </div>
            </root.div>
        </ErrorBoundary>
    ) : null
}

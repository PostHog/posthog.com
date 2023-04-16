import React, { useState, useRef, createContext, useEffect } from 'react'
import { Replies } from './Replies'
import { Profile } from './Profile'
import { QuestionData, StrapiRecord } from 'lib/strapi'
import Days from './Days'
import Markdown from './Markdown'
import { QuestionForm } from './QuestionForm'
import { useQuestion } from '../hooks/useQuestion'
import QuestionSkeleton from './QuestionSkeleton'
import SubscribeButton from './SubscribeButton'
import Link from 'components/Link'

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

    return (
        <CurrentQuestionContext.Provider
            value={{
                question: { id, ...(questionData?.attributes ?? {}) },
                handlePublishReply,
                handleResolve,
                handleReplyDelete,
            }}
        >
            <div>
                <div className="flex flex-col">
                    <div className="flex items-center space-x-2 w-full">
                        <Profile profile={questionData.attributes.profile?.data} />
                        <Days created={questionData.attributes.createdAt} />
                        <div className="!ml-auto">
                            <SubscribeButton question={questionData} />
                        </div>
                    </div>
                    <div className="ml-5 pl-[30px] border-l border-dashed border-gray-accent-light dark:border-gray-accent-dark">
                        <h3 className="text-base font-semibold m-0 pb-1 leading-5">
                            <Link
                                to={`/questions/${questionData.attributes.permalink}`}
                                className="no-underline text-black dark:text-white"
                            >
                                {questionData.attributes.subject}
                            </Link>
                        </h3>

                        <Markdown>{questionData.attributes.body}</Markdown>
                    </div>

                    <Replies expanded={expanded} setExpanded={setExpanded} />

                    <div className="ml-5 pr-5 pb-1 pl-8 relative w-full squeak-left-border">
                        <QuestionForm questionId={questionData.id} formType="reply" reply={reply} />
                    </div>
                </div>
            </div>
        </CurrentQuestionContext.Provider>
    )
}

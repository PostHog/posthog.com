import React, { useState, useRef, createContext } from 'react'
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
import { useUser } from 'hooks/useUser'

type QuestionProps = {
    // TODO: Deal with id possibly being undefined at first
    id: number | string
    question?: StrapiRecord<QuestionData>
    expanded?: boolean
}

export const CurrentQuestionContext = createContext<any>({})

export const Question = (props: QuestionProps) => {
    const { id, question } = props
    const [expanded, setExpanded] = useState(props.expanded || false)
    const { user } = useUser()

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
        archive,
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

    const archived = questionData?.attributes.archived

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
                {archived && (
                    <div className="font-medium text-sm m-0 mb-6 bg-gray-accent-light dark:bg-gray-accent-dark p-6 rounded text-center">
                        <p className="font-bold m-0 pb-1">This thread has been archived.</p>
                        <p className="text-sm m-0">
                            It's likely out of date, no longer relevant, or the answer has been added to our{' '}
                            <Link to="/docs">documentation</Link>.
                        </p>
                    </div>
                )}
                <div className={`flex flex-col ${archived ? 'opacity-50' : ''}`}>
                    <div className="flex items-center space-x-2 w-full">
                        <Profile profile={questionData.attributes.profile?.data} />
                        <Days created={questionData.attributes.createdAt} />
                        <div className="!ml-auto flex space-x-2">
                            {user?.role?.type === 'moderator' && (
                                <button onClick={() => archive(!archived)} className="font-bold">
                                    {archived ? 'Unarchive' : 'Archive'}
                                </button>
                            )}
                            {!archived && <SubscribeButton contentType="question" id={questionData?.id} />}
                        </div>
                    </div>

                    <div className="ml-5 pl-[30px] border-l border-dashed border-gray-accent-light dark:border-opacity-50">
                        <h3 className="text-base font-semibold m-0 pb-1 leading-5">
                            <Link
                                to={`/questions/${questionData.attributes.permalink}`}
                                className="no-underline font-semibold text-black dark:text-white hover:text-black dark:hover:text-white"
                            >
                                {questionData.attributes.subject}
                            </Link>
                        </h3>

                        <Markdown>{questionData.attributes.body}</Markdown>
                    </div>

                    <Replies expanded={expanded} setExpanded={setExpanded} />

                    <div className="ml-5 pr-5 pb-1 pl-8 relative w-full squeak-left-border">
                        <QuestionForm archived={archived} questionId={questionData.id} formType="reply" reply={reply} />
                    </div>
                </div>
            </div>
        </CurrentQuestionContext.Provider>
    )
}

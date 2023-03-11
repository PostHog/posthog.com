import React, { useEffect, useState } from 'react'
import { useOrg } from '../hooks/useOrg'
import { post } from '../lib/api'
import Question from './Question'
import QuestionForm from './QuestionForm'

const Topics = ({
    handleTopicChange,
    activeTopic,
    topics,
}: {
    handleTopicChange: (topic: null) => void
    activeTopic: any
    topics: any[]
}) => {
    return topics && topics.length > 0 ? (
        <ul className="squeak-topics-container">
            <li>
                <button
                    className={activeTopic === null ? 'squeak-active-topic' : ''}
                    onClick={() => handleTopicChange(null)}
                >
                    All
                </button>
            </li>
            {topics.map((topic) => {
                return (
                    <li key={topic.label}>
                        <button
                            className={activeTopic.label === topic.label ? 'squeak-active-topic' : ''}
                            onClick={() => handleTopicChange(topic.label)}
                        >
                            {topic.label}
                        </button>
                    </li>
                )
            })}
        </ul>
    ) : null
}

type QuestionsProps = {
    slug?: string
    limit?: number
    onSubmit: (values: any, formType: any) => void
    onLoad: () => void
    topics: boolean
    onSignUp: () => void
    topic: any
}

export default function Questions({
    slug,
    limit = 100,
    onSubmit,
    onLoad,
    topics,
    onSignUp,
    topic,
}: QuestionsProps) {
    const [activeTopic, setActiveTopic] = useState(topic)
    const { organizationId, apiHost } = useOrg()
    const [questions, setQuestions] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [availableTopics, setAvailableTopics] = useState<any[]>([])
    const [count, setCount] = useState(0)
    const [start, setStart] = useState(0)

    const getQuestions = async ({ limit, start, topic }: { limit: number; start: number; topic?: string }) => {
        // @ts-ignore
        const { response, data } =
            (await post(apiHost, `/api/questions`, {
                organizationId,
                slug,
                published: true,
                perPage: limit,
                start,
                topic,
            })) || {}

        if (response.status !== 200) {
            return { questions: [], count: 0 }
        }

        // returns a structure that looks like: {questions: [{id: 123}], count: 123}
        return data
    }

    const getAvailableTopics = (questions: any[]) => {
        const availableTopics: any[] = []
        questions.forEach(({ question: { topics } }) => {
            topics?.forEach((topic: any) => {
                if (!availableTopics.includes(topic)) availableTopics.push(topic)
            })
        })
        return availableTopics
    }

    useEffect(() => {
        getQuestions({ limit, start, topic: activeTopic }).then((data) => {
            setQuestions([...questions, ...data.questions])
            setCount(data.count)
            setAvailableTopics(getAvailableTopics([...questions, ...data.questions]))
            onLoad?.()
        })
    }, [])

    const handleSubmit = async (values: any, formType: any) => {
        getQuestions({ limit: 1, start: 0 }).then((data) => {
            setQuestions([...data.questions, ...questions])
            setCount(data.count)
            setStart(start + 1)
            setAvailableTopics(getAvailableTopics([...questions, ...data.questions]))
            onSubmit?.(values, formType)
        })
    }

    const handleShowMore = () => {
        getQuestions({ limit, start: start + limit, topic: activeTopic }).then((data) => {
            setQuestions([...questions, ...data.questions])
            setCount(data.count)
            setStart(start + limit)
            setAvailableTopics(getAvailableTopics([...questions, ...data.questions]))
        })
    }

    const handleTopicChange = (topic: any) => {
        if (topic === activeTopic) return
        getQuestions({ limit, start: 0, topic }).then((data) => {
            setStart(0)
            setQuestions(data.questions)
            setCount(data.count)
            setActiveTopic(topic)
        })
    }

    return (
        <>
            {topics && (
                <Topics topics={availableTopics} handleTopicChange={handleTopicChange} activeTopic={activeTopic} />
            )}

            {questions && questions.length > 0 && (
                <>
                    <ul className="squeak-questions">
                        {questions.map((question) => {
                            return (
                                <li key={question.question.id}>
                                    <Question onSubmit={handleSubmit} {...question} />
                                </li>
                            )
                        })}
                    </ul>
                </>
            )}

            {start + limit < count && (
                <button disabled={loading} className="squeak-show-more-questions-button" onClick={handleShowMore}>
                    Show more
                </button>
            )}

            {/* @ts-ignore */}
            <QuestionForm onSignUp={onSignUp} onSubmit={handleSubmit} formType="question" />
        </>
    )
}

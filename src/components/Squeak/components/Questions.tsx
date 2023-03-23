import React, { useEffect, useState, useRef } from 'react'
import root from 'react-shadow/styled-components'

import { Question } from './Question'
import { QuestionForm } from './QuestionForm'
import { Theme } from './Theme'
import { StrapiResult, QuestionData, StrapiRecord } from 'lib/strapi'
import qs from 'qs'

type QuestionsProps = {
    slug?: string
    limit?: number
    onSubmit: (values: any, formType: any) => void
    onLoad: () => void
    topics: boolean
    onSignUp: () => void
    topicId?: number
}

export const Questions = ({ slug, limit = 100, onSubmit, onLoad, topics, onSignUp, topicId }: QuestionsProps) => {
    const [questions, setQuestions] = useState<StrapiRecord<QuestionData>[]>([])
    const [loading, setLoading] = useState(false)
    const [availableTopics, setAvailableTopics] = useState<any[]>([])
    const [count, setCount] = useState(0)
    const [start, setStart] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    const getQuestions = async ({ limit, start, topicId }: { limit: number; start: number; topicId?: number }) => {
        console.log(topicId)
        const query = qs.stringify(
            {
                pagination: {
                    start,
                    limit,
                },
                fields: ['id'],
                filters: topicId ? { topics: { id: { $eq: topicId } } } : {},
            },
            {
                encodeValuesOnly: true,
            }
        )

        const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/questions?${query}`)

        if (!response.ok) {
            return []
        }

        const { data } = (await response.json()) as StrapiResult<QuestionData[]>

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
        getQuestions({ limit, start, topicId }).then((data) => {
            setQuestions(data)
            setCount(data.length)
            // setAvailableTopics(getAvailableTopics([...questions, ...data.questions]))
            // onLoad?.()
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
        getQuestions({ limit, start: start + limit, topicId }).then((data) => {
            setQuestions([...questions, ...data.questions])
            setCount(data.count)
            setStart(start + limit)
            setAvailableTopics(getAvailableTopics([...questions, ...data.questions]))
        })
    }

    return (
        <root.div ref={containerRef}>
            <Theme containerRef={containerRef} />
            <div className="squeak">
                {questions && questions.length > 0 && (
                    <ul className="squeak-questions">
                        {questions.map((question) => {
                            return (
                                <li key={question.id}>
                                    <Question onSubmit={handleSubmit} id={question.id} />
                                </li>
                            )
                        })}
                    </ul>
                )}

                {start + limit < count && (
                    <button disabled={loading} className="squeak-show-more-questions-button" onClick={handleShowMore}>
                        Show more
                    </button>
                )}

                <QuestionForm onSignUp={onSignUp} onSubmit={handleSubmit} formType="question" />
            </div>
        </root.div>
    )
}

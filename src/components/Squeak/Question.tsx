import React from 'react'
import useSWR from 'swr'
import { useSqueak } from './SqueakProvider'
import type { StrapiResult, StrapiData, StrapiRecord } from './utils'

import { type ReplyData, Replies } from './Replies'
import { Avatar } from './Avatar'

type ProfileData = {
    firstName: string | null
    lastName: string | null
    biography: string | null
    company: string | null
    companyRole: string | null
    github: string | null
    linkedin: string | null
    location: string | null
    twitter: string | null
    website: string | null
    createdAt: string
    updatedAt: string | null
    publishedAt: string | null
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
}

// TODO: Allow passing in permalink instead of id
export const useQuestion = (id: number) => {
    const { apiHost } = useSqueak()
    const { data, error } = useSWR<StrapiResult<QuestionData>>(
        `${apiHost}/api/questions/${id}?populate=*`,
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

export const Question: React.FC<QuestionProps> = ({ id, question }) => {
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

    return (
        <div>
            <div className="flex space-x-2">
                <Avatar url={`/community/profiles/${questionData.attributes.profile?.data.id}`} />
                <div>
                    <h1>{questionData.attributes.subject}</h1>
                    <p>{questionData.attributes.body}</p>
                </div>
            </div>
            <Replies replies={questionData.attributes.replies} />
        </div>
    )
}

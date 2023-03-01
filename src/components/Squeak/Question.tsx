import React from 'react'
import useSWR from 'swr'
import { useSqueak } from './SqueakProvider'

type StrapiResult<T> = StrapiData<T> & StrapiMeta

type StrapiMeta = {
    meta: {
        pagination: {
            page: number
            pageSize: number
            pageCount: number
            total: number
        }
    }
}

type StrapiData<T> = {
    data: T extends Array<any> ? StrapiRecord<T>[] : StrapiRecord<T>
}

type StrapiRecord<T> = {
    id: number
    attributes: T
}

type Profile = {
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

type Reply = {
    // TODO: Populate profile data
    body: string
    createdAt: string
    updatedAt: string
    publishedAt: string
}

type Question = {
    subject: string
    permalink: string
    resolved: boolean
    body: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    profile?: StrapiData<Profile>
    replies?: StrapiData<Reply[]>
}

type QuestionProps = {
    id: number
    question?: StrapiRecord<Question>
}

export const useQuestion = (id: number) => {
    const { apiHost } = useSqueak()
    const { data, error } = useSWR<StrapiResult<Question>>(`${apiHost}/api/questions/${id}?populate=*`, async (url) => {
        const res = await fetch(url)
        return res.json()
    })

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

    return <pre>{JSON.stringify(questionData)}</pre>
}

import { useMemo } from 'react'
import useSWRInfinite from 'swr/infinite'
import qs from 'qs'
import { Company } from './useCompanies'

const query = (offset: number) => {
    return qs.stringify({
        pagination: {
            start: offset * 20,
            limit: 20,
        },
        sort: 'createdAt:desc',
        populate: {
            company: true,
        },
    })
}

export type Job = {
    id: number
    attributes: {
        title: string
        url: string
        department: string
        postedDate: string
        isRemote: boolean
        description: string
        location: string
        company: {
            data: Company
        }
        publishedAt: string
        createdAt: string
        updatedAt: string
    }
}

export default function useJobs(): {
    jobs: Job[]
    isLoading: boolean
    error: Error | undefined
    fetchMore: () => void
} {
    const { data, size, setSize, isLoading, error } = useSWRInfinite(
        (offset) => `${process.env.GATSBY_SQUEAK_API_HOST}/api/jobs?${query(offset)}`,
        async (url: string) => {
            return fetch(url).then((r) => r.json())
        },
        {
            revalidateOnFocus: false,
        }
    )
    const jobs = useMemo(() => {
        return data?.reduce((acc, cur) => [...acc, ...(cur.data || [])], []) ?? []
    }, [size, data])

    return {
        jobs,
        isLoading,
        error,
        fetchMore: () => setSize(size + 1),
    }
}

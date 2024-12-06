import { useMemo } from 'react'
import useSWRInfinite from 'swr/infinite'
import qs from 'qs'
import { Job } from './useJobs'

export type Filters = Array<
    | {
          icon: React.ReactNode
          label: string
          key: string
          type: 'toggle'
      }
    | {
          icon: React.ReactNode
          label: string
          key: string
          type: 'select'
          options: { label: string; value: any }[]
      }
>

const query = (offset: number, companyFilters: Filters, jobFilters: Filters) => {
    return qs.stringify(
        {
            pagination: {
                start: offset * 20,
                limit: 20,
            },
            sort: 'name:asc',
            populate: {
                jobs: {
                    sort: 'postedDate:desc',
                    ...(jobFilters.length > 0 && { filters: { $and: jobFilters } }),
                },
                logoLight: true,
                logoDark: true,
            },
            ...(companyFilters.length > 0 && { filters: { $and: companyFilters } }),
        },
        { encodeValuesOnly: true }
    )
}

export type Company = {
    id: number
    attributes: {
        slug: string
        name: string
        engineersDecideWhatToBuild: boolean
        remoteOnly: boolean
        exoticOffsites: boolean
        meetingFreeDays: boolean
        highEngineerRatio: boolean
        hasDeadlines: boolean
        description: string
        jobs: {
            data: Job[]
        }
        jobBoardType: 'ashby' | null
        logoLight: {
            data: {
                attributes: {
                    url: string
                }
            }
        }
        logoDark: {
            data: {
                attributes: {
                    url: string
                }
            }
        }
        publishedAt: string
        createdAt: string
        updatedAt: string
    }
}

export default function useCompanies({
    companyFilters,
    jobFilters,
}: {
    companyFilters: Filters
    jobFilters: Filters
}): {
    companies: Company[]
    isLoading: boolean
    error: Error | undefined
    fetchMore: () => void
} {
    const { data, size, setSize, isLoading, error } = useSWRInfinite(
        (offset) => `${process.env.GATSBY_SQUEAK_API_HOST}/api/companies?${query(offset, companyFilters, jobFilters)}`,
        async (url: string) => {
            return fetch(url).then((r) => r.json())
        },
        {
            revalidateOnFocus: false,
        }
    )
    const companies = useMemo(() => {
        return data?.reduce((acc, cur) => [...acc, ...(cur.data || [])], []) ?? []
    }, [size, data])

    return {
        companies,
        isLoading,
        error,
        fetchMore: () => setSize(size + 1),
    }
}

import { useMemo } from 'react'
import useSWRInfinite from 'swr/infinite'
import qs from 'qs'
import { Job } from './useJobs'
import Fuse from 'fuse.js'

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
                    populate: {
                        company: {
                            fields: ['name'],
                        },
                    },
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
        url: string
        engineersDecideWhatToBuild: boolean
        remoteOnly: boolean
        exoticOffsites: boolean
        meetingFreeDays: boolean
        highEngineerRatio: boolean
        noDeadlines: boolean
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
        logomark: {
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
    search,
    companyFilters,
    jobFilters,
}: {
    search: string
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
        if (!data) return []

        const allCompanies = data.reduce((acc, cur) => [...acc, ...(cur.data || [])], [])

        if (!search) return allCompanies

        return allCompanies.map((company: Company) => {
            const jobs = company.attributes.jobs.data
            if (!jobs.length) return company

            const jobsFuse = new Fuse(jobs, {
                keys: [
                    'attributes.title',
                    'attributes.description',
                    'attributes.department',
                    'attributes.company.data.attributes.name',
                ],
                threshold: 0.3,
            })

            const matchedJobs = search ? jobsFuse.search(search).map((result) => result.item) : jobs

            return {
                ...company,
                attributes: {
                    ...company.attributes,
                    jobs: {
                        data: matchedJobs,
                    },
                },
            }
        })
    }, [size, data, search])

    return {
        companies,
        isLoading,
        error,
        fetchMore: () => setSize(size + 1),
    }
}

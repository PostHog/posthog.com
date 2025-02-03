import { useCallback, useEffect, useMemo, useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import qs from 'qs'
import { Job } from './useJobs'
import Fuse from 'fuse.js'
import debounce from 'lodash.debounce'
import { useUser } from './useUser'

export type Filters = Array<
    | {
          icon: React.ReactNode
          label: string
          key: string
          type: 'toggle'
          appliesTo: 'company' | 'job'
      }
    | {
          icon: React.ReactNode
          label: string
          key: string
          type: 'select'
          options: { label: string; value: any }[]
          appliesTo: 'company' | 'job'
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
        jobBoardURL?: string
    }
}

export default function useCompanies({
    companyFilters,
    jobFilters,
    ...other
}: {
    search: string
    companyFilters: Filters
    jobFilters: Filters
}): {
    companies: Company[]
    isLoading: boolean
    error: Error | undefined
    fetchMore: () => void
    mutate: () => void
    deleteCompany: (companyId: number, companyName: string) => void
} {
    const { getJwt } = useUser()
    const [search, setSearch] = useState('')
    const { data, size, setSize, isLoading, error, mutate } = useSWRInfinite(
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

    const debouncedSearch = useCallback(
        debounce((search: string) => {
            setSearch(search)
        }, 500),
        []
    )

    const deleteCompany = async (companyId: number, companyName: string) => {
        if (confirm(`Are you sure you want to delete ${companyName}?`)) {
            const jwt = await getJwt()
            await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/companies/${companyId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            mutate()
        }
    }

    useEffect(() => {
        if (!other.search) return setSearch('')
        debouncedSearch(other.search)
    }, [other.search])

    return {
        companies,
        isLoading,
        error,
        fetchMore: () => setSize(size + 1),
        mutate,
        deleteCompany,
    }
}

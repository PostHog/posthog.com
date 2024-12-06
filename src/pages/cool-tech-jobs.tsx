import React, { useEffect, useState } from 'react'
import useJobs, { Job } from '../hooks/useJobs'
import groupBy from 'lodash.groupby'
import useCompanies, { Company, Filters as FiltersType } from 'hooks/useCompanies'
import Layout from 'components/Layout'
import { layoutLogic } from 'logic/layoutLogic'
import { useValues } from 'kea'
import { IconCheck } from '@posthog/icons'
import Link from 'components/Link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Toggle from 'components/Toggle'
import Select from 'components/Select'
import { StickerEngineerRatio, StickerHourglass } from 'components/Stickers/Index'
import { StickerDnd, StickerLaptop, StickerPalmTree, StickerPullRequest } from 'components/Stickers/Index'

dayjs.extend(relativeTime)

const toggleFilters = [
    {
        icon: <StickerPullRequest className="size-8" />,
        label: 'Engineers decide what to build',
        key: 'engineersDecideWhatToBuild',
    },
    {
        icon: <StickerLaptop className="size-8" />,
        label: 'Remote only',
        key: 'remoteOnly',
    },
    {
        icon: <StickerPalmTree className="size-8" />,
        label: 'Exotic offsites',
        key: 'exoticOffsites',
    },
    {
        icon: <StickerDnd className="size-8" />,
        label: 'Meeting-free days',
        key: 'meetingFreeDays',
    },
    {
        icon: <StickerEngineerRatio className="size-8" />,
        label: 'High engineer ratio',
        key: 'highEngineerRatio',
    },
    {
        icon: <StickerHourglass className="size-8" />,
        label: 'Has deadlines',
        key: 'hasDeadlines',
    },
]

const Perks = ({ company }: { company: Company }) => {
    const perks = toggleFilters.filter((toggle) => company.attributes[toggle.key])

    return (
        <ul className="list-none p-0 m-0 flex space-x-2">
            {perks.filter(Boolean).map((perk) => (
                <li key={`${company.id}-${perk}`} className="flex items-center space-x-1">
                    {perk.icon}
                    <span className="text-sm font-semibold">{perk.label}</span>
                </li>
            ))}
        </ul>
    )
}

const JobList = ({ jobs }: { jobs: Job[] }) => {
    const jobsGroupedByDepartment = groupBy(jobs, 'attributes.department')

    return (
        <ul className="list-none p-0 m-0 space-y-6 mt-2">
            {Object.entries(jobsGroupedByDepartment).map(([department, jobs]) => (
                <li key={department}>
                    <h3 className="m-0 opacity-60 text-base font-normal border-b border-light dark:border-dark pb-2 mb-2">
                        {department}
                    </h3>
                    <ul className="list-none p-0 m-0 space-y-2">
                        {jobs.map((job) => (
                            <li key={job.id} className="flex justify-between items-end">
                                <Link externalNoIcon className="!text-inherit underline" to={job.attributes.url}>
                                    {job.attributes.title}
                                </Link>
                                <p className="m-0 opacity-60 text-sm">{dayjs(job.attributes.postedDate).fromNow()}</p>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    )
}

const Companies = ({ companyFilters, jobFilters }: { companyFilters: FiltersType; jobFilters: FiltersType }) => {
    const { websiteTheme } = useValues(layoutLogic)
    const { companies, isLoading } = useCompanies({ companyFilters, jobFilters })

    return isLoading ? (
        <ul className="list-none p-0 m-0 space-y-4 py-8">
            {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="h-12 w-full bg-accent dark:bg-accent-dark rounded-md" />
            ))}
        </ul>
    ) : (
        <ul className="list-none p-0 m-0 space-y-8 pb-12">
            {companies.map((company) => {
                const { name } = company.attributes
                const logoLight = company.attributes.logoLight?.data?.attributes?.url
                const logoDark = company.attributes.logoDark?.data?.attributes?.url
                return company.attributes.jobs.data.length > 0 ? (
                    <li key={company.id}>
                        <div className="sticky top-[41px] pt-8 pb-4 z-10 bg-light dark:bg-dark">
                            {(logoLight || logoDark) && (
                                <img
                                    className="max-w-40 mb-3"
                                    src={logoDark && websiteTheme === 'dark' ? logoDark : logoLight}
                                    alt={name}
                                />
                            )}
                            <Perks company={company} />
                        </div>
                        <JobList jobs={company.attributes.jobs.data} />
                    </li>
                ) : null
            })}
        </ul>
    )
}

const Jobs = () => {
    const { jobs, isLoading, error } = useJobs()
    return <div>Jobs</div>
}

const FilterSelect = ({
    filter,
    jobFilters,
    setJobFilters,
}: {
    filter: FiltersType[number]
    jobFilters: FiltersType
    setJobFilters: (filters: FiltersType) => void
}) => {
    return (
        <Select
            className="!p-0"
            key={filter.key}
            placeholder={filter.label}
            options={filter.options}
            onChange={(value) => {
                setJobFilters((filters) => {
                    if (value) {
                        return [...filters.filter((f) => !(filter.key in f)), value]
                    }
                    return filters.filter((f) => !(filter.key in f))
                })
            }}
            value={jobFilters.find((f) => f[filter.key])}
        />
    )
}

const Filters = ({
    companyFilters,
    setCompanyFilters,
    jobFilters,
    setJobFilters,
}: {
    companyFilters: FiltersType
    setCompanyFilters: (filters: FiltersType) => void
    jobFilters: FiltersType
    setJobFilters: (filters: FiltersType) => void
}) => {
    const [displayedFilters, setDisplayedFilters] = useState<FiltersType>(
        toggleFilters.map((filter) => ({
            ...filter,
            type: 'toggle',
        }))
    )

    useEffect(() => {
        fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/jobs/filters`)
            .then((res) => res.json())
            .then((data) => {
                if (data.filters) {
                    setDisplayedFilters((prevFilters) => {
                        const localFilters = prevFilters.filter((filter) => filter.type === 'toggle')
                        return [...data.filters, ...localFilters]
                    })
                }
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])

    return (
        <div className="space-y-2">
            {displayedFilters.map((filter) => {
                switch (filter.type) {
                    case 'select':
                        return <FilterSelect filter={filter} jobFilters={jobFilters} setJobFilters={setJobFilters} />
                    case 'toggle':
                        return (
                            <Toggle
                                activeOpacity={false}
                                position="right"
                                iconLeft={filter.icon}
                                key={filter.key}
                                label={filter.label}
                                onChange={(checked) => {
                                    setCompanyFilters((filters) => {
                                        if (checked) {
                                            return [...filters, { [filter.key]: { $eq: true } }]
                                        }
                                        return filters.filter((f) => !(filter.key in f))
                                    })
                                }}
                                checked={companyFilters.some((f) => filter.key in f)}
                            />
                        )
                    default:
                        return null
                }
            })}
        </div>
    )
}

export default function JobsPage() {
    const [sortBy, setSortBy] = useState<'company' | 'job'>('company')
    const [companyFilters, setCompanyFilters] = useState<FiltersType>([])
    const [jobFilters, setJobFilters] = useState<FiltersType>([])

    return (
        <Layout>
            <section className="px-5">
                <div className="flex flex-col lg:flex-row items-start -mt-1">
                    <div className="min-w-[300px] lg:max-w-[300px] pr-6 sticky top-[57px] py-4">
                        <h1 className="text-2xl font-bold">Cool tech jobs</h1>
                        <p>
                            Open roles for product engineers and other jobs from companies with unique perks and great
                            culture
                        </p>

                        <p className="mt-4">
                            Looking to work at PostHog? <Link to="/jobs">Visit our careers page.</Link>
                        </p>
                    </div>
                    <div className="flex-grow mr-6 lg:pl-6 pr-6 border-r lg:border-l border-light dark:border-dark">
                        {sortBy === 'company' ? (
                            <Companies companyFilters={companyFilters} jobFilters={jobFilters} />
                        ) : (
                            <Jobs companyFilters={companyFilters} jobFilters={jobFilters} />
                        )}
                    </div>
                    <div className="flex-shrink-0 sticky top-[57px] py-4">
                        <Filters
                            companyFilters={companyFilters}
                            setCompanyFilters={setCompanyFilters}
                            jobFilters={jobFilters}
                            setJobFilters={setJobFilters}
                        />
                    </div>
                </div>
            </section>
        </Layout>
    )
}

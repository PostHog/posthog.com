import React, { useEffect, useState } from 'react'
import useJobs, { Job } from '../hooks/useJobs'
import groupBy from 'lodash.groupby'
import useCompanies, { Company, Filters as FiltersType } from 'hooks/useCompanies'
import Layout from 'components/Layout'
import { layoutLogic } from 'logic/layoutLogic'
import { useValues } from 'kea'
import { IconChevronDown, IconArrowUpRight } from '@posthog/icons'
import Link from 'components/Link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Toggle from 'components/Toggle'
import Select from 'components/Select'
import { StickerEngineerRatio, StickerHourglass } from 'components/Stickers/Index'
import { StickerDnd, StickerLaptop, StickerPalmTree, StickerPullRequest } from 'components/Stickers/Index'
import { motion } from 'framer-motion'
import { useLayoutData } from 'components/Layout/hooks'

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
        label: 'Exotic off-sites',
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
        label: 'No deadlines',
        key: 'noDeadlines',
    },
]

const Perks = ({ company, className }: { company: Company; className?: string }) => {
    const perks = toggleFilters.filter((toggle) => company.attributes[toggle.key])

    return (
        <ul className={`list-none p-0 m-0 ${className}`}>
            {perks.filter(Boolean).map((perk) => (
                <li key={`${company.id}-${perk}`} className="flex gap-1.5 items-start">
                    {perk.icon}
                    <span className="text-[15px] font-medium pt-1">{perk.label}</span>
                </li>
            ))}
        </ul>
    )
}

const JobsByDepartment = ({ jobs, department }: { jobs: Job[]; department: string }) => {
    const [open, setOpen] = useState(true)
    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className="w-full text-left flex items-center border-b border-light dark:border-dark pb-2 mb-2"
            >
                <IconChevronDown className={`size-7 transition-transform opacity-60 ${open ? 'rotate-180' : ''}`} />
                <span className="flex justify-between items-center flex-grow">
                    <h3 className="m-0 opacity-60 text-base font-semibold">{department}</h3>
                    <p className="m-0 opacity-60 text-sm font-normal">
                        <span className="font-bold">{jobs.length}</span> job{jobs.length === 1 ? '' : 's'}
                    </p>
                </span>
            </button>
            <motion.ul
                className="list-none p-0 m-0 overflow-hidden @2xl:ml-7"
                animate={open ? { height: 'auto' } : { height: 0 }}
            >
                {jobs.map((job) => (
                    <li key={job.id} className="flex justify-between gap-1 items-start last:mb-6 mt-2 first:mt-0">
                        <Link
                            externalNoIcon
                            className="group !text-inherit underline"
                            to={`${job.attributes.url}?utm_source=posthog`}
                        >
                            <span className="relative">
                                {job.attributes.title}
                                <IconArrowUpRight className="inline-block size-4 opacity-0 group-hover:opacity-50 text-primary dark:text-primary-dark absolute left-full top-0.5 ml-0.5" />
                            </span>
                        </Link>
                        <p className="m-0 pt-1 opacity-60 text-sm flex-[0_0_6rem] text-right">
                            {dayjs(job.attributes.postedDate).fromNow()}
                        </p>
                    </li>
                ))}
            </motion.ul>
        </div>
    )
}

const JobList = ({ jobs }: { jobs: Job[] }) => {
    const jobsGroupedByDepartment = groupBy(jobs, 'attributes.department')

    return (
        <ul className="list-none p-0 m-0 mt-2 flex-grow">
            {Object.entries(jobsGroupedByDepartment).map(([department, jobs]) => (
                <li key={department}>
                    <JobsByDepartment jobs={jobs} department={department} />
                </li>
            ))}
        </ul>
    )
}

const Companies = ({ companyFilters, jobFilters }: { companyFilters: FiltersType; jobFilters: FiltersType }) => {
    const { websiteTheme } = useValues(layoutLogic)
    const { companies, isLoading } = useCompanies({ companyFilters, jobFilters })
    const { fullWidthContent } = useLayoutData()

    return isLoading ? (
        <ul className="list-none p-0 m-0 space-y-4 py-8">
            {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="h-12 w-full bg-accent dark:bg-accent-dark rounded-md" />
            ))}
        </ul>
    ) : (
        <ul
            className={`@container list-none p-0 m-0 space-y-8 pb-12 mt-2 mx-auto transition-all ${
                fullWidthContent ? 'max-w-full' : ' max-w-4xl'
            }`}
        >
            {companies.map((company) => {
                const { name } = company.attributes
                const logoLight = company.attributes.logoLight?.data?.attributes?.url
                const logoDark = company.attributes.logoDark?.data?.attributes?.url
                return company.attributes.jobs.data.length > 0 ? (
                    <li className="@2xl:flex @2xl:space-x-8 items-start" key={company.id}>
                        <div className="@2xl:sticky top-0 reasonable:top-[107px] pt-4 pb-4 z-10 bg-light dark:bg-dark @2xl:flex-[0_0_230px]">
                            {(logoLight || logoDark) && (
                                <>
                                    {company.attributes.url ? (
                                        <Link to={`${company.attributes.url}?utm_source=posthog`} externalNoIcon>
                                            <img
                                                className="max-w-40 mb-3"
                                                src={logoDark && websiteTheme === 'dark' ? logoDark : logoLight}
                                                alt={name}
                                            />
                                        </Link>
                                    ) : (
                                        <img
                                            className="max-w-40 mb-3"
                                            src={logoDark && websiteTheme === 'dark' ? logoDark : logoLight}
                                            alt={name}
                                        />
                                    )}
                                </>
                            )}
                            {company.attributes.description && (
                                <p className="m-0 text-sm font-medium text-primary/75 dark:text-primary-dark/75">
                                    {company.attributes.description}
                                </p>
                            )}

                            {company.attributes.url && (
                                <Link
                                    href={`${company.attributes.url}?utm_source=posthog`}
                                    className="group flex items-center gap-0.5 text-sm text-red dark:text-yellow font-semibold mb-2"
                                    externalNoIcon
                                >
                                    Learn more
                                    <IconArrowUpRight className="size-4 opacity-0 group-hover:opacity-50 text-primary dark:text-primary-dark" />
                                </Link>
                            )}

                            <h4 className="text-sm font-medium text-primary/50 dark:text-primary-dark/50 border-b border-light dark:border-dark pb-2 mt-4 mb-2">
                                Unique perks
                            </h4>
                            <Perks
                                className="grid @sm:grid-cols-2 @2xl:grid-cols-1 xl:[&>li]:ml-0 gap-1 [&>li]:ml-2 xl:ml-0 -ml-2"
                                company={company}
                            />
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
                window.scrollTo({ top: 0, behavior: 'smooth' })
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
        <div className="space-y-4 pt-4 pb-8 lg:py-0">
            <h4 className="text-[15px] font-medium text-primary/75 dark:text-primary/75 border-b border-light dark:border-dark pb-2 mb-2">
                Typical filters
            </h4>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-12 lg:gap-x-0 gap-y-4">
                {displayedFilters.map((filter) => {
                    switch (filter.type) {
                        case 'select':
                            return (
                                <FilterSelect filter={filter} jobFilters={jobFilters} setJobFilters={setJobFilters} />
                            )
                        case 'toggle':
                            return (
                                <Toggle
                                    activeOpacity={false}
                                    position="right"
                                    iconLeft={filter.icon}
                                    key={filter.key}
                                    label={filter.label}
                                    onChange={(checked) => {
                                        window.scrollTo({ top: 0, behavior: 'smooth' })
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
        </div>
    )
}

export default function JobsPage() {
    const [sortBy, setSortBy] = useState<'company' | 'job'>('company')
    const [companyFilters, setCompanyFilters] = useState<FiltersType>([])
    const [jobFilters, setJobFilters] = useState<FiltersType>([])
    const [filtersOpen, setFiltersOpen] = useState(false)

    return (
        <Layout>
            <section className="px-5">
                <div className="flex flex-col lg:flex-row items-start -mt-1 order-1">
                    <div className="min-w-[300px] lg:max-w-[300px] pr-6 xl:sticky top-0 reasonable:top-[107px] py-4">
                        <h1 className="text-2xl mb-2 font-bold">Cool tech jobs</h1>
                        <p className="mb-2 text-[15px]">
                            Find open roles for product engineers and other jobs from companies with unique perks and
                            great culture.
                        </p>

                        <p className="mt-2 mb-0 text-[15px]">
                            Looking to work at PostHog? <Link to="/careers">Visit our careers page.</Link>
                        </p>

                        <p className="mt-4 mb-0 border-t border-light dark:border-dark pt-4 text-sm">
                            Work at a company with great perks?{' '}
                            <Link to="/jobs">Apply to get your jobs listed here.</Link>
                        </p>
                    </div>
                    <div className="w-full flex-grow lg:mr-6 lg:pl-6 lg:pr-6 lg:border-x border-light dark:border-dark order-3 lg:order-2">
                        {sortBy === 'company' ? (
                            <Companies companyFilters={companyFilters} jobFilters={jobFilters} />
                        ) : (
                            <Jobs companyFilters={companyFilters} jobFilters={jobFilters} />
                        )}
                    </div>
                    <div className="flex-shrink-0 xl:sticky top-0 reasonable:top-[107px] lg:py-4 order-2 pb-4 lg:pb-0 lg:order-3 w-full lg:w-auto">
                        <button
                            onClick={() => setFiltersOpen(!filtersOpen)}
                            className="text-left inline-flex items-center border border-light dark:border-dark rounded p-1 pr-3 bg-accent dark:bg-accent-dark lg:hidden"
                        >
                            <IconChevronDown
                                className={`size-7 transition-transform opacity-60 ${filtersOpen ? 'rotate-180' : ''}`}
                            />
                            <span className="flex-grow font-semibold">
                                {filtersOpen ? 'Hide filters' : 'Show filters'}
                            </span>
                        </button>
                        <motion.div
                            className="overflow-hidden lg:!h-auto"
                            animate={filtersOpen ? { height: 'auto' } : { height: 0 }}
                        >
                            <Filters
                                companyFilters={companyFilters}
                                setCompanyFilters={setCompanyFilters}
                                jobFilters={jobFilters}
                                setJobFilters={setJobFilters}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

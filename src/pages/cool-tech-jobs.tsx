import React, { useCallback, useEffect, useState } from 'react'
import useJobs, { Job } from '../hooks/useJobs'
import groupBy from 'lodash.groupby'
import useCompanies, { Company, Filters as FiltersType } from 'hooks/useCompanies'
import Layout from 'components/Layout'
import { layoutLogic } from 'logic/layoutLogic'
import { useValues } from 'kea'
import {
    IconChevronDown,
    IconArrowUpRight,
    IconX,
    IconPencil,
    IconTrash,
    IconShield,
    IconArrowLeft,
    IconArrowRight,
} from '@posthog/icons'
import Link from 'components/Link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Toggle from 'components/Toggle'
import Select from 'components/Select'
import { StickerEngineerRatio, StickerHourglass } from 'components/Stickers/Index'
import { StickerDnd, StickerLaptop, StickerPalmTree, StickerPullRequest } from 'components/Stickers/Index'
import { motion } from 'framer-motion'
import { useLayoutData } from 'components/Layout/hooks'
import SEO from 'components/seo'
import SideModal from 'components/Modal/SideModal'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CallToAction } from 'components/CallToAction'
import usePostHog from 'hooks/usePostHog'
import ImageDrop from 'components/ImageDrop'
import slugify from 'slugify'
import Spinner from 'components/Spinner'
import { useUser } from 'hooks/useUser'
import uploadImage from 'components/Squeak/util/uploadImage'
import { debounce } from 'lodash'
import { Authentication } from 'components/Squeak'
dayjs.extend(relativeTime)

const toggleFilters = [
    {
        icon: <StickerLaptop className="size-8" />,
        label: 'Remote',
        key: 'isRemote',
        appliesTo: 'job',
    },
    {
        icon: <StickerPullRequest className="size-8" />,
        label: 'Engineers decide what to build',
        key: 'engineersDecideWhatToBuild',
        appliesTo: 'company',
    },
    {
        icon: <StickerLaptop className="size-8" />,
        label: 'Remote only company',
        key: 'remoteOnly',
        appliesTo: 'company',
    },
    {
        icon: <StickerPalmTree className="size-8" />,
        label: 'Exotic off-sites',
        key: 'exoticOffsites',
        appliesTo: 'company',
    },
    {
        icon: <StickerDnd className="size-8" />,
        label: 'Meeting-free days',
        key: 'meetingFreeDays',
        appliesTo: 'company',
    },
    {
        icon: <StickerEngineerRatio className="size-8" />,
        label: 'High engineer ratio',
        key: 'highEngineerRatio',
        appliesTo: 'company',
    },
    {
        icon: <StickerHourglass className="size-8" />,
        label: 'No deadlines',
        key: 'noDeadlines',
        appliesTo: 'company',
    },
]

const Perks = ({ company, className }: { company: Company; className?: string }) => {
    const perks = toggleFilters.filter((toggle) => company.attributes[toggle.key])

    return (
        <ul className={`list-none p-0 m-0 ${className}`}>
            {perks.filter(Boolean).map((perk) => (
                <li key={`${company.id}-${perk.key}`} className="flex gap-1.5 items-start">
                    {perk.icon}
                    <span className="text-[15px] font-medium pt-1">{perk.label}</span>
                </li>
            ))}
        </ul>
    )
}

const JobsByDepartment = ({
    jobs,
    department,
    initialOpen = false,
}: {
    jobs: Job[]
    department: string
    initialOpen?: boolean
}) => {
    const [open, setOpen] = useState(initialOpen)
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
                initial={{ height: 0 }}
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
            {Object.entries(jobsGroupedByDepartment).map(([department, jobs], index) => (
                <li key={department}>
                    <JobsByDepartment jobs={jobs} department={department} initialOpen={index === 0} />
                </li>
            ))}
        </ul>
    )
}

const Companies = ({
    companiesLoading,
    companies,
    search,
    onSearch,
    onEdit,
    onDelete,
    hasFilters,
}: {
    companiesLoading: boolean
    companies: Company[]
    search: string
    onSearch: (search: string) => void
    onEdit: (companyId: number) => void
    onDelete: (companyId: number, companyName: string) => void
    hasFilters: boolean
}) => {
    const { isModerator } = useUser()
    const { websiteTheme } = useValues(layoutLogic)
    const { fullWidthContent } = useLayoutData()

    return companiesLoading ? (
        <ul className="list-none p-0 m-0 space-y-4 py-8">
            {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="h-12 w-full bg-accent dark:bg-accent-dark rounded-md" />
            ))}
        </ul>
    ) : (
        <div>
            <div
                className={`flex items-center justify-between lg:mt-5 border bg-white dark:bg-accent-dark border-border dark:border-dark rounded mx-auto transition-all ${
                    fullWidthContent ? 'max-w-full' : ' max-w-4xl'
                }`}
            >
                <input
                    type="search"
                    placeholder="Search..."
                    className="w-full !outline-none !ring-0 p-2 bg-transparent border-none"
                    onChange={(e) => onSearch(e.target.value)}
                    value={search}
                    autoComplete="off"
                />
                {search && (
                    <button
                        onClick={() => onSearch('')}
                        className="text-sm opacity-50 hover:opacity-80 transition-opacity p-2"
                    >
                        <IconX className="size-4" />
                    </button>
                )}
            </div>
            <ul
                className={`@container list-none p-0 m-0 space-y-8 pt-4 pb-12 mt-2 mx-auto transition-all ${
                    fullWidthContent ? 'max-w-full' : ' max-w-4xl'
                }`}
            >
                {companies.map((company) => {
                    const { name } = company.attributes
                    const logoLight = company.attributes.logoLight?.data?.attributes?.url
                    const logoDark = company.attributes.logoDark?.data?.attributes?.url
                    const hasJobs = company.attributes.jobs.data.length > 0
                    return (isModerator && !search && !hasFilters) || hasJobs ? (
                        <li
                            className={`@2xl:flex @2xl:space-x-8 items-start ${!hasJobs ? 'opacity-60' : ''}`}
                            key={company.id}
                        >
                            <div className="@2xl:sticky top-0 reasonable:top-[142px] pb-4 z-10 bg-light dark:bg-dark @2xl:flex-[0_0_230px]">
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
                                {isModerator && (
                                    <div className="border-t border-border dark:border-dark pt-2 mt-3 flex justify-end items-center">
                                        <button
                                            className="font-bold text-red dark:text-yellow text-sm flex items-center space-x-1 bg-transparent hover:bg-accent dark:hover:bg-accent-dark rounded-md px-1.5 py-1 click"
                                            onClick={() => onEdit(company.id)}
                                        >
                                            <IconPencil className="size-3" />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            className="font-bold text-red dark:text-yellow text-sm flex items-center space-x-1 bg-transparent hover:bg-accent dark:hover:bg-accent-dark rounded-md px-1.5 py-1 click"
                                            onClick={() => onDelete(company.id, name)}
                                        >
                                            <IconTrash className="size-3" />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                            {hasJobs && <JobList jobs={company.attributes.jobs.data} />}
                        </li>
                    ) : null
                })}
            </ul>
        </div>
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
    filter: FiltersType[number] & { type: 'select' }
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
        <div className="space-y-4 pt-4 !pb-8 lg:py-0">
            <h4 className="text-[15px] font-medium text-primary/60 dark:text-primary-dark/60 border-b border-light dark:border-dark pb-2 mb-2">
                Typical filters
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-12 lg:gap-x-0 gap-y-4 pr-1">
                {displayedFilters.map((filter, index) => {
                    const content = (
                        <>
                            {index === 3 && (
                                <h4 className="text-[15px] font-medium text-primary/60 dark:text-primary-dark/60 border-b border-light dark:border-dark py-2 mb-0 sm:col-span-2 lg:col-span-1">
                                    Unique perks
                                </h4>
                            )}
                            {(() => {
                                switch (filter.type) {
                                    case 'select':
                                        return (
                                            <FilterSelect
                                                filter={filter}
                                                jobFilters={jobFilters}
                                                setJobFilters={setJobFilters}
                                            />
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
                                                    const setFilter =
                                                        filter.appliesTo === 'company'
                                                            ? setCompanyFilters
                                                            : setJobFilters
                                                    setFilter((filters) => {
                                                        if (checked) {
                                                            return [...filters, { [filter.key]: { $eq: true } }]
                                                        }
                                                        return filters.filter((f) => !(filter.key in f))
                                                    })
                                                }}
                                                checked={(filter.appliesTo === 'company'
                                                    ? companyFilters
                                                    : jobFilters
                                                ).some((f) => filter.key in f)}
                                            />
                                        )
                                    default:
                                        return null
                                }
                            })()}
                        </>
                    )
                    return content
                })}
            </div>
        </div>
    )
}

const IssueForm = () => {
    const [submitted, setSubmitted] = useState(false)
    const { companies } = useCompanies({ companyFilters: [], jobFilters: [], search: '' })
    const posthog = usePostHog()

    const { handleSubmit, values, touched, setFieldValue, errors, setFieldTouched, getFieldProps, isSubmitting } =
        useFormik({
            initialValues: {
                company: '',
                issueType: '',
                description: '',
            },
            validationSchema: Yup.object({
                company: Yup.string().required('Please select a company'),
                issueType: Yup.string().required('Please select an issue type'),
                description: Yup.string().required('Please provide details about the issue'),
            }),
            onSubmit: async (values, { setSubmitting }) => {
                try {
                    posthog?.capture('job_board_issue_reported', values)
                    setSubmitted(true)
                } catch (error) {
                    console.error('Error submitting issue:', error)
                } finally {
                    setSubmitting(false)
                }
            },
        })

    const issueTypeOptions = [
        { label: 'Incorrect perk information' },
        { label: 'Broken link' },
        { label: 'Outdated job posting' },
        { label: 'Other' },
    ]

    if (submitted) {
        return (
            <div className="border border-border dark:border-dark rounded-md p-2 bg-accent dark:bg-accent-dark">
                <h4 className="text-base m-0">Thanks for your report!</h4>
                <p className="text-sm opacity-70 m-0">We'll look into this issue as soon as possible.</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 m-0">
            <div>
                <Select
                    className={`!p-0`}
                    options={companies.map((company) => {
                        const { name } = company.attributes
                        return { label: name, value: name }
                    })}
                    value={values.company}
                    onChange={(value) => setFieldValue('company', value)}
                    placeholder="Select a company"
                    onBlur={() => setFieldTouched('company')}
                />
                {touched.company && errors.company && <p className="text-red text-sm m-0 mt-1">{errors.company}</p>}
            </div>

            <div>
                <Select
                    className={`!p-0 !rounded-md`}
                    options={issueTypeOptions.map((option) => ({ label: option.label, value: option.label }))}
                    value={values.issueType}
                    onChange={(value) => setFieldValue('issueType', value)}
                    placeholder="Select an issue type"
                    onBlur={() => setFieldTouched('issueType')}
                />
                {touched.issueType && errors.issueType && (
                    <p className="text-red text-sm m-0 mt-1">{errors.issueType}</p>
                )}
            </div>

            <div>
                <label className="block text-base font-semibold mb-1">Description</label>
                <textarea
                    id="description"
                    rows={4}
                    className={`w-full p-2 border rounded-md bg-transparent ${
                        touched.description && errors.description ? 'border-red' : 'border-border dark:border-dark'
                    }`}
                    placeholder="Please provide details about the issue"
                    {...getFieldProps('description')}
                />
                {touched.description && errors.description && (
                    <p className="text-red text-sm m-0 mt-1">{errors.description}</p>
                )}
            </div>

            <CallToAction disabled={isSubmitting} width="full">
                {isSubmitting ? 'Submitting...' : 'Submit report'}
            </CallToAction>
        </form>
    )
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label: string
    error?: string
    touched?: boolean
    multiline?: boolean
    rows?: number
}

const Input = ({ label, error, touched, multiline, className = '', rows = 4, ...props }: InputProps) => {
    const Component = multiline ? 'textarea' : 'input'
    return (
        <div className={className}>
            <label className="block text-base font-semibold mb-1">{label}</label>
            <Component
                {...props}
                rows={multiline ? rows : undefined}
                className={`w-full p-2 border rounded-md bg-white dark:bg-accent-dark ${
                    touched && error ? 'border-red' : 'border-border dark:border-dark'
                }`}
            />
            {touched && error && <p className="text-red text-sm m-0 mt-1">{error}</p>}
        </div>
    )
}

const jobBoardBaseURLs = {
    ashby: 'https://jobs.ashbyhq.com/',
    greenhouse: 'https://boards.greenhouse.io/',
    gem: 'https://jobs.gem.com/',
}

const supportedJobBoardTypes = [
    { value: 'ashby', label: 'Ashby' },
    { value: 'greenhouse', label: 'Greenhouse' },
    { value: 'gem', label: 'Gem' },
]

const CompanyFormSkeleton = () => {
    return (
        <ul className="list-none p-0 m-0 space-y-3">
            <div className="h-10 w-full bg-accent dark:bg-accent-dark rounded-md animate-pulse" />
            <div className="h-10 w-full bg-accent dark:bg-accent-dark rounded-md animate-pulse" />
            <div className="h-10 w-full bg-accent dark:bg-accent-dark rounded-md animate-pulse" />
            <div className="flex items-center space-x-2">
                <div className="h-10 w-1/2 bg-accent dark:bg-accent-dark rounded-md animate-pulse" />
                <div className="h-10 w-1/2 bg-accent dark:bg-accent-dark rounded-md animate-pulse" />
            </div>
            <div className="h-40 w-full bg-accent dark:bg-accent-dark rounded-md animate-pulse" />
            <div className="h-10 w-full bg-accent dark:bg-accent-dark rounded-md animate-pulse" />
            <div className="h-10 w-full bg-accent dark:bg-accent-dark rounded-md animate-pulse" />
            <div className="h-10 w-full bg-accent dark:bg-accent-dark rounded-md animate-pulse" />
            <div className="h-10 w-full bg-accent dark:bg-accent-dark rounded-md animate-pulse" />
            <div className="h-10 w-full bg-accent dark:bg-accent-dark rounded-md animate-pulse" />
            <div className="h-10 w-full bg-accent dark:bg-accent-dark rounded-md animate-pulse" />
            <div className="h-10 w-full bg-accent dark:bg-accent-dark rounded-md animate-pulse" />
            <div className="grid grid-cols-3 gap-2">
                <div className="aspect-square bg-accent dark:bg-accent-dark rounded-md animate-pulse" />
                <div className="aspect-square bg-accent dark:bg-accent-dark rounded-md animate-pulse" />
                <div className="aspect-square bg-accent dark:bg-accent-dark rounded-md animate-pulse" />
            </div>
        </ul>
    )
}

const ModeratorInitialView = ({
    onStartFromPendingCompany,
    onAddNewCompany,
}: {
    onStartFromPendingCompany: (company: Company) => void
    onAddNewCompany: () => void
}) => {
    const { getJwt } = useUser()
    const [pendingCompanies, setPendingCompanies] = useState<Company[]>([])
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

    const getPendingCompanies = async () => {
        const jwt = await getJwt()
        const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/pending-companies?populate=*`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })
        const data = await response.json()
        if (data.data?.length > 0) {
            setPendingCompanies(data.data)
            setSelectedCompany(data.data[0])
        } else {
            onAddNewCompany()
        }
    }

    useEffect(() => {
        getPendingCompanies()
    }, [])

    return pendingCompanies.length > 0 ? (
        <div>
            <Select
                className="!p-0"
                options={pendingCompanies.map((company) => ({ label: company.attributes.name, value: company.id }))}
                value={selectedCompany?.id}
                onChange={(value) => {
                    setSelectedCompany(pendingCompanies.find((company) => company.id === value) || null)
                }}
                placeholder="Continue with a pending company"
            />
            {selectedCompany && (
                <div className="mt-4">
                    <CallToAction onClick={() => onStartFromPendingCompany(selectedCompany)} size="md" width="full">
                        Continue with {selectedCompany?.attributes.name}
                    </CallToAction>
                </div>
            )}
            <h4 className="opacity-70 py-3 my-3 relative before:w-full before:h-[1px] before:bg-border dark:before:bg-dark before:absolute flex items-center justify-center text-base">
                <span className="bg-white dark:bg-accent-dark px-2 relative">or</span>
            </h4>
            <CallToAction size="md" width="full" type="secondary" onClick={onAddNewCompany}>
                Add a new company
            </CallToAction>
        </div>
    ) : null
}

const JobBoardIntro = ({ onConfirm }: { onConfirm: () => void }) => {
    return (
        <div className="prose dark:prose-dark">
            <p className="mb-2">
                Our job board is designed to help product engineers (and other tech-adjacent candidates) find companies
                that have a similar vibe to PostHog – where employees are empowered to do their best work.
            </p>
            <p className="mb-2">
                To qualify to have your open roles listed, you'll need to meet the following criteria:
            </p>
            <ul className="mb-4">
                <li>
                    At least one unique perk listed in our filters
                    <br />{' '}
                    <span className="text-[15px] opacity-80">(Have a great perk we don't list? Let us know!)</span>
                </li>
                <li>
                    A public job board (like Ashby or Greenhouse) so we can automatically keep our job board up to date
                </li>
                <li>
                    <em>Actually be</em> a cool tech company where product engineers enjoy working!
                </li>
            </ul>
            <CallToAction
                onClick={onConfirm}
                size="md"
                width="full"
                childClassName="flex items-center justify-center gap-1"
            >
                Next
                <IconArrowRight className="size-5" />
            </CallToAction>
        </div>
    )
}

const Auth = () => {
    return (
        <>
            <div className="bg-border dark:bg-border-dark p-4 mt-0 mb-2">
                <p className="text-sm mb-2">
                    <strong>Note: PostHog.com authentication is separate from your PostHog app.</strong>
                </p>

                <p className="text-sm mb-0">
                    We suggest signing up with your personal email. Soon you'll be able to link your PostHog app
                    account.
                </p>
            </div>
            <Authentication initialView="sign-in" showBanner={false} showProfile={false} />
        </>
    )
}

const CompanyForm = ({ onSuccess, companyId }: { onSuccess?: () => void; companyId?: number }) => {
    const { user, getJwt, isModerator } = useUser()
    const [slugExists, setSlugExists] = useState<boolean | undefined>(undefined)
    const [nameExists, setNameExists] = useState<boolean | undefined>(undefined)
    const [company, setCompany] = useState<Company | null>(null)
    const [usingPending, setUsingPending] = useState<boolean | null>(null)
    const [disclaimerConfirmed, setDisclaimerConfirmed] = useState<boolean>(false)
    const [confirmationMessage, setConfirmationMessage] = useState<{
        type: 'success' | 'error' | 'warning'
        title: string
        description: string
    } | null>(null)
    const canUpdate = isModerator && companyId

    const debouncedCheckSlugExists = useCallback(
        debounce(async (slug: string) => {
            try {
                if (!slug) return
                const response = await fetch(
                    `${process.env.GATSBY_SQUEAK_API_HOST}/api/companies?filters[slug][$eq]=${slug}`
                )
                const data = await response.json()
                const exists = data?.data?.length > 0
                setSlugExists(exists)
                validateField('slug')
            } catch (error) {
                console.error('Error checking slug:', error)
            }
        }, 1000),
        []
    )

    const debouncedCheckNameExists = useCallback(
        debounce(async (name: string) => {
            try {
                if (!name) return
                const response = await fetch(
                    `${process.env.GATSBY_SQUEAK_API_HOST}/api/companies?filters[name][$eq]=${name}`
                )
                const data = await response.json()
                const exists = data?.data?.length > 0
                setNameExists(exists)
                validateField('name')
            } catch (error) {
                console.error('Error checking name:', error)
            }
        }, 1000),
        []
    )

    const {
        handleSubmit,
        values,
        touched,
        setFieldValue,
        errors,
        getFieldProps,
        isSubmitting,
        setTouched,
        validateField,
    } = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: company?.attributes?.name || '',
            url: company?.attributes?.url || '',
            slug: company?.attributes?.slug || '',
            engineersDecideWhatToBuild: company?.attributes?.engineersDecideWhatToBuild || false,
            remoteOnly: company?.attributes?.remoteOnly || false,
            exoticOffsites: company?.attributes?.exoticOffsites || false,
            meetingFreeDays: company?.attributes?.meetingFreeDays || false,
            highEngineerRatio: company?.attributes?.highEngineerRatio || false,
            noDeadlines: company?.attributes?.noDeadlines || false,
            description: company?.attributes?.description || '',
            jobBoardType: company?.attributes?.jobBoardType || 'ashby',
            logoLight: company?.attributes?.logoLight?.data
                ? { file: null, objectURL: company?.attributes?.logoLight?.data?.attributes?.url }
                : undefined,
            logoDark: company?.attributes?.logoDark?.data
                ? { file: null, objectURL: company?.attributes?.logoDark?.data?.attributes?.url }
                : undefined,
            logomark: company?.attributes?.logomark?.data
                ? { file: null, objectURL: company?.attributes?.logomark?.data?.attributes?.url }
                : undefined,
            jobBoardURL: company?.attributes?.jobBoardURL || '',
            why: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Company name is required')
                .test('unique-name', 'Company already exists', () => {
                    return !!companyId || nameExists === undefined || nameExists === false
                }),
            url: Yup.string().url('Must be a valid URL').required('Company website URL is required'),
            slug: Yup.string().when('jobBoardType', {
                is: (value: string) => value !== 'other',
                then: Yup.string()
                    .required('Job board slug is required')
                    .test('unique-slug', 'Slug already exists', () => {
                        return !!companyId || slugExists === undefined || slugExists === false
                    }),
                otherwise: Yup.string(),
            }),
            jobBoardURL: Yup.string().when('jobBoardType', {
                is: (value: string) => value === 'other',
                then: Yup.string().url('Must be a valid URL').required('Job board URL is required'),
                otherwise: Yup.string(),
            }),
            description: Yup.string().required('Company description is required'),
            jobBoardType: Yup.string().required('Job board type is required'),
            logoLight: Yup.mixed().required('Logo is required'),
            logoDark: Yup.mixed(),
            logomark: Yup.mixed(),
            why: Yup.string().test('why', "C'mon, gas yourself up", (value) => !!value || isModerator),
        }),
        validateOnChange: true,
        validateOnBlur: false,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const { logoLight, logoDark, logomark, ...rest } = values
                const jwt = await getJwt()
                const profileID = user?.profile?.id
                if (!profileID || !jwt) return
                const endpoint = isModerator ? 'companies' : 'pending-companies'
                const jobBoardChanged =
                    values.jobBoardType !== company?.attributes?.jobBoardType ||
                    values.jobBoardURL !== company?.attributes?.jobBoardURL ||
                    values.slug !== company?.attributes?.slug
                // Create initial company without images in case of failure
                const companyResponse = await fetch(
                    `${process.env.GATSBY_SQUEAK_API_HOST}/api/${endpoint}${
                        canUpdate ? `/${companyId}` : ''
                    }?populate=*`,
                    {
                        method: canUpdate ? 'PUT' : 'POST',
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify({
                            data: { ...rest, profile: profileID },
                        }),
                    }
                )
                if (!companyResponse.ok) {
                    throw new Error('Failed to create company')
                }
                const createdCompany = await companyResponse.json()
                if (!createdCompany?.data?.id) {
                    throw new Error('Failed to create company')
                }
                // Upload images and update the company
                const uploadedLogoLight =
                    values.logoLight?.file &&
                    (await uploadImage(logoLight.file, jwt, {
                        field: 'images',
                        id: profileID,
                        type: 'api::profile.profile',
                    }))
                const uploadedLogoDark =
                    values.logoDark?.file &&
                    (await uploadImage(logoDark.file, jwt, {
                        field: 'images',
                        id: profileID,
                        type: 'api::profile.profile',
                    }))
                const uploadedLogomark =
                    values.logomark?.file &&
                    (await uploadImage(logomark.file, jwt, {
                        field: 'images',
                        id: profileID,
                        type: 'api::profile.profile',
                    }))
                const updateResponse = await fetch(
                    `${process.env.GATSBY_SQUEAK_API_HOST}/api/${endpoint}/${createdCompany.data.id}`,
                    {
                        method: 'PUT',
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify({
                            data: {
                                ...(uploadedLogoLight
                                    ? { logoLight: uploadedLogoLight.id }
                                    : usingPending && logoLight
                                    ? { logoLight: company?.attributes.logoLight.data?.id }
                                    : {}),
                                ...(uploadedLogoDark
                                    ? { logoDark: uploadedLogoDark.id }
                                    : usingPending && logoDark
                                    ? { logoDark: company?.attributes.logoDark.data?.id }
                                    : {}),
                                ...(uploadedLogomark
                                    ? { logomark: uploadedLogomark.id }
                                    : usingPending && logomark
                                    ? { logomark: company?.attributes.logomark.data?.id }
                                    : {}),
                            },
                        }),
                    }
                )
                if (!updateResponse.ok) {
                    throw new Error('Failed to update company')
                }
                if (isModerator) {
                    const { jobsCreated } = await fetch(
                        `${process.env.GATSBY_SQUEAK_API_HOST}/api/scrape-jobs/${createdCompany.data.id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${jwt}`,
                                'content-type': 'application/json',
                            },
                        }
                    ).then((response) => response.json())
                    if ((jobBoardChanged && !jobsCreated) || !canUpdate) {
                        setConfirmationMessage({
                            type: canUpdate ? 'warning' : 'error',
                            title: canUpdate ? 'No new jobs found' : 'Failed to create jobs',
                            description: canUpdate
                                ? "The company was updated, but we couldn't find any new jobs. If you're expecting new jobs, double check the job board URL and try again."
                                : "The company was created, but we couldn't find any jobs. Double check the job board URL and try again.",
                        })
                    } else {
                        setConfirmationMessage({
                            type: 'success',
                            title: canUpdate ? 'Company updated' : 'Company added',
                            description: canUpdate
                                ? `Updated <strong>${createdCompany.data.attributes.name}</strong> and added <strong>${jobsCreated}</strong> jobs.`
                                : `Added <strong>${createdCompany.data.attributes.name}</strong> with <strong>${jobsCreated}</strong> jobs.`,
                        })
                    }
                } else {
                    setConfirmationMessage({
                        type: 'success',
                        title: 'Application submitted',
                        description:
                            "Thanks for applying to be a part of Cool tech jobs! We'll review your application and get back to you as soon as possible.",
                    })
                }
                onSuccess?.()
            } catch (error) {
                setConfirmationMessage({
                    type: 'error',
                    title: 'Failed to submit application',
                    description: 'Something went wrong. Please try again later.',
                })
            } finally {
                setSubmitting(false)
            }
        },
    })

    useEffect(() => {
        if (values.name) {
            setTouched({ name: true })
            setNameExists(undefined)
            debouncedCheckNameExists(values.name)
        }
    }, [values.name])

    useEffect(() => {
        if (values.slug) {
            setTouched({ slug: true })
            setSlugExists(undefined)
            debouncedCheckSlugExists(values.slug)
        }
    }, [values.slug])

    const getCompany = useCallback(async () => {
        if (!companyId) return
        const jwt = await getJwt()
        const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/companies/${companyId}?populate=*`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })
        const data = await response.json()
        setCompany(data.data)
    }, [companyId, user])

    const handleStartFromPendingCompany = (company: Company) => {
        setCompany(company)
        setUsingPending(true)
    }

    const handleAddNewCompany = () => {
        setUsingPending(false)
    }

    useEffect(() => {
        if (companyId) {
            getCompany()
        }
    }, [companyId])

    return !user ? (
        <Auth />
    ) : !isModerator && !disclaimerConfirmed ? (
        <JobBoardIntro onConfirm={() => setDisclaimerConfirmed(true)} />
    ) : confirmationMessage ? (
        <div
            className={`p-4 rounded-md border ${
                confirmationMessage.type === 'success'
                    ? 'border-green bg-green/20'
                    : confirmationMessage.type === 'warning'
                    ? 'border-yellow bg-yellow/20'
                    : 'border-red bg-red/20'
            }`}
        >
            <h4 className="text-base m-0">{confirmationMessage.title}</h4>
            <p
                className="text-sm opacity-70 m-0"
                dangerouslySetInnerHTML={{ __html: confirmationMessage.description }}
            />
            {(confirmationMessage.type === 'error' || confirmationMessage.type === 'warning') &&
                (canUpdate || !isModerator) && (
                    <CallToAction
                        size="sm"
                        type="secondary"
                        className="mt-2"
                        onClick={() => setConfirmationMessage(null)}
                    >
                        <span className="flex items-center gap-1">
                            <IconArrowLeft className="size-4" />
                            Go back
                        </span>
                    </CallToAction>
                )}
        </div>
    ) : companyId && !company ? (
        <CompanyFormSkeleton />
    ) : isModerator && !companyId && usingPending === null ? (
        <ModeratorInitialView
            onStartFromPendingCompany={handleStartFromPendingCompany}
            onAddNewCompany={handleAddNewCompany}
        />
    ) : (
        <form onSubmit={handleSubmit} className="space-y-4 m-0">
            <Input
                label="Company name"
                placeholder="Bluth Company"
                {...getFieldProps('name')}
                error={errors.name}
                touched={touched.name}
            />

            <Input
                label="Company website URL"
                placeholder="https://bobloblawlawblog.com"
                type="url"
                {...getFieldProps('url')}
                error={errors.url}
                touched={touched.url}
            />

            <div>
                <Select
                    className="!p-0"
                    options={[
                        ...supportedJobBoardTypes,
                        ...(isModerator ? [{ value: 'kadoa', label: 'Kadoa' }] : []),
                        { value: 'other', label: 'Other' },
                    ]}
                    value={values.jobBoardType}
                    onChange={(value) => setFieldValue('jobBoardType', value)}
                    placeholder="Job board type"
                />
                {touched.jobBoardType && errors.jobBoardType && (
                    <p className="text-red text-sm m-0 mt-1">{errors.jobBoardType}</p>
                )}
                {supportedJobBoardTypes.some((type) => type.value === values.jobBoardType) && (
                    <div className="mt-2">
                        <label className="block text-base font-semibold">Job board slug</label>
                        <div className="flex items-center space-x-1 -mt-2">
                            <p className="m-0 text-sm opacity-70">{jobBoardBaseURLs[values.jobBoardType]}</p>
                            <div className="flex-grow relative">
                                <input
                                    className={`border rounded-md p-2 text-sm w-full bg-white dark:bg-accent-dark ${
                                        touched.slug && errors.slug ? 'border-red' : 'border-border dark:border-dark'
                                    }`}
                                    placeholder="bluth-company"
                                    {...getFieldProps('slug')}
                                />
                                {touched.slug && errors.slug && (
                                    <p className="text-red text-sm m-0 mt-1 absolute -bottom-1 translate-y-full">
                                        {errors.slug}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {values.jobBoardType === 'other' && (
                    <Input
                        label="Job board URL"
                        placeholder="https://bobloblawlawblog.com/jobs"
                        {...getFieldProps('jobBoardURL')}
                        error={errors.jobBoardURL}
                        touched={touched.jobBoardURL}
                        className="mt-2"
                    />
                )}
                {values.jobBoardType === 'kadoa' && (
                    <Input
                        label="Kadoa endpoint URL"
                        placeholder="https://api.kadoa.com/v4/workflows/123456789/data"
                        {...getFieldProps('jobBoardURL')}
                        error={errors.jobBoardURL}
                        touched={touched.jobBoardURL}
                        className="mt-2"
                    />
                )}
            </div>

            <Input
                label="Company description"
                placeholder="Describe the company in a few sentences"
                multiline
                rows={4}
                {...getFieldProps('description')}
                error={errors.description}
                touched={touched.description}
            />

            {!isModerator && (
                <Input
                    label="Why is your company cool?"
                    placeholder="We have a great culture and a great product"
                    multiline
                    rows={4}
                    {...getFieldProps('why')}
                    error={errors.why}
                    touched={touched.why}
                />
            )}

            <div className="space-y-2">
                <h4 className="text-base font-semibold m-0">Company perks</h4>
                {toggleFilters
                    .filter((filter) => filter.appliesTo === 'company')
                    .map((filter) => (
                        <Toggle
                            key={filter.key}
                            activeOpacity={false}
                            position="right"
                            iconLeft={filter.icon}
                            label={filter.label}
                            onChange={(checked) => setFieldValue(filter.key, checked)}
                            checked={values[filter.key]}
                        />
                    ))}
            </div>

            <div className="space-y-2 !mt-5">
                <div>
                    <h4 className="text-base font-semibold m-0">Company logos</h4>
                    <p className="text-sm opacity-70 m-0">Upload the company logos in SVG or PNG format</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <label className="block">
                        <span className="text-base font-semibold mb-1 block">Logo</span>
                        <ImageDrop
                            className={`h-auto aspect-square rounded-sm border border-border dark:border-dark ${
                                touched.logoLight && errors.logoLight ? 'border-red' : ''
                            }`}
                            onDrop={(file) => setFieldValue('logoLight', file)}
                            onRemove={() => setFieldValue('logoLight', null)}
                            image={values.logoLight}
                            accept={{ 'image/png': ['.png'], 'image/svg': ['.svg'] }}
                        />
                    </label>

                    <label className="block">
                        <span className="text-base font-semibold mb-1 block">Logo (dark)</span>
                        <ImageDrop
                            className={`h-auto aspect-square rounded-sm border border-border dark:border-dark ${
                                touched.logoDark && errors.logoDark ? 'border-red' : ''
                            }`}
                            onDrop={(file) => setFieldValue('logoDark', file)}
                            onRemove={() => setFieldValue('logoDark', null)}
                            image={values.logoDark}
                            accept={{ 'image/png': ['.png'], 'image/svg': ['.svg'] }}
                        />
                    </label>

                    <label className="block">
                        <span className="text-base font-semibold mb-1 block">Logomark</span>
                        <ImageDrop
                            className={`h-auto aspect-square rounded-sm border border-border dark:border-dark ${
                                touched.logomark && errors.logomark ? 'border-red' : ''
                            }`}
                            onDrop={(file) => setFieldValue('logomark', file)}
                            onRemove={() => setFieldValue('logomark', null)}
                            image={values.logomark}
                            accept={{ 'image/png': ['.png'], 'image/svg': ['.svg'] }}
                        />
                    </label>
                </div>
                {(touched.logoLight && errors.logoLight) ||
                (touched.logoDark && errors.logoDark) ||
                (touched.logomark && errors.logomark) ? (
                    <p className="text-red text-sm m-0 mt-1">
                        {touched.logoLight && errors.logoLight
                            ? errors.logoLight
                            : touched.logoDark && errors.logoDark
                            ? errors.logoDark
                            : errors.logomark}
                    </p>
                ) : null}
            </div>
            <div className="!mt-8">
                <CallToAction disabled={isSubmitting} width="full">
                    {isSubmitting ? (
                        <div className="flex items-center justify-center">
                            <Spinner className="!size-6" />
                        </div>
                    ) : companyId ? (
                        'Update company'
                    ) : isModerator ? (
                        'Publish company'
                    ) : (
                        'Submit application'
                    )}
                </CallToAction>
            </div>
        </form>
    )
}

export default function JobsPage() {
    const [sortBy, setSortBy] = useState<'company' | 'job'>('company')
    const [companyFilters, setCompanyFilters] = useState<FiltersType>([])
    const [jobFilters, setJobFilters] = useState<FiltersType>([])
    const [filtersOpen, setFiltersOpen] = useState(false)
    const [issueModalOpen, setIssueModalOpen] = useState(false)
    const [addAJobModalOpen, setAddAJobModalOpen] = useState(false)
    const [companyId, setCompanyId] = useState<number>()
    const [search, setSearch] = useState('')
    const {
        companies,
        isLoading: companiesLoading,
        mutate,
        deleteCompany,
    } = useCompanies({ companyFilters, jobFilters, search })
    const { isModerator, user } = useUser()

    return (
        <Layout>
            <SEO
                title="Cool tech jobs"
                description="Open roles from companies with unique perks and great culture"
                image={`/images/og/cool-tech-jobs.png`}
            />
            <section className="px-5">
                <div className="flex flex-col lg:flex-row items-start -mt-1 order-1">
                    <div className="min-w-[300px] lg:max-w-[300px] pr-6 xl:sticky top-0 reasonable:top-[107px] py-4">
                        <h1 className="text-2xl mb-2 font-bold">Cool tech jobs</h1>
                        <p className="mb-2 text-[15px]">
                            Find open roles for product engineers (and other jobs) from companies with unique perks and
                            great culture.
                        </p>

                        <p className="mt-2 mb-0 text-[15px]">
                            Looking to work at PostHog? <Link to="/careers">Visit our careers page.</Link>
                        </p>

                        <p className="mt-4 mb-0 border-t border-light dark:border-dark pt-4 text-[15px]">
                            Work at a company with great perks?{' '}
                            <button
                                className="text-red dark:text-yellow font-semibold"
                                onClick={() => setAddAJobModalOpen(true)}
                            >
                                Apply to get your jobs listed here.
                            </button>
                        </p>
                        <p className="text-[15px] mt-2 mb-4">
                            Something off?{' '}
                            <button
                                className="text-red dark:text-yellow font-semibold"
                                onClick={() => setIssueModalOpen(true)}
                            >
                                Let us know
                            </button>
                            .
                        </p>
                        {isModerator && (
                            <CallToAction
                                onClick={() => setAddAJobModalOpen(true)}
                                size="sm"
                                width="full"
                                childClassName="flex items-center justify-center gap-1"
                            >
                                <IconShield className="size-5" />
                                Add a company
                            </CallToAction>
                        )}
                    </div>
                    <div className="w-full flex-grow lg:mr-6 lg:pl-6 lg:pr-6 lg:border-x border-light dark:border-dark order-3 lg:order-2">
                        {sortBy === 'company' ? (
                            <Companies
                                companiesLoading={companiesLoading}
                                companies={companies}
                                search={search}
                                onSearch={(value) => setSearch(value)}
                                onEdit={(id) => {
                                    setCompanyId(id)
                                    setAddAJobModalOpen(true)
                                }}
                                onDelete={deleteCompany}
                                hasFilters={companyFilters.length > 0 || jobFilters.length > 0}
                            />
                        ) : (
                            <Jobs companyFilters={companyFilters} jobFilters={jobFilters} />
                        )}
                    </div>
                    <div className="flex-shrink-0 xl:sticky top-0 reasonable:top-[107px] lg:py-4 order-2 pb-4 lg:pb-0 lg:order-3 w-full lg:w-auto">
                        <button
                            onClick={() => setFiltersOpen(!filtersOpen)}
                            className="text-left inline-flex items-center justify-between border border-light dark:border-dark rounded p-1 pr-3 bg-accent dark:bg-accent-dark lg:hidden w-full"
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
            <SideModal className="w-full" open={issueModalOpen} setOpen={setIssueModalOpen} title="Report an issue">
                <IssueForm />
            </SideModal>
            <SideModal
                className="w-full"
                open={addAJobModalOpen}
                setOpen={(open) => {
                    setAddAJobModalOpen(open)
                    setCompanyId(undefined)
                }}
                title={!user ? 'Sign into PostHog.com' : 'Add a company'}
            >
                <CompanyForm
                    companyId={companyId}
                    onSuccess={() => {
                        mutate()
                    }}
                />
            </SideModal>
        </Layout>
    )
}

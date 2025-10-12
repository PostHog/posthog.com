import React, { useCallback, useEffect, useState, useMemo } from 'react'
import useJobs, { Job } from '../hooks/useJobs'
import groupBy from 'lodash.groupby'
import useCompanies, { Company, Filters as FiltersType } from 'hooks/useCompanies'
import Layout from 'components/Layout'
import { layoutLogic } from 'logic/layoutLogic'
import { useValues } from 'kea'
import {
    IconChevronDown,
    IconShieldLock,
    IconArrowUpRight,
    IconX,
    IconPencil,
    IconTrash,
    IconShield,
    IconArrowLeft,
    IconArrowRight,
    IconSpinner,
} from '@posthog/icons'
import Link from 'components/Link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Toggle from 'components/Toggle'
import { Select } from 'components/RadixUI/Select'
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
import OSTable from 'components/OSTable'
import Editor from 'components/Editor'
import { slugifyTeamName } from 'lib/utils'
import {
    createFuseInstance,
    processItemsWithHighlighting,
    HighlightedText,
    HighlightedMarkdown,
} from 'components/Editor/SearchUtils'
import { useSearch } from 'components/Editor/SearchProvider'
import { useApp } from '../context/App'
import { useWindow } from '../context/Window'
import { useInView } from 'react-intersection-observer'
import ProgressBar from 'components/ProgressBar'
import CloudinaryImage from 'components/CloudinaryImage'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSButton from 'components/OSButton'
import { navigate } from 'gatsby'

dayjs.extend(relativeTime)

type JobBoardType = 'ashby' | 'greenhouse' | 'gem' | 'kadoa' | 'other'

interface ToggleFilter {
    icon: React.ReactNode
    label: string
    key: string
    appliesTo: 'company' | 'job'
}

const toggleFilters: ToggleFilter[] = [
    {
        icon: <StickerLaptop className="size-7" />,
        label: 'Remote',
        key: 'isRemote',
        appliesTo: 'job',
    },
    {
        icon: <StickerPullRequest className="size-7" />,
        label: 'Engineers decide what to build',
        key: 'engineersDecideWhatToBuild',
        appliesTo: 'company',
    },
    {
        icon: <StickerLaptop className="size-7" />,
        label: 'Remote only company',
        key: 'remoteOnly',
        appliesTo: 'company',
    },
    {
        icon: <StickerPalmTree className="size-7" />,
        label: 'Exotic off-sites',
        key: 'exoticOffsites',
        appliesTo: 'company',
    },
    {
        icon: <StickerDnd className="size-7" />,
        label: 'Meeting-free days',
        key: 'meetingFreeDays',
        appliesTo: 'company',
    },
    {
        icon: <StickerEngineerRatio className="size-7" />,
        label: 'High engineer ratio',
        key: 'highEngineerRatio',
        appliesTo: 'company',
    },
    {
        icon: <StickerHourglass className="size-7" />,
        label: 'No deadlines',
        key: 'noDeadlines',
        appliesTo: 'company',
    },
]

const Perks = ({ company, className }: { company: Company; className?: string }) => {
    const perks = toggleFilters.filter((toggle) => (company.attributes as any)[toggle.key])

    return (
        <ul className={`list-none p-0 m-0 ${className}`}>
            {perks.filter(Boolean).map((perk) => (
                <li key={`${company.id}-${perk.key}`} className="flex gap-1.5 items-center p-0">
                    {perk.icon}
                    <span className="text-sm font-medium">{perk.label}</span>
                </li>
            ))}
        </ul>
    )
}

const JobsByDepartment = ({
    jobs,
    department,
    initialOpen = false,
    type,
}: {
    jobs: Job[]
    department: string
    initialOpen?: boolean
    type: string
}) => {
    const [open, setOpen] = useState(initialOpen)
    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className="w-full text-left flex items-center border-b border-primary pb-2 mb-2"
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
                className="list-none p-0 m-0 overflow-hidden @4xl:ml-7"
                animate={open ? { height: 'auto' } : { height: 0 }}
            >
                {jobs.map((job) => {
                    const isPostHog = job.attributes.company.data.attributes.name.toLowerCase() === 'posthog'
                    const url = isPostHog
                        ? `/careers/${slugify(job.attributes.title.replace(' (Remote)', ''), { lower: true })}`
                        : job.attributes.url

                    const postedDate = job.attributes.postedDate
                    const showPosted = postedDate && postedDate !== '1970-01-01T00:00:00.000Z'

                    return (
                        <li key={job.id} className="flex justify-between items-start last:mb-6 mt-2 first:mt-0">
                            <Link
                                externalNoIcon={!isPostHog}
                                className="group !text-inherit underline"
                                to={url + (isPostHog ? '' : '?utm_source=posthog')}
                            >
                                <span className="relative">
                                    {job.attributes.title}
                                    {!isPostHog && (
                                        <IconArrowUpRight className="inline-block size-4 opacity-0 group-hover:opacity-50 text-primary dark:text-primary-dark absolute left-full top-0.5 ml-0.5" />
                                    )}
                                </span>
                            </Link>
                            {showPosted && (
                                <p className="m-0 pt-1 opacity-60 text-sm flex-[0_0_6rem] text-right">
                                    {dayjs(postedDate).fromNow()}
                                </p>
                            )}
                        </li>
                    )
                })}
            </motion.ul>
        </div>
    )
}

const CompanyNavigation = ({ companies, isLoading }: { companies: Company[]; isLoading: boolean }) => {
    const { siteSettings } = useApp()
    const isDark = siteSettings.theme === 'dark'

    const scrollToCompany = (companyId: number) => {
        const element = document.getElementById(`company-${companyId}`)
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
    }

    return (
        <div className="mb-8">
            {!isLoading && (
                <>
                    <h3 className="text-lg font-semibold mb-0">Featuring roles from these cool companies...</h3>
                    <p className="text-sm text-secondary">(Click a logo to jump to a company)</p>
                </>
            )}
            <div className="flex flex-wrap gap-2">
                {companies
                    .filter((company) => company.attributes.jobs.data.length > 0)
                    .map((company) => {
                        const { name } = company.attributes
                        const logoLight = company.attributes.logoLight?.data?.attributes?.url
                        const logoDark = company.attributes.logoDark?.data?.attributes?.url

                        return (
                            <OSButton
                                key={company.id}
                                onClick={() => scrollToCompany(company.id)}
                                hover="border"
                                className=""
                            >
                                {logoLight || logoDark ? (
                                    <img
                                        className="min-h-4 max-h-6 object-contain"
                                        src={logoDark && isDark ? logoDark : logoLight}
                                        alt={name}
                                    />
                                ) : (
                                    <div className="bg-accent rounded flex items-center justify-center">
                                        <span className="text-sm font-semibold text-muted">
                                            {name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </OSButton>
                        )
                    })}
            </div>
        </div>
    )
}

const CompanyRows = ({
    companyFilters,
    jobFilters,
    search,
    companies,
    isLoading,
    mutate,
    deleteCompany,
    isValidating,
    openAddAJobWindow,
    hasMore,
    fetchMore,
}: {
    companyFilters: FiltersType
    jobFilters: FiltersType
    search: string
    companies: Company[]
    isLoading: boolean
    mutate: () => void
    deleteCompany: (companyId: number, companyName: string) => void
    isValidating: boolean
    openAddAJobWindow: (companyId?: number) => void
    hasMore: boolean
    fetchMore: () => void
}) => {
    const { isModerator } = useUser()
    const { siteSettings } = useApp()
    const isDark = siteSettings.theme === 'dark'
    const [ref, inView] = useInView({
        threshold: 0.5,
    })

    const jobColumns = useMemo(
        () => [
            { name: 'Date posted', width: 'minmax(120px, auto)', align: 'left' as const },
            { name: 'Job title', width: 'minmax(300px, 2fr)', align: 'left' as const },
            { name: 'Department', width: 'minmax(150px, auto)', align: 'left' as const },
        ],
        []
    )

    const displayCompanies = useMemo(() => {
        const companiesWithJobs = companies.filter((company) => company.attributes.jobs.data.length > 0)
        const companiesWithoutJobs = companies.filter((company) => company.attributes.jobs.data.length === 0)
        const hasFilters = companyFilters.length > 0 || jobFilters.length > 0

        // Always show companies with jobs
        let result = companiesWithJobs

        // For moderators, also show companies without jobs (but only when no search/filters)
        if (isModerator && !search && !hasFilters) {
            result = [...companiesWithJobs, ...companiesWithoutJobs]
        }

        return result
    }, [companies, isModerator, search, companyFilters, jobFilters])

    useEffect(() => {
        if (inView && hasMore) {
            fetchMore()
        }
    }, [inView])

    const companiesWithJobs = displayCompanies.filter((company) => company.attributes.jobs.data.length > 0)
    const companiesWithoutJobs = displayCompanies.filter((company) => company.attributes.jobs.data.length === 0)
    const showCompaniesWithoutJobs = isModerator && !search && companyFilters.length === 0 && jobFilters.length === 0

    return (
        <div className="space-y-8">
            {/* Companies with jobs */}
            {companiesWithJobs.map((company, index) => {
                const { name } = company.attributes
                const logoLight = company.attributes.logoLight?.data?.attributes?.url
                const logoDark = company.attributes.logoDark?.data?.attributes?.url
                const hasJobs = company.attributes.jobs.data.length > 0

                const jobRows = company.attributes.jobs.data.map((job) => {
                    const postedDate = job.attributes.postedDate
                    const showPosted = postedDate && postedDate !== '1970-01-01T00:00:00.000Z'
                    const isPostHog = job.attributes.company.data.attributes.name.toLowerCase() === 'posthog'
                    const url = isPostHog
                        ? `/careers/${slugify(job.attributes.title.replace(' (Remote)', ''), { lower: true })}`
                        : job.attributes.url

                    return {
                        cells: [
                            {
                                content: showPosted ? (
                                    <span className="text-sm">{dayjs(postedDate).fromNow()}</span>
                                ) : (
                                    <em className="text-sm opacity-60">Unknown</em>
                                ),
                            },
                            {
                                content: (
                                    <Link
                                        externalNoIcon={!isPostHog}
                                        className="group !text-inherit underline font-medium"
                                        to={url + (isPostHog ? '' : '?utm_source=posthog')}
                                        state={isPostHog ? { newWindow: true } : undefined}
                                    >
                                        <span className="relative">
                                            {job.attributes.title}
                                            {!isPostHog && (
                                                <IconArrowUpRight className="inline-block size-4 opacity-0 group-hover:opacity-50 text-primary dark:text-primary-dark absolute left-full top-0.5 ml-0.5" />
                                            )}
                                        </span>
                                    </Link>
                                ),
                            },
                            {
                                content: (
                                    <span className="text-sm opacity-75">
                                        {job.attributes.department || 'Not specified'}
                                    </span>
                                ),
                            },
                        ],
                    }
                })

                return (
                    <div
                        key={company.id}
                        id={`company-${company.id}`}
                        ref={index === displayCompanies.length - 1 ? ref : null}
                        className="border border-primary rounded-md flex flex-col @4xl:flex-row"
                    >
                        <div className="@4xl:basis-72 flex flex-col gap-4 pt-4 px-4 @2xl:pb-4">
                            <div title={name} className="flex-shrink-0">
                                {(logoLight || logoDark) && (
                                    <>
                                        {company.attributes.url ? (
                                            <Link to={`${company.attributes.url}?utm_source=posthog`} externalNoIcon>
                                                <img
                                                    className="max-w-40 mb-3 w-full"
                                                    src={logoDark && isDark ? logoDark : logoLight}
                                                    alt={name}
                                                />
                                            </Link>
                                        ) : (
                                            <img
                                                className="max-w-40 mb-3 w-full"
                                                src={logoDark && isDark ? logoDark : logoLight}
                                                alt={name}
                                            />
                                        )}
                                    </>
                                )}
                                {isModerator && (
                                    <div className="flex mt-4 space-x-0.5">
                                        <OSButton
                                            icon={<IconPencil />}
                                            onClick={() => {
                                                openAddAJobWindow(company.id)
                                            }}
                                            size="sm"
                                            hover="background"
                                        >
                                            Edit
                                        </OSButton>
                                        <OSButton
                                            icon={<IconTrash />}
                                            onClick={() => deleteCompany(company.id, name)}
                                            size="sm"
                                            hover="background"
                                        >
                                            Delete
                                        </OSButton>
                                    </div>
                                )}
                            </div>

                            <div className="flex-grow">
                                {company.attributes.description?.trim() && (
                                    <div className="mb-4">
                                        <p className="my-0 text-sm">{company.attributes.description}</p>
                                        {company.attributes.url && (
                                            <OSButton
                                                to={`${company.attributes.url}?utm_source=posthog`}
                                                className="px-3 rounded-full border-primary mt-2"
                                                size="sm"
                                                external
                                                asLink
                                            >
                                                Website
                                            </OSButton>
                                        )}
                                    </div>
                                )}

                                <div>
                                    <h3 className="text-sm font-medium text-muted dark:text-secondary m-0 leading-none mb-2">
                                        Company perks
                                    </h3>
                                    <Perks company={company} className="flex gap-x-4 flex-wrap" />
                                </div>
                            </div>
                        </div>

                        <div className="@container flex-1 py-4 pl-4 @container/not-full-width">
                            {hasJobs ? (
                                <div className="pr-4 md:@2xs:pr-0 md:@xl:pr-4">
                                    <OSTable
                                        columns={jobColumns}
                                        rows={jobRows}
                                        rowAlignment="center"
                                        groupBy="Department"
                                        type="role"
                                    />
                                </div>
                            ) : (
                                <div className="text-center py-8 px-4 bg-accent rounded-md border border-border">
                                    <em>No jobs currently available</em>
                                </div>
                            )}
                        </div>
                    </div>
                )
            })}

            {/* Companies without jobs (moderators only) */}
            {showCompaniesWithoutJobs && companiesWithoutJobs.length > 0 && (
                <>
                    <h2 className="text-xl font-semibold text-muted dark:text-secondary mt-12 mb-6">
                        Companies with no active RootClasses
                    </h2>
                    <p className="text-secondary">(Only visible to moderators)</p>
                    {companiesWithoutJobs.map((company, index) => {
                        const { name } = company.attributes
                        const logoLight = company.attributes.logoLight?.data?.attributes?.url
                        const logoDark = company.attributes.logoDark?.data?.attributes?.url

                        return (
                            <div
                                key={company.id}
                                id={`company-${company.id}`}
                                className="border border-primary rounded-md flex flex-col @4xl:flex-row opacity-60"
                            >
                                <div className="@4xl:basis-72 flex flex-col gap-4 pt-4 px-4 @2xl:pb-4">
                                    <div title={name} className="flex-shrink-0">
                                        {(logoLight || logoDark) && (
                                            <>
                                                {company.attributes.url ? (
                                                    <Link
                                                        to={`${company.attributes.url}?utm_source=posthog`}
                                                        externalNoIcon
                                                    >
                                                        <img
                                                            className="max-w-40 mb-3 w-full"
                                                            src={logoDark && isDark ? logoDark : logoLight}
                                                            alt={name}
                                                        />
                                                    </Link>
                                                ) : (
                                                    <img
                                                        className="max-w-40 mb-3 w-full"
                                                        src={logoDark && isDark ? logoDark : logoLight}
                                                        alt={name}
                                                    />
                                                )}
                                            </>
                                        )}
                                        <div className="flex mt-4 space-x-0.5">
                                            <OSButton
                                                icon={<IconPencil />}
                                                onClick={() => {
                                                    openAddAJobWindow(company.id)
                                                }}
                                                size="sm"
                                                hover="background"
                                            >
                                                Edit
                                            </OSButton>
                                            <OSButton
                                                icon={<IconTrash />}
                                                onClick={() => deleteCompany(company.id, name)}
                                                size="sm"
                                                hover="background"
                                            >
                                                Delete
                                            </OSButton>
                                        </div>
                                    </div>

                                    <div className="flex-grow">
                                        {company.attributes.description?.trim() && (
                                            <div className="mb-4">
                                                <p className="my-0 text-sm">{company.attributes.description}</p>
                                                {company.attributes.url && (
                                                    <OSButton
                                                        to={`${company.attributes.url}?utm_source=posthog`}
                                                        className="px-3 rounded-full border-primary mt-2"
                                                        size="sm"
                                                        external
                                                        asLink
                                                    >
                                                        Website
                                                    </OSButton>
                                                )}
                                            </div>
                                        )}

                                        <div>
                                            <h3 className="text-sm font-medium text-muted dark:text-secondary m-0 leading-none mb-2">
                                                Company perks
                                            </h3>
                                            <Perks company={company} className="flex gap-x-4 flex-wrap" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 p-4">
                                    <div className="text-center py-8 px-4 bg-accent rounded-md border border-border">
                                        <em>No jobs currently available</em>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </>
            )}

            {displayCompanies.length === 0 && !isLoading && (
                <div className="text-center py-12 text-secondary">
                    <p>No companies found matching your criteria.</p>
                </div>
            )}

            {isLoading && <ProgressBar title="job board" />}
            {isValidating && !isLoading && (
                <div className="text-center pb-4">
                    <IconSpinner className="size-7 opacity-60 animate-spin mx-auto" />
                </div>
            )}
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
            <div className="border border-input rounded-md p-2 bg-accent">
                <h4 className="text-base m-0">Thanks for your report!</h4>
                <p className="text-sm opacity-70 m-0">We'll look into this issue as soon as possible.</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 m-0">
            <div>
                <Select
                    value={values.company}
                    onValueChange={(value) => setFieldValue('company', value)}
                    placeholder="Select a company"
                    groups={[
                        {
                            label: 'Companies',
                            items: companies.map((company) => {
                                const { name } = company.attributes
                                return { label: name, value: name }
                            }),
                        },
                    ]}
                    className="w-full"
                />
                {touched.company && errors.company && <p className="text-red text-sm m-0 mt-1">{errors.company}</p>}
            </div>

            <div>
                <Select
                    value={values.issueType}
                    onValueChange={(value) => setFieldValue('issueType', value)}
                    placeholder="Select an issue type"
                    groups={[
                        {
                            label: 'Issue Types',
                            items: issueTypeOptions.map((option) => ({ label: option.label, value: option.label })),
                        },
                    ]}
                    className="w-full"
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
                        touched.description && errors.description ? 'border-red' : 'border-input'
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
                    touched && error ? 'border-red' : 'border-input'
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
            <div className="h-10 w-full bg-accent rounded-md animate-pulse" />
            <div className="h-10 w-full bg-accent rounded-md animate-pulse" />
            <div className="h-10 w-full bg-accent rounded-md animate-pulse" />
            <div className="flex items-center space-x-2">
                <div className="h-10 w-1/2 bg-accent rounded-md animate-pulse" />
                <div className="h-10 w-1/2 bg-accent rounded-md animate-pulse" />
            </div>
            <div className="h-40 w-full bg-accent rounded-md animate-pulse" />
            <div className="h-10 w-full bg-accent rounded-md animate-pulse" />
            <div className="h-10 w-full bg-accent rounded-md animate-pulse" />
            <div className="h-10 w-full bg-accent rounded-md animate-pulse" />
            <div className="h-10 w-full bg-accent rounded-md animate-pulse" />
            <div className="h-10 w-full bg-accent rounded-md animate-pulse" />
            <div className="h-10 w-full bg-accent rounded-md animate-pulse" />
            <div className="h-10 w-full bg-accent rounded-md animate-pulse" />
            <div className="grid grid-cols-3 gap-2">
                <div className="aspect-square bg-accent rounded-md animate-pulse" />
                <div className="aspect-square bg-accent rounded-md animate-pulse" />
                <div className="aspect-square bg-accent rounded-md animate-pulse" />
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
        <div data-scheme="primary">
            <h2 className="mb-2">Companies awaiting approval</h2>
            <Select
                value={selectedCompany?.id?.toString()}
                onValueChange={(value) => {
                    setSelectedCompany(pendingCompanies.find((company) => company.id.toString() === value) || null)
                }}
                placeholder="Continue with a pending company"
                groups={[
                    {
                        label: 'Pending Companies',
                        items: pendingCompanies.map((company) => ({
                            label: company.attributes.name,
                            value: company.id.toString(),
                        })),
                    },
                ]}
                className="w-full"
            />
            {selectedCompany && (
                <div className="mt-4">
                    <OSButton
                        onClick={() => onStartFromPendingCompany(selectedCompany)}
                        size="md"
                        variant="primary"
                        width="full"
                    >
                        {`Continue with ${selectedCompany?.attributes.name}`}
                    </OSButton>
                </div>
            )}
            <h4
                data-scheme="secondary"
                className="opacity-70 py-3 my-3 relative before:w-full before:h-[1px] before:bg-border dark:before:bg-dark before:absolute flex items-center justify-center text-base"
            >
                <span className="bg-primary px-2 relative">or</span>
            </h4>
            <OSButton size="md" width="full" variant="secondary" onClick={onAddNewCompany}>
                Add a new company
            </OSButton>
        </div>
    ) : null
}

const JobBoardIntro = ({ onConfirm }: { onConfirm: () => void }) => {
    return (
        <div className="prose dark:prose-dark">
            <div
                data-scheme="primary"
                className="not-prose bg-primary border border-primary rounded px-4 pb-4 text-center"
            >
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/search-hog-4.png"
                    alt="This hog has an answer"
                    width={400}
                    placeholder="blurred"
                    className="max-w-[300px] @xl:max-w-[300px]"
                />
            </div>
            <h2 className="text-xl mt-4 mb-2">Are we missing some cool tech jobs?</h2>
            <p>
                Our job board is designed to help product engineers (and other tech-adjacent candidates) find companies
                that have a similar vibe to PostHog – where employees are empowered to do their best work.
            </p>
            <p>To qualify to have your open roles listed, you'll need to meet the following criteria:</p>
            <ul>
                <li>
                    At least one unique perk listed in our filters
                    <br />{' '}
                    <span className="text-[15px] opacity-80">
                        (Have a great perk we don't list?{' '}
                        <Link to="https://x.com/ninepixelgrid" external>
                            Let us know!
                        </Link>
                        )
                    </span>
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
                Next →
            </CallToAction>
        </div>
    )
}

const Auth = () => {
    return (
        <div className="-m-4">
            <div className="p-4">
                <div className="bg-accent p-4 mt-0 mb-2 rounded-md border border-primary">
                    <p className="text-sm mb-2">
                        <strong>Note: PostHog.com authentication is separate from your PostHog app.</strong>
                    </p>

                    <p className="text-sm mb-0">
                        We suggest signing up with your personal email. Soon you'll be able to link your PostHog app
                        account.
                    </p>
                </div>
            </div>
            <div className="">
                <Authentication initialView="sign-in" showBanner={false} showProfile={false} />
            </div>
        </div>
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
            jobBoardType: company?.attributes?.jobBoardType || ('ashby' as JobBoardType),
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
                            data: {
                                ...rest,
                                slug:
                                    values.jobBoardType === 'other'
                                        ? slugify(values.name, { lower: true })
                                        : values.slug,
                                profile: profileID,
                            },
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
                    values.logoLight.file !== null &&
                    (await uploadImage(values.logoLight.file, jwt, {
                        field: 'images',
                        id: profileID,
                        type: 'api::profile.profile',
                    }))
                const uploadedLogoDark =
                    values.logoDark?.file &&
                    values.logoDark.file !== null &&
                    (await uploadImage(values.logoDark.file, jwt, {
                        field: 'images',
                        id: profileID,
                        type: 'api::profile.profile',
                    }))
                const uploadedLogomark =
                    values.logomark?.file &&
                    values.logomark.file !== null &&
                    (await uploadImage(values.logomark.file, jwt, {
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
                    if (jobBoardChanged && !jobsCreated) {
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

            <div data-scheme="primary">
                <label className="block text-base font-semibold mb-1">Job board type</label>
                <Select
                    value={values.jobBoardType}
                    onValueChange={(value) => setFieldValue('jobBoardType', value)}
                    placeholder="Job board type"
                    groups={[
                        {
                            label: 'Job board types',
                            items: [
                                ...supportedJobBoardTypes,
                                ...(isModerator ? [{ value: 'kadoa', label: 'Kadoa' }] : []),
                                { value: 'other', label: 'Other' },
                            ],
                        },
                    ]}
                    className="w-full"
                />
                {touched.jobBoardType && errors.jobBoardType && (
                    <p className="text-red text-sm m-0 mt-1">{errors.jobBoardType}</p>
                )}
            </div>
            <div>
                {supportedJobBoardTypes.some((type) => type.value === values.jobBoardType) && (
                    <div className="mt-2">
                        <label className="block text-base font-semibold">Job board slug</label>
                        <div className="flex items-center space-x-1 -mt-2">
                            <p className="m-0 text-sm opacity-70">{jobBoardBaseURLs[values.jobBoardType]}</p>
                            <div className="flex-grow relative">
                                <input
                                    className={`border rounded-md p-2 text-sm w-full bg-white dark:bg-accent-dark ${
                                        touched.slug && errors.slug ? 'border-red' : 'border-input'
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
                    <p className="text-sm opacity-70 m-0">Upload the company logos in SVG or (transparent) PNG</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                        <span className="text-base font-semibold mb-1 block">Logo</span>
                        <ImageDrop
                            className={`h-auto rounded-sm !bg-light ${
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
                            className={`h-auto rounded-sm !bg-dark ${
                                touched.logoDark && errors.logoDark ? 'border-red' : ''
                            }`}
                            onDrop={(file) => setFieldValue('logoDark', file)}
                            onRemove={() => setFieldValue('logoDark', null)}
                            image={values.logoDark}
                            accept={{ 'image/png': ['.png'], 'image/svg': ['.svg'] }}
                        />
                    </label>
                    {/* 
                    <label className="block">
                        <span className="text-base font-semibold mb-1 block">Logomark</span>
                        <ImageDrop
                            className={`h-auto aspect-square rounded-sm border border-input ${touched.logomark && errors.logomark ? 'border-red' : ''
                                }`}
                            onDrop={(file) => setFieldValue('logomark', file)}
                            onRemove={() => setFieldValue('logomark', null)}
                            image={values.logomark}
                            accept={{ 'image/png': ['.png'], 'image/svg': ['.svg'] }}
                        />
                    </label> 
                    */}
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
            <div>
                <OSButton disabled={isSubmitting} width="full" variant="primary">
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
                </OSButton>
            </div>
        </form>
    )
}

const IssueWindow = () => {
    const { setWindowTitle } = useApp()
    const { appWindow } = useWindow()

    useEffect(() => {
        setWindowTitle(appWindow, 'Report an issue')
    }, [])

    return (
        <div data-scheme="secondary" className="bg-primary text-primary p-4 size-full">
            <IssueForm />
        </div>
    )
}

const AddAJobWindow = ({
    companyId,
    onSuccess,
    onClose,
}: {
    companyId?: number
    onSuccess?: () => void
    onClose?: () => void
}) => {
    const { setWindowTitle, siteSettings } = useApp()
    const { appWindow } = useWindow()

    useEffect(() => {
        setWindowTitle(appWindow, 'Add a company')

        return () => {
            onClose?.()
        }
    }, [])

    return (
        <ScrollArea className="min-h-0 h-full [&>div>div]:h-full">
            <div
                data-scheme="secondary"
                className={`bg-primary text-primary ${siteSettings.experience === 'boring' ? 'size-full' : 'h-full'}`}
            >
                <div className="p-4">
                    <CompanyForm companyId={companyId} onSuccess={onSuccess} />
                </div>
            </div>
        </ScrollArea>
    )
}

export default function JobsPage() {
    const [companyId, setCompanyId] = useState<number>()
    const [filteredCompanies, setFilteredCompanies] = useState<Company[]>()
    const [companyFilters, setCompanyFilters] = useState<FiltersType>([])
    const [jobFilters, setJobFilters] = useState<FiltersType>([])
    const [search, setSearch] = useState('')
    const [pendingCompaniesCount, setPendingCompaniesCount] = useState<number>(0)
    const { addWindow } = useApp()
    const { appWindow } = useWindow()
    const { getJwt, isModerator } = useUser()

    const {
        companies: initialCompanies,
        isLoading: companiesLoading,
        mutate,
        fetchMore,
        hasMore,
        deleteCompany,
        isValidating: companiesValidating,
    } = useCompanies({ companyFilters, jobFilters, search })

    const fetchPendingCompaniesCount = useCallback(async () => {
        if (!isModerator) return
        try {
            const jwt = await getJwt()
            const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/pending-companies`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            const data = await response.json()
            setPendingCompaniesCount(data.data?.length || 0)
        } catch (error) {
            console.error('Error fetching pending companies count:', error)
        }
    }, [isModerator, getJwt])

    useEffect(() => {
        fetchPendingCompaniesCount()
    }, [fetchPendingCompaniesCount])

    const openIssueWindow = () => {
        addWindow(
            <IssueWindow newWindow location={{ pathname: `cool-tech-jobs-issue` }} key={`cool-tech-jobs-issue`} />
        )
    }

    const openAddAJobWindow = (companyId?: number) => {
        addWindow(
            <AddAJobWindow
                newWindow
                location={{ pathname: `cool-tech-jobs-add-a-job` }}
                key={`cool-tech-jobs-add-a-job`}
                companyId={companyId}
                onSuccess={() => {
                    mutate()
                    fetchPendingCompaniesCount()
                }}
                onClose={() => {
                    setCompanyId(undefined)
                }}
            />
        )
    }

    return (
        <>
            <SEO
                title="Cool tech jobs"
                description="Open roles from companies with unique perks and great culture"
                image={`/images/og/cool-tech-jobs.png`}
            />
            <Editor
                title="Cool tech jobs"
                slug="/cool-tech-jobs"
                maxWidth="100%"
                onSearchChange={(search) => {
                    setSearch(search)
                }}
                availableFilters={toggleFilters
                    .filter((filter) => filter.appliesTo === 'company')
                    .map((filter) => ({
                        label: filter.label,
                        value: filter.key,
                        operator: 'equals' as const,
                        options: [
                            { label: 'All', value: null },
                            { label: 'TRUE', value: true },
                            { label: 'FALSE', value: false },
                        ],
                    }))}
                handleFilterChange={(filters) => {
                    const newFilters = Object.entries(filters)
                        .filter(([_key, value]) => value?.value !== null)
                        .map(([key, value]) => {
                            return {
                                [key]: {
                                    $eq: value?.value,
                                },
                            }
                        })
                    setCompanyFilters(newFilters)
                }}
            >
                <section>
                    <p className="my-0 mb-4">
                        Find open roles for product engineers (and other jobs) from companies with unique perks and
                        great culture.
                    </p>

                    {isModerator && pendingCompaniesCount > 0 && (
                        <div
                            data-scheme="secondary"
                            className="border border-primary bg-primary rounded mb-4 p-4 @md:py-2 flex flex-col @md:flex-row @md:items-center gap-2 @md:gap-4 w-full"
                        >
                            <div className="flex-1">
                                <IconShieldLock className="block @md:inline-block size-10 @md:size-6 text-secondary relative -top-0.5 mr-2" />{' '}
                                There {pendingCompaniesCount === 1 ? 'is' : 'are'} {pendingCompaniesCount}{' '}
                                {pendingCompaniesCount === 1 ? 'company' : 'companies'} awaiting approval.
                            </div>
                            <aside>
                                <OSButton
                                    onClick={() => {
                                        openAddAJobWindow()
                                    }}
                                    variant="secondary"
                                    size="md"
                                >
                                    View pending companies
                                </OSButton>
                            </aside>
                        </div>
                    )}
                    <ul className="mb-8">
                        <li>
                            Looking to work at PostHog?{' '}
                            <Link to="/careers" state={{ newWindow: true }}>
                                Visit our careers page.
                            </Link>
                        </li>
                        <li>
                            Work at a company with great perks?{' '}
                            <button
                                className="text-red dark:text-yellow font-semibold"
                                onClick={() => openAddAJobWindow(companyId)}
                            >
                                Apply to get your jobs listed.
                            </button>
                        </li>
                        <li>
                            Something off?{' '}
                            <button className="text-red dark:text-yellow font-semibold" onClick={openIssueWindow}>
                                Let us know
                            </button>
                            .
                        </li>
                    </ul>

                    <CompanyNavigation companies={initialCompanies} isLoading={companiesLoading} />
                    <CompanyRows
                        companyFilters={companyFilters}
                        jobFilters={jobFilters}
                        search={search}
                        companies={initialCompanies}
                        isLoading={companiesLoading}
                        mutate={mutate}
                        deleteCompany={deleteCompany}
                        isValidating={companiesValidating}
                        openAddAJobWindow={openAddAJobWindow}
                        hasMore={hasMore}
                        fetchMore={fetchMore}
                    />
                </section>
            </Editor>
        </>
    )
}

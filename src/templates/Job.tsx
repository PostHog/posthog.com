import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { graphql, navigate } from 'gatsby'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import Link from 'components/Link'
import { CompensationCalculator } from 'components/CompensationCalculator'
import InterviewProcess from 'components/Job/InterviewProcess'
import Apply from 'components/Job/Apply'
import { sfBenchmark } from 'components/CompensationCalculator/compensation_data/sf_benchmark'
import { benefits } from 'components/Careers/Benefits'
import { Department, Location, Timezone } from 'components/NotProductIcons'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { companyMenu } from '../navs'
import TeamMember from 'components/TeamMember'
import { Accordion } from 'components/RadixUI/Accordion'
import OSButton from 'components/OSButton'
import { IconList } from '@posthog/icons'
import { Popover } from 'components/RadixUI/Popover'
import Tooltip from 'components/RadixUI/Tooltip'
import { TeamsSidebar } from 'components/Job/TeamsSidebar'
import ScrollArea from 'components/RadixUI/ScrollArea'
import Mark from 'mark.js'
import { OSInput } from 'components/OSForm'

const Detail = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) => {
    return (
        <li className="flex space-x-2">
            <span className="w-6 h-6 text-black dark:text-white flex-shrink-0">{icon}</span>
            <span className="grid">
                <h4 className="text-sm m-0 font-normal leading-none pt-1">
                    <span>{title}</span>
                </h4>
                <p className="text-[15px] m-0 mt-1">
                    <strong className="text-black dark:text-white">{value}</strong>
                </p>
            </span>
        </li>
    )
}

// Add custom ordering for role groupings - same as careers page
const roleGroupingOrder = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Operations']

const hideTeamsByJob = ['Technical ex-founder', 'Speculative application']

interface GitHubIssue {
    url: string
    number: number
    title: string
    labels?: Array<{ name: string; url: string }>
}

interface TableOfContentsItem {
    value: string
    url: string
    depth: number
}

interface ParsedContentItem {
    value: string
    trigger: React.ReactNode
    content: React.ReactNode
    title: string
}

interface JobProps {
    data: {
        teams: any
        objectives: any
        mission: any
        allJobPostings: any
        ashbyJobPosting: {
            departmentName: string
            info: any
            id: string
            parent: any
            fields: {
                tableOfContents: any
                html: string
                title: string
                slug: string
                locations: any
            }
        }
    }
    pageContext: {
        gitHubIssues: GitHubIssue[]
    }
}

// Separate component for left sidebar to prevent re-renders
const LeftSidebarContent = React.memo(
    ({
        searchQuery,
        setSearchQuery,
        filteredJobs,
        jobGroups,
        slug,
        navigate,
    }: {
        searchQuery: string
        setSearchQuery: (value: string) => void
        filteredJobs: any[]
        jobGroups: any[]
        slug: string
        navigate: any
    }) => {
        const jobListRef = useRef<HTMLDivElement>(null)
        const markedRef = useRef<Mark | null>(null)

        // Handle search input
        const handleSearchChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value
                setSearchQuery(value)
            },
            [setSearchQuery]
        )

        // Apply highlighting when search query changes
        useEffect(() => {
            if (jobListRef.current && searchQuery.trim()) {
                if (markedRef.current) {
                    markedRef.current.unmark()
                }
                // Only highlight job titles, not team names or other text
                const jobTitleElements = jobListRef.current.querySelectorAll('[data-job-title]')
                if (jobTitleElements.length > 0) {
                    // Convert NodeListOf<Element> to HTMLElement array
                    const elements = Array.from(jobTitleElements) as HTMLElement[]
                    markedRef.current = new Mark(elements)
                    markedRef.current.mark(searchQuery, {
                        separateWordSearch: false,
                        accuracy: 'partially',
                    })
                }
            } else if (markedRef.current) {
                markedRef.current.unmark()
            }
        }, [searchQuery])

        // Handle ESC key to clear search
        const handleSearchKeyDown = useCallback(
            (e: React.KeyboardEvent) => {
                if (e.key === 'Escape') {
                    setSearchQuery('')
                    if (markedRef.current) {
                        markedRef.current.unmark()
                    }
                }
            },
            [setSearchQuery]
        )

        // Handle clear search button
        const handleClearSearch = useCallback(() => {
            setSearchQuery('')
            if (markedRef.current) {
                markedRef.current.unmark()
            }
        }, [setSearchQuery])

        // Cleanup highlighting on unmount
        useEffect(() => {
            return () => {
                if (markedRef.current) {
                    markedRef.current.unmark()
                }
            }
        }, [])

        return (
            <ScrollArea className="h-full">
                {/* Search input */}
                <div className="mb-4">
                    <OSInput
                        type="text"
                        label="Search roles"
                        showLabel={false}
                        placeholder="Search roles..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyDown={handleSearchKeyDown}
                        onClear={handleClearSearch}
                        showClearButton={true}
                        size="sm"
                        width="full"
                        name="job-search"
                    />
                </div>

                {/* Job list */}
                <div ref={jobListRef}>
                    {searchQuery.trim() ? (
                        // Show search results
                        <>
                            <h3 className="text-sm font-normal px-1.5 text-secondary pb-1 mt-0 mb-1 border-b border-primary tracking-normal">
                                {filteredJobs.length} search result{filteredJobs.length !== 1 ? 's' : ''}
                            </h3>
                            {filteredJobs.length > 0 ? (
                                <ul className="list-none p-0 space-y-px">
                                    {filteredJobs.map((job: any) => {
                                        const isCurrentJob = job.fields.slug === slug
                                        return (
                                            <li key={job.fields.title} className="p-0">
                                                <OSButton
                                                    size="sm"
                                                    align="left"
                                                    width="full"
                                                    active={isCurrentJob}
                                                    onClick={() => navigate(job.fields.slug)}
                                                >
                                                    <div className="flex flex-col w-full items-start">
                                                        <span data-job-title className="font-semibold text-[14px]">
                                                            {job.fields.title.split(' - ')[0]}
                                                        </span>
                                                        {!hideTeamsByJob.includes(job.fields?.title) && (
                                                            <span className="text-[12px] text-secondary !font-normal">
                                                                {(() => {
                                                                    const teamsField = job.parent?.customFields?.find(
                                                                        (field: { title: string }) =>
                                                                            field.title === 'Teams'
                                                                    )
                                                                    const teams = teamsField
                                                                        ? JSON.parse(teamsField.value)
                                                                        : []
                                                                    return teams.length > 1
                                                                        ? 'Multiple teams'
                                                                        : teams.length === 1 && `${teams[0]} Team`
                                                                })()}
                                                            </span>
                                                        )}
                                                    </div>
                                                </OSButton>
                                            </li>
                                        )
                                    })}
                                </ul>
                            ) : (
                                <p className="text-secondary text-sm px-1.5 py-2 italic">
                                    No roles found matching "{searchQuery}"
                                </p>
                            )}
                        </>
                    ) : (
                        // Show grouped results
                        jobGroups.map((group) => (
                            <div key={group.name} className="mb-2 last:mb-0">
                                <h3 className="text-sm font-normal px-1.5 text-secondary pb-1 mt-0 mb-1 border-b border-primary tracking-normal">
                                    {group.name}
                                </h3>
                                <ul className="list-none p-0 space-y-px">
                                    {group.jobs.map((job: any) => {
                                        const isCurrentJob = job.fields.slug === slug
                                        return (
                                            <li key={job.fields.title} className="p-0">
                                                <OSButton
                                                    size="sm"
                                                    align="left"
                                                    width="full"
                                                    active={isCurrentJob}
                                                    onClick={() => navigate(job.fields.slug)}
                                                >
                                                    <div className="flex flex-col w-full items-start">
                                                        <span data-job-title className="font-semibold text-[14px]">
                                                            {job.fields.title.split(' - ')[0]}
                                                        </span>
                                                        {!hideTeamsByJob.includes(job.fields?.title) && (
                                                            <span className="text-[12px] text-secondary !font-normal">
                                                                {(() => {
                                                                    const teamsField = job.parent?.customFields?.find(
                                                                        (field: { title: string }) =>
                                                                            field.title === 'Teams'
                                                                    )
                                                                    const teams = teamsField
                                                                        ? JSON.parse(teamsField.value)
                                                                        : []
                                                                    return teams.length > 1
                                                                        ? 'Multiple teams'
                                                                        : teams.length === 1 && `${teams[0]} Team`
                                                                })()}
                                                            </span>
                                                        )}
                                                    </div>
                                                </OSButton>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        ))
                    )}
                </div>
            </ScrollArea>
        )
    }
)

LeftSidebarContent.displayName = 'LeftSidebarContent'

export default function Job({
    data: {
        teams,
        objectives,
        mission,
        allJobPostings,
        ashbyJobPosting: {
            departmentName,
            info,
            id,
            parent,
            fields: { tableOfContents, html, title, slug, locations },
        },
    },
    pageContext: { gitHubIssues },
}: JobProps) {
    // State variables
    const [showTableOfContents, setShowTableOfContents] = useState(false)
    const [parsedContent, setParsedContent] = useState<ParsedContentItem[]>([])
    const [searchQuery, setSearchQuery] = useState('')

    // Extract data from props
    const timezone = parent?.customFields?.find(({ title }: { title: string }) => title === 'Timezone(s)')?.value
    const salaryRole = parent?.customFields?.find(({ title }: { title: string }) => title === 'Salary')?.value || title
    const missionAndObjectives = parent?.customFields?.find(
        ({ title }: { title: string }) => title === 'Mission & objectives'
    )?.value
    const showObjectives = missionAndObjectives !== 'false'
    // Group jobs by role grouping
    const jobGroups = useMemo(() => {
        const groups: { [key: string]: any[] } = {}

        allJobPostings.nodes.forEach((job: any) => {
            const roleGroupingField = job.parent?.customFields?.find(
                (field: { title: string }) => field.title === 'Role grouping'
            )
            const groupName = roleGroupingField?.value || 'Other'

            if (!groups[groupName]) {
                groups[groupName] = []
            }
            groups[groupName].push(job)
        })

        // Sort groups according to custom order
        const sortedGroupNames = Object.keys(groups).sort((a, b) => {
            if (a === 'Other') return 1
            if (b === 'Other') return -1

            const aIndex = roleGroupingOrder.indexOf(a)
            const bIndex = roleGroupingOrder.indexOf(b)

            if (aIndex !== -1 && bIndex !== -1) {
                return aIndex - bIndex
            }
            if (aIndex !== -1) return -1
            if (bIndex !== -1) return 1
            return a.localeCompare(b)
        })

        // Apply custom sorting within each group
        sortedGroupNames.forEach((groupName) => {
            const groupJobs = groups[groupName]

            // Move Product Engineer to the front
            const productEngineerIndex = groupJobs.findIndex((job) => job.fields.title === 'Product Engineer')
            if (productEngineerIndex !== -1) {
                const [productEngineerJob] = groupJobs.splice(productEngineerIndex, 1)
                groupJobs.unshift(productEngineerJob)
            }

            // Move Speculative application to the end
            const speculativeIndex = groupJobs.findIndex((job) => job.fields.title === 'Speculative application')
            if (speculativeIndex !== -1) {
                const [speculativeJob] = groupJobs.splice(speculativeIndex, 1)
                groupJobs.push(speculativeJob)
            }
        })

        return sortedGroupNames.map((groupName) => ({
            name: groupName,
            jobs: groups[groupName],
        }))
    }, [allJobPostings.nodes])

    // Get all jobs in a flat array
    const allJobs = useMemo(() => {
        return jobGroups.flatMap((group) => group.jobs)
    }, [jobGroups])

    // Filter jobs based on search query - only search job titles
    const filteredJobs = useMemo(() => {
        if (!searchQuery.trim()) return []

        const query = searchQuery.toLowerCase()
        return allJobs.filter((job: any) => {
            // Only search in job title
            return job.fields.title.toLowerCase().includes(query)
        })
    }, [searchQuery, allJobs])

    const multipleTeams = teams?.nodes?.length > 1
    const teamName = multipleTeams ? 'Multiple teams' : teams?.nodes?.[0]?.name ? `${teams?.nodes?.[0]?.name} Team` : ''

    const [jobTitle] = title.split(' - ')

    // Parse HTML content to extract details blocks
    useEffect(() => {
        if (html) {
            // Filter out unwanted content
            const filteredHtml = html.replace('<p><em>#LI-DNI</em></p>', '').replace('<p>#LI-DNI</p>', '')

            const parser = new DOMParser()
            const doc = parser.parseFromString(filteredHtml, 'text/html')
            const detailsElements = doc.querySelectorAll('details')

            if (detailsElements.length > 0) {
                const accordionItems = Array.from(detailsElements).map((details, index) => {
                    const summary = details.querySelector('summary')
                    const title = summary?.textContent || `Section ${index + 1}`

                    // Clone the details element and remove the summary
                    const contentClone = details.cloneNode(true) as HTMLElement
                    const summaryToRemove = contentClone.querySelector('summary')
                    summaryToRemove?.remove()

                    // Create a unique ID for this section
                    const sectionId = `content-section-${index}`

                    return {
                        value: sectionId,
                        trigger: (
                            <h3 className="!m-0" id={sectionId}>
                                {title}
                            </h3>
                        ),
                        content: <div dangerouslySetInnerHTML={{ __html: contentClone.innerHTML }} />,
                        title: title, // Store title for TOC mapping
                    }
                })
                setParsedContent(accordionItems)
            }
        }
    }, [html])

    const jobTableOfContents = useMemo(() => {
        // Replace the original table of contents entries with accordion section references
        const tocWithAccordions = tableOfContents.map((item: TableOfContentsItem) => {
            // Find if this TOC item matches an accordion section
            const accordionItem = parsedContent.find((content: ParsedContentItem) => content.title === item.value)

            if (accordionItem) {
                // This is an accordion section, update the URL to point to the accordion
                return {
                    ...item,
                    url: `#${accordionItem.value}`,
                    isAccordion: true,
                }
            }

            return item
        })

        return [
            ...tocWithAccordions,
            ...(sfBenchmark[salaryRole] ? [{ value: 'Salary', url: '#salary', depth: 0 }] : []),
            { value: 'Benefits', url: '#benefits', depth: 0 },
            ...(gitHubIssues.length > 0 ? [{ value: 'Typical tasks', url: '#typical-tasks', depth: 0 }] : []),
            ...(!multipleTeams && showObjectives && objectives
                ? [{ value: "Your team's mission and objectives", url: '#mission-objectives', depth: 0 }]
                : []),
            { value: 'Interview process', url: '#interview-process', depth: 0 },
            { value: 'Apply', url: '#apply', depth: 0 },
        ]
    }, [tableOfContents, parsedContent, salaryRole, gitHubIssues, multipleTeams, showObjectives, objectives])

    return (
        <>
            <SEO
                title={`${title} - PostHog`}
                image={`${process.env.GATSBY_CLOUDFRONT_OG_URL}/${slug.replace(/\//g, '')}.jpeg`}
                imageType="absolute"
            />
            <ReaderView
                title={jobTitle}
                tableOfContents={[]} // Hide built-in TOC
                leftSidebar={
                    <LeftSidebarContent
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        filteredJobs={filteredJobs}
                        jobGroups={jobGroups}
                        slug={slug}
                        navigate={navigate}
                    />
                }
                parent={companyMenu}
                showQuestions={false}
            >
                {/* Floating TOC Button */}
                <div className="fixed bottom-4 right-4 z-20">
                    <Popover
                        trigger={
                            <span className="[&>span>div]:rounded-full">
                                <Tooltip
                                    trigger={
                                        <OSButton
                                            icon={<IconList />}
                                            size="lg"
                                            className="size-10 p-1 rounded-full border shadow-lg bg-primary border-primary hover:bg-accent active:bg-accent hover:border-input"
                                        />
                                    }
                                    delay={0}
                                    sideOffset={12}
                                >
                                    Table of contents
                                </Tooltip>
                            </span>
                        }
                        dataScheme="primary"
                        contentClassName="w-64"
                        sideOffset={10}
                        open={showTableOfContents}
                        onOpenChange={setShowTableOfContents}
                    >
                        <ul className="not-prose grid list-none m-0 p-0">
                            {jobTableOfContents.map((item) => (
                                <li key={item.url}>
                                    <button
                                        className="font-semibold text-sm hover:underline block p-1 w-full text-left"
                                        onClick={() => {
                                            setShowTableOfContents(false)

                                            // Get the element ID from the URL (remove the #)
                                            const elementId = item.url.substring(1)

                                            // Find the element by ID
                                            const el = document.getElementById(elementId)
                                            if (el) {
                                                el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                            }
                                        }}
                                    >
                                        {item.value}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </Popover>
                </div>

                <div className="space-y-8">
                    <div>
                        {teamName && <p className="m-0 text-secondary pb-2">{teamName}</p>}
                        <ul className="list-none m-0 p-0 md:items-center text-black/50 dark:text-white/50 mt-6 flex md:flex-row flex-col md:space-x-12 md:space-y-0 space-y-6">
                            {/*                         
                            {departmentName?.toLowerCase() !== 'speculative' && (
                                <Detail title="Department" value={departmentName} icon={<Department />} />
                            )} */}

                            <Detail
                                title="Location"
                                value={`Remote${locations?.length > 0 ? ` (${locations.join(', ')})` : ''}`}
                                icon={<Location />}
                            />
                            {timezone && <Detail title="Timezone(s)" value={timezone} icon={<Timezone />} />}
                        </ul>
                    </div>

                    {/* Main content with sidebar layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            {/* Show parsed content in accordion if available, otherwise show raw HTML */}
                            {parsedContent.length > 0 ? (
                                <div>
                                    {parsedContent.map((item) => (
                                        <div key={item.value} id={item.value}>
                                            <Accordion
                                                skin={false}
                                                items={[item]}
                                                type="single"
                                                defaultValue={item.value}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: html
                                            .replace('<p><em>#LI-DNI</em></p>', '')
                                            .replace('<p>#LI-DNI</p>', ''),
                                    }}
                                />
                            )}
                        </div>

                        {/* Right sidebar with team info */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-4">
                                <h2 className="mt-0 mb-2 leading-tight text-base text-center">
                                    {teams?.nodes?.length > 0
                                        ? multipleTeams
                                            ? 'Teams hiring for this role'
                                            : 'Meet your team'
                                        : 'About this team'}
                                </h2>

                                <TeamsSidebar
                                    teams={teams?.nodes || []}
                                    multipleTeams={multipleTeams}
                                    isCompact={true}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="max-w-4xl">
                        <div>
                            {sfBenchmark[salaryRole] && (
                                <div id="salary">
                                    <Accordion
                                        skin={false}
                                        items={[
                                            {
                                                value: 'salary',
                                                trigger: <h2 className="!m-0">Salary</h2>,
                                                content: (
                                                    <>
                                                        <p>
                                                            We have a set system for compensation as part of being
                                                            transparent. Salary varies based on location and level of
                                                            experience.
                                                        </p>
                                                        <p>
                                                            <Link
                                                                to="/handbook/people/compensation"
                                                                state={{ newWindow: true }}
                                                            >
                                                                Learn more about compensation
                                                            </Link>
                                                        </p>
                                                        <div className="mb-6">
                                                            <CompensationCalculator hideRole initialJob={salaryRole} />
                                                        </div>
                                                    </>
                                                ),
                                            },
                                        ]}
                                        defaultValue="salary"
                                    />
                                </div>
                            )}
                            <div id="benefits">
                                <Accordion
                                    skin={false}
                                    items={[
                                        {
                                            value: 'benefits',
                                            trigger: <h2 className="!m-0">Benefits</h2>,
                                            content: (
                                                <>
                                                    <ul className="list-none m-0 p-0 pb-4 grid md:grid-cols-2 grid-cols-1 gap-6">
                                                        {benefits.map(({ title, image }) => {
                                                            return (
                                                                <li
                                                                    key={title}
                                                                    className="flex space-x-3 items-center font-medium leading-tight text-[15px]"
                                                                >
                                                                    <img
                                                                        className="max-w-[30px]"
                                                                        alt={title}
                                                                        src={image}
                                                                    />
                                                                    <span>{title}</span>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                    <p>
                                                        Get more details about all our benefits on the{' '}
                                                        <Link to="/careers#benefits" state={{ newWindow: true }}>
                                                            Careers page
                                                        </Link>
                                                        .
                                                    </p>
                                                </>
                                            ),
                                        },
                                    ]}
                                    defaultValue="benefits"
                                />
                            </div>
                            {gitHubIssues.length > 0 && (
                                <div id="typical-tasks">
                                    <Accordion
                                        skin={false}
                                        items={[
                                            {
                                                value: 'typical-tasks',
                                                trigger: <h2 className="!m-0">Typical tasks</h2>,
                                                content: (
                                                    <div className="mb-2">
                                                        <p>Here are some open GitHub issues you could help solve:</p>
                                                        <ul className="list-none !m-0 p-0 grid gap-y-4">
                                                            {gitHubIssues.map(
                                                                ({ url, number, title, labels }: GitHubIssue) => {
                                                                    return (
                                                                        <li key={title} className="flex flex-col ">
                                                                            <div className="flex space-x-2">
                                                                                <Link
                                                                                    to={url}
                                                                                    className="block w-[60px] md:w-auto"
                                                                                >
                                                                                    <span className="font-semibold text-sm text-black/50 hover:text-black/75 dark:text-white/50 dark:hover:text-white/75 font-code">
                                                                                        #{number}
                                                                                    </span>
                                                                                </Link>
                                                                                <Link to={url} external>
                                                                                    {title}
                                                                                </Link>
                                                                            </div>
                                                                            {labels && labels.length > 0 && (
                                                                                <ul className="list-none !ml-[calc(60px+.25rem)] md:!ml-14 !mt-0 !mb-0 p-0 flex items-center space-x-1">
                                                                                    {labels.map(
                                                                                        (
                                                                                            { name, url },
                                                                                            index: number
                                                                                        ) => {
                                                                                            return (
                                                                                                <li key={name + index}>
                                                                                                    <Link
                                                                                                        className="transition-all text-sm rounded-sm py-1 px-[5px] bg-blue/10 hover:bg-blue/20 text-blue hover:text-blue dark:bg-white/10 dark:hover:bg-white/30 dark:text-white/75 dark:hover:text-white/100"
                                                                                                        to={url}
                                                                                                    >
                                                                                                        {name}
                                                                                                    </Link>
                                                                                                </li>
                                                                                            )
                                                                                        }
                                                                                    )}
                                                                                </ul>
                                                                            )}
                                                                        </li>
                                                                    )
                                                                }
                                                            )}
                                                        </ul>
                                                    </div>
                                                ),
                                            },
                                        ]}
                                        defaultValue="typical-tasks"
                                    />
                                </div>
                            )}
                            {!multipleTeams && showObjectives && objectives && (
                                <div id="mission-objectives">
                                    <Accordion
                                        skin={false}
                                        items={[
                                            {
                                                value: 'mission-objectives',
                                                trigger: <h2 className="!m-0">Your team's mission and objectives</h2>,
                                                content: (
                                                    <div className="mb-6">
                                                        {mission?.body && (
                                                            <MDXProvider
                                                                components={{
                                                                    HideFromJobPosting: () => null,
                                                                    TeamMember,
                                                                }}
                                                            >
                                                                <MDXRenderer>{mission.body}</MDXRenderer>
                                                            </MDXProvider>
                                                        )}
                                                        <MDXProvider
                                                            components={{ HideFromJobPosting: () => null, TeamMember }}
                                                        >
                                                            <MDXRenderer>{objectives.body}</MDXRenderer>
                                                        </MDXProvider>
                                                    </div>
                                                ),
                                            },
                                        ]}
                                        defaultValue="mission-objectives"
                                    />
                                </div>
                            )}
                            <div id="interview-process">
                                <Accordion
                                    skin={false}
                                    items={[
                                        {
                                            value: 'interview-process',
                                            trigger: <h2 className="!m-0">Interview process</h2>,
                                            content: (
                                                <div className="mb-6">
                                                    <p>
                                                        We do 2-3 short interviews, then pay you to do some real-life
                                                        (or close to real-life) work.
                                                    </p>
                                                    <InterviewProcess role={title} inApplicationProcess />
                                                </div>
                                            ),
                                        },
                                    ]}
                                    defaultValue="interview-process"
                                />
                            </div>
                            <div id="apply">
                                <Accordion
                                    skin={false}
                                    items={[
                                        {
                                            value: 'apply',
                                            trigger: <h2 className="!m-0">Apply</h2>,
                                            content: (
                                                <div className="mb-6">
                                                    <Apply id={id} info={info} />
                                                </div>
                                            ),
                                        },
                                    ]}
                                    defaultValue="apply"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </ReaderView>
        </>
    )
}

export const query = graphql`
    query JobQuery($id: String!, $objectives: String!, $mission: String!, $teams: [String]) {
        ashbyJobPosting(id: { eq: $id }) {
            id
            departmentName
            fields {
                tableOfContents {
                    value
                    url
                    depth
                }
                html
                title
                slug
                locations
            }
            parent {
                ... on AshbyJob {
                    customFields {
                        value
                        title
                    }
                }
            }
            info {
                descriptionHtml
                applicationFormDefinition {
                    sections {
                        fields {
                            isRequired
                            descriptionPlain
                            field {
                                type
                                title
                                isNullable
                                path
                                selectableValues {
                                    label
                                    value
                                }
                            }
                        }
                    }
                }
            }
        }
        allJobPostings: allAshbyJobPosting {
            nodes {
                departmentName
                fields {
                    title
                    slug
                }
                parent {
                    ... on AshbyJob {
                        customFields {
                            value
                            title
                        }
                    }
                }
            }
        }
        objectives: mdx(fields: { slug: { eq: $objectives } }) {
            body
        }
        mission: mdx(fields: { slug: { eq: $mission } }) {
            body
        }
        teams: allSqueakTeam(filter: { name: { in: $teams } }) {
            nodes {
                id
                name
                slug
                description
                crest {
                    data {
                        attributes {
                            url
                        }
                    }
                }
                crestOptions {
                    textColor
                    textShadow
                    fontSize
                    frame
                    frameColor
                    plaque
                    plaqueColor
                    imageScale
                    imageXOffset
                    imageYOffset
                }
                leadProfiles {
                    data {
                        id
                    }
                }
                profiles {
                    data {
                        id
                        attributes {
                            country
                            firstName
                            lastName
                            pineappleOnPizza
                            location
                            color
                            companyRole
                            leadTeams {
                                data {
                                    attributes {
                                        name
                                    }
                                }
                            }
                            avatar {
                                data {
                                    attributes {
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

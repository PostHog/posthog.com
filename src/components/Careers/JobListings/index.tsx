import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Link from 'components/Link'
import { Department, Location, Timezone } from 'components/NotProductIcons'
import { CallToAction } from 'components/CallToAction'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { slugifyTeamName } from 'lib/utils'
import OSButton from 'components/OSButton'
import { TeamsSidebar } from 'components/Job/TeamsSidebar'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import CloudinaryImage from 'components/CloudinaryImage'
import Mark from 'mark.js'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { useWindow } from '../../../context/Window'
import { OSInput } from 'components/OSForm'

const query = graphql`
    query JobListings {
        allAshbyJobPosting(filter: { isListed: { eq: true } }) {
            jobs: nodes {
                fields {
                    title
                    slug
                    html
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
                externalLink
                departmentName
                info {
                    descriptionHtml
                }
            }
            departments: group(field: departmentName) {
                title: fieldValue
            }
        }
        allTeams: allSqueakTeam {
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
                            companyRole
                            location
                            startDate
                            pineappleOnPizza
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
                            color
                        }
                    }
                }
            }
        }
    }
`

const Detail = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) => {
    return (
        <li className="flex space-x-2 mr-4 @2xl:mr-8">
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

const hideTeamsByJob = ['Technical ex-founder', 'Speculative application']

// Fallback team data for roles without teams
const fallbackTeam = {
    name: 'Mystery',
    description:
        "This role hasn't been assigned to a team yet. You'll be placed on a team that match your skills and interests.",
    crest: {
        data: {
            attributes: {
                url: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1730806654/exec_8be5c3a342.png',
            },
        },
    },
    crestOptions: {
        textColor: 'brown',
        textShadow: 'Light',
        frame: 'square',
        plaque: 'stepped',
        imageXOffset: -5,
        imageYOffset: -10,
        imageScale: 90,
        frameColor: 'burntOrange',
        plaqueColor: 'white',
    },
    profiles: { data: [] },
}

// Add custom ordering for role groupings - modify this array to change the order
const roleGroupingOrder = [
    'Engineering',
    'Product',
    'Design',
    'Marketing',
    'Sales',
    'Operations',
    // Add more groupings as needed, or pass this as a prop
]

const getTeamLeadName = (team: any) => {
    if (!team.leadProfiles?.data?.length) return 'No team lead assigned'

    const leadId = team.leadProfiles.data[0].id
    const leadProfile = team.profiles?.data?.find((profile: any) => profile.id === leadId)

    if (leadProfile) {
        return [leadProfile.attributes.firstName, leadProfile.attributes.lastName].filter(Boolean).join(' ')
    }

    return 'Team lead not found'
}

const getTeamLeadInfo = (team: any) => {
    if (!team.leadProfiles?.data?.length) return null

    const leadId = team.leadProfiles.data[0].id
    const leadProfile = team.profiles?.data?.find((profile: any) => profile.id === leadId)

    if (!leadProfile) return null

    const { firstName, location, country, startDate } = leadProfile.attributes

    if (!firstName || !location || !country || !startDate) return null

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
        })
    }

    return `${firstName} joined in ${formatDate(startDate)} and lives in ${location}, ${country}.`
}

export const JobListings = ({ embedded = false }: { embedded?: boolean }) => {
    const {
        allAshbyJobPosting: { departments, jobs: originalJobs },
        allTeams: { nodes: allTeams },
    } = useStaticQuery(query)

    const { appWindow } = useWindow()
    const [searchQuery, setSearchQuery] = useState('')
    const [leftColHeight, setLeftColHeight] = useState<string | number>('auto')
    const jobListRef = useRef<HTMLDivElement>(null)
    const markedRef = useRef<Mark | null>(null)
    const leftColRef = useRef<HTMLDivElement>(null)
    const rightColRef = useRef<HTMLDivElement>(null)
    const jobGroups = useMemo(() => {
        // Group jobs by "Role grouping" custom field
        const groups: { [key: string]: any[] } = {}

        originalJobs.forEach((job: any) => {
            const roleGroupingField = job.parent.customFields.find(
                (field: { title: string }) => field.title === 'Role grouping'
            )
            const groupName = roleGroupingField?.value || 'Other'

            if (!groups[groupName]) {
                groups[groupName] = []
            }
            groups[groupName].push(job)
        })

        // Sort groups according to custom order, with "Other" always last
        const sortedGroupNames = Object.keys(groups).sort((a, b) => {
            if (a === 'Other') return 1
            if (b === 'Other') return -1

            const aIndex = roleGroupingOrder.indexOf(a)
            const bIndex = roleGroupingOrder.indexOf(b)

            // If both are in the custom order, sort by that order
            if (aIndex !== -1 && bIndex !== -1) {
                return aIndex - bIndex
            }
            // If only one is in the custom order, prioritize it
            if (aIndex !== -1) return -1
            if (bIndex !== -1) return 1
            // If neither is in the custom order, sort alphabetically
            return a.localeCompare(b)
        })

        // Apply custom sorting within each group
        sortedGroupNames.forEach((groupName) => {
            const groupJobs = groups[groupName]

            // Move Product Engineer to the front of its group
            const productEngineerIndex = groupJobs.findIndex((job) => job.fields.title === 'Product Engineer')
            if (productEngineerIndex !== -1) {
                const [productEngineerJob] = groupJobs.splice(productEngineerIndex, 1)
                groupJobs.unshift(productEngineerJob)
            }

            // Move Speculative application to the end of its group
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
    }, [originalJobs])

    // Get all jobs in a flat array for compatibility with existing logic
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

    // Calculate the total number of team positions (not just unique roles)
    const totalPositions = useMemo(() => {
        const uniqueRoles = new Map()

        allJobs.forEach((job: any) => {
            const jobTitle = job.fields.title
            if (!uniqueRoles.has(jobTitle)) {
                const teamsField = job.parent.customFields.find((field: { title: string }) => field.title === 'Teams')
                const teams = teamsField ? JSON.parse(teamsField.value) : []
                // Count the number of teams hiring for this role (minimum 1)
                uniqueRoles.set(jobTitle, Math.max(teams.length, 1))
            }
        })

        // Sum up all the team positions
        return Array.from(uniqueRoles.values()).reduce((sum, count) => sum + count, 0)
    }, [allJobs])

    if (!allJobs?.length) {
        return null
    }

    const [selectedJob, setSelectedJob] = useState(allJobs[0])
    const [processedHtml, setProcessedHtml] = useState('')
    const [websiteDescription, setWebsiteDescription] = useState('')
    const teamsField = selectedJob.parent.customFields.find((field: { title: string }) => field.title === 'Teams')
    const teams = teamsField
        ? JSON.parse(teamsField.value).filter((teamName: string) =>
              allTeams.some((team: any) => team.name.toLowerCase() === teamName.toLowerCase())
          )
        : []
    const [selectedTeamName, setSelectedTeamName] = useState('')

    // Compute the current team name - either the selected one or default to first team
    const currentTeamName = selectedTeamName || teams[0] || ''
    const selectedTeam = allTeams.find((team: any) => team.name.toLowerCase() === currentTeamName.toLowerCase())

    const [isLoading, setIsLoading] = useState(true)

    // Handle search input
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchQuery(value)

        // Apply highlighting after a brief delay
        setTimeout(() => {
            if (jobListRef.current && value.trim()) {
                if (markedRef.current) {
                    markedRef.current.unmark()
                }
                // Only highlight job titles, not team names or other text
                const jobTitleElements = jobListRef.current.querySelectorAll('[data-job-title]')
                if (jobTitleElements.length > 0) {
                    // Convert NodeListOf<Element> to HTMLElement array
                    const elements = Array.from(jobTitleElements) as HTMLElement[]
                    markedRef.current = new Mark(elements)
                    markedRef.current.mark(value, {
                        separateWordSearch: false,
                        accuracy: 'partially',
                    })
                }
            } else if (markedRef.current) {
                markedRef.current.unmark()
            }
        }, 100)
    }

    // Handle ESC key to clear search
    const handleSearchKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setSearchQuery('')
            if (markedRef.current) {
                markedRef.current.unmark()
            }
        }
    }

    // Handle clear search button
    const handleClearSearch = () => {
        setSearchQuery('')
        if (markedRef.current) {
            markedRef.current.unmark()
        }
    }

    useEffect(() => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(selectedJob.fields.html, 'text/html')

        const theRole = doc.querySelector('details:has(h2[id="the-role"])')
        const whoWereLookingFor = doc.querySelector('details:has(h2[id="who-we\'re-looking-for"])')
        const whatYoullBeDoing = doc.querySelector('details:has(h2[id="what-you\'ll-be-doing"])')
        const requirements = doc.querySelector('details:has(h2[id="requirements"])')
        const niceToHave = doc.querySelector('details:has(h2[id="nice-to-have"])')

        let content = ''
        if (theRole) {
            content = theRole.outerHTML
        } else if (whoWereLookingFor) {
            content = whoWereLookingFor.outerHTML
        } else if (whatYoullBeDoing) {
            content = whatYoullBeDoing.outerHTML
        } else if (requirements) {
            content = requirements.outerHTML + (niceToHave ? `<h3>Nice to have</h3>${niceToHave.outerHTML}` : '')
        }

        // Filter out unwanted content
        content = content
            .replace(
                "<p><em>If you have a disability, please let us know if there's any way we can make the interview process better for you - we're happy to accommodate! </em></p>",
                ''
            )
            .replace('<p><em>#LI-DNI</em></p>', '')
            .replace('<p>#LI-DNI</p>', '')

        setProcessedHtml(content)
        setSelectedTeamName('')

        const websiteDescField = selectedJob.parent.customFields.find(
            (field: { title: string }) => field.title === 'Website description'
        )
        setWebsiteDescription(websiteDescField ? websiteDescField.value : '')

        setIsLoading(false)
    }, [selectedJob])

    // Cleanup highlighting on unmount
    useEffect(() => {
        return () => {
            if (markedRef.current) {
                markedRef.current.unmark()
            }
        }
    }, [])

    useEffect(() => {
        const updateLeftColHeight = () => {
            if (leftColRef.current) {
                if (appWindow?.size.width < 672) {
                    setLeftColHeight('auto')
                } else {
                    setTimeout(() => {
                        setLeftColHeight(rightColRef.current?.clientHeight)
                    }, 0)
                }
            }
        }
        updateLeftColHeight()
    }, [selectedJob, appWindow?.size])

    const imagePositioning =
        'absolute @3xl:top-1/2 @3xl:left-1/2  opacity-100 @sm:opacity-80 @md:opacity-100 transition-all duration-300 @2xl:scale-75 @3xl:scale-90 @4xl:scale-100 @5xl:scale-110'

    return (
        <section
            id={embedded ? undefined : 'roles'}
            className={` ${embedded ? '' : 'flex flex-col @2xl:flex-row @2xl:gap-6 items-start'}`}
        >
            <div
                ref={leftColRef}
                style={{ height: leftColHeight }}
                className="w-full @2xl:w-1/3 @3xl:w-1/4 flex flex-col h-full"
            >
                <ScrollArea fadeOverflow={16} viewportClasses="role-search !pb-0 @2xl:!pb-16">
                    <div>
                        <label htmlFor="job-select" className="block @2xl:hidden font-bold mb-1 text-center">
                            Select a role
                        </label>
                        <select
                            className="block @2xl:hidden w-full p-2 border border-primary rounded text-xl font-bold relative z-10 mb-2"
                            value={selectedJob.fields.title}
                            onChange={(e) => {
                                const selectedJobTitle = e.target.value
                                const job = (searchQuery.trim() ? filteredJobs : allJobs).find(
                                    (job: any) => job.fields.title === selectedJobTitle
                                )
                                setSelectedJob(job)
                            }}
                        >
                            {searchQuery.trim() ? (
                                // Show search results
                                filteredJobs.length > 0 ? (
                                    <optgroup
                                        label={`${filteredJobs.length} result${filteredJobs.length !== 1 ? 's' : ''}`}
                                    >
                                        {filteredJobs.map((job: any) => (
                                            <option key={job.fields.title} value={job.fields.title}>
                                                {job.fields.title}
                                            </option>
                                        ))}
                                    </optgroup>
                                ) : (
                                    <optgroup label="No results found">
                                        <option disabled>No roles found matching "{searchQuery}"</option>
                                    </optgroup>
                                )
                            ) : (
                                // Show grouped results
                                jobGroups.map((group) => (
                                    <optgroup key={group.name} label={group.name}>
                                        {group.jobs.map((job: any) => (
                                            <option key={job.fields.title} value={job.fields.title}>
                                                {job.fields.title}
                                            </option>
                                        ))}
                                    </optgroup>
                                ))
                            )}
                        </select>

                        <div className="hidden @2xl:block mb-4">
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
                    </div>

                    <div data-scheme="primary" className="hidden @2xl:block flex-1">
                        <ScrollArea className="h-full min-h-0">
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
                                                    return (
                                                        <li key={job.fields.title} className="p-0">
                                                            <OSButton
                                                                size="md"
                                                                align="left"
                                                                width="full"
                                                                zoomHover="md"
                                                                active={selectedJob.fields.title === job.fields.title}
                                                                onClick={() => setSelectedJob(job)}
                                                            >
                                                                <div className="flex flex-col w-full items-start">
                                                                    <span
                                                                        data-job-title
                                                                        className={`font-semibold text-[15px] ${
                                                                            selectedJob.fields.title ===
                                                                            job.fields.title
                                                                                ? ''
                                                                                : ''
                                                                        }`}
                                                                    >
                                                                        {job.fields.title}
                                                                    </span>
                                                                    {!hideTeamsByJob.includes(job.fields?.title) && (
                                                                        <span className="text-[13px] text-secondary !font-normal">
                                                                            {(() => {
                                                                                const teamsField =
                                                                                    job.parent.customFields.find(
                                                                                        (field: { title: string }) =>
                                                                                            field.title === 'Teams'
                                                                                    )
                                                                                const teams = teamsField
                                                                                    ? JSON.parse(teamsField.value)
                                                                                    : []
                                                                                return teams.length > 1
                                                                                    ? 'Multiple teams'
                                                                                    : teams.length === 1 &&
                                                                                          `${teams[0]} Team`
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
                                                    return (
                                                        <li key={job.fields.title} className="p-0">
                                                            <OSButton
                                                                size="md"
                                                                align="left"
                                                                width="full"
                                                                zoomHover="md"
                                                                active={selectedJob.fields.title === job.fields.title}
                                                                className={` ${
                                                                    selectedJob.fields.title === job.fields.title
                                                                        ? ''
                                                                        : ''
                                                                }`}
                                                                onClick={() => setSelectedJob(job)}
                                                            >
                                                                <div className="flex flex-col w-full items-start">
                                                                    <span
                                                                        data-job-title
                                                                        className={`font-semibold text-[15px] ${
                                                                            selectedJob.fields.title ===
                                                                            job.fields.title
                                                                                ? ''
                                                                                : ''
                                                                        }`}
                                                                    >
                                                                        {job.fields.title}
                                                                    </span>
                                                                    {!hideTeamsByJob.includes(job.fields?.title) && (
                                                                        <span className="text-[13px] text-secondary !font-normal">
                                                                            {(() => {
                                                                                const teamsField =
                                                                                    job.parent.customFields.find(
                                                                                        (field: { title: string }) =>
                                                                                            field.title === 'Teams'
                                                                                    )
                                                                                const teams = teamsField
                                                                                    ? JSON.parse(teamsField.value)
                                                                                    : []
                                                                                return teams.length > 1
                                                                                    ? 'Multiple teams'
                                                                                    : teams.length === 1 &&
                                                                                          `${teams[0]} Team`
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
                    </div>
                </ScrollArea>
            </div>
            <div ref={rightColRef} className="flex-1 bg-primary flex flex-col">
                <div className="flex-1">
                    <h2 className="hidden @2xl:block -mt-1 mb-2">{selectedJob.fields.title}</h2>

                    <div className="grid grid-cols-1 @5xl:grid-cols-12 gap-8 items-start">
                        <div className="@5xl:col-span-7">
                            {teams.length > 1 && (
                                <p
                                    data-scheme="secondary"
                                    className="bg-primary py-2 px-4 border border-primary rounded-sm text-sm mt-0 mb-3"
                                >
                                    <strong>{teams.length} small teams are hiring for this role</strong>
                                </p>
                            )}

                            <ul className="list-none m-0 p-0 @2xl:items-center text-black/50 dark:text-white/50 flex flex-wrap items-start @2xl:flex-row ">
                                <Detail
                                    title="Location"
                                    value={`Remote${
                                        selectedJob.fields.locations?.length > 0
                                            ? ` (${selectedJob.fields.locations.join(', ')})`
                                            : ''
                                    }`}
                                    icon={<Location />}
                                />
                                {selectedJob.parent.customFields.find(
                                    (field: { title: string }) => field.title === 'Timezone(s)'
                                )?.value && (
                                    <Detail
                                        title="Timezone(s)"
                                        value={
                                            selectedJob.parent.customFields.find(
                                                (field: { title: string }) => field.title === 'Timezone(s)'
                                            ).value
                                        }
                                        icon={<Timezone />}
                                    />
                                )}
                            </ul>

                            <div className="@5xl:flex-1 [&_h3]:mt-0 mt-4">
                                <h3>Job summary</h3>

                                {isLoading ? (
                                    <div className="space-y-1 mb-3">
                                        <div className="bg-accent h-5 w-full rounded animate-pulse" />
                                        <div className="bg-accent h-5 w-[calc(100%-3rem)] rounded animate-pulse" />
                                        <div className="bg-accent h-5 w-[calc(100%-1rem)] rounded animate-pulse" />
                                        <div className="bg-accent h-5 w-72 max-w-full rounded animate-pulse" />
                                        <div className="md:hidden bg-accent h-5 w-60 max-w-full rounded animate-pulse" />
                                        <div className="md:hidden bg-accent h-5 w-36 max-w-full rounded animate-pulse" />
                                    </div>
                                ) : (
                                    <>
                                        {websiteDescription ? (
                                            <div className="mb-4">
                                                <p
                                                    className="text-[15px]"
                                                    dangerouslySetInnerHTML={{ __html: websiteDescription }}
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                dangerouslySetInnerHTML={{ __html: processedHtml }}
                                                className="[&_details]:!border-transparent [&_details_ul]:!pl-4 [&_details_ul]:!pr-0 [&_details]:!p-0 [&_details_p]:!px-0 [&_summary]:hidden [&_p]:text-[15px] [&_p]:mb-2 [&_ul_p]:pb-0 [&_ul_p]:mb-0 relative max-h-full overflow-hidden after:absolute after:inset-x-0 after:bottom-0 after:h-24 after:bg-gradient-to-b after:from-white/0 after:via-white/75 after:to-white dark:after:from-accent-dark/0 dark:after:via-accent-dark/75 dark:after:to-accent-dark"
                                            />
                                        )}
                                        {selectedJob.fields.title == 'Speculative application' && (
                                            <>
                                                <p className="text-[15px]">
                                                    We take exceptional people when they come along - and we really mean
                                                    that!
                                                </p>

                                                <p className="text-[15px]">
                                                    Don't see a specific role listed? That doesn't mean we won't have a
                                                    spot for you. Send us a speculative application and let us know how
                                                    you think you could contribute to PostHog.
                                                </p>
                                            </>
                                        )}
                                    </>
                                )}
                                <OSButton
                                    asLink
                                    to={selectedJob.fields.slug}
                                    size="md"
                                    variant="primary"
                                    state={{ newWindow: true }}
                                >
                                    Read more
                                </OSButton>
                            </div>
                        </div>
                        {(teams.length > 0 || !teams.length) && (
                            <div className="@container @5xl:col-span-5">
                                <h3 className="mt-0 mb-2 leading-tight text-center">
                                    {teams.length > 1
                                        ? 'About the small teams'
                                        : teams.length === 1
                                        ? `About the ${currentTeamName} Team`
                                        : 'About this team'}
                                </h3>
                                <div data-scheme="secondary" className={` ${teams.length > 1 ? '-mt-1' : ''}`}>
                                    <TeamsSidebar
                                        teams={teams}
                                        allTeams={allTeams}
                                        multipleTeams={teams.length > 1}
                                        isCompact={false}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

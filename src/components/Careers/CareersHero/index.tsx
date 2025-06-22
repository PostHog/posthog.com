import React, { useState, useEffect, useMemo } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Link from 'components/Link'
import { Department, Location, Timezone } from 'components/NotProductIcons'
import { CallToAction } from 'components/CallToAction'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { PineappleText, TeamMembers } from 'components/Job/Sidebar'
import slugify from 'slugify'
import { IconPineapple } from '@posthog/icons'
import { StickerPineapple, StickerPineappleNo, StickerPineappleYes } from 'components/Stickers/Index'
import TeamPatch from 'components/TeamPatch'
import { slugifyTeamName } from 'lib/utils'
import OSButton from 'components/OSButton'
import Tabs from 'components/RadixUI/Tabs'
import OSTabs from 'components/OSTabs'
import { DebugContainerQuery } from 'components/DebugContainerQuery'

const query = graphql`
    query CareersHero {
        allAshbyJobPosting(filter: { isListed: { eq: true } }) {
            jobs: nodes {
                fields {
                    title
                    slug
                    html
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

const hideTeamsByJob = ['Technical ex-founder', 'Speculative application']

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

const TeamInfoDisplay = ({ team, multipleTeams }: { team: any; multipleTeams: boolean }) => {
    const teamLength = team?.profiles?.data?.length
    const teamURL = team?.slug ? `/teams/${team.slug}` : `/teams/${slugifyTeamName(team?.name || '')}`
    const pineapplePercentage =
        teamLength &&
        teamLength > 0 &&
        Math.round(
            (team.profiles?.data?.filter(({ attributes: { pineappleOnPizza } }: any) => pineappleOnPizza).length /
                teamLength) *
                100
        )

    return (
        <div
            data-scheme="secondary"
            className={`${multipleTeams ? 'border border-primary rounded-md p-4 bg-primary' : ''}`}
        >
            <DebugContainerQuery />

            <div className="flex flex-col @lg:grid @lg:grid-cols-6 @lg:grid-rows-3 @3xl:grid-rows-2 gap-4">
                <div className="order-2 @lg:order-none col-start-1 row-start-2 @lg:col-span-4 @lg:col-start-auto @lg:row-span-2 @lg:row-start-auto @3xl:row-span-1 @lg:self-center">
                    <h3 className="text-sm font-bold mb-1">{team.name} Team</h3>
                    {team.description && <p className="text-sm text-secondary !mb-0">{team.description}</p>}
                </div>
                <div className="order-1 @lg:order-none col-start-1 row-start-1 @lg:col-span-2 @lg:col-start-5 @lg:row-span-2 @lg:row-start-auto @3xl:row-span-2 @lg:self-center @lg:justify-self-center">
                    <div className="w-36 @lg:w-full">
                        <Link to={teamURL}>
                            <TeamPatch
                                name={team.name}
                                imageUrl={team.crest?.data?.attributes?.url}
                                {...team.crestOptions}
                                className="w-full"
                            />
                        </Link>
                    </div>
                </div>
                <div className="order-3 @lg:order-none col-start-1 row-start-3 @lg:col-span-3 @lg:row-start-3 @3xl:col-span-2 @3xl:row-start-2">
                    <p className="text-sm font-semibold !mb-1">Team members</p>
                    <div className="flex justify-start">
                        <TeamMembers size="!size-16" profiles={team.profiles} />
                    </div>
                </div>
                <div className="order-4 @lg:order-none col-start-1 row-start-4 @lg:col-span-3 @lg:col-start- @lg:row-start-3 @3xl:col-span-2 @3xl:col-start-3 @3xl:row-start-2">
                    <p className="text-sm font-semibold !mb-1">Does pineapple belong on pizza?</p>
                    <div className="flex items-center gap-2">
                        <div className="w-10">
                            {pineapplePercentage > 50 ? (
                                <StickerPineappleYes className="size-10" />
                            ) : pineapplePercentage == 50 ? (
                                <StickerPineapple className="size-10" />
                            ) : (
                                <StickerPineappleNo className="size-10" />
                            )}
                        </div>
                        <div className="flex-1 text-[15px]">
                            {pineapplePercentage > 50 ? (
                                <>
                                    <strong>{pineapplePercentage}%</strong> of this team say{' '}
                                    <strong className="text-green">YES</strong>!
                                </>
                            ) : pineapplePercentage == 50 ? (
                                <>This team is evenly split. (You could break the tie!)</>
                            ) : (
                                <>
                                    <strong>{100 - pineapplePercentage}%</strong> of this team say{' '}
                                    <strong className="text-red">NO!</strong>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const CareersHero = () => {
    const {
        allAshbyJobPosting: { departments, jobs: originalJobs },
        allTeams: { nodes: allTeams },
    } = useStaticQuery(query)

    const jobs = useMemo(() => {
        const sortedJobs = [...originalJobs]

        const productEngineerIndex = sortedJobs.findIndex((job) => job.fields.title === 'Product Engineer')
        if (productEngineerIndex !== -1) {
            const [productEngineerJob] = sortedJobs.splice(productEngineerIndex, 1)
            sortedJobs.unshift(productEngineerJob)
        }

        const speculativeIndex = sortedJobs.findIndex((job) => job.fields.title === 'Speculative application')
        if (speculativeIndex !== -1) {
            const [speculativeJob] = sortedJobs.splice(speculativeIndex, 1)
            sortedJobs.push(speculativeJob)
        }

        return sortedJobs
    }, [originalJobs])

    if (!jobs?.length) {
        return null
    }

    const [selectedJob, setSelectedJob] = useState(jobs[0])
    const [processedHtml, setProcessedHtml] = useState('')
    const [websiteDescription, setWebsiteDescription] = useState('')
    const teamsField = selectedJob.parent.customFields.find((field: { title: string }) => field.title === 'Teams')
    const teams = teamsField ? JSON.parse(teamsField.value) : []
    const [selectedTeamName, setSelectedTeamName] = useState('')

    // Compute the current team name - either the selected one or default to first team
    const currentTeamName = selectedTeamName || teams[0] || ''
    const selectedTeam = allTeams.find((team: any) => team.name.toLowerCase() === currentTeamName.toLowerCase())

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(selectedJob.fields.html, 'text/html')

        const whoWereLookingFor = doc.querySelector('details:has(h2[id="who-we\'re-looking-for"])')
        const whatYoullBeDoing = doc.querySelector('details:has(h2[id="what-you\'ll-be-doing"])')
        const requirements = doc.querySelector('details:has(h2[id="requirements"])')

        let content = ''
        if (whoWereLookingFor) {
            content = whoWereLookingFor.outerHTML
        } else if (whatYoullBeDoing) {
            content = whatYoullBeDoing.outerHTML
        } else if (requirements) {
            content = requirements.outerHTML
        }

        setProcessedHtml(content)
        setSelectedTeamName('')

        const websiteDescField = selectedJob.parent.customFields.find(
            (field: { title: string }) => field.title === 'Website description'
        )
        setWebsiteDescription(websiteDescField ? websiteDescField.value : '')

        setIsLoading(false)
    }, [selectedJob])

    return (
        <>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">Who's hiring?</h1>
            <p className="mb-4 text-base">
                Our small teams are looking to add{' '}
                <strong className="whitespace-nowrap">{jobs.length} team members</strong>.
            </p>
            <section className="flex flex-col md:flex-row md:gap-4">
                <div className="w-full md:w-1/4">
                    <label htmlFor="job-select" className="block md:hidden font-bold mb-1 text-center">
                        Select a role
                    </label>
                    <select
                        className="block md:hidden w-full p-2 border border-b-0 border-light bg-accent dark:bg-accent-dark dark:border-dark rounded-tl rounded-tr text-xl font-bold relative z-10"
                        value={selectedJob.fields.title}
                        onChange={(e) => {
                            const selectedJobTitle = e.target.value
                            const job = jobs.find((job) => job.fields.title === selectedJobTitle)
                            setSelectedJob(job)
                        }}
                    >
                        {jobs.map((job) => (
                            <option key={job.fields.title} value={job.fields.title}>
                                {job.fields.title}
                            </option>
                        ))}
                    </select>
                    <ul data-scheme="primary" className="hidden md:block list-none p-0 m-0 space-y-0.5">
                        {jobs.map((job) => {
                            return (
                                <li key={job.fields.title} className="">
                                    <OSButton
                                        variant="ghost"
                                        size="md"
                                        align="left"
                                        width="full"
                                        zoomHover="md"
                                        active={selectedJob.fields.title === job.fields.title}
                                        className={` ${selectedJob.fields.title === job.fields.title ? '' : ''}`}
                                        onClick={() => setSelectedJob(job)}
                                    >
                                        <div className="flex flex-col w-full items-start">
                                            <span
                                                className={`font-semibold text-[15px] ${
                                                    selectedJob.fields.title === job.fields.title ? '' : ''
                                                }`}
                                            >
                                                {job.fields.title}
                                            </span>
                                            {!hideTeamsByJob.includes(job.fields?.title) && (
                                                <span className="text-[13px] text-secondary !font-normal">
                                                    {(() => {
                                                        const teamsField = job.parent.customFields.find(
                                                            (field: { title: string }) => field.title === 'Teams'
                                                        )
                                                        const teams = teamsField ? JSON.parse(teamsField.value) : []
                                                        return teams.length > 1
                                                            ? 'Multiple teams'
                                                            : teams.length === 1 && teams[0]
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
                <div className="w-full bg-primary border border-primary flex flex-col">
                    <div className="p-4 lg:p-6 flex-1">
                        <h2 className="hidden md:block text-2xl font-bold">{selectedJob.fields.title}</h2>

                        {teams.length > 1 && (
                            <p data-scheme="secondary" className="bg-primary p-2 border border-primary rounded-sm">
                                <strong>{teams.length} small teams are hiring for this role</strong>
                            </p>
                        )}

                        <ul className="list-none m-0 p-0 md:items-center text-black/50 dark:text-white/50 flex md:flex-row flex-col md:space-x-12 md:space-y-0 space-y-6">
                            <Detail
                                title="Location"
                                value={`Remote${
                                    selectedJob.parent.customFields.find(
                                        (field: { title: string }) => field.title === 'Location(s)'
                                    )?.value
                                        ? ` (${
                                              selectedJob.parent.customFields.find(
                                                  (field: { title: string }) => field.title === 'Location(s)'
                                              ).value
                                          })`
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
                            {selectedJob.parent.customFields.find(
                                (field: { title: string }) => field.title === 'Role grouping'
                            )?.value && (
                                <Detail
                                    title="Role grouping"
                                    value={
                                        selectedJob.parent.customFields.find(
                                            (field: { title: string }) => field.title === 'Role grouping'
                                        ).value
                                    }
                                    icon={<Timezone />}
                                />
                            )}
                        </ul>

                        <div className="job-content mt-4">
                            <h3 className="mb-1 text-sm">Job summary</h3>

                            {isLoading ? (
                                <div className="space-y-1 mb-3">
                                    <div className="bg-accent dark:bg-accent-dark h-5 w-full rounded animate-pulse" />
                                    <div className="bg-accent dark:bg-accent-dark h-5 w-[calc(100%-3rem)] rounded animate-pulse" />
                                    <div className="bg-accent dark:bg-accent-dark h-5 w-[calc(100%-1rem)] rounded animate-pulse" />
                                    <div className="bg-accent dark:bg-accent-dark h-5 w-72 max-w-full rounded animate-pulse" />
                                    <div className="md:hidden bg-accent dark:bg-accent-dark h-5 w-60 max-w-full rounded animate-pulse" />
                                    <div className="md:hidden bg-accent dark:bg-accent-dark h-5 w-36 max-w-full rounded animate-pulse" />
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
                                            className="[&_summary]:hidden [&_p]:text-[15px] [&_p]:mb-2 [&_ul_p]:pb-0 [&_ul_p]:mb-0 relative max-h-56 overflow-hidden after:absolute after:inset-x-0 after:bottom-0 after:h-24 after:bg-gradient-to-b after:from-white/0 after:via-white/75 after:to-white dark:after:front-accent-dark/0 dark:after:via-accent-dark/75 dark:after:to-accent-dark"
                                        />
                                    )}
                                    {selectedJob.fields.title == 'Speculative application' && (
                                        <>
                                            <p className="text-[15px]">
                                                We take exceptional people when they come along - and we really mean
                                                that!
                                            </p>

                                            <p className="text-[15px]">
                                                Don't see a specific role listed? That doesn't mean we won't have a spot
                                                for you. Send us a speculative application and let us know how you think
                                                you could contribute to PostHog.
                                            </p>
                                        </>
                                    )}
                                </>
                            )}
                            <CallToAction to={selectedJob.fields.slug} size="sm">
                                Read more
                            </CallToAction>
                        </div>

                        <div>
                            <h3 className="mb-1 text-sm">About the small team{teams.length > 1 ? 's' : ''}</h3>

                            {teams.length > 1 ? (
                                <OSTabs
                                    key={`${selectedJob.fields.title}-${currentTeamName}`}
                                    tabs={teams.map((teamName: string) => {
                                        const team = allTeams.find(
                                            (t: any) => t.name.toLowerCase() === teamName.toLowerCase()
                                        )
                                        const teamLength = team?.profiles?.data?.length
                                        const teamURL = `/teams/${team?.slug || ''}`
                                        const pineapplePercentage =
                                            teamLength &&
                                            teamLength > 0 &&
                                            Math.round(
                                                (team.profiles?.data?.filter(
                                                    ({ attributes: { pineappleOnPizza } }: any) => pineappleOnPizza
                                                ).length /
                                                    teamLength) *
                                                    100
                                            )

                                        return {
                                            value: teamName,
                                            label: teamName,
                                            content: <TeamInfoDisplay team={team} multipleTeams={teams.length > 1} />,
                                        }
                                    })}
                                    defaultValue={currentTeamName}
                                    frame={false}
                                    onValueChange={(value) => setSelectedTeamName(value)}
                                    className="px-0 mb-4"
                                />
                            ) : (
                                <TeamInfoDisplay team={selectedTeam} multipleTeams={false} />
                            )}
                        </div>
                    </div>
                    {selectedTeam && (
                        <div className="border-t border-primary bg-accent p-6">
                            {teams.length > 1 && (
                                <p className="mb-2">
                                    <strong>{teams.length} small teams are hiring for this role</strong>
                                </p>
                            )}

                            <div className="flex flex-col items-center gap-2">
                                {teams.length > 1 && (
                                    <select
                                        className="w-full p-2 mb-2 border border-b-3 border-light dark:border-dark rounded text-sm font-medium dark:bg-dark"
                                        value={currentTeamName}
                                        onChange={(e) => {
                                            setSelectedTeamName(e.target.value)
                                        }}
                                    >
                                        {teams.map((team: any) => (
                                            <option key={team} value={team}>
                                                {team}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

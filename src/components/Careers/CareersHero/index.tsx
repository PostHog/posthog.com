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
    const [selectedTeamName, setSelectedTeamName] = useState(teams[0])
    const selectedTeam = allTeams.find((team) => team.name.toLowerCase() === selectedTeamName.toLowerCase())
    const teamLength = selectedTeam?.profiles?.data?.length
    const teamURL = `/teams/${slugify((selectedTeam?.name || '').toLowerCase().replace('ops', ''), {
        lower: true,
        remove: /and/,
    })}`
    const pineapplePercentage =
        teamLength &&
        teamLength > 0 &&
        Math.round(
            (selectedTeam.profiles?.data?.filter(({ attributes: { pineappleOnPizza } }) => pineappleOnPizza).length /
                teamLength) *
                100
        )

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
        setSelectedTeamName(teams[0])

        const websiteDescField = selectedJob.parent.customFields.find(
            (field: { title: string }) => field.title === 'Website description'
        )
        setWebsiteDescription(websiteDescField ? websiteDescField.value : '')

        setIsLoading(false)
    }, [selectedJob])

    return (
        <>
            <h1 className="text-4xl lg:text-5xl font-bold text-center mb-2 pt-8 px-2">Who's hiring?</h1>
            <p className="text-center mb-8 text-base px-4">
                Our small teams are looking to add{' '}
                <strong className="whitespace-nowrap">{jobs.length} team members</strong>.
            </p>
            <section className="flex flex-col md:flex-row md:gap-4 px-4 max-w-7xl mx-auto 2xl:px-8 mb-16">
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
                    <ul className="hidden md:block list-none p-0 m-0 space-y-0.5">
                        {jobs.map((job) => {
                            return (
                                <li key={job.fields.title} className="">
                                    <button
                                        className={`w-full flex flex-col text-left px-2 py-1 rounded border border-b-3 ${
                                            selectedJob.fields.title === job.fields.title
                                                ? 'border-light dark:border-dark bg-white dark:bg-accent-dark'
                                                : 'hover:bg-light/50 hover:dark:bg-dark/50 border-transparent md:hover:border-light dark:md:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all'
                                        }`}
                                        onClick={() => setSelectedJob(job)}
                                    >
                                        <span
                                            className={`font-semibold text-[15px] ${
                                                selectedJob.fields.title === job.fields.title ? 'font-bold' : ''
                                            }`}
                                        >
                                            {job.fields.title}
                                        </span>
                                        {!hideTeamsByJob.includes(job.fields?.title) && (
                                            <span className="text-[13px] text-black/50 dark:text-white/50">
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
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="w-full md:w-3/4 bg-white shadow-lg border border-light dark:border-dark dark:bg-accent-dark rounded-bl rounded-br md:rounded flex flex-col lg:flex-row">
                    <div className="p-4 lg:p-6 flex-1">
                        <h2 className="hidden md:block text-2xl font-bold">{selectedJob.fields.title}</h2>

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
                        </ul>

                        <div className="job-content mt-4">
                            <h3 className="mb-1 text-[15px]">Summary</h3>

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
                    </div>
                    {selectedTeam && (
                        <div className="lg:max-w-xs border-t md:border-t-0 md:border-l border-light dark:border-dark p-4 md:p-6 bg-accent/50 dark:bg-accent-dark">
                            {teams.length > 1 && (
                                <p className="mb-2">
                                    <strong>{teams.length} small teams are hiring for this role</strong>
                                </p>
                            )}

                            <div className="flex flex-col items-center gap-2">
                                {teams.length > 1 && (
                                    <select
                                        className="w-full p-2 mb-2 border border-b-3 border-light dark:border-dark rounded text-sm font-medium dark:bg-dark"
                                        value={selectedTeamName}
                                        onChange={(e) => {
                                            setSelectedTeamName(e.target.value)
                                        }}
                                    >
                                        {teams.map((team) => (
                                            <option key={team} value={team}>
                                                {team}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                <p className="text-sm text-center opacity-60 font-medium mb-0">About this team</p>
                                <div className="max-w-48 mx-auto">
                                    <Link to={teamURL}>
                                        <TeamPatch
                                            name={selectedTeam.name}
                                            imageUrl={selectedTeam.crest?.data?.attributes?.url}
                                            {...selectedTeam.crestOptions}
                                            className="w-full -mt-4"
                                        />
                                    </Link>
                                </div>
                                <div className="flex justify-center">
                                    <TeamMembers profiles={selectedTeam.profiles} />
                                </div>

                                <div className="inline-flex items-center mx-auto gap-2">
                                    {pineapplePercentage > 50 ? (
                                        <>
                                            <StickerPineappleYes className="size-12" />
                                        </>
                                    ) : pineapplePercentage === 50 ? (
                                        <>
                                            <StickerPineapple className="size-12" />
                                        </>
                                    ) : (
                                        <>
                                            <StickerPineappleNo className="size-12" />
                                        </>
                                    )}
                                    <p className="text-[13px] mt-2 mb-0 w-auto leading-tight">
                                        {PineappleText(pineapplePercentage)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

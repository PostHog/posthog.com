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
import CloudinaryImage from 'components/CloudinaryImage'

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

            <div className="flex flex-col @md:grid @md:grid-cols-6 @md:grid-rows-3 @3xl:grid-rows-2 gap-4">
                <div className="order-2 @md:order-none col-start-1 row-start-2 @md:col-span-4 @md:col-start-auto @md:row-span-2 @md:row-start-auto @3xl:row-span-1 @md:self-center">
                    <h3 className="text-sm font-bold mb-1">{team.name} Team</h3>
                    {team.description && <p className="text-sm text-secondary !mb-0">{team.description}</p>}
                </div>
                <div className="order-1 @md:order-none col-start-1 row-start-1 @md:col-span-2 @md:col-start-5 @md:row-span-2 @md:row-start-auto @3xl:row-span-2 @md:self-center @md:justify-self-center">
                    <div className="w-36 @md:w-full">
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
                <div className="order-3 @md:order-none col-start-1 row-start-3 @md:col-span-3 @md:row-start-3 @3xl:col-span-2 @3xl:row-start-2">
                    <p className="text-sm font-semibold !mb-1">Team members</p>
                    <div className="flex justify-start">
                        <TeamMembers size="!size-16" profiles={team.profiles} />
                    </div>
                </div>
                <div className="order-4 @md:order-none col-start-1 row-start-4 @md:col-span-3 @md:col-start- @md:row-start-3 @3xl:col-span-2 @3xl:col-start-3 @3xl:row-start-2">
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
        const niceToHave = doc.querySelector('details:has(h2[id="nice-to-have"])')

        let content = ''
        if (whoWereLookingFor) {
            content = whoWereLookingFor.outerHTML
        } else if (whatYoullBeDoing) {
            content = whatYoullBeDoing.outerHTML
        } else if (requirements) {
            content = requirements.outerHTML + (niceToHave ? `<h3>Nice to have</h3>${niceToHave.outerHTML}` : '')
        }

        setProcessedHtml(content)
        setSelectedTeamName('')

        const websiteDescField = selectedJob.parent.customFields.find(
            (field: { title: string }) => field.title === 'Website description'
        )
        setWebsiteDescription(websiteDescField ? websiteDescField.value : '')

        setIsLoading(false)
    }, [selectedJob])

    const imagePositioning =
        'absolute @3xl:top-1/2 @3xl:left-1/2  opacity-100 @sm:opacity-80 @md:opacity-100 transition-all duration-300 @2xl:scale-75 @3xl:scale-90 @4xl:scale-100 @5xl:scale-110'

    return (
        <>
            <DebugContainerQuery />
            <div className="@container not-prose relative aspect-[2/1] @2xl:aspect-[3/1] @6xl:aspect-[4/1] overflow-hidden bg-accent border-b border-primary mb-4">
                {/* Background container for positioned graphics */}
                {/* Example of positioned graphics - replace with your actual graphics */}
                {/* Left section graphics */}
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                    <div className="relative">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/top_middle_04506a5dc1.png"
                            alt=""
                            width={588}
                            height={434}
                            className={`${imagePositioning} 
                            translate-x-[calc(-50%-65%)] 
                            translate-y-[calc(-50%-60%)] 
                            @2xl:translate-x-[calc(-50%-65%)] 
                            @2xl:translate-y-[calc(-50%-50%)] 
                            @3xl:translate-x-[calc(-50%-70%)] 
                            @3xl:translate-y-[calc(-50%-50%)] 
                            @4xl:translate-x-[calc(-50%-70%)] 
                            @4xl:translate-y-[calc(-50%-60%)] 
                            @5xl:translate-x-[calc(-50%-70%)] 
                            @5xl:translate-y-[calc(-50%-70%)] 
                            @6xl:translate-x-[calc(-50%-80%)] 
                            @6xl:translate-y-[calc(-50%-70%)] 
                            @7xl:translate-x-[calc(-50%-90%)] 
                            @7xl:translate-y-[calc(-50%-65%)] 
                            w-[294px] h-auto`}
                        />
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/top_right_c86eb1a286.png"
                            alt=""
                            width={551}
                            height={517}
                            className={`${imagePositioning} 
                            translate-x-[calc(-50%+25%)] 
                            translate-y-[calc(-50%-65%)] 
                            @lg:translate-x-[calc(-50%+55%)] 
                            @lg:translate-y-[calc(-50%-65%)] 
                            @2xl:translate-x-[calc(-50%+55%)] 
                            @2xl:translate-y-[calc(-50%-50%)] 
                            @3xl:translate-x-[calc(-50%+55%)] 
                            @3xl:translate-y-[calc(-50%-60%)] 
                            @4xl:translate-x-[calc(-50%+55%)] 
                            @4xl:translate-y-[calc(-50%-65%)] 
                            @5xl:translate-x-[calc(-50%+55%)] 
                            @5xl:translate-y-[calc(-50%-75%)] 
                            @6xl:translate-x-[calc(-50%+65%)] 
                            @6xl:translate-y-[calc(-50%-70%)] 
                            w-[275px] h-auto`}
                        />
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/right_6de2023571.png"
                            alt=""
                            width={585}
                            height={488}
                            className={`${imagePositioning} 
                            translate-x-[calc(-50%+110%)] 
                            translate-y-[calc(-50%-25%)] 
                            @lg:translate-x-[calc(-50%+120%)] 
                            @lg:translate-y-[calc(-50%-10%)] 
                            @2xl:translate-x-[calc(-50%+110%)] 
                            @2xl:translate-y-[calc(-50%-10%)] 
                            @3xl:translate-x-[calc(-50%+120%)] 
                            @3xl:translate-y-[calc(-50%-20%)] 
                            @4xl:translate-x-[calc(-50%+145%)] 
                            @4xl:translate-y-[calc(-50%-25%)] 
                            @5xl:translate-x-[calc(-50%+150%)] 
                            @5xl:translate-y-[calc(-50%-30%)] 
                            @6xl:translate-x-[calc(-50%+160%)] 
                            @6xl:translate-y-[calc(-50%-30%)] 
                            @7xl:translate-x-[calc(-50%+170%)] 
                            @7xl:translate-y-[calc(-50%-30%)] 
                            w-[292.5px] h-[244px] `}
                        />

                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/bottom_right_fb4051ba15.png"
                            alt=""
                            width={389}
                            height={333}
                            className={`${imagePositioning} 
                            translate-x-[calc(-50%+70%)] 
                            translate-y-[calc(-50%+70%)] 
                            @lg:translate-x-[calc(-50%+80%)] 
                            @lg:translate-y-[calc(-50%+75%)] 
                            @xl:translate-x-[calc(-50%+120%)] 
                            @xl:translate-y-[calc(-50%+85%)] 
                            @2xl:translate-x-[calc(-50%+110%)] 
                            @2xl:translate-y-[calc(-50%+65%)] 
                            @3xl:translate-x-[calc(-50%+120%)] 
                            @3xl:translate-y-[calc(-50%+65%)] 
                            @4xl:translate-x-[calc(-50%+145%)] 
                            @4xl:translate-y-[calc(-50%+75%)] 
                            @5xl:translate-x-[calc(-50%+160%)] 
                            @5xl:translate-y-[calc(-50%+85%)] 
                            @6xl:translate-x-[calc(-50%+170%)] 
                            @6xl:translate-y-[calc(-50%+85%)] 
                            @7xl:translate-x-[calc(-50%+180%)] 
                            @7xl:translate-y-[calc(-50%+85%)] 
                            w-[194.5px] h-auto `}
                        />

                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/top_right_c86eb1a286.png"
                            alt=""
                            width={551}
                            height={517}
                            className={`${imagePositioning} 
                            translate-x-[calc(-50%-5%)] 
                            translate-y-[calc(-50%+120%)] 
                            @xl:translate-x-[calc(-50%-5%)] 
                            @xl:translate-y-[calc(-50%+70%)] 
                            @2xl:translate-x-[calc(-50%+5%)] 
                            @2xl:translate-y-[calc(-50%+55%)] 
                            @3xl:translate-x-[calc(-50%+5%)] 
                            @3xl:translate-y-[calc(-50%+60%)] 
                            @4xl:translate-x-[calc(-50%+5%)] 
                            @4xl:translate-y-[calc(-50%+70%)] 
                            @5xl:translate-x-[calc(-50%+15%)] 
                            @5xl:translate-y-[calc(-50%+75%)] 
                            w-[275px] h-auto`}
                        />

                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/bottom_left_19eb019249.png"
                            alt=""
                            width={366}
                            height={338}
                            className={`${imagePositioning} 
                            translate-x-[calc(-50%-50%)] 
                            translate-y-[calc(-50%+70%)] 
                            @xl:translate-x-[calc(-50%-120%)] 
                            @xl:translate-y-[calc(-50%+70%)] 
                            @2xl:translate-x-[calc(-50%-100%)] 
                            @2xl:translate-y-[calc(-50%+60%)] 
                            @3xl:translate-x-[calc(-50%-115%)] 
                            @3xl:translate-y-[calc(-50%+65%)] 
                            @4xl:translate-x-[calc(-50%-125%)] 
                            @4xl:translate-y-[calc(-50%+70%)] 
                            @5xl:translate-x-[calc(-50%-125%)] 
                            @5xl:translate-y-[calc(-50%+80%)] 
                            @6xl:translate-x-[calc(-50%-135%)] 
                            @6xl:translate-y-[calc(-50%+80%)] 
                            w-[183px] h-auto `}
                        />

                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/left_00fbb9dca8.png"
                            alt=""
                            width={560}
                            height={483}
                            className={`${imagePositioning} 
                            translate-x-[calc(-50%-125%)] 
                            translate-y-[calc(-50%+20%)] @xl:translate-x-[calc(-50%-140%)] @xl:translate-y-[calc(-50%+0%)] 
                            @2xl:translate-x-[calc(-50%-120%)] 
                            @2xl:translate-y-[calc(-50%+0%)] 
                            @3xl:translate-x-[calc(-50%-140%)] 
                            @3xl:translate-y-[calc(-50%+0%)] 
                            @4xl:translate-x-[calc(-50%-150%)] 
                            @4xl:translate-y-[calc(-50%+0%)] 
                            @5xl:translate-x-[calc(-50%-150%)] 
                            @5xl:translate-y-[calc(-50%+0%)] 
                            @6xl:translate-x-[calc(-50%-160%)] 
                            @6xl:translate-y-[calc(-50%+0%)] 
                            @7xl:translate-x-[calc(-50%-180%)] 
                            @7xl:translate-y-[calc(-50%+5%)] 
                            w-[280px] h-auto `}
                        />
                    </div>

                    {/* Text overlay - keeping this as is */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center">
                        <h1 className="text-2xl lg:text-3xl font-bold mb-1 @3xl:mb-2">Who's hiring?</h1>
                        <p className="text-base mb-4">
                            Our small teams are looking to add{' '}
                            <strong className="whitespace-nowrap">{totalPositions} team members</strong>.
                        </p>
                    </div>
                </div>
            </div>

            <section className="flex flex-col md:flex-row md:gap-4 p-4">
                <div className="w-full md:w-1/4">
                    <label htmlFor="job-select" className="block md:hidden font-bold mb-1 text-center">
                        Select a role
                    </label>
                    <select
                        className="block md:hidden w-full p-2 border border-b-0 border-light bg-accent dark:border-dark rounded-tl rounded-tr text-xl font-bold relative z-10"
                        value={selectedJob.fields.title}
                        onChange={(e) => {
                            const selectedJobTitle = e.target.value
                            const job = allJobs.find((job: any) => job.fields.title === selectedJobTitle)
                            setSelectedJob(job)
                        }}
                    >
                        {jobGroups.map((group) => (
                            <optgroup key={group.name} label={group.name}>
                                {group.jobs.map((job: any) => (
                                    <option key={job.fields.title} value={job.fields.title}>
                                        {job.fields.title}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                    <div data-scheme="primary" className="hidden md:block">
                        {jobGroups.map((group) => (
                            <div key={group.name} className="mb-2 last:mb-0">
                                <h3 className="text-sm font-normal px-1.5 text-secondary pb-1 mb-1 border-b border-primary">
                                    {group.name}
                                </h3>
                                <ul className="list-none p-0 m-0 space-y-px">
                                    {group.jobs.map((job: any) => {
                                        return (
                                            <li key={job.fields.title} className="">
                                                <OSButton
                                                    variant="ghost"
                                                    size="md"
                                                    align="left"
                                                    width="full"
                                                    zoomHover="md"
                                                    active={selectedJob.fields.title === job.fields.title}
                                                    className={` ${
                                                        selectedJob.fields.title === job.fields.title ? '' : ''
                                                    }`}
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
                                                                        (field: { title: string }) =>
                                                                            field.title === 'Teams'
                                                                    )
                                                                    const teams = teamsField
                                                                        ? JSON.parse(teamsField.value)
                                                                        : []
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
                        ))}
                    </div>
                </div>
                <div className="w-full bg-primary border border-primary flex flex-col">
                    <div className="p-4 lg:p-6 flex-1">
                        <h2 className="m-0">{selectedJob.fields.title}</h2>

                        <div className="grid grid-cols-1 @7xl:grid-cols-2 gap-8">
                            <div>
                                {teams.length > 1 && (
                                    <p
                                        data-scheme="secondary"
                                        className="bg-primary p-2 border border-primary rounded-sm"
                                    >
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
                                </ul>

                                <div className="@7xl:flex-1">
                                    <h3 className="mb-1 text-sm">Job summary</h3>

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
                                                    className="[&_summary]:hidden [&_p]:text-[15px] [&_p]:mb-2 [&_ul_p]:pb-0 [&_ul_p]:mb-0 relative max-h-full overflow-hidden after:absolute after:inset-x-0 after:bottom-0 after:h-24 after:bg-gradient-to-b after:from-white/0 after:via-white/75 after:to-white dark:after:front-accent-dark/0 dark:after:via-accent-dark/75 dark:after:to-accent-dark"
                                                />
                                            )}
                                            {selectedJob.fields.title == 'Speculative application' && (
                                                <>
                                                    <p className="text-[15px]">
                                                        We take exceptional people when they come along - and we really
                                                        mean that!
                                                    </p>

                                                    <p className="text-[15px]">
                                                        Don't see a specific role listed? That doesn't mean we won't
                                                        have a spot for you. Send us a speculative application and let
                                                        us know how you think you could contribute to PostHog.
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
                            <div
                                data-scheme="secondary"
                                className={`@container min-w-96 ${
                                    teams.length > 1 ? '' : 'border border-primary rounded-md p-4 bg-primary'
                                }`}
                            >
                                <h3 className="">About the small team{teams.length > 1 ? 's' : ''}</h3>

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
                                                content: (
                                                    <TeamInfoDisplay team={team} multipleTeams={teams.length > 1} />
                                                ),
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
                                        className="w-full p-2 mb-2 border border-b-3 border-primary rounded text-sm font-medium dark:bg-dark"
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

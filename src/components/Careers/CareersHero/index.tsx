import React, { useState, useEffect, useMemo, useRef } from 'react'
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

import Mark from 'mark.js'

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

export const CareersHero = () => {
    const {
        allAshbyJobPosting: { departments, jobs: originalJobs },
        allTeams: { nodes: allTeams },
    } = useStaticQuery(query)

    const [searchQuery, setSearchQuery] = useState('')
    const jobListRef = useRef<HTMLDivElement>(null)
    const markedRef = useRef<Mark | null>(null)

    const allJobs = originalJobs.filter((job: any) =>
        job.fields.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const [selectedJob, setSelectedJob] = useState(allJobs[0])
    const teamsField = selectedJob?.parent?.customFields.find((field: { title: string }) => field.title === 'Teams')
    const teams = teamsField ? JSON.parse(teamsField.value) : []
    const [selectedTeamName, setSelectedTeamName] = useState('')

    // Compute the current team name - either the selected one or default to first team
    const currentTeamName = selectedTeamName || teams[0] || ''
    const selectedTeam = allTeams.find((team: any) => team.name.toLowerCase() === currentTeamName.toLowerCase())

    const [isLoading, setIsLoading] = useState(true)

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

    useEffect(() => {
        setSelectedTeamName('')
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

    const imagePositioning =
        'absolute @3xl:top-1/2 @3xl:left-1/2  opacity-100 @sm:opacity-80 @md:opacity-100 transition-all duration-300 @2xl:scale-75 @3xl:scale-90 @4xl:scale-100 @5xl:scale-110'

    return (
        <section
            className="@container not-prose relative rounded aspect-[2/1] @2xl:aspect-[3/1] @6xl:aspect-[4/1] overflow-hidden border-b border-primary mb-4 bg-red-carpet bg-[length:150px_150px]"
        >
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
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                    <h1 className="text-2xl lg:text-3xl font-bold mb-1 @3xl:mb-2">Who's hiring?</h1>
                    <p className="text-base mb-4">
                        Our small teams are looking to add{' '}
                        <strong className="whitespace-nowrap">{totalPositions} team members</strong>.
                    </p>
                </div>
            </div>
        </section>
    )
}

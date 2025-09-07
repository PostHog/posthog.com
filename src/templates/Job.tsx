import React, { useState, useEffect } from 'react'
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
import groupBy from 'lodash.groupby'
import TeamMember from 'components/TeamMember'
import { Accordion } from 'components/RadixUI/Accordion'
import { Select } from 'components/RadixUI/Select'
import { TreeMenu } from 'components/TreeMenu'
import OSButton from 'components/OSButton'
import { IconList } from '@posthog/icons'
import { Popover } from 'components/RadixUI/Popover'
import Tooltip from 'components/RadixUI/Tooltip'
import TeamPatch from 'components/TeamPatch'
import { StickerPineappleYes, StickerPineappleNo, StickerPineapple } from 'components/Stickers/Stickers'
import { TeamMembers } from 'components/Job/Sidebar'

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
}) {
    const timezone = parent?.customFields?.find(({ title }) => title === 'Timezone(s)')?.value
    const salaryRole = parent?.customFields?.find(({ title }) => title === 'Salary')?.value || title
    const missionAndObjectives = parent?.customFields?.find(({ title }) => title === 'Mission & objectives')?.value
    const showObjectives = missionAndObjectives !== 'false'
    const availableTeams = groupBy(allJobPostings.nodes, ({ parent, departmentName }) => {
        const teams = JSON.parse(parent?.customFields?.find(({ title }) => title === 'Teams')?.value || '[]')
        const speculative = departmentName?.toLowerCase() === 'speculative'
        return speculative ? 'Speculative' : teams.length > 1 ? 'Multiple teams' : `Team ${teams[0]}`
    })
    const multipleTeams = teams?.nodes?.length > 1
    const teamName = multipleTeams ? 'Multiple teams' : teams?.nodes?.[0]?.name ? `Team ${teams?.nodes?.[0]?.name}` : ''

    const openRolesMenu = []
    Object.keys(availableTeams)
        .sort()
        .forEach((team) => {
            openRolesMenu.push({ name: team })
            availableTeams[team]?.forEach(({ fields: { title, slug } }) => {
                openRolesMenu.push({
                    name: title.split(' - ')[0],
                    url: slug,
                })
            })
        })
    const menu = [
        {
            name: 'Work at PostHog',
        },
        {
            name: 'Careers home',
            url: '/careers',
        },
        {
            name: 'About us',
            url: '/about',
        },
        {
            name: 'Our story',
            url: '/handbook/company/story',
        },
        {
            name: 'Open roles',
            url: '',
            children: openRolesMenu,
        },
    ]

    const [jobTitle] = title.split(' - ')

    const [showTableOfContents, setShowTableOfContents] = useState(false)
    const [parsedContent, setParsedContent] = useState<any[]>([])

    // Parse HTML content to extract details blocks
    useEffect(() => {
        if (html) {
            const parser = new DOMParser()
            const doc = parser.parseFromString(html, 'text/html')
            const detailsElements = doc.querySelectorAll('details')

            if (detailsElements.length > 0) {
                const accordionItems = Array.from(detailsElements).map((details, index) => {
                    const summary = details.querySelector('summary')
                    const title = summary?.textContent || `Section ${index + 1}`

                    // Clone the details element and remove the summary
                    const contentClone = details.cloneNode(true) as HTMLElement
                    const summaryToRemove = contentClone.querySelector('summary')
                    summaryToRemove?.remove()

                    return {
                        value: `section-${index}`,
                        trigger: <h3 className="!m-0">{title}</h3>,
                        content: <div dangerouslySetInnerHTML={{ __html: contentClone.innerHTML }} />,
                    }
                })
                setParsedContent(accordionItems)
            }
        }
    }, [html])

    const jobTableOfContents = [
        ...tableOfContents,
        ...(sfBenchmark[salaryRole] ? [{ value: 'Salary', url: '#salary', depth: 0 }] : []),
        { value: 'Benefits', url: '#benefits', depth: 0 },
        ...(gitHubIssues.length > 0 ? [{ value: 'Typical tasks', url: '#typical-tasks', depth: 0 }] : []),
        ...(!multipleTeams && showObjectives && objectives
            ? [{ value: "Your team's mission and objectives", url: '#mission-objectives', depth: 0 }]
            : []),
        { value: 'Interview process', url: '#interview-process', depth: 0 },
        { value: 'Apply', url: '#apply', depth: 0 },
    ]

    const LeftSidebarContent = () => (
        <>
            <Select
                groups={[
                    {
                        label: null,
                        items: [
                            { value: '/careers', label: 'Careers home', icon: null },
                            { value: '/about', label: 'About us', icon: null },
                            { value: '/handbook/company/story', label: 'Our story', icon: null },
                        ],
                    },
                ]}
                placeholder="Select..."
                ariaLabel="Career navigation"
                className="w-full mb-2"
                value={slug}
                onValueChange={(value) => {
                    navigate(value)
                }}
                dataScheme="primary"
            />
            <TreeMenu items={openRolesMenu} />
        </>
    )

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
                leftSidebar={<LeftSidebarContent />}
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
                                            const el = document.querySelector(item.url)
                                            if (!el) return
                                            el.scrollIntoView({ behavior: 'smooth' })
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
                        {teamName && <p className="m-0 opacity-60 pb-2">{teamName}</p>}
                        <h1 className="m-0 text-5xl">{jobTitle}</h1>
                        <ul className="list-none m-0 p-0 md:items-center text-black/50 dark:text-white/50 mt-6 flex md:flex-row flex-col md:space-x-12 md:space-y-0 space-y-6">
                            {departmentName?.toLowerCase() !== 'speculative' && (
                                <Detail title="Department" value={departmentName} icon={<Department />} />
                            )}
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
                                <Accordion skin={false} items={parsedContent} type="multiple" defaultOpenAll={true} />
                            ) : (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: html,
                                    }}
                                />
                            )}
                        </div>

                        {/* Right sidebar with team info */}
                        {teams?.nodes?.length > 0 && (
                            <div className="lg:col-span-1">
                                <div className="sticky top-4">
                                    <h2 className="my-0 leading-tight text-xl">
                                        {multipleTeams ? 'Teams hiring for this role' : 'Meet your team'}
                                    </h2>

                                    {multipleTeams ? (
                                        <Accordion
                                            skin={false}
                                            items={teams.nodes.map((team: any, index: number) => ({
                                                value: team.name,
                                                trigger: <span className="font-semibold">{team.name}</span>,
                                                content: <TeamInfoDisplay team={team} />,
                                            }))}
                                            defaultValue={teams.nodes[0]?.name}
                                            className="mt-4"
                                        />
                                    ) : (
                                        <div className="mt-4">
                                            <TeamInfoDisplay team={teams.nodes[0]} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

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
                                                        <Link to="/handbook/people/compensation">
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
                                                                <img className="max-w-[30px]" alt={title} src={image} />
                                                                <span>{title}</span>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                                <p>
                                                    Get more details about all our benefits on the{' '}
                                                    <Link to="/careers#benefits">Careers page</Link>.
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
                                                        {gitHubIssues.map(({ url, number, title, labels }) => {
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
                                                                        <Link to={url}>{title}</Link>
                                                                    </div>
                                                                    {labels && labels.length > 0 && (
                                                                        <ul className="list-none !ml-[calc(60px+.25rem)] md:!ml-14 !mt-0 !mb-0 p-0 flex items-center space-x-1">
                                                                            {labels.map(({ name, url }, index) => {
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
                                                                            })}
                                                                        </ul>
                                                                    )}
                                                                </li>
                                                            )
                                                        })}
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
                                                            components={{ HideFromJobPosting: () => null, TeamMember }}
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
                                                    We do 2-3 short interviews, then pay you to do some real-life (or
                                                    close to real-life) work.
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
            </ReaderView>
        </>
    )
}

// Team info display component
const TeamInfoDisplay = ({ team }: { team: any }) => {
    const teamLength = team?.profiles?.data?.length
    const teamURL = `/teams/${team?.slug || ''}`
    const pineapplePercentage =
        teamLength &&
        teamLength > 0 &&
        Math.round(
            (team.profiles?.data?.filter(({ attributes: { pineappleOnPizza } }: any) => pineappleOnPizza).length /
                teamLength) *
                100
        )

    return (
        <div className="space-y-4">
            <div className="flex justify-center">
                <Link to={teamURL} state={{ newWindow: true }}>
                    <TeamPatch
                        name={team.name}
                        imageUrl={team.crest?.data?.attributes?.url}
                        {...team.crestOptions}
                        className="w-32"
                    />
                </Link>
            </div>

            {team.description && <p className="text-sm text-secondary !my-0">{team.description}</p>}

            <div>
                <p className="text-sm font-semibold !mb-1">Team members</p>
                <div className="flex justify-start">
                    <TeamMembers size="!size-12" profiles={team.profiles} teamName={team.name} />
                </div>
            </div>

            <div>
                <p className="text-sm font-semibold !mb-1">Does pineapple belong on pizza?</p>
                <div className="flex items-center gap-2 text-sm">
                    <div className="w-8">
                        {pineapplePercentage > 50 ? (
                            <StickerPineappleYes className="size-8" />
                        ) : pineapplePercentage == 50 ? (
                            <StickerPineapple className="size-8" />
                        ) : (
                            <StickerPineappleNo className="size-8" />
                        )}
                    </div>
                    <div className="flex-1 leading-tight text-xs">
                        {pineapplePercentage > 50 ? (
                            <>
                                <strong>{pineapplePercentage}%</strong> say <strong className="text-green">YES</strong>!
                            </>
                        ) : pineapplePercentage == 50 ? (
                            <>Team is evenly split</>
                        ) : (
                            <>
                                <strong>{100 - pineapplePercentage}%</strong> say{' '}
                                <strong className="text-red">NO!</strong>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
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

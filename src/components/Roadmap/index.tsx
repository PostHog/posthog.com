import React, { useEffect, useMemo, useState } from 'react'
import Markdown from 'markdown-to-jsx'
import { User, useUser } from 'hooks/useUser'
import { CallToAction } from 'components/CallToAction'
import { useRoadmaps } from 'hooks/useRoadmaps'
import {
    IconShieldLock,
    IconThumbsUp,
    IconThumbsUpFilled,
    IconUndo,
    IconClock,
    IconCalendar,
    IconHome,
    IconUser,
    IconMinus,
} from '@posthog/icons'
import { graphql, navigate, useStaticQuery } from 'gatsby'
import { Skeleton } from 'components/Questions/QuestionsTable'
import SideModal from 'components/Modal/SideModal'
import { Authentication } from 'components/Squeak'
import groupBy from 'lodash.groupby'
import UpdateWrapper from './UpdateWrapper'
import RoadmapForm from 'components/RoadmapForm'
import Link from 'components/Link'
import slugify from 'slugify'
import { useLocation } from '@reach/router'
import Slider from 'components/Slider'
import CommunityLayout from 'components/Community/Layout'
import { companyMenu } from '../../navs'
import Fuse from 'fuse.js'
import Tooltip from 'components/Tooltip'
import Spinner from 'components/Spinner'
import { slugifyTeamName } from 'lib/utils'
import ScrollArea from 'components/RadixUI/ScrollArea'
import SEO from 'components/seo'
import OSTable from 'components/OSTable'
import { Select } from 'components/RadixUI/Select'

interface IGitHubPage {
    title: string
    html_url: string
    number: string
    closed_at: string
    reactions: {
        hooray: number
        heart: number
        eyes: number
        plus1: number
        total_count: number
    }
}
export interface IRoadmap {
    squeakId: number
    title: string
    description: string
    betaAvailable: boolean
    complete: boolean
    dateCompleted: string
    image?: {
        url: string
    }
    projectedCompletion: string
    githubPages: IGitHubPage[]
}

export const VoteBox = ({ likeCount, liked }) => {
    return (
        <>
            <strong className={`leading-none`}>{likeCount}</strong>{' '}
            <span className="text-sm">&nbsp;vote{likeCount !== 1 && 's'}</span>
        </>
    )
}

export const Feature = ({ id, title, teams, description, likeCount, onLike, onUpdate, githubUrls }) => {
    const { user, likeRoadmap } = useUser()
    const { search } = useLocation()
    const [authModalOpen, setAuthModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const teamName = teams?.data?.[0]?.attributes?.name
    const liked = user?.profile?.roadmapLikes?.some(({ id: roadmapID }) => roadmapID === id)

    useEffect(() => {
        setLoading(false)
    }, [liked])

    const like = async (user?: User) => {
        setLoading(true)
        await likeRoadmap({ id, title, user, unlike: liked })
        onLike?.()
    }

    const onAuth = (user: User) => {
        like(user)
        setAuthModalOpen(false)
    }

    useEffect(() => {
        const params = new URLSearchParams(search)
        if (params.get('id')) {
            navigate(`/wip${search}`)
        }
    }, [])

    return (
        <>
            <SideModal title="Sign in to vote" open={authModalOpen} setOpen={setAuthModalOpen}>
                <h4 className="mb-4">Sign into PostHog.com</h4>
                <div className="bg-border dark:bg-border-dark p-4 mb-2">
                    <p className="text-sm mb-2">
                        <strong>Note: PostHog.com authentication is separate from your PostHog app.</strong>
                    </p>

                    <p className="text-sm mb-0">
                        We suggest signing up with your personal email. Soon you'll be able to link your PostHog app
                        account.
                    </p>
                </div>

                <Authentication
                    initialView="sign-in"
                    onAuth={(user) => {
                        setAuthModalOpen(false)
                        like(user)
                    }}
                    showBanner={false}
                    showProfile={false}
                />
            </SideModal>
            <UpdateWrapper
                id={id}
                status="under-consideration"
                editButtonClassName="absolute -top-4 md:top-0 right-0"
                roundButton={false}
                onSubmit={() => onUpdate()}
            >
                <div className="flex space-x-4">
                    <VoteBox likeCount={likeCount} liked={liked} />
                    <div>
                        <h3 className="text-lg m-0 leading-tight">{title}</h3>
                        {teamName && (
                            <Link
                                to={`/teams/${slugifyTeamName(teamName)}`}
                                className="text-sm opacity-70 text-inherit hover:opacity-100 hover:text-red dark:hover:text-yellow mt-0.5"
                            >
                                {teamName} Team
                            </Link>
                        )}
                        <div className="mt-1 text-[15px] community-post-markdown">
                            <Markdown>{description}</Markdown>
                        </div>
                        {githubUrls?.length > 0 && (
                            <Link to={githubUrls[0]} external className="text-sm relative -top-2 inline-block">
                                Learn more on GitHub
                            </Link>
                        )}
                        <div className="flex space-x-2">
                            <CallToAction
                                disabled={loading}
                                onClick={() => {
                                    if (user) {
                                        like()
                                    } else {
                                        setAuthModalOpen(true)
                                    }
                                }}
                                size="sm"
                                type={liked ? 'outline' : 'primary'}
                            >
                                <span className="flex items-center space-x-1">
                                    {liked ? (
                                        <>
                                            <IconUndo className="w-4 h-4" />
                                            <span>Unvote</span>
                                        </>
                                    ) : (
                                        <>
                                            <IconThumbsUp className="w-4 h-4" />
                                            <span>Vote</span>
                                        </>
                                    )}
                                </span>
                            </CallToAction>
                        </div>
                    </div>
                </div>
            </UpdateWrapper>
        </>
    )
}

const Sort = ({ sortBy, className = '' }) => {
    return (
        <div className={`md:space-x-2 items-center mb-4 sm:mb-0 ${className}`}>
            <p className="sr-only">Sort by</p>
            <div className="flex items-center border border-light dark:border-dark md:border-transparent dark:md:border-transparent hover:border-light dark:hover:border-dark p-0.5 rounded gap-x-[3px] transition-all ease-in-out md:delay-500 hover:delay-0 md:duration-500 w-full md:w-auto">
                <SortButton className="" active={sortBy === 'popular'} onClick={() => navigate(`?sort=popular`)}>
                    Popular
                </SortButton>
                <SortButton className="" active={sortBy === 'team'} onClick={() => navigate(`?sort=team`)}>
                    Team
                </SortButton>
                <SortButton className="" active={sortBy === 'latest'} onClick={() => navigate(`?sort=latest`)}>
                    Latest
                </SortButton>
            </div>
        </div>
    )
}

const SortButton = ({ active, onClick, children, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-2 md:py-1 rounded flex-1 text-[15px] md:text-sm border relative opacity-75 ${
                active
                    ? 'bg-white hover:bg-white dark:bg-dark dark:hover:bg-dark text-primary dark:text-primary-dark font-bold border border-light dark:border-dark'
                    : 'border-transparent hover:border-light dark:hover:border-dark hover:scale-[1.01] hover:top-[-.5px] active:top-[.5px] active:scale-[.99] font-semibold text-primary/75 dark:text-primary-dark/75 hover:text-primary dark:hover:text-primary-dark'
            } ${className}`}
        >
            {children}
        </button>
    )
}

interface Row {
    roadmapId?: number
    cells: {
        content: React.ReactNode
        className?: string
    }[]
}

interface RoadmapProps {
    searchQuery?: string
}

export default function Roadmap({ searchQuery = '' }: RoadmapProps) {
    const { search } = useLocation()
    const { user } = useUser()
    const [sortBy, setSortBy] = useState('popular')
    const [tableSort, setTableSort] = useState('popular')
    const [adding, setAdding] = useState(false)
    const [selectedTeam, setSelectedTeam] = useState('All teams')
    const [roadmapSearch, setRoadmapSearch] = useState('')
    const [progress, setProgress] = useState(0)
    const [loading, setLoading] = useState(false)
    const [authModalOpen, setAuthModalOpen] = useState(false)
    const [expandedDescriptions, setExpandedDescriptions] = useState<Record<number, boolean>>({})
    const [selectedRoadmapId, setSelectedRoadmapId] = useState<{
        id: number
        title: string
    } | null>(null)

    const { staticRoadmaps } = useStaticQuery(graphql`
        {
            staticRoadmaps: allSqueakRoadmap {
                nodes {
                    githubPages {
                        reactions {
                            total_count
                        }
                    }
                    squeakId
                }
            }
        }
    `)

    const {
        roadmaps: initialRoadmaps,
        mutate,
        isLoading,
    } = useRoadmaps({
        params: {
            filters: {
                dateCompleted: {
                    $null: true,
                },
                projectedCompletion: {
                    $null: true,
                },
            },
        },
        limit: 100,
    })

    useEffect(() => {
        if (!isLoading) return

        let interval: NodeJS.Timeout
        let timeoutId: NodeJS.Timeout

        const simulateProgress = () => {
            interval = setInterval(() => {
                setProgress((prevProgress) => {
                    // Start slowing down at 70%
                    if (prevProgress < 70) {
                        return prevProgress + 2
                    } else if (prevProgress < 85) {
                        return prevProgress + 0.8
                    } else if (prevProgress < 95) {
                        return prevProgress + 0.2
                    } else {
                        return prevProgress
                    }
                })
            }, 100)

            // Set a timeout to stop at 95% if taking too long
            timeoutId = setTimeout(() => {
                clearInterval(interval)
            }, 10000)
        }

        simulateProgress()

        return () => {
            clearInterval(interval)
            clearTimeout(timeoutId)
        }
    }, [isLoading])

    // Update roadmapSearch when searchQuery changes
    useEffect(() => {
        // When searchQuery changes (including being cleared), update roadmapSearch
        setRoadmapSearch(searchQuery || '')
    }, [searchQuery])

    // Update fuse search to use either the searchQuery prop or the internal roadmapSearch state
    const searchTerm = searchQuery || roadmapSearch

    const fuse = useMemo(
        () => new Fuse(initialRoadmaps, { keys: ['attributes.title', 'attributes.description'], includeMatches: true }),
        [initialRoadmaps]
    )

    const filteredRoadmaps = useMemo(() => {
        if (!searchTerm) return initialRoadmaps

        const results = fuse.search(searchTerm).map(({ item }) => item)
        return results.length > 0 ? results : []
    }, [fuse, searchTerm])

    useEffect(() => {
        const params = new URLSearchParams(search)
        const sort = params.get('sort')
        const team = params.get('team')
        if (sort) {
            setSortBy(sort)
        }
        if (team) {
            setSelectedTeam(team)
        }
    }, [search])

    const roadmaps = useMemo(() => {
        // Transform the filtered roadmaps
        return filteredRoadmaps.map(({ id, attributes }) => {
            const likeCount = attributes?.likes?.data?.length || 0
            const staticLikeCount =
                staticRoadmaps.nodes.find((node) => node.squeakId === id)?.githubPages?.[0]?.reactions?.total_count || 0
            return { id, attributes: { ...attributes, likeCount: likeCount + staticLikeCount } }
        })
    }, [filteredRoadmaps, staticRoadmaps.nodes])

    const roadmapsGroupedByTeam = groupBy(
        roadmaps,
        (roadmap) => `${roadmap.attributes.teams?.data?.[0]?.attributes?.name ?? 'Any'} Team`
    )
    const teams = Object.keys(roadmapsGroupedByTeam).sort()
    const isModerator = user?.role?.type === 'moderator'

    const toggleDescription = (id: number) => {
        setExpandedDescriptions((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const truncateText = (text: string, limit: number) => {
        if (text.length <= limit) return text
        return text.substring(0, limit).trim() + '...'
    }

    const stripHtml = (html: string) => {
        return html.replace(/<\/?[^>]+(>|$)/g, '')
    }

    const preparePreviewText = (text: string, limit: number) => {
        // Replace line breaks with spaces for the preview
        const singleLine = text.replace(/(\r\n|\n|\r)/gm, ' ')
        return truncateText(singleLine, limit)
    }

    const { likeRoadmap } = useUser()

    const like = async (id: number, title: string) => {
        setLoading(true)
        await likeRoadmap({
            id,
            title,
            user,
            unlike: user?.profile?.roadmapLikes?.some(({ id: roadmapID }) => roadmapID === id),
        })
        mutate()
        setLoading(false)
    }

    // Dynamic columns based on sort type
    const columns = useMemo(() => {
        const baseColumns = [
            { name: '', width: 'minmax(100px, auto)', align: 'center' as const },
            { name: 'Votes', width: 'minmax(100px, auto)', align: 'left' as const },
        ]

        // Add date column when sorting by newest or oldest
        if (tableSort === 'newest' || tableSort === 'oldest') {
            baseColumns.push({ name: 'Date', width: 'minmax(120px, auto)', align: 'left' as const })
        }

        // Add remaining columns
        return [
            ...baseColumns,
            { name: 'Team', width: 'minmax(120px, auto)', align: 'left' as const },
            { name: 'Idea', width: 'minmax(200px, 1.5fr)', align: 'left' as const },
            { name: 'Details', width: 'minmax(300px, 2fr)', align: 'left' as const },
            { name: 'More info', width: 'minmax(100px, auto)', align: 'center' as const },
        ]
    }, [tableSort])

    // Sort the rows based on tableSort value
    const sortedRows = useMemo(() => {
        // First filter roadmaps by team if needed
        const filteredRoadmaps = [...roadmaps].filter((roadmap) => {
            const roadmapTeam = roadmap.attributes.teams?.data?.[0]?.attributes?.name

            if (selectedTeam === 'All teams') {
                return true
            }

            if (selectedTeam === 'Any Team') {
                return !roadmapTeam // Return items with no team
            }

            return roadmapTeam && `${roadmapTeam} Team` === selectedTeam
        })

        // Then sort the roadmaps based on the selected sort criteria
        const sortedRoadmaps = filteredRoadmaps.sort((a, b) => {
            switch (tableSort) {
                case 'newest': {
                    const dateA = a.attributes.createdAt ? new Date(a.attributes.createdAt).getTime() : 0
                    const dateB = b.attributes.createdAt ? new Date(b.attributes.createdAt).getTime() : 0
                    return dateB - dateA
                }
                case 'oldest': {
                    const oldDateA = a.attributes.createdAt ? new Date(a.attributes.createdAt).getTime() : 0
                    const oldDateB = b.attributes.createdAt ? new Date(b.attributes.createdAt).getTime() : 0
                    return oldDateA - oldDateB
                }
                case 'popular':
                default:
                    return b.attributes.likeCount - a.attributes.likeCount
            }
        })

        // Since we're regenerating cells for each sort option to include/exclude date column,
        // we need to rebuild the rows from scratch for the sorted roadmaps
        return sortedRoadmaps.map((roadmap) => {
            const teamName = roadmap.attributes.teams?.data?.[0]?.attributes?.name
            const liked = user?.profile?.roadmapLikes?.some(({ id: roadmapID }) => roadmapID === roadmap.id)

            // Format date if available
            const formattedDate = roadmap.attributes.createdAt
                ? new Date(roadmap.attributes.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                  })
                : 'Unknown'

            const cells = [
                {
                    content: (
                        <>
                            <CallToAction
                                disabled={loading}
                                onClick={() => {
                                    if (user) {
                                        like(roadmap.id, roadmap.attributes.title)
                                    } else {
                                        setSelectedRoadmapId({
                                            id: roadmap.id,
                                            title: roadmap.attributes.title,
                                        })
                                        setAuthModalOpen(true)
                                    }
                                }}
                                size="xs"
                                type={liked ? 'outline' : 'primary'}
                                className="-mt-0.5"
                            >
                                <span className="flex items-center space-x-1">
                                    {liked ? (
                                        <>
                                            <IconUndo className="w-4 h-4" />
                                            <span>Unvote</span>
                                        </>
                                    ) : (
                                        <>
                                            <IconThumbsUp className="w-4 h-4" />
                                            <span>Vote</span>
                                        </>
                                    )}
                                </span>
                            </CallToAction>
                        </>
                    ),
                },
                {
                    content: <VoteBox likeCount={roadmap.attributes.likeCount} liked={liked} />,
                    className: `relative flex items-baseline ${liked ? 'bg-green/10' : ''}`,
                },
            ]

            // Add date cell if we're sorting by date
            if (tableSort === 'newest' || tableSort === 'oldest') {
                cells.push({
                    content: <span className="text-sm font-medium">{formattedDate}</span>,
                    className: 'text-secondary dark:text-secondary-dark',
                })
            }

            // Add remaining cells
            cells.push(
                {
                    content: teamName ? (
                        <Link
                            to={`/teams/${slugifyTeamName(teamName)}`}
                            className="text-sm"
                            state={{ newWindow: true }}
                        >
                            {teamName}
                        </Link>
                    ) : (
                        <em className="text-secondary text-sm">Not assigned</em>
                    ),
                },
                {
                    content: <h3 className="text-[15px] m-0 leading-tight">{roadmap.attributes.title}</h3>,
                    className: '!pt-0.75',
                },
                {
                    content: (
                        <div className="text-sm community-post-markdown !p-0">
                            {roadmap.attributes.description.length <= 120 ? (
                                <Markdown>{roadmap.attributes.description}</Markdown>
                            ) : expandedDescriptions[roadmap.id] ? (
                                <>
                                    <Markdown>{roadmap.attributes.description}</Markdown>
                                </>
                            ) : (
                                <div>
                                    <Markdown>{preparePreviewText(roadmap.attributes.description, 75)}</Markdown>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            toggleDescription(roadmap.id)
                                        }}
                                        className="ml-1 text-sm font-semibold text-red dark:text-yellow"
                                    >
                                        Show more
                                    </button>
                                </div>
                            )}
                        </div>
                    ),
                },
                {
                    content:
                        roadmap.attributes.githubUrls?.length > 0 ? (
                            <Link to={roadmap.attributes.githubUrls[0]} external className="text-sm">
                                GitHub
                            </Link>
                        ) : null,
                    className: 'text-center',
                }
            )

            return {
                roadmapId: roadmap.id,
                cells,
            }
        })
    }, [roadmaps, tableSort, expandedDescriptions, loading, user, selectedTeam, searchQuery])

    return (
        <>
            <SEO title="Roadmap – PostHog" description="" image={`/images/og/customers.jpg`} />
            <ScrollArea>
                <section>
                    <>
                        <SideModal title="Sign in to vote" open={authModalOpen} setOpen={setAuthModalOpen}>
                            <h4 className="mb-4">Sign into PostHog.com</h4>
                            <div className="bg-border dark:bg-border-dark p-4 mb-2">
                                <p className="text-sm mb-2">
                                    <strong>Note: PostHog.com authentication is separate from your PostHog app.</strong>
                                </p>

                                <p className="text-sm mb-0">
                                    We suggest signing up with your personal email. Soon you'll be able to link your
                                    PostHog app account.
                                </p>
                            </div>

                            <Authentication
                                initialView="sign-in"
                                onAuth={(user) => {
                                    setAuthModalOpen(false)
                                    if (selectedRoadmapId) {
                                        like(selectedRoadmapId.id, selectedRoadmapId.title)
                                    }
                                }}
                                showBanner={false}
                                showProfile={false}
                            />
                        </SideModal>
                        {isLoading ? (
                            <div data-scheme="primary" className="border border-primary bg-accent rounded-md p-8 mb-12">
                                <div className="max-w-xl mx-auto">
                                    <div className="flex justify-between mb-2 text-sm">
                                        <span className="font-semibold">Loading roadmap data...</span>
                                        <span>{Math.round(progress)}%</span>
                                    </div>
                                    <div className="h-4 w-full border border-primary bg-primary overflow-hidden">
                                        <div
                                            className="h-full bg-red dark:bg-yellow transition-all duration-100 ease-out"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center">
                                        <span className="text-sm font-medium mr-2 text-secondary dark:text-secondary-dark">
                                            Filter by:
                                        </span>
                                        <Select
                                            value={selectedTeam}
                                            onValueChange={setSelectedTeam}
                                            placeholder="Filter by team"
                                            className="w-[180px] text-sm border-border dark:border-dark hover:border-light dark:hover:border-dark"
                                            dataScheme="primary"
                                            groups={[
                                                {
                                                    label: 'Teams',
                                                    items: [
                                                        {
                                                            value: 'All teams',
                                                            label: 'All teams',
                                                            icon: 'IconHome',
                                                        },
                                                        {
                                                            value: 'Any Team',
                                                            label: 'Not assigned',
                                                            icon: 'IconMinus',
                                                        },
                                                        ...teams
                                                            .filter((team) => team !== 'Any Team') // Remove Any Team
                                                            .map((team) => {
                                                                const teamName = team.replace(' Team', '')
                                                                return {
                                                                    value: team,
                                                                    label: teamName,
                                                                    icon: 'IconUser',
                                                                }
                                                            }),
                                                    ],
                                                },
                                            ]}
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-sm font-medium mr-2 text-secondary dark:text-secondary-dark">
                                            Sort by:
                                        </span>
                                        <Select
                                            value={tableSort}
                                            onValueChange={setTableSort}
                                            placeholder="Sort by"
                                            className="w-[180px] text-sm border-border dark:border-dark hover:border-light dark:hover:border-dark"
                                            dataScheme="primary"
                                            groups={[
                                                {
                                                    label: 'Sort options',
                                                    items: [
                                                        {
                                                            value: 'popular',
                                                            label: 'Most popular',
                                                            icon: 'IconThumbsUpFilled',
                                                            color: 'red dark:text-yellow',
                                                        },
                                                        {
                                                            value: 'newest',
                                                            label: 'Newest date first',
                                                            icon: 'IconClock',
                                                        },
                                                        {
                                                            value: 'oldest',
                                                            label: 'Oldest date first',
                                                            icon: 'IconCalendar',
                                                        },
                                                    ],
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                                <OSTable columns={columns} rows={sortedRows} rowAlignment="top" className="mb-12" />
                            </>
                        )}
                    </>

                    <div className="relative">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-4 items-center">
                                <h1 className="font-bold text-3xl sm:text-4xl my-0">Roadmap</h1>
                                {isModerator && !adding && (
                                    <div className="relative top-1">
                                        <CallToAction onClick={() => setAdding(true)} size="xs" type="secondary">
                                            <Tooltip content="Only moderators can see this" placement="top">
                                                <IconShieldLock className="w-6 h-6 inline-block mr-1" />
                                            </Tooltip>
                                            Add a feature
                                        </CallToAction>
                                    </div>
                                )}
                            </div>
                            <Sort className="hidden sm:flex" setSortBy={setSortBy} sortBy={sortBy} />
                        </div>
                        <p className="my-0 font-semibold mt-2 mb-4">
                            <span className="opacity-70">
                                Here's what we're thinking about building next. Vote for your favorites, or request a
                                new feature{' '}
                            </span>
                            <Link externalNoIcon to="https://github.com/PostHog/posthog/issues">
                                on GitHub
                            </Link>
                            <span className="opacity-70">.</span>
                        </p>
                        <Sort className="sm:hidden flex mt-4" setSortBy={setSortBy} sortBy={sortBy} />

                        {isModerator && adding && (
                            <RoadmapForm
                                status="under-consideration"
                                onSubmit={() => {
                                    mutate()
                                    setAdding(false)
                                }}
                            />
                        )}
                    </div>

                    {/* Team Slider - only show when sorting by team */}
                    {sortBy === 'team' && teams.length > 0 && (
                        <Slider
                            activeIndex={teams.indexOf(selectedTeam)}
                            className="whitespace-nowrap space-x-1.5 mt-4"
                        >
                            {['All teams', ...teams].map((team) => {
                                return (
                                    <button
                                        key={team}
                                        onClick={() => navigate(`?sort=team&team=${encodeURIComponent(team)}`)}
                                        className={`px-2 py-1 text-sm border border-border dark:border-dark rounded-md relative hover:scale-[1.01] active:top-[.5px] active:scale-[.99] ${
                                            selectedTeam === team
                                                ? 'bg-accent dark:bg-accent-dark font-bold'
                                                : 'text-primary-75 dark:hover:text-primary-dark-75 hover:bg-accent/75 dark:hover:bg-accent-dark'
                                        }`}
                                    >
                                        {team.replace(' Team', '')}
                                    </button>
                                )
                            })}
                        </Slider>
                    )}

                    {isLoading ? (
                        <Skeleton />
                    ) : (
                        <ul className="m-0 p-0 list-none mt-10 space-y-10">
                            {sortBy === 'popular' || sortBy === 'latest' ? (
                                [...roadmaps]
                                    .sort((a, b) => {
                                        return sortBy === 'popular'
                                            ? b.attributes.likeCount - a.attributes.likeCount
                                            : b.attributes.createdAt - a.attributes.createdAt
                                    })
                                    .map((roadmap) => {
                                        return (
                                            <li className="" key={roadmap.id}>
                                                <Feature
                                                    id={roadmap.id}
                                                    {...roadmap.attributes}
                                                    onLike={mutate}
                                                    onUpdate={mutate}
                                                />
                                            </li>
                                        )
                                    })
                            ) : (
                                <ul className="m-0 p-0 list-none mt-6 space-y-10">
                                    {teams
                                        .filter((team) => selectedTeam === 'All teams' || team === selectedTeam)
                                        .map((team) => {
                                            const roadmaps = roadmapsGroupedByTeam[team]
                                            return (
                                                <li className="relative" key={team}>
                                                    <h4 className="text-lg m-0 mb-6 pr-2 inline-flex items-center bg-light dark:bg-dark after:-z-10 after:absolute after:w-full after:h-[1px] after:bg-border after:dark:bg-border-dark after:translate-y-[2px]">
                                                        {team}
                                                    </h4>
                                                    <ul className="m-0 p-0 list-none space-y-8">
                                                        {[...roadmaps]
                                                            .sort(
                                                                (a, b) =>
                                                                    b.attributes.likeCount - a.attributes.likeCount
                                                            )
                                                            .map((roadmap) => {
                                                                return (
                                                                    <li key={roadmap.id}>
                                                                        <Feature
                                                                            id={roadmap.id}
                                                                            {...roadmap.attributes}
                                                                            onLike={mutate}
                                                                            onUpdate={mutate}
                                                                        />
                                                                    </li>
                                                                )
                                                            })}
                                                    </ul>
                                                </li>
                                            )
                                        })}
                                </ul>
                            )}

                            <div className="bg-accent dark:bg-accent-dark border border-light dark:border-dark px-8 py-8 rounded-md">
                                <h3 className="m-0 mb-2 text-lg">Request another feature</h3>
                                <p className="mb-3">
                                    We add features to our roadmap based on customer feedback shared{' '}
                                    <Link to="https://github.com/posthog/posthog/issues" external>
                                        in our GitHub repo
                                    </Link>
                                    . We'd love to have you share your best ideas there!
                                </p>
                                <p className="mb-0">
                                    <CallToAction
                                        size="sm"
                                        type="secondary"
                                        to="https://github.com/posthog/posthog/issues"
                                        externalNoIcon
                                    >
                                        Request a feature
                                    </CallToAction>
                                </p>
                            </div>
                        </ul>
                    )}
                </section>
            </ScrollArea>
        </>
    )
}

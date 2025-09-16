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
    IconPencil,
    IconDownload,
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
import Tooltip from 'components/RadixUI/Tooltip'
import Spinner from 'components/Spinner'
import { slugifyTeamName } from 'lib/utils'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSTable from 'components/OSTable'
import { Select } from 'components/RadixUI/Select'
import {
    createFuseInstance,
    processItemsWithHighlighting,
    HighlightedText,
    HighlightedMarkdown,
} from 'components/Editor/SearchUtils'
import { useSearch } from 'components/Editor/SearchProvider'
import ProgressBar from 'components/ProgressBar'
import { Scroll } from 'lucide-react'
import { useApp } from '../../context/App'
import RoadmapWindow from './RoadmapWindow'

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

export const ExportSubscribersButton = ({ roadmap }: { roadmap: any }) => {
    const subscribers = roadmap.attributes.subscribers?.data || []
    const likes = roadmap.attributes.likes?.data || []
    const handleExport = async () => {
        const csv = `First name,Last name,Email,Type\n${subscribers
            .map(({ attributes: { user, firstName, lastName } }) => {
                return `${firstName},${lastName},${user?.data?.attributes?.email},Subscriber`
            })
            .join('\n')}
${likes
    .map(({ attributes: { user, firstName, lastName } }) => {
        return `${firstName},${lastName},${user?.data?.attributes?.email},Voter`
    })
    .join('\n')}`
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${roadmap.attributes.title} subscribers.csv`
        document.body.appendChild(link)
        link.click()
        link.remove()
        URL.revokeObjectURL(url)
    }
    return (
        <button onClick={handleExport}>
            <IconDownload className="size-5" />
        </button>
    )
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
            <div className="flex items-center border border-primary md:border-transparent dark:md:border-transparent hover:border p-0.5 rounded gap-x-[3px] transition-all ease-in-out md:delay-500 hover:delay-0 md:duration-500 w-full md:w-auto">
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
                    ? 'bg-white hover:bg-light dark:bg-dark dark:hover:bg-dark text-primary dark:text-primary-dark font-bold border border-primary'
                    : 'border-transparent hover:border hover:scale-[1.01] hover:top-[-.5px] active:top-[.5px] active:scale-[.99] font-semibold text-secondary hover:text-primary dark:hover:text-primary-dark'
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
    filteredRoadmaps?: any[]
    groupByValue?: string | null
}

export default function Roadmap({ searchQuery = '', filteredRoadmaps, groupByValue }: RoadmapProps) {
    const { search } = useLocation()
    const { user } = useUser()
    const [sortBy, setSortBy] = useState('popular')
    const [tableSort, setTableSort] = useState('popular')
    const [adding, setAdding] = useState(false)
    const [selectedTeam, setSelectedTeam] = useState('All teams')
    const [roadmapSearch, setRoadmapSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [authModalOpen, setAuthModalOpen] = useState(false)
    const [expandedDescriptions, setExpandedDescriptions] = useState<Record<number, boolean>>({})
    const [selectedRoadmapId, setSelectedRoadmapId] = useState<{
        id: number
        title: string
    } | null>(null)
    const [localFilteredRoadmaps, setLocalFilteredRoadmaps] = useState()
    const { addWindow } = useApp()
    const isModerator = user?.role?.type === 'moderator'

    // Get search context if available (from Editor)
    const searchContext = useSearch()

    // Use the Editor's search query if available, otherwise use the prop or local state
    const effectiveSearchTerm = searchContext?.searchQuery || searchQuery || roadmapSearch

    // Update roadmapSearch when searchQuery changes
    useEffect(() => {
        // When searchQuery changes (including being cleared), update roadmapSearch
        setRoadmapSearch(searchQuery || '')
    }, [searchQuery])

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

    // Create a Fuse instance for searching
    const fuse = useMemo(
        () =>
            createFuseInstance(initialRoadmaps, [
                { name: 'attributes.title', weight: 2 }, // Give title more weight
                { name: 'attributes.description', weight: 1 },
            ]),
        [initialRoadmaps]
    )

    // Use filtered roadmaps if provided, otherwise use initial roadmaps
    const roadmapsToUse = filteredRoadmaps || initialRoadmaps

    // Create a Fuse instance for the roadmaps we're using
    const fuseForFiltered = useMemo(
        () =>
            createFuseInstance(roadmapsToUse, [
                { name: 'attributes.title', weight: 2 },
                { name: 'attributes.description', weight: 1 },
            ]),
        [roadmapsToUse]
    )

    // Process roadmaps with search highlighting
    const roadmapsWithHighlights = useMemo(() => {
        // Process the items with highlighting
        const processed = processItemsWithHighlighting(fuseForFiltered, roadmapsToUse, effectiveSearchTerm)

        // If no search results and we have a search term, return empty array
        if (processed.length === 0 && effectiveSearchTerm) {
            return []
        }

        // Otherwise, use the processed items or fall back to all items
        return processed.length > 0 ? processed : roadmapsToUse.map((item) => ({ item, highlightedFields: {} }))
    }, [roadmapsToUse, fuseForFiltered, effectiveSearchTerm])

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

    // Add the staticRoadmaps query back
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

    // Process the roadmaps to include like counts and other data
    const roadmaps = useMemo(() => {
        // If no items with highlights, return empty array
        if (roadmapsWithHighlights.length === 0) return []

        // Transform the items with like counts and other data
        return roadmapsWithHighlights.map(({ item, highlightedFields }) => {
            const { id, attributes } = item
            const likeCount = attributes?.likes?.data?.length || 0
            const staticLikeCount =
                staticRoadmaps.nodes.find((node: any) => node.squeakId === id)?.githubPages?.[0]?.reactions
                    ?.total_count || 0
            return {
                id,
                attributes: { ...attributes, likeCount: likeCount + staticLikeCount },
                highlightedFields,
            }
        })
    }, [roadmapsWithHighlights, staticRoadmaps.nodes])

    const roadmapsGroupedByTeam = groupBy(
        roadmaps,
        (roadmap) => `${roadmap.attributes.teams?.data?.[0]?.attributes?.name ?? 'Any'} Team`
    )
    const teams = Object.keys(roadmapsGroupedByTeam).sort()

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
            ...(isModerator
                ? [
                      { name: '', width: '50px', align: 'center' as const },
                      { name: '', width: '50px', align: 'center' as const },
                  ]
                : []),
        ]
    }, [tableSort, isModerator])

    // Sort the rows based on tableSort value
    const sortedRows = useMemo(() => {
        // Then sort the roadmaps based on the selected sort criteria
        const sortedRoadmaps = (localFilteredRoadmaps || roadmaps).sort((a: any, b: any) => {
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
        return sortedRoadmaps.map((roadmap: any) => {
            const subscriberCount = roadmap.attributes.subscribers?.data?.length || 0
            const likeCount = roadmap.attributes.likes?.data?.length || 0
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

            // Access highlighted fields
            const highlightedTitle = roadmap.highlightedFields?.title
            const highlightedDescription = roadmap.highlightedFields?.description

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
                ...(tableSort === 'newest' || tableSort === 'oldest'
                    ? [
                          {
                              content: <span className="text-sm font-medium">{formattedDate}</span>,
                              className: 'text-secondary dark:text-secondary-dark',
                          },
                      ]
                    : []),
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
                    content: (
                        <h3 className="text-[15px] m-0 font-normal leading-tight">
                            {effectiveSearchTerm && effectiveSearchTerm.length > 1 ? (
                                // Direct approach for highlighting when we have a search term
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: roadmap.attributes.title.replace(
                                            new RegExp(
                                                `(${effectiveSearchTerm.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`,
                                                'gi'
                                            ),
                                            '<strong>$1</strong>'
                                        ),
                                    }}
                                />
                            ) : (
                                // Use the HighlightedText component when no direct search
                                <HighlightedText text={roadmap.attributes.title} highlights={highlightedTitle} />
                            )}
                        </h3>
                    ),
                    className: '!pt-0.75',
                },
                {
                    content: (
                        <div className="text-sm community-post-markdown !p-0">
                            {roadmap.attributes.description.length <= 120 ? (
                                <HighlightedMarkdown
                                    content={roadmap.attributes.description}
                                    searchTerm={effectiveSearchTerm}
                                />
                            ) : expandedDescriptions[roadmap.id] ? (
                                <HighlightedMarkdown
                                    content={roadmap.attributes.description}
                                    searchTerm={effectiveSearchTerm}
                                />
                            ) : (
                                <div>
                                    <HighlightedMarkdown
                                        content={roadmap.attributes.description}
                                        searchTerm={effectiveSearchTerm}
                                        truncate={true}
                                        limit={75}
                                    />
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
                },
                ...(isModerator
                    ? [
                          {
                              content: (
                                  <Tooltip
                                      className="my-auto flex"
                                      trigger={
                                          <button
                                              onClick={() =>
                                                  addWindow(
                                                      <RoadmapWindow
                                                          location={{ pathname: `edit-roadmap-${roadmap.id}` }}
                                                          key={`edit-roadmap`}
                                                          newWindow
                                                          id={roadmap.id}
                                                          status="under-consideration"
                                                          onSubmit={() => {
                                                              mutate()
                                                          }}
                                                      />
                                                  )
                                              }
                                          >
                                              <IconPencil className="size-5" />
                                          </button>
                                      }
                                  >
                                      <p className="text-sm m-0">Edit</p>
                                  </Tooltip>
                              ),
                          },
                          {
                              content: (
                                  <Tooltip
                                      className="my-auto flex"
                                      trigger={<ExportSubscribersButton roadmap={roadmap} />}
                                  >
                                      <p className="text-sm m-0">
                                          Export subscriber list ({subscriberCount + likeCount})
                                      </p>
                                  </Tooltip>
                              ),
                          },
                      ]
                    : []),
            ]

            return {
                roadmapId: roadmap.id,
                cells,
            }
        })
    }, [
        roadmaps,
        tableSort,
        expandedDescriptions,
        loading,
        user,
        selectedTeam,
        effectiveSearchTerm,
        localFilteredRoadmaps,
    ])

    // Group roadmaps if groupByValue is provided
    const groupedRoadmaps = useMemo(() => {
        if (!groupByValue || !sortedRows.length) return null

        const grouped: Record<string, any[]> = {}
        sortedRows.forEach((row) => {
            const roadmap = roadmapsToUse.find((r) => r.id === row.roadmapId)
            const teamName = roadmap?.attributes?.teams?.data?.[0]?.attributes?.name || 'Not assigned'

            if (!grouped[teamName]) {
                grouped[teamName] = []
            }
            grouped[teamName].push(row)
        })

        return grouped
    }, [groupByValue, sortedRows, roadmapsToUse])

    return (
        <section>
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
                            if (selectedRoadmapId) {
                                like(selectedRoadmapId.id, selectedRoadmapId.title)
                            }
                        }}
                        showBanner={false}
                        showProfile={false}
                    />
                </SideModal>
                {isLoading ? (
                    <ProgressBar title="roadmap" />
                ) : (
                    <>
                        <p className="mt-0">
                            Here's what we're thinking about building next. If you want to see what we've shipped
                            recently, <Link to="/changelog">visit the changelog</Link>.
                        </p>
                        <div className="flex justify-between items-center space-x-2 mb-4">
                            {isModerator && !adding && (
                                <div className="relative">
                                    <CallToAction
                                        onClick={() => {
                                            addWindow(
                                                <RoadmapWindow
                                                    location={{ pathname: `add-roadmap` }}
                                                    key={`add-roadmap`}
                                                    newWindow
                                                    status="under-consideration"
                                                    onSubmit={() => {
                                                        mutate()
                                                    }}
                                                />
                                            )
                                        }}
                                        size="xs"
                                        type="secondary"
                                    >
                                        <Tooltip content="Only moderators can see this" placement="top">
                                            <IconShieldLock className="w-6 h-6 inline-block" />
                                        </Tooltip>
                                        Add a feature
                                    </CallToAction>
                                </div>
                            )}
                        </div>
                        {isModerator && adding && (
                            <RoadmapForm
                                status="under-consideration"
                                onSubmit={() => {
                                    mutate()
                                    setAdding(false)
                                }}
                            />
                        )}

                        {groupedRoadmaps ? (
                            <div className="space-y-8 mb-12">
                                {Object.keys(groupedRoadmaps)
                                    .sort()
                                    .map((teamName) => (
                                        <div key={teamName}>
                                            <h3 className="text-lg font-semibold mb-4">{teamName}</h3>
                                            <OSTable
                                                columns={columns}
                                                rows={groupedRoadmaps[teamName]}
                                                rowAlignment="top"
                                                overflowX
                                            />
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <OSTable columns={columns} rows={sortedRows} rowAlignment="top" />
                        )}
                    </>
                )}
            </>
        </section>
    )
}

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { graphql, useStaticQuery } from 'gatsby'
import { useUser } from 'hooks/useUser'
import { IconPencil, IconPlus, IconShieldLock } from '@posthog/icons'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import OSButton from 'components/OSButton'
import { useApp } from '../context/App'
import RoadmapWindow from 'components/Roadmap/RoadmapWindow'
import Tooltip from 'components/RadixUI/Tooltip'
import Timeline from 'components/Timeline'
import { useVirtualizer } from '@tanstack/react-virtual'
import CloudinaryImage from 'components/CloudinaryImage'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { AnimatePresence, motion, PanInfo } from 'framer-motion'
import Markdown from 'components/Squeak/components/Markdown'
import Link from 'components/Link'
import Filters from 'components/Changelog/Filters'

dayjs.extend(utc)

type RoadmapNode = {
    id: number | string
    date: string
    title: string
    description?: string
    profiles?: {
        data?: Array<{
            id?: number | string
            attributes?: {
                firstName?: string
                lastName?: string
                avatar?: {
                    data?: {
                        attributes?: {
                            url?: string
                        }
                    }
                }
                color?: string
                teams?: {
                    data?: Array<{
                        attributes?: {
                            name?: string
                            miniCrest?: {
                                data?: {
                                    attributes?: {
                                        url?: string
                                    }
                                }
                            }
                        }
                    }>
                }
            }
        }>
    }
    teams?: {
        data?: Array<{
            attributes?: {
                name?: string
                miniCrest?: {
                    data?: {
                        attributes?: {
                            url?: string
                        }
                    }
                }
            }
        }>
    }
    topic?: {
        data?: {
            attributes?: {
                label?: string
            }
        }
    }
}

const Roadmap = ({ roadmap }: { roadmap: RoadmapNode }) => {
    const { isModerator } = useUser()
    const { addWindow } = useApp()
    const hasProfiles = (roadmap.profiles?.data?.length ?? 0) > 0
    const [width, setWidth] = useState(450)
    const [isResizing, setIsResizing] = useState(false)

    const handleDragResize = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        setIsResizing(true)
        setWidth((prev) => Math.max(300, Math.min(800, prev - info.delta.x)))
    }

    const handleEditRoadmap = () => {
        addWindow(
            <RoadmapWindow
                location={{ pathname: `edit-roadmap-${roadmap.id}` }}
                key={`edit-roadmap`}
                newWindow
                id={roadmap.id}
                status="complete"
            />
        )
    }

    return (
        <motion.div
            className="h-full border-l border-primary bg-white dark:bg-dark overflow-auto flex-shrink-0 relative"
            initial={{ width: 0 }}
            animate={{ width }}
            exit={{ width: 0 }}
            transition={{ duration: isResizing ? 0 : 0.3 }}
        >
            <div className="p-4">
                <div className="flex justify-between space-x-2">
                    <div>
                        <h4 className="m-0 text-lg leading-tight line-clamp-1">{roadmap.title}</h4>
                        <p className="m-0 opacity-50 text-sm mt-1">{dayjs.utc(roadmap.date).format('MMMM D, YYYY')}</p>
                    </div>
                    {isModerator && (
                        <Tooltip
                            trigger={<OSButton size="md" icon={<IconPencil />} onClick={handleEditRoadmap} />}
                            delay={0}
                        >
                            <IconShieldLock className="size-6 inline-block relative -top-px text-secondary" /> Edit
                            roadmap item
                        </Tooltip>
                    )}
                </div>
                {hasProfiles && (
                    <div className="p-2 border border-primary rounded-md bg-accent mt-2">
                        {roadmap.profiles?.data?.map((profile) => {
                            const avatar = profile.attributes?.avatar?.data?.attributes?.url
                            const name = [profile.attributes?.firstName, profile.attributes?.lastName]
                                .filter(Boolean)
                                .join(' ')
                            const team = profile.attributes?.teams?.data?.[0]
                            return (
                                <Link
                                    to={`/community/profiles/${profile.id}`}
                                    state={{ newWindow: true }}
                                    key={profile.id}
                                    className="flex gap-2 items-center justify-between"
                                >
                                    <div className="flex gap-2 items-center">
                                        {avatar && (
                                            <div
                                                className={`size-10 rounded-full overflow-hidden bg-${profile.attributes?.color}`}
                                            >
                                                <CloudinaryImage
                                                    className={`w-full`}
                                                    src={avatar as `https://res.cloudinary.com/${string}`}
                                                    alt={profile.attributes?.firstName}
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <h5 className="m-0 leading-tight">{name}</h5>
                                            <p className="!m-0 text-sm leading-tight">{team?.attributes?.name}</p>
                                        </div>
                                    </div>
                                    <div>
                                        {team?.attributes?.miniCrest?.data?.attributes?.url && (
                                            <CloudinaryImage
                                                className="w-10"
                                                src={
                                                    team.attributes.miniCrest.data.attributes
                                                        .url as `https://res.cloudinary.com/${string}`
                                                }
                                                alt={team.attributes.name}
                                            />
                                        )}
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                )}
                {roadmap.description && (
                    <div className="mt-2">
                        <Markdown>{roadmap.description}</Markdown>
                    </div>
                )}
            </div>

            {/* Resize handle */}
            <motion.div
                className="group absolute left-0 top-0 w-1.5 bottom-0 cursor-ew-resize !transform-none z-10"
                drag="x"
                dragMomentum={false}
                dragConstraints={{ left: 0, right: 0 }}
                onDrag={handleDragResize}
                onDragEnd={() => setIsResizing(false)}
            >
                <div className="relative w-full h-full">
                    <div className="hidden group-hover:block absolute inset-y-0 left-0 w-[2px] bg-primary opacity-50" />
                </div>
            </motion.div>
        </motion.div>
    )
}

interface RoadmapCardsProps {
    roadmaps: RoadmapNode[]
    setPercentageOfScrollInView: (percentage: number) => void
    windowPercentageFromLeft: number
    setRoadmapsPercentageFromLeft: (percentage: number) => void
    onRoadmapClick: (roadmap: RoadmapNode) => void
    containerWidth: number
    startYear: number
    endYear: number
    activeRoadmap: RoadmapNode | null
}

const RoadmapCards = ({
    startYear,
    endYear,
    roadmaps,
    setPercentageOfScrollInView,
    windowPercentageFromLeft,
    setRoadmapsPercentageFromLeft,
    onRoadmapClick,
    containerWidth,
    activeRoadmap,
}: RoadmapCardsProps) => {
    const width = 350

    const containerRef = useRef<HTMLDivElement>(null)

    const getWeekOfMonth = (date: string) => {
        return Math.min(4, Math.ceil(dayjs.utc(date).date() / 7))
    }

    const toRomanNumeral = (num: number): string => {
        const romanNumerals: Record<number, string> = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV' }
        return romanNumerals[num] || num.toString()
    }

    const weeks = useMemo(() => {
        const monthWeeks: Array<{ roadmaps: RoadmapNode[]; year: number; month: number; week: number }> = []
        const now = dayjs.utc()
        const currentYear = now.year()
        const currentMonthIndex = now.month() // 0-based
        for (let y = startYear; y <= endYear && y <= currentYear; y++) {
            const lastMonthIndexForYear = y === currentYear ? currentMonthIndex : 11
            for (let m = 0; m <= lastMonthIndexForYear; m++) {
                const items = roadmaps.filter((r) => {
                    const d = dayjs.utc(r.date)
                    return d.year() === y && d.month() === m
                })
                const buckets: Record<number, RoadmapNode[]> = {}
                items.forEach((item) => {
                    const week = getWeekOfMonth(item.date)
                    if (!buckets[week]) buckets[week] = []
                    buckets[week].push(item)
                })
                // Create week entries with metadata
                for (let w = 1; w <= 4; w++) {
                    monthWeeks.push({
                        roadmaps: buckets[w] || [],
                        year: y,
                        month: m, // 0-based
                        week: w,
                    })
                }
            }
        }
        return monthWeeks
    }, [roadmaps, startYear, endYear])

    const virtualizer = useVirtualizer({
        horizontal: true,
        count: weeks.length,
        getScrollElement: () => {
            // Get the ScrollArea viewport element
            const viewport = containerRef.current?.closest('[data-radix-scroll-area-viewport]') as HTMLElement | null
            return viewport
        },
        estimateSize: () => width,

        overscan: 5,
        gap: 15,
    })

    useLayoutEffect(() => {
        virtualizer.measure()
    }, [width])

    useEffect(() => {
        const viewport = containerRef.current?.closest('[data-radix-scroll-area-viewport]') as HTMLElement | null
        if (!viewport) return

        const percentageOfScrollInView = (containerWidth / viewport.scrollWidth) * 100
        setPercentageOfScrollInView(percentageOfScrollInView)
        virtualizer.measure()
    }, [containerWidth])

    useEffect(() => {
        const viewport = containerRef.current?.closest('[data-radix-scroll-area-viewport]') as HTMLElement | null
        if (!viewport) return
        viewport.scrollTo({
            left: (windowPercentageFromLeft / 100) * viewport.scrollWidth,
        })
    }, [windowPercentageFromLeft])

    useEffect(() => {
        const viewport = containerRef.current?.closest('[data-radix-scroll-area-viewport]') as HTMLElement | null
        if (!viewport) return

        const handleScroll = () => {
            setRoadmapsPercentageFromLeft(((viewport.scrollLeft || 0) / (viewport.scrollWidth || 0)) * 100)
        }

        viewport.addEventListener('scroll', handleScroll)
        return () => {
            viewport.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // Scroll to latest week with roadmaps on mount
    useEffect(() => {
        const viewport = containerRef.current?.closest('[data-radix-scroll-area-viewport]') as HTMLElement | null
        if (!viewport) return

        // Find the last week that has roadmap items
        const lastNonEmptyWeekIndex = weeks.reduce((lastIndex, week, index) => {
            return week.roadmaps.length > 0 ? index : lastIndex
        }, -1)

        if (lastNonEmptyWeekIndex === -1) return

        // Wait for content to be rendered and measured
        const scrollToLastWeek = () => {
            const virtualItems = virtualizer.getVirtualItems()
            if (virtualItems.length === 0) return

            // Calculate scroll position for the last week with content
            // We want to show the last few weeks, not scroll all the way to the absolute end
            const targetIndex = Math.max(0, lastNonEmptyWeekIndex)
            const scrollLeft = targetIndex * (width + 15) // width + gap

            viewport.scrollTo({
                left: scrollLeft,
            })
        }

        // Delay to ensure virtualizer has measured content
        const timer = setTimeout(scrollToLastWeek, 100)
        return () => clearTimeout(timer)
    }, [weeks, width])

    return (
        <ScrollArea className="size-full [&>div>div]:size-full">
            <div className="h-full px-4">
                <div
                    ref={containerRef}
                    style={{
                        width: `${virtualizer.getTotalSize()}px`,
                    }}
                    className="h-full relative"
                >
                    {virtualizer.getVirtualItems().map((virtualColumn) => {
                        const weekData = weeks[virtualColumn.index]
                        const monthName = dayjs.utc().year(weekData.year).month(weekData.month).format('MMMM')
                        const weekRoman = toRomanNumeral(weekData.week)
                        const count = weekData.roadmaps.length

                        return (
                            <div
                                key={virtualColumn.index}
                                className="flex justify-center"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    height: '100%',
                                    width: `${virtualColumn.size}px`,
                                    transform: `translateX(${virtualColumn.start}px)`,
                                }}
                            >
                                <div className="w-full h-full flex flex-col bg-white dark:bg-dark rounded border border-primary overflow-hidden">
                                    <div className="flex items-center justify-between p-4 border-b border-primary">
                                        <h4 className="m-0 text-lg font-semibold">
                                            {monthName} {weekData.year} - Week {weekRoman}
                                        </h4>
                                        <div className="size-7 flex items-center justify-center bg-accent rounded-full text-sm font-semibold">
                                            {count}
                                        </div>
                                    </div>
                                    <ul className="w-full flex-1 overflow-y-auto p-4 m-0 list-none">
                                        {weekData.roadmaps.map((roadmap) => {
                                            const active = activeRoadmap?.id === roadmap.id
                                            return (
                                                <li key={roadmap.id} className="p-0 mt-0">
                                                    <button
                                                        className={`w-full text-left p-2 rounded-md border bg-accent flex justify-between ${
                                                            active ? 'border-black dark:border-white' : 'border-primary'
                                                        }`}
                                                        onClick={() => onRoadmapClick(roadmap)}
                                                    >
                                                        <div>
                                                            <h5 className="m-0 underline text-base leading-tight mb-1">
                                                                {roadmap.title}
                                                            </h5>
                                                            <p className="!m-0 text-sm">
                                                                {roadmap.teams?.data?.[0]?.attributes?.name} Team
                                                            </p>
                                                        </div>
                                                        {roadmap.teams?.data?.[0]?.attributes?.miniCrest?.data
                                                            ?.attributes?.url && (
                                                            <div className="shrink-0">
                                                                <CloudinaryImage
                                                                    className="w-10"
                                                                    width={80}
                                                                    src={
                                                                        roadmap.teams.data[0].attributes.miniCrest.data
                                                                            .attributes
                                                                            .url as `https://res.cloudinary.com/${string}`
                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                    </button>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </ScrollArea>
    )
}

export default function Changelog(): JSX.Element {
    const timelineContainerRef = useRef<HTMLDivElement>(null)
    const resizeObserverRef = useRef<HTMLDivElement>(null)
    const { addWindow } = useApp()
    const { isModerator } = useUser()
    const [windowX, setWindowX] = useState(0)
    const [percentageOfScrollInView, setPercentageOfScrollInView] = useState(0)
    const [windowPercentageFromLeft, setWindowPercentageFromLeft] = useState(0)
    const [roadmapsPercentageFromLeft, setRoadmapsPercentageFromLeft] = useState(0)
    const [activeRoadmap, setActiveRoadmap] = useState<RoadmapNode | null>(null)
    const [containerWidth, setContainerWidth] = useState(0)
    const [teamFilter, setTeamFilter] = useState('all')
    const [categoryFilter, setCategoryFilter] = useState('all')
    const [hideEmpty, setHideEmpty] = useState(false)
    const data = useStaticQuery(graphql`
        {
            allRoadmap(filter: { complete: { eq: true }, date: { ne: null } }, sort: { fields: date }) {
                nodes {
                    id: strapiID
                    date
                    title
                    description
                    profiles {
                        data {
                            id
                            attributes {
                                firstName
                                lastName
                                avatar {
                                    data {
                                        attributes {
                                            url
                                        }
                                    }
                                }
                                color
                                teams {
                                    data {
                                        attributes {
                                            name
                                            miniCrest {
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
                    teams {
                        data {
                            attributes {
                                name
                                miniCrest {
                                    data {
                                        attributes {
                                            url
                                        }
                                    }
                                }
                            }
                        }
                    }
                    topic {
                        data {
                            attributes {
                                label
                            }
                        }
                    }
                }
            }
        }
    `)

    const handleAddFeature = () => {
        addWindow(
            React.createElement(RoadmapWindow, {
                location: { pathname: `add-roadmap` },
                key: `add-roadmap`,
                newWindow: true,
                status: 'complete',
            }) as unknown as never
        )
    }

    const handleDrag = (percentageFromLeft: number) => {
        setWindowPercentageFromLeft(percentageFromLeft)
    }

    const filteredData = useMemo(() => {
        let filtered = data.allRoadmap.nodes

        if (teamFilter !== 'all') {
            filtered = filtered.filter((roadmap: RoadmapNode) =>
                roadmap.teams?.data?.some((team) => team.attributes?.name === teamFilter)
            )
        }

        if (categoryFilter !== 'all') {
            filtered = filtered.filter(
                (roadmap: RoadmapNode) => roadmap.topic?.data?.attributes?.label === categoryFilter
            )
        }

        return filtered
    }, [teamFilter, categoryFilter, data.allRoadmap.nodes])

    const roadmapsGrouped = useMemo(() => {
        const grouped: {
            [year: number]: {
                [month: number]: {
                    [week: number]: { count: number }
                }
            }
        } = {}

        filteredData.forEach((roadmap: { date: string }) => {
            const d = dayjs.utc(roadmap.date)
            const year = d.year()
            const month = d.month() + 1 // 1-12
            const dayOfMonth = d.date() // 1-31
            // Bucket into 4 week-like groups per month
            const week = Math.min(4, Math.floor((dayOfMonth - 1) / 7) + 1) // 1-4

            if (!grouped[year]) grouped[year] = {}
            if (!grouped[year][month]) grouped[year][month] = {}
            if (!grouped[year][month][week]) grouped[year][month][week] = { count: 0 }
            grouped[year][month][week].count += 1
        })

        return grouped
    }, [filteredData])

    useEffect(() => {
        if (!resizeObserverRef.current) return

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setContainerWidth(entry.contentRect.width)
            }
        })

        resizeObserver.observe(resizeObserverRef.current)

        // Set initial width
        setContainerWidth(resizeObserverRef.current.clientWidth)

        return () => {
            resizeObserver.disconnect()
        }
    }, [])

    // Scroll timeline to the end on mount
    useEffect(() => {
        if (!timelineContainerRef.current) return

        const timelineViewport = timelineContainerRef.current.closest(
            '[data-radix-scroll-area-viewport]'
        ) as HTMLElement | null
        if (!timelineViewport) return

        const scrollToEnd = () => {
            timelineViewport.scrollTo({
                left: timelineViewport.scrollWidth,
            })
        }

        // Delay to ensure timeline is rendered
        const timer = setTimeout(scrollToEnd, 100)
        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            <SEO title="Changelog - PostHog" />
            <Editor
                hasTabs
                type="changelog"
                maxWidth="100%"
                bookmark={{
                    title: 'Changelog',
                    description: 'Latest updates and releases',
                }}
            >
                <div className="relative h-full flex">
                    <div ref={resizeObserverRef} className="flex flex-col flex-1 min-w-0 h-full">
                        <div className="min-h-0 flex-shrink-0 flex justify-between items-center px-4 mt-2">
                            <Filters
                                onTeamChange={setTeamFilter}
                                teamFilterValue={teamFilter}
                                onCategoryChange={setCategoryFilter}
                                categoryFilterValue={categoryFilter}
                                hideEmpty={hideEmpty}
                                onHideEmptyChange={setHideEmpty}
                            />
                            {isModerator && (
                                <Tooltip
                                    trigger={<OSButton size="md" icon={<IconPlus />} onClick={handleAddFeature} />}
                                    delay={0}
                                >
                                    <IconShieldLock className="size-6 inline-block relative -top-px text-secondary" />{' '}
                                    Add roadmap item
                                </Tooltip>
                            )}
                        </div>

                        <div className="min-h-0 flex-grow pt-2">
                            <RoadmapCards
                                startYear={2020}
                                endYear={2025}
                                roadmaps={filteredData}
                                setPercentageOfScrollInView={setPercentageOfScrollInView}
                                windowPercentageFromLeft={windowPercentageFromLeft}
                                setRoadmapsPercentageFromLeft={setRoadmapsPercentageFromLeft}
                                onRoadmapClick={setActiveRoadmap}
                                containerWidth={containerWidth}
                                activeRoadmap={activeRoadmap}
                            />
                        </div>
                        <div className="min-h-0 flex-shrink-0 mt-auto">
                            <Timeline
                                startYear={2020}
                                endYear={2025}
                                data={roadmapsGrouped}
                                onDrag={handleDrag}
                                windowX={windowX}
                                setWindowX={setWindowX}
                                containerRef={timelineContainerRef}
                                percentageOfScrollInView={percentageOfScrollInView}
                                roadmapsPercentageFromLeft={roadmapsPercentageFromLeft}
                            />
                        </div>
                    </div>
                    <AnimatePresence>{activeRoadmap && <Roadmap roadmap={activeRoadmap} />}</AnimatePresence>
                </div>
            </Editor>
        </>
    )
}

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { graphql, useStaticQuery } from 'gatsby'
import { useUser } from 'hooks/useUser'
import { IconPlus, IconShieldLock } from '@posthog/icons'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import OSButton from 'components/OSButton'
import { useApp } from '../context/App'
import RoadmapWindow from 'components/Roadmap/RoadmapWindow'
import Tooltip from 'components/RadixUI/Tooltip'
import Timeline from 'components/Timeline'
import { useVirtualizer, defaultRangeExtractor } from '@tanstack/react-virtual'
import { useWindow } from '../context/Window'
import CloudinaryImage from 'components/CloudinaryImage'

dayjs.extend(utc)

type RoadmapNode = { id: number | string; date: string; title: string }

interface RoadmapCardsProps {
    roadmaps: RoadmapNode[]
    activeMonth: number
    startYear: number
    endYear: number
    onIndexChange: (activeMonth: number) => void
}

const RoadmapCards = ({ roadmaps, activeMonth, startYear, endYear, onIndexChange }: RoadmapCardsProps) => {
    const { appWindow } = useWindow()
    const width = appWindow?.size.width || 0

    const containerRef = useRef<HTMLDivElement>(null)

    const getWeekOfMonth = (date: string) => {
        return Math.min(4, Math.ceil(dayjs.utc(date).date() / 7))
    }

    const months = useMemo(() => {
        const monthWeeks: RoadmapNode[][][] = []
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
                const arr: RoadmapNode[][] = [buckets[1] || [], buckets[2] || [], buckets[3] || [], buckets[4] || []]
                monthWeeks.push(arr)
            }
        }
        return monthWeeks
    }, [roadmaps, startYear, endYear])

    const virtualizer = useVirtualizer({
        horizontal: true,
        count: months.length,
        getScrollElement: () => containerRef.current,
        estimateSize: () => width,
        overscan: 5,
        rangeExtractor: (range) => {
            onIndexChange(Math.max(range.startIndex, range.endIndex) + 1)
            return defaultRangeExtractor(range)
        },
    })

    useLayoutEffect(() => {
        virtualizer.measure()
    }, [width, virtualizer])

    useEffect(() => {
        virtualizer.scrollToIndex(activeMonth - 1)
    }, [activeMonth])

    return (
        <div
            ref={containerRef}
            className="h-full snap-x"
            style={{
                width,
                overflow: 'auto',
            }}
        >
            <div
                style={{
                    width: `${virtualizer.getTotalSize()}px`,
                    height: '100%',
                    position: 'relative',
                }}
            >
                {virtualizer.getVirtualItems().map((virtualColumn) => (
                    <div
                        key={virtualColumn.index}
                        className="grid grid-cols-4 gap-4 px-2 snap-center"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: `${virtualColumn.size}px`,
                            transform: `translateX(${virtualColumn.start}px)`,
                        }}
                    >
                        {months[virtualColumn.index].map((weeks, index) => {
                            return (
                                <div
                                    key={`${virtualColumn.index}-${index}`}
                                    className="w-full p-4 bg-white rounded border border-primary"
                                >
                                    <div className="mb-2">
                                        <h4 className="m-0 text-lg">
                                            {dayjs().month(virtualColumn.index).format('MMMM')} - Week {index + 1}
                                        </h4>
                                    </div>

                                    <ul className="list-none m-0 space-y-2 p-0">
                                        {weeks.map((roadmap) => (
                                            <li key={roadmap.id} className="p-0 mt-0">
                                                <button className="w-full text-left p-2 rounded-md border border-primary bg-accent flex justify-between">
                                                    <div>
                                                        <h5 className="m-0 underline text-base leading-tight mb-1">
                                                            {roadmap.title}
                                                        </h5>
                                                        <p className="!m-0 text-sm">
                                                            {roadmap.teams?.data?.[0]?.attributes?.name} Team
                                                        </p>
                                                    </div>
                                                    <div className="shrink-0">
                                                        <CloudinaryImage
                                                            className="w-10"
                                                            width={80}
                                                            src={
                                                                roadmap.teams?.data?.[0]?.attributes?.miniCrest?.data
                                                                    ?.attributes?.url
                                                            }
                                                        />
                                                    </div>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function Changelog(): JSX.Element {
    const timelineContainerRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const { addWindow } = useApp()
    const { isModerator } = useUser()
    const [activeMonth, setActiveMonth] = useState(1)
    const [windowX, setWindowX] = useState(0)
    const [windowDragging, setWindowDragging] = useState(false)
    const data = useStaticQuery(graphql`
        {
            allRoadmap(filter: { complete: { eq: true }, date: { ne: null } }, sort: { fields: date }) {
                nodes {
                    id
                    date
                    title
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

    const handleMonthClick = (monthInView: number) => {
        setActiveMonth(monthInView)
    }

    const handleDrag = (monthInView: number) => {
        setWindowDragging(true)
        setActiveMonth(monthInView)
    }
    const handleDragEnd = () => {
        setWindowDragging(false)
    }

    const roadmapsGrouped = useMemo(() => {
        const grouped: {
            [year: number]: {
                [month: number]: {
                    [week: number]: { count: number }
                }
            }
        } = {}

        data.allRoadmap.nodes.forEach((roadmap: { date: string }) => {
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
    }, [data.allRoadmap.nodes])

    const handleIndexChange = (activeMonth: number) => {
        if (windowDragging) return
        const el = document.getElementById(`timeline-${activeMonth}`)
        if (!el || !timelineContainerRef.current) return
        setWindowX(el.getBoundingClientRect().left - timelineContainerRef.current.getBoundingClientRect().left || 0)
    }

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
                extraMenuOptions={
                    isModerator ? (
                        <>
                            <Tooltip
                                trigger={<OSButton size="md" icon={<IconPlus />} onClick={handleAddFeature} />}
                                delay={0}
                            >
                                <IconShieldLock className="size-6 inline-block relative -top-px text-secondary" /> Add
                                roadmap item
                            </Tooltip>
                        </>
                    ) : null
                }
            >
                <div className="flex flex-col h-full" ref={containerRef}>
                    <div className="min-h-0 flex-grow pt-4">
                        <RoadmapCards
                            roadmaps={data.allRoadmap.nodes}
                            activeMonth={activeMonth}
                            startYear={2020}
                            endYear={2025}
                            onIndexChange={handleIndexChange}
                        />
                    </div>
                    <div className="min-h-0 flex-shrink-0 mt-auto">
                        <Timeline
                            startYear={2020}
                            endYear={2025}
                            data={roadmapsGrouped}
                            onDrag={handleDrag}
                            onDragEnd={handleDragEnd}
                            windowX={windowX}
                            setWindowX={setWindowX}
                            onMonthClick={handleMonthClick}
                            containerRef={timelineContainerRef}
                        />
                    </div>
                </div>
            </Editor>
        </>
    )
}

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
import { useVirtualizer } from '@tanstack/react-virtual'
import { useWindow } from '../context/Window'
import CloudinaryImage from 'components/CloudinaryImage'

dayjs.extend(utc)

type RoadmapNode = {
    id: number | string
    date: string
    title: string
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

interface RoadmapCardsProps {
    roadmaps: RoadmapNode[]
    setPercentageOfScrollInView: (percentage: number) => void
    windowPercentageFromLeft: number
    setRoadmapsPercentageFromLeft: (percentage: number) => void
}

const RoadmapCards = ({
    roadmaps,
    setPercentageOfScrollInView,
    windowPercentageFromLeft,
    setRoadmapsPercentageFromLeft,
}: RoadmapCardsProps) => {
    const { appWindow } = useWindow()
    const width = 350
    const startYear = dayjs.utc(roadmaps[0].date).year()
    const endYear = dayjs.utc(roadmaps[roadmaps.length - 1].date).year()

    const containerRef = useRef<HTMLDivElement>(null)

    const getWeekOfMonth = (date: string) => {
        return Math.min(4, Math.ceil(dayjs.utc(date).date() / 7))
    }

    const weeks = useMemo(() => {
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
        return monthWeeks.flat()
    }, [roadmaps, startYear, endYear])

    const virtualizer = useVirtualizer({
        horizontal: true,
        count: weeks.length,
        getScrollElement: () => containerRef.current,
        estimateSize: () => width,
        overscan: 5,
        gap: 15,
    })

    useLayoutEffect(() => {
        virtualizer.measure()
    }, [width, virtualizer])

    useEffect(() => {
        const percentageOfScrollInView =
            ((appWindow?.size?.width || 0) / (containerRef.current?.scrollWidth || 0)) * 100
        setPercentageOfScrollInView(percentageOfScrollInView)
    }, [appWindow?.size?.width])

    useEffect(() => {
        containerRef?.current?.scrollTo({
            left: (windowPercentageFromLeft / 100) * (containerRef.current?.scrollWidth || 0),
        })
    }, [windowPercentageFromLeft])

    useEffect(() => {
        const handleScroll = () => {
            setRoadmapsPercentageFromLeft(
                ((containerRef.current?.scrollLeft || 0) / (containerRef.current?.scrollWidth || 0)) * 100
            )
        }
        containerRef.current?.addEventListener('scroll', handleScroll)
        return () => {
            containerRef.current?.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="size-full"
            style={{
                overflow: 'auto',
            }}
        >
            <div
                style={{
                    width: `${virtualizer.getTotalSize()}px`,
                }}
                className="h-full relative"
            >
                {virtualizer.getVirtualItems().map((virtualColumn) => {
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
                            <ul className="w-full h-full overflow-y-auto p-4 bg-white rounded border border-primary m-0 list-none">
                                {weeks[virtualColumn.index].map((roadmap) => {
                                    return (
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
                                                {roadmap.teams?.data?.[0]?.attributes?.miniCrest?.data?.attributes
                                                    ?.url && (
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
                    )
                })}
            </div>
        </div>
    )
}

export default function Changelog(): JSX.Element {
    const timelineContainerRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const { addWindow } = useApp()
    const { isModerator } = useUser()
    const [windowX, setWindowX] = useState(0)
    const [percentageOfScrollInView, setPercentageOfScrollInView] = useState(0)
    const [windowPercentageFromLeft, setWindowPercentageFromLeft] = useState(0)
    const [roadmapsPercentageFromLeft, setRoadmapsPercentageFromLeft] = useState(0)
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

    const handleDrag = (percentageFromLeft: number) => {
        setWindowPercentageFromLeft(percentageFromLeft)
    }

    const handleDragEnd = () => {
        // Drag ended - no action needed currently
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
                            setPercentageOfScrollInView={setPercentageOfScrollInView}
                            windowPercentageFromLeft={windowPercentageFromLeft}
                            setRoadmapsPercentageFromLeft={setRoadmapsPercentageFromLeft}
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
                            containerRef={timelineContainerRef}
                            percentageOfScrollInView={percentageOfScrollInView}
                            roadmapsPercentageFromLeft={roadmapsPercentageFromLeft}
                        />
                    </div>
                </div>
            </Editor>
        </>
    )
}

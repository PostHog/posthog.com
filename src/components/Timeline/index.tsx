import ScrollArea from 'components/RadixUI/ScrollArea'
import React, { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'

interface TimelineProps {
    startYear?: number
    endYear?: number
    data?: {
        [year: string]: {
            [month: string]: {
                [week: string]: {
                    count: number
                }
            }
        }
    }
    onDrag: (monthInView: number) => void
    activeMonth?: number
    windowX: number
    setWindowX: (windowX: number) => void
    onMonthClick: (monthInView: number) => void
    onDragEnd: () => void
    containerRef: React.RefObject<HTMLDivElement>
}

const WEEK_BOX_SIZE = 10

export default function Timeline({
    startYear = 2020,
    endYear = 2025,
    data,
    onDrag,
    activeMonth,
    windowX,
    setWindowX,
    onMonthClick,
    onDragEnd,
    containerRef,
}: TimelineProps): JSX.Element {
    const windowRef = useRef<HTMLDivElement>(null)
    const [windowWidth, setWindowWidth] = useState(0)
    const getAcivityColor = (count: number) => {
        if (count <= 0) return 'bg-black'
        if (count === 1) return 'bg-green opacity-60'
        if (count === 2) return 'bg-green opacity-80'
        if (count >= 3) return 'bg-green'
    }

    const handleMonthClick = (month: number) => {
        onMonthClick(month)
    }

    const getMonthInView = (left?: number) => {
        if (!containerRef.current || !windowRef.current) return 0
        const windowRect = windowRef.current.getBoundingClientRect()
        const desiredLeft = left ?? windowRect.left - (containerRef.current?.getBoundingClientRect().left || 0)
        const inView = desiredLeft + windowWidth
        const monthInView = inView / windowWidth
        return Math.round(monthInView)
    }

    const handleDrag = () => {
        const monthInView = getMonthInView()
        onDrag(monthInView)
    }

    const handleDragEnd = () => {
        onDragEnd()
        const monthInView = getMonthInView()
        const el = document.getElementById(`timeline-${monthInView}`)
        if (!el || !containerRef.current) return
        setWindowX(el.getBoundingClientRect().left - containerRef.current.getBoundingClientRect().left || 0)
    }

    useEffect(() => {
        const firstMonth = document.getElementById(`timeline-1`)
        if (!firstMonth || !containerRef.current) return
        const firstMonthRect = firstMonth.getBoundingClientRect()
        setWindowWidth(firstMonthRect.width + 1)

        const scrollViewport = containerRef.current.closest('[data-radix-scroll-area-viewport]') as HTMLElement | null
        if (scrollViewport) {
            scrollViewport.scrollTo({
                left: scrollViewport.scrollWidth,
            })
        }
    }, [])

    useEffect(() => {
        if (!activeMonth || !containerRef.current) return
        const el = document.getElementById(`timeline-${activeMonth}`)
        if (!el) return
        const containerLeft = containerRef.current.getBoundingClientRect().left || 0
        const targetLeft = el.getBoundingClientRect().left - containerLeft
        setWindowX(targetLeft || 0)
    }, [activeMonth])

    return (
        <ScrollArea>
            <div ref={containerRef} className="flex py-8 px-2 relative">
                {(() => {
                    const now = dayjs()
                    const currentYear = now.year()
                    const yearsToRender = Array.from(
                        { length: Math.max(0, Math.min(endYear, currentYear) - startYear + 1) },
                        (_, i) => startYear + i
                    )
                    return yearsToRender
                })().map((year, yearIndex) => {
                    const now = dayjs()
                    const currentYear = now.year()
                    const lastMonthForYear = year === currentYear ? now.month() + 1 : 12 // month is 1-12 here
                    return Array.from({ length: lastMonthForYear }, (_, i) => i + 1).map((month) => {
                        return (
                            <button
                                className="relative flex flex-col gap-1 items-center px-2 border-l border-primary py-1 first:border-l-transparent"
                                key={`${year}-${month}`}
                                id={`timeline-${month + yearIndex * 12}`}
                                onPointerDown={() => handleMonthClick(month + yearIndex * 12)}
                            >
                                <div className="flex gap-1">
                                    {Array.from({ length: 4 }, (_, i) => i + 1).map((day) => {
                                        const count = data?.[year]?.[month]?.[day]?.count || 0
                                        const color = getAcivityColor(count)
                                        return (
                                            <div
                                                style={{ width: WEEK_BOX_SIZE, height: WEEK_BOX_SIZE }}
                                                className={`rounded-[1px] ${color}`}
                                                key={`${year}-${month}-${day}`}
                                            />
                                        )
                                    })}
                                </div>
                                <p className="text-sm text-primary m-0 font-semibold absolute translate-y-1/2">
                                    {dayjs()
                                        .month(month - 1)
                                        .format('MMM')}
                                </p>
                            </button>
                        )
                    })
                })}
                <motion.div
                    ref={windowRef}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    animate={{ x: windowX, y: 0, top: 0 }}
                    drag="x"
                    dragDirectionLock
                    dragMomentum={false}
                    dragConstraints={{ top: 0, bottom: 0 }}
                    transformTemplate={({ x, scale }) => {
                        const xValue = typeof x === 'number' ? `${x}px` : x || '0px'
                        const scaleValue = typeof scale === 'number' ? scale : 1
                        return `translate3d(${xValue}, 50%, 0) scale(${scaleValue})`
                    }}
                    style={{ width: windowWidth, y: 0, top: 0 }}
                    className="absolute left-0 top-0 h-[48px] border-[2px] border-primary rounded"
                />
            </div>
        </ScrollArea>
    )
}

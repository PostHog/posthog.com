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
    windowX: number
    setWindowX: (windowX: number) => void
    onDragEnd: () => void
    containerRef: React.RefObject<HTMLDivElement>
    percentageOfScrollInView: number
    roadmapsPercentageFromLeft: number
}

const WEEK_BOX_SIZE = 10

export default function Timeline({
    startYear = 2020,
    endYear = 2025,
    data,
    onDrag,
    windowX,
    setWindowX,
    onDragEnd,
    containerRef,
    percentageOfScrollInView,
    roadmapsPercentageFromLeft,
}: TimelineProps): JSX.Element {
    const [isDragging, setIsDragging] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0)
    const windowRef = useRef<HTMLDivElement>(null)
    const getAcivityColor = (count: number) => {
        if (count <= 0) return 'bg-black'
        if (count === 1) return 'bg-green opacity-60'
        if (count === 2) return 'bg-green opacity-80'
        if (count >= 3) return 'bg-green'
    }

    const handleDrag = () => {
        setIsDragging(true)
        if (!containerRef.current || !windowRef.current) return

        const windowRect = windowRef.current.getBoundingClientRect()
        const containerRect = containerRef.current.getBoundingClientRect()

        // Get the window's left position relative to the container
        const relativeLeft = windowRect.left - containerRect.left

        // Get the total scrollable width
        const totalScrollWidth = containerRef.current.scrollWidth

        // Calculate percentage (0-100)
        const percentageFromLeft = (relativeLeft / totalScrollWidth) * 100

        onDrag(percentageFromLeft)
    }

    const handleDragEnd = () => {
        setIsDragging(false)
        onDragEnd()
    }

    const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
        if (!containerRef.current) return

        // get click position left relative to container
        const containerLeft = containerRef.current.getBoundingClientRect().left
        const clickLeft = e.clientX - containerLeft

        // Center the window at the click position by offsetting by half the window width
        const centeredLeft = clickLeft - windowWidth / 2

        // Apply constraints to keep window within bounds
        const totalScrollWidth = containerRef.current.scrollWidth
        const minLeft = 0
        const maxLeft = totalScrollWidth - windowWidth
        const constrainedLeft = Math.max(minLeft, Math.min(maxLeft, centeredLeft))

        // Calculate percentage from constrained position
        const percentageFromLeft = (constrainedLeft / totalScrollWidth) * 100

        // Update window position and trigger scroll
        setWindowX(constrainedLeft)
        setIsDragging(true)
        onDrag(percentageFromLeft)

        // Reset dragging state after a short delay to allow the scroll to happen
        setTimeout(() => {
            setIsDragging(false)
            onDragEnd()
        }, 100)
    }

    useEffect(() => {
        // get percentage of width relative to percentage of scroll in view
        // Account for borders (1px each) - spacing is handled by px-2 padding on each button
        const BORDER = 1 // border-r width in pixels
        const scrollWidth = containerRef.current?.scrollWidth || 0
        const containerElement = containerRef.current
        if (!containerElement) return

        // Count the number of items (months)
        const itemCount = containerElement.children.length - 1 // -1 for the motion.div window
        const totalBorderWidth = itemCount * BORDER // Each month has a border-r
        const totalContentWidth = scrollWidth - totalBorderWidth

        // Calculate width based on percentage, then add proportional border widths
        const contentWidth = (percentageOfScrollInView / 100) * totalContentWidth
        const proportionalBorders = itemCount > 0 ? (contentWidth / totalContentWidth) * totalBorderWidth : 0
        const width = contentWidth + proportionalBorders

        setWindowWidth(width)
    }, [percentageOfScrollInView])

    useEffect(() => {
        if (isDragging) return
        if (!containerRef.current) return

        const totalScrollWidth = containerRef.current.scrollWidth
        const desiredLeft = (roadmapsPercentageFromLeft / 100) * totalScrollWidth

        // Apply constraints to keep window within bounds
        const minLeft = 0
        const maxLeft = totalScrollWidth - windowWidth
        const constrainedLeft = Math.max(minLeft, Math.min(maxLeft, desiredLeft))

        setWindowX(constrainedLeft)
    }, [roadmapsPercentageFromLeft, windowWidth, isDragging])

    useEffect(() => {
        // Skip during dragging
        if (isDragging) return
        if (!containerRef.current) return

        const scrollViewport = containerRef.current.closest('[data-radix-scroll-area-viewport]') as HTMLElement | null
        if (!scrollViewport) return

        const windowLeft = windowX
        const windowRight = windowX + windowWidth
        const viewportScrollLeft = scrollViewport.scrollLeft
        const viewportWidth = scrollViewport.clientWidth
        const viewportScrollRight = viewportScrollLeft + viewportWidth

        // Check if window is out of view and scroll by full viewport width
        if (windowRight < viewportScrollLeft) {
            // Window is completely to the left, scroll left by viewport width
            scrollViewport.scrollTo({
                left: Math.max(0, viewportScrollLeft - viewportWidth),
                behavior: 'smooth',
            })
        } else if (windowLeft > viewportScrollRight) {
            // Window is completely to the right, scroll right by viewport width
            scrollViewport.scrollTo({
                left: viewportScrollLeft + viewportWidth,
                behavior: 'smooth',
            })
        }
    }, [windowX, windowWidth, isDragging])

    return (
        <ScrollArea>
            <div ref={containerRef} className="flex py-8 relative">
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
                        const isFirstMonth = month === 1
                        return (
                            <button
                                className="relative flex flex-col gap-1 items-center py-1 px-2 border-r border-primary"
                                key={`${year}-${month}`}
                                id={`timeline-${month + yearIndex * 12}`}
                                onPointerDown={handlePointerDown}
                            >
                                {isFirstMonth && (
                                    <p className="text-sm m-0 font-semibold absolute -top-6 left-0">{year}</p>
                                )}
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
                    dragConstraints={containerRef}
                    transformTemplate={({ x, scale }) => {
                        const xValue = typeof x === 'number' ? `${x}px` : x || '0px'
                        const scaleValue = typeof scale === 'number' ? scale : 1
                        return `translate3d(${xValue}, 50%, 0) scale(${scaleValue})`
                    }}
                    style={{ width: windowWidth, y: 0, top: 0 }}
                    className="absolute left-0 top-0 h-[48px] border-[1px] border-primary rounded !m-0"
                />
            </div>
        </ScrollArea>
    )
}

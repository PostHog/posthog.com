import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { colors } from '@posthog/brand/colors'

import { Exhibit } from './ProductAnalyticsExhibits'

const tileClasses = 'min-w-0 overflow-hidden rounded border border-[#d3d0c8] bg-[#fffdfa] shadow-sm'
const titleClasses = 'border-b border-[#d3d0c8] bg-[#f6f3ed] px-3 py-2 text-sm font-semibold'

function DashboardFrame({
    title,
    controls,
    onReset,
    contentClassName = '',
    children,
}: {
    title: string
    controls?: React.ReactNode
    onReset?: () => void
    contentClassName?: string
    children: React.ReactNode
}): JSX.Element {
    return (
        <Exhibit stacked onReset={onReset}>
            {controls}
            <section
                aria-label={`${title} dashboard example`}
                className="overflow-hidden rounded border border-[#d3d0c8] bg-[#fffdfa] font-rounded text-[#292724]"
            >
                <h3 className="!m-0 border-b border-[#d3d0c8] bg-[#f6f3ed] px-3 py-2 text-sm font-semibold">{title}</h3>
                <div className={`grid content-start gap-2 p-2 @lg:grid-cols-2 ${contentClassName}`}>{children}</div>
            </section>
        </Exhibit>
    )
}

type DashboardOption = { id: string; label: string }

function DashboardBuilder({
    title,
    options,
    contentClassName,
    children,
}: {
    title: string
    options: DashboardOption[]
    contentClassName: string
    children: (has: (id: string) => boolean) => React.ReactNode
}): JSX.Element {
    const [inView, setInView] = useState(false)
    const [addedCount, setAddedCount] = useState(0)
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
    const [cursorVisible, setCursorVisible] = useState(false)
    const [cursorPressed, setCursorPressed] = useState(false)
    const [resetKey, setResetKey] = useState(0)
    const rootRef = useRef<HTMLDivElement>(null)
    const controlsRef = useRef<HTMLDivElement>(null)
    const previousTarget = useRef<number | null>(null)
    const has = (id: string): boolean => {
        const index = options.findIndex((option) => option.id === id)
        return index >= 0 && index < addedCount
    }

    useEffect(() => {
        const root = rootRef.current
        if (!root) return
        if (typeof IntersectionObserver === 'undefined') {
            setInView(true)
            return
        }
        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 })
        observer.observe(root)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!inView || addedCount >= options.length) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setAddedCount(options.length)
            return
        }
        setCursorPressed(false)
        const duration = addedCount === 0 ? 2600 : 2200
        const pressTimeout = window.setTimeout(() => setCursorPressed(true), duration - 350)
        const addTimeout = window.setTimeout(() => setAddedCount((count) => count + 1), duration)
        return () => {
            window.clearTimeout(pressTimeout)
            window.clearTimeout(addTimeout)
        }
    }, [addedCount, inView, options.length, resetKey])

    useEffect(() => {
        if (addedCount !== options.length) return
        const timeout = window.setTimeout(() => setCursorVisible(false), 700)
        return () => window.clearTimeout(timeout)
    }, [addedCount, options.length])

    useLayoutEffect(() => {
        const controls = controlsRef.current
        if (!controls || !inView || addedCount >= options.length) return
        let frame: number
        const update = () => {
            const target = controls.querySelectorAll<HTMLElement>('[data-dashboard-option]')[addedCount]
            if (!target) return
            const bounds = controls.getBoundingClientRect()
            const button = target.getBoundingClientRect()
            const position = {
                x: button.left - bounds.left + button.width / 2 - 6,
                y: button.top - bounds.top + button.height / 2 - 6,
            }
            if (previousTarget.current === null) {
                setCursorPosition({ x: Math.max(0, position.x - 55), y: position.y + 45 })
                frame = window.requestAnimationFrame(() => {
                    setCursorPosition(position)
                    setCursorVisible(true)
                })
            } else {
                setCursorPosition(position)
            }
            previousTarget.current = addedCount
        }
        update()
        if (typeof ResizeObserver === 'undefined') return () => window.cancelAnimationFrame(frame)
        const observer = new ResizeObserver(update)
        observer.observe(controls)
        return () => {
            observer.disconnect()
            window.cancelAnimationFrame(frame)
        }
    }, [addedCount, inView, options.length, resetKey])

    const reset = () => {
        previousTarget.current = null
        setAddedCount(0)
        setCursorVisible(false)
        setCursorPressed(false)
        setResetKey((key) => key + 1)
    }

    return (
        <div ref={rootRef}>
            <DashboardFrame
                title={title}
                onReset={reset}
                contentClassName={contentClassName}
                controls={
                    <div
                        ref={controlsRef}
                        aria-label="Insights added to dashboard"
                        className="relative mb-3 flex flex-wrap gap-2"
                    >
                        {options.map(({ id, label }) => (
                            <span
                                key={id}
                                data-dashboard-option
                                className={`rounded border px-3 py-2 font-rounded text-sm font-semibold shadow-sm ${
                                    has(id)
                                        ? 'border-[#f7a94b] bg-[#fff0dc] text-[#292724]'
                                        : 'border-[#d3d0c8] bg-[#fffdfa] text-[#292724]'
                                }`}
                            >
                                <span aria-hidden="true" className="mr-2">
                                    {has(id) ? '✓' : '+'}
                                </span>
                                {label}
                            </span>
                        ))}
                        {inView && (
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute z-10 motion-reduce:hidden"
                                style={{
                                    left: cursorPosition.x,
                                    top: cursorPosition.y,
                                    opacity: cursorVisible ? 1 : 0,
                                    transition:
                                        'left 1050ms cubic-bezier(0.42, 0, 0.22, 1), top 1050ms cubic-bezier(0.42, 0, 0.22, 1), opacity 1600ms ease-in-out',
                                }}
                            >
                                <svg
                                    className={`transition-transform duration-300 ${cursorPressed ? 'scale-90' : ''}`}
                                    width="24"
                                    height="30"
                                    viewBox="0 0 24 30"
                                    fill="none"
                                >
                                    <path
                                        d="M2 2v21l5.8-5.4 4.1 9.2 4.2-1.8-4.1-9.1H20L2 2Z"
                                        fill="#1d1d1d"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        )}
                    </div>
                }
            >
                {children(has)}
            </DashboardFrame>
        </div>
    )
}

function FilterUsersTile({ className = '' }: { className?: string }): JSX.Element {
    return (
        <section aria-label="Weekly filter users trend" className={`${tileClasses} flex flex-col ${className}`}>
            <h4 className={`!m-0 ${titleClasses}`}>Filter users</h4>
            <div className="px-3 pt-2 text-xs text-[#716c63]">Unique people · weekly</div>
            <div className="flex flex-1 items-center justify-center px-3 py-2">
                <svg
                    role="img"
                    aria-label="Filter users: 5 in Week 1 and 8 in Week 2"
                    className="h-28 w-full max-w-[16rem]"
                    viewBox="0 0 240 120"
                >
                    <line x1="24" y1="91" x2="216" y2="91" stroke="#d3d0c8" />
                    <path d="M 56 65 L 184 35" fill="none" stroke={colors.blue.core} strokeWidth="3" />
                    <circle cx="56" cy="65" r="4" fill={colors.blue.core} />
                    <circle cx="184" cy="35" r="4" fill={colors.blue.core} />
                    <text x="56" y="53" textAnchor="middle" fontSize="14" fontWeight="700" fill="#292724">
                        5
                    </text>
                    <text x="184" y="23" textAnchor="middle" fontSize="14" fontWeight="700" fill="#292724">
                        8
                    </text>
                    <text x="56" y="110" textAnchor="middle" fontSize="11" fill="#716c63">
                        Week 1
                    </text>
                    <text x="184" y="110" textAnchor="middle" fontSize="11" fill="#716c63">
                        Week 2
                    </text>
                </svg>
            </div>
        </section>
    )
}

function RepeatBookingsTile({ className = '' }: { className?: string }): JSX.Element {
    return (
        <section aria-label="Repeat booking retention" className={`${tileClasses} ${className}`}>
            <h4 className={`!m-0 ${titleClasses}`}>Repeat bookings</h4>
            <div className="p-2">
                <table
                    aria-label="January 2025 first bookers: 10 people, 20% returned in Month 6, and 30% returned in Month 12"
                    className="w-full table-fixed border-separate border-spacing-1 !text-xs"
                >
                    <thead className="text-[#716c63]">
                        <tr>
                            <th scope="col" className="w-[24%] text-left font-normal">
                                Cohort
                            </th>
                            <th scope="col" className="w-[16%] text-center font-normal">
                                Size
                            </th>
                            <th scope="col" className="text-center font-normal">
                                <span className="@md:hidden">0 mo</span>
                                <span className="hidden @md:inline">Month 0</span>
                            </th>
                            <th scope="col" className="text-center font-normal">
                                <span className="@md:hidden">6 mo</span>
                                <span className="hidden @md:inline">Month 6</span>
                            </th>
                            <th scope="col" className="text-center font-normal">
                                <span className="@md:hidden">12 mo</span>
                                <span className="hidden @md:inline">Month 12</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" className="whitespace-nowrap text-left font-semibold">
                                Jan 2025
                            </th>
                            <td className="text-center">10</td>
                            <td
                                className="rounded py-2 text-center font-semibold text-[#1d1d1d]"
                                style={{ backgroundColor: colors.blue.core }}
                            >
                                100%
                            </td>
                            <td
                                className="rounded py-2 text-center font-semibold"
                                style={{ backgroundColor: `color-mix(in srgb, ${colors.blue.lighter} 45%, white)` }}
                            >
                                20%
                            </td>
                            <td
                                className="rounded py-2 text-center font-semibold"
                                style={{ backgroundColor: `color-mix(in srgb, ${colors.blue.lighter} 70%, white)` }}
                            >
                                30%
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export function BookingDashboardFigure(): JSX.Element {
    return (
        <DashboardBuilder
            title="Exploring and booking stays"
            contentClassName="min-h-[35rem] @lg:min-h-[23rem]"
            options={[
                { id: 'trend', label: 'Filter users' },
                { id: 'funnel', label: 'Booking completion' },
                { id: 'retention', label: 'Repeat bookings' },
            ]}
        >
            {(has) => (
                <>
                    {has('trend') && (
                        <FilterUsersTile className={has('funnel') ? '@lg:row-span-2' : '@lg:col-span-2'} />
                    )}

                    {has('funnel') && (
                        <section aria-label="Booking completion funnel" className={tileClasses}>
                            <h4 className={`!m-0 ${titleClasses}`}>Booking completion</h4>
                            <div className="space-y-3 px-3 py-3 text-xs">
                                <div className="flex justify-between gap-2 text-[#716c63]">
                                    <span>Unique people</span>
                                    <span>14 days</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between gap-2">
                                        <span className="font-code">booking_started</span>
                                        <strong>10</strong>
                                    </div>
                                    <div className="h-3 rounded-sm bg-[#f7a94b]" aria-hidden="true" />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between gap-2">
                                        <span className="font-code">booking_completed</span>
                                        <strong>6 · 60%</strong>
                                    </div>
                                    <div className="h-3 rounded-sm bg-[#e9e7e1]" aria-hidden="true">
                                        <div className="h-full w-[60%] rounded-sm bg-[#f7a94b]" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {has('funnel') && (
                        <aside
                            aria-label="Booking investigation note"
                            className={`${tileClasses} flex flex-col justify-center gap-2 p-3 text-xs`}
                        >
                            <p className="!m-0">
                                <strong>Known:</strong> 1 failed booking request
                            </p>
                            <p className="!m-0">
                                <strong>Next:</strong> inspect 3 other drop-offs
                            </p>
                        </aside>
                    )}

                    {has('retention') && <RepeatBookingsTile className="@lg:col-span-2" />}
                </>
            )}
        </DashboardBuilder>
    )
}

const destinationSelections = [
    { name: 'Coast', count: 3, color: colors.blue.core },
    { name: 'Forest', count: 1, color: colors.purple.core },
    { name: 'City', count: 1, color: colors.teal.darker },
]

function DestinationChoicesTile({ className = '' }: { className?: string }): JSX.Element {
    return (
        <section aria-label="Five example filter selections by destination" className={`${tileClasses} ${className}`}>
            <h4 className={`!m-0 ${titleClasses}`}>Destination choices</h4>
            <div className="px-3 pt-2 text-xs text-[#716c63]">5 filter selections</div>
            <div className="space-y-3 p-3 text-xs">
                {destinationSelections.map(({ name, count, color }) => (
                    <div key={name} className="grid grid-cols-[3.5rem_minmax(0,1fr)_1rem] items-center gap-2">
                        <span>{name}</span>
                        <div className="h-4 rounded-sm bg-[#e9e7e1]" aria-hidden="true">
                            <div
                                className="h-full rounded-sm"
                                style={{ width: `${(count / 3) * 100}%`, backgroundColor: color }}
                            />
                        </div>
                        <strong className="text-right">{count}</strong>
                    </div>
                ))}
            </div>
        </section>
    )
}

export function FindingStaysDashboardFigure(): JSX.Element {
    return (
        <DashboardBuilder
            title="Finding stays"
            contentClassName="min-h-[25rem] @lg:min-h-[15rem]"
            options={[
                { id: 'destinations', label: 'Destination choices' },
                { id: 'trend', label: 'Filter users' },
            ]}
        >
            {(has) => (
                <>
                    {has('destinations') && <DestinationChoicesTile className={has('trend') ? '' : '@lg:col-span-2'} />}
                    {has('trend') && <FilterUsersTile className={has('destinations') ? '' : '@lg:col-span-2'} />}
                </>
            )}
        </DashboardBuilder>
    )
}

function FilteredRetentionTile({
    title,
    size,
    percent,
    className = '',
}: {
    title: string
    size: number
    percent: number
    className?: string
}): JSX.Element {
    return (
        <section aria-label={`${title}: ${percent}% returned in Month 12`} className={`${tileClasses} ${className}`}>
            <h4 className={`!m-0 ${titleClasses} @lg:min-h-14`}>{title}</h4>
            <div className="p-2">
                <table className="w-full table-fixed border-separate border-spacing-1 !text-xs">
                    <thead className="text-[#716c63]">
                        <tr>
                            <th scope="col" className="text-left font-normal">
                                Cohort
                            </th>
                            <th scope="col" className="w-[18%] text-center font-normal">
                                Size
                            </th>
                            <th scope="col" className="w-[29%] text-center font-normal">
                                Month 12
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" className="whitespace-nowrap text-left font-semibold">
                                Jan 2025
                            </th>
                            <td className="text-center">{size}</td>
                            <td
                                className="rounded py-2 text-center font-semibold"
                                style={{
                                    backgroundColor: `color-mix(in srgb, ${colors.blue.lighter} ${Math.round(
                                        25 + percent * 0.9
                                    )}%, white)`,
                                }}
                            >
                                {percent}%
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export function ReturningGuestsDashboardFigure(): JSX.Element {
    return (
        <DashboardBuilder
            title="Returning guests"
            contentClassName="min-h-[24rem] @lg:min-h-[16rem]"
            options={[
                { id: 'retention', label: 'Repeat bookings' },
                { id: 'saved', label: 'Saved before booking' },
                { id: 'unsaved', label: 'No saved stay' },
            ]}
        >
            {(has) => (
                <>
                    {has('retention') && <RepeatBookingsTile className="@lg:col-span-2" />}
                    {has('saved') && (
                        <FilteredRetentionTile
                            title="Saved before first booking"
                            size={4}
                            percent={50}
                            className={has('unsaved') ? '' : '@lg:col-span-2'}
                        />
                    )}
                    {has('unsaved') && (
                        <FilteredRetentionTile
                            title="No saved stay before first booking"
                            size={6}
                            percent={17}
                            className={has('saved') ? '' : '@lg:col-span-2'}
                        />
                    )}
                </>
            )}
        </DashboardBuilder>
    )
}

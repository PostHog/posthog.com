import React, { useState } from 'react'
import { colors } from '@posthog/brand/colors'

import { Exhibit } from './ProductAnalyticsExhibits'

const tileClasses = 'min-w-0 overflow-hidden rounded border border-[#d3d0c8] bg-[#fffdfa] shadow-sm'
const titleClasses = 'border-b border-[#d3d0c8] bg-[#f6f3ed] px-3 py-2 text-sm font-semibold'

function DashboardFrame({
    title,
    controls,
    children,
}: {
    title: string
    controls?: React.ReactNode
    children: React.ReactNode
}): JSX.Element {
    return (
        <Exhibit stacked>
            {controls}
            <section
                aria-label={`${title} dashboard example`}
                className="overflow-hidden rounded border border-[#d3d0c8] bg-[#fffdfa] font-rounded text-[#292724]"
            >
                <h3 className="!m-0 border-b border-[#d3d0c8] bg-[#f6f3ed] px-3 py-2 text-sm font-semibold">{title}</h3>
                <div className="grid gap-2 p-2 @lg:grid-cols-2">{children}</div>
            </section>
        </Exhibit>
    )
}

type DashboardOption = { id: string; label: string }

function DashboardBuilder({
    title,
    options,
    children,
}: {
    title: string
    options: DashboardOption[]
    children: (has: (id: string) => boolean) => React.ReactNode
}): JSX.Element {
    const [added, setAdded] = useState<string[]>([])
    const has = (id: string): boolean => added.includes(id)

    return (
        <DashboardFrame
            title={title}
            controls={
                <div role="group" aria-label="Dashboard tiles" className="mb-3 flex flex-wrap gap-2">
                    {options.map(({ id, label }) => (
                        <button
                            key={id}
                            type="button"
                            aria-pressed={has(id)}
                            onClick={() =>
                                setAdded((current) =>
                                    current.includes(id) ? current.filter((tile) => tile !== id) : [...current, id]
                                )
                            }
                            className={`rounded border px-3 py-2 font-rounded text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f7a94b] ${
                                has(id)
                                    ? 'border-[#f7a94b] bg-[#fff0dc] text-[#292724]'
                                    : 'border-[#d3d0c8] bg-[#fffdfa] text-[#292724] hover:border-[#f7a94b]'
                            }`}
                        >
                            <span aria-hidden="true" className="mr-2">
                                {has(id) ? '✓' : '+'}
                            </span>
                            {label}
                        </button>
                    ))}
                </div>
            }
        >
            {added.length === 0 && (
                <p className="!m-0 col-span-full px-3 py-5 text-center text-sm text-[#716c63]">Add a tile above</p>
            )}
            {children(has)}
        </DashboardFrame>
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

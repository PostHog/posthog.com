import React from 'react'

import { IconChevronDown } from '@posthog/icons'

import AnatomyFrame from './AnatomyFrame'
import { FigureMarker } from './FigureMarker'

const JS_ICON = 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/js.svg'

// The two issues one missing host record opens in Twig's project over the last 7 days, shaped like
// the issue list. Volume is occurrences per 12 hours, oldest first, and sums to the occurrences.
const issues = [
    {
        message: 'Host "colette" not found for booking booking_3',
        frame: 'readTripHost',
        source: 'src/trips/trip-details.ts',
        lastSeen: '4 minutes ago',
        volume: [21, 34, 18, 29, 41, 26, 15, 38, 44, 31, 22, 36, 47, 32],
        occurrences: 434,
        sessions: 287,
        users: 251,
    },
    {
        message: 'Host "colette" not found for stay stay-03',
        frame: 'StayPageView',
        source: 'src/stays/StayPageView.tsx',
        lastSeen: '6 minutes ago',
        volume: [58, 73, 49, 66, 91, 62, 44, 80, 97, 71, 55, 84, 102, 76],
        occurrences: 1008,
        sessions: 612,
        users: 539,
    },
]

const COLUMNS =
    'grid grid-cols-[1rem_minmax(0,1fr)_5.5rem] gap-3 @xl:grid-cols-[1rem_minmax(0,1fr)_6rem_5.5rem] @2xl:grid-cols-[1rem_minmax(0,1fr)_6rem_5.5rem_4.5rem_3.5rem]'

/** One select in the row's outlined button group: status, severity, then assignee. */
function Chip({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <span className="inline-flex items-center gap-1 border-r border-primary px-1.5 py-1 last:border-r-0">
            {children}
            <IconChevronDown className="size-2.5 text-secondary" aria-hidden="true" />
        </span>
    )
}

/** The row and header checkbox, unchecked. */
function Checkbox(): JSX.Element {
    return <span className="mt-0.5 block size-3.5 self-start rounded-sm border border-primary bg-primary" />
}

/** Volume over the last 7 days, in 12-hour bars, with when the issue was last seen. */
function Volume({ volume, lastSeen }: { volume: number[]; lastSeen: string }): JSX.Element {
    const max = Math.max(...volume)
    return (
        <div className="hidden @xl:block">
            <div className="flex h-10 items-end gap-px border-b border-primary">
                {volume.map((value, index) => (
                    <span
                        key={index}
                        className="min-w-0 flex-1 rounded-t-sm bg-gray opacity-70"
                        style={{ height: `${(value / max) * 100}%` }}
                    />
                ))}
            </div>
            <span className="mt-0.5 block text-right text-[0.6em] leading-none text-secondary">{lastSeen}</span>
        </div>
    )
}

/** Twig's issue list with the missing host record split into two issues, one per Twig frame. */
export default function IssueList(): JSX.Element {
    return (
        <AnatomyFrame className="rounded border border-primary bg-primary text-primary">
            <div
                className={`${COLUMNS} border-b border-primary whitespace-nowrap px-3 py-2 text-[0.6em] font-bold uppercase tracking-wide text-secondary`}
            >
                <Checkbox />
                <span>Issue</span>
                <span className="hidden text-center @xl:block">Volume</span>
                <span className="text-center">Occurrences</span>
                <span className="hidden text-center @2xl:block">Sessions</span>
                <span className="hidden text-center @2xl:block">Users</span>
            </div>
            {issues.map(({ message, frame, source, lastSeen, volume, occurrences, sessions, users }, index) => (
                <div
                    key={frame}
                    className={`${COLUMNS} items-center px-3 py-3 ${index > 0 ? 'border-t border-primary' : ''}`}
                >
                    <Checkbox />
                    <div className="min-w-0">
                        <p className="m-0 flex items-center gap-1.5 text-[0.85em] font-semibold leading-snug">
                            <img src={JS_ICON} alt="" className="size-3.5" />
                            HostNotFoundError
                        </p>
                        <p className="m-0 mt-0.5 truncate text-[0.75em] font-medium leading-snug">{message}</p>
                        <p className="m-0 mt-0.5 flex items-center gap-1 text-[0.7em] font-light italic leading-snug text-secondary">
                            <span className="truncate">
                                {frame} in {source}
                            </span>
                            {index === 0 && (
                                <FigureMarker
                                    n={1}
                                    label="Different frames"
                                    gloss="Same error type, but readTripHost and StayPageView are different frames, so PostHog opens two issues."
                                    visibility="always"
                                />
                            )}
                        </p>
                        <div className="mt-1.5 inline-flex max-w-full flex-wrap rounded border border-primary text-[0.65em] leading-none">
                            <Chip>
                                <span className="size-1.5 rounded-full bg-orange" />
                                Active
                            </Chip>
                            <Chip>
                                <span className="font-semibold text-orange">High</span>
                            </Chip>
                            <Chip>Unassigned</Chip>
                        </div>
                    </div>
                    <Volume volume={volume} lastSeen={lastSeen} />
                    <span className="text-center text-[0.9em]">{occurrences.toLocaleString('en-US')}</span>
                    <span className="hidden text-center text-[0.9em] @2xl:block">{sessions}</span>
                    <span className="hidden text-center text-[0.9em] @2xl:block">{users}</span>
                </div>
            ))}
        </AnatomyFrame>
    )
}

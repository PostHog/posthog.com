import React from 'react'
import { cn } from '../../../utils'
import { focusRing } from '../styles'
import { Popover } from '../Popover'
import { useSyncExternalStore } from '../utils'

export type RelativeTimeProps = Omit<React.ComponentPropsWithoutRef<'time'>, 'dateTime' | 'children'> & {
    date: Date | string | number
    locale?: string
    format?: 'relative' | 'date'
    tooltip?: boolean
}

const exactTimePopup = 'px-2 py-1 text-[13px] leading-4'

const MINUTE_MS = 60_000
const HOUR_MS = 60 * MINUTE_MS
const relativeUnits: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 365 * 24 * HOUR_MS],
    ['month', 30 * 24 * HOUR_MS],
    ['week', 7 * 24 * HOUR_MS],
    ['day', 24 * HOUR_MS],
    ['hour', HOUR_MS],
    ['minute', MINUTE_MS],
    ['second', 1000],
]

function formatRelative(timestamp: number, now: number, locale: string): string {
    const difference = timestamp - now
    const [unit, duration] =
        relativeUnits.find(([, duration]) => Math.abs(difference) >= duration) ??
        relativeUnits[relativeUnits.length - 1]
    const value = Math.round(difference / duration)
    return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(value === 0 ? 0 : value, unit)
}

const STALE_CLOCK_MS = 1000
const clockListeners = new Set<() => void>()
let clockTime = 0
let clockTimer: ReturnType<typeof setInterval> | undefined

function readClock(): number {
    if (Date.now() - clockTime > STALE_CLOCK_MS) clockTime = Date.now()
    return clockTime
}

function subscribeToClock(onTick: () => void): () => void {
    clockListeners.add(onTick)
    if (!clockTimer) {
        clockTimer = setInterval(() => {
            clockTime = Date.now()
            clockListeners.forEach((listener) => listener())
        }, MINUTE_MS)
    }
    return () => {
        clockListeners.delete(onTick)
        if (clockListeners.size === 0 && clockTimer) {
            clearInterval(clockTimer)
            clockTimer = undefined
        }
    }
}

export function useNow(): number | null {
    return useSyncExternalStore<number | null>(subscribeToClock, readClock, () => null)
}

export const RelativeTime = React.forwardRef<HTMLTimeElement, RelativeTimeProps>(function RelativeTime(
    { date, locale = 'en-US', format = 'relative', tooltip = true, className, tabIndex = 0, ...props },
    ref
) {
    const timestamp = date instanceof Date ? date.getTime() : new Date(date).getTime()
    const valid = Number.isFinite(timestamp)
    const now = useNow()

    if (!valid) return <span className={className}>Invalid date</span>

    const absolute = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: 'UTC' }).format(timestamp)
    const label = format === 'relative' && now !== null ? formatRelative(timestamp, now, locale) : absolute
    const dateTime = new Date(timestamp).toISOString()

    if (!tooltip) {
        return (
            <time {...props} ref={ref} dateTime={dateTime} className={className}>
                {label}
            </time>
        )
    }

    const exactDate = (timeZone?: string) =>
        new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone }).format(timestamp)
    const exactTime = (timeZone?: string) =>
        new Intl.DateTimeFormat(locale, { timeStyle: timeZone ? 'medium' : 'long', timeZone }).format(timestamp)
    const rows: [string, string, string][] = [
        ...(now === null ? [] : ([['Local', exactDate(), exactTime()]] as [string, string, string][])),
        ['UTC', exactDate('UTC'), exactTime('UTC')],
    ]

    return (
        <Popover.Root>
            <Popover.Trigger
                openOnHover
                delay={0}
                nativeButton={false}
                render={
                    <time
                        {...props}
                        ref={ref}
                        dateTime={dateTime}
                        tabIndex={tabIndex}
                        className={cn(
                            focusRing,
                            'rounded-sm decoration-dotted underline-offset-4 hover:underline',
                            className
                        )}
                    />
                }
            >
                {label}
            </Popover.Trigger>
            <Popover.Popup aria-label="Exact time" className={exactTimePopup}>
                <Popover.Arrow />
                <span className="grid grid-cols-[auto_auto_auto] gap-x-3 gap-y-1 tabular-nums">
                    {rows.map(([zone, day, time]) => (
                        <React.Fragment key={zone}>
                            <span className="text-muted">{zone}</span>
                            <span>{day}</span>
                            <span>{time}</span>
                        </React.Fragment>
                    ))}
                </span>
            </Popover.Popup>
        </Popover.Root>
    )
})

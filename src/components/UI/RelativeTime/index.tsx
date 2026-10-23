import React, { useEffect, useState } from 'react'
import { cn } from '../../../utils'
import { focusRing } from '../styles'
import { Tooltip } from '../Tooltip'

export type RelativeTimeProps = Omit<React.ComponentPropsWithoutRef<'time'>, 'dateTime' | 'children'> & {
    date: Date | string | number
    locale?: string
    format?: 'relative' | 'date'
}

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

export const RelativeTime = React.forwardRef<HTMLTimeElement, RelativeTimeProps>(function RelativeTime(
    { date, locale = 'en-US', format = 'relative', className, tabIndex = 0, ...props },
    ref
) {
    const timestamp = date instanceof Date ? date.getTime() : new Date(date).getTime()
    const valid = Number.isFinite(timestamp)
    const [now, setNow] = useState<number | null>(null)

    useEffect(() => {
        setNow(Date.now())
        if (!valid || format !== 'relative' || Math.abs(timestamp - Date.now()) >= HOUR_MS) return
        const interval = setInterval(() => setNow(Date.now()), MINUTE_MS)
        return () => clearInterval(interval)
    }, [timestamp, valid, format])

    if (!valid) return <span className={className}>Invalid date</span>

    const absolute = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: 'UTC' }).format(timestamp)
    const exactOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
    }
    const utc = new Intl.DateTimeFormat(locale, { ...exactOptions, timeZone: 'UTC' }).format(timestamp)
    const local = now === null ? utc : new Intl.DateTimeFormat(locale, exactOptions).format(timestamp)

    return (
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger
                    render={
                        <time
                            {...props}
                            ref={ref}
                            dateTime={new Date(timestamp).toISOString()}
                            tabIndex={tabIndex}
                            className={cn(
                                focusRing,
                                'rounded-sm hover:underline decoration-dotted underline-offset-4',
                                className
                            )}
                        />
                    }
                >
                    {format === 'relative' && now !== null ? formatRelative(timestamp, now, locale) : absolute}
                </Tooltip.Trigger>
                <Tooltip.Popup>
                    <span className="flex flex-col gap-2 text-sm leading-normal">
                        <span>Local: {local}</span>
                        <span>UTC: {utc}</span>
                    </span>
                </Tooltip.Popup>
            </Tooltip.Root>
        </Tooltip.Provider>
    )
})

import React from 'react'
import { Badge } from 'components/UI/Badge'
import { formatFull, perSecond } from './data'
import type { Metric } from './data'
import { useSecondsToday } from './useStatus'
import type { StatusData } from './useStatus'

export const STATUS_URL = 'https://www.posthogstatus.com/us'

export function formatUptime(value: number): string {
    return value === 100 ? '100.00%' : `${value.toFixed(3)}%`
}

export function StatusBadge({ status }: { status: StatusData }): JSX.Element {
    const open = status.ongoing.length
    return (
        <Badge color={open ? 'tangerine' : 'green'}>
            {open ? `${open} open incident${open > 1 ? 's' : ''}` : 'All systems operational'}
            {status.live ? ' · live' : ' · snapshot'}
        </Badge>
    )
}

export function TodaySoFar({ metric, className = '' }: { metric: Metric; className?: string }): JSX.Element {
    const seconds = useSecondsToday()
    return (
        <span className={`tabular-nums ${className}`}>
            {seconds === null ? '…' : formatFull(perSecond(metric.yesterday) * seconds)}
        </span>
    )
}

export function Source(): JSX.Element {
    return (
        <p className="m-0 text-13 text-muted">
            Volume: PostHog Cloud, US and EU, from the nightly usage report. “Today so far” is an estimate from
            yesterday’s rate. Open incidents: live from{' '}
            <a href={STATUS_URL} className="underline">
                posthogstatus.com
            </a>
            . Incident history and 90-day uptime: a snapshot from November 11, because the status feed does not allow
            browser requests. Prototype data, not approved for publication.
        </p>
    )
}

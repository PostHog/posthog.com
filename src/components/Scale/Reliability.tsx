import React, { useEffect, useState } from 'react'
import { IconCheckCircle, IconEye, IconSearch, IconWarning, IconWrench } from '@posthog/icons'
import { Badge } from 'components/UI/Badge'
import { Card } from 'components/UI/Card'
import { Collapsible } from 'components/UI/Collapsible'
import { Popover } from 'components/UI/Popover'
import { RelativeTime } from 'components/UI/RelativeTime'
import { Skeleton } from 'components/UI/Skeleton'
import type { ColorName } from 'components/UI/colors'
import type { DayLevel, ScaleStatus } from '../../api/scale-status'

const STATUS_API = '/api/scale-status'
const STATUS_SITE = 'https://www.posthogstatus.com'
const REFRESH_MS = 60_000
const FRESH_MS = 10 * 60_000
const FETCH_TIMEOUT_MS = 10_000
const WEEK_ROWS = 6
const LATEST_INCIDENTS = 7
const DAY_MS = 86_400_000
const incidentLink = 'text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid'
const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const monthVisibility = ['hidden @5xl:block', 'hidden @3xl:block', 'hidden @md:block', '']

const impactColors: Record<string, ColorName> = {
    degraded_performance: 'yellow',
    partial_outage: 'tangerine',
    full_outage: 'coral',
    under_maintenance: 'blue',
}

const products: { label: string; color: ColorName; components: string[] }[] = [
    { label: 'App', color: 'lime', components: ['App (Web & Desktop)'] },
    { label: 'Event ingestion', color: 'blue', components: ['Event Ingestion Success', 'Event Ingestion Lag'] },
    { label: 'Error tracking', color: 'coral', components: ['Error Tracking Ingestion Lag'] },
    { label: 'Session replay', color: 'tangerine', components: ['Session Replay Ingestion'] },
    { label: 'Logs', color: 'yellow', components: ['Logs'] },
    { label: 'Feature flags', color: 'green', components: ['Feature Flags API'] },
    {
        label: 'Destinations & workflows',
        color: 'purple',
        components: ['Destination Delivery (realtime)', 'Destination Delivery (batch exports)', 'Workflows'],
    },
    { label: 'Data warehouse', color: 'teal', components: ['Data Warehouse Source Ingestion'] },
    { label: 'AI agents & MCP', color: 'violet', components: ['Cloud AI Agents', 'MCP Server'] },
    {
        label: 'Queries & API',
        color: 'cobalt',
        components: ['REST API Query endpoints', 'All other REST API endpoints'],
    },
]

const generalProduct = { label: 'PostHog', color: 'gray' as ColorName }

const statusIcons: Record<string, { icon: React.ReactNode; label: string }> = {
    resolved: { icon: <IconCheckCircle className="text-[color:var(--uptime-ok)]" />, label: 'Resolved' },
    investigating: { icon: <IconSearch className="text-[color:var(--uptime-full)]" />, label: 'Investigating' },
    identified: { icon: <IconWarning className="text-[color:var(--uptime-full)]" />, label: 'Identified' },
    monitoring: { icon: <IconEye className="text-[color:var(--uptime-ok)]" />, label: 'Monitoring' },
}

const otherStatus = { icon: <IconWrench className="text-secondary" />, label: 'In progress' }

function useScaleStatus(): { status: ScaleStatus | null; failed: boolean } {
    const [status, setStatus] = useState<ScaleStatus | null>(null)
    const [failed, setFailed] = useState(false)
    useEffect(() => {
        let mounted = true
        const load = () =>
            fetch(STATUS_API, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) })
                .then((response) => {
                    if (!response.ok) throw new Error(`${STATUS_API} returned ${response.status}`)
                    return response.json()
                })
                .then((loaded: ScaleStatus) => {
                    if (!mounted) return
                    setStatus(loaded)
                    setFailed(false)
                })
                .catch(() => mounted && setFailed(true))
        load()
        const refresh = window.setInterval(() => !document.hidden && load(), REFRESH_MS)
        return () => {
            mounted = false
            window.clearInterval(refresh)
        }
    }, [])
    return { status, failed }
}

function StatusBadge({ status, failed }: { status: ScaleStatus | null; failed: boolean }): JSX.Element {
    if (!status) {
        return failed ? (
            <Badge href={STATUS_SITE} size="md" color="gray" appearance="soft">
                Status unavailable
            </Badge>
        ) : (
            <Skeleton width="13rem" className="text-sm" />
        )
    }
    const fresh = !failed && Date.now() - Date.parse(status.generatedAt) < FRESH_MS
    const live = fresh
        ? ' · live'
        : ` · as of ${new Date(status.generatedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
    if (status.active.length === 0) {
        return (
            <Badge href={STATUS_SITE} size="md" color="lime" appearance="solid">
                All systems operational{live}
            </Badge>
        )
    }
    const worst = status.active[0]
    const single = status.active.length === 1
    return (
        <Badge
            href={single ? worst.url : STATUS_SITE}
            size="md"
            color={impactColors[worst.impact] ?? 'yellow'}
            appearance="solid"
        >
            {single ? worst.name : `${status.active.length} active incidents`}
            {live}
        </Badge>
    )
}

type DayState = 'future' | 'ok' | DayLevel

const dayLabels: Record<DayLevel, string> = {
    reported: 'Incident reported',
    partial: 'Partial outage or slowdown',
    full: 'Full outage',
}

const isoDay = (time: number): string => new Date(time).toISOString().slice(0, 10)

function MonthGrid({
    year,
    month,
    days,
    today,
}: {
    year: number
    month: number
    days: ScaleStatus['days']
    today: string
}): JSX.Element {
    const first = Date.UTC(year, month, 1)
    const offset = (new Date(first).getUTCDay() + 6) % 7
    const length = new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
    const dates = Array.from({ length }, (_, index) => isoDay(first + index * DAY_MS))
    const states: DayState[] = dates.map((date) => (date > today ? 'future' : days[date]?.level ?? 'ok'))
    return (
        <div className="flex flex-col gap-3">
            <p className="m-0 text-center text-base font-semibold">
                {new Date(first).toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' })}
            </p>
            <div className="grid grid-cols-7 gap-y-1 text-center text-xs text-secondary">
                {WEEKDAYS.map((weekday, index) => (
                    <span key={index}>{weekday}</span>
                ))}
            </div>
            <div className="grid grid-cols-7 grid-rows-[repeat(6,1.75rem)] gap-y-1 text-xs">
                {dates.map((date, index) => {
                    const day = index + 1
                    const column = (offset + index) % 7
                    const state = states[index]
                    const position = index === 0 ? { gridColumnStart: offset + 1 } : undefined
                    if (state === 'future') {
                        return (
                            <span
                                key={date}
                                style={position}
                                className="flex items-center justify-center text-secondary"
                            >
                                {day}
                                <span className="sr-only">: upcoming</span>
                            </span>
                        )
                    }
                    if (state === 'ok') {
                        const joinsPrevious = column > 0 && states[index - 1] === 'ok'
                        const joinsNext = column < 6 && states[index + 1] === 'ok'
                        return (
                            <span
                                key={date}
                                style={position}
                                className={`flex items-center justify-center bg-[color:var(--uptime-ok)] text-black/80 ${
                                    joinsPrevious ? '' : 'rounded-l-full'
                                } ${joinsNext ? '' : 'rounded-r-full'}`}
                            >
                                {day}
                                <span className="sr-only">: no incidents</span>
                            </span>
                        )
                    }
                    const entry = days[date]
                    const label = dayLabels[state]
                    return (
                        <span key={date} style={position} className="flex items-center justify-center">
                            <Popover.Root>
                                <Popover.Trigger
                                    openOnHover
                                    delay={100}
                                    aria-label={`${date}: ${label}`}
                                    className={`flex size-7 items-center justify-center rounded-full ${
                                        state === 'full'
                                            ? 'bg-[color:var(--uptime-full)] text-white'
                                            : 'bg-[color:color-mix(in_srgb,var(--uptime-ok)_35%,transparent)] text-primary ring-2 ring-inset ring-[color:var(--uptime-ok)]'
                                    }`}
                                >
                                    {day}
                                </Popover.Trigger>
                                <Popover.Popup className="max-w-72">
                                    <Popover.Title>
                                        {new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            timeZone: 'UTC',
                                        })}
                                        : {label.toLowerCase()}
                                    </Popover.Title>
                                    <ul className="m-0 mt-2 flex list-none flex-col gap-1 p-0 text-sm">
                                        {entry?.incidents.map((incident) => (
                                            <li key={incident.url} className="m-0">
                                                <a
                                                    href={incident.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={incidentLink}
                                                >
                                                    {incident.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </Popover.Popup>
                            </Popover.Root>
                        </span>
                    )
                })}
            </div>
        </div>
    )
}

function MonthSkeleton(): JSX.Element {
    return (
        <div aria-hidden className="flex flex-col gap-3">
            <Skeleton width="40%" className="mx-auto text-base" />
            <div className="grid grid-cols-7 grid-rows-[1rem_repeat(6,1.75rem)] gap-y-1">
                {Array.from({ length: 7 * (WEEK_ROWS + 1) }, (_, cell) => (
                    <span key={cell} className="flex items-center justify-center">
                        {cell >= 7 && <Skeleton shape="circle" className="size-5" />}
                    </span>
                ))}
            </div>
        </div>
    )
}

function UptimeCalendar({ status }: { status: ScaleStatus | null }): JSX.Element {
    const gridClass = 'grid grid-cols-[minmax(0,1fr)] gap-8 @md:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4'
    if (!status) {
        return (
            <div className={gridClass}>
                {monthVisibility.map((visibility, index) => (
                    <div key={index} className={visibility}>
                        <MonthSkeleton />
                    </div>
                ))}
            </div>
        )
    }
    const today = status.generatedAt.slice(0, 10)
    const start = new Date(`${status.calendarStart}T00:00:00Z`)
    return (
        <div className={gridClass}>
            {monthVisibility.map((visibility, index) => (
                <div key={index} className={visibility}>
                    <MonthGrid
                        year={start.getUTCFullYear()}
                        month={start.getUTCMonth() + index}
                        days={status.days}
                        today={today}
                    />
                </div>
            ))}
        </div>
    )
}

function formatMinutes(minutes: number): string {
    return `${minutes.toLocaleString('en-US')} ${minutes === 1 ? 'minute' : 'minutes'}`
}

const statsRow = 'grid grid-cols-[minmax(0,1fr)_6rem_6rem] items-center gap-2'

function StatsTable({
    title,
    rows,
    defaultOpen = false,
}: {
    title: string
    rows: ScaleStatus['downtime']
    defaultOpen?: boolean
}): JSX.Element {
    return (
        <Card.Root appearance="solid" padding="sm">
            <Collapsible.Root defaultOpen={defaultOpen}>
                <div className={statsRow}>
                    <Collapsible.Trigger>{title}</Collapsible.Trigger>
                    <span aria-hidden className="text-right text-xs font-semibold text-secondary">
                        US
                    </span>
                    <span aria-hidden className="text-right text-xs font-semibold text-secondary">
                        EU
                    </span>
                </div>
                <Collapsible.Panel>
                    <div role="table" aria-label={title} className="flex flex-col gap-1.5">
                        <div role="row" className="sr-only">
                            <span role="columnheader">Component</span>
                            <span role="columnheader">US</span>
                            <span role="columnheader">EU</span>
                        </div>
                        {rows.map((row) => (
                            <div key={row.name} role="row" className={statsRow}>
                                <span role="rowheader" className="truncate">
                                    {row.name}
                                </span>
                                {[row.us, row.eu].map((minutes, region) => (
                                    <span
                                        key={region}
                                        role="cell"
                                        className={`text-right tabular-nums ${
                                            minutes > 0 ? 'text-[color:var(--uptime-downtime)]' : 'text-secondary'
                                        }`}
                                    >
                                        {formatMinutes(minutes)}
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </Collapsible.Panel>
            </Collapsible.Root>
        </Card.Root>
    )
}

function DowntimeStats({ status }: { status: ScaleStatus | null }): JSX.Element {
    const heading = (
        <h3 className="m-0 text-base font-semibold">
            Downtime statistics <span className="font-normal text-secondary">· last 90 days</span>
        </h3>
    )
    if (!status) {
        return (
            <div className="flex flex-col gap-3">
                {heading}
                <Card.Root appearance="solid" padding="sm" aria-hidden>
                    <Skeleton lines={4} />
                </Card.Root>
                <Card.Root appearance="solid" padding="sm" aria-hidden>
                    <Skeleton width="60%" />
                </Card.Root>
            </div>
        )
    }
    const total = status.downtime.length
    const affected = status.downtime.filter((row) => row.us + row.eu > 0).sort((a, b) => b.us + b.eu - (a.us + a.eu))
    const unaffected = status.downtime.filter((row) => row.us + row.eu === 0)
    return (
        <div className="flex flex-col gap-3">
            {heading}
            <StatsTable title={`Affected components ${affected.length}/${total}`} rows={affected} defaultOpen />
            <StatsTable title={`Unaffected components ${unaffected.length}/${total}`} rows={unaffected} />
        </div>
    )
}

function productOf(components: string[]): { label: string; color: ColorName } {
    return products.find((product) => product.components.some((name) => components.includes(name))) ?? generalProduct
}

function LatestIncidents({ status }: { status: ScaleStatus | null }): JSX.Element {
    return (
        <div className="flex flex-col gap-3">
            <h3 className="m-0 text-base font-semibold">Latest incidents</h3>
            <ol className="m-0 flex list-none flex-col gap-2 p-0">
                {status
                    ? status.incidents.map((incident) => {
                          const product = productOf(incident.components)
                          const { icon, label } = statusIcons[incident.status] ?? otherStatus
                          return (
                              <li key={incident.url} className="m-0 flex min-w-0 items-center gap-2 text-sm">
                                  <span title={label} className="flex size-4 shrink-0 [&>svg]:size-full">
                                      {icon}
                                      <span className="sr-only">{label}</span>
                                  </span>
                                  <Badge color={product.color} appearance="soft" className="shrink-0">
                                      {product.label}
                                  </Badge>
                                  <a
                                      href={incident.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`min-w-0 truncate ${incidentLink}`}
                                  >
                                      {incident.name}
                                  </a>
                                  <RelativeTime
                                      date={incident.publishedAt}
                                      className="ml-auto shrink-0 text-xs text-secondary"
                                  />
                              </li>
                          )
                      })
                    : Array.from({ length: LATEST_INCIDENTS }, (_, row) => (
                          <li key={row} aria-hidden className="m-0 flex items-center gap-2 text-sm">
                              <Skeleton shape="circle" className="size-4" />
                              <Skeleton width="70%" />
                          </li>
                      ))}
            </ol>
        </div>
    )
}

export default function Reliability(): JSX.Element {
    const { status, failed } = useScaleStatus()
    return (
        <section className="mx-auto mt-24 flex max-w-6xl flex-col gap-10 @container [--uptime-downtime:theme(colors.brand.tangerine.DEFAULT)] [--uptime-full:theme(colors.brand.coral.DEFAULT)] [--uptime-ok:theme(colors.brand.lime.DEFAULT)]">
            <header className="flex flex-col gap-2">
                <h2 className="m-0 text-3xl font-bold @3xl:text-5xl">All while keeping the lights on.</h2>
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                    <p className="m-0 text-secondary">
                        <strong>(Mostly).</strong> Here’s the honest breakdown of our uptime.
                    </p>
                    <StatusBadge status={status} failed={failed} />
                </div>
            </header>
            {failed && !status ? (
                <p className="m-0 text-sm text-secondary">
                    Could not load our status right now. See{' '}
                    <a href={STATUS_SITE} target="_blank" rel="noopener noreferrer" className={incidentLink}>
                        posthogstatus.com
                    </a>
                    .
                </p>
            ) : (
                <>
                    <UptimeCalendar status={status} />
                    <div className="grid grid-cols-[minmax(0,1fr)] gap-10 @3xl:grid-cols-2">
                        <DowntimeStats status={status} />
                        <LatestIncidents status={status} />
                    </div>
                    <a
                        href={STATUS_SITE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`self-start text-sm ${incidentLink}`}
                    >
                        See the full status page
                    </a>
                </>
            )}
        </section>
    )
}

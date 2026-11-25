import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Badge } from 'components/UI/Badge'
import OSButton from 'components/OSButton'
import { Card } from 'components/UI/Card'
import { Skeleton } from 'components/UI/Skeleton'
import { Table } from 'components/UI/Table'
import type { ColorName } from 'components/UI/colors'
import type { ScaleStatus } from '../../api/scale-status'
import { dottedUnderline } from './data'

const STATUS_API = '/api/scale-status'
const STATUS_SITE = 'https://www.posthogstatus.com'
const REFRESH_MS = 60_000
const FRESH_MS = 10 * 60_000
const FETCH_TIMEOUT_MS = 10_000
const LATEST_INCIDENTS = 10

const impactColors: Record<string, ColorName> = {
    degraded_performance: 'yellow',
    partial_outage: 'tangerine',
    full_outage: 'coral',
    under_maintenance: 'blue',
}

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
            {single ? worst.name : `${status.active.length} active notices`}
            {live}
        </Badge>
    )
}

const componentLabels: [string, string][] = [
    ['App (Web & Desktop)', 'App (web and desktop)'],
    ['Event Ingestion Success', 'Event ingestion success'],
    ['Event Ingestion Lag', 'Event ingestion lag'],
    ['Feature Flags API', 'Feature flags API'],
    ['Session Replay Ingestion', 'Session replay ingestion'],
    ['REST API Query endpoints', 'Query API endpoints'],
    ['All other REST API endpoints', 'Other API endpoints'],
    ['Logs', 'Logs'],
    ['Error Tracking Ingestion Lag', 'Error tracking ingestion lag'],
    ['Data Warehouse Source Ingestion', 'Data warehouse sources'],
    ['Destination Delivery (realtime)', 'Destinations (realtime)'],
    ['Destination Delivery (batch exports)', 'Destinations (batch exports)'],
    ['Workflows', 'Workflows'],
    ['Cloud AI Agents', 'Cloud AI agents'],
    ['MCP Server', 'MCP server'],
]

const labels = new Map(componentLabels)
const componentRank = new Map(componentLabels.map(([name], index) => [name, index]))

const noticeRow = 'm-0 grid grid-cols-[5rem_minmax(0,1fr)] gap-4 border-l border-primary py-2 pl-4'

const shortDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
const longDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

function formatUptime(value: number): string {
    return value === 100 ? '100.00%' : `${value.toFixed(3)}%`
}

function sortRows(rows: ScaleStatus['uptime']): ScaleStatus['uptime'] {
    const rank = (name: string) => componentRank.get(name) ?? componentLabels.length
    return [...rows].sort((a, b) => rank(a.name) - rank(b.name))
}

function UptimeCard({ status }: { status: ScaleStatus | null }): JSX.Element {
    const period = status
        ? `${shortDate.format(Date.parse(status.uptimeSince))} to ${longDate.format(Date.parse(status.generatedAt))}`
        : undefined
    return (
        <Card.Root padding="sm">
            <Card.TitleBar meta={period}>Uptime, last 90 days</Card.TitleBar>
            {status ? (
                <Table.Root appearance="plain" density="compact">
                    <Table.Header>
                        <Table.Row>
                            <Table.Head>Component</Table.Head>
                            <Table.Head align="end">US</Table.Head>
                            <Table.Head align="end">EU</Table.Head>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {sortRows(status.uptime).map((row) => (
                            <Table.Row key={row.name}>
                                <Table.Head scope="row">{labels.get(row.name) ?? row.name}</Table.Head>
                                {[row.us, row.eu].map((value, region) => (
                                    <Table.Cell key={region} align="end" className="font-code tabular-nums">
                                        <span className={value === 100 ? 'text-green' : 'text-yellow'}>
                                            {formatUptime(value)}
                                        </span>
                                    </Table.Cell>
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            ) : (
                <div aria-hidden className="py-2">
                    <Skeleton lines={componentLabels.length} />
                </div>
            )}
        </Card.Root>
    )
}

function RecentIncidents({ status }: { status: ScaleStatus | null }): JSX.Element {
    return (
        <section className="flex flex-col gap-4">
            <h3 className="m-0 font-code text-13 font-normal uppercase tracking-wide text-secondary">Recent notices</h3>
            <ol className="m-0 list-none p-0">
                {status
                    ? status.incidents.map((incident) => (
                          <li key={incident.url} className={noticeRow}>
                              <time dateTime={incident.publishedAt} className="font-code text-13 text-secondary">
                                  {shortDate.format(Date.parse(incident.publishedAt))}
                              </time>
                              <a
                                  href={incident.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-15 underline"
                              >
                                  {incident.name}
                                  {incident.status !== 'resolved' && ' (open)'}
                              </a>
                          </li>
                      ))
                    : Array.from({ length: LATEST_INCIDENTS }, (_, row) => (
                          <li key={row} aria-hidden className={noticeRow}>
                              <Skeleton width="3rem" />
                              <Skeleton width="80%" />
                          </li>
                      ))}
            </ol>
            <a
                href={STATUS_SITE}
                target="_blank"
                rel="noopener noreferrer"
                className={`self-start text-sm text-secondary hover:text-primary ${dottedUnderline}`}
            >
                See the full status page
            </a>
        </section>
    )
}

const HedgehogError = lazy(() =>
    import(/* webpackExports: ["HedgehogError"] */ '@posthog/brand/hoggies')
        .then((hoggies) => ({ default: hoggies.HedgehogError }))
        .catch(() => ({ default: () => null }))
)

function StatusFailed(): JSX.Element {
    return (
        <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div aria-hidden className="size-40">
                <Suspense fallback={null}>
                    <HedgehogError className="size-full" />
                </Suspense>
            </div>
            <div className="flex flex-col items-center gap-3">
                <h3 className="m-0 text-xl font-bold">Uh oh – it looks like we couldn’t fetch status info.</h3>
                <p className="m-0 text-secondary">The status page always has the latest on our uptime and notices.</p>
                <OSButton asLink external variant="secondary" size="md" to={STATUS_SITE}>
                    Open the status page
                </OSButton>
            </div>
        </div>
    )
}

export default function Reliability(): JSX.Element {
    const { status, failed } = useScaleStatus()
    return (
        <section className="mx-auto mt-24 flex max-w-6xl flex-col gap-6 @container">
            <header className="flex flex-col gap-3">
                <h2 className="m-0 text-3xl font-bold @3xl:text-5xl">All while keeping the lights on.</h2>
                <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge status={status} failed={failed} />
                    <p className="m-0 text-lg text-secondary">Here’s the uptime for the last 90 days.</p>
                </div>
            </header>
            {failed && !status ? (
                <StatusFailed />
            ) : (
                <div className="grid items-start gap-6 @4xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                    <UptimeCard status={status} />
                    <RecentIncidents status={status} />
                </div>
            )}
        </section>
    )
}

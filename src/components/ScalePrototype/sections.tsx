import React from 'react'
import { Badge } from 'components/UI/Badge'
import { Card } from 'components/UI/Card'
import { Sparkline } from 'components/UI/Chart'
import { Emphasis } from 'components/UI/Emphasis'
import { RelativeTime, useNow } from 'components/UI/RelativeTime'
import { RoughAnnotation } from 'components/UI/RoughAnnotation'
import { Table } from 'components/UI/Table'
import {
    SNAPSHOT_DAY,
    UPTIME_WINDOW,
    eventsYesterday,
    formatFull,
    formatLong,
    metricOrder,
    metrics,
    products,
    reports,
    uptime,
} from './data'
import { INCIDENTS_AS_OF } from './incidents'
import { TodaySoFar, formatUptime } from './parts'
import { daysSince } from './useStatus'
import type { StatusData } from './useStatus'
import './receipt.css'

const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })

const rule = 'border-t border-dashed border-[rgb(var(--text-primary)/0.4)]'

function Line({ qty, item, note }: { qty: string; item: string; note?: string }): JSX.Element {
    return (
        <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
                <span className="min-w-0 flex-1 truncate uppercase">{item}</span>
                <span className="shrink-0 font-bold tabular-nums">{qty}</span>
            </div>
            {note && <span className="text-13 text-secondary">{note}</span>}
        </div>
    )
}

export function Headline(): JSX.Element {
    const { rowsRead } = metrics
    return (
        <header className="flex flex-col gap-4">
            <div className="font-code text-13 uppercase tracking-wide text-secondary">{SNAPSHOT_DAY}</div>
            <h1 className="m-0 whitespace-nowrap text-[length:clamp(1.75rem,8.5cqw,3.75rem)] font-bold leading-[1.15]">
                We read <Emphasis>{formatLong(rowsRead.yesterday)}</Emphasis>
                <br />
                rows yesterday.
            </h1>
            <p className="m-0 max-w-prose text-lg text-secondary">
                That number is too big to mean anything, so here’s{' '}
                <RoughAnnotation type="underline" color="gray" multiline delay={400}>
                    everything else that happened yesterday
                </RoughAnnotation>{' '}
                to put that into perspective.
            </p>
        </header>
    )
}

export function ReceiptCard({ className = '' }: { className?: string }): JSX.Element {
    const total = metricOrder.reduce((sum, key) => sum + metrics[key].yesterday, eventsYesterday)
    return (
        <div className={`scale-proto-receipt w-full max-w-sm ${className}`}>
            <Card.Root appearance="solid" className="scale-proto-receipt-paper gap-3 font-code text-sm">
                <div className="text-center">
                    <div className="text-lg font-bold tracking-widest">POSTHOG CLOUD</div>
                    <div className="text-13 text-secondary">US + EU · open 24 hours</div>
                    <div className="text-13 text-secondary">{SNAPSHOT_DAY}</div>
                </div>
                <div className={rule} />
                <Line qty={formatLong(eventsYesterday)} item="Events ingested" note="about one per human on Earth" />
                {metricOrder.map((key) => (
                    <Line
                        key={key}
                        qty={formatLong(metrics[key].yesterday)}
                        item={metrics[key].name}
                        note={metrics[key].aside.toLowerCase()}
                    />
                ))}
                <div className={rule} />
                <Line qty={formatFull(reports.yesterday)} item="Self-driving reports" note="one every seven seconds" />
                <div className={rule} />
                <div className="flex items-baseline gap-2 text-15">
                    <span className="flex-1 font-bold">THINGS THAT HAPPENED</span>
                    <span className="font-bold tabular-nums">{formatLong(total)}</span>
                </div>
                <div className="flex items-baseline gap-2 text-13 text-secondary">
                    <span className="flex-1">SALES CALLS REQUIRED</span>
                    <span className="tabular-nums">0</span>
                </div>
                <div className={rule} />
                <div className="text-13 text-secondary">
                    Rows read today so far, est.
                    <TodaySoFar metric={metrics.rowsRead} className="block text-15 font-bold text-primary" />
                </div>
                <Sparkline height={44} type="bar" data={metrics.rowsRead.series} />
                <div className="text-center text-13 text-secondary">
                    30 days of rows read, as a barcode
                    <br />
                    THANK YOU FOR YOUR DATA
                </div>
            </Card.Root>
        </div>
    )
}

function UptimeTable({ dots = false }: { dots?: boolean }): JSX.Element {
    return (
        <Table.Root appearance="plain" density="compact">
            <Table.Header>
                <Table.Row>
                    <Table.Head>Component</Table.Head>
                    <Table.Head align="end">US</Table.Head>
                    <Table.Head align="end">EU</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {uptime.map((row) => (
                    <Table.Row key={row.component}>
                        <Table.Head scope="row">{row.component}</Table.Head>
                        {[row.us, row.eu].map((value, index) => (
                            <Table.Cell key={index} align="end" className="font-code tabular-nums">
                                {dots ? (
                                    <span
                                        className={`inline-flex items-center gap-2 ${value === 100 ? '' : 'font-bold'}`}
                                    >
                                        <span
                                            className={`size-2 rounded-full ${
                                                value === 100 ? 'bg-green' : 'bg-yellow'
                                            }`}
                                        />
                                        {formatUptime(value)}
                                    </span>
                                ) : (
                                    <span className={value === 100 ? 'text-green' : 'text-yellow'}>
                                        {formatUptime(value)}
                                    </span>
                                )}
                            </Table.Cell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    )
}

export function UptimeCard({ appearance }: { appearance?: 'solid' | 'section' }): JSX.Element {
    if (appearance === 'section') {
        return (
            <section>
                <UptimeTable dots />
            </section>
        )
    }
    return (
        <Card.Root appearance={appearance} padding="sm">
            <Card.TitleBar meta={UPTIME_WINDOW}>Uptime, last 90 days</Card.TitleBar>
            <UptimeTable />
        </Card.Root>
    )
}

export function LastIncidents({ status }: { status: StatusData }): JSX.Element {
    const now = useNow()
    return (
        <Card.Root padding="sm">
            <Card.TitleBar meta={`feed snapshot, ${INCIDENTS_AS_OF}`}>Last incident, by product</Card.TitleBar>
            <div className="grid gap-2 @xl:grid-cols-2 @4xl:grid-cols-4">
                {products.map((product) => {
                    const incident = status.lastByProduct[product.key]
                    return (
                        <Card.Root key={product.key} padding="sm">
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-13 font-semibold">{product.name}</span>
                                <Badge size="sm" color={incident && !incident.resolved ? 'tangerine' : 'green'}>
                                    {incident && !incident.resolved ? 'Open' : 'OK'}
                                </Badge>
                            </div>
                            {incident && now !== null ? (
                                <>
                                    <div className="text-2xl font-bold leading-none tabular-nums">
                                        {daysSince(incident.date, now)}
                                        <span className="ml-1 text-13 font-normal text-secondary">days since</span>
                                    </div>
                                    <a href={incident.url} className="text-13 leading-snug underline">
                                        {incident.title}
                                    </a>
                                    <RelativeTime date={incident.date} className="text-13 text-secondary" />
                                </>
                            ) : (
                                <>
                                    <div className="text-2xl font-bold leading-none tabular-nums">
                                        {now === null ? '…' : `${daysSince(status.since, now)}+`}
                                        <span className="ml-1 text-13 font-normal text-secondary">days clear</span>
                                    </div>
                                    <span className="text-13 text-secondary">No incident in the status feed.</span>
                                </>
                            )}
                        </Card.Root>
                    )
                })}
            </div>
        </Card.Root>
    )
}

export function IncidentTimeline({
    status,
    count = 8,
    titleInside = false,
}: {
    status: StatusData
    count?: number
    titleInside?: boolean
}): JSX.Element {
    const title = (
        <div className="font-code text-13 uppercase tracking-wide text-secondary">
            What broke lately (snapshot, {INCIDENTS_AS_OF})
        </div>
    )
    return (
        <section className="flex flex-col gap-4">
            {!titleInside && title}
            <ol className="m-0 list-none p-0">
                {titleInside && <li className="border-l border-primary pb-2 pl-4">{title}</li>}
                {status.incidents.slice(0, count).map((incident) => (
                    <li
                        key={incident.url + incident.date}
                        className="grid grid-cols-[5rem_minmax(0,1fr)] gap-4 border-l border-primary py-2 pl-4"
                    >
                        <time className="font-code text-13 text-secondary">{dateFormat.format(incident.date)}</time>
                        <a href={incident.url} className="text-15 underline">
                            {incident.title}
                            {!incident.resolved && ' (open)'}
                        </a>
                    </li>
                ))}
            </ol>
        </section>
    )
}

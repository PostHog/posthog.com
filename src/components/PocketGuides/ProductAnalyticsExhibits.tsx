import React, { useState } from 'react'
import type { StaySetting } from '@posthog/twig-components/filters'
import TwigBrowseFigure from './TwigBrowseFigure'

type EventRow = {
    id: string
    event: string
    destination: string
}

const destinationRows: EventRow[] = [
    { id: 'evt-101', event: 'stay_filter_selected', destination: 'Coast' },
    { id: 'evt-102', event: 'stay_filter_selected', destination: 'Coast' },
    { id: 'evt-103', event: 'stay_filter_selected', destination: 'Forest' },
    { id: 'evt-104', event: 'stay_filter_selected', destination: 'Coast' },
    { id: 'evt-105', event: 'stay_filter_selected', destination: 'City' },
]

function Exhibit({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <figure className="not-prose my-6 overflow-hidden rounded border border-primary bg-primary @container">
            <figcaption className="border-b border-primary px-4 py-3 font-rounded text-sm font-semibold text-primary">
                {title} <span className="ml-2 font-normal text-secondary">Example data · stays in this guide</span>
            </figcaption>
            <div className="grid gap-4 p-4 @2xl:grid-cols-2">{children}</div>
        </figure>
    )
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="min-w-0 rounded border border-primary bg-accent p-4 font-rounded text-primary dark:bg-accent-dark">
            <h3 className="!m-0 text-sm font-semibold">{title}</h3>
            <div className="mt-3">{children}</div>
        </section>
    )
}

function Rows({ rows, active }: { rows: EventRow[]; active?: string }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left font-code text-xs">
                <thead>
                    <tr className="text-secondary">
                        <th className="p-2">Event ID</th>
                        <th className="p-2">Event</th>
                        <th className="p-2">Destination</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr
                            key={row.id}
                            className={`border-t border-primary ${active === row.destination ? 'bg-orange/20' : ''}`}
                        >
                            <td className="p-2">{row.id}</td>
                            <td className="p-2">{row.event}</td>
                            <td className="p-2">{row.destination}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function Bar({
    label,
    value,
    max,
    selected,
    onClick,
}: {
    label: string
    value: number
    max: number
    selected?: boolean
    onClick?: () => void
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={selected}
            className="my-1 flex w-full items-center gap-2 rounded px-1 py-1 text-left text-sm aria-pressed:bg-orange/10"
        >
            <span className="w-14 shrink-0">{label}</span>
            <span className="h-5 min-w-0 flex-1 overflow-hidden rounded-sm bg-primary">
                <span
                    className="block h-full rounded-sm bg-orange"
                    style={{ width: `${Math.max(6, (value / max) * 100)}%` }}
                />
            </span>
            <strong className="w-5 text-right">{value}</strong>
        </button>
    )
}

export function AutocaptureFigure(): JSX.Element {
    const [choice, setChoice] = useState<StaySetting | null>(null)
    return (
        <Exhibit title="What autocapture sees">
            <TwigBrowseFigure id="guide-autocapture" onFilter={(setting) => setChoice(setting)} />
            <Panel title="Activity feed">
                {choice ? (
                    <>
                        <p className="text-sm">
                            <code>$autocapture</code> · button labeled{' '}
                            <strong>{choice === 'All' ? 'All locations' : choice}</strong>
                        </p>
                        <dl className="mt-3 grid grid-cols-2 gap-2 font-code text-xs">
                            <dt>$event_type</dt>
                            <dd>click</dd>
                            <dt>$pathname</dt>
                            <dd>/</dd>
                            <dt>$current_url</dt>
                            <dd>https://twig.com/</dd>
                        </dl>
                        <p className="mt-2 text-xs text-secondary">
                            PostHog supplies these default properties. This event has no product-specific name or{' '}
                            <code>destination_type</code> property yet.
                        </p>
                    </>
                ) : (
                    <p className="text-sm text-secondary">Choose a destination on Twig to see a generic click.</p>
                )}
            </Panel>
        </Exhibit>
    )
}

export function FilterPropertiesFigure(): JSX.Element {
    const [choice, setChoice] = useState<StaySetting | null>(null)
    const [count, setCount] = useState(0)
    const [details, setDetails] = useState(false)
    return (
        <Exhibit title="One click, one useful event">
            <TwigBrowseFigure
                id="guide-properties"
                onFilter={(setting, matches) => {
                    setChoice(setting)
                    setCount(matches)
                    setDetails(false)
                }}
            />
            <Panel title="Captured event">
                {choice ? (
                    <>
                        <code>stay_filter_selected</code>
                        <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                            <dt>destination_type</dt>
                            <dd className="font-semibold">{choice}</dd>
                            {details && (
                                <>
                                    <dt>results_count</dt>
                                    <dd>{count}</dd>
                                    <dt>has_results</dt>
                                    <dd>{String(count > 0)}</dd>
                                </>
                            )}
                        </dl>
                        <button
                            type="button"
                            className="mt-3 underline decoration-orange underline-offset-4"
                            onClick={() => setDetails(!details)}
                        >
                            {details ? 'Hide' : 'Show'} the other properties
                        </button>
                    </>
                ) : (
                    <p className="text-sm text-secondary">Choose Forest, Coast, or City to capture its value.</p>
                )}
            </Panel>
        </Exhibit>
    )
}

export function DestinationChartFigure(): JSX.Element {
    const [selected, setSelected] = useState('Coast')
    return (
        <Exhibit title="Five filter selections">
            <Panel title="Source events">
                <Rows rows={destinationRows} active={selected} />
            </Panel>
            <Panel title="Filter selections by destination">
                {(['Coast', 'Forest', 'City'] as const).map((name) => (
                    <Bar
                        key={name}
                        label={name}
                        value={destinationRows.filter((r) => r.destination === name).length}
                        max={3}
                        selected={selected === name}
                        onClick={() => setSelected(name)}
                    />
                ))}
                <p className="mt-3 text-xs text-secondary">
                    Select a bar to see which event records contribute to its total.
                </p>
            </Panel>
        </Exhibit>
    )
}

import React, { useState } from 'react'
import { colors } from '@posthog/brand/colors'
import type { StaySetting } from '@posthog/twig-components/filters'
import ExploreTwigLink from './ExploreTwigLink'
import PostHogInspector, { InspectorCode, InspectorStatus } from './PostHogInspector'
import TwigBrowseFigure from './TwigBrowseFigure'

type EventRow = {
    id: string
    destination: string
    timestamp: string
}

const destinationRows: EventRow[] = [
    { id: 'evt-101', destination: 'Coast', timestamp: '2026-09-25T14:10:12.000Z' },
    { id: 'evt-102', destination: 'Coast', timestamp: '2026-09-25T14:12:38.000Z' },
    { id: 'evt-103', destination: 'Forest', timestamp: '2026-09-25T14:16:05.000Z' },
    { id: 'evt-104', destination: 'Coast', timestamp: '2026-09-25T14:20:43.000Z' },
    { id: 'evt-105', destination: 'City', timestamp: '2026-09-25T14:24:19.000Z' },
]

const destinations = [
    { name: 'Coast', color: colors.blue.core },
    { name: 'Forest', color: colors.purple.core },
    { name: 'City', color: colors.teal.darker },
]

function Exhibit({
    stacked = false,
    exploreTwig = false,
    children,
}: {
    stacked?: boolean
    exploreTwig?: boolean
    children: React.ReactNode
}) {
    return (
        <figure className="not-prose my-6 mx-0 overflow-hidden rounded border border-primary bg-accent p-3 dark:bg-accent-dark @container @md:p-4">
            <div className={`grid gap-4 ${stacked ? '' : '@2xl:grid-cols-2'}`}>{children}</div>
            {exploreTwig && <ExploreTwigLink />}
        </figure>
    )
}

export function AutocaptureFigure(): JSX.Element {
    const [choice, setChoice] = useState<StaySetting | null>(null)
    const [capturedAt, setCapturedAt] = useState<string | null>(null)
    const clickedLabel = choice === 'All' ? 'All locations' : choice
    const eventPayload = JSON.stringify(
        {
            event: '$autocapture',
            timestamp: capturedAt,
            properties: {
                $event_type: 'click',
                $pathname: '/',
                $current_url: 'https://twig.com/',
            },
        },
        null,
        2
    )

    return (
        <Exhibit stacked exploreTwig>
            <TwigBrowseFigure
                id="guide-autocapture"
                onFilter={(setting) => {
                    setChoice(setting)
                    setCapturedAt(new Date().toISOString())
                }}
            />
            <PostHogInspector>
                {clickedLabel ? (
                    <>
                        <InspectorCode
                            label="Clicked element"
                            value={`<button aria-pressed="true">${clickedLabel}</button>`}
                        />
                        <InspectorCode label="Event payload · selected properties" value={eventPayload} />
                    </>
                ) : (
                    <InspectorStatus>Choose a destination on Twig to inspect its click event.</InspectorStatus>
                )}
            </PostHogInspector>
        </Exhibit>
    )
}

export function FilterPropertiesFigure(): JSX.Element {
    const [choice, setChoice] = useState<StaySetting | null>(null)
    const [count, setCount] = useState(0)
    const [capturedAt, setCapturedAt] = useState<string | null>(null)
    const eventPayload = JSON.stringify(
        {
            event: 'stay_filter_selected',
            timestamp: capturedAt,
            properties: {
                destination_type: choice,
                results_count: count,
                has_results: count > 0,
            },
        },
        null,
        2
    )

    return (
        <Exhibit stacked exploreTwig>
            <TwigBrowseFigure
                id="guide-properties"
                onFilter={(setting, matches) => {
                    setChoice(setting)
                    setCount(matches)
                    setCapturedAt(new Date().toISOString())
                }}
            />
            <PostHogInspector>
                {choice && capturedAt ? (
                    <InspectorCode label="Event payload · selected properties" value={eventPayload} />
                ) : (
                    <InspectorStatus>Choose Forest, Coast, or City to inspect its event.</InspectorStatus>
                )}
            </PostHogInspector>
        </Exhibit>
    )
}

export function DestinationChartFigure(): JSX.Element {
    const [selected, setSelected] = useState('Coast')
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
    const selectedRows = destinationRows.filter((row) => row.destination === selected)
    const selectedEvent = destinationRows.find((row) => row.id === selectedEventId)
    const eventPayload = selectedEvent
        ? JSON.stringify({
              event: 'stay_filter_selected',
              timestamp: selectedEvent.timestamp,
              properties: {
                  destination_type: selectedEvent.destination,
                  results_count: 1,
                  has_results: true,
              },
          })
        : null

    return (
        <Exhibit stacked>
            <section
                aria-label="Filter selections by destination"
                className="min-w-0 overflow-hidden rounded border border-[#d3d0c8] bg-[#fffdfa] font-rounded text-[#292724] shadow-sm"
            >
                <div className="p-3">
                    <div className="space-y-2" aria-label="Filter selections by destination">
                        {destinations.map(({ name, color }) => {
                            const matchingRows = destinationRows.filter((row) => row.destination === name)
                            const count = matchingRows.length
                            const isSelected = selected === name
                            return (
                                <button
                                    key={name}
                                    type="button"
                                    onClick={() => {
                                        setSelected(name)
                                        setSelectedEventId(matchingRows[0]?.id ?? null)
                                    }}
                                    aria-pressed={isSelected}
                                    aria-label={`${name}: ${count} ${
                                        count === 1 ? 'selection' : 'selections'
                                    }. Inspect first event`}
                                    className="grid w-full cursor-pointer grid-cols-[4.5rem_minmax(0,1fr)_1.5rem] items-center gap-2 rounded px-2 py-2 text-left text-sm hover:bg-[#faf8f3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange @md:grid-cols-[6rem_minmax(0,1fr)_2rem]"
                                >
                                    <span className="font-semibold">{name}</span>
                                    <span className="h-6 min-w-0 rounded-sm bg-[#e9e7e1]" aria-hidden="true">
                                        <span
                                            className="block h-full rounded-sm"
                                            style={{ width: `${(count / 3) * 100}%`, backgroundColor: color }}
                                        />
                                    </span>
                                    <strong className="text-right">{count}</strong>
                                </button>
                            )
                        })}
                    </div>
                    <div
                        className="ml-[5rem] mr-8 flex justify-between px-2 font-code text-xs text-[#716c63] @md:ml-[6.5rem]"
                        aria-hidden="true"
                    >
                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                    </div>
                </div>
                <div className="border-t border-[#d3d0c8] bg-[#faf8f3] px-3 py-3">
                    <h4 className="!m-0 text-sm font-semibold">
                        {selected} · {selectedRows.length} {selectedRows.length === 1 ? 'event' : 'events'}
                    </h4>
                    <div className="flex flex-wrap gap-2 font-code text-xs">
                        {selectedRows.map((row) => (
                            <button
                                key={row.id}
                                type="button"
                                onClick={() => setSelectedEventId(row.id)}
                                aria-pressed={selectedEventId === row.id}
                                aria-label={`Inspect event ${row.id}`}
                                className={`cursor-pointer rounded border px-2.5 py-1.5 font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange ${
                                    selectedEventId === row.id
                                        ? 'border-orange bg-[#ffe3af] text-[#292724] shadow-sm'
                                        : 'border-[#d3d0c8] bg-[#fffdfa] text-[#5f5a52] underline decoration-orange underline-offset-2 hover:border-orange hover:bg-[#fff0dc] hover:text-[#292724]'
                                }`}
                            >
                                {row.id}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
            {selectedEvent && eventPayload && (
                <PostHogInspector>
                    <InspectorCode
                        label="Event payload · selected properties"
                        meta={selectedEvent.id}
                        value={eventPayload}
                    />
                </PostHogInspector>
            )}
        </Exhibit>
    )
}

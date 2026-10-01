import React, { useRef } from 'react'
import dayjs from 'dayjs'
import OSButton from 'components/OSButton'
import ScrollArea from 'components/RadixUI/ScrollArea'
import type { EventGraphicProps } from 'components/EventGraphic'
import type { Event } from '../../pages/events'
import RetroTV, { LiveBadge } from './RetroTV'
import VhsShelf from './VhsShelf'
import PolaroidWall from './PolaroidWall'
import { formatEventTime, getEventStart, isEventLive } from './utils'

type OnlineRoomProps = {
    events: Event[]
    selectedEvent: Event | null
    playing: Event | null
    onPlay: (event: Event | null) => void
    onSelectEvent: (event: Event) => void
    graphicPropsFor: (event: Event) => EventGraphicProps
    className?: string
}

export default function OnlineRoom({
    events,
    selectedEvent,
    playing,
    onPlay,
    onSelectEvent,
    graphicPropsFor,
    className = '',
}: OnlineRoomProps): JSX.Element {
    const now = dayjs()
    const tvRef = useRef<HTMLElement | null>(null)

    // Putting a tape in scrolls back up to the TV so you can watch it
    const playTape = (event: Event) => {
        onPlay(event)
        tvRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    const liveEvents = events.filter((event) => isEventLive(event, now))
    const upcomingOnline = events
        .filter((event) => event.online && !isEventLive(event, now) && getEventStart(event).isAfter(now))
        .sort((a, b) => getEventStart(a).valueOf() - getEventStart(b).valueOf())
    const recordings = events
        .filter((event) => event.video && getEventStart(event).isBefore(now))
        .sort((a, b) => getEventStart(b).valueOf() - getEventStart(a).valueOf())
    const pastEvents = events
        .filter((event) => !event.online && getEventStart(event).isBefore(now))
        .sort((a, b) => getEventStart(b).valueOf() - getEventStart(a).valueOf())

    // What's on: a tape you put in > the online event you selected > whatever is live > static
    const tunedIn = playing || (selectedEvent?.online ? selectedEvent : null) || liveEvents[0] || null
    const tunedInLive = tunedIn ? isEventLive(tunedIn, now) : false

    return (
        // Pinned to the pane so the scroll area has a real height to scroll within
        <div className={`absolute inset-0 ${className}`}>
            <ScrollArea className="h-full">
                <div className="@container mx-auto max-w-3xl space-y-8 p-4">
                    {liveEvents.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 rounded border border-primary bg-primary p-3 text-sm">
                            <LiveBadge />
                            <span className="font-semibold">On air now:</span>
                            {liveEvents.map((event) => (
                                <button
                                    key={event.id}
                                    onClick={() => onSelectEvent(event)}
                                    className="font-semibold text-red hover:underline"
                                >
                                    {event.name}
                                </button>
                            ))}
                        </div>
                    )}

                    <section ref={tvRef} className="scroll-mt-4">
                        <RetroTV
                            event={tunedIn}
                            graphicProps={tunedIn ? graphicPropsFor(tunedIn) : undefined}
                            videoUrl={playing?.video}
                            live={tunedInLive}
                            emptyMessage="No signal · pick a tape"
                            className="mx-auto w-full max-w-xl"
                        />

                        {/* Now-playing caption under the TV */}
                        <div className="mx-auto mt-3 flex max-w-xl flex-wrap items-center justify-between gap-2 text-sm">
                            <div className="min-w-0">
                                <div className="text-[13px] text-secondary">
                                    {playing
                                        ? 'Now playing'
                                        : tunedInLive
                                        ? 'Live now'
                                        : tunedIn
                                        ? 'Tuned in'
                                        : 'Channel 3'}
                                </div>
                                <div className="truncate font-semibold">
                                    {tunedIn ? tunedIn.name : 'Nothing on right now'}
                                </div>
                            </div>
                            <div className="flex gap-1">
                                {playing && (
                                    <OSButton size="md" onClick={() => onPlay(null)}>
                                        ⏏ Eject
                                    </OSButton>
                                )}
                                {tunedInLive && tunedIn?.link && (
                                    <OSButton asLink to={tunedIn.link} external variant="primary" size="md">
                                        Join the stream
                                    </OSButton>
                                )}
                                {tunedIn && tunedIn.id !== selectedEvent?.id && (
                                    <OSButton size="md" onClick={() => onSelectEvent(tunedIn)}>
                                        Details
                                    </OSButton>
                                )}
                            </div>
                        </div>
                    </section>

                    {upcomingOnline.length > 0 && (
                        <section>
                            <h3 className="mb-2 text-lg font-bold">Coming up on this channel</h3>
                            <ul className="divide-y divide-primary rounded border border-primary bg-primary">
                                {upcomingOnline.map((event) => (
                                    <li key={event.id}>
                                        <button
                                            onClick={() => onSelectEvent(event)}
                                            className="flex w-full flex-col gap-0.5 px-3 py-2 text-left hover:bg-accent @lg:flex-row @lg:items-baseline @lg:gap-3"
                                        >
                                            <span className="shrink-0 font-code text-[13px] text-secondary @lg:w-56">
                                                {formatEventTime(event, 'viewer')}
                                            </span>
                                            <span className="font-semibold">{event.name}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    <VhsShelf recordings={recordings} playingId={playing?.id} onPlay={playTape} />

                    <PolaroidWall events={pastEvents} onSelectEvent={onSelectEvent} />
                </div>
            </ScrollArea>
        </div>
    )
}

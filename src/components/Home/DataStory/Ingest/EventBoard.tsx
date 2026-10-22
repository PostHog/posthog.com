import React, { useEffect, useReducer, useRef } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import Link from 'components/Link'
import { cn } from '../../../../utils'
import { SOURCES_DOCS_URL, useSourceCountLabel } from '../sourceCount'
import { transform, useEventClock, useRandomInterval } from '../timeline'
import {
    AmbientRiders,
    BoardAction,
    BoardRow,
    Origin,
    TICK_MS,
    emptyBoard,
    eventRow,
    reduceBoard,
    ridePaymentRow,
    seedBoard,
    sourceRecord,
} from './board'
import BoxPlotChart from './BoxPlotChart'
import BoardWindow from './BoardWindow'
import { EVENT_KINDS, EventTile } from './eventKinds'
import { CHAT_BOUNDARIES, CHAT_DONE_AT, CHAT_EVENTS, CHAT_LENGTH_MS, CHAT_RIDER, ChatEvent } from './fetchScript'
import FetchWindow from './FetchWindow'
import { SOURCE_AMBIENT_MS, SPOTLIGHT_SOURCES, SourceTile, useSpotlightLogos } from './sources'

const AMBIENT_EVENT_MS = { minMs: 700, maxMs: 2200 }
const ROW_COLUMNS =
    'grid grid-cols-[minmax(0,1fr)_6.5rem_2.75rem] items-center gap-2 px-3 text-[13px] @md:grid-cols-[minmax(0,1fr)_7.5rem_3rem] @md:gap-3 @2xl:pl-11'

const timeAgo = (at: number, now: number): string => {
    const seconds = Math.round((now - at) / 1000)
    return seconds < 2 ? 'now' : `${seconds}s ago`
}

const LiveDot = () => (
    <span className="relative flex size-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-green opacity-60 motion-reduce:hidden" />
        <span className="relative size-2 rounded-full bg-green" />
    </span>
)

const RowName = ({ origin, logos }: { origin: Origin; logos: (string | undefined)[] }) =>
    origin.type === 'event' ? (
        <>
            <EventTile kind={origin.kind} />
            <span className="min-w-0 truncate font-mono text-xs text-primary @md:shrink-0">
                {EVENT_KINDS[origin.kind].event}
            </span>
        </>
    ) : (
        <>
            <SourceTile logo={logos[origin.source]} />
            <span className="min-w-0 truncate font-semibold text-primary @md:shrink-0">
                {SPOTLIGHT_SOURCES[origin.source].name}
            </span>
        </>
    )

const EventsTable = React.memo(function EventsTable({
    rows,
    now,
    logos,
    className,
}: {
    rows: BoardRow[]
    now: number
    logos: (string | undefined)[]
    className?: string
}) {
    const reduceMotion = useReducedMotion()
    const sourceCount = useSourceCountLabel()
    return (
        <BoardWindow
            title={
                <>
                    <LiveDot />
                    Live events
                </>
            }
            aside={SPOTLIGHT_SOURCES.map(({ name }, index) => (
                <SourceTile key={name} logo={logos[index]} />
            ))}
            className={className}
        >
            <div className={cn(ROW_COLUMNS, 'border-b border-primary py-1 font-mono text-[11px] uppercase text-muted')}>
                <span>Event</span>
                <span>Person</span>
                <span className="text-right">When</span>
            </div>
            <div
                className="min-h-0 flex-1 overflow-hidden [mask-image:linear-gradient(black_65%,transparent)]"
                aria-hidden="true"
            >
                <AnimatePresence initial={false}>
                    {rows.map(({ id, at, origin, detail, person }) => (
                        <motion.div
                            key={id}
                            layout={reduceMotion ? false : 'position'}
                            initial={reduceMotion ? false : { opacity: 0, transform: transform({ y: -10 }) }}
                            animate={{ opacity: 1, transform: transform() }}
                            exit={{ opacity: 0, transition: { duration: 0.15 } }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className={cn(
                                ROW_COLUMNS,
                                'h-11 border-b border-primary',
                                person === CHAT_RIDER && 'bg-orange/10'
                            )}
                        >
                            <span className="flex min-w-0 items-center gap-2">
                                <RowName origin={origin} logos={logos} />
                                <span className="hidden min-w-0 truncate text-xs text-muted @md:block">{detail}</span>
                            </span>
                            <span
                                className={cn(
                                    'truncate font-mono text-[11px]',
                                    person === CHAT_RIDER ? 'font-semibold text-orange' : 'text-secondary'
                                )}
                            >
                                {person}
                            </span>
                            <span className="text-right font-mono text-[11px] tabular-nums text-muted">
                                {timeAgo(at, now)}
                            </span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            <footer className="border-t border-primary px-3 py-1.5 text-right text-[11px] @2xl:pl-11">
                <Link
                    to={SOURCES_DOCS_URL}
                    state={{ newWindow: true }}
                    className="text-muted underline underline-offset-2 hover:text-primary"
                >
                    {sourceCount} more sources
                </Link>
            </footer>
        </BoardWindow>
    )
})

const chatEventAction = (event: ChatEvent, at: number): BoardAction => {
    if (event.type === 'generation') return { type: 'generation', samples: event.samples }
    if (event.type === 'payment')
        return { type: 'add', row: ridePaymentRow(CHAT_RIDER, at, event.ride.fare, event.ride.dropoff) }
    return { type: 'add', row: eventRow(event.kind, event.detail, CHAT_RIDER, at) }
}

const capturedBy = (elapsed: number): number =>
    CHAT_EVENTS.filter(({ type, at }) => type !== 'generation' && at <= elapsed).length

const usePlayChatEvents = (elapsed: number, dispatch: React.Dispatch<BoardAction>) => {
    const fired = useRef(0)
    useEffect(() => {
        while (fired.current < CHAT_EVENTS.length && CHAT_EVENTS[fired.current].at <= elapsed) {
            dispatch(chatEventAction(CHAT_EVENTS[fired.current], Date.now()))
            fired.current += 1
        }
    }, [elapsed])
}

export default function EventBoard(): JSX.Element {
    const rootRef = useRef<HTMLDivElement>(null)
    const inView = useInView(rootRef, { amount: 0.25 })
    const logos = useSpotlightLogos()
    const [board, dispatch] = useReducer(reduceBoard, undefined, emptyBoard)
    const riders = useRef(new AmbientRiders())
    const elapsed = useEventClock(rootRef, {
        loopMs: CHAT_LENGTH_MS,
        boundaries: CHAT_BOUNDARIES,
        restingMs: CHAT_DONE_AT,
        loop: false,
    })

    useEffect(() => dispatch(seedBoard(riders.current, Date.now())), [])
    usePlayChatEvents(elapsed, dispatch)

    useEffect(() => {
        if (!inView) return
        const timer = window.setInterval(() => {
            if (document.visibilityState === 'visible') dispatch({ type: 'tick', now: Date.now() })
        }, TICK_MS)
        return () => window.clearInterval(timer)
    }, [inView])

    useRandomInterval(() => dispatch({ type: 'add', row: riders.current.next(Date.now()) }), {
        ...AMBIENT_EVENT_MS,
        active: inView,
    })
    useRandomInterval(
        () =>
            dispatch({
                type: 'add',
                row: sourceRecord(Math.floor(Math.random() * SPOTLIGHT_SOURCES.length), Date.now()),
            }),
        { ...SOURCE_AMBIENT_MS, active: inView }
    )

    return (
        <div ref={rootRef} className="not-prose @container">
            <div className="flex flex-col gap-4 @2xl:grid @2xl:grid-cols-12 @2xl:gap-x-0 @2xl:gap-y-5">
                <FetchWindow
                    elapsed={elapsed}
                    captured={capturedBy(elapsed)}
                    className="relative z-20 mr-6 @2xl:col-[1/7] @2xl:row-[1] @2xl:-mr-6 @2xl:self-start"
                />
                <EventsTable
                    rows={board.rows}
                    now={board.now}
                    logos={logos}
                    className="relative z-10 ml-6 h-[24rem] @2xl:col-[7/13] @2xl:row-[1/3] @2xl:mb-10 @2xl:ml-0 @2xl:mt-12 @2xl:h-auto @2xl:[contain:size] @2xl:[&>header]:pl-11"
                />
                <BoxPlotChart
                    samples={board.samples}
                    className="relative z-30 mr-10 @2xl:col-[1/7] @2xl:row-[2] @2xl:-mr-8 @2xl:ml-10 @2xl:self-start"
                />
            </div>
        </div>
    )
}

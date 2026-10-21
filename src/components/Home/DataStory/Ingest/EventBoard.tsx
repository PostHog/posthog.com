import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import Link from 'components/Link'
import { cn } from '../../../../utils'
import { SOURCES_DOCS_URL, useSourceCountLabel } from '../sourceCount'
import { transform, useRandomInterval } from '../timeline'
import {
    AmbientShoppers,
    BoardRow,
    Origin,
    CHECKOUT_PATH,
    STICKER_PATH,
    TICK_MS,
    YOU,
    emptyBoard,
    paymentRow,
    reduceBoard,
    seedBoard,
    sourceRecord,
    BIG_ORDER_DELAY_MS,
    bigOrderRow,
} from './board'
import RevenueChart from './RevenueChart'
import BoardWindow from './BoardWindow'
import { captureUserEvents } from './capture'
import { EVENT_KINDS, EventKind, EventTile } from './eventKinds'
import { SOURCE_AMBIENT_MS, SPOTLIGHT_SOURCES, SourceTile, useSpotlightLogos } from './sources'
import StoreWindow, { Order } from './StoreWindow'

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

const EventsTable = ({
    rows,
    now,
    logos,
    onSource,
    className,
}: {
    rows: BoardRow[]
    now: number
    logos: (string | undefined)[]
    onSource: (source: number) => void
    className?: string
}) => {
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
                <button
                    key={name}
                    type="button"
                    onClick={() => onSource(index)}
                    title={`Send a ${name} record`}
                    aria-label={`Send a ${name} record`}
                    className="rounded transition-transform hover:-translate-y-0.5"
                >
                    <SourceTile logo={logos[index]} />
                </button>
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
                                'border-b border-primary py-1.5',
                                person === YOU && 'bg-orange/10'
                            )}
                        >
                            <span className="flex min-w-0 items-center gap-2">
                                <RowName origin={origin} logos={logos} />
                                <span className="hidden min-w-0 truncate text-xs text-muted @md:block">{detail}</span>
                            </span>
                            <span className="truncate font-mono text-[11px] text-secondary">
                                {person === YOU ? (
                                    <span className="rounded bg-orange px-1.5 py-px font-sans font-semibold text-white">
                                        You
                                    </span>
                                ) : (
                                    person
                                )}
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
}

export default function EventBoard(): JSX.Element {
    const rootRef = useRef<HTMLDivElement>(null)
    const storeRef = useRef<HTMLDivElement>(null)
    const inView = useInView(rootRef, { amount: 0.25 })
    const inViewRef = useRef(inView)
    inViewRef.current = inView
    const logos = useSpotlightLogos()
    const [captured, setCaptured] = useState(0)
    const [board, dispatch] = useReducer(reduceBoard, undefined, emptyBoard)
    const shoppers = useRef(new AmbientShoppers())

    useEffect(() => dispatch(seedBoard(shoppers.current, Date.now())), [])

    useEffect(() => {
        if (!inView) return
        const timer = window.setInterval(() => {
            if (document.visibilityState === 'visible') dispatch({ type: 'tick', now: Date.now() })
        }, TICK_MS)
        return () => window.clearInterval(timer)
    }, [inView])

    const emitEvent = useCallback((kind: EventKind, detail: string) => {
        setCaptured((count) => count + 1)
        dispatch({
            type: 'add',
            row: {
                at: Date.now(),
                origin: { type: 'event', kind },
                detail,
                person: YOU,
            },
        })
    }, [])

    const sendSource = useCallback(
        (source: number) => dispatch({ type: 'add', row: sourceRecord(source, Date.now()) }),
        []
    )

    const recordPayment = useCallback(
        (order: Order) => dispatch({ type: 'add', row: paymentRow(YOU, Date.now(), order) }),
        []
    )

    useEffect(() => {
        const region = storeRef.current
        if (!region) return
        return captureUserEvents({ region, emit: emitEvent, isActive: () => inViewRef.current })
    }, [emitEvent])

    const sentPageview = useRef(false)
    useEffect(() => {
        if (!inView || sentPageview.current) return
        sentPageview.current = true
        emitEvent('pageview', STICKER_PATH)
    }, [inView])

    const bigOrderPlaced = useRef(false)
    useEffect(() => {
        if (!inView || bigOrderPlaced.current) return
        const timer = window.setTimeout(() => {
            bigOrderPlaced.current = true
            dispatch({ type: 'add', row: bigOrderRow(Date.now()) })
        }, BIG_ORDER_DELAY_MS)
        return () => window.clearTimeout(timer)
    }, [inView])

    useRandomInterval(() => dispatch({ type: 'add', row: shoppers.current.next(Date.now()) }), {
        ...AMBIENT_EVENT_MS,
        active: inView,
    })
    useRandomInterval(() => sendSource(Math.floor(Math.random() * SPOTLIGHT_SOURCES.length)), {
        ...SOURCE_AMBIENT_MS,
        active: inView,
    })

    return (
        <div ref={rootRef} className="not-prose @container">
            <div className="flex flex-col gap-4 @2xl:grid @2xl:grid-cols-12 @2xl:gap-x-0 @2xl:gap-y-5">
                <StoreWindow
                    ref={storeRef}
                    captured={captured}
                    onCheckout={() => emitEvent('pageview', CHECKOUT_PATH)}
                    onPaid={recordPayment}
                    className="relative z-20 mr-6 @2xl:col-[1/7] @2xl:row-[1] @2xl:-mr-6 @2xl:self-start"
                />
                <EventsTable
                    rows={board.rows}
                    now={board.now}
                    logos={logos}
                    onSource={sendSource}
                    className="relative z-10 ml-6 @2xl:[&>header]:pl-11 h-[24rem] @2xl:col-[7/13] @2xl:row-[1/3] @2xl:ml-0 @2xl:mt-12 @2xl:h-[26rem]"
                />
                <RevenueChart
                    board={board}
                    className="relative z-30 mr-10 @2xl:col-[1/7] @2xl:row-[2] @2xl:-mr-8 @2xl:ml-10 @2xl:self-start"
                />
            </div>
        </div>
    )
}

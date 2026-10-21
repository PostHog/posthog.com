import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Link from 'components/Link'
import { cn } from '../../../../utils'
import { SOURCES_DOCS_URL, useSourceCountLabel } from '../sourceCount'
import { useRandomInterval } from '../timeline'
import { captureUserEvents } from './capture'
import { EVENT_KINDS, EVENT_ORDER, EventKind, EventTile } from './eventKinds'
import { Box, Point, RAIL_THICKNESS, RunLayout, runLayout } from './layout'
import { SOURCE_AMBIENT_MS, SPOTLIGHT_SOURCES, STRIPE, SourceLogo, SourceTile, useSpotlightLogos } from './sources'
import StoreWindow, { Order, formatDollars } from './StoreWindow'
import { MarbleWorld, Payload } from './world'

const DEFAULT_STORE_HEIGHT = 230
const DEFAULT_STAGE_HEIGHT = 640
const TOWARD_CENTER_SPEED = 0.6
const REST_OPACITY = 0.45
const ARM_MS = 300
const GONE_MS = 420
const REFILL_MS = 340
const CARD_RADIUS = 8
const PROFILE_LABELS = ['Events', ...SPOTLIGHT_SOURCES.map(({ name }) => name)]
const ROW_CLASS = 'absolute z-30 flex items-center gap-2.5 rounded px-2.5 text-left'
const FACT_ENTER = {
    initial: { opacity: 0, transform: 'translateY(3px)' },
    animate: { opacity: 1, transform: 'translateY(0px)' },
    transition: { duration: 0.35 },
}

interface ProfileRow {
    count: number
    fact: string
    kind?: EventKind
}

const emptyProfile = (): ProfileRow[] => PROFILE_LABELS.map(() => ({ count: 0, fact: '' }))
const profileRowFor = (payload: Payload): number => (payload.type === 'event' ? 0 : payload.source + 1)
const pathOf = (points: Point[]): string => points.map(({ x, y }, index) => `${index ? 'L' : 'M'}${x} ${y}`).join(' ')

const boxStyle = (box: Box): React.CSSProperties => ({
    left: box.left,
    top: box.top,
    width: box.width,
    height: box.height,
})

const clipAboveAndWithin = (box: Box, { width, height }: RunLayout): string =>
    `inset(0px ${width - box.left - box.width}px ${height - box.top - box.height}px ${
        box.left
    }px round ${CARD_RADIUS}px)`

const useElementSize = (ref: React.RefObject<HTMLElement>, fallbackHeight = 0) => {
    const [size, setSize] = useState({ width: 0, height: fallbackHeight })
    useEffect(() => {
        const element = ref.current
        if (!element) return
        const observer = new ResizeObserver(() =>
            setSize({ width: Math.round(element.offsetWidth), height: Math.round(element.offsetHeight) })
        )
        observer.observe(element)
        return () => observer.disconnect()
    }, [])
    return size
}

const Track = React.memo(function Track({ tracks }: { tracks: RunLayout['tracks'] }) {
    return (
        <svg className="pointer-events-none absolute inset-0 size-full overflow-visible" aria-hidden="true">
            {tracks.map(({ points }, index) => (
                <path
                    key={index}
                    d={pathOf(points)}
                    fill="none"
                    strokeWidth={RAIL_THICKNESS}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stroke-primary/35"
                />
            ))}
        </svg>
    )
})

const SignalIcon = ({ signal, children }: { signal: string; children: React.ReactNode }) => (
    <span data-signal={signal} className="flex shrink-0" style={{ opacity: REST_OPACITY }}>
        {children}
    </span>
)

const SectionLabel = ({ box, alignEnd, children }: { box: Box; alignEnd?: boolean; children: React.ReactNode }) => (
    <span
        className={cn(
            'absolute z-30 flex items-start text-[11px] font-semibold uppercase tracking-wide text-muted',
            alignEnd && 'justify-end'
        )}
        style={boxStyle(box)}
    >
        {children}
    </span>
)

const RowText = ({
    title,
    detail,
    alignEnd,
    compact,
}: {
    title: string
    detail: string
    alignEnd?: boolean
    compact?: boolean
}) => (
    <span className={cn('min-w-0 font-mono leading-tight', alignEnd && 'text-right')}>
        <span className="block truncate text-xs text-primary">{title}</span>
        {!compact && <span className="block truncate text-[11px] text-muted">{detail}</span>}
    </span>
)

const Profile = ({ box, rows, logos }: { box: Box; rows: ProfileRow[]; logos: (string | undefined)[] }) => (
    <div
        className="absolute z-10 flex flex-col overflow-hidden rounded-lg border border-primary bg-primary shadow-xl"
        style={boxStyle(box)}
    >
        <span className="mx-auto -mt-px h-2 w-24 rounded-b-md border border-t-0 border-primary bg-accent" />
        <div className="flex items-center gap-3 border-b border-primary px-4 pb-3 pt-2">
            <span className="flex size-10 items-center justify-center rounded-full bg-orange text-sm font-bold text-white">
                JP
            </span>
            <span className="min-w-0 leading-tight">
                <span className="block text-[15px] font-semibold text-primary">Jo Park</span>
                <span className="block truncate text-xs text-muted">jo@acme.com · Acme · Pro plan</span>
            </span>
        </div>
        <ul className="m-0 flex flex-1 list-none flex-col justify-around p-0 px-4 py-2">
            {rows.map(({ count, fact, kind }, row) => (
                <li key={row} className="m-0 flex items-center gap-2.5 text-[13px]">
                    <span className="flex size-5 shrink-0 items-center justify-center">
                        {row === 0 ? (
                            <EventTile kind={kind ?? 'pageview'} className="size-[18px]" />
                        ) : (
                            <SourceLogo logo={logos[row - 1]} className="size-4" />
                        )}
                    </span>
                    <span className="w-20 shrink-0 font-semibold text-primary">{PROFILE_LABELS[row]}</span>
                    <motion.span key={count} {...FACT_ENTER} className="min-w-0 flex-1 truncate text-secondary">
                        {fact || <span className="text-muted">Waiting…</span>}
                    </motion.span>
                    <span className="tabular-nums text-muted">{count}</span>
                </li>
            ))}
        </ul>
    </div>
)

export default function MarbleRun(): JSX.Element {
    const stageRef = useRef<HTMLDivElement>(null)
    const storeRef = useRef<HTMLDivElement>(null)
    const layerRef = useRef<HTMLDivElement>(null)
    const behindLayerRef = useRef<HTMLDivElement>(null)
    const worldRef = useRef<MarbleWorld | null>(null)
    const { width } = useElementSize(stageRef)
    const { height: storeHeight } = useElementSize(storeRef, DEFAULT_STORE_HEIGHT)
    const [captured, setCaptured] = useState(0)
    const [profile, setProfile] = useState(emptyProfile)
    const [worldReady, setWorldReady] = useState(false)
    const inView = useInView(stageRef, { amount: 0.25 })
    const inViewRef = useRef(inView)
    inViewRef.current = inView
    const reduceMotion = useReducedMotion()
    const sourceCount = useSourceCountLabel()
    const logos = useSpotlightLogos()
    const layout = useMemo(() => (width ? runLayout(width, storeHeight) : null), [width, storeHeight])
    const layoutRef = useRef(layout)
    layoutRef.current = layout

    const land = useCallback((payload: Payload) => {
        const target = profileRowFor(payload)
        setProfile((current) =>
            current.map((row, index) => {
                if (index !== target) return row
                if (payload.type === 'event')
                    return {
                        count: row.count + 1,
                        fact: `${EVENT_KINDS[payload.kind].event} just now`,
                        kind: payload.kind,
                    }
                const facts = SPOTLIGHT_SOURCES[payload.source].profileFacts
                return { count: row.count + 1, fact: payload.fact ?? facts[row.count % facts.length] }
            })
        )
    }, [])

    useEffect(() => {
        const layer = layerRef.current
        const behindLayer = behindLayerRef.current
        if (reduceMotion || !inView || !layer || !behindLayer) return
        let world: MarbleWorld | null = null
        let cancelled = false
        import('matter-js').then((module) => {
            if (cancelled) return
            const matter = module.default ?? (module as unknown as typeof module.default)
            world = new MarbleWorld(matter, { layer, behindLayer, onLanded: land })
            worldRef.current = world
            setWorldReady(true)
        })
        return () => {
            cancelled = true
            world?.destroy()
            worldRef.current = null
            setWorldReady(false)
        }
    }, [inView, reduceMotion])

    useEffect(() => {
        if (worldReady && layout) worldRef.current?.setLayout(layout)
    }, [worldReady, layout])

    const dropFrom = useCallback(
        (icon: HTMLElement, payload: Payload) => {
            const world = worldRef.current
            const stage = stageRef.current?.getBoundingClientRect()
            const tile = icon.firstElementChild?.cloneNode(true)
            if (!world || !stage || !(tile instanceof HTMLElement) || !layoutRef.current) {
                land(payload)
                return
            }
            const rect = icon.getBoundingClientRect()
            const at = { x: rect.left + rect.width / 2 - stage.left, y: rect.top + rect.height / 2 - stage.top }
            const towardCenter = at.x < layoutRef.current.width / 2 ? 1 : -1
            world.spawn(payload, tile, at, { x: towardCenter * TOWARD_CENTER_SPEED, y: 0 })
        },
        [land]
    )

    const fire = useCallback(
        (signal: string, payload: Payload) => {
            const icon = stageRef.current?.querySelector<HTMLElement>(`[data-signal="${signal}"]`)
            if (!icon || icon.getAnimations().some(({ playState }) => playState === 'running')) return
            icon.animate([{ opacity: REST_OPACITY }, { opacity: 1 }], {
                duration: ARM_MS,
                easing: 'ease-out',
            }).finished.then(
                () => {
                    dropFrom(icon, payload)
                    icon.animate(
                        [
                            { opacity: 0 },
                            { opacity: 0, offset: GONE_MS / (GONE_MS + REFILL_MS) },
                            { opacity: REST_OPACITY, easing: 'ease-out' },
                        ],
                        { duration: GONE_MS + REFILL_MS }
                    )
                },
                () => undefined
            )
        },
        [dropFrom]
    )

    const emitEvent = useCallback(
        (kind: EventKind) => {
            setCaptured((count) => count + 1)
            fire(`event-${kind}`, { type: 'event', kind })
        },
        [fire]
    )

    const dropSource = useCallback((source: number) => fire(`source-${source}`, { type: 'source', source }), [fire])

    const dropPayment = useCallback(
        ({ amount }: Order) =>
            fire(`source-${STRIPE}`, {
                type: 'source',
                source: STRIPE,
                fact: `Paid ${formatDollars(amount)} for stickers`,
            }),
        [fire]
    )

    useEffect(() => {
        const region = storeRef.current
        if (!region) return
        return captureUserEvents({ region, emit: emitEvent, isActive: () => inViewRef.current })
    }, [emitEvent])

    const sentPageview = useRef(false)
    useEffect(() => {
        if (!inView || sentPageview.current || (!worldReady && !reduceMotion)) return
        sentPageview.current = true
        emitEvent('pageview')
    }, [inView, worldReady, reduceMotion])

    useRandomInterval(() => dropSource(Math.floor(Math.random() * SPOTLIGHT_SOURCES.length)), {
        ...SOURCE_AMBIENT_MS,
        active: inView,
    })

    return (
        <div
            ref={stageRef}
            className="not-prose relative w-full"
            style={{ height: layout?.height ?? DEFAULT_STAGE_HEIGHT }}
        >
            <div
                ref={behindLayerRef}
                className="pointer-events-none absolute inset-0 z-[5]"
                style={layout ? { clipPath: clipAboveAndWithin(layout.profile, layout) } : undefined}
                aria-hidden="true"
            />
            <StoreWindow
                ref={storeRef}
                captured={captured}
                onCheckout={() => emitEvent('pageview')}
                onPaid={dropPayment}
                className="absolute top-0 z-10"
                style={layout ? { left: layout.store.left, width: layout.store.width } : undefined}
            />
            {layout && (
                <>
                    <Track tracks={layout.tracks} />
                    <SectionLabel box={layout.events.label} alignEnd>
                        PostHog events
                    </SectionLabel>
                    {layout.events.rows.map((box, row) => {
                        const kind = EVENT_ORDER[row]
                        return (
                            <div key={kind} className={cn(ROW_CLASS, 'flex-row-reverse')} style={boxStyle(box)}>
                                <SignalIcon signal={`event-${kind}`}>
                                    <EventTile kind={kind} />
                                </SignalIcon>
                                <RowText
                                    title={EVENT_KINDS[kind].event}
                                    detail={EVENT_KINDS[kind].description}
                                    alignEnd
                                    compact={layout.compactRows}
                                />
                            </div>
                        )
                    })}
                    <SectionLabel box={layout.sources.label}>External sources</SectionLabel>
                    {layout.sources.rows.map((box, index) => {
                        const source = SPOTLIGHT_SOURCES[index]
                        return (
                            <button
                                key={source.name}
                                type="button"
                                onClick={() => dropSource(index)}
                                title={`Send a ${source.name} record`}
                                className={ROW_CLASS}
                                style={boxStyle(box)}
                            >
                                <SignalIcon signal={`source-${index}`}>
                                    <SourceTile logo={logos[index]} />
                                </SignalIcon>
                                <RowText title={source.name} detail={source.record} compact={layout.compactRows} />
                            </button>
                        )
                    })}
                    <span className="absolute z-30 flex items-end text-[11px]" style={boxStyle(layout.sources.footer)}>
                        <Link
                            to={SOURCES_DOCS_URL}
                            state={{ newWindow: true }}
                            className="text-muted underline underline-offset-2 hover:text-primary"
                        >
                            {sourceCount} more
                        </Link>
                    </span>
                    <Profile box={layout.profile} rows={profile} logos={logos} />
                </>
            )}
            <div ref={layerRef} className="pointer-events-none absolute inset-0 z-40" aria-hidden="true" />
        </div>
    )
}

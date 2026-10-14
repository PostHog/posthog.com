import React, { useEffect, useMemo, useRef, useSyncExternalStore } from 'react'
import { Logo } from '@posthog/brand/logo'
import StepIntro from '../StepIntro'
import CaptureWindow from './CaptureWindow'
import DataLineProvider from './DataLineProvider'
import { useDataLine } from './context'
import { EVENT_KINDS, SORTING_ORDER } from './eventKinds'
import type { EventKind } from './eventKinds'
import { polylineSegments } from './geometry'
import type { Parts, Point, SegmentSpec } from './geometry'
import { useElementSize, useInView } from '../hooks'
import { useReducedMotion } from './hooks'
import { BEAD_RADIUS } from './physics'
import Rail, { RAIL_THICKNESS } from './Rail'
import ProductChips from '../ProductChips'
import { INGEST_ROUTE } from './routes'

interface Column {
    kind: EventKind
    center: number
    top: number
}

interface Door {
    kind: EventKind
    from: number
    to: number
}

interface MachineGeometry {
    width: number
    rail: { from: number; to: number; y: (x: number) => number }
    railPieces: Point[][]
    doors: Door[]
    endWall: Point[]
    columns: Column[]
    floorY: number
    parts: Parts
}

const PRODUCT_HANDLES = [
    'product_analytics',
    'web_analytics',
    'session_replay',
    'error_tracking',
    'logs',
    'ai_observability',
    'cdp',
]

const BODY_HEIGHT = 250
const INTAKE_Y = 66
const RAIL_DROP = 4
const RAIL_SLOPE = Math.tan((4 * Math.PI) / 180)
const RAIL_END_INSET = 16
const COLUMN_START = 104
const COLUMN_END_INSET = 44
const COLUMN_WIDTH = 24
const TRAPDOOR_LIP = 2
const FLOOR_OFFSET = 52
const END_WALL_HEIGHT = 26
const BEAD_SIZE = BEAD_RADIUS * 2
const DEFAULT_BODY_WIDTH = 520
const REGULAR_LABEL_SPACING = 64
const STAGGER_SPACING = 46
const STAGGER_OFFSET = 11
const ENTRY_VISIBILITY = 0.35
const ENTRY_X = 40
const ENTRY_RISE = 44
const ENTRY_VELOCITY = { x: 1, y: -1.6 }
const MAX_WALL_THICKNESS = 24
const EVENTS_PER_GRID_STEP = 10
const GRID_STEP = (EVENTS_PER_GRID_STEP / 2) * BEAD_RADIUS * 2
const GRID_CLEARANCE = 12
const SORTER_SPEED = 1.4
const SORTER_HEIGHT = 16
const SORTER_SLICES = 12
const SORTER_GRIP = 0.55

function machineGeometry(width: number): MachineGeometry {
    const railStartY = INTAKE_Y + RAIL_DROP
    const railY = (x: number) => railStartY + x * RAIL_SLOPE
    const railEnd = width - RAIL_END_INSET
    const spacing = (width - COLUMN_START - COLUMN_END_INSET) / (SORTING_ORDER.length - 1)
    const floorY = BODY_HEIGHT - FLOOR_OFFSET
    const columns = SORTING_ORDER.map((kind, index) => {
        const center = COLUMN_START + spacing * index
        return { kind, center, top: railY(center) }
    })
    const railPoint = (x: number): Point => ({ x, y: railY(x) })

    const doors = columns.map(({ kind, center }) => ({
        kind,
        from: center - COLUMN_WIDTH / 2 + TRAPDOOR_LIP,
        to: center + COLUMN_WIDTH / 2 - TRAPDOOR_LIP,
    }))
    const railPieces = [0, ...doors.map(({ to }) => to)].map((from, index) => [
        railPoint(from),
        railPoint(doors[index]?.from ?? railEnd),
    ])
    const endWall = [railPoint(railEnd), { x: railEnd, y: railY(railEnd) - END_WALL_HEIGHT }]

    const railSegments: SegmentSpec[] = [
        ...railPieces.flatMap((piece) => polylineSegments(piece, 'down')),
        ...doors.flatMap(({ kind, from, to }) =>
            polylineSegments([railPoint(from), railPoint(to)], 'down', { passes: kind })
        ),
        ...polylineSegments([...endWall].reverse(), 'right'),
    ]

    const wallThickness = Math.min(MAX_WALL_THICKNESS, (spacing - COLUMN_WIDTH) / 2)
    const columnSegments = columns.flatMap(({ center }) => {
        const leftX = center - COLUMN_WIDTH / 2
        const rightX = center + COLUMN_WIDTH / 2
        return [
            ...polylineSegments(
                [
                    { x: leftX, y: railY(leftX) + 1 },
                    { x: leftX, y: floorY },
                ],
                'left',
                { thickness: wallThickness }
            ),
            ...polylineSegments(
                [
                    { x: rightX, y: railY(rightX) + 1 },
                    { x: rightX, y: floorY },
                ],
                'right',
                { thickness: wallThickness }
            ),
        ]
    })
    const floor = polylineSegments(
        [
            { x: columns[0].center - COLUMN_WIDTH, y: floorY },
            { x: columns[columns.length - 1].center + COLUMN_WIDTH, y: floorY },
        ],
        'down',
        { grip: true }
    )

    return {
        width,
        rail: { from: 0, to: railEnd, y: railY },
        railPieces,
        doors,
        endWall,
        columns,
        floorY,
        parts: {
            segments: [...railSegments, ...columnSegments, ...floor],
            zones: [
                {
                    type: 'entry',
                    box: { left: ENTRY_X - 1, top: railStartY - ENTRY_RISE - 1, width: 2, height: 2 },
                    route: INGEST_ROUTE,
                    velocity: ENTRY_VELOCITY,
                },
                ...Array.from({ length: SORTER_SLICES }, (_, slice) => {
                    const left = (railEnd * slice) / SORTER_SLICES
                    const right = (railEnd * (slice + 1)) / SORTER_SLICES
                    return {
                        type: 'conveyor' as const,
                        box: {
                            left,
                            top: railY(left) - SORTER_HEIGHT,
                            width: right - left,
                            height: railY(right) - railY(left) + SORTER_HEIGHT + 2,
                        },
                        speed: SORTER_SPEED,
                        grip: SORTER_GRIP,
                    }
                }),
                ...columns.map(({ kind, center, top }) => {
                    const height = floorY - top - BEAD_SIZE
                    return {
                        type: 'counter' as const,
                        box: { left: center - COLUMN_WIDTH / 2, top: top + BEAD_SIZE, width: COLUMN_WIDTH, height },
                        kind,
                        capacity: Math.max(4, Math.floor(height / BEAD_SIZE) * 2 - 2),
                        isIngestion: true,
                    }
                }),
            ],
        },
    }
}

const COLUMN_CORNER = 4

const columnPath = (left: number, right: number, top: number, bottom: number): string =>
    [
        `M ${left} ${top}`,
        `V ${bottom - COLUMN_CORNER}`,
        `Q ${left} ${bottom} ${left + COLUMN_CORNER} ${bottom}`,
        `H ${right - COLUMN_CORNER}`,
        `Q ${right} ${bottom} ${right} ${bottom - COLUMN_CORNER}`,
        `V ${top}`,
    ].join(' ')

const columnWallsPath = (left: number, right: number, top: number, bottom: number): string =>
    [
        `M ${left} ${top}`,
        `V ${bottom - COLUMN_CORNER}`,
        `Q ${left} ${bottom} ${left + COLUMN_CORNER} ${bottom}`,
        `M ${right - COLUMN_CORNER} ${bottom}`,
        `Q ${right} ${bottom} ${right} ${bottom - COLUMN_CORNER}`,
        `V ${top}`,
    ].join(' ')

function IngestMachine(): JSX.Element {
    const engine = useDataLine()
    const cardRef = useRef<HTMLDivElement>(null)
    const bodyRef = useRef<HTMLDivElement>(null)
    const countRefs = useRef<Partial<Record<EventKind, HTMLSpanElement | null>>>({})
    const size = useElementSize(bodyRef)
    const width = size?.width ?? DEFAULT_BODY_WIDTH
    const geometry = useMemo(() => machineGeometry(width), [width])
    const stats = useSyncExternalStore(engine.subscribeStats, engine.getStats, engine.getStats)
    const inView = useInView(cardRef, ENTRY_VISIBILITY)
    const total = SORTING_ORDER.reduce((sum, kind) => sum + stats.ingested[kind], 0)
    const largest = Math.max(1, ...SORTING_ORDER.map((kind) => stats.ingested[kind]))
    const showBars = useReducedMotion(engine)
    const spacing = (width - COLUMN_START - COLUMN_END_INSET) / (SORTING_ORDER.length - 1)
    const labelSize = spacing < REGULAR_LABEL_SPACING ? 'text-[9px]' : 'text-[10px]'
    const isStaggered = spacing < STAGGER_SPACING

    useEffect(() => {
        const body = bodyRef.current
        return body && size ? engine.registerParts('ingest', body, geometry.parts) : undefined
    }, [engine, size, geometry.parts])

    useEffect(() => engine.setRouteOpen(INGEST_ROUTE, inView), [engine, inView])

    useEffect(
        () =>
            engine.onIngest((kind) => {
                countRefs.current[kind]?.animate(
                    [{ transform: 'translateY(0)' }, { transform: 'translateY(-3px)' }, { transform: 'translateY(0)' }],
                    { duration: 260, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
                )
            }),
        [engine]
    )

    const { rail, railPieces, doors, endWall, columns, floorY } = geometry
    const highestColumnTop = Math.min(...columns.map(({ top }) => top))
    const gridlines = Array.from(
        { length: Math.floor((floorY - highestColumnTop - GRID_CLEARANCE) / GRID_STEP) },
        (_, index) => ({ y: floorY - GRID_STEP * (index + 1), value: EVENTS_PER_GRID_STEP * (index + 1) })
    )
    const lastColumn = columns[columns.length - 1]

    return (
        <div ref={cardRef} className="not-prose relative rounded-md border border-primary bg-primary shadow-2xl">
            <header className="flex items-center gap-2 rounded-t-md border-b border-primary bg-accent px-3 py-1.5 text-sm font-semibold text-primary">
                <Logo.Logomark size={18} className="dark:hidden" />
                <Logo.Logomark size={18} variant="mono" className="hidden dark:block" />
                Ingestion
                <span className="ml-auto font-mono text-[11px] font-normal text-muted">
                    <span className="tabular-nums text-secondary">{total.toLocaleString('en-US')}</span> events by type
                </span>
            </header>
            <div ref={bodyRef} className="relative" style={{ height: BODY_HEIGHT }}>
                <svg className="absolute inset-0 size-full overflow-visible">
                    {gridlines.map(({ y, value }) => (
                        <g key={value}>
                            <line
                                x1={columns[0].center - COLUMN_WIDTH}
                                x2={lastColumn.center + COLUMN_WIDTH}
                                y1={y}
                                y2={y}
                                style={{ stroke: 'rgb(var(--text-secondary) / 0.18)' }}
                                strokeDasharray="2 4"
                            />
                            <text
                                x={columns[0].center - COLUMN_WIDTH - 4}
                                y={y + 3}
                                textAnchor="end"
                                className="fill-current font-mono text-[9px] text-muted"
                            >
                                {value}
                            </text>
                        </g>
                    ))}
                    {columns.map(({ kind, center, top }) => {
                        const left = center - COLUMN_WIDTH / 2
                        const right = center + COLUMN_WIDTH / 2
                        return (
                            <g key={kind}>
                                <path
                                    d={columnPath(left, right, top + 2, floorY)}
                                    style={{ fill: 'rgb(var(--accent) / 0.35)' }}
                                />
                                <path
                                    d={columnWallsPath(left, right, top + 2, floorY)}
                                    fill="none"
                                    style={{ stroke: 'rgb(var(--text-secondary) / 0.3)' }}
                                    strokeWidth={1}
                                />
                                <line
                                    x1={left + COLUMN_CORNER}
                                    x2={right - COLUMN_CORNER}
                                    y1={floorY}
                                    y2={floorY}
                                    style={{ stroke: 'rgb(var(--text-secondary) / 0.3)' }}
                                    strokeWidth={1}
                                />
                            </g>
                        )
                    })}
                    {railPieces.map((piece) => (
                        <Rail key={piece[0].x} points={piece} />
                    ))}
                    <Rail points={endWall} />
                    {doors.map(({ kind, from, to }) => (
                        <line
                            key={kind}
                            x1={from + 2}
                            x2={to - 2}
                            y1={rail.y(from) + RAIL_THICKNESS / 2}
                            y2={rail.y(to) + RAIL_THICKNESS / 2}
                            className={EVENT_KINDS[kind].strokeClassName}
                            strokeWidth={2}
                            strokeDasharray="2 3"
                            strokeLinecap="round"
                        />
                    ))}
                </svg>
                {showBars &&
                    columns.map(({ kind, center, top }) => (
                        <span
                            key={kind}
                            className={`absolute rounded-sm ${EVENT_KINDS[kind].dotClassName}`}
                            style={{
                                left: center - COLUMN_WIDTH / 2 + 3,
                                width: COLUMN_WIDTH - 6,
                                bottom: BODY_HEIGHT - floorY + 2,
                                height: ((floorY - top - BEAD_SIZE) * stats.ingested[kind]) / largest,
                            }}
                        />
                    ))}
                {columns.map(({ kind, center }, index) => (
                    <div
                        key={kind}
                        className="absolute flex -translate-x-1/2 flex-col items-center gap-0.5"
                        style={{ left: center, top: floorY + 8 }}
                    >
                        <span
                            ref={(element) => (countRefs.current[kind] = element)}
                            className="text-xs font-semibold tabular-nums text-primary"
                        >
                            {stats.ingested[kind]}
                        </span>
                        <span
                            className={`whitespace-nowrap font-mono leading-none text-secondary ${labelSize}`}
                            style={{ marginTop: isStaggered && index % 2 === 1 ? STAGGER_OFFSET : 0 }}
                        >
                            {EVENT_KINDS[kind].label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function IngestStation(): JSX.Element {
    return (
        <section id="get-the-data-in" className="relative">
            <DataLineProvider>
                <StepIntro step={1} title="Get the data in">
                    PostHog captures events, session replays, errors, and logs straight from your product, then pulls in
                    business data from tools like Stripe, Postgres, and HubSpot. It all lands in one place, ready to
                    query.
                </StepIntro>
                <div className="mt-8 grid items-start gap-x-16 gap-y-16 @3xl:grid-cols-2">
                    <CaptureWindow />
                    <IngestMachine />
                </div>
                <div className="mt-8 flex flex-col gap-3 @3xl:flex-row @3xl:items-center @3xl:justify-between">
                    <p className="m-0 text-sm text-secondary">
                        Shop for a sticker. Every click, drag, and keystroke is a real event, batched by{' '}
                        <code>posthog.capture()</code> and sorted as it lands.
                    </p>
                    <ProductChips handles={PRODUCT_HANDLES} />
                </div>
            </DataLineProvider>
        </section>
    )
}

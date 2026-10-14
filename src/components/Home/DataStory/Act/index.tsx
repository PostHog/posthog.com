import React, { useEffect, useRef, useState } from 'react'
import { HedgehogCoffeeCup, HedgehogSleepy } from '@posthog/brand/hoggies'
import { usePrefersReducedMotion } from 'components/Code/usePrefersReducedMotion'
import { AXIS_TEXT, SURFACE_RING, Tooltip, linePath } from '../charts'
import type { TooltipState } from '../charts'
import ProductChips from '../ProductChips'
import StepIntro from '../StepIntro'
import { useElementSize, useHasBeenSeen, useInView } from '../hooks'
import { LANES, NIGHT_MINUTES, REPORTS, SCOUT_RUNS, SIGNALS, evidenceFor, formatClock } from './night'
import type { Lane, Signal } from './night'
import '../animations.css'

interface NightClock {
    minute: number
    night: number
    isResetting: boolean
}

interface TimelineGeometry {
    x: (minute: number) => number
    laneY: (lane: Lane) => number
    plotLeft: number
    plotRight: number
    plotTop: number
    plotBottom: number
}

const PRODUCT_HANDLES = ['inbox', 'error_tracking', 'session_replay', 'support', 'data_warehouse']
const SWEEP_MS = 15000
const MORNING_HOLD_MS = 5500
const RESET_FADE_MS = 600
const STEP_MINUTES = 5
const SEEN_VISIBILITY = 0.3
const RUNNING_VISIBILITY = 0.15
const WIDE_LABEL_WIDTH = 84
const NARROW_LABEL_WIDTH = 58
const NARROW_WIDTH = 520
const ROW_HEIGHT = 30
const CURSOR_SPACE = 26
const AXIS_SPACE = 22
const RIGHT_SPACE = 10
const SIGNAL_RADIUS = 4.5
const RUN_RADIUS = 3
const HIT_RADIUS = 10
const HOUR_LABELS = [0, 3, 6, 9, 12, 15]
const DEFAULT_WIDTH = 720
const TIMELINE_HEIGHT = CURSOR_SPACE + LANES.length * ROW_HEIGHT + AXIS_SPACE

const NEUTRAL_DOT = { fill: 'rgb(var(--text-muted))' }
const TRACK = { stroke: 'rgb(var(--border) / 0.7)' }
const CURSOR = { stroke: 'rgb(var(--text-primary))' }
const ELAPSED = { fill: 'rgb(var(--accent) / 0.55)' }
const BADGE_FILL = { fill: 'rgb(var(--bg))' }
const BADGE_RADIUS = 8
const BADGE_OFFSET = { x: 13, y: -12 }

function useNightClock(isRunning: boolean, isStatic: boolean, onFrame: (minute: number) => void): NightClock {
    const elapsedRef = useRef(0)
    const onFrameRef = useRef(onFrame)
    const [clock, setClock] = useState<NightClock>({ minute: 0, night: 0, isResetting: false })
    onFrameRef.current = onFrame

    useEffect(() => {
        if (!isRunning) {
            return
        }
        let last = performance.now()
        let frame = requestAnimationFrame(function tick(now) {
            elapsedRef.current += now - last
            last = now
            const isNewNight = elapsedRef.current > SWEEP_MS + MORNING_HOLD_MS
            if (isNewNight) {
                elapsedRef.current = 0
            }
            const minute = Math.min(NIGHT_MINUTES, (elapsedRef.current / SWEEP_MS) * NIGHT_MINUTES)
            const stepped = Math.floor(minute / STEP_MINUTES) * STEP_MINUTES
            const isResetting = elapsedRef.current > SWEEP_MS + MORNING_HOLD_MS - RESET_FADE_MS
            onFrameRef.current(minute)
            setClock((current) =>
                !isNewNight && current.minute === stepped && current.isResetting === isResetting
                    ? current
                    : { minute: stepped, night: current.night + (isNewNight ? 1 : 0), isResetting }
            )
            frame = requestAnimationFrame(tick)
        })
        return () => cancelAnimationFrame(frame)
    }, [isRunning])

    return isStatic ? { minute: NIGHT_MINUTES, night: 0, isResetting: false } : clock
}

function timelineGeometry(width: number): TimelineGeometry {
    const plotLeft = width < NARROW_WIDTH ? NARROW_LABEL_WIDTH : WIDE_LABEL_WIDTH
    const plotRight = width - RIGHT_SPACE
    const plotTop = CURSOR_SPACE
    const plotBottom = CURSOR_SPACE + LANES.length * ROW_HEIGHT
    return {
        x: (minute) => plotLeft + (minute / NIGHT_MINUTES) * (plotRight - plotLeft),
        laneY: (lane) => plotTop + LANES.findIndex((entry) => entry.lane === lane) * ROW_HEIGHT + ROW_HEIGHT / 2,
        plotLeft,
        plotRight,
        plotTop,
        plotBottom,
    }
}

const signalPoint = (geometry: TimelineGeometry, signal: Signal) => ({
    x: geometry.x(signal.minute),
    y: geometry.laneY(signal.lane),
})

function Timeline({
    width,
    minute,
    isStatic,
    cursorRef,
    elapsedRef,
    labelRef,
}: {
    width: number
    minute: number
    isStatic: boolean
    cursorRef: React.RefObject<SVGGElement>
    elapsedRef: React.RefObject<SVGRectElement>
    labelRef: React.RefObject<HTMLSpanElement>
}): JSX.Element {
    const [tooltip, setTooltip] = useState<TooltipState | null>(null)
    const geometry = timelineGeometry(width)
    const { x, laneY, plotLeft, plotRight, plotTop, plotBottom } = geometry
    const shownSignals = SIGNALS.filter((signal) => signal.minute <= minute)
    const formedReports = REPORTS.map((report, index) => ({ ...report, index })).filter(
        (report) => report.formedAt <= minute
    )

    return (
        <div className="relative" style={{ height: TIMELINE_HEIGHT }} onPointerLeave={() => setTooltip(null)}>
            <svg width={width} height={TIMELINE_HEIGHT} className="absolute inset-0 overflow-visible">
                {!isStatic && (
                    <rect
                        ref={elapsedRef}
                        x={plotLeft}
                        y={plotTop}
                        width={0}
                        height={plotBottom - plotTop}
                        style={ELAPSED}
                    />
                )}
                {LANES.map(({ lane, label }) => (
                    <g key={lane}>
                        <line x1={plotLeft} x2={plotRight} y1={laneY(lane)} y2={laneY(lane)} style={TRACK} />
                        <text
                            x={0}
                            y={laneY(lane) + 4}
                            className="fill-current text-[11px] font-semibold text-secondary"
                        >
                            {label}
                        </text>
                    </g>
                ))}
                {Array.from({ length: NIGHT_MINUTES / 60 + 1 }, (_, hour) => (
                    <line
                        key={hour}
                        x1={x(hour * 60)}
                        x2={x(hour * 60)}
                        y1={plotBottom + 2}
                        y2={plotBottom + (HOUR_LABELS.includes(hour) ? 7 : 5)}
                        style={{ stroke: 'rgb(var(--border))' }}
                    />
                ))}
                {HOUR_LABELS.map((hour) => (
                    <text
                        key={hour}
                        x={x(hour * 60)}
                        y={TIMELINE_HEIGHT - 3}
                        textAnchor={
                            hour === 0 ? 'start' : hour === HOUR_LABELS[HOUR_LABELS.length - 1] ? 'end' : 'middle'
                        }
                        className={AXIS_TEXT}
                    >
                        {formatClock(hour * 60).replace(' ', '')}
                    </text>
                ))}
                {SCOUT_RUNS.map((run) => (
                    <circle
                        key={run}
                        cx={x(run)}
                        cy={laneY('scouts')}
                        r={RUN_RADIUS}
                        fill="none"
                        strokeWidth={1.5}
                        className="transition-[stroke-opacity] duration-300"
                        style={{ stroke: 'rgb(var(--text-muted))', strokeOpacity: run <= minute ? 1 : 0.3 }}
                    />
                ))}
                {formedReports.map((report) => (
                    <path
                        key={report.title}
                        d={linePath(
                            SIGNALS.filter((signal) => signal.report === report.index).map((signal) =>
                                signalPoint(geometry, signal)
                            )
                        )}
                        pathLength={1}
                        fill="none"
                        strokeWidth={1.5}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        className={`data-story-draw ${report.series.stroke}`}
                        style={{ ['--duration' as string]: '700ms' }}
                    />
                ))}
                {shownSignals.map((signal) => {
                    const point = signalPoint(geometry, signal)
                    const report = signal.report === undefined ? undefined : REPORTS[signal.report]
                    const isGrouped = report !== undefined && report.formedAt <= minute
                    return (
                        <g key={`${signal.lane}-${signal.minute}`} className="data-story-pop">
                            <circle
                                cx={point.x}
                                cy={point.y}
                                r={SIGNAL_RADIUS}
                                strokeWidth={2}
                                className={`transition-[fill] duration-500 ${isGrouped ? report.series.fill : ''}`}
                                style={{ ...SURFACE_RING, ...(isGrouped ? {} : NEUTRAL_DOT) }}
                            />
                        </g>
                    )
                })}
                {formedReports.map((report) => {
                    const last = SIGNALS.filter((signal) => signal.report === report.index).pop()
                    const point = last ? signalPoint(geometry, last) : { x: x(report.formedAt), y: plotTop }
                    return (
                        <g key={report.title} className="data-story-pop" style={{ ['--delay' as string]: '500ms' }}>
                            <circle
                                cx={point.x + BADGE_OFFSET.x}
                                cy={point.y + BADGE_OFFSET.y}
                                r={BADGE_RADIUS}
                                className={report.series.stroke}
                                style={BADGE_FILL}
                                strokeWidth={2}
                            />
                            <text
                                x={point.x + BADGE_OFFSET.x}
                                y={point.y + BADGE_OFFSET.y + 3.5}
                                textAnchor="middle"
                                className="fill-current text-[10px] font-bold text-primary"
                            >
                                {report.index + 1}
                            </text>
                        </g>
                    )
                })}
                {!isStatic && (
                    <g ref={cursorRef} transform={`translate(${plotLeft},0)`}>
                        <line x1={0} x2={0} y1={plotTop - 4} y2={plotBottom + 2} style={CURSOR} strokeWidth={1.5} />
                        <circle cx={0} cy={plotTop - 4} r={3} style={{ fill: 'rgb(var(--text-primary))' }} />
                    </g>
                )}
                {shownSignals.map((signal) => {
                    const point = signalPoint(geometry, signal)
                    const report = signal.report === undefined ? undefined : REPORTS[signal.report]
                    return (
                        <circle
                            key={`hit-${signal.lane}-${signal.minute}`}
                            cx={point.x}
                            cy={point.y}
                            r={HIT_RADIUS}
                            fill="transparent"
                            onPointerEnter={() =>
                                setTooltip({
                                    x: point.x,
                                    y: point.y - SIGNAL_RADIUS,
                                    title: signal.label,
                                    rows: [
                                        { label: 'Seen at', value: formatClock(signal.minute) },
                                        {
                                            label: 'Report',
                                            value:
                                                report && report.formedAt <= minute
                                                    ? `#${(signal.report ?? 0) + 1}`
                                                    : 'not grouped yet',
                                        },
                                    ],
                                })
                            }
                        />
                    )
                })}
            </svg>
            {!isStatic && (
                <span
                    ref={labelRef}
                    className="pointer-events-none absolute left-0 top-0 -translate-x-1/2 whitespace-nowrap rounded-full bg-[rgb(var(--text-primary))] px-1.5 font-mono text-[10px] font-semibold leading-4 text-[rgb(var(--bg))]"
                    style={{ transform: `translateX(${plotLeft}px)` }}
                >
                    {formatClock(minute)}
                </span>
            )}
            <Tooltip state={tooltip} width={width} />
        </div>
    )
}

function ReportCard({ index, isFormed }: { index: number; isFormed: boolean }): JSX.Element {
    const report = REPORTS[index]
    return (
        <div className="relative h-40">
            <div
                className={`absolute inset-0 rounded-md border border-dashed border-primary transition-opacity duration-500 ${
                    isFormed ? 'opacity-0' : 'opacity-100'
                }`}
            >
                <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] text-muted">
                    Report {index + 1} · waiting for signals
                </span>
            </div>
            {isFormed && (
                <article className="data-story-pop absolute inset-0 flex flex-col gap-2 overflow-hidden rounded-md border border-primary bg-primary p-4 shadow-sm">
                    <span className="flex items-center gap-1.5 font-mono text-[10px] leading-4 text-muted">
                        <span className={`size-2 rounded-full ${report.series.swatch}`} />
                        Report {index + 1} · grouped at {formatClock(report.formedAt)}
                    </span>
                    <h3 className="m-0 text-sm font-semibold leading-snug text-primary">{report.title}</h3>
                    <p className="m-0 text-xs text-secondary">{evidenceFor(index)}</p>
                    <p className="m-0 mt-auto text-xs font-semibold text-primary">{report.impact}</p>
                </article>
            )}
        </div>
    )
}

export default function ActStep(): JSX.Element {
    const panelRef = useRef<HTMLDivElement>(null)
    const plotRef = useRef<HTMLDivElement>(null)
    const cursorRef = useRef<SVGGElement>(null)
    const elapsedRef = useRef<SVGRectElement>(null)
    const labelRef = useRef<HTMLSpanElement>(null)
    const size = useElementSize(plotRef)
    const width = size?.width ?? DEFAULT_WIDTH
    const isStatic = usePrefersReducedMotion()
    const hasBeenSeen = useHasBeenSeen(panelRef, SEEN_VISIBILITY)
    const inView = useInView(panelRef, RUNNING_VISIBILITY)
    const [isHovered, setIsHovered] = useState(false)
    const isRunning = hasBeenSeen && inView && !isHovered && !isStatic
    const { minute, night, isResetting } = useNightClock(isRunning, isStatic, (current) => {
        const { x, plotLeft } = timelineGeometry(width)
        cursorRef.current?.setAttribute('transform', `translate(${x(current)},0)`)
        elapsedRef.current?.setAttribute('width', String(Math.max(0, x(current) - plotLeft)))
        if (labelRef.current) {
            labelRef.current.style.transform = `translateX(${x(current)}px)`
        }
    })
    const isMorning = minute >= NIGHT_MINUTES
    const runsDone = SCOUT_RUNS.filter((run) => run <= minute).length
    const findings = SIGNALS.filter((signal) => signal.lane === 'scouts' && signal.minute <= minute).length
    const signalCount = SIGNALS.filter((signal) => signal.minute <= minute).length
    const reportCount = REPORTS.filter((report) => report.formedAt <= minute).length
    const fadeStyle = { opacity: isResetting ? 0 : 1, transition: `opacity ${RESET_FADE_MS}ms ease-out` }

    return (
        <section id="act-on-the-data" className="relative">
            <StepIntro step={3} title="Give the data to your agent to act on">
                Overnight, signal sources watch your errors, replays, and support tickets, and scouts check your data on
                a schedule. Most scout runs find nothing, by design. When related signals line up, PostHog groups them
                into one report with the evidence attached, ready for you or your coding agent.
            </StepIntro>
            <div className="not-prose mt-8 @container">
                <div
                    ref={panelRef}
                    className="rounded-md border border-primary bg-primary p-4 @2xl:p-5"
                    onPointerEnter={() => setIsHovered(true)}
                    onPointerLeave={() => setIsHovered(false)}
                >
                    <header className="flex items-end justify-between gap-4">
                        <div className="flex items-end gap-2">
                            <HedgehogSleepy className="size-14 shrink-0 @2xl:size-20" />
                            <div className="pb-1">
                                <p className="m-0 text-sm font-semibold text-primary">6 pm</p>
                                <p className="m-0 text-xs text-secondary">You log off</p>
                            </div>
                        </div>
                        <div className="flex items-end gap-2 text-right">
                            <div className="pb-1">
                                <p className="m-0 text-sm font-semibold text-primary">9 am</p>
                                <p className="m-0 grid text-xs text-secondary">
                                    <span className={`[grid-area:1/1] ${isMorning ? 'invisible' : ''}`}>
                                        You&apos;re back
                                    </span>
                                    <span className={`[grid-area:1/1] ${isMorning ? '' : 'invisible'}`}>
                                        {REPORTS.length} reports waiting
                                    </span>
                                </p>
                            </div>
                            <HedgehogCoffeeCup
                                className="size-14 shrink-0 transition-[opacity,transform] duration-500 @2xl:size-20"
                                style={{
                                    opacity: isMorning ? 1 : 0.25,
                                    transform: isMorning ? 'none' : 'translateY(6px)',
                                }}
                            />
                        </div>
                    </header>
                    <div ref={plotRef} className="mt-4" style={fadeStyle}>
                        <Timeline
                            key={night}
                            width={width}
                            minute={minute}
                            isStatic={isStatic}
                            cursorRef={cursorRef}
                            elapsedRef={elapsedRef}
                            labelRef={labelRef}
                        />
                    </div>
                    <footer className="mt-4 flex flex-wrap gap-x-5 gap-y-1 border-t border-primary pt-3 font-mono text-[11px] text-muted">
                        <span>
                            scout runs{' '}
                            <span className="inline-block min-w-[2ch] tabular-nums text-primary">{runsDone}</span>
                        </span>
                        <span>
                            found nothing{' '}
                            <span className="inline-block min-w-[2ch] tabular-nums text-primary">
                                {runsDone - findings}
                            </span>
                        </span>
                        <span>
                            signals{' '}
                            <span className="inline-block min-w-[2ch] tabular-nums text-primary">{signalCount}</span>
                        </span>
                        <span>
                            reports{' '}
                            <span className="inline-block min-w-[2ch] tabular-nums text-primary">{reportCount}</span>
                        </span>
                    </footer>
                </div>
                <div className="mt-4 grid gap-4 @3xl:grid-cols-3" style={fadeStyle}>
                    {REPORTS.map((report, index) => (
                        <ReportCard
                            key={`${night}-${report.title}`}
                            index={index}
                            isFormed={report.formedAt <= minute}
                        />
                    ))}
                </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 @3xl:flex-row @3xl:items-center @3xl:justify-between">
                <p className="m-0 text-sm text-secondary">
                    A demo night. Gray dots are signals that never lined up with anything else.
                </p>
                <ProductChips handles={PRODUCT_HANDLES} />
            </div>
        </section>
    )
}

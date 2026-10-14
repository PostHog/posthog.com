import React, { useEffect, useRef, useState } from 'react'
import { HedgehogLoops } from '@posthog/brand/hoggies'
import { usePrefersReducedMotion } from 'components/Code/usePrefersReducedMotion'
import { SURFACE_RING } from '../charts'
import ProductChips from '../ProductChips'
import StepIntro from '../StepIntro'
import { useElementSize, useHasBeenSeen, useInView } from '../hooks'
import {
    FINAL_ANGLE,
    LAPS,
    STAGES,
    STAGE_SPACING,
    START_ANGLE,
    TIME_TO_FIX,
    angleAt,
    lapsDone,
    nodesPassed,
    passesOf,
    valueAt,
} from './loop'
import PullRequestWall, { WALL_SIZE, useMergedPullRequests } from './PullRequestWall'
import '../animations.css'

interface SpinClock {
    passed: number
    cycle: number
    isResetting: boolean
}

const PRODUCT_HANDLES = ['inbox', 'posthog_desktop', 'feature_flags', 'experiments', 'mcp_analytics']
const HOLD_SECONDS = 3.5
const RESET_FADE_SECONDS = 0.6
const SEEN_VISIBILITY = 0.3
const RUNNING_VISIBILITY = 0.15
const MAX_WHEEL_SIZE = 400
const DEFAULT_WHEEL_SIZE = 360
const NARROW_WHEEL_SIZE = 340
const WIDE_NODE_RADIUS = 34
const NARROW_NODE_RADIUS = 27
const COMET_RADIUS = 6
const COMET_HALO_RADIUS = 13
const LAP_RING_START = 16
const LAP_RING_GAP = 7
const CENTER_CLEARANCE = 78
const CHEVRON = 'M-3,-4L2,0L-3,4'
const PULSE_MS = 520

const TRACK = { stroke: 'rgb(var(--border))' }
const CHEVRON_STYLE = { stroke: 'rgb(var(--text-muted))' }

const toRadians = (degrees: number): number => (degrees * Math.PI) / 180

const SECONDS_TO_FINAL = (() => {
    let low = 0
    let high = 120
    while (high - low > 0.01) {
        const middle = (low + high) / 2
        if (angleAt(middle) < FINAL_ANGLE) {
            low = middle
        } else {
            high = middle
        }
    }
    return high
})()

function useSpinClock(isRunning: boolean, isStatic: boolean, onFrame: (angle: number) => void): SpinClock {
    const elapsedRef = useRef(0)
    const onFrameRef = useRef(onFrame)
    const [clock, setClock] = useState<SpinClock>({ passed: 0, cycle: 0, isResetting: false })
    onFrameRef.current = onFrame

    useEffect(() => {
        if (!isRunning) {
            return
        }
        let last = performance.now()
        let frame = requestAnimationFrame(function tick(now) {
            elapsedRef.current += (now - last) / 1000
            last = now
            const isNewCycle = elapsedRef.current > SECONDS_TO_FINAL + HOLD_SECONDS
            if (isNewCycle) {
                elapsedRef.current = 0
            }
            const angle = Math.min(FINAL_ANGLE, angleAt(elapsedRef.current))
            const passed = nodesPassed(angle)
            const isResetting = elapsedRef.current > SECONDS_TO_FINAL + HOLD_SECONDS - RESET_FADE_SECONDS
            onFrameRef.current(angle)
            setClock((current) =>
                !isNewCycle && current.passed === passed && current.isResetting === isResetting
                    ? current
                    : { passed, cycle: current.cycle + (isNewCycle ? 1 : 0), isResetting }
            )
            frame = requestAnimationFrame(tick)
        })
        return () => cancelAnimationFrame(frame)
    }, [isRunning])

    return isStatic ? { passed: nodesPassed(FINAL_ANGLE), cycle: 0, isResetting: false } : clock
}

function wheelGeometry(size: number) {
    const nodeRadius = size < NARROW_WHEEL_SIZE ? NARROW_NODE_RADIUS : WIDE_NODE_RADIUS
    const center = size / 2
    const radius = center - nodeRadius - 2
    const pointAt = (angle: number, offset = 0) => ({
        x: center + (radius + offset) * Math.cos(toRadians(angle - 90)),
        y: center + (radius + offset) * Math.sin(toRadians(angle - 90)),
    })
    return { nodeRadius, center, radius, pointAt, circumference: 2 * Math.PI * radius }
}

function StageNode({
    index,
    passes,
    x,
    y,
    radius,
    isStatic,
}: {
    index: number
    passes: number
    x: number
    y: number
    radius: number
    isStatic: boolean
}): JSX.Element {
    const nodeRef = useRef<HTMLDivElement>(null)
    const { Crest, name } = STAGES[index]

    useEffect(() => {
        if (passes > 0 && !isStatic) {
            nodeRef.current?.animate(
                [{ transform: 'scale(1)' }, { transform: 'scale(1.14)' }, { transform: 'scale(1)' }],
                { duration: PULSE_MS, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
            )
        }
    }, [passes, isStatic])

    return (
        <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: x, top: y, width: radius * 2, height: radius * 2 }}
        >
            <div
                ref={nodeRef}
                className="flex size-full items-center justify-center rounded-full border border-primary bg-primary shadow-sm"
            >
                <Crest size={radius * 1.55} title={name} />
            </div>
            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full border border-primary bg-accent text-[10px] font-bold text-primary">
                {index + 1}
            </span>
        </div>
    )
}

function Flywheel({
    size,
    passed,
    cometRef,
    progressRef,
    isStatic,
}: {
    size: number
    passed: number
    cometRef: React.RefObject<SVGGElement>
    progressRef: React.RefObject<SVGCircleElement>
    isStatic: boolean
}): JSX.Element {
    const { nodeRadius, center, radius, pointAt, circumference } = wheelGeometry(size)
    const laps = lapsDone(passed)
    const ringCount = Math.max(0, Math.floor((radius - LAP_RING_START - CENTER_CLEARANCE) / LAP_RING_GAP) + 1)
    const start = pointAt(isStatic ? FINAL_ANGLE : START_ANGLE)

    return (
        <div className="relative mx-auto" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="absolute inset-0 overflow-visible">
                {Array.from({ length: Math.min(laps, ringCount) }, (_, ring) => (
                    <circle
                        key={ring}
                        cx={center}
                        cy={center}
                        r={radius - LAP_RING_START - ring * LAP_RING_GAP}
                        fill="none"
                        strokeWidth={1.5}
                        className="data-story-fade stroke-red"
                        style={{ strokeOpacity: 0.12 + ring * 0.04 }}
                    />
                ))}
                <circle cx={center} cy={center} r={radius} fill="none" strokeWidth={2} style={TRACK} />
                <circle
                    ref={progressRef}
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    strokeWidth={3}
                    strokeLinecap="round"
                    className="stroke-red"
                    strokeDasharray={`${isStatic ? circumference : 0} ${circumference}`}
                    transform={`rotate(-90 ${center} ${center})`}
                />
                {STAGES.map((_, index) => {
                    const angle = index * STAGE_SPACING + STAGE_SPACING / 2
                    const { x, y } = pointAt(angle)
                    return (
                        <path
                            key={angle}
                            d={CHEVRON}
                            fill="none"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={CHEVRON_STYLE}
                            transform={`translate(${x} ${y}) rotate(${angle})`}
                        />
                    )
                })}
                <g ref={cometRef} transform={`translate(${start.x} ${start.y})`}>
                    <circle r={COMET_HALO_RADIUS} className="fill-red/15" />
                    <circle r={COMET_RADIUS} className="fill-red" style={SURFACE_RING} strokeWidth={2} />
                </g>
            </svg>
            {STAGES.map((stage, index) => {
                const { x, y } = pointAt(index * STAGE_SPACING)
                return (
                    <StageNode
                        key={stage.name}
                        index={index}
                        passes={passesOf(index, passed)}
                        x={x}
                        y={y}
                        radius={nodeRadius}
                        isStatic={isStatic}
                    />
                )
            })}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-mono text-[11px] text-muted">lap {laps + 1}</span>
                <span
                    key={laps}
                    className="data-story-pop mt-1 text-3xl font-bold leading-none tabular-nums text-primary"
                >
                    {valueAt(TIME_TO_FIX, laps)}
                </span>
                <span className="mt-1 text-xs text-secondary">median time to fix</span>
            </div>
        </div>
    )
}

function StageLedger({ passed }: { passed: number }): JSX.Element {
    const current = passed === 0 ? -1 : (passed - 1) % STAGES.length
    return (
        <ol className="m-0 list-none p-0">
            {STAGES.map((stage, index) => {
                const passes = passesOf(index, passed)
                const { Crest } = stage
                return (
                    <li
                        key={stage.name}
                        className={`m-0 flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors duration-300 ${
                            index === current ? 'bg-accent' : ''
                        }`}
                    >
                        <Crest.Mini size={30} className="shrink-0" />
                        <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold leading-tight text-primary">
                                {index + 1}. {stage.name}
                            </span>
                            <span className="block text-xs text-secondary">{stage.metric}</span>
                        </span>
                        <span key={passes} className="data-story-pop text-lg font-bold tabular-nums text-primary">
                            {valueAt(stage.values, passes)}
                        </span>
                    </li>
                )
            })}
        </ol>
    )
}

export default function SelfDriveStep(): JSX.Element {
    const stageRef = useRef<HTMLDivElement>(null)
    const wheelRef = useRef<HTMLDivElement>(null)
    const cometRef = useRef<SVGGElement>(null)
    const progressRef = useRef<SVGCircleElement>(null)
    const wheelBox = useElementSize(wheelRef)
    const wheelSize = Math.min(MAX_WHEEL_SIZE, wheelBox?.width ?? DEFAULT_WHEEL_SIZE)
    const pullRequests = useMergedPullRequests()
    const isStatic = usePrefersReducedMotion()
    const hasBeenSeen = useHasBeenSeen(stageRef, SEEN_VISIBILITY)
    const inView = useInView(stageRef, RUNNING_VISIBILITY)
    const [isHovered, setIsHovered] = useState(false)
    const isRunning = hasBeenSeen && inView && !isHovered && !isStatic
    const { passed, cycle, isResetting } = useSpinClock(isRunning, isStatic, (angle) => {
        const { pointAt, circumference } = wheelGeometry(wheelSize)
        const { x, y } = pointAt(angle)
        const lapFraction = angle >= FINAL_ANGLE ? 1 : Math.max(0, angle % 360) / 360
        cometRef.current?.setAttribute('transform', `translate(${x} ${y})`)
        progressRef.current?.setAttribute('stroke-dasharray', `${lapFraction * circumference} ${circumference}`)
    })
    const fixesThisCycle = passesOf(STAGES.length - 1, passed)
    const hiddenNewer = Math.max(0, Math.min(LAPS, pullRequests.length - WALL_SIZE) - fixesThisCycle)
    const fadeStyle = { opacity: isResetting ? 0 : 1, transition: `opacity ${RESET_FADE_SECONDS}s ease-out` }

    return (
        <section id="self-drive" className="relative">
            <StepIntro step={4} title="Let PostHog self-drive">
                Hand a report to PostHog and its coding agent investigates, writes the fix, and opens a pull request.
                You review it and merge it, so nothing ships on its own. Each fix changes your product, which changes
                your data, which sharpens the next answer. With all four steps running, every lap makes the next one
                faster.
            </StepIntro>
            <div
                ref={stageRef}
                className="not-prose mt-8 @container"
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
            >
                <div className="grid items-center gap-8 @3xl:grid-cols-[minmax(0,400px)_minmax(0,1fr)] @3xl:gap-12">
                    <div ref={wheelRef} className="w-full" style={fadeStyle}>
                        <Flywheel
                            key={cycle}
                            size={wheelSize}
                            passed={passed}
                            cometRef={cometRef}
                            progressRef={progressRef}
                            isStatic={isStatic}
                        />
                    </div>
                    <div style={fadeStyle}>
                        <div className="mb-2 flex items-end justify-between gap-4 px-3">
                            <p className="m-0 max-w-xs text-sm text-secondary">
                                Every lap feeds the next. Better data, sharper answers, better reports, more fixes.
                            </p>
                            <HedgehogLoops className="hidden size-20 shrink-0 @md:block" />
                        </div>
                        <StageLedger passed={passed} />
                    </div>
                </div>
                <div className="mt-12">
                    <PullRequestWall pullRequests={pullRequests} hiddenNewer={isStatic ? 0 : hiddenNewer} />
                </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 @3xl:flex-row @3xl:items-center @3xl:justify-between">
                <p className="m-0 text-sm text-secondary">
                    The loop numbers are a demo. The pull requests are real, opened by our own agent from our own inbox
                    and merged by a person.
                </p>
                <ProductChips handles={PRODUCT_HANDLES} />
            </div>
        </section>
    )
}

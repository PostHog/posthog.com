import React, { useMemo, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '../../../../utils'
import { IOS_SPRING } from '../Ingest/session'
import { transform, useEventClock } from '../timeline'
import { PostHogMark } from '../Query/AgentWindow'
import {
    HANDOFF_AT,
    HandoffAgent,
    NIGHT_ENDS_AT,
    NIGHT_HOURS,
    OTHER_REPORTS,
    PRESS_AT,
    PressCursor,
    REPORT,
    REPORT_AT,
    REPORT_BOUNDARIES,
    REPORT_LOOP_MS,
    REPORT_RESTING_MOMENT,
} from './report'

const NOTIFICATION_ENTER = {
    initial: { opacity: 0, transform: transform({ y: -16, scale: 0.96 }) },
    animate: { opacity: 1, transform: transform() },
    transition: IOS_SPRING,
}

const DAWN_KEYFRAMES: Keyframe[] = [
    { opacity: 0, offset: 0 },
    { opacity: 1, offset: NIGHT_ENDS_AT / REPORT_LOOP_MS },
    { opacity: 1, offset: 1 },
]

const MINUTE_TENS = [0, 1, 2, 3, 4, 5, 0]
const MINUTE_ONES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
const MINUTE_TENS_PER_HOUR = 6
const HOUR_ROLL_MS = 260
const nightHoursElapsed = NIGHT_HOURS.length - 1
const hourStartsAt = (hour: number): number => (hour / nightHoursElapsed) * NIGHT_ENDS_AT
const loopOffset = (at: number): number => at / REPORT_LOOP_MS
const stripPosition = (index: number, count: number): string => `translateY(${(-index / count) * 100}%)`

const collapseRepeats = (digits: number[]): number[] =>
    digits.filter((digit, index) => index === 0 || digit !== digits[index - 1])

const rollingKeyframes = (hourlyDigits: number[]): Keyframe[] => {
    const strip = collapseRepeats(hourlyDigits)
    let position = 0
    return [
        { offset: 0, transform: stripPosition(0, strip.length) },
        ...hourlyDigits.slice(1).flatMap((digit, index): Keyframe[] => {
            if (digit === hourlyDigits[index]) return []
            const rollsAt = hourStartsAt(index + 1)
            position += 1
            return [
                {
                    offset: loopOffset(rollsAt),
                    transform: stripPosition(position - 1, strip.length),
                    easing: 'ease-in-out',
                },
                { offset: loopOffset(rollsAt + HOUR_ROLL_MS), transform: stripPosition(position, strip.length) },
            ]
        }),
        { offset: 1, transform: stripPosition(strip.length - 1, strip.length) },
    ]
}

const HOUR_TENS = NIGHT_HOURS.map((hour) => Math.floor(hour / 10))
const HOUR_ONES = NIGHT_HOURS.map((hour) => hour % 10)
const HOUR_TENS_KEYFRAMES = rollingKeyframes(HOUR_TENS)
const HOUR_ONES_KEYFRAMES = rollingKeyframes(HOUR_ONES)

const spinningKeyframes = (digits: number[], cycles: number): Keyframe[] => {
    const cycleMs = NIGHT_ENDS_AT / cycles
    return [
        ...Array.from({ length: cycles }, (_, cycle): Keyframe[] => [
            { offset: loopOffset(cycle * cycleMs), transform: stripPosition(0, digits.length) },
            {
                offset: loopOffset((cycle + 1) * cycleMs),
                transform: stripPosition(digits.length - 1, digits.length),
            },
        ]).flat(),
        { offset: loopOffset(NIGHT_ENDS_AT), transform: stripPosition(0, digits.length) },
        { offset: 1, transform: stripPosition(0, digits.length) },
    ]
}

const MINUTE_TENS_KEYFRAMES = spinningKeyframes(MINUTE_TENS, nightHoursElapsed)
const MINUTE_ONES_KEYFRAMES = spinningKeyframes(MINUTE_ONES, nightHoursElapsed * MINUTE_TENS_PER_HOUR)

const RollingDigits = ({
    items,
    stripRef,
    className,
}: {
    items: number[]
    stripRef: React.RefObject<HTMLSpanElement>
    className?: string
}) => (
    <span
        className={cn(
            'inline-block h-[1lh] overflow-hidden [mask-image:linear-gradient(transparent,black_18%,black_82%,transparent)]',
            className
        )}
    >
        <span ref={stripRef} className="flex flex-col">
            {items.map((item, index) => (
                <span key={index}>{item}</span>
            ))}
        </span>
    </span>
)

const RollingClock = ({
    hourTensRef,
    hourOnesRef,
    minuteTensRef,
    minuteOnesRef,
}: {
    hourTensRef: React.RefObject<HTMLSpanElement>
    hourOnesRef: React.RefObject<HTMLSpanElement>
    minuteTensRef: React.RefObject<HTMLSpanElement>
    minuteOnesRef: React.RefObject<HTMLSpanElement>
}) => (
    <p className="m-0 flex text-5xl font-bold tabular-nums leading-tight text-white">
        <RollingDigits items={collapseRepeats(HOUR_TENS)} stripRef={hourTensRef} />
        <RollingDigits items={collapseRepeats(HOUR_ONES)} stripRef={hourOnesRef} />
        <span>:</span>
        <RollingDigits items={MINUTE_TENS} stripRef={minuteTensRef} />
        <RollingDigits items={MINUTE_ONES} stripRef={minuteOnesRef} />
    </p>
)

const NightSky = ({ dawnRef }: { dawnRef: React.RefObject<HTMLDivElement> }) => (
    <>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0B1020,#1E2747)]" />
        <div
            ref={dawnRef}
            className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_64%,rgba(255,176,102,0.4),transparent_70%),linear-gradient(180deg,#36487C_0%,#8D76A8_38%,#E8957C_62%,#F6B47E_84%)] opacity-0"
        />
    </>
)

const Notification = ({ scout, title }: { scout: string; title: string }) => (
    <div className="rounded-xl bg-light/95 px-3 py-2 text-primary shadow-lg dark:bg-dark/95">
        <p className="m-0 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-secondary">
            <PostHogMark className="h-2.5" />
            Inbox · {scout}
            <span className="ml-auto normal-case tracking-normal">now</span>
        </p>
        <p className="m-0 mt-0.5 text-xs font-semibold leading-snug">{title}</p>
    </div>
)

interface NightRefs {
    dawnRef: React.RefObject<HTMLDivElement>
    hourTensRef: React.RefObject<HTMLSpanElement>
    hourOnesRef: React.RefObject<HTMLSpanElement>
    minuteTensRef: React.RefObject<HTMLSpanElement>
    minuteOnesRef: React.RefObject<HTMLSpanElement>
}

const MorningStack = ({ elapsed, nightRefs }: { elapsed: number; nightRefs: NightRefs }) => (
    <div className="relative">
        <div className="relative h-[28rem] overflow-hidden rounded-xl [mask-image:linear-gradient(black_15%,rgba(0,0,0,0.85)_38%,rgba(0,0,0,0.55)_58%,rgba(0,0,0,0.25)_76%,rgba(0,0,0,0.08)_88%,transparent_97%)]">
            <NightSky dawnRef={nightRefs.dawnRef} />
            <div className="relative flex h-full flex-col items-center px-4 pt-6">
                <p className="m-0 text-xs font-semibold text-white/70">Tuesday</p>
                <RollingClock
                    hourTensRef={nightRefs.hourTensRef}
                    hourOnesRef={nightRefs.hourOnesRef}
                    minuteTensRef={nightRefs.minuteTensRef}
                    minuteOnesRef={nightRefs.minuteOnesRef}
                />
                <div className="mt-5 flex w-full max-w-sm flex-col gap-2">
                    <AnimatePresence initial={false}>
                        {elapsed >= REPORT_AT && (
                            <motion.div key={REPORT.title} layout {...NOTIFICATION_ENTER} className="relative z-10">
                                <PressCursor elapsed={elapsed} pressAt={PRESS_AT}>
                                    <Notification scout={REPORT.scout} title={REPORT.title} />
                                </PressCursor>
                            </motion.div>
                        )}
                        {OTHER_REPORTS.filter(({ at }) => elapsed >= at)
                            .reverse()
                            .map(({ scout, title }) => (
                                <motion.div key={title} layout {...NOTIFICATION_ENTER}>
                                    <Notification scout={scout} title={title} />
                                </motion.div>
                            ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
        <AnimatePresence>
            {elapsed >= HANDOFF_AT && (
                <motion.div
                    key="desktop"
                    initial={{ opacity: 0, transform: transform({ y: 40, scale: 0.94 }) }}
                    animate={{ opacity: 1, transform: transform() }}
                    exit={{ opacity: 0, transform: transform({ y: 20 }) }}
                    transition={IOS_SPRING}
                    className="absolute -right-6 top-28 w-[78%]"
                >
                    <HandoffAgent elapsed={elapsed} className="!h-[20rem]" />
                </motion.div>
            )}
        </AnimatePresence>
    </div>
)

export default function ActStep({
    index,
    title,
    description,
}: {
    index: number
    title: string
    description: React.ReactNode
}): JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null)
    const dawnRef = useRef<HTMLDivElement>(null)
    const hourTensRef = useRef<HTMLSpanElement>(null)
    const hourOnesRef = useRef<HTMLSpanElement>(null)
    const minuteTensRef = useRef<HTMLSpanElement>(null)
    const minuteOnesRef = useRef<HTMLSpanElement>(null)
    const nightRefs = useMemo(() => ({ dawnRef, hourTensRef, hourOnesRef, minuteTensRef, minuteOnesRef }), [])
    const loopAnimations = useMemo(
        () => [
            { ref: dawnRef, keyframes: DAWN_KEYFRAMES },
            { ref: hourTensRef, keyframes: HOUR_TENS_KEYFRAMES },
            { ref: hourOnesRef, keyframes: HOUR_ONES_KEYFRAMES },
            { ref: minuteTensRef, keyframes: MINUTE_TENS_KEYFRAMES },
            { ref: minuteOnesRef, keyframes: MINUTE_ONES_KEYFRAMES },
        ],
        []
    )
    const elapsed = useEventClock(containerRef, {
        loopMs: REPORT_LOOP_MS,
        boundaries: REPORT_BOUNDARIES,
        restingMs: REPORT_RESTING_MOMENT,
        loopAnimations,
    })

    return (
        <div className="@container mt-16">
            <div
                ref={containerRef}
                className="relative mx-auto grid max-w-[58rem] gap-6 @3xl:grid-cols-12 @3xl:items-center @3xl:gap-x-8"
            >
                <div className="@3xl:order-last @3xl:col-span-5">
                    <h3 className="!mt-0">
                        {index + 1}. {title}
                    </h3>
                    <p>{description}</p>
                </div>
                <div className="not-prose @container @3xl:col-span-7" aria-hidden="true">
                    <MorningStack elapsed={elapsed} nightRefs={nightRefs} />
                </div>
            </div>
        </div>
    )
}

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { SectionComponentProps } from '../types'
import { SECTION_H2 } from '../helpers'

interface Stage {
    key: string
    label: string
    detail: string
    Icon: React.ComponentType<{ className?: string }>
    /** Tailwind classes for the icon tile, e.g. `bg-orange/15 text-orange border-orange`. */
    tile: string
    youAreHere?: boolean
}

// Every stage row is the same height, so each icon's center is at a known offset.
const ROW_PX = 48
const GAP_PX = 16
const ICON_CENTER_PX = 22
const centerOf = (index: number) => index * (ROW_PX + GAP_PX) + ICON_CENTER_PX

const LOOP_SECONDS = 9
// Share of the loop spent at each point: arrive at the stop, pulse twice, then leave for the end and fade.
const TIMES = [0, 0.05, 0.35, 0.45, 0.55, 0.65, 0.88, 1]
const PULSE = '0 0 0 6px rgba(47, 128, 250, 0.35)'
const NO_PULSE = '0 0 0 0px rgba(47, 128, 250, 0)'

/**
 * The example event, in a lane to the left of the stage icons. It travels down
 * to the stage marked "You are here", pulses there while it's queried, then
 * carries on to the last stage and fades out. In narrow windows it's a dot.
 * Decorative, so hidden from screen readers.
 */
const MovingEvent = ({ event, stageCount, stopIndex }: { event: string; stageCount: number; stopIndex: number }) => {
    const reduceMotion = useReducedMotion()
    if (reduceMotion) return null
    const start = centerOf(0)
    const stop = centerOf(stopIndex)
    const end = centerOf(stageCount - 1)

    return (
        <motion.span
            aria-hidden
            className="absolute left-6 z-10 min-h-3 min-w-3 whitespace-nowrap rounded-full border border-blue bg-primary font-mono text-[11px] @md/reader-content:left-[9.5rem] @md/reader-content:px-2 @md/reader-content:py-0.5"
            style={{ x: '-100%', y: '-50%' }}
            animate={{
                top: [start, start, stop, stop, stop, stop, end, end],
                opacity: [0, 1, 1, 1, 1, 1, 1, 0],
                scale: [1, 1, 1, 1.2, 1, 1.2, 1, 1],
                boxShadow: [NO_PULSE, NO_PULSE, NO_PULSE, PULSE, NO_PULSE, PULSE, NO_PULSE, NO_PULSE],
            }}
            transition={{ duration: LOOP_SECONDS, times: TIMES, ease: 'easeInOut', repeat: Infinity }}
        >
            <span className="hidden @md/reader-content:inline">{event}</span>
        </motion.span>
    )
}

/**
 * Text beside a pipeline diagram of one event's trip through PostHog, with the
 * current product's stage marked "You are here". Reads `productData.eventJourney`.
 */
const EventJourney = ({ id, productData }: SectionComponentProps) => {
    const journey = productData?.eventJourney
    const stages: Stage[] = journey?.stages ?? []
    if (!journey || !stages.length) return null

    const stopIndex = Math.max(
        stages.findIndex((stage) => stage.youAreHere),
        0
    )

    return (
        <section
            id={id}
            className="scroll-mt-20 not-prose grid items-center gap-6 @3xl/reader-content:grid-cols-2 @3xl/reader-content:gap-10"
        >
            <div>
                <h2 className={SECTION_H2}>{journey.title}</h2>
                {journey.lede && <p className="m-0 text-lg leading-relaxed text-secondary">{journey.lede}</p>}
            </div>

            <div className="rounded-md border border-primary bg-accent p-4 @xl/reader-content:p-6">
                <div className="relative pl-8 @md/reader-content:pl-40">
                    <span
                        aria-hidden
                        className="absolute left-[3.375rem] border-l-2 border-dashed border-primary @md/reader-content:left-[11.375rem]"
                        style={{ top: centerOf(0), height: centerOf(stages.length - 1) - centerOf(0) }}
                    />
                    <MovingEvent event={journey.event} stageCount={stages.length} stopIndex={stopIndex} />
                    <ol className="relative m-0 grid list-none p-0" style={{ gap: GAP_PX }}>
                        {stages.map(({ key, label, detail, Icon, tile, youAreHere }) => (
                            <li key={key} className="m-0 flex items-start gap-3" style={{ height: ROW_PX }}>
                                <span
                                    className={`relative flex size-11 shrink-0 items-center justify-center rounded-md border-2 ${tile} ${
                                        youAreHere ? 'ring-4 ring-blue/30' : ''
                                    }`}
                                >
                                    <Icon className="size-6" />
                                </span>
                                <span className="flex min-w-0 flex-col gap-0.5">
                                    <span className="flex flex-wrap items-center gap-2 text-sm font-bold leading-tight">
                                        {label}
                                        {youAreHere && (
                                            <span className="rounded-sm bg-blue px-1.5 py-0.5 text-[11px] font-bold uppercase text-white">
                                                {journey.youAreHereLabel}
                                            </span>
                                        )}
                                    </span>
                                    <span className="text-xs leading-snug text-secondary">{detail}</span>
                                </span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    )
}

export default EventJourney

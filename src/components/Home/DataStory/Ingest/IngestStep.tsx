import React, { useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
    CAPTION_HOLD_MS,
    EXTERNAL_SOURCES,
    ExternalKey,
    LOOP_MS,
    Packet,
    PostHogHub,
    REDUCED_MOTION_MOMENT,
    SESSION_BOUNDARIES,
    SessionEvent,
    SessionWindow,
    SignalCaption,
    SourceLogo,
    eventColor,
    isProductEvent,
    latestEvent,
    travellingEvents,
    visibleEvents,
} from './session'
import { transform, useEventClock } from '../timeline'

const WIDE_LAYOUT_MIN_PX = 768

interface Point {
    x: number
    y: number
}

interface Geometry {
    width: number
    height: number
    hubLeft: Point
    hubRight: Point
    windowRight: number
    sources: Record<ExternalKey, Point>
}

const spokePath = (from: Point, to: Point): string => {
    const bend = (to.x - from.x) / 2
    return `M ${from.x} ${from.y} C ${from.x + bend} ${from.y}, ${to.x - bend} ${to.y}, ${to.x} ${to.y}`
}

type SpokeKey = ExternalKey | 'window'

const spokePathsFor = (geometry: Geometry): Record<SpokeKey, string> => ({
    window: `M ${geometry.windowRight} ${geometry.hubLeft.y} L ${geometry.hubLeft.x} ${geometry.hubLeft.y}`,
    ...(Object.fromEntries(
        EXTERNAL_SOURCES.map(({ key }) => [key, spokePath(geometry.sources[key], geometry.hubRight)])
    ) as Record<ExternalKey, string>),
})

const spokeForEvent = (event: SessionEvent): SpokeKey =>
    isProductEvent(event) ? 'window' : (event.source as ExternalKey)

const REPLAY_MASK = {
    '--replay-mask':
        'radial-gradient(ellipse 200px 292px at calc(100% - 24px) 24px, transparent 40%, rgba(0,0,0,0.06) 55%, rgba(0,0,0,0.25) 68%, rgba(0,0,0,0.55) 80%, rgba(0,0,0,0.85) 91%, black 100%)',
} as React.CSSProperties

const FAN_OFFSETS = ['mr-6', 'mr-0', 'mr-6']

const centerOf = (element: Element, origin: DOMRect) => {
    const rect = element.getBoundingClientRect()
    return { rect, x: rect.left + rect.width / 2 - origin.left, y: rect.top + rect.height / 2 - origin.top }
}

function useSpokeGeometry(
    containerRef: React.RefObject<HTMLDivElement>,
    hubRef: React.RefObject<HTMLDivElement>,
    windowRef: React.RefObject<HTMLDivElement>,
    sourceRefs: React.MutableRefObject<Partial<Record<ExternalKey, HTMLElement | null>>>
): Geometry | null {
    const [geometry, setGeometry] = useState<Geometry | null>(null)

    useLayoutEffect(() => {
        const container = containerRef.current
        if (!container) return

        const measure = () => {
            const origin = container.getBoundingClientRect()
            if (origin.width < WIDE_LAYOUT_MIN_PX || !hubRef.current || !windowRef.current) {
                setGeometry(null)
                return
            }
            const hub = centerOf(hubRef.current, origin)
            const sources = Object.fromEntries(
                EXTERNAL_SOURCES.map(({ key }) => {
                    const element = sourceRefs.current[key]
                    if (!element) return [key, { x: 0, y: 0 }]
                    const { rect, y } = centerOf(element, origin)
                    return [key, { x: rect.left - origin.left - 6, y }]
                })
            ) as Record<ExternalKey, Point>
            setGeometry({
                width: origin.width,
                height: origin.height,
                hubLeft: { x: hub.rect.left - origin.left - 4, y: hub.y },
                hubRight: { x: hub.rect.right - origin.left + 4, y: hub.y },
                windowRight: windowRef.current.getBoundingClientRect().right - origin.left,
                sources,
            })
        }

        measure()
        const observer = new ResizeObserver(measure)
        observer.observe(container)
        return () => observer.disconnect()
    }, [containerRef, hubRef, windowRef, sourceRefs])

    return geometry
}

const Caption = ({ elapsed }: { elapsed: number }) => {
    const latest = latestEvent(elapsed, CAPTION_HOLD_MS)
    return (
        <div className="grid min-h-8 justify-items-center">
            <AnimatePresence initial={false}>
                {latest && (
                    <motion.div
                        key={latest.id}
                        initial={{ opacity: 0, transform: transform({ y: 6 }), filter: 'blur(4px)' }}
                        animate={{ opacity: 1, transform: transform(), filter: 'blur(0px)' }}
                        exit={{ opacity: 0, transform: transform({ y: -6 }), filter: 'blur(4px)' }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="[grid-area:1/1]"
                    >
                        <SignalCaption event={latest} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function IngestStep({
    title,
    description,
}: {
    title: string
    description: React.ReactNode
}): JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null)
    const hubRef = useRef<HTMLDivElement>(null)
    const windowRef = useRef<HTMLDivElement>(null)
    const sourceRefs = useRef<Partial<Record<ExternalKey, HTMLElement | null>>>({})
    const { elapsed, progressRef } = useEventClock(containerRef, {
        loopMs: LOOP_MS,
        boundaries: SESSION_BOUNDARIES,
        restingMs: REDUCED_MOTION_MOMENT,
    })
    const geometry = useSpokeGeometry(containerRef, hubRef, windowRef, sourceRefs)
    const latest = latestEvent(elapsed, CAPTION_HOLD_MS)
    const seen = visibleEvents(elapsed)

    const spokes = geometry && spokePathsFor(geometry)

    return (
        <div className="@container mt-20">
            <div
                ref={containerRef}
                className="relative mx-auto grid max-w-[58rem] gap-6 @3xl:grid-cols-12 @3xl:items-start @3xl:gap-x-0"
            >
                {geometry && spokes && (
                    <svg
                        viewBox={`0 0 ${geometry.width} ${geometry.height}`}
                        className="pointer-events-none absolute inset-0 size-full text-primary"
                        aria-hidden="true"
                    >
                        <path
                            d={spokes.window}
                            stroke="currentColor"
                            strokeOpacity={0.3}
                            strokeWidth={1.25}
                            fill="none"
                        />
                        {EXTERNAL_SOURCES.map(({ key }) => (
                            <path
                                key={key}
                                d={spokes[key]}
                                stroke="currentColor"
                                strokeOpacity={0.3}
                                strokeWidth={1.25}
                                strokeDasharray="3 4"
                                fill="none"
                            />
                        ))}
                        {travellingEvents(elapsed).map((event) => (
                            <Packet key={event.id} color={eventColor(event)} d={spokes[spokeForEvent(event)]} />
                        ))}
                    </svg>
                )}

                <div className="relative z-10 @3xl:col-start-7 @3xl:col-end-13 @3xl:row-start-1 @3xl:flex @3xl:flex-col @3xl:self-stretch @3xl:pl-4">
                    <h3 className="!mt-0">1. {title}</h3>
                    <p>{description}</p>
                    <div className="not-prose mt-8 hidden items-center @3xl:mt-auto @3xl:flex">
                        <ul className="order-last m-0 flex list-none flex-col items-end gap-3 p-0">
                            {EXTERNAL_SOURCES.map(({ key, label }, index) => {
                                const fired = seen.some((event) => event.source === key)
                                const firing = latest?.source === key
                                return (
                                    <li
                                        key={key}
                                        ref={(element) => {
                                            sourceRefs.current[key] = element
                                        }}
                                        title={label}
                                        className={`m-0 w-fit ${FAN_OFFSETS[index]}`}
                                    >
                                        <motion.div
                                            initial={false}
                                            animate={{
                                                transform: transform({ scale: firing ? 1.1 : 1 }),
                                                opacity: fired || firing ? 1 : 0.6,
                                            }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                                        >
                                            <SourceLogo source={key} />
                                        </motion.div>
                                    </li>
                                )
                            })}
                        </ul>
                        <div className="relative flex flex-1 justify-center">
                            <div ref={hubRef} className="relative">
                                <PostHogHub elapsed={elapsed} className="size-14" />
                            </div>
                            <div className="absolute left-1/2 top-full mt-3 w-max -translate-x-1/2">
                                <Caption elapsed={elapsed} />
                            </div>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, transform: transform({ y: 16 }) }}
                    whileInView={{ opacity: 1, transform: transform() }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ type: 'spring', stiffness: 160, damping: 24 }}
                    className="not-prose relative @3xl:col-start-1 @3xl:col-end-8 @3xl:row-start-1 @3xl:-m-6 @3xl:p-6 @3xl:[mask-image:var(--replay-mask)]"
                    style={REPLAY_MASK}
                >
                    <div ref={windowRef}>
                        <SessionWindow elapsed={elapsed} progressRef={progressRef} />
                    </div>
                </motion.div>

                <div className="not-prose flex flex-col items-center gap-3 @3xl:hidden">
                    <div className="flex items-center gap-3">
                        <PostHogHub elapsed={elapsed} className="size-12" />
                        {EXTERNAL_SOURCES.map(({ key }) => (
                            <motion.div
                                key={key}
                                initial={false}
                                animate={{ transform: transform({ scale: latest?.source === key ? 1.1 : 1 }) }}
                                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                            >
                                <SourceLogo source={key} />
                            </motion.div>
                        ))}
                    </div>
                    <Caption elapsed={elapsed} />
                </div>
            </div>
        </div>
    )
}

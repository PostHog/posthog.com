import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
    EXTERNAL_SOURCES,
    ExternalKey,
    LOOP_MS,
    PACKET_TRAVEL_MS,
    PostHogHub,
    REDUCED_MOTION_MOMENT,
    SESSION_EVENTS,
    SessionEvent,
    SessionWindow,
    SignalCaption,
    SourceLogo,
    captionEndsAt,
    eventColor,
    isProductEvent,
} from './session'
import {
    EASE_OUT_QUINT,
    Frame,
    Spring,
    easeFrames,
    hiddenUntil,
    keyframes,
    springFrames,
    timelineRootStyle,
    timelineStyle,
    useTimelinePlayback,
} from '../timeline'
import '../timeline.css'

const WIDE_LAYOUT_MIN_PX = 768
const PACKET_SAMPLES = 14
const PACKET_FADE_FROM = 0.85
const SOURCE_SPRING: Spring = { stiffness: 400, damping: 18 }

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

type Curve = [Point, Point, Point, Point]

const spokeCurve = (from: Point, to: Point): Curve => {
    const bend = (to.x - from.x) / 2
    return [from, { x: from.x + bend, y: from.y }, { x: to.x - bend, y: to.y }, to]
}

const curvePath = ([start, controlA, controlB, end]: Curve): string =>
    `M ${start.x} ${start.y} C ${controlA.x} ${controlA.y}, ${controlB.x} ${controlB.y}, ${end.x} ${end.y}`

const curvePoint = ([p0, p1, p2, p3]: Curve, t: number): Point => {
    const u = 1 - t
    return {
        x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
        y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
    }
}

const curveAngle = ([p0, p1, p2, p3]: Curve, t: number): number => {
    const u = 1 - t
    const dx = 3 * u * u * (p1.x - p0.x) + 6 * u * t * (p2.x - p1.x) + 3 * t * t * (p3.x - p2.x)
    const dy = 3 * u * u * (p1.y - p0.y) + 6 * u * t * (p2.y - p1.y) + 3 * t * t * (p3.y - p2.y)
    return (Math.atan2(dy, dx) * 180) / Math.PI
}

const easeInOutCubic = (t: number): number => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

const REPLAY_MASK = {
    '--replay-mask':
        'radial-gradient(ellipse 200px 292px at calc(100% - 24px) 24px, transparent 40%, rgba(0,0,0,0.06) 55%, rgba(0,0,0,0.25) 68%, rgba(0,0,0,0.55) 80%, rgba(0,0,0,0.85) 91%, black 100%)',
} as React.CSSProperties

const FAN_OFFSETS = ['mr-6', 'mr-0', 'mr-6']

const sourceEvent = (key: ExternalKey): { event: SessionEvent; index: number } => {
    const index = SESSION_EVENTS.findIndex(({ source }) => source === key)
    return { event: SESSION_EVENTS[index], index }
}

const sourceFrames = (key: ExternalKey, idleOpacity: number): Frame[] => {
    const { event, index } = sourceEvent(key)
    const idle = `opacity:${idleOpacity};transform:scale(1)`
    return [
        { at: 0, style: idle },
        ...springFrames(event.at, idle, 'opacity:1;transform:scale(1.1)', SOURCE_SPRING),
        ...springFrames(
            captionEndsAt(index),
            'opacity:1;transform:scale(1.1)',
            'opacity:1;transform:scale(1)',
            SOURCE_SPRING
        ),
    ]
}

const CAPTION_HIDDEN = 'opacity:0;transform:translateY(6px);filter:blur(4px)'
const CAPTION_SHOWN = 'opacity:1;transform:none;filter:blur(0)'
const CAPTION_EXIT = 'opacity:0;transform:translateY(-6px);filter:blur(4px)'

const STEP_CSS = [
    ...EXTERNAL_SOURCES.flatMap(({ key }) => [
        keyframes(`ingest-source-${key}`, LOOP_MS, sourceFrames(key, 0.6)),
        keyframes(`ingest-source-mobile-${key}`, LOOP_MS, sourceFrames(key, 1)),
    ]),
    ...SESSION_EVENTS.map(({ id, at }, index) =>
        keyframes(`ingest-caption-${id}`, LOOP_MS, [
            { at: 0, style: CAPTION_HIDDEN },
            ...easeFrames(at, 300, CAPTION_HIDDEN, CAPTION_SHOWN, EASE_OUT_QUINT),
            ...easeFrames(captionEndsAt(index), 300, CAPTION_SHOWN, CAPTION_EXIT, EASE_OUT_QUINT),
        ])
    ),
].join('')

const packetFrames = (curve: Curve, at: number): Frame[] => {
    const start = curvePoint(curve, 0)
    const parked = `opacity:0;transform:translate(${start.x}px,${start.y}px)`
    return [
        ...hiddenUntil(at, parked),
        ...Array.from({ length: PACKET_SAMPLES + 1 }, (_, sample) => {
            const time = sample / PACKET_SAMPLES
            const progress = easeInOutCubic(time)
            const { x, y } = curvePoint(curve, progress)
            const opacity = time <= PACKET_FADE_FROM ? 1 : 1 - (time - PACKET_FADE_FROM) / (1 - PACKET_FADE_FROM)
            return {
                at: at + time * PACKET_TRAVEL_MS,
                style: `opacity:${+opacity.toFixed(3)};transform:translate(${x.toFixed(1)}px,${y.toFixed(
                    1
                )}px) rotate(${curveAngle(curve, progress).toFixed(1)}deg)`,
            }
        }),
        { at: at + PACKET_TRAVEL_MS + 1, style: parked },
    ]
}

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

const curvesFor = (geometry: Geometry): Record<ExternalKey | 'window', Curve> => {
    const windowStart = { x: geometry.windowRight, y: geometry.hubLeft.y }
    return {
        window: [windowStart, windowStart, geometry.hubLeft, geometry.hubLeft],
        ...(Object.fromEntries(
            EXTERNAL_SOURCES.map(({ key }) => [key, spokeCurve(geometry.sources[key], geometry.hubRight)])
        ) as Record<ExternalKey, Curve>),
    }
}

const curveForEvent = (curves: Record<ExternalKey | 'window', Curve>, event: SessionEvent): Curve =>
    curves[isProductEvent(event) ? 'window' : (event.source as ExternalKey)]

const Caption = () => (
    <div className="grid min-h-8 justify-items-center">
        {SESSION_EVENTS.map((event) => (
            <div key={event.id} className="tl [grid-area:1/1]" style={timelineStyle(`ingest-caption-${event.id}`)}>
                <SignalCaption event={event} />
            </div>
        ))}
    </div>
)

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
    useTimelinePlayback(containerRef)
    const geometry = useSpokeGeometry(containerRef, hubRef, windowRef, sourceRefs)
    const curves = useMemo(() => geometry && curvesFor(geometry), [geometry])
    const packetCss = useMemo(
        () =>
            curves
                ? SESSION_EVENTS.map((event) =>
                      keyframes(
                          `ingest-packet-${event.id}`,
                          LOOP_MS,
                          packetFrames(curveForEvent(curves, event), event.at)
                      )
                  ).join('')
                : '',
        [curves]
    )

    return (
        <div className="@container mt-20">
            <style dangerouslySetInnerHTML={{ __html: STEP_CSS + packetCss }} />
            <div
                ref={containerRef}
                className="timeline relative mx-auto grid max-w-[58rem] gap-6 @3xl:grid-cols-12 @3xl:items-start @3xl:gap-x-0"
                style={timelineRootStyle(LOOP_MS, REDUCED_MOTION_MOMENT)}
            >
                {geometry && curves && (
                    <>
                        <svg
                            viewBox={`0 0 ${geometry.width} ${geometry.height}`}
                            className="pointer-events-none absolute inset-0 size-full text-primary"
                            aria-hidden="true"
                        >
                            <path
                                d={curvePath(curves.window)}
                                stroke="currentColor"
                                strokeOpacity={0.3}
                                strokeWidth={1.25}
                                fill="none"
                            />
                            {EXTERNAL_SOURCES.map(({ key }) => (
                                <path
                                    key={key}
                                    d={curvePath(curves[key])}
                                    stroke="currentColor"
                                    strokeOpacity={0.3}
                                    strokeWidth={1.25}
                                    strokeDasharray="3 4"
                                    fill="none"
                                />
                            ))}
                        </svg>
                        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                            {SESSION_EVENTS.map((event) => (
                                <span
                                    key={event.id}
                                    className="tl absolute -ml-1.5 -mt-[1.5px] h-[3px] w-3 rounded-full"
                                    style={{
                                        ...timelineStyle(`ingest-packet-${event.id}`),
                                        backgroundColor: eventColor(event),
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}

                <div className="relative z-10 @3xl:col-start-7 @3xl:col-end-13 @3xl:row-start-1 @3xl:flex @3xl:flex-col @3xl:self-stretch @3xl:pl-4">
                    <h3 className="!mt-0">1. {title}</h3>
                    <p>{description}</p>
                    <div className="not-prose mt-8 hidden items-center @3xl:mt-auto @3xl:flex">
                        <ul className="order-last m-0 flex list-none flex-col items-end gap-3 p-0">
                            {EXTERNAL_SOURCES.map(({ key, label }, index) => (
                                <li
                                    key={key}
                                    ref={(element) => {
                                        sourceRefs.current[key] = element
                                    }}
                                    title={label}
                                    className={`m-0 w-fit ${FAN_OFFSETS[index]}`}
                                >
                                    <div className="tl" style={timelineStyle(`ingest-source-${key}`)}>
                                        <SourceLogo source={key} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="relative flex flex-1 justify-center">
                            <div ref={hubRef} className="relative">
                                <PostHogHub className="size-14" />
                            </div>
                            <div className="absolute left-1/2 top-full mt-3 w-max -translate-x-1/2">
                                <Caption />
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="not-prose relative @3xl:col-start-1 @3xl:col-end-8 @3xl:row-start-1 @3xl:-m-6 @3xl:p-6 @3xl:[mask-image:var(--replay-mask)]"
                    style={REPLAY_MASK}
                >
                    <div ref={windowRef} className="tl-enter">
                        <SessionWindow />
                    </div>
                </div>

                <div className="not-prose flex flex-col items-center gap-3 @3xl:hidden">
                    <div className="flex items-center gap-3">
                        <PostHogHub className="size-12" />
                        {EXTERNAL_SOURCES.map(({ key }) => (
                            <div key={key} className="tl" style={timelineStyle(`ingest-source-mobile-${key}`)}>
                                <SourceLogo source={key} />
                            </div>
                        ))}
                    </div>
                    <Caption />
                </div>
            </div>
        </div>
    )
}

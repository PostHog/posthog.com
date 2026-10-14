import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import OSButton from 'components/OSButton'
import CaptureRegion from './CaptureRegion'
import { useDataLine } from './context'
import type { Delivery } from './engine'
import Envelope, { ENVELOPE_HEIGHT, ENVELOPE_MOUTH, ENVELOPE_WIDTH } from './Envelope'
import type { EventKind } from './eventKinds'
import type { Parts } from './geometry'
import { useElementSize, useInView } from '../hooks'
import { INGEST_ROUTE } from './routes'

interface Flight {
    id: number
    delivery: Delivery
}

const OUTBOX_KEY = 'outbox'
const WINDOW_KEY = 'capture'
const OUTBOX_PLACEMENT = 'right-1 @xl:-right-[18px]'
const OUTBOX_BOTTOM = -34
const INTAKE_REACH = 22
const INTAKE_SIDE = 6
const SINK_CLEARANCE = 30
const SINK_REACH = 600
const BATCH = { size: 5, waitMs: 1500 }
const PAGEVIEW_VISIBILITY = 0.5
const PAGEVIEW_DROP = 28
const CLOSE_MS = 420
const FLY_MS = 760
const OPEN_MS = 420
const UNPACK_MS_PER_EVENT = 110
const FADE_MS = 360
const ARC_HEIGHT = 56
const ARC_SAMPLES = 16
const FLIGHT_TILT = 9
const STICKER_PRICE = 4
const PROMO_CODE = 'HOGZILLA'
const PROMO_DISCOUNT = 0.2
const FINISHES = ['Matte', 'Glossy', 'Holo']
const STICKER_IMAGE = 'https://res.cloudinary.com/dmukukwp6/image/upload/min_hogzilla_sticker_456e11eede.png'
const BAG_ICON = 'https://res.cloudinary.com/dmukukwp6/image/upload/Icon_Shopping_Bag_Style_Modern_cd937c7872.png'

const outboxParts: Parts = {
    segments: [],
    zones: [
        {
            type: 'converter',
            box: {
                left: -INTAKE_SIDE,
                top: ENVELOPE_MOUTH.y - INTAKE_REACH,
                width: ENVELOPE_WIDTH + INTAKE_SIDE * 2,
                height: INTAKE_REACH + 6,
            },
            intake: { x: ENVELOPE_MOUTH.x, y: ENVELOPE_MOUTH.y + 4 },
            batch: BATCH,
            route: INGEST_ROUTE,
        },
    ],
}

const sinkParts = (width: number, height: number): Parts => ({
    segments: [],
    zones: [
        {
            type: 'sink',
            box: {
                left: -SINK_REACH,
                top: height - OUTBOX_BOTTOM + SINK_CLEARANCE,
                width: width + SINK_REACH * 2,
                height: SINK_REACH,
            },
        },
    ],
})

const wait = (ms: number): Promise<void> => new Promise((resolve) => window.setTimeout(resolve, ms))

function arcKeyframes(dx: number, dy: number): Keyframe[] {
    return Array.from({ length: ARC_SAMPLES + 1 }, (_, index) => {
        const t = index / ARC_SAMPLES
        const x = dx * t
        const y = dy * t - 4 * ARC_HEIGHT * t * (1 - t)
        const tilt = FLIGHT_TILT * Math.sin(Math.PI * t)
        return { transform: `translate(${x}px, ${y}px) rotate(${tilt}deg)`, offset: t }
    })
}

function EnvelopeFlight({ flight, onDone }: { flight: Flight; onDone: (id: number) => void }): JSX.Element {
    const engine = useDataLine()
    const flightRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(true)
    const [hasLanded, setHasLanded] = useState(false)

    useEffect(() => {
        const element = flightRef.current
        let isCancelled = false
        const { route, kinds } = flight.delivery

        const run = async () => {
            setIsOpen(false)
            await wait(CLOSE_MS)
            const target = engine.entryClientPoint(route)
            if (!element || !target || isCancelled) {
                engine.deliver(route, kinds)
                onDone(flight.id)
                return
            }
            const start = element.getBoundingClientRect()
            const dx = target.x - (start.left + ENVELOPE_MOUTH.x)
            const dy = target.y - (start.top + ENVELOPE_MOUTH.y)
            await element.animate(arcKeyframes(dx, dy), { duration: FLY_MS, easing: 'linear', fill: 'forwards' })
                .finished
            if (isCancelled) {
                return
            }
            setHasLanded(true)
            setIsOpen(true)
            await wait(OPEN_MS)
            engine.deliver(route, kinds)
            await wait(UNPACK_MS_PER_EVENT * kinds.length)
            await element.animate([{ opacity: 1 }, { opacity: 0 }], { duration: FADE_MS, fill: 'forwards' }).finished
            onDone(flight.id)
        }

        run()
        return () => {
            isCancelled = true
        }
    }, [])

    return (
        <div
            ref={flightRef}
            className={`pointer-events-none absolute ${OUTBOX_PLACEMENT} ${hasLanded ? 'z-10' : 'z-30'}`}
            style={{ bottom: OUTBOX_BOTTOM }}
        >
            <Envelope lines={flight.delivery.kinds} isOpen={isOpen} />
        </div>
    )
}

function CapturedCount(): JSX.Element {
    const engine = useDataLine()
    const stats = useSyncExternalStore(engine.subscribeStats, engine.getStats, engine.getStats)
    return (
        <span className="tabular-nums">
            {stats.captured.toLocaleString('en-US')} {stats.captured === 1 ? 'event' : 'events'}
        </span>
    )
}

function Storefront({ onAddToCart }: { onAddToCart: (quantity: number) => void }): JSX.Element {
    const [finish, setFinish] = useState(FINISHES[0])
    const [quantity, setQuantity] = useState(1)
    const [promo, setPromo] = useState('')
    const hasDiscount = promo.trim().toUpperCase() === PROMO_CODE
    const total = STICKER_PRICE * quantity * (hasDiscount ? 1 - PROMO_DISCOUNT : 1)

    return (
        <div className="flex gap-4 p-4 @container">
            <div className="flex size-24 shrink-0 items-center justify-center rounded border border-primary bg-accent @md:size-28">
                <CloudinaryImage src={STICKER_IMAGE} width={224} alt="Hogzilla sticker" imgClassName="w-20 @md:w-24" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2.5">
                <div className="flex items-baseline justify-between gap-2">
                    <strong className="text-[15px] leading-tight">Hogzilla sticker</strong>
                    <span className="text-sm font-semibold tabular-nums">
                        {hasDiscount && (
                            <s className="mr-1 font-normal text-muted">${(STICKER_PRICE * quantity).toFixed(2)}</s>
                        )}
                        ${total.toFixed(2)}
                    </span>
                </div>
                <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Finish">
                    {FINISHES.map((option) => (
                        <button
                            key={option}
                            type="button"
                            role="radio"
                            aria-checked={finish === option}
                            onClick={() => setFinish(option)}
                            className={`rounded border px-2 py-0.5 text-xs font-semibold ${
                                finish === option
                                    ? 'border-primary bg-accent text-primary'
                                    : 'border-transparent text-secondary hover:border-primary'
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <label className="flex items-center gap-2 text-xs text-secondary">
                    Qty
                    <input
                        type="range"
                        min={1}
                        max={10}
                        value={quantity}
                        onChange={(event) => setQuantity(Number(event.target.value))}
                        className="w-full max-w-36 accent-orange"
                    />
                    <span className="w-4 tabular-nums text-primary">{quantity}</span>
                </label>
                <div className="flex flex-wrap items-center gap-2">
                    <input
                        type="text"
                        value={promo}
                        onChange={(event) => setPromo(event.target.value)}
                        placeholder="Promo code"
                        aria-label="Promo code"
                        className="w-28 rounded border border-input bg-input px-2 py-1 text-xs text-primary placeholder:text-muted"
                    />
                    <OSButton variant="primary" size="sm" onClick={() => onAddToCart(quantity)}>
                        Add to cart
                    </OSButton>
                </div>
                <p className="m-0 text-[11px] leading-none text-muted">
                    Psst: try <span className="font-mono text-secondary">{PROMO_CODE}</span>
                </p>
            </div>
        </div>
    )
}

export default function CaptureWindow(): JSX.Element {
    const engine = useDataLine()
    const containerRef = useRef<HTMLDivElement>(null)
    const windowRef = useRef<HTMLDivElement>(null)
    const outboxRef = useRef<HTMLDivElement>(null)
    const bodyRef = useRef<HTMLDivElement>(null)
    const size = useElementSize(windowRef)
    const isVisible = useInView(windowRef, PAGEVIEW_VISIBILITY)
    const [pending, setPending] = useState<EventKind[]>([])
    const [flights, setFlights] = useState<Flight[]>([])
    const [cartCount, setCartCount] = useState(0)
    const hasSentPageview = useRef(false)
    const nextFlightId = useRef(1)

    useEffect(() => {
        const outbox = outboxRef.current
        return outbox ? engine.registerParts(OUTBOX_KEY, outbox, outboxParts) : undefined
    }, [engine])

    useEffect(() => {
        const element = windowRef.current
        return element && size
            ? engine.registerParts(WINDOW_KEY, element, sinkParts(size.width, size.height))
            : undefined
    }, [engine, size])

    useEffect(
        () =>
            engine.onBatchChange((partsKey, kinds) => {
                if (partsKey === OUTBOX_KEY) {
                    setPending(kinds)
                }
            }),
        [engine]
    )

    useEffect(
        () =>
            engine.onSend((partsKey, delivery) => {
                if (partsKey !== OUTBOX_KEY) {
                    return
                }
                setFlights((current) => [...current, { id: nextFlightId.current++, delivery }])
                outboxRef.current?.animate(
                    [
                        { transform: 'translateY(12px) scale(0.8)', opacity: 0 },
                        { transform: 'translateY(0) scale(1)', opacity: 1 },
                    ],
                    { duration: 280, delay: 200, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'backwards' }
                )
            }),
        [engine]
    )

    useEffect(() => {
        const body = bodyRef.current?.getBoundingClientRect()
        if (!isVisible || hasSentPageview.current || !body) {
            return
        }
        hasSentPageview.current = true
        engine.emitAt('pageview', body.left + body.width / 2, body.top + PAGEVIEW_DROP)
    }, [engine, isVisible])

    const finishFlight = (id: number) => setFlights((current) => current.filter((flight) => flight.id !== id))

    return (
        <div ref={containerRef} className="relative">
            <div ref={windowRef} className="not-prose relative rounded-md border border-primary bg-primary shadow-2xl">
                <header className="flex items-center gap-2 rounded-t-md border-b border-primary bg-accent px-3 py-1.5 text-sm font-semibold text-primary">
                    <CloudinaryImage src={BAG_ICON} width={36} alt="" imgClassName="size-[18px]" />
                    Your product
                    <span className="ml-auto font-mono text-[11px] font-normal text-muted">
                        cart <span className="tabular-nums text-secondary">{cartCount}</span>
                    </span>
                </header>
                <div ref={bodyRef}>
                    <CaptureRegion>
                        <Storefront onAddToCart={(quantity) => setCartCount((count) => count + quantity)} />
                    </CaptureRegion>
                </div>
                <footer className="flex items-center gap-1.5 rounded-b-md border-t border-primary px-3 py-1.5 font-mono text-[11px] text-muted">
                    <span className="text-secondary">posthog.capture()</span>
                    <span>·</span>
                    <CapturedCount />
                </footer>
            </div>
            <div
                ref={outboxRef}
                className={`pointer-events-none absolute z-30 ${OUTBOX_PLACEMENT}`}
                style={{ bottom: OUTBOX_BOTTOM, width: ENVELOPE_WIDTH, height: ENVELOPE_HEIGHT }}
            >
                <Envelope lines={pending} isOpen />
            </div>
            {flights.map((flight) => (
                <EnvelopeFlight key={flight.id} flight={flight} onDone={finishFlight} />
            ))}
        </div>
    )
}

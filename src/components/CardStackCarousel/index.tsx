import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { IconChevronLeft, IconChevronRight } from '@posthog/icons'
import { usePrefersReducedMotion } from '../Code/usePrefersReducedMotion'

export type CardStackRenderMeta = {
    /** True when this slide is the centered (front) card */
    isActive: boolean
}

export type CardStackCarouselProps = {
    /** Total number of cards in the stack */
    count: number
    /** Renders the card content for a given absolute index */
    renderCard: (index: number, meta: CardStackRenderMeta) => React.ReactNode
    /** Loop to first card after last (and vice versa). Default true. */
    loop?: boolean
    /** Optional class on the outer container */
    className?: string
    /** Optional accessible label */
    ariaLabel?: string
}

const STACK_OFFSETS = [-1, 0, 1] as const
type StackPosition = (typeof STACK_OFFSETS)[number]

type Layout = {
    baseX: number
    baseY: number
    scale: number
    rotate: number
    opacity: number
    zIndex: number
}

const DRAG_CLICK_THRESHOLD_PX = 4
const ADVANCE_THRESHOLD_RATIO = 0.22
const ADVANCE_THRESHOLD_MIN_PX = 60
const INNER_TRANSLATE_RATIO = 0.42
const INNER_SCALE = 0.88
const INNER_ROTATE_DEG = 5
const INNER_OPACITY = 0.75
const INNER_TRANSLATE_Y_PX = 40

const ENTRY_TRANSLATE_RATIO = 0.64
const ENTRY_EXTRA_Y_PX = 0
const ENTRY_SCALE = 0.82
const ENTRY_ROTATE_DEG = 17

const TRANSITION_MS = 420
const TRANSITION = `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`

function layoutForPosition(position: StackPosition, cardWidth: number): Layout {
    const w = cardWidth || 320
    if (position === 0) {
        return { baseX: 0, baseY: 0, scale: 1, rotate: 0, opacity: 1, zIndex: 30 }
    }
    const sign = position as 1 | -1
    return {
        baseX: sign * INNER_TRANSLATE_RATIO * w,
        baseY: INNER_TRANSLATE_Y_PX,
        scale: INNER_SCALE,
        rotate: sign * INNER_ROTATE_DEG,
        opacity: INNER_OPACITY,
        zIndex: position === -1 ? 12 : 11,
    }
}

function entryPose(from: 'left' | 'right', cardWidth: number): Layout {
    const sign = from === 'right' ? 1 : -1
    const w = cardWidth || 320
    return {
        baseX: sign * ENTRY_TRANSLATE_RATIO * w,
        baseY: INNER_TRANSLATE_Y_PX + ENTRY_EXTRA_Y_PX,
        scale: ENTRY_SCALE,
        rotate: sign * ENTRY_ROTATE_DEG,
        opacity: INNER_OPACITY,
        zIndex: from === 'left' ? 12 : 11,
    }
}

type Entrance = { kind: 'initial' } | { kind: 'nav'; index: number; from: 'left' | 'right' }

function isEnteringSide(entrance: Entrance | null, index: number, position: StackPosition): boolean {
    if (!entrance) return false
    if (entrance.kind === 'initial') return position === -1 || position === 1
    return (
        entrance.index === index &&
        ((entrance.from === 'right' && position === 1) || (entrance.from === 'left' && position === -1))
    )
}

function entryPoseForEntrance(entrance: Entrance, position: StackPosition): 'left' | 'right' {
    if (entrance.kind === 'initial') return position === -1 ? 'left' : 'right'
    return entrance.from
}

function StackCardShell({
    index,
    position,
    cardWidth,
    dragOffset,
    isDragging,
    prefersReducedMotion,
    transitionEnabled,
    entrance,
    renderCard,
}: {
    index: number
    position: StackPosition
    cardWidth: number
    dragOffset: number
    isDragging: boolean
    prefersReducedMotion: boolean
    transitionEnabled: boolean
    entrance: Entrance | null
    renderCard: (index: number, meta: CardStackRenderMeta) => React.ReactNode
}) {
    const enteringThis = isEnteringSide(entrance, index, position)

    const settled = layoutForPosition(position, cardWidth)
    const entry = enteringThis && entrance ? entryPose(entryPoseForEntrance(entrance, position), cardWidth) : settled

    const [useSettledLayout, setUseSettledLayout] = useState(!enteringThis || prefersReducedMotion)
    // Suppresses the CSS transition while jumping to the entry pose so the card doesn't animate backwards.
    const [suppressTransition, setSuppressTransition] = useState(false)

    useLayoutEffect(() => {
        if (prefersReducedMotion) {
            setUseSettledLayout(true)
            setSuppressTransition(false)
            return
        }
        if (!enteringThis) {
            setUseSettledLayout(true)
            setSuppressTransition(false)
            return
        }
        // Instantly place card at entry pose (no transition), then animate to settled.
        setUseSettledLayout(false)
        setSuppressTransition(true)
        const id = requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setSuppressTransition(false)
                setUseSettledLayout(true)
            })
        })
        return () => cancelAnimationFrame(id)
    }, [enteringThis, prefersReducedMotion, index, position, entrance])

    const pose = useSettledLayout ? settled : entry
    const w = cardWidth || 320
    const dragRot = isDragging ? Math.max(-6, Math.min(6, (dragOffset / w) * 7.5)) : 0
    const sideDragFactor = position === 0 ? 1 : 0.55
    const liveRotate = pose.rotate - dragRot * sideDragFactor
    const liveX = pose.baseX + (isDragging ? dragOffset : 0)

    const transitionStyle =
        !transitionEnabled || isDragging || suppressTransition || prefersReducedMotion ? 'none' : TRANSITION

    const isSideCard = position !== 0

    // Side cards: CSS @container query controls visibility (opacity-0 → @lg:opacity-[0.75]).
    // @lg in @tailwindcss/container-queries = 32rem = 512px, which is where the stack layout fits.
    // The inline `transition` already covers opacity, so the enter/exit animations play naturally.
    // Center card: opacity always 1 (or set via inline style during drag/transition).
    const sideOpacityClass = isSideCard ? 'opacity-0 @lg:opacity-[0.75]' : ''

    return (
        <div
            data-card-stack-position={position}
            aria-hidden={position !== 0}
            className={`absolute top-0 left-1/2 w-[min(90%,368px)] pointer-events-none ${sideOpacityClass}`}
            style={{
                zIndex: pose.zIndex,
                transform: `translate(calc(-50% + ${liveX}px), ${pose.baseY}px) scale(${pose.scale}) rotate(${liveRotate}deg)`,
                transformOrigin: 'top center',
                // Side card opacity is controlled by CSS container query class above.
                // Only the center card needs an inline opacity (1).
                opacity: isSideCard ? undefined : pose.opacity,
                transition: transitionStyle,
            }}
        >
            <div
                className={`w-full select-none ${position === 0 && !isDragging ? 'pointer-events-auto' : ''} ${
                    isDragging ? 'cursor-grabbing' : position === 0 ? 'cursor-grab' : ''
                }`}
            >
                {renderCard(index, { isActive: position === 0 })}
            </div>
        </div>
    )
}

export function CardStackCarousel({
    count,
    renderCard,
    loop = true,
    className = '',
    ariaLabel = 'Card carousel',
}: CardStackCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const stageRef = useRef<HTMLDivElement>(null)
    const cardWidthRef = useRef(0)
    const dragStartXRef = useRef(0)
    const hasMovedRef = useRef(false)
    const activePointerRef = useRef<number | null>(null)
    const pendingNavRef = useRef<0 | 1 | -1>(0)
    const prevCurrentRef = useRef(0)
    const didInitialEntranceRef = useRef(false)

    const [current, setCurrent] = useState(0)
    const [dragOffset, setDragOffset] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [entrance, setEntrance] = useState<Entrance | null>(null)
    const prefersReducedMotion = usePrefersReducedMotion()

    const wrap = useCallback(
        (i: number) => {
            if (count <= 0) return 0
            if (loop) return ((i % count) + count) % count
            return Math.max(0, Math.min(count - 1, i))
        },
        [loop, count]
    )

    const goTo = useCallback(
        (delta: 1 | -1) => {
            setCurrent((c) => {
                if (delta === 1) {
                    if (!loop && c >= count - 1) return c
                    pendingNavRef.current = 1
                    return loop ? (((c + 1) % count) + count) % count : c + 1
                }
                if (delta === -1) {
                    if (!loop && c <= 0) return c
                    pendingNavRef.current = -1
                    return loop ? (((c - 1) % count) + count) % count : c - 1
                }
                return c
            })
        },
        [loop, count]
    )

    const canPrev = loop ? count > 1 : current > 0
    const canNext = loop ? count > 1 : current < count - 1

    useLayoutEffect(() => {
        if (count <= 1 || prefersReducedMotion) return
        if (didInitialEntranceRef.current) return
        didInitialEntranceRef.current = true
        setEntrance({ kind: 'initial' })
    }, [count, prefersReducedMotion])

    useLayoutEffect(() => {
        if (prevCurrentRef.current === current) return

        const prev = prevCurrentRef.current
        const dir = pendingNavRef.current
        pendingNavRef.current = 0

        if (dir === 1) {
            const incoming = wrap(prev + 2)
            const oldRight = wrap(prev + 1)
            if (incoming !== prev && incoming !== oldRight) {
                setEntrance({ kind: 'nav', index: incoming, from: 'right' })
            } else {
                setEntrance(null)
            }
        } else if (dir === -1) {
            const incoming = wrap(prev - 2)
            const oldLeft = wrap(prev - 1)
            if (incoming !== prev && incoming !== oldLeft) {
                setEntrance({ kind: 'nav', index: incoming, from: 'left' })
            } else {
                setEntrance(null)
            }
        } else {
            setEntrance(null)
        }

        prevCurrentRef.current = current
    }, [current, wrap])

    useEffect(() => {
        if (!entrance) return
        const t = window.setTimeout(() => setEntrance(null), TRANSITION_MS + 40)
        return () => window.clearTimeout(t)
    }, [entrance])

    useEffect(() => {
        if (prefersReducedMotion) setEntrance(null)
    }, [prefersReducedMotion])

    const visibleCards = useMemo(() => {
        type Entry = { index: number; position: StackPosition }

        if (count <= 0) return []
        if (count === 1) return [{ index: 0, position: 0 as StackPosition }]

        const raw: Entry[] = []
        for (const offset of STACK_OFFSETS) {
            let index: number
            if (loop) {
                index = wrap(current + offset)
            } else {
                index = current + offset
                if (index < 0 || index >= count) continue
            }
            raw.push({ index, position: offset })
        }

        const best = new Map<number, Entry>()
        for (const item of raw) {
            const prev = best.get(item.index)
            if (
                !prev ||
                Math.abs(item.position) < Math.abs(prev.position) ||
                (Math.abs(item.position) === Math.abs(prev.position) && item.position < prev.position)
            ) {
                best.set(item.index, item)
            }
        }
        return Array.from(best.values()).sort((a, b) => a.position - b.position)
    }, [count, current, loop, wrap])

    useEffect(() => {
        const measure = () => {
            const stage = stageRef.current
            if (!stage) return
            const active = stage.querySelector<HTMLDivElement>('[data-card-stack-position="0"]')
            if (active) cardWidthRef.current = active.offsetWidth
        }
        measure()
        if (!stageRef.current) return
        const observer = new ResizeObserver(measure)
        observer.observe(stageRef.current)
        return () => observer.disconnect()
    }, [count, visibleCards.length])

    const onPointerDown = (e: React.PointerEvent) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return
        if (count <= 1) return
        const stageTarget = e.currentTarget as HTMLElement
        stageTarget.setPointerCapture(e.pointerId)
        activePointerRef.current = e.pointerId
        dragStartXRef.current = e.clientX
        hasMovedRef.current = false
        setIsDragging(true)
        setDragOffset(0)
    }

    const onPointerMove = (e: React.PointerEvent) => {
        if (activePointerRef.current !== e.pointerId) return
        const dx = e.clientX - dragStartXRef.current
        if (Math.abs(dx) > DRAG_CLICK_THRESHOLD_PX) hasMovedRef.current = true
        setDragOffset(dx)
    }

    const finishDrag = (clientX: number | null) => {
        const startedAt = dragStartXRef.current
        const movedX = clientX === null ? 0 : clientX - startedAt
        setIsDragging(false)
        setDragOffset(0)
        activePointerRef.current = null

        if (!hasMovedRef.current || clientX === null) return

        const cardWidth = cardWidthRef.current || 320
        const threshold = Math.max(ADVANCE_THRESHOLD_MIN_PX, cardWidth * ADVANCE_THRESHOLD_RATIO)
        if (movedX <= -threshold && canNext) goTo(1)
        else if (movedX >= threshold && canPrev) goTo(-1)
    }

    const onPointerUp = (e: React.PointerEvent) => {
        if (activePointerRef.current !== e.pointerId) return
        finishDrag(e.clientX)
    }

    const onPointerCancel = (e: React.PointerEvent) => {
        if (activePointerRef.current !== e.pointerId) return
        finishDrag(null)
    }

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            if (!canPrev) return
            e.preventDefault()
            goTo(-1)
        } else if (e.key === 'ArrowRight') {
            if (!canNext) return
            e.preventDefault()
            goTo(1)
        }
    }

    return (
        <div
            ref={containerRef}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label={ariaLabel}
            onKeyDown={onKeyDown}
            className={`@container relative bg-tan dark:bg-accent rounded border border-primary overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-yellow my-6 not-prose ${className}`}
        >
            <div
                className="text-center text-sm text-secondary pt-3 pb-5 select-none relative z-[60]"
                aria-live="polite"
            >
                {current + 1} of {count}
            </div>

            <div
                ref={stageRef}
                className="relative h-[285px] @md:h-[325px]"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerCancel}
                style={{ touchAction: 'pan-y' }}
            >
                {visibleCards.map(({ index, position }) => {
                    const cardWidth = cardWidthRef.current || 320
                    return (
                        <StackCardShell
                            key={index}
                            index={index}
                            position={position}
                            cardWidth={cardWidth}
                            dragOffset={dragOffset}
                            isDragging={isDragging}
                            prefersReducedMotion={prefersReducedMotion}
                            transitionEnabled={true}
                            entrance={entrance}
                            renderCard={renderCard}
                        />
                    )
                })}

                <button
                    type="button"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={() => goTo(-1)}
                    disabled={!canPrev}
                    aria-label="Previous slide"
                    className="absolute left-1 @md:left-2 top-1/2 -translate-y-1/2 z-[50] p-1 text-primary bg-transparent border-0 rounded-none shadow-none hover:opacity-70 disabled:opacity-25 disabled:cursor-not-allowed transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow"
                >
                    <IconChevronLeft className="size-8 @md:size-9" />
                </button>
                <button
                    type="button"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={() => goTo(1)}
                    disabled={!canNext}
                    aria-label="Next slide"
                    className="absolute right-1 @md:right-2 top-1/2 -translate-y-1/2 z-[50] p-1 text-primary bg-transparent border-0 rounded-none shadow-none hover:opacity-70 disabled:opacity-25 disabled:cursor-not-allowed transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow"
                >
                    <IconChevronRight className="size-8 @md:size-9" />
                </button>
            </div>
        </div>
    )
}

export default CardStackCarousel

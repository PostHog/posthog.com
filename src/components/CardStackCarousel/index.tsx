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
    /** When false, the "1 of 6" counter is read by screen readers only. Default true. */
    showCounter?: boolean
    /** When false, drops the tan background, border, rounding, and margin. Default true. */
    framed?: boolean
    /** 'sm' narrows the cards to 240px and shrinks the chevrons. Default 'md'. */
    size?: CardStackSize
    /** Replaces the stage height. The default suits `SignupQuoteCard`. */
    stageClassName?: string
    /** Shrinks the cards so the whole stack and both chevrons fit inside the container, and keeps the side cards visible at any width. Default false. */
    contained?: boolean
    /** From a 672px (`@2xl`) container width, shows the front card and both side cards side by side at full size. Default false. */
    row?: boolean
}

export type CardStackSize = 'sm' | 'md'

// With the side cards, the stack is about 1.72 card widths wide (INNER_TRANSLATE_RATIO and INNER_SCALE).
// `containedCard` keeps it under 58% of the container, less room for the chevrons.
const SIZE_CLASSES: Record<CardStackSize, { card: string; containedCard: string; chevron: string }> = {
    sm: { card: 'w-[min(90%,240px)]', containedCard: 'w-[min(calc(58%_-_2.25rem),240px)]', chevron: 'size-5' },
    md: {
        card: 'w-[min(90%,368px)]',
        containedCard: 'w-[min(calc(58%_-_3.25rem),368px)]',
        chevron: 'size-8 @md:size-9',
    },
}

const STACK_OFFSETS = [-1, 0, 1] as const
// A row also keeps a hidden card at each end, so cards slide out of view instead of disappearing.
const ROW_OFFSETS = [-2, -1, 0, 1, 2] as const
type StackPosition = (typeof ROW_OFFSETS)[number]

// Must match the `@2xl` container query in the row classes below.
const ROW_MIN_WIDTH_PX = 672
const ROW_WIDTH_CLASS = '@2xl:w-[calc((100%_-_7.5rem)/3)]'

type Layout = {
    baseX: number
    baseY: number
    scale: number
    rotate: number
    opacity: number
    zIndex: number
}

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
    if (Math.abs(position) === 2) {
        return { ...entryPose(position > 0 ? 'right' : 'left', w), zIndex: 10 }
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
    prefersReducedMotion,
    transitionEnabled,
    entrance,
    renderCard,
    widthClassName,
    alwaysShowSides,
    row,
    isRow,
}: {
    index: number
    position: StackPosition
    cardWidth: number
    prefersReducedMotion: boolean
    transitionEnabled: boolean
    entrance: Entrance | null
    renderCard: (index: number, meta: CardStackRenderMeta) => React.ReactNode
    widthClassName: string
    alwaysShowSides: boolean
    row: boolean
    isRow: boolean
}) {
    const enteringThis = isEnteringSide(entrance, index, position)
    const entryFrom = enteringThis && entrance ? entryPoseForEntrance(entrance, position) : null

    const settled = layoutForPosition(position, cardWidth)
    const entry = entryFrom ? entryPose(entryFrom, cardWidth) : settled

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
    const transitionStyle = !transitionEnabled || suppressTransition || prefersReducedMotion ? 'none' : TRANSITION

    const isSideCard = position !== 0
    const isActive = position === 0 || (isRow && Math.abs(position) === 1)

    // Side cards: CSS @container query controls visibility (opacity-0 → @lg:opacity-[0.75]).
    // @lg in @tailwindcss/container-queries = 32rem = 512px, which is where the stack layout fits.
    // `contained` cards are sized to fit at any width, so their side cards always show.
    // The inline `transition` already covers opacity, so the enter/exit animations play naturally.
    // Center card: opacity always 1 (or set via inline style during a transition).
    // The cards at the ends of a row stay hidden.
    const sideOpacityClass =
        Math.abs(position) === 2
            ? 'opacity-0'
            : isSideCard
            ? `${alwaysShowSides ? 'opacity-[0.75]' : 'opacity-0 @lg:opacity-[0.75]'} ${row ? '@2xl:opacity-100' : ''}`
            : ''

    const stackTransform = `translate(calc(-50% + ${pose.baseX}px), ${pose.baseY}px) scale(${pose.scale}) rotate(${pose.rotate}deg)`
    // In a row, each card is one card width plus a 1.25rem gap from the next, and the front card sits a little lower.
    const rowPosition = entryFrom && !useSettledLayout ? (entryFrom === 'right' ? 2 : -2) : position
    const rowTransform = `translate(calc(-50% + ${rowPosition} * (100% + 1.25rem)), ${
        rowPosition === 0 ? '0.75rem' : '0px'
    })`

    return (
        <div
            data-card-stack-position={position}
            aria-hidden={!isActive}
            className={`absolute top-0 left-1/2 ${widthClassName} pointer-events-none ${sideOpacityClass} ${
                row ? `${ROW_WIDTH_CLASS} [transform:var(--stack-transform)] @2xl:[transform:var(--row-transform)]` : ''
            }`}
            style={{
                zIndex: pose.zIndex,
                ...(row
                    ? ({
                          '--stack-transform': stackTransform,
                          '--row-transform': rowTransform,
                      } as React.CSSProperties)
                    : { transform: stackTransform }),
                transformOrigin: 'top center',
                // Side card opacity is controlled by CSS container query class above.
                // Only the center card needs an inline opacity (1).
                opacity: isSideCard ? undefined : pose.opacity,
                transition: transitionStyle,
            }}
        >
            <div className={`w-full select-none ${isActive ? 'pointer-events-auto' : ''}`}>
                {renderCard(index, { isActive })}
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
    showCounter = true,
    framed = true,
    size = 'md',
    stageClassName = 'h-[285px] @md:h-[325px]',
    contained = false,
    row = false,
}: CardStackCarouselProps) {
    const sizeClasses = SIZE_CLASSES[size]
    const stageRef = useRef<HTMLDivElement>(null)
    const cardWidthRef = useRef(0)
    const pendingNavRef = useRef<0 | 1 | -1>(0)
    const prevCurrentRef = useRef(0)
    const didInitialEntranceRef = useRef(false)

    const [current, setCurrent] = useState(0)
    const [entrance, setEntrance] = useState<Entrance | null>(null)
    const [isRow, setIsRow] = useState(false)
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
        for (const offset of row ? ROW_OFFSETS : STACK_OFFSETS) {
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
    }, [count, current, loop, wrap, row])

    useEffect(() => {
        const measure = () => {
            const stage = stageRef.current
            if (!stage) return
            const active = stage.querySelector<HTMLDivElement>('[data-card-stack-position="0"]')
            if (active) cardWidthRef.current = active.offsetWidth
            setIsRow(row && stage.offsetWidth >= ROW_MIN_WIDTH_PX)
        }
        measure()
        if (!stageRef.current) return
        const observer = new ResizeObserver(measure)
        observer.observe(stageRef.current)
        return () => observer.disconnect()
    }, [count, visibleCards.length, row])

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
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label={ariaLabel}
            onKeyDown={onKeyDown}
            className={`@container relative overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-yellow not-prose ${
                framed ? 'bg-tan dark:bg-accent rounded border border-primary my-6' : ''
            } ${className}`}
        >
            <div
                className={
                    showCounter ? 'text-center text-sm text-secondary pt-3 pb-5 select-none relative z-[60]' : 'sr-only'
                }
                aria-live="polite"
            >
                {current + 1} of {count}
            </div>

            <div ref={stageRef} className={`relative ${stageClassName}`}>
                {visibleCards.map(({ index, position }) => {
                    const cardWidth = cardWidthRef.current || 320
                    return (
                        <StackCardShell
                            key={index}
                            index={index}
                            position={position}
                            cardWidth={cardWidth}
                            prefersReducedMotion={prefersReducedMotion}
                            transitionEnabled={true}
                            entrance={entrance}
                            renderCard={renderCard}
                            widthClassName={contained ? sizeClasses.containedCard : sizeClasses.card}
                            alwaysShowSides={contained}
                            row={row}
                            isRow={isRow}
                        />
                    )
                })}

                <button
                    type="button"
                    onClick={() => goTo(-1)}
                    disabled={!canPrev}
                    aria-label="Previous slide"
                    className="absolute left-1 @md:left-2 top-1/2 -translate-y-1/2 z-[50] p-1 text-primary bg-transparent border-0 rounded-none shadow-none hover:opacity-70 disabled:opacity-25 disabled:cursor-not-allowed transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow"
                >
                    <IconChevronLeft className={sizeClasses.chevron} />
                </button>
                <button
                    type="button"
                    onClick={() => goTo(1)}
                    disabled={!canNext}
                    aria-label="Next slide"
                    className="absolute right-1 @md:right-2 top-1/2 -translate-y-1/2 z-[50] p-1 text-primary bg-transparent border-0 rounded-none shadow-none hover:opacity-70 disabled:opacity-25 disabled:cursor-not-allowed transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow"
                >
                    <IconChevronRight className={sizeClasses.chevron} />
                </button>
            </div>
        </div>
    )
}

export default CardStackCarousel

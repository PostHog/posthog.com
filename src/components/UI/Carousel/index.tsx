import React, { Children, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties, FocusEvent, ReactNode } from 'react'
import { IconArrowLeft, IconArrowRight, IconPauseFilled, IconPlayFilled } from '@posthog/icons'
import { IconButton } from '../Button'
import { FloatingIconButton } from '../FloatingButton'
import { focusRing, scrollbarHidden } from '../styles'
import { useId } from '../utils'
import { cn } from '../../../utils'
import './styles.css'

export type CarouselProps = {
    children: ReactNode
    label: string
    slidesPerView?: 1 | 2 | 3 | 4
    peek?: boolean
    autoplay?: number
    dots?: boolean
    arrows?: boolean
    className?: string
    slideClassName?: string
    onActiveIndexChange?: (index: number) => void
}

const MIN_AUTOPLAY_MS = 1000
const SLIDE_GAP = '1rem'
const PEEK_WIDTH = 'clamp(2rem, 10%, 5rem)'
const SETTLE_MS = 120

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

const slidesPerViewClasses = {
    1: '',
    2: '@lg/carousel:[--carousel-n:2]',
    3: '@lg/carousel:[--carousel-n:2] @3xl/carousel:[--carousel-n:3]',
    4: '@lg/carousel:[--carousel-n:2] @3xl/carousel:[--carousel-n:3] @5xl/carousel:[--carousel-n:4]',
}

const slideBasis =
    'calc((100% - var(--carousel-peek) - (var(--carousel-n) - 1 + var(--carousel-peek-gaps)) * var(--carousel-gap)) / var(--carousel-n))'

const sideArrow =
    'absolute top-1/2 z-[1] -translate-y-1/2 scale-90 opacity-0 transition-[opacity,transform,background-color] duration-300 ease-out group-hover/carousel:scale-100 group-hover/carousel:opacity-100 group-focus-within/carousel:scale-100 group-focus-within/carousel:opacity-100 [@media(hover:none)]:scale-100 [@media(hover:none)]:opacity-100'

const isKeyboardFocus = (event: FocusEvent<HTMLElement>): boolean => {
    try {
        return (event.target as HTMLElement).matches(':focus-visible')
    } catch {
        return true
    }
}

const wrapIndex = (value: number, count: number): number => ((value % count) + count) % count

const makeInert = (element: HTMLElement | null): void => {
    element?.setAttribute('inert', '')
}

export function Carousel({
    children,
    label,
    slidesPerView = 1,
    peek = false,
    autoplay = 0,
    dots = true,
    arrows = false,
    className,
    slideClassName,
    onActiveIndexChange,
}: CarouselProps): JSX.Element | null {
    const slides = Children.toArray(children)
    const count = slides.length
    const multiple = count > 1
    const id = useId()
    const root = useRef<HTMLDivElement>(null)
    const track = useRef<HTMLDivElement>(null)
    const rotationControl = useRef<HTMLElement>(null)
    const geometry = useRef({ start: 0, step: 0 })
    const position = useRef(0)
    const settleTimer = useRef<ReturnType<typeof setTimeout>>()
    const [cloned, setCloned] = useState(false)
    const [active, setActive] = useState(0)
    const [requested, setRequested] = useState(true)
    const [hovered, setHovered] = useState(false)
    const [focused, setFocused] = useState(false)
    const [visible, setVisible] = useState(false)
    const [hidden, setHidden] = useState(true)
    const [reduced, setReduced] = useState(true)
    const callback = useRef(onActiveIndexChange)
    callback.current = onActiveIndexChange
    const interval = Number.isFinite(autoplay) && autoplay > 0 ? Math.max(MIN_AUTOPLAY_MS, autoplay) : 0
    const peeking = peek && multiple
    const canAutoplay = interval > 0 && !reduced && multiple
    const autoplayOn = canAutoplay && requested
    const running = autoplayOn && !hovered && !focused && visible && !hidden

    const scrollToPosition = useCallback(
        (next: number, smooth: boolean) => {
            const viewport = track.current
            const { start, step } = geometry.current
            if (!viewport || !step) return
            position.current = next
            viewport.style.scrollBehavior = smooth && !reduced ? 'smooth' : 'auto'
            viewport.scrollTo({ left: start + next * step })
            if (!smooth || reduced) viewport.style.scrollBehavior = ''
        },
        [reduced]
    )

    const measure = useCallback(() => {
        const viewport = track.current
        if (!viewport || !multiple) return
        const items = viewport.children
        const first = items[0]?.getBoundingClientRect().left ?? 0
        const second = items[1]?.getBoundingClientRect().left ?? first
        const middle = items[cloned ? count : 0]?.getBoundingClientRect().left ?? first
        geometry.current = { start: middle - first, step: second - first }
    }, [cloned, count, multiple])

    const recenter = useCallback(() => {
        const viewport = track.current
        const { start, step } = geometry.current
        if (!viewport || !step || !cloned) return
        const raw = Math.round((viewport.scrollLeft - start) / step)
        if (raw < 0 || raw >= count) {
            const shifted = wrapIndex(raw, count)
            viewport.style.scrollBehavior = 'auto'
            viewport.scrollLeft = start + shifted * step
            viewport.style.scrollBehavior = ''
            position.current = shifted
        } else {
            position.current = raw
        }
    }, [cloned, count])

    useEffect(() => {
        if (multiple) setCloned(true)
    }, [multiple])

    useIsomorphicLayoutEffect(() => {
        if (!cloned) return
        measure()
        scrollToPosition(position.current, false)
    }, [cloned])

    useEffect(() => {
        const viewport = track.current
        if (!viewport || !cloned) return
        const observer = new ResizeObserver(() => {
            measure()
            scrollToPosition(position.current, false)
        })
        observer.observe(viewport)
        const onScrollEnd = () => recenter()
        viewport.addEventListener('scrollend', onScrollEnd)
        return () => {
            observer.disconnect()
            viewport.removeEventListener('scrollend', onScrollEnd)
        }
    }, [cloned, measure, recenter, scrollToPosition, slidesPerView, peek])

    useEffect(() => () => clearTimeout(settleTimer.current), [])

    useEffect(() => {
        const element = root.current
        if (!element) return
        const media = window.matchMedia('(prefers-reduced-motion: reduce)')
        const updateMotion = () => setReduced(media.matches)
        const updateVisibility = () => setHidden(document.hidden)
        updateMotion()
        updateVisibility()
        media.addEventListener('change', updateMotion)
        document.addEventListener('visibilitychange', updateVisibility)
        const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 })
        observer.observe(element)
        return () => {
            media.removeEventListener('change', updateMotion)
            document.removeEventListener('visibilitychange', updateVisibility)
            observer.disconnect()
        }
    }, [count > 0])

    useEffect(() => callback.current?.(active), [active])

    const onScroll = () => {
        const viewport = track.current
        const { start, step } = geometry.current
        if (!viewport || !step) return
        setActive(wrapIndex(Math.round((viewport.scrollLeft - start) / step), count))
        clearTimeout(settleTimer.current)
        if (!('onscrollend' in window)) settleTimer.current = setTimeout(recenter, SETTLE_MS)
    }

    const advance = (delta: number) => scrollToPosition(position.current + delta, true)

    const navigate = (delta: number) => {
        setRequested(false)
        advance(delta)
    }

    const goToSlide = (index: number) => {
        setRequested(false)
        advance(index - wrapIndex(position.current, count))
    }

    if (!count) return null

    const progress = autoplayOn && (
        <span
            key={`progress-${active}`}
            aria-hidden="true"
            className="ui-carousel-progress absolute inset-0 rounded-full bg-orange"
            style={{ animationDuration: `${interval}ms`, animationPlayState: running ? 'running' : 'paused' }}
            onAnimationEnd={() => advance(1)}
        />
    )

    const renderSlide = (slide: ReactNode, index: number, copy: 'before' | 'real' | 'after') => (
        <div
            key={`${copy}-${(slide as React.ReactElement)?.key ?? index}`}
            ref={copy === 'real' ? undefined : makeInert}
            role={copy === 'real' ? 'group' : undefined}
            aria-roledescription={copy === 'real' ? 'slide' : undefined}
            aria-label={copy === 'real' ? `${index + 1} of ${count}` : undefined}
            aria-hidden={copy === 'real' ? undefined : true}
            className={cn('min-w-0 grow-0 shrink-0 snap-start', slideClassName)}
            style={{ flexBasis: slideBasis }}
        >
            {slide}
        </div>
    )

    return (
        <div
            ref={root}
            role="region"
            aria-roledescription="carousel"
            aria-label={label}
            className={cn('group/carousel @container/carousel not-prose min-w-0 text-primary', className)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocusCapture={(event) => {
                if (event.target === rotationControl.current || !isKeyboardFocus(event)) return
                setFocused(true)
                setRequested(false)
            }}
            onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false)
            }}
        >
            <div className="relative">
                <div
                    id={id}
                    ref={track}
                    dir="ltr"
                    role="group"
                    tabIndex={0}
                    aria-label="Slides. Use the arrow keys to scroll."
                    data-peek={peeking || undefined}
                    className={cn(
                        'ui-carousel-track peer flex snap-x snap-mandatory gap-[var(--carousel-gap)] overflow-x-auto overscroll-x-contain pb-1 outline-none [--carousel-n:1]',
                        scrollbarHidden,
                        slidesPerViewClasses[slidesPerView]
                    )}
                    style={
                        {
                            '--carousel-gap': SLIDE_GAP,
                            '--carousel-peek': peeking ? PEEK_WIDTH : '0px',
                            '--carousel-peek-gaps': peeking ? 1 : 0,
                        } as CSSProperties
                    }
                    onScroll={onScroll}
                    onPointerDown={() => setRequested(false)}
                    onWheel={(event) => {
                        if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) setRequested(false)
                    }}
                    onKeyDown={(event) => {
                        if (event.target !== event.currentTarget) return
                        if (event.altKey || event.ctrlKey || event.metaKey) return
                        if (event.key === 'ArrowRight') navigate(1)
                        else if (event.key === 'ArrowLeft') navigate(-1)
                        else if (event.key === 'Home') goToSlide(0)
                        else if (event.key === 'End') goToSlide(count - 1)
                        else return
                        event.preventDefault()
                    }}
                >
                    {cloned && slides.map((slide, index) => renderSlide(slide, index, 'before'))}
                    {slides.map((slide, index) => renderSlide(slide, index, 'real'))}
                    {cloned && slides.map((slide, index) => renderSlide(slide, index, 'after'))}
                </div>
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-1 hidden rounded-md outline outline-2 outline-[rgb(var(--text-primary))] peer-focus-visible:block"
                />
                {multiple && arrows && (
                    <>
                        <FloatingIconButton
                            type="button"
                            aria-label="Previous slide"
                            aria-controls={id}
                            onClick={() => navigate(-1)}
                            icon={<IconArrowLeft />}
                            className={cn(sideArrow, 'left-2')}
                        />
                        <FloatingIconButton
                            type="button"
                            aria-label="Next slide"
                            aria-controls={id}
                            onClick={() => navigate(1)}
                            icon={<IconArrowRight />}
                            className={cn(sideArrow, 'right-2')}
                        />
                    </>
                )}
            </div>
            {multiple && (dots || canAutoplay) && (
                <div className={cn('relative mt-3 flex min-h-8 items-center justify-center', canAutoplay && 'px-9')}>
                    {dots ? (
                        <div role="group" aria-label="Choose a slide" className="flex max-w-full flex-wrap">
                            {slides.map((_, index) => {
                                const current = active === index
                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        aria-label={`Go to slide ${index + 1}`}
                                        aria-current={current ? 'true' : undefined}
                                        aria-controls={id}
                                        onClick={() => goToSlide(index)}
                                        className={cn(
                                            'group/dot flex h-8 items-center justify-center rounded-full px-1.5',
                                            focusRing
                                        )}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={cn(
                                                'relative block h-2 overflow-hidden rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                                                current
                                                    ? cn('w-7', autoplayOn ? 'bg-orange/25' : 'bg-orange')
                                                    : 'w-2 bg-[rgb(var(--text-primary)/0.22)] group-hover/dot:bg-[rgb(var(--text-primary)/0.45)]'
                                            )}
                                        >
                                            {current && progress}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    ) : (
                        progress && <span className="relative size-px overflow-hidden opacity-0">{progress}</span>
                    )}
                    {canAutoplay && (
                        <IconButton
                            appearance="flat"
                            ref={rotationControl}
                            type="button"
                            size="sm"
                            onClick={() => setRequested(!requested)}
                            aria-label={requested ? 'Pause automatic slides' : 'Play automatic slides'}
                            icon={requested ? <IconPauseFilled /> : <IconPlayFilled />}
                            className="absolute right-0"
                        />
                    )}
                </div>
            )}
            <div className="sr-only" aria-live={running ? 'off' : 'polite'} aria-atomic="true">
                Slide {active + 1} of {count}
            </div>
        </div>
    )
}

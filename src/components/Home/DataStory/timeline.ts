import { RefObject, useEffect, useMemo, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

const timelineNow = (): number => Number(document.timeline.currentTime ?? performance.now())

export interface LoopAnimation {
    ref: RefObject<HTMLElement>
    keyframes: Keyframe[]
}

const lastStopAtOrBefore = (stops: number[], position: number): number =>
    stops.reduce((latest, stop) => (stop <= position ? stop : latest), 0)

export function useEventClock(
    ref: RefObject<HTMLElement>,
    {
        loopMs,
        boundaries,
        restingMs,
        loopAnimations = [],
    }: { loopMs: number; boundaries: number[]; restingMs: number; loopAnimations?: LoopAnimation[] }
): number {
    const inView = useInView(ref, { amount: 0.35 })
    const shouldReduceMotion = useReducedMotion()
    const [elapsed, setElapsed] = useState(0)
    const position = useRef(0)
    const stops = useMemo(
        () =>
            [0, ...Array.from(new Set(boundaries.map(Math.round).filter((at) => at > 0 && at < loopMs)))].sort(
                (a, b) => a - b
            ),
        [boundaries, loopMs]
    )
    const playing = inView && !shouldReduceMotion

    useEffect(() => {
        if (!shouldReduceMotion) return
        const animations = loopAnimations.map(({ ref: element, keyframes }) => {
            const animation = element.current?.animate(keyframes, { duration: loopMs, fill: 'both' })
            if (animation) {
                animation.currentTime = restingMs
                animation.pause()
            }
            return animation
        })
        return () => animations.forEach((animation) => animation?.cancel())
    }, [shouldReduceMotion, loopAnimations, restingMs, loopMs])

    useEffect(() => {
        if (!playing) return
        const startedAt = timelineNow() - position.current
        const loopPosition = () => (timelineNow() - startedAt) % loopMs
        const animations = loopAnimations.map(({ ref: element, keyframes }) =>
            element.current?.animate(keyframes, {
                duration: loopMs,
                iterations: Infinity,
                iterationStart: position.current / loopMs,
            })
        )
        let timer: number

        const scheduleNextStop = () => {
            const now = loopPosition()
            const next = stops.find((stop) => stop > now) ?? loopMs
            timer = window.setTimeout(() => {
                setElapsed(lastStopAtOrBefore(stops, loopPosition()))
                scheduleNextStop()
            }, next - now)
        }

        scheduleNextStop()
        return () => {
            window.clearTimeout(timer)
            animations.forEach((animation) => animation?.pause())
            position.current = loopPosition()
        }
    }, [playing, stops, loopMs, loopAnimations])

    return shouldReduceMotion ? restingMs : elapsed
}

export function useLoopingAnimation<T extends HTMLElement>(
    keyframes: Keyframe[],
    { duration, easing }: { duration: number; easing: string }
): RefObject<T> {
    const ref = useRef<T>(null)
    useEffect(() => {
        const animation = ref.current?.animate(keyframes, { duration, easing, iterations: Infinity })
        return () => animation?.cancel()
    }, [keyframes, duration, easing])
    return ref
}

export const wordStream = (
    text: string,
    startAt: number,
    msPerChar: number
): { stops: number[]; textAt: (elapsed: number) => string } => {
    const wordEnds = Array.from(text.matchAll(/\S+/g), (match) => (match.index ?? 0) + match[0].length)
    const stops = wordEnds.map((end) => startAt + end * msPerChar)
    return {
        stops,
        textAt: (elapsed) => text.slice(0, wordEnds.filter((_, index) => stops[index] <= elapsed).slice(-1)[0] ?? 0),
    }
}

const PINNED_THRESHOLD_PX = 24
const USER_SCROLL_INTENT_MS = 1000
const USER_SCROLL_EVENTS = ['wheel', 'touchstart', 'pointerdown', 'keydown'] as const

export function useStickToBottom<T extends HTMLElement, C extends HTMLElement>(): {
    scrollRef: RefObject<T>
    contentRef: RefObject<C>
} {
    const scrollRef = useRef<T>(null)
    const contentRef = useRef<C>(null)
    useEffect(() => {
        const scroller = scrollRef.current
        const content = contentRef.current
        if (!scroller || !content) return
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        let pinned = true
        let userScrolledAt = -Infinity
        let height = content.offsetHeight
        const markUserScroll = () => {
            userScrolledAt = performance.now()
        }
        const updatePinned = () => {
            if (performance.now() - userScrolledAt > USER_SCROLL_INTENT_MS) return
            pinned = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight < PINNED_THRESHOLD_PX
        }
        const follow = () => {
            const shrank = content.offsetHeight < height
            height = content.offsetHeight
            if (shrank) pinned = true
            if (!pinned) return
            scroller.scrollTo({ top: scroller.scrollHeight, behavior: reduceMotion || shrank ? 'auto' : 'smooth' })
        }
        scroller.scrollTop = scroller.scrollHeight
        const observer = new ResizeObserver(follow)
        observer.observe(content)
        USER_SCROLL_EVENTS.forEach((event) => scroller.addEventListener(event, markUserScroll, { passive: true }))
        scroller.addEventListener('scroll', updatePinned, { passive: true })
        return () => {
            observer.disconnect()
            USER_SCROLL_EVENTS.forEach((event) => scroller.removeEventListener(event, markUserScroll))
            scroller.removeEventListener('scroll', updatePinned)
        }
    }, [])
    return { scrollRef, contentRef }
}

type Length = number | string

const toLength = (value: Length): string => (typeof value === 'number' ? `${value}px` : value)

export const transform = ({
    x = 0,
    y = 0,
    scale = 1,
    rotate = 0,
}: { x?: Length; y?: Length; scale?: number; rotate?: number } = {}): string =>
    `translate(${toLength(x)}, ${toLength(y)}) scale(${scale}) rotate(${rotate}deg)`

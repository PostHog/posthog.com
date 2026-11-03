import { RefObject, useEffect, useMemo, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

const timelineNow = (): number => Number(document.timeline.currentTime ?? performance.now())

const lastStopAtOrBefore = (stops: number[], position: number): number =>
    stops.reduce((latest, stop) => (stop <= position ? stop : latest), 0)

const usePageVisible = (): boolean => {
    const [visible, setVisible] = useState(true)
    useEffect(() => {
        const update = () => setVisible(document.visibilityState === 'visible')
        update()
        document.addEventListener('visibilitychange', update)
        return () => document.removeEventListener('visibilitychange', update)
    }, [])
    return visible
}

export function useEventClock(
    ref: RefObject<HTMLElement>,
    {
        loopMs,
        boundaries,
        restingMs,
        loop = true,
    }: { loopMs: number; boundaries: number[]; restingMs: number; loop?: boolean }
): number {
    const inView = useInView(ref, { amount: 0.35 })
    const pageVisible = usePageVisible()
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
    const playing = inView && pageVisible && !shouldReduceMotion

    useEffect(() => {
        if (!playing) return
        const startedAt = timelineNow() - position.current
        const clockPosition = () => {
            const raw = timelineNow() - startedAt
            return loop ? raw % loopMs : Math.min(raw, loopMs)
        }
        let timer: number

        const scheduleNextStop = () => {
            const now = clockPosition()
            if (!loop && now >= loopMs) {
                position.current = loopMs
                setElapsed(lastStopAtOrBefore(stops, loopMs))
                return
            }
            const next = stops.find((stop) => stop > now) ?? loopMs
            timer = window.setTimeout(() => {
                setElapsed(lastStopAtOrBefore(stops, clockPosition()))
                scheduleNextStop()
            }, next - now)
        }

        scheduleNextStop()
        return () => {
            window.clearTimeout(timer)
            position.current = Math.min(clockPosition(), loopMs)
        }
    }, [playing, stops, loopMs, loop])

    return shouldReduceMotion ? restingMs : elapsed
}

export function useLoopingAnimation<T extends HTMLElement>(
    keyframes: Keyframe[],
    { duration, easing }: { duration: number; easing: string }
): RefObject<T> {
    const ref = useRef<T>(null)
    const inView = useInView(ref)
    const shouldReduceMotion = useReducedMotion()
    const playing = inView && !shouldReduceMotion
    useEffect(() => {
        if (!playing) return
        const animation = ref.current?.animate(keyframes, { duration, easing, iterations: Infinity })
        return () => animation?.cancel()
    }, [keyframes, duration, easing, playing])
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

export function useRandomInterval(
    callback: () => void,
    { minMs, maxMs, active }: { minMs: number; maxMs: number; active: boolean }
): void {
    const latest = useRef(callback)
    latest.current = callback
    useEffect(() => {
        if (!active) return
        let timer: number
        const schedule = () => {
            timer = window.setTimeout(() => {
                if (document.visibilityState === 'visible') latest.current()
                schedule()
            }, minMs + Math.random() * (maxMs - minMs))
        }
        schedule()
        return () => window.clearTimeout(timer)
    }, [minMs, maxMs, active])
}

export const IOS_SPRING = { type: 'spring', stiffness: 380, damping: 32, mass: 0.9 } as const

export const ticks = (from: number, to: number, stepMs: number): number[] =>
    Array.from({ length: Math.floor((to - from) / stepMs) }, (_, tick) => from + (tick + 1) * stepMs)

export const transform = ({
    x = 0,
    y = 0,
    scale = 1,
    rotate = 0,
}: { x?: number; y?: number; scale?: number; rotate?: number } = {}): string =>
    `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`

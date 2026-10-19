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

const GLIDE_MS = 450
const GLIDE_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)'

export function useGlideOnResize<T extends HTMLElement>(enabled: boolean): RefObject<T> {
    const ref = useRef<T>(null)
    useEffect(() => {
        const element = ref.current
        if (!enabled || !element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        let height = element.offsetHeight
        let glide: Animation | undefined
        const observer = new ResizeObserver(() => {
            const changedBy = element.offsetHeight - height
            height = element.offsetHeight
            if (changedBy === 0) return
            const remainingOffset = glide ? new DOMMatrix(getComputedStyle(element).transform).f : 0
            glide?.cancel()
            glide = element.animate(
                [{ transform: `translateY(${changedBy + remainingOffset}px)` }, { transform: 'translateY(0)' }],
                { duration: GLIDE_MS, easing: GLIDE_EASING }
            )
        })
        observer.observe(element)
        return () => {
            observer.disconnect()
            glide?.cancel()
        }
    }, [enabled])
    return ref
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

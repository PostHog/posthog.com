import { RefObject, useEffect, useMemo, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

const timelineNow = (): number => Number(document.timeline.currentTime ?? performance.now())

const PROGRESS_KEYFRAMES: Keyframe[] = [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }]

const lastStopAtOrBefore = (stops: number[], position: number): number =>
    stops.reduce((latest, stop) => (stop <= position ? stop : latest), 0)

export function useEventClock(
    ref: RefObject<HTMLElement>,
    { loopMs, boundaries, restingMs }: { loopMs: number; boundaries: number[]; restingMs: number }
): { elapsed: number; progressRef: RefObject<HTMLDivElement> } {
    const inView = useInView(ref, { amount: 0.35 })
    const shouldReduceMotion = useReducedMotion()
    const [elapsed, setElapsed] = useState(0)
    const position = useRef(0)
    const progressRef = useRef<HTMLDivElement>(null)
    const progressAnimation = useRef<Animation>()
    const stops = useMemo(
        () =>
            [0, ...Array.from(new Set(boundaries.map(Math.round).filter((at) => at > 0 && at < loopMs)))].sort(
                (a, b) => a - b
            ),
        [boundaries, loopMs]
    )
    const playing = inView && !shouldReduceMotion

    useEffect(() => {
        if (shouldReduceMotion && progressRef.current) {
            progressRef.current.style.transform = `scaleX(${restingMs / loopMs})`
        }
    }, [shouldReduceMotion, restingMs, loopMs])

    useEffect(() => {
        if (!playing) return
        const startedAt = timelineNow() - position.current
        progressAnimation.current?.cancel()
        progressAnimation.current = progressRef.current?.animate(PROGRESS_KEYFRAMES, {
            duration: loopMs,
            iterations: Infinity,
            iterationStart: position.current / loopMs,
        })
        const loopPosition = () => (timelineNow() - startedAt) % loopMs
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
            progressAnimation.current?.pause()
            position.current = loopPosition()
        }
    }, [playing, stops, loopMs])

    return { elapsed: shouldReduceMotion ? restingMs : elapsed, progressRef }
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

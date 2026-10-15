import React, { RefObject, useEffect } from 'react'

export interface Spring {
    stiffness: number
    damping: number
    mass?: number
}

export interface Frame {
    at: number
    style: string
    ease?: string
}

const SPRING_STEP_S = 1 / 240
const SPRING_MAX_S = 3
const SPRING_REST_DISTANCE = 0.001
const SPRING_REST_VELOCITY = 0.01
const SPRING_EASING_POINTS = 48

export const EASE_OUT_QUINT = 'cubic-bezier(0.22, 1, 0.36, 1)'

export const springEasing = ({ stiffness, damping, mass = 1 }: Spring): { easing: string; durationMs: number } => {
    const samples = [0]
    let position = 0
    let velocity = 0
    let seconds = 0
    while (seconds < SPRING_MAX_S) {
        velocity += ((-stiffness * (position - 1) - damping * velocity) / mass) * SPRING_STEP_S
        position += velocity * SPRING_STEP_S
        seconds += SPRING_STEP_S
        samples.push(position)
        if (Math.abs(1 - position) < SPRING_REST_DISTANCE && Math.abs(velocity) < SPRING_REST_VELOCITY) break
    }
    samples[samples.length - 1] = 1
    const points = Array.from({ length: SPRING_EASING_POINTS + 1 }, (_, index) => {
        const exact = (index / SPRING_EASING_POINTS) * (samples.length - 1)
        const below = Math.floor(exact)
        const above = Math.min(samples.length - 1, below + 1)
        return +(samples[below] + (samples[above] - samples[below]) * (exact - below)).toFixed(4)
    })
    return { easing: `linear(${points.join(', ')})`, durationMs: Math.round(seconds * 1000) }
}

export const springFrames = (at: number, from: string, to: string, spring: Spring): Frame[] => {
    const { easing, durationMs } = springEasing(spring)
    return [
        { at, style: from, ease: easing },
        { at: at + durationMs, style: to },
    ]
}

export const easeFrames = (
    at: number,
    durationMs: number,
    from: string,
    to: string,
    ease = EASE_OUT_QUINT
): Frame[] => [
    { at, style: from, ease },
    { at: at + durationMs, style: to },
]

export const pressSequence = (
    ats: number[],
    rest: string,
    pressed: string | ((at: number) => string),
    downMs: number,
    release: Spring
): Frame[] => {
    const { easing, durationMs } = springEasing(release)
    return ats.flatMap((at, index) => {
        const releaseMs = Math.min(durationMs, (ats[index + 1] ?? Infinity) - at - downMs)
        return [
            { at, style: rest, ease: 'ease-out' },
            {
                at: at + downMs,
                style: typeof pressed === 'function' ? pressed(at) : pressed,
                ease: releaseMs === durationMs ? easing : 'ease-out',
            },
            { at: at + downMs + releaseMs, style: rest },
        ]
    })
}

export const windowFrames = ({
    from,
    to,
    hidden,
    shown,
    exit = hidden,
    enterMs = 300,
    exitMs = 300,
    enterSpring,
}: {
    from: number
    to: number
    hidden: string
    shown: string
    exit?: string
    enterMs?: number
    exitMs?: number
    enterSpring?: Spring
}): Frame[] => [
    { at: 0, style: hidden },
    ...(enterSpring ? springFrames(from, hidden, shown, enterSpring) : easeFrames(from, enterMs, hidden, shown)),
    ...easeFrames(to, exitMs, shown, exit),
]

export const hiddenUntil = (at: number, style: string): Frame[] => [
    { at: 0, style },
    { at: at - 1, style },
]

export const instantFrames = (at: number, from: string, to: string): Frame[] => [
    { at, style: from },
    { at: at + 1, style: to },
]

const percent = (ms: number, loopMs: number): string =>
    `${+((Math.min(Math.max(ms, 0), loopMs) / loopMs) * 100).toFixed(3)}%`

export const keyframes = (name: string, loopMs: number, frames: Frame[]): string => {
    const sorted = [...frames].sort((a, b) => a.at - b.at)
    const first = sorted[0]
    const last = sorted[sorted.length - 1]
    const filled = [
        ...(first.at > 0 ? [{ at: 0, style: first.style }] : []),
        ...sorted,
        ...(last.at < loopMs ? [{ at: loopMs, style: last.style }] : []),
    ]
    const rules = filled
        .map(
            ({ at, style, ease }) =>
                `${percent(at, loopMs)}{${style}${ease ? `;animation-timing-function:${ease}` : ''}}`
        )
        .join('')
    return `@keyframes ${name}{${rules}}`
}

export const timelineStyle = (name: string): React.CSSProperties => ({ animationName: name })

export const timelineRootStyle = (loopMs: number, restingMs: number): React.CSSProperties =>
    ({ '--loop': `${loopMs}ms`, '--resting': `${restingMs}ms` } as React.CSSProperties)

export function useTimelinePlayback(ref: RefObject<HTMLElement>, threshold = 0.35): void {
    useEffect(() => {
        const element = ref.current
        if (!element) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                element.dataset.playing = String(entry.isIntersecting)
                if (entry.isIntersecting) element.dataset.seen = 'true'
            },
            { threshold }
        )
        observer.observe(element)
        return () => observer.disconnect()
    }, [ref, threshold])
}

import React, { useEffect, useMemo, useState } from 'react'
import { useId, usePrefersReducedMotion } from 'components/UI/utils'

const REEL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
const DIGIT_EM = 1.25
const FASTEST_DIGIT_SECONDS = 0.04
const CONTINUOUS_BELOW_SECONDS = 0.25
const LONGEST_ROLL_SECONDS = 1.2
const RECHECK_MS = 1000

type Reel = { place: number; cycle: number; delay: number; frames: string; easing: string }

function countPlaces(value: number): number {
    return Math.max(1, Math.floor(value).toString().length)
}

function reelFrames(rollShare: number): string {
    const frames = REEL.slice(0, 10).map((digit) => {
        const start = digit * 10
        const holdEnd = (digit + 1 - rollShare) * 10
        const offset = `transform:translateY(${-digit * DIGIT_EM}em)`
        return `${start}%{${offset}}${holdEnd}%{${offset}}`
    })
    return `${frames.join('')}100%{transform:translateY(${-10 * DIGIT_EM}em)}`
}

function buildReels(value: number, places: number, rate: number): Reel[] {
    return Array.from({ length: places }, (_, place) => {
        const digitSeconds = Math.max(FASTEST_DIGIT_SECONDS, 10 ** place / rate)
        const continuous = digitSeconds < CONTINUOUS_BELOW_SECONDS
        const rollSeconds = continuous ? digitSeconds : Math.min(digitSeconds / 2, LONGEST_ROLL_SECONDS)
        const cycle = digitSeconds * 10
        const phase = (value / 10 ** (place + 1)) % 1
        return {
            place,
            cycle,
            delay: -phase * cycle,
            frames: reelFrames(rollSeconds / digitSeconds),
            easing: continuous ? 'linear' : 'ease-in-out',
        }
    })
}

function useOdometerValues(read: () => number, reduced: boolean): { start: number | null; current: number | null } {
    const [start, setStart] = useState<number | null>(null)
    const [current, setCurrent] = useState<number | null>(null)
    useEffect(() => {
        let places = 0
        const check = () => {
            const value = read()
            setCurrent(value)
            if (reduced || countPlaces(value) !== places) {
                places = countPlaces(value)
                setStart(value)
            }
        }
        check()
        const id = window.setInterval(check, RECHECK_MS)
        return () => window.clearInterval(id)
    }, [read, reduced])
    return { start, current }
}

export default function Odometer({
    read,
    rate,
    className = '',
}: {
    read: () => number
    rate: number
    className?: string
}): JSX.Element {
    const reduced = usePrefersReducedMotion()
    const { start, current } = useOdometerValues(read, reduced)
    const name = `odometer-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
    const reels = useMemo(
        () => (start === null ? [] : buildReels(start, countPlaces(start), rate).reverse()),
        [start, rate]
    )

    if (start === null) {
        return <span className={className}>…</span>
    }

    if (reduced) {
        return <span className={`tabular-nums ${className}`}>{Math.floor(start).toLocaleString('en-US')}</span>
    }

    return (
        <span key={start} className={`inline-flex ${className}`}>
            <span className="sr-only">About {Math.floor(current ?? start).toLocaleString('en-US')}</span>
            <span aria-hidden className="inline-flex">
                <style>{reels.map((reel) => `@keyframes ${name}-${reel.place}{${reel.frames}}`).join('')}</style>
                {reels.map((reel) => (
                    <React.Fragment key={reel.place}>
                        <span className="inline-block h-[1.25em] overflow-hidden leading-[1.25em]">
                            <span
                                className="flex flex-col will-change-transform"
                                style={{
                                    animation: `${name}-${reel.place} ${reel.cycle}s ${reel.easing} ${reel.delay}s infinite`,
                                }}
                            >
                                {REEL.map((digit, slot) => (
                                    <span key={slot} className="block h-[1.25em]">
                                        {digit}
                                    </span>
                                ))}
                            </span>
                        </span>
                        {reel.place > 0 && reel.place % 3 === 0 && <span className="leading-[1.25em]">,</span>}
                    </React.Fragment>
                ))}
            </span>
        </span>
    )
}

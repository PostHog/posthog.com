import React, { useEffect, useState } from 'react'
import { colors } from '@posthog/brand/colors'

type Segment = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g'

const SEGMENT_POINTS: Record<Segment, string> = {
    a: '1.8,0.6 10.2,0.6 8.8,2 3.2,2',
    b: '11.4,1.8 11.4,8.8 10.7,9.4 10,8.6 10,3.2',
    c: '10,11.4 10.7,10.6 11.4,11.2 11.4,18.2 10,16.8',
    d: '3.2,18 8.8,18 10.2,19.4 1.8,19.4',
    e: '0.6,11.2 1.3,10.6 2,11.4 2,16.8 0.6,18.2',
    f: '0.6,1.8 2,3.2 2,8.6 1.3,9.4 0.6,8.8',
    g: '2.2,10 3.4,9.2 8.6,9.2 9.8,10 8.6,10.8 3.4,10.8',
}

const LIT_SEGMENTS: Record<string, Segment[]> = {
    '0': ['a', 'b', 'c', 'd', 'e', 'f'],
    '1': ['b', 'c'],
    '2': ['a', 'b', 'g', 'e', 'd'],
    '3': ['a', 'b', 'g', 'c', 'd'],
    '4': ['f', 'g', 'b', 'c'],
    '5': ['a', 'f', 'g', 'c', 'd'],
    '6': ['a', 'f', 'g', 'e', 'd', 'c'],
    '7': ['a', 'b', 'c'],
    '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    '9': ['a', 'b', 'c', 'd', 'f', 'g'],
    '-': ['g'],
}

const SEGMENTS = Object.keys(SEGMENT_POINTS) as Segment[]

function Digit({ value }: { value: string }): JSX.Element {
    const lit = LIT_SEGMENTS[value] || []
    return (
        <svg viewBox="0 0 12 20" className="h-full w-auto" aria-hidden="true">
            {SEGMENTS.map((segment) => (
                <polygon
                    key={segment}
                    points={SEGMENT_POINTS[segment]}
                    fill="currentColor"
                    opacity={lit.includes(segment) ? 1 : 0.12}
                />
            ))}
        </svg>
    )
}

function DigitRun({ value }: { value: string }): JSX.Element {
    return (
        <div
            className="flex gap-0.5 -skew-x-6"
            style={{
                height: 'clamp(68px, 25.5cqw, 84px)',
                filter: `drop-shadow(0 0 4px ${colors.green.core})`,
            }}
        >
            {value.split('').map((char, i) => (
                <Digit key={i} value={char} />
            ))}
        </div>
    )
}

function Rivet({ className }: { className: string }): JSX.Element {
    return (
        <span
            className={`absolute size-2.5 rounded-full border border-black/50 bg-light-5 shadow-[inset_1px_1px_0_white,1px_1px_0_rgba(0,0,0,0.35)] ${className}`}
            aria-hidden="true"
        />
    )
}

const pad = (value: number, length = 2) => String(value).padStart(length, '0')
const constructionStripe = `repeating-linear-gradient(65deg, black 0 12px, ${colors.yellow.core} 12px 24px)`

export default function FactorySign({ since }: { since: string }): JSX.Element {
    const [days, setDays] = useState<number | null>(null)

    useEffect(() => {
        const sinceTime = new Date(since).getTime()
        const dayInMilliseconds = 86_400_000
        let timeout: ReturnType<typeof setTimeout>

        const updateDays = () => {
            const currentDays = Math.max(0, Math.floor((Date.now() - sinceTime) / dayInMilliseconds))
            setDays(currentDays)
            const nextDay = sinceTime + (currentDays + 1) * dayInMilliseconds
            timeout = setTimeout(updateDays, Math.max(1, nextDay - Date.now()))
        }

        updateDays()
        return () => clearTimeout(timeout)
    }, [since])

    return (
        <div className="@container size-full overflow-y-auto">
            <div
                className="relative grid h-full min-h-[400px] overflow-hidden border-2 border-black bg-white font-rounded font-extrabold uppercase leading-none text-black shadow-sm"
                style={{ gridTemplateRows: '9% 44% 22% 25%' }}
            >
                <div style={{ backgroundImage: constructionStripe }} />
                <div
                    className="flex min-h-0 flex-col justify-evenly px-4 text-white"
                    style={{ backgroundColor: colors.tangerine.core }}
                >
                    <div className="whitespace-nowrap text-[clamp(30px,12cqw,40px)] leading-none tracking-[-0.05em]">
                        It has been
                    </div>
                    <div
                        role="timer"
                        aria-label={
                            days === null ? 'Days since a human-coded PR' : `${days} days since a human-coded PR`
                        }
                        className="flex items-end gap-2"
                    >
                        <div
                            className="flex min-w-0 flex-1 items-center justify-center rounded-sm border-2 border-light-12 bg-black px-1 py-1.5 shadow-[inset_0_2px_6px_theme(colors.black)]"
                            style={{ color: colors.green.core }}
                        >
                            <DigitRun value={days === null ? '---' : pad(days, 3)} />
                        </div>
                        <span className="pb-1 text-[clamp(35px,14cqw,48px)] tracking-[-0.05em]">Days</span>
                    </div>
                </div>
                <p
                    className="m-0 flex min-h-0 flex-col justify-center px-4 text-left text-[clamp(24px,9cqw,34px)] tracking-[-0.05em]"
                    style={{ lineHeight: 1.12 }}
                >
                    <span>Since a</span>
                    <span className="whitespace-nowrap">human-coded PR</span>
                </p>
                <div
                    className="flex min-h-0 flex-col justify-center px-6 text-left text-[clamp(20px,7cqw,26px)] tracking-[-0.05em]"
                    style={{ backgroundColor: colors.yellow.core, lineHeight: 1.12 }}
                >
                    <span className="whitespace-nowrap">Shipped in the PostHog</span>
                    <span>software factory</span>
                </div>
                <Rivet className="left-2 top-2" />
                <Rivet className="right-2 top-2" />
                <Rivet className="bottom-2 left-2" />
                <Rivet className="bottom-2 right-2" />
            </div>
        </div>
    )
}

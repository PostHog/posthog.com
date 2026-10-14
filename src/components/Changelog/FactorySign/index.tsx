import React, { useEffect, useState } from 'react'

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

function TickerGroup({ value, label }: { value: string; label: string }): JSX.Element {
    return (
        <div className="flex flex-col items-center gap-1">
            <div className="flex h-7 gap-0.5 -skew-x-6 drop-shadow-[0_0_4px_theme(colors.green-2)] @md:h-10 @xl:h-12">
                {value.split('').map((char, i) => (
                    <Digit key={i} value={char} />
                ))}
            </div>
            <span className="text-[8px] font-bold leading-none tracking-widest text-green-2/70 @md:text-[10px]">
                {label}
            </span>
        </div>
    )
}

function Rivet({ className }: { className: string }): JSX.Element {
    return (
        <span
            className={`absolute size-1.5 rounded-full border border-light-9 bg-light-5 @md:size-2 ${className}`}
            aria-hidden="true"
        />
    )
}

function TickerColon(): JSX.Element {
    return (
        <div
            className="flex h-7 flex-col justify-center gap-1.5 @md:h-10 @md:gap-2.5 @xl:h-12 @xl:gap-3"
            aria-hidden="true"
        >
            <span className="size-1 rounded-full bg-green-2 @md:size-1.5" />
            <span className="size-1 rounded-full bg-green-2 @md:size-1.5" />
        </div>
    )
}

const pad = (value: number, length = 2) => String(value).padStart(length, '0')

export default function FactorySign({ since }: { since: string }): JSX.Element {
    const [now, setNow] = useState<number | null>(null)

    useEffect(() => {
        setNow(Date.now())
        const interval = setInterval(() => setNow(Date.now()), 1000)
        return () => clearInterval(interval)
    }, [])

    const elapsed = now === null ? null : Math.max(0, Math.floor((now - new Date(since).getTime()) / 1000))
    const days = elapsed === null ? null : Math.floor(elapsed / 86400)
    const hours = elapsed === null ? null : Math.floor((elapsed % 86400) / 3600)
    const minutes = elapsed === null ? null : Math.floor((elapsed % 3600) / 60)
    const seconds = elapsed === null ? null : elapsed % 60

    return (
        <div className="@container w-full max-w-xl">
            <div className="relative overflow-hidden rounded border-2 border-black font-black uppercase leading-none text-black shadow-xl">
                <div className="h-3 bg-[repeating-linear-gradient(-45deg,theme(colors.black)_0_8px,theme(colors.yellow)_8px_16px)] @md:h-4" />
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 bg-red px-3 py-3 text-white @md:px-5">
                    <span className="text-xl tracking-tight @md:text-3xl @xl:text-4xl">It has been</span>
                    <div
                        role="timer"
                        className="flex items-start gap-1 rounded-sm border-2 border-light-12 bg-black px-2 pb-1.5 pt-2 text-green-2 shadow-[inset_0_2px_6px_theme(colors.black)] @md:gap-1.5 @md:px-3"
                    >
                        <TickerGroup value={days === null ? '---' : pad(days, 3)} label="Days" />
                        <TickerColon />
                        <TickerGroup value={hours === null ? '--' : pad(hours)} label="Hrs" />
                        <TickerColon />
                        <TickerGroup value={minutes === null ? '--' : pad(minutes)} label="Min" />
                        <TickerColon />
                        <TickerGroup value={seconds === null ? '--' : pad(seconds)} label="Sec" />
                        {elapsed !== null && (
                            <span className="sr-only">
                                {days} days, {hours} hours, {minutes} minutes and {seconds} seconds
                            </span>
                        )}
                    </div>
                </div>
                <p className="m-0 bg-white px-3 py-2.5 text-center text-2xl tracking-tight @md:text-4xl @xl:text-5xl">
                    Since a hand-crafted feature
                </p>
                <Rivet className="left-1.5 top-5 @md:top-6" />
                <Rivet className="right-1.5 top-5 @md:top-6" />
                <Rivet className="bottom-1.5 left-1.5" />
                <Rivet className="bottom-1.5 right-1.5" />
                <p className="m-0 bg-yellow px-3 py-2 text-center text-sm tracking-tight @md:text-lg @xl:text-xl">
                    shipped in the PostHog software factory
                </p>
            </div>
        </div>
    )
}

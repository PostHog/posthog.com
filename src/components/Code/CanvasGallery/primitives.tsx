import React, { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from 'components/Code/usePrefersReducedMotion'

// Deterministic pseudo-random numbers so SSR and hydration agree on every dummy value.
export function seeded(seed: number): () => number {
    let t = seed >>> 0
    return () => {
        t += 0x6d2b79f5
        let r = Math.imul(t ^ (t >>> 15), 1 | t)
        r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296
    }
}

export function series(seed: number, length: number, base: number, wobble: number, drift = 0): number[] {
    const rand = seeded(seed)
    return Array.from({ length }, (_, i) => Math.max(0, Math.round(base + drift * i + (rand() - 0.5) * wobble)))
}

// Increments every `ms`. Stays at 0 on the server and for people who prefer reduced motion.
export function useTick(ms: number, paused = false): number {
    const reducedMotion = usePrefersReducedMotion()
    const [tick, setTick] = useState(0)
    useEffect(() => {
        if (reducedMotion || paused) return
        const id = window.setInterval(() => setTick((t) => t + 1), ms)
        return () => window.clearInterval(id)
    }, [ms, reducedMotion, paused])
    return tick
}

export function formatNumber(n: number): string {
    return n.toLocaleString('en-US')
}

export function formatCompact(n: number): string {
    if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
    if (Math.abs(n) >= 1_000) return `${(n / 1_000).toFixed(1)}k`
    return `${n}`
}

// Single-series line. No legend: the title names the series.
export function Sparkline({
    data,
    className = 'text-blue',
    height = 40,
    strokeWidth = 2,
    fill = true,
    highlightIndex,
}: {
    data: number[]
    className?: string
    height?: number
    strokeWidth?: number
    fill?: boolean
    highlightIndex?: number
}): JSX.Element {
    const width = 100
    const max = Math.max(...data, 1)
    const min = Math.min(...data, 0)
    const range = max - min || 1
    const points = data.map((d, i) => {
        const x = (i / Math.max(data.length - 1, 1)) * width
        const y = height - ((d - min) / range) * (height - 4) - 2
        return [x, y]
    })
    const path = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            className={`w-full ${className}`}
            style={{ height }}
            aria-hidden
        >
            {fill && (
                <path
                    d={`${path} L${width},${height} L0,${height} Z`}
                    fill="currentColor"
                    opacity={0.12}
                    stroke="none"
                />
            )}
            <path
                d={path}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                vectorEffect="non-scaling-stroke"
                strokeLinejoin="round"
            />
            {highlightIndex !== undefined && points[highlightIndex] && (
                <circle
                    cx={points[highlightIndex][0]}
                    cy={points[highlightIndex][1]}
                    r={3}
                    fill="currentColor"
                    className="text-red"
                    stroke="white"
                    strokeWidth={1.5}
                    vectorEffect="non-scaling-stroke"
                />
            )}
        </svg>
    )
}

export function Bars({
    data,
    className = 'text-blue',
    height = 40,
    highlightIndex,
}: {
    data: number[]
    className?: string
    height?: number
    highlightIndex?: number
}): JSX.Element {
    const max = Math.max(...data, 1)
    return (
        <div className={`flex items-end gap-px w-full ${className}`} style={{ height }} aria-hidden>
            {data.map((d, i) => (
                <div
                    key={i}
                    className={`flex-1 rounded-t-[2px] ${i === highlightIndex ? 'bg-red' : 'bg-current'}`}
                    style={{ height: `${Math.max(4, (d / max) * 100)}%`, opacity: i === highlightIndex ? 1 : 0.85 }}
                />
            ))}
        </div>
    )
}

// Headline number with a delta. Text stays in text tokens; only the delta arrow carries status color.
export function Stat({
    label,
    value,
    delta,
    good,
    unit,
}: {
    label: string
    value: string
    delta?: number
    good?: boolean
    unit?: string
}): JSX.Element {
    const up = (delta ?? 0) >= 0
    const isGood = good ?? up
    return (
        <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-wide text-muted truncate">{label}</div>
            <div className="flex items-baseline gap-1.5 flex-wrap">
                <span className="text-xl @sm:text-2xl font-bold text-primary tabular-nums leading-none">{value}</span>
                {unit && <span className="text-xs text-secondary">{unit}</span>}
                {delta !== undefined && (
                    <span
                        className={`text-xs font-semibold tabular-nums ${isGood ? 'text-green' : 'text-red'}`}
                        aria-label={`${up ? 'up' : 'down'} ${Math.abs(delta)} percent`}
                    >
                        {up ? '▲' : '▼'} {Math.abs(delta).toFixed(1)}%
                    </span>
                )}
            </div>
        </div>
    )
}

export function Panel({
    title,
    children,
    className = '',
    right,
}: {
    title?: string
    children: React.ReactNode
    className?: string
    right?: React.ReactNode
}): JSX.Element {
    return (
        <div className={`rounded border border-primary bg-primary p-2.5 @sm:p-3 min-w-0 ${className}`}>
            {(title || right) && (
                <div className="flex items-center justify-between gap-2 mb-1.5">
                    {title && <div className="text-xs font-semibold text-secondary truncate">{title}</div>}
                    {right}
                </div>
            )}
            {children}
        </div>
    )
}

// Every demo sits in one of these. It is the "window" of the fake canvas.
export function CanvasFrame({
    title,
    children,
    className = '',
    scheme = 'secondary',
}: {
    title: string
    children: React.ReactNode
    className?: string
    scheme?: 'primary' | 'secondary'
}): JSX.Element {
    return (
        <div
            data-scheme={scheme}
            className={`@container size-full flex flex-col bg-primary text-primary font-sans text-left ${className}`}
        >
            <div className="flex items-center gap-1.5 px-2 py-1 border-b border-primary bg-accent shrink-0">
                <span className="size-2 rounded-full bg-red/70" />
                <span className="size-2 rounded-full bg-yellow/70" />
                <span className="size-2 rounded-full bg-green/70" />
                <span className="ml-1 text-[11px] text-muted truncate">{title}</span>
                <span className="ml-auto text-[10px] text-muted hidden @sm:inline">dummy data · refreshes live</span>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden p-2 @sm:p-3">{children}</div>
        </div>
    )
}

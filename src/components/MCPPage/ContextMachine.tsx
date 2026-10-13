import React, { useEffect, useMemo, useRef, useState } from 'react'
import { IconGraph } from '@posthog/icons'
import { IconClaudeCode, IconGithub, IconSlack, LogomarkCodex, LogomarkCursor } from 'components/OSIcons/Icons'
import { SectionHeading } from 'components/Products/ReaderViewProduct/helpers'

type Point = [number, number]
type Layout = { w: number; h: number; stations: Point[]; waypoints: Point[]; web: Frame; desktop: Frame }
type Frame = { x: number; y: number; w: number; h: number }

// Wide: a snake across the page. Tall: a zigzag down it. Return waypoints bring the ball home.
const LAYOUTS: Record<'wide' | 'tall', Layout> = {
    wide: {
        w: 1000,
        h: 540,
        stations: [
            [120, 250],
            [280, 160],
            [420, 295],
            [600, 345],
            [745, 445],
            [875, 300],
        ],
        waypoints: [
            [870, 130],
            [640, 70],
            [330, 60],
            [150, 110],
        ],
        web: { x: 190, y: 105, w: 300, h: 265 },
        desktop: { x: 520, y: 275, w: 340, h: 235 },
    },
    tall: {
        w: 400,
        h: 1180,
        stations: [
            [110, 110],
            [290, 255],
            [110, 400],
            [290, 600],
            [110, 740],
            [290, 920],
        ],
        waypoints: [
            [210, 1060],
            [40, 960],
            [32, 540],
            [32, 220],
        ],
        web: { x: 30, y: 180, w: 340, h: 300 },
        desktop: { x: 30, y: 530, w: 340, h: 280 },
    },
}

interface Station {
    name: string
    line: string
    payload: string
    icon: React.ReactNode
    tile: string
}

const STATIONS: Station[] = [
    {
        name: 'Slack',
        line: '"why did signups tank??"',
        payload: 'signups -31%',
        icon: <IconSlack className="size-5" />,
        tile: 'bg-purple/20',
    },
    {
        name: 'The UI',
        line: 'still here. no hard feelings.',
        payload: 'retention 14%',
        icon: <IconGraph className="size-5 text-blue" />,
        tile: 'bg-blue/20',
    },
    {
        name: 'Codex',
        line: 'reads the funnel so you don’t',
        payload: 'step 3: -42%',
        icon: <LogomarkCodex className="size-5" />,
        tile: 'bg-green-2/20',
    },
    {
        name: 'Cursor',
        line: 'stack trace, now with opinions',
        payload: 'TypeError x1,247',
        icon: <LogomarkCursor className="size-5" />,
        tile: 'bg-yellow/30',
    },
    {
        name: 'Claude Code',
        line: 'flag off. you’re welcome.',
        payload: 'new-onboarding: off',
        icon: <IconClaudeCode className="size-5" />,
        tile: 'bg-red/20',
    },
    {
        name: 'GitHub',
        line: 'merged. ship it. again.',
        payload: 'PR #4,812',
        icon: <IconGithub className="size-5" />,
        tile: 'bg-pink/20',
    },
]

function gearPath(teeth: number, r: number, depth: number): string {
    const pts: string[] = []
    for (let i = 0; i < teeth * 4; i++) {
        const a = (i / (teeth * 4)) * Math.PI * 2
        const rr = i % 4 === 1 || i % 4 === 2 ? r + depth : r
        pts.push(`${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)}`)
    }
    return `M${pts.join('L')}Z`
}

const MOVE_MS = 1500
const DWELL_MS = 1200
const easeInOut = (t: number): number => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

// Catmull-Rom through a closed loop of points, converted to cubic beziers.
function closedPath(points: Point[]): string {
    const n = points.length
    let d = `M${points[0][0]},${points[0][1]}`
    for (let i = 0; i < n; i++) {
        const p0 = points[(i - 1 + n) % n]
        const p1 = points[i]
        const p2 = points[(i + 1) % n]
        const p3 = points[(i + 2) % n]
        const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
        const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
        d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`
    }
    return d + ' Z'
}

function ZoneFrame({ frame, layout, title, className }: { frame: Frame; layout: Layout; title: string; className: string }) {
    return (
        <div
            className={`absolute rounded-md border border-primary overflow-hidden ${className}`}
            style={{
                left: `${(frame.x / layout.w) * 100}%`,
                top: `${(frame.y / layout.h) * 100}%`,
                width: `${(frame.w / layout.w) * 100}%`,
                height: `${(frame.h / layout.h) * 100}%`,
            }}
        >
            <div className="flex items-center gap-1.5 px-2 py-1.5 border-b border-primary bg-black/5 dark:bg-white/5">
                <span className="size-2 rounded-full bg-red/70" />
                <span className="size-2 rounded-full bg-yellow" />
                <span className="size-2 rounded-full bg-green-2" />
                <span className="ml-1 text-[10px] font-mono text-secondary truncate">{title}</span>
            </div>
        </div>
    )
}

export function ContextMachine(): JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null)
    const pathRef = useRef<SVGPathElement>(null)
    const ballRef = useRef<HTMLDivElement>(null)
    const [layoutKey, setLayoutKey] = useState<'wide' | 'tall'>('wide')
    const [active, setActive] = useState<number | null>(0)
    const [carrying, setCarrying] = useState(0)
    const [reduced, setReduced] = useState(false)
    const layout = LAYOUTS[layoutKey]

    const d = useMemo(() => {
        const all: Point[] = [...layout.stations, ...layout.waypoints]
        return closedPath(all)
    }, [layout])

    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const ro = new ResizeObserver(([entry]) => setLayoutKey(entry.contentRect.width >= 680 ? 'wide' : 'tall'))
        ro.observe(el)
        setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
        return () => ro.disconnect()
    }, [])

    useEffect(() => {
        const path = pathRef.current
        const ball = ballRef.current
        const container = containerRef.current
        if (!path || !ball || !container) return

        const total = path.getTotalLength()
        // Where along the track each station sits: nearest sample to its coordinates.
        const stops = layout.stations.map(([sx, sy]) => {
            let best = 0
            let bestDist = Infinity
            for (let l = 0; l <= total; l += total / 600) {
                const p = path.getPointAtLength(l)
                const dist = (p.x - sx) ** 2 + (p.y - sy) ** 2
                if (dist < bestDist) {
                    bestDist = dist
                    best = l
                }
            }
            return best
        })
        // Close the loop: after the last station the ball runs home to station one.
        stops.push(total + stops[0])

        const place = (len: number): void => {
            const p = path.getPointAtLength(len % total)
            ball.style.left = `${(p.x / layout.w) * 100}%`
            ball.style.top = `${(p.y / layout.h) * 100}%`
        }
        place(stops[0])
        if (reduced) return

        let raf = 0
        let visible = false
        let t0 = performance.now()
        const cycle = (MOVE_MS + DWELL_MS) * layout.stations.length

        const frame = (now: number): void => {
            if (visible) {
                const t = Math.max(0, now - t0) % cycle
                const seg = Math.floor(t / (MOVE_MS + DWELL_MS))
                const within = t - seg * (MOVE_MS + DWELL_MS)
                const moving = within < MOVE_MS
                const from = stops[seg]
                const to = stops[seg + 1]
                place(moving ? from + (to - from) * easeInOut(within / MOVE_MS) : to)
                const arrived = moving ? null : (seg + 1) % layout.stations.length
                setActive((prev) => (prev === arrived ? prev : arrived))
                setCarrying((prev) => (prev === seg ? prev : seg))
            }
            raf = requestAnimationFrame(frame)
        }

        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting
            t0 = performance.now()
        })
        io.observe(container)
        raf = requestAnimationFrame(frame)
        return () => {
            cancelAnimationFrame(raf)
            io.disconnect()
        }
    }, [layout, reduced])

    const pct = ([x, y]: Point) => ({ left: `${(x / layout.w) * 100}%`, top: `${(y / layout.h) * 100}%` })

    return (
        <div
            ref={containerRef}
            className="relative w-full overflow-hidden rounded-md border border-primary bg-light-yellow/20 dark:bg-accent-dark shadow-md [background-image:radial-gradient(rgba(128,128,128,0.3)_1px,transparent_1px)] [background-size:18px_18px]"
            style={{ aspectRatio: `${layout.w} / ${layout.h}` }}
        >
            <ZoneFrame
                frame={layout.web}
                layout={layout}
                title="https://anywhere.posthog"
                className="bg-blue/5 dark:bg-blue/10"
            />
            <ZoneFrame
                frame={layout.desktop}
                layout={layout}
                title="any-window-whatsoever.app"
                className="bg-yellow/10 dark:bg-yellow/10"
            />

            <svg viewBox={`0 0 ${layout.w} ${layout.h}`} className="absolute inset-0 size-full" aria-hidden="true">
                <defs>
                    <linearGradient id="mcp-track-fill" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={layout.w} y2={layout.h}>
                        <stop offset="0" stopColor="#F54E00" />
                        <stop offset="0.35" stopColor="#F7A501" />
                        <stop offset="0.7" stopColor="#2F80FA" />
                        <stop offset="1" stopColor="#B62AD9" />
                    </linearGradient>
                </defs>
                {layoutKey === 'wide' && (
                    <>
                        <g transform="translate(575 185)" className="fill-light-yellow stroke-navy" strokeWidth={3} strokeLinejoin="round">
                            <path d={gearPath(10, 30, 8)}>
                                <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="8s" repeatCount="indefinite" />
                            </path>
                            <circle r={9} className="fill-accent stroke-navy" />
                        </g>
                        <g transform="translate(637 152)" className="fill-pink stroke-navy" strokeWidth={3} strokeLinejoin="round">
                            <path d={gearPath(7, 20, 7)}>
                                <animateTransform attributeName="transform" type="rotate" from="25" to="-335" dur="5.6s" repeatCount="indefinite" />
                            </path>
                            <circle r={6} className="fill-accent stroke-navy" />
                        </g>
                    </>
                )}
                <path d={d} fill="none" strokeWidth={40} strokeLinecap="round" className="stroke-navy" />
                <path d={d} fill="none" strokeWidth={31} strokeLinecap="round" stroke="url(#mcp-track-fill)" />
                <path d={d} fill="none" strokeWidth={5} strokeLinecap="round" className="stroke-white/40" transform="translate(-3 -5)" />
                <path
                    ref={pathRef}
                    d={d}
                    id="mcp-track"
                    fill="none"
                    strokeWidth={0}
                />
                <text className="fill-navy text-[10px] font-mono font-bold uppercase" letterSpacing="3" dy="3.5">
                    <textPath href="#mcp-track" startOffset="2%">
                        mcp.posthog.com/mcp  ·  exec  ·  exec  ·  exec  ·  mcp.posthog.com/mcp  ·  exec  ·  exec  ·  exec  ·  mcp.posthog.com/mcp  ·  exec  ·  exec  ·  exec
                    </textPath>
                </text>
            </svg>

            {STATIONS.map((s, i) => (
                <div
                    key={s.name}
                    className={`absolute -translate-x-1/2 -translate-y-[calc(100%+22px)] w-[148px] rounded-md border-2 border-navy bg-white dark:bg-accent-dark p-2 flex items-center gap-2 transition-all duration-300 ${
                        active === i
                            ? 'scale-110 shadow-[4px_4px_0_0_#F7A501] z-20 -rotate-2'
                            : `shadow-[3px_3px_0_0_#1E2F46] z-10 ${i % 2 ? 'rotate-1' : '-rotate-1'}`
                    }`}
                    style={pct(layout.stations[i])}
                >
                    {i === STATIONS.length - 1 && active === i && (
                        <span className="absolute -top-6 right-1 rotate-6 rounded bg-yellow px-1.5 py-0.5 text-[11px] font-black text-black shadow animate-bounce">
                            ding!
                        </span>
                    )}
                    <span className={`inline-flex size-8 shrink-0 items-center justify-center rounded ${s.tile}`}>
                        {s.icon}
                    </span>
                    <span className="leading-tight min-w-0">
                        <span className="block text-[12px] font-bold truncate">{s.name}</span>
                        <span className="block text-[10px] text-secondary leading-snug">{s.line}</span>
                    </span>
                </div>
            ))}

            <div ref={ballRef} className="absolute z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={pct(layout.stations[0])}>
                <div className={`relative size-9 rounded-full border-2 border-black bg-yellow shadow-lg transition-transform duration-200 ${active === null ? '' : 'scale-x-125 scale-y-90'}`}>
                    <span className="absolute left-2 top-3 size-1.5 rounded-full bg-black" />
                    <span className="absolute right-2 top-3 size-1.5 rounded-full bg-black" />
                    <span className="absolute left-3 bottom-2 w-3 h-1.5 rounded-b-full border-b-2 border-black" />
                    <span className="absolute left-1.5 top-1 size-2 rounded-full bg-white/60" />
                </div>
                <div className="absolute left-1/2 top-full -translate-x-1/2 mt-1.5 whitespace-nowrap rounded bg-black px-1.5 py-0.5 text-[10px] font-mono font-bold text-yellow shadow">
                    {STATIONS[carrying].payload}
                </div>
            </div>

            <span className="absolute right-3 bottom-2 text-[10px] font-mono text-secondary">↻ repeat forever. it&apos;s fine.</span>
        </div>
    )
}

export default function ContextMachineSection(): JSX.Element {
    return (
        <section id="everywhere" className="scroll-mt-20 not-prose">
            <SectionHeading lede="The ball is your PostHog data. The MCP is the track. The client is whatever you had open.">
                One ball.{' '}
                <span className="bg-yellow/30 text-primary rounded-md px-1 whitespace-nowrap">Every client.</span>
            </SectionHeading>
            <ContextMachine />
        </section>
    )
}

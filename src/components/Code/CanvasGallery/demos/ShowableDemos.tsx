import React, { useEffect, useRef } from 'react'
import { IconCheck } from '@posthog/icons'
import { usePrefersReducedMotion } from 'components/Code/usePrefersReducedMotion'
import { CanvasFrame, formatNumber, Panel, seeded, series, Sparkline, Stat, useTick } from '../primitives'

// A slide deck where the numbers are queries, not screenshots. Present it next quarter and it is still right.
export function LiveDeckDemo(): JSX.Element {
    const tick = useTick(3500)
    const fast = useTick(900)
    const online = 1312 + Math.round(Math.sin(fast / 2) * 9)
    const channels = [
        { name: 'Organic', value: 38 },
        { name: 'Referral', value: 34 },
        { name: 'Paid', value: 22 },
        { name: 'Events', value: 17 },
    ]
    const slides = [
        <div key="one" className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-[11px] uppercase tracking-wide text-muted">Q3 in one number</div>
            <div className="text-4xl @md:text-6xl font-bold text-primary tabular-nums leading-none my-2">
                {formatNumber(48_210)}
            </div>
            <div className="text-xs text-secondary">
                weekly active users · <span className="text-green font-semibold">+21%</span> vs Q2
            </div>
        </div>,
        <div key="two" className="flex flex-col h-full">
            <div className="text-xs font-semibold text-secondary mb-2">Activation rate by channel</div>
            <ul className="space-y-1.5 flex-1">
                {channels.map((c) => (
                    <li key={c.name} className="text-[11px]">
                        <div className="flex justify-between tabular-nums mb-0.5">
                            <span className="text-primary">{c.name}</span>
                            <span className="text-secondary font-semibold">{c.value}%</span>
                        </div>
                        <div className="h-1.5 rounded bg-accent overflow-hidden">
                            <div className="h-full bg-blue rounded" style={{ width: `${(c.value / 40) * 100}%` }} />
                        </div>
                    </li>
                ))}
            </ul>
            <div className="text-[10px] text-muted mt-1">
                Referral users activate 1.5× as often as paid. Move budget.
            </div>
        </div>,
        <div key="three" className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-[11px] uppercase tracking-wide text-muted">Right now</div>
            <div className="text-4xl @md:text-6xl font-bold text-primary tabular-nums leading-none my-2">{online}</div>
            <div className="text-xs text-secondary">people are in the product while you talk</div>
        </div>,
        <div key="four" className="flex flex-col justify-center h-full">
            <div className="text-xs font-semibold text-secondary mb-1">The bet for Q4</div>
            <p className="text-sm text-primary m-0 leading-snug">
                Ship the new editor to 100%. Kill <span className="font-mono text-[12px]">sso-beta</span>. Double
                referral. If W4 retention does not pass 35% by December, we were wrong.
            </p>
        </div>,
    ]
    const index = tick % slides.length
    return (
        <CanvasFrame scheme="primary">
            <div className="flex flex-col h-full">
                <div className="flex gap-1 mb-2">
                    {slides.map((_, i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full ${i <= index ? 'bg-primary' : 'bg-accent'}`} />
                    ))}
                </div>
                <div className="flex-1 min-h-0 rounded border border-primary bg-primary p-3 @md:p-5">
                    {slides[index]}
                </div>
                <div className="flex justify-between text-[10px] text-muted mt-1.5 tabular-nums">
                    <span>
                        slide {index + 1} / {slides.length}
                    </span>
                    <span>numbers re-query on open</span>
                </div>
            </div>
        </CanvasFrame>
    )
}

const CITIES: [number, number][] = [
    [37.8, -122.4],
    [47.6, -122.3],
    [30.3, -97.7],
    [40.7, -74],
    [43.7, -79.4],
    [19.4, -99.1],
    [-23.5, -46.6],
    [-34.6, -58.4],
    [51.5, -0.1],
    [48.9, 2.3],
    [52.5, 13.4],
    [40.4, -3.7],
    [59.3, 18.1],
    [32.1, 34.8],
    [25.2, 55.3],
    [6.5, 3.4],
    [-1.3, 36.8],
    [-33.9, 18.4],
    [19.1, 72.9],
    [12.97, 77.6],
    [1.35, 103.8],
    [-6.2, 106.8],
    [35.7, 139.7],
    [37.6, 127],
    [-33.9, 151.2],
]

// A dotted globe with a pulse per active session. Built for the all-hands, not for a Tuesday.
export function GlobeDemo(): JSX.Element {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const gridColorRef = useRef<HTMLSpanElement>(null)
    const dotColorRef = useRef<HTMLSpanElement>(null)
    const reducedMotion = usePrefersReducedMotion()
    const tick = useTick(1500)
    const active = 1312 + Math.round(Math.sin(tick) * 14)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        const gridColor = gridColorRef.current ? getComputedStyle(gridColorRef.current).color : '#888'
        const dotColor = dotColorRef.current ? getComputedStyle(dotColorRef.current).color : '#1d4aff'
        const rand = seeded(9)
        const phases = CITIES.map(() => rand() * Math.PI * 2)
        let raf = 0

        const draw = (t: number) => {
            const dpr = window.devicePixelRatio || 1
            const w = canvas.clientWidth
            const h = canvas.clientHeight
            if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
                canvas.width = w * dpr
                canvas.height = h * dpr
            }
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            ctx.clearRect(0, 0, w, h)
            const r = Math.min(w, h) * 0.44
            const cx = w / 2
            const cy = h / 2
            const rot = t * 0.00025
            const tilt = -0.35
            const project = (latDeg: number, lonDeg: number) => {
                const lat = (latDeg * Math.PI) / 180
                const lon = (lonDeg * Math.PI) / 180 + rot
                const x = Math.cos(lat) * Math.sin(lon)
                const y0 = Math.sin(lat)
                const z0 = Math.cos(lat) * Math.cos(lon)
                const y = y0 * Math.cos(tilt) - z0 * Math.sin(tilt)
                const z = y0 * Math.sin(tilt) + z0 * Math.cos(tilt)
                return { x: cx + x * r, y: cy - y * r, z }
            }
            ctx.fillStyle = gridColor
            for (let lat = -75; lat <= 75; lat += 15) {
                for (let lon = -180; lon < 180; lon += 12) {
                    const p = project(lat, lon)
                    if (p.z < 0) continue
                    ctx.globalAlpha = 0.35 + p.z * 0.45
                    ctx.beginPath()
                    ctx.arc(p.x, p.y, 1.3, 0, Math.PI * 2)
                    ctx.fill()
                }
            }
            ctx.globalAlpha = 0.5
            ctx.strokeStyle = gridColor
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.arc(cx, cy, r, 0, Math.PI * 2)
            ctx.stroke()
            ctx.fillStyle = dotColor
            ctx.strokeStyle = dotColor
            CITIES.forEach(([lat, lon], i) => {
                const p = project(lat, lon)
                if (p.z < -0.05) return
                const pulse = (Math.sin(t / 700 + phases[i]) + 1) / 2
                ctx.globalAlpha = 0.9
                ctx.beginPath()
                ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2)
                ctx.fill()
                ctx.globalAlpha = 0.5 * (1 - pulse)
                ctx.lineWidth = 1.5
                ctx.beginPath()
                ctx.arc(p.x, p.y, 3 + pulse * 9, 0, Math.PI * 2)
                ctx.stroke()
            })
            ctx.globalAlpha = 1
        }

        if (reducedMotion) {
            draw(0)
            return
        }
        const loop = (t: number) => {
            draw(t)
            raf = window.requestAnimationFrame(loop)
        }
        raf = window.requestAnimationFrame(loop)
        return () => window.cancelAnimationFrame(raf)
    }, [reducedMotion])

    return (
        <CanvasFrame scheme="primary">
            <span ref={gridColorRef} className="text-muted hidden" />
            <span ref={dotColorRef} className="text-blue hidden" />
            <div className="grid @md:grid-cols-[1fr_auto] gap-2 h-full items-stretch">
                <div className="relative min-h-[180px] flex items-center justify-center">
                    <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden />
                </div>
                <div className="flex @md:flex-col gap-3 @md:w-40 @md:justify-center">
                    <Stat label="Active now" value={formatNumber(active)} />
                    <Stat label="Countries" value="41" />
                    <Stat label="Top city" value="London" />
                    <div className="text-[10px] text-muted hidden @md:block">
                        Sessions from <span className="font-mono text-primary">$geoip_city_name</span>, sampled every 10
                        s. Cities pulse when a new session starts.
                    </div>
                </div>
            </div>
        </CanvasFrame>
    )
}

// An incident report that is a canvas, not a wall of text. Timeline, blast radius, and what changed.
export function IncidentReportDemo(): JSX.Element {
    const errors = [...series(31, 12, 14, 6), ...series(32, 10, 96, 30), ...series(33, 14, 15, 6)]
    const timeline = [
        { at: '14:02', label: 'Alert: error rate > 5× baseline', kind: 'red' },
        { at: '14:06', label: 'Paged. Deploy 4126 identified as suspect', kind: 'orange' },
        { at: '14:19', label: 'Rolled back. Errors returning to baseline', kind: 'green' },
        { at: '14:31', label: 'Resolved. Root cause: null tenant id in export job', kind: 'green' },
    ]
    return (
        <CanvasFrame>
            <div className="grid gap-2 @md:grid-cols-3 h-full">
                <Panel title="Errors per minute" className="@md:col-span-2">
                    <div className="relative">
                        <div className="absolute inset-y-0 bg-red/10" style={{ left: '33%', width: '28%' }} />
                        <Sparkline data={errors} className="text-red" height={64} fill={false} />
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                        <Stat label="Duration" value="29" unit="min" />
                        <Stat label="Users affected" value="2,140" />
                        <Stat label="Failed exports" value="611" />
                    </div>
                </Panel>
                <Panel title="Timeline">
                    <ol className="text-[11px] space-y-1.5 relative">
                        {timeline.map((t) => (
                            <li key={t.at} className="flex gap-2">
                                <span
                                    className={`mt-1 size-2 rounded-full shrink-0 ${
                                        t.kind === 'red' ? 'bg-red' : t.kind === 'orange' ? 'bg-orange' : 'bg-green'
                                    }`}
                                />
                                <div className="min-w-0">
                                    <span className="text-muted tabular-nums">{t.at}</span>{' '}
                                    <span className="text-primary">{t.label}</span>
                                </div>
                            </li>
                        ))}
                    </ol>
                </Panel>
                <Panel title="What we changed" className="@md:col-span-3">
                    <ul className="text-[11px] grid @md:grid-cols-3 gap-x-4 gap-y-1">
                        <li className="flex items-start gap-1.5">
                            <IconCheck className="size-3.5 text-green shrink-0" />
                            <span className="text-primary">Export job validates tenant id before enqueue</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                            <IconCheck className="size-3.5 text-green shrink-0" />
                            <span className="text-primary">New alert: export failures &gt; 1% for 3 min</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                            <IconCheck className="size-3.5 text-green shrink-0" />
                            <span className="text-primary">Deploys pause at 5% for 10 min automatically</span>
                        </li>
                    </ul>
                </Panel>
            </div>
        </CanvasFrame>
    )
}

// The fish tank. Each fish is an active session. Delightful for a day, unreadable forever.
export function FishTankDemo(): JSX.Element {
    const tick = useTick(50)
    const rand = seeded(42)
    const fish = Array.from({ length: 14 }, (_, i) => ({
        y: 8 + rand() * 34,
        speed: 0.25 + rand() * 0.5,
        offset: rand() * 130,
        size: 3 + rand() * 3,
        dir: rand() > 0.5 ? 1 : -1,
        hue: i % 3,
    }))
    const bubbles = Array.from({ length: 6 }, () => ({
        x: 5 + rand() * 90,
        offset: rand() * 60,
        speed: 0.2 + rand() * 0.3,
    }))
    const fishClass = ['text-blue', 'text-orange', 'text-purple']
    return (
        <CanvasFrame scheme="primary">
            <div className="flex flex-col h-full gap-2">
                <div className="relative flex-1 min-h-[160px] rounded border border-primary bg-blue/10 overflow-hidden">
                    <svg
                        viewBox="0 0 100 50"
                        preserveAspectRatio="none"
                        className="absolute inset-0 size-full"
                        aria-hidden
                    >
                        {bubbles.map((b, i) => {
                            const y = 55 - ((tick * b.speed + b.offset) % 60)
                            return (
                                <circle
                                    key={i}
                                    cx={b.x}
                                    cy={y}
                                    r={0.6}
                                    className="text-blue"
                                    fill="currentColor"
                                    opacity={0.35}
                                />
                            )
                        })}
                        {fish.map((f, i) => {
                            const raw = (tick * f.speed + f.offset) % 130
                            const x = f.dir > 0 ? raw - 15 : 115 - raw
                            const wiggle = Math.sin(tick / 6 + i) * 0.6
                            return (
                                <g
                                    key={i}
                                    className={fishClass[f.hue]}
                                    transform={`translate(${x} ${f.y + wiggle}) scale(${f.dir * (f.size / 4)} ${
                                        f.size / 4
                                    })`}
                                >
                                    <path d="M0 0 C1.5 -2 4.5 -2 6 0 C4.5 2 1.5 2 0 0 Z" fill="currentColor" />
                                    <path d="M0 0 L-2 -1.6 L-2 1.6 Z" fill="currentColor" opacity={0.8} />
                                    <circle cx={4.5} cy={-0.4} r={0.35} fill="white" />
                                </g>
                            )
                        })}
                        <path
                            d="M0 50 L0 46 Q10 44 20 47 T40 46 T60 47 T80 46 T100 47 L100 50 Z"
                            className="text-yellow"
                            fill="currentColor"
                            opacity={0.5}
                        />
                    </svg>
                    <div className="absolute top-2 left-2 text-[10px] text-muted">
                        <span className="text-primary font-semibold tabular-nums">{fish.length}</span> people in the
                        editor right now
                    </div>
                </div>
                <div className="text-[10px] text-muted">
                    Fish = <span className="font-mono text-primary">$pageview</span> on{' '}
                    <span className="font-mono text-primary">/editor</span> in the last 5 minutes. Blue is free plan,
                    orange is paid, purple is a teammate. It is not a chart. It is a mood.
                </div>
            </div>
        </CanvasFrame>
    )
}

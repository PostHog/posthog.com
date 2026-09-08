import React from 'react'
import { IconCheck, IconWarning } from '@posthog/icons'
import {
    CanvasFrame,
    formatCompact,
    formatNumber,
    Panel,
    seeded,
    series,
    Sparkline,
    Stat,
    useTick,
} from '../primitives'

// The board you open every morning and read in under a minute. No chart earns a place unless it changes a decision.
export function MorningSkimDemo(): JSX.Element {
    const tick = useTick(3000)
    const wobble = seeded(100 + tick)
    const jitter = (n: number, spread: number) => Math.round(n + (wobble() - 0.5) * spread)
    const flags = [
        { name: 'new-editor', rollout: 25, changed: '2h ago', note: 'ok' },
        { name: 'sso-beta', rollout: 100, changed: '6d ago', note: 'ship it or kill it' },
        { name: 'pricing-v3', rollout: 5, changed: '14m ago', note: 'watching' },
    ]
    const experiments = [
        { name: 'onboarding-checklist', lift: 4.2, sig: true },
        { name: 'cheaper-cta-copy', lift: -0.8, sig: false },
        { name: 'skip-email-verify', lift: 11.9, sig: true },
    ]
    return (
        <CanvasFrame title="morning.canvas">
            <div className="flex flex-col gap-2 h-full">
                <div className="grid grid-cols-3 @md:grid-cols-6 gap-2">
                    <Stat label="Signups" value={formatNumber(jitter(1284, 20))} delta={3.4} />
                    <Stat label="WAU" value={formatCompact(jitter(48210, 300))} delta={1.1} />
                    <Stat label="Activation" value="31.2%" delta={-0.4} good={false} />
                    <Stat label="Errors" value={formatNumber(jitter(212, 10))} delta={-18.0} good />
                    <Stat label="p95" value="640" unit="ms" delta={0.3} good={false} />
                    <Stat label="MRR" value="$412k" delta={2.2} />
                </div>
                <div className="grid gap-2 @md:grid-cols-3">
                    <Panel title="Flags · changed recently">
                        <table className="w-full text-[11px] tabular-nums whitespace-nowrap">
                            <tbody>
                                {flags.map((f) => (
                                    <tr key={f.name}>
                                        <td className="py-0.5 text-primary font-mono truncate max-w-[9rem]">
                                            {f.name}
                                        </td>
                                        <td className="py-0.5 text-right text-secondary">{f.rollout}%</td>
                                        <td className="py-0.5 text-right text-muted hidden @sm:table-cell">
                                            {f.changed}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Panel>
                    <Panel title="Experiments">
                        <ul className="text-[11px] space-y-0.5 tabular-nums">
                            {experiments.map((e) => (
                                <li key={e.name} className="flex items-center gap-1.5">
                                    <span
                                        className={`size-1.5 rounded-full shrink-0 ${
                                            e.sig ? (e.lift > 0 ? 'bg-green' : 'bg-red') : 'bg-border'
                                        }`}
                                    />
                                    <span className="text-primary truncate flex-1">{e.name}</span>
                                    <span className={`font-semibold ${e.sig ? 'text-primary' : 'text-muted'}`}>
                                        {e.lift > 0 ? '+' : ''}
                                        {e.lift}%
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </Panel>
                    <Panel title="Surveys · responses this week">
                        <ul className="text-[11px] space-y-0.5 tabular-nums">
                            <li className="flex justify-between">
                                <span className="text-primary">NPS (quarterly)</span>
                                <span className="text-secondary">{jitter(184, 4)} · score 41</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-primary">Why did you cancel?</span>
                                <span className="text-secondary">{jitter(12, 2)}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-primary">Editor feedback</span>
                                <span className="text-secondary">{jitter(67, 3)}</span>
                            </li>
                        </ul>
                    </Panel>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-muted">
                    <IconWarning className="size-3 text-orange" />
                    One thing needs you: <span className="font-mono text-primary">sso-beta</span> has been at 100% for 6
                    days. Ship it or kill it.
                </div>
            </div>
        </CanvasFrame>
    )
}

// AI credits burn-down. A durable dashboard for one number that gets scary.
export function CreditBurnDemo(): JSX.Element {
    const tick = useTick(1200)
    const limit = 5000
    const used = Math.min(limit, 3180 + tick * 3)
    const dayOfMonth = 8
    const projected = Math.round((used / dayOfMonth) * 30)
    const daily = series(21, dayOfMonth, 380, 160, 10)
    const products = [
        { name: 'Desktop tasks', credits: 1920, className: 'bg-blue' },
        { name: 'Canvases', credits: 640, className: 'bg-purple' },
        { name: 'Self-driving reports', credits: 410, className: 'bg-teal' },
        { name: 'PostHog AI', credits: 210, className: 'bg-orange' },
    ]
    const pct = (used / limit) * 100
    return (
        <CanvasFrame title="credits.canvas" scheme="primary">
            <div className="flex flex-col gap-2 h-full">
                <Panel
                    title="AI credits this month"
                    right={<span className="text-[10px] text-muted tabular-nums">day {dayOfMonth} of 30</span>}
                >
                    <div className="flex items-baseline gap-2 mb-1.5 flex-wrap">
                        <span className="text-2xl font-bold text-primary tabular-nums">${(used / 100).toFixed(2)}</span>
                        <span className="text-xs text-secondary">of ${limit / 100} limit</span>
                        <span
                            className={`ml-auto text-xs font-semibold ${
                                projected > limit ? 'text-red' : 'text-green'
                            } tabular-nums`}
                        >
                            projected ${(projected / 100).toFixed(0)}
                        </span>
                    </div>
                    <div className="h-2.5 rounded-full bg-accent overflow-hidden relative">
                        <div
                            className={`h-full rounded-full transition-all duration-1000 ${
                                pct > 85 ? 'bg-red' : pct > 65 ? 'bg-orange' : 'bg-green'
                            }`}
                            style={{ width: `${pct}%` }}
                        />
                        <div
                            className="absolute inset-y-0 border-l-2 border-dashed border-primary/60"
                            style={{ left: `${(dayOfMonth / 30) * 100}%` }}
                            title="pace"
                        />
                    </div>
                    <div className="text-[10px] text-muted mt-1">
                        Dashed line is where you should be on day {dayOfMonth}. You are{' '}
                        <span className={projected > limit ? 'text-red font-semibold' : 'text-green font-semibold'}>
                            {projected > limit ? 'ahead of pace' : 'on pace'}
                        </span>
                        .
                    </div>
                </Panel>
                <div className="grid gap-2 @md:grid-cols-2">
                    <Panel title="Credits per day">
                        <Sparkline data={daily} className="text-blue" height={56} />
                    </Panel>
                    <Panel title="By product">
                        <ul className="space-y-1">
                            {products.map((p) => (
                                <li key={p.name} className="text-[11px]">
                                    <div className="flex justify-between tabular-nums">
                                        <span className="text-primary">{p.name}</span>
                                        <span className="text-secondary">{p.credits}</span>
                                    </div>
                                    <div className="h-1 rounded bg-accent overflow-hidden">
                                        <div
                                            className={`h-full ${p.className}`}
                                            style={{ width: `${(p.credits / used) * 100}%` }}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Panel>
                </div>
            </div>
        </CanvasFrame>
    )
}

// Weekly retention triangle. One hue, light to dark. The same shape every Monday, so your eye learns it.
export function RetentionGridDemo(): JSX.Element {
    const tick = useTick(4000)
    const rand = seeded(55)
    const weeks = 8
    const rows = Array.from({ length: weeks }, (_, cohort) =>
        Array.from({ length: weeks - cohort }, (_, week) => {
            if (week === 0) return 100
            const base = 100 * Math.pow(0.72, Math.pow(week, 0.8))
            return Math.round(base + (rand() - 0.5) * 8 + (cohort === weeks - 2 ? 6 : 0))
        })
    )
    const focusRow = tick % weeks
    return (
        <CanvasFrame title="retention.canvas">
            <div className="flex flex-col gap-2 h-full">
                <div className="flex items-center justify-between text-[11px]">
                    <span className="text-secondary font-semibold">Weekly retention · signups → any activity</span>
                    <span className="text-muted hidden @sm:inline">
                        Cohort of Aug 25 is <span className="text-green font-semibold">+6 pts</span> vs trend
                    </span>
                </div>
                <div
                    className="grid gap-px text-[10px] tabular-nums"
                    style={{ gridTemplateColumns: `auto repeat(${weeks}, 1fr)` }}
                >
                    <div />
                    {Array.from({ length: weeks }, (_, i) => (
                        <div key={i} className="text-center text-muted pb-0.5">
                            W{i}
                        </div>
                    ))}
                    {rows.map((row, cohort) => (
                        <React.Fragment key={cohort}>
                            <div
                                className={`pr-2 text-right whitespace-nowrap ${
                                    cohort === focusRow ? 'text-primary font-semibold' : 'text-muted'
                                }`}
                            >
                                {new Date(2026, 6, 14 + cohort * 7).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </div>
                            {row.map((v, week) => (
                                <div
                                    key={week}
                                    className={`relative h-6 @sm:h-7 rounded-[2px] flex items-center justify-center bg-blue ${
                                        cohort === focusRow ? 'ring-1 ring-primary' : ''
                                    }`}
                                    style={{ opacity: 0.12 + (v / 100) * 0.88 }}
                                >
                                    <span className={v > 55 ? 'text-white' : 'text-primary'}>{v}</span>
                                </div>
                            ))}
                            {Array.from({ length: weeks - row.length }, (_, i) => (
                                <div key={`e${i}`} />
                            ))}
                        </React.Fragment>
                    ))}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-muted mt-auto">
                    <IconCheck className="size-3 text-green" />
                    Week-4 retention is 31%, up from 28% a quarter ago. Nothing to do today.
                </div>
            </div>
        </CanvasFrame>
    )
}

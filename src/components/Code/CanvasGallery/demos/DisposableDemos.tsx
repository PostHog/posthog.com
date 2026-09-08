import React from 'react'
import { IconCheck, IconSearch, IconWarning, IconX } from '@posthog/icons'
import { Bars, CanvasFrame, Panel, series, Sparkline, Stat, useTick } from '../primitives'

// "Why did signups dip on Tuesday?" – one question, one answer, then close the tab.
export function SignupDipDemo(): JSX.Element {
    const tick = useTick(2500)
    const signups = series(7, 14, 420, 60, 3)
    signups[9] = 143
    const referrers = [
        { name: 'google / cpc', before: 188, after: 12 },
        { name: 'google / organic', before: 96, after: 91 },
        { name: 'direct', before: 74, after: 70 },
        { name: 'producthunt', before: 31, after: 22 },
        { name: 'other', before: 19, after: 17 },
    ]
    const step = tick % 3
    return (
        <CanvasFrame title="why-did-signups-dip-tuesday.canvas">
            <div className="grid gap-2 @md:grid-cols-5 h-full">
                <Panel title="Signups, last 14 days" className="@md:col-span-3">
                    <Sparkline data={signups} className="text-blue" height={64} highlightIndex={9} />
                    <div className="flex justify-between text-[10px] text-muted mt-1 tabular-nums">
                        <span>Aug 26</span>
                        <span className="text-red font-semibold">Tue Sep 2: 143 (−66%)</span>
                        <span>Sep 8</span>
                    </div>
                </Panel>
                <Panel title="Breakdown by referrer" className="@md:col-span-2">
                    <table className="w-full text-[11px] tabular-nums">
                        <tbody>
                            {referrers.map((r) => {
                                const change = Math.round(((r.after - r.before) / r.before) * 100)
                                const culprit = r.name === 'google / cpc'
                                return (
                                    <tr key={r.name} className={culprit ? 'bg-red/10' : ''}>
                                        <td className="py-0.5 pl-1 text-primary truncate">{r.name}</td>
                                        <td className="py-0.5 text-right text-secondary">{r.after}</td>
                                        <td
                                            className={`py-0.5 pr-1 text-right font-semibold ${
                                                change < -30 ? 'text-red' : 'text-muted'
                                            }`}
                                        >
                                            {change}%
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </Panel>
                <Panel title="Verdict" className="@md:col-span-5">
                    <div className="flex items-start gap-2 text-xs text-primary">
                        <IconWarning className="size-4 text-orange shrink-0" />
                        <div>
                            <strong>Not a bug.</strong> The paid search campaign was paused at 09:14 UTC on Tuesday.
                            Organic and direct traffic are flat. Signup conversion rate is unchanged at 4.1%.
                            <span className="text-muted"> Checked {step === 0 ? 'just now' : `${step * 2}s ago`}.</span>
                        </div>
                    </div>
                </Panel>
            </div>
        </CanvasFrame>
    )
}

// Customer lookup: a support tool you use once per ticket.
export function CustomerLookupDemo(): JSX.Element {
    const tick = useTick(180)
    const query = 'ada@hedgehog.dev'
    const typed = query.slice(0, Math.min(query.length, tick))
    const ready = typed.length === query.length
    const events = series(3, 24, 40, 30)
    return (
        <CanvasFrame title="customer-lookup.canvas" scheme="primary">
            <div className="flex flex-col gap-2 h-full">
                <div className="flex items-center gap-2 rounded border border-input bg-primary px-2 py-1.5 text-xs">
                    <IconSearch className="size-3.5 text-muted shrink-0" />
                    <span className="text-primary tabular-nums">
                        {typed}
                        {!ready && <span className="animate-pulse">|</span>}
                    </span>
                    <span className="ml-auto text-[10px] text-muted hidden @sm:inline">
                        email, company, or distinct_id
                    </span>
                </div>
                <div
                    className={`grid gap-2 @md:grid-cols-3 transition-opacity duration-500 ${
                        ready ? 'opacity-100' : 'opacity-30'
                    }`}
                >
                    <Panel title="Account">
                        <dl className="text-[11px] grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5">
                            <dt className="text-muted">Company</dt>
                            <dd className="text-primary font-semibold truncate">Hedgehog Dev Ltd</dd>
                            <dt className="text-muted">Plan</dt>
                            <dd className="text-primary">Paid · $412/mo</dd>
                            <dt className="text-muted">Last seen</dt>
                            <dd className="text-primary">4 min ago</dd>
                            <dt className="text-muted">Flags on</dt>
                            <dd className="text-primary truncate">new-editor, sso-beta</dd>
                        </dl>
                    </Panel>
                    <Panel title="Events, 24h">
                        <Bars data={events} className="text-blue" height={44} />
                        <div className="text-[10px] text-muted mt-1">
                            {events.reduce((a, b) => a + b, 0)} events · 3 sessions · 1 rage click
                        </div>
                    </Panel>
                    <Panel title="Errors & replays">
                        <ul className="text-[11px] space-y-1">
                            <li className="flex items-center gap-1.5">
                                <IconX className="size-3 text-red shrink-0" />
                                <span className="text-primary truncate">TypeError in Editor.tsx · 2×</span>
                            </li>
                            <li className="flex items-center gap-1.5">
                                <IconCheck className="size-3 text-green shrink-0" />
                                <span className="text-primary truncate">No 5xx in last 24h</span>
                            </li>
                            <li className="text-blue font-semibold truncate">▶ Replay 14:02 (3m 12s)</li>
                            <li className="text-blue font-semibold truncate">▶ Replay 09:41 (48s)</li>
                        </ul>
                    </Panel>
                </div>
            </div>
        </CanvasFrame>
    )
}

// Post-deploy check: exists for the 20 minutes after a deploy, then nobody opens it again.
export function PostDeployCheckDemo(): JSX.Element {
    const tick = useTick(1000)
    const minutes = 12 + Math.floor(tick / 60)
    const seconds = tick % 60
    const errorRate = [...series(11, 20, 18, 8), ...series(12, 12, 16, 8)]
    const checks = [
        { label: 'Error rate within 10% of baseline', ok: true },
        { label: 'p95 latency under 800 ms', ok: true },
        { label: 'No new exception groups', ok: false, detail: '1 new: RangeError in exportCsv' },
        { label: 'Flag rollout reached 25%', ok: true },
    ]
    return (
        <CanvasFrame title="did-deploy-4127-break-anything.canvas">
            <div className="grid gap-2 @md:grid-cols-3 h-full">
                <Panel
                    title="Error rate per minute · deploy at 14:31"
                    className="@md:col-span-2"
                    right={
                        <span className="text-[10px] text-muted tabular-nums">
                            +{minutes}m {String(seconds).padStart(2, '0')}s since deploy
                        </span>
                    }
                >
                    <div className="relative">
                        <Sparkline data={errorRate} className="text-orange" height={72} />
                        <div
                            className="absolute inset-y-0 border-l border-dashed border-primary"
                            style={{ left: `${(20 / 31) * 100}%` }}
                        />
                        <div
                            className="absolute top-0 text-[9px] text-muted pl-1"
                            style={{ left: `${(20 / 31) * 100}%` }}
                        >
                            deploy
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                        <Stat label="Errors / min" value="16.2" delta={-4.8} good />
                        <Stat label="p95" value="612" unit="ms" delta={2.1} good={false} />
                        <Stat label="Exposed" value="25" unit="%" />
                    </div>
                </Panel>
                <Panel title="Checks">
                    <ul className="text-[11px] space-y-1.5">
                        {checks.map((c) => (
                            <li key={c.label} className="flex items-start gap-1.5">
                                {c.ok ? (
                                    <IconCheck className="size-3.5 text-green shrink-0 mt-px" />
                                ) : (
                                    <IconX className="size-3.5 text-red shrink-0 mt-px" />
                                )}
                                <div className="min-w-0">
                                    <div className="text-primary">{c.label}</div>
                                    {c.detail && <div className="text-red text-[10px] truncate">{c.detail}</div>}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-2 rounded bg-yellow/15 text-primary text-[11px] px-2 py-1">
                        <strong>Hold at 25%.</strong> Fix the CSV export first.
                    </div>
                </Panel>
            </div>
        </CanvasFrame>
    )
}

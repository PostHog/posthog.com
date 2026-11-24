import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { IconChevronDown, IconSparkles } from '@posthog/icons'
import { blockClassName } from './Widgets'

// A slimmed-down copy of a workflow's Overview tab in the app: headline metrics with sparklines, health, step reach,
// and what people did in the product afterwards. The numbers are made up, and stable for each date range.

const ranges = { '7d': 7, '30d': 30, '90d': 90 } as const
type Range = keyof typeof ranges

function seeded(seed: number): () => number {
    let a = seed
    return () => {
        a = (a + 0x6d2b79f5) | 0
        let t = Math.imul(a ^ (a >>> 15), 1 | a)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

function series(days: number, base: number, wobble: number, seed: number): number[] {
    const rand = seeded(seed)
    return Array.from({ length: days }, () => Math.round(base * (1 - wobble + rand() * wobble * 2)))
}

const sum = (values: number[]) => values.reduce((a, b) => a + b, 0)

function Sparkline({ values, color }: { values: number[]; color: string }): JSX.Element {
    const [hover, setHover] = useState<number | null>(null)
    const max = Math.max(...values)
    const min = Math.min(...values)
    const x = (i: number) => (i / (values.length - 1)) * 100
    const y = (v: number) => 34 - ((v - min) / (max - min || 1)) * 28
    const line = values.map((v, i) => `${x(i)},${y(v)}`).join(' ')
    return (
        <div
            className="relative mt-3 h-10"
            onMouseLeave={() => setHover(null)}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                setHover(Math.round(((e.clientX - rect.left) / rect.width) * (values.length - 1)))
            }}
        >
            <svg viewBox="0 0 100 36" preserveAspectRatio="none" className="h-full w-full overflow-visible">
                <polygon points={`0,36 ${line} 100,36`} fill={color} opacity="0.08" />
                <polyline
                    points={line}
                    fill="none"
                    stroke={color}
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                />
                {hover !== null && (
                    <line
                        x1={x(hover)}
                        x2={x(hover)}
                        y1="0"
                        y2="36"
                        stroke="currentColor"
                        strokeWidth="1"
                        opacity="0.25"
                        vectorEffect="non-scaling-stroke"
                    />
                )}
            </svg>
            {hover !== null && (
                <span
                    className="pointer-events-none absolute -top-6 -translate-x-1/2 whitespace-nowrap rounded bg-[rgb(var(--text-primary))] px-1.5 py-0.5 text-[11px] font-semibold text-[rgb(var(--bg))]"
                    style={{ left: `${x(hover)}%` }}
                >
                    {values.length - hover - 1 === 0 ? 'Today' : `${values.length - hover - 1}d ago`}:{' '}
                    {values[hover].toLocaleString('en-US')}
                </span>
            )}
        </div>
    )
}

function Tag({ children }: { children: React.ReactNode }) {
    return <span className="rounded bg-green/15 px-1.5 text-[11px] font-semibold text-green">{children}</span>
}

export function MetricsBlock(): JSX.Element {
    const [range, setRange] = useState<Range>('30d')
    const days = ranges[range]

    const data = useMemo(() => {
        const started = series(days, 4580, 0.12, days)
        const sent = series(days, 222, 0.25, days + 1)
        const opened = sent.map((s, i) => Math.round(s * (0.58 + seeded(days * 7 + i)() * 0.08)))
        const clicked = sent.map((s, i) => Math.round(s * (0.045 + seeded(days * 11 + i)() * 0.025)))
        const totals = { started: sum(started), sent: sum(sent), opened: sum(opened), clicked: sum(clicked) }
        const prior = {
            started: totals.started * 0.94,
            sent: totals.sent * 0.88,
            opened: totals.opened * 0.84,
            clicked: totals.clicked * 0.71,
        }
        return { started, sent, opened, clicked, totals, prior }
    }, [days])

    const cards = [
        {
            label: 'Started',
            values: data.started,
            total: data.totals.started,
            prior: data.prior.started,
            color: '#6AA84F',
        },
        { label: 'Sent', values: data.sent, total: data.totals.sent, prior: data.prior.sent, color: '#2F80FA' },
        {
            label: 'Opened',
            values: data.opened,
            total: data.totals.opened,
            prior: data.prior.opened,
            color: '#E34C6F',
            note: `${((data.totals.opened / data.totals.sent) * 100).toFixed(1)}% of sent`,
        },
        {
            label: 'Clicked',
            values: data.clicked,
            total: data.totals.clicked,
            prior: data.prior.clicked,
            color: '#F54E00',
            note: `${((data.totals.clicked / data.totals.sent) * 100).toFixed(1)}% of sent`,
        },
    ]

    const upgraded = Math.round(data.totals.clicked * 0.57)
    const steps = [
        { name: 'Started', count: data.totals.started },
        { name: 'Signed up in the last 30 days?', count: Math.round(data.totals.started * 0.38) },
        { name: 'Welcome email', count: data.totals.sent },
        { name: 'Wait 2 days', count: Math.round(data.totals.sent * 0.97) },
        { name: 'Uploaded a file?', count: Math.round(data.totals.sent * 0.52) },
    ]

    return (
        <div className={`${blockClassName} !p-0 overflow-hidden`}>
            <div className="flex flex-wrap items-center gap-3 border-b border-primary px-5 py-3">
                <strong>Onboarding</strong>
                <span className="rounded-full bg-green/15 px-2 text-xs font-semibold text-green">Live</span>
                <div className="ml-auto flex rounded-md border border-primary p-0.5 text-xs">
                    {(Object.keys(ranges) as Range[]).map((r) => (
                        <button
                            key={r}
                            type="button"
                            onClick={() => setRange(r)}
                            className={`rounded px-2.5 py-1 ${
                                range === r ? 'bg-accent font-semibold' : 'text-secondary'
                            }`}
                        >
                            Last {ranges[r]} days
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-4 bg-accent/40 p-4 @xl/reader-content:p-6">
                <div className="grid gap-4 @xl/reader-content:grid-cols-2 @4xl/reader-content:grid-cols-4">
                    {cards.map((card) => {
                        const delta = ((card.total - card.prior) / card.prior) * 100
                        return (
                            <div
                                key={card.label}
                                className="rounded-lg border border-primary bg-white p-4 dark:bg-accent"
                            >
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-semibold">{card.label}</span>
                                    <span
                                        className={`flex items-center gap-0.5 rounded px-1.5 text-[11px] font-semibold ${
                                            delta < 0 ? 'bg-red/10 text-red' : 'bg-green/15 text-green'
                                        }`}
                                    >
                                        <IconChevronDown className={`size-3 ${delta < 0 ? '' : 'rotate-180'}`} />
                                        {Math.abs(delta).toFixed(1)}%
                                    </span>
                                </div>
                                <motion.p
                                    key={range + card.label}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="m-0 mt-1 text-3xl font-bold tabular-nums tracking-tight"
                                >
                                    {card.total.toLocaleString('en-US')}
                                </motion.p>
                                <p className="m-0 text-sm text-secondary">
                                    vs. {Math.round(card.prior).toLocaleString('en-US')} prior
                                </p>
                                <Sparkline values={card.values} color={card.color} />
                                {card.note && (
                                    <p className="m-0 mt-1 text-center text-xs text-secondary">{card.note}</p>
                                )}
                            </div>
                        )
                    })}
                </div>

                <div className="grid overflow-hidden rounded-lg border border-primary bg-white dark:bg-accent @xl/reader-content:grid-cols-3">
                    {[
                        { label: 'Failed steps', value: '0', note: 'No errors' },
                        {
                            label: 'Hard bounce rate',
                            value: '0.12%',
                            note: `${Math.round(data.totals.sent * 0.0012)} hard bounces`,
                        },
                        { label: 'Spam complaint rate', value: '0.00%', note: '0 marked as spam' },
                    ].map((h) => (
                        <div
                            key={h.label}
                            className="border-b border-primary p-4 last:border-0 @xl/reader-content:border-b-0 @xl/reader-content:border-r @xl/reader-content:last:border-r-0"
                        >
                            <p className="m-0 text-xs font-semibold text-secondary">{h.label}</p>
                            <p className="m-0 mt-1 flex items-center gap-2 text-xl font-bold">
                                {h.value} <Tag>Healthy</Tag>
                            </p>
                            <p className="m-0 text-xs text-secondary">{h.note}</p>
                        </div>
                    ))}
                </div>

                <div className="grid gap-4 @3xl/reader-content:grid-cols-[3fr_2fr]">
                    <div className="rounded-lg border border-primary bg-white p-4 dark:bg-accent">
                        <p className="m-0 font-semibold">Step reach</p>
                        <p className="m-0 mb-3 text-xs text-secondary">
                            How many runs got past each step, as a share of runs started.
                        </p>
                        {steps.map((step) => {
                            const share = (step.count / steps[0].count) * 100
                            return (
                                <div key={step.name} className="mb-2.5">
                                    <div className="flex justify-between text-sm">
                                        <span>{step.name}</span>
                                        <span className="tabular-nums">
                                            {step.count.toLocaleString('en-US')}{' '}
                                            <span className="text-secondary">
                                                ({share.toFixed(share < 10 ? 1 : 0)}%)
                                            </span>
                                        </span>
                                    </div>
                                    <div className="mt-1 h-1.5 rounded-full bg-accent">
                                        <motion.div
                                            className="h-full rounded-full bg-blue"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.max(share, 1)}%` }}
                                            transition={{ duration: 0.6 }}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="rounded-lg border border-red bg-red/5 p-4">
                            <p className="m-0 font-semibold">After the click</p>
                            <p className="m-0 mb-2 text-xs text-secondary">
                                Only PostHog sees this part. It comes from your product events.
                            </p>
                            <p className="m-0 text-3xl font-bold tabular-nums">{upgraded.toLocaleString('en-US')}</p>
                            <p className="m-0 text-sm">
                                people who clicked uploaded their first file within 7 days{' '}
                                <span className="text-secondary">
                                    ({((upgraded / data.totals.clicked) * 100).toFixed(0)}% of clicks)
                                </span>
                            </p>
                        </div>
                        <div className="rounded-lg border border-primary bg-white p-4 dark:bg-accent">
                            <p className="m-0 flex items-center gap-1.5 font-semibold">
                                <IconSparkles className="size-4 text-lilac" /> Suggested changes
                            </p>
                            <p className="m-0 mt-1 text-sm text-red">
                                Make the second email's call to action specific to uploads
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

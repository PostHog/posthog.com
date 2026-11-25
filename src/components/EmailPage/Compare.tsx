import React, { useState } from 'react'
import { IconCheck, IconX } from '@posthog/icons'
import Link from 'components/Link'
import { blockClassName } from './Widgets'

// Transactional email pricing, written as if the new prices are live (PostHog/billing#2760, RFC #1380).
// Competitor prices come from each vendor's pricing page, checked in November 2026. Check them again before this ships.

const tiers: [upTo: number, perThousand: number][] = [
    [10_000, 0],
    [100_000, 0.4],
    [1_000_000, 0.65],
    [2_500_000, 0.33],
    [10_000_000, 0.3],
    [Infinity, 0.25],
]

function posthogPrice(emails: number): number {
    let total = 0
    let from = 0
    for (const [upTo, rate] of tiers) {
        if (emails <= from) break
        total += ((Math.min(emails, upTo) - from) / 1000) * rate
        from = upTo
    }
    return total
}

// Resend's cheapest plan for the volume: a plan's price plus its overage. The free plan stops at 3,000.
const resendPlans: [price: number, included: number, overagePerThousand: number | null][] = [
    [0, 3_000, null],
    [20, 50_000, 0.9],
    [35, 100_000, 0.9],
    [160, 200_000, 0.8],
    [350, 500_000, 0.7],
    [650, 1_000_000, 0.65],
    [825, 1_500_000, 0.52],
    [1150, 2_500_000, 0.46],
]

function resendPrice(emails: number): number {
    return Math.min(
        ...resendPlans.map(([price, included, overage]) =>
            emails <= included ? price : overage === null ? Infinity : price + ((emails - included) / 1000) * overage
        )
    )
}

const volumes = [10_000, 25_000, 50_000, 100_000, 250_000, 500_000, 1_000_000, 2_500_000, 5_000_000, 10_000_000]
const short = (n: number) => (n >= 1_000_000 ? `${n / 1_000_000}M` : `${n / 1000}k`)
const dollars = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`

export function PricingCompare(): JSX.Element {
    const [index, setIndex] = useState(4)
    const emails = volumes[index]
    const ours = posthogPrice(emails)
    const theirs = resendPrice(emails)
    const saving = theirs > 0 ? Math.round(((theirs - ours) / theirs) * 100) : 0

    return (
        <div className={`${blockClassName} grid gap-8 @3xl/reader-content:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]`}>
            <div className="flex flex-col gap-5">
                <label className="flex flex-col gap-2 text-sm font-semibold">
                    <span>
                        Transactional emails a month:{' '}
                        <span className="text-lg tabular-nums">{emails.toLocaleString('en-US')}</span>
                    </span>
                    <input
                        type="range"
                        min={0}
                        max={volumes.length - 1}
                        value={index}
                        onChange={(e) => setIndex(Number(e.target.value))}
                        className="w-full accent-red"
                    />
                    <span className="flex justify-between text-xs font-normal text-secondary">
                        {volumes.map((v) => (
                            <span key={v} className="hidden first:inline last:inline @xl/reader-content:inline">
                                {short(v)}
                            </span>
                        ))}
                    </span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border-2 border-red p-4">
                        <p className="m-0 text-sm text-secondary">PostHog</p>
                        <p className="m-0 text-4xl font-bold tabular-nums">{dollars(ours)}</p>
                        <p className="m-0 text-xs text-secondary">a month, no base fee</p>
                    </div>
                    <div className="rounded-lg border border-primary p-4">
                        <p className="m-0 text-sm text-secondary">Resend</p>
                        <p className="m-0 text-4xl font-bold tabular-nums text-secondary">
                            {emails > 2_500_000 && '~'}
                            {dollars(theirs)}
                        </p>
                        <p className="m-0 text-xs text-secondary">
                            {emails > 2_500_000 ? 'enterprise, estimated' : 'a month, cheapest plan that fits'}
                        </p>
                    </div>
                </div>
                <p className="m-0 text-lg font-semibold">
                    {saving > 0
                        ? `${saving}% less than Resend at this volume.`
                        : saving === 0
                        ? 'The same as Resend at this volume.'
                        : `${-saving}% more than Resend at this volume. Their 100k plan is unusually cheap.`}
                </p>
            </div>
            <div className="flex flex-col gap-3 text-sm">
                <strong>Transactional email, per 1,000</strong>
                <div className="overflow-hidden rounded-lg border border-primary">
                    {tiers.map(([upTo, rate], i) => {
                        const from = i === 0 ? 0 : tiers[i - 1][0]
                        const active = emails > from
                        return (
                            <div
                                key={upTo}
                                className={`flex justify-between border-b border-primary px-3 py-2 last:border-0 ${
                                    active ? '' : 'text-muted'
                                }`}
                            >
                                <span>
                                    {i === 0
                                        ? 'First 10k'
                                        : upTo === Infinity
                                        ? `Above ${short(from)}`
                                        : `${short(from)} to ${short(upTo)}`}
                                </span>
                                <span className="font-semibold tabular-nums">
                                    {rate === 0 ? 'Free' : `$${rate.toFixed(2)}`}
                                </span>
                            </div>
                        )
                    })}
                </div>
                <p className="m-0 text-xs text-secondary">
                    Each email is billed at the rate for its tier. Broadcasts and automations use the marketing email
                    rate. Resend prices are from{' '}
                    <Link to="https://resend.com/pricing" externalNoIcon className="underline">
                        resend.com/pricing
                    </Link>
                    , November 2026.{' '}
                    <Link to="/pricing" className="underline">
                        See all pricing
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}

type Mark = boolean | string
const competitors = ['PostHog', 'Resend', 'Loops', 'Customer.io']
const rows: [feature: string, ...marks: Mark[]][] = [
    ['Send email from your code', true, true, true, true],
    ['Broadcasts', true, true, true, true],
    ['Automations', true, true, true, true],
    ['Push notifications', true, false, false, true],
    ['Product analytics, like funnels and trends, on the same events', true, false, false, false],
    ['Session replay of what happened after the click', true, false, false, false],
    ['Feature flags and experiments on the same people', true, false, false, false],
    ['Priced per email, with no base fee', true, false, false, false],
    ['Free every month', '10,000 emails', '3,000 emails', '4,000 sends', 'Trial'],
    ['Paid plans start at', '$0.40 per 1k', '$20 a month', '$49 a month', '$100 a month'],
]

export function FeatureCompare(): JSX.Element {
    return (
        <div className="not-prose overflow-x-auto rounded-2xl border border-primary bg-white dark:bg-accent">
            <table className="w-full min-w-[36rem] border-collapse text-sm">
                <thead>
                    <tr className="border-b border-primary">
                        <th className="p-3 text-left font-semibold text-secondary" />
                        {competitors.map((name, i) => (
                            <th key={name} className={`p-3 text-center font-bold ${i === 0 ? 'bg-red/5' : ''}`}>
                                {name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map(([feature, ...marks]) => (
                        <tr key={feature} className="border-b border-primary last:border-0">
                            <td className="p-3">{feature}</td>
                            {marks.map((mark, i) => (
                                <td key={i} className={`p-3 text-center ${i === 0 ? 'bg-red/5 font-semibold' : ''}`}>
                                    {mark === true ? (
                                        <IconCheck className="mx-auto size-5 text-green" aria-label="Yes" />
                                    ) : mark === false ? (
                                        <IconX className="mx-auto size-4 text-muted" aria-label="No" />
                                    ) : (
                                        mark
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

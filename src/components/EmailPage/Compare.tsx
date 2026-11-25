import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IconCheck, IconChevronDown, IconX } from '@posthog/icons'
import Link from 'components/Link'
import { blockClassName } from './Widgets'

// Transactional email pricing, written as if the new prices are live (PostHog/billing#2760, RFC #1380).
// Competitor prices: each vendor's cheapest published plan that fits, checked in November 2026 for that issue.
// SendGrid above 100k comes from third-party copies of its pricing. Check them all again before this ships.

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

const volumes = [10_000, 50_000, 100_000, 250_000, 500_000, 1_000_000, 2_500_000]
const competitorPrices: Record<string, (number | null)[]> = {
    Resend: [20, 20, 35, 170, 350, 650, 1150],
    SendGrid: [20, 20, 35, 249, 499, 799, 1099],
    Mailtrap: [15, 20, 30, 200, 300, 750, 1250],
    MailerSend: [15, 35, 68, 163, 325, 600, null],
    Mailgun: [15, 35, 90, 255, 530, 1080, 2730],
    Postmark: [15, 66, 126, 306, 606, 1206, 3006],
}

const short = (n: number) => (n >= 1_000_000 ? `${n / 1_000_000}M` : `${n / 1000}k`)
const dollars = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`

export function PricingCompare(): JSX.Element {
    const [index, setIndex] = useState(3)
    const emails = volumes[index]
    const bars = [
        { name: 'PostHog', price: posthogPrice(emails) },
        ...Object.entries(competitorPrices)
            .filter(([, prices]) => prices[index] !== null)
            .map(([name, prices]) => ({ name, price: prices[index] as number })),
    ].sort((a, b) => a.price - b.price)
    const max = Math.max(...bars.map((b) => b.price))
    const cheapest = bars[0].name === 'PostHog'

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
                            <span key={v}>{short(v)}</span>
                        ))}
                    </span>
                </label>
                <div className="flex flex-col gap-1.5">
                    {bars.map((bar) => {
                        const us = bar.name === 'PostHog'
                        return (
                            <motion.div
                                key={bar.name}
                                layout
                                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                                className="grid grid-cols-[6rem_minmax(0,1fr)_4.5rem] items-center gap-3 text-sm"
                            >
                                <span className={us ? 'font-bold' : 'text-secondary'}>{bar.name}</span>
                                <span className="h-5 rounded bg-accent">
                                    <motion.span
                                        className={`block h-full rounded ${us ? 'bg-red' : 'bg-border'}`}
                                        animate={{ width: `${Math.max((bar.price / max) * 100, 1)}%` }}
                                    />
                                </span>
                                <span className={`text-right tabular-nums ${us ? 'font-bold' : 'text-secondary'}`}>
                                    {dollars(bar.price)}
                                </span>
                            </motion.div>
                        )
                    })}
                </div>
                <p className={`m-0 h-7 text-lg font-semibold ${cheapest ? '' : 'invisible'}`}>
                    The cheapest at {short(emails)} emails a month.
                </p>
            </div>
            <div className="flex flex-col gap-3 text-sm">
                <strong>Transactional email, per 1,000</strong>
                <div className="overflow-hidden rounded-lg border border-primary">
                    {tiers.map(([upTo, rate], i) => {
                        const from = i === 0 ? 0 : tiers[i - 1][0]
                        return (
                            <div
                                key={upTo}
                                className={`flex justify-between border-b border-primary px-3 py-2 last:border-0 ${
                                    emails > from ? '' : 'text-muted'
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
                    No base fee: each email is billed at the rate for its tier. Broadcasts and automations use the
                    marketing email rate. Other prices are each provider’s cheapest published plan that fits, November
                    2026.{' '}
                    <Link to="/pricing" className="underline">
                        See all pricing
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}

// From Michael's feature matrix in #team-workflows (Nov 18, 2026): PostHog from code and docs, the others from their
// own docs and pricing pages. Written for launch, so the transactional API, SDKs, push, and delivery webhooks are GA.
type Mark = boolean | string
const competitors = ['PostHog', 'Resend', 'Loops', 'Customer.io']
type Row = [feature: string, ...marks: Mark[]]

const headline: Row[] = [
    ['Email events in funnels and cohorts', true, false, 'Partly', 'Partly'],
    ['Session replay of the people you email', true, false, false, false],
    ['Replay Vision on the session behind a send', true, false, false, false],
    ['Slack, webhooks, and hundreds of other destinations', true, false, false, 'Partly'],
    ['SMS and push', true, false, false, true],
    ['React Email', true, true, false, false],
    ['Free every month', '10,000 emails', '3,000 emails', '4,000 sends', 'None'],
]

const categories: [title: string, rows: Row[]][] = [
    [
        'Send from code',
        [
            ['Transactional send API', true, true, true, true],
            ['Official SDKs', '8', '9', '4', '4'],
            ['cc and bcc, attachments, idempotency', true, true, 'Partly', 'Partly'],
            ['Delivery webhooks', true, true, true, true],
            ['Custom headers and tags', false, true, false, true],
            ['Batch and scheduled send', false, true, false, 'Partly'],
            ['SMTP relay and inbound email', false, true, false, false],
        ],
    ],
    [
        'Broadcasts and automations',
        [
            ['Broadcasts, segments, and a journey builder', true, true, true, true],
            ['A/B test with a winner', 'Partly', false, true, true],
            ['Experiments on a product outcome', 'Partly', false, 'Partly', 'Partly'],
        ],
    ],
    ['Deliverability', [['Dedicated IPs', false, 'Paid add-on', false, 'Paid add-on']]],
    [
        'Agents',
        [
            ['MCP server and agent skills', '62 tools, 7 skills', true, true, true],
            ['CLI', 'Setup wizard', true, true, true],
        ],
    ],
    ['Pricing', [['Price at 100k emails a month', '$36', '$35', '$49', 'About $145']]],
]

function Rows({ rows }: { rows: Row[] }): JSX.Element {
    return (
        <>
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
                                <span className={i === 0 ? '' : 'text-secondary'}>{mark}</span>
                            )}
                        </td>
                    ))}
                </tr>
            ))}
        </>
    )
}

export function FeatureCompare(): JSX.Element {
    const [open, setOpen] = useState(false)
    return (
        <div className="not-prose overflow-hidden rounded-2xl border border-primary bg-white dark:bg-accent">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[36rem] border-collapse text-sm">
                    <thead>
                        <tr className="border-b border-primary">
                            <th className="p-3" />
                            {competitors.map((name, i) => (
                                <th key={name} className={`p-3 text-center font-bold ${i === 0 ? 'bg-red/5' : ''}`}>
                                    {name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <Rows rows={headline} />
                        {open &&
                            categories.map(([title, rows]) => (
                                <React.Fragment key={title}>
                                    <tr className="border-y border-primary bg-accent">
                                        <th
                                            colSpan={5}
                                            className="px-3 py-2 text-left text-xs uppercase text-secondary"
                                        >
                                            {title}
                                        </th>
                                    </tr>
                                    <Rows rows={rows} />
                                </React.Fragment>
                            ))}
                    </tbody>
                </table>
            </div>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-center gap-1.5 border-t border-primary p-3 text-sm font-semibold hover:bg-accent"
            >
                {open ? 'Show less' : 'See the full table'}
                <IconChevronDown className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
        </div>
    )
}

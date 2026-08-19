import React, { useState } from 'react'
import { IconCheck } from '@posthog/icons'
import OSButton from 'components/shared/ui/OSButton'
import Link from 'components/Link'
import { formatUSD } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import type { SectionComponentProps } from 'components/Products/ReaderViewProduct/types'
import PricingEstimator, { estimateReplayVisionPricing, BillingTier } from './PricingEstimator'

/*
 * Pricing for Replay Vision, billed in usage-based **credits** (1 credit = $0.01).
 * These sections render the pricing story directly – mirroring the session-replay
 * Plans/Calculator layouts – rather than using the billing-driven shared templates,
 * because the launch framing (struck-through 500 → 2,500 free credits) isn't
 * expressible from billing data. The interactive estimator itself is shared with
 * the /pricing calculator's Replay Vision tab – see PricingEstimator.tsx.
 */

// These must track the billing API's replay_vision tiers (currently 2,500 free credits, then
// $0.01/credit – billing encodes the launch boost too). The /pricing tab reads billing tiers
// directly and self-updates at the next build; this page hardcodes them to keep the
// struck-through 500 → 2,500 framing, so when the boost ends it needs a manual edit here.
const CREDIT_PRICE = 0.01 // USD per credit
const FREE_CREDITS = 2500 // per org, per month – 5x the standard tier for a limited time at launch
const STANDARD_FREE_CREDITS = 500 // the regular free tier, kept visible (struck through) next to the boosted one

const LAUNCH_CREDIT_TIERS: BillingTier[] = [
    { up_to: FREE_CREDITS, unit_amount_usd: '0' },
    { up_to: null, unit_amount_usd: CREDIT_PRICE.toFixed(2) },
]

const pricingDetails: { headline: React.ReactNode; body: React.ReactNode }[] = [
    {
        headline: (
            <>
                <s className="opacity-60">{STANDARD_FREE_CREDITS.toLocaleString()}</s> {FREE_CREDITS.toLocaleString()}{' '}
                credits free every month.
            </>
        ),
        body: '5x the free tier for a limited time! Worth ~$25 – roughly 500 observations on the standard model. Only add a card when you scan more.',
    },
    {
        headline: 'Pay per use, not per seat.',
        body: 'Your bill scales with how much you scan, not headcount.',
    },
    {
        headline: 'Priced in credits, not per observation.',
        body: "An observation costs credits based on its AI model – ~5 on the standard model, more on premium, fewer on lighter ones. Credits absorb that variation cleanly; a flat per-observation price couldn't.",
    },
    {
        headline: 'Choose your model, control your cost.',
        body: 'Lighter models cost fewer credits per observation, so you can dial cost against depth of analysis.',
    },
    {
        headline: 'Set a spending limit and never get a surprise bill.',
        body: 'Every org sets a monthly cap. Rate limits protect the pipeline on top of that.',
    },
    {
        headline: 'We ♥ startups.',
        body: (
            <>
                Under 2 years old and pre-series B?{' '}
                <Link to="/startups" className="underline" state={{ newWindow: true }}>
                    Apply for $50k in credits
                </Link>
                .
            </>
        ),
    },
]

// ---------------------------------------------------------------------------
// TL;DR
// ---------------------------------------------------------------------------
export const PricingTLDR = ({ id }: SectionComponentProps) => (
    <section id={id} className="scroll-mt-20 not-prose @container">
        <h2 className="text-3xl font-bold text-primary mt-0 mb-6">TL;DR:</h2>
        <p className="text-3xl leading-snug font-normal text-primary mb-3">
            <strong className="font-bold">
                <s className="opacity-60">{STANDARD_FREE_CREDITS.toLocaleString()}</s> {FREE_CREDITS.toLocaleString()}{' '}
                credits free
            </strong>{' '}
            every month, <br className="hidden @xl:block" />
            then <strong className="font-bold tabular-nums">${CREDIT_PRICE.toFixed(2)}/credit</strong>
        </p>
        <p className="text-lg text-primary/50 mb-4">
            5x the free tier for a limited time! 1 credit = $0.01. That's ~500 free observations a month on the standard
            model – you only pay for what your scanners run.
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-6">
            <OSButton variant="primary" asLink to="https://app.posthog.com/signup" size="lg">
                Get started – free
            </OSButton>
            <OSButton variant="secondary" asLink to="/talk-to-a-human" size="lg">
                Talk to a human
            </OSButton>
        </div>
    </section>
)

// ---------------------------------------------------------------------------
// Plans
// ---------------------------------------------------------------------------
const ROW_GRID = 'grid grid-cols-2 @xl:grid-cols-[minmax(0,1.5fr)_minmax(0,2fr)_minmax(0,2fr)] gap-x-4 @xl:gap-x-8'
const LABEL_CELL = 'col-span-2 @xl:col-span-1'
const ROW_PADDING = 'py-3'

type PlanValue = React.ReactNode

// Rendered in both plan columns: the standard tier struck through next to the launch boost.
const boostedFreeCredits = (
    <>
        <s className="opacity-60">{STANDARD_FREE_CREDITS.toLocaleString()}</s> {FREE_CREDITS.toLocaleString()}
    </>
)

const planRows: { label: string; free: PlanValue; paid: PlanValue }[] = [
    { label: 'Monthly free credits', free: boostedFreeCredits, paid: boostedFreeCredits },
    { label: 'Monthly volume', free: `Up to ${FREE_CREDITS.toLocaleString()} credits`, paid: 'Unlimited' },
    { label: 'All scanner types', free: true, paid: true },
    { label: 'All AI models', free: true, paid: true },
    { label: 'Custom monthly spending limit', free: true, paid: true },
    { label: 'Deep-link citations & confidence scores', free: true, paid: true },
    { label: 'Observations as queryable events', free: true, paid: true },
]

const PlanValueCell = ({ value }: { value: PlanValue }) => {
    if (value === true) return <IconCheck className="size-5 text-green" />
    return <span className="text-sm text-primary">{value}</span>
}

export const PricingPlans = ({ id }: SectionComponentProps) => (
    <section
        id={id}
        className="scroll-mt-20 not-prose @container grid grid-cols-1 gap-10 @4xl:gap-x-16 @4xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
    >
        <div className="@container">
            <h2 className="text-3xl font-bold text-primary mt-0 mb-4">Plans</h2>
            <div className="divide-y divide-primary">
                {/* Column headers */}
                <div className={`${ROW_GRID} ${ROW_PADDING}`}>
                    <span className="hidden @xl:block" />
                    <span className="text-base font-bold text-primary">Totally free</span>
                    <span className="text-base font-bold text-primary">Pay-as-you-go</span>
                </div>

                {/* Price per credit */}
                <div className={`${ROW_GRID} ${ROW_PADDING} items-start`}>
                    <span className={`${LABEL_CELL} text-base text-primary/70`}>Price per credit</span>
                    <span>
                        <strong className="text-lg text-primary">$0</strong>
                        <span className="block text-sm text-primary/50 mt-0.5">No credit card required</span>
                    </span>
                    <span>
                        <strong className="text-lg text-primary">${CREDIT_PRICE.toFixed(2)}/credit</strong>
                        <span className="block text-sm text-primary/50 mt-0.5">1 credit = $0.01</span>
                    </span>
                </div>

                {/* Feature rows */}
                {planRows.map((row) => (
                    <div key={row.label} className={`${ROW_GRID} ${ROW_PADDING} items-center`}>
                        <span className={`${LABEL_CELL} text-sm text-primary/70`}>{row.label}</span>
                        <PlanValueCell value={row.free} />
                        <PlanValueCell value={row.paid} />
                    </div>
                ))}
            </div>

            {/* Dual CTAs */}
            <div className={`${ROW_GRID} mt-8`}>
                <span className="hidden @xl:block" />
                <OSButton variant="primary" asLink to="https://app.posthog.com/signup" size="lg">
                    Get started – free
                </OSButton>
                <OSButton variant="primary" asLink to="https://app.posthog.com/signup" size="lg">
                    Get started – free
                </OSButton>
            </div>
        </div>

        {/* Sidebar */}
        <aside className="@container @4xl:border-l @4xl:border-primary @4xl:pl-12">
            <h3 className="mb-4 !text-sm font-normal text-secondary">Things you should know about our pricing</h3>
            <ul className="space-y-6 list-none m-0 p-0">
                {pricingDetails.map((point, i) => (
                    <li key={i}>
                        <p className="font-semibold text-primary leading-tight mb-1">{point.headline}</p>
                        <p className="text-sm text-primary/60 mb-0">{point.body}</p>
                    </li>
                ))}
            </ul>
        </aside>
    </section>
)

// ---------------------------------------------------------------------------
// Calculator
// ---------------------------------------------------------------------------
export const PricingCredits = ({ id }: SectionComponentProps) => {
    const [modelKey, setModelKey] = useState('standard')
    const [observations, setObservations] = useState(500)

    const cost = estimateReplayVisionPricing({ observations, modelKey, creditTiers: LAUNCH_CREDIT_TIERS })?.cost ?? 0

    return (
        <section id={id} className="scroll-mt-40 not-prose @container">
            <h2 className="text-3xl font-bold text-primary mt-0 !mb-4">Calculate your cost</h2>
            <p className="text-base text-primary/70 mb-6 max-w-2xl">
                An observation is a single scanner watching one recording. It costs credits (1 credit = $0.01) based on
                its AI model. Pick a model and drag the slider to estimate your monthly cost.
            </p>

            <PricingEstimator
                creditTiers={LAUNCH_CREDIT_TIERS}
                modelKey={modelKey}
                observations={observations}
                onModelKeyChange={setModelKey}
                onObservationsChange={setObservations}
            />

            {/* Total */}
            <div className="mt-6 border-t-2 border-dark dark:border-white">
                <div className="flex items-center justify-between py-3">
                    <p className="font-black text-xl text-primary m-0">Estimated monthly cost</p>
                    <span className="text-2xl font-black text-primary tabular-nums">{formatUSD(cost)}</span>
                </div>
            </div>
        </section>
    )
}

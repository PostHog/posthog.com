import React, { useMemo, useState } from 'react'
import { IconCheck } from '@posthog/icons'
import OSButton from 'components/OSButton'
import Link from 'components/Link'
import { LogSlider, sliderCurve, inverseCurve } from 'components/Pricing/PricingSlider/Slider'
import { calculatePrice, formatUSD } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import { NumericFormat } from 'react-number-format'
import AutosizeInput from 'react-input-autosize'
import type { SectionComponentProps } from 'components/Products/ReaderViewProduct/types'

/*
 * Pricing for Replay Vision. It's billed in usage-based **credits** (1 credit =
 * $0.01) and isn't wired into the billing API, so these sections render the
 * pricing story directly – mirroring the session-replay Plans/Calculator
 * layouts – instead of using the billing-driven shared templates.
 */

const CREDIT_PRICE = 0.01 // USD per credit
const FREE_CREDITS = 2500 // per org, per month – 5x the standard tier for a limited time at launch
const STANDARD_FREE_CREDITS = 500 // the regular free tier, kept visible (struck through) next to the boosted one

// Observation cost by model, in credits. Names are abstracted from the internal
// model list for the public page.
const MODELS: { key: string; label: string; creditsPerObservation: number }[] = [
    { key: 'standard', label: 'Standard', creditsPerObservation: 5 },
    { key: 'premium', label: 'Premium', creditsPerObservation: 15 },
    { key: 'lightweight', label: 'Lightweight', creditsPerObservation: 3 },
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
// Slider + tiers are all expressed in the SAME unit (observations), and the
// slider min is the free allocation — exactly how session replay's calculator
// works. The selected model reshapes the per-observation tiers derived from the
// credit model (free credits ÷ credits-per-observation, price = credits × $0.01).
const MAX_OBSERVATIONS = 50000

const formatCompactNumber = (n: number) =>
    Intl.NumberFormat('en', { notation: 'compact', compactDisplay: n < 999999 ? 'short' : 'long' })
        .format(n)
        .toLowerCase()

export const PricingCredits = ({ id }: SectionComponentProps) => {
    const [modelKey, setModelKey] = useState('standard')
    const [observations, setObservations] = useState(500)

    const model = MODELS.find((m) => m.key === modelKey) ?? MODELS[0]

    // Derive observation-denominated tiers for the selected model.
    const freeObservations = Math.round(FREE_CREDITS / model.creditsPerObservation)
    const pricePerObservation = model.creditsPerObservation * CREDIT_PRICE
    const tiers = useMemo(
        () => [
            { up_to: freeObservations, unit_amount_usd: '0' },
            { up_to: null, unit_amount_usd: pricePerObservation.toFixed(2) },
        ],
        [freeObservations, pricePerObservation]
    )

    // Marks always start at the free allocation and stay positive (LogSlider
    // applies Math.log to min/max/marks, so 0 would break it).
    const marks = useMemo(
        () =>
            Array.from(new Set([freeObservations, 10000, 25000, MAX_OBSERVATIONS]))
                .filter((m) => m >= freeObservations && m <= MAX_OBSERVATIONS)
                .sort((a, b) => a - b),
        [freeObservations]
    )

    // Keep the volume within the (model-dependent) slider range.
    const volume = Math.min(Math.max(observations, freeObservations), MAX_OBSERVATIONS)
    const { total: cost, costByTier } = useMemo(() => calculatePrice(volume, tiers), [volume, tiers])

    const dp = 2
    const formatPrice = (str: string) => {
        const n = parseFloat(str)
        return n === 0 ? 'Free' : `$${n.toFixed(dp)}`
    }

    const activeTierIndex = volume <= freeObservations ? 0 : 1

    return (
        <section id={id} className="scroll-mt-40 not-prose @container">
            <h2 className="text-3xl font-bold text-primary mt-0 !mb-4">Calculate your cost</h2>
            <p className="text-base text-primary/70 mb-6 max-w-2xl">
                An observation is a single scanner watching one recording. It costs credits (1 credit = $0.01) based on
                its AI model. Pick a model and drag the slider to estimate your monthly cost.
            </p>

            {/* Model selector */}
            <div className="mb-8">
                <p className="text-sm font-semibold text-primary/70 mb-2">Model</p>
                <div className="grid grid-cols-2 @xl:grid-cols-4 gap-2">
                    {MODELS.map((m) => (
                        <button
                            key={m.key}
                            type="button"
                            onClick={() => setModelKey(m.key)}
                            className={`text-left rounded-md border px-3 py-2 cursor-pointer transition-colors ${
                                m.key === modelKey
                                    ? 'border-primary bg-accent'
                                    : 'border-primary/30 hover:border-primary'
                            }`}
                        >
                            <span className="block text-sm font-semibold text-primary">{m.label}</span>
                            <span className="block text-xs text-primary/60">
                                {m.creditsPerObservation} {m.creditsPerObservation === 1 ? 'credit' : 'credits'} · $
                                {(m.creditsPerObservation * CREDIT_PRICE).toFixed(2)}/obs
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Tier breakdown */}
            <div className="space-y-px">
                <div className="hidden @md:grid grid-cols-12 items-center px-4 py-2 bg-black/10 dark:bg-white/10 rounded-md font-bold gap-2">
                    <span className="col-span-4 text-sm text-black dark:text-white">Allocation</span>
                    <span className="col-span-3 text-sm text-black dark:text-white">Unit price</span>
                    <span className="col-span-3 text-sm text-right text-black dark:text-white">Your selection</span>
                    <span className="col-span-2 text-sm text-right text-black dark:text-white">Subtotal</span>
                </div>

                {tiers.map((tier, i) => {
                    const isFree = parseFloat(tier.unit_amount_usd) === 0
                    const isActive = i === activeTierIndex
                    const label =
                        i === 0
                            ? `First ${formatCompactNumber(freeObservations)} observations/mo`
                            : `${formatCompactNumber(freeObservations)}+`
                    const tierEvents = costByTier?.[i]?.eventsInThisTier ?? 0
                    const tierCost = costByTier?.[i]?.tierCost ?? 0

                    return (
                        <div
                            key={i}
                            className={`grid grid-cols-2 @md:grid-cols-12 items-center gap-x-2 gap-y-1 px-4 py-1.5 rounded-md ${
                                isActive ? 'bg-yellow/30' : 'transition-colors'
                            }`}
                        >
                            <span
                                className={`order-1 col-span-1 @md:col-span-4 text-sm ${
                                    isActive ? 'font-bold text-primary' : 'text-primary/70'
                                }`}
                            >
                                {label}
                            </span>
                            <span
                                className={`order-2 @md:order-3 col-span-1 @md:col-span-3 text-sm text-right font-code tabular-nums ${
                                    isActive ? 'text-primary' : 'text-primary/70'
                                }`}
                            >
                                {tierEvents.toLocaleString()}
                            </span>
                            <span
                                className={`order-3 @md:order-2 col-span-1 @md:col-span-3 text-sm tabular-nums ${
                                    isFree ? 'text-green' : isActive ? 'text-primary' : 'text-primary/70'
                                }`}
                            >
                                {isFree ? (
                                    <strong>Free</strong>
                                ) : (
                                    <>
                                        <strong>{formatPrice(tier.unit_amount_usd)}</strong>
                                        <span className="opacity-70">/observation</span>
                                    </>
                                )}
                            </span>
                            <span
                                className={`order-4 col-span-1 @md:col-span-2 text-sm text-right font-bold tabular-nums ${
                                    isActive ? 'text-primary' : 'text-primary/70'
                                }`}
                            >
                                {formatUSD(tierCost)}
                            </span>
                        </div>
                    )
                })}
            </div>

            {/* Slider + input */}
            <div className="pl-4 pr-1 mt-6">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                        <NumericFormat
                            inputClassName="bg-primary text-center text-lg font-bold border border-primary hover:border-button dark:border-dark rounded-sm py-1 px-1 min-w-[30px] max-w-[150px]"
                            value={volume}
                            thousandSeparator=","
                            onValueChange={({ floatValue }) => {
                                if (floatValue !== undefined) setObservations(Math.round(floatValue))
                            }}
                            customInput={AutosizeInput}
                        />
                        <span className="text-sm text-primary/60">observations/mo</span>
                    </div>
                    <span className="text-base font-bold text-primary tabular-nums">{formatUSD(cost)}</span>
                </div>
                <LogSlider
                    stepsInRange={100}
                    marks={marks}
                    min={freeObservations}
                    max={MAX_OBSERVATIONS}
                    onChange={(value: number) => setObservations(Math.round(sliderCurve(value)))}
                    value={inverseCurve(volume)}
                />
                <p className="text-sm text-green font-semibold mt-8 mb-0">
                    First {freeObservations.toLocaleString()} observations free –&nbsp;<em>every month!</em>
                </p>
            </div>

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

import React, { useMemo } from 'react'
import { LogSlider, sliderCurve, inverseCurve } from 'components/Pricing/PricingSlider/Slider'
import { calculatePrice, formatUSD } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import type { BillingTier } from 'components/Pricing/PricingCalculator/calculatorLogic'
import { NumericFormat } from 'react-number-format'
import AutosizeInput from 'react-input-autosize'

/*
 * The interactive Replay Vision cost estimator: model selector, observation-
 * denominated tier table, and observations slider. Rendered in two places with
 * different tier sources (see README.md):
 *   - `/replay-vision/pricing` (`PricingCredits`) passes tiers built from its
 *     hardcoded launch constants, keeping the marketing framing.
 *   - `/pricing` (`Pricing/PricingCalculator/Tabs/ReplayVision.tsx`) passes the
 *     billing API's credit tiers, so the tab can never disagree with the shared
 *     calculator's subtotals.
 *
 * Credit tiers are converted to observation tiers for the selected model
 * (up_to ÷ credits-per-observation, price × credits-per-observation). The
 * conversion rounds `up_to` by up to half an observation, so a credit-side and
 * an observation-side total can differ by cents; everything on screen is
 * computed from the observation side, so nothing visible disagrees.
 */

export type { BillingTier }

// Observation cost by model, in credits. Names are abstracted from the internal
// model list for the public page.
export const MODELS: { key: string; label: string; creditsPerObservation: number }[] = [
    { key: 'standard', label: 'Standard', creditsPerObservation: 5 },
    { key: 'premium', label: 'Premium', creditsPerObservation: 15 },
    { key: 'lightweight', label: 'Lightweight', creditsPerObservation: 3 },
]

export const MAX_OBSERVATIONS = 50000

const formatCompactNumber = (n: number) =>
    Intl.NumberFormat('en', { notation: 'compact', compactDisplay: n < 999999 ? 'short' : 'long' })
        .format(n)
        .toLowerCase()

export interface ReplayVisionEstimate {
    model: (typeof MODELS)[number]
    /** USD for one credit, from the first non-free tier — powers the "$0.05/obs" chip labels. */
    creditPrice: number
    freeObservations: number
    /** The credit tiers re-denominated in observations for the selected model. */
    observationTiers: BillingTier[]
    /** Observations clamped to [freeObservations, MAX_OBSERVATIONS] — what the UI displays. */
    clampedObservations: number
    /** Clamped observations converted back to credits — the denomination shared calculator state uses. */
    credits: number
    cost: number
    costByTier: ReturnType<typeof calculatePrice>['costByTier']
}

export const estimateReplayVisionPricing = ({
    observations,
    modelKey,
    creditTiers,
}: {
    observations: number
    modelKey: string
    creditTiers?: BillingTier[] | null
}): ReplayVisionEstimate | null => {
    if (!creditTiers || creditTiers.length === 0) return null
    const model = MODELS.find((m) => m.key === modelKey) ?? MODELS[0]

    const creditPrice = parseFloat(
        creditTiers.find((tier) => parseFloat(tier.unit_amount_usd) !== 0)?.unit_amount_usd ?? '0'
    )
    // Free allocation = the `up_to` of the $0 tier, the same rule `useProducts` uses for `freeLimit`.
    const freeCredits = creditTiers.find((tier) => parseFloat(tier.unit_amount_usd) === 0)?.up_to ?? 0
    // LogSlider applies Math.log to min/max/marks, so the floor must stay positive.
    const freeObservations = Math.max(Math.round(freeCredits / model.creditsPerObservation), 1)

    const observationTiers = creditTiers.map((tier) => ({
        up_to: tier.up_to === null ? null : Math.round(tier.up_to / model.creditsPerObservation),
        unit_amount_usd: (parseFloat(tier.unit_amount_usd) * model.creditsPerObservation).toFixed(2),
    }))

    const clampedObservations = Math.min(Math.max(observations, freeObservations), MAX_OBSERVATIONS)
    const { total: cost, costByTier } = calculatePrice(clampedObservations, observationTiers)

    return {
        model,
        creditPrice,
        freeObservations,
        observationTiers,
        clampedObservations,
        credits: clampedObservations * model.creditsPerObservation,
        cost,
        costByTier,
    }
}

interface PricingEstimatorProps {
    creditTiers?: BillingTier[] | null
    modelKey: string
    observations: number
    onModelKeyChange: (key: string) => void
    onObservationsChange: (observations: number) => void
}

export default function PricingEstimator({
    creditTiers,
    modelKey,
    observations,
    onModelKeyChange,
    onObservationsChange,
}: PricingEstimatorProps): JSX.Element | null {
    const estimate = useMemo(
        () => estimateReplayVisionPricing({ observations, modelKey, creditTiers }),
        [observations, modelKey, creditTiers]
    )

    // Marks always start at the free allocation and stay positive (LogSlider
    // applies Math.log to min/max/marks, so 0 would break it).
    const marks = useMemo(
        () =>
            estimate
                ? Array.from(new Set([estimate.freeObservations, 10000, 25000, MAX_OBSERVATIONS]))
                      .filter((m) => m >= estimate.freeObservations && m <= MAX_OBSERVATIONS)
                      .sort((a, b) => a - b)
                : [],
        [estimate?.freeObservations]
    )

    if (!estimate) return null

    const { creditPrice, freeObservations, observationTiers, clampedObservations: volume, cost, costByTier } = estimate

    const dp = 2
    const formatPrice = (str: string) => {
        const n = parseFloat(str)
        return n === 0 ? 'Free' : `$${n.toFixed(dp)}`
    }

    const activeTierIndex = volume <= freeObservations ? 0 : 1

    return (
        <>
            {/* Model selector */}
            <div className="mb-8">
                <p className="text-sm font-semibold text-primary/70 mb-2">Model</p>
                <div className="grid grid-cols-2 @xl:grid-cols-4 gap-2">
                    {MODELS.map((m) => (
                        <button
                            key={m.key}
                            type="button"
                            onClick={() => onModelKeyChange(m.key)}
                            className={`text-left rounded-md border px-3 py-2 cursor-pointer transition-colors ${
                                m.key === modelKey
                                    ? 'border-primary bg-accent'
                                    : 'border-primary/30 hover:border-primary'
                            }`}
                        >
                            <span className="block text-sm font-semibold text-primary">{m.label}</span>
                            <span className="block text-xs text-primary/60">
                                {m.creditsPerObservation} {m.creditsPerObservation === 1 ? 'credit' : 'credits'} · $
                                {(m.creditsPerObservation * creditPrice).toFixed(2)}/obs
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

                {observationTiers.map((tier, i) => {
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
                                if (floatValue !== undefined) onObservationsChange(Math.round(floatValue))
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
                    onChange={(value: number) => onObservationsChange(Math.round(sliderCurve(value)))}
                    value={inverseCurve(volume)}
                />
                <p className="text-sm text-green font-semibold mt-8 mb-0">
                    First {freeObservations.toLocaleString()} observations free –&nbsp;<em>every month!</em>
                </p>
            </div>
        </>
    )
}

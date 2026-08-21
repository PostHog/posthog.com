import React, { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import { IconLightBulb } from '@posthog/icons'
import { NumericFormat } from 'react-number-format'
import AutosizeInput from 'react-input-autosize'
import Link from 'components/Link'
import { LogSlider, inverseCurve, sliderCurve } from 'components/Pricing/PricingSlider/Slider'
import { formatUSD } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import { calculatePrice } from 'components/Pricing/PricingCalculator/calculatorLogic'
import {
    ComputeRateCard,
    PUBLISHED_COMPUTE_RATE_CARD,
    PUBLISHED_RATES_DATE,
    SANDBOX_CPU_CORES,
    SANDBOX_MEMORY_GIB,
    hourlyComputeUsd,
} from 'lib/posthogDesktopCompute'

/*
 * PostHog Desktop's tab in the /pricing calculator. Registered in `productTabs` in Tabbed.tsx
 * (the ProductAnalyticsTab convention).
 *
 * Why it isn't the generic slider: Desktop meters two very different things into one credit
 * balance. Model tokens are passed through at the provider's price with no markup, so there is
 * nothing for us to quote — but cloud task time is ours, and it's the part people can't estimate
 * from a token table. A single "credits per month" slider would hide exactly the distinction the
 * page needs to make, so the tab asks for the two inputs separately and adds them up.
 *
 * Cloud time is priced from the same rate card as the table on `/docs/posthog-desktop/pricing`:
 * live from `/api/posthog-desktop-pricing`, falling back to the published snapshot in
 * `lib/posthogDesktopCompute`. Neither the rate nor the fallback is duplicated here, so the two
 * surfaces can't quote different numbers.
 *
 * Denominations, following the Replay Vision tab: cloud time is entered in hours and converted,
 * while tokens are entered in credits directly — the billing unit, and the unit PostHog AI's
 * slider already uses for the same kind of spend. Shared state (`product.volume`, the tab-list
 * subtotal, the generated calculator URL) is credits throughout, so `setVolume` restores and
 * `calculatePrice` agree with us.
 */

/** 100 credits = $1. */
const CREDITS_PER_USD = 100

interface PricingResponse {
    compute: ComputeRateCard | null
}

const fetchPricing = async (url: string): Promise<PricingResponse> => {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`Pricing request returned ${response.status}`)
    }
    return response.json() as Promise<PricingResponse>
}

const Row = ({
    label,
    suffix,
    value,
    onChange,
    slider,
    cost,
    note,
}: {
    label: string
    suffix: string
    value: number
    onChange: (value: number) => void
    slider: { min: number; max: number; marks: number[] }
    cost: number
    note: React.ReactNode
}): JSX.Element => (
    <div className="grid grid-cols-8 mb-6">
        <div className="col-span-6">
            <p className="mb-2 text-sm font-semibold">{label}</p>
            <p className="mb-2">
                <NumericFormat
                    inputClassName="bg-transparent text-center focus:ring-0 focus:border-red dark:focus:border-yellow focus:bg-white dark:focus:bg-accent-dark font-code max-w-[103px] text-sm border border-light hover:border-button dark:border-dark rounded-sm py-1 px-0 min-w-[25px] px-1"
                    value={value}
                    thousandSeparator=","
                    onValueChange={({ floatValue }) => onChange(floatValue || 0)}
                    customInput={AutosizeInput}
                />{' '}
                <span className="opacity-70 text-sm">{suffix}</span>
            </p>
        </div>
        <div className="col-span-2 text-right pr-3">
            <p className="font-semibold mb-0">{formatUSD(cost)}</p>
        </div>
        <div className="col-span-full pr-1.5">
            <LogSlider
                stepsInRange={100}
                marks={slider.marks}
                min={slider.min}
                max={slider.max}
                onChange={(next) => onChange(sliderCurve(next))}
                value={inverseCurve(Math.max(value, slider.min))}
            />
        </div>
        <div className="col-span-full pr-1.5 mt-10 md:mt-8 text-sm text-secondary">{note}</div>
    </div>
)

export default function PostHogDesktopTab({
    activeProduct,
    setProduct,
}: {
    activeProduct: any
    setProduct: (handle: string, data: any) => void
    [key: string]: any
}): JSX.Element {
    const { data: pricing, error } = useSWR<PricingResponse>('/api/posthog-desktop-pricing', fetchPricing)
    // A failed rate-card fetch still settles the tab — it just renders without the compute row —
    // so this is "we know what we're going to know", not "we have prices".
    const pricingSettled = pricing !== undefined || error !== undefined

    // The same tier array `setVolume` walks, so the in-tab cost and the shared subtotal cannot
    // disagree. Empty deps: the tab remounts per tab switch (`key={activeProduct.type}`).
    const creditTiers = useMemo(() => activeProduct?.billingData?.plans.find((plan: any) => plan.tiers)?.tiers, [])
    const freeCredits = useMemo(
        () => creditTiers?.find((tier: any) => tier.unit_amount_usd === '0')?.up_to ?? 0,
        [creditTiers]
    )

    // The API reports no card until the sandbox rate card is published, and returns nothing at all
    // when it's down. Neither means cloud time is free, so fall back to the published rates rather
    // than dropping the row — an estimate that silently omits compute is the one wrong answer here.
    const liveCompute = pricing?.compute ?? null
    const computeRate = hourlyComputeUsd(liveCompute ?? PUBLISHED_COMPUTE_RATE_CARD)
    const isPublishedRate = liveCompute === null

    /*
     * The token slider is denominated in credits and starts at the free allocation, matching
     * PostHog AI's — the sibling product billed the same way. Both the unit and the starting
     * point are load-bearing: credits are the billing unit the tiers are priced in, and below
     * the free allocation there is no arithmetic to show, which is why every other tab treats
     * `slider.min` and the free tier as the same number.
     *
     * Bounds come off the live allocation rather than a literal, so they follow it if it moves.
     */
    const tokenSliderMin = Math.max(freeCredits, 1)
    const tokenSlider = {
        min: tokenSliderMin,
        max: tokenSliderMin * 100,
        marks: [tokenSliderMin, tokenSliderMin * 5, tokenSliderMin * 25, tokenSliderMin * 100],
    }

    const [hours, setHours] = useState(20)
    // Null until the rate card settles. Seeding this at mount would be wrong: the seed splits the
    // shared credit balance into compute and tokens, and the compute half isn't known yet, so an
    // early seed counts the whole balance as tokens and then inflates the estimate the moment the
    // rates land. Waiting one tick costs a skeleton and keeps the arithmetic honest.
    const [tokenCredits, setTokenCredits] = useState<number | null>(null)

    const computeSpend = hours * computeRate
    const computeCredits = Math.round(computeSpend * CREDITS_PER_USD)
    const credits = tokenCredits === null ? 0 : computeCredits + tokenCredits
    const { total, costByTier } = useMemo(() => calculatePrice(credits, creditTiers), [credits, creditTiers])

    // Seed once, from the shared credit volume, so an estimate survives a tab switch and a
    // restored `?posthog_code[volume]=N` lands on the right total. The compute/token split isn't
    // recoverable from one number, so the remainder after compute is treated as tokens — floored
    // at the slider's own minimum, so the thumb can never sit off the start of its track.
    useEffect(() => {
        if (!pricingSettled || tokenCredits !== null) return
        const external = Number(activeProduct.volume)
        const restored = Number.isFinite(external) && external > 0 ? external - computeCredits : 0
        setTokenCredits(Math.max(tokenSliderMin, Math.round(restored)))
    }, [pricingSettled])

    // Value deps only — `setProduct` is a new function on every `useProducts` render, so listing
    // it would loop the effect. Skipped until seeded, so the shared state never sees the
    // placeholder zero.
    useEffect(() => {
        if (tokenCredits === null) return
        setProduct('posthog_code', { cost: total, volume: credits, costByTier })
    }, [total, credits, tokenCredits === null])

    if (tokenCredits === null) {
        return <div className="h-64 bg-accent border border-primary rounded-md animate-pulse" />
    }

    return (
        <div className="@container mb-4">
            <div className="bg-accent border border-primary rounded-md px-4 py-3 mb-6 text-sm">
                PostHog Desktop bills tokens and cloud compute to a single credit balance (100 credits = $1). Tokens are
                passed through at the model provider's price with <strong>no markup</strong>; cloud tasks add the
                sandbox they run on.
            </div>

            <Row
                label="Cloud task time"
                suffix="hours/month"
                value={hours}
                onChange={(value) => setHours(Math.round(value))}
                slider={{ min: 1, max: 500, marks: [1, 10, 100, 500] }}
                cost={computeSpend}
                note={
                    <>
                        Every task gets {SANDBOX_CPU_CORES} CPU cores and {SANDBOX_MEMORY_GIB} GiB, so cloud time works
                        out at about {formatUSD(computeRate)}/hour. Tasks you run on your own machine cost nothing.
                        {isPublishedRate && <> Based on the rates published {PUBLISHED_RATES_DATE}.</>}
                    </>
                }
            />

            <Row
                label="AI tokens"
                suffix="credits/month"
                value={tokenCredits}
                onChange={(value) => setTokenCredits(Math.round(value))}
                slider={tokenSlider}
                cost={tokenCredits / CREDITS_PER_USD}
                note={
                    <>
                        Billed at exactly what the model provider charges, with no markup. See the{' '}
                        <Link to="/docs/posthog-desktop/pricing">per-model rates</Link> — a cheaper model on
                        straightforward work is the biggest lever here.
                    </>
                }
            />

            {freeCredits > 0 && (
                <div className="flex gap-1 items-center pb-2">
                    <IconLightBulb className="size-5 inline-block text-[#4f9032] dark:text-green relative -top-px" />
                    <span className="text-sm text-[#4f9032] dark:text-green font-semibold">
                        First {freeCredits.toLocaleString()} credits (worth {formatUSD(freeCredits / CREDITS_PER_USD)})
                        free –&nbsp;<em>every month!</em>
                    </span>
                </div>
            )}
        </div>
    )
}

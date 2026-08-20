import React, { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import { IconLightBulb } from '@posthog/icons'
import { NumericFormat } from 'react-number-format'
import AutosizeInput from 'react-input-autosize'
import Link from 'components/Link'
import { LogSlider, inverseCurve, sliderCurve } from 'components/Pricing/PricingSlider/Slider'
import { formatUSD } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import { calculatePrice } from 'components/Pricing/PricingCalculator/calculatorLogic'

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
 * Denominations, following the Replay Vision tab: the UI works in hours and dollars, shared state
 * (`product.volume`, the tab-list subtotal, the generated calculator URL) stays in credits — the
 * billing unit — so `setVolume` restores and `calculatePrice` agree with us.
 */

/**
 * Every cloud task gets the same sandbox; sizes aren't customizable yet. The rate card prices
 * CPU and memory per second, so the shape has to come from somewhere, and it isn't in the API.
 * If tasks ever get resizable, this becomes another input rather than a constant.
 */
const SANDBOX_CPU_CORES = 0.5
const SANDBOX_MEMORY_GIB = 16
const SECONDS_PER_HOUR = 3600

/** 100 credits = $1. */
const CREDITS_PER_USD = 100

interface ComputeRateCard {
    cpu_core_second_usd: string
    memory_gib_second_usd: string
}

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

/**
 * What one hour of cloud task time costs, from the live rate card. Shares the
 * `/api/posthog-desktop-pricing` route with the model table on the Desktop pricing docs, so the
 * two can't quote different numbers.
 */
const hourlyComputeUsd = (compute: ComputeRateCard): number =>
    SANDBOX_CPU_CORES * SECONDS_PER_HOUR * Number(compute.cpu_core_second_usd) +
    SANDBOX_MEMORY_GIB * SECONDS_PER_HOUR * Number(compute.memory_gib_second_usd)

const Row = ({
    label,
    prefix,
    suffix,
    value,
    onChange,
    slider,
    cost,
    note,
}: {
    label: string
    prefix?: string
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
                {prefix}
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

    const computeRate = pricing?.compute ? hourlyComputeUsd(pricing.compute) : null

    const [hours, setHours] = useState(20)
    // Null until the rate card settles. Seeding this at mount would be wrong: the seed splits the
    // shared credit balance into compute and tokens, and the compute half isn't known yet, so an
    // early seed counts the whole balance as tokens and then inflates the estimate the moment the
    // rates land. Waiting one tick costs a skeleton and keeps the arithmetic honest.
    const [tokenSpend, setTokenSpend] = useState<number | null>(null)

    const computeSpend = computeRate === null ? 0 : hours * computeRate
    const credits = tokenSpend === null ? 0 : Math.round((computeSpend + tokenSpend) * CREDITS_PER_USD)
    const { total, costByTier } = useMemo(() => calculatePrice(credits, creditTiers), [credits, creditTiers])

    // Seed once, from the shared credit volume, so an estimate survives a tab switch and a
    // restored `?posthog_code[volume]=N` lands on the right total. The compute/token split isn't
    // recoverable from one number, so the remainder after compute is treated as tokens.
    useEffect(() => {
        if (!pricingSettled || tokenSpend !== null) return
        const external = Number(activeProduct.volume)
        const spend = Number.isFinite(external) && external > 0 ? external / CREDITS_PER_USD : 0
        setTokenSpend(Math.max(0, Math.round(spend - computeSpend)))
    }, [pricingSettled])

    // Value deps only — `setProduct` is a new function on every `useProducts` render, so listing
    // it would loop the effect. Skipped until seeded, so the shared state never sees the
    // placeholder zero.
    useEffect(() => {
        if (tokenSpend === null) return
        setProduct('posthog_code', { cost: total, volume: credits, costByTier })
    }, [total, credits, tokenSpend === null])

    if (tokenSpend === null) {
        return <div className="h-64 bg-accent border border-primary rounded-md animate-pulse" />
    }

    return (
        <div className="@container mb-4">
            <div className="bg-accent border border-primary rounded-md px-4 py-3 mb-6 text-sm">
                PostHog Desktop bills tokens and cloud compute to a single credit balance (100 credits = $1). Tokens are
                passed through at the model provider's price with <strong>no markup</strong>; cloud tasks add the
                sandbox they run on.
            </div>

            {computeRate !== null && (
                <Row
                    label="Cloud task time"
                    suffix="hours/month"
                    value={hours}
                    onChange={(value) => setHours(Math.round(value))}
                    slider={{ min: 1, max: 500, marks: [1, 10, 100, 500] }}
                    cost={computeSpend}
                    note={
                        <>
                            Every task gets {SANDBOX_CPU_CORES} CPU cores and {SANDBOX_MEMORY_GIB} GiB, so cloud time
                            works out at about {formatUSD(computeRate)}/hour. Tasks you run on your own machine cost
                            nothing.
                        </>
                    }
                />
            )}

            <Row
                label="AI tokens"
                prefix="$"
                suffix="/month"
                value={tokenSpend}
                onChange={(value) => setTokenSpend(Math.round(value))}
                slider={{ min: 1, max: 2000, marks: [1, 20, 200, 2000] }}
                cost={tokenSpend}
                note={
                    <>
                        Billed at exactly what the model provider charges. See the{' '}
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

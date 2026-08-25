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
    BILLABLE_CPU_CORES,
    BILLABLE_MEMORY_GIB,
    ComputeRateCard,
    PUBLISHED_COMPUTE_RATE_CARD,
    PUBLISHED_RATES_DATE,
    hourlyComputeUsd,
} from 'lib/posthogDesktopCompute'

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
    prefix,
}: {
    label: string
    suffix: string
    value: number
    onChange: (value: number) => void
    slider?: { min: number; max: number; marks: number[]; scaleMin?: number }
    cost: number
    note: React.ReactNode
    prefix?: string
}): JSX.Element => {
    const scaleMin = slider?.scaleMin ?? Math.max(slider?.min ?? 0, 1)
    const fromSlider = (next: number): number => {
        const rounded = Math.round(sliderCurve(next))
        return slider?.min === 0 && rounded <= scaleMin ? 0 : Math.max(rounded, slider?.min ?? 0)
    }

    return (
        <div className="grid grid-cols-8 mb-6">
            <div className="col-span-6">
                <p className="mb-2 text-sm font-semibold">{label}</p>
                <p className="mb-2">
                    <NumericFormat
                        inputClassName="bg-transparent text-center focus:ring-0 focus:border-red dark:focus:border-yellow focus:bg-white dark:focus:bg-accent-dark font-code max-w-[103px] text-sm border border-light hover:border-button dark:border-dark rounded-sm py-1 px-0 min-w-[25px] px-1"
                        value={value}
                        prefix={prefix}
                        thousandSeparator=","
                        decimalScale={prefix ? 2 : 0}
                        onValueChange={({ floatValue }) => onChange(floatValue || 0)}
                        customInput={AutosizeInput}
                    />{' '}
                    <span className="opacity-70 text-sm">{suffix}</span>
                </p>
            </div>
            <div className="col-span-2 text-right pr-3">
                <p className="font-semibold mb-0">{formatUSD(cost)}</p>
            </div>
            {slider && (
                <div className="col-span-full pr-1.5">
                    <LogSlider
                        stepsInRange={100}
                        marks={slider.marks}
                        min={slider.min}
                        max={slider.max}
                        scaleMin={scaleMin}
                        onChange={(next) => onChange(fromSlider(next))}
                        value={inverseCurve(Math.max(value, scaleMin))}
                    />
                </div>
            )}
            <div className={`col-span-full pr-1.5 text-sm text-secondary ${slider ? 'mt-10 md:mt-8' : ''}`}>{note}</div>
        </div>
    )
}

export default function PostHogDesktopTab({
    activeProduct,
    setProduct,
}: {
    activeProduct: any
    setProduct: (handle: string, data: any) => void
    [key: string]: any
}): JSX.Element {
    const { data: pricing, error } = useSWR<PricingResponse>('/api/posthog-desktop-pricing', fetchPricing)
    const pricingSettled = pricing !== undefined || error !== undefined

    const creditTiers = useMemo(() => activeProduct?.billingData?.plans.find((plan: any) => plan.tiers)?.tiers, [])
    const freeCredits = useMemo(
        () => creditTiers?.find((tier: any) => tier.unit_amount_usd === '0')?.up_to ?? 0,
        [creditTiers]
    )

    const liveCompute = pricing?.compute ?? null
    const computeRate = hourlyComputeUsd(liveCompute ?? PUBLISHED_COMPUTE_RATE_CARD)
    const isPublishedRate = liveCompute === null

    const [hours, setHours] = useState(0)
    const [modelSpend, setModelSpend] = useState<number | null>(null)

    const computeSpend = hours * computeRate
    const computeCredits = Math.round(computeSpend * CREDITS_PER_USD)
    const modelCredits = modelSpend === null ? 0 : Math.round(modelSpend * CREDITS_PER_USD)
    const credits = computeCredits + modelCredits
    const { total, costByTier } = useMemo(() => calculatePrice(credits, creditTiers), [credits, creditTiers])

    useEffect(() => {
        if (!pricingSettled || modelSpend !== null) return
        const external = Number(activeProduct.volume)
        const restored = Number.isFinite(external) && external > 0 ? (external - computeCredits) / CREDITS_PER_USD : 0
        setModelSpend(Math.max(0, restored))
    }, [pricingSettled])

    useEffect(() => {
        if (modelSpend === null) return
        setProduct('posthog_code', { cost: total, volume: credits, costByTier })
    }, [total, credits, modelSpend === null])

    if (modelSpend === null) {
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
                slider={{ min: 0, scaleMin: 1, max: 500, marks: [0, 10, 100, 500] }}
                cost={computeSpend}
                note={
                    <>
                        A cloud task bills {BILLABLE_CPU_CORES} CPU cores and {BILLABLE_MEMORY_GIB} GiB for as long as
                        it runs, so cloud time works out at about {formatUSD(computeRate)}/hour. Local tasks run on your
                        own machine.
                        {isPublishedRate && <> Based on the rates published {PUBLISHED_RATES_DATE}.</>}
                    </>
                }
            />

            <Row
                label="Estimated model usage"
                suffix="/month"
                prefix="$"
                value={modelSpend}
                onChange={setModelSpend}
                cost={modelSpend}
                note={
                    <>
                        Billed at exactly what the model provider charges, with no markup. See the{' '}
                        <Link to="/docs/posthog-desktop/pricing" className="font-semibold underline">
                            per-model rates
                        </Link>
                        .
                    </>
                }
            />

            {freeCredits > 0 && (
                <div className="flex gap-1 items-center pb-2">
                    <IconLightBulb className="size-5 inline-block text-[#4f9032] dark:text-green relative -top-px" />
                    <span className="text-sm text-[#4f9032] dark:text-green font-semibold">
                        First {formatUSD(freeCredits / CREDITS_PER_USD)} of combined cloud compute and model usage free –{' '}
                        <em>every month!</em>
                    </span>
                </div>
            )}
        </div>
    )
}

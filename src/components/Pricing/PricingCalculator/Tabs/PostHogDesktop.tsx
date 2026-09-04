import React, { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import { IconInfo } from '@posthog/icons'
import Link from 'components/Link'
import Tooltip from 'components/Tooltip'
import { formatUSD } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import { calculatePrice } from 'components/Pricing/PricingCalculator/calculatorLogic'
import UsageSliderRow, { UsageSliderHeader } from '../UsageSliderRow'
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

    const freeUsd = freeCredits / CREDITS_PER_USD

    return (
        <div className="@container mb-4">
            <div className="bg-accent border border-primary rounded-md px-4 py-3 mb-4 text-sm">
                PostHog Desktop bills tokens and cloud compute to a single credit balance (100 credits = $1). Tokens are
                passed through at the model provider's price with <strong>no markup</strong>; cloud tasks add the
                sandbox they run on.
                {isPublishedRate ? ` Cloud time uses the rates published ${PUBLISHED_RATES_DATE}.` : ''}
            </div>

            <UsageSliderHeader unit="Hours" />
            <div className="divide-y divide-primary border-t border-primary">
                <UsageSliderRow
                    label="Cloud task time"
                    subtitle={
                        <span className="inline-flex items-center gap-1">
                            {formatUSD(computeRate)} per hour
                            <Tooltip
                                content={`A cloud task bills ${BILLABLE_CPU_CORES} CPU cores and ${BILLABLE_MEMORY_GIB} GiB for as long as it runs, so cloud time works out at about ${formatUSD(
                                    computeRate
                                )}/hour. Local tasks run on your own machine.`}
                                tooltipClassName="max-w-[250px]"
                                placement="top"
                            >
                                <span className="relative inline-block">
                                    <IconInfo className="size-3.5 opacity-70 inline-block" />
                                </span>
                            </Tooltip>
                        </span>
                    }
                    value={hours}
                    onChange={(next) => setHours(Math.max(0, Math.round(next)))}
                    marks={[0, 10, 100, 500]}
                    min={0}
                    max={500}
                />
            </div>

            <div className="pt-3">
                <UsageSliderHeader unit="USD" />
                <div className="divide-y divide-primary border-t border-primary">
                    <UsageSliderRow
                        label="Estimated model usage"
                        subtitle={
                            <>
                                Billed at exactly what the model provider charges, with no markup. See the{' '}
                                <Link
                                    to="/docs/posthog-desktop/pricing"
                                    className="text-red dark:text-yellow font-semibold"
                                >
                                    per-model rates
                                </Link>
                                .
                            </>
                        }
                        value={modelSpend}
                        inputPrefix="$"
                        onChange={(next) => setModelSpend(Math.max(0, Math.round(next * 100) / 100))}
                        marks={[0, 20, 100, 500]}
                        min={0}
                        max={500}
                    />
                </div>
            </div>

            {freeCredits > 0 && (
                <div className="pr-1.5 pt-3 border-t border-primary">
                    <span className="text-sm text-secondary">
                        The first {formatUSD(freeUsd)} of combined cloud compute and model usage are free, every month.
                    </span>
                </div>
            )}
        </div>
    )
}

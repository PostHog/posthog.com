import React from 'react'
import useProduct from 'hooks/useProduct'
import OSButton from 'components/OSButton'
import { SectionComponentProps } from '../types'

const getMaxDecimalPlaces = (tiers: any[]) =>
    tiers.reduce((max: number, tier: any) => {
        const price = parseFloat(tier.unit_amount_usd)
        if (price === 0) return max
        const str = tier.unit_amount_usd.toString()
        const dot = str.indexOf('.')
        return dot === -1 ? max : Math.max(max, str.length - dot - 1)
    }, 0)

const PricingHeadline = ({ id, productData }: SectionComponentProps) => {
    const billingHandle = productData?.sharesFreeTier || productData?.handle
    const product = useProduct({ handle: billingHandle })
    const billing = product?.billingData

    if (!billing?.plans?.length || !productData) return null

    const freePlan = billing.plans.find((p: any) => p.free_allocation)
    const paidPlan = billing.plans.find((p: any) => !p.free_allocation)
    const tiers = paidPlan?.tiers || []
    const unit = billing.unit || 'unit'
    const dp = getMaxDecimalPlaces(tiers)
    const firstPaidTier = tiers.find((t: any) => parseFloat(t.unit_amount_usd) > 0)
    const lastPaidTier = [...tiers].reverse().find((t: any) => parseFloat(t.unit_amount_usd) > 0)
    const hasVolumeDiscount = lastPaidTier && lastPaidTier !== firstPaidTier

    return (
        <section id={id} className="scroll-mt-20 not-prose @container">
            <h2 className="text-3xl font-bold text-primary mt-0 mb-10">TL;DR:</h2>

            <div className="grid grid-cols-1 @2xl:grid-cols-[3fr_2fr] gap-10 @2xl:gap-16">
                <div>
                    <p className="text-3xl leading-snug font-normal text-primary mb-3">
                        {freePlan?.free_allocation && (
                            <>
                                <strong className="font-bold">
                                    {freePlan.free_allocation.toLocaleString()} {unit}s free
                                </strong>{' '}
                                every month
                            </>
                        )}
                        {firstPaidTier && (
                            <>
                                <br />
                                {'then starting at '}
                                <strong className="font-bold tabular-nums">
                                    ${parseFloat(firstPaidTier.unit_amount_usd).toFixed(dp)}/{unit}
                                </strong>
                            </>
                        )}
                    </p>
                    {hasVolumeDiscount && (
                        <p className="text-lg text-primary/50 mb-4">
                            Pricing decreases with volume — as low as{' '}
                            <strong className="font-semibold text-primary/70">
                                ${parseFloat(lastPaidTier.unit_amount_usd).toFixed(dp)}/{unit}
                            </strong>
                        </p>
                    )}
                    <div className="flex flex-wrap items-center gap-3 mt-6">
                        <OSButton variant="primary" asLink to="https://app.posthog.com/signup" size="lg">
                            Get started — free
                        </OSButton>
                        <OSButton variant="secondary" asLink to="/talk-to-a-human" size="lg">
                            Talk to a human
                        </OSButton>
                    </div>
                </div>

                <div className="self-start">
                    <p className="text-sm font-semibold text-primary mb-3">How our pricing works</p>
                    <ul className="pl-5 space-y-2">
                        <li className="list-disc text-sm text-primary/80">
                            <strong className="text-primary font-semibold">Pay per use</strong>, not per seat. Your bill
                            scales with usage, not headcount.
                        </li>
                        <li className="list-disc text-sm text-primary/80">
                            <strong className="text-primary font-semibold">Volume discounts</strong> kick in
                            automatically — no negotiations needed.
                        </li>
                        <li className="list-disc text-sm text-primary/80">
                            <strong className="text-primary font-semibold">Set billing limits</strong> per product.
                            Never get an unexpected bill.
                        </li>
                        <li className="list-disc text-sm text-primary/80">
                            <strong className="text-primary font-semibold">We &lt;3 startups:</strong> Under 2 years old
                            and pre-series B?{' '}
                            <a href="/startups" className="underline">
                                Apply for $50k in credits
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default PricingHeadline

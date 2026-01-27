import React from 'react'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'

interface PricingSectionProps {
    productData: any
}

export default function PricingSection({ productData }: PricingSectionProps): JSX.Element {
    const billingData = productData?.billingData
    const customPricingContent = productData?.customPricingContent

    // Get pricing info
    const freePlan = billingData?.plans?.find((plan: any) => plan.free_allocation)
    const paidPlan = billingData?.plans?.find((plan: any) => !plan.free_allocation)
    const tiers = paidPlan?.tiers || []
    const freeAllocation = freePlan?.free_allocation || paidPlan?.free_allocation
    const unit = billingData?.unit

    // Get starting price
    const firstPaidTier = tiers.find((tier: any) => tier.unit_amount_usd !== '0')
    const startingPrice = firstPaidTier?.unit_amount_usd

    return (
        <section id="pricing" className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Pricing</h2>

            {/* Free tier info */}
            {freeAllocation && (
                <div className="mb-6 p-4 bg-accent rounded-lg">
                    <h3 className="text-lg font-semibold m-0 mb-2">Free tier</h3>
                    <p className="text-secondary m-0">
                        <span className="text-2xl font-bold text-primary">{formatCompactNumber(freeAllocation)}</span>{' '}
                        {unit && (
                            <span>
                                {unit}
                                {Number(freeAllocation) !== 1 ? 's' : ''}
                            </span>
                        )}{' '}
                        free every month
                    </p>
                </div>
            )}

            {/* Starting price */}
            {startingPrice && (
                <div className="mb-6">
                    <p className="text-secondary">
                        Then from <span className="text-xl font-bold text-primary">${startingPrice}</span>
                        {unit && <span>/{unit}</span>}
                    </p>
                </div>
            )}

            {/* Pricing tiers table */}
            {tiers.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Volume pricing</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-primary">
                                    <th className="text-left py-2 pr-4 font-semibold">Volume</th>
                                    <th className="text-right py-2 font-semibold">Price per {unit || 'unit'}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tiers.map((tier: any, index: number) => {
                                    const prevTier = index > 0 ? tiers[index - 1] : null
                                    const fromValue = prevTier ? prevTier.up_to + 1 : 0
                                    const toValue = tier.up_to

                                    return (
                                        <tr key={index} className="border-b border-primary/50">
                                            <td className="py-2 pr-4">
                                                {toValue === null ? (
                                                    <span>{formatCompactNumber(fromValue)}+</span>
                                                ) : (
                                                    <span>
                                                        {formatCompactNumber(fromValue)} -{' '}
                                                        {formatCompactNumber(toValue)}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-2 text-right">
                                                {tier.unit_amount_usd === '0' ? (
                                                    <span className="text-green font-semibold">Free</span>
                                                ) : (
                                                    <span>${tier.unit_amount_usd}</span>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Custom pricing content (e.g., AI credits explanation) */}
            {customPricingContent && <div className="mb-6">{customPricingContent}</div>}

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
                <CallToAction to="https://app.posthog.com/signup" size="sm">
                    Get started - free
                </CallToAction>
                <CallToAction to="/pricing" size="sm" type="secondary">
                    View full pricing
                </CallToAction>
            </div>
        </section>
    )
}

/**
 * Format number into compact format (1K, 1M, etc.)
 */
function formatCompactNumber(number: number): string {
    const formatter = Intl.NumberFormat('en', {
        notation: 'compact',
        compactDisplay: number < 999999 ? 'short' : 'long',
    })
    return formatter.format(number).toLowerCase()
}

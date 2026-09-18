import React from 'react'
import useProduct from 'hooks/useProduct'
import { SectionComponentProps } from '../types'

const formatCompactNumber = (n: number) =>
    Intl.NumberFormat('en', { notation: 'compact', compactDisplay: n < 999999 ? 'short' : 'long' })
        .format(n)
        .toLowerCase()

const getMaxDecimalPlaces = (tiers: any[]) =>
    tiers.reduce((max: number, tier: any) => {
        const price = parseFloat(tier.unit_amount_usd)
        if (price === 0) return max
        const str = tier.unit_amount_usd.toString()
        const dot = str.indexOf('.')
        return dot === -1 ? max : Math.max(max, str.length - dot - 1)
    }, 0)

const TiersTable = ({ tiers, unit }: { tiers: any[]; unit: string }) => {
    const dp = getMaxDecimalPlaces(tiers)
    const formatPrice = (str: string) => {
        const n = parseFloat(str)
        return n === 0 ? 'Free' : `$${n.toFixed(dp)}`
    }

    return (
        <div className="w-full">
            {tiers.map((tier: any, i: number) => {
                const isFree = parseFloat(tier.unit_amount_usd) === 0
                const prev = i > 0 ? tiers[i - 1] : null
                const isLast = !tier.up_to

                let label = ''
                if (i === 0) label = `First ${formatCompactNumber(tier.up_to)}`
                else if (isLast) label = `${formatCompactNumber(prev?.up_to)}+`
                else label = `${formatCompactNumber(prev?.up_to)} – ${formatCompactNumber(tier.up_to)}`

                return (
                    <div
                        key={i}
                        className="flex items-center justify-between py-3 border-b border-light last:border-b-0"
                    >
                        <span className="text-primary/70 text-sm">{label}</span>
                        <span
                            className={`text-sm font-semibold tabular-nums ${isFree ? 'text-green' : 'text-primary'}`}
                        >
                            {isFree ? (
                                'Free'
                            ) : (
                                <>
                                    {formatPrice(tier.unit_amount_usd)}
                                    <span className="font-normal text-primary/50"> /{unit}</span>
                                </>
                            )}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}

const AddonRates = ({ addons, unit }: { addons: any[]; unit: string }) => {
    const visible = addons.filter((a: any) => {
        const plan = a.plans?.find((p: any) => p.tiers)
        return plan?.tiers?.some((t: any) => parseFloat(t.unit_amount_usd) > 0)
    })
    if (!visible.length) return null

    return (
        <div className="mt-16 pt-16 border-t border-light">
            <p className="text-xs uppercase tracking-widest text-primary/40 mb-10">Add-ons</p>
            <div className="space-y-12">
                {visible.map((addon: any) => {
                    const plan = addon.plans?.find((p: any) => p.tiers)
                    const tiers = plan?.tiers || []
                    const addonUnit = addon.unit || unit
                    const firstPaidTier = tiers.find((t: any) => parseFloat(t.unit_amount_usd) > 0)
                    const dp = getMaxDecimalPlaces(tiers)

                    return (
                        <div key={addon.type}>
                            <h3 className="text-xl font-semibold text-primary mb-1">{addon.name}</h3>
                            {firstPaidTier && (
                                <p className="text-sm text-primary/50 mb-6">
                                    From{' '}
                                    <span className="font-semibold text-primary">
                                        ${parseFloat(firstPaidTier.unit_amount_usd).toFixed(dp)}
                                    </span>
                                    /{addonUnit}
                                </p>
                            )}
                            <TiersTable tiers={tiers} unit={addonUnit} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const Pricing = ({ id, productData }: SectionComponentProps) => {
    const billingHandle = productData?.sharesFreeTier || productData?.handle
    const product = useProduct({ handle: billingHandle })
    const billing = product?.billingData

    if (!billing?.plans?.length || !productData) return null

    const freePlan = billing.plans.find((p: any) => p.free_allocation)
    const paidPlan = billing.plans.find((p: any) => !p.free_allocation)
    const tiers = paidPlan?.tiers || []
    const unit = billing.unit || 'unit'
    const addons = billing.addons || []

    const firstPaidTier = tiers.find((t: any) => parseFloat(t.unit_amount_usd) > 0)
    const dp = getMaxDecimalPlaces(tiers)

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            {/* Header */}
            <div className="mb-16">
                <p className="text-xs uppercase tracking-widest text-primary/40 mb-4">Pricing</p>
                <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-5xl @2xl:text-7xl font-bold text-primary tracking-tight">$0</span>
                    <span className="text-xl text-primary/50">/mo to start</span>
                </div>
                <p className="text-base text-primary/60 mt-1">No credit card required</p>
            </div>

            {/* Free tier callout */}
            {freePlan?.free_allocation && (
                <div className="mb-16">
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-4xl @2xl:text-6xl font-bold text-green tracking-tight">
                            {freePlan.free_allocation.toLocaleString()}
                        </span>
                        <span className="text-lg text-primary/60">{unit}s free every month</span>
                    </div>
                    <p className="text-sm text-primary/40">Resets monthly, automatically</p>
                </div>
            )}

            {/* Starting price */}
            {firstPaidTier && (
                <div className="mb-16">
                    <p className="text-xs uppercase tracking-widest text-primary/40 mb-3">Then starting at</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl @2xl:text-4xl font-bold text-primary tabular-nums">
                            ${parseFloat(firstPaidTier.unit_amount_usd).toFixed(dp)}
                        </span>
                        <span className="text-lg text-primary/50">/{unit}</span>
                    </div>
                </div>
            )}

            {/* Volume discounts */}
            {tiers.length > 0 && (
                <div>
                    <p className="text-xs uppercase tracking-widest text-primary/40 mb-4">Volume discounts</p>
                    <TiersTable tiers={tiers} unit={unit} />
                </div>
            )}

            {/* Add-on rates */}
            {productData.includeAddonRates && addons.length > 0 && <AddonRates addons={addons} unit={unit} />}
        </section>
    )
}

export default Pricing

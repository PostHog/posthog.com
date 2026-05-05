import React from 'react'
import useProduct from 'hooks/useProduct'
import OSButton from 'components/OSButton'
import { SectionComponentProps } from '../types'

const CUSTOM_FEATURE_UNITS: Record<string, string> = {
    group_analytics: 'group',
    error_tracking_destinations: 'alert',
}

const getFeatureUnit = (featureKey: string) => {
    if (CUSTOM_FEATURE_UNITS[featureKey]) return CUSTOM_FEATURE_UNITS[featureKey]
    if (featureKey.includes('data_retention')) {
        return featureKey.includes('session_replay') || featureKey.includes('replay') ? 'month' : 'year'
    }
    return featureKey.endsWith('s') ? featureKey.slice(0, -1) : featureKey
}

const getFeatureValue = (feature: any, featureKey: string) => {
    if (!feature) return false
    if (feature.note !== undefined && feature.note !== null && feature.note !== '') return feature.note
    if (feature.limit !== undefined && feature.limit !== null) {
        const unit = getFeatureUnit(featureKey) || feature.unit
        if (unit) return `${feature.limit} ${unit}${Number(feature.limit) !== 1 ? 's' : ''}`
        return feature.limit
    }
    return true
}

const formatValue = (value: any, featureKey: string): string => {
    if (typeof value === 'boolean') return value ? 'Yes' : 'No'
    if (typeof value === 'string') {
        // Handle "1 month" style strings
        const match = value.match(/^(\d+)\s+(.+)$/)
        if (match) {
            const custom = CUSTOM_FEATURE_UNITS[match[2]]
            if (custom) {
                const n = parseInt(match[1])
                return `${n} ${n !== 1 ? `${custom}s` : custom}`
            }
        }
        return value
    }
    if (typeof value === 'number') {
        const unit = getFeatureUnit(featureKey)
        return unit ? `${value.toLocaleString()} ${value !== 1 ? `${unit}s` : unit}` : value.toLocaleString()
    }
    return String(value)
}

const calculatePlanDifferences = (freePlan: any, paidPlan: any, addons: any[]) => {
    if (!freePlan || !paidPlan) return []

    const differences: Array<{
        name: string
        key: string
        freeValue: any
        paidValue: any
    }> = []

    const freeFeatures = freePlan.features || []
    const paidFeatures = paidPlan.features || []
    const allKeys = new Set([...freeFeatures.map((f: any) => f.key), ...paidFeatures.map((f: any) => f.key)])

    allKeys.forEach((key: string) => {
        const ff = freeFeatures.find((f: any) => f.key === key)
        const pf = paidFeatures.find((f: any) => f.key === key)
        const fv = getFeatureValue(ff, key)
        const pv = getFeatureValue(pf, key)
        if (fv !== pv) {
            differences.push({ name: ff?.name || pf?.name || key, key, freeValue: fv, paidValue: pv })
        }
    })

    addons.forEach((addon: any) => {
        const freePlanEntry = addon.plans?.find((p: any) => p.included_if === 'no_active_parent_subscription')
        const paidPlanEntry = addon.plans?.find((p: any) => p.included_if === 'has_parent_subscription')
        const freeAddonVal = freePlanEntry?.included_if === 'no_active_parent_subscription' ? false : false
        const paidAddonVal = paidPlanEntry?.included_if === 'has_parent_subscription' ? 'Available' : false
        if (freeAddonVal !== paidAddonVal) {
            differences.push({ name: addon.name, key: addon.type, freeValue: freeAddonVal, paidValue: paidAddonVal })
        }
    })

    return differences
}

// Pricing philosophy bullet points — universal PostHog content
const philosophy = [
    {
        headline: 'More than 90% of companies use PostHog for free.',
        body: 'Only add a card if you need more volume, more projects, or advanced features.',
    },
    {
        headline: 'Set a billing limit and never get an unexpected bill.',
        body: "You're always in control of what you spend.",
    },
    {
        headline: 'We make a profit with every product.',
        body: 'No loss-leader pricing that goes up later or gets retired after a bad quarter.',
    },
    {
        headline: 'We aim to match the cheapest competitor at every scale.',
        body: "Tell us if we're not.",
    },
]

const Plans = ({ id, productData }: SectionComponentProps) => {
    const billingHandle = productData?.sharesFreeTier || productData?.handle
    const product = useProduct({ handle: billingHandle })
    const billing = product?.billingData

    if (!billing?.plans?.length || !productData) return null

    const freePlan = billing.plans.find((p: any) => p.free_allocation)
    const paidPlan = billing.plans.find((p: any) => !p.free_allocation)
    const paidTiers = paidPlan?.tiers || []
    const unit = billing.unit || 'unit'
    const addons = billing.addons || []
    const differences = calculatePlanDifferences(freePlan, paidPlan, addons)

    const firstPaidTier = paidTiers.find((t: any) => parseFloat(t.unit_amount_usd) > 0)
    const startingPrice = firstPaidTier ? `$${parseFloat(firstPaidTier.unit_amount_usd)}/${unit}` : null

    // Paid-plan unlocks (things that differ and the paid value is "better")
    const paidUnlocks = differences.filter((d) => {
        const pv = d.paidValue
        const fv = d.freeValue
        if (pv === false || pv === 'No') return false
        if (fv === false && pv !== false) return true
        return true
    })

    return (
        <section id={id} className="scroll-mt-20 not-prose @container">
            <h2 className="text-3xl font-bold text-primary mt-0 mb-8">Plans</h2>

            <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-12 @2xl:gap-16">
                {/* Left: plan list */}
                <div>
                    {/* Free */}
                    <div className="mb-8">
                        <div className="flex items-baseline gap-2 mb-3">
                            <h3 className="text-xl font-bold text-primary m-0">{freePlan?.name || 'Free'}</h3>
                            <span className="text-sm text-primary/40">no credit card required</span>
                        </div>
                        <ul className="space-y-2 list-none m-0 p-0">
                            <li className="flex items-baseline gap-2">
                                <span className="text-green font-bold text-lg leading-none mt-0.5">✓</span>
                                <span className="text-base text-primary">
                                    <strong>{freePlan?.free_allocation?.toLocaleString()}</strong> {unit}s/mo
                                </span>
                            </li>
                            {differences.map((diff) => (
                                <li key={diff.key} className="flex items-baseline gap-2">
                                    <span
                                        className={`font-bold text-lg leading-none mt-0.5 ${
                                            diff.freeValue === false ? 'text-primary/20' : 'text-green'
                                        }`}
                                    >
                                        {diff.freeValue === false ? '—' : '✓'}
                                    </span>
                                    <span className="text-base text-primary/70">
                                        {diff.name}
                                        {diff.freeValue !== false && diff.freeValue !== true && (
                                            <span className="text-primary/50">
                                                {' '}
                                                ({formatValue(diff.freeValue, diff.key)})
                                            </span>
                                        )}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-t border-light my-8" />

                    {/* Pay-as-you-go */}
                    <div className="mb-8">
                        <div className="flex items-baseline gap-2 mb-3">
                            <h3 className="text-xl font-bold text-primary m-0">{paidPlan?.name || 'Pay-as-you-go'}</h3>
                            {startingPrice && (
                                <span className="text-sm text-primary/40">starts at {startingPrice}</span>
                            )}
                        </div>
                        <ul className="space-y-2 list-none m-0 p-0">
                            <li className="flex items-baseline gap-2">
                                <span className="text-green font-bold text-lg leading-none mt-0.5">✓</span>
                                <span className="text-base text-primary">
                                    <strong>Unlimited</strong> {unit}s/mo
                                </span>
                            </li>
                            {paidUnlocks.map((diff) => (
                                <li key={diff.key} className="flex items-baseline gap-2">
                                    <span className="text-green font-bold text-lg leading-none mt-0.5">✓</span>
                                    <span className="text-base text-primary/70">
                                        {diff.name}
                                        {diff.paidValue !== true && diff.paidValue !== 'Available' && (
                                            <span className="text-primary/50">
                                                {' '}
                                                ({formatValue(diff.paidValue, diff.key)})
                                            </span>
                                        )}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <OSButton variant="primary" asLink to="https://app.posthog.com/signup" size="lg">
                        Get started free
                    </OSButton>
                </div>

                {/* Right: pricing philosophy */}
                <div className="@2xl:border-l @2xl:border-light @2xl:pl-12">
                    <p className="text-sm text-primary/40 mb-6">Our pricing philosophy</p>
                    <ul className="space-y-6 list-none m-0 p-0">
                        {philosophy.map((point, i) => (
                            <li key={i}>
                                <p className="font-semibold text-primary mb-0.5">{point.headline}</p>
                                <p className="text-sm text-primary/60 mb-0">{point.body}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Plans

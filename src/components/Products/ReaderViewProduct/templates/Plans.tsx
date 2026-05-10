import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { IconCheck, IconX } from '@posthog/icons'
import useProduct from 'hooks/useProduct'
import OSButton from 'components/OSButton'
import Toggle from 'components/Toggle'
import { SectionComponentProps } from '../types'

type PlanFeatureValue = string | number | boolean

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

const pluralize = (n: number, unit: string): string => {
    const isPlural = unit.endsWith('s')
    if (n === 1) return isPlural ? unit.slice(0, -1) : unit
    return isPlural ? unit : `${unit}s`
}

const getFeatureValue = (feature: any, featureKey: string): PlanFeatureValue => {
    if (!feature) return false
    if (feature.note !== undefined && feature.note !== null && feature.note !== '') return feature.note
    if (feature.limit !== undefined && feature.limit !== null) {
        const unit = feature.unit || getFeatureUnit(featureKey)
        if (unit) return `${feature.limit} ${pluralize(Number(feature.limit), unit)}`
        return feature.limit
    }
    return true
}

const getMaxDecimalPlaces = (tiers: any[]) =>
    tiers.reduce((max: number, tier: any) => {
        const price = parseFloat(tier.unit_amount_usd)
        if (price === 0) return max
        const str = tier.unit_amount_usd.toString()
        const dot = str.indexOf('.')
        return dot === -1 ? max : Math.max(max, str.length - dot - 1)
    }, 0)

const valuesEqual = (a: PlanFeatureValue, b: PlanFeatureValue): boolean => {
    const norm = (v: PlanFeatureValue) => {
        if (v === false || v === undefined || v === null || v === '') return ''
        if (v === true) return '__true__'
        return String(v).trim().toLowerCase()
    }
    return norm(a) === norm(b)
}

const ValueCell = ({ value }: { value: PlanFeatureValue }) => {
    if (value === false || value === undefined || value === null || value === '') {
        return <IconX className="size-5 text-red" />
    }
    if (value === true) {
        return <IconCheck className="size-5 text-green" />
    }
    return (
        <span className="text-sm text-primary whitespace-pre-line">
            {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
    )
}

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

const formatAllocation = (allocation: number | undefined, unit: string | undefined) => {
    if (!allocation) return null
    const u = unit || 'unit'
    return `${allocation.toLocaleString()} ${pluralize(allocation, u)}/mo`
}

const ROW_GRID = 'grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] gap-x-4 @lg:gap-x-8'
const ROW_PADDING = 'py-3 border-b border-light'

const Plans = ({ id, productData }: SectionComponentProps) => {
    const billingHandle = productData?.sharesFreeTier || productData?.handle
    const product = useProduct({ handle: billingHandle })
    const billing = product?.billingData
    const [showDifferencesOnly, setShowDifferencesOnly] = useState(true)

    const { allProductData } = useStaticQuery(graphql`
        query PlatformAndSupportFeatures {
            allProductData {
                nodes {
                    products {
                        type
                        plans {
                            plan_key
                            included_if
                            features {
                                key
                                name
                                limit
                                note
                                unit
                                entitlement_only
                            }
                        }
                    }
                }
            }
        }
    `)

    const platformProduct = allProductData?.nodes?.[0]?.products?.find((p: any) => p.type === 'platform_and_support')
    const platformFreePlan = platformProduct?.plans?.find((p: any) => p.included_if === 'no_active_subscription')
    const platformPaidPlan = platformProduct?.plans?.find((p: any) => p.included_if === 'has_subscription')

    if (!billing?.plans?.length || !productData) return null

    const freePlan = billing.plans.find((p: any) => p.free_allocation)
    const paidPlan = billing.plans.find((p: any) => !p.free_allocation)
    const paidTiers = paidPlan?.tiers || []
    const unit = billing.unit || 'unit'
    const addons = billing.addons || []

    const firstPaidTier = paidTiers.find((t: any) => parseFloat(t.unit_amount_usd) > 0)
    const dp = getMaxDecimalPlaces(paidTiers)
    const startingPrice = firstPaidTier ? `$${parseFloat(firstPaidTier.unit_amount_usd).toFixed(dp)}` : null
    const hasMultipleTiers = paidTiers.filter((t: any) => parseFloat(t.unit_amount_usd) > 0).length > 1

    // Free tier rows: main product + (optionally) addons
    const freeTierRows: Array<{ name: string; allocation: number; unit: string }> = []
    if (freePlan?.free_allocation) {
        freeTierRows.push({
            name: billing.name,
            allocation: freePlan.free_allocation,
            unit,
        })
    }
    if (productData.includeAddonRates) {
        addons.forEach((addon: any) => {
            const addonFreePlan = addon.plans?.find((p: any) => p.free_allocation)
            if (addonFreePlan?.free_allocation) {
                freeTierRows.push({
                    name: addon.name,
                    allocation: addonFreePlan.free_allocation,
                    unit: addon.unit || unit,
                })
            }
        })
    }

    // Build comparison rows
    type Row = { key: string; name: string; free: PlanFeatureValue; paid: PlanFeatureValue }

    const productRows: Row[] = (() => {
        const ff = freePlan?.features || []
        const pf = paidPlan?.features || []
        const keys = Array.from(new Set<string>([...ff.map((f: any) => f.key), ...pf.map((f: any) => f.key)]))
        return keys.map((key) => {
            const fFeature = ff.find((f: any) => f.key === key)
            const pFeature = pf.find((f: any) => f.key === key)
            return {
                key,
                name: fFeature?.name || pFeature?.name || key,
                free: getFeatureValue(fFeature, key),
                paid: getFeatureValue(pFeature, key),
            }
        })
    })()

    const planRows: Row[] = (() => {
        const ff = (platformFreePlan?.features || []).filter((f: any) => f.entitlement_only !== true)
        const pf = (platformPaidPlan?.features || []).filter((f: any) => f.entitlement_only !== true)
        const keys = Array.from(new Set<string>([...ff.map((f: any) => f.key), ...pf.map((f: any) => f.key)]))
        return keys.map((key) => {
            const fFeature = ff.find((f: any) => f.key === key)
            const pFeature = pf.find((f: any) => f.key === key)
            return {
                key,
                name: fFeature?.name || pFeature?.name || key,
                free: getFeatureValue(fFeature, key),
                paid: getFeatureValue(pFeature, key),
            }
        })
    })()

    const filterRows = (rows: Row[]) => (showDifferencesOnly ? rows.filter((r) => !valuesEqual(r.free, r.paid)) : rows)
    const visibleProductRows = filterRows(productRows)
    const visiblePlanRows = filterRows(planRows)

    return (
        <section id={id} className="scroll-mt-20 not-prose @container">
            <h2 className="text-3xl font-bold text-primary mt-0 mb-8">Plans</h2>

            <div className="grid grid-cols-1 @2xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-12 @2xl:gap-16">
                {/* Left: pricing + plan features comparison */}
                <div>
                    {/* Pricing */}
                    <h3 className="text-2xl font-bold text-primary m-0 mb-4">Pricing</h3>

                    {/* Plan column headers */}
                    <div className={`${ROW_GRID} ${ROW_PADDING}`}>
                        <span />
                        <span className="text-base font-bold text-primary">Totally free</span>
                        <span className="text-base font-bold text-primary">Pay-as-you-go</span>
                    </div>

                    {/* Price per unit */}
                    <div className={`${ROW_GRID} ${ROW_PADDING} items-start`}>
                        <span className="text-base text-primary/70">Price per {unit}</span>
                        <span>
                            <strong className="text-lg text-primary">$0</strong>
                        </span>
                        <span>
                            {startingPrice ? (
                                <>
                                    <strong className="text-lg text-primary">
                                        {startingPrice}/{unit}
                                    </strong>
                                    {hasMultipleTiers && <em className="text-base text-primary/60"> or less!</em>}
                                    {hasMultipleTiers && (
                                        <span className="block text-sm text-primary/50 mt-0.5">
                                            Pricing reduces with scale
                                        </span>
                                    )}
                                </>
                            ) : (
                                <strong className="text-lg text-primary">$0</strong>
                            )}
                        </span>
                    </div>

                    {/* Monthly free tier */}
                    {freeTierRows.length > 0 && (
                        <div className={`${ROW_GRID} ${ROW_PADDING} items-start`}>
                            <span className="text-base text-primary/70">Monthly free tier</span>
                            <div className="space-y-3">
                                {freeTierRows.map((row) => (
                                    <div key={row.name}>
                                        <p className="text-sm text-primary/50 m-0">{row.name}</p>
                                        <p className="text-base font-semibold text-primary m-0">
                                            {formatAllocation(row.allocation, row.unit)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-3">
                                {freeTierRows.map((row) => (
                                    <div key={row.name}>
                                        <p className="text-sm text-primary/50 m-0">{row.name}</p>
                                        <p className="text-base font-semibold text-primary m-0">
                                            {formatAllocation(row.allocation, row.unit)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Product features */}
                    <div className="mt-12 mb-4 flex items-center justify-between gap-4">
                        <h3 className="text-2xl font-bold text-primary m-0">Product features</h3>
                        <Toggle
                            checked={showDifferencesOnly}
                            onChange={setShowDifferencesOnly}
                            label="Show differences only"
                            position="right"
                        />
                    </div>

                    {visibleProductRows.length === 0 ? (
                        <p className="text-sm text-primary/50 italic py-4 m-0">
                            {showDifferencesOnly
                                ? 'All product features are the same across plans.'
                                : 'No product features.'}
                        </p>
                    ) : (
                        <div>
                            {visibleProductRows.map((row) => (
                                <div key={`prod-${row.key}`} className={`${ROW_GRID} ${ROW_PADDING} items-center`}>
                                    <span className="text-sm text-primary/70">{row.name}</span>
                                    <ValueCell value={row.free} />
                                    <ValueCell value={row.paid} />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Platform features */}
                    <h3 className="text-2xl font-bold text-primary mt-12 mb-4">Platform features</h3>
                    {visiblePlanRows.length === 0 ? (
                        <p className="text-sm text-primary/50 italic py-4 m-0">
                            {showDifferencesOnly
                                ? 'All platform features are the same across plans.'
                                : 'No platform features.'}
                        </p>
                    ) : (
                        <div>
                            {visiblePlanRows.map((row) => (
                                <div key={`plan-${row.key}`} className={`${ROW_GRID} ${ROW_PADDING} items-center`}>
                                    <span className="text-sm text-primary/70">{row.name}</span>
                                    <ValueCell value={row.free} />
                                    <ValueCell value={row.paid} />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Dual CTAs */}
                    <div className={`${ROW_GRID} mt-8`}>
                        <span />
                        <OSButton variant="primary" asLink to="https://app.posthog.com/signup" size="lg">
                            Get started - free
                        </OSButton>
                        <OSButton variant="primary" asLink to="https://app.posthog.com/signup" size="lg">
                            Get started - free
                        </OSButton>
                    </div>
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

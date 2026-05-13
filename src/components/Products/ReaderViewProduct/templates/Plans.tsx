import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { AnimatePresence, motion } from 'framer-motion'
import groupBy from 'lodash.groupby'
import { IconCheck, IconX } from '@posthog/icons'
import useProduct from 'hooks/useProduct'
import OSButton from 'components/OSButton'
import Toggle from 'components/Toggle'
import { SectionComponentProps } from '../types'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import Link from 'components/Link'

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

const pricingDetails: Array<{ headline: React.ReactNode; body: React.ReactNode }> = [
    {
        headline: 'More than 90% of companies use PostHog for free.',
        body: 'Only add a card if you need more volume, more projects, or advanced features.',
    },
    {
        headline: 'Pay per use, not per seat.',
        body: 'Your bill scales with usage, not headcount.',
    },
    {
        headline: 'Volume discounts kick in automatically.',
        body: 'No negotiations needed.',
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
    {
        headline: 'We ♥ startups.',
        body: (
            <>
                Under 2 years old and pre-series B?{' '}
                <Link to="/startups" className="underline" state={{ newWindow: true }}>
                    Apply for $50k in credits
                </Link>
                .
            </>
        ),
    },
]

const formatAllocation = (allocation: number | undefined, unit: string | undefined) => {
    if (!allocation) return null
    const u = unit || 'unit'
    return `${allocation.toLocaleString()} ${pluralize(allocation, u)}/mo`
}

/*
 * Layout overview — all breakpoints are container queries (window-resizable UI):
 *
 * Outer section uses CSS grid-template-areas with two named regions:
 *   - [tldr] + [plans] on the left, [sidebar] pinned to the right
 *   - Switches from single-column to this 2-column layout at @4xl.
 *   - The section element must carry @container for these to fire.
 *
 * Comparison table rows (ROW_GRID / LABEL_CELL):
 *   - Below @xl: 2-column grid. The label uses LABEL_CELL (col-span-2) to sit
 *     on its own full-width row above the two plan value cells.
 *   - At @xl and above: 3-column grid (label | free value | paid value).
 *   - The [plans] div also carries @container so its own width drives these
 *     breakpoints independently of the page/window width.
 *   - Header/CTA spacer <span>s use `hidden @xl:block` to stay out of the
 *     2-column flow on mobile while occupying the label column on desktop.
 *
 * Data sources:
 *   - Product pricing (tiers, free allocation, per-product features):
 *     useProduct({ handle }) → billing.plans / billing.addons
 *   - Platform-wide features (projects, team members, SSO, etc.):
 *     useStaticQuery → allProductData → type === 'platform_and_support'
 *     Free plan: included_if === 'no_active_subscription'
 *     Paid plan: included_if === 'has_subscription'
 *     entitlement_only features are filtered out (display-only entitlements).
 */
const ROW_GRID = 'grid grid-cols-2 @xl:grid-cols-[minmax(0,1.5fr)_minmax(0,2fr)_minmax(0,2fr)] gap-x-4 @xl:gap-x-8'
const LABEL_CELL = 'col-span-2 @xl:col-span-1'
const ROW_PADDING = 'py-3'

const ROW_ANIMATION = {
    initial: { height: 0, opacity: 0 },
    animate: { height: 'auto', opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: { duration: 0.18, ease: 'easeInOut' },
    style: { overflow: 'hidden' },
} as const

const SubheaderRow = ({ label }: { label: string }) => (
    <div className="pt-4 pb-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary/40">{label}</span>
    </div>
)

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
                                category
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
            name: productData.label || billing.name,
            allocation: freePlan.free_allocation,
            unit,
        })
    }
    if (productData.includeAddonRates) {
        addons.forEach((addon: any) => {
            const addonFreePlan = addon.plans?.find((p: any) => p.free_allocation)
            if (addonFreePlan?.free_allocation) {
                const addonLabel = (productData.addonSliders || []).find((s: any) => s.key === addon.type)?.label
                freeTierRows.push({
                    name: addonLabel || addon.name,
                    allocation: addonFreePlan.free_allocation,
                    unit: addon.unit || unit,
                })
            }
        })
    }

    // Build comparison rows
    type Row = { key: string; name: string; free: PlanFeatureValue; paid: PlanFeatureValue; category: string | null }

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
                category: fFeature?.category || pFeature?.category || null,
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
                category: fFeature?.category || pFeature?.category || null,
            }
        })
    })()

    const filterRows = (rows: Row[]) => (showDifferencesOnly ? rows.filter((r) => !valuesEqual(r.free, r.paid)) : rows)
    const visibleProductRows = filterRows(productRows)
    const visiblePlanRows = filterRows(planRows)
    const hiddenProductCount = productRows.length - visibleProductRows.length
    const hiddenPlanCount = planRows.length - visiblePlanRows.length

    const splitByCategory = (rows: Row[]) => {
        const ungrouped = rows.filter((r) => !r.category)
        const grouped = groupBy(
            rows.filter((r) => r.category),
            (r) => r.category
        )
        return { ungrouped, grouped, categories: Object.keys(grouped).sort() }
    }

    const productSplit = splitByCategory(visibleProductRows)
    const planSplit = splitByCategory(visiblePlanRows)

    console.log('[Plans debug]', {
        productRowCount: productRows.length,
        visibleProductRowCount: visibleProductRows.length,
        showDifferencesOnly,
        categorySample: visibleProductRows.slice(0, 5).map((r) => ({ key: r.key, category: r.category })),
        ungroupedCount: productSplit.ungrouped.length,
        categories: productSplit.categories,
        groupedCounts: Object.fromEntries(productSplit.categories.map((c) => [c, productSplit.grouped[c].length])),
    })

    const lowestPaidTier = [...paidTiers].reverse().find((t: any) => parseFloat(t.unit_amount_usd) > 0)
    const lowestPrice =
        lowestPaidTier && lowestPaidTier !== firstPaidTier
            ? `$${parseFloat(lowestPaidTier.unit_amount_usd).toFixed(dp)}`
            : null

    return (
        <section
            id={id}
            className="scroll-mt-20 not-prose @container grid grid-cols-1 gap-10 @4xl:gap-x-16 @4xl:gap-y-12 @4xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] @4xl:[grid-template-areas:'tldr_sidebar'_'plans_sidebar']"
        >
            {/* TL;DR */}
            <div className="@container @4xl:[grid-area:tldr]">
                <h2 className="text-3xl font-bold text-primary mt-0 mb-6">TL;DR:</h2>
                <p className="text-3xl leading-snug font-normal text-primary mb-3">
                    {freePlan?.free_allocation && (
                        <>
                            <strong className="font-bold">
                                {freePlan.free_allocation.toLocaleString()} {pluralize(freePlan.free_allocation, unit)}{' '}
                                free
                            </strong>{' '}
                            every month,{' '}
                        </>
                    )}
                    {firstPaidTier && (
                        <>
                            <br className="hidden @xl:block" />
                            then starting at{' '}
                            <strong className="font-bold tabular-nums">
                                ${parseFloat(firstPaidTier.unit_amount_usd).toFixed(dp)}/{unit}
                            </strong>
                        </>
                    )}
                </p>
                {lowestPrice && (
                    <p className="text-lg text-primary/50 mb-4">
                        Pricing decreases with volume — as low as{' '}
                        <strong className="font-semibold text-primary/70">
                            {lowestPrice}/{unit}
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

            {/* Plans comparison */}
            <div className="@container @4xl:[grid-area:plans]">
                <h3 className="text-2xl font-bold text-primary m-0 mb-4">Plans</h3>

                <div className="divide-y divide-primary">
                    {/* Plan column headers */}
                    <div className={`${ROW_GRID} ${ROW_PADDING}`}>
                        <span className="hidden @xl:block" />
                        <span className="text-base font-bold text-primary">Totally free</span>
                        <span className="text-base font-bold text-primary">Pay-as-you-go</span>
                    </div>

                    {/* Price per unit */}
                    <div className={`${ROW_GRID} ${ROW_PADDING} items-start`}>
                        <span className={`${LABEL_CELL} text-base text-primary/70`}>Price per {unit}</span>
                        <span>
                            <strong className="text-lg text-primary">$0</strong>
                            <span className="block text-sm text-primary/50 mt-0.5">No credit card required</span>
                        </span>
                        <span>
                            {startingPrice ? (
                                <>
                                    <strong className="text-lg text-primary">
                                        {startingPrice}/{unit}
                                    </strong>
                                    {hasMultipleTiers && (
                                        <em className="text-sm text-primary/60">
                                            {' '}
                                            <a
                                                href="#calculator"
                                                className="text-primary/60 hover:text-primary/80 underline decoration-dotted"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    document
                                                        .getElementById('calculator')
                                                        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                                }}
                                            >
                                                or less!
                                            </a>
                                        </em>
                                    )}
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
                            <span className={`${LABEL_CELL} text-base text-primary/70`}>Monthly free tier</span>
                            <div className="space-y-3">
                                {freeTierRows.map((row) => (
                                    <div key={row.name}>
                                        <p className="text-sm text-primary/50 m-0">{row.name}</p>
                                        <p className="text-base font-semibold text-primary m-0">
                                            {row.allocation.toLocaleString()}/mo
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-3">
                                {freeTierRows.map((row) => (
                                    <div key={row.name}>
                                        <p className="text-sm text-primary/50 m-0">{row.name}</p>
                                        <p className="text-base font-semibold text-primary m-0">
                                            {row.allocation.toLocaleString()}/mo
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

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

                {visibleProductRows.length === 0 && !showDifferencesOnly ? (
                    <p className="text-sm text-primary/50 italic py-4 m-0">No product features.</p>
                ) : (
                    <div className="divide-y divide-primary">
                        <AnimatePresence initial={false}>
                            {productSplit.ungrouped.map((row) => (
                                <motion.div key={`prod-${row.key}`} {...ROW_ANIMATION}>
                                    <div className={`${ROW_GRID} ${ROW_PADDING} items-center`}>
                                        <span className={`${LABEL_CELL} text-sm text-primary/70`}>{row.name}</span>
                                        <ValueCell value={row.free} />
                                        <ValueCell value={row.paid} />
                                    </div>
                                </motion.div>
                            ))}
                            {productSplit.categories.map((cat) => (
                                <React.Fragment key={`prod-group-${cat}`}>
                                    <motion.div key={`prod-subheader-${cat}`} {...ROW_ANIMATION}>
                                        <SubheaderRow label={cat} />
                                    </motion.div>
                                    {productSplit.grouped[cat].map((row) => (
                                        <motion.div key={`prod-${row.key}`} {...ROW_ANIMATION}>
                                            <div className={`${ROW_GRID} ${ROW_PADDING} items-center`}>
                                                <span className={`${LABEL_CELL} text-sm text-primary/70`}>
                                                    {row.name}
                                                </span>
                                                <ValueCell value={row.free} />
                                                <ValueCell value={row.paid} />
                                            </div>
                                        </motion.div>
                                    ))}
                                </React.Fragment>
                            ))}
                            {showDifferencesOnly && hiddenProductCount > 0 && (
                                <motion.div key="show-all-product" {...ROW_ANIMATION}>
                                    <div className="py-3 text-center">
                                        <button
                                            onClick={() => setShowDifferencesOnly(false)}
                                            className="text-sm text-primary/50 hover:text-primary/80 cursor-pointer"
                                        >
                                            Show all {productRows.length} features
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                {/* Platform features */}
                <h3 className="text-2xl font-bold text-primary mt-12 mb-4">Platform features</h3>
                {visiblePlanRows.length === 0 && !showDifferencesOnly ? (
                    <p className="text-sm text-primary/50 italic py-4 m-0">No platform features.</p>
                ) : (
                    <div className="divide-y divide-primary">
                        <AnimatePresence initial={false}>
                            {planSplit.ungrouped.map((row) => (
                                <motion.div key={`plan-${row.key}`} {...ROW_ANIMATION}>
                                    <div className={`${ROW_GRID} ${ROW_PADDING} items-center`}>
                                        <span className={`${LABEL_CELL} text-sm text-primary/70`}>{row.name}</span>
                                        <ValueCell value={row.free} />
                                        <ValueCell value={row.paid} />
                                    </div>
                                </motion.div>
                            ))}
                            {planSplit.categories.map((cat) => (
                                <React.Fragment key={`plan-group-${cat}`}>
                                    <motion.div key={`plan-subheader-${cat}`} {...ROW_ANIMATION}>
                                        <SubheaderRow label={cat} />
                                    </motion.div>
                                    {planSplit.grouped[cat].map((row) => (
                                        <motion.div key={`plan-${row.key}`} {...ROW_ANIMATION}>
                                            <div className={`${ROW_GRID} ${ROW_PADDING} items-center`}>
                                                <span className={`${LABEL_CELL} text-sm text-primary/70`}>
                                                    {row.name}
                                                </span>
                                                <ValueCell value={row.free} />
                                                <ValueCell value={row.paid} />
                                            </div>
                                        </motion.div>
                                    ))}
                                </React.Fragment>
                            ))}
                            {showDifferencesOnly && hiddenPlanCount > 0 && (
                                <motion.div key="show-all-plan" {...ROW_ANIMATION}>
                                    <div className="py-3 text-center">
                                        <button
                                            onClick={() => setShowDifferencesOnly(false)}
                                            className="text-sm text-primary/50 hover:text-primary/80 cursor-pointer"
                                        >
                                            Show all {planRows.length} features
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                {/* Dual CTAs */}
                <div className={`${ROW_GRID} mt-8`}>
                    <span className="hidden @xl:block" />
                    <OSButton variant="primary" asLink to="https://app.posthog.com/signup" size="lg">
                        Get started - free
                    </OSButton>
                    <OSButton variant="primary" asLink to="https://app.posthog.com/signup" size="lg">
                        Get started - free
                    </OSButton>
                </div>
            </div>

            {/* Sidebar: combined pricing details */}
            <aside className="@container @4xl:[grid-area:sidebar] @4xl:border-l @4xl:border-primary @4xl:pl-12">
                <h3 className="mb-4 !text-sm font-normal text-secondary">Things you should know about our pricing</h3>
                <ul className="space-y-6 list-none m-0 p-0">
                    {pricingDetails.map((point, i) => (
                        <li key={i}>
                            <p className="font-semibold text-primary leading-tight mb-1">{point.headline}</p>
                            <p className="text-sm text-primary/60 mb-0">{point.body}</p>
                        </li>
                    ))}
                </ul>
            </aside>
        </section>
    )
}

export default Plans

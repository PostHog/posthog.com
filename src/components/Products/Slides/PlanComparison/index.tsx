import React from 'react'
import Tooltip from 'components/RadixUI/Tooltip'
import { IconInfo } from '@posthog/icons'
import ScrollArea from 'components/RadixUI/ScrollArea'

interface PlanComparisonProps {
    products: any[]
    productHandle: string
    productData?: any // Add productData for accessing sharesFreeTier
    onScrollToFeatures?: () => void
}

const PlanComparison: React.FC<PlanComparisonProps> = ({
    products,
    productHandle,
    productData: productInfo,
    onScrollToFeatures,
}) => {
    // Check if this product shares pricing with another product
    const sharesFreeTierWith = productInfo?.sharesFreeTier
    const billingProductHandle = sharesFreeTierWith || productHandle

    // Find the specific product data - GraphQL products use 'type' field, but we receive handle
    // For session_replay handle, we need to match against 'session_replay' type in GraphQL
    const productData = products.find((product: any) => product.type === billingProductHandle)

    if (!productData || !productData.plans || productData.plans.length === 0) {
        // Skip rendering if no billing/pricing data is available
        return null
    }

    const plans = productData.plans
    const addons = productData.addons || []
    const unit = productData.unit
    const freePlan = plans.find((plan: any) => plan.free_allocation)
    const paidPlan = plans.find((plan: any) => !plan.free_allocation)

    // Get pricing tiers from paid plan
    const tiers = paidPlan?.tiers || []

    // Custom unit overrides for specific features (defaults to feature name)
    const customFeatureUnits: { [key: string]: string } = {
        group_analytics: 'group',
        error_tracking_destinations: 'alert',
    }

    // Helper function to get unit from feature key
    const getFeatureUnit = (featureKey: string) => {
        // Check for custom override first
        if (customFeatureUnits[featureKey]) {
            return customFeatureUnits[featureKey]
        }

        // Special handling for data retention keys
        if (featureKey.includes('data_retention')) {
            // Session replay uses months, everything else uses years
            if (featureKey.includes('session_replay') || featureKey.includes('replay')) {
                return 'month'
            }
            return 'year'
        }

        // Default: derive from feature name (remove trailing 's' if present)
        const derivedUnit = featureKey.endsWith('s') ? featureKey.slice(0, -1) : featureKey
        return derivedUnit
    }

    // Format pricing tiers for display
    const formatCompactNumber = (number: number) => {
        const formatter = Intl.NumberFormat('en', {
            notation: 'compact',
            compactDisplay: number < 999999 ? 'short' : 'long',
        })
        return formatter.format(number).toLowerCase()
    }

    // Dynamically calculate differences between plans
    const calculatePlanDifferences = () => {
        /**
         * PLAN COMPARISON LOGIC
         * ====================
         *
         * This function automatically detects and displays differences between free and paid plans
         * by analyzing both regular features and addons from the GraphQL billing API data.
         *
         * FEATURES COMPARISON:
         * - Compares all features that exist in either the free or paid plan
         * - Extracts feature values in this priority order:
         *   1. `note` field: Contains text like "unlimited", "1 month", "Available", etc.
         *   2. `limit` + `unit`: Combines numeric limits with units (e.g., "3 months")
         *   3. `limit` only: Shows numeric values when no unit is available
         *   4. `true`: Default for features that exist but have no specific value
         *
         * ADDONS COMPARISON:
         * - Checks addon availability based on `included_if` conditions:
         *   - `no_active_parent_subscription`: Not available on free tier (false)
         *   - `has_parent_subscription`: Available on paid tier ("Available")
         * - Addons use different plan structures than regular features
         *
         * DISPLAY TYPES:
         * - `boolean`: Shows ✓/❌ icons for true/false values
         * - `text`: Shows string values like "Available", "unlimited", "1 month"
         * - `limit`: Shows numeric values with proper formatting
         *
         * FILTERING:
         * - Only includes features/addons where free and paid values differ
         * - Excludes long descriptions to keep the comparison clean
         * - Handles missing features (exists in one plan but not the other)
         *
         * RESULT:
         * Returns array of differences to display in the pricing comparison table.
         */

        if (!freePlan || !paidPlan) return []

        const differences: Array<{
            name: string
            description?: string
            key: string
            freeValue: any
            paidValue: any
            displayType: 'boolean' | 'text' | 'limit'
        }> = []

        // Get all unique feature keys from both plans
        const freeFeatures = freePlan.features || []
        const paidFeatures = paidPlan.features || []
        const allFeatureKeys = new Set([...freeFeatures.map((f: any) => f.key), ...paidFeatures.map((f: any) => f.key)])

        // Check regular features first
        allFeatureKeys.forEach((featureKey: string) => {
            const freeFeature = freeFeatures.find((f: any) => f.key === featureKey)
            const paidFeature = paidFeatures.find((f: any) => f.key === featureKey)

            // Function to get the actual feature value (no descriptions)
            const getFeatureValue = (feature: any) => {
                if (!feature) return false

                // First priority: note field (contains text like "unlimited", "Available", etc.)
                if (feature.note !== undefined && feature.note !== null && feature.note !== '') {
                    return feature.note
                }

                // Second priority: limit field with optional unit
                if (feature.limit !== undefined && feature.limit !== null) {
                    // Get unit from feature key or feature.unit
                    const unit = getFeatureUnit(featureKey) || feature.unit
                    if (unit) {
                        return `${feature.limit} ${unit}${Number(feature.limit) !== 1 ? 's' : ''}`
                    }
                    return feature.limit
                }

                // If feature exists but has no specific value, it's available (true)
                return true
            }

            // Get values for comparison
            const freeValue = getFeatureValue(freeFeature)
            const paidValue = getFeatureValue(paidFeature)

            // Only include if values are actually different
            if (freeValue !== paidValue) {
                let displayType: 'boolean' | 'text' | 'limit' = 'boolean'

                // Determine display type
                if (typeof freeValue === 'string' || typeof paidValue === 'string') {
                    displayType = 'text'
                } else if (typeof freeValue === 'number' || typeof paidValue === 'number') {
                    displayType = 'limit'
                }

                differences.push({
                    name: freeFeature?.name || paidFeature?.name || featureKey,
                    description: freeFeature?.description || paidFeature?.description,
                    key: featureKey,
                    freeValue,
                    paidValue,
                    displayType,
                })
            }
        })

        // Now check addons - these typically have different availability between plans
        addons.forEach((addon: any) => {
            // Find how this addon appears in each plan based on included_if conditions
            // Free plan: no_active_parent_subscription (no parent subscription = free tier)
            // Paid plan: has_parent_subscription (has parent subscription = paid tier)
            const freeAddonPlan = addon.plans?.find((p: any) => p.included_if === 'no_active_parent_subscription')
            const paidAddonPlan = addon.plans?.find((p: any) => p.included_if === 'has_parent_subscription')

            // Determine addon availability based on existence and conditions
            const getAddonValue = (addonPlan: any, isFreeTier: boolean) => {
                if (!addonPlan) {
                    // If no specific plan exists for this tier, addon is not available
                    return false
                }

                if (isFreeTier && addonPlan.included_if === 'no_active_parent_subscription') {
                    // For free tier, if included_if is no_active_parent_subscription, it means not available
                    return false
                }

                if (!isFreeTier && addonPlan.included_if === 'has_parent_subscription') {
                    // For paid tier, if included_if is has_parent_subscription, it means available
                    return 'Available'
                }

                return false
            }

            const freeAddonValue = getAddonValue(freeAddonPlan, true)
            const paidAddonValue = getAddonValue(paidAddonPlan, false)

            // Add to differences if they're different
            if (freeAddonValue !== paidAddonValue) {
                differences.push({
                    name: addon.name,
                    description: addon.description,
                    key: addon.type,
                    freeValue: freeAddonValue,
                    paidValue: paidAddonValue,
                    displayType: 'text',
                })
            }
        })

        return differences
    }

    const planDifferences = calculatePlanDifferences()

    // Helper function to render feature values
    const renderFeatureValue = (value: any, displayType: string, featureKey?: string) => {
        if (typeof value === 'boolean') {
            return <span className={`text-2xl ${value ? 'text-green' : 'text-red'}`}>{value ? '✓' : '✗'}</span>
        }

        if (displayType === 'limit' && typeof value === 'number') {
            // Get the unit for this feature
            const unit = featureKey ? getFeatureUnit(featureKey) : ''
            const pluralizedUnit = unit && Number(value) !== 1 ? `${unit}s` : unit
            const displayText = unit ? `${value.toLocaleString()} ${pluralizedUnit}` : value.toLocaleString()

            return <span className="text-lg font-semibold text-primary">{displayText}</span>
        }

        // Handle text values - check if it's a number followed by a unit (like "1 year" or "2 error_tracking_destinations")
        if (typeof value === 'string' && /^\d+\s+\w+/.test(value)) {
            const match = value.match(/^(\d+)\s+(.+)$/)
            if (match) {
                const [, count, unit] = match
                const numCount = parseInt(count)

                // Check if we have a custom unit override
                const customUnit = customFeatureUnits[unit]
                if (customUnit) {
                    const pluralizedUnit = numCount !== 1 ? `${customUnit}s` : customUnit
                    return (
                        <span className="text-primary">
                            {numCount} {pluralizedUnit}
                        </span>
                    )
                }
            }

            // It's already formatted with a unit, just return it
            return <span className="text-primary">{value}</span>
        }

        return <span className="text-primary capitalize">{value}</span>
    }

    return (
        <div className="h-full grid grid-cols-1 @2xl:grid-cols-5 text-primary">
            {/* Left side - Pricing */}
            <div className="p-12 bg-tan dark:bg-dark col-span-1 @2xl:col-span-2 flex flex-col justify-between border-b border-primary @2xl:border-b-0">
                <div>
                    <h2 className="text-4xl font-bold text-primary mb-6">Pricing</h2>

                    {/* Show shared pricing notice if applicable */}
                    {sharesFreeTierWith && (
                        <div className="mb-4 p-3 bg-accent border border-primary rounded-md">
                            <p className="text-sm text-secondary mb-0">
                                This product shares pricing and allocations with the{' '}
                                <span className="font-semibold text-primary capitalize">
                                    {sharesFreeTierWith.replace('_', ' ')}
                                </span>{' '}
                                product.
                            </p>
                        </div>
                    )}

                    <div className="mb-8">
                        <p className="text-lg mb-1">Monthly free tier</p>
                        <p className="text-2xl mb-4">
                            <span className="font-bold text-green">{freePlan?.free_allocation?.toLocaleString()}</span>{' '}
                            {unit}s/mo
                        </p>

                        {tiers.length > 0 && (
                            <>
                                <p className="text-lg mb-1">Then starts at</p>
                                <p className="text-2xl mb-8">
                                    <span className="font-bold text-primary">
                                        $
                                        {(() => {
                                            const firstPaidTier = tiers.find(
                                                (tier: any) => parseFloat(tier.unit_amount_usd) > 0
                                            )
                                            if (!firstPaidTier) return '0.00'

                                            const price = parseFloat(firstPaidTier.unit_amount_usd)
                                            const priceStr = firstPaidTier.unit_amount_usd
                                            const decimalIndex = priceStr.indexOf('.')

                                            // If no decimal point or fewer than 2 decimal places, format to 2 decimals
                                            if (decimalIndex === -1 || priceStr.length - decimalIndex - 1 < 2) {
                                                return price.toFixed(2)
                                            }

                                            // Otherwise, show all decimal places
                                            return priceStr
                                        })()}
                                    </span>
                                    /{unit}
                                </p>
                            </>
                        )}
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-primary mb-4 border-b border-primary pb-2">
                        Volume discounts
                    </h3>
                    <div className="space-y-2 text-sm">
                        {(() => {
                            // Find the maximum number of decimal places across all paid tiers
                            const maxDecimalPlaces = tiers.reduce((max: number, tier: any) => {
                                const price = parseFloat(tier.unit_amount_usd)
                                if (price === 0) return max

                                const priceStr = tier.unit_amount_usd.toString()
                                const decimalIndex = priceStr.indexOf('.')
                                if (decimalIndex === -1) return max

                                const decimalPlaces = priceStr.length - decimalIndex - 1
                                return Math.max(max, decimalPlaces)
                            }, 0)

                            // Helper function to format price with consistent decimal places
                            const formatPrice = (priceStr: string) => {
                                const price = parseFloat(priceStr)
                                if (price === 0) return 'Free'

                                // Format with the maximum decimal places, adding trailing zeros if needed
                                return `$${price.toFixed(maxDecimalPlaces)}`
                            }

                            return tiers.map((tier: any, index: number) => {
                                const isFirstTier = index === 0
                                const isLastTier = !tier.up_to
                                const prevTier = index > 0 ? tiers[index - 1] : null

                                let rangeText = ''
                                if (isFirstTier) {
                                    rangeText = `First ${formatCompactNumber(tier.up_to)} ${unit}s/mo`
                                } else if (isLastTier) {
                                    rangeText = `${formatCompactNumber(prevTier?.up_to)}+`
                                } else {
                                    rangeText = `${formatCompactNumber(prevTier?.up_to)}-${formatCompactNumber(
                                        tier.up_to
                                    )}`
                                }

                                const isFree = parseFloat(tier.unit_amount_usd) === 0

                                return (
                                    <div key={index} className="flex justify-between text-lg">
                                        <span className="text-secondary">{rangeText}</span>
                                        <span className={`${isFree ? 'text-green font-bold' : 'text-primary'}`}>
                                            {isFree ? (
                                                'Free'
                                            ) : (
                                                <>
                                                    <strong>{formatPrice(tier.unit_amount_usd)}</strong>
                                                    <span className="text-secondary">/{unit}</span>
                                                </>
                                            )}
                                        </span>
                                    </div>
                                )
                            })
                        })()}
                    </div>
                </div>
            </div>

            {/* Right side - Plans */}
            <div className="p-12 bg-primary col-span-1 @2xl:col-span-3 border-l border-primary h-full">
                <h2 className="text-4xl font-bold text-primary mb-12">Plans</h2>

                {/* Comparison rows */}
                <div className="grid grid-cols-3 gap-y-4">
                    <div className="border-b border-primary"></div>
                    <div className="border-b border-primary">
                        <strong>{freePlan?.name || 'Free'}</strong>
                        <p className="text-secondary">No credit card required</p>
                    </div>
                    <div className="border-b border-primary">
                        <strong>{paidPlan?.name || 'Pay-as-you-go'}</strong>
                        <p className="text-secondary">Starts at $0/mo</p>
                    </div>
                    {/* Volume/Usage row - dynamically named based on unit */}
                    <h4 className="text-lg font-semibold text-primary mb-0 pr-2">
                        {unit.charAt(0).toUpperCase() + unit.slice(1)}s
                    </h4>
                    <div>
                        <span className="text-xl font-bold text-green">
                            {freePlan?.free_allocation?.toLocaleString() || '5,000'}
                        </span>
                        <span className="text-secondary">/mo</span>
                    </div>
                    <div>
                        <span className="text-xl font-bold text-primary">Unlimited</span>
                    </div>

                    {/* Features callout */}
                    {planDifferences.length > 0 && (
                        <>
                            <h4 className="text-lg font-semibold text-primary mb-0 pr-2">Features</h4>
                            <div className="col-span-2 bg-accent border border-primary rounded px-2 py-1 text-center">
                                <p className="text-center text-primary mb-0">
                                    {onScrollToFeatures ? (
                                        <button
                                            className="font-semibold text-red dark:text-yellow hover:underline cursor-pointer bg-transparent border-none p-0"
                                            onClick={onScrollToFeatures}
                                        >
                                            All features
                                        </button>
                                    ) : (
                                        <span className="font-semibold">All features</span>
                                    )}{' '}
                                    available on both plans except listed below
                                </p>
                            </div>
                        </>
                    )}

                    {/* Dynamic plan differences */}
                    {planDifferences.map((difference, index) => (
                        <React.Fragment key={index}>
                            <div className="">
                                <h4 className="text-lg font-semibold text-primary mb-0 pr-2 inline">
                                    {difference.name}
                                </h4>
                                {difference.description && (
                                    <Tooltip
                                        trigger={
                                            <IconInfo className="inline-block size-5 text-secondary cursor-help relative -top-0.5 -left-0.5 mr-2" />
                                        }
                                        delay={0}
                                    >
                                        <div className="max-w-xs">
                                            <p className="mb-0 text-[13px] leading-normal">{difference.description}</p>
                                        </div>
                                    </Tooltip>
                                )}
                            </div>
                            <div>
                                {renderFeatureValue(difference.freeValue, difference.displayType, difference.key)}
                            </div>
                            <div>
                                {renderFeatureValue(difference.paidValue, difference.displayType, difference.key)}
                            </div>
                        </React.Fragment>
                    ))}

                    {/* Fallback message if no differences found */}
                    {planDifferences.length === 0 && (
                        <div className="border border-primary bg-accent rounded p-4 col-span-3">
                            <p className="text-center text-primary text-sm mb-0">
                                <span className="font-semibold">All features</span> are available on both plans
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PlanComparison

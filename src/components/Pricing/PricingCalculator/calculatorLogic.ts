/**
 * Pure pricing math for the pricing calculator.
 *
 * Deliberately free of React, kea, and path aliases so it can be unit tested against a snapshot
 * of the real billing API – see `calculatorLogic.test.ts`.
 */

export interface BillingTier {
    up_to: number | null
    unit_amount_usd: string
    flat_amount_usd?: string | null
    [key: string]: any
}

export interface BillingPlan {
    tiers?: BillingTier[] | null
    [key: string]: any
}

export interface BillingAddon {
    type: string
    inclusion_only?: boolean | null
    plans: BillingPlan[]
    // True when billing limits don't cap it, like Logs custom retention once it is a companion product
    no_billing_limit?: boolean | null
    [key: string]: any
}

export interface BillingProduct {
    type: string
    addons?: BillingAddon[] | null
    plans: BillingPlan[]
    companion_of?: string | null
    no_billing_limit?: boolean | null
    [key: string]: any
}

/** A retention input from our product data (`retention`), like Logs custom retention. */
export interface RetentionConfig {
    // The billing type that prices retention
    key: string
    maxMonths: number
    label?: string
    // The default retention, which costs nothing extra, in full and as a slider mark
    includedLabel?: string
    includedMark?: string
    // Months labelled on the slider (0 is the included default)
    marks?: number[]
}

/** A product as the calculator sees it – our own product data joined to its billing product. */
export interface CalculatorProduct {
    billingData?: { addons?: BillingAddon[] | null } | null
    [key: string]: any
}

/** Calculator state for a single add-on. Add-ons are tracked by type, not per product. */
export interface CalculatorAddon {
    type: string
    checked: boolean
    totalCost: number
}

export interface AddonDefaults {
    [type: string]: { checked?: boolean }
}

/**
 * Walk the volume through a product's pricing tiers. Tiers are cumulative – `up_to` is the total
 * volume the tier reaches, not the size of the tier – and the last tier has a null `up_to`.
 */
export const calculatePrice = (
    eventNumber: number,
    tiers?: BillingTier[] | null
): { total: number; costByTier: any[] } => {
    let finalCost = 0
    let alreadyCountedEvents = 0

    if (!tiers) {
        return { total: 0, costByTier: [] }
    }
    const costByTier: any[] = []
    for (const { up_to, unit_amount_usd, ...rest } of tiers) {
        const remainingEvents = Math.max(eventNumber - alreadyCountedEvents, 0)
        const eventsInThisTier = up_to
            ? remainingEvents < up_to - alreadyCountedEvents
                ? remainingEvents
                : up_to - alreadyCountedEvents
            : remainingEvents
        const tierCost = eventsInThisTier * parseFloat(unit_amount_usd)
        finalCost = finalCost + tierCost
        // the last tier has null up_to so we set it to an arbitrarily high number
        alreadyCountedEvents = up_to ?? 10000000000

        costByTier.push({ ...rest, up_to, unit_amount_usd, tierCost, eventsInThisTier })
    }

    return { total: Math.round(finalCost), costByTier }
}

/**
 * Billing can list a product billed with another (`companion_of`) at the top level instead of in
 * the parent's add-ons. Fold those companions into the add-ons so both shapes read the same way.
 */
export const withCompanionAddons = <T extends BillingProduct>(product: T, products: BillingProduct[]): T => {
    const addons = product.addons || []
    const companions = products.filter(
        (other) =>
            !!other.companion_of &&
            other.companion_of === product.type &&
            !addons.some((addon) => addon.type === other.type)
    )
    return companions.length > 0 ? { ...product, addons: [...addons, ...companions] } : product
}

/** The tiers of one of a product's add-ons, companions included once `withCompanionAddons` has run. */
export const getAddonTiers = (
    product: { addons?: BillingAddon[] | null } | null | undefined,
    type: string
): BillingTier[] | null | undefined =>
    product?.addons?.find((addon) => addon.type === type)?.plans.find((plan) => plan.tiers)?.tiers

/** Months kept, from 0 (the included default retention) up to what the product allows. */
export const getRetentionMonths = (retention: RetentionConfig, months?: number | null): number =>
    typeof months === 'number' && Number.isFinite(months)
        ? Math.min(Math.max(Math.round(months), 0), retention.maxMonths)
        : 0

/**
 * Steps on the retention slider's track. It uses the volume sliders' curve (position = months^0.4), which is
 * steepest at the top, so the track needs enough steps for every whole month to stay reachable there.
 */
export const RETENTION_SLIDER_STEPS = 500

/** Retention bills in GB-months: every GB ingested, once for each month it is kept. */
export const getRetentionVolume = (volume: number, months: number): number => volume * months

/**
 * Price retention: every GB ingested costs the retention rate again for each month it is kept, on top
 * of its ingestion price. 0 months, the included default, costs nothing.
 */
export const calculateRetentionPrice = (
    tiers: BillingTier[] | null | undefined,
    volume: number,
    months: number
): ReturnType<typeof calculatePrice> => calculatePrice(getRetentionVolume(volume, months), tiers)

/**
 * Build the calculator's add-on state from the products it shows.
 *
 * Add-ons are keyed by type, but several products share a billing product (Web analytics is billed
 * as Product analytics, Experiments as Feature flags), so the same add-on is reachable from more
 * than one product. Each type is registered once – otherwise toggling it sets the cost on every
 * copy and the total counts it once per product that surfaces it.
 */
export const buildProductAddons = (products: CalculatorProduct[], addonDefaults: AddonDefaults = {}) => {
    const addons: CalculatorAddon[] = []
    for (const product of products) {
        for (const addon of product.billingData?.addons || []) {
            if (addons.some((existingAddon) => existingAddon.type === addon.type)) {
                continue
            }
            addons.push({
                type: addon.type,
                checked: addonDefaults[addon.type]?.checked || false,
                totalCost: 0,
            })
        }
    }
    return addons
}

/**
 * Sum the add-ons that belong to a single product. The calculator keeps one add-on list for every
 * product, so a product's subtotal has to be scoped to its own add-ons.
 */
export const getAddonsCostForProduct = (
    addons: CalculatorAddon[],
    billingProduct?: { addons?: BillingAddon[] | null } | null
): number =>
    addons
        .filter(
            (addon) => addon.checked && billingProduct?.addons?.some((productAddon) => productAddon.type === addon.type)
        )
        .reduce((total, addon) => total + addon.totalCost, 0)

/** The headline monthly estimate: every product's usage cost, plus whatever add-ons are enabled. */
export const getCalculatorTotal = (
    monthlyTotal: number,
    productAddons: CalculatorAddon[],
    platformAddons: { checked: boolean; price: number }[]
): number =>
    monthlyTotal +
    productAddons.reduce((total, addon) => total + addon.totalCost, 0) +
    platformAddons.reduce((total, addon) => total + (addon.checked ? addon.price : 0), 0)

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
    [key: string]: any
}

export interface BillingProduct {
    type: string
    addons?: BillingAddon[] | null
    plans: BillingPlan[]
    [key: string]: any
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

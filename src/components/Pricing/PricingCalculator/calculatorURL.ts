import {
    calculateAddonPrice,
    calculatePrice,
    getAddonInputs,
    getAddonTiers,
    getParentMeteredVolume,
} from './calculatorLogic'
import { MODELS, MAX_OBSERVATIONS, estimateReplayVisionPricing } from '../../ReplayVision/PricingEstimator'

type ProductInputs = Record<string, any>

/** The editable fields only; prices and billing metadata never come from the URL. */
export const getProductInputs = (product: any, analyticsData: ProductInputs = {}): ProductInputs => {
    if (product.type === 'product_analytics')
        return {
            types: Object.fromEntries(
                Object.entries(analyticsData).map(([key, data]) => [key, { volume: data.volume }])
            ),
        }
    if (product.type === 'replay_vision')
        return {
            model: product.model ?? MODELS[0].key,
            observations: product.observations ?? Math.round((product.volume ?? 0) / MODELS[0].creditsPerObservation),
        }
    if (product.type === 'posthog_code')
        return { hours: product.hours ?? 0, modelSpend: product.modelSpend ?? (product.volume ?? 0) / 100 }
    return {
        volume: product.volume ?? product.freeLimit ?? product.slider?.min ?? 0,
        ...(product.addonSliders && { addons: getAddonInputs(product.addonSliders, product.addons) }),
    }
}

/** Walk known fields to reject unknown keys, invalid numbers, and duplicate parameters. */
export const readProductInputs = (source: any, defaults: ProductInputs): ProductInputs =>
    Object.fromEntries(
        Object.entries(defaults).map(([key, fallback]) => {
            const value = source?.[key]
            if (typeof fallback === 'object') return [key, readProductInputs(value, fallback)]
            if (key === 'model') return [key, MODELS.some((model) => model.key === value) ? value : fallback]
            const number = typeof value === 'string' && value.trim() ? Number(value) : NaN
            if (!Number.isFinite(number) || number < 0 || number > Number.MAX_SAFE_INTEGER) return [key, fallback]
            return [
                key,
                key === 'modelSpend'
                    ? Math.round(number * 100) / 100
                    : Math.round(Math.min(number, key === 'observations' ? MAX_OBSERVATIONS : Number.MAX_SAFE_INTEGER)),
            ]
        })
    )

/** Seed costs for unopened tabs using the same pricing functions as their controls. */
export const priceProductInputs = (product: any, inputs: ProductInputs, computeRate: number) => {
    const tiers = product.billingData?.plans.find((plan: any) => plan.tiers)?.tiers
    let volume = inputs.volume ?? 0
    let extraCost = 0
    if (product.type === 'product_analytics') {
        volume = Object.values(inputs.types).reduce((sum: number, value: any) => sum + value.volume, 0)
        const enhancedTiers = product.billingData?.addons
            .find((addon: any) => addon.type === 'enhanced_persons')
            ?.plans.find((plan: any) => plan.tiers)?.tiers
        extraCost = calculatePrice(inputs.types.productAnalyticsEvents.volume, enhancedTiers).total
    }
    // Also keeps add-on months read from the URL within what each add-on allows
    const addons = product.addonSliders && getAddonInputs(product.addonSliders, inputs.addons)
    for (const addon of product.addonSliders || []) {
        const addonTiers = getAddonTiers(product.billingData, addon.key)
        extraCost += calculateAddonPrice(addonTiers, addons[addon.key], addon.multiplier).total
    }
    const parentVolume = addons ? getParentMeteredVolume(product.addonSliders, addons) : 0
    if (product.type === 'replay_vision') {
        const estimate = estimateReplayVisionPricing({
            observations: inputs.observations,
            modelKey: inputs.model,
            creditTiers: tiers,
        })
        return {
            ...inputs,
            volume: estimate?.credits ?? 0,
            cost: estimate?.cost ?? 0,
            costByTier: estimate?.costByTier ?? [],
        }
    }
    if (product.type === 'posthog_code')
        volume = Math.round(inputs.hours * computeRate * 100) + Math.round(inputs.modelSpend * 100)
    const price = calculatePrice(volume + parentVolume, tiers)
    return {
        ...inputs,
        ...(addons && { addons }),
        volume,
        cost: product.billedWith ? 0 : price.total + extraCost,
        costByTier: price.costByTier,
    }
}

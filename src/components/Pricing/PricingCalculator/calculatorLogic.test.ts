/**
 * Calculator math against three representative billing fixtures:
 *
 * - Product analytics and its metered add-ons
 * - A normal metered product (Session replay)
 * - Flat-price platform add-ons
 */
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, test } from 'node:test'

import {
    buildProductAddons,
    calculateAddonPrice,
    calculatePrice,
    getAddonInputs,
    getAddonMonths,
    getAddonsCostForProduct,
    getAddonTiers as getBillingAddonTiers,
    getCalculatorTotal,
    getParentMeteredVolume,
    withCompanionAddons,
} from './calculatorLogic.ts'
import type { AddonSlider, BillingAddon, BillingProduct, CalculatorAddon } from './calculatorLogic.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const { products } = JSON.parse(
    fs.readFileSync(path.join(__dirname, '__fixtures__', 'billing-products.json'), 'utf-8')
) as { products: BillingProduct[] }

const getProduct = (type: string): BillingProduct => {
    const product = products.find((product) => product.type === type)
    assert.ok(product, `no representative billing product named ${type}`)
    return product
}

const getTiers = (type: string) => {
    const tiers = getProduct(type).plans.find((plan) => plan.tiers)?.tiers
    assert.ok(tiers, `no tiered plan on ${type}`)
    return tiers
}

const getAddonTiers = (productType: string, addonType: string) => {
    const addon = getProduct(productType).addons?.find((addon) => addon.type === addonType)
    assert.ok(addon, `no ${addonType} add-on on ${productType}`)
    const tiers = addon.plans.find((plan) => plan.tiers)?.tiers
    assert.ok(tiers, `no tiered plan on the ${addonType} add-on`)
    return tiers
}

const costOf = (type: string, volume: number) => calculatePrice(volume, getTiers(type)).total
const addonCostOf = (productType: string, addonType: string, volume: number) =>
    calculatePrice(volume, getAddonTiers(productType, addonType)).total

/**
 * Product analytics charges every event at the base rate, then charges identified events again
 * for person profiles and enabled add-ons.
 */
const productAnalyticsEstimate = ({
    anonymousEvents = 0,
    identifiedEvents = 0,
    groupAnalytics = false,
}: {
    anonymousEvents?: number
    identifiedEvents?: number
    groupAnalytics?: boolean
}) => {
    const events = costOf('product_analytics', anonymousEvents + identifiedEvents)
    const personProfiles = addonCostOf('product_analytics', 'enhanced_persons', identifiedEvents)
    const groups = groupAnalytics ? addonCostOf('product_analytics', 'group_analytics', identifiedEvents) : 0
    return events + personProfiles + groups
}

describe('calculatePrice', () => {
    test('returns an empty result when no tiers are available', () => {
        assert.deepEqual(calculatePrice(1_000_000, null), { total: 0, costByTier: [] })
    })

    test('prices Product analytics across tier boundaries', () => {
        assert.equal(costOf('product_analytics', 1_000_000), 0)
        assert.equal(costOf('product_analytics', 2_000_000), 50)
        assert.equal(costOf('product_analytics', 10_000_000), 324)
        assert.equal(costOf('product_analytics', 500_000_000), 7118)
    })

    test('prices a normal metered product', () => {
        assert.equal(costOf('session_replay', 5_000), 0)
        assert.equal(costOf('session_replay', 15_000), 50)
        assert.equal(costOf('session_replay', 150_000), 373)
    })
})

describe('Product analytics', () => {
    test('quotes $248 for 2M identified events and $319 with Group analytics', () => {
        // Regression: Group analytics was registered twice and the calculator quoted $390.
        assert.equal(productAnalyticsEstimate({ identifiedEvents: 2_000_000 }), 248)
        assert.equal(productAnalyticsEstimate({ identifiedEvents: 2_000_000, groupAnalytics: true }), 319)
    })

    test('does not charge Group analytics for anonymous events', () => {
        assert.equal(productAnalyticsEstimate({ anonymousEvents: 2_000_000 }), 50)
        assert.equal(productAnalyticsEstimate({ anonymousEvents: 2_000_000, groupAnalytics: true }), 50)
    })

    test('shares the base free tier across anonymous and identified events', () => {
        assert.equal(productAnalyticsEstimate({ anonymousEvents: 1_000_000, identifiedEvents: 1_000_000 }), 50)
        assert.equal(
            productAnalyticsEstimate({ anonymousEvents: 1_000_000, identifiedEvents: 1_000_000, groupAnalytics: true }),
            50
        )
    })
})

// Logs custom retention moves from a Logs add-on to a top-level companion product.
const retention: BillingAddon = {
    type: 'logs_retention_custom',
    inclusion_only: true,
    plans: [{ tiers: [{ up_to: null, unit_amount_usd: '0.05' }] }],
}
const retention30d: BillingAddon = { ...retention, type: 'logs_retention_30d' }
const logsPlans = [
    {
        tiers: [
            { up_to: 10, unit_amount_usd: '0' },
            { up_to: 300, unit_amount_usd: '0.25' },
            { up_to: null, unit_amount_usd: '0.15' },
        ],
    },
]
const addonShape: BillingProduct[] = [
    { type: 'logs', plans: logsPlans, companion_of: null, addons: [retention30d, retention] },
]
const companionShape: BillingProduct[] = [
    { type: 'logs', plans: logsPlans, companion_of: null, addons: [retention30d] },
    { ...retention, companion_of: 'logs', no_billing_limit: true, addons: [] },
]

describe('withCompanionAddons', () => {
    const retentionCost = (products: BillingProduct[], volume: number) => {
        const logs = withCompanionAddons(products[0], products)
        const addon = logs.addons?.find((addon) => addon.type === 'logs_retention_custom')
        return calculatePrice(volume, addon?.plans.find((plan) => plan.tiers)?.tiers).total
    }

    test('leaves a product without companions unchanged', () => {
        assert.equal(withCompanionAddons(addonShape[0], addonShape), addonShape[0])
        assert.equal(withCompanionAddons(getProduct('session_replay'), products), getProduct('session_replay'))
    })

    test('lists a companion product with its parent add-ons', () => {
        const logs = withCompanionAddons(companionShape[0], companionShape)
        assert.deepEqual(
            logs.addons?.map((addon) => addon.type),
            ['logs_retention_30d', 'logs_retention_custom']
        )
    })

    test('prices a companion the same as the add-on it replaces', () => {
        assert.equal(retentionCost(addonShape, 100), 5)
        assert.equal(retentionCost(companionShape, 100), 5)
    })

    test('lists a product once when billing returns it as both an add-on and a companion', () => {
        const logs = withCompanionAddons(addonShape[0], [...addonShape, companionShape[1]])
        assert.deepEqual(
            logs.addons?.map((addon) => addon.type),
            ['logs_retention_30d', 'logs_retention_custom']
        )
    })
})

describe('Logs custom retention', () => {
    // As in src/hooks/productData/logs.tsx
    const retentionSlider: AddonSlider = {
        key: 'logs_retention_custom',
        countsTowardParentVolume: true,
        multiplier: { unit: 'month', initial: 1, max: 86 },
        volume: 0,
    }

    /** What both calculators bill for Logs: ingestion on every GB, plus retention on the GB kept. */
    const logsEstimate = (products: BillingProduct[], volume: number, retained: number, months?: number) => {
        const logs = withCompanionAddons(products[0], products)
        const inputs = { logs_retention_custom: { volume: retained, months } }
        const ingestion = calculatePrice(volume + getParentMeteredVolume([retentionSlider], inputs), logsPlans[0].tiers)
        const retentionTiers = getBillingAddonTiers(logs, 'logs_retention_custom')
        const kept = calculateAddonPrice(retentionTiers, inputs.logs_retention_custom, retentionSlider.multiplier)
        return { ingestion: ingestion.total, retention: kept.total }
    }

    test('bills 100 GB kept for 12 months as 1,200 GB-months in both shapes', () => {
        assert.deepEqual(logsEstimate(addonShape, 0, 100, 12), { ingestion: 23, retention: 60 })
        assert.deepEqual(logsEstimate(companionShape, 0, 100, 12), { ingestion: 23, retention: 60 })
    })

    test('bills retained GB as ingestion too', () => {
        // 10 GB at 14-day retention plus 100 GB kept longer: 110 GB ingested, 10 of them free
        assert.equal(logsEstimate(companionShape, 10, 100, 1).ingestion, 25)
        assert.equal(logsEstimate(companionShape, 110, 0).ingestion, 25)
    })

    test('bills one month when months are left out, as an old calculator URL does', () => {
        assert.equal(logsEstimate(companionShape, 0, 100).retention, 5)
    })

    test('keeps months between 1 and 86', () => {
        const { multiplier } = retentionSlider
        assert.equal(getAddonMonths(multiplier, 0), 1)
        assert.equal(getAddonMonths(multiplier, 12.4), 12)
        assert.equal(getAddonMonths(multiplier, 1000), 86)
        assert.equal(getAddonMonths(multiplier, undefined), 1)
        assert.equal(getAddonMonths(undefined, 12), 1)
        assert.equal(logsEstimate(companionShape, 0, 100, 1000).retention, 430)
    })

    test('saves months with the add-on inputs and restores them', () => {
        assert.deepEqual(getAddonInputs([retentionSlider]), { logs_retention_custom: { volume: 0, months: 1 } })
        const saved = getAddonInputs([retentionSlider], { logs_retention_custom: { volume: 100, months: 12 } })
        assert.deepEqual(saved, { logs_retention_custom: { volume: 100, months: 12 } })
        assert.deepEqual(getAddonInputs([retentionSlider], JSON.parse(JSON.stringify(saved))), saved)
        // A URL from before the months input, and one with months out of range
        assert.deepEqual(getAddonInputs([retentionSlider], { logs_retention_custom: { volume: 100 } }), {
            logs_retention_custom: { volume: 100, months: 1 },
        })
        assert.deepEqual(getAddonInputs([retentionSlider], { logs_retention_custom: { volume: 100, months: 0 } }), {
            logs_retention_custom: { volume: 100, months: 1 },
        })
    })

    test('leaves add-ons without months as they were', () => {
        const groupAnalytics: AddonSlider = { key: 'group_analytics', volume: 2_000_000 }
        assert.deepEqual(getAddonInputs([groupAnalytics]), { group_analytics: { volume: 2_000_000 } })
        const tiers = getAddonTiers('product_analytics', 'group_analytics')
        assert.equal(calculateAddonPrice(tiers, { volume: 2_000_000, months: 12 }).total, 71)
        assert.equal(getParentMeteredVolume([groupAnalytics], { group_analytics: { volume: 2_000_000 } }), 0)
    })

    test('reads the billing limit flag only from the companion shape', () => {
        const flag = (products: BillingProduct[]) =>
            withCompanionAddons(products[0], products).addons?.find((addon) => addon.type === 'logs_retention_custom')
                ?.no_billing_limit === true
        assert.equal(flag(addonShape), false)
        assert.equal(flag(companionShape), true)
    })
})

describe('buildProductAddons', () => {
    test('registers an add-on once when two calculator products share billing data', () => {
        // Web analytics is billed as Product analytics, so it surfaces these add-ons too.
        const productAnalytics = getProduct('product_analytics')
        const addons = buildProductAddons([{ billingData: productAnalytics }, { billingData: productAnalytics }])

        assert.deepEqual(
            addons.map((addon) => addon.type),
            ['enhanced_persons', 'group_analytics']
        )
    })

    test('starts add-ons at zero and applies defaults', () => {
        const addons = buildProductAddons([{ billingData: getProduct('product_analytics') }], {
            enhanced_persons: { checked: true },
        })

        assert.ok(addons.every((addon) => addon.totalCost === 0))
        assert.equal(addons.find((addon) => addon.type === 'enhanced_persons')?.checked, true)
        assert.equal(addons.find((addon) => addon.type === 'group_analytics')?.checked, false)
    })

    test('ignores products without billing add-ons', () => {
        assert.deepEqual(buildProductAddons([{ billingData: null }, {}]), [])
    })
})

describe('getAddonsCostForProduct', () => {
    const addons: CalculatorAddon[] = [
        { type: 'group_analytics', checked: true, totalCost: 71 },
        { type: 'enhanced_persons', checked: true, totalCost: 0 },
        { type: 'mobile_replay', checked: true, totalCost: 500 },
    ]

    test("only counts a product's own add-ons", () => {
        assert.equal(getAddonsCostForProduct(addons, getProduct('product_analytics')), 71)
        assert.equal(getAddonsCostForProduct(addons, getProduct('session_replay')), 500)
    })

    test('does not count a disabled add-on with stale cached cost', () => {
        const disabledGroupAnalytics = addons.map((addon) =>
            addon.type === 'group_analytics' ? { ...addon, checked: false } : addon
        )
        assert.equal(getAddonsCostForProduct(disabledGroupAnalytics, getProduct('product_analytics')), 0)
    })

    test('is zero when there are no matching add-ons', () => {
        assert.equal(getAddonsCostForProduct(addons, { addons: [] }), 0)
        assert.equal(getAddonsCostForProduct(addons, null), 0)
    })
})

describe('getCalculatorTotal', () => {
    const platformAddons = getProduct('platform_and_support').addons!.map((addon) => ({
        checked: false,
        price: Number(addon.plans.at(-1)?.unit_amount_usd),
    }))

    test('adds product add-ons once', () => {
        const productAddons: CalculatorAddon[] = [
            { type: 'group_analytics', checked: true, totalCost: 71 },
            { type: 'enhanced_persons', checked: true, totalCost: 0 },
        ]

        assert.equal(getCalculatorTotal(248, productAddons, platformAddons), 319)
    })

    test('only includes selected flat-price platform add-ons', () => {
        assert.equal(getCalculatorTotal(248, [], platformAddons), 248)
        assert.equal(getCalculatorTotal(248, [], [{ ...platformAddons[0], checked: true }, platformAddons[1]]), 498)
    })
})

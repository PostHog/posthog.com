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

import { buildProductAddons, calculatePrice, getAddonsCostForProduct, getCalculatorTotal } from './calculatorLogic.ts'
import type { BillingProduct, CalculatorAddon } from './calculatorLogic.ts'

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

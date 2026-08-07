/**
 * Pricing calculator math, checked against the prices in `__fixtures__/billing-products.json`.
 *
 *   pnpm test:pricing-calculator
 *
 * The dollar amounts below are the ones posthog.com quotes publicly, so they're written out
 * literally rather than derived – if a change moves any of them, that's the point. When billing
 * changes its prices, update the fixture and these expectations together.
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
    assert.ok(product, `no billing product named ${type} – refresh the fixture`)
    return product
}

const getTiers = (type: string) => {
    const tiers = getProduct(type).plans.find((plan) => plan.tiers)?.tiers
    assert.ok(tiers, `no tiered plan on ${type} – refresh the fixture`)
    return tiers
}

const getAddonTiers = (productType: string, addonType: string) => {
    const addon = getProduct(productType).addons?.find((addon) => addon.type === addonType)
    assert.ok(addon, `no ${addonType} add-on on ${productType} – refresh the fixture`)
    const tiers = addon.plans.find((plan) => plan.tiers)?.tiers
    assert.ok(tiers, `no tiered plan on the ${addonType} add-on – refresh the fixture`)
    return tiers
}

const costOf = (type: string, volume: number) => calculatePrice(volume, getTiers(type)).total
const addonCostOf = (productType: string, addonType: string, volume: number) =>
    calculatePrice(volume, getAddonTiers(productType, addonType)).total

/**
 * What the Product analytics tab charges: every event at the base rate, identified events again
 * for person profiles, and identified events once more for each enabled add-on.
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
    test('nothing is charged inside the free tier', () => {
        assert.equal(costOf('product_analytics', 0), 0)
        assert.equal(costOf('product_analytics', 500_000), 0)
        assert.equal(costOf('product_analytics', 1_000_000), 0)
    })

    test('product analytics events price as advertised', () => {
        assert.equal(costOf('product_analytics', 2_000_000), 50)
        assert.equal(costOf('product_analytics', 10_000_000), 324)
        assert.equal(costOf('product_analytics', 100_000_000), 2618)
    })

    test('volume past the last tier keeps pricing at the last tier rate', () => {
        // 500M is past the final `up_to: null` tier boundary
        assert.equal(costOf('product_analytics', 500_000_000), 7118)
    })

    test('every product prices its free tier at zero and charges beyond it', () => {
        for (const product of products) {
            const tiers = product.plans.find((plan) => plan.tiers)?.tiers
            if (!tiers) {
                continue
            }
            const freeTier = tiers.find((tier) => tier.unit_amount_usd === '0')
            if (!freeTier?.up_to) {
                continue
            }
            assert.equal(
                calculatePrice(freeTier.up_to, tiers).total,
                0,
                `${product.type} charges for volume inside its free tier`
            )
            assert.ok(
                calculatePrice(freeTier.up_to * 100, tiers).total > 0,
                `${product.type} charges nothing well past its free tier`
            )
        }
    })

    test('cost never decreases as volume grows', () => {
        for (const product of products) {
            const tiers = product.plans.find((plan) => plan.tiers)?.tiers
            if (!tiers) {
                continue
            }
            let previous = 0
            for (const volume of [0, 1, 1_000, 100_000, 1_000_000, 50_000_000, 1_000_000_000]) {
                const cost = calculatePrice(volume, tiers).total
                assert.ok(cost >= previous, `${product.type} got cheaper between ${volume} and the volume below it`)
                previous = cost
            }
        }
    })
})

describe('per-product pricing', () => {
    // One case inside the free tier and two past it, for every product the calculator can price
    const expectations: [string, number, number][] = [
        ['session_replay', 5_000, 0],
        ['session_replay', 15_000, 50],
        ['session_replay', 150_000, 373],
        ['feature_flags', 1_000_000, 0],
        ['feature_flags', 2_000_000, 100],
        ['feature_flags', 10_000_000, 460],
        ['surveys', 1_500, 0],
        ['surveys', 2_000, 50],
        ['surveys', 100_000, 1280],
        ['data_warehouse', 1_000_000, 0],
        ['data_warehouse', 10_000_000, 135],
        ['data_warehouse', 100_000_000, 735],
        ['error_tracking', 100_000, 0],
        ['error_tracking', 325_000, 83],
        ['error_tracking', 10_000_000, 1438],
        ['llm_analytics', 100_000, 0],
        ['llm_analytics', 250_000, 35],
        ['llm_analytics', 5_000_000, 380],
        ['logs', 10, 0],
        ['logs', 300, 73],
        ['logs', 5_000, 778],
        ['realtime_destinations', 10_000, 0],
        ['realtime_destinations', 100_000, 35],
        ['realtime_destinations', 5_000_000, 570],
        ['workflows_emails', 10_000, 0],
        ['workflows_emails', 100_000, 210],
        ['workflows_emails', 1_000_000, 1110],
        ['posthog_ai', 500, 0],
        ['posthog_ai', 5_000, 45],
        ['inbox', 3, 0],
        ['inbox', 10, 105],
    ]

    for (const [type, volume, expected] of expectations) {
        test(`${type} at ${volume.toLocaleString()} costs $${expected}`, () => {
            assert.equal(costOf(type, volume), expected)
        })
    }
})

describe('product analytics add-ons', () => {
    test('person profiles are charged on identified events only, first million free', () => {
        assert.equal(addonCostOf('product_analytics', 'enhanced_persons', 1_000_000), 0)
        assert.equal(addonCostOf('product_analytics', 'enhanced_persons', 2_000_000), 198)
        assert.equal(addonCostOf('product_analytics', 'enhanced_persons', 10_000_000), 756)
    })

    test('group analytics gets its own free million', () => {
        assert.equal(addonCostOf('product_analytics', 'group_analytics', 1_000_000), 0)
        assert.equal(addonCostOf('product_analytics', 'group_analytics', 2_000_000), 71)
        assert.equal(addonCostOf('product_analytics', 'group_analytics', 10_000_000), 311)
    })

    test('2M identified events costs $248, and $319 with group analytics', () => {
        // The regression this file was written for: group analytics used to be counted twice,
        // which quoted $390 for this estimate
        assert.equal(productAnalyticsEstimate({ identifiedEvents: 2_000_000 }), 248)
        assert.equal(productAnalyticsEstimate({ identifiedEvents: 2_000_000, groupAnalytics: true }), 319)
    })

    test('anonymous events are charged at the base rate only', () => {
        assert.equal(productAnalyticsEstimate({ anonymousEvents: 2_000_000 }), 50)
        assert.equal(productAnalyticsEstimate({ anonymousEvents: 2_000_000, groupAnalytics: true }), 50)
    })

    test('a mixed estimate shares one free tier across event types', () => {
        // 2M total events, half identified: base tier is shared, person profiles only see the 1M
        // identified events, which is inside their own free tier
        assert.equal(productAnalyticsEstimate({ anonymousEvents: 1_000_000, identifiedEvents: 1_000_000 }), 50)
        assert.equal(
            productAnalyticsEstimate({ anonymousEvents: 1_000_000, identifiedEvents: 1_000_000, groupAnalytics: true }),
            50
        )
    })

    test('group analytics stays a small share of a large estimate', () => {
        assert.equal(productAnalyticsEstimate({ identifiedEvents: 10_000_000 }), 324 + 756)
        assert.equal(productAnalyticsEstimate({ identifiedEvents: 10_000_000, groupAnalytics: true }), 324 + 756 + 311)
    })
})

describe('buildProductAddons', () => {
    /** The calculator's product list: our product data joined to a billing product. */
    const calculatorProducts = (types: string[]) => types.map((type) => ({ billingData: getProduct(type) }))

    test('registers each add-on once when two products share a billing product', () => {
        // Web analytics is billed as product analytics, so it carries the same add-ons
        const addons = buildProductAddons(calculatorProducts(['product_analytics', 'product_analytics']))
        const groupAnalytics = addons.filter((addon) => addon.type === 'group_analytics')
        assert.equal(groupAnalytics.length, 1)
        assert.equal(new Set(addons.map((addon) => addon.type)).size, addons.length)
    })

    test('covers every add-on across every product exactly once', () => {
        const addons = buildProductAddons(calculatorProducts(products.map((product) => product.type)))
        const expected = new Set(products.flatMap((product) => (product.addons || []).map((addon) => addon.type)))
        assert.deepEqual(new Set(addons.map((addon) => addon.type)), expected)
        assert.equal(addons.length, expected.size)
    })

    test('starts every add-on at zero, and applies defaults', () => {
        const addons = buildProductAddons(calculatorProducts(['product_analytics']), {
            enhanced_persons: { checked: true },
        })
        assert.ok(addons.every((addon) => addon.totalCost === 0))
        assert.equal(addons.find((addon) => addon.type === 'enhanced_persons')?.checked, true)
        assert.equal(addons.find((addon) => addon.type === 'group_analytics')?.checked, false)
    })

    test('products without add-ons contribute nothing', () => {
        assert.deepEqual(buildProductAddons(calculatorProducts(['feature_flags', 'surveys'])), [])
        assert.deepEqual(buildProductAddons([{ billingData: null }, {}]), [])
    })
})

describe('getAddonsCostForProduct', () => {
    const addons: CalculatorAddon[] = [
        { type: 'group_analytics', checked: true, totalCost: 71 },
        { type: 'enhanced_persons', checked: true, totalCost: 0 },
        { type: 'mobile_replay', checked: true, totalCost: 500 },
    ]

    test("only counts the product's own add-ons", () => {
        assert.equal(getAddonsCostForProduct(addons, getProduct('product_analytics')), 71)
        assert.equal(getAddonsCostForProduct(addons, getProduct('session_replay')), 500)
    })

    test('is zero for products that have no add-ons', () => {
        assert.equal(getAddonsCostForProduct(addons, getProduct('feature_flags')), 0)
        assert.equal(getAddonsCostForProduct(addons, null), 0)
    })
})

describe('getCalculatorTotal', () => {
    const platformAddons = [
        { type: 'boost', checked: false, price: 250 },
        { type: 'teams', checked: false, price: 450 },
    ]

    test('adds enabled add-ons to the usage total once each', () => {
        const addons: CalculatorAddon[] = [
            { type: 'group_analytics', checked: true, totalCost: 71 },
            { type: 'enhanced_persons', checked: true, totalCost: 0 },
        ]
        assert.equal(getCalculatorTotal(248, addons, platformAddons), 319)
    })

    test('platform add-ons are flat and only billed when selected', () => {
        assert.equal(getCalculatorTotal(248, [], platformAddons), 248)
        assert.equal(getCalculatorTotal(248, [], [{ ...platformAddons[0], checked: true }, platformAddons[1]]), 498)
    })

    test('multi-product estimates add up', () => {
        const monthlyTotal =
            productAnalyticsEstimate({ identifiedEvents: 2_000_000 }) +
            costOf('session_replay', 15_000) +
            costOf('feature_flags', 2_000_000) +
            costOf('error_tracking', 325_000)
        assert.equal(monthlyTotal, 248 + 50 + 100 + 83)
        assert.equal(
            getCalculatorTotal(monthlyTotal, [{ type: 'group_analytics', checked: true, totalCost: 71 }], []),
            552
        )
    })
})

describe('product data', () => {
    test('some products share a billing product, so add-ons must be deduped by type', () => {
        const productDataDir = path.join(__dirname, '..', '..', '..', 'hooks', 'productData')
        const sharedBillingTypes = fs
            .readdirSync(productDataDir)
            .filter((file) => file.endsWith('.tsx'))
            .flatMap((file) => {
                const source = fs.readFileSync(path.join(productDataDir, file), 'utf-8')
                return [...source.matchAll(/billingType: '([^']+)'/g)].map((match) => match[1])
            })

        assert.ok(
            sharedBillingTypes.includes('product_analytics'),
            'nothing is billed as product analytics any more – the dedupe in buildProductAddons may be dead code'
        )
        for (const type of sharedBillingTypes) {
            assert.ok(
                products.some((product) => product.type === type),
                `a product is billed as "${type}", which billing does not know about`
            )
        }
    })
})

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

import qs from 'qs'

import {
    buildProductAddons,
    calculatePrice,
    calculateRetentionPrice,
    getAddonsCostForProduct,
    getAddonTiers as getBillingAddonTiers,
    getCalculatorTotal,
    getRetentionMonths,
    getRetentionVolume,
    readLegacyRetention,
    RETENTION_SLIDER_STEPS,
    withCompanionAddons,
} from './calculatorLogic.ts'
import type { BillingAddon, BillingProduct, CalculatorAddon, RetentionConfig } from './calculatorLogic.ts'

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
    const retentionConfig: RetentionConfig = { key: 'logs_retention_custom', maxMonths: 86 }

    /** What both calculators bill for Logs: ingestion on every GB, plus retention on every GB for each month kept. */
    const logsEstimate = (products: BillingProduct[], volume: number, months?: number) => {
        const logs = withCompanionAddons(products[0], products)
        const kept = getRetentionMonths(retentionConfig, months)
        const ingestion = calculatePrice(volume, logs.plans.find((plan) => plan.tiers)?.tiers).total
        const retention = calculateRetentionPrice(getBillingAddonTiers(logs, retentionConfig.key), volume, kept).total
        return { ingestion, retention }
    }

    test('bills 100 GB kept for 12 months as ingestion plus 1,200 GB-months in both shapes', () => {
        // 10 GB free, then 90 GB at $0.25 = $22.50, which the calculators round to $23
        assert.deepEqual(logsEstimate(addonShape, 100, 12), { ingestion: 23, retention: 60 })
        assert.deepEqual(logsEstimate(companionShape, 100, 12), { ingestion: 23, retention: 60 })
        assert.equal(getRetentionVolume(100, 12), 1_200)
    })

    test('counts ingestion once, whatever the retention', () => {
        assert.equal(logsEstimate(companionShape, 100, 0).ingestion, 23)
        assert.equal(logsEstimate(companionShape, 100, 86).ingestion, 23)
    })

    test('charges nothing for the included 14-day default', () => {
        assert.deepEqual(logsEstimate(addonShape, 100, 0), { ingestion: 23, retention: 0 })
        assert.deepEqual(logsEstimate(companionShape, 100), { ingestion: 23, retention: 0 })
    })

    test('has no free tier, so every GB kept bills', () => {
        // 10 GB is free to ingest, but keeping it for a month costs 10 × $0.05
        const logs = withCompanionAddons(companionShape[0], companionShape)
        const kept = calculateRetentionPrice(getBillingAddonTiers(logs, 'logs_retention_custom'), 10, 1)
        assert.equal(kept.costByTier[0].tierCost, 0.5)
        assert.equal(logsEstimate(companionShape, 10, 1).ingestion, 0)
    })

    test('reads the retention price from billing', () => {
        const pricier = [
            companionShape[0],
            { ...companionShape[1], plans: [{ tiers: [{ up_to: null, unit_amount_usd: '0.07' }] }] },
        ]
        assert.equal(logsEstimate(pricier, 100, 12).retention, 84)
    })

    test('keeps months between 0 (the 14-day default) and 86', () => {
        assert.equal(getRetentionMonths(retentionConfig, undefined), 0)
        assert.equal(getRetentionMonths(retentionConfig, null), 0)
        assert.equal(getRetentionMonths(retentionConfig, NaN), 0)
        assert.equal(getRetentionMonths(retentionConfig, -3), 0)
        assert.equal(getRetentionMonths(retentionConfig, 12.4), 12)
        assert.equal(getRetentionMonths(retentionConfig, 1000), 86)
        assert.equal(logsEstimate(companionShape, 100, 1000).retention, 430)
    })

    // The retention slider's scale, as `nonLinearCurve` and `reverseNonLinearCurve` in PricingSlider/Slider.tsx
    const position = (months: number) => Math.pow(months, 0.4)
    const monthsAt = (at: number) => getRetentionMonths(retentionConfig, Math.pow(at, 1 / 0.4))

    test('maps slider positions to whole months between the 14-day default and 86', () => {
        assert.equal(monthsAt(0), 0)
        assert.equal(monthsAt(position(12)), 12)
        assert.equal(monthsAt(position(86)), 86)
        assert.equal(monthsAt(position(86) * 1.1), 86)
        // Between two months the slider lands on the nearer whole month
        assert.equal(monthsAt(position(11.4)), 11)
        assert.equal(monthsAt(position(11.6)), 12)
        // The first year takes about half the track
        assert.ok(Math.abs(position(12) / position(86) - 0.5) < 0.06)
    })

    test('can reach every whole month on the slider', () => {
        const step = position(retentionConfig.maxMonths) / RETENTION_SLIDER_STEPS
        const reached = new Set(Array.from({ length: RETENTION_SLIDER_STEPS + 1 }, (_, i) => monthsAt(i * step)))
        assert.deepEqual(
            [...reached].sort((a, b) => a - b),
            Array.from({ length: 87 }, (_, months) => months)
        )
    })

    /** A calculator link as Tabbed.tsx writes it with `qs`, read back as numbers the way `readProductInputs` does. */
    const roundTrip = (logs: Record<string, unknown>) => {
        const query = qs.stringify({ products: 'logs', logs }, { encodeValuesOnly: true })
        const parsed = qs.parse(query).logs as Record<string, unknown>
        const months = typeof parsed.retentionMonths === 'string' ? Number(parsed.retentionMonths) : undefined
        return { query, volume: Number(parsed.volume), months: getRetentionMonths(retentionConfig, months) }
    }

    test('restores volume and months from a shared calculator link', () => {
        const link = roundTrip({ volume: 100, retentionMonths: 12 })
        assert.equal(link.query, 'products=logs&logs[volume]=100&logs[retentionMonths]=12')
        assert.deepEqual({ volume: link.volume, months: link.months }, { volume: 100, months: 12 })
        assert.deepEqual(logsEstimate(companionShape, link.volume, link.months), { ingestion: 23, retention: 60 })
        assert.equal(roundTrip({ volume: 100, retentionMonths: 0 }).months, 0)
        assert.equal(roundTrip({ volume: 100, retentionMonths: 500 }).months, 86)
    })

    test('converts a link from the old two-input calculator to total GB and months kept', () => {
        const legacyLink = (logs: Record<string, unknown>) => {
            const parsed = qs.parse(qs.stringify({ logs }, { encodeValuesOnly: true })).logs as any
            return readLegacyRetention(retentionConfig, Number(parsed.volume), parsed.addons?.logs_retention_custom)
        }
        // 100 GB plus 50 GB kept 12 months: ingestion on 150 GB, and the same 600 GB-months
        const converted = legacyLink({ volume: 100, addons: { logs_retention_custom: { volume: 50, months: 12 } } })
        assert.deepEqual(converted, { volume: 150, retentionMonths: 4 })
        assert.deepEqual(logsEstimate(companionShape, 150, 4), { ingestion: 35, retention: 30 })
        // Links from before the months input bill one month
        assert.deepEqual(legacyLink({ volume: 0, addons: { logs_retention_custom: { volume: 100 } } }), {
            volume: 100,
            retentionMonths: 1,
        })
        assert.equal(legacyLink({ volume: 100, addons: { logs_retention_custom: { volume: 0, months: 12 } } }), null)
        assert.equal(legacyLink({ volume: 100 }), null)
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

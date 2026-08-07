#!/usr/bin/env node
/**
 * Keeps the pricing calculator's test fixture in sync with the live billing API.
 *
 *   node scripts/billing-products-fixture.mjs           # rewrite the fixture from the live API
 *   node scripts/billing-products-fixture.mjs --check   # fail if the fixture has drifted
 *
 * The calculator's tests assert real dollar amounts, so they're only meaningful while the fixture
 * matches what billing actually charges. `--check` is the canary for that – when it fails, rerun
 * without the flag and confirm the new totals in the test are the ones we want to quote.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const BILLING_URL = 'https://billing.posthog.com/api/products-v2?display_friendly=true'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FIXTURE_PATH = path.join(
    __dirname,
    '..',
    'src',
    'components',
    'Pricing',
    'PricingCalculator',
    '__fixtures__',
    'billing-products.json'
)

const pickTier = ({ up_to, unit_amount_usd, flat_amount_usd }) => ({ up_to, unit_amount_usd, flat_amount_usd })

const pickPlan = ({ name, plan_key, unit, flat_rate, unit_amount_usd, free_allocation, tiers }) => ({
    name,
    plan_key,
    unit,
    flat_rate,
    unit_amount_usd,
    free_allocation,
    tiers: tiers ? tiers.map(pickTier) : null,
})

const pickAddon = ({ type, name, unit, inclusion_only, legacy_product, plans }) => ({
    type,
    name,
    unit,
    inclusion_only,
    legacy_product,
    plans: (plans || []).map(pickPlan),
})

const pickProduct = ({ type, name, unit, usage_key, inclusion_only, legacy_product, plans, addons }) => ({
    type,
    name,
    unit,
    usage_key,
    inclusion_only,
    legacy_product,
    plans: (plans || []).map(pickPlan),
    addons: (addons || []).map(pickAddon),
})

/** Only the fields the calculator reads – the full response is mostly copy and image URLs. */
const buildFixture = (products) => ({
    _comment: `Trimmed snapshot of ${BILLING_URL}. Refresh with: node scripts/billing-products-fixture.mjs`,
    products: products.map(pickProduct),
})

const main = async () => {
    const check = process.argv.includes('--check')

    let response
    try {
        response = await fetch(BILLING_URL)
    } catch (error) {
        console.error(`Could not reach the billing API: ${error.message}`)
        process.exit(check ? 0 : 1)
    }
    if (!response.ok) {
        console.error(`Billing API returned ${response.status}`)
        process.exit(check ? 0 : 1)
    }

    const { products } = await response.json()
    if (!products?.length) {
        console.error('Billing API returned no products')
        process.exit(1)
    }

    const live = JSON.stringify(buildFixture(products), null, 4) + '\n'

    if (!check) {
        fs.writeFileSync(FIXTURE_PATH, live)
        console.log(`Wrote ${products.length} products to ${path.relative(process.cwd(), FIXTURE_PATH)}`)
        return
    }

    const current = fs.existsSync(FIXTURE_PATH) ? fs.readFileSync(FIXTURE_PATH, 'utf-8') : ''
    if (current !== live) {
        console.error(
            'Billing prices have changed since the pricing calculator fixture was captured.\n' +
                'Run `node scripts/billing-products-fixture.mjs` and check the expected totals in\n' +
                'src/components/Pricing/PricingCalculator/calculatorLogic.test.ts still hold.'
        )
        process.exit(1)
    }
    console.log('Pricing calculator fixture matches live billing prices.')
}

main()

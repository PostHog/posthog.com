/* Unit checks for deriveSourceSlug — guards against publishing `/sources/null` links.
 * Run: npx tsx gatsby/sourceSlug.test.ts */
import assert from 'assert'
import { deriveSourceSlug } from './sourceSlug'

let passed = 0
const check = (name: string, fn: () => void) => {
    try {
        fn()
        passed++
        console.log(`  ✓ ${name}`)
    } catch (err) {
        console.error(`  ✗ ${name}\n    ${(err as Error).message}`)
        process.exitCode = 1
    }
}

console.log('deriveSourceSlug')
check('prefers the docsUrl slug over the label', () =>
    assert.equal(
        deriveSourceSlug({ label: 'ActiveCampaign', docsUrl: '/docs/cdp/sources/active-campaign' }),
        'active-campaign'
    )
)
check('falls back to a label-derived slug', () =>
    assert.equal(deriveSourceSlug({ label: 'Judge.me Reviews' }), 'judgeme-reviews')
)
check('uses name when label is missing', () => assert.equal(deriveSourceSlug({ name: 'DynamoDB' }), 'dynamodb'))

// Incomplete records must return null so callers skip them — never `/sources/null`.
check('returns null when name and label are missing', () => assert.equal(deriveSourceSlug({}), null))
check('returns null when the display name has no slug characters', () =>
    assert.equal(deriveSourceSlug({ label: '。。。' }), null)
)

console.log(`\n${passed} checks passed`)

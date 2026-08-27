/**
 * Versioned SDK reference path parsing, used by the version-unavailable page.
 *
 * Run: pnpm test:sdk-references
 */
import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { parseVersionedReferencePath } from './utils.ts'

describe('parseVersionedReferencePath', () => {
    test('splits an SDK id from its version', () => {
        assert.deepEqual(parseVersionedReferencePath('/docs/references/posthog-python-7.26.0'), {
            sdk: 'posthog-python',
            version: '7.26.0',
        })
    })

    test('prefers the longest SDK id', () => {
        assert.deepEqual(parseVersionedReferencePath('/docs/references/posthog-react-native-1.2.3'), {
            sdk: 'posthog-react-native',
            version: '1.2.3',
        })
    })

    test('ignores a .md suffix and a types subpath', () => {
        assert.deepEqual(parseVersionedReferencePath('/docs/references/posthog-node-4.0.1.md'), {
            sdk: 'posthog-node',
            version: '4.0.1',
        })
        assert.deepEqual(parseVersionedReferencePath('/docs/references/posthog-js-1.0.0/types/Survey'), {
            sdk: 'posthog-js',
            version: '1.0.0',
        })
    })

    test('returns null when no version was asked for', () => {
        assert.equal(parseVersionedReferencePath('/docs/references/posthog-python'), null)
        assert.equal(parseVersionedReferencePath('/docs/references/posthog-python.md'), null)
        assert.equal(parseVersionedReferencePath('/docs/references/version-unavailable'), null)
    })

    test('returns null for an unknown SDK', () => {
        assert.equal(parseVersionedReferencePath('/docs/references/posthog-jsx-1.0.0'), null)
    })
})

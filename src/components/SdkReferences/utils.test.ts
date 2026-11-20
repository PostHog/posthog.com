/**
 * Versioned SDK reference path parsing and URL routing, used by the version-unavailable page
 * and Gatsby Markdown reference ingestion.
 *
 * Run: pnpm test:sdk-references
 */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { describe, test } from 'node:test'
import { runInNewContext } from 'node:vm'

import { LIBRARY_REFERENCE_SDK_IDS, getSdkReferenceUrl, parseVersionedReferenceSlug } from './utils.ts'

function loadSdkMarkdownReferences(): {
    PUBLISHED_SDK_REFERENCES: string[]
    sdkReferenceSlug: (relativePath: string) => string
} {
    const source = readFileSync(new URL('../../../gatsby/sdkMarkdownReferences.js', import.meta.url), 'utf8')
    const module = {
        exports: {} as {
            PUBLISHED_SDK_REFERENCES?: string[]
            sdkReferenceSlug?: (relativePath: string) => string
        },
    }
    runInNewContext(source, {
        module,
        exports: module.exports,
        require: (id: string) => {
            if (id === 'yaml') return { parse: () => ({}) }
            throw new Error(`Unexpected require in sdkMarkdownReferences.js: ${id}`)
        },
    })
    return {
        PUBLISHED_SDK_REFERENCES: module.exports.PUBLISHED_SDK_REFERENCES ?? [],
        sdkReferenceSlug: module.exports.sdkReferenceSlug!,
    }
}

describe('parseVersionedReferenceSlug', () => {
    test('splits an SDK id from its version', () => {
        assert.deepEqual(parseVersionedReferenceSlug('posthog-python-7.26.0'), {
            sdk: 'posthog-python',
            version: '7.26.0',
        })
    })

    test('prefers the longest SDK id', () => {
        assert.deepEqual(parseVersionedReferenceSlug('posthog-react-native-1.2.3'), {
            sdk: 'posthog-react-native',
            version: '1.2.3',
        })
    })

    test('ignores a .md suffix and a types subpath', () => {
        assert.deepEqual(parseVersionedReferenceSlug('posthog-node-4.0.1.md'), {
            sdk: 'posthog-node',
            version: '4.0.1',
        })
        assert.deepEqual(parseVersionedReferenceSlug('posthog-js-1.0.0/types/Survey'), {
            sdk: 'posthog-js',
            version: '1.0.0',
        })
    })

    test('returns null when no version was asked for', () => {
        assert.equal(parseVersionedReferenceSlug('posthog-python'), null)
        assert.equal(parseVersionedReferenceSlug('posthog-python.md'), null)
        assert.equal(parseVersionedReferenceSlug('version-unavailable'), null)
    })

    test('returns null for an unknown SDK', () => {
        assert.equal(parseVersionedReferenceSlug('posthog-jsx-1.0.0'), null)
    })
})

describe('sdkReferenceSlug and getSdkReferenceUrl', () => {
    test('LIBRARY_REFERENCE_SDK_IDS stays in sync with gatsby/sdkMarkdownReferences.js', () => {
        const { PUBLISHED_SDK_REFERENCES } = loadSdkMarkdownReferences()
        assert.deepEqual([...LIBRARY_REFERENCE_SDK_IDS].sort(), [...PUBLISHED_SDK_REFERENCES].sort())
    })

    test('maps reference.md to /docs/libraries/<sdk> while keeping version and migration slugs', () => {
        const { sdkReferenceSlug } = loadSdkMarkdownReferences()
        assert.equal(sdkReferenceSlug('docs/libraries/go/reference.md'), '/docs/libraries/go')
        assert.equal(sdkReferenceSlug('docs/libraries/python/reference.md'), '/docs/libraries/python')
        assert.equal(sdkReferenceSlug('docs/libraries/go/2.x.x.md'), '/docs/libraries/go/2.x.x')
        assert.equal(sdkReferenceSlug('docs/libraries/go/migration.md'), '/docs/libraries/go/migration')
    })

    test('routes SDKs with markdown references to /docs/libraries/<sdk>', () => {
        assert.equal(getSdkReferenceUrl('posthog-python'), '/docs/libraries/python')
        assert.equal(getSdkReferenceUrl('posthog-node'), '/docs/libraries/node')
        assert.equal(getSdkReferenceUrl('posthog-go'), '/docs/libraries/go')
        assert.equal(getSdkReferenceUrl('posthog-rust'), '/docs/libraries/rust')
    })

    test('routes remaining HogRef SDKs to /docs/references/<id>', () => {
        assert.equal(getSdkReferenceUrl('posthog-js'), '/docs/references/posthog-js')
        assert.equal(getSdkReferenceUrl('posthog-ios'), '/docs/references/posthog-ios')
        assert.equal(getSdkReferenceUrl('posthog-react-native'), '/docs/references/posthog-react-native')
    })
})

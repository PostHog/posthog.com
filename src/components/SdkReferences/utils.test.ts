/**
 * Versioned SDK reference path parsing, URL routing, and Vercel redirect invariants.
 *
 * Run: pnpm test:sdk-references
 */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { describe, test } from 'node:test'
import { compile, pathToRegexp } from 'path-to-regexp'

import sdkMarkdownReferences from '../../../gatsby/sdkMarkdownReferences.js'
import {
    LIBRARY_REFERENCE_SDK_IDS,
    SUPPORTED_SDK_IDS,
    getSdkReferenceUrl,
    parseVersionedReferenceSlug,
} from './utils.ts'

const { PUBLISHED_SDK_REFERENCES, getLegacyHogRefSdkIds, sdkReferenceSlug } = sdkMarkdownReferences

type VercelRedirect = {
    source: string
    destination: string
    statusCode?: number
    permanent?: boolean
    has?: unknown[]
    missing?: unknown[]
}

const vercelConfig = JSON.parse(readFileSync(new URL('../../../vercel.json', import.meta.url), 'utf8')) as {
    headers: unknown[]
    redirects: VercelRedirect[]
    rewrites: unknown[]
}

function resolveFirstRedirect(pathname: string): { destination: string; statusCode?: number; source: string } | null {
    for (const redirect of vercelConfig.redirects) {
        if (redirect.has?.length || redirect.missing?.length) continue
        const keys: Array<{ name: string | number }> = []
        const re = pathToRegexp(redirect.source, keys, { strict: true, sensitive: true, delimiter: '/' })
        const match = re.exec(pathname)
        if (!match) continue
        let destination = redirect.destination
        keys.forEach((key, index) => {
            destination = destination.replace(new RegExp(`:${key.name}[*+?]?`, 'g'), match[index + 1] ?? '')
        })
        return { destination, statusCode: redirect.statusCode, source: redirect.source }
    }
    return null
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

    test('parses every migrated SDK including posthog-rust and resolves its library URL', () => {
        for (const sdkId of LIBRARY_REFERENCE_SDK_IDS) {
            const parsed = parseVersionedReferenceSlug(`${sdkId}-1.2.3`)
            assert.deepEqual(parsed, { sdk: sdkId, version: '1.2.3' })
            assert.equal(getSdkReferenceUrl(parsed!.sdk), `/docs/libraries/${sdkId.replace(/^posthog-/, '')}`)
        }
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

describe('sdkReferenceSlug, getSdkReferenceUrl, and getLegacyHogRefSdkIds', () => {
    test('LIBRARY_REFERENCE_SDK_IDS shares PUBLISHED_SDK_REFERENCES directly', () => {
        assert.equal(LIBRARY_REFERENCE_SDK_IDS, PUBLISHED_SDK_REFERENCES)
    })

    test('maps reference.md to /docs/libraries/<sdk> while keeping version and migration slugs', () => {
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
        assert.equal(getSdkReferenceUrl('posthog-android'), '/docs/libraries/android')
    })

    test('routes remaining HogRef SDKs to /docs/references/<id>', () => {
        assert.equal(getSdkReferenceUrl('posthog-js'), '/docs/references/posthog-js')
        assert.equal(getSdkReferenceUrl('posthog-ios'), '/docs/references/posthog-ios')
        assert.equal(getSdkReferenceUrl('posthog-react-native'), '/docs/references/posthog-react-native')
    })

    test('skips migrated SDKs when computing legacy HogRef SDK IDs', () => {
        const legacyIds = getLegacyHogRefSdkIds(SUPPORTED_SDK_IDS)
        for (const migratedId of PUBLISHED_SDK_REFERENCES) {
            assert.equal(legacyIds.includes(migratedId), false, `${migratedId} must not be sourced from HogRef`)
        }
        assert.ok(legacyIds.includes('posthog-js'))
        assert.ok(legacyIds.includes('posthog-ios'))
    })
})

describe('vercel.json SDK reference redirects', () => {
    test('every relative redirect destination compiles with path-to-regexp@6.3.0 (no adjacent params)', () => {
        for (const redirect of vercelConfig.redirects) {
            if (/^https?:\/\//.test(redirect.destination)) continue
            const destPath = redirect.destination.split('?')[0].split('#')[0]
            assert.doesNotThrow(
                () => compile(destPath, { validate: false }),
                `Destination failed path-to-regexp compile: ${redirect.source} -> ${redirect.destination}`
            )
        }
    })

    test('keeps Vercel route count within the 2,048 limit', () => {
        const totalRoutes = vercelConfig.headers.length + vercelConfig.redirects.length + vercelConfig.rewrites.length
        assert.ok(totalRoutes <= 2048, `Route count ${totalRoutes} exceeds Vercel limit of 2,048`)
    })

    test('redirects /reference, legacy HogRef, prerelease subpaths, bare majors, and /docs/integrate in one hop for every published SDK', () => {
        const integrateCatchAllIndex = vercelConfig.redirects.findIndex(
            (r) => r.source === '/docs/integrate/(client|server)/:path*'
        )
        assert.ok(integrateCatchAllIndex >= 0, 'Expected legacy /docs/integrate/(client|server)/:path* catch-all')

        for (const sdkId of PUBLISHED_SDK_REFERENCES) {
            const slug = sdkId.replace(/^posthog-/, '')

            // Canonical URLs and .md copies must serve directly without redirecting
            assert.equal(resolveFirstRedirect(`/docs/libraries/${slug}`), null)
            assert.equal(resolveFirstRedirect(`/docs/libraries/${slug}.md`), null)
            assert.equal(resolveFirstRedirect(`/docs/libraries/${slug}/1.x.x`), null)

            // Direct integrate rule must precede the catch-all
            const directIntegrateIndex = vercelConfig.redirects.findIndex(
                (r) => r.source === `/docs/integrate/:side(client|server)/${slug}:ext(\\.md)?`
            )
            assert.ok(
                directIntegrateIndex >= 0 && directIntegrateIndex < integrateCatchAllIndex,
                `Expected direct integrate redirect for ${slug} before legacy catch-all`
            )

            const cases: Array<[string, string]> = [
                [`/docs/libraries/${slug}/reference`, `/docs/libraries/${slug}`],
                [`/docs/libraries/${slug}/reference.md`, `/docs/libraries/${slug}.md`],
                [`/docs/libraries/${slug}/1`, `/docs/libraries/${slug}/1.x.x`],
                [`/docs/libraries/${slug}/1.md`, `/docs/libraries/${slug}/1.x.x.md`],
                [`/docs/references/${sdkId}`, `/docs/libraries/${slug}`],
                [`/docs/references/${sdkId}.md`, `/docs/libraries/${slug}.md`],
                [`/docs/references/${sdkId}/types/Config`, `/docs/libraries/${slug}`],
                [`/docs/references/${sdkId}-1.0.0`, `/docs/libraries/${slug}`],
                [`/docs/references/${sdkId}-1.0.0-beta.1/types/Config`, `/docs/libraries/${slug}`],
                [`/docs/integrate/server/${slug}`, `/docs/libraries/${slug}`],
                [`/docs/integrate/client/${slug}.md`, `/docs/libraries/${slug}.md`],
            ]

            for (const [source, expectedDest] of cases) {
                const hit = resolveFirstRedirect(source)
                assert.ok(hit, `Expected redirect for ${source}`)
                assert.equal(hit.destination, expectedDest, `Wrong destination for ${source}`)
                assert.equal(hit.statusCode, 301, `Expected 301 for ${source}`)
                assert.equal(resolveFirstRedirect(hit.destination), null, `Multi-hop redirect for ${source}`)
            }
        }
    })
})

import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import { pocketGuideUrl, volumeById } from '../../constants/pocketGuides.ts'

const vercelConfig = JSON.parse(readFileSync(new URL('../../../vercel.json', import.meta.url), 'utf8'))

test('Product Analytics opens its story inside Learn and counts both orientation pages', () => {
    const volume = volumeById('product-analytics')

    assert.equal(volume?.volume, 5)
    assert.equal(volume?.countOrientationPages, true)
    assert.ok(volume)
    assert.equal(pocketGuideUrl(volume), '/docs/product-analytics/learn/introduction')
})

test('legacy Product Analytics reader routes redirect into Learn', () => {
    const redirects = vercelConfig.redirects as Array<{ source: string; destination: string }>
    const currentRoot = redirects.find(({ source }) => source === '/pocket-guides/product-analytics')
    const chapterSplat = redirects.find(({ source }) => source === '/pocket-guides/product-analytics/:path*')

    assert.equal(currentRoot?.destination, '/docs/product-analytics/learn/introduction')
    assert.equal(chapterSplat?.destination, '/docs/product-analytics/learn/:path*')
    assert.equal(
        redirects.some(({ source }) => source.startsWith('/pocket-guides/posthog')),
        false,
        'The retired PostHog volume must remain a 404'
    )
})

test('other volumes keep their configured entry routes', () => {
    for (const [id, expected] of [
        ['ai-observability', '/docs/ai-observability/learn'],
        ['session-replay', '/docs/session-replay/learn'],
        ['self-driving', '/pocket-guides/self-driving'],
    ]) {
        const volume = volumeById(id)
        assert.ok(volume)
        assert.equal(pocketGuideUrl(volume), expected)
    }
})

test('every client-only Learn chapter route is rewritten to its Gatsby page', () => {
    const rewrites = vercelConfig.rewrites as Array<{ source: string; destination: string }>
    const products = ['product-analytics', 'ai-observability', 'session-replay']

    for (const product of products) {
        assert.ok(
            rewrites.some(
                ({ source, destination }) =>
                    source === `/docs/${product}/learn/:path*` &&
                    destination === `/docs/${product}/learn/[...chapter]/index.html`
            ),
            `Missing Learn chapter rewrite for ${product}`
        )
    }
})

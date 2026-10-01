import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import { volumeById } from '../../constants/pocketGuides.ts'

const vercelConfig = JSON.parse(readFileSync(new URL('../../../vercel.json', import.meta.url), 'utf8'))

test('Product Analytics is the next volume and is configured to count both orientation pages', () => {
    const volume = volumeById('product-analytics')

    assert.equal(volume?.volume, 5)
    assert.equal(volume?.countOrientationPages, true)
    assert.equal(volume?.learnPath, '/docs/product-analytics/learn/introduction')
})

test('Product Analytics Pocket Guide roots redirect to the Introduction before the chapter splat', () => {
    const redirects = vercelConfig.redirects as Array<{ source: string; destination: string }>
    const currentRoot = redirects.findIndex(({ source }) => source === '/pocket-guides/product-analytics')
    const chapterSplat = redirects.findIndex(({ source }) => source === '/pocket-guides/product-analytics/:path*')

    assert.notEqual(currentRoot, -1)
    assert.notEqual(chapterSplat, -1)
    assert.ok(currentRoot < chapterSplat)
    assert.equal(redirects[currentRoot].destination, '/docs/product-analytics/learn/introduction')
    assert.equal(
        redirects.some(({ source }) => source.startsWith('/pocket-guides/posthog')),
        false,
        'The retired PostHog volume must remain a 404'
    )
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

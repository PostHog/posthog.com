import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import test from 'node:test'

import {
    POCKET_GUIDE_VOLUMES,
    pocketGuideDestination,
    pocketGuidePageContext,
    pocketGuideSourceVolume,
    pocketGuideUrl,
    volumeById,
} from '../../constants/pocketGuides.ts'
import { docsMenu } from '../../navs/index.js'

const vercelConfig = JSON.parse(readFileSync(new URL('../../../vercel.json', import.meta.url), 'utf8'))

test('Product Analytics opens its story inside Learn and counts both orientation pages', () => {
    const volume = volumeById('product-analytics')

    assert.equal(volume?.volume, 5)
    assert.equal(volume?.countOrientationPages, true)
    assert.ok(volume)
    assert.equal(pocketGuideUrl(volume), '/learn/product-analytics/pocket-guide')
})

test('legacy Product Analytics reader routes redirect into Learn', () => {
    const redirects = vercelConfig.redirects as Array<{ source: string; destination: string }>
    const currentRoot = redirects.find(({ source }) => source === '/pocket-guides/product-analytics')
    const chapterSplat = redirects.find(({ source }) => source === '/pocket-guides/product-analytics/:path*')

    assert.equal(currentRoot?.destination, '/learn/product-analytics/pocket-guide')
    assert.equal(chapterSplat?.destination, '/learn/product-analytics/pocket-guide/:path*')
    assert.equal(
        redirects.some(({ source }) => source.startsWith('/pocket-guides/posthog')),
        false,
        'The retired PostHog volume must remain a 404'
    )
})

test('other volumes keep their configured entry routes', () => {
    for (const [id, expected] of [
        ['ai-observability', '/learn/ai-observability'],
        ['session-replay', '/learn/session-replay'],
        ['self-driving', '/docs/self-driving/pocket-guide'],
        ['data-stack', '/docs/data-warehouse/pocket-guide'],
        ['feature-flags', '/learn/feature-flags'],
    ]) {
        const volume = volumeById(id)
        assert.ok(volume)
        assert.equal(pocketGuideUrl(volume), expected)
    }
})

test('all published chapters have unique static public routes and source identities', () => {
    const publicPaths = new Set<string>()
    const walk = (directory: URL, sourcePrefix: string) => {
        for (const entry of readdirSync(directory, { withFileTypes: true })) {
            if (entry.isDirectory()) {
                walk(new URL(`${entry.name}/`, directory), `${sourcePrefix}/${entry.name}`)
                continue
            }
            if (!/\.mdx?$/.test(entry.name)) continue
            const raw = readFileSync(new URL(entry.name, directory), 'utf8')
            const order = raw.match(/^pocketGuideOrder:\s*(\d+)/m)
            const sourceSlug =
                entry.name === 'index.mdx' ? sourcePrefix : `${sourcePrefix}/${entry.name.replace(/\.mdx?$/, '')}`
            const route = pocketGuidePageContext(sourceSlug, order ? Number(order[1]) : undefined)
            if (!order || entry.name === 'SKILL.md' || /\/_/.test(sourceSlug)) {
                assert.equal(route, undefined, `${sourceSlug} must not create a page`)
                continue
            }
            assert.ok(route, `${sourceSlug} needs a public route`)
            assert.equal(route.publicPath, pocketGuideDestination(sourceSlug))
            assert.equal(route.volumeId, pocketGuideSourceVolume(sourceSlug)?.id)
            assert.equal(publicPaths.has(route.publicPath), false, `Duplicate route: ${route.publicPath}`)
            publicPaths.add(route.publicPath)
            assert.equal(
                Number(order[1]) === 0 ? route.chapter === '' : route.publicPath.endsWith(`/${route.chapter}`),
                true
            )
        }
    }
    for (const volume of POCKET_GUIDE_VOLUMES) {
        walk(
            new URL(`../../../contents/learn/${volume.id}/pocket-guide/`, import.meta.url),
            `/learn/${volume.id}/pocket-guide`
        )
        assert.ok(publicPaths.has(pocketGuideUrl(volume)))
        assert.equal(
            vercelConfig.rewrites.some(
                ({ source }: { source: string }) => source === `${pocketGuideUrl(volume)}/:path*`
            ),
            false
        )
    }
})

test('nothing under the new Learn routes is redirected or rewritten', () => {
    for (const { source } of [...vercelConfig.redirects, ...vercelConfig.rewrites] as Array<{ source: string }>) {
        assert.equal(/^\/learn(?:\/|$)/.test(source), false, `${source} must not redirect or rewrite a Learn route`)
    }
})

test('the Product Analytics pocket guide root is generated without a redirect', () => {
    assert.equal(
        pocketGuidePageContext('/learn/product-analytics/pocket-guide', 0)?.publicPath,
        '/learn/product-analytics/pocket-guide'
    )
    assert.equal(
        vercelConfig.redirects.some(
            ({ source }: { source: string }) => source === '/learn/product-analytics/pocket-guide'
        ),
        false
    )
})

test('former docs Learn roots and descendants redirect permanently to the new namespace', () => {
    for (const product of ['product-analytics', 'ai-observability', 'session-replay', 'feature-flags']) {
        assert.equal(existsSync(new URL(`../../pages/docs/${product}/learn.tsx`, import.meta.url)), false)
        const chapters = product === 'product-analytics' ? '/learn/product-analytics/pocket-guide' : `/learn/${product}`
        for (const [suffix, destination] of [
            ['', `/learn/${product}`],
            ['/:path*', `${chapters}/:path*`],
        ]) {
            const redirect = vercelConfig.redirects.find(
                ({ source }: { source: string }) => source === `/docs/${product}/learn${suffix}`
            )
            assert.equal(redirect?.destination, destination)
            assert.equal(redirect?.statusCode, 301)
        }
    }
    assert.equal(
        vercelConfig.redirects.some(({ destination }: { destination: string }) =>
            /^\/docs\/[^/]+\/learn(?:\/|$)/.test(destination)
        ),
        false,
        'Legacy links should reach Learn without an intermediate docs redirect'
    )
})

test('the old Product Analytics introduction URL takes precedence over the chapter wildcard', () => {
    const wildcardIndex = vercelConfig.redirects.findIndex(
        ({ source }: { source: string }) => source === '/docs/product-analytics/learn/:path*'
    )
    const index = vercelConfig.redirects.findIndex(
        ({ source }: { source: string }) => source === '/docs/product-analytics/learn/introduction'
    )
    assert.ok(index >= 0 && index < wildcardIndex)
    assert.equal(vercelConfig.redirects[index].destination, '/learn/product-analytics/pocket-guide')
})

test('docs-only books retain their docs sidebar and list every published chapter', () => {
    for (const [id, product] of [
        ['self-driving', 'self-driving'],
        ['data-stack', 'data-warehouse'],
    ]) {
        const volume = volumeById(id)
        assert.ok(volume)
        const basePath = pocketGuideUrl(volume)
        const section = docsMenu.children.find(({ url }) => url === `/docs/${product}`)
        const guide = section?.children?.find(({ url }) => url === basePath)
        assert.ok(guide, `${id} must remain in its existing docs sidebar`)
        assert.equal(pocketGuidePageContext(`/learn/${id}/pocket-guide`, 0)?.publicPath, basePath)
        const contentRoot = new URL(`../../../contents/learn/${id}/pocket-guide/`, import.meta.url)
        for (const dir of readdirSync(contentRoot, { withFileTypes: true })) {
            if (!dir.isDirectory() || dir.name.startsWith('_')) continue
            const file = new URL(`${dir.name}/index.mdx`, contentRoot)
            if (!existsSync(file) || !/^pocketGuideOrder:\s*\d+/m.test(readFileSync(file, 'utf8'))) continue
            assert.ok(
                guide.children?.some(({ url }: { url?: string }) => url === `${basePath}/${dir.name}`),
                `${id}/${dir.name} is missing from the docs sidebar`
            )
        }
        for (const suffix of ['', '/:path*']) {
            const redirect = vercelConfig.redirects.find(
                ({ source }: { source: string }) => source === `/pocket-guides/${id}${suffix}`
            )
            assert.equal(redirect?.destination, `${basePath}${suffix}`)
            assert.equal(redirect?.statusCode, 301)
        }
    }
})

test('legacy guide navigation preserves chapters, queries, and fragments', () => {
    assert.equal(
        pocketGuideDestination('/pocket-guides/self-driving/flag-debt?from=guide#setup'),
        '/docs/self-driving/pocket-guide/flag-debt?from=guide#setup'
    )
    assert.equal(pocketGuideDestination('/pocket-guides/data-stack'), '/docs/data-warehouse/pocket-guide')
    assert.equal(pocketGuideDestination('/pocket-guides'), '/pocket-guides')
    assert.equal(
        pocketGuideDestination('/learn/data-stack/pocket-guide/revenue-metrics/SKILL'),
        '/docs/data-warehouse/pocket-guide/revenue-metrics/SKILL'
    )
    assert.equal(
        pocketGuideDestination('/learn/ai-observability/pocket-guide/quality-output'),
        '/learn/ai-observability/quality-output'
    )
    assert.equal(pocketGuidePageContext('/learn/self-driving/pocket-guide/_starter', 2), undefined)
    assert.equal(pocketGuidePageContext('/learn/self-driving/pocket-guide/flag-debt/SKILL', 3), undefined)
})

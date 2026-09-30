import assert from 'node:assert/strict'
import { readdirSync } from 'node:fs'
import { test } from 'node:test'

import middleware, { EXPERIMENT_FLAG, TRANSLATED_LOCALES } from './middleware.ts'
import { BOOTSTRAP_DISTINCT_ID_COOKIE, SKIP_TRANSLATION_COOKIE } from './src/i18n/cookie.ts'

process.env.GATSBY_POSTHOG_API_KEY = 'phc_test'

/** The posthog-js cookie of a returning visitor. visitor-8 is in the test variant, visitor-1 in control. */
const visitor = (distinctId: string) =>
    `ph_phc_test_posthog=${encodeURIComponent(JSON.stringify({ distinct_id: distinctId }))}`
const testVisitor = visitor('visitor-8')
const controlVisitor = visitor('visitor-1')

const page = 'https://posthog.com/docs/product-analytics'

test('serves Markdown on consecutive requests from each supported agent', async (t) => {
    t.mock.method(globalThis, 'fetch', async () => new Response('# Product analytics'))

    for (const agent of ['ChatGPT-User', 'Claude-User', 'Perplexity-User', 'chatgpt-user']) {
        for (let i = 0; i < 3; i++) {
            const response = await middleware(
                new Request(page, { headers: { 'user-agent': `Mozilla/5.0 ${agent}/1.0` } })
            )
            assert.equal(response?.status, 200, `${agent}, request ${i + 1}`)
            assert.equal(response.headers.get('content-type'), 'text/markdown; charset=utf-8')
            assert.equal(response.headers.get('vary'), 'Accept, User-Agent')
            assert.equal(await response.text(), '# Product analytics')
        }
    }
})

test('leaves browsers, crawlers, and unrelated user agents alone', async (t) => {
    const fetch = t.mock.method(globalThis, 'fetch', async () => new Response())

    for (const agent of ['', 'Mozilla/5.0', 'Googlebot', 'ClaudeBot', 'GPTBot', 'NotChatGPT-User']) {
        assert.equal(await middleware(new Request(page, { headers: { 'user-agent': agent } })), undefined)
    }
    assert.equal(fetch.mock.callCount(), 0)
})

test('honors explicit Markdown requests and fetches the sibling without a trailing slash', async (t) => {
    const fetch = t.mock.method(
        globalThis,
        'fetch',
        async () => new Response('# Product analytics', { headers: { 'cache-control': 'public, max-age=60' } })
    )

    const response = await middleware(new Request(`${page}/`, { headers: { accept: 'text/markdown' } }))
    assert.equal(await response?.text(), '# Product analytics')
    assert.equal(response.headers.get('cache-control'), 'public, max-age=60')
    assert.equal(fetch.mock.callCount(), 1)
    assert.equal(String(fetch.mock.calls[0].arguments[0]), `${page}.md`)
})

test('does not fetch another sibling for a Markdown URL', async (t) => {
    const fetch = t.mock.method(globalThis, 'fetch', async () => new Response())

    assert.equal(await middleware(new Request(`${page}.md`, { headers: { 'user-agent': 'ChatGPT-User' } })), undefined)
    assert.equal(fetch.mock.callCount(), 0)
})

test('falls through when no Markdown sibling exists', async (t) => {
    t.mock.method(globalThis, 'fetch', async () => new Response('Not found', { status: 404 }))

    assert.equal(await middleware(new Request(page, { headers: { 'user-agent': 'ChatGPT-User' } })), undefined)
})

const home = 'https://posthog.com/'

test('redirects the home page to the translation the visitor ranks highest', async () => {
    for (const acceptLanguage of ['pt', 'pt-BR,pt;q=0.9,en-US;q=0.8', 'pt-PT', 'nl;q=0.9, pt-BR;q=0.8, en;q=0.1']) {
        const response = await middleware(
            new Request(home, { headers: { 'accept-language': acceptLanguage, cookie: testVisitor } })
        )
        assert.equal(response?.status, 307, acceptLanguage)
        assert.equal(response.headers.get('location'), '/pt')
        assert.equal(response.headers.get('vary'), 'Accept-Language, Cookie')
        assert.equal(response.headers.get('set-cookie'), null)
    }
})

test('keeps the query string on the redirect', async () => {
    const response = await middleware(
        new Request(`${home}?utm_source=newsletter`, { headers: { 'accept-language': 'pt-BR', cookie: testVisitor } })
    )
    assert.equal(response?.headers.get('location'), '/pt?utm_source=newsletter')
})

test('serves English to a returning visitor in the control variant', async () => {
    const response = await middleware(
        new Request(home, { headers: { 'accept-language': 'pt-BR', cookie: controlVisitor } })
    )
    assert.equal(response, undefined)
})

test('gives a first-time visitor a distinct ID for posthog-js in either variant', async () => {
    const variants = new Set()
    for (let i = 0; i < 20; i++) {
        const response = await middleware(new Request(home, { headers: { 'accept-language': 'pt-BR' } }))
        const cookie = response?.headers.get('set-cookie') || ''
        assert.match(cookie, new RegExp(`^${BOOTSTRAP_DISTINCT_ID_COOKIE}=[0-9a-f-]{36}; path=/; max-age=300`))
        if (response?.status === 307) variants.add('test')
        else if (response?.headers.get('x-middleware-next') === '1') variants.add('control')
    }
    assert.deepEqual([...variants].sort(), ['control', 'test'])
})

test('captures the exposure with the variant the visitor got', async (t) => {
    process.env.GATSBY_POSTHOG_API_HOST = 'https://ingest.example.com'
    t.after(() => delete process.env.GATSBY_POSTHOG_API_HOST)
    const fetch = t.mock.method(globalThis, 'fetch', async () => new Response())
    const pending: Promise<unknown>[] = []

    for (const [cookie, variant] of [
        [testVisitor, 'test'],
        [controlVisitor, 'control'],
    ]) {
        await middleware(new Request(home, { headers: { 'accept-language': 'pt-BR', cookie } }), {
            waitUntil: (promise) => pending.push(promise),
        })
        const [url, init] = fetch.mock.calls.at(-1)!.arguments as [string, RequestInit]
        assert.equal(url, 'https://ingest.example.com/i/v0/e/')
        const body = JSON.parse(init.body as string)
        assert.equal(body.event, '$experiment_exposure')
        assert.equal(body.distinct_id, cookie === testVisitor ? 'visitor-8' : 'visitor-1')
        assert.equal(body.properties.$feature_flag, EXPERIMENT_FLAG)
        assert.equal(body.properties.$feature_flag_response, variant)
        assert.equal(body.properties.translated_locale, 'pt')
    }
    assert.equal(pending.length, 2)

    await middleware(
        new Request('https://posthog-git-i18n-home-post-hog.vercel.app/', {
            headers: { 'accept-language': 'pt-BR', cookie: testVisitor },
        }),
        { waitUntil: (promise) => pending.push(promise) }
    )
    assert.equal(fetch.mock.callCount(), 2, 'a preview deployment captures nothing')
})

test('serves English when English ranks higher, nothing matches, or the header is missing', async () => {
    for (const acceptLanguage of ['', 'en-US,en;q=0.9,pt-BR;q=0.8', 'nl-NL,sv;q=0.9', 'pt;q=0', '*']) {
        const headers = acceptLanguage ? { 'accept-language': acceptLanguage } : undefined
        assert.equal(await middleware(new Request(home, { headers })), undefined, acceptLanguage)
    }
})

test('serves English while the skip-translation cookie is set', async () => {
    for (const cookie of [`${SKIP_TRANSLATION_COOKIE}=1`, `theme=dark; ${SKIP_TRANSLATION_COOKIE}=1`]) {
        const response = await middleware(
            new Request(home, { headers: { 'accept-language': 'pt-BR', cookie: `${cookie}; ${testVisitor}` } })
        )
        assert.equal(response, undefined, cookie)
    }
})

test('does not redirect other pages', async (t) => {
    t.mock.method(globalThis, 'fetch', async () => new Response('Not found', { status: 404 }))

    assert.equal(await middleware(new Request(page, { headers: { 'accept-language': 'pt-BR' } })), undefined)
})

test('sends locale-shaped paths to the translated page for their language', async () => {
    for (const path of ['/pt-BR', '/pt-br', '/pt_BR', '/PT', '/Pt', '/pt-PT', '/PT-BR']) {
        const response = await middleware(new Request(`https://posthog.com${path}?ref=x`))
        assert.equal(response?.status, 301, path)
        assert.equal(response.headers.get('location'), '/pt?ref=x', path)
    }
})

test('leaves the translated page and other short paths alone', async () => {
    for (const path of ['/pt', '/ai', '/nl-NL', '/EU', '/pt-BRAZIL']) {
        assert.equal(await middleware(new Request(`https://posthog.com${path}`)), undefined, path)
    }
})

test('lists the same translations as src/i18n/locales', () => {
    const files = readdirSync(new URL('./src/i18n/locales', import.meta.url))
        .filter((file) => file.endsWith('.yml') && file !== 'en.yml')
        .map((file) => file.replace(/\.yml$/, ''))
    assert.deepEqual([...TRANSLATED_LOCALES].sort(), files.sort())
})

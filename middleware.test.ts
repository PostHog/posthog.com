import assert from 'node:assert/strict'
import { readdirSync } from 'node:fs'
import { test } from 'node:test'

import middleware, { TRANSLATED_LOCALES } from './middleware.ts'
import { SKIP_TRANSLATION_COOKIE } from './src/i18n/cookie.ts'

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
    for (const acceptLanguage of ['pt', 'pt-BR,pt;q=0.9,en-US;q=0.8', 'pt-PT', 'fr;q=0.9, pt-BR;q=0.8, en;q=0.1']) {
        const response = await middleware(new Request(home, { headers: { 'accept-language': acceptLanguage } }))
        assert.equal(response?.status, 307, acceptLanguage)
        assert.equal(response.headers.get('location'), '/pt')
        assert.equal(response.headers.get('vary'), 'Accept-Language, Cookie')
    }
})

test('keeps the query string on the redirect', async () => {
    const response = await middleware(
        new Request(`${home}?utm_source=newsletter`, { headers: { 'accept-language': 'pt-BR' } })
    )
    assert.equal(response?.headers.get('location'), '/pt?utm_source=newsletter')
})

test('serves English when English ranks higher, nothing matches, or the header is missing', async () => {
    for (const acceptLanguage of ['', 'en-US,en;q=0.9,pt-BR;q=0.8', 'fr-FR,de;q=0.9', 'pt;q=0', '*']) {
        const headers = acceptLanguage ? { 'accept-language': acceptLanguage } : undefined
        assert.equal(await middleware(new Request(home, { headers })), undefined, acceptLanguage)
    }
})

test('serves English while the skip-translation cookie is set', async () => {
    for (const cookie of [`${SKIP_TRANSLATION_COOKIE}=1`, `theme=dark; ${SKIP_TRANSLATION_COOKIE}=1`]) {
        const response = await middleware(new Request(home, { headers: { 'accept-language': 'pt-BR', cookie } }))
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
    for (const path of ['/pt', '/ai', '/fr-FR', '/EU', '/pt-BRAZIL']) {
        assert.equal(await middleware(new Request(`https://posthog.com${path}`)), undefined, path)
    }
})

test('lists the same translations as src/i18n/locales', () => {
    const files = readdirSync(new URL('./src/i18n/locales', import.meta.url))
        .filter((file) => file.endsWith('.yml') && file !== 'en.yml')
        .map((file) => file.replace(/\.yml$/, ''))
    assert.deepEqual([...TRANSLATED_LOCALES].sort(), files.sort())
})

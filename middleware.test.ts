import assert from 'node:assert/strict'
import { test } from 'node:test'

import middleware from './middleware.ts'

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

test('gives agents the HTML when their Accept names text/html, as the Codex fetcher sends', async (t) => {
    const fetch = t.mock.method(globalThis, 'fetch', async () => new Response('# Product analytics'))
    const codexAccept = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'

    for (const agent of ['ChatGPT-User', 'Claude-User', 'Perplexity-User']) {
        const request = new Request(page, {
            headers: { 'user-agent': `Mozilla/5.0 ${agent}/1.0`, accept: codexAccept },
        })
        assert.equal(await middleware(request), undefined, agent)
    }
    assert.equal(fetch.mock.callCount(), 0)

    const response = await middleware(
        new Request(page, { headers: { 'user-agent': 'ChatGPT-User/1.0', accept: 'text/markdown, text/html, */*' } })
    )
    assert.equal(response?.headers.get('content-type'), 'text/markdown; charset=utf-8')
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

test('does not fetch another sibling for a Markdown URL, with or without a trailing slash', async (t) => {
    const fetch = t.mock.method(globalThis, 'fetch', async () => new Response())

    for (const url of [`${page}.md`, `${page}.md/`]) {
        const request = new Request(url, { headers: { 'user-agent': 'ChatGPT-User', accept: 'text/markdown' } })
        assert.equal(await middleware(request), undefined, url)
    }
    assert.equal(fetch.mock.callCount(), 0)
})

// Runs the middleware with PostHog configured and returns the events it sent.
async function captured(
    t,
    request: Request,
    { sibling = () => new Response('# Product analytics'), posthog = async () => new Response('ok') } = {}
) {
    process.env.GATSBY_POSTHOG_API_KEY = 'phc_test'
    process.env.GATSBY_POSTHOG_API_HOST = 'https://ph.example'
    t.after(() => {
        delete process.env.GATSBY_POSTHOG_API_KEY
        delete process.env.GATSBY_POSTHOG_API_HOST
    })
    const fetch = t.mock.method(globalThis, 'fetch', async (url: URL | string) =>
        String(url).startsWith('https://ph.example') ? posthog() : sibling()
    )
    const pending: Promise<unknown>[] = []
    const response = await middleware(request, { waitUntil: (promise) => pending.push(promise) })
    const settled = Promise.all(pending)
    await settled
    const events = fetch.mock.calls
        .filter((call) => String(call.arguments[0]) === 'https://ph.example/i/v0/e/')
        .map((call) => JSON.parse(call.arguments[1].body))
    return { response, events, settled }
}

test('falls through when no Markdown sibling exists, and records the HTML', async (t) => {
    const { response, events } = await captured(t, new Request(page, { headers: { 'user-agent': 'ChatGPT-User' } }), {
        sibling: () => new Response('Not found', { status: 404 }),
    })

    assert.equal(response, undefined)
    assert.deepEqual(
        events.map((event) => event.properties.served_format),
        ['html']
    )
})

test('records one event when an agent gets Markdown, with the network instead of the IP', async (t) => {
    const request = new Request(page, {
        headers: { 'user-agent': 'Claude-User (claude-code/2.1.0)', 'x-forwarded-for': '203.0.113.7' },
    })
    const { response, events } = await captured(t, request)

    assert.equal(await response?.text(), '# Product analytics')
    assert.equal(events.length, 1)
    assert.equal(events[0].event, 'non-browser page request')
    assert.equal(events[0].properties.served_format, 'markdown')
    assert.equal(events[0].properties.markdown_via, 'user_agent')
    assert.equal(events[0].properties.$pathname, '/docs/product-analytics')
    assert.equal(events[0].properties.$ip, '203.0.113.0')
    assert.ok(!JSON.stringify(events[0]).includes('203.0.113.7'))
})

test('records non-browser requests on pages and files outside the Markdown paths', async (t) => {
    for (const [path, format] of [
        ['/', 'html'],
        ['/pricing', 'html'],
        ['/docs/product-analytics.md', 'markdown'],
        ['/llms.txt', 'text'],
    ]) {
        const { response, events } = await captured(
            t,
            new Request(`https://posthog.com${path}`, { headers: { 'user-agent': 'ChatGPT-User/1.0' } })
        )
        assert.equal(response, undefined, path)
        assert.deepEqual(
            events.map((event) => event.properties.served_format),
            [format],
            path
        )
    }
})

test('records Node scripts but not browsers or its own Markdown sibling fetch', async (t) => {
    for (const [headers, count] of [
        [{ 'user-agent': 'Mozilla/5.0 Chrome/141', 'sec-fetch-mode': 'navigate', 'sec-fetch-site': 'none' }, 0],
        [{ 'user-agent': 'node', 'x-posthog-markdown-sibling': '1' }, 0],
        // Node's built-in fetch sends Sec-Fetch-Mode but not Sec-Fetch-Site.
        [{ 'user-agent': 'node', 'sec-fetch-mode': 'cors' }, 1],
    ] as const) {
        const { events } = await captured(t, new Request(`${page}.md`, { headers }))
        assert.equal(events.length, count, JSON.stringify(headers))
    }
})

test('serves the page when sending the event fails', async (t) => {
    const { response, settled } = await captured(
        t,
        new Request(page, { headers: { 'user-agent': 'ChatGPT-User/1.0' } }),
        {
            posthog: async () => {
                throw new Error('network down')
            },
        }
    )

    assert.equal(await response?.text(), '# Product analytics')
    await assert.doesNotReject(settled)
})

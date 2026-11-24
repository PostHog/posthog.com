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

test('does not fetch another sibling for a Markdown URL', async (t) => {
    const fetch = t.mock.method(globalThis, 'fetch', async () => new Response())

    assert.equal(await middleware(new Request(`${page}.md`, { headers: { 'user-agent': 'ChatGPT-User' } })), undefined)
    assert.equal(fetch.mock.callCount(), 0)
})

test('falls through when no Markdown sibling exists', async (t) => {
    t.mock.method(globalThis, 'fetch', async () => new Response('Not found', { status: 404 }))

    assert.equal(await middleware(new Request(page, { headers: { 'user-agent': 'ChatGPT-User' } })), undefined)
})

test('serves the MCP page brief to agents that fetch /mcp for a user', async (t) => {
    const fetch = t.mock.method(globalThis, 'fetch', async () => new Response('# PostHog MCP server'))

    const response = await middleware(
        new Request('https://posthog.com/mcp', { headers: { 'user-agent': 'Claude-User/1.0' } })
    )
    assert.equal(await response?.text(), '# PostHog MCP server')
    assert.equal(String(fetch.mock.calls[0].arguments[0]), 'https://posthog.com/mcp.md')
})

const CAPTURE_URL = 'https://us.i.posthog.com/i/v0/e/'

function enableCapture(t: { after(fn: () => void): void }, env: Record<string, string> = {}) {
    const vars = { MIDDLEWARE_CAPTURE_ENABLED: 'true', ...env }
    for (const [key, value] of Object.entries(vars)) process.env[key] = value
    t.after(() => {
        for (const key of Object.keys(vars)) delete process.env[key]
    })
}

function mockFetches(t: any, { markdownStatus = 200, captureStatuses = [200] } = {}) {
    const captures: any[] = []
    t.mock.method(globalThis, 'fetch', async (input: unknown, init?: RequestInit) => {
        if (String(input) === CAPTURE_URL) {
            captures.push(JSON.parse(String(init?.body)))
            return new Response('{}', { status: captureStatuses[captures.length - 1] ?? 200 })
        }
        return new Response('# Product analytics', { status: markdownStatus })
    })
    return captures
}

async function handle(url: string, headers: Record<string, string>) {
    const pending: Promise<unknown>[] = []
    const response = await middleware(new Request(url, { headers }), { waitUntil: (p) => pending.push(p) })
    await Promise.all(pending)
    return response
}

test('records the request headers and the Markdown served, keyed on the Vercel request id', async (t) => {
    enableCapture(t)
    const captures = mockFetches(t)

    const response = await handle(page, {
        'user-agent': 'Claude-User (claude-code/2.1.0; +https://support.anthropic.com/)',
        accept: '*/*',
        'sec-fetch-site': 'none',
        'signature-agent': '"https://agent.example.com"',
        'x-vercel-id': 'fra1::iad1::test1-1700000000000-000000000001',
    })

    assert.equal(await response?.text(), '# Product analytics')
    assert.equal(captures.length, 1)
    const [event] = captures
    assert.equal(event.event, 'docs_request')
    assert.equal(event.uuid, 'f250a31f-f9e1-5dae-8ed3-305625543a58')
    assert.equal(event.properties.$process_person_profile, false)
    assert.deepEqual(
        {
            path: event.properties.$pathname,
            served: event.properties.served_format,
            negotiation: event.properties.negotiation,
            reason: event.properties.markdown_reason,
            accept: event.properties.accept,
            site: event.properties.sec_fetch_site,
            signatureAgent: event.properties.signature_agent,
            agent: event.properties.agent_name,
            category: event.properties.agent_category,
            requestId: event.properties.vercel_request_id,
        },
        {
            path: '/docs/product-analytics',
            served: 'markdown',
            negotiation: 'served',
            reason: 'agent_fetcher',
            accept: '*/*',
            site: 'none',
            signatureAgent: '"https://agent.example.com"',
            agent: 'Claude User',
            category: 'ai_assistant',
            requestId: 'test1-1700000000000-000000000001',
        }
    )
})

test('records HTML for browsers and for pages without a Markdown sibling', async (t) => {
    enableCapture(t)
    const captures = mockFetches(t, { markdownStatus: 404 })

    await handle(page, { 'user-agent': 'Mozilla/5.0', accept: 'text/html' })
    await handle(page, { 'user-agent': 'ChatGPT-User/1.0' })
    await handle(`${page}.md`, { 'user-agent': 'curl/8.0' })

    assert.deepEqual(
        captures.map((e) => [e.properties.served_format, e.properties.negotiation, e.properties.agent_category]),
        [
            ['html', 'not_requested', 'regular'],
            ['html', 'no_sibling', 'ai_assistant'],
            ['markdown', 'markdown_url', 'http_client'],
        ]
    )
})

test('resends the same event after a server error so a retry cannot count twice', async (t) => {
    enableCapture(t)
    const captures = mockFetches(t, { captureStatuses: [503, 200] })

    await handle(page, { 'x-vercel-id': 'iad1::test2-1700000000000-000000000002' })

    assert.equal(captures.length, 2)
    assert.deepEqual(captures[1], captures[0])
})

test('samples on the request id', async (t) => {
    enableCapture(t, { MIDDLEWARE_CAPTURE_SAMPLE_RATE: '0.5' })
    const captures = mockFetches(t)

    for (let i = 0; i < 2; i++) {
        await handle(page, { 'x-vercel-id': 'iad1::test1-1700000000000-000000000001' })
        await handle(page, { 'x-vercel-id': 'iad1::test2-1700000000000-000000000002' })
    }

    assert.deepEqual(
        captures.map((e) => e.properties.vercel_request_id),
        ['test2-1700000000000-000000000002', 'test2-1700000000000-000000000002']
    )
})

test("records nothing when capture is off, outside /docs, or for the middleware's own Markdown fetch", async (t) => {
    const captures = mockFetches(t)
    await handle(page, { 'user-agent': 'Claude-User' })
    assert.equal(captures.length, 0)

    enableCapture(t)
    await handle(`${page}.md`, { 'user-agent': 'Vercel Edge Functions' })
    await handle('https://posthog.com/blog/some-post', { 'user-agent': 'Claude-User' })
    await handle('https://posthog.com/docsearch', { 'user-agent': 'Claude-User' })
    assert.equal(captures.length, 0)

    await handle('https://posthog.com/docs', { 'user-agent': 'Claude-User' })
    assert.equal(captures.length, 1)
})

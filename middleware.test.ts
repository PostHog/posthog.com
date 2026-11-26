import assert from 'node:assert/strict'
import { test, type TestContext } from 'node:test'

import middleware from './middleware.ts'

const page = 'https://posthog.com/docs/product-analytics'
const SUBREQUEST_HEADER = 'x-posthog-middleware-subrequest'

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
    assert.equal(new Headers(fetch.mock.calls[0].arguments[1]?.headers).get(SUBREQUEST_HEADER), '1')
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

function enableLog(t: TestContext): void {
    process.env.MIDDLEWARE_LOG_ENABLED = 'true'
    t.after(() => {
        delete process.env.MIDDLEWARE_LOG_ENABLED
    })
}

// Answers the `.md` sibling fetch and collects the request lines the middleware logs.
function mockSiblingAndLog(t: TestContext, markdownStatus = 200): Record<string, unknown>[] {
    t.mock.method(globalThis, 'fetch', async () => new Response('# Product analytics', { status: markdownStatus }))
    const lines: Record<string, unknown>[] = []
    t.mock.method(console, 'log', (line: string) => lines.push(JSON.parse(line)))
    return lines
}

test('logs the request and the Markdown served, with values only for allowlisted headers and parameters', async (t) => {
    enableLog(t)
    const lines = mockSiblingAndLog(t)
    const headers = {
        'user-agent': 'Claude-User (claude-code/2.1.0; +https://support.anthropic.com/)',
        accept: '*/*',
        'accept-language': 'en',
        'sec-fetch-site': 'none',
        'sec-purpose': 'prefetch',
        'signature-agent': '"https://agent.example.com"',
        'x-vercel-id': 'fra1::iad1::test1-1700000000000-000000000001',
        'x-vercel-ip-country': 'DE',
        'x-vercel-ip-city': 'Berlin',
        'x-vercel-ja3-digest': 'test-ja3-digest',
        'x-vercel-ja4-digest': 't13d1516h2_8daaf6152771_test',
        'x-vercel-ip-as-number': '64500',
        'mcp-protocol-version': '2025-06-18',
        'if-none-match': '"test-etag"',
        'cf-worker': 'example.com',
    }

    const response = await middleware(
        new Request(`${page}?utm_source=example&ref=hn&token=test-secret-1&next=test-secret-2`, {
            headers: {
                ...headers,
                cookie: 'ph_phc_test_posthog=test-secret-3',
                authorization: 'Bearer test-secret-4',
                'x-forwarded-for': '203.0.113.7',
                'x-real-ip': '203.0.113.8',
                'x-session': 'test-secret-5',
                from: 'test-secret-6@example.com',
            },
        })
    )

    assert.equal(await response?.text(), '# Product analytics')
    assert.equal(lines.length, 1)
    assert.doesNotMatch(JSON.stringify(lines[0]), /test-secret|203\.0\.113/)
    const { markdown_fetch_ms, ...line } = lines[0]
    assert.equal(typeof markdown_fetch_ms, 'number')
    assert.deepEqual(line, {
        type: 'docs_request',
        method: 'GET',
        url: '/docs/product-analytics?utm_source=example&ref=hn&token=REDACTED&next=REDACTED',
        served_format: 'markdown',
        negotiation: 'served',
        markdown_reason: 'agent_fetcher',
        request_headers: headers,
        other_header_names: ['authorization', 'cookie', 'from', 'x-forwarded-for', 'x-real-ip', 'x-session'],
    })
})

test('logs an email address in the path as {email}', async (t) => {
    enableLog(t)
    const lines = mockSiblingAndLog(t)

    await middleware(new Request('https://posthog.com/docs/someone%40example.com/setup'))

    assert.equal(lines[0].url, '/docs/{email}/setup')
})

test('logs why no Markdown was served, and requests for a Markdown URL', async (t) => {
    enableLog(t)
    const lines = mockSiblingAndLog(t, 404)

    await middleware(new Request(page, { headers: { 'user-agent': 'Mozilla/5.0', accept: 'text/html' } }))
    await middleware(new Request(page, { headers: { 'user-agent': 'ChatGPT-User/1.0' } }))
    await middleware(new Request(page, { headers: { accept: 'text/markdown' } }))
    await middleware(new Request(`${page}.md`, { headers: { 'user-agent': 'curl/8.0' } }))

    assert.deepEqual(
        lines.map((line) => [line.served_format, line.negotiation, line.markdown_reason]),
        [
            ['html', 'not_requested', undefined],
            ['html', 'no_sibling', 'agent_fetcher'],
            ['html', 'no_sibling', 'accept'],
            ['markdown', 'markdown_url', undefined],
        ]
    )
    assert.equal(typeof lines[1].markdown_fetch_ms, 'number')
})

test("logs nothing when off, outside /docs, or for the middleware's own Markdown fetch", async (t) => {
    const lines = mockSiblingAndLog(t)
    await middleware(new Request(page, { headers: { 'user-agent': 'Claude-User' } }))
    assert.equal(lines.length, 0)

    enableLog(t)
    await middleware(new Request(`${page}.md`, { headers: { [SUBREQUEST_HEADER]: '1' } }))
    await middleware(new Request('https://posthog.com/blog/some-post', { headers: { 'user-agent': 'Claude-User' } }))
    await middleware(new Request('https://posthog.com/docsearch', { headers: { 'user-agent': 'Claude-User' } }))
    assert.equal(lines.length, 0)

    await middleware(new Request('https://posthog.com/docs', { headers: { 'user-agent': 'Claude-User' } }))
    assert.equal(lines.length, 1)
})

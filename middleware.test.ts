import assert from 'node:assert/strict'
import { test, type TestContext } from 'node:test'

import middleware from './middleware.ts'
import { SUBREQUEST_HEADER } from './middleware-log.ts'

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

function enableLog(t: TestContext) {
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

test('logs the request headers and the Markdown served, leaving out credentials and the client IP', async (t) => {
    enableLog(t)
    const lines = mockSiblingAndLog(t)
    const headers = {
        'user-agent': 'Claude-User (claude-code/2.1.0; +https://support.anthropic.com/)',
        accept: '*/*',
        'sec-fetch-site': 'none',
        'signature-agent': '"https://agent.example.com"',
        'x-vercel-id': 'fra1::iad1::test1-1700000000000-000000000001',
        'x-vercel-ip-country': 'DE',
    }

    const response = await middleware(
        new Request(`${page}?ref=example`, {
            headers: {
                ...headers,
                cookie: 'ph_phc_test_posthog=%7B%7D',
                authorization: 'Bearer test-token',
                'x-forwarded-for': '203.0.113.7',
                'x-vercel-oidc-token': 'test-oidc',
            },
        })
    )

    assert.equal(await response?.text(), '# Product analytics')
    assert.equal(lines.length, 1)
    const { markdown_fetch_ms, ...line } = lines[0]
    assert.equal(typeof markdown_fetch_ms, 'number')
    assert.deepEqual(line, {
        type: 'docs_request',
        served_format: 'markdown',
        negotiation: 'served',
        markdown_reason: 'agent_fetcher',
        query: '?ref=example',
        request_headers: headers,
    })
})

test('logs why no Markdown was served, and requests for a Markdown URL', async (t) => {
    enableLog(t)
    const lines = mockSiblingAndLog(t, 404)

    await middleware(new Request(page, { headers: { 'user-agent': 'Mozilla/5.0', accept: 'text/html' } }))
    await middleware(new Request(page, { headers: { 'user-agent': 'ChatGPT-User/1.0' } }))
    await middleware(new Request(`${page}.md`, { headers: { 'user-agent': 'curl/8.0' } }))

    assert.deepEqual(
        lines.map((line) => [line.served_format, line.negotiation]),
        [
            ['html', 'not_requested'],
            ['html', 'no_sibling'],
            ['markdown', 'markdown_url'],
        ]
    )
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

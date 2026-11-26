import assert from 'node:assert/strict'
import { test, type TestContext } from 'node:test'

import middleware from './middleware.ts'
import { MCP_SERVER_URL } from './src/constants/index.ts'

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

test('weighs text/markdown against text/html in Accept', async (t) => {
    t.mock.method(globalThis, 'fetch', async () => new Response('# Product analytics'))
    const cases: [string, string, string | undefined][] = [
        ['Mozilla/5.0', 'text/markdown,text/html;q=0.9,*/*;q=0.5', 'text/markdown; charset=utf-8'],
        ['Mozilla/5.0', 'text/html,text/plain,text/markdown', 'text/markdown; charset=utf-8'],
        ['Mozilla/5.0', 'text/html,application/json;q=0.8,text/markdown;q=0.7,*/*;q=0.5', undefined],
        ['Mozilla/5.0', 'text/markdown;q=0.5, */*', undefined],
        ['Mozilla/5.0', 'text/markdown;q=0', undefined],
        ['ChatGPT-User/1.0', 'text/html;q=0, */*', 'text/markdown; charset=utf-8'],
        ['ChatGPT-User/1.0', 'text/html;q=0, text/*;q=0, */*', undefined],
    ]

    for (const [agent, accept, contentType] of cases) {
        const response = await middleware(new Request(page, { headers: { 'user-agent': agent, accept } }))
        assert.equal(response?.headers.get('content-type'), contentType, accept)
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

const mcpClientHeaders = { accept: 'application/json, text/event-stream', 'content-type': 'application/json' }

// An MCP message as a client sends it. `new Request` sets no content-length, but a client over the network does.
function mcpPost(url: string, body: string, headers: Record<string, string> = {}): Request {
    const length = String(new TextEncoder().encode(body).length)
    return new Request(url, {
        method: 'POST',
        headers: { ...mcpClientHeaders, 'content-length': length, ...headers },
        body,
    })
}

test('answers MCP clients pointed at a page with a JSON-RPC error that names the MCP server', async (t) => {
    const fetch = t.mock.method(globalThis, 'fetch', async () => new Response('# PostHog MCP server'))
    const initialize = { jsonrpc: '2.0', id: 0, method: 'initialize', params: {} }

    for (const path of ['/docs/model-context-protocol', '/docs/product-analytics', '/mcp', '/mcp.md']) {
        const response = await middleware(
            mcpPost(`https://posthog.com${path}`, JSON.stringify(initialize), { 'user-agent': 'Claude-User' })
        )
        assert.equal(response?.status, 200, path)
        assert.equal(response.headers.get('content-type'), 'application/json')
        const { jsonrpc, id, error } = await response.json()
        assert.deepEqual({ jsonrpc, id, code: error.code }, { jsonrpc: '2.0', id: 0, code: -32600 })
        assert.ok(error.message.includes(MCP_SERVER_URL), path)
    }
    assert.equal(fetch.mock.callCount(), 0)
})

test('echoes only a JSON-RPC id it read from a small body', async () => {
    const initialize = (id: unknown, padding = '') =>
        JSON.stringify({ jsonrpc: '2.0', id, method: 'initialize', params: { padding } })
    const cases: [string, Request, string | number | null][] = [
        ['string id', mcpPost(page, initialize('a1')), 'a1'],
        ['malformed body', mcpPost(page, '{"jsonrpc":'), null],
        ['object id', mcpPost(page, initialize({ a: 1 })), null],
        ['boolean id', mcpPost(page, initialize(true)), null],
        ['body over 64 KB', mcpPost(page, initialize(1, 'x'.repeat(64 * 1024))), null],
        [
            'body over 64 KB with a small content-length',
            mcpPost(page, initialize(1, 'x'.repeat(64 * 1024)), { 'content-length': '100' }),
            null,
        ],
        [
            'no content-length',
            new Request(page, { method: 'POST', headers: mcpClientHeaders, body: initialize(1) }),
            null,
        ],
    ]
    for (const [name, request, expected] of cases) {
        const response = await middleware(request)
        const { id, error } = await response?.json()
        assert.equal(id, expected, name)
        assert.ok(error.message.includes(MCP_SERVER_URL), name)
    }
})

test('answers an SSE client with the hint in a 405', async () => {
    const sse = await middleware(new Request(page, { headers: { accept: 'text/event-stream' } }))
    assert.equal(sse?.status, 405)
    assert.ok((await sse.text()).includes(MCP_SERVER_URL))
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
        'x-anthropic-client': 'test-client',
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
                'cf-connecting-ip': '203.0.113.9',
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
        other_header_names: [
            'authorization',
            'cf-connecting-ip',
            'cookie',
            'from',
            'x-forwarded-for',
            'x-real-ip',
            'x-session',
        ],
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
    await middleware(new Request(page, { method: 'POST', headers: mcpClientHeaders, body: '{}' }))

    assert.deepEqual(
        lines.map((line) => [line.served_format, line.negotiation, line.markdown_reason]),
        [
            ['html', 'not_requested', undefined],
            ['html', 'no_sibling', 'agent_fetcher'],
            ['html', 'no_sibling', 'accept'],
            ['markdown', 'markdown_url', undefined],
            ['mcp_error', 'mcp_client', undefined],
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

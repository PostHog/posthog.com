import assert from 'node:assert/strict'
import { test } from 'node:test'

import middleware, { accepts, classifyUserAgent, config, hashClient } from './middleware.ts'

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

const captureHost = 'https://us.i.posthog.com'

function setEnv(t, values: Record<string, string | undefined>) {
    const previous = Object.fromEntries(Object.keys(values).map((key) => [key, process.env[key]]))
    const apply = (entries: Record<string, string | undefined>) => {
        for (const [key, value] of Object.entries(entries)) {
            if (value === undefined) delete process.env[key]
            else process.env[key] = value
        }
    }
    apply(values)
    t.after(() => apply(previous))
}

// Runs `middleware` with capture configured and returns the response plus the events it sent.
async function run(t, request: Request, sibling = () => new Response('# Product analytics')) {
    setEnv(t, { GATSBY_POSTHOG_API_KEY: 'phc_test', GATSBY_POSTHOG_API_HOST: captureHost, AGENT_FETCH_SALT: 'salt' })
    const fetch = t.mock.method(globalThis, 'fetch', async (input) =>
        String(input).startsWith(captureHost) ? new Response('ok') : sibling()
    )
    const pending: Promise<unknown>[] = []
    const response = await middleware(request, { waitUntil: (promise) => pending.push(promise) })
    await Promise.all(pending)
    const events = fetch.mock.calls
        .filter((call) => String(call.arguments[0]) === `${captureHost}/i/v0/e/`)
        .map((call) => JSON.parse(call.arguments[1].body))
    return { response, events, fetch }
}

test('records Markdown served by Accept or user agent, without the raw IP', async (t) => {
    const { response, events } = await run(
        t,
        new Request(page, {
            headers: {
                'user-agent': 'Claude-User',
                accept: 'text/markdown, text/html',
                'x-real-ip': '203.0.113.7',
                'x-vercel-id': 'iad1::abc',
                'signature-agent': '"https://claude.ai"',
            },
        })
    )
    assert.equal(response?.headers.get('content-type'), 'text/markdown; charset=utf-8')
    assert.equal(events.length, 1)
    const [event] = events
    assert.equal(event.event, 'agent page fetched')
    assert.equal(event.api_key, 'phc_test')
    assert.match(event.distinct_id, /^[0-9a-f]{64}$/)
    assert.deepEqual(
        {
            path: event.properties.path,
            format: event.properties.format,
            negotiated_by: event.properties.negotiated_by,
            ua_family: event.properties.ua_family,
            signature_agent: event.properties.signature_agent,
            vercel_id: event.properties.vercel_id,
            $process_person_profile: event.properties.$process_person_profile,
        },
        {
            path: '/docs/product-analytics',
            format: 'md',
            negotiated_by: 'accept',
            ua_family: 'Claude-User',
            signature_agent: '"https://claude.ai"',
            vercel_id: 'iad1::abc',
            $process_person_profile: false,
        }
    )
    assert.ok(!JSON.stringify(event).includes('203.0.113.7'))

    const ua = await run(t, new Request(page, { headers: { 'user-agent': 'ChatGPT-User/1.0' } }))
    assert.equal(ua.events[0].properties.negotiated_by, 'ua')
    assert.equal(ua.events[0].properties.ua_family, 'ChatGPT-User')
})

test('records known crawlers that get the HTML, and skips browsers', async (t) => {
    for (const [agent, family] of [
        ['Mozilla/5.0 (compatible; ClaudeBot/1.0)', 'ClaudeBot'],
        ['Mozilla/5.0 (compatible; GPTBot/1.2)', 'GPTBot'],
        ['OAI-SearchBot/1.0', 'OAI-SearchBot'],
        ['PerplexityBot/1.0', 'PerplexityBot'],
        ['Google-Agent', 'Google-Agent'],
        ['curl/8.7.1', 'curl'],
    ]) {
        const { response, events } = await run(t, new Request(page, { headers: { 'user-agent': agent } }))
        assert.equal(response, undefined, agent)
        assert.equal(events.length, 1, agent)
        assert.equal(events[0].properties.ua_family, family)
        assert.equal(events[0].properties.format, 'html')
        assert.equal(events[0].properties.negotiated_by, 'default')
    }

    for (const agent of ['', 'Mozilla/5.0 (Macintosh) Safari/605.1.15', 'Googlebot/2.1']) {
        const { fetch } = await run(
            t,
            new Request(page, { headers: { 'user-agent': agent, accept: 'text/html,*/*;q=0.8' } })
        )
        assert.equal(fetch.mock.callCount(), 0, agent)
    }
})

test('records HTML given to a fetcher that asked for it, and the fallback when no sibling exists', async (t) => {
    const codex = await run(
        t,
        new Request(page, { headers: { 'user-agent': 'ChatGPT-User', accept: 'text/html,*/*;q=0.8' } })
    )
    assert.equal(codex.response, undefined)
    assert.equal(codex.events[0].properties.format, 'html')
    assert.equal(codex.events[0].properties.negotiated_by, 'accept')

    const missing = await run(
        t,
        new Request(page, { headers: { 'user-agent': 'Claude-User' } }),
        () => new Response('Not found', { status: 404 })
    )
    assert.equal(missing.response, undefined)
    assert.equal(missing.events.length, 1)
    assert.equal(missing.events[0].properties.format, 'html')
    assert.equal(missing.events[0].properties.requested_markdown, true)
})

test('records direct .md and llms.txt fetches and lets the static file serve', async (t) => {
    for (const [url, format] of [
        [`${page}.md`, 'md'],
        ['https://posthog.com/llms.txt', 'txt'],
    ]) {
        const { response, events, fetch } = await run(t, new Request(url, { headers: { 'user-agent': 'axios/1.7' } }))
        assert.equal(response, undefined, url)
        assert.equal(fetch.mock.callCount(), 1, url)
        assert.equal(events[0].properties.format, format)
        assert.equal(events[0].properties.negotiated_by, 'suffix')
        assert.equal(events[0].properties.ua_family, 'other')
    }
})

test('skips the site’s own .md requests', async (t) => {
    const own = await run(t, new Request(`${page}.md`, { headers: { 'x-posthog-markdown-sibling': '1' } }))
    assert.equal(own.fetch.mock.callCount(), 0)

    const button = await run(t, new Request(`${page}.md`, { headers: { 'sec-fetch-site': 'same-origin' } }))
    assert.equal(button.fetch.mock.callCount(), 0)

    const { fetch } = await run(t, new Request(page, { headers: { 'user-agent': 'Claude-User' } }))
    const sibling = fetch.mock.calls.find((call) => String(call.arguments[0]) === `${page}.md`)
    assert.equal(sibling.arguments[1].headers['x-posthog-markdown-sibling'], '1')
})

test('does not capture without a salt or a waitUntil context', async (t) => {
    setEnv(t, { GATSBY_POSTHOG_API_KEY: 'phc_test', GATSBY_POSTHOG_API_HOST: captureHost, AGENT_FETCH_SALT: undefined })
    const fetch = t.mock.method(globalThis, 'fetch', async () => new Response('# Product analytics'))
    const pending: Promise<unknown>[] = []
    await middleware(new Request(page, { headers: { 'user-agent': 'ClaudeBot' } }), {
        waitUntil: (promise) => pending.push(promise),
    })
    assert.equal(pending.length, 0)
    assert.equal(fetch.mock.callCount(), 0)
})

test('hashes the client per day and per user agent', async () => {
    const day = new Date('2026-10-28T12:00:00Z')
    const a = await hashClient('203.0.113.7', 'Claude-User', 'salt', day)
    assert.equal(a, await hashClient('203.0.113.7', 'Claude-User', 'salt', new Date('2026-10-28T23:59:59Z')))
    assert.notEqual(a, await hashClient('203.0.113.7', 'Claude-User', 'salt', new Date('2026-10-29T00:00:00Z')))
    assert.notEqual(a, await hashClient('203.0.113.8', 'Claude-User', 'salt', day))
    assert.notEqual(a, await hashClient('203.0.113.7', 'ChatGPT-User', 'salt', day))
    assert.notEqual(a, await hashClient('203.0.113.7', 'Claude-User', 'other salt', day))
})

test('reads Accept q-values', () => {
    assert.equal(accepts('text/markdown', 'text/markdown'), true)
    assert.equal(accepts('text/markdown;q=0.5, text/html', 'text/markdown'), true)
    assert.equal(accepts('text/markdown;q=0', 'text/markdown'), false)
    assert.equal(accepts('text/markdown; q=0.0, text/html', 'text/markdown'), false)
    assert.equal(accepts('TEXT/MARKDOWN', 'text/markdown'), true)
    assert.equal(accepts('*/*', 'text/markdown'), false)
    assert.equal(accepts('text/html;q=0', 'text/html'), false)
})

test('serves HTML to a q=0 Markdown request and Markdown to an agent that refuses HTML', async (t) => {
    const refused = await run(t, new Request(page, { headers: { accept: 'text/markdown;q=0, text/html' } }))
    assert.equal(refused.response, undefined)
    assert.equal(refused.fetch.mock.callCount(), 0)

    const agent = await run(t, new Request(page, { headers: { 'user-agent': 'Claude-User', accept: 'text/html;q=0' } }))
    assert.equal(agent.response?.headers.get('content-type'), 'text/markdown; charset=utf-8')
})

test('classifies agent user agents', () => {
    for (const [agent, family] of [
        ['opencode/0.15.0', 'OpenCode-User'],
        ['OpenCode-User/1.0', 'OpenCode-User'],
        ['GeminiCLI/0.9.0 (darwin; arm64)', 'Gemini CLI'],
        ['Cursor/1.7', 'Cursor'],
        ['Mozilla/5.0 (compatible; Claude-User/1.0; +Claude-User@anthropic.com)', 'Claude-User'],
        ['Perplexity-User/1.0', 'Perplexity-User'],
        ['NotChatGPT-User', 'other'],
        ['python-requests/2.32', 'other'],
    ]) {
        assert.equal(classifyUserAgent(agent), family, agent)
    }
})

test('matches /learn, /pricing, llms.txt, and every .md path', () => {
    for (const path of ['/learn/:path*', '/pricing/:path*', '/llms.txt', '/(.*\\.md)']) {
        assert.ok(config.matcher.includes(path), path)
    }
})

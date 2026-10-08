import assert from 'node:assert/strict'
import test from 'node:test'
import { withNgrokBypass } from './ngrokFetch.ts'

test('the bypass is scoped to configured ngrok API hosts and preserves request options', async () => {
    const origin = 'https://squeak.ngrok-free.app'
    const calls: { input: RequestInfo | URL; init?: RequestInit }[] = []
    const fetch: typeof globalThis.fetch = async (input, init) => {
        calls.push({ input, init })
        return new Response('{}')
    }
    const wrapped = withNgrokBypass(fetch, [origin, 'http://localhost:1337', undefined])
    const headers = new Headers({ Authorization: 'Bearer test-token', 'Content-Type': 'application/json' })
    const options = { method: 'POST', body: '{}', headers, signal: new AbortController().signal }
    await wrapped(`${origin}/api/me/laptop/stickers`, options)
    const sent = calls.pop()!.init!
    assert.equal(new Headers(sent.headers).get('ngrok-skip-browser-warning'), '1')
    assert.equal(new Headers(sent.headers).get('Authorization'), 'Bearer test-token')
    assert.equal(new Headers(sent.headers).get('Content-Type'), 'application/json')
    assert.equal(headers.has('ngrok-skip-browser-warning'), false)
    assert.equal(sent.body, options.body)
    assert.equal(sent.signal, options.signal)
    assert.equal(sent.method, 'POST')

    for (const url of [
        '/api/me',
        'http://localhost:1337/api/me',
        `${origin}/uploads/image.png`,
        'https://other.ngrok-free.app/api/me',
        `${origin}.example.com/api/me`,
    ]) {
        await wrapped(url, options)
        assert.equal(calls.pop()!.init, options)
    }
    assert.equal(withNgrokBypass(fetch, ['http://localhost:1337', 'https://squeak.posthog.com']), fetch)
})

test('Request inputs keep their headers, body, and abort signal', async () => {
    const request = new Request('https://squeak.ngrok-free.app/api/me', {
        method: 'POST',
        headers: { Authorization: 'Bearer test-token' },
        body: 'payload',
    })
    const wrapped = withNgrokBypass(
        async (input, init) => {
            assert.equal(input, request)
            const actual = new Request(input, init)
            assert.equal(actual.headers.get('Authorization'), 'Bearer test-token')
            assert.equal(actual.headers.get('ngrok-skip-browser-warning'), '1')
            assert.equal(await actual.text(), 'payload')
            return new Response('{}')
        },
        ['https://squeak.ngrok-free.app']
    )
    await wrapped(request)
    assert.equal(request.headers.has('ngrok-skip-browser-warning'), false)
})

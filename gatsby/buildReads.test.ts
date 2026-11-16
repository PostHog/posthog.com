import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { once } from 'node:events'
import { setTimeout as delay } from 'node:timers/promises'
import { test } from 'node:test'
import type { TestContext } from 'node:test'
import { queryJson, readBytes, readJson } from './buildReads.ts'

async function serve(t: TestContext, handler: (request: IncomingMessage, response: ServerResponse) => void) {
    const server = createServer(handler)
    server.listen(0, '127.0.0.1')
    await once(server, 'listening')
    const address = server.address()
    assert.ok(address && typeof address === 'object')
    t.after(() => {
        server.closeAllConnections()
        return new Promise<void>((resolve) => server.close(() => resolve()))
    })
    return `http://127.0.0.1:${address.port}`
}

const options = { timeoutMs: 5000, attemptTimeoutMs: 1000 }

function captureWarnings(t: TestContext) {
    const messages: string[] = []
    t.mock.method(console, 'warn', (message: string) => messages.push(message))
    return messages
}

test('recovers a read-only POST and sends the same query on retry', async (t) => {
    captureWarnings(t)
    const bodies: string[] = []
    const base = await serve(t, (request, response) => {
        let body = ''
        request.setEncoding('utf8').on('data', (chunk) => (body += chunk))
        request.on('end', () => {
            assert.equal(request.method, 'POST')
            assert.equal(request.headers['content-type'], 'application/json')
            bodies.push(body)
            response.writeHead(bodies.length === 1 ? 503 : 200)
            response.end(JSON.stringify({ results: { name: 'London' } }))
        })
    })
    assert.deepEqual(await queryJson(base, { locationId: 'location-a' }, options), { results: { name: 'London' } })
    assert.deepEqual(bodies, ['{"locationId":"location-a"}', '{"locationId":"location-a"}'])
})

test('retries a response interrupted after headers and returns complete JSON', async (t) => {
    captureWarnings(t)
    let requests = 0
    const base = await serve(t, (_request, response) => {
        requests++
        response.writeHead(200, { 'content-type': 'application/json' })
        if (requests === 1) {
            response.write('{"value":')
            setTimeout(() => response.destroy(), 10)
        } else response.end('{"value":42}')
    })
    assert.deepEqual(await readJson(base, options), { value: 42 })
    assert.equal(requests, 2)
})

test('retries a connection reset before headers', async (t) => {
    captureWarnings(t)
    let requests = 0
    const base = await serve(t, (request, response) => {
        if (++requests === 1) request.socket.destroy()
        else response.end('{"ok":true}')
    })
    assert.deepEqual(await readJson(base, options), { ok: true })
    assert.equal(requests, 2)
})

test('honors Retry-After rather than immediately retrying a rate limit', async (t) => {
    captureWarnings(t)
    const times: number[] = []
    const base = await serve(t, (_request, response) => {
        times.push(Date.now())
        response.writeHead(times.length === 1 ? 429 : 200, { 'retry-after': '1' })
        response.end('{}')
    })
    await readJson(base, options)
    assert.equal(times.length, 2)
    assert.ok(times[1] - times[0] >= 900)
})

test('stops after three attempts and redacts query parameters and headers', async (t) => {
    const messages = captureWarnings(t)
    let requests = 0
    const base = await serve(t, (_request, response) => {
        requests++
        response.writeHead(503)
        response.end('unavailable')
    })
    await assert.rejects(
        readJson(`${base}/lookup?token=query-secret`, {
            ...options,
            headers: { authorization: 'Bearer header-secret' },
        }),
        (error: Error) => {
            assert.match(error.message, /after 3 attempt\(s\).*HTTP 503/)
            assert.ok(!error.message.includes('query-secret'))
            return true
        }
    )
    assert.equal(requests, 3)
    assert.equal(messages.length, 2)
    assert.ok(messages.every((message) => !/query-secret|header-secret/.test(message)))
})

test('does not retry authentication errors or invalid JSON', async (t) => {
    const requests: string[] = []
    const base = await serve(t, (request, response) => {
        assert.ok(request.url)
        requests.push(request.url)
        response.writeHead(request.url === '/auth' ? 401 : 200)
        response.end('not json')
    })
    await assert.rejects(readJson(`${base}/auth`, options), /HTTP 401/)
    await assert.rejects(readJson(`${base}/json`, options), /invalid JSON/)
    assert.deepEqual(requests, ['/auth', '/json'])
})

test('coalesces identical reads but returns independent parsed objects', async (t) => {
    let requests = 0
    const base = await serve(t, (_request, response) => {
        requests++
        setTimeout(() => response.end('{"value":1}'), 30)
    })
    const [first, second] = await Promise.all([
        readJson<{ value: number }>(base, options),
        readJson<{ value: number }>(base, options),
    ])
    assert.equal(requests, 1)
    first.value = 2
    assert.equal(second.value, 1)
    await readJson(base, options)
    assert.equal(requests, 2)
})

test('does not share responses across credentials or POST bodies', async (t) => {
    let requests = 0
    const base = await serve(t, (_request, response) => {
        requests++
        setTimeout(() => response.end('{}'), 20)
    })
    await Promise.all([
        readJson(base, { ...options, headers: { authorization: 'a' } }),
        readJson(base, { ...options, headers: { authorization: 'b' } }),
        queryJson(base, { id: 1 }, options),
        queryJson(base, { id: 2 }, options),
    ])
    assert.equal(requests, 4)
})

test('shares a four-request host limit across module instances and body readers', async (t) => {
    const other = await import(new URL('./buildReads.ts?second-instance', import.meta.url).href)
    let active = 0
    let maximum = 0
    const base = await serve(t, (_request, response) => {
        active++
        maximum = Math.max(maximum, active)
        response.writeHead(200)
        response.write('{"value":')
        setTimeout(() => {
            response.end('1}')
            active--
        }, 40)
    })
    await Promise.all(
        Array.from({ length: 12 }, (_, index) =>
            index % 2 ? other.readBytes(`${base}/${index}`, options) : readJson(`${base}/${index}`, options)
        )
    )
    assert.equal(maximum, 4)
})

test('rejects an already-cancelled read without sending it', async (t) => {
    let requests = 0
    const base = await serve(t, (_request, response) => {
        requests++
        response.end('{}')
    })
    const controller = new AbortController()
    const reason = new Error('already cancelled')
    controller.abort(reason)
    await assert.rejects(readJson(base, { signal: controller.signal }), (error) => error === reason)
    await delay(0)
    assert.equal(requests, 0)
})

test('cancels queued work without sending it', async (t) => {
    let started = 0
    let release!: () => void
    const gate = new Promise<void>((resolve) => {
        release = resolve
    })
    const base = await serve(t, (_request, response) => {
        started++
        gate.then(() => response.end('{}'))
    })
    const running = Array.from({ length: 4 }, (_, index) => readJson(`${base}/${index}`, options))
    while (started < 4) await delay(5)
    const controller = new AbortController()
    const reason = new Error('cancelled by caller')
    const queued = readJson(`${base}/queued`, { ...options, signal: controller.signal })
    controller.abort(reason)
    await assert.rejects(queued, (error) => error === reason)
    release()
    await Promise.all(running)
    await delay(20)
    assert.equal(started, 4)
})

test('a caller cancellation does not cancel another caller reading the same URL', async (t) => {
    let started = 0
    const base = await serve(t, (_request, response) => {
        started++
        setTimeout(() => response.end('{"ok":true}'), 50)
    })
    const controller = new AbortController()
    const cancelled = readJson(base, { ...options, signal: controller.signal })
    const successful = readJson(base, options)
    controller.abort(new Error('caller cancelled'))
    await assert.rejects(cancelled, /caller cancelled/)
    assert.deepEqual(await successful, { ok: true })
    assert.ok(started >= 1)
})

test('retries a timed-out attempt within the overall deadline', async (t) => {
    captureWarnings(t)
    let requests = 0
    const base = await serve(t, (_request, response) => {
        if (++requests > 1) response.end('{"ok":true}')
    })
    assert.deepEqual(await readJson(base, { timeoutMs: 2000, attemptTimeoutMs: 40 }), { ok: true })
    assert.equal(requests, 2)
})

test('the overall deadline includes Retry-After delays', async (t) => {
    captureWarnings(t)
    let requests = 0
    const base = await serve(t, (_request, response) => {
        requests++
        response.writeHead(429, { 'retry-after': '30' })
        response.end('{}')
    })
    const start = Date.now()
    await assert.rejects(readJson(base, { timeoutMs: 100, attemptTimeoutMs: 1000 }), /deadline exceeded/)
    assert.ok(Date.now() - start < 1000)
    assert.equal(requests, 1)
})

test('binary reads preserve bytes exactly', async (t) => {
    const bytes = Uint8Array.from([0, 255, 128, 1, 13, 10])
    const base = await serve(t, (_request, response) => response.end(bytes))
    assert.deepEqual(await readBytes(base, options), bytes)
})

test('the overall deadline also covers waiting for a host slot', async (t) => {
    let started = 0
    let release!: () => void
    const gate = new Promise<void>((resolve) => {
        release = resolve
    })
    const base = await serve(t, (_request, response) => {
        started++
        gate.then(() => response.end('{}'))
    })
    const running = Array.from({ length: 4 }, (_, index) => readJson(`${base}/${index}`, options))
    while (started < 4) await delay(5)
    await assert.rejects(readJson(`${base}/queued`, { timeoutMs: 50 }), /Build read failed/)
    release()
    await Promise.all(running)
    await delay(20)
    assert.equal(started, 4)
})

test('a busy origin does not block an unrelated origin', async (t) => {
    let started = 0
    let release!: () => void
    const gate = new Promise<void>((resolve) => {
        release = resolve
    })
    const busy = await serve(t, (_request, response) => {
        started++
        gate.then(() => response.end('{}'))
    })
    const available = await serve(t, (_request, response) => response.end('{"ok":true}'))
    const running = Array.from({ length: 4 }, (_, index) => readJson(`${busy}/${index}`, options))
    while (started < 4) await delay(5)
    assert.deepEqual(await readJson(available, { timeoutMs: 1000 }), { ok: true })
    release()
    await Promise.all(running)
})

test('cancellation interrupts an active body download without retrying', async (t) => {
    let started = 0
    const base = await serve(t, (_request, response) => {
        started++
        response.writeHead(200)
        response.write('{"value":')
    })
    const controller = new AbortController()
    const result = readJson(base, { ...options, signal: controller.signal })
    while (started < 1) await delay(5)
    const reason = new Error('stop downloading')
    controller.abort(reason)
    await assert.rejects(result, (error) => error === reason)
    assert.equal(started, 1)
})

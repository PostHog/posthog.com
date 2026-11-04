const assert = require('node:assert/strict')
const { test } = require('node:test')

const handler = require('../api/http-log-drain.js')
const { parseLogs, toEvent } = handler

const log = (id, path = '/docs/product-analytics') => ({
    id,
    deploymentId: 'dpl_1',
    timestamp: 1793700000000,
    proxy: {
        host: 'posthog.com',
        path: `${path}?utm_source=newsletter&utm_campaign=launch%20week`,
        clientIp: '192.0.2.10',
        userAgent: ['Mozilla/5.0 Claude-User/1.0'],
        scheme: 'https',
    },
})

for (const [name, body] of [
    ['NDJSON text', [log('a'), log('b'), log('c')].map((l) => JSON.stringify(l)).join('\n')],
    ['JSON array text', JSON.stringify([log('a'), log('b'), log('c')])],
    ['parsed JSON array', [log('a'), log('b'), log('c')]],
    [
        'NDJSON buffer with a bad line',
        Buffer.from([JSON.stringify(log('a')), '{oops', JSON.stringify(log('b')), JSON.stringify(log('c'))].join('\n')),
    ],
]) {
    test(`keeps every valid log line from ${name}`, () => {
        assert.deepEqual(
            parseLogs(body).map((l) => l.id),
            ['a', 'b', 'c']
        )
    })
}

test('maps a line to the same $http_log shape as the source webhook template', () => {
    const event = toEvent(log('a'), 'salt')

    assert.equal(event.event, '$http_log')
    assert.equal(event.distinct_id, 'http_log_LylQn9/38g905srglHezKY')
    assert.equal(event.timestamp, '2026-11-03T10:00:00.000Z')
    assert.equal(event.uuid, toEvent(log('a'), 'other salt').uuid)
    assert.notEqual(event.uuid, toEvent(log('b'), 'salt').uuid)
    assert.match(event.uuid, /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
    assert.deepEqual(
        {
            $current_url: event.properties.$current_url,
            $pathname: event.properties.$pathname,
            $raw_user_agent: event.properties.$raw_user_agent,
            $process_person_profile: event.properties.$process_person_profile,
            utm_campaign: event.properties.utm_campaign,
        },
        {
            $current_url: 'https://posthog.com/docs/product-analytics?utm_source=newsletter&utm_campaign=launch%20week',
            $pathname: '/docs/product-analytics',
            $raw_user_agent: 'Mozilla/5.0 Claude-User/1.0',
            $process_person_profile: false,
            utm_campaign: 'launch week',
        }
    )
})

test('reads the served format and Accept header the middleware logs', () => {
    const marker = JSON.stringify({ served_format: 'markdown', accept: 'text/markdown' })
    for (const [message, expected] of [
        [`${marker}\n`, { served_format: 'markdown', accept: 'text/markdown' }],
        ['{"served_format": oops', { served_format: undefined, accept: undefined }],
        ['GET /docs 200', { served_format: undefined, accept: undefined }],
    ]) {
        const { properties } = toEvent({ ...log('a'), source: 'edge-middleware', message }, 'salt')
        assert.deepEqual({ served_format: properties.served_format, accept: properties.accept }, expected, message)
    }
})

function request(body, authorization = 'Bearer secret') {
    return { method: 'POST', headers: { authorization }, body }
}

function response() {
    const res = { statusCode: undefined, payload: undefined }
    res.status = (code) => ((res.statusCode = code), res)
    res.json = (payload) => ((res.payload = payload), res)
    res.end = () => res
    res.setHeader = () => res
    return res
}

for (const [name, authorization, captureStatus, expectedStatus, expectedSent] of [
    ['captures every line except its own request lines', 'Bearer secret', 200, 200, ['a', 'b']],
    ['rejects a wrong Authorization header without capturing', 'Bearer wrong', 200, 401, []],
    ['answers 502 so the drain retries when capture fails', 'Bearer secret', 503, 502, ['a', 'b']],
]) {
    test(`handler ${name}`, async (t) => {
        const env = {
            HTTP_LOG_DRAIN_AUTH: 'Bearer secret',
            HTTP_LOG_DRAIN_SALT: 'salt',
            GATSBY_POSTHOG_API_KEY: 'phc_test',
        }
        const previous = Object.fromEntries(Object.keys(env).map((key) => [key, process.env[key]]))
        Object.assign(process.env, env)
        t.after(() => {
            for (const [key, value] of Object.entries(previous)) {
                if (value === undefined) {
                    delete process.env[key]
                } else {
                    process.env[key] = value
                }
            }
        })
        const sent = []
        t.mock.method(globalThis, 'fetch', async (_url, init) => {
            sent.push(...JSON.parse(init.body).batch.map((e) => e.properties.vercel_log_id))
            return new Response(null, { status: captureStatus })
        })
        t.mock.method(console, 'error', () => {})

        const res = response()
        await handler(request([log('a'), log('self', '/api/http-log-drain'), log('b')], authorization), res)

        assert.equal(res.statusCode, expectedStatus)
        assert.deepEqual(sent, expectedSent)
    })
}

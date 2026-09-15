/**
 * A dropped upload loses a finished job application, so the retry must fire on a transport
 * failure and must not fire on a response the handler actually sent.
 *
 * Run: pnpm test:job-apply
 */
import assert from 'node:assert/strict'
import { describe, test, afterEach } from 'node:test'

import { postApplication } from './postApplication.ts'

const originalFetch = globalThis.fetch

const stubFetch = (results: Array<Response | Error>): { calls: number } => {
    const state = { calls: 0 }
    globalThis.fetch = (async () => {
        const result = results[state.calls++]
        if (result instanceof Error) {
            throw result
        }
        return result
    }) as typeof fetch
    return state
}

describe('postApplication', () => {
    afterEach(() => {
        globalThis.fetch = originalFetch
    })

    test('sends the application once when the request reaches the handler', async () => {
        const response = new Response(null, { status: 200 })
        const state = stubFetch([response])

        assert.equal(await postApplication(new FormData()), response)
        assert.equal(state.calls, 1)
    })

    test('retries once when the request never reaches the handler', async () => {
        const response = new Response(null, { status: 200 })
        const state = stubFetch([new TypeError('Load failed'), response])

        assert.equal(await postApplication(new FormData()), response)
        assert.equal(state.calls, 2)
    })

    test('does not retry an error response, because the handler answered', async () => {
        const response = new Response(null, { status: 413 })
        const state = stubFetch([response])

        assert.equal(await postApplication(new FormData()), response)
        assert.equal(state.calls, 1)
    })

    test('reports the second failure when both attempts drop', async () => {
        const state = stubFetch([new TypeError('Load failed'), new TypeError('Failed to fetch')])

        await assert.rejects(postApplication(new FormData()), { message: 'Failed to fetch' })
        assert.equal(state.calls, 2)
    })
})

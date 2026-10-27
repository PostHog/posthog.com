/**
 * A network error during sourcing must not stop `gatsby develop`: the dev fetch cache serves
 * an old copy of the response, or retries once when it has none.
 *
 * Run: pnpm test:gatsby-utils
 */
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { beforeEach, describe, test } from 'node:test'

process.env.NODE_ENV = 'development'
process.env.TMPDIR = fs.mkdtempSync(path.join(os.tmpdir(), 'dev-fetch-cache-test-'))

const URL = 'https://example.com/api/roadmaps'
let calls = 0
let failures = 0

globalThis.fetch = async () => {
    calls++
    if (failures > 0) {
        failures--
        throw new TypeError('fetch failed')
    }
    return new Response('{"data":[]}', { status: 200 })
}

const { cacheFetchResponsesInDevelopment } = await import('./devFetchCache.ts')
cacheFetchResponsesInDevelopment()

const cacheDir = path.join(os.tmpdir(), 'posthog-com-dev-fetch-cache')

beforeEach(() => {
    calls = 0
    failures = 0
    fs.rmSync(cacheDir, { recursive: true, force: true })
    fs.mkdirSync(cacheDir, { recursive: true })
})

describe('cacheFetchResponsesInDevelopment', () => {
    test('serves an expired copy when the network fails', async () => {
        await fetch(URL)
        const [file] = fs.readdirSync(cacheDir)
        const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        fs.utimesSync(path.join(cacheDir, file), twoDaysAgo, twoDaysAgo)

        failures = 1
        const response = await fetch(URL)

        assert.equal(await response.text(), '{"data":[]}')
        assert.equal(calls, 2)
    })

    test('retries once when there is no copy', async () => {
        failures = 1
        const response = await fetch(URL)

        assert.equal(response.status, 200)
        assert.equal(calls, 2)
    })

    test('fails when the retry fails too', async () => {
        failures = 2
        await assert.rejects(fetch(URL), /fetch failed/)
    })
})

import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { test } from 'node:test'
import vm from 'node:vm'

const require = createRequire(import.meta.url)
const pluginSource = readFileSync(require.resolve('gatsby-source-ashby/gatsby-node.js'), 'utf8')
const postingInfo = { descriptionHtml: '<p>A job</p>' }

function sourceWithResponse(respond) {
    const nodes = []
    const requests = []
    const delays = []
    const plugin = {}
    const axios = {
        async request(options) {
            const endpoint = options.url.split('/').pop()
            if (endpoint === 'jobPosting.info') {
                requests.push(options)
                return respond(requests.length)
            }
            const results = endpoint === 'jobPosting.list' ? [{ id: 'posting', jobId: 'job' }] : []
            return { data: { success: true, results } }
        },
    }
    vm.runInNewContext(pluginSource, {
        exports: plugin,
        require: (name) => {
            assert.equal(name, 'axios')
            return axios
        },
        Buffer,
        setTimeout: (resolve, delay) => {
            delays.push(delay)
            resolve()
        },
    })
    return {
        nodes,
        requests,
        delays,
        run: () =>
            plugin.sourceNodes(
                { createContentDigest: () => 'digest', actions: { createNode: (node) => nodes.push(node) } },
                { apiKey: 'test-key' }
            ),
    }
}

for (const failure of [
    { response: { status: 502 } },
    { response: { status: 504 } },
    { code: 'ECONNRESET' },
    { code: 'ECONNABORTED' },
]) {
    test(`Ashby recovers from ${failure.response?.status || failure.code} before creating a posting`, async () => {
        const source = sourceWithResponse((attempt) => {
            if (attempt === 1) throw failure
            return { data: { success: true, results: postingInfo } }
        })
        await source.run()
        assert.equal(source.requests.length, 2)
        assert.deepEqual(source.delays, [1000])
        assert.equal(source.requests[0].timeout, 15000)
        assert.equal(source.nodes.length, 1)
        assert.equal(source.nodes[0].info, postingInfo)
    })
}

test('Ashby stops after three temporary failures without creating an incomplete posting', async () => {
    const source = sourceWithResponse(() => {
        throw { response: { status: 502 } }
    })
    await assert.rejects(source.run(), /jobPosting.info failed \(502\)/)
    assert.equal(source.requests.length, 3)
    assert.deepEqual(source.delays, [1000, 2000])
    assert.equal(source.nodes.length, 0)
})

test('Ashby does not retry authentication failures', async () => {
    const source = sourceWithResponse(() => {
        throw { response: { status: 401 } }
    })
    await assert.rejects(source.run(), /jobPosting.info failed \(401\)/)
    assert.equal(source.requests.length, 1)
    assert.equal(source.delays.length, 0)
    assert.equal(source.nodes.length, 0)
})

for (const data of [
    { success: false, errorInfo: { code: 'permission_denied' } },
    { success: true },
    { success: true, results: null },
]) {
    test(`Ashby rejects an unsuccessful or incomplete response: ${JSON.stringify(data)}`, async () => {
        const source = sourceWithResponse(() => ({ data }))
        await assert.rejects(source.run(), /jobPosting.info failed \((permission_denied|invalid response)\)/)
        assert.equal(source.requests.length, 1)
        assert.equal(source.delays.length, 0)
        assert.equal(source.nodes.length, 0)
    })
}

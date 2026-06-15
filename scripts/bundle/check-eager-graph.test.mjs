import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

import { measure } from './check-eager-graph.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const graph = JSON.parse(fs.readFileSync(path.join(__dirname, '__fixtures__', 'sample-graph.json'), 'utf-8'))

const appRoot = (overrides = {}) => [
    { entrypoint: 'app', label: 'app', budgetBytes: null, forbidden: [], ...overrides },
]

test('static closure excludes modules only reachable through a dynamic import', () => {
    const { roots } = measure(graph, appRoot())
    const r = roots[0]
    // a -> b -> d and a -> c are static; e and f hang off a dynamic import only.
    assert.equal(r.files, 4)
    assert.equal(r.bytes, 100 + 200 + 50 + 1000)
    const names = r.largest.map((l) => l.file)
    assert.ok(!names.includes('./src/templates/lazy-page.tsx'))
    assert.ok(!names.includes('../node_modules/monaco-editor/editor.js'))
})

test('overBudget is true only when the closure exceeds a set budget', () => {
    assert.equal(measure(graph, appRoot({ budgetBytes: 1000 }))['roots'][0].overBudget, true)
    assert.equal(measure(graph, appRoot({ budgetBytes: 2000 }))['roots'][0].overBudget, false)
    assert.equal(measure(graph, appRoot({ budgetBytes: null }))['roots'][0].overBudget, false)
})

test('forbidden hits fire for statically-reachable modules and not for dynamic-only ones', () => {
    const staticHit = measure(graph, appRoot({ forbidden: ['node_modules/heavy/'] }))['roots'][0]
    assert.equal(staticHit.forbiddenHits.length, 1)
    assert.deepEqual(staticHit.forbiddenHits[0].chain, [
        './.cache/production-app.js',
        './src/components/Shell.tsx',
        '../node_modules/heavy/index.js',
    ])

    const dynamicOnly = measure(graph, appRoot({ forbidden: ['monaco-editor'] }))['roots'][0]
    assert.equal(dynamicOnly.forbiddenHits.length, 0)
})

test('a missing entrypoint is recorded as an error, not a crash', () => {
    const report = measure(graph, appRoot({ entrypoint: 'does-not-exist' }))
    assert.equal(report.roots.length, 0)
    assert.equal(report.errors.length, 1)
    assert.match(report.errors[0], /not found in webpack graph/)
})

import test from 'node:test'
import assert from 'node:assert/strict'
import { evaluateCapacity, usage, recommendationEvents, previewMessages } from './fixtures.ts'

test('capacity evaluation distinguishes missing evidence from a failed recommendation', () => {
    assert.equal(evaluateCapacity(4, 2), false)
    assert.equal(evaluateCapacity(4, 4), true)
    assert.equal(evaluateCapacity(4, null), null)
    assert.equal(evaluateCapacity(null, 4), null)
    assert.equal(evaluateCapacity(0, 0), true)
})
test('illustrative conversation cost counts each generation once', () => {
    assert.deepEqual(
        usage.map((item) => item.cost),
        [1200, 1650, 1900]
    )
    assert.equal(
        usage.reduce((total, item) => total + item.cost, 0),
        4750
    )
})
test('a saved recommendation preserves the original attribution identities', () => {
    assert.equal(
        recommendationEvents(false).some((item) => item.event === 'stay_saved'),
        false
    )
    const events = recommendationEvents(true)
    assert.deepEqual(
        events.map((item) => item.event),
        ['recommendation_opened', 'stay_viewed', 'stay_saved']
    )
    assert.equal(
        new Set(events.map((item) => `${item.visitor}:${item.stay}:${item.generation}:${item.trace}:${item.session}`))
            .size,
        1
    )
})

test('opening preview shows the real current recommendation at every turn', () => {
    const first = previewMessages(2).filter((message) => message.recommendation)
    assert.equal(first.length, 1)
    assert.equal(first[0].recommendation?.id, 'stay-01')
    assert.equal(first[0].content, 'Adiron-shack looks like a fit.')
    const beach = previewMessages(4).filter((message) => message.recommendation)
    assert.equal(beach.length, 1)
    assert.equal(beach[0].recommendation?.id, 'stay-02')
    const completed = previewMessages(6)
    assert.equal(completed.length, 6)
    assert.equal(completed.filter((message) => message.recommendation).length, 1)
    assert.match(completed[5].recommendationDescription ?? '', /beach access and full kitchen/)
})

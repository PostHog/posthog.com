import assert from 'node:assert/strict'
import test from 'node:test'
import { emptyRanking, insertionBefore, moveHog, parseRanking, serializeRanking } from './state.ts'

test('moving a hog between tiers, within a tier, and back to the tray preserves uniqueness', () => {
    const initial = { ...emptyRanking(), S: ['angel', 'judge'], B: ['chef'] }
    const moved = moveHog(initial, 'angel', 'B', 'chef')
    assert.deepEqual(moved.B, ['angel', 'chef'])
    assert.deepEqual(moved.S, ['judge'])
    assert.deepEqual(moveHog(moved, 'chef', 'B', 'angel').B, ['chef', 'angel'])
    assert.deepEqual(moveHog(moved, 'angel', 'tray').B, ['chef'])
    assert.deepEqual(initial.S, ['angel', 'judge'])
})

test('saved rankings round trip titles and a subset of hoggies', () => {
    const ranking = { ...emptyRanking(), S: ['angel'], D: ['chef'] }
    const title = 'Sarah’s hogs 🦔 & friends / #1'
    assert.deepEqual(parseRanking(serializeRanking(title, ranking), new Set(['angel', 'chef', 'judge'])), {
        title,
        ranking,
    })
})

test('malformed, oversized, and incompatible saved rankings are rejected', () => {
    for (const value of [
        '%zz',
        'null',
        '%'.repeat(30001),
        encodeURIComponent(JSON.stringify({ v: 2, title: 'test', rows: [] })),
        encodeURIComponent(JSON.stringify({ v: 1, title: 'test', rows: [[], [], {}, [], []] })),
    ]) {
        assert.equal(parseRanking(value, new Set()), null)
    }
})

test('unknown or duplicated assets never enter restored rankings', () => {
    const payload = encodeURIComponent(
        JSON.stringify({ v: 1, title: 'test', rows: [['angel', 'missing', 5], ['angel', 'chef'], [], [], []] })
    )
    assert.deepEqual(parseRanking(payload, new Set(['angel', 'chef']))?.ranking, {
        S: ['angel'],
        A: ['chef'],
        B: [],
        C: [],
        D: [],
    })
})

test('drop positions insert before, between, or after hoggies while ignoring the dragged tile', () => {
    const ranking = { ...emptyRanking(), S: ['angel', 'judge', 'chef'] }
    const slots = [
        { slug: 'angel', midpoint: 25 },
        { slug: 'judge', midpoint: 75 },
        { slug: 'chef', midpoint: 125 },
    ]
    assert.deepEqual(moveHog(ranking, 'chef', 'S', insertionBefore(slots, 10, 'chef')).S, ['chef', 'angel', 'judge'])
    assert.deepEqual(moveHog(ranking, 'chef', 'S', insertionBefore(slots, 50, 'chef')).S, ['angel', 'chef', 'judge'])
    assert.deepEqual(moveHog(ranking, 'angel', 'S', insertionBefore(slots, 100, 'angel')).S, ['judge', 'angel', 'chef'])
    assert.deepEqual(moveHog(ranking, 'angel', 'S', insertionBefore(slots, 150, 'angel')).S, ['judge', 'chef', 'angel'])
    assert.deepEqual(moveHog(ranking, 'judge', 'S', insertionBefore(slots, 75, 'judge')).S, ranking.S)
})

import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
    BELLY,
    BOARD_ASPECT,
    CAST_SIZE,
    covers,
    dailySeed,
    generateBoard,
    HAT_LEVEL,
    HEAD,
    lookKey,
    MIX_LEVEL,
} from './generator.ts'
import type { Board, TraitOptions } from './generator.ts'

// The same shape as the lists in @posthog/hedgehog-mode, so this test never loads pixi.js.
const hat = { group: 'headwear' }
const OPTIONS: TraitOptions = {
    skins: ['default', 'spiderhog', 'robohog', 'hogzilla', 'ghost', 'pig'],
    accessories: { beret: hat, cap: hat, cowboy: hat, tophat: hat, party: hat, glasses: { group: 'eyewear' } },
}

const everyBoard = (check: (board: Board, where: string) => void) => {
    for (let seed = 1; seed <= 100; seed++) {
        for (const level of [1, 2, 3, 4, 5, 6, 12]) {
            check(generateBoard(seed, level, OPTIONS), `seed ${seed}, level ${level}`)
        }
    }
}

test('the same seed builds the same board, and another seed builds another', () => {
    assert.deepEqual(generateBoard(42, 3, OPTIONS), generateBoard(42, 3, OPTIONS))
    assert.notDeepEqual(generateBoard(42, 3, OPTIONS), generateBoard(43, 3, OPTIONS))
})

test('exactly one hog looks like the suspect, among three other kinds of hog', () => {
    everyBoard((board, where) => {
        const kinds = board.hogs.map((hog) => lookKey(hog.look))
        assert.equal(kinds.filter((kind) => kind === lookKey(board.target.look)).length, 1, where)
        assert.equal(new Set(kinds).size, CAST_SIZE, where)
    })
})

test('levels get harder: four skins, then four hats, then two skins mixed with two hats', () => {
    everyBoard((board, where) => {
        const skins = new Set(board.hogs.map((hog) => hog.look.skin))
        const hats = new Set(board.hogs.map((hog) => hog.look.hat))
        const expected = board.level < HAT_LEVEL ? [4, 1] : board.level < MIX_LEVEL ? [1, 4] : [2, 2]
        assert.deepEqual([skins.size, hats.size], expected, where)
        // No hats on the skin levels. After that every hog has one, and glasses are not a hat.
        assert.equal(hats.has(null), board.level < HAT_LEVEL, where)
        assert.ok(!hats.has('glasses'), where)
    })
    const count = (level: number) => generateBoard(1, level, OPTIONS).hogs.length
    assert.deepEqual([count(1), count(5), count(8), count(30)], [81, 182, 272, 272])
})

test('every hog is on the board, and no hog painted above it covers its head', () => {
    everyBoard((board, where) => {
        assert.notEqual(board.logoHogId, board.target.id, where)
        board.hogs.forEach((hog, index) => {
            const half = hog.size / 2
            assert.ok(hog.x >= half && hog.x <= 100 - half, `${where}: hog ${hog.id} x ${hog.x}`)
            assert.ok(hog.y >= half * BOARD_ASPECT && hog.y <= 100 - half * BOARD_ASPECT, `${where}: hog ${hog.id}`)
            // The hog with the logo also needs its belly in view, on either side: the hog can be flipped.
            const spots = hog.id === board.logoHogId ? [HEAD, BELLY, { ...BELLY, x: 1 - BELLY.x }] : [HEAD]
            for (const spot of spots) {
                assert.ok(covers(hog, hog, spot), `${where}: hog ${hog.id} does not take its own click`)
                for (const above of board.hogs.slice(index + 1)) {
                    assert.ok(!covers(above, hog, spot), `${where}: hog ${above.id} covers hog ${hog.id}`)
                }
            }
        })
    })
})

test('the daily seed is the UTC date: the same everywhere, and new at UTC midnight', () => {
    assert.equal(dailySeed(new Date(Date.UTC(2026, 10, 18, 23, 59))), 20261118)
    assert.equal(dailySeed(new Date(Date.UTC(2026, 10, 19, 0, 0))), 20261119)
    // The same moment for a player in Costa Rica (UTC-6) and a player in Berlin (UTC+1).
    assert.equal(dailySeed(new Date('2026-11-18T19:30:00-06:00')), dailySeed(new Date('2026-11-19T02:30:00+01:00')))
    assert.equal(dailySeed(new Date(Date.UTC(2027, 0, 1))), 20270101)
})

/**
 * Wistia player teardown.
 *
 * Run: pnpm test:wistia
 */
import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { removeWistiaPlayer } from './wistia.ts'

describe('removeWistiaPlayer', () => {
    test('unregisters the player with the vendor script', () => {
        let removed = 0
        removeWistiaPlayer({ remove: () => removed++ })
        assert.equal(removed, 1)
    })

    test('stays quiet when there is no player', () => {
        assert.doesNotThrow(() => removeWistiaPlayer(null))
        assert.doesNotThrow(() => removeWistiaPlayer(undefined))
    })

    test('swallows a vendor error so unmount finishes', () => {
        assert.doesNotThrow(() =>
            removeWistiaPlayer({
                remove: () => {
                    throw new Error('player already destroyed')
                },
            })
        )
    })
})

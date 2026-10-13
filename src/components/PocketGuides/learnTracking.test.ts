import assert from 'node:assert/strict'
import test from 'node:test'

import { isReaderWindowActive, twigLearnUrl } from './learnTracking.ts'

const twigUrl = 'https://twig.example'

test('an opted-out visitor reaches Twig without an identity handoff', () => {
    const url = twigLearnUrl(
        {
            has_opted_out_capturing: () => true,
            get_distinct_id: () => {
                throw new Error('Opted-out identity must not be read')
            },
        },
        twigUrl
    )
    assert.equal(url, twigUrl)
})

test('a missing opt-out check or visitor ID cannot start a handoff', () => {
    assert.equal(twigLearnUrl({ get_distinct_id: () => 'visitor' }, twigUrl), twigUrl)
    assert.equal(twigLearnUrl({ has_opted_out_capturing: () => false }, twigUrl), twigUrl)
})

test('a consenting visitor carries their website visitor and session IDs to Twig', () => {
    const url = new URL(
        twigLearnUrl(
            {
                has_opted_out_capturing: () => false,
                get_distinct_id: () => 'visitor',
                get_session_id: () => 'session',
            },
            twigUrl
        )
    )
    assert.deepEqual(Object.fromEntries(new URLSearchParams(url.hash.slice(1))), {
        learn_source: 'product-analytics',
        distinct_id: 'visitor',
        session_id: 'session',
    })
})

test('a chapter pauses while its reader is behind another window or minimized', () => {
    const reader = { key: 'reader', zIndex: 1, minimized: false }
    const other = { key: 'other', zIndex: 2, minimized: false }
    assert.equal(isReaderWindowActive([reader, other], reader.key), false)
    assert.equal(isReaderWindowActive([reader, { ...other, minimized: true }], reader.key), true)
    assert.equal(isReaderWindowActive([{ ...reader, minimized: true }, other], reader.key), false)
    assert.equal(isReaderWindowActive([reader, other], other.key), true)
})

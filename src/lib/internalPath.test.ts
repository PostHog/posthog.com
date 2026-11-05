import assert from 'node:assert/strict'
import test from 'node:test'
import { getSharedWindows } from './internalPath.ts'

const sharedWindow = (path: unknown) => ({ path, size: { width: '50', height: '50' }, position: { x: '10', y: '10' } })

test('shared windows keep only same-origin paths', () => {
    const safe = [sharedWindow('/docs/feature-flags'), sharedWindow('/pricing?tab=cloud#faq')]
    const unsafe = [
        'javascript:alert(document.domain)',
        'JavaScript:alert(1)',
        'data:text/html,<script>alert(1)</script>',
        'https://example.com',
        '//example.com',
        '/\\example.com',
        '/\t/example.com',
        '/\n/example.com',
        ['javascript:alert(1)'],
        undefined,
    ].map(sharedWindow)

    assert.deepEqual(getSharedWindows([unsafe[0], ...safe, ...unsafe.slice(1), '/docs', null]), safe)
})

test('shared windows ignore a windows param that is not an array', () => {
    for (const windows of [undefined, '/docs', { 21: sharedWindow('/docs') }]) {
        assert.deepEqual(getSharedWindows(windows), [])
    }
})

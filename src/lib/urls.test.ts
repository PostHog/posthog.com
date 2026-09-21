/**
 * Run: pnpm test:urls
 */
import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { withPostHogUtmSource } from './urls.ts'

describe('withPostHogUtmSource', () => {
    test('keeps an existing query string and adds one parameter', () => {
        assert.equal(
            withPostHogUtmSource('https://app.dover.com/apply/SigNoz/1234?rs=76643084'),
            'https://app.dover.com/apply/SigNoz/1234?rs=76643084&utm_source=posthog'
        )
    })

    test('adds a path separator when the URL has no path', () => {
        assert.equal(withPostHogUtmSource('https://signoz.io'), 'https://signoz.io/?utm_source=posthog')
    })

    test('replaces a tracking parameter that is already there', () => {
        assert.equal(
            withPostHogUtmSource('https://example.com/jobs?utm_source=other'),
            'https://example.com/jobs?utm_source=posthog'
        )
    })

    test('keeps the fragment at the end', () => {
        assert.equal(
            withPostHogUtmSource('https://example.com/jobs?a=1#role'),
            'https://example.com/jobs?a=1&utm_source=posthog#role'
        )
    })

    test('returns a URL it cannot parse unchanged', () => {
        assert.equal(withPostHogUtmSource('signoz.io'), 'signoz.io')
    })
})

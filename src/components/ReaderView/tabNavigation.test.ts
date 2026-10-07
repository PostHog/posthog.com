import assert from 'node:assert/strict'
import test from 'node:test'

import { shouldNavigateMenuTab } from './tabNavigation.ts'

test('an inactive tab with an href navigates', () => {
    assert.equal(
        shouldNavigateMenuTab({
            href: '/docs/product-analytics/learn',
            tabValue: 'learn',
            activeTab: 'docs',
            currentPath: '/docs/product-analytics',
        }),
        true
    )
})

test('an active tab stays put unless active navigation is enabled', () => {
    assert.equal(
        shouldNavigateMenuTab({
            href: '/docs/product-analytics/learn',
            tabValue: 'learn',
            activeTab: 'learn',
            currentPath: '/docs/product-analytics/learn/introduction',
        }),
        false
    )
})

test('the active Learn tab returns a guide reader to the Learn landing', () => {
    assert.equal(
        shouldNavigateMenuTab({
            href: '/docs/product-analytics/learn',
            tabValue: 'learn',
            activeTab: 'learn',
            navigateOnActiveClick: true,
            currentPath: '/docs/product-analytics/learn/introduction/',
        }),
        true
    )
})

test('the active Learn tab does not reload its landing', () => {
    assert.equal(
        shouldNavigateMenuTab({
            href: '/docs/product-analytics/learn',
            tabValue: 'learn',
            activeTab: 'learn',
            navigateOnActiveClick: true,
            currentPath: '/docs/product-analytics/learn/',
        }),
        false
    )
})

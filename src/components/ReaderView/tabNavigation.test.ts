import assert from 'node:assert/strict'
import test from 'node:test'

import { shouldNavigateMenuTab } from './tabNavigation.ts'

test('an inactive tab with an href navigates', () => {
    assert.equal(
        shouldNavigateMenuTab({
            href: '/learn/product-analytics',
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
            href: '/learn/product-analytics',
            tabValue: 'learn',
            activeTab: 'learn',
            currentPath: '/learn/product-analytics/pocket-guide',
        }),
        false
    )
})

test('the active Learn tab returns a guide reader to the Learn landing', () => {
    assert.equal(
        shouldNavigateMenuTab({
            href: '/learn/product-analytics',
            tabValue: 'learn',
            activeTab: 'learn',
            navigateOnActiveClick: true,
            currentPath: '/learn/product-analytics/pocket-guide/',
        }),
        true
    )
})

test('the active Learn tab does not reload its landing', () => {
    assert.equal(
        shouldNavigateMenuTab({
            href: '/learn/product-analytics',
            tabValue: 'learn',
            activeTab: 'learn',
            navigateOnActiveClick: true,
            currentPath: '/learn/product-analytics/',
        }),
        false
    )
})

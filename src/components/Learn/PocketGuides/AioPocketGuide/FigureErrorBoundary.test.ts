import '../../TwigExhibits/twigTestLoader.mjs'

import assert from 'node:assert/strict'
import { after, afterEach, test } from 'node:test'
import React, { act, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { JSDOM } from 'jsdom'

const { default: FigureErrorBoundary } = await import('./FigureErrorBoundary.tsx')

const dom = new JSDOM('<!doctype html><div id="root"></div>')
Object.assign(globalThis, {
    window: dom.window,
    document: dom.window.document,
    IS_REACT_ACT_ENVIRONMENT: true,
})
const container = document.getElementById('root')!
let root: ReturnType<typeof createRoot> | undefined

function chapter(Figure: React.ComponentType): React.ReactElement {
    return React.createElement(
        'article',
        null,
        React.createElement('h1', null, 'Online evaluations'),
        React.createElement(
            FigureErrorBoundary,
            null,
            React.createElement(Suspense, { fallback: null }, React.createElement(Figure))
        ),
        React.createElement('p', null, 'The chapter continues.'),
        React.createElement(FigureErrorBoundary, null, React.createElement('div', null, 'Another figure'))
    )
}

afterEach(() => {
    act(() => root?.unmount())
    root = undefined
    Reflect.deleteProperty(window, 'posthog')
})
after(() => dom.window.close())

test('a rejected figure import leaves chapter prose and other figures mounted', async (context) => {
    // React reports caught render failures to the console in development.
    context.mock.method(console, 'error', () => {})
    const error = new Error('Chunk download failed')
    const captureException = context.mock.fn()
    Object.defineProperty(window, 'posthog', { configurable: true, value: { captureException } })
    const Figure = lazy(() => Promise.reject(error))
    await act(async () => {
        root = createRoot(container)
        root.render(chapter(Figure))
    })
    assert.equal(container.querySelector('h1')?.textContent, 'Online evaluations')
    assert.equal(
        container.querySelector('[role="status"]')?.textContent,
        'This example couldn’t load. Refresh to try again.'
    )
    assert.match(container.textContent!, /The chapter continues\./)
    assert.match(container.textContent!, /Another figure/)
    assert.equal(captureException.mock.callCount(), 1)
    assert.equal(captureException.mock.calls[0].arguments[0], error)
})

test('a successful lazy import renders the figure without an error message', async () => {
    const Figure = lazy(async () => ({ default: () => React.createElement('div', null, 'Loaded example') }))
    await act(async () => {
        root = createRoot(container)
        root.render(chapter(Figure))
    })
    assert.match(container.textContent!, /Loaded example/)
    assert.equal(container.querySelector('[role="status"]'), null)
})

test('a render failure keeps the fallback usable when PostHog is unavailable', async (context) => {
    context.mock.method(console, 'error', () => {})
    function BrokenFigure(): React.ReactElement {
        throw new Error('Figure render failed')
    }
    await act(async () => {
        root = createRoot(container)
        root.render(chapter(BrokenFigure))
    })
    assert.match(container.querySelector('[role="status"]')!.textContent!, /couldn’t load/)
    assert.match(container.textContent!, /The chapter continues\./)
})

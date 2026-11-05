import './twigTestLoader.mjs'

import assert from 'node:assert/strict'
import { after, afterEach, test } from 'node:test'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import { JSDOM } from 'jsdom'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import tailwindConfig from '../../../../tailwind.config.js'

// These are deliberately real package imports. A local view mock would hide the
// missing /compact and /compact.css exports in an incompatible release.
import { filterStays } from '@posthog/twig-components/catalog'

const { default: TwigBrowseFigure } = await import('./TwigBrowseFigure.tsx')
const { IdentifySavedStayFigure, ResetIdentityFigure } = await import('./ProductAnalyticsIdentityExhibits.tsx')
const { SavedStayJourneyFigure } = await import('./ProductAnalyticsRetentionExhibits.tsx')

const dom = new JSDOM('<!doctype html><div id="root"></div>', { url: 'http://localhost/', pretendToBeVisual: true })
Object.assign(globalThis, {
    window: dom.window,
    document: dom.window.document,
    HTMLElement: dom.window.HTMLElement,
    IS_REACT_ACT_ENVIRONMENT: true,
})
// Compile the real positioning utilities so the cursor regression checks CSS
// behavior rather than a particular class name. Layout bounds are browser-tested.
const cursorStyles = await postcss([
    tailwindcss({
        ...tailwindConfig,
        content: [{ raw: readFileSync(new URL('./ProductAnalyticsRetentionExhibits.tsx', import.meta.url), 'utf8') }],
        corePlugins: ['position', 'inset'],
        plugins: [],
    }),
]).process('@tailwind utilities', { from: undefined })
const style = document.createElement('style')
style.textContent = cursorStyles.css
document.head.append(style)
dom.window.matchMedia = () => ({ matches: false } as MediaQueryList)
const container = document.getElementById('root')!
let root: ReturnType<typeof createRoot> | undefined

function render(component: React.ReactElement): void {
    act(() => {
        root ??= createRoot(container)
        root.render(component)
    })
}

function click(selector: string): void {
    const element = container.querySelector<HTMLElement>(selector)
    assert.ok(element, `Missing interactive element: ${selector}`)
    act(() => element.click())
}

function reset(): void {
    const button = [...container.querySelectorAll('button')].find((element) => element.textContent?.trim() === 'Reset')
    assert.ok(button, 'Missing reset control')
    act(() => button.click())
}

afterEach(() => {
    act(() => root?.unmount())
    root = undefined
})
after(() => dom.window.close())

test('compact CSS and its relative assets exist in the installed package', () => {
    for (const stylesheet of ['catalog.css', 'compact.css']) {
        const url = import.meta.resolve(`@posthog/twig-components/${stylesheet}`)
        const css = readFileSync(fileURLToPath(url), 'utf8')
        for (const match of css.matchAll(/url\(["']?(\.\/[^"')]+)["']?\)/g)) {
            assert.ok(readFileSync(new URL(match[1], url)).length, `Missing stylesheet asset: ${match[1]}`)
        }
    }
})

test('destination filters retain result-count instrumentation without a visible count', () => {
    const events: Array<[string, number]> = []
    render(React.createElement(TwigBrowseFigure, { id: 'test-browse', onFilter: (...event) => events.push(event) }))
    assert.equal(container.querySelector('[aria-pressed="true"]')?.textContent, 'Forest')
    for (const setting of ['City', 'Coast', 'Forest'] as const) {
        click(`button[data-replay-label="Filter: ${setting}"]`)
        assert.equal(container.querySelector('[aria-pressed="true"]')?.textContent, setting)
        assert.deepEqual(events.at(-1), [setting, filterStays(setting, '').length])
    }
    assert.equal(container.querySelectorAll('.twig-compact-stay').length, 1)
    assert.doesNotMatch(container.textContent!, /\d+\s+(?:results?|stays? found)/i)
})

test('controlled destination changes follow the host without sending another event', () => {
    let calls = 0
    const onFilter = () => calls++
    render(React.createElement(TwigBrowseFigure, { id: 'test-controlled', controlledSetting: 'City', onFilter }))
    click('button[data-replay-label="Filter: Coast"]')
    assert.equal(calls, 1)
    assert.equal(container.querySelector('[aria-pressed="true"]')?.textContent, 'City')
    render(React.createElement(TwigBrowseFigure, { id: 'test-controlled', controlledSetting: 'Forest', onFilter }))
    assert.equal(container.querySelector('[aria-pressed="true"]')?.textContent, 'Forest')
    assert.equal(calls, 1)
})

test('identity figure signs in, saves locally, and resets with shared account styling', () => {
    render(React.createElement(IdentifySavedStayFigure))
    click('.twig-saved-stay-button')
    const form = container.querySelector('form')!
    act(() => form.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true })))
    assert.match(container.textContent!, /user_812/)
    click('.twig-saved-stay-button')
    const saved = container.querySelector('.twig-account-page')!
    assert.ok(saved.closest('.twig-compact .twig-account-layout'), 'Saved stays need the shared account tokens')
    const link = saved.querySelector('a')!
    const event = new dom.window.MouseEvent('click', { bubbles: true, cancelable: true })
    act(() => link.dispatchEvent(event))
    assert.equal(event.defaultPrevented, true, 'The teaching figure must keep navigation local')
    reset()
    assert.equal(container.querySelector('.twig-account-page'), null)
    assert.match(container.textContent!, /anon_7f3/)
    assert.equal(container.querySelectorAll('.twig-saved-stay-button').length, 1)
})

test('profile menu handles Escape, logout, and reset', () => {
    render(React.createElement(ResetIdentityFigure))
    const trigger = container.querySelector<HTMLButtonElement>('.twig-profile-trigger')!
    click('.twig-profile-trigger')
    assert.equal(trigger.getAttribute('aria-expanded'), 'true')
    act(() => document.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })))
    assert.equal(trigger.getAttribute('aria-expanded'), 'false')
    assert.equal(document.activeElement, trigger)
    click('.twig-profile-trigger')
    click('.twig-profile-signout')
    assert.equal(container.querySelector('.twig-profile-trigger'), null)
    assert.match(container.textContent!, /anon_9k4/)
    reset()
    assert.ok(container.querySelector('.twig-profile-trigger'))
    assert.ok(container.querySelector('.twig-account-page')?.closest('.twig-account-layout'))
})

test('saved-stay journey preserves local navigation and account styling', (context) => {
    context.mock.timers.enable({ apis: ['setTimeout'] })
    render(React.createElement(SavedStayJourneyFigure))
    const visitorLabel = () =>
        [...container.querySelectorAll('span')].find((span) => span.textContent === 'Twig visitor')
    const expectLabelRightOfCursor = () => {
        const label = visitorLabel()
        assert.ok(label, 'The visitor label must be visible during the booking preview')
        const left = dom.window.getComputedStyle(label).left
        const offset = parseFloat(left) * (left.endsWith('rem') ? 16 : 1)
        const cursor = label.parentElement?.querySelector('svg')
        assert.ok(cursor, 'The visitor label must belong to its cursor')
        const cursorWidth = Number(cursor.getAttribute('width'))
        assert.ok(offset >= cursorWidth, 'The label must sit to the right of the cursor near the left-hand bookmark')
    }
    expectLabelRightOfCursor()
    click('.twig-saved-stay-button')
    act(() => context.mock.timers.tick(320))
    const saved = container.querySelector('.twig-account-page')!
    assert.ok(saved, 'Saving must show the saved-stay page')
    assert.equal(visitorLabel(), undefined, 'The saved-stay page keeps its cursor label hidden')
    assert.ok(saved.closest('.twig-compact .twig-account-layout'), 'Saved stays need the shared account tokens')
    click('.twig-account-stay-card a')
    act(() => context.mock.timers.tick(320))
    assert.equal(container.querySelector('.twig-account-page'), null)
    expectLabelRightOfCursor()
    click('.vac-primary')
    act(() => context.mock.timers.tick(320))
    assert.match(container.textContent!, /Booking confirmed/)
    reset()
    assert.ok(container.querySelector('.twig-saved-stay-button'))
    assert.doesNotMatch(container.textContent!, /Booking confirmed/)
})

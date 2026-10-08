import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import test from 'node:test'
import { runInNewContext } from 'node:vm'
import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import { JSDOM } from 'jsdom'
import ts from 'typescript'

test('sharing uses the current theme, copies the laptop link, shares a prepared file, and offers download without native sharing', async () => {
    const dom = new JSDOM('<body class="dark"><div id="root"></div></body>', {
        url: 'https://posthog.example',
        pretendToBeVisual: true,
    })
    const globals = [
        'window',
        'document',
        'Node',
        'NodeFilter',
        'HTMLElement',
        'HTMLInputElement',
        'Element',
        'MutationObserver',
        'CustomEvent',
        'getComputedStyle',
    ]
    const previous = globals.map((key) => [key, globalThis[key]])
    for (const key of globals) globalThis[key] = key === 'window' ? dom.window : dom.window[key]
    globalThis.IS_REACT_ACT_ENVIRONMENT = true
    const require = createRequire(import.meta.url)
    const source = ts.transpileModule(readFileSync(new URL('./ShareLaptop.tsx', import.meta.url), 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true },
    }).outputText
    let copied = ''
    let shared: { files: File[] } | undefined
    let downloaded = ''
    let revoked = 0
    let fail = false
    const navigator = {
        canShare: () => true,
        share: async (data) => {
            shared = data
        },
        clipboard: {
            writeText: async (text) => {
                copied = text
            },
        },
    }
    dom.window.HTMLAnchorElement.prototype.click = function () {
        downloaded = this.download
    }
    const exports = {} as { default: React.ComponentType<{ profileId: number }> }
    runInNewContext(source, {
        exports,
        window: dom.window,
        document: dom.window.document,
        navigator,
        AbortController,
        File: dom.window.File,
        Error,
        URL: {
            createObjectURL: () => 'blob:laptop',
            revokeObjectURL: () => {
                revoked++
            },
        },
        fetch: async (url) => {
            assert.match(url, /profileId=42&format=png&theme=dark/)
            return {
                ok: !fail,
                headers: { get: () => 'image/png' },
                blob: async () => new dom.window.Blob(['png'], { type: 'image/png' }),
            }
        },
        require: (name) => {
            if (name === 'components/OSButton')
                return function MockOSButton({ variant, size, ...props }) {
                    return React.createElement('button', props)
                }
            if (name === '@posthog/icons') return { IconX: () => null }
            return require(name)
        },
    })
    const root = createRoot(dom.window.document.getElementById('root')!)
    const button = (text) =>
        [...dom.window.document.querySelectorAll('button')].find(
            (el) => el.textContent === text || el.getAttribute('aria-label') === text
        )!
    const click = (text) => act(async () => button(text).click())
    try {
        await act(async () => root.render(React.createElement(exports.default, { profileId: 42 })))
        await click('Share laptop')
        assert.equal(dom.window.document.querySelector('img')?.src, 'blob:laptop')
        await click('Copy link')
        assert.equal(copied, 'https://posthog.example/community/laptops/42?theme=dark')
        await click('Share image')
        assert.equal(shared?.files[0].name, 'posthog-laptop-42.png')
        await click('Download PNG')
        assert.equal(downloaded, 'posthog-laptop-42.png')
        await click('Close sharing')
        assert.equal(revoked, 1)
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 10))
        })
        assert.ok(
            dom.window.document.activeElement === button('Share laptop'),
            'Closing the dialog restores focus to Share laptop'
        )
        navigator.canShare = () => false
        fail = true
        await click('Share laptop')
        assert.match(dom.window.document.querySelector('[role="alert"]')?.textContent || '', /Could not prepare/)
        assert.equal(button('Share image'), undefined)
        assert.equal(button('Download PNG').disabled, true)
        fail = false
        await click('Try again')
        assert.equal(button('Download PNG').disabled, false)
        assert.equal(button('Share image'), undefined)
    } finally {
        await act(async () => root.unmount())
        await new Promise((resolve) => setTimeout(resolve, 10))
        dom.window.close()
        for (const [key, value] of previous) globalThis[key] = value
        globalThis.IS_REACT_ACT_ENVIRONMENT = false
    }
})

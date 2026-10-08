import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import test from 'node:test'
import { runInNewContext } from 'node:vm'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import { JSDOM } from 'jsdom'
import ts from 'typescript'

test('foil follows the pointer, respects reduced motion, and can be omitted for backing and stains', async () => {
    const dom = new JSDOM('<div id="root"></div>')
    const previousWindow = globalThis.window
    const previousDocument = globalThis.document
    Object.assign(globalThis, { window: dom.window, document: dom.window.document, IS_REACT_ACT_ENVIRONMENT: true })
    dom.window.requestAnimationFrame = (callback) => {
        callback(0)
        return 1
    }
    dom.window.cancelAnimationFrame = () => undefined
    let reducedMotion = false
    const require = createRequire(import.meta.url)
    const code = ts.transpileModule(readFileSync(new URL('./stickers.tsx', import.meta.url), 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true },
    }).outputText
    const sticker = { id: 1, name: 'Foil', imageUrl: 'https://example.com/sticker.png', holographic: true }
    const exports = {} as { StickerArtwork: React.ComponentType<{ sticker: typeof sticker; finish?: boolean }> }
    runInNewContext(code, {
        exports,
        window: dom.window,
        URL,
        require: (name: string) => {
            if (name === 'lib/strapi') return { SQUEAK_HOST: 'http://localhost:1337' }
            if (name === 'components/Stickers/Stickers') return {}
            if (name === 'framer-motion') return { useReducedMotion: () => reducedMotion }
            return require(name)
        },
    })
    const root = createRoot(dom.window.document.getElementById('root')!)
    const render = (finish = true) =>
        act(async () =>
            root.render(
                React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(exports.StickerArtwork, { sticker, finish }),
                    React.createElement(exports.StickerArtwork, { sticker, finish })
                )
            )
        )
    const move = (clientX: number) => dom.window.dispatchEvent(new dom.window.MouseEvent('pointermove', { clientX }))
    try {
        await render()
        const filters = [...dom.window.document.querySelectorAll('filter')]
        assert.equal(filters.length, 2)
        assert.notEqual(filters[0].id, filters[1].id)
        const reflection = dom.window.document.querySelector('feImage')!
        const initial = reflection.getAttribute('x')
        move(0)
        assert.notEqual(reflection.getAttribute('x'), initial)
        reducedMotion = true
        await render()
        const frozen = reflection.getAttribute('x')
        move(800)
        assert.equal(reflection.getAttribute('x'), frozen)
        await render(false)
        assert.equal(dom.window.document.querySelectorAll('filter').length, 0)
        assert.equal(dom.window.document.querySelector('img')?.style.filter, '')
        assert.equal(dom.window.document.querySelector('img')?.src, sticker.imageUrl)
        sticker.holographic = false
        await render()
        assert.equal(dom.window.document.querySelectorAll('filter').length, 0)
    } finally {
        await act(async () => root.unmount())
        dom.window.close()
        Object.assign(globalThis, {
            window: previousWindow,
            document: previousDocument,
            IS_REACT_ACT_ENVIRONMENT: false,
        })
    }
})

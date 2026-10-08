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

const require = createRequire(import.meta.url)
const code = ts.transpileModule(readFileSync(new URL('./useUser.tsx', import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true },
}).outputText

test('startup completes, preserves login on outages, and rejects invalid credentials', async (t) => {
    const user = { id: 1, profile: { id: 1 }, role: { type: 'authenticated' } }
    for (const scenario of ['offline', 'server error', 'invalid token', 'notifications offline']) {
        await t.test(scenario, async () => {
            const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost:8001' })
            const previousWindow = globalThis.window
            const previousDocument = globalThis.document
            Object.assign(globalThis, {
                window: dom.window,
                document: dom.window.document,
                IS_REACT_ACT_ENVIRONMENT: true,
            })
            dom.window.localStorage.setItem('jwt', 'saved-token')
            const toasts: unknown[] = []
            const exports: any = {}
            runInNewContext(code, {
                exports,
                localStorage: dom.window.localStorage,
                console: { error: () => undefined },
                fetch: async (url: string) => {
                    if (scenario === 'offline' || url.endsWith('/notifications')) throw new TypeError('Failed to fetch')
                    if (scenario === 'server error') return new Response('{}', { status: 503 })
                    if (scenario === 'invalid token') return new Response('{}', { status: 401 })
                    return new Response(JSON.stringify(user))
                },
                require: (name: string) => {
                    if (name === 'lib/strapi') return { SQUEAK_HOST: 'https://squeak.ngrok-free.app' }
                    if (name === './usePostHog' || name === 'components/Link') return () => null
                    if (name === '../context/Toast')
                        return { useToast: () => ({ addToast: (toast: unknown) => toasts.push(toast) }) }
                    return require(name)
                },
            })
            let session: any
            const Probe = () => {
                session = React.useContext(exports.UserContext)
                return null
            }
            const root = createRoot(dom.window.document.getElementById('root')!)
            try {
                await act(async () =>
                    root.render(React.createElement(exports.UserProvider, null, React.createElement(Probe)))
                )
                assert.equal(session.isValidating, false)
                assert.equal(
                    dom.window.localStorage.getItem('jwt'),
                    scenario === 'invalid token' ? null : 'saved-token'
                )
                assert.equal(session.user?.id ?? null, scenario === 'notifications offline' ? 1 : null)
                assert.equal(toasts.length, ['offline', 'server error'].includes(scenario) ? 1 : 0)
            } finally {
                await act(async () => root.unmount())
                dom.window.close()
                Object.assign(globalThis, { window: previousWindow, document: previousDocument })
                delete (globalThis as any).IS_REACT_ACT_ENVIRONMENT
            }
        })
    }
})

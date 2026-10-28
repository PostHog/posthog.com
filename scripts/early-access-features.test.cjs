const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const path = require('node:path')
const { test } = require('node:test')
const { runInNewContext } = require('node:vm')
const React = require('react')
const { act } = React
const { createRoot } = require('react-dom/client')
const { JSDOM } = require('jsdom')
const ts = require('typescript')

const feature = { name: 'Live feature', flagKey: 'live-feature', stage: 'beta', payload: {} }
const survey = {
    id: 'waitlist-survey',
    type: 'api',
    linked_flag_key: 'live-feature',
    start_date: '2026-01-01',
    questions: [{ id: 'waitlist-question' }],
}

function queuedSdk() {
    const queue = []
    for (const method of ['getEarlyAccessFeatures', 'getSurveys']) {
        queue[method] = (...args) => queue.push([method, ...args])
    }
    return queue
}

function readySdk() {
    return {
        __loaded: true,
        getEarlyAccessFeatures: (callback) => queueMicrotask(() => callback([feature])),
        getSurveys: (callback) => queueMicrotask(() => callback([survey])),
    }
}

function mount(t, sdk) {
    t.mock.timers.enable({ apis: ['setTimeout', 'setInterval'] })
    const dom = new JSDOM('<div id="root"></div>', { url: 'https://website.example' })
    dom.window.posthog = sdk
    const descriptors = new Map(
        ['window', 'document', 'IS_REACT_ACT_ENVIRONMENT'].map((key) => [
            key,
            Object.getOwnPropertyDescriptor(globalThis, key),
        ])
    )
    Object.assign(globalThis, { window: dom.window, document: dom.window.document, IS_REACT_ACT_ENVIRONMENT: true })
    const root = createRoot(dom.window.document.getElementById('root'))
    t.after(() => {
        act(() => root.unmount())
        dom.window.close()
        t.mock.timers.reset()
        for (const [key, descriptor] of descriptors) {
            if (descriptor) Object.defineProperty(globalThis, key, descriptor)
            else Reflect.deleteProperty(globalThis, key)
        }
    })
    const load = (file, dependencies) => {
        const { outputText } = ts.transpileModule(readFileSync(path.resolve(__dirname, '..', file), 'utf8'), {
            compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
        })
        const exports = {}
        runInNewContext(outputText, {
            exports,
            window: dom.window,
            setTimeout,
            clearTimeout,
            setInterval,
            clearInterval,
            require: (name) => {
                assert.ok(name in dependencies, `Unexpected dependency: ${name}`)
                return dependencies[name]
            },
        })
        return exports
    }
    const usePostHog = load('src/hooks/usePostHog.ts', {})
    const { useEarlyAccessFeatures } = load('src/hooks/useEarlyAccessFeatures.ts', {
        react: React,
        './usePostHog': usePostHog,
        gatsby: { graphql: () => '', useStaticQuery: () => ({ allEarlyAccessFeature: { nodes: [] } }) },
    })
    let state
    function Consumer() {
        state = useEarlyAccessFeatures()
        return React.createElement(
            'output',
            null,
            state.loading ? 'loading' : state.features.map((f) => f.name).join(', ')
        )
    }
    return {
        window: dom.window,
        render: () => root.render(React.createElement(Consumer)),
        state: () => state,
        text: () => dom.window.document.querySelector('output').textContent,
    }
}

test('a ready SDK renders live features with the linked waitlist survey', async (t) => {
    const page = mount(t, readySdk())
    await act(async () => page.render())
    assert.equal(page.text(), 'Live feature')
    assert.equal(page.state().loading, false)
    assert.equal(page.state().features[0].payload.survey_id, survey.id)
})

test('a roadmap mounted before SDK download renders live features after the SDK replaces its queue', async (t) => {
    const queue = queuedSdk()
    const page = mount(t, queue)
    await act(async () => page.render())
    assert.equal(page.text(), 'loading')
    const sdk = readySdk()
    await act(async () => {
        page.window.posthog = sdk
        const pending = queue.splice(0)
        for (const [method, ...args] of pending) sdk[method](...args)
        t.mock.timers.tick(300)
    })
    assert.equal(page.text(), 'Live feature', `Calls left on the discarded queue: ${queue.map(([method]) => method)}`)
    assert.equal(page.state().loading, false)
    assert.equal(page.state().features[0].payload.survey_id, survey.id)
})

for (const [name, sdk] of [
    ['legacy snippet', []],
    ['hosted loader', queuedSdk()],
]) {
    test(`failed SDK download stops loading after six seconds (${name})`, async (t) => {
        const page = mount(t, sdk)
        await act(async () => page.render())
        act(() => t.mock.timers.tick(5999))
        assert.equal(page.state().loading, true)
        act(() => t.mock.timers.tick(1))
        assert.equal(page.state().loading, false)
        assert.equal(page.text(), '')
    })
}

import assert from 'node:assert/strict'
import test, { type TestContext } from 'node:test'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { runInNewContext } from 'node:vm'

import { isReaderWindowActive, twigLearnUrl } from './learnTracking.ts'

const requireDependency = createRequire(import.meta.url)
const React = requireDependency('react')
const { act } = React
const { createRoot } = requireDependency('react-dom/client')
const { JSDOM } = requireDependency('jsdom')
const ts = requireDependency('typescript')
const twigUrl = 'https://twig.example'

function browser(t: TestContext) {
    const dom = new JSDOM('<div id="root"></div>', { url: 'https://posthog.example', pretendToBeVisual: true })
    const descriptors = new Map(
        ['window', 'document', 'IntersectionObserver', 'IS_REACT_ACT_ENVIRONMENT'].map((key) => [
            key,
            Object.getOwnPropertyDescriptor(globalThis, key),
        ])
    )
    Object.assign(globalThis, { window: dom.window, document: dom.window.document, IS_REACT_ACT_ENVIRONMENT: true })
    const root = createRoot(dom.window.document.getElementById('root'))
    t.after(() => {
        act(() => root.unmount())
        dom.window.close()
        for (const [key, descriptor] of descriptors) {
            if (descriptor) Object.defineProperty(globalThis, key, descriptor)
            else Reflect.deleteProperty(globalThis, key)
        }
    })
    return { window: dom.window, root }
}

// Run the actual TSX with unrelated Gatsby and design-system dependencies stubbed.
function component(file: string, window: Window, dependencies: Record<string, unknown>) {
    const source = ts.transpileModule(readFileSync(new URL(file, import.meta.url), 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true },
    }).outputText
    const exports = { default: undefined }
    runInNewContext(source, {
        exports,
        window,
        document: window.document,
        IntersectionObserver: window.IntersectionObserver,
        require: (name: string) => {
            if (name === 'react') return React
            if (name === './learnTracking') return { twigLearnUrl, isReaderWindowActive }
            assert.ok(name in dependencies, `Unexpected dependency: ${name}`)
            return dependencies[name]
        },
    })
    return exports.default
}

function sdk(optedOut = false) {
    return {
        capture: () => undefined,
        createPersonProfile: () => undefined,
        has_opted_out_capturing: () => optedOut,
        get_distinct_id: () => 'visitor',
        get_session_id: () => 'session',
    }
}

test('an opted-out visitor reaches Twig without an identity handoff', (t) => {
    browser(t).window.localStorage.setItem('cookie_consent', 'yes')
    const url = twigLearnUrl(
        {
            has_opted_out_capturing: () => true,
            get_distinct_id: () => {
                throw new Error('Opted-out identity must not be read')
            },
        },
        twigUrl
    )
    assert.equal(url, twigUrl)
})

test('a missing opt-out check or visitor ID cannot start a handoff', (t) => {
    browser(t).window.localStorage.setItem('cookie_consent', 'yes')
    assert.equal(twigLearnUrl({ get_distinct_id: () => 'visitor' }, twigUrl), twigUrl)
    assert.equal(twigLearnUrl({ has_opted_out_capturing: () => false }, twigUrl), twigUrl)
})

test('a consenting visitor carries their website visitor and session IDs to Twig', (t) => {
    browser(t).window.localStorage.setItem('cookie_consent', 'yes')
    const url = new URL(
        twigLearnUrl(
            {
                has_opted_out_capturing: () => false,
                get_distinct_id: () => 'visitor',
                get_session_id: () => 'session',
            },
            twigUrl
        )
    )
    assert.deepEqual(Object.fromEntries(new URLSearchParams(url.hash.slice(1))), {
        learn_source: 'product-analytics',
        distinct_id: 'visitor',
        session_id: 'session',
    })
})

test('a chapter pauses while its reader is behind another window or minimized', () => {
    const reader = { key: 'reader', zIndex: 1, minimized: false }
    const other = { key: 'other', zIndex: 2, minimized: false }
    assert.equal(isReaderWindowActive([reader, other], reader.key), false)
    assert.equal(isReaderWindowActive([reader, { ...other, minimized: true }], reader.key), true)
    assert.equal(isReaderWindowActive([{ ...reader, minimized: true }, other], reader.key), false)
    assert.equal(isReaderWindowActive([reader, other], other.key), true)
})

for (const consent of [null, 'no', 'undecided', 'unexpected']) {
    test(`cookie consent ${consent} prevents reading or handing off identity`, (t) => {
        const { window } = browser(t)
        if (consent !== null) window.localStorage.setItem('cookie_consent', consent)
        const analytics = sdk()
        analytics.get_distinct_id = () => {
            throw new Error('Identity must not be read without consent')
        }
        assert.equal(twigLearnUrl(analytics, twigUrl), twigUrl)
    })
}

for (const consent of ['yes', 'acknowledged']) {
    test(`cookie consent ${consent} permits a handoff unless the SDK opted out`, (t) => {
        browser(t).window.localStorage.setItem('cookie_consent', consent)
        assert.match(
            twigLearnUrl(sdk(), twigUrl),
            /#learn_source=product-analytics&distinct_id=visitor&session_id=session$/
        )
        assert.equal(twigLearnUrl(sdk(true), twigUrl), twigUrl)
        assert.equal(twigLearnUrl(undefined, twigUrl), twigUrl)
        assert.equal(twigLearnUrl({ ...sdk(), get_session_id: undefined }, twigUrl).includes('session_id'), false)
    })
}

test('unavailable consent storage uses the plain Twig URL', (t) => {
    const { window } = browser(t)
    Object.defineProperty(window, 'localStorage', {
        get() {
            throw new Error('Storage is blocked')
        },
    })
    assert.equal(twigLearnUrl(sdk(), twigUrl), twigUrl)
})

test('server rendering cannot start an identity handoff', () => {
    assert.equal(twigLearnUrl(sdk(), twigUrl), twigUrl)
})

test('a snippet cannot confirm the SDK opt-out state', (t) => {
    browser(t).window.localStorage.setItem('cookie_consent', 'yes')
    assert.equal(twigLearnUrl({ ...sdk(), has_opted_out_capturing: () => undefined }, twigUrl), twigUrl)
})

test('Twig clicks use current consent and SDK, and create profiles only for a handoff', (t) => {
    const { window, root } = browser(t)
    const snippetCalls: string[] = []
    window.posthog = { capture: () => snippetCalls.push('capture') }
    const Button = ({ children, to, onClick }: { children: React.ReactNode; to?: string; onClick: () => void }) =>
        React.createElement(to ? 'a' : 'button', { href: to, onClick }, children)
    const Landing = component('./ProductAnalyticsLearnLanding.tsx', window, {
        '@posthog/brand/hoggies': { HedgehogCursor: () => null, HedgehogEinstein: () => null },
        '@posthog/brand/logo': { Logo: () => null },
        '@posthog/twig-components/lab.css': {},
        '@posthog/icons': { IconBook: () => null, IconPlay: () => null, IconTerminal: () => null },
        'components/CodeBlock': { SingleCodeBlock: () => null },
        'components/OSButton': Button,
        'components/OSIcons': { IconClaudeCode: () => null, LogomarkCodex: () => null },
        'components/Products/ReaderViewProduct': { PRODUCT_SURFACE_H1: '' },
        '../../constants': { TWIG_URL: twigUrl },
        '../../constants/pocketGuides': { volumeById: () => undefined },
        '../../hooks/usePocketGuideCounts': () => ({}),
        '../../hooks/usePostHog': () => window.posthog,
        './Cover': () => null,
    })
    act(() => root.render(React.createElement(Landing, { productName: 'Product Analytics', storyUrl: '/story' })))
    const link = [...window.document.querySelectorAll('a')].find((element) => element.textContent === 'Explore Twig')
    assert.ok(link)
    assert.equal(link.href, twigUrl + '/')
    const profiles: string[] = []
    const opened: string[] = []
    window.open = (url: string) => opened.push(url)
    window.posthog = { ...sdk(), createPersonProfile: () => profiles.push('profile') }
    const click = () => {
        const event = new window.MouseEvent('click', { bubbles: true, cancelable: true })
        act(() => link.dispatchEvent(event))
        return event.defaultPrevented
    }
    for (const consent of [null, 'no', 'yes', 'acknowledged']) {
        if (consent === null) window.localStorage.removeItem('cookie_consent')
        else window.localStorage.setItem('cookie_consent', consent)
        const accepted = consent === 'yes' || consent === 'acknowledged'
        assert.equal(click(), accepted)
        assert.equal(profiles.length, accepted ? opened.length : 0)
    }
    assert.equal(profiles.length, 2)
    assert.equal(opened.length, 2)
    assert.ok(opened.every((url) => new URLSearchParams(new URL(url).hash.slice(1)).get('distinct_id') === 'visitor'))
    window.posthog = { ...sdk(true), createPersonProfile: () => assert.fail('Opt-out must not create a profile') }
    assert.equal(click(), false)
    assert.equal(opened.length, 2)
    assert.equal(link.href, twigUrl + '/')
})

for (const initiallyAvailable of [false, true]) {
    test(`chapter engagement uses a late-loaded SDK (${
        initiallyAvailable ? 'snippet' : 'absent'
    } at mount) once`, (t) => {
        const { window, root } = browser(t)
        const snippetCalls: unknown[] = []
        window.posthog = initiallyAvailable ? { capture: (...args: unknown[]) => snippetCalls.push(args) } : undefined
        let reachedEnd: (entries: Array<{ isIntersecting: boolean }>) => void = () =>
            assert.fail('The chapter observer must mount')
        let disconnected = false
        window.IntersectionObserver = class {
            constructor(callback: typeof reachedEnd) {
                reachedEnd = callback
            }
            observe(target: Element) {
                assert.ok(target.isConnected)
            }
            disconnect() {
                disconnected = true
            }
        }
        const timers = new Set<() => void>()
        window.setInterval = (callback: () => void) => {
            timers.add(callback)
            return callback
        }
        window.clearInterval = (callback: () => void) => timers.delete(callback)
        const passthrough = ({ children }: { children: React.ReactNode }) => children
        const windows = [{ key: 'reader', zIndex: 1, minimized: false }]
        const Surface = component('./LearnSurface.tsx', window, {
            '@mdx-js/react': { MDXProvider: passthrough },
            gatsby: {
                graphql: () => '',
                useStaticQuery: () => ({ pages: { nodes: [{ body: 'chapter', fields: { slug: '/chapter' } }] } }),
            },
            'gatsby-plugin-mdx': { MDXRenderer: passthrough },
            'context/App': { useAppWindows: () => ({ windows }) },
            'context/Window': { useWindow: () => ({ appWindow: { key: 'reader' } }) },
            'hooks/usePostHog': () => window.posthog,
            './bookComponents': { EntryProvider: passthrough, bookMdxComponents: {} },
            './bookModel': {
                useBookPages: () => [{ url: '/chapter', isFrontMatter: false }],
                learnChapterSlug: () => '101',
                normalizeUrl: (url: string) => url,
            },
        })
        act(() =>
            root.render(
                React.createElement(Surface, { volumeId: 'product-analytics', chapter: '101', basePath: '/learn' })
            )
        )
        reachedEnd([{ isIntersecting: true }])
        const tick = (seconds: number) => {
            for (let second = 0; second < seconds; second++) {
                for (const callback of [...timers]) callback()
            }
        }
        tick(initiallyAvailable ? 9 : 11)
        const captures: unknown[][] = []
        window.posthog = { capture: (...args: unknown[]) => captures.push(args) }
        assert.equal(captures.length, 0)
        tick(1)
        act(() =>
            root.render(
                React.createElement(Surface, { volumeId: 'product-analytics', chapter: '101', basePath: '/learn' })
            )
        )
        tick(10)
        reachedEnd([{ isIntersecting: true }])
        assert.equal(captures.length, 1)
        assert.equal(captures[0][0], 'learn_chapter_engaged')
        assert.deepEqual(JSON.parse(JSON.stringify(captures[0][1])), {
            volume: 'product-analytics',
            chapter: '101',
            threshold: '10_visible_seconds_and_end_reached',
        })
        assert.deepEqual(snippetCalls, [])
        assert.equal(timers.size, 0)
        act(() => root.unmount())
        assert.equal(disconnected, true)
    })
}

import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import test from 'node:test'
import { runInNewContext } from 'node:vm'

import { POCKET_GUIDE_VOLUMES, pocketGuideUrl } from '../../constants/pocketGuides.ts'

const { transpileModule, ModuleKind } = createRequire(import.meta.url)('typescript')
const source = transpileModule(readFileSync(new URL('./bookOpening.ts', import.meta.url), 'utf8'), {
    compilerOptions: { module: ModuleKind.CommonJS },
}).outputText

function setup({ reduced = false, failNavigation = false, detached = false } = {}) {
    const calls: string[] = []
    const layers: ElementMock[] = []
    const snapshots: ElementMock[] = []
    const animations: Array<{ frames: Keyframe[]; options: KeyframeAnimationOptions; cancelled: boolean }> = []
    class ElementMock {
        style: Record<string, string> = {}
        computed: Record<string, string> = { 'font-size': '24px', width: '210px' }
        descendants: ElementMock[] = []
        firstElementChild: ElementMock | null = null
        isConnected = !detached
        target = ''
        removed = false
        attributes: Record<string, string> = {}
        children: ElementMock[] = []
        setAttribute(name: string, value: string) {
            this.attributes[name] = value
        }
        hasAttribute(name: string) {
            return name in this.attributes
        }
        closest() {
            return viewport
        }
        querySelector(): ElementMock | null {
            return null
        }
        querySelectorAll() {
            return this.descendants
        }
        cloneNode() {
            const book = new ElementMock()
            book.descendants = this.descendants.map(() => new ElementMock())
            book.querySelector = () => new ElementMock()
            snapshots.push(book)
            return book
        }
        getBoundingClientRect() {
            return { left: 100, top: 80, width: 210, height: 280 }
        }
        append(...children: ElementMock[]) {
            this.children.push(...children)
        }
        remove() {
            this.removed = true
        }
        animate(frames: Keyframe[], options: KeyframeAnimationOptions) {
            const record = { frames, options, cancelled: false }
            animations.push(record)
            return {
                finished: Promise.resolve(),
                cancel: () => {
                    record.cancelled = true
                },
            }
        }
    }
    const viewport = new ElementMock()
    viewport.firstElementChild = new ElementMock()
    viewport.style.pointerEvents = 'auto'
    viewport.getBoundingClientRect = () => ({ left: 20, top: 40, width: 840, height: 700 })
    const cover = new ElementMock()
    const artwork = new ElementMock()
    artwork.computed = { width: '140px', height: '140px' }
    cover.descendants = [artwork]
    const event = {
        button: 0,
        defaultPrevented: false,
        target: { closest: () => new ElementMock() },
        preventDefault() {
            this.defaultPrevented = true
        },
    }
    type OpeningEvent = typeof event
    const exports: { openPocketGuide?: (event: OpeningEvent, cover: ElementMock | null, to: string) => Promise<void> } =
        {}
    const location = { pathname: '/pocket-guides' }
    runInNewContext(source, {
        exports,
        HTMLElement: ElementMock,
        getComputedStyle: (element: ElementMock) =>
            Object.assign(Object.keys(element.computed), {
                getPropertyValue: (property: string) => element.computed[property],
            }),
        window: { matchMedia: () => ({ matches: reduced }), location },
        setTimeout,
        clearTimeout,
        document: {
            createElement: () => {
                const layer = new ElementMock()
                layers.push(layer)
                return layer
            },
            body: { appendChild: () => calls.push('layer') },
        },
        requestAnimationFrame: (callback: () => void) => callback(),
        require: () => ({
            navigate: async (to: string) => {
                calls.push(to)
                if (failNavigation) throw new Error('Failed navigation')
            },
        }),
    })
    const open = exports.openPocketGuide
    assert.ok(open)
    return { open, event, cover, viewport, calls, layers, snapshots, animations, location }
}

test('the animated copy retains container-dependent typography and artwork dimensions', async () => {
    const fixture = setup()
    await fixture.open(fixture.event, fixture.cover, '/book')
    const snapshot = fixture.snapshots[0]
    assert.ok(snapshot.style.cssText.includes('font-size:24px;'))
    assert.ok(snapshot.descendants[0].style.cssText.includes('width:140px;height:140px;'))
    assert.equal(snapshot.style.transition, 'none')
    assert.equal(snapshot.descendants[0].style.animation, 'none')
})

test('every published shelf volume animates to its own configured destination', async () => {
    for (const volume of POCKET_GUIDE_VOLUMES.filter((volume) => !volume.comingSoon)) {
        const fixture = setup()
        const to = pocketGuideUrl(volume)
        await fixture.open(fixture.event, fixture.cover, to)
        assert.equal(fixture.event.defaultPrevented, true)
        assert.deepEqual(fixture.calls, ['layer', to])
        assert.ok(fixture.layers[0].removed)
        assert.ok(fixture.animations.every((animation) => animation.cancelled))
        assert.equal(fixture.viewport.style.pointerEvents, 'auto')
    }
})

test('reading buttons can reuse the animation with a chapter destination', async () => {
    const fixture = setup()
    const to = '/learn/product-analytics/pocket-guide/101'
    await fixture.open(fixture.event, fixture.cover, to)
    assert.deepEqual(fixture.calls, ['layer', to])
    const camera = fixture.animations.find(({ options }) => options.duration === 1100)
    assert.ok(camera)
    assert.ok(Number(camera.frames[1].scale) < 3, 'The camera should fit the book, rather than crop into its page')
})

test('reduced motion and modified clicks retain native navigation', async () => {
    const reduced = setup({ reduced: true })
    await reduced.open(reduced.event, reduced.cover, '/book')
    assert.equal(reduced.event.defaultPrevented, false)
    assert.equal(reduced.layers.length, 0)
    for (const key of ['metaKey', 'ctrlKey', 'shiftKey', 'altKey']) {
        const fixture = setup()
        const event = { ...fixture.event, [key]: true }
        await fixture.open(event, fixture.cover, '/book')
        assert.equal(event.defaultPrevented, false)
        assert.equal(fixture.layers.length, 0)
    }
})

test('repeated clicks run only one transition per viewport', async () => {
    const fixture = setup()
    const first = fixture.open(fixture.event, fixture.cover, '/book')
    await fixture.open({ ...fixture.event, defaultPrevented: false }, fixture.cover, '/other-book')
    await first
    assert.deepEqual(fixture.calls, ['layer', '/book'])
})

test('failed navigation restores the source and allows another attempt', async () => {
    const fixture = setup({ failNavigation: true })
    await fixture.open(fixture.event, fixture.cover, '/book')
    assert.ok(fixture.layers[0].removed)
    assert.equal(fixture.viewport.style.pointerEvents, 'auto')
    await fixture.open({ ...fixture.event, defaultPrevented: false }, fixture.cover, '/book')
    assert.equal(fixture.calls.filter((call) => call === 'layer').length, 2)
})

test('leaving the source during the animation does not override the newer route', async () => {
    const fixture = setup({ detached: true })
    await fixture.open(fixture.event, fixture.cover, '/book')
    assert.deepEqual(fixture.calls, ['layer'])
    assert.ok(fixture.layers[0].removed)
})

test('focusing another window during the animation does not open the book there', async () => {
    const fixture = setup()
    const opening = fixture.open(fixture.event, fixture.cover, '/book')
    fixture.location.pathname = '/docs'
    await opening
    assert.deepEqual(fixture.calls, ['layer'])
    assert.ok(fixture.layers[0].removed)
})

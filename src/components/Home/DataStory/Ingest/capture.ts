import type { EventKind } from './eventKinds'

interface CaptureOptions {
    region: HTMLElement
    emit: (kind: EventKind, detail: string) => void
    isActive: () => boolean
}

interface Press {
    x: number
    y: number
    isDragging: boolean
    lastDragAt: number
}

interface RecentClick {
    at: number
    x: number
    y: number
}

const DRAG_START_DISTANCE = 8
const DRAG_REPEAT_MS = 450
const SCROLL_DISTANCE_PER_EVENT = 220
const SCROLL_REPEAT_MS = 260
const KEY_REPEAT_MS = 160
const RAGE_CLICK_COUNT = 3
const RAGE_CLICK_WINDOW_MS = 1000
const RAGE_CLICK_RADIUS = 40
const CLICK_TARGET = 'button, a, input, [role]'
const MAX_LABEL_LENGTH = 24
const MODIFIER_KEYS = new Set(['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Fn', 'Dead'])

const visibleLabel = (target: EventTarget | null): string => {
    if (!(target instanceof Element)) return ''
    const element = target.closest('label') ?? target.closest(CLICK_TARGET) ?? target
    const text =
        element.getAttribute('aria-label') ||
        element.textContent ||
        (element instanceof HTMLInputElement ? element.placeholder : '')
    return text.replace(/\s+/g, ' ').trim().slice(0, MAX_LABEL_LENGTH)
}

const clickDetail = (target: EventTarget | null): string => {
    const label = visibleLabel(target)
    return label ? `clicked "${label}"` : 'clicked'
}

export function captureUserEvents({ region, emit, isActive }: CaptureOptions): () => void {
    const listeners = new AbortController()
    const options: AddEventListenerOptions = { capture: true, passive: true, signal: listeners.signal }
    const scrollTops = new WeakMap<EventTarget, number>()
    let press: Press | null = null
    let ignoreNextClick = false
    let recentClicks: RecentClick[] = []
    let scrolledSinceLastEvent = 0
    let lastScrollEventAt = 0
    let lastKeyEventAt = 0

    region.addEventListener(
        'pointerdown',
        (event) => {
            ignoreNextClick = false
            press = event.button === 0 ? { x: event.clientX, y: event.clientY, isDragging: false, lastDragAt: 0 } : null
        },
        options
    )

    region.addEventListener(
        'pointermove',
        (event) => {
            if (!press || event.pointerType === 'touch' || (event.buttons & 1) === 0) return
            const now = performance.now()
            if (!press.isDragging) {
                if (Math.hypot(event.clientX - press.x, event.clientY - press.y) < DRAG_START_DISTANCE) return
                press.isDragging = true
                ignoreNextClick = true
            } else if (now - press.lastDragAt < DRAG_REPEAT_MS) {
                return
            }
            press.lastDragAt = now
            emit('snapshot', 'dragged')
        },
        options
    )

    const endPress = () => {
        press = null
    }
    region.addEventListener('pointerup', endPress, options)
    region.addEventListener('pointercancel', endPress, options)

    region.addEventListener(
        'click',
        (event) => {
            if (ignoreNextClick) {
                ignoreNextClick = false
                return
            }
            emit('autocapture', clickDetail(event.target))
            if (event.detail === 0) return
            const now = performance.now()
            recentClicks = recentClicks.filter(
                (click) =>
                    now - click.at < RAGE_CLICK_WINDOW_MS &&
                    Math.hypot(click.x - event.clientX, click.y - event.clientY) < RAGE_CLICK_RADIUS
            )
            recentClicks.push({ at: now, x: event.clientX, y: event.clientY })
            if (recentClicks.length >= RAGE_CLICK_COUNT) {
                recentClicks = []
                emit('rageclick', `${clickDetail(event.target)} ${RAGE_CLICK_COUNT} times`)
            }
        },
        options
    )

    region.addEventListener(
        'copy',
        () => {
            const copied = document.getSelection()?.toString().replace(/\s+/g, ' ').trim().slice(0, MAX_LABEL_LENGTH)
            emit('copy', copied ? `copied "${copied}"` : 'copied text')
        },
        options
    )

    region.addEventListener(
        'keydown',
        (event) => {
            const now = performance.now()
            if (event.repeat || MODIFIER_KEYS.has(event.key) || now - lastKeyEventAt < KEY_REPEAT_MS) return
            lastKeyEventAt = now
            emit('snapshot', 'typed')
        },
        options
    )

    window.addEventListener(
        'scroll',
        (event) => {
            if (!isActive()) return
            const target = event.target instanceof Element ? event.target : document
            const top = target instanceof Element ? target.scrollTop : window.scrollY
            const previous = scrollTops.get(target)
            scrollTops.set(target, top)
            if (previous === undefined) return
            scrolledSinceLastEvent += Math.abs(top - previous)
            const now = performance.now()
            if (scrolledSinceLastEvent < SCROLL_DISTANCE_PER_EVENT || now - lastScrollEventAt < SCROLL_REPEAT_MS) return
            scrolledSinceLastEvent = 0
            lastScrollEventAt = now
            emit('snapshot', 'scrolled')
        },
        options
    )

    return () => listeners.abort()
}

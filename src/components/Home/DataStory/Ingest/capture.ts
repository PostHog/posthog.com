import type { EventKind } from './eventKinds'

export interface SpawnPoint {
    clientX: number
    clientY: number
    pop: boolean
}

interface CaptureOptions {
    page: HTMLElement
    emit: (kind: EventKind, at: SpawnPoint) => void
    onScrollDepth: (depth: number) => void
}

interface Press {
    x: number
    y: number
    isDragging: boolean
    lastDragTileAt: number
}

interface RecentClick {
    at: number
    x: number
    y: number
}

interface Area {
    left: number
    top: number
    right: number
    bottom: number
}

const DRAG_START_DISTANCE = 8
const DRAG_REPEAT_MS = 700
const SCROLL_DISTANCE_PER_TILE = 240
const SCROLL_REPEAT_MS = 280
const KEY_REPEAT_MS = 220
const RAGE_CLICK_COUNT = 3
const RAGE_CLICK_WINDOW_MS = 1000
const RAGE_CLICK_RADIUS = 40
const SCROLL_FALLBACK_INSET = 56
const SCROLL_FALLBACK_HEIGHT_SHARE = 0.35
const KEYPRESS_MAX_OFFSET = 96
const MODIFIER_KEYS = new Set(['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Fn', 'Dead'])
const TYPING_TARGETS = 'input, textarea, select, [contenteditable="true"]'

const isInside = (area: Area, x: number, y: number): boolean =>
    x >= area.left && x <= area.right && y >= area.top && y <= area.bottom

const centerOf = (area: Area): SpawnPoint => ({
    clientX: (area.left + area.right) / 2,
    clientY: (area.top + area.bottom) / 2,
    pop: true,
})

export function captureUserEvents({ page, emit, onScrollDepth }: CaptureOptions): () => void {
    const eventOptions: AddEventListenerOptions = { capture: true, passive: true }
    const scrollingElement = (): Element =>
        page.scrollHeight > page.clientHeight ? page : document.scrollingElement ?? document.documentElement
    const visibleArea = (): Area => {
        const rect = page.getBoundingClientRect()
        return {
            left: Math.max(rect.left, 0),
            top: Math.max(rect.top, 0),
            right: Math.min(rect.right, window.innerWidth),
            bottom: Math.min(rect.bottom, window.innerHeight),
        }
    }

    let pointer: SpawnPoint | null = null
    let press: Press | null = null
    let ignoreNextClick = false
    let recentClicks: RecentClick[] = []
    let scrollTop = scrollingElement().scrollTop
    let scrolledSinceLastTile = 0
    let lastScrollTileAt = 0
    let lastKeyTileAt = 0

    const pointerOrCenter = (): SpawnPoint => {
        const area = visibleArea()
        return pointer && isInside(area, pointer.clientX, pointer.clientY) ? pointer : centerOf(area)
    }

    const scrollSpawnPoint = (): SpawnPoint => {
        const area = visibleArea()
        if (pointer && isInside(area, pointer.clientX, pointer.clientY)) {
            return pointer
        }
        return {
            clientX: area.right - SCROLL_FALLBACK_INSET,
            clientY: area.top + (area.bottom - area.top) * SCROLL_FALLBACK_HEIGHT_SHARE,
            pop: true,
        }
    }

    const onPointerDown = (event: PointerEvent) => {
        pointer = { clientX: event.clientX, clientY: event.clientY, pop: true }
        ignoreNextClick = false
        press = event.button === 0 ? { x: event.clientX, y: event.clientY, isDragging: false, lastDragTileAt: 0 } : null
    }

    const onPointerMove = (event: PointerEvent) => {
        pointer = { clientX: event.clientX, clientY: event.clientY, pop: true }
        if (!press || event.pointerType === 'touch' || (event.buttons & 1) === 0) {
            return
        }
        const now = performance.now()
        if (!press.isDragging) {
            if (Math.hypot(event.clientX - press.x, event.clientY - press.y) < DRAG_START_DISTANCE) {
                return
            }
            press.isDragging = true
            ignoreNextClick = true
        } else if (now - press.lastDragTileAt < DRAG_REPEAT_MS) {
            return
        }
        press.lastDragTileAt = now
        emit('drag', pointer)
    }

    const onPointerUp = () => {
        press = null
    }

    const onPointerLeave = () => {
        pointer = null
    }

    const onClick = (event: MouseEvent) => {
        if (ignoreNextClick) {
            ignoreNextClick = false
            return
        }
        const target = event.target instanceof Element ? event.target : null
        const isKeyboardClick = event.detail === 0 && target !== null
        const at = isKeyboardClick
            ? centerOf(target.getBoundingClientRect())
            : { clientX: event.clientX, clientY: event.clientY, pop: true }
        emit('click', at)

        const now = performance.now()
        recentClicks = recentClicks.filter(
            (click) =>
                now - click.at < RAGE_CLICK_WINDOW_MS &&
                Math.hypot(click.x - at.clientX, click.y - at.clientY) < RAGE_CLICK_RADIUS
        )
        recentClicks.push({ at: now, x: at.clientX, y: at.clientY })
        if (recentClicks.length >= RAGE_CLICK_COUNT) {
            recentClicks = []
            emit('rageclick', at)
        }
    }

    const onScroll = () => {
        const scroller = scrollingElement()
        const top = scroller.scrollTop
        scrolledSinceLastTile += Math.abs(top - scrollTop)
        scrollTop = top
        onScrollDepth(Math.min(1, (top + scroller.clientHeight) / scroller.scrollHeight))

        const now = performance.now()
        if (scrolledSinceLastTile < SCROLL_DISTANCE_PER_TILE || now - lastScrollTileAt < SCROLL_REPEAT_MS) {
            return
        }
        scrolledSinceLastTile = 0
        lastScrollTileAt = now
        emit('scroll', scrollSpawnPoint())
    }

    const onCopy = () => {
        const selection = window.getSelection()
        const range = selection && selection.rangeCount > 0 ? selection.getRangeAt(0).getBoundingClientRect() : null
        emit(
            'copy',
            range && range.width > 0 ? { clientX: range.right, clientY: range.top, pop: true } : pointerOrCenter()
        )
    }

    const onKeyDown = (event: KeyboardEvent) => {
        const now = performance.now()
        if (event.repeat || MODIFIER_KEYS.has(event.key) || now - lastKeyTileAt < KEY_REPEAT_MS) {
            return
        }
        lastKeyTileAt = now
        const typingTarget = event.target instanceof Element ? event.target.closest(TYPING_TARGETS) : null
        const field = typingTarget?.getBoundingClientRect()
        emit(
            'keypress',
            field
                ? {
                      clientX: field.left + Math.min(field.width / 2, KEYPRESS_MAX_OFFSET),
                      clientY: field.top,
                      pop: true,
                  }
                : pointerOrCenter()
        )
    }

    page.addEventListener('pointerdown', onPointerDown, eventOptions)
    page.addEventListener('pointermove', onPointerMove, eventOptions)
    page.addEventListener('pointerup', onPointerUp, eventOptions)
    page.addEventListener('pointercancel', onPointerUp, eventOptions)
    page.addEventListener('pointerleave', onPointerLeave)
    page.addEventListener('click', onClick, eventOptions)
    page.addEventListener('copy', onCopy, eventOptions)
    page.addEventListener('keydown', onKeyDown, eventOptions)
    page.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
        page.removeEventListener('pointerdown', onPointerDown, eventOptions)
        page.removeEventListener('pointermove', onPointerMove, eventOptions)
        page.removeEventListener('pointerup', onPointerUp, eventOptions)
        page.removeEventListener('pointercancel', onPointerUp, eventOptions)
        page.removeEventListener('pointerleave', onPointerLeave)
        page.removeEventListener('click', onClick, eventOptions)
        page.removeEventListener('copy', onCopy, eventOptions)
        page.removeEventListener('keydown', onKeyDown, eventOptions)
        page.removeEventListener('scroll', onScroll)
        window.removeEventListener('scroll', onScroll)
    }
}

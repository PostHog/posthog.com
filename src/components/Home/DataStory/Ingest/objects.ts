import { EVENT_KINDS } from './eventKinds'
import type { EventKind } from './eventKinds'
import { BEAD_RADIUS } from './physics'

export interface TileElement {
    root: HTMLElement
    badge: HTMLElement
}

const TILE_ROOT_CLASS = 'absolute left-0 top-0 select-none will-change-transform'
const TILE_BADGE_CLASS =
    'flex items-center gap-1 whitespace-nowrap rounded-sm border border-primary bg-primary/90 px-1.5 py-px font-mono text-[11px] leading-4 text-secondary shadow-sm'
const DOT_CLASS = 'size-1.5 shrink-0 rounded-full'
const BEAD_CLASS =
    'absolute left-0 top-0 rounded-full shadow-[inset_0_-1px_1px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.45)] will-change-transform'

export const tileTransform = (x: number, y: number, angle: number): string =>
    `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${angle}rad)`

export const beadTransform = (x: number, y: number): string =>
    `translate3d(${x - BEAD_RADIUS}px, ${y - BEAD_RADIUS}px, 0)`

export function createTileElement(kind: EventKind, x: number, y: number): TileElement {
    const { label, dotClassName } = EVENT_KINDS[kind]
    const root = document.createElement('span')
    const badge = document.createElement('span')
    const dot = document.createElement('span')

    root.className = TILE_ROOT_CLASS
    root.style.transform = tileTransform(x, y, 0)
    badge.className = TILE_BADGE_CLASS
    dot.className = `${DOT_CLASS} ${dotClassName}`
    badge.append(dot, label)
    root.append(badge)
    return { root, badge }
}

export function createBeadElement(kind: EventKind, x: number, y: number): HTMLElement {
    const bead = document.createElement('span')
    bead.className = `${BEAD_CLASS} ${EVENT_KINDS[kind].dotClassName}`
    bead.style.width = `${BEAD_RADIUS * 2}px`
    bead.style.height = `${BEAD_RADIUS * 2}px`
    bead.style.transform = beadTransform(x, y)
    return bead
}

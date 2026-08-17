import { useSyncExternalStore } from 'react'

/**
 * TEMPORARY — desktop icon art-direction bake-off.
 *
 * Five candidate icon sets live in `static/desktop-icons/<key>/<name>.png`. This module
 * holds the set list plus a tiny store so `RenderedIcon` can re-render when the
 * IconSetSwitcher overlay changes the active set. Delete this file, `RenderedIcon.tsx`,
 * `components/Desktop/IconSetSwitcher.tsx`, and the unused folders once a set is picked.
 */

export interface IconSet {
    /** Folder name under `static/desktop-icons/` */
    key: string
    label: string
    /** Short note on the look, shown in the switcher */
    note: string
    /**
     * Rendered px size of the full square PNG. Each set bakes in a different amount of
     * padding, so this is tuned per set to land the *visible* artwork at ~34px — roughly
     * the weight of the 36px glass glyphs it replaces. Derived from the measured alpha
     * bounding box: size = 34 / mean-extent (glossy-3d 0.76, clay 0.56, matte 0.53,
     * papier 0.58, folded-card 0.59).
     */
    size: number
    /**
     * Where the artwork actually starts and ends vertically, as a fraction of the
     * canvas. Measured from the alpha channel across all 12 icons in the set: `cropTop`
     * is the set's highest top edge, `cropBottom` its lowest bottom edge.
     *
     * These trim the transparent margin out of the *layout* box (see `iconSetMetrics`)
     * so the caption sits directly under the artwork instead of under the empty canvas.
     * Using the set's extremes rather than its mean means no icon can ever overhang its
     * box, so every caption in a row still lines up.
     */
    cropTop: number
    cropBottom: number
}

export const ICON_SETS: IconSet[] = [
    {
        key: 'glossy-3d',
        label: 'Glossy 3D',
        note: 'Blue glass, high shine',
        size: 44,
        cropTop: 0.094,
        cropBottom: 0.906,
    },
    {
        key: 'clay-miniature',
        label: 'Clay miniature',
        note: 'Sculpted, on plinths',
        size: 60,
        cropTop: 0.178,
        cropBottom: 0.822,
    },
    {
        key: 'muted-matte',
        label: 'Muted matte',
        note: 'Flat, desaturated',
        size: 64,
        cropTop: 0.221,
        cropBottom: 0.779,
    },
    {
        key: 'papier-mache',
        label: 'Papier-mâché',
        note: 'Paper texture, warm',
        size: 60,
        cropTop: 0.193,
        cropBottom: 0.807,
    },
    {
        key: 'folded-card',
        label: 'Folded card',
        note: 'Creased cardstock, matte',
        size: 57,
        cropTop: 0.172,
        cropBottom: 0.828,
    },
]

/**
 * Layout box for a set, with the transparent top/bottom margin cropped out.
 *
 * The box is what the caption lays out against; the image overflows it and is pulled up
 * by `offsetTop` so only the artwork band occupies flow. Every set lands at a ~36px box
 * height — the same slot the glass glyphs and DemoIcon use — so all four sets share the
 * original vertical rhythm.
 */
export function iconSetMetrics(set: IconSet) {
    return {
        imageSize: set.size,
        boxWidth: set.size,
        boxHeight: Math.round(set.size * (set.cropBottom - set.cropTop)),
        offsetTop: -Math.round(set.size * set.cropTop),
    }
}

export const DEFAULT_ICON_SET = ICON_SETS[0].key

const STORAGE_KEY = 'desktop-icon-set-preview'

type Listener = () => void

const listeners = new Set<Listener>()
let current = DEFAULT_ICON_SET
let restored = false

const isKnown = (key: string | null): key is string => !!key && ICON_SETS.some((set) => set.key === key)

const emit = () => listeners.forEach((listener) => listener())

/**
 * Pull the saved choice out of localStorage on first subscribe rather than at module
 * scope, so the server render and the hydration render both start on the default set.
 * `useSyncExternalStore` re-reads the snapshot right after subscribing, so the saved
 * set still lands on the first client paint — just without a hydration mismatch.
 */
function restore() {
    if (restored || typeof window === 'undefined') return
    restored = true
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isKnown(stored) && stored !== current) {
        current = stored
        emit()
    }
}

function subscribe(listener: Listener) {
    listeners.add(listener)
    restore()
    return () => {
        listeners.delete(listener)
    }
}

export function setIconSet(key: string) {
    if (!isKnown(key) || key === current) return
    current = key
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, key)
    }
    emit()
}

/** The active set. Components that call this re-render when the switcher changes it. */
export function useIconSet(): IconSet {
    const key = useSyncExternalStore(
        subscribe,
        () => current,
        () => DEFAULT_ICON_SET
    )
    return ICON_SETS.find((set) => set.key === key) ?? ICON_SETS[0]
}

/** Path to one icon in a given set — used by both RenderedIcon and the switcher thumbnails. */
export const iconSetImage = (setKey: string, name: string) => `/desktop-icons/${setKey}/${name}.png`

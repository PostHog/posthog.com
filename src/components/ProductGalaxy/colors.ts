/**
 * Color tokens for the Product Galaxy.
 *
 * Hex values are resolved at runtime by reading the live DOM: we render a
 * hidden `<span class="text-{token}">`, ask `getComputedStyle()` what color
 * the browser ended up applying, and parse the result. This keeps the canvas
 * in sync with `tailwind.config.js` (and any theme override / safelist
 * change) without us re-typing hex values that silently drift out of sync.
 *
 * SSR / pre-mount calls fall back to a compact hardcoded map. The canvas
 * itself is client-only (see `GalaxyCanvas.lazy.tsx`), so the fallback only
 * ever matters during module load before the first paint.
 */

/**
 * SSR / first-paint fallback. Only used until the DOM exists and the resolver
 * can ask the browser. Mirrors `tailwind.config.js` for the tokens we use.
 */
const SSR_FALLBACK: Record<string, string> = {
    'text-orange': '#EB9D2A',
    'text-light-7': '#B6B7AF',
    'text-blue': '#2F80FA',
    'text-sky-blue': '#2EA2D3',
    'text-purple': '#B62AD9',
    'text-teal': '#29DBBB',
    'text-seagreen': '#30ABC6',
    'text-red': '#F54E00',
    'text-yellow': '#F7A501',
    'text-salmon': '#F35454',
    'text-green': '#6AA84F',
    'text-green-2': '#36C46F',
    'text-brown': '#3B2B26',
    'text-lilac': '#8567FF',
    'text-pink': '#E34C6F',
}

const NEUTRAL_CLASS = 'text-light-7'
const ACCENT_CLASS = 'text-orange'

// Two caches:
//  - `hexCache`: className -> "#rrggbb". Only populated after a successful DOM
//    probe, so a pre-DOM call (which returns the SSR fallback) never poisons
//    the cache.
//  - `rgbaCache`: keyed by hex+alpha (not className), so once the DOM-resolved
//    hex differs from the SSR fallback, the rgba string for the real color is
//    cached separately. `linkColor` fires per-edge per-frame, so caching here
//    avoids ~thousands of string allocations per second.
const hexCache = new Map<string, string>()
const rgbaCache = new Map<string, string>()

function rgbStringToHex(rgb: string): string | null {
    // matches `rgb(R, G, B)`, `rgba(R, G, B, A)`, modern `rgb(R G B / A)`, etc.
    const m = rgb.match(/(\d+(?:\.\d+)?)[\s,]+(\d+(?:\.\d+)?)[\s,]+(\d+(?:\.\d+)?)/)
    if (!m) return null
    const toHex = (n: string) => Math.round(parseFloat(n)).toString(16).padStart(2, '0')
    return `#${toHex(m[1])}${toHex(m[2])}${toHex(m[3])}`
}

/**
 * Resolve a Tailwind color class to its rendered hex. Cached per class.
 * Returns the SSR fallback (or white) when the DOM isn't available.
 */
export function resolveTwHex(className: string): string {
    const fallback = SSR_FALLBACK[className] ?? '#FFFFFF'
    if (typeof window === 'undefined' || typeof document === 'undefined' || !document.body) {
        return fallback
    }
    const cached = hexCache.get(className)
    if (cached) return cached

    try {
        const el = document.createElement('span')
        el.className = className
        el.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;width:0;height:0;'
        document.body.appendChild(el)
        const rgb = getComputedStyle(el).color
        document.body.removeChild(el)
        const hex = rgbStringToHex(rgb) ?? fallback
        hexCache.set(className, hex)
        return hex
    } catch {
        return fallback
    }
}

/** Resolve a Tailwind color class and emit an `rgba(...)` string with a given alpha. Cached. */
export function resolveTwRgba(className: string, alpha: number): string {
    const hex = resolveTwHex(className)
    const key = `${hex}|${alpha}`
    const cached = rgbaCache.get(key)
    if (cached) return cached
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    const rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`
    rgbaCache.set(key, rgba)
    return rgba
}

/** Amber HUD accent — `text-orange` from the project palette. */
export function getHudAccent(): string {
    return resolveTwHex(ACCENT_CLASS)
}

/** Warm gray fallback for products that don't declare a brand color — `text-light-7`. */
export function getNeutralHex(): string {
    return resolveTwHex(NEUTRAL_CLASS)
}

export function getProductColor(token: string | undefined): string {
    if (!token) return getNeutralHex()
    return resolveTwHex(`text-${token}`)
}

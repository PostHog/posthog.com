import { PALETTE } from './palette.js'

export const W = 320
export const H = 180

export const rect = (ctx, c, x, y, w, h) => {
    ctx.fillStyle = PALETTE[c]
    ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h))
}
export const px = (ctx, c, x, y) => rect(ctx, c, x, y, 1, 1)

// Stateless hash noise: same inputs, same output, every render.
export function hash(...n) {
    let h = 2166136261
    for (const v of n) {
        h ^= Math.imul(v | 0, 2654435761)
        h = Math.imul(h ^ (h >>> 13), 1274126177)
    }
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296
}

export const clamp01 = (t) => Math.max(0, Math.min(1, t))
export const lerp = (a, b, t) => a + (b - a) * t
export const easeOut = (t) => 1 - (1 - clamp01(t)) ** 3
export const easeIn = (t) => clamp01(t) ** 2
export const progress = (f, a, b) => clamp01((f - a) / (b - a))

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16)
export const bayer = (x, y) => BAYER[(y & 3) * 4 + (x & 3)]

// Static layers are drawn once into an offscreen canvas and blitted every frame.
const layers = new Map()
export function cached(key, w, h, paint) {
    if (!layers.has(key)) {
        const c = new OffscreenCanvas(w, h)
        paint(c.getContext('2d'))
        layers.set(key, c)
    }
    return layers.get(key)
}

// Vertical ordered-dither gradient through palette stops [[t, key], ...].
export function ditherGradient(ctx, x0, y0, w, h, stops) {
    for (let y = 0; y < h; y++) {
        const t = h === 1 ? 0 : y / (h - 1)
        let i = 0
        while (i < stops.length - 2 && t > stops[i + 1][0]) i++
        const [ta, a] = stops[i]
        const [tb, b] = stops[i + 1]
        const k = clamp01((t - ta) / (tb - ta))
        for (let x = 0; x < w; x++) px(ctx, k > bayer(x, y) ? b : a, x0 + x, y0 + y)
    }
}

export function disc(ctx, c, cx, cy, r) {
    for (let y = -r; y <= r; y++) {
        const dx = Math.floor(Math.sqrt(r * r - y * y + r * 0.8))
        rect(ctx, c, cx - dx, cy + y, dx * 2 + 1, 1)
    }
}

// Black outside a circle, the classic iris wipe.
export function iris(ctx, cx, cy, r) {
    ctx.fillStyle = PALETTE.k
    for (let y = 0; y < H; y++) {
        const d = r * r - (y - cy) ** 2
        if (d <= 0) {
            ctx.fillRect(0, y, W, 1)
            continue
        }
        const dx = Math.round(Math.sqrt(d))
        ctx.fillRect(0, y, Math.max(0, cx - dx), 1)
        ctx.fillRect(cx + dx, y, W, 1)
    }
}

// Filled triangle by half-plane test, for arrowheads.
export function tri(ctx, c, a, b, d) {
    const [x0, x1] = [Math.min(a[0], b[0], d[0]), Math.max(a[0], b[0], d[0])]
    const [y0, y1] = [Math.min(a[1], b[1], d[1]), Math.max(a[1], b[1], d[1])]
    const side = (p, q, x, y) => (q[0] - p[0]) * (y - p[1]) - (q[1] - p[1]) * (x - p[0])
    for (let y = Math.floor(y0); y <= y1; y++)
        for (let x = Math.floor(x0); x <= x1; x++) {
            const s1 = side(a, b, x + 0.5, y + 0.5),
                s2 = side(b, d, x + 0.5, y + 0.5),
                s3 = side(d, a, x + 0.5, y + 0.5)
            if ((s1 >= 0 && s2 >= 0 && s3 >= 0) || (s1 <= 0 && s2 <= 0 && s3 <= 0)) px(ctx, c, x, y)
        }
}

// 4-point twinkle.
export function sparkle(ctx, x, y, size, c = 'W') {
    px(ctx, c, x, y)
    for (let i = 1; i <= size; i++) {
        const cc = i === size ? 'y' : c
        px(ctx, cc, x + i, y)
        px(ctx, cc, x - i, y)
        px(ctx, cc, x, y + i)
        px(ctx, cc, x, y - i)
    }
}

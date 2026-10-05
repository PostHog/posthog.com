import { TEXTS, cpfOf, POP_OPEN, POP_CLOSE } from './timeline.js'
import { drawText, measure, wrap, LINE_H } from './font.js'
import { rect, px, W, H, progress, easeOut, lerp } from './fx.js'

// Rounded game panel with a bevel and a hard drop shadow.
export function panel(ctx, x, y, w, h, { fill = 'w', edge = 'k', bevel = 'S', shadow = 'k' } = {}) {
    if (h < 3) return
    rect(ctx, shadow, x + 2, y + 2, w, h)
    rect(ctx, edge, x + 1, y, w - 2, h)
    rect(ctx, edge, x, y + 1, w, h - 2)
    rect(ctx, fill, x + 1, y + 1, w - 2, h - 2)
    rect(ctx, bevel, x + 2, y + h - 3, w - 4, 1)
    rect(ctx, 'W', x + 2, y + 2, w - 4, 1)
}

function drawRich(ctx, line, x, y, color, highlight = [], hiColor = 'y') {
    let cx = x
    for (const word of line.split(' ')) {
        const bare = word.replace(/[^\w]/g, '')
        drawText(ctx, word, cx, y, { color: highlight.includes(bare) ? hiColor : color })
        cx += measure(word) + measure(' ') + 1
    }
}

const POP = { x: 14, y: 12, w: 236, pad: 8 }

// TUTORIAL pop-up: opens, types on, holds, closes.
export function tutorial(ctx, t, f) {
    const lines = wrap(t.text, POP.w - POP.pad * 2)
    const fullH = lines.length * LINE_H + POP.pad * 2 + 2
    // Back-to-back tutorials share one box, and a box closes in one cut, so no empty box ever flashes.
    const chainedIn = TEXTS.some((o) => o.kind === 'tutorial' && o !== t && o.end === t.start)
    const k = chainedIn ? 1 : easeOut(progress(f, t.start, t.start + POP_OPEN))
    const h = Math.round(fullH * k)
    const y = POP.y + Math.round((fullH - h) / 2)
    panel(ctx, POP.x, y, POP.w, h)
    if (k < 1) return

    // Tab
    const label = 'TUTORIAL'
    const tw = measure(label) + 10
    rect(ctx, 'k', POP.x + 7, POP.y - 11, tw + 2, 12)
    rect(ctx, 'b', POP.x + 8, POP.y - 10, tw, 11)
    rect(ctx, 'c', POP.x + 8, POP.y - 10, tw, 1)
    rect(ctx, 'y', POP.x + 10, POP.y - 6, 2, 2)
    drawText(ctx, label, POP.x + 14, POP.y - 8, { color: 'W', shadow: 'B' })

    let budget = Math.floor((f - t.start - (chainedIn ? 0 : POP_OPEN)) * cpfOf(t))
    lines.forEach((line, i) => {
        const shown = line.slice(0, Math.max(0, budget))
        budget -= line.length + 1
        drawText(ctx, shown, POP.x + POP.pad, POP.y + POP.pad + 1 + i * LINE_H, { color: 'k' })
    })
    if (budget >= 0 && Math.floor(f / 8) % 2 === 0) {
        const ax = POP.x + POP.w - 12
        const ay = POP.y + fullH - 8
        rect(ctx, 'o', ax, ay, 5, 1)
        rect(ctx, 'o', ax + 1, ay + 1, 3, 1)
        px(ctx, 'o', ax + 2, ay + 2)
    }
}

// Bottom caption bar, slides up.
export function caption(ctx, t, f) {
    const lines = wrap(t.text, W - 40)
    const barH = lines.length * LINE_H + 10
    const slide = easeOut(progress(f, t.start, t.start + POP_OPEN))
    const y = H - Math.round(barH * slide)
    rect(ctx, 'k', 0, y, W, barH)
    rect(ctx, 'o', 0, y, W, 1)
    if (slide < 1) return
    lines.forEach((line, i) =>
        drawRich(ctx, line, Math.round((W - measure(line)) / 2), y + 6 + i * LINE_H, 'w', t.highlight)
    )
}

// A question that surfaces in the dark: blinks in, drifts up, blinks out.
export function float(ctx, t, f, y = Math.round(lerp(64, 50, progress(f, t.start, t.end)))) {
    const age = f - t.start
    const left = t.end - f
    if ((age < POP_OPEN || left < POP_CLOSE) && f % 2) return
    const scale = measure(t.text) * 2 <= W - 20 ? 2 : 1
    drawText(ctx, t.text, Math.round((W - measure(t.text) * scale) / 2), y, { scale, color: 'W', outline: 'k' })
}
// A Level 3 question coming back as the heading of the screen that answers it: same look, parked low.
const echo = (ctx, t, f) => {
    ctx.fillStyle = 'rgba(21, 21, 21, 0.6)'
    ctx.fillRect(0, 156, W, 22)
    float(ctx, t, f, 160)
}

// End card: a headline and the setup command in a terminal strip.
export function endCard(ctx, t, f) {
    const k = easeOut(progress(f, t.start, t.start + POP_OPEN)) * (1 - progress(f, t.end - POP_CLOSE, t.end))
    // in the sky above the store, so the storefront, its labels and the arrivals stay visible below
    const w = Math.min(W - 8, Math.max(276, measure(t.cmd) + 44)),
        h = Math.round(50 * k),
        x = Math.round((W - w) / 2),
        y = 4 + Math.round((50 - h) / 2)
    panel(ctx, x, y, w, h, { fill: 'd', bevel: 'g' })
    if (k < 1) return
    drawRich(ctx, t.text, Math.round((W - measure(t.text)) / 2), y + 7, 'W', ['PostHog'], 'y')
    rect(ctx, 'k', x + 10, y + 22, w - 20, 20)
    rect(ctx, 'o', x + 10, y + 22, 3, 20)
    drawText(ctx, '$', x + 18, y + 29, { color: 'o' })
    drawText(ctx, t.cmd, x + 26, y + 29, { color: 'W' })
    if (Math.floor(f / 8) % 2 === 0) rect(ctx, 'S', x + 27 + measure(t.cmd), y + 29, 4, 7)
}

const RENDER = { tutorial, caption, float, echo, panel: endCard }
export function drawTexts(ctx, f) {
    for (const t of TEXTS) if (f >= t.start && f < t.end) RENDER[t.kind](ctx, t, f)
}

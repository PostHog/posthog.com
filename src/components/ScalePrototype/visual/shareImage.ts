import { formatRatio, formatShort, tightestFit } from '../data'
import type { Usage } from '../data'
import { layoutBoxes, markSize } from './Treemap'

const WIDTH = 1200
const HEIGHT = 630
const PAD = 48
const MAP_TOP = 190
const MAP_HEIGHT = 360
const GAP = 4
const INK = '#151515'
const PAPER = '#eeefe9'
const BRAND = '#f54e00'
const MUTED = '#6b6c66'
const FONT = 'system-ui, -apple-system, sans-serif'

export function drawShareImage(usage: Usage, name: string): HTMLCanvasElement {
    const canvas = document.createElement('canvas')
    canvas.width = WIDTH
    canvas.height = HEIGHT
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    context.fillStyle = PAPER
    context.fillRect(0, 0, WIDTH, HEIGHT)
    context.textBaseline = 'top'

    context.fillStyle = INK
    context.font = `bold 52px ${FONT}`
    const title = name || 'You'
    context.fillText(`${title[0].toUpperCase()}${title.slice(1)} vs. PostHog`, PAD, PAD)

    const fit = tightestFit(usage)
    if (fit) {
        context.font = `28px ${FONT}`
        context.fillStyle = MUTED
        context.fillText(`PostHog has ${formatRatio(fit.ratio)} of you covered.`, PAD, PAD + 72)
    }

    for (const rect of layoutBoxes(WIDTH - PAD * 2, MAP_HEIGHT)) {
        const x = PAD + rect.x + GAP
        const y = MAP_TOP + rect.y + GAP
        const w = rect.w - GAP * 2
        const h = rect.h - GAP * 2
        context.fillStyle = '#ffffff'
        context.fillRect(x, y, w, h)
        const own = usage[rect.product.key]
        if (own) {
            const mark = markSize(own / rect.product.perDay, w, h)
            context.fillStyle = BRAND
            context.fillRect(x, y + h - mark.h, mark.w, mark.h)
        }
        context.strokeStyle = INK
        context.lineWidth = 3
        context.strokeRect(x, y, w, h)
        if (w >= 110 && h >= 60) {
            context.fillStyle = INK
            context.font = `bold 20px ${FONT}`
            context.fillText(rect.product.name, x + 12, y + 12)
            context.fillStyle = MUTED
            context.font = `18px ${FONT}`
            context.fillText(formatShort(rect.product.perDay), x + 12, y + 38)
        }
    }

    context.fillStyle = MUTED
    context.font = `20px ${FONT}`
    context.fillText(
        'Orange is you, to scale in each box (tiny blocks are enlarged). Box sizes are compressed. posthog.com/scale',
        PAD,
        HEIGHT - PAD - 14
    )
    return canvas
}

export function shareImageBlob(usage: Usage, name: string): Promise<Blob> {
    return new Promise((resolve, reject) =>
        drawShareImage(usage, name).toBlob(
            (blob) => (blob ? resolve(blob) : reject(new Error('No image'))),
            'image/png'
        )
    )
}

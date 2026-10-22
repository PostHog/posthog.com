import { HEIGHT, HOLE, LANE_X, LANE_Y, MAX_FUEL, OUTLINE, RAMP_GATE, WIDTH, WORMHOLE } from './physics'
import type { Game } from './physics'

export const RED = '#F54E00'
export const YELLOW = '#F7A501'
export const BLUE = '#2F80FA'
export const PURPLE = '#B62AD9'
export const GREEN = '#6AA84F'
export const OFF = 'rgba(255, 255, 255, 0.14)'

let seed = 7
const random = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
const STARS = Array.from({ length: 140 }, () => ({
    x: 20 + random() * 360,
    y: random() * 640,
    r: 0.4 + random() * 1.2,
    phase: random() * 6,
}))

export function text(
    ctx: CanvasRenderingContext2D,
    value: string,
    x: number,
    y: number,
    size: number,
    color: string
): void {
    ctx.font = `bold ${size}px sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = color
    ctx.fillText(value, x, y)
}

function light(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, lit: boolean) {
    ctx.save()
    ctx.fillStyle = lit ? color : OFF
    if (lit) {
        ctx.shadowColor = color
        ctx.shadowBlur = 14
    }
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
}

function chevron(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, lit: boolean) {
    ctx.save()
    ctx.fillStyle = lit ? color : OFF
    if (lit) {
        ctx.shadowColor = color
        ctx.shadowBlur = 12
    }
    ctx.beginPath()
    ctx.moveTo(x, y - 7)
    ctx.lineTo(x + 10, y + 4)
    ctx.lineTo(x + 5, y + 4)
    ctx.lineTo(x, y - 1)
    ctx.lineTo(x - 5, y + 4)
    ctx.lineTo(x - 10, y + 4)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
}

// The playfield art under the 3D parts: space, lights, and labels. The 3D scene uses it as the floor texture.
export function drawFloor(ctx: CanvasRenderingContext2D, game: Game, time: number): void {
    const metal = ctx.createLinearGradient(0, 0, WIDTH, 0)
    metal.addColorStop(0, '#2a2e45')
    metal.addColorStop(0.5, '#151827')
    metal.addColorStop(1, '#2a2e45')
    ctx.fillStyle = metal
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    ctx.save()
    ctx.beginPath()
    ctx.moveTo(20, HEIGHT)
    for (const point of OUTLINE) ctx.lineTo(point.x, point.y)
    ctx.lineTo(380, HEIGHT)
    ctx.closePath()
    ctx.clip()
    const space = ctx.createLinearGradient(0, 0, 0, HEIGHT)
    space.addColorStop(0, '#2a1458')
    space.addColorStop(0.6, '#101640')
    space.addColorStop(1, '#070a20')
    ctx.fillStyle = space
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    for (const [x, y, r, color] of [
        [110, 190, 170, 'rgba(182, 42, 217, 0.35)'],
        [300, 430, 150, 'rgba(47, 128, 250, 0.25)'],
        [190, 600, 120, 'rgba(245, 78, 0, 0.18)'],
    ] as const) {
        const nebula = ctx.createRadialGradient(x, y, 0, x, y, r)
        nebula.addColorStop(0, color)
        nebula.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = nebula
        ctx.fillRect(0, 0, WIDTH, HEIGHT)
    }
    ctx.fillStyle = '#ffffff'
    for (const star of STARS) {
        ctx.globalAlpha = 0.35 + 0.65 * Math.abs(Math.sin(time * 0.8 + star.phase))
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fill()
    }
    ctx.globalAlpha = 1
    const planet = ctx.createRadialGradient(282, 158, 4, 290, 166, 30)
    planet.addColorStop(0, '#ffd08a')
    planet.addColorStop(0.6, YELLOW)
    planet.addColorStop(1, '#7a3b00')
    ctx.fillStyle = planet
    ctx.beginPath()
    ctx.arc(290, 166, 26, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = 'rgba(255, 220, 160, 0.7)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.ellipse(290, 166, 42, 9, -0.35, 0, Math.PI * 2)
    ctx.stroke()

    // A ring of lights around the center, like a warp gate. It spins faster with each rank.
    const spin = time * (0.6 + game.rank * 0.5)
    for (let i = 0; i < 16; i++) {
        const angle = spin + (i / 16) * Math.PI * 2
        light(ctx, 185 + Math.cos(angle) * 58, 395 + Math.sin(angle) * 22, 3, BLUE, i % 4 === 0)
    }
    ctx.restore()

    LANE_X.forEach((x, i) => {
        light(ctx, x, LANE_Y + 34, 6, YELLOW, game.lanes[i])
        text(ctx, 'HOG'[i], x, LANE_Y, 15, game.lanes[i] ? YELLOW : 'rgba(255, 255, 255, 0.45)')
    })

    const blink = Math.sin(time * 10) > 0
    const comboLit = game.comboTime > 0
    for (let i = 0; i < 3; i++) {
        chevron(
            ctx,
            (RAMP_GATE.left + RAMP_GATE.right) / 2,
            RAMP_GATE.y + 22 + i * 14,
            PURPLE,
            comboLit ? blink : i === Math.floor(time * 4) % 3
        )
    }
    text(ctx, 'RAMP', (RAMP_GATE.left + RAMP_GATE.right) / 2, RAMP_GATE.y + 70, 8, 'rgba(255, 255, 255, 0.6)')

    const full = game.fuel >= MAX_FUEL
    for (let i = 0; i < MAX_FUEL; i++) light(ctx, 153 + i * 16, 372, 5, GREEN, i < game.fuel && (!full || blink))
    text(ctx, 'FUEL', 185, 389, 9, 'rgba(255, 255, 255, 0.6)')
    ctx.save()
    ctx.shadowColor = RED
    ctx.shadowBlur = 12
    text(ctx, 'HOGBALL', 185, 422, 24, YELLOW)
    ctx.restore()
    for (let i = 2; i <= 5; i++) {
        light(ctx, 152 + (i - 2) * 22, 456, 8, RED, game.multiplier >= i)
        text(ctx, `${i}x`, 152 + (i - 2) * 22, 456, 8, '#ffffff')
    }

    light(ctx, 185, 600, 7, RED, game.saveTime > 0 && blink)
    text(ctx, 'SHOOT AGAIN', 185, 616, 7, 'rgba(255, 255, 255, 0.6)')
    if (game.tilted) text(ctx, 'TILT', 185, 500, 34, blink ? RED : YELLOW)

    ctx.fillStyle = '#05060d'
    ctx.beginPath()
    ctx.arc(HOLE.x, HOLE.y, HOLE.radius, 0, Math.PI * 2)
    ctx.fill()

    // The wormhole: a dark hole with a purple swirl around it
    ctx.save()
    ctx.translate(WORMHOLE.x, WORMHOLE.y)
    for (let i = 0; i < 3; i++) {
        ctx.rotate(time * 1.5 + (i * Math.PI * 2) / 3)
        ctx.strokeStyle = PURPLE
        ctx.globalAlpha = 0.7
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(0, 0, WORMHOLE.radius + 6, 0, Math.PI * 0.9)
        ctx.stroke()
    }
    ctx.restore()
    ctx.fillStyle = '#05060d'
    ctx.beginPath()
    ctx.arc(WORMHOLE.x, WORMHOLE.y, WORMHOLE.radius, 0, Math.PI * 2)
    ctx.fill()
    text(ctx, 'WORMHOLE', WORMHOLE.x, WORMHOLE.y - 26, 8, 'rgba(255, 255, 255, 0.6)')
    text(ctx, full ? 'LAUNCH!' : 'LAUNCH PAD', HOLE.x, HOLE.y - 24, 8, full ? YELLOW : 'rgba(255, 255, 255, 0.6)')
}

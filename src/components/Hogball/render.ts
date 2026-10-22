import {
    BALL_RADIUS,
    BALLS_PER_GAME,
    FLIPPER_RADIUS,
    HEIGHT,
    HOLE,
    LANE_X,
    LANE_Y,
    MAX_FUEL,
    OUTLINE,
    POST,
    RANKS,
    SLINGSHOTS,
    WALLS,
    WIDTH,
    ballInPlunger,
    flipperTip,
} from './physics'
import type { Game, Point } from './physics'

export type Images = { ball: HTMLImageElement; rocket: HTMLImageElement }

export const PANEL_WIDTH = 220
export const STRIP_HEIGHT = 84
export const GAP = 10
// Width of the top edge of the table relative to the bottom edge, which makes the table look tilted
const TILT = 0.82

const RED = '#F54E00'
const YELLOW = '#F7A501'
const BLUE = '#2F80FA'
const PURPLE = '#B62AD9'
const GREEN = '#6AA84F'
const BUMPER_COLORS = [RED, BLUE, PURPLE]
const OFF = 'rgba(255, 255, 255, 0.14)'
const LED = YELLOW

let seed = 7
const random = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
const STARS = Array.from({ length: 110 }, () => ({
    x: 20 + random() * 360,
    y: random() * 640,
    r: 0.4 + random() * 1.2,
    phase: random() * 6,
}))

const ready = (image: HTMLImageElement) => image.complete && image.naturalWidth > 0

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

function rail(ctx: CanvasRenderingContext2D, points: Point[][]) {
    const stroke = (width: number, color: string) => {
        ctx.lineWidth = width
        ctx.strokeStyle = color
        ctx.beginPath()
        for (const [a, b] of points) {
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
        }
        ctx.stroke()
    }
    stroke(9, '#0a0c18')
    stroke(5, '#8c95bb')
    stroke(1.5, '#eef1ff')
}

function text(ctx: CanvasRenderingContext2D, value: string, x: number, y: number, size: number, color: string) {
    ctx.font = `bold ${size}px sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = color
    ctx.fillText(value, x, y)
}

export function drawTable(ctx: CanvasRenderingContext2D, game: Game, images: Images, time: number): void {
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
    ctx.restore()

    LANE_X.forEach((x, i) => {
        light(ctx, x, LANE_Y + 34, 6, YELLOW, game.lanes[i])
        text(ctx, 'HOG'[i], x, LANE_Y, 15, game.lanes[i] ? YELLOW : 'rgba(255, 255, 255, 0.45)')
    })

    const full = game.fuel >= MAX_FUEL
    const blink = Math.sin(time * 10) > 0
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

    ctx.save()
    if (full) {
        ctx.shadowColor = YELLOW
        ctx.shadowBlur = blink ? 24 : 8
    }
    ctx.fillStyle = '#05060d'
    ctx.strokeStyle = full ? YELLOW : '#8c95bb'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(HOLE.x, HOLE.y, HOLE.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    ctx.restore()
    text(ctx, full ? 'LAUNCH!' : 'LAUNCH PAD', HOLE.x, HOLE.y - 22, 8, full ? YELLOW : 'rgba(255, 255, 255, 0.6)')

    for (const target of game.targets) {
        ctx.fillStyle = target.down ? '#05060d' : YELLOW
        ctx.fillRect(target.a.x - 3, target.a.y, 6, target.b.y - target.a.y)
        if (!target.down) {
            ctx.fillStyle = '#fff3c4'
            ctx.fillRect(target.a.x - 3, target.a.y, 2, target.b.y - target.a.y)
        }
    }

    rail(
        ctx,
        WALLS.filter((wall) => !wall.kick).map((wall) => [wall.a, wall.b])
    )
    ctx.fillStyle = RED
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(POST.x, POST.y, 6, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    for (const [top, bottom, tip] of SLINGSHOTS) {
        const fill = ctx.createLinearGradient(top.x, top.y, tip.x, tip.y)
        fill.addColorStop(0, RED)
        fill.addColorStop(1, '#8a2a00')
        ctx.fillStyle = fill
        ctx.beginPath()
        ctx.moveTo(top.x, top.y)
        ctx.lineTo(bottom.x, bottom.y)
        ctx.lineTo(tip.x, tip.y)
        ctx.closePath()
        ctx.fill()
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(tip.x, tip.y)
        ctx.lineTo(top.x, top.y)
        ctx.stroke()
    }

    game.bumpers.forEach((bumper, i) => {
        const color = BUMPER_COLORS[i % BUMPER_COLORS.length]
        const r = bumper.radius
        ctx.fillStyle = 'rgba(0, 0, 0, 0.45)'
        ctx.beginPath()
        ctx.arc(bumper.x + 3, bumper.y + 5, r, 0, Math.PI * 2)
        ctx.fill()
        ctx.save()
        if (bumper.flash) {
            ctx.shadowColor = '#ffffff'
            ctx.shadowBlur = 26
        }
        const dome = ctx.createRadialGradient(bumper.x - r / 3, bumper.y - r / 3, 2, bumper.x, bumper.y, r)
        dome.addColorStop(0, '#ffffff')
        dome.addColorStop(0.35, bumper.flash ? '#ffffff' : color)
        dome.addColorStop(1, '#14172b')
        ctx.fillStyle = dome
        ctx.beginPath()
        ctx.arc(bumper.x, bumper.y, r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        ctx.strokeStyle = '#eef1ff'
        ctx.lineWidth = 2
        ctx.stroke()
    })

    const pull = ballInPlunger(game) ? 18 * game.charge : 0
    ctx.strokeStyle = '#8c95bb'
    ctx.lineWidth = 2
    ctx.beginPath()
    for (let i = 0; i <= 8; i++) {
        const y = 614 + pull + ((HEIGHT - 614 - pull) * i) / 8
        ctx.lineTo(i % 2 ? 372 : 358, y)
    }
    ctx.stroke()
    ctx.fillStyle = RED
    ctx.fillRect(354, 606 + pull, 22, 8)

    for (const flipper of game.flippers) {
        const tip = flipperTip(flipper)
        for (const [width, color] of [
            [FLIPPER_RADIUS * 2 + 4, RED],
            [FLIPPER_RADIUS * 2 - 2, '#f4f6ff'],
        ] as const) {
            ctx.lineWidth = width
            ctx.strokeStyle = color
            ctx.beginPath()
            ctx.moveTo(flipper.pivot.x, flipper.pivot.y)
            ctx.lineTo(tip.x, tip.y)
            ctx.stroke()
        }
        light(ctx, flipper.pivot.x, flipper.pivot.y, 3, RED, true)
    }

    const { ball } = game
    const size = BALL_RADIUS * 2.6 * (game.hold > 0 ? 0.7 : 1)
    const y = ball.y + pull
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
    ctx.beginPath()
    ctx.ellipse(ball.x + 4, y + 6, BALL_RADIUS, BALL_RADIUS * 0.7, 0, 0, Math.PI * 2)
    ctx.fill()
    if (ready(images.ball)) {
        ctx.save()
        ctx.translate(ball.x, y)
        ctx.rotate(ball.angle)
        ctx.drawImage(images.ball, -size / 2, -size / 2, size, size)
        ctx.restore()
    }

    const vignette = ctx.createRadialGradient(200, 360, 160, 200, 360, 460)
    vignette.addColorStop(0, 'rgba(0, 0, 0, 0)')
    vignette.addColorStop(1, 'rgba(0, 0, 0, 0.55)')
    ctx.fillStyle = vignette
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
}

// Copies the flat table into the target one row at a time, each row a little narrower toward the top
export function drawTilted(
    ctx: CanvasRenderingContext2D,
    table: HTMLCanvasElement,
    x: number,
    y: number,
    width: number,
    height: number
): void {
    const rows = table.height
    for (let row = 0; row < rows; row++) {
        const scale = TILT + (1 - TILT) * (row / rows)
        const w = width * scale
        ctx.drawImage(
            table,
            0,
            row,
            table.width,
            1,
            x + (width - w) / 2,
            y + (row * height) / rows,
            w,
            height / rows + 1
        )
    }
}

function led(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    ctx.fillStyle = '#05060a'
    ctx.strokeStyle = '#3a3f5c'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.fill()
    ctx.stroke()
}

function digits(
    ctx: CanvasRenderingContext2D,
    value: string,
    x: number,
    y: number,
    size: number,
    align: CanvasTextAlign
) {
    ctx.font = `bold ${size}px "Courier New", monospace`
    ctx.textAlign = align
    ctx.textBaseline = 'middle'
    ctx.fillStyle = 'rgba(247, 165, 1, 0.12)'
    ctx.fillText('8'.repeat(value.length), x, y)
    ctx.save()
    ctx.shadowColor = LED
    ctx.shadowBlur = 8
    ctx.fillStyle = LED
    ctx.fillText(value, x, y)
    ctx.restore()
}

function wrap(ctx: CanvasRenderingContext2D, value: string, x: number, y: number, width: number, lineHeight: number) {
    const words = value.split(' ')
    let line = ''
    for (const word of words) {
        if (line && ctx.measureText(`${line} ${word}`).width > width) {
            ctx.fillText(line, x, y)
            line = word
            y += lineHeight
        } else line = line ? `${line} ${word}` : word
    }
    ctx.fillText(line, x, y)
}

export const messageOf = (game: Game): string =>
    game.messageTime > 0
        ? game.message
        : game.state === 'over'
        ? 'Game over. Press Space to play again'
        : game.state === 'ready'
        ? 'Hold Space to pull the plunger'
        : game.fuel >= MAX_FUEL
        ? 'Hit the launch pad'
        : 'Hit the bumpers to fill the fuel tank'

const pad = (score: number) => String(score).padStart(8, ' ')
const ballLabel = (game: Game) => `${Math.min(BALLS_PER_GAME, BALLS_PER_GAME - game.balls + 1)}`

export function drawPanel(ctx: CanvasRenderingContext2D, game: Game, best: number, images: Images): void {
    const w = PANEL_WIDTH
    const panel = ctx.createLinearGradient(0, 0, w, 0)
    panel.addColorStop(0, '#1b1e33')
    panel.addColorStop(1, '#0d0f1c')
    ctx.fillStyle = panel
    ctx.fillRect(0, 0, w, HEIGHT)
    ctx.strokeStyle = '#8c95bb'
    ctx.lineWidth = 3
    ctx.strokeRect(1.5, 1.5, w - 3, HEIGHT - 3)

    ctx.save()
    ctx.shadowColor = RED
    ctx.shadowBlur = 10
    text(ctx, 'HOGBALL', w / 2, 34, 30, YELLOW)
    ctx.restore()
    text(ctx, 'DEEP SPACE EDITION', w / 2, 60, 9, 'rgba(255, 255, 255, 0.6)')

    led(ctx, 14, 80, w - 28, 120)
    ctx.font = 'bold 10px sans-serif'
    ctx.textAlign = 'left'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)'
    ctx.fillText('SCORE', 24, 94)
    digits(ctx, pad(game.score), w - 24, 120, 26, 'right')
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)'
    ctx.font = 'bold 10px sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText('BALL', 24, 152)
    ctx.textAlign = 'right'
    ctx.fillText('BONUS', w - 24, 152)
    digits(ctx, ballLabel(game), 24, 176, 22, 'left')
    digits(ctx, `${game.multiplier}x`, w - 24, 176, 22, 'right')

    led(ctx, 14, 214, w - 28, 92)
    ctx.font = 'bold 10px sans-serif'
    ctx.textAlign = 'left'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)'
    ctx.fillText('RANK', 24, 230)
    digits(ctx, RANKS[game.rank].toUpperCase(), 24, 250, 16, 'left')
    ctx.font = 'bold 12px "Courier New", monospace'
    ctx.fillStyle = LED
    ctx.textAlign = 'left'
    wrap(ctx, messageOf(game).toUpperCase(), 24, 274, w - 48, 14)

    led(ctx, 14, 320, w - 28, 44)
    ctx.font = 'bold 10px sans-serif'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)'
    ctx.fillText('FUEL', 24, 334)
    for (let i = 0; i < MAX_FUEL; i++) {
        ctx.fillStyle = i < game.fuel ? GREEN : OFF
        ctx.fillRect(24 + i * 35, 344, 30, 10)
    }

    led(ctx, 14, 378, w - 28, 50)
    ctx.font = 'bold 10px sans-serif'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)'
    ctx.fillText('BEST', 24, 392)
    digits(ctx, pad(Math.max(best, game.score)), w - 24, 410, 18, 'right')

    if (ready(images.rocket)) ctx.drawImage(images.rocket, 40, 440, 140, 140)
    text(ctx, 'SPACE  launch     Z  /  flippers', w / 2, 612, 9, 'rgba(255, 255, 255, 0.6)')
}

export function drawStrip(ctx: CanvasRenderingContext2D, game: Game): void {
    led(ctx, 1, 1, WIDTH - 2, STRIP_HEIGHT - 2)
    digits(ctx, pad(game.score), 16, 26, 26, 'left')
    ctx.font = 'bold 10px sans-serif'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)'
    ctx.textAlign = 'right'
    ctx.fillText(
        `BALL ${ballLabel(game)}   BONUS ${game.multiplier}x   ${RANKS[game.rank].toUpperCase()}`,
        WIDTH - 16,
        26
    )
    ctx.font = 'bold 12px "Courier New", monospace'
    ctx.fillStyle = LED
    ctx.textAlign = 'left'
    ctx.fillText(messageOf(game).toUpperCase(), 16, 60)
}

// The rocket hedgehog flies up the screen for 1.6 seconds after a rocket launch
export function drawRocket(
    ctx: CanvasRenderingContext2D,
    images: Images,
    progress: number,
    width: number,
    height: number
): void {
    if (progress <= 0 || progress >= 1 || !ready(images.rocket)) return
    const size = Math.min(width, height) * 0.35
    ctx.save()
    ctx.globalAlpha = Math.min(1, (1 - progress) * 4)
    ctx.drawImage(
        images.rocket,
        width * 0.6 - size / 2 + progress * width * 0.1,
        height - progress * (height + size),
        size,
        size
    )
    ctx.restore()
}

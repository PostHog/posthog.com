import { BALLS_PER_GAME, HEIGHT, MAX_FUEL, RANKS, WIDTH } from './physics'
import type { Game } from './physics'
import { GREEN, OFF, RED, YELLOW, text } from './floor'
import type { Leader } from './pilots'

export const PANEL_WIDTH = 220
export const STRIP_HEIGHT = 84
const LED = YELLOW
const LABEL = 'rgba(255, 255, 255, 0.55)'

function led(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    ctx.fillStyle = '#05060a'
    ctx.strokeStyle = '#3a3f5c'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.fill()
    ctx.stroke()
}

function label(ctx: CanvasRenderingContext2D, value: string, x: number, y: number, align: CanvasTextAlign = 'left') {
    ctx.font = 'bold 10px sans-serif'
    ctx.textAlign = align
    ctx.textBaseline = 'middle'
    ctx.fillStyle = LABEL
    ctx.fillText(value, x, y)
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
        ? 'Game over. Press F2 or Space to play again'
        : game.state === 'ready'
        ? 'Hold Space to pull the plunger'
        : game.tilted
        ? 'Tilt!'
        : game.fuel >= MAX_FUEL
        ? 'Hit the launch pad'
        : 'Shoot the ramp or the bumpers to fill the fuel tank'

const pad = (score: number) => String(score).padStart(9, ' ')
const ballLabel = (game: Game) => `${Math.max(1, BALLS_PER_GAME - game.balls + 1)}`

export function drawPanel(
    ctx: CanvasRenderingContext2D,
    game: Game,
    best: number,
    rocket: HTMLImageElement,
    pilot: string,
    leaders: Leader[]
): void {
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
    label(ctx, 'SCORE', 24, 94)
    digits(ctx, pad(game.score), w - 24, 120, 24, 'right')
    label(ctx, 'BALL', 24, 152)
    label(ctx, 'BONUS', w / 2, 152, 'center')
    label(ctx, 'COMBO', w - 24, 152, 'right')
    digits(ctx, ballLabel(game), 24, 176, 22, 'left')
    digits(ctx, `${game.multiplier}x`, w / 2, 176, 22, 'center')
    digits(ctx, game.comboTime > 0 ? `${game.combo}x` : '-', w - 24, 176, 22, 'right')

    led(ctx, 14, 214, w - 28, 92)
    label(ctx, 'PILOT', 24, 230)
    label(ctx, RANKS[game.rank].toUpperCase(), w - 24, 230, 'right')
    digits(ctx, pilot.toUpperCase(), 24, 250, pilot.length > 18 ? 12 : 14, 'left')
    ctx.font = 'bold 12px "Courier New", monospace'
    ctx.fillStyle = game.tilted ? RED : LED
    ctx.textAlign = 'left'
    wrap(ctx, messageOf(game).toUpperCase(), 24, 274, w - 48, 14)

    led(ctx, 14, 320, w - 28, 44)
    label(ctx, 'FUEL', 24, 334)
    for (let i = 0; i < MAX_FUEL; i++) {
        ctx.fillStyle = i < game.fuel ? GREEN : OFF
        ctx.fillRect(24 + i * 35, 344, 30, 10)
    }

    led(ctx, 14, 378, w - 28, 50)
    label(ctx, 'BEST', 24, 392)
    digits(ctx, pad(Math.max(best, game.score)), w - 24, 410, 18, 'right')

    // Between games the panel shows the all-time leaderboard, like an arcade attract screen
    if (game.state !== 'playing' && leaders.length) {
        led(ctx, 14, 440, w - 28, 120)
        label(ctx, 'ALL-TIME TOP PILOTS', w / 2, 454, 'center')
        ctx.font = 'bold 9px "Courier New", monospace'
        ctx.textBaseline = 'middle'
        leaders.slice(0, 6).forEach((leader, i) => {
            const y = 472 + i * 15
            ctx.fillStyle = leader.name === pilot ? '#ffffff' : LED
            ctx.textAlign = 'left'
            ctx.fillText(`${i + 1} ${leader.name.toUpperCase()}`.slice(0, 22), 22, y)
            ctx.textAlign = 'right'
            ctx.fillText(leader.score.toLocaleString('en-US'), w - 22, y)
        })
    } else if (rocket.complete && rocket.naturalWidth) ctx.drawImage(rocket, 50, 436, 120, 120)
    text(ctx, 'SPACE plunger    Z  /  flippers', w / 2, 578, 9, 'rgba(255, 255, 255, 0.6)')
    text(ctx, 'X  .  ↑  bump table    F2 new game', w / 2, 596, 9, 'rgba(255, 255, 255, 0.6)')
    text(ctx, 'Mouse buttons work as flippers', w / 2, 614, 9, 'rgba(255, 255, 255, 0.6)')
}

export function drawStrip(ctx: CanvasRenderingContext2D, game: Game, pilot: string): void {
    led(ctx, 1, 1, WIDTH - 2, STRIP_HEIGHT - 2)
    digits(ctx, pad(game.score), 16, 26, 24, 'left')
    label(ctx, `BALL ${ballLabel(game)}   BONUS ${game.multiplier}x   ${pilot.toUpperCase()}`, WIDTH - 16, 26, 'right')
    ctx.font = 'bold 12px "Courier New", monospace'
    ctx.fillStyle = game.tilted ? RED : LED
    ctx.textAlign = 'left'
    ctx.fillText(messageOf(game).toUpperCase(), 16, 60)
}

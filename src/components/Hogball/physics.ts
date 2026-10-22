export type Point = { x: number; y: number }
export type Wall = { a: Point; b: Point; kick?: number }
export type Bumper = Point & { radius: number; flash: number }
export type Flipper = { pivot: Point; side: 1 | -1; angle: number; speed: number }
export type Input = { left: boolean; right: boolean; plunger: boolean }
export type Game = {
    ball: Point & { vx: number; vy: number; angle: number }
    flippers: [Flipper, Flipper]
    bumpers: Bumper[]
    lanes: boolean[]
    inLane: boolean[]
    charge: number
    score: number
    multiplier: number
    balls: number
    state: 'ready' | 'playing' | 'over'
}

export const WIDTH = 400
export const HEIGHT = 640
export const BALL_RADIUS = 9
export const FLIPPER_LENGTH = 58
export const FLIPPER_RADIUS = 6
export const LANE_X = [125, 185, 245]
export const LANE_Y = 105
export const BALLS_PER_GAME = 3
const GRAVITY = 800
const MAX_SPEED = 1400
const REST_ANGLE = 0.5
const UP_ANGLE = -0.5
const FLIPPER_SPEED = 24
const PLUNGER = { x: 365, y: 596 }

const arc = (cx: number, cy: number, r: number, from: number, to: number, steps: number): Point[] =>
    Array.from({ length: steps + 1 }, (_, i) => {
        const angle = from + ((to - from) * i) / steps
        return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
    })

const path = (points: Point[], kick?: number): Wall[] => points.slice(1).map((b, i) => ({ a: points[i], b, kick }))

export const WALLS: Wall[] = [
    ...path([{ x: 20, y: 470 }, ...arc(200, 200, 180, Math.PI, Math.PI * 2, 32), { x: 380, y: 610 }]),
    ...path([
        { x: 20, y: 470 },
        { x: 113, y: 556 },
    ]),
    ...path([
        { x: 350, y: 470 },
        { x: 257, y: 556 },
    ]),
    ...path([
        { x: 350, y: 190 },
        { x: 350, y: 610 },
        { x: 380, y: 610 },
    ]),
    ...path([
        { x: 62, y: 410 },
        { x: 62, y: 460 },
        { x: 104, y: 497 },
    ]),
    ...path(
        [
            { x: 104, y: 497 },
            { x: 62, y: 410 },
        ],
        380
    ),
    ...path([
        { x: 308, y: 410 },
        { x: 308, y: 460 },
        { x: 266, y: 497 },
    ]),
    ...path(
        [
            { x: 266, y: 497 },
            { x: 308, y: 410 },
        ],
        380
    ),
    ...[95, 155, 215, 275].map((x) => ({ a: { x, y: 85 }, b: { x, y: 125 } })),
]

export const flipperTip = ({ pivot, side, angle }: Flipper): Point => ({
    x: pivot.x + side * FLIPPER_LENGTH * Math.cos(angle),
    y: pivot.y + FLIPPER_LENGTH * Math.sin(angle),
})

export function createGame(): Game {
    return {
        ball: { ...PLUNGER, vx: 0, vy: 0, angle: 0 },
        flippers: [
            { pivot: { x: 115, y: 562 }, side: 1, angle: REST_ANGLE, speed: 0 },
            { pivot: { x: 255, y: 562 }, side: -1, angle: REST_ANGLE, speed: 0 },
        ],
        bumpers: [
            { x: 145, y: 235, radius: 22, flash: 0 },
            { x: 225, y: 235, radius: 22, flash: 0 },
            { x: 185, y: 305, radius: 22, flash: 0 },
        ],
        lanes: LANE_X.map(() => false),
        inLane: LANE_X.map(() => false),
        charge: 0,
        score: 0,
        multiplier: 1,
        balls: BALLS_PER_GAME,
        state: 'ready',
    }
}

export const ballInPlunger = ({ ball }: Game): boolean => ball.x > 350 && ball.y > PLUNGER.y - 2

const closest = (p: Point, { a, b }: Wall): Point => {
    const dx = b.x - a.x
    const dy = b.y - a.y
    const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy)))
    return { x: a.x + t * dx, y: a.y + t * dy }
}

// Pushes the ball out of a contact and reflects its velocity relative to the moving surface
function bounce(game: Game, contact: Point, reach: number, restitution: number, surface = { x: 0, y: 0 }) {
    const { ball } = game
    const dx = ball.x - contact.x
    const dy = ball.y - contact.y
    const d = Math.hypot(dx, dy)
    if (d >= reach || d === 0) return false
    const nx = dx / d
    const ny = dy / d
    ball.x = contact.x + nx * reach
    ball.y = contact.y + ny * reach
    const normal = (ball.vx - surface.x) * nx + (ball.vy - surface.y) * ny
    if (normal < 0) {
        ball.vx -= (1 + restitution) * normal * nx
        ball.vy -= (1 + restitution) * normal * ny
    }
    return { nx, ny }
}

const award = (game: Game, points: number) => {
    game.score += points * game.multiplier
}

export function launch(game: Game): void {
    if (game.state === 'over' || !ballInPlunger(game)) return
    game.ball.vy = -(700 + 800 * game.charge)
    game.charge = 0
    game.state = 'playing'
}

export function step(game: Game, input: Input, dt: number): void {
    for (const flipper of game.flippers) {
        const target = (flipper.side === 1 ? input.left : input.right) ? UP_ANGLE : REST_ANGLE
        const delta = Math.max(-FLIPPER_SPEED * dt, Math.min(FLIPPER_SPEED * dt, target - flipper.angle))
        flipper.angle += delta
        flipper.speed = delta / dt
    }
    for (const bumper of game.bumpers) bumper.flash = Math.max(0, bumper.flash - dt)

    const { ball } = game
    if (game.state === 'over') return
    if (ballInPlunger(game) && ball.vy >= 0) {
        game.charge = input.plunger ? Math.min(1, game.charge + dt) : game.charge
        ball.vx = 0
        ball.vy = 0
        ball.y = PLUNGER.y
        return
    }

    ball.vy += GRAVITY * dt
    const speed = Math.hypot(ball.vx, ball.vy)
    if (speed > MAX_SPEED) {
        ball.vx *= MAX_SPEED / speed
        ball.vy *= MAX_SPEED / speed
    }
    ball.x += ball.vx * dt
    ball.y += ball.vy * dt
    ball.angle += (ball.vx * dt) / BALL_RADIUS

    for (const wall of WALLS) {
        const hit = bounce(game, closest(ball, wall), BALL_RADIUS, 0.4)
        if (hit && wall.kick) {
            ball.vx += hit.nx * wall.kick
            ball.vy += hit.ny * wall.kick
            award(game, 10)
        }
    }
    for (const bumper of game.bumpers) {
        const hit = bounce(game, bumper, bumper.radius + BALL_RADIUS, 0.5)
        if (hit) {
            ball.vx += hit.nx * 300
            ball.vy += hit.ny * 300
            bumper.flash = 0.15
            award(game, 100)
        }
    }
    for (const flipper of game.flippers) {
        const contact = closest(ball, { a: flipper.pivot, b: flipperTip(flipper) })
        const rx = contact.x - flipper.pivot.x
        const ry = contact.y - flipper.pivot.y
        const w = flipper.speed * flipper.side
        bounce(game, contact, BALL_RADIUS + FLIPPER_RADIUS, 0.3, { x: -w * ry, y: w * rx })
    }

    LANE_X.forEach((x, i) => {
        const inside = Math.abs(ball.x - x) < 20 && Math.abs(ball.y - LANE_Y) < 20
        if (inside && !game.inLane[i]) {
            game.lanes[i] = true
            award(game, 250)
        }
        game.inLane[i] = inside
    })
    if (game.lanes.every(Boolean)) {
        award(game, 1000)
        game.multiplier = Math.min(5, game.multiplier + 1)
        game.lanes = game.lanes.map(() => false)
    }

    if (ball.y > HEIGHT + BALL_RADIUS * 2) {
        game.balls -= 1
        game.multiplier = 1
        Object.assign(ball, { ...PLUNGER, vx: 0, vy: 0, angle: 0 })
        game.state = game.balls > 0 ? 'ready' : 'over'
    }
}

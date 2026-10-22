export type Point = { x: number; y: number }
export type RampPoint = Point & { h: number }
export type Wall = { a: Point; b: Point; kick?: number }
export type Target = Wall & { down: boolean }
export type Bumper = Point & { radius: number; flash: number }
export type Flipper = { pivot: Point; side: 1 | -1; angle: number; speed: number }
export type Input = { left: boolean; right: boolean; plunger: boolean }
export type Bump = 'left' | 'right' | 'up'
export type Sound =
    | 'launch'
    | 'bumper'
    | 'sling'
    | 'target'
    | 'lane'
    | 'hole'
    | 'rocket'
    | 'ramp'
    | 'bump'
    | 'tilt'
    | 'save'
    | 'extra'
    | 'mission'
    | 'wormhole'
    | 'drain'
    | 'over'
export type Game = {
    ball: Point & { vx: number; vy: number; angle: number; z: number }
    flippers: [Flipper, Flipper]
    bumpers: Bumper[]
    targets: Target[]
    lanes: boolean[]
    inLane: boolean[]
    charge: number
    score: number
    multiplier: number
    balls: number
    bumperHits: number
    fuel: number
    rank: number
    rockets: number
    hold: number
    holeCooldown: number
    targetReset: number
    ramp: { s: number; v: number; reverse?: boolean } | null
    rampCooldown: number
    combo: number
    comboTime: number
    tiltMeter: number
    tilted: boolean
    saveTime: number
    saveAvailable: boolean
    padSave: boolean
    mission: number
    missionProgress: number
    missionsDone: number
    holeExit: 'pad' | 'wormhole'
    extraBallGiven: boolean
    shake: number
    message: string
    messageTime: number
    sounds: Sound[]
    state: 'ready' | 'playing' | 'over'
}

export const WIDTH = 400
export const HEIGHT = 640
export const BALL_RADIUS = 9
export const FLIPPER_LENGTH = 58
export const FLIPPER_RADIUS = 6
export const LANE_X = [125, 185, 245]
export const LANE_Y = 105
export const HOLE = { x: 300, y: 330, radius: 12 }
export const MAX_FUEL = 5
// A post on the top arc that turns a launched ball down into the lanes and bumpers
export const POST = { x: 81, y: 81 }
// The ball goes onto the ramp when it moves up across this line between the two x values
export const RAMP_GATE = { y: 228, left: 70, right: 112 }
// The ramp climbs from the gate to the top left corner, then comes down the left side to the inlane
export const RAMP_PATH: RampPoint[] = [
    { x: 91, y: 228, h: 0 },
    { x: 86, y: 185, h: 12 },
    { x: 74, y: 140, h: 26 },
    { x: 58, y: 112, h: 36 },
    { x: 42, y: 140, h: 34 },
    { x: 36, y: 220, h: 26 },
    { x: 38, y: 300, h: 18 },
    { x: 40, y: 380, h: 8 },
    { x: 42, y: 425, h: 0 },
]
export const BALLS_PER_GAME = 3
export const RANKS = [
    'Cadet',
    'Ensign',
    'Lieutenant',
    'Captain',
    'Lt Commander',
    'Commander',
    'Commodore',
    'Admiral',
    'Fleet Admiral',
]
export type MissionKind = 'ramp' | 'lanes' | 'bumper' | 'target' | 'hole'
// Missions run in order and repeat. Each two missions give a promotion to the next rank.
export const MISSIONS: { name: string; kind: MissionKind; goal: number }[] = [
    { name: 'Target practice', kind: 'bumper', goal: 8 },
    { name: 'Re-entry training', kind: 'lanes', goal: 1 },
    { name: 'Science', kind: 'target', goal: 6 },
    { name: 'Launch training', kind: 'ramp', goal: 2 },
    { name: 'Rendezvous', kind: 'hole', goal: 2 },
    { name: 'Bug hunt', kind: 'bumper', goal: 15 },
    { name: 'Rescue', kind: 'ramp', goal: 3 },
    { name: 'Alien menace', kind: 'target', goal: 9 },
]
// A second hole above the bumpers. The launch pad and the wormhole can send the ball out of either one.
export const WORMHOLE = { x: 185, y: 172, radius: 12 }
export const BALL_SAVE_SECONDS = 8
export const EXTRA_BALL_SCORE = 150000
const GRAVITY = 800
const RAMP_GRAVITY = 1500
const RAMP_FRICTION = 100
const RAMP_EXIT_SPEED = 350
const MAX_SPEED = 1400
const REST_ANGLE = 0.5
const UP_ANGLE = -0.5
const FLIPPER_SPEED = 24
const PLUNGER = { x: 365, y: 596 }
const HITS_PER_FUEL = 3
// The launch pad holds the ball for a random time, then kicks it up into the bumpers at a random angle
const HOLE_KICK = { x: -180, y: -800, spread: 100 }
const PAD_SAVE_SECONDS = 6
const COMBO_SECONDS = 5
const TILT_LIMIT = 2.6
const BUMPS: Record<Bump, Point> = { left: { x: 150, y: -60 }, right: { x: -150, y: -60 }, up: { x: 0, y: -200 } }

const arc = (cx: number, cy: number, r: number, from: number, to: number, steps: number): Point[] =>
    Array.from({ length: steps + 1 }, (_, i) => {
        const angle = from + ((to - from) * i) / steps
        return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
    })

const path = (points: Point[], kick?: number): Wall[] => points.slice(1).map((b, i) => ({ a: points[i], b, kick }))

export const OUTLINE: Point[] = [{ x: 20, y: 470 }, ...arc(200, 200, 180, Math.PI, Math.PI * 2, 32), { x: 380, y: 610 }]

export const SLINGSHOTS: Point[][] = [
    [
        { x: 62, y: 410 },
        { x: 62, y: 460 },
        { x: 104, y: 497 },
    ],
    [
        { x: 308, y: 410 },
        { x: 308, y: 460 },
        { x: 266, y: 497 },
    ],
]

export const WALLS: Wall[] = [
    ...path(OUTLINE),
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
    ...SLINGSHOTS.flatMap(([top, bottom, tip]) => [...path([top, bottom, tip]), ...path([tip, top], 380)]),
    ...[95, 155, 215, 275].map((x) => ({ a: { x, y: 85 }, b: { x, y: 125 } })),
    { a: { x: POST.x - 3, y: POST.y }, b: { x: POST.x + 3, y: POST.y } },
    // The low end of the ramp is too low to roll under, so walls close it off at the side and the top
    ...path([
        { x: 20, y: 300 },
        { x: 49, y: 300 },
        { x: 51, y: 380 },
        { x: 53, y: 422 },
    ]),
]

const RAMP_LENGTHS = RAMP_PATH.slice(1).map((b, i) => Math.hypot(b.x - RAMP_PATH[i].x, b.y - RAMP_PATH[i].y))
export const RAMP_LENGTH = RAMP_LENGTHS.reduce((sum, length) => sum + length, 0)

// Position, height, and direction at distance s along the ramp
export function rampAt(s: number): RampPoint & { dx: number; dy: number; dh: number } {
    let rest = Math.max(0, Math.min(RAMP_LENGTH, s))
    let i = 0
    while (i < RAMP_LENGTHS.length - 1 && rest > RAMP_LENGTHS[i]) rest -= RAMP_LENGTHS[i++]
    const a = RAMP_PATH[i]
    const b = RAMP_PATH[i + 1]
    const t = rest / RAMP_LENGTHS[i]
    const length = RAMP_LENGTHS[i]
    return {
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
        h: a.h + (b.h - a.h) * t,
        dx: (b.x - a.x) / length,
        dy: (b.y - a.y) / length,
        dh: (b.h - a.h) / length,
    }
}

export const flipperTip = ({ pivot, side, angle }: Flipper): Point => ({
    x: pivot.x + side * FLIPPER_LENGTH * Math.cos(angle),
    y: pivot.y + FLIPPER_LENGTH * Math.sin(angle),
})

export function createGame(): Game {
    return {
        ball: { ...PLUNGER, vx: 0, vy: 0, angle: 0, z: 0 },
        flippers: [
            { pivot: { x: 115, y: 562 }, side: 1, angle: REST_ANGLE, speed: 0 },
            { pivot: { x: 255, y: 562 }, side: -1, angle: REST_ANGLE, speed: 0 },
        ],
        bumpers: [
            { x: 145, y: 235, radius: 22, flash: 0 },
            { x: 225, y: 235, radius: 22, flash: 0 },
            { x: 185, y: 305, radius: 22, flash: 0 },
        ],
        targets: [290, 312, 334].map((y) => ({ a: { x: 58, y }, b: { x: 58, y: y + 16 }, down: false })),
        lanes: LANE_X.map(() => false),
        inLane: LANE_X.map(() => false),
        charge: 0,
        score: 0,
        multiplier: 1,
        balls: BALLS_PER_GAME,
        bumperHits: 0,
        fuel: 0,
        rank: 0,
        rockets: 0,
        hold: 0,
        holeCooldown: 0,
        targetReset: 0,
        ramp: null,
        rampCooldown: 0,
        combo: 0,
        comboTime: 0,
        tiltMeter: 0,
        tilted: false,
        saveTime: 0,
        saveAvailable: true,
        padSave: false,
        mission: 0,
        missionProgress: 0,
        missionsDone: 0,
        holeExit: 'pad',
        extraBallGiven: false,
        shake: 0,
        message: 'Welcome aboard, Cadet',
        messageTime: 3,
        sounds: [],
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
    if (game.tilted) return
    game.score += points * game.multiplier
    if (!game.extraBallGiven && game.score >= EXTRA_BALL_SCORE) {
        game.extraBallGiven = true
        game.balls += 1
        say(game, 'Extra ball!')
        game.sounds.push('extra')
    }
}

const say = (game: Game, message: string) => {
    game.message = message
    game.messageTime = 2.5
}

const addFuel = (game: Game, fuel: number) => {
    const next = Math.min(MAX_FUEL, fuel)
    if (next === MAX_FUEL && game.fuel < MAX_FUEL) say(game, 'Fuel full. Hit the launch pad')
    game.fuel = next
}

export function launch(game: Game): void {
    if (game.state === 'over' || !ballInPlunger(game)) return
    game.ball.vy = -(700 + 800 * game.charge)
    game.charge = 0
    game.state = 'playing'
    game.padSave = false
    if (game.saveAvailable) game.saveTime = BALL_SAVE_SECONDS
    game.sounds.push('launch')
}

// A table bump moves the ball a little. Too many bumps in a short time tilt the table.
export function bump(game: Game, direction: Bump): void {
    if (game.state !== 'playing') return
    game.shake = 0.3
    game.sounds.push('bump')
    if (!game.ramp && !game.hold && !game.tilted) {
        game.ball.vx += BUMPS[direction].x
        game.ball.vy += BUMPS[direction].y
    }
    game.tiltMeter += 1
    if (game.tilted) return
    if (game.tiltMeter > TILT_LIMIT) {
        game.tilted = true
        game.shake = 0.6
        game.sounds.push('tilt')
        say(game, 'Tilt!')
    } else if (game.tiltMeter > TILT_LIMIT - 1) say(game, 'Careful!')
}

export function advanceMission(game: Game, kind: MissionKind): void {
    const mission = MISSIONS[game.mission]
    if (game.tilted || mission.kind !== kind) return
    game.missionProgress += 1
    if (game.missionProgress < mission.goal) return
    award(game, 20000 * (game.rank + 1))
    game.missionsDone += 1
    game.mission = (game.mission + 1) % MISSIONS.length
    game.missionProgress = 0
    game.sounds.push('mission')
    if (game.missionsDone % 2 === 0 && game.rank < RANKS.length - 1) {
        game.rank += 1
        game.shake = 0.4
        say(game, `Mission complete! Promoted to ${RANKS[game.rank]}`)
    } else say(game, `Mission complete: ${mission.name}`)
}

function enterHole(game: Game, from: 'pad' | 'wormhole') {
    const hole = from === 'pad' ? HOLE : WORMHOLE
    game.hold = 1 + Math.random() * 0.8
    game.holeExit = Math.random() < 0.5 ? 'pad' : 'wormhole'
    Object.assign(game.ball, { x: hole.x, y: hole.y, vx: 0, vy: 0 })
    if (game.tilted) return
    advanceMission(game, 'hole')
    if (from === 'wormhole') {
        award(game, 2500)
        say(game, 'Wormhole!')
        game.sounds.push('wormhole')
        return
    }
    if (game.fuel < MAX_FUEL) {
        award(game, 1000)
        say(game, 'Launch pad needs fuel')
        game.sounds.push('hole')
        return
    }
    award(game, 25000)
    game.rockets += 1
    game.fuel = 0
    game.bumperHits = 0
    game.shake = 0.5
    say(game, 'Rocket launch! 25,000')
    game.sounds.push('rocket')
}

function finishRamp(game: Game) {
    game.combo = game.comboTime > 0 ? Math.min(5, game.combo + 1) : 1
    game.comboTime = COMBO_SECONDS
    award(game, 2500 * game.combo)
    addFuel(game, game.fuel + 1)
    game.sounds.push('ramp')
    advanceMission(game, 'ramp')
    if (game.combo === 3) {
        award(game, 10000)
        say(game, 'Hyperspace! 10,000')
    } else say(game, game.combo > 1 ? `Ramp combo ${game.combo}x` : 'Ramp!')
}

function rideRamp(game: Game, dt: number) {
    const ramp = game.ramp
    const { ball } = game
    if (!ramp) return
    const at = rampAt(ramp.s)
    ramp.v += (GRAVITY * at.dy - RAMP_GRAVITY * at.dh - RAMP_FRICTION * Math.sign(ramp.v)) * dt
    ramp.s += ramp.v * dt
    const next = rampAt(ramp.s)
    ball.angle += (ramp.v * dt) / BALL_RADIUS
    Object.assign(ball, { x: next.x, y: next.y, z: next.h })
    if (ramp.s >= RAMP_LENGTH) {
        const exit = Math.min(ramp.v, RAMP_EXIT_SPEED)
        Object.assign(ball, { vx: next.dx * exit, vy: next.dy * exit, z: 0 })
        game.ramp = null
        game.rampCooldown = 0.4
        if (!game.tilted && !ramp.reverse) finishRamp(game)
    } else if (ramp.s <= 0) {
        Object.assign(ball, { vx: 0, vy: Math.max(120, -ramp.v), z: 0 })
        game.ramp = null
        game.rampCooldown = 0.4
    }
}

function drain(game: Game) {
    const { ball } = game
    const saved = game.saveTime > 0 && !game.tilted
    Object.assign(ball, { ...PLUNGER, vx: 0, vy: 0, angle: 0, z: 0 })
    game.tilted = false
    game.tiltMeter = 0
    game.combo = 0
    game.comboTime = 0
    game.saveTime = 0
    game.state = 'ready'
    if (saved) {
        if (!game.padSave) game.saveAvailable = false
        game.padSave = false
        game.sounds.push('save')
        say(game, 'Ball saved. Shoot again')
        return
    }
    game.balls -= 1
    game.multiplier = 1
    game.saveAvailable = true
    if (game.balls <= 0) game.state = 'over'
    game.sounds.push(game.state === 'over' ? 'over' : 'drain')
    say(game, game.state === 'over' ? 'Game over' : 'Ball lost')
}

export function step(game: Game, input: Input, dt: number): void {
    for (const flipper of game.flippers) {
        const up = !game.tilted && (flipper.side === 1 ? input.left : input.right)
        const target = up ? UP_ANGLE : REST_ANGLE
        const delta = Math.max(-FLIPPER_SPEED * dt, Math.min(FLIPPER_SPEED * dt, target - flipper.angle))
        flipper.angle += delta
        flipper.speed = delta / dt
    }
    for (const bumper of game.bumpers) bumper.flash = Math.max(0, bumper.flash - dt)
    game.messageTime = Math.max(0, game.messageTime - dt)
    game.holeCooldown = Math.max(0, game.holeCooldown - dt)
    game.rampCooldown = Math.max(0, game.rampCooldown - dt)
    game.comboTime = Math.max(0, game.comboTime - dt)
    game.tiltMeter = Math.max(0, game.tiltMeter - dt * 0.66)
    game.shake = Math.max(0, game.shake - dt)
    if (game.targetReset > 0) {
        game.targetReset -= dt
        if (game.targetReset <= 0) game.targets.forEach((target) => (target.down = false))
    }

    const { ball } = game
    if (game.state === 'over') return
    if (ballInPlunger(game) && ball.vy >= 0) {
        game.charge = input.plunger ? Math.min(1, game.charge + dt) : game.charge
        ball.vx = 0
        ball.vy = 0
        ball.y = PLUNGER.y
        return
    }
    game.saveTime = Math.max(0, game.saveTime - dt)
    if (game.ramp) return rideRamp(game, dt)
    if (game.hold > 0) {
        game.hold -= dt
        if (game.hold <= 0) {
            if (game.holeExit === 'pad') {
                Object.assign(ball, { x: HOLE.x, y: HOLE.y })
                ball.vx = HOLE_KICK.x + (Math.random() - 0.5) * 2 * HOLE_KICK.spread
                ball.vy = HOLE_KICK.y + (Math.random() - 0.5) * HOLE_KICK.spread
            } else {
                Object.assign(ball, { x: WORMHOLE.x, y: WORMHOLE.y })
                ball.vx = (Math.random() - 0.5) * 300
                ball.vy = 150 + Math.random() * 100
            }
            game.holeCooldown = 0.6
            // A drain soon after the kick-out gives the ball back, like ball save, without using up ball save
            if (game.saveTime <= 0) game.padSave = true
            game.saveTime = Math.max(game.saveTime, PAD_SAVE_SECONDS)
        }
        return
    }

    const previousY = ball.y
    ball.vy += GRAVITY * dt
    const speed = Math.hypot(ball.vx, ball.vy)
    if (speed > MAX_SPEED) {
        ball.vx *= MAX_SPEED / speed
        ball.vy *= MAX_SPEED / speed
    }
    ball.x += ball.vx * dt
    ball.y += ball.vy * dt
    ball.angle += (ball.vx * dt) / BALL_RADIUS

    if (
        !game.rampCooldown &&
        ball.vy < 0 &&
        previousY > RAMP_GATE.y &&
        ball.y <= RAMP_GATE.y &&
        ball.x > RAMP_GATE.left &&
        ball.x < RAMP_GATE.right
    ) {
        game.ramp = { s: 0, v: -ball.vy }
        return
    }
    // A ball that rolls up into the ramp exit goes up the ramp backwards, and scores nothing
    const exit = RAMP_PATH[RAMP_PATH.length - 1]
    if (!game.rampCooldown && ball.vy < 0 && previousY > exit.y && ball.y <= exit.y && ball.x > 20 && ball.x < 53) {
        game.ramp = { s: RAMP_LENGTH, v: ball.vy, reverse: true }
        return
    }

    for (const wall of WALLS) {
        const hit = bounce(game, closest(ball, wall), BALL_RADIUS, 0.4)
        if (hit && wall.kick && !game.tilted) {
            ball.vx += hit.nx * wall.kick
            ball.vy += hit.ny * wall.kick
            award(game, 10)
            game.sounds.push('sling')
        }
    }
    for (const target of game.targets) {
        if (target.down || !bounce(game, closest(ball, target), BALL_RADIUS + 2, 0.3)) continue
        target.down = true
        award(game, 500)
        game.sounds.push('target')
        advanceMission(game, 'target')
        if (game.targets.every((t) => t.down)) {
            award(game, 5000)
            game.targetReset = 1.5
            say(game, 'Drop targets cleared')
        }
    }
    for (const bumper of game.bumpers) {
        const hit = bounce(game, bumper, bumper.radius + BALL_RADIUS, 0.5)
        if (!hit || game.tilted) continue
        ball.vx += hit.nx * 300
        ball.vy += hit.ny * 300
        bumper.flash = 0.15
        award(game, 100)
        game.sounds.push('bumper')
        advanceMission(game, 'bumper')
        game.bumperHits += 1
        if (game.bumperHits % HITS_PER_FUEL === 0) addFuel(game, game.fuel + 1)
    }
    for (const flipper of game.flippers) {
        const contact = closest(ball, { a: flipper.pivot, b: flipperTip(flipper) })
        const rx = contact.x - flipper.pivot.x
        const ry = contact.y - flipper.pivot.y
        const w = flipper.speed * flipper.side
        bounce(game, contact, BALL_RADIUS + FLIPPER_RADIUS, 0.3, { x: -w * ry, y: w * rx })
    }

    if (!game.holeCooldown && Math.hypot(ball.x - HOLE.x, ball.y - HOLE.y) < HOLE.radius) enterHole(game, 'pad')
    else if (!game.holeCooldown && Math.hypot(ball.x - WORMHOLE.x, ball.y - WORMHOLE.y) < WORMHOLE.radius)
        enterHole(game, 'wormhole')

    LANE_X.forEach((x, i) => {
        const inside = Math.abs(ball.x - x) < 20 && Math.abs(ball.y - LANE_Y) < 20
        if (inside && !game.inLane[i] && !game.tilted) {
            game.lanes[i] = true
            award(game, 250)
            game.sounds.push('lane')
        }
        game.inLane[i] = inside
    })
    if (game.lanes.every(Boolean)) {
        award(game, 1000)
        game.multiplier = Math.min(5, game.multiplier + 1)
        advanceMission(game, 'lanes')
        game.lanes = game.lanes.map(() => false)
        say(game, `Bonus ${game.multiplier}x`)
    }

    if (ball.y > HEIGHT + BALL_RADIUS * 2) drain(game)
}

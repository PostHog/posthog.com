import assert from 'node:assert/strict'
import { test } from 'node:test'
import { ballInPlunger, bump, createGame, HOLE, launch, MAX_FUEL, RAMP_GATE, step } from './physics.ts'
import type { Game, Input } from './physics.ts'

const idle: Input = { left: false, right: false, plunger: false }

function run(game: Game, seconds: number, input: (game: Game) => Input = () => idle) {
    for (let i = 0; i < seconds * 480 && game.state === 'playing'; i++) step(game, input(game), 1 / 480)
}

test('a full-charge launch leaves the plunger lane and reaches the top of the table', () => {
    const game = createGame()
    game.charge = 1
    launch(game)
    let top = Infinity
    run(game, 1, (g) => {
        top = Math.min(top, g.ball.y)
        return idle
    })
    assert.ok(top < 60, `ball only reached y=${top}`)
    assert.ok(game.ball.x < 350, 'ball stays in the plunger lane')
})

test('a weak launch falls back to the plunger without losing a ball', () => {
    const game = createGame()
    launch(game)
    run(game, 2)
    assert.ok(ballInPlunger(game))
    assert.equal(game.balls, 3)
})

test('a raised flipper sends a falling ball back up the table', () => {
    const game = createGame()
    Object.assign(game.ball, { x: 150, y: 540, vx: 0, vy: 300 })
    game.state = 'playing'
    run(game, 0.08, () => ({ ...idle, left: true }))
    assert.ok(game.ball.vy < -600, `ball moves at vy=${game.ball.vy}`)
})

test('idle flippers drain every ball and end the game', () => {
    const game = createGame()
    for (let i = 0; i < 10 && game.state !== 'over'; i++) {
        game.charge = 1
        launch(game)
        run(game, 30)
    }
    assert.equal(game.balls, 0)
    assert.equal(game.state, 'over')
})

test('ball save gives the ball back once when it drains soon after launch', () => {
    const game = createGame()
    game.charge = 1
    launch(game)
    run(game, 30)
    assert.equal(game.balls, 3)
    assert.ok(!game.saveAvailable)
    game.charge = 1
    launch(game)
    run(game, 30)
    assert.equal(game.balls, 2)
})

test('the launch pad holds the ball, then kicks it out', () => {
    const game = createGame()
    game.state = 'playing'
    Object.assign(game.ball, { x: HOLE.x, y: HOLE.y - 4, vx: 0, vy: 50 })
    run(game, 0.5)
    assert.deepEqual([game.ball.x, game.ball.y], [HOLE.x, HOLE.y])
    assert.equal(game.score, 1000)
    run(game, 1)
    assert.ok(game.ball.x > HOLE.x + 10, `ball stays at x=${game.ball.x}`)
})

test('the launch pad feeds the ball to the right flipper, not down the middle', () => {
    const game = createGame()
    game.state = 'playing'
    Object.assign(game.ball, { x: HOLE.x, y: HOLE.y - 4, vx: 0, vy: 50 })
    let crossing = 0
    run(game, 6, (g) => {
        if (!crossing && g.ball.y > 548 && g.ball.vy > 0) crossing = g.ball.x
        return idle
    })
    assert.ok(crossing > 210, `ball reaches the flipper line at x=${crossing}`)
})

test('a full fuel tank turns the launch pad into a rocket launch', () => {
    const game = createGame()
    game.state = 'playing'
    game.fuel = MAX_FUEL
    Object.assign(game.ball, { x: HOLE.x, y: HOLE.y - 4, vx: 0, vy: 50 })
    run(game, 0.1)
    assert.equal(game.rockets, 1)
    assert.equal(game.rank, 1)
    assert.equal(game.fuel, 0)
    assert.equal(game.score, 25000)
})

test('the drop targets fall when hit and stand up again after the bank is cleared', () => {
    const game = createGame()
    game.state = 'playing'
    for (const target of game.targets) {
        Object.assign(game.ball, { x: 80, y: target.a.y + 8, vx: -400, vy: 0 })
        run(game, 0.08)
        assert.ok(target.down)
    }
    assert.equal(game.score, 3 * 500 + 5000)
    Object.assign(game.ball, { x: 365, y: 596, vx: 0, vy: 0 })
    for (let i = 0; i < 2 * 480; i++) step(game, idle, 1 / 480)
    assert.ok(game.targets.every((target) => !target.down))
})

const shootRamp = (speed: number) => {
    const game = createGame()
    game.state = 'playing'
    Object.assign(game.ball, { x: 91, y: RAMP_GATE.y + 6, vx: 0, vy: -speed })
    let top = 0
    run(game, 1, (g) => {
        top = Math.max(top, g.ball.z)
        return idle
    })
    return { game, top }
}

test('a fast shot rides the ramp and comes out at the left inlane', () => {
    const { game, top } = shootRamp(1000)
    assert.ok(top > 30, `ball only climbed to z=${top}`)
    assert.equal(game.combo, 1)
    assert.equal(game.fuel, 1)
    assert.ok(game.score >= 2500)
})

test('a slow shot rolls back down the ramp', () => {
    const { game } = shootRamp(450)
    assert.equal(game.combo, 0)
    assert.ok(game.score < 2500)
    assert.ok(game.ball.y > RAMP_GATE.y, `ball stays at y=${game.ball.y}`)
    assert.equal(game.ramp, null)
})

test('too many table bumps tilt the table, and the drain clears the tilt', () => {
    const game = createGame()
    game.state = 'playing'
    Object.assign(game.ball, { x: 200, y: 400, vx: 0, vy: 0 })
    bump(game, 'left')
    bump(game, 'right')
    assert.ok(!game.tilted)
    bump(game, 'up')
    assert.ok(game.tilted)
    run(game, 10, () => ({ left: true, right: true, plunger: false }))
    assert.ok(!game.tilted)
    assert.equal(game.balls, 2)
})

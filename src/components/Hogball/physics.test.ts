import assert from 'node:assert/strict'
import { test } from 'node:test'
import { ballInPlunger, createGame, HOLE, launch, MAX_FUEL, step } from './physics.ts'
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
    for (let i = 0; i < 3; i++) {
        game.charge = 1
        launch(game)
        run(game, 30)
    }
    assert.equal(game.balls, 0)
    assert.equal(game.state, 'over')
})

test('the launch pad holds the ball, then kicks it out', () => {
    const game = createGame()
    game.state = 'playing'
    Object.assign(game.ball, { x: HOLE.x, y: HOLE.y - 4, vx: 0, vy: 50 })
    run(game, 0.5)
    assert.deepEqual([game.ball.x, game.ball.y], [HOLE.x, HOLE.y])
    assert.equal(game.score, 1000)
    run(game, 1)
    assert.ok(game.ball.x < HOLE.x - 40, `ball stays at x=${game.ball.x}`)
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

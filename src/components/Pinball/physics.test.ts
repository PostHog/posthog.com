import assert from 'node:assert/strict'
import { test } from 'node:test'
import { ballInPlunger, createGame, launch, step } from './physics.ts'
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

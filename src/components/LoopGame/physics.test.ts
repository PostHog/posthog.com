import assert from 'node:assert/strict'
import { test } from 'node:test'
import { buildTrack, createChallenge, FINISH, launchRide, START, stepRide } from './physics.ts'
import type { Difficulty, TrackPoint } from './physics.ts'

function rideTrack(track: TrackPoint[], speed: number, difficulty: Difficulty = 'easy') {
    let ride = launchRide(track, speed)
    for (let i = 0; i < 2400 && (ride.state === 'riding' || ride.state === 'flying'); i++) {
        ride = stepRide(track, ride, 1 / 120, difficulty)
    }
    return ride
}

test('generated one-, two-, and three-loop guides are rideable at their suggested speeds', () => {
    const counts = new Set<number>()
    for (let seed = 1; seed <= 100; seed++) {
        let value = seed * 12345
        const challenge = createChallenge(() => {
            value = (value * 1664525 + 1013904223) >>> 0
            return value / 4294967296
        })
        counts.add(challenge.loops)
        const result = rideTrack(buildTrack(challenge.points), challenge.speed)
        assert.equal(result.state, 'finished', `seed ${seed}: ${result.reason}`)
        assert.equal(result.loops, challenge.loops)
        assert.equal(result.x, FINISH.x)
    }
    assert.equal(counts.size, 3)
})

test('not enough momentum stalls; too much speed on a tight bend derails', () => {
    const track = buildTrack(createChallenge(() => 0.25).points)
    assert.equal(rideTrack(track, 160).state, 'stalled')
    const tightTrack = buildTrack(createChallenge(() => 0.95).points)
    assert.equal(rideTrack(tightTrack, 520).state, 'crashed')
})

test('a straight shortcut reaches the finish but earns no loops', () => {
    const ride = rideTrack(buildTrack([START, FINISH]), 380)
    assert.equal(ride.state, 'finished')
    assert.equal(ride.loops, 0)
})

test('pausing the pointer does not change the rails or ride outcome', () => {
    const challenge = createChallenge(() => 0.8)
    const repeated = challenge.points.flatMap((p, i) => Array((i % 8) + 1).fill(p))
    const original = rideTrack(buildTrack(challenge.points), challenge.speed)
    assert.deepEqual(rideTrack(buildTrack(repeated), challenge.speed), original)
})

test('clicks and repeated identical points do not create a track', () => {
    assert.equal(buildTrack([]).length, 0)
    assert.equal(buildTrack([START, START, START]).length, 0)
})

test('small tracing wobbles stay attached instead of ejecting the cart', () => {
    const challenge = createChallenge(() => 0.25)
    const points = challenge.points.map((p, i) =>
        i === 0 || i === challenge.points.length - 1 ? p : { x: p.x, y: p.y + 2 * Math.sin(i * 0.4) }
    )
    const ride = rideTrack(buildTrack(points), challenge.speed)
    assert.equal(ride.state, 'finished')
    assert.equal(ride.loops, 1)
})

test('difficulty changes grip while preserving rideable generated rails', () => {
    for (const random of [0.25, 0.75, 0.95]) {
        const challenge = createChallenge(() => random)
        const track = buildTrack(challenge.points)
        for (const difficulty of ['easy', 'medium', 'hard'] as const) {
            assert.equal(rideTrack(track, challenge.speed, difficulty).state, 'finished')
        }
    }
    const challenge = createChallenge(() => 0.25)
    const wobbly = buildTrack(
        challenge.points.map((p, i) =>
            i === 0 || i === challenge.points.length - 1 ? p : { x: p.x, y: p.y + 2 * Math.sin(i * 0.4) }
        )
    )
    assert.equal(rideTrack(wobbly, challenge.speed, 'easy').state, 'finished')
    assert.equal(rideTrack(wobbly, challenge.speed, 'hard').state, 'crashed')
})

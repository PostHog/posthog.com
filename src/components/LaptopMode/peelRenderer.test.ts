import assert from 'node:assert/strict'
import test from 'node:test'
import { getPeelFold, getPeelProgress, localPeelPoint, PEEL_RADIUS } from './peelRenderer.ts'

test('the grabbed point stays under the pointer through bends, turns, and rotated stickers', () => {
    for (const width of [18, 72, 350]) {
        for (const rotation of [-135, 0, 45, 90, 180]) {
            for (const grab of [
                [0.48, 0.48],
                [-0.4, 0.2],
                [0, 0],
            ] as [number, number][]) {
                for (const [dx, dy] of [
                    [0, 0],
                    [-0.01, 0.01],
                    [-5, 0],
                    [-30, 40],
                    [40, -30],
                    [0, -120],
                ]) {
                    const pull = localPeelPoint(dx, dy, width, rotation)
                    const { direction, crease } = getPeelFold(grab, pull)
                    const distance = Math.max(0, grab[0] * direction[0] + grab[1] * direction[1] - crease)
                    const bent =
                        PEEL_RADIUS * Math.sin(Math.min(distance / PEEL_RADIUS, Math.PI)) -
                        Math.max(0, distance - PEEL_RADIUS * Math.PI)
                    const x = direction[0] * (bent - distance) * width
                    const y = -direction[1] * (bent - distance) * width
                    const angle = (rotation * Math.PI) / 180
                    assert.ok(Math.abs(x * Math.cos(angle) - y * Math.sin(angle) - dx) < 0.001)
                    assert.ok(Math.abs(x * Math.sin(angle) + y * Math.cos(angle) - dy) < 0.001)
                }
            }
        }
    }
})

test('resetting the pull leaves the whole sticker flat', () => {
    const { direction, crease } = getPeelFold([0.4, -0.2], [0, 0])
    for (const x of [-0.5, 0, 0.5]) {
        for (const y of [-0.5, 0, 0.5]) {
            assert.equal(Math.max(0, x * direction[0] + y * direction[1] - crease), 0)
        }
    }
})

test('peeling completes only when the crease has crossed the entire sticker', () => {
    assert.equal(getPeelProgress([0.5, 0.5], [0, 0]), 0)
    assert.ok(getPeelProgress([0.5, 0.5], [-0.5, 0]) < 1, 'Half-width drags must not complete the peel')
    assert.ok(getPeelProgress([0.5, 0.5], [-1, 0]) < 1, 'The curled sticker still has an attached edge')
    for (const grab of [
        [0.5, 0.5],
        [0, 0],
        [-0.45, 0.2],
    ] as [number, number][]) {
        for (const [dx, dy] of [
            [-1, 0],
            [0, 1],
            [-1, -1],
            [1, -0.3],
        ]) {
            for (const length of [0.0001, 0.1, 0.5, 1, 1.75, 2, 3]) {
                const pull: [number, number] = [dx * length, dy * length]
                const { direction, crease } = getPeelFold(grab, pull)
                const farEdge = -(Math.abs(direction[0]) + Math.abs(direction[1])) / 2
                const progress = getPeelProgress(grab, pull)
                assert.equal(progress === 1, crease <= farEdge)
                if (progress > 0 && progress < 1) {
                    const end = getPeelFold(grab, [pull[0] / progress, pull[1] / progress])
                    assert.ok(
                        Math.abs(end.crease - farEdge) < 0.000001,
                        'Keyboard continuation must finish at the edge'
                    )
                }
            }
        }
    }
})

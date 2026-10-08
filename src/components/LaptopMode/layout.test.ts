import assert from 'node:assert/strict'
import test from 'node:test'
import {
    constrainPlacement,
    getPeelStack,
    getPeelBounds,
    fitLaptopWidth,
    LAPTOP_ASPECT_RATIO,
    LID_ASPECT_RATIO,
    moveStickerPointer,
} from './layout.ts'

test('Shift rotates in place and releasing it resumes movement without a jump', () => {
    const position = { x: 300, y: 200 }
    const first = moveStickerPointer(position, position, { x: 310, y: 180 }, true)
    assert.deepEqual(first, { x: 300, y: 200, rotationDelta: -20 })
    const second = moveStickerPointer(first, { x: 310, y: 180 }, { x: 320, y: 170 }, true)
    assert.deepEqual(second, { x: 300, y: 200, rotationDelta: -10 })
    const released = moveStickerPointer(second, { x: 320, y: 170 }, { x: 325, y: 174 }, false)
    assert.deepEqual(released, { x: 305, y: 204, rotationDelta: 0 })
})

test('the laptop image and its shadow fit narrow, short, and resized view-only windows', () => {
    for (const [width, height] of [
        [1200, 300],
        [240, 800],
        [640, 480],
        [0, 0],
    ]) {
        const imageWidth = fitLaptopWidth(width, height)
        assert.ok(imageWidth >= 0 && imageWidth <= width)
        if (height >= 16) assert.ok(imageWidth / LAPTOP_ASPECT_RATIO + 16 <= height)
    }
})

test('fixed-size stickers stay inside the lid at every angle and position', () => {
    for (const size of [0.025, 0.12, 0.45]) {
        for (const rotation of [-540, -180, -135, -45, 0, 45, 90, 180, 540]) {
            for (const position of [-5, 0, 0.5, 1, 5]) {
                const placement = constrainPlacement({ id: 1, sticker: 0, x: position, y: position, rotation, size })
                const angle = (rotation * Math.PI) / 180
                const radius = (placement.size * (Math.abs(Math.cos(angle)) + Math.abs(Math.sin(angle)))) / 2
                assert.ok(placement.x - radius >= -1e-10)
                assert.ok(placement.x + radius <= 1 + 1e-10)
                assert.ok(placement.y - radius * LID_ASPECT_RATIO >= -1e-10)
                assert.ok(placement.y + radius * LID_ASPECT_RATIO <= 1 + 1e-10)
            }
        }
    }
    const centered = { id: 1, sticker: 0, x: 0.5, y: 0.5, rotation: 12, size: 0.16 }
    assert.deepEqual(constrainPlacement(centered), centered)
})

test('rotation wraps smoothly across a full turn', () => {
    const placement = { id: 1, sticker: 0, x: 0.5, y: 0.5, rotation: 0, size: 0.16 }
    assert.equal(constrainPlacement({ ...placement, rotation: 181 }).rotation, -179)
    assert.equal(constrainPlacement({ ...placement, rotation: -181 }).rotation, 179)
    assert.equal(constrainPlacement({ ...placement, rotation: 720 }).rotation, 0)
})

test('peeling follows only overlapping upper layers, including transitive stacks', () => {
    const p = (id: number, x: number, y = 0.5, rotation = 0) => ({
        id,
        position: id,
        x,
        y,
        rotation,
        size: 0.2,
        sticker: null,
    })
    const rows = [
        p(1, 0.25),
        p(2, 0.25),
        p(3, 0.42),
        p(4, 0.59),
        p(5, 0.8),
        { ...p(6, 0.7), removedAt: 'old' },
        p(7, 0.9),
    ]
    assert.deepEqual(
        getPeelStack(rows.slice().reverse(), 2).map((p) => p.id),
        [2, 3, 4]
    )
    assert.deepEqual(
        getPeelStack(rows, 4).map((p) => p.id),
        [4]
    )
    assert.deepEqual(getPeelStack(rows, 6), [])
    assert.deepEqual(getPeelStack(rows, 999), [])
    assert.equal(getPeelStack([p(1, 0.3), p(2, 0.5)], 1).length, 1, 'Touching edges do not overlap')
    assert.equal(getPeelStack([p(1, 0.3), p(2, 0.3, 0.78)], 1).length, 2, 'Account for lid aspect ratio')
    assert.equal(
        getPeelStack([p(1, 0.3, 0.3, 45), p(2, 0.5, 0.6, 45)], 1).length,
        1,
        'Rotated bounding boxes alone are not sufficient'
    )
    const stack = getPeelStack(rows, 2)
    const bounds = getPeelBounds(stack)
    for (const placement of stack) {
        for (const dx of [-0.5, 0.5])
            for (const dy of [-0.5, 0.5]) {
                assert.ok(Math.abs((placement.x + dx * placement.size - bounds.x) / bounds.size) <= 0.500001)
                assert.ok(
                    Math.abs(((placement.y - bounds.y) / LID_ASPECT_RATIO + dy * placement.size) / bounds.size) <=
                        0.500001
                )
            }
    }
})

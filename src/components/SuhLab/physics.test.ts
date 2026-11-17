import assert from "node:assert/strict"
import { test } from "node:test"
import {
    boxMeasurements,
    freeFall,
    gravityInHedgehogs,
    hedgehogLengthMeters,
    lengthUnits,
    pendulumPeriod,
    readMeasurement,
} from "./physics.ts"

test("seven inches and one hedgehog agree across all supported length units", () => {
    const values = [17.78, 0.1778, 7, 7 / 12, 1]
    lengthUnits.forEach((unit, index) =>
        assert.ok(Math.abs((values[index] * unit.meters) / hedgehogLengthMeters - 1) < 1e-12)
    )
})

test("empty, negative, non-finite, and excessive measurements are rejected; zero is valid", () => {
    for (const value of ["", " ", "-1", "NaN", "Infinity", "1e309", "1000001", "hog"])
        assert.equal(readMeasurement(value), null)
    assert.equal(readMeasurement("0"), 0)
    assert.equal(readMeasurement("1.25"), 1.25)
})

test("area and volume use squared and cubed conversion factors", () => {
    const box = boxMeasurements(hedgehogLengthMeters, hedgehogLengthMeters, hedgehogLengthMeters)
    assert.ok(Math.abs(box.area - 1) < 1e-12)
    assert.ok(Math.abs(box.volume - 1) < 1e-12)
    assert.equal(boxMeasurements(2, 3, 0).volume, 0)
    assert.equal(boxMeasurements(2, 3, 4).area, 6 / hedgehogLengthMeters ** 2)
    assert.equal(boxMeasurements(2, 3, 4).volume, 24 / hedgehogLengthMeters ** 3)
})

test("free fall clamps to the landing and follows constant-acceleration equations", () => {
    const fall = freeFall(gravityInHedgehogs / 2, 1)
    assert.ok(Math.abs(fall.duration - 1) < 1e-12)
    assert.equal(fall.speed, gravityInHedgehogs)
    assert.equal(freeFall(50, -1).distance, 0)
    assert.equal(freeFall(50, 100).distance, 50)
    assert.equal(freeFall(0, 1).time, 0)
    assert.ok(Math.abs(freeFall(50, fall.time).distance - gravityInHedgehogs / 2) < 1e-12)
})

test("a one-meter pendulum takes about 2.006 seconds; quadrupling length doubles its period", () => {
    assert.ok(Math.abs(pendulumPeriod(1 / hedgehogLengthMeters) - 2.00606668) < 1e-7)
    assert.ok(Math.abs(pendulumPeriod(20) / pendulumPeriod(5) - 2) < 1e-12)
})

export const hedgehogLengthMeters = (7 * 2.54) / 100
export const gravity = 9.81
export const gravityInHedgehogs = gravity / hedgehogLengthMeters

export const lengthUnits = [
    { label: "Centimeters", value: "cm", meters: 0.01 },
    { label: "Meters", value: "m", meters: 1 },
    { label: "Inches", value: "in", meters: 0.0254 },
    { label: "Feet", value: "ft", meters: 0.3048 },
    { label: "Hedgehogs", value: "h", meters: hedgehogLengthMeters },
]

export function readMeasurement(value: string): number | null {
    const number = Number(value)
    return value.trim() !== "" && Number.isFinite(number) && number >= 0 && number <= 1_000_000 ? number : null
}

export function boxMeasurements(length: number, width: number, height: number): { area: number; volume: number } {
    return {
        area: (length * width) / hedgehogLengthMeters ** 2,
        volume: (length * width * height) / hedgehogLengthMeters ** 3,
    }
}

export function freeFall(
    height: number,
    elapsed: number
): { duration: number; time: number; distance: number; speed: number } {
    const duration = Math.sqrt((2 * height) / gravityInHedgehogs)
    const time = Math.max(0, Math.min(elapsed, duration))
    return {
        duration,
        time,
        distance: Math.min(height, (gravityInHedgehogs * time ** 2) / 2),
        speed: gravityInHedgehogs * time,
    }
}

export function pendulumPeriod(length: number): number {
    return 2 * Math.PI * Math.sqrt(length / gravityInHedgehogs)
}

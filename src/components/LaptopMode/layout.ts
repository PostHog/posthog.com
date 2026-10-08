import type { Sticker } from './stickers'

export type Placement = {
    id: number
    sticker: Sticker | null
    x: number
    y: number
    rotation: number
    size: number
    position?: number
    removedAt?: string | null
}

export const LID_ASPECT_RATIO = 1.5
export const LAPTOP_ASPECT_RATIO = 933 / 729
export const MAX_STICKERS = 24

// ponytail: rotated image bounds for at most 24 stickers; use alpha masks if transparent margins need exact hit testing.
export function getPeelStack<
    T extends {
        id: number
        x: number
        y: number
        size: number
        rotation: number
        position?: number
        removedAt?: unknown
    }
>(placements: T[], id: number): T[] {
    const ordered = placements
        .filter((p) => !p.removedAt)
        .sort((a, b) => (a.position || 0) - (b.position || 0) || a.id - b.id)
    const start = ordered.findIndex((p) => p.id === id)
    if (start < 0) return []
    const stack = [ordered[start]]
    for (const upper of ordered.slice(start + 1)) {
        if (
            stack.some((lower) => {
                const angles = [lower.rotation, upper.rotation].map((r) => (r * Math.PI) / 180)
                return angles
                    .flatMap((r) => [r, r + Math.PI / 2])
                    .every((axis) => {
                        const distance = Math.abs(
                            (upper.x - lower.x) * Math.cos(axis) +
                                ((upper.y - lower.y) / LID_ASPECT_RATIO) * Math.sin(axis)
                        )
                        const radius = [lower, upper].reduce(
                            (sum, p, i) =>
                                sum +
                                (p.size / 2) *
                                    (Math.abs(Math.cos(angles[i] - axis)) + Math.abs(Math.sin(angles[i] - axis))),
                            0
                        )
                        return distance < radius - 1e-10
                    })
            })
        )
            stack.push(upper)
    }
    return stack
}

export function getPeelBounds(stack: Placement[]) {
    const edges = stack.map((p) => {
        const angle = (p.rotation * Math.PI) / 180
        const radius = (p.size / 2) * (Math.abs(Math.cos(angle)) + Math.abs(Math.sin(angle)))
        return {
            left: p.x - radius,
            right: p.x + radius,
            top: p.y / LID_ASPECT_RATIO - radius,
            bottom: p.y / LID_ASPECT_RATIO + radius,
        }
    })
    const left = Math.min(...edges.map((p) => p.left))
    const right = Math.max(...edges.map((p) => p.right))
    const top = Math.min(...edges.map((p) => p.top))
    const bottom = Math.max(...edges.map((p) => p.bottom))
    return {
        x: (left + right) / 2,
        y: ((top + bottom) / 2) * LID_ASPECT_RATIO,
        size: Math.max(right - left, bottom - top),
    }
}

export function fitLaptopWidth(width: number, height: number): number {
    return Math.max(0, Math.min(width, (height - 16) * LAPTOP_ASPECT_RATIO))
}

export function moveStickerPointer(
    position: { x: number; y: number },
    previous: { x: number; y: number },
    pointer: { x: number; y: number },
    rotate: boolean
): { x: number; y: number; rotationDelta: number } {
    return {
        x: rotate ? position.x : position.x + pointer.x - previous.x,
        y: rotate ? position.y : position.y + pointer.y - previous.y,
        rotationDelta: rotate ? pointer.y - previous.y : 0,
    }
}

export function constrainPlacement<T extends Pick<Placement, 'x' | 'y' | 'rotation' | 'size'>>(placement: T): T {
    const rotation = ((((placement.rotation + 180) % 360) + 360) % 360) - 180
    const radians = (rotation * Math.PI) / 180
    const halfWidth = (placement.size * (Math.abs(Math.cos(radians)) + Math.abs(Math.sin(radians)))) / 2
    const halfHeight = halfWidth * LID_ASPECT_RATIO
    return {
        ...placement,
        rotation,
        x: Math.min(1 - halfWidth, Math.max(halfWidth, placement.x)),
        y: Math.min(1 - halfHeight, Math.max(halfHeight, placement.y)),
    }
}

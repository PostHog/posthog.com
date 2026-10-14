import type { EventKind } from './eventKinds'

export interface Point {
    x: number
    y: number
}

export interface Box {
    left: number
    top: number
    width: number
    height: number
}

export type SolidSide = 'down' | 'up' | 'left' | 'right' | 'down-left' | 'down-right'

export interface SegmentSpec {
    from: Point
    to: Point
    solid: SolidSide
    passes?: EventKind
    grip?: boolean
    thickness?: number
}

export interface ConveyorZone {
    type: 'conveyor'
    box: Box
    speed: number
    grip?: number
}

export interface BatchRule {
    size: number
    waitMs: number
}

export interface ConverterZone {
    type: 'converter'
    box: Box
    intake: Point
    batch: BatchRule
    route: string
}

export interface CounterZone {
    type: 'counter'
    box: Box
    kind?: EventKind
    capacity: number
    isIngestion?: boolean
}

export interface EntryZone {
    type: 'entry'
    box: Box
    route: string
    velocity: Point
}

export interface SinkZone {
    type: 'sink'
    box: Box
}

export type Zone = ConveyorZone | ConverterZone | CounterZone | EntryZone | SinkZone

export interface Parts {
    segments: SegmentSpec[]
    zones: Zone[]
}

const SIDE_VECTORS: Record<SolidSide, Point> = {
    down: { x: 0, y: 1 },
    up: { x: 0, y: -1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
    'down-left': { x: -Math.SQRT1_2, y: Math.SQRT1_2 },
    'down-right': { x: Math.SQRT1_2, y: Math.SQRT1_2 },
}

export const distance = (a: Point, b: Point): number => Math.hypot(b.x - a.x, b.y - a.y)

export function solidNormal(from: Point, to: Point, solid: SolidSide): Point {
    const length = distance(from, to)
    const along = { x: (to.x - from.x) / length, y: (to.y - from.y) / length }
    const candidate = { x: -along.y, y: along.x }
    const hint = SIDE_VECTORS[solid]
    return candidate.x * hint.x + candidate.y * hint.y >= 0 ? candidate : { x: -candidate.x, y: -candidate.y }
}

export function polylineSegments(points: Point[], solid: SolidSide, extra: Partial<SegmentSpec> = {}): SegmentSpec[] {
    return points.slice(1).map((point, index) => ({ from: points[index], to: point, solid, ...extra }))
}

export function offsetPolyline(points: Point[], offset: number): Point[] {
    const rightHandNormal = (from: Point, to: Point): Point => {
        const length = distance(from, to) || 1
        return { x: -(to.y - from.y) / length, y: (to.x - from.x) / length }
    }
    return points.map((point, index) => {
        const before = index > 0 ? rightHandNormal(points[index - 1], point) : null
        const after = index < points.length - 1 ? rightHandNormal(point, points[index + 1]) : null
        const normal =
            before && after ? { x: before.x + after.x, y: before.y + after.y } : before ?? after ?? { x: 0, y: 1 }
        const length = Math.hypot(normal.x, normal.y) || 1
        const miter = before && after ? 1 / Math.max(0.5, (before.x * after.x + before.y * after.y + 1) / 2) ** 0.5 : 1
        return { x: point.x + (normal.x / length) * offset * miter, y: point.y + (normal.y / length) * offset * miter }
    })
}

export const centerOf = (box: Box): Point => ({ x: box.left + box.width / 2, y: box.top + box.height / 2 })

export const translatePoint = (point: Point, dx: number, dy: number): Point => ({ x: point.x + dx, y: point.y + dy })

export const translateBox = (box: Box, dx: number, dy: number): Box => ({
    left: box.left + dx,
    top: box.top + dy,
    width: box.width,
    height: box.height,
})

export function translateParts(parts: Parts, dx: number, dy: number): Parts {
    return {
        segments: parts.segments.map((segment) => ({
            ...segment,
            from: translatePoint(segment.from, dx, dy),
            to: translatePoint(segment.to, dx, dy),
        })),
        zones: parts.zones.map((zone) => {
            const box = translateBox(zone.box, dx, dy)
            return zone.type === 'converter'
                ? { ...zone, box, intake: translatePoint(zone.intake, dx, dy) }
                : { ...zone, box }
        }),
    }
}

export const isInsideBox = (box: Box, x: number, y: number): boolean =>
    x >= box.left && x <= box.left + box.width && y >= box.top && y <= box.top + box.height

export const pathData = (points: Point[]): string =>
    points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(' ')

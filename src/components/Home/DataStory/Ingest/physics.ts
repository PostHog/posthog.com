import type MatterModule from 'matter-js'
import { SORTING_ORDER } from './eventKinds'
import type { EventKind } from './eventKinds'
import { distance, solidNormal } from './geometry'
import type { SegmentSpec } from './geometry'

type Matter = typeof MatterModule

export type DynamicKind = 'tile' | 'bead'

export interface PageBounds {
    left: number
    right: number
    floor: number
}

export interface DynamicState {
    x: number
    y: number
    angle: number
    speed: number
    isSleeping: boolean
}

interface TileLaunch {
    x: number
    y: number
    width: number
    height: number
    vx: number
    vy: number
    spin: number
}

interface BeadLaunch {
    x: number
    y: number
    kind: EventKind
    vx: number
    vy: number
}

interface Surface {
    friction: number
    frictionStatic: number
}

interface DynamicEntry {
    body: MatterModule.Body
    kind: DynamicKind
    calmSteps: number
}

export const STEP_MS = 1000 / 60
const GRAVITY_SCALE = 0.001
export const GRAVITY_PER_STEP = GRAVITY_SCALE * STEP_MS * STEP_MS
export const BEAD_RADIUS = 5
const SEGMENT_THICKNESS = 24
const SEGMENT_OVERLAP = 2
const BOUNDARY_THICKNESS = 400
const BOUNDARY_OVERHANG = 4000
const MAX_BEAD_SPEED = 9
const CALM_SPEED = 0.12
const CALM_STEPS_BEFORE_SLEEP = 120
const MAX_TILE_TILT = 0.3

const STATIC_CATEGORY = 0x0001
const TILE_CATEGORY = 0x0002
const EVERYTHING = 0xffff
const beadCategory = (kind: EventKind): number => 0x0004 << SORTING_ORDER.indexOf(kind)

const SLIPPERY: Surface = { friction: 0, frictionStatic: 0 }
const GRIPPY: Surface = { friction: 0.2, frictionStatic: 0.4 }
const RESTING_FLOOR: Surface = { friction: 0.5, frictionStatic: 0.5 }

const TILE_BODY: MatterModule.IChamferableBodyDefinition = {
    restitution: 0.2,
    friction: 0.01,
    frictionStatic: 0,
    frictionAir: 0,
    density: 0.002,
    sleepThreshold: 45,
    chamfer: { radius: 4 },
    collisionFilter: { category: TILE_CATEGORY, mask: EVERYTHING },
}

const BEAD_BODY: MatterModule.IBodyDefinition = {
    restitution: 0.25,
    friction: 0.002,
    frictionStatic: 0,
    frictionAir: 0.004,
    density: 0.003,
    sleepThreshold: 40,
}

const withSurface = (body: MatterModule.Body, surface: Surface): MatterModule.Body => {
    body.friction = surface.friction
    body.frictionStatic = surface.frictionStatic
    return body
}

export class LineWorld {
    private readonly matter: Matter
    private readonly engine: MatterModule.Engine
    private readonly partBodies = new Map<string, MatterModule.Body[]>()
    private readonly dynamic = new Map<number, DynamicEntry>()
    private boundaryBodies: MatterModule.Body[] = []

    constructor(matter: Matter) {
        this.matter = matter
        this.engine = matter.Engine.create({
            enableSleeping: true,
            positionIterations: 8,
            velocityIterations: 6,
            gravity: { x: 0, y: 1, scale: GRAVITY_SCALE },
        })
    }

    setBounds({ left, right, floor }: PageBounds): void {
        const { Bodies, Composite } = this.matter
        const floorBody = Bodies.rectangle(
            (left + right) / 2,
            floor + BOUNDARY_THICKNESS / 2,
            right - left + BOUNDARY_OVERHANG * 2,
            BOUNDARY_THICKNESS,
            { isStatic: true, collisionFilter: { category: STATIC_CATEGORY, mask: EVERYTHING } }
        )

        Composite.remove(this.engine.world, this.boundaryBodies)
        this.boundaryBodies = [withSurface(floorBody, RESTING_FLOOR)]
        Composite.add(this.engine.world, this.boundaryBodies)
        this.wakeAll()
    }

    setParts(key: string, segments: SegmentSpec[]): void {
        const { Composite } = this.matter
        this.detachParts(key)

        const bodies = segments.map((segment) => this.segmentBody(segment))
        this.partBodies.set(key, bodies)
        Composite.add(this.engine.world, bodies)
        this.wakeAll()
    }

    removeParts(key: string): void {
        this.detachParts(key)
        this.partBodies.delete(key)
    }

    addTile(id: number, launch: TileLaunch): void {
        const { Bodies, Body, Composite } = this.matter
        const body = Bodies.rectangle(launch.x, launch.y, launch.width, launch.height, TILE_BODY)
        Body.setVelocity(body, { x: launch.vx, y: launch.vy })
        Body.setAngularVelocity(body, launch.spin)
        Composite.add(this.engine.world, body)
        this.dynamic.set(id, { body, kind: 'tile', calmSteps: 0 })
    }

    addBead(id: number, launch: BeadLaunch): void {
        const { Bodies, Body, Composite } = this.matter
        const body = Bodies.circle(launch.x, launch.y, BEAD_RADIUS, {
            ...BEAD_BODY,
            collisionFilter: { category: beadCategory(launch.kind), mask: EVERYTHING },
        })
        Body.setVelocity(body, { x: launch.vx, y: launch.vy })
        Composite.add(this.engine.world, body)
        this.dynamic.set(id, { body, kind: 'bead', calmSteps: 0 })
    }

    remove(id: number): void {
        const entry = this.dynamic.get(id)
        if (!entry) {
            return
        }
        this.matter.Composite.remove(this.engine.world, entry.body)
        this.dynamic.delete(id)
    }

    read(id: number): DynamicState | null {
        const entry = this.dynamic.get(id)
        if (!entry) {
            return null
        }
        const { body } = entry
        return {
            x: body.position.x,
            y: body.position.y,
            angle: body.angle,
            speed: body.speed,
            isSleeping: body.isSleeping,
        }
    }

    pushHorizontally(id: number, speed: number, blend: number): void {
        const entry = this.dynamic.get(id)
        if (!entry) {
            return
        }
        const { body } = entry
        if (body.isSleeping) {
            this.matter.Sleeping.set(body, false)
        }
        const velocity = this.matter.Body.getVelocity(body)
        this.matter.Body.setVelocity(body, { x: velocity.x + (speed - velocity.x) * blend, y: velocity.y })
    }

    wakeAll(): void {
        this.dynamic.forEach(({ body }) => this.matter.Sleeping.set(body, false))
    }

    hasAwakeBodies(): boolean {
        return Array.from(this.dynamic.values()).some(({ body }) => !body.isSleeping)
    }

    step(): void {
        const { Body, Sleeping } = this.matter
        this.dynamic.forEach((entry) => {
            const { body } = entry
            if (body.isSleeping) {
                entry.calmSteps = 0
                return
            }
            if (entry.kind === 'tile' && Math.abs(body.angle) > MAX_TILE_TILT) {
                Body.setAngle(body, Math.sign(body.angle) * MAX_TILE_TILT)
                Body.setAngularVelocity(body, 0)
            }
            if (entry.kind === 'bead' && body.speed > MAX_BEAD_SPEED) {
                const velocity = Body.getVelocity(body)
                const scale = MAX_BEAD_SPEED / body.speed
                Body.setVelocity(body, { x: velocity.x * scale, y: velocity.y * scale })
            }
            entry.calmSteps = body.speed < CALM_SPEED ? entry.calmSteps + 1 : 0
            if (entry.calmSteps > CALM_STEPS_BEFORE_SLEEP) {
                Sleeping.set(body, true)
                entry.calmSteps = 0
            }
        })
        this.matter.Engine.update(this.engine, STEP_MS)
    }

    clear(): void {
        this.matter.Composite.clear(this.engine.world, false)
        this.matter.Engine.clear(this.engine)
        this.partBodies.clear()
        this.dynamic.clear()
        this.boundaryBodies = []
    }

    private detachParts(key: string): void {
        this.matter.Composite.remove(this.engine.world, this.partBodies.get(key) ?? [])
    }

    private segmentBody(segment: SegmentSpec): MatterModule.Body {
        const { from, to } = segment
        const length = distance(from, to)
        const along = { x: (to.x - from.x) / length, y: (to.y - from.y) / length }
        const normal = solidNormal(from, to, segment.solid)
        const thickness = segment.thickness ?? SEGMENT_THICKNESS
        const start = { x: from.x - along.x * SEGMENT_OVERLAP, y: from.y - along.y * SEGMENT_OVERLAP }
        const end = { x: to.x + along.x * SEGMENT_OVERLAP, y: to.y + along.y * SEGMENT_OVERLAP }
        const body = this.matter.Bodies.rectangle(
            (start.x + end.x) / 2 + (normal.x * thickness) / 2,
            (start.y + end.y) / 2 + (normal.y * thickness) / 2,
            length + SEGMENT_OVERLAP * 2,
            thickness,
            {
                isStatic: true,
                angle: Math.atan2(to.y - from.y, to.x - from.x),
                collisionFilter: {
                    category: STATIC_CATEGORY,
                    mask: segment.passes ? EVERYTHING & ~beadCategory(segment.passes) : EVERYTHING,
                },
            }
        )
        return withSurface(body, segment.grip ? GRIPPY : SLIPPERY)
    }
}

import type MatterModule from 'matter-js'
import type { EventKind } from './eventKinds'
import { PIECE_SIZE, Point, RAIL_THICKNESS, RunLayout } from './layout'

type Matter = typeof MatterModule

export type Payload = { type: 'event'; kind: EventKind } | { type: 'source'; source: number }

interface Piece {
    body: MatterModule.Body
    element: HTMLElement
    payload: Payload
    bornAt: number
    captured: boolean
}

interface WorldOptions {
    layer: HTMLElement
    behindLayer: HTMLElement
    onLanded: (payload: Payload) => void
}

const STEP_MS = 1000 / 60
const GRAVITY_SCALE = 0.001
const MAX_SPEED = 10
const MAX_STEPS_PER_FRAME = 4
const LIFETIME_MS = 30000
const OUT_OF_BOUNDS = 60
const FADE_MS = 320
const CAPTURED_FALL_MS = 600
const CONVEYOR_SPEED = 3.6
const CONVEYOR_GRIP = 0.12
const HALF_PIECE = PIECE_SIZE / 2

const SLIPPERY = { friction: 0.001, frictionStatic: 0 }
const RESTING = { friction: 0.4, frictionStatic: 0.5 }

const PIECE_BODY: MatterModule.IChamferableBodyDefinition = {
    restitution: 0.2,
    frictionAir: 0.01,
    density: 0.002,
    chamfer: { radius: 5 },
    ...SLIPPERY,
}

export class MarbleWorld {
    private readonly matter: Matter
    private readonly engine: MatterModule.Engine
    private readonly options: WorldOptions
    private layout: RunLayout | null = null
    private statics: MatterModule.Body[] = []
    private readonly pieces = new Map<number, Piece>()
    private readonly conveyors = new Map<number, Point>()
    private frame: number | null = null
    private lastTime: number | null = null
    private accumulator = 0

    constructor(matter: Matter, options: WorldOptions) {
        this.matter = matter
        this.options = options
        this.engine = matter.Engine.create({
            positionIterations: 8,
            velocityIterations: 6,
            gravity: { x: 0, y: 1, scale: GRAVITY_SCALE },
        })
        matter.Events.on(this.engine, 'collisionActive', this.carry)
    }

    setLayout(layout: RunLayout): void {
        const { Composite } = this.matter
        this.layout = layout
        Composite.remove(this.engine.world, this.statics)
        this.pieces.forEach((_, id) => this.remove(id, false))
        this.conveyors.clear()
        this.statics = layout.tracks.flatMap(({ points, carries }) =>
            points.slice(1).map((to, index) => {
                const from = points[index]
                const body = this.segmentBody(from, to, carries[index] ? SLIPPERY : RESTING)
                if (carries[index]) {
                    const length = Math.hypot(to.x - from.x, to.y - from.y)
                    this.conveyors.set(body.id, { x: (to.x - from.x) / length, y: (to.y - from.y) / length })
                }
                return body
            })
        )
        Composite.add(this.engine.world, this.statics)
    }

    spawn(payload: Payload, element: HTMLElement, at: Point, velocity: Point): void {
        const { Bodies, Body, Composite } = this.matter
        const body = Bodies.rectangle(at.x, at.y, PIECE_SIZE, PIECE_SIZE, PIECE_BODY)
        Body.setVelocity(body, velocity)
        Composite.add(this.engine.world, body)
        Object.assign(element.style, { position: 'absolute', left: '0', top: '0', willChange: 'transform' })
        this.options.layer.appendChild(element)
        const piece: Piece = { body, element, payload, bornAt: performance.now(), captured: false }
        this.pieces.set(body.id, piece)
        this.sync(piece)
        this.start()
    }

    destroy(): void {
        if (this.frame !== null) cancelAnimationFrame(this.frame)
        this.frame = null
        this.pieces.forEach(({ element }) => element.remove())
        this.pieces.clear()
        this.matter.Events.off(this.engine, 'collisionActive', this.carry)
        this.matter.Engine.clear(this.engine)
    }

    private readonly carry = ({ pairs }: MatterModule.IEventCollision<MatterModule.Engine>): void => {
        const { Body } = this.matter
        pairs.forEach(({ bodyA, bodyB }) => {
            const belt = this.conveyors.get(bodyA.id) ?? this.conveyors.get(bodyB.id)
            if (!belt) return
            const rider = this.conveyors.has(bodyA.id) ? bodyB : bodyA
            if (rider.isStatic) return
            const along = rider.velocity.x * belt.x + rider.velocity.y * belt.y
            if (along >= CONVEYOR_SPEED) return
            const push = (CONVEYOR_SPEED - along) * CONVEYOR_GRIP
            Body.setVelocity(rider, { x: rider.velocity.x + belt.x * push, y: rider.velocity.y + belt.y * push })
        })
    }

    private segmentBody(from: Point, to: Point, surface: typeof SLIPPERY): MatterModule.Body {
        const length = Math.hypot(to.x - from.x, to.y - from.y) + RAIL_THICKNESS
        return this.matter.Bodies.rectangle((from.x + to.x) / 2, (from.y + to.y) / 2, length, RAIL_THICKNESS, {
            isStatic: true,
            angle: Math.atan2(to.y - from.y, to.x - from.x),
            chamfer: { radius: RAIL_THICKNESS / 2 },
            ...surface,
        })
    }

    private sync({ body, element }: Piece): void {
        const { x, y } = body.position
        element.style.transform = `translate3d(${x - HALF_PIECE}px, ${y - HALF_PIECE}px, 0) rotate(${body.angle}rad)`
    }

    private start(): void {
        if (this.frame !== null) return
        this.lastTime = null
        this.frame = requestAnimationFrame(this.tick)
    }

    private readonly tick = (time: number): void => {
        const elapsed = this.lastTime === null ? STEP_MS : Math.min(time - this.lastTime, STEP_MS * MAX_STEPS_PER_FRAME)
        this.lastTime = time
        this.accumulator += elapsed
        while (this.accumulator >= STEP_MS) {
            this.matter.Engine.update(this.engine, STEP_MS)
            this.clampSpeeds()
            this.accumulator -= STEP_MS
        }
        const now = performance.now()
        this.pieces.forEach((piece, id) => {
            this.sync(piece)
            this.settle(piece, id, now)
        })
        this.frame = this.pieces.size ? requestAnimationFrame(this.tick) : null
    }

    private clampSpeeds(): void {
        const { Body } = this.matter
        this.pieces.forEach(({ body }) => {
            const speed = Math.hypot(body.velocity.x, body.velocity.y)
            if (speed <= MAX_SPEED) return
            Body.setVelocity(body, {
                x: (body.velocity.x / speed) * MAX_SPEED,
                y: (body.velocity.y / speed) * MAX_SPEED,
            })
        })
    }

    private settle(piece: Piece, id: number, now: number): void {
        const layout = this.layout
        if (!layout || piece.captured) return
        const { x, y } = piece.body.position
        const outside = y > layout.height + OUT_OF_BOUNDS || x < -OUT_OF_BOUNDS || x > layout.width + OUT_OF_BOUNDS
        if (outside || now - piece.bornAt > LIFETIME_MS) {
            this.remove(id, true)
            return
        }
        const { left, top, width, height } = layout.intake
        if (x > left && x < left + width && y > top && y < top + height) {
            this.options.onLanded(piece.payload)
            this.capture(piece, id)
        }
    }

    private capture(piece: Piece, id: number): void {
        piece.captured = true
        piece.body.collisionFilter = { ...piece.body.collisionFilter, mask: 0 }
        this.options.behindLayer.appendChild(piece.element)
        piece.element
            .animate([{ opacity: 1 }, { opacity: 0 }], {
                duration: CAPTURED_FALL_MS,
                easing: 'ease-in',
                fill: 'forwards',
            })
            .finished.then(
                () => this.remove(id, false),
                () => this.remove(id, false)
            )
    }

    private remove(id: number, fade: boolean): void {
        const piece = this.pieces.get(id)
        if (!piece) return
        this.matter.Composite.remove(this.engine.world, piece.body)
        this.pieces.delete(id)
        const { element } = piece
        if (!fade) {
            element.remove()
            return
        }
        element.animate([{ opacity: 1 }, { opacity: 0 }], { duration: FADE_MS }).finished.then(
            () => element.remove(),
            () => element.remove()
        )
    }
}

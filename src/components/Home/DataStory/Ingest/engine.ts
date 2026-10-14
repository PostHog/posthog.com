import type MatterModule from 'matter-js'
import { captureUserEvents } from './capture'
import type { SpawnPoint } from './capture'
import { emptyCounts } from './eventKinds'
import type { EventKind } from './eventKinds'
import { centerOf, distance, isInsideBox, translateParts } from './geometry'
import type { Box, ConverterZone, CounterZone, EntryZone, Parts, Point, Zone } from './geometry'
import { beadTransform, createBeadElement, createTileElement, tileTransform } from './objects'
import { GRAVITY_PER_STEP, LineWorld, STEP_MS } from './physics'
import type { PageBounds } from './physics'
import { TokenBucket } from './rateLimit'

const PAGE_SELECTOR = '[data-radix-scroll-area-viewport]'

export interface LineStats {
    startedAt: number
    captured: number
    ingested: Record<EventKind, number>
    maxScrollDepth: number
}

type Listener = () => void
type KindListener = (kind: EventKind) => void
type BatchListener = (partsKey: string, pending: EventKind[]) => void

export interface Delivery {
    route: string
    kinds: EventKind[]
}

type SendListener = (partsKey: string, delivery: Delivery) => void

interface Launch {
    vx: number
    vy: number
    spin: number
}

interface LineObjectBase {
    id: number
    kind: EventKind
    root: HTMLElement
    x: number
    y: number
    bornAt: number
    isLive: boolean
    isLeaving: boolean
    restingSince: number | null
}

interface TileObject extends LineObjectBase {
    type: 'tile'
    width: number
    height: number
    angle: number
    launch: Launch
}

interface BeadObject extends LineObjectBase {
    type: 'bead'
    countedIn: string | null
    launch: Launch
}

type LineObject = TileObject | BeadObject

interface PartsRegistration {
    element: HTMLElement
    parts: Parts
    positionKey: string
    isApplied: boolean
}

interface PlacedZone {
    id: string
    zone: Zone
}

interface PendingBatch {
    kinds: EventKind[]
    timer: number | null
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const TILE_BURST = 5
const TILES_PER_SECOND = 4
const MAX_TILES = 30
const MAX_BEADS = 260
const TILE_MAX_AGE_MS = 30000
const TILE_REST_BEFORE_FADE_MS = 3000
const BEAD_STUCK_BEFORE_FADE_MS = 6000
const MAX_STEPS_PER_FRAME = 4
const PHYSICS_IDLE_TIMEOUT_MS = 2000
const ESCAPE_MARGIN = 400
const SCROLL_DEPTH_STEP = 0.01
const CURSOR_CLEARANCE = 14
const POP_IN_MS = 180
const POP_START_SCALE = 0.25
const CONVERT_MS = 220
const FADE_MS = 500
const CONVEYOR_BLEND = 0.2
const BATCH_STAGGER_MS = 110
const THROW_BASE_STEPS = 18
const THROW_STEPS_PER_PX = 1 / 16
const THROW_MIN_STEPS = 22
const THROW_MAX_STEPS = 48
const THROW_SPIN = 0.01
const POP_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)'
const SWALLOW_EASING = 'cubic-bezier(0.55, 0, 1, 0.45)'

const randomBetween = (min: number, max: number): number => min + Math.random() * (max - min)

const launchFor = ({ pop }: SpawnPoint): Launch =>
    pop
        ? { vx: randomBetween(-1.6, 1.6), vy: randomBetween(-6.4, -5), spin: randomBetween(-0.018, 0.018) }
        : { vx: randomBetween(-0.3, 0.3), vy: 0, spin: randomBetween(-0.01, 0.01) }

const throwAt = (from: Point, target: Point): Launch => {
    const steps = Math.min(
        THROW_MAX_STEPS,
        Math.max(THROW_MIN_STEPS, THROW_BASE_STEPS + distance(from, target) * THROW_STEPS_PER_PX)
    )
    return {
        vx: (target.x - from.x) / steps,
        vy: (target.y - from.y) / steps - (GRAVITY_PER_STEP * (steps + 1)) / 2,
        spin: randomBetween(-THROW_SPIN, THROW_SPIN),
    }
}

const freshStats = (): LineStats => ({ startedAt: Date.now(), captured: 0, ingested: emptyCounts(), maxScrollDepth: 0 })

const whenIdle = (callback: () => void): (() => void) => {
    if (typeof window.requestIdleCallback === 'function') {
        const handle = window.requestIdleCallback(callback, { timeout: PHYSICS_IDLE_TIMEOUT_MS })
        return () => window.cancelIdleCallback(handle)
    }
    const handle = window.setTimeout(callback, 0)
    return () => window.clearTimeout(handle)
}

const overlaps = (a: Box, b: Box): boolean =>
    a.left < b.left + b.width && b.left < a.left + a.width && a.top < b.top + b.height && b.top < a.top + a.height

const tileBox = (tile: { x: number; y: number; width: number; height: number }): Box => ({
    left: tile.x - tile.width / 2,
    top: tile.y - tile.height / 2,
    width: tile.width,
    height: tile.height,
})

const partsKeyOf = (zoneId: string): string => zoneId.split(':')[0]

export class DataLineEngine {
    private overlay: HTMLElement | null = null
    private page: HTMLElement | null = null
    private captureRegion: HTMLElement | null = null
    private world: LineWorld | null = null
    private isLoadingPhysics = false
    private bounds: PageBounds | null = null
    private boundsKey = ''
    private readonly registrations = new Map<string, PartsRegistration>()
    private zones: PlacedZone[] = []
    private readonly objects = new Map<number, LineObject>()
    private readonly pendingBatches = new Map<string, PendingBatch>()
    private readonly openRoutes = new Set<string>()
    private readonly timers = new Set<number>()
    private stats: LineStats = freshStats()
    private nextId = 1
    private frame: number | null = null
    private lastFrameAt = 0
    private unspentMs = 0
    private reducedMotion = false
    private readonly bucket = new TokenBucket(TILE_BURST, TILES_PER_SECOND)
    private readonly statsListeners = new Set<Listener>()
    private readonly motionListeners = new Set<Listener>()
    private readonly ingestListeners = new Set<KindListener>()
    private readonly batchListeners = new Set<BatchListener>()
    private readonly sendListeners = new Set<SendListener>()
    private resizeObserver: ResizeObserver | null = null
    private teardown: Array<() => void> = []

    subscribeStats = (listener: Listener): (() => void) => this.subscribe(this.statsListeners, listener)

    getStats = (): LineStats => this.stats

    subscribeMotion = (listener: Listener): (() => void) => this.subscribe(this.motionListeners, listener)

    isReducedMotion = (): boolean => this.reducedMotion

    onIngest = (listener: KindListener): (() => void) => this.subscribe(this.ingestListeners, listener)

    onBatchChange = (listener: BatchListener): (() => void) => this.subscribe(this.batchListeners, listener)

    onSend = (listener: SendListener): (() => void) => this.subscribe(this.sendListeners, listener)

    attach = (overlay: HTMLElement): (() => void) => {
        const page = overlay.closest<HTMLElement>(PAGE_SELECTOR) ?? document.documentElement
        const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY)
        const applyMotionPreference = () => {
            this.setReducedMotion(motionQuery.matches)
            if (this.reducedMotion) {
                this.clearObjects()
            } else if (this.overlay) {
                this.loadPhysics()
            }
        }
        const resizeObserver = new ResizeObserver(this.measure)

        this.overlay = overlay
        this.page = page
        this.resizeObserver = resizeObserver
        this.boundsKey = ''
        this.setReducedMotion(motionQuery.matches)
        resizeObserver.observe(overlay)
        resizeObserver.observe(page)
        this.registrations.forEach(({ element }) => resizeObserver.observe(element))
        motionQuery.addEventListener('change', applyMotionPreference)

        this.teardown = [
            captureUserEvents({ page, emit: this.emit, onScrollDepth: this.recordScrollDepth }),
            whenIdle(this.loadPhysics),
            () => motionQuery.removeEventListener('change', applyMotionPreference),
            () => resizeObserver.disconnect(),
        ]
        this.measure()
        return this.detach
    }

    setCaptureRegion = (element: HTMLElement | null): void => {
        this.captureRegion = element
    }

    registerParts = (key: string, element: HTMLElement, parts: Parts): (() => void) => {
        const previous = this.registrations.get(key)
        this.registrations.set(key, {
            element,
            parts,
            positionKey: previous?.element === element ? previous.positionKey : '',
            isApplied: false,
        })
        this.resizeObserver?.observe(element)
        this.measure()
        return () => {
            const registration = this.registrations.get(key)
            if (!registration || registration.element !== element) {
                return
            }
            this.registrations.delete(key)
            this.world?.removeParts(key)
            this.zones = this.zones.filter((placed) => partsKeyOf(placed.id) !== key)
        }
    }

    setRouteOpen = (route: string, open: boolean): void => {
        if (open === this.openRoutes.has(route)) {
            return
        }
        if (open) {
            this.openRoutes.add(route)
        } else {
            this.openRoutes.delete(route)
        }
        this.pendingBatches.forEach((_, zoneId) => {
            if (this.converterZone(zoneId)?.route === route) {
                this.flushBatch(zoneId)
            }
        })
    }

    emitAt = (kind: EventKind, clientX: number, clientY: number): void => {
        this.emit(kind, { clientX, clientY, pop: true })
    }

    deliver = (route: string, kinds: EventKind[]): void => {
        kinds.forEach((kind, index) =>
            this.later(() => {
                const entry = this.entryZone(route)
                if (entry) {
                    this.spawnBead(kind, centerOf(entry.box), entry.velocity)
                }
            }, index * BATCH_STAGGER_MS)
        )
    }

    entryClientPoint = (route: string): Point | null => {
        const entry = this.entryZone(route)
        const origin = this.overlay?.getBoundingClientRect()
        if (!entry || !origin) {
            return null
        }
        const center = centerOf(entry.box)
        return { x: origin.left + center.x, y: origin.top + center.y }
    }

    private subscribe<T>(listeners: Set<T>, listener: T): () => void {
        listeners.add(listener)
        return () => {
            listeners.delete(listener)
        }
    }

    private setReducedMotion(reducedMotion: boolean): void {
        if (reducedMotion === this.reducedMotion) {
            return
        }
        this.reducedMotion = reducedMotion
        this.motionListeners.forEach((listener) => listener())
    }

    private detach = (): void => {
        this.teardown.forEach((undo) => undo())
        this.teardown = []
        if (this.frame !== null) {
            cancelAnimationFrame(this.frame)
            this.frame = null
        }
        this.clearObjects()
        this.world?.clear()
        this.world = null
        this.overlay = null
        this.page = null
        this.resizeObserver = null
        this.bounds = null
        this.zones = []
        this.registrations.forEach((registration) => (registration.isApplied = false))
    }

    private loadPhysics = (): void => {
        if (this.world || this.isLoadingPhysics || this.reducedMotion) {
            return
        }
        this.isLoadingPhysics = true
        import('matter-js')
            .then((module) => {
                this.isLoadingPhysics = false
                if (!this.overlay || this.world) {
                    return
                }
                const matter = ((module as { default?: typeof MatterModule }).default ?? module) as typeof MatterModule
                this.world = new LineWorld(matter)
                this.boundsKey = ''
                this.registrations.forEach((registration) => (registration.isApplied = false))
                this.measure()
                this.objects.forEach((object) => this.launch(object))
            })
            .catch(() => {
                this.isLoadingPhysics = false
                this.clearObjects()
            })
    }

    private measure = (): void => {
        if (!this.overlay || !this.page) {
            return
        }
        const origin = this.overlay.getBoundingClientRect()
        const page = this.page.getBoundingClientRect()
        const bounds: PageBounds = {
            left: page.left - origin.left,
            right: page.right - origin.left,
            floor: origin.height,
        }
        const boundsKey = [bounds.left, bounds.right, bounds.floor].map(Math.round).join(',')
        if (boundsKey !== this.boundsKey) {
            this.boundsKey = boundsKey
            this.bounds = bounds
            this.world?.setBounds(bounds)
            this.startLoop()
        }

        const zones: PlacedZone[] = []
        this.registrations.forEach((registration, key) => {
            const rect = registration.element.getBoundingClientRect()
            const dx = rect.left - origin.left
            const dy = rect.top - origin.top
            const placed = translateParts(registration.parts, dx, dy)
            placed.zones.forEach((zone, index) => zones.push({ id: `${key}:${index}`, zone }))
            const positionKey = `${Math.round(dx)},${Math.round(dy)}`
            if (registration.positionKey !== positionKey) {
                registration.positionKey = positionKey
                registration.isApplied = false
            }
            if (this.world && !registration.isApplied) {
                this.world.setParts(key, placed.segments)
                registration.isApplied = true
                this.startLoop()
            }
        })
        this.zones = zones
    }

    private emit = (kind: EventKind, at: SpawnPoint): void => {
        const overlay = this.overlay
        const region = this.captureRegion?.getBoundingClientRect()
        if (!overlay || !region || !isInsideBox(this.clientBox(region), at.clientX, at.clientY)) {
            return
        }
        if (this.reducedMotion) {
            this.stats = {
                ...this.stats,
                captured: this.stats.captured + 1,
                ingested: { ...this.stats.ingested, [kind]: this.stats.ingested[kind] + 1 },
            }
            this.notifyStats()
            this.ingestListeners.forEach((listener) => listener(kind))
            return
        }
        const isAlwaysShown = kind === 'pageview' || kind === 'rageclick'
        if (!isAlwaysShown && !this.bucket.take(performance.now())) {
            return
        }
        const origin = overlay.getBoundingClientRect()
        const x = at.clientX - origin.left
        const y = at.clientY - origin.top - (at.pop ? CURSOR_CLEARANCE : 0)
        const target = this.throwTarget()
        this.makeRoom('tile', MAX_TILES)

        const { root, badge } = createTileElement(kind, x, y)
        overlay.appendChild(root)
        badge.animate(
            [
                { transform: `scale(${POP_START_SCALE})`, opacity: 0 },
                { transform: 'scale(1)', opacity: 1 },
            ],
            { duration: POP_IN_MS, easing: POP_EASING }
        )
        const tile: TileObject = {
            type: 'tile',
            id: this.nextId++,
            kind,
            root,
            width: root.offsetWidth,
            height: root.offsetHeight,
            x,
            y,
            angle: 0,
            bornAt: performance.now(),
            launch: target ? throwAt({ x, y }, target) : launchFor(at),
            isLive: false,
            isLeaving: false,
            restingSince: null,
        }
        this.objects.set(tile.id, tile)
        this.stats = { ...this.stats, captured: this.stats.captured + 1 }
        this.notifyStats()
        this.launch(tile)
    }

    private clientBox(rect: DOMRect): Box {
        return { left: rect.left, top: rect.top, width: rect.width, height: rect.height }
    }

    private throwTarget(): Point | null {
        const converter = this.zones.find(({ zone }) => zone.type === 'converter')
        return converter?.zone.type === 'converter' ? converter.zone.intake : null
    }

    private recordScrollDepth = (depth: number): void => {
        const previous = this.stats.maxScrollDepth
        if (depth <= previous || (depth - previous < SCROLL_DEPTH_STEP && depth < 1)) {
            return
        }
        this.stats = { ...this.stats, maxScrollDepth: depth }
        this.notifyStats()
    }

    private notifyStats(): void {
        this.statsListeners.forEach((listener) => listener())
    }

    private makeRoom(type: LineObject['type'], limit: number): void {
        const active = Array.from(this.objects.values()).filter((object) => object.type === type && !object.isLeaving)
        if (active.length >= limit) {
            this.fade(active[0])
        }
    }

    private spawnBead(kind: EventKind, at: Point, velocity: Point): void {
        const overlay = this.overlay
        if (!overlay || this.reducedMotion) {
            return
        }
        this.makeRoom('bead', MAX_BEADS)
        const root = createBeadElement(kind, at.x, at.y)
        overlay.appendChild(root)
        const bead: BeadObject = {
            type: 'bead',
            id: this.nextId++,
            kind,
            root,
            x: at.x,
            y: at.y,
            bornAt: performance.now(),
            isLive: false,
            isLeaving: false,
            restingSince: null,
            countedIn: null,
            launch: { vx: velocity.x, vy: velocity.y, spin: 0 },
        }
        this.objects.set(bead.id, bead)
        this.launch(bead)
    }

    private launch(object: LineObject): void {
        if (!this.world || object.isLive || object.isLeaving) {
            return
        }
        if (object.type === 'tile') {
            this.world.addTile(object.id, {
                x: object.x,
                y: object.y,
                width: object.width,
                height: object.height,
                ...object.launch,
            })
        } else {
            this.world.addBead(object.id, {
                x: object.x,
                y: object.y,
                kind: object.kind,
                vx: object.launch.vx,
                vy: object.launch.vy,
            })
        }
        object.isLive = true
        this.startLoop()
    }

    private startLoop(): void {
        if (this.frame !== null || !this.world) {
            return
        }
        this.lastFrameAt = performance.now()
        this.unspentMs = 0
        this.frame = requestAnimationFrame(this.tick)
    }

    private tick = (now: number): void => {
        this.frame = null
        const world = this.world
        if (!world) {
            return
        }
        this.unspentMs = Math.min(this.unspentMs + now - this.lastFrameAt, STEP_MS * MAX_STEPS_PER_FRAME)
        this.lastFrameAt = now
        if (this.unspentMs >= STEP_MS) {
            while (this.unspentMs >= STEP_MS) {
                this.applyConveyors(world)
                world.step()
                this.unspentMs -= STEP_MS
            }
            this.sync(world, now)
        }
        if (world.hasAwakeBodies()) {
            this.frame = requestAnimationFrame(this.tick)
        }
    }

    private applyConveyors(world: LineWorld): void {
        const conveyors = this.zones.filter((placed) => placed.zone.type === 'conveyor')
        if (conveyors.length === 0) {
            return
        }
        this.objects.forEach((object) => {
            if (!object.isLive) {
                return
            }
            const conveyor = conveyors.find(({ zone }) => isInsideBox(zone.box, object.x, object.y))
            if (conveyor && conveyor.zone.type === 'conveyor') {
                world.pushHorizontally(object.id, conveyor.zone.speed, conveyor.zone.grip ?? CONVEYOR_BLEND)
            }
        })
    }

    private sync(world: LineWorld, now: number): void {
        const zoneCounts = new Map<string, BeadObject[]>()

        this.objects.forEach((object) => {
            const state = object.isLive ? world.read(object.id) : null
            if (!state) {
                return
            }
            object.x = state.x
            object.y = state.y
            if (!state.isSleeping) {
                object.root.style.transform =
                    object.type === 'bead'
                        ? beadTransform(state.x, state.y)
                        : tileTransform(state.x, state.y, state.angle)
            }
            if (object.type === 'tile') {
                object.angle = state.angle
            }

            const zonesHere = this.zones.filter(({ zone }) => isInsideBox(zone.box, state.x, state.y))
            const isSunk = object.type === 'tile' && zonesHere.some(({ zone }) => zone.type === 'sink')
            if (isSunk || this.hasEscaped(state.x, state.y)) {
                this.fade(object)
                return
            }

            if (object.type === 'tile') {
                const converter = this.zones.find(
                    ({ zone }) => zone.type === 'converter' && overlaps(zone.box, tileBox(object))
                )
                if (converter) {
                    this.convert(object, converter.id)
                } else {
                    this.ageTile(object, state.isSleeping, now)
                }
                return
            }

            const counter = zonesHere.find(
                ({ zone }) => zone.type === 'counter' && (zone.kind === undefined || zone.kind === object.kind)
            )
            if (counter && counter.zone.type === 'counter') {
                if (object.countedIn !== counter.id) {
                    object.countedIn = counter.id
                    if (counter.zone.isIngestion) {
                        this.recordIngest(object.kind)
                    }
                }
                zoneCounts.set(counter.id, [...(zoneCounts.get(counter.id) ?? []), object])
                return
            }
            this.ageBead(object, state.isSleeping, now)
        })

        this.trimCounters(zoneCounts)
    }

    private trimCounters(zoneCounts: Map<string, BeadObject[]>): void {
        zoneCounts.forEach((beads, zoneId) => {
            const placed = this.zones.find(({ id }) => id === zoneId)
            if (!placed || placed.zone.type !== 'counter') {
                return
            }
            const capacity = (placed.zone as CounterZone).capacity
            const resting = beads.filter((bead) => !bead.isLeaving).sort((a, b) => b.y - a.y)
            resting.slice(0, Math.max(0, resting.length - capacity)).forEach((bead) => this.fade(bead))
        })
    }

    private ageTile(tile: TileObject, isResting: boolean, now: number): void {
        if (now - tile.bornAt > TILE_MAX_AGE_MS) {
            this.fade(tile)
            return
        }
        if (!isResting) {
            tile.restingSince = null
            return
        }
        tile.restingSince = tile.restingSince ?? now
        if (now - tile.restingSince > TILE_REST_BEFORE_FADE_MS) {
            this.fade(tile)
        }
    }

    private ageBead(bead: BeadObject, isStuck: boolean, now: number): void {
        if (!isStuck) {
            bead.restingSince = null
            return
        }
        bead.restingSince = bead.restingSince ?? now
        if (now - bead.restingSince > BEAD_STUCK_BEFORE_FADE_MS) {
            this.fade(bead)
        }
    }

    private recordIngest(kind: EventKind): void {
        this.stats = { ...this.stats, ingested: { ...this.stats.ingested, [kind]: this.stats.ingested[kind] + 1 } }
        this.notifyStats()
        this.ingestListeners.forEach((listener) => listener(kind))
    }

    private hasEscaped(x: number, y: number): boolean {
        const bounds = this.bounds
        return (
            bounds !== null &&
            (y > bounds.floor + ESCAPE_MARGIN || x < bounds.left - ESCAPE_MARGIN || x > bounds.right + ESCAPE_MARGIN)
        )
    }

    private converterZone(zoneId: string): ConverterZone | null {
        const placed = this.zones.find(({ id }) => id === zoneId)
        return placed?.zone.type === 'converter' ? placed.zone : null
    }

    private entryZone(route: string): EntryZone | null {
        const placed = this.zones.find(({ zone }) => zone.type === 'entry' && zone.route === route)
        return placed?.zone.type === 'entry' ? placed.zone : null
    }

    private convert(tile: TileObject, zoneId: string): void {
        const converter = this.converterZone(zoneId)
        if (!converter) {
            return
        }
        this.retire(tile)
        const { intake } = converter
        const animation = tile.root.animate(
            [
                { transform: tileTransform(tile.x, tile.y, tile.angle), opacity: 1 },
                { transform: `${tileTransform(intake.x, intake.y, 0)} scale(0.15)`, opacity: 0 },
            ],
            { duration: CONVERT_MS, easing: SWALLOW_EASING, fill: 'forwards' }
        )
        animation.onfinish = () => {
            this.drop(tile.id)
            this.addToBatch(zoneId, tile.kind)
        }
    }

    private addToBatch(zoneId: string, kind: EventKind): void {
        const converter = this.converterZone(zoneId)
        if (!converter || this.reducedMotion) {
            return
        }
        const batch = this.pendingBatches.get(zoneId) ?? { kinds: [], timer: null }
        batch.kinds = [...batch.kinds, kind]
        this.pendingBatches.set(zoneId, batch)
        this.notifyBatch(zoneId, batch.kinds)
        if (batch.kinds.length >= converter.batch.size) {
            this.flushBatch(zoneId)
        } else if (batch.timer === null) {
            batch.timer = this.later(() => {
                batch.timer = null
                this.flushBatch(zoneId)
            }, converter.batch.waitMs)
        }
    }

    private flushBatch(zoneId: string): void {
        const batch = this.pendingBatches.get(zoneId)
        const converter = this.converterZone(zoneId)
        if (!batch || !converter || !this.openRoutes.has(converter.route) || !this.entryZone(converter.route)) {
            return
        }
        this.pendingBatches.delete(zoneId)
        this.cancel(batch.timer)
        this.notifyBatch(zoneId, [])
        const delivery = { route: converter.route, kinds: batch.kinds }
        if (this.sendListeners.size === 0) {
            this.deliver(delivery.route, delivery.kinds)
            return
        }
        this.sendListeners.forEach((listener) => listener(partsKeyOf(zoneId), delivery))
    }

    private notifyBatch(zoneId: string, pending: EventKind[]): void {
        this.batchListeners.forEach((listener) => listener(partsKeyOf(zoneId), pending))
    }

    private later(callback: () => void, delayMs: number): number {
        const timer = window.setTimeout(() => {
            this.timers.delete(timer)
            callback()
        }, delayMs)
        this.timers.add(timer)
        return timer
    }

    private cancel(timer: number | null): void {
        if (timer !== null) {
            window.clearTimeout(timer)
            this.timers.delete(timer)
        }
    }

    private fade(object: LineObject): void {
        this.retire(object)
        const animation = object.root.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: FADE_MS,
            easing: 'ease-out',
            fill: 'forwards',
        })
        animation.onfinish = () => this.drop(object.id)
    }

    private retire(object: LineObject): void {
        object.isLeaving = true
        object.isLive = false
        this.world?.remove(object.id)
        this.startLoop()
    }

    private drop(id: number): void {
        const object = this.objects.get(id)
        if (!object) {
            return
        }
        object.root.remove()
        this.objects.delete(id)
    }

    private clearObjects(): void {
        this.objects.forEach((object) => {
            this.world?.remove(object.id)
            object.root.remove()
        })
        this.objects.clear()
        this.timers.forEach((timer) => window.clearTimeout(timer))
        this.timers.clear()
        this.pendingBatches.forEach((_, zoneId) => this.notifyBatch(zoneId, []))
        this.pendingBatches.clear()
    }
}

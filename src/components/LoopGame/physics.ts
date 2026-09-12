export type Point = { x: number; y: number }
export type TrackPoint = Point & { distance: number; angle: number; turn: number; curvature: number }
export type Ride = {
    distance: number
    speed: number
    x: number
    y: number
    angle: number
    loops: number
    state: 'riding' | 'flying' | 'finished' | 'stalled' | 'crashed'
    vx: number
    vy: number
    reason: string
    strainedFor: number
}

export const WIDTH = 600
export const HEIGHT = 450
export const START = { x: 40, y: 350 }
export const FINISH = { x: 560, y: 350 }
const GRAVITY = 260
export const DIFFICULTIES = {
    easy: { label: 'Easy', grip: 2, maxLoad: 16, grace: 0.12, description: 'Extra grip for wobbly rails.' },
    medium: {
        label: 'Medium',
        grip: 0.8,
        maxLoad: 12,
        grace: 0.06,
        description: 'Smoother tracing and careful speed help.',
    },
    hard: { label: 'Hard', grip: 0.2, maxLoad: 11, grace: 0, description: 'Light grip. Every bend matters.' },
}
export type Difficulty = keyof typeof DIFFICULTIES
const TWO_PI = Math.PI * 2

const difference = (a: number, b: number) => Math.atan2(Math.sin(a - b), Math.cos(a - b))
export const distance = (a: Point, b: Point): number => Math.hypot(a.x - b.x, a.y - b.y)

export type Challenge = { points: Point[]; loops: number; speed: number }

export function createChallenge(random = Math.random): Challenge {
    const roll = random()
    const loops = roll < 0.4 ? 1 : roll < 0.85 ? 2 : 3
    const points: Point[] = [START]
    const centers =
        loops === 1
            ? [270 + random() * 60]
            : loops === 2
            ? [180 + random() * 25, 395 + random() * 25]
            : [155, 300, 445].map((x) => x + (random() - 0.5) * 16)
    for (const cx of centers) {
        const radius = loops === 1 ? 75 + random() * 20 : loops === 2 ? 55 + random() * 10 : 40 + random() * 8
        for (let x = points[points.length - 1].x + 4; x < cx; x += 4) points.push({ x, y: START.y })
        for (let i = 0; i <= 180; i++) {
            const angle = Math.PI / 2 - (i / 180) * TWO_PI
            points.push({ x: cx + radius * Math.cos(angle), y: START.y - radius + radius * Math.sin(angle) })
        }
    }
    for (let x = points[points.length - 1].x + 4; x < FINISH.x; x += 4) points.push({ x, y: FINISH.y })
    points.push(FINISH)
    return { points, loops, speed: loops === 1 ? 380 : loops === 2 ? 330 : 280 }
}

export function buildTrack(points: Point[]): TrackPoint[] {
    // Sample by distance so slow drawing does not change the track's physics.
    const sampled: Point[] = points.length ? [points[0]] : []
    let remaining = 4
    for (let i = 1; i < points.length; i++) {
        let start = points[i - 1]
        const end = points[i]
        let length = distance(start, end)
        while (length >= remaining) {
            const t = remaining / length
            start = { x: start.x + (end.x - start.x) * t, y: start.y + (end.y - start.y) * t }
            sampled.push(start)
            length -= remaining
            remaining = 4
        }
        remaining -= length
    }
    if (sampled.length < 6) return []
    if (distance(sampled[sampled.length - 1], points[points.length - 1]) > 0.01) {
        sampled.push(points[points.length - 1])
    }
    // Soften mouse jitter without snapping the drawing to a predetermined loop.
    const smooth = sampled.map((p, i) => {
        if (i === 0 || i === sampled.length - 1) return p
        const neighbors = sampled.slice(Math.max(0, i - 2), Math.min(sampled.length, i + 3))
        return {
            x: neighbors.reduce((sum, q) => sum + q.x, 0) / neighbors.length,
            y: neighbors.reduce((sum, q) => sum + q.y, 0) / neighbors.length,
        }
    })
    let length = 0
    let turn = 0
    const track: TrackPoint[] = smooth.map((p, i) => {
        const before = smooth[Math.max(0, i - 2)]
        const after = smooth[Math.min(smooth.length - 1, i + 2)]
        const angle = Math.atan2(after.y - before.y, after.x - before.x)
        if (i > 0) length += distance(smooth[i - 1], p)
        return { ...p, distance: length, angle, turn: 0, curvature: 0 }
    })
    track.forEach((p, i) => {
        if (i > 0) turn += difference(p.angle, track[i - 1].angle)
        p.turn = turn
        const before = track[Math.max(0, i - 3)]
        const after = track[Math.min(track.length - 1, i + 3)]
        p.curvature = difference(after.angle, before.angle) / Math.max(1, after.distance - before.distance)
    })
    return track
}

export function pointOnTrack(track: TrackPoint[], position: number): TrackPoint {
    let lo = 0
    let hi = track.length - 1
    while (lo + 1 < hi) {
        const mid = (lo + hi) >> 1
        if (track[mid].distance <= position) lo = mid
        else hi = mid
    }
    const a = track[lo]
    const b = track[hi]
    const t = Math.max(0, Math.min(1, (position - a.distance) / Math.max(0.001, b.distance - a.distance)))
    return {
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
        angle: a.angle + difference(b.angle, a.angle) * t,
        distance: position,
        turn: a.turn + (b.turn - a.turn) * t,
        curvature: a.curvature + (b.curvature - a.curvature) * t,
    }
}

export function launchRide(track: TrackPoint[], speed: number): Ride {
    return { ...track[0], distance: 0, speed, loops: 0, state: 'riding', vx: 0, vy: 0, reason: '', strainedFor: 0 }
}

export function stepRide(track: TrackPoint[], ride: Ride, dt: number, difficulty: Difficulty = 'easy'): Ride {
    const settings = DIFFICULTIES[difficulty]
    if (ride.state === 'flying') {
        const next = {
            ...ride,
            x: ride.x + ride.vx * dt,
            y: ride.y + ride.vy * dt + (GRAVITY * dt * dt) / 2,
            vy: ride.vy + GRAVITY * dt,
            angle: ride.angle + dt * 3,
        }
        if (next.y > HEIGHT - 20 || next.x < -30 || next.x > WIDTH + 30) next.state = 'crashed'
        return next
    }
    if (ride.state !== 'riding') return ride
    const p = pointOnTrack(track, ride.distance)
    const speedSquared =
        ride.speed * ride.speed + 2 * GRAVITY * Math.sin(p.angle) * ride.speed * dt - 12 * ride.speed * dt
    if (speedSquared <= 25)
        return {
            ...ride,
            state: 'stalled',
            reason: 'Stalled on the climb. Add a little launch speed or draw a lower loop.',
        }
    const speed = Math.sqrt(speedSquared)
    // Normal force plus a little arcade adhesion keeps imperfect traces rideable.
    const load = Math.cos(p.angle) - (speedSquared * p.curvature) / GRAVITY
    // A short bump should not immediately eject the cart.
    const strainedFor = load < -settings.grip || load > settings.maxLoad ? ride.strainedFor + dt : 0
    if (strainedFor > settings.grace) {
        return {
            ...ride,
            state: 'flying',
            vx: Math.cos(p.angle) * speed,
            vy: Math.sin(p.angle) * speed,
            reason:
                load < 0
                    ? 'Lost contact with the track. Try more launch speed or a lower loop.'
                    : 'That bend was too tight at this speed. Slow down or draw a wider turn.',
        }
    }
    const position = Math.min(track[track.length - 1].distance, ride.distance + speed * dt)
    const next = pointOnTrack(track, position)
    const loops = Math.max(ride.loops, Math.floor((Math.abs(next.turn) + 0.15) / TWO_PI))
    return {
        ...ride,
        ...next,
        speed,
        strainedFor,
        loops,
        state: position >= track[track.length - 1].distance ? 'finished' : 'riding',
    }
}

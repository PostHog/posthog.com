import { HEIGHT, WIDTH } from './physics'
import type { Ride, TrackPoint } from './physics'

type Vec = [number, number, number]
const subtract = (a: Vec, b: Vec): Vec => [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
const dot = (a: Vec, b: Vec) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const cross = (a: Vec, b: Vec): Vec => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
const unit = (v: Vec): Vec => {
    const length = Math.hypot(...v) || 1
    return v.map((n) => n / length) as Vec
}

// Perspective projection keeps the physics in the drawing plane, while rails,
// sleepers, supports, and the cart have real depth. No WebGL dependency needed.
export function render3d(
    ctx: CanvasRenderingContext2D,
    track: TrackPoint[],
    ride: Ride,
    pov: boolean,
    color: string,
    mascot: HTMLImageElement | null
): void {
    const world = (x: number, y: number, z = 0): Vec => [x - WIDTH / 2, 405 - y, z]
    const cart = world(ride.x, ride.y)
    const up: Vec = [Math.sin(ride.angle), Math.cos(ride.angle), 0]
    const forward: Vec = [Math.cos(ride.angle), -Math.sin(ride.angle), 0]
    const eye: Vec = pov
        ? (cart.map((n, i) => n + up[i] * 23 - forward[i] * 12) as Vec)
        : [390 + cart[0] * 0.15, 320, 620]
    const target: Vec = pov ? (eye.map((n, i) => n + forward[i] * 100 - up[i] * 10) as Vec) : [cart[0] * 0.15, 115, 0]
    const view = unit(subtract(target, eye))
    const right = unit(cross(view, pov ? up : [0, 1, 0]))
    const vertical = cross(right, view)
    const project = (p: Vec) => {
        const delta = subtract(p, eye)
        const depth = dot(delta, view)
        return {
            x: WIDTH / 2 + (dot(delta, right) * 540) / depth,
            y: HEIGHT / 2 - (dot(delta, vertical) * 540) / depth,
            depth,
        }
    }
    const faces: { points: Vec[]; fill: string; alpha: number }[] = []
    const face = (points: Vec[], fill: string, alpha = 1) => faces.push({ points, fill, alpha })
    const box = (center: Vec, size: Vec, fill: string, angle = 0) => {
        const vertices: Vec[] = []
        for (const z of [-1, 1])
            for (const y of [-1, 1])
                for (const x of [-1, 1]) {
                    const dx = (x * size[0]) / 2,
                        dy = (y * size[1]) / 2
                    vertices.push([
                        center[0] + dx * Math.cos(angle) + dy * Math.sin(angle),
                        center[1] - dx * Math.sin(angle) + dy * Math.cos(angle),
                        center[2] + (z * size[2]) / 2,
                    ])
                }
        const sides = [
            [0, 1, 3, 2],
            [4, 6, 7, 5],
            [0, 4, 5, 1],
            [2, 3, 7, 6],
            [0, 2, 6, 4],
            [1, 5, 7, 3],
        ]
        sides.forEach((indices) =>
            face(
                indices.map((i) => vertices[i]),
                fill
            )
        )
    }
    // Floor grid and shadows give the miniature a visible scale and height.
    face(
        [
            [-340, -2, -160],
            [340, -2, -160],
            [340, -2, 160],
            [-340, -2, 160],
        ],
        color,
        0.06
    )
    for (let x = -320; x <= 320; x += 40)
        face(
            [
                [x, 0, -160],
                [x + 1, 0, -160],
                [x + 1, 0, 160],
                [x, 0, 160],
            ],
            color,
            0.12
        )
    for (let z = -160; z <= 160; z += 40)
        face(
            [
                [-340, 0, z],
                [340, 0, z],
                [340, 0, z + 1],
                [-340, 0, z + 1],
            ],
            color,
            0.12
        )
    for (let i = 1; i < track.length; i++) {
        const a = track[i - 1],
            b = track[i]
        face(
            [world(a.x + 15, 404, -12), world(b.x + 15, 404, -12), world(b.x + 15, 404, 12), world(a.x + 15, 404, 12)],
            color,
            0.08
        )
        for (const z of [-10, 10]) {
            face(
                [
                    world(a.x, a.y - 2, z - 2),
                    world(b.x, b.y - 2, z - 2),
                    world(b.x, b.y + 2, z - 2),
                    world(a.x, a.y + 2, z - 2),
                ],
                '#f54e00'
            )
            face(
                [
                    world(a.x, a.y - 2, z - 2),
                    world(b.x, b.y - 2, z - 2),
                    world(b.x, b.y - 2, z + 2),
                    world(a.x, a.y - 2, z + 2),
                ],
                '#f9bd2b'
            )
        }
        if (i % 5 === 0) box(world(b.x, b.y + 3), [3, 3, 29], '#9b9b9b', b.angle)
        if (i % 28 === 0)
            for (const z of [-16, 16]) {
                const height = 405 - b.y
                box([b.x - WIDTH / 2, height / 2, z], [4, height, 4], '#9b9b9b')
                box([b.x - WIDTH / 2, 1, z], [18, 3, 18], '#6b6b6b')
            }
    }
    if (!pov) {
        const part = (x: number, y: number, z: number, size: Vec, fill: string) =>
            box([cart[0] + x * forward[0] + y * up[0], cart[1] + x * forward[1] + y * up[1], z], size, fill, ride.angle)
        part(0, 10, 0, [30, 13, 28], '#f54e00')
        part(-10, 22, 0, [5, 17, 25], '#f9bd2b')
        for (const x of [-10, 10]) for (const z of [-15, 15]) part(x, 2, z, [7, 7, 5], '#444444')
    }
    // Clip polygons against the near plane so rails remain continuous in POV.
    const clip = (points: Vec[]) => {
        const result: Vec[] = []
        points.forEach((b, i) => {
            const a = points[(i + points.length - 1) % points.length]
            const da = dot(subtract(a, eye), view),
                db = dot(subtract(b, eye), view)
            if (da >= 3 !== db >= 3) {
                const t = (3 - da) / (db - da)
                result.push(a.map((n, j) => n + (b[j] - n) * t) as Vec)
            }
            if (db >= 3) result.push(b)
        })
        return result
    }
    const primitives = faces
        .map((f) => ({ ...f, projected: clip(f.points).map(project) }))
        .filter((f) => f.projected.length >= 3)
    primitives.sort(
        (a, b) =>
            b.projected.reduce((s, p) => s + p.depth, 0) / b.projected.length -
            a.projected.reduce((s, p) => s + p.depth, 0) / a.projected.length
    )
    for (const f of primitives) {
        ctx.globalAlpha = f.alpha
        ctx.fillStyle = f.fill
        ctx.beginPath()
        f.projected.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)))
        ctx.closePath()
        ctx.fill()
        if (f.alpha === 1) {
            ctx.strokeStyle = 'rgba(0,0,0,0.18)'
            ctx.lineWidth = 0.5
            ctx.stroke()
        }
    }
    ctx.globalAlpha = 1
    if (!pov && mascot?.complete && mascot.naturalWidth) {
        const seat = project(cart.map((n, i) => n + up[i] * 15) as Vec)
        const head = project(cart.map((n, i) => n + up[i] * 60) as Vec)
        const size = Math.hypot(head.x - seat.x, head.y - seat.y)
        if (seat.depth > 3 && head.depth > 3) {
            ctx.save()
            ctx.translate(seat.x, seat.y)
            ctx.rotate(Math.atan2(head.y - seat.y, head.x - seat.x) + Math.PI / 2)
            ctx.drawImage(mascot, -size / 2, -size, size, (size * mascot.naturalHeight) / mascot.naturalWidth)
            ctx.restore()
        }
    }
    ctx.fillStyle = color
    ctx.font = 'bold 14px sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText(pov ? 'RIDE POV' : '3D FANCY VIEW', 18, 28)
    ctx.font = '12px sans-serif'
    ctx.fillText(
        ride.state === 'flying' || ride.state === 'crashed'
            ? 'Safety department: offline'
            : 'Engineering standards: vibes',
        18,
        HEIGHT - 18
    )
}

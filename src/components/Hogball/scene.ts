import {
    ACESFilmicToneMapping,
    AdditiveBlending,
    AmbientLight,
    BoxGeometry,
    BufferAttribute,
    BufferGeometry,
    CanvasTexture,
    CatmullRomCurve3,
    CircleGeometry,
    Color,
    CylinderGeometry,
    DirectionalLight,
    DoubleSide,
    ExtrudeGeometry,
    Group,
    Material,
    Mesh,
    MeshBasicMaterial,
    MeshStandardMaterial,
    PCFSoftShadowMap,
    PerspectiveCamera,
    PlaneGeometry,
    PMREMGenerator,
    PointLight,
    Points,
    PointsMaterial,
    Scene,
    Shape,
    Sprite,
    SpriteMaterial,
    SRGBColorSpace,
    TorusGeometry,
    TubeGeometry,
    Vector2,
    Vector3,
    WebGLRenderer,
} from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import {
    BALL_RADIUS,
    FLIPPER_LENGTH,
    HEIGHT,
    HOLE,
    MAX_FUEL,
    POST,
    RAMP_LENGTH,
    RAMP_PATH,
    SLINGSHOTS,
    WALLS,
    WIDTH,
    ballInPlunger,
} from './physics'
import type { Game, Point } from './physics'
import { BLUE, PURPLE, RED, YELLOW, drawFloor } from './floor'

export type Images = { ball: HTMLImageElement; rocket: HTMLImageElement }
export type Table = {
    resize: (width: number, height: number, dpr: number) => void
    render: (game: Game, time: number, rocketProgress: number) => void
    dispose: () => void
}

// The physics runs on a flat 400 × 640 table. The scene puts that table on the x–z plane with y up,
// so one physics pixel is one scene unit.
const X = (x: number) => x - WIDTH / 2
const Z = (y: number) => y - HEIGHT / 2
const WALL_HEIGHT = 16
const FLOOR_SCALE = 1.5
const CAMERA_PITCH = (56 * Math.PI) / 180
const BUMPER_COLORS = [RED, BLUE, PURPLE]
const SPARKS = 160

const chrome = () => new MeshStandardMaterial({ color: '#dfe3f5', metalness: 1, roughness: 0.2 })
const plastic = (color: string, emissive = 0.25) =>
    new MeshStandardMaterial({ color, emissive: color, emissiveIntensity: emissive, roughness: 0.35 })

// Lays a 2D shape (in physics pixels) flat on the table and extrudes it up by `height`
function extrude(points: Point[], height: number, origin: Point = { x: 0, y: 0 }) {
    const shape = new Shape(points.map((p) => new Vector2(p.x - origin.x, -(p.y - origin.y))))
    const geometry = new ExtrudeGeometry(shape, { depth: height, bevelEnabled: false })
    geometry.rotateX(-Math.PI / 2)
    return geometry
}

// A tapered flipper outline that points along +x from its pivot
function flipperShape(r0: number, r1: number) {
    const shape = new Shape()
    shape.moveTo(0, r0)
    shape.lineTo(FLIPPER_LENGTH, r1)
    shape.absarc(FLIPPER_LENGTH, 0, r1, Math.PI / 2, -Math.PI / 2, true)
    shape.lineTo(0, -r0)
    shape.absarc(0, 0, r0, -Math.PI / 2, Math.PI / 2, true)
    return shape
}

function flipperMesh(r0: number, r1: number, height: number, material: Material) {
    const geometry = new ExtrudeGeometry(flipperShape(r0, r1), { depth: height, bevelEnabled: false })
    geometry.rotateX(-Math.PI / 2)
    const mesh = new Mesh(geometry, material)
    mesh.castShadow = true
    return mesh
}

function box(width: number, height: number, depth: number, material: Material) {
    const mesh = new Mesh(new BoxGeometry(width, height, depth), material)
    mesh.castShadow = true
    mesh.receiveShadow = true
    return mesh
}

// WebGL cannot always read an SVG image directly, so draw it to a canvas first
function imageTexture(image: HTMLImageElement) {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const texture = new CanvasTexture(canvas)
    texture.colorSpace = SRGBColorSpace
    const update = () => {
        canvas.getContext('2d')?.drawImage(image, 0, 0, canvas.width, canvas.height)
        texture.needsUpdate = true
    }
    if (image.complete && image.naturalWidth) update()
    else image.addEventListener('load', update, { once: true })
    return texture
}

// A strip that follows the ramp curve. `offset` moves it to one side, `rise` gives it height.
function ribbon(curve: CatmullRomCurve3, from: number, to: number, rise: number, segments = 140) {
    const up = new Vector3(0, 1, 0)
    const positions: number[] = []
    const indices: number[] = []
    for (let i = 0; i <= segments; i++) {
        const t = i / segments
        const point = curve.getPointAt(t)
        const side = new Vector3().crossVectors(curve.getTangentAt(t), up).normalize()
        const a = point.clone().addScaledVector(side, from)
        const b = point.clone().addScaledVector(side, to).add(new Vector3(0, rise, 0))
        positions.push(a.x, a.y, a.z, b.x, b.y, b.z)
        if (i < segments) indices.push(i * 2, i * 2 + 1, i * 2 + 2, i * 2 + 1, i * 2 + 3, i * 2 + 2)
    }
    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3))
    geometry.setIndex(indices)
    geometry.computeVertexNormals()
    return geometry
}

function offsetCurve(curve: CatmullRomCurve3, offset: number, rise: number) {
    const up = new Vector3(0, 1, 0)
    const points = Array.from({ length: 60 }, (_, i) => {
        const t = i / 59
        const side = new Vector3().crossVectors(curve.getTangentAt(t), up).normalize()
        return curve.getPointAt(t).addScaledVector(side, offset).add(new Vector3(0, rise, 0))
    })
    return new CatmullRomCurve3(points)
}

export function createTable(canvas: HTMLCanvasElement, images: Images): Table {
    const renderer = new WebGLRenderer({ canvas, antialias: true })
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = PCFSoftShadowMap
    renderer.toneMapping = ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.95

    const scene = new Scene()
    scene.background = new Color('#07081a')
    const pmrem = new PMREMGenerator(renderer)
    const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = environment
    scene.environmentIntensity = 0.45

    const camera = new PerspectiveCamera(34, 1, 10, 4000)
    const target = new Vector3(0, 0, 0)
    let cameraPosition = new Vector3()

    scene.add(new AmbientLight('#8890c0', 0.35))
    const sun = new DirectionalLight('#ffffff', 2)
    sun.position.set(-160, 520, 260)
    sun.castShadow = true
    sun.shadow.mapSize.set(2048, 2048)
    Object.assign(sun.shadow.camera, { left: -280, right: 280, top: 380, bottom: -380, near: 100, far: 1400 })
    sun.shadow.bias = -0.0005
    scene.add(sun)
    for (const [color, x, y] of [
        [PURPLE, 110, 190],
        [BLUE, 300, 430],
        [RED, 185, 600],
    ] as const) {
        const glow = new PointLight(color, 9000, 0, 2)
        glow.position.set(X(x), 70, Z(y))
        scene.add(glow)
    }

    const floorCanvas = document.createElement('canvas')
    floorCanvas.width = WIDTH * FLOOR_SCALE
    floorCanvas.height = HEIGHT * FLOOR_SCALE
    const floorContext = floorCanvas.getContext('2d')
    const floorTexture = new CanvasTexture(floorCanvas)
    floorTexture.colorSpace = SRGBColorSpace
    floorTexture.anisotropy = renderer.capabilities.getMaxAnisotropy()
    const floor = new Mesh(
        new PlaneGeometry(WIDTH, HEIGHT),
        new MeshStandardMaterial({
            map: floorTexture,
            emissiveMap: floorTexture,
            emissive: '#ffffff',
            emissiveIntensity: 0.4,
            roughness: 0.3,
        })
    )
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true
    scene.add(floor)

    const cabinet = new MeshStandardMaterial({ color: '#2b2f48', metalness: 0.7, roughness: 0.35 })
    const sides: [number, number, number, number, number, number][] = [
        [24, 46, HEIGHT + 48, X(-12), 14, 0],
        [24, 46, HEIGHT + 48, X(WIDTH + 12), 14, 0],
        [WIDTH + 48, 46, 24, 0, 14, Z(-12)],
        [WIDTH + 48, 30, 24, 0, 6, Z(HEIGHT + 12)],
    ]
    for (const [w, h, d, x, y, z] of sides) {
        const side = box(w, h, d, cabinet)
        side.position.set(x, y, z)
        scene.add(side)
    }

    const rail = chrome()
    for (const wall of WALLS) {
        if (wall.kick) continue
        const length = Math.hypot(wall.b.x - wall.a.x, wall.b.y - wall.a.y)
        const piece = box(length + 3, WALL_HEIGHT, 5, rail)
        piece.position.set(X((wall.a.x + wall.b.x) / 2), WALL_HEIGHT / 2, Z((wall.a.y + wall.b.y) / 2))
        piece.rotation.y = -Math.atan2(wall.b.y - wall.a.y, wall.b.x - wall.a.x)
        scene.add(piece)
    }

    const rubber = new MeshStandardMaterial({ color: '#f4f6ff', roughness: 0.6 })
    for (const [top, bottom, tip] of SLINGSHOTS) {
        const body = new Mesh(extrude([top, bottom, tip], WALL_HEIGHT), plastic(RED, 0.35))
        body.position.set(X(0), 0, Z(0))
        body.castShadow = true
        scene.add(body)
        const length = Math.hypot(tip.x - top.x, tip.y - top.y)
        const band = box(length, WALL_HEIGHT + 2, 4, rubber)
        band.position.set(X((tip.x + top.x) / 2), (WALL_HEIGHT + 2) / 2, Z((tip.y + top.y) / 2))
        band.rotation.y = -Math.atan2(tip.y - top.y, tip.x - top.x)
        scene.add(band)
    }

    const post = new Mesh(new CylinderGeometry(6, 6, 18, 20), plastic(RED, 0.5))
    post.position.set(X(POST.x), 9, Z(POST.y))
    post.castShadow = true
    scene.add(post)

    const bumpers = BUMPER_COLORS.map((color) => {
        const group = new Group()
        const skirt = new Mesh(new CylinderGeometry(24, 24, 4, 32), rubber)
        skirt.position.y = 2
        const bodyMaterial = plastic(color, 0.35)
        const body = new Mesh(new CylinderGeometry(17, 17, 14, 32), bodyMaterial)
        body.position.y = 11
        const cap = new Mesh(new CylinderGeometry(21, 19, 5, 32), bodyMaterial)
        cap.position.y = 20
        const star = new Mesh(new CylinderGeometry(9, 9, 1.5, 5), plastic('#ffffff', 0.6))
        star.position.y = 23
        for (const part of [skirt, body, cap, star]) {
            part.castShadow = true
            group.add(part)
        }
        const flash = new PointLight(color, 0, 160, 2)
        flash.position.y = 30
        group.add(flash)
        scene.add(group)
        return { group, bodyMaterial, cap, flash }
    })

    const targetMaterial = plastic(YELLOW, 0.5)
    const targets = [0, 1, 2].map(() => {
        const mesh = box(5, 16, 16, targetMaterial)
        scene.add(mesh)
        return mesh
    })

    const padMaterial = plastic(YELLOW, 0.2)
    const pad = new Mesh(new TorusGeometry(HOLE.radius + 2, 2.4, 12, 40), padMaterial)
    pad.rotation.x = -Math.PI / 2
    pad.position.set(X(HOLE.x), 1, Z(HOLE.y))
    scene.add(pad)

    const flippers = [0, 1].map(() => {
        const group = new Group()
        group.add(flipperMesh(8, 5.5, 11, plastic(RED, 0.3)))
        const top = flipperMesh(6, 3.5, 12, new MeshStandardMaterial({ color: '#ffffff', roughness: 0.3 }))
        group.add(top)
        scene.add(group)
        return group
    })

    const plunger = new Group()
    const rod = new Mesh(new CylinderGeometry(3, 3, 34, 12), chrome())
    rod.rotation.x = Math.PI / 2
    rod.position.z = 17
    const knob = new Mesh(new CylinderGeometry(10, 10, 8, 20), plastic(RED, 0.4))
    knob.rotation.x = Math.PI / 2
    plunger.add(rod, knob)
    plunger.position.set(X(365), 8, 0)
    scene.add(plunger)

    const curve = new CatmullRomCurve3(RAMP_PATH.map((p) => new Vector3(X(p.x), p.h + 1, Z(p.y))))
    const rampMaterial = new MeshStandardMaterial({
        color: '#9b4ff0',
        emissive: '#4a1a8a',
        emissiveIntensity: 0.6,
        roughness: 0.25,
        transparent: true,
        opacity: 0.82,
        side: DoubleSide,
    })
    const rampFloor = new Mesh(ribbon(curve, 11, -11, 0), rampMaterial)
    rampFloor.castShadow = true
    scene.add(rampFloor)
    for (const side of [11, -11]) {
        scene.add(new Mesh(ribbon(curve, side, side, 10), rampMaterial))
        const edge = new Mesh(new TubeGeometry(offsetCurve(curve, side, 10), 120, 1.6, 8), chrome())
        edge.castShadow = true
        scene.add(edge)
    }
    for (const t of [0.28, 0.42, 0.56, 0.7, 0.82]) {
        const point = curve.getPointAt(t)
        const support = new Mesh(new CylinderGeometry(2, 2, point.y, 8), chrome())
        support.position.set(point.x, point.y / 2, point.z)
        support.castShadow = true
        scene.add(support)
    }

    const ballTexture = imageTexture(images.ball)
    const ballMaterial = new SpriteMaterial({ map: ballTexture })
    const ball = new Sprite(ballMaterial)
    ball.scale.set(BALL_RADIUS * 3.2, BALL_RADIUS * 3.2, 1)
    scene.add(ball)
    const shadow = new Mesh(
        new CircleGeometry(BALL_RADIUS, 24),
        new MeshBasicMaterial({ color: '#000000', transparent: true, opacity: 0.45, depthWrite: false })
    )
    shadow.rotation.x = -Math.PI / 2
    scene.add(shadow)

    const rocketMaterial = new SpriteMaterial({ map: imageTexture(images.rocket), transparent: true })
    const rocket = new Sprite(rocketMaterial)
    rocket.scale.set(130, 130, 1)
    rocket.visible = false
    scene.add(rocket)

    const sparkPositions = new Float32Array(SPARKS * 3).fill(-1000)
    const sparkVelocities = new Float32Array(SPARKS * 3)
    const sparkLife = new Float32Array(SPARKS)
    const sparkGeometry = new BufferGeometry()
    sparkGeometry.setAttribute('position', new BufferAttribute(sparkPositions, 3))
    const sparks = new Points(
        sparkGeometry,
        new PointsMaterial({
            color: '#ffd27a',
            size: 4,
            transparent: true,
            blending: AdditiveBlending,
            depthWrite: false,
        })
    )
    scene.add(sparks)
    let nextSpark = 0
    const burst = (x: number, y: number, z: number, count: number, speed: number) => {
        for (let n = 0; n < count; n++) {
            const i = nextSpark++ % SPARKS
            const angle = Math.random() * Math.PI * 2
            const v = speed * (0.4 + Math.random() * 0.6)
            sparkPositions.set([x, y, z], i * 3)
            sparkVelocities.set([Math.cos(angle) * v, speed * (0.5 + Math.random()), Math.sin(angle) * v], i * 3)
            sparkLife[i] = 0.5 + Math.random() * 0.4
        }
    }

    // Moves the camera back until the whole table fits, then centers the table on the screen
    const fit = () => {
        const corners = [
            [X(-24), 0, Z(HEIGHT + 24)],
            [X(WIDTH + 24), 0, Z(HEIGHT + 24)],
            [X(-24), 40, Z(-24)],
            [X(WIDTH + 24), 40, Z(-24)],
        ].map(([x, y, z]) => new Vector3(x, y, z))
        const direction = new Vector3(0, Math.sin(CAMERA_PITCH), Math.cos(CAMERA_PITCH))
        target.set(0, 0, 0)
        for (let pass = 0; pass < 4; pass++) {
            let near = 200
            let far = 6000
            let bounds = { top: 0, bottom: 0 }
            for (let i = 0; i < 30; i++) {
                const distance = (near + far) / 2
                camera.position.copy(target).addScaledVector(direction, distance)
                camera.lookAt(target)
                camera.updateMatrixWorld()
                const projected = corners.map((corner) => corner.clone().project(camera))
                const fits = projected.every((p) => Math.abs(p.x) < 0.97 && Math.abs(p.y) < 0.97)
                bounds = {
                    top: Math.max(...projected.map((p) => p.y)),
                    bottom: Math.min(...projected.map((p) => p.y)),
                }
                if (fits) far = distance
                else near = distance
            }
            target.z -= ((bounds.top + bounds.bottom) / 2) * 260
        }
        cameraPosition = camera.position.clone()
    }

    let lastTime = 0
    const previousFlash = [0, 0, 0]
    let previousTargets = [false, false, false]
    let previousCombo = 0

    const render = (game: Game, time: number, rocketProgress: number) => {
        const dt = Math.min(0.05, Math.max(0, time - lastTime))
        lastTime = time

        if (floorContext) {
            floorContext.setTransform(FLOOR_SCALE, 0, 0, FLOOR_SCALE, 0, 0)
            drawFloor(floorContext, game, time)
            floorTexture.needsUpdate = true
        }

        game.bumpers.forEach((bumper, i) => {
            const part = bumpers[i]
            part.group.position.set(X(bumper.x), 0, Z(bumper.y))
            const lit = bumper.flash / 0.15
            part.bodyMaterial.emissiveIntensity = 0.35 + lit * 2.5
            part.cap.position.y = 20 - lit * 4
            part.flash.intensity = lit * 60000
            if (bumper.flash > previousFlash[i] + 0.05) burst(X(bumper.x), 22, Z(bumper.y), 18, 160)
            previousFlash[i] = bumper.flash
        })

        game.targets.forEach((target, i) => {
            const mesh = targets[i]
            const y = target.down ? -9 : 8
            mesh.position.set(
                X(target.a.x),
                mesh.position.y + (y - mesh.position.y) * Math.min(1, dt * 18),
                Z(target.a.y + 8)
            )
            if (target.down && !previousTargets[i]) burst(X(target.a.x), 10, Z(target.a.y + 8), 10, 120)
        })
        previousTargets = game.targets.map((target) => target.down)

        const full = game.fuel >= MAX_FUEL
        padMaterial.emissiveIntensity = full ? 1.5 + Math.sin(time * 10) : 0.2

        game.flippers.forEach((flipper, i) => {
            const group = flippers[i]
            group.position.set(X(flipper.pivot.x), 0, Z(flipper.pivot.y))
            group.rotation.y = flipper.side === 1 ? -flipper.angle : Math.PI + flipper.angle
        })

        const pull = ballInPlunger(game) ? 18 * game.charge : 0
        plunger.position.z = Z(610 + pull)

        const { ball: state } = game
        let position = new Vector3(X(state.x), BALL_RADIUS + 1, Z(state.y + pull))
        if (game.ramp)
            position = curve.getPointAt(Math.min(1, game.ramp.s / RAMP_LENGTH)).add(new Vector3(0, BALL_RADIUS, 0))
        if (game.hold > 0) position.y = 4
        ball.position.copy(position)
        ballMaterial.rotation = -state.angle
        const lift = position.y - BALL_RADIUS
        shadow.position.set(position.x + 5 + lift * 0.4, 0.3, position.z + 5 + lift * 0.4)
        ;(shadow.material as MeshBasicMaterial).opacity = Math.max(0.15, 0.45 - lift * 0.006)

        if (game.combo > previousCombo && game.combo > 0) burst(position.x, position.y, position.z, 30, 200)
        previousCombo = game.combo

        for (let i = 0; i < SPARKS; i++) {
            if (sparkLife[i] <= 0) continue
            sparkLife[i] -= dt
            sparkVelocities[i * 3 + 1] -= 500 * dt
            for (let axis = 0; axis < 3; axis++) sparkPositions[i * 3 + axis] += sparkVelocities[i * 3 + axis] * dt
            if (sparkLife[i] <= 0) sparkPositions[i * 3 + 1] = -1000
        }
        sparkGeometry.attributes.position.needsUpdate = true

        rocket.visible = rocketProgress > 0 && rocketProgress < 1
        if (rocket.visible) {
            rocket.position.set(
                X(HOLE.x) - rocketProgress * 120,
                30 + rocketProgress * 420,
                Z(HOLE.y) - rocketProgress * 520
            )
            rocketMaterial.opacity = Math.min(1, (1 - rocketProgress) * 4)
            if (rocketProgress < 0.05) burst(X(HOLE.x), 10, Z(HOLE.y), 50, 260)
        }

        camera.position.copy(cameraPosition)
        if (game.shake > 0) {
            camera.position.x += (Math.random() - 0.5) * game.shake * 18
            camera.position.y += (Math.random() - 0.5) * game.shake * 12
        }
        renderer.render(scene, camera)
    }

    return {
        resize: (width, height, dpr) => {
            renderer.setPixelRatio(Math.min(dpr, 2))
            renderer.setSize(width, height, false)
            camera.aspect = width / height
            camera.updateProjectionMatrix()
            fit()
        },
        render,
        dispose: () => {
            scene.traverse((object) => {
                const mesh = object as Mesh
                mesh.geometry?.dispose()
                const material = mesh.material as Material | Material[] | undefined
                ;(Array.isArray(material) ? material : material ? [material] : []).forEach((m) => m.dispose())
            })
            for (const texture of [floorTexture, ballTexture, rocketMaterial.map, environment]) texture?.dispose()
            pmrem.dispose()
            renderer.dispose()
        },
    }
}
